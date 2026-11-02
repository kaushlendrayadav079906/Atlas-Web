import pytest
from starlette.testclient import TestClient


def test_submit_contact_enquiry_success(client: TestClient):
    payload = {
        "fullName": "Amit Verma",
        "email": "amit.verma@enterprise.in",
        "phone": "+91 98200 54321",
        "companyName": "Verma Logistics Pvt Ltd",
        "service": "SAP Business One Implementation",
        "message": "We would like to discuss implementing SAP Business One with Produmex WMS for our 3 warehouses."
    }
    response = client.post("/api/v1/contact", json=payload)
    assert response.status_code == 201
    data = response.json()
    assert data["success"] is True
    assert data["status"] == "success"
    assert "sapCardCode" in data
    assert data["sapCardCode"].startswith("L-")
    assert "sapActivityId" in data
    assert "referenceId" in data
    assert data["referenceId"].startswith("ATPL-ENQ-")


def test_submit_contact_enquiry_invalid_email(client: TestClient):
    payload = {
        "fullName": "Amit Verma",
        "email": "not-an-email",
        "phone": "+91 98200 54321",
        "companyName": "Verma Logistics",
        "service": "SAP Business One",
        "message": "Valid requirement message text here."
    }
    response = client.post("/api/v1/contact", json=payload)
    assert response.status_code == 422
    data = response.json()
    assert data["success"] is False
    assert any(err["field"] == "email" for err in data["errors"])


def test_submit_contact_enquiry_missing_fields(client: TestClient):
    payload = {
        "fullName": "Amit Verma",
        # missing email, phone, companyName
        "message": "Short"
    }
    response = client.post("/api/v1/contact", json=payload)
    assert response.status_code == 422
    data = response.json()
    assert data["success"] is False
    assert len(data["errors"]) >= 3


def test_submit_contact_enquiry_invalid_phone(client: TestClient):
    payload = {
        "fullName": "Amit Verma",
        "email": "amit@verma.com",
        "phone": "123",  # too short
        "companyName": "Verma Logistics",
        "service": "SAP Business One",
        "message": "Detailed requirements for our ERP upgrade."
    }
    response = client.post("/api/v1/contact", json=payload)
    assert response.status_code == 422
    data = response.json()
    assert any(err["field"] == "phone" for err in data["errors"])


def test_submit_contact_enquiry_duplicate_protection(client: TestClient):
    payload = {
        "fullName": "Sunita Rao",
        "email": "sunita.rao@techcorp.in",
        "phone": "+91 98111 22233",
        "companyName": "TechCorp India",
        "service": "UiPath RPA & AI Automation",
        "message": "Interested in invoice automated processing with UiPath robots and SAP integration."
    }
    # First submission
    res1 = client.post("/api/v1/contact", json=payload)
    assert res1.status_code == 201
    card1 = res1.json()["sapCardCode"]
    ref1 = res1.json()["referenceId"]

    # Second submission with identical data within duplicate window
    res2 = client.post("/api/v1/contact", json=payload)
    assert res2.status_code == 201
    # Returns the cached result without creating a duplicate in SAP
    assert res2.json()["sapCardCode"] == card1
    assert res2.json()["referenceId"] == ref1

