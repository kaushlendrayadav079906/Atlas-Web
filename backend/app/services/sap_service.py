import logging
import uuid
from typing import Optional, Dict, Any, Tuple
from datetime import datetime, timezone
from app.integrations.sap_client import sap_client
from app.utils.exceptions import SAPRecordCreationError

logger = logging.getLogger("atlas.sap_service")


class SAPService:
    """
    High-level business service for orchestrating SAP Business One CRM entities:
    - BusinessPartners (CardType='cLead')
    - Activities (Linked interactions for Contact Enquiries and Consultations)
    - Safe duplicate prevention / Lead reconciliation
    """

    def __init__(self, client=None):
        self.client = client or sap_client

    async def find_existing_lead(self, email: str) -> Optional[Dict[str, Any]]:
        """
        Search for an existing Lead in SAP by email address.
        Prevents duplicate Business Partners from being created for recurring enquiries.
        """
        sanitized_email = email.strip().lower()
        filter_expr = f"EmailAddress eq '{sanitized_email}' and CardType eq 'cLead'"
        
        try:
            res = await self.client.request(
                method="GET",
                endpoint="BusinessPartners",
                params={
                    "$filter": filter_expr,
                    "$select": "CardCode,CardName,EmailAddress,Phone1",
                    "$top": 1
                }
            )
            items = res.get("value", [])
            if items:
                logger.info(f"Existing SAP Lead found for {sanitized_email}: {items[0].get('CardCode')}")
                return items[0]
            return None
        except Exception as exc:
            logger.warning(f"Failed to query existing lead in SAP ({str(exc)}). Proceeding with creation.")
            return None

    def generate_lead_card_code(self) -> str:
        """
        Generate a standardized SAP Business Partner Lead Code.
        Format: L-YYYYMMDD-XXXX (e.g. L-20261102-A8F1)
        """
        date_prefix = datetime.now(timezone.utc).strftime("%Y%m%d")
        short_suffix = uuid.uuid4().hex[:4].upper()
        return f"L-{date_prefix}-{short_suffix}"

    async def get_or_create_lead(
        self,
        full_name: str,
        email: str,
        phone: str,
        company_name: str,
        service: str,
        message: str,
        enquiry_type: str
    ) -> Tuple[str, bool]:
        """
        Reconciles or creates a Lead in SAP Business One.
        Returns: (CardCode, is_newly_created)
        """
        # 1. Check if Lead already exists in SAP
        existing_lead = await self.find_existing_lead(email)
        if existing_lead and existing_lead.get("CardCode"):
            card_code = existing_lead["CardCode"]
            logger.info(f"Reusing existing SAP Lead: {card_code} for {email}")
            return card_code, False

        # 2. Create new Lead BusinessPartner
        new_card_code = self.generate_lead_card_code()
        lead_payload = {
            "CardCode": new_card_code,
            "CardName": company_name or full_name,
            "CardType": "cLead",
            "EmailAddress": email,
            "Phone1": phone,
            "FreeText": f"Source: ATLAS Technosoft Website\nEnquiry Type: {enquiry_type}\nService: {service}\nRequirements: {message}",
            "ContactEmployees": [
                {
                    "Name": full_name,
                    "E_Mail": email,
                    "Phone": phone,
                    "Remarks": f"Registered via ATLAS Website ({enquiry_type})"
                }
            ]
        }

        logger.info(f"Creating new SAP Lead {new_card_code} for {company_name} ({email})")
        res = await self.client.request(
            method="POST",
            endpoint="BusinessPartners",
            data=lead_payload
        )

        created_code = res.get("CardCode") or new_card_code
        logger.info(f"SAP Lead successfully created: {created_code}")
        return created_code, True

    async def create_activity(
        self,
        card_code: str,
        full_name: str,
        enquiry_type: str,
        service: str,
        message: str,
        preferred_date: Optional[str] = None,
        preferred_time: Optional[str] = None
    ) -> Optional[int]:
        """
        Creates an Activity in SAP Business One linked to the Lead.
        - Contact enquiries are recorded as 'cn_Task' or 'cn_Other'
        - Consultation bookings are recorded as 'cn_Meeting' with requested scheduling
        """
        today_date = datetime.now(timezone.utc).strftime("%Y-%m-%d")
        now_time = datetime.now(timezone.utc).strftime("%H:%M:%S")

        is_consultation = "consultation" in enquiry_type.lower()
        activity_type_name = "cn_Meeting" if is_consultation else "cn_Task"

        notes_content = (
            f"Contact: {full_name}\n"
            f"Enquiry Type: {enquiry_type}\n"
            f"Service of Interest: {service}\n"
        )
        if is_consultation and (preferred_date or preferred_time):
            notes_content += f"Preferred Slot: {preferred_date or 'Any'} at {preferred_time or 'Any'}\n"
        notes_content += f"\nClient Message:\n{message}"

        activity_payload = {
            "CardCode": card_code,
            "Activity": activity_type_name,
            "ActivityType": -1,  # Default system activity type
            "Details": f"ATLAS Website: {enquiry_type} - {service}",
            "Notes": notes_content,
            "StartDate": preferred_date if (preferred_date and len(preferred_date) == 10) else today_date,
            "StartTime": "10:00:00" if is_consultation else now_time,
            "EndDate": preferred_date if (preferred_date and len(preferred_date) == 10) else today_date,
            "EndTime": "11:00:00" if is_consultation else now_time,
            "Priority": "pr_Normal"
        }

        try:
            logger.info(f"Creating SAP Activity for Lead {card_code} ({enquiry_type})")
            res = await self.client.request(
                method="POST",
                endpoint="Activities",
                data=activity_payload
            )
            activity_id = res.get("ActivityCode")
            logger.info(f"SAP Activity created with ID: {activity_id}")
            return activity_id
        except Exception as exc:
            logger.error(f"Failed to create SAP Activity for Lead {card_code}: {str(exc)}")
            # Even if activity fails, lead was created or exists, so return None for activity
            return None


# Global singleton instance
sap_service = SAPService()

