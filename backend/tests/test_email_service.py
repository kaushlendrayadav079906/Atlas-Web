import pytest
from unittest.mock import MagicMock, patch
from app.services.email_service import EmailService


@pytest.mark.asyncio
async def test_email_service_disabled_returns_false():
    svc = EmailService()
    svc.enabled = False
    
    result = await svc.send_contact_enquiry_notification({
        "referenceId": "ATPL-ENQ-TEST1",
        "fullName": "Test User",
        "companyName": "Test Corp",
        "email": "test@corp.com",
        "phone": "+91 93723 29599",
        "service": "SAP Business One",
        "message": "Enquiry message for testing email service."
    })
    assert result is False


def test_contact_email_formatting():
    svc = EmailService()
    data = {
        "referenceId": "ATPL-ENQ-9999",
        "fullName": "Priya Nair",
        "companyName": "Nair Logistics Pvt Ltd",
        "email": "priya@nairlogistics.com",
        "phone": "+91 98201 23456",
        "service": "Produmex WMS",
        "message": "Looking for barcode scanning and warehouse automation with SAP B1.",
        "sapCardCode": "L-20261102-0042",
        "sapActivityId": 1042,
        "submittedAt": "2026-11-02T10:00:00Z"
    }
    subject, text_body, html_body = svc._format_contact_email(data)

    assert "ATPL-ENQ-9999" in subject
    assert "Nair Logistics Pvt Ltd" in subject
    assert "L-20261102-0042" in text_body
    assert "priya@nairlogistics.com" in text_body
    assert "Produmex WMS" in html_body
    assert "L-20261102-0042" in html_body


def test_consultation_email_formatting():
    svc = EmailService()
    data = {
        "referenceId": "ATPL-CON-8888",
        "fullName": "Arun Verma",
        "companyName": "Verma Industries Ltd",
        "email": "arun@verma.com",
        "phone": "+91 91234 56789",
        "service": "UiPath RPA",
        "message": "Process assessment for invoice automation.",
        "preferredDate": "2026-11-20",
        "preferredTime": "14:00 - 15:00 IST",
        "sapCardCode": "L-20261102-0089",
        "sapActivityId": 2089,
        "submittedAt": "2026-11-02T11:00:00Z"
    }
    subject, text_body, html_body = svc._format_consultation_email(data)

    assert "ATPL-CON-8888" in subject
    assert "2026-11-20" in subject
    assert "14:00 - 15:00 IST" in text_body
    assert "UiPath RPA" in html_body


@pytest.mark.asyncio
async def test_email_smtp_dispatch_success():
    svc = EmailService()
    svc.enabled = True
    svc.host = "smtp.test.com"
    svc.port = 587
    svc.user = "testuser"
    svc.password = "testpass"
    svc.recipients = ["sales@atlastechnosoft.com"]

    mock_smtp_instance = MagicMock()

    with patch("smtplib.SMTP", return_value=mock_smtp_instance) as mock_smtp_cls:
        res = await svc.send_contact_enquiry_notification({
            "referenceId": "ATPL-ENQ-MOCK",
            "fullName": "Mock Person",
            "companyName": "Mock Corp",
            "email": "mock@corp.com",
            "phone": "+91 93723 29599",
            "service": "SAP Business One",
            "message": "Test enquiry payload."
        })

        assert res is True
        mock_smtp_instance.starttls.assert_called_once()
        mock_smtp_instance.login.assert_called_once_with("testuser", "testpass")
        mock_smtp_instance.sendmail.assert_called_once()
        mock_smtp_instance.quit.assert_called_once()


@pytest.mark.asyncio
async def test_email_smtp_failure_gracefully_handled():
    svc = EmailService()
    svc.enabled = True
    svc.host = "unreachable.smtp.server"
    svc.port = 587
    svc.recipients = ["sales@atlastechnosoft.com"]

    with patch("smtplib.SMTP", side_effect=Exception("Connection refused")):
        # Must not raise an exception
        res = await svc.send_contact_enquiry_notification({
            "referenceId": "ATPL-ENQ-ERR",
            "fullName": "Error Person",
            "companyName": "Error Corp",
            "email": "err@corp.com",
            "phone": "+91 93723 29599",
            "service": "SAP Business One",
            "message": "Test enquiry payload that fails SMTP."
        })
        assert res is False

