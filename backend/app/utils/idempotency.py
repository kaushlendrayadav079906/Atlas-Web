import os
import json
import sqlite3
import hashlib
import time
import threading
from typing import Dict, Optional, Tuple, Any
from app.config import settings
from app.utils.exceptions import DuplicateSubmissionError


class IdempotencyManager:
    """
    Persistent and concurrency-safe idempotency and deduplication engine.
    Uses SQLite with WAL mode for worker persistence across server restarts
    and multi-process concurrency, preventing duplicate SAP record creation.
    """

    def __init__(self, window_seconds: int = 300, db_path: Optional[str] = None):
        self.window_seconds = window_seconds
        self.lock = threading.Lock()

        # Determine database path
        if db_path is not None:
            self.db_path = db_path
        elif settings.IDEMPOTENCY_DB_PATH:
            self.db_path = settings.IDEMPOTENCY_DB_PATH
        elif settings.IDEMPOTENCY_STORAGE == "memory":
            self.db_path = ":memory:"
        else:
            data_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), "data")
            os.makedirs(data_dir, exist_ok=True)
            self.db_path = os.path.join(data_dir, "idempotency.db")

        # In-memory fast cache for read acceleration
        self._cache: Dict[str, Tuple[float, Optional[Dict[str, Any]], bool]] = {}
        self._mem_conn: Optional[sqlite3.Connection] = None

        self._init_db()

    def _get_connection(self) -> sqlite3.Connection:
        if self.db_path == ":memory:":
            if self._mem_conn is None:
                self._mem_conn = sqlite3.connect(":memory:", check_same_thread=False)
                self._mem_conn.row_factory = sqlite3.Row
            return self._mem_conn

        conn = sqlite3.connect(self.db_path, timeout=10.0)
        conn.row_factory = sqlite3.Row
        conn.execute("PRAGMA journal_mode=WAL;")
        conn.execute("PRAGMA busy_timeout=5000;")
        return conn

    def _init_db(self):
        with self.lock:
            with self._get_connection() as conn:
                conn.execute("""
                    CREATE TABLE IF NOT EXISTS idempotency_records (
                        key TEXT PRIMARY KEY,
                        created_at REAL NOT NULL,
                        in_progress INTEGER NOT NULL,
                        result_json TEXT
                    );
                """)
                conn.execute("CREATE INDEX IF NOT EXISTS idx_idempotency_created ON idempotency_records(created_at);")

    def _generate_key(self, email: str, phone: str, service: str, message: str, enquiry_type: str) -> str:
        raw_key = f"{email.lower().strip()}|{phone.strip()}|{service.strip().lower()}|{message.strip()[:100]}|{enquiry_type.lower()}"
        return hashlib.sha256(raw_key.encode("utf-8")).hexdigest()

    def _cleanup_expired(self, now: float):
        cutoff = now - self.window_seconds
        # Clean in-memory cache
        expired = [k for k, (ts, _, _) in self._cache.items() if ts < cutoff]
        for k in expired:
            del self._cache[k]

        # Clean SQLite database
        try:
            with self._get_connection() as conn:
                conn.execute("DELETE FROM idempotency_records WHERE created_at < ?;", (cutoff,))
        except Exception:
            pass

    def check_or_start(
        self,
        email: str,
        phone: str,
        service: str,
        message: str,
        enquiry_type: str
    ) -> Tuple[str, Optional[Dict[str, Any]]]:
        """
        Check if submission already exists or is in flight.
        Returns: (idempotency_key, cached_result)
        Raises: DuplicateSubmissionError if in flight.
        """
        now = time.time()
        key = self._generate_key(email, phone, service, message, enquiry_type)

        with self.lock:
            self._cleanup_expired(now)

            # 1. Check in-memory cache first
            if key in self._cache:
                ts, cached_result, in_progress = self._cache[key]
                if in_progress:
                    raise DuplicateSubmissionError(
                        "Your enquiry is currently being processed by SAP Business One. Please wait a moment."
                    )
                if cached_result is not None:
                    return key, cached_result

            # 2. Check persistent database
            with self._get_connection() as conn:
                cursor = conn.execute(
                    "SELECT in_progress, result_json FROM idempotency_records WHERE key = ?;",
                    (key,)
                )
                row = cursor.fetchone()
                if row:
                    in_progress = bool(row["in_progress"])
                    result_json = row["result_json"]
                    cached_result = json.loads(result_json) if result_json else None
                    self._cache[key] = (now, cached_result, in_progress)

                    if in_progress:
                        raise DuplicateSubmissionError(
                            "Your enquiry is currently being processed by SAP Business One. Please wait a moment."
                        )
                    if cached_result is not None:
                        return key, cached_result

                # 3. Register in-flight submission in DB and memory
                conn.execute(
                    "INSERT OR REPLACE INTO idempotency_records (key, created_at, in_progress, result_json) VALUES (?, ?, 1, NULL);",
                    (key, now)
                )

            self._cache[key] = (now, None, True)
            return key, None

    def complete(self, key: str, result: Dict[str, Any]):
        """Mark submission as completed and persist SAP result."""
        now = time.time()
        result_json = json.dumps(result)
        with self.lock:
            self._cache[key] = (now, result, False)
            try:
                with self._get_connection() as conn:
                    conn.execute(
                        "UPDATE idempotency_records SET in_progress = 0, result_json = ?, created_at = ? WHERE key = ?;",
                        (result_json, now, key)
                    )
            except Exception:
                pass

    def fail(self, key: str):
        """Remove in-flight record on failure so user can retry immediately."""
        with self.lock:
            if key in self._cache:
                del self._cache[key]
            try:
                with self._get_connection() as conn:
                    conn.execute("DELETE FROM idempotency_records WHERE key = ?;", (key,))
            except Exception:
                pass

    def clear(self):
        """Reset all records (primarily for testing)."""
        with self.lock:
            self._cache.clear()
            try:
                with self._get_connection() as conn:
                    conn.execute("DELETE FROM idempotency_records;")
            except Exception:
                pass


# Global singleton instance
idempotency_manager = IdempotencyManager(window_seconds=settings.DUPLICATE_WINDOW_SECONDS)
