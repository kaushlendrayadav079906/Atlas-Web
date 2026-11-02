import pytest
from starlette.testclient import TestClient
from fastapi import Request, HTTPException
from app.utils.rate_limiter import RateLimiter


def test_rate_limiter_allows_under_limit():
    limiter = RateLimiter(requests_per_minute=5, window_seconds=60)
    
    class FakeRequest:
        def __init__(self, ip="192.168.1.10"):
            self.headers = {}
            self.client = type("Client", (), {"host": ip})()

    req = FakeRequest()
    for _ in range(5):
        remaining, _ = limiter.check(req)
        assert remaining >= 0


def test_rate_limiter_blocks_over_limit():
    limiter = RateLimiter(requests_per_minute=3, window_seconds=60)
    
    class FakeRequest:
        def __init__(self, ip="192.168.1.20"):
            self.headers = {}
            self.client = type("Client", (), {"host": ip})()

    req = FakeRequest()
    # 3 allowed
    for _ in range(3):
        limiter.check(req)

    # 4th should raise 429
    with pytest.raises(HTTPException) as exc_info:
        limiter.check(req)

    assert exc_info.value.status_code == 429
    assert exc_info.value.detail["error_type"] == "rate_limit_exceeded"
    assert "Retry-After" in exc_info.value.headers


def test_rate_limiter_distinguishes_different_ips():
    limiter = RateLimiter(requests_per_minute=2, window_seconds=60)
    
    class FakeRequest:
        def __init__(self, ip):
            self.headers = {}
            self.client = type("Client", (), {"host": ip})()

    req1 = FakeRequest("10.0.0.1")
    req2 = FakeRequest("10.0.0.2")

    # IP 1 uses all 2 tokens
    limiter.check(req1)
    limiter.check(req1)
    with pytest.raises(HTTPException):
        limiter.check(req1)

    # IP 2 should still be allowed
    remaining, _ = limiter.check(req2)
    assert remaining == 1

