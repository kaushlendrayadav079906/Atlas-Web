from datetime import datetime, timezone
from fastapi import APIRouter, status
from app.config import settings
from app.integrations.sap_client import sap_client

router = APIRouter(prefix="/health", tags=["Health & Diagnostics"])


@router.get(
    "",
    status_code=status.HTTP_200_OK,
    summary="Backend Health Status",
    description="Returns backend uptime, version, and operational status."
)
async def get_backend_health():
    return {
        "status": "healthy",
        "service": settings.APP_NAME,
        "environment": settings.APP_ENV,
        "timestamp": datetime.now(timezone.utc).isoformat()
    }


@router.get(
    "/sap",
    status_code=status.HTTP_200_OK,
    summary="SAP Business One Connectivity Check",
    description="Validates Service Layer connection and metadata without exposing credentials or session cookies."
)
async def get_sap_health():
    connectivity = await sap_client.check_connectivity()
    return connectivity

