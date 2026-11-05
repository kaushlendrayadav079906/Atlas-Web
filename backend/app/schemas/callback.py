from datetime import datetime, timezone
import re
from typing import Optional
from pydantic import BaseModel, Field, field_validator
from app.utils.validators import (
    validate_full_name,
    validate_email_format,
    validate_phone_format,
    validate_company_name,
    sanitize_text
)

# Date validation pattern YYYY-MM-DD
DATE_REGEX = re.compile(r"^\d{4}-\d{2}-\d{2}$")


class CallbackSubmissionRequest(BaseModel):
    """
    Validation schema for Request a Callback.
    Maps to SAP Business One Lead (BusinessPartners) + Phone Call Interaction (Activities).
    """
    fullName: str = Field(
        ...,
        min_length=2,
        max_length=100,
        description="Full Name of the contact or executive",
        examples=["Rajesh Deshmukh"]
    )
    email: str = Field(
        ...,
        min_length=5,
        max_length=100,
        description="Business email address",
        examples=["rajesh.d@techcorp.in"]
    )
    phone: str = Field(
        ...,
        min_length=7,
        max_length=25,
        description="Direct telephone or mobile number for callback",
        examples=["+91 98201 54321"]
    )
    companyName: str = Field(
        ...,
        min_length=2,
        max_length=120,
        description="Company / Enterprise entity name",
        examples=["TechCorp Manufacturing Ltd"]
    )
    service: str = Field(
        ...,
        min_length=2,
        max_length=80,
        description="Service or solution of interest",
        examples=["SAP Business One Implementation"]
    )
    preferredDate: str = Field(
        ...,
        min_length=8,
        max_length=30,
        description="Preferred callback date (YYYY-MM-DD)",
        examples=["2026-11-15"]
    )
    preferredTime: str = Field(
        ...,
        min_length=2,
        max_length=50,
        description="Preferred callback time window or slot",
        examples=["Morning (10:00 AM - 1:00 PM IST)"]
    )
    message: Optional[str] = Field(
        default="",
        max_length=3000,
        description="Optional additional notes or requirements for the callback",
        examples=["Interested in discrete manufacturing module and BOM management."]
    )
    consent: bool = Field(
        ...,
        description="Agreement to Privacy Policy and data processing consent"
    )

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
        if not clean or len(clean) < 2:
            raise ValueError("Please select a valid service of interest.")
        return clean

    @field_validator("preferredDate")
    @classmethod
    def validate_preferred_date(cls, v: str) -> str:
        clean = sanitize_text(v).strip()
        if not clean:
            raise ValueError("Preferred callback date is required.")
        # If matches YYYY-MM-DD, verify it's a valid date
        if DATE_REGEX.match(clean):
            try:
                dt = datetime.strptime(clean, "%Y-%m-%d").date()
                today = datetime.now(timezone.utc).date()
                if dt < today:
                    raise ValueError("Preferred date cannot be in the past.")
            except ValueError as e:
                if "past" in str(e):
                    raise
                raise ValueError("Invalid date value. Please select a valid calendar date.")
        return clean[:30]

    @field_validator("preferredTime")
    @classmethod
    def validate_preferred_time(cls, v: str) -> str:
        clean = sanitize_text(v).strip()
        if not clean or len(clean) < 2:
            raise ValueError("Please select a preferred callback time slot.")
        return clean[:50]

    @field_validator("message")
    @classmethod
    def sanitize_message(cls, v: Optional[str]) -> str:
        if not v:
            return ""
        clean = sanitize_text(v)
        if len(clean) > 3000:
            raise ValueError("Message cannot exceed 3000 characters.")
        return clean

    @field_validator("consent")
    @classmethod
    def validate_consent(cls, v: bool) -> bool:
        if not v:
            raise ValueError("You must agree to the Privacy Policy to request a callback.")
        return v


class CallbackSubmissionResponse(BaseModel):
    """Response returned upon successfully registering callback in SAP Business One."""
    success: bool = True
    status: str = "success"
    message: str = "Thank you. Your callback request has been scheduled with ATLAS Technosoft experts."
    sapCardCode: str = Field(..., description="SAP Business Partner (Lead) Code", examples=["L-20261105-0099"])
    sapActivityId: Optional[int] = Field(None, description="SAP Activity (Phone Call) identifier", examples=[2099])
    referenceId: str = Field(..., description="Unique callback reference code", examples=["ATPL-CB-4F2A1"])
    preferredDate: str = Field(..., description="Scheduled callback date")
    preferredTime: str = Field(..., description="Scheduled callback time window")
    submittedAt: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

