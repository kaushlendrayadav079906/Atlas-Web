from starlette.testclient import TestClient


def test_get_backend_health(client: TestClient):
    response = client.get("/api/v1/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert "service" in data
    assert "environment" in data
    assert "timestamp" in data


def test_get_sap_health(client: TestClient):
    response = client.get("/api/v1/health/sap")
    assert response.status_code == 200
    data = response.json()
    assert "status" in data
    assert "authenticated" in data
    # Ensure sensitive secrets are not exposed
    assert "password" not in data
    assert "B1SESSION" not in str(data)
    assert "Set-Cookie" not in str(data)

