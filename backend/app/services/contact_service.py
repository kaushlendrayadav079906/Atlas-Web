import logging
import uuid
from datetime import datetime, timezone
from app.schemas.contact import ContactSubmissionRequest, ContactSubmissionResponse
from app.services.sap_service import sap_service
from app.utils.idempotency import idempotency_manager
from app.utils.exceptions import SAPError

logger = logging.getLogger("atlas.contact_service")


class ContactService:
    def __init__(self, sap_svc=None):
        self.sap_service = sap_svc or sap_service

    async def process_enquiry(self, payload: ContactSubmissionRequest) -> ContactSubmissionResponse:
        """
        Processes a Contact Us form enquiry:
        1. Idempotency & duplicate check
        2. Reconcile or create Lead in SAP Business One
        3. Create Activity in SAP Business One
        4. Complete idempotency record
        5. Return structured response with SAP record identifiers
        """
        # 1. Idempotency check
        key, cached_result = idempotency_manager.check_or_start(
            email=payload.email,
            phone=payload.phone,
            service=payload.service,
            message=payload.message,
            enquiry_type="Contact"
        )
        if cached_result:
            logger.info(f"Returning cached submission result for {payload.email} (Idempotency Key: {key[:8]}...)")
            return ContactSubmissionResponse(**cached_result)

        try:
            # 2. SAP Business One Lead Creation/Reconciliation
            card_code, is_new = await self.sap_service.get_or_create_lead(
                full_name=payload.fullName,
                email=payload.email,
                phone=payload.phone,
                company_name=payload.companyName,
                service=payload.service,
                message=payload.message,
                enquiry_type="Website Contact Enquiry"
            )

            # 3. Create Linked Activity in SAP
            activity_id = await self.sap_service.create_activity(
                card_code=card_code,
                full_name=payload.fullName,
                enquiry_type="Contact Us Enquiry",
                service=payload.service,
                message=payload.message
            )

            reference_id = f"ATPL-ENQ-{uuid.uuid4().hex[:6].upper()}"
            submitted_at = datetime.now(timezone.utc).isoformat()

            response_data = {
                "success": True,
                "status": "success",
                "message": "Thank you for reaching out. Your enquiry has been registered with ATLAS Technosoft experts.",
                "sapCardCode": card_code,
                "sapActivityId": activity_id,
                "referenceId": reference_id,
                "submittedAt": submitted_at
            }

            # 4. Save in idempotency cache
            idempotency_manager.complete(key, response_data)
            return ContactSubmissionResponse(**response_data)

        except Exception as exc:
            idempotency_manager.fail(key)
            logger.error(f"Error processing contact enquiry: {str(exc)}")
            raise


# Global singleton instance
contact_service = ContactService()

