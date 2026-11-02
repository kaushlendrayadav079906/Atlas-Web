import logging
import uuid
from datetime import datetime, timezone
from app.schemas.consultation import ConsultationSubmissionRequest, ConsultationSubmissionResponse
from app.services.sap_service import sap_service
from app.utils.idempotency import idempotency_manager

logger = logging.getLogger("atlas.consultation_service")


class ConsultationService:
    def __init__(self, sap_svc=None):
        self.sap_service = sap_svc or sap_service

    async def process_consultation(self, payload: ConsultationSubmissionRequest) -> ConsultationSubmissionResponse:
        """
        Processes a Book a Consultation request:
        1. Deduplication and concurrency check
        2. Reconcile or create Lead in SAP Business One
        3. Create Meeting Activity with requested consultation slot
        4. Complete idempotency record
        5. Return response with SAP CardCode and Activity ID
        """
        # 1. Idempotency check
        key, cached_result = idempotency_manager.check_or_start(
            email=payload.email,
            phone=payload.phone,
            service=payload.service,
            message=payload.message,
            enquiry_type="Consultation"
        )
        if cached_result:
            logger.info(f"Returning cached consultation result for {payload.email} (Idempotency Key: {key[:8]}...)")
            return ConsultationSubmissionResponse(**cached_result)

        try:
            # 2. SAP Business One Lead Creation/Reconciliation
            card_code, is_new = await self.sap_service.get_or_create_lead(
                full_name=payload.fullName,
                email=payload.email,
                phone=payload.phone,
                company_name=payload.companyName,
                service=payload.service,
                message=payload.message,
                enquiry_type="Strategic Consultation Request"
            )

            # 3. Create Linked Consultation Meeting Activity in SAP
            activity_id = await self.sap_service.create_activity(
                card_code=card_code,
                full_name=payload.fullName,
                enquiry_type="Strategic Consultation",
                service=payload.service,
                message=payload.message,
                preferred_date=payload.preferredDate,
                preferred_time=payload.preferredTime
            )

            reference_id = f"ATPL-CON-{uuid.uuid4().hex[:6].upper()}"
            submitted_at = datetime.now(timezone.utc).isoformat()

            response_data = {
                "success": True,
                "status": "success",
                "message": "Thank you. Your strategic consultation request has been scheduled with ATLAS Technosoft experts.",
                "sapCardCode": card_code,
                "sapActivityId": activity_id,
                "referenceId": reference_id,
                "preferredDate": payload.preferredDate,
                "preferredTime": payload.preferredTime,
                "submittedAt": submitted_at
            }

            # 4. Save in idempotency cache
            idempotency_manager.complete(key, response_data)
            return ConsultationSubmissionResponse(**response_data)

        except Exception as exc:
            idempotency_manager.fail(key)
            logger.error(f"Error processing consultation request: {str(exc)}")
            raise


# Global singleton instance
consultation_service = ConsultationService()

