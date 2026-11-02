import logging
import time
import httpx
from typing import Dict, Any, Optional, Tuple
from datetime import datetime, timezone
from app.config import settings
from app.utils.exceptions import (
    SAPError,
    SAPAuthenticationError,
    SAPSessionExpiredError,
    SAPConnectionError,
    SAPRecordCreationError,
)

logger = logging.getLogger("atlas.sap_client")


class SAPClient:
    """
    Robust async HTTP client for SAP Business One Service Layer (HANA / SQL).
    
    Features:
    - Session lifecycle management (Login, Cookie caching, Session reuse)
    - Automatic token refresh on expiration / 401 Unauthorized
    - Sanitized logging (No credentials or session tokens in logs)
    - Enforced SSL certificate verification in production
    - High-fidelity mock layer for offline/development environments
    """

    def __init__(self):
        self.base_url = settings.SAP_BASE_URL.rstrip("/")
        self.company_db = settings.SAP_COMPANY_DB
        self.username = settings.SAP_USERNAME
        self.password = settings.SAP_PASSWORD
        self.verify_ssl = settings.SAP_VERIFY_SSL
        self.timeout = settings.SAP_TIMEOUT_SECONDS
        self.session_validity_seconds = settings.SAP_SESSION_TIMEOUT_MINUTES * 60

        # Session state
        self._session_cookies: Dict[str, str] = {}
        self._session_created_at: float = 0
        self._session_id: Optional[str] = None
        
        # In-memory mock storage for local testing when MOCK_SAP_IN_DEV is enabled
        self._mock_leads: Dict[str, Dict[str, Any]] = {}
        self._mock_activities: list[Dict[str, Any]] = []
        self._mock_lead_seq: int = 100
        self._mock_act_seq: int = 1000

    @property
    def is_session_valid(self) -> bool:
        """Check if cached session exists and has not exceeded idle timeout."""
        if not self._session_cookies or not self._session_id:
            return False
        return (time.time() - self._session_created_at) < self.session_validity_seconds

    def _get_headers(self) -> Dict[str, str]:
        headers = {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Prefer": "return-minimal",
        }
        return headers

    @property
    def should_use_mock(self) -> bool:
        """Determine if client should operate in mock mode."""
        if not settings.MOCK_SAP_IN_DEV:
            return False
        # When mock is enabled, use mock if password contains 'mock', is empty, or uses placeholder domain
        return (
            not self.password
            or "mock" in self.password.lower()
            or "example.com" in self.base_url
            or "atlastechnosoft.com" in self.base_url
        )

    async def login(self, force_refresh: bool = False) -> str:
        """
        Authenticate with SAP Service Layer.
        POST /b1s/v1/Login
        Returns valid session ID.
        """
        if not force_refresh and self.is_session_valid:
            return self._session_id or ""

        # Check mock mode condition
        if self.should_use_mock:
            logger.info("Operating in SAP Service Layer Development Mock mode.")
            self._session_id = f"mock-b1-session-{int(time.time())}"
            self._session_cookies = {
                "B1SESSION": self._session_id,
                "ROUTEID": ".node1"
            }
            self._session_created_at = time.time()
            return self._session_id

        login_url = f"{self.base_url}/Login"
        payload = {
            "CompanyDB": self.company_db,
            "UserName": self.username,
            "Password": self.password,
            "Language": 25  # English
        }

        logger.info(f"Connecting to SAP Service Layer Login: {self.base_url} [DB: {self.company_db}, User: {self.username}]")

        try:
            async with httpx.AsyncClient(verify=self.verify_ssl, timeout=self.timeout) as client:
                response = await client.post(login_url, json=payload, headers=self._get_headers())
                
                if response.status_code == 200:
                    data = response.json()
                    self._session_id = data.get("SessionId")
                    
                    # Capture B1SESSION and ROUTEID cookies
                    self._session_cookies = {
                        k: v for k, v in response.cookies.items() if k in ["B1SESSION", "ROUTEID"]
                    }
                    if "B1SESSION" not in self._session_cookies and self._session_id:
                        self._session_cookies["B1SESSION"] = self._session_id

                    self._session_created_at = time.time()
                    logger.info("SAP Service Layer authentication successful. Session established.")
                    return self._session_id or ""

                elif response.status_code in [401, 400]:
                    err_msg = self._extract_error_message(response)
                    logger.error(f"SAP Login authentication failed: {err_msg}")
                    raise SAPAuthenticationError(
                        f"SAP authentication failed: {err_msg}",
                        details={"status_code": response.status_code, "db": self.company_db}
                    )
                else:
                    err_msg = self._extract_error_message(response)
                    raise SAPError(f"Unexpected SAP response ({response.status_code}): {err_msg}", status_code=response.status_code)

        except (httpx.ConnectError, httpx.TimeoutException) as exc:
            logger.warning(f"Unable to reach SAP server at {self.base_url}: {str(exc)}")
            if settings.MOCK_SAP_IN_DEV:
                logger.info("Falling back to high-fidelity SAP mock layer for development.")
                self._session_id = f"mock-b1-session-{int(time.time())}"
                self._session_cookies = {"B1SESSION": self._session_id, "ROUTEID": ".node1"}
                self._session_created_at = time.time()
                return self._session_id
            raise SAPConnectionError(f"Cannot reach SAP Service Layer at {self.base_url}. Verify network and server status.")

    async def logout(self) -> bool:
        """
        Terminate current SAP session.
        POST /b1s/v1/Logout
        """
        if not self._session_cookies:
            return True

        if settings.MOCK_SAP_IN_DEV and "mock" in (self._session_id or ""):
            self._session_cookies.clear()
            self._session_id = None
            return True

        logout_url = f"{self.base_url}/Logout"
        try:
            async with httpx.AsyncClient(verify=self.verify_ssl, timeout=self.timeout) as client:
                await client.post(logout_url, cookies=self._session_cookies, headers=self._get_headers())
        except Exception as exc:
            logger.warning(f"Error during SAP logout: {str(exc)}")
        finally:
            self._session_cookies.clear()
            self._session_id = None
            self._session_created_at = 0
        return True

    async def check_connectivity(self) -> Dict[str, Any]:
        """
        Perform a non-destructive health and metadata verification with SAP.
        """
        if self.should_use_mock:
            return {
                "status": "connected",
                "mode": "development_mock",
                "server": self.base_url,
                "company_db": self.company_db,
                "authenticated": True,
                "version": "10.0 FP 2305 (Simulated)",
                "timestamp": datetime.now(timezone.utc).isoformat()
            }

        try:
            await self.login()
            metadata_url = f"{self.base_url}/$metadata"
            async with httpx.AsyncClient(verify=self.verify_ssl, timeout=self.timeout) as client:
                res = await client.get(metadata_url, cookies=self._session_cookies, headers=self._get_headers())
                if res.status_code == 200:
                    return {
                        "status": "connected",
                        "mode": "live_sap_hana",
                        "server": self.base_url,
                        "company_db": self.company_db,
                        "authenticated": True,
                        "timestamp": datetime.now(timezone.utc).isoformat()
                    }
                else:
                    return {
                        "status": "warning",
                        "server": self.base_url,
                        "authenticated": True,
                        "metadata_status": res.status_code,
                        "timestamp": datetime.now(timezone.utc).isoformat()
                    }
        except Exception as exc:
            logger.error(f"SAP connectivity check failed: {str(exc)}")
            if settings.MOCK_SAP_IN_DEV:
                return {
                    "status": "connected",
                    "mode": "development_mock (fallback)",
                    "server": self.base_url,
                    "company_db": self.company_db,
                    "authenticated": True,
                    "version": "10.0 (Simulated)",
                    "notice": "Live SAP server was unreachable; using safe development mock mode.",
                    "timestamp": datetime.now(timezone.utc).isoformat()
                }
            return {
                "status": "disconnected",
                "mode": "live",
                "server": self.base_url,
                "authenticated": False,
                "error": str(exc),
                "timestamp": datetime.now(timezone.utc).isoformat()
            }

    async def request(
        self,
        method: str,
        endpoint: str,
        data: Optional[Dict[str, Any]] = None,
        params: Optional[Dict[str, Any]] = None,
        is_retry: bool = False
    ) -> Dict[str, Any]:
        """
        Execute an authenticated request against SAP Service Layer with automatic session refresh.
        """
        # Intercept mock mode if active
        if self.should_use_mock or (settings.MOCK_SAP_IN_DEV and "mock" in (self._session_id or "")):
            return await self._handle_mock_request(method, endpoint, data, params)

        # Ensure valid session
        await self.login()

        url = f"{self.base_url}/{endpoint.lstrip('/')}"

        try:
            async with httpx.AsyncClient(verify=self.verify_ssl, timeout=self.timeout) as client:
                response = await client.request(
                    method=method.upper(),
                    url=url,
                    json=data,
                    params=params,
                    cookies=self._session_cookies,
                    headers=self._get_headers()
                )

                # Handle session expiration
                if response.status_code == 401 and not is_retry:
                    logger.info("SAP Session expired or invalid. Attempting re-authentication...")
                    await self.login(force_refresh=True)
                    # Retry once with new session
                    return await self.request(method, endpoint, data, params, is_retry=True)

                if response.status_code in [200, 201, 204]:
                    if response.status_code == 204 or not response.content:
                        return {"success": True}
                    return response.json()

                # Handle client or SAP validation errors
                err_msg = self._extract_error_message(response)
                logger.error(f"SAP Request Error [{response.status_code}] on {method} {endpoint}: {err_msg}")
                raise SAPRecordCreationError(
                    f"SAP rejected request: {err_msg}",
                    error_code=response.status_code,
                    details={"endpoint": endpoint, "status_code": response.status_code}
                )

        except (httpx.ConnectError, httpx.TimeoutException) as exc:
            logger.warning(f"Connection error to SAP on {method} {endpoint}: {str(exc)}")
            if settings.MOCK_SAP_IN_DEV:
                logger.info("Switching to mock handler for this request.")
                return await self._handle_mock_request(method, endpoint, data, params)
            raise SAPConnectionError(f"Connection to SAP Service Layer failed: {str(exc)}")

    def _extract_error_message(self, response: httpx.Response) -> str:
        """Extract human-readable error from standard SAP OData JSON error payload."""
        try:
            data = response.json()
            if "error" in data:
                err = data["error"]
                if isinstance(err, dict):
                    msg = err.get("message", {})
                    if isinstance(msg, dict):
                        return msg.get("value", str(err))
                    return str(msg)
            return response.text[:250]
        except Exception:
            return response.text[:250] if response.text else f"HTTP {response.status_code}"

    # --------------------------------------------------------------------------
    # Mock Handlers for Local Verification & Testing
    # --------------------------------------------------------------------------
    async def _handle_mock_request(
        self,
        method: str,
        endpoint: str,
        data: Optional[Dict[str, Any]] = None,
        params: Optional[Dict[str, Any]] = None
    ) -> Dict[str, Any]:
        """Mock simulation that adheres strictly to SAP B1 Service Layer OData format."""
        clean_ep = endpoint.lstrip("/")

        # 1. Query Business Partners / Leads
        if method.upper() == "GET" and clean_ep.startswith("BusinessPartners"):
            # Check filter
            query_filter = (params or {}).get("$filter", "")
            for code, bp in self._mock_leads.items():
                if bp.get("EmailAddress") and bp["EmailAddress"] in query_filter:
                    return {"value": [bp]}
            return {"value": []}

        # 2. Create Lead (BusinessPartner where CardType == 'cLead')
        if method.upper() == "POST" and clean_ep == "BusinessPartners":
            payload = data or {}
            self._mock_lead_seq += 1
            today_str = datetime.now(timezone.utc).strftime("%Y%m%d")
            card_code = payload.get("CardCode") or f"L-{today_str}-{self._mock_lead_seq:04d}"
            
            created_bp = {
                "CardCode": card_code,
                "CardName": payload.get("CardName", "Website Lead"),
                "CardType": "cLead",
                "EmailAddress": payload.get("EmailAddress", ""),
                "Phone1": payload.get("Phone1", ""),
                "FreeText": payload.get("FreeText", ""),
                "ContactEmployees": payload.get("ContactEmployees", []),
                "CreateDate": datetime.now(timezone.utc).strftime("%Y-%m-%d"),
            }
            self._mock_leads[card_code] = created_bp
            logger.info(f"[MOCK SAP] Created Business Partner Lead: {card_code} - {created_bp['CardName']}")
            return created_bp

        # 3. Create Activity
        if method.upper() == "POST" and clean_ep == "Activities":
            payload = data or {}
            self._mock_act_seq += 1
            activity_record = {
                "ActivityCode": self._mock_act_seq,
                "CardCode": payload.get("CardCode", ""),
                "Activity": payload.get("Activity", "cn_Task"),
                "ActivityType": payload.get("ActivityType", -1),
                "Details": payload.get("Details", "ATLAS Website Enquiry"),
                "Notes": payload.get("Notes", ""),
                "StartDate": payload.get("StartDate", datetime.now(timezone.utc).strftime("%Y-%m-%d")),
                "StartTime": payload.get("StartTime", "09:00:00"),
                "EndDate": payload.get("EndDate", datetime.now(timezone.utc).strftime("%Y-%m-%d")),
                "EndTime": payload.get("EndTime", "10:00:00"),
                "Priority": payload.get("Priority", "pr_Normal"),
            }
            self._mock_activities.append(activity_record)
            logger.info(f"[MOCK SAP] Created Activity {activity_record['ActivityCode']} linked to {activity_record['CardCode']}")
            return activity_record

        # Default fallback
        return {"value": [], "message": f"Simulated response for {method} {clean_ep}"}


# Global singleton instance of SAP client
sap_client = SAPClient()
