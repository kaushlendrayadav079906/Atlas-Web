import hashlib
import time
from typing import Dict, Optional, Tuple, Any
from app.config import settings
from app.utils.exceptions import DuplicateSubmissionError


class IdempotencyManager:
    """
    In-memory idempotency and deduplication engine.
    Prevents duplicate submissions to SAP Business One within a configured time window.
    """
    def __init__(self, window_seconds: int = 300):
        self.window_seconds = window_seconds
        # hash -> (timestamp, sap_result_or_none, in_progress_bool)
        self._cache: Dict[str, Tuple[float, Optional[Dict[str, Any]], bool]] = {}

    def _generate_key(self, email: str, phone: str, service: str, message: str, enquiry_type: str) -> str:
        raw_key = f"{email.lower().strip()}|{phone.strip()}|{service.strip().lower()}|{message.strip()[:100]}|{enquiry_type.lower()}"
        return hashlib.sha256(raw_key.encode("utf-8")).hexdigest()

    def _cleanup_expired(self):
        now = time.time()
        expired = [k for k, (ts, _, _) in self._cache.items() if now - ts > self.window_seconds]
        for k in expired:
            del self._cache[k]

    def check_or_start(self, email: str, phone: str, service: str, message: str, enquiry_type: str) -> Tuple[str, Optional[Dict[str, Any]]]:
        """
        Check if submission already exists.
        Returns (idempotency_key, cached_result).
        If currently in progress, raises DuplicateSubmissionError.
        If already completed within window, returns (key, cached_result).
        If brand new, registers in_progress and returns (key, None).
        """
        self._cleanup_expired()
        key = self._generate_key(email, phone, service, message, enquiry_type)
        now = time.time()

        if key in self._cache:
            ts, cached_result, in_progress = self._cache[key]
            if in_progress:
                raise DuplicateSubmissionError("Your enquiry is currently being processed by SAP Business One. Please wait a moment.")
            if cached_result is not None:
                # Return cached result to prevent duplicate SAP entry
                return key, cached_result

        # Register in-flight request
        self._cache[key] = (now, None, True)
        return key, None

    def complete(self, key: str, result: Dict[str, Any]):
        """Save successful SAP result in cache for duplicate window."""
        self._cache[key] = (time.time(), result, False)

    def fail(self, key: str):
        """Release lock on failure so user can retry."""
        if key in self._cache:
            del self._cache[key]


# Global singleton instance
idempotency_manager = IdempotencyManager(window_seconds=settings.DUPLICATE_WINDOW_SECONDS)

