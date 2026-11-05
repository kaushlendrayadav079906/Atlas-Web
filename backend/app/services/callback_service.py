import logging
import uuid
from datetime import datetime, timezone
from app.schemas.callback import CallbackSubmissionRequest, CallbackSubmissionResponse
from app.services.sap_service import sap_service
from app.utils.idempotency import idempotency_manager

logger = logging.getLogger("atlas.callback_service")


class CallbackService:
    def __init__(self, sap_svc=None):
        self.sap_service = sap_svc or sap_service

    async def process_callback(self, payload: CallbackSubmissionRequest) -> CallbackSubmissionResponse:
        """
        Processes a Request a Callback submission:
        1. Deduplication and concurrency check via IdempotencyManager
        2. Reconcile or create Lead in SAP Business One (cLead)
        3. Create Phone Call Activity (cn_Conversation) with requested slot
        4. Complete idempotency record
        5. Return response with SAP CardCode, Activity ID, and unique reference ID
        """
        # 1. Idempotency check
        key, cached_result = idempotency_manager.check_or_start(
            email=payload.email,
            phone=payload.phone,
            service=payload.service,
            message=payload.message or f"{payload.preferredDate} {payload.preferredTime}",
            enquiry_type="Callback"
        )
        if cached_result:
            logger.info(f"Returning cached callback result for {payload.email} (Idempotency Key: {key[:8]}...)")
            return CallbackSubmissionResponse(**cached_result)

        try:
            # 2. SAP Business One Lead Creation / Re-use
            card_code, is_new = await self.sap_service.get_or_create_lead(
                full_name=payload.fullName,
                email=payload.email,
                phone=payload.phone,
                company_name=payload.companyName,
                service=payload.service,
                message=payload.message or f"Phone callback requested for {payload.service} on {payload.preferredDate} ({payload.preferredTime})",
                enquiry_type="Callback Request"
            )

            # 3. Create Linked Phone Call (cn_Conversation) Activity in SAP
            activity_id = await self.sap_service.create_activity(
                card_code=card_code,
                full_name=payload.fullName,
                enquiry_type="Callback Request",
                service=payload.service,
                message=payload.message or f"Requested phone callback on {payload.preferredDate} ({payload.preferredTime})",
                preferred_date=payload.preferredDate,
                preferred_time=payload.preferredTime
            )

            reference_id = f"ATPL-CB-{uuid.uuid4().hex[:6].upper()}"
            submitted_at = datetime.now(timezone.utc).isoformat()

            response_data = {
                "success": True,
                "status": "success",
                "message": "Thank you. Your callback request has been scheduled with ATLAS Technosoft experts.",
                "sapCardCode": card_code,
                "sapActivityId": activity_id,
                "referenceId": reference_id,
                "preferredDate": payload.preferredDate,
                "preferredTime": payload.preferredTime,
                "submittedAt": submitted_at
            }

            # 4. Save in idempotency cache
            idempotency_manager.complete(key, response_data)
            return CallbackSubmissionResponse(**response_data)

        except Exception as exc:
            idempotency_manager.fail(key)
            logger.error(f"Error processing callback request: {str(exc)}")
            raise


# Global singleton instance
callback_service = CallbackService()

