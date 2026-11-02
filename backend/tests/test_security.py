import pytest
from app.config import Settings
from app.utils.validators import sanitize_text
from starlette.testclient import TestClient


def test_production_enforcement_disables_mock():
    """In production mode, mock fallback must be strictly disabled regardless of env input."""
    prod_settings = Settings(
        APP_ENV="production",
        MOCK_SAP_IN_DEV=True  # Attempt to enable mock in prod
    )
    assert prod_settings.is_production is True
    assert prod_settings.MOCK_SAP_IN_DEV is False


def test_production_cors_origins():
    """Production CORS must strictly adhere to configured origins."""
    settings = Settings(
        APP_ENV="production",
        FRONTEND_URL="https://atlastechnosoft.com, https://www.atlastechnosoft.com/"
    )
    assert settings.cors_origins == [
        "https://atlastechnosoft.com",
        "https://www.atlastechnosoft.com"
    ]


def test_no_sap_credentials_exposed_in_health(client: TestClient):
    """Verify health and diagnostics endpoints never leak SAP password or session tokens."""
    res = client.get("/api/v1/health")
    assert res.status_code == 200
    health_text = res.text.lower()
    assert "password" not in health_text
    assert "b1session" not in health_text

    res_sap = client.get("/api/v1/health/sap")
    assert res_sap.status_code == 200
    sap_text = res_sap.text.lower()
    assert "password" not in sap_text
    assert "b1session" not in sap_text


def test_xss_sanitization():
    """Verify malicious script tags and event handlers are escaped safely."""
    raw_payload = '<script>alert("xss")</script><img src="x" onerror="alert(1)">Hello & Welcome'
    sanitized = sanitize_text(raw_payload)
    assert "<script>" not in sanitized
    assert "&lt;script&gt;" in sanitized
    assert "onerror=" in sanitized
    assert "&lt;img" in sanitized

