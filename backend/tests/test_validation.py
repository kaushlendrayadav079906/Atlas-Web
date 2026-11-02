import pytest
from app.utils.validators import (
    sanitize_text,
    validate_email_format,
    validate_phone_format,
    validate_full_name,
    validate_company_name,
    validate_message_text,
)
from app.schemas.contact import ContactSubmissionRequest
from app.schemas.consultation import ConsultationSubmissionRequest


def test_sanitize_text():
    raw = "  <script>alert('xss')</script> Hello World!  "
    clean = sanitize_text(raw)
    assert "<script>" not in clean
    assert "&lt;script&gt;" in clean
    assert clean.startswith("&lt;script&gt;")
    assert clean.endswith("Hello World!")


def test_validate_email_success():
    assert validate_email_format("Rahul.Sharma@acme-corp.com") == "rahul.sharma@acme-corp.com"
    assert validate_email_format("sales@atlastechnosoft.com") == "sales@atlastechnosoft.com"


def test_validate_email_failure():
    with pytest.raises(ValueError, match="Invalid business email format"):
        validate_email_format("invalid-email")

    with pytest.raises(ValueError, match="Invalid business email format"):
        validate_email_format("user@domain")


def test_validate_phone_success():
    assert validate_phone_format("+91 93723 29599") == "+91 93723 29599"
    assert validate_phone_format("022-28001234") == "022-28001234"
    assert validate_phone_format("+1 (555) 123-4567") == "+1 (555) 123-4567"


def test_validate_phone_failure():
    with pytest.raises(ValueError, match="Invalid phone number format"):
        validate_phone_format("1234abc")

    with pytest.raises(ValueError):
        validate_phone_format("12345")


def test_contact_schema_validation_success():
    payload = {
        "fullName": "Rahul Sharma",
        "email": "rahul.sharma@acme.com",
        "phone": "+91 93723 29599",
        "companyName": "Acme Industries Ltd",
        "service": "SAP Business One",
        "message": "We need to automate our shop floor inventory with SAP HANA."
    }
    req = ContactSubmissionRequest(**payload)
    assert req.fullName == "Rahul Sharma"
    assert req.email == "rahul.sharma@acme.com"


def test_contact_schema_validation_missing_fields():
    with pytest.raises(Exception):
        ContactSubmissionRequest(
            fullName="Rahul",
            # missing email
            phone="+91 93723 29599",
            companyName="Acme",
            service="SAP",
            message="Short"  # too short
        )
