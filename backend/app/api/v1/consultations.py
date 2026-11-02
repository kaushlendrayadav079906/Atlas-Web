import logging
from fastapi import APIRouter, HTTPException, status, Request
from app.schemas.consultation import ConsultationSubmissionRequest, ConsultationSubmissionResponse
from app.services.consultation_service import consultation_service
from app.utils.exceptions import SAPError, DuplicateSubmissionError

logger = logging.getLogger("atlas.api.consultations")

router = APIRouter(prefix="/consultations", tags=["Strategic Consultations"])


@router.post(
    "",
    response_model=ConsultationSubmissionResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Schedule Strategic Consultation in SAP Business One",
    description="Validates the consultation request, creates/links a Lead in SAP Business One, and registers a Meeting Activity with requested slot details."
)
async def submit_consultation(payload: ConsultationSubmissionRequest, request: Request) -> ConsultationSubmissionResponse:
    try:
        result = await consultation_service.process_consultation(payload)
        return result
    except DuplicateSubmissionError as exc:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail={"message": exc.message, "error_type": "duplicate_submission"}
        )
    except SAPError as exc:
        logger.error(f"SAP integration error: {exc.message}")
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail={
                "message": "Unable to schedule consultation in SAP Business One at this moment. Our team has been notified.",
                "error_type": "sap_service_error",
                "details": exc.message
            }
        )
    except Exception as exc:
        logger.exception("Unexpected error in consultation booking")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"message": "An unexpected error occurred while scheduling your consultation.", "error_type": "internal_error"}
        )

