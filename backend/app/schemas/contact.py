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


class ContactSubmissionRequest(BaseModel):
    """
    Validation schema for website Contact Us enquiries.
    Maps directly to SAP Business One Lead (Business Partner) + Activity.
    """
    fullName: str = Field(..., min_length=2, max_length=100, description="Full Name of the contact person", examples=["Rahul Sharma"])
    email: str = Field(..., min_length=5, max_length=100, description="Business email address", examples=["rahul@company.com"])
    phone: str = Field(..., min_length=7, max_length=25, description="Contact telephone or mobile number", examples=["+91 93723 29599"])
    companyName: str = Field(..., min_length=2, max_length=120, description="Organization / Company Name", examples=["Acme Enterprises Ltd"])
    service: str = Field(..., min_length=2, max_length=80, description="Service or solution of interest", examples=["SAP Business One"])
    message: str = Field(..., min_length=10, max_length=3000, description="Detailed requirements or message", examples=["Looking for SAP B1 Cloud implementation with discrete manufacturing module."])

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


class ContactSubmissionResponse(BaseModel):
    """Response returned upon successful creation in SAP Business One."""
    success: bool = True
    status: str = "success"
    message: str = "Thank you. Your enquiry has been received and registered with ATLAS Technosoft."
    sapCardCode: str = Field(..., description="SAP Business Partner (Lead) Code", examples=["L-20261102-0042"])
    sapActivityId: Optional[int] = Field(None, description="SAP Activity Entry identifier", examples=[1042])
    referenceId: str = Field(..., description="Unique client tracking reference", examples=["ATPL-ENQ-8A3F1"])
    submittedAt: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

