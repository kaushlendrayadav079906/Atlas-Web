import pytest
from starlette.testclient import TestClient


def test_submit_consultation_full_success(client: TestClient):
    payload = {
        "fullName": "Deepak Mehta",
        "email": "deepak.mehta@mfgtech.com",
        "phone": "+91 93222 88990",
        "companyName": "Mehta Precision Tools",
        "service": "Boyum IT Solutions",
        "message": "We need an architectural review of Beas Manufacturing for discrete planning.",
        "preferredDate": "2026-11-15",
        "preferredTime": "15:00 - 16:00 IST"
    }
    response = client.post("/api/v1/consultations", json=payload)
    assert response.status_code == 201
    data = response.json()
    assert data["success"] is True
    assert data["status"] == "success"
    assert "sapCardCode" in data
    assert "sapActivityId" in data
    assert data["referenceId"].startswith("ATPL-CON-")
    assert data["preferredDate"] == "2026-11-15"
    assert data["preferredTime"] == "15:00 - 16:00 IST"


def test_submit_consultation_without_optional_fields(client: TestClient):
    payload = {
        "fullName": "Rohan Deshmukh",
        "email": "rohan.deshmukh@tradehub.in",
        "phone": "+91 91678 12345",
        "companyName": "TradeHub Global",
        "service": "SAP Business One",
        "message": "Consultation on multi-currency trading add-on and customs documentation."
    }
    response = client.post("/api/v1/consultations", json=payload)
    assert response.status_code == 201
    data = response.json()
    assert data["success"] is True
    assert data["preferredDate"] is None
    assert data["preferredTime"] is None


def test_submit_consultation_validation_failure(client: TestClient):
    payload = {
        "fullName": "D",  # too short
        "email": "bademail",
        "phone": "invalid",
        "companyName": "",
        "service": "SAP",
        "message": "hi"  # too short
    }
    response = client.post("/api/v1/consultations", json=payload)
    assert response.status_code == 422
    data = response.json()
    assert data["success"] is False
    assert len(data["errors"]) >= 4

