import pytest
import time
from app.integrations.sap_client import SAPClient
from app.config import settings


@pytest.mark.asyncio
async def test_sap_client_login_and_session_reuse():
    client = SAPClient()
    # Initial state
    assert not client.is_session_valid

    # Login
    session_id = await client.login()
    assert session_id is not None
    assert len(session_id) > 0
    assert client.is_session_valid
    assert "B1SESSION" in client._session_cookies

    # Second login should reuse existing valid session without making new network calls
    reused_id = await client.login()
    assert reused_id == session_id


@pytest.mark.asyncio
async def test_sap_client_logout():
    client = SAPClient()
    await client.login()
    assert client.is_session_valid

    # Perform logout
    logged_out = await client.logout()
    assert logged_out is True
    assert not client.is_session_valid
    assert len(client._session_cookies) == 0
    assert client._session_id is None


@pytest.mark.asyncio
async def test_sap_client_check_connectivity():
    client = SAPClient()
    status_info = await client.check_connectivity()
    assert status_info["status"] == "connected"
    assert status_info["authenticated"] is True
    assert "server" in status_info
    # Crucially ensure password or session cookie is NOT exposed
    assert "password" not in status_info
    assert "B1SESSION" not in str(status_info)


@pytest.mark.asyncio
async def test_sap_lead_and_activity_creation():
    client = SAPClient()
    # 1. Create Lead BusinessPartner
    lead_data = {
        "CardName": "Simulated Corp Ltd",
        "CardType": "cLead",
        "EmailAddress": "sim@corp.com",
        "Phone1": "+91 93723 29599"
    }
    lead_res = await client.request("POST", "BusinessPartners", data=lead_data)
    assert "CardCode" in lead_res
    card_code = lead_res["CardCode"]
    assert card_code.startswith("L-")

    # 2. Query Lead
    query_res = await client.request(
        "GET",
        "BusinessPartners",
        params={"$filter": "EmailAddress eq 'sim@corp.com' and CardType eq 'cLead'"}
    )
    assert len(query_res["value"]) == 1
    assert query_res["value"][0]["CardCode"] == card_code

    # 3. Create Activity
    act_data = {
        "CardCode": card_code,
        "Activity": "cn_Meeting",
        "Details": "Strategic Consultation",
        "Notes": "Discuss SAP B1 upgrade."
    }
    act_res = await client.request("POST", "Activities", data=act_data)
    assert "ActivityCode" in act_res
    assert act_res["CardCode"] == card_code


@pytest.mark.asyncio
async def test_sap_login_failure(monkeypatch):
    from unittest.mock import AsyncMock, MagicMock
    import httpx
    from app.utils.exceptions import SAPAuthenticationError

    client = SAPClient()
    monkeypatch.setattr(settings, "MOCK_SAP_IN_DEV", False)

    mock_resp = MagicMock(spec=httpx.Response)
    mock_resp.status_code = 401
    mock_resp.json.return_value = {"error": {"message": {"value": "Invalid credentials or company DB"}}}

    mock_post = AsyncMock(return_value=mock_resp)
    monkeypatch.setattr(httpx.AsyncClient, "post", mock_post)

    with pytest.raises(SAPAuthenticationError, match="SAP authentication failed"):
        await client.login(force_refresh=True)


@pytest.mark.asyncio
async def test_sap_connection_unavailable(monkeypatch):
    from unittest.mock import AsyncMock
    import httpx
    from app.utils.exceptions import SAPConnectionError

    client = SAPClient()
    monkeypatch.setattr(settings, "MOCK_SAP_IN_DEV", False)

    mock_post = AsyncMock(side_effect=httpx.ConnectError("Connection refused by SAP host"))
    monkeypatch.setattr(httpx.AsyncClient, "post", mock_post)

    with pytest.raises(SAPConnectionError, match="Cannot reach SAP Service Layer"):
        await client.login(force_refresh=True)


@pytest.mark.asyncio
async def test_sap_record_creation_failure(monkeypatch):
    from unittest.mock import AsyncMock, MagicMock
    import httpx
    from app.utils.exceptions import SAPRecordCreationError

    client = SAPClient()
    monkeypatch.setattr(settings, "MOCK_SAP_IN_DEV", False)
    monkeypatch.setattr(SAPClient, "is_session_valid", property(lambda self: True))
    client._session_cookies = {"B1SESSION": "dummy-session"}

    mock_resp = MagicMock(spec=httpx.Response)
    mock_resp.status_code = 400
    mock_resp.json.return_value = {"error": {"message": {"value": "Mandatory UDF U_Industry is missing"}}}

    mock_req = AsyncMock(return_value=mock_resp)
    monkeypatch.setattr(httpx.AsyncClient, "request", mock_req)

    with pytest.raises(SAPRecordCreationError, match="Mandatory UDF U_Industry is missing"):
        await client.request("POST", "BusinessPartners", data={"CardName": "Bad Payload"})


@pytest.mark.asyncio
async def test_sap_session_expiration_and_auto_reauth(monkeypatch):
    from unittest.mock import AsyncMock, MagicMock
    import httpx

    client = SAPClient()
    monkeypatch.setattr(settings, "MOCK_SAP_IN_DEV", False)
    monkeypatch.setattr(SAPClient, "is_session_valid", property(lambda self: True))
    client._session_cookies = {"B1SESSION": "expired-session"}
    client._session_id = "expired-session"
    client._session_created_at = time.time()

    call_count = 0

    async def mock_request_fn(self_client, method, url, **kwargs):
        nonlocal call_count
        call_count += 1
        resp = MagicMock(spec=httpx.Response)
        if call_count == 1:
            resp.status_code = 401
            resp.json.return_value = {"error": {"message": {"value": "Session expired"}}}
        else:
            resp.status_code = 200
            resp.json.return_value = {"CardCode": "L-REAUTH-001"}
        return resp

    async def mock_login(force_refresh=False):
        client._session_cookies = {"B1SESSION": "fresh-session-123"}
        client._session_id = "fresh-session-123"
        return "fresh-session-123"

    monkeypatch.setattr(client, "login", mock_login)
    monkeypatch.setattr(httpx.AsyncClient, "request", mock_request_fn)

    res = await client.request("POST", "BusinessPartners", data={"CardName": "Test Corp"})
    assert res["CardCode"] == "L-REAUTH-001"
    assert call_count == 2
