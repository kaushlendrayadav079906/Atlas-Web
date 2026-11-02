import logging
from fastapi import APIRouter, HTTPException, status, Request, BackgroundTasks
from app.config import settings
from app.schemas.contact import ContactSubmissionRequest, ContactSubmissionResponse
from app.services.contact_service import contact_service
from app.services.email_service import email_service
from app.utils.rate_limiter import rate_limiter
from app.utils.exceptions import SAPError, DuplicateSubmissionError

logger = logging.getLogger("atlas.api.contact")

router = APIRouter(prefix="/contact", tags=["Contact Enquiries"])


@router.post(
    "",
    response_model=ContactSubmissionResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Submit Contact Us Enquiry to SAP Business One",
    description="Validates the enquiry, creates/reconciles a Lead in SAP Business One Service Layer, records an interaction Activity, and notifies the consulting team."
)
async def submit_contact_enquiry(
    payload: ContactSubmissionRequest,
    request: Request,
    background_tasks: BackgroundTasks
) -> ContactSubmissionResponse:
    # 1. Enforce rate limiting
    rate_limiter.check(request)

    try:
        # 2. Process enquiry in SAP Business One
        result = await contact_service.process_enquiry(payload)

        # 3. Schedule background email notification if enabled
        if settings.ENABLE_EMAIL_NOTIFICATIONS:
            background_tasks.add_task(
                email_service.send_contact_enquiry_notification,
                result.model_dump()
            )

        return result

    except DuplicateSubmissionError as exc:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail={"message": exc.message, "error_type": "duplicate_submission"}
        )

    except SAPError as exc:
        logger.error(f"SAP integration error during contact enquiry: {exc.message}")
        safe_detail = {
            "message": "Unable to save enquiry in SAP Business One at this moment. Our team has been notified.",
            "error_type": "sap_service_error"
        }
        if not settings.is_production:
            safe_detail["details"] = exc.message

        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=safe_detail
        )

    except Exception as exc:
        logger.exception("Unexpected error in contact enquiry submission")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={
                "message": "An unexpected error occurred while processing your request. Please contact ATLAS support if the problem persists.",
                "error_type": "internal_error"
            }
        )
