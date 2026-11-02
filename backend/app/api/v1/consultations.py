import logging
from fastapi import APIRouter, HTTPException, status, Request, BackgroundTasks
from app.config import settings
from app.schemas.consultation import ConsultationSubmissionRequest, ConsultationSubmissionResponse
from app.services.consultation_service import consultation_service
from app.services.email_service import email_service
from app.utils.rate_limiter import rate_limiter
from app.utils.exceptions import SAPError, DuplicateSubmissionError

logger = logging.getLogger("atlas.api.consultations")

router = APIRouter(prefix="/consultations", tags=["Strategic Consultations"])


@router.post(
    "",
    response_model=ConsultationSubmissionResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Schedule Strategic Consultation in SAP Business One",
    description="Validates consultation request, registers Lead + Meeting Activity in SAP Business One, and dispatches notification."
)
async def submit_consultation(
    payload: ConsultationSubmissionRequest,
    request: Request,
    background_tasks: BackgroundTasks
) -> ConsultationSubmissionResponse:
    # 1. Enforce rate limiting
    rate_limiter.check(request)

    try:
        # 2. Process consultation in SAP Business One
        result = await consultation_service.process_consultation(payload)

        # 3. Schedule background email notification if enabled
        if settings.ENABLE_EMAIL_NOTIFICATIONS:
            background_tasks.add_task(
                email_service.send_consultation_notification,
                result.model_dump()
            )

        return result

    except DuplicateSubmissionError as exc:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail={"message": exc.message, "error_type": "duplicate_submission"}
        )

    except SAPError as exc:
        logger.error(f"SAP integration error during consultation scheduling: {exc.message}")
        safe_detail = {
            "message": "Unable to schedule consultation in SAP Business One at this moment. Our team has been notified.",
            "error_type": "sap_service_error"
        }
        if not settings.is_production:
            safe_detail["details"] = exc.message

        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=safe_detail
        )

    except Exception as exc:
        logger.exception("Unexpected error in consultation booking")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={
                "message": "An unexpected error occurred while scheduling your consultation. Please contact ATLAS support if the problem persists.",
                "error_type": "internal_error"
            }
        )
