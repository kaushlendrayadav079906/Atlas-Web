import logging
from fastapi import APIRouter, HTTPException, status, Request
from app.schemas.contact import ContactSubmissionRequest, ContactSubmissionResponse
from app.services.contact_service import contact_service
from app.utils.exceptions import SAPError, DuplicateSubmissionError

logger = logging.getLogger("atlas.api.contact")

router = APIRouter(prefix="/contact", tags=["Contact Enquiries"])


@router.post(
    "",
    response_model=ContactSubmissionResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Submit Contact Us Enquiry to SAP Business One",
    description="Validates the enquiry, creates/reconciles a Lead in SAP Business One Service Layer, and records an interaction Activity."
)
async def submit_contact_enquiry(payload: ContactSubmissionRequest, request: Request) -> ContactSubmissionResponse:
    try:
        result = await contact_service.process_enquiry(payload)
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
                "message": "Unable to save enquiry in SAP Business One at this moment. Our team has been notified.",
                "error_type": "sap_service_error",
                "details": exc.message
            }
        )
    except Exception as exc:
        logger.exception("Unexpected error in contact enquiry submission")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"message": "An unexpected error occurred while processing your request.", "error_type": "internal_error"}
        )

