import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.utils.rate_limiter import rate_limiter

client = TestClient(app)


@pytest.fixture(autouse=True)
def reset_limiter():
    rate_limiter.reset()
    yield
    rate_limiter.reset()


def test_get_chat_suggestions():
    """Verify chatbot suggestions endpoint returns welcome text and topic pills."""
    response = client.get("/api/v1/chat/suggestions")
    assert response.status_code == 200
    data = response.json()
    assert "welcomeMessage" in data
    assert "suggestedQuestions" in data
    assert "SAP Business One" in data["suggestedQuestions"]
    assert "Boyum IT Solutions" in data["suggestedQuestions"]
    assert "UiPath Automation" in data["suggestedQuestions"]
    assert len(data["quickActions"]) > 0


def test_chat_sap_business_one_query():
    """Verify accurate knowledge response for SAP Business One."""
    payload = {
        "message": "What is SAP Business One?",
        "sessionId": "test-session-123"
    }
    response = client.post("/api/v1/chat", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert "SAP Business One is an integrated ERP solution" in data["reply"]
    assert "Would you like to speak with our SAP team?" in data["reply"]
    assert data["sessionId"] == "test-session-123"
    assert any(a["type"] == "consultation" for a in data["quickActions"])
    assert any(a["type"] == "whatsapp" for a in data["quickActions"])


def test_chat_boyum_it_query():
    """Verify Boyum IT solutions answer covers Beas, Produmex, and B1UP."""
    payload = {"message": "Tell me about Boyum IT solutions"}
    response = client.post("/api/v1/chat", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "Beas Manufacturing" in data["reply"]
    assert "Produmex WMS" in data["reply"]
    assert "B1 Usability Package" in data["reply"]


def test_chat_uipath_query():
    """Verify UiPath and RPA automation response."""
    payload = {"message": "How can UiPath automation help our business?"}
    response = client.post("/api/v1/chat", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "UiPath" in data["reply"]
    assert "invoice processing" in data["reply"].lower() or "repetitive" in data["reply"].lower()


def test_chat_contact_and_offices_query():
    """Verify contact details and Mumbai office addresses."""
    payload = {"message": "Where are your offices located and how do I contact you?"}
    response = client.post("/api/v1/chat", json=payload)
    assert response.status_code == 200
    data = response.json()
    reply = data["reply"]
    assert "sales@atlastechnosoft.com" in reply
    assert "93723 29599" in reply
    assert "Borivali" in reply
    assert "Marine Lines" in reply


def test_chat_pricing_query_no_hallucination():
    """Verify pricing queries do not invent figures and offer consultations."""
    payload = {"message": "How much does SAP Business One cost?"}
    response = client.post("/api/v1/chat", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "do not publish generic prices" in data["reply"].lower()
    assert any(a["type"] == "consultation" for a in data["quickActions"])


def test_chat_unknown_query_polite_fallback():
    """Verify unanswerable queries fallback gracefully without making false claims."""
    payload = {"message": "Can you service a motorcycle engine?"}
    response = client.post("/api/v1/chat", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "don't have that specific detail in our verified company knowledge base" in data["reply"]
    assert any(a["type"] == "whatsapp" for a in data["quickActions"])


def test_chat_empty_message_validation():
    """Verify blank or empty messages are rejected with 422."""
    payload = {"message": "   "}
    response = client.post("/api/v1/chat", json=payload)
    assert response.status_code == 422


def test_chat_xss_sanitization():
    """Verify HTML script tags are sanitized."""
    payload = {"message": "<script>alert('xss')</script>What is SAP?"}
    response = client.post("/api/v1/chat", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    # Successfully parsed as "What is SAP?"
    assert "SAP Business One" in data["reply"]


def test_chat_rate_limiting():
    """Verify rate limiter triggers HTTP 429 when threshold is exceeded."""
    client_ip_headers = {"X-Forwarded-For": "198.51.100.99"}
    payload = {"message": "What is SAP?"}

    # Execute 30 requests (the limit)
    for _ in range(30):
        res = client.post("/api/v1/chat", json=payload, headers=client_ip_headers)
        assert res.status_code == 200

    # 31st request must trigger 429
    res = client.post("/api/v1/chat", json=payload, headers=client_ip_headers)
    assert res.status_code == 429
    assert "Retry-After" in res.headers
