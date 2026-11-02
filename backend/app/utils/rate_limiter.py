import time
from collections import defaultdict
from typing import Dict, List, Tuple
from fastapi import Request, HTTPException, status
from app.config import settings


class RateLimiter:
    """
    In-memory sliding window rate limiter for FastAPI endpoints.
    Tracks client request timestamps and enforces rate limits per IP address.
    """

    def __init__(self, requests_per_minute: int = 20, window_seconds: int = 60):
        self.requests_per_minute = requests_per_minute
        self.window_seconds = window_seconds
        # client_ip -> list of timestamps
        self._history: Dict[str, List[float]] = defaultdict(list)
        self._last_cleanup: float = time.time()

    def _get_client_ip(self, request: Request) -> str:
        """Extract client IP, taking into account trusted reverse proxies."""
        forwarded_for = request.headers.get("X-Forwarded-For")
        if forwarded_for:
            # First IP in X-Forwarded-For is the real client
            return forwarded_for.split(",")[0].strip()
        real_ip = request.headers.get("X-Real-IP")
        if real_ip:
            return real_ip.strip()
        if request.client and request.client.host:
            return request.client.host
        return "127.0.0.1"

    def _cleanup_old_entries(self, now: float):
        """Purge entries older than the window to prevent memory leaks."""
        if now - self._last_cleanup < 30:
            return
        cutoff = now - self.window_seconds
        stale_ips = []
        for ip, timestamps in self._history.items():
            valid_ts = [t for t in timestamps if t > cutoff]
            if valid_ts:
                self._history[ip] = valid_ts
            else:
                stale_ips.append(ip)
        for ip in stale_ips:
            del self._history[ip]
        self._last_cleanup = now

    def check(self, request: Request, max_requests: int = None, window_sec: int = None) -> Tuple[int, int]:
        """
        Check if request is within limits.
        Returns: (remaining_requests, reset_seconds)
        Raises HTTPException(429) if exceeded.
        """
        now = time.time()
        self._cleanup_old_entries(now)

        limit = max_requests or self.requests_per_minute
        window = window_sec or self.window_seconds

        client_ip = self._get_client_ip(request)
        timestamps = self._history[client_ip]

        # Filter out timestamps outside window
        cutoff = now - window
        active_timestamps = [t for t in timestamps if t > cutoff]
        self._history[client_ip] = active_timestamps

        if len(active_timestamps) >= limit:
            oldest = active_timestamps[0]
            retry_after = max(1, int(window - (now - oldest)))
            raise HTTPException(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                detail={
                    "message": f"Rate limit exceeded. Maximum {limit} submissions per minute permitted. Please retry in {retry_after} seconds.",
                    "error_type": "rate_limit_exceeded",
                    "retry_after_seconds": retry_after
                },
                headers={"Retry-After": str(retry_after)}
            )

        # Record this request
        active_timestamps.append(now)
        remaining = max(0, limit - len(active_timestamps))
        reset_in = int(window)
        return remaining, reset_in

    def reset(self):
        """Reset all rate limiter tracking."""
        self._history.clear()
        self._last_cleanup = time.time()


# Global instance
rate_limiter = RateLimiter(requests_per_minute=settings.RATE_LIMIT_PER_MINUTE)

