import os
import sys
import asyncio
import pytest

# Set selector event loop policy on Windows to prevent Proactor IOCP hangs
if sys.platform == "win32":
    asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())

from starlette.testclient import TestClient

# Ensure backend root is on sys.path
backend_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

from app.main import app
from app.config import settings
from app.integrations.sap_client import sap_client
from app.utils.idempotency import idempotency_manager


@pytest.fixture(autouse=True)
def reset_state():
    """Reset idempotency cache and mock client before each test."""
    idempotency_manager._cache.clear()
    sap_client._mock_leads.clear()
    sap_client._mock_activities.clear()
    sap_client._session_cookies.clear()
    sap_client._session_id = None
    sap_client._session_created_at = 0
    yield


@pytest.fixture
def client():
    """Synchronous test client for FastAPI routes."""
    with TestClient(app) as test_client:
        yield test_client
