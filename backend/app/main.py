import sys
import asyncio
import logging

# Set selector event loop policy on Windows to prevent Proactor IOCP hangs
if sys.platform == "win32":
    asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())

from contextlib import asynccontextmanager
from fastapi import FastAPI, Request, status
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import RequestValidationError

from app.config import settings
from app.api.v1.contact import router as contact_router
from app.api.v1.consultations import router as consultation_router
from app.api.v1.callbacks import router as callback_router
from app.api.v1.health import router as health_router
from app.api.v1.chat import router as chat_router
from app.integrations.sap_client import sap_client

# Configure Logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)
logger = logging.getLogger("atlas.main")


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application startup and shutdown events."""
    logger.info(f"Starting {settings.APP_NAME} in [{settings.APP_ENV}] mode.")
    logger.info(f"Configured SAP Service Layer: {settings.SAP_BASE_URL} (DB: {settings.SAP_COMPANY_DB})")
    
    # Non-blocking connectivity test on boot
    try:
        sap_status = await sap_client.check_connectivity()
        logger.info(f"Initial SAP Service Layer Status: {sap_status.get('status')} ({sap_status.get('mode', 'live')})")
    except Exception as exc:
        logger.warning(f"Could not connect to SAP during startup: {str(exc)}")

    yield

    # Clean shutdown
    logger.info("Shutting down application. Releasing SAP sessions...")
    try:
        await sap_client.logout()
    except Exception as exc:
        logger.warning(f"Error releasing SAP session on shutdown: {str(exc)}")
    logger.info("Application shutdown complete.")


app = FastAPI(
    title=settings.APP_NAME,
    description="Enterprise API for ATLAS Technosoft website integrated with SAP Business One Service Layer.",
    version="1.0.0",
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS Middleware
origins = settings.cors_origins
if not settings.is_production:
    # In development allow common Vite ports
    origins.extend([
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:4173",
        "http://127.0.0.1:4173",
        "http://localhost:3000",
        "http://127.0.0.1:3000"
    ])
    origins = list(set(origins))

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)


# Friendly Validation Error Formatter
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    errors = []
    for err in exc.errors():
        loc = err.get("loc", [])
        field_name = loc[-1] if loc else "field"
        msg = err.get("msg", "Invalid value")
        # Clean up Pydantic standard prefix
        if msg.startswith("Value error, "):
            msg = msg.replace("Value error, ", "")
        errors.append({"field": str(field_name), "message": msg})

    return JSONResponse(
        status_code=getattr(status, "HTTP_422_UNPROCESSABLE_CONTENT", 422),
        content={
            "success": False,
            "status": "validation_error",
            "message": "Please correct the highlighted errors before submitting.",
            "errors": errors
        }
    )


# Register API v1 Routers
app.include_router(health_router, prefix="/api/v1")
app.include_router(contact_router, prefix="/api/v1")
app.include_router(consultation_router, prefix="/api/v1")
app.include_router(callback_router, prefix="/api/v1")
app.include_router(chat_router, prefix="/api/v1")


@app.get("/", include_in_schema=False)
async def root():
    return {
        "service": settings.APP_NAME,
        "version": "1.0.0",
        "status": "online",
        "docs": "/docs",
        "health": "/api/v1/health"
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host=settings.APP_HOST,
        port=settings.APP_PORT,
        reload=not settings.is_production
    )
