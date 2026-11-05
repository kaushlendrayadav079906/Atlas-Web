import pytest
from unittest.mock import patch
from starlette.testclient import TestClient
from app.integrations.sap_client import sap_client
from app.utils.exceptions import SAPError


def test_submit_callback_success(client: TestClient):
    """Verify successful callback request creates Lead + Phone Call Activity in SAP."""
    payload = {
        "fullName": "Amitabh Khare",
        "email": "amitabh.k@mfgsol.in",
        "phone": "+91 98200 44556",
        "companyName": "Khare Precision Industries",
        "service": "Manufacturing Solutions (Beas Manufacturing)",
        "preferredDate": "2026-11-20",
        "preferredTime": "Morning (10:00 AM - 1:00 PM IST)",
        "message": "Need a quick callback regarding machine scheduling and work centers in SAP B1.",
        "consent": True
    }
    response = client.post("/api/v1/callbacks", json=payload)
    assert response.status_code == 201
    data = response.json()
    assert data["success"] is True
    assert data["status"] == "success"
    assert "sapCardCode" in data
    assert data["sapCardCode"].startswith("L-")
    assert "sapActivityId" in data
    assert data["referenceId"].startswith("ATPL-CB-")
    assert data["preferredDate"] == "2026-11-20"
    assert data["preferredTime"] == "Morning (10:00 AM - 1:00 PM IST)"


def test_submit_callback_activity_is_phone_conversation(client: TestClient):
    """Verify callback activity in SAP B1 uses 'cn_Conversation' (Phone Call)."""
    payload = {
        "fullName": "Pooja Hegde",
        "email": "pooja.h@distributorpvtltd.com",
        "phone": "+91 99887 66554",
        "companyName": "Hegde Logistics & Distribution",
        "service": "Warehouse Management Solutions",
        "preferredDate": "2026-11-22",
        "preferredTime": "Afternoon (2:00 PM - 5:00 PM IST)",
        "message": "Discuss Produmex WMS barcode scanner integration.",
        "consent": True
    }
    response = client.post("/api/v1/callbacks", json=payload)
    assert response.status_code == 201

    # Verify mock activity was logged with cn_Conversation
    assert len(sap_client._mock_activities) > 0
    latest_activity = sap_client._mock_activities[-1]
    assert latest_activity["Activity"] == "cn_Conversation"
    assert "Callback Request" in latest_activity["Details"]
    assert "Requested Callback Slot" in latest_activity["Notes"]


def test_submit_callback_lead_reconciliation(client: TestClient):
    """Verify recurring prospect callback reuses existing SAP Lead code."""
    payload1 = {
        "fullName": "Siddharth Verma",
        "email": "siddharth.v@acmecorp.com",
        "phone": "+91 98111 22334",
        "companyName": "Acme Corp Ltd",
        "service": "SAP Business One Implementation",
        "preferredDate": "2026-11-18",
        "preferredTime": "Morning (10:00 AM - 1:00 PM IST)",
        "message": "First query regarding ERP implementation.",
        "consent": True
    }
    res1 = client.post("/api/v1/callbacks", json=payload1)
    assert res1.status_code == 201
    card_code_1 = res1.json()["sapCardCode"]

    # Second callback enquiry with different message and time
    payload2 = {
        "fullName": "Siddharth Verma",
        "email": "siddharth.v@acmecorp.com",
        "phone": "+91 98111 22334",
        "companyName": "Acme Corp Ltd",
        "service": "Finance Automation Solutions",
        "preferredDate": "2026-11-25",
        "preferredTime": "Evening (5:00 PM - 7:00 PM IST)",
        "message": "Second query regarding OCR invoice automation.",
        "consent": True
    }
    res2 = client.post("/api/v1/callbacks", json=payload2)
    assert res2.status_code == 201
    card_code_2 = res2.json()["sapCardCode"]

    # Must reuse existing CardCode
    assert card_code_1 == card_code_2


def test_submit_callback_duplicate_protection(client: TestClient):
    """Verify duplicate submission within window returns HTTP 409 Conflict."""
    payload = {
        "fullName": "Kavita Rao",
        "email": "kavita.rao@raoconsulting.in",
        "phone": "+91 98222 33445",
        "companyName": "Rao Consulting Services",
        "service": "Support & Maintenance (AMS)",
        "preferredDate": "2026-11-19",
        "preferredTime": "Morning (10:00 AM - 1:00 PM IST)",
        "message": "Need callback to discuss 24/7 SLA coverage.",
        "consent": True
    }
    res1 = client.post("/api/v1/callbacks", json=payload)
    assert res1.status_code == 201

    # Exact duplicate submission in progress or repeated
    res2 = client.post("/api/v1/callbacks", json=payload)
    # Returns either 409 or cached 201 if completed
    assert res2.status_code in [201, 409]
    if res2.status_code == 201:
        assert res2.json()["referenceId"] == res1.json()["referenceId"]


def test_submit_callback_validation_missing_required(client: TestClient):
    """Verify validation errors on malformed or incomplete callback requests."""
    payload = {
        "fullName": "",  # invalid
        "email": "not-an-email",  # invalid
        "phone": "123",  # invalid (< 7 digits)
        "companyName": "",  # invalid
        "service": "",  # invalid
        "preferredDate": "",  # invalid
        "preferredTime": "",  # invalid
        "consent": False  # invalid (must be True)
    }
    response = client.post("/api/v1/callbacks", json=payload)
    assert response.status_code == 422
    data = response.json()
    assert data["success"] is False
    assert len(data["errors"]) >= 6


def test_submit_callback_consent_required(client: TestClient):
    """Verify that consent=False is explicitly rejected with 422."""
    payload = {
        "fullName": "Gaurav Joshi",
        "email": "gaurav.j@joshienterprises.com",
        "phone": "+91 98450 12345",
        "companyName": "Joshi Enterprises",
        "service": "ATLAS Proprietary Add-ons",
        "preferredDate": "2026-11-21",
        "preferredTime": "Afternoon (2:00 PM - 5:00 PM IST)",
        "message": "Callback regarding EXIM documentation module.",
        "consent": False
    }
    response = client.post("/api/v1/callbacks", json=payload)
    assert response.status_code == 422
    data = response.json()
    assert any("consent" in str(err["field"]).lower() for err in data["errors"])


def test_submit_callback_sap_failure(client: TestClient):
    """Verify graceful 502 Bad Gateway response when SAP Service Layer fails."""
    payload = {
        "fullName": "Naveen Saxena",
        "email": "naveen@saxenalogistics.in",
        "phone": "+91 97654 32109",
        "companyName": "Saxena Logistics",
        "service": "Logistics & Shipping Solutions",
        "preferredDate": "2026-11-22",
        "preferredTime": "Morning (10:00 AM - 1:00 PM IST)",
        "message": "Callback for freight suite demonstration.",
        "consent": True
    }
    with patch.object(sap_client, "request", side_effect=SAPError("SAP HANA connection timeout")):
        response = client.post("/api/v1/callbacks", json=payload)
        assert response.status_code == 502
        data = response.json()
        assert data["detail"]["error_type"] == "sap_service_error"

