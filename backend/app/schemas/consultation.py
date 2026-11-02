from datetime import datetime, timezone
from typing import Optional
from pydantic import BaseModel, Field, field_validator
from app.utils.validators import (
    validate_full_name,
    validate_email_format,
    validate_phone_format,
    validate_company_name,
    validate_message_text,
    sanitize_text
)


class ConsultationSubmissionRequest(BaseModel):
    """
    Validation schema for Book a Consultation requests.
    Maps to SAP Business One Lead + Meeting Activity with scheduling details.
    """
    fullName: str = Field(..., min_length=2, max_length=100, description="Full Name of the executive or contact", examples=["Vikram Malhotra"])
    email: str = Field(..., min_length=5, max_length=100, description="Business email address", examples=["vikram@innovatech.com"])
    phone: str = Field(..., min_length=7, max_length=25, description="Contact telephone or mobile number", examples=["+91 98200 12345"])
    companyName: str = Field(..., min_length=2, max_length=120, description="Company / Corporate entity name", examples=["InnovaTech Solutions Pvt Ltd"])
    service: str = Field(..., min_length=2, max_length=80, description="Primary service or solution of interest", examples=["Boyum IT Solutions"])
    message: str = Field(..., min_length=10, max_length=3000, description="Project scope or consultation agenda", examples=["We need an architectural consultation on migrating from legacy SQL to SAP HANA with Produmex WMS."])
    
    preferredDate: Optional[str] = Field(None, max_length=30, description="Preferred date (e.g. 2026-11-10)", examples=["2026-11-10"])
    preferredTime: Optional[str] = Field(None, max_length=30, description="Preferred time slot (e.g. 14:00 - 15:00 IST)", examples=["14:00 - 15:00 IST"])

    @field_validator("fullName")
    @classmethod
    def validate_name(cls, v: str) -> str:
        return validate_full_name(v)

    @field_validator("email")
    @classmethod
    def validate_email(cls, v: str) -> str:
        return validate_email_format(v)

    @field_validator("phone")
    @classmethod
    def validate_phone(cls, v: str) -> str:
        return validate_phone_format(v)

    @field_validator("companyName")
    @classmethod
    def validate_company(cls, v: str) -> str:
        return validate_company_name(v)

    @field_validator("service")
    @classmethod
    def validate_service(cls, v: str) -> str:
        clean = sanitize_text(v)
        if not clean:
            raise ValueError("Please select a valid service.")
        return clean

    @field_validator("message")
    @classmethod
    def validate_msg(cls, v: str) -> str:
        return validate_message_text(v)

    @field_validator("preferredDate")
    @classmethod
    def sanitize_date(cls, v: Optional[str]) -> Optional[str]:
        if not v:
            return None
        return sanitize_text(v)[:30]

    @field_validator("preferredTime")
    @classmethod
    def sanitize_time(cls, v: Optional[str]) -> Optional[str]:
        if not v:
            return None
        return sanitize_text(v)[:30]


class ConsultationSubmissionResponse(BaseModel):
    """Response returned upon successful scheduling in SAP Business One."""
    success: bool = True
    status: str = "success"
    message: str = "Thank you. Your consultation request has been scheduled with ATLAS Technosoft experts."
    sapCardCode: str = Field(..., description="SAP Business Partner (Lead) Code", examples=["L-20261102-0089"])
    sapActivityId: Optional[int] = Field(None, description="SAP Activity (Meeting) identifier", examples=[2089])
    referenceId: str = Field(..., description="Unique consultation reference code", examples=["ATPL-CON-3C7D9"])
    preferredDate: Optional[str] = None
    preferredTime: Optional[str] = None
    submittedAt: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

