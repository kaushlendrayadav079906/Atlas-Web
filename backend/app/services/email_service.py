import logging
import smtplib
import asyncio
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from typing import Dict, Any, List, Tuple
from app.config import settings

logger = logging.getLogger("atlas.email_service")


class EmailService:
    """
    Automated notification service for ATLAS Technosoft enquiries.
    Sends responsive HTML and plaintext email alerts to sales and consulting teams.
    Operates safely in the background without blocking API endpoints or SAP workflows.
    """

    def __init__(self):
        self.enabled = settings.ENABLE_EMAIL_NOTIFICATIONS
        self.host = settings.SMTP_HOST
        self.port = settings.SMTP_PORT
        self.user = settings.SMTP_USER
        self.password = settings.SMTP_PASSWORD
        self.from_email = settings.SMTP_FROM_EMAIL
        self.from_name = settings.SMTP_FROM_NAME
        self.recipients = settings.recipient_emails
        self.use_tls = settings.SMTP_USE_TLS

    def _format_contact_email(self, data: Dict[str, Any]) -> Tuple[str, str, str]:
        """Generate subject, text, and HTML body for a Contact Us enquiry."""
        ref_id = data.get("referenceId", "N/A")
        full_name = data.get("fullName", "N/A")
        company = data.get("companyName", "N/A")
        email = data.get("email", "N/A")
        phone = data.get("phone", "N/A")
        service = data.get("service", "N/A")
        message = data.get("message", "N/A")
        sap_lead = data.get("sapCardCode", "N/A")
        sap_activity = data.get("sapActivityId", "N/A")
        submitted_at = data.get("submittedAt", "N/A")

        subject = f"[New Website Enquiry] {company} - {service} (Ref: {ref_id})"

        text_body = f"""
======================================================================
ATLAS TECHNOSOFT - NEW WEBSITE CONTACT ENQUIRY
======================================================================

Reference ID:   {ref_id}
Submitted At:   {submitted_at}
SAP Lead Code:  {sap_lead}
SAP Activity:   {sap_activity}

CLIENT INFORMATION:
----------------------------------------------------------------------
Full Name:      {full_name}
Company Name:   {company}
Business Email: {email}
Phone Number:   {phone}

REQUIREMENTS:
----------------------------------------------------------------------
Service:        {service}
Message:
{message}

======================================================================
This enquiry was validated and registered directly into SAP Business One.
ATLAS Technosoft ERP & Automation Team
sales@atlastechnosoft.com | +91 93723 29599
"""

        html_body = f"""
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {{ font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f7fc; margin: 0; padding: 24px; color: #1e293b; }}
    .container {{ max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.06); border: 1px solid #e2e8f0; }}
    .header {{ background: linear-gradient(135deg, #0b2450 0%, #0866d9 100%); padding: 28px 24px; text-align: left; color: #ffffff; }}
    .header h1 {{ margin: 0; font-size: 20px; font-weight: 700; letter-spacing: -0.3px; }}
    .header p {{ margin: 6px 0 0 0; font-size: 13px; opacity: 0.9; }}
    .badge {{ display: inline-block; background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.3); padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: bold; margin-top: 10px; }}
    .content {{ padding: 28px 24px; }}
    .section-title {{ font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #0866d9; margin-bottom: 12px; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; }}
    .grid {{ width: 100%; border-collapse: collapse; margin-bottom: 20px; }}
    .grid td {{ padding: 8px 0; font-size: 14px; vertical-align: top; }}
    .grid td.label {{ width: 140px; color: #64748b; font-weight: 600; }}
    .grid td.value {{ color: #0f172a; font-weight: 500; }}
    .sap-box {{ background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 14px 16px; margin-bottom: 24px; }}
    .sap-title {{ font-size: 12px; font-weight: 700; color: #1d4ed8; text-transform: uppercase; margin-bottom: 8px; }}
    .message-box {{ background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px 16px; font-size: 14px; line-height: 1.6; color: #334155; white-space: pre-wrap; }}
    .footer {{ background: #f8fafc; padding: 18px 24px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b; text-align: center; }}
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>ATLAS Technosoft — New Contact Enquiry</h1>
      <p>A new customer enquiry has been submitted through the corporate website.</p>
      <div class="badge">Ref: {ref_id}</div>
    </div>
    <div class="content">
      <div class="sap-box">
        <div class="sap-title">SAP Business One Synchronization</div>
        <table class="grid" style="margin-bottom: 0;">
          <tr>
            <td class="label">SAP Lead Code:</td>
            <td class="value"><strong>{sap_lead}</strong> (Business Partner)</td>
          </tr>
          <tr>
            <td class="label">SAP Activity Entry:</td>
            <td class="value"><strong>#{sap_activity}</strong> (Linked Interaction)</td>
          </tr>
        </table>
      </div>

      <div class="section-title">Prospect Details</div>
      <table class="grid">
        <tr>
          <td class="label">Full Name:</td>
          <td class="value">{full_name}</td>
        </tr>
        <tr>
          <td class="label">Company Name:</td>
          <td class="value"><strong>{company}</strong></td>
        </tr>
        <tr>
          <td class="label">Business Email:</td>
          <td class="value"><a href="mailto:{email}" style="color: #0866d9; text-decoration: none;">{email}</a></td>
        </tr>
        <tr>
          <td class="label">Phone / WhatsApp:</td>
          <td class="value"><a href="tel:{phone}" style="color: #0866d9; text-decoration: none;">{phone}</a></td>
        </tr>
        <tr>
          <td class="label">Service of Interest:</td>
          <td class="value"><strong>{service}</strong></td>
        </tr>
        <tr>
          <td class="label">Submitted At:</td>
          <td class="value">{submitted_at}</td>
        </tr>
      </table>

      <div class="section-title">Enquiry Requirements</div>
      <div class="message-box">{message}</div>
    </div>
    <div class="footer">
      This is an automated notification from ATLAS Technosoft API Backend.<br>
      System of Record: SAP Business One Service Layer.
    </div>
  </div>
</body>
</html>
"""
        return subject, text_body, html_body

    def _format_consultation_email(self, data: Dict[str, Any]) -> Tuple[str, str, str]:
        """Generate subject, text, and HTML body for a Strategic Consultation booking."""
        ref_id = data.get("referenceId", "N/A")
        full_name = data.get("fullName", "N/A")
        company = data.get("companyName", "N/A")
        email = data.get("email", "N/A")
        phone = data.get("phone", "N/A")
        service = data.get("service", "N/A")
        message = data.get("message", "N/A")
        pref_date = data.get("preferredDate") or "Not specified"
        pref_time = data.get("preferredTime") or "Not specified"
        sap_lead = data.get("sapCardCode", "N/A")
        sap_activity = data.get("sapActivityId", "N/A")
        submitted_at = data.get("submittedAt", "N/A")

        subject = f"[Consultation Scheduled] {company} - {pref_date} (Ref: {ref_id})"

        text_body = f"""
======================================================================
ATLAS TECHNOSOFT - STRATEGIC CONSULTATION BOOKING
======================================================================

Reference ID:   {ref_id}
Submitted At:   {submitted_at}
SAP Lead Code:  {sap_lead}
SAP Activity:   {sap_activity} (cn_Meeting)

CONSULTATION SLOT:
----------------------------------------------------------------------
Preferred Date: {pref_date}
Preferred Slot: {pref_time}
Service Focus:  {service}

EXECUTIVE CONTACT:
----------------------------------------------------------------------
Full Name:      {full_name}
Company Name:   {company}
Business Email: {email}
Phone Number:   {phone}

PROJECT SCOPE & AGENDA:
----------------------------------------------------------------------
{message}

======================================================================
This consultation meeting has been scheduled in SAP Business One.
ATLAS Technosoft Enterprise Solutions
"""

        html_body = f"""
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {{ font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f7fc; margin: 0; padding: 24px; color: #1e293b; }}
    .container {{ max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.06); border: 1px solid #e2e8f0; }}
    .header {{ background: linear-gradient(135deg, #0052cc 0%, #0a66c2 100%); padding: 28px 24px; text-align: left; color: #ffffff; }}
    .header h1 {{ margin: 0; font-size: 20px; font-weight: 700; letter-spacing: -0.3px; }}
    .header p {{ margin: 6px 0 0 0; font-size: 13px; opacity: 0.9; }}
    .badge {{ display: inline-block; background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.3); padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: bold; margin-top: 10px; }}
    .content {{ padding: 28px 24px; }}
    .slot-card {{ background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 14px 16px; margin-bottom: 20px; }}
    .slot-title {{ font-size: 12px; font-weight: 700; color: #15803d; text-transform: uppercase; margin-bottom: 6px; }}
    .section-title {{ font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #0866d9; margin-bottom: 12px; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; }}
    .grid {{ width: 100%; border-collapse: collapse; margin-bottom: 20px; }}
    .grid td {{ padding: 8px 0; font-size: 14px; vertical-align: top; }}
    .grid td.label {{ width: 140px; color: #64748b; font-weight: 600; }}
    .grid td.value {{ color: #0f172a; font-weight: 500; }}
    .sap-box {{ background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 14px 16px; margin-bottom: 24px; }}
    .sap-title {{ font-size: 12px; font-weight: 700; color: #1d4ed8; text-transform: uppercase; margin-bottom: 8px; }}
    .message-box {{ background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px 16px; font-size: 14px; line-height: 1.6; color: #334155; white-space: pre-wrap; }}
    .footer {{ background: #f8fafc; padding: 18px 24px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b; text-align: center; }}
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>ATLAS Technosoft — Consultation Scheduled</h1>
      <p>A new strategic consultation booking has been scheduled via the portal.</p>
      <div class="badge">Ref: {ref_id}</div>
    </div>
    <div class="content">
      <div class="slot-card">
        <div class="slot-title">Requested Consultation Slot</div>
        <div style="font-size: 15px; font-weight: 700; color: #166534;">{pref_date} &bull; {pref_time}</div>
      </div>

      <div class="sap-box">
        <div class="sap-title">SAP Business One Records</div>
        <table class="grid" style="margin-bottom: 0;">
          <tr>
            <td class="label">SAP Lead Code:</td>
            <td class="value"><strong>{sap_lead}</strong></td>
          </tr>
          <tr>
            <td class="label">SAP Activity:</td>
            <td class="value"><strong>#{sap_activity}</strong> (Meeting Task)</td>
          </tr>
        </table>
      </div>

      <div class="section-title">Company & Executive Contact</div>
      <table class="grid">
        <tr>
          <td class="label">Executive:</td>
          <td class="value">{full_name}</td>
        </tr>
        <tr>
          <td class="label">Company:</td>
          <td class="value"><strong>{company}</strong></td>
        </tr>
        <tr>
          <td class="label">Business Email:</td>
          <td class="value"><a href="mailto:{email}" style="color: #0866d9; text-decoration: none;">{email}</a></td>
        </tr>
        <tr>
          <td class="label">Phone / WhatsApp:</td>
          <td class="value"><a href="tel:{phone}" style="color: #0866d9; text-decoration: none;">{phone}</a></td>
        </tr>
        <tr>
          <td class="label">Service Focus:</td>
          <td class="value"><strong>{service}</strong></td>
        </tr>
      </table>

      <div class="section-title">Project Scope & Agenda</div>
      <div class="message-box">{message}</div>
    </div>
    <div class="footer">
      Automated dispatch from ATLAS Technosoft API Backend. System of Record: SAP Business One.
    </div>
  </div>
</body>
</html>
"""
        return subject, text_body, html_body

    def _send_smtp_sync(self, subject: str, text_content: str, html_content: str, recipients: List[str]) -> bool:
        """Synchronous SMTP worker designed to run in background thread."""
        if not self.enabled:
            logger.debug("Email notifications disabled via settings. Skipping email dispatch.")
            return False

        if not self.host or not recipients:
            logger.warning("SMTP host or recipient list not configured. Skipping email dispatch.")
            return False

        msg = MIMEMultipart("alternative")
        msg["Subject"] = subject
        msg["From"] = f"{self.from_name} <{self.from_email}>"
        msg["To"] = ", ".join(recipients)

        msg.attach(MIMEText(text_content, "plain", "utf-8"))
        msg.attach(MIMEText(html_content, "html", "utf-8"))

        try:
            logger.info(f"Connecting to SMTP server {self.host}:{self.port} to send notification...")
            server = smtplib.SMTP(self.host, self.port, timeout=15)
            
            if self.use_tls:
                server.starttls()

            if self.user and self.password:
                server.login(self.user, self.password)

            server.sendmail(self.from_email, recipients, msg.as_string())
            server.quit()
            logger.info(f"Email notification successfully sent to: {', '.join(recipients)}")
            return True
        except Exception as exc:
            logger.error(f"Failed to send email notification via {self.host}:{self.port}: {str(exc)}")
            return False

    async def send_contact_enquiry_notification(self, enquiry_data: Dict[str, Any]) -> bool:
        """Dispatches an asynchronous email notification for a Contact Us enquiry."""
        subject, text_body, html_body = self._format_contact_email(enquiry_data)
        return await asyncio.to_thread(
            self._send_smtp_sync,
            subject,
            text_body,
            html_body,
            self.recipients
        )

    async def send_consultation_notification(self, consultation_data: Dict[str, Any]) -> bool:
        """Dispatches an asynchronous email notification for a Consultation request."""
        subject, text_body, html_body = self._format_consultation_email(consultation_data)
        return await asyncio.to_thread(
            self._send_smtp_sync,
            subject,
            text_body,
            html_body,
            self.recipients
        )

    def _format_callback_email(self, data: Dict[str, Any]) -> Tuple[str, str, str]:
        """Generate subject, text, and HTML body for a Request a Callback submission."""
        ref_id = data.get("referenceId", "N/A")
        full_name = data.get("fullName", "N/A")
        company = data.get("companyName", "N/A")
        email = data.get("email", "N/A")
        phone = data.get("phone", "N/A")
        service = data.get("service", "N/A")
        message = data.get("message") or "No additional message provided."
        pref_date = data.get("preferredDate") or "Not specified"
        pref_time = data.get("preferredTime") or "Not specified"
        sap_lead = data.get("sapCardCode", "N/A")
        sap_activity = data.get("sapActivityId", "N/A")
        submitted_at = data.get("submittedAt", "N/A")

        subject = f"[Callback Request] {company} - {pref_date} ({pref_time}) (Ref: {ref_id})"

        text_body = f"""
======================================================================
ATLAS TECHNOSOFT - REQUEST A CALLBACK
======================================================================

Reference ID:   {ref_id}
Submitted At:   {submitted_at}
SAP Lead Code:  {sap_lead}
SAP Activity:   {sap_activity} (cn_Conversation - Phone Call)

REQUESTED CALLBACK WINDOW:
----------------------------------------------------------------------
Preferred Date: {pref_date}
Preferred Slot: {pref_time}
Service Focus:  {service}

CONTACT DETAILS:
----------------------------------------------------------------------
Full Name:      {full_name}
Company Name:   {company}
Business Email: {email}
Phone Number:   {phone}

ADDITIONAL NOTES:
----------------------------------------------------------------------
{message}

======================================================================
This callback interaction has been logged into SAP Business One.
ATLAS Technosoft Enterprise Solutions
"""

        html_body = f"""
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {{ font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f7fc; margin: 0; padding: 24px; color: #1e293b; }}
    .container {{ max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.06); border: 1px solid #e2e8f0; }}
    .header {{ background: linear-gradient(135deg, #142B59 0%, #0052cc 100%); padding: 28px 24px; text-align: left; color: #ffffff; }}
    .header h1 {{ margin: 0; font-size: 20px; font-weight: 700; letter-spacing: -0.3px; }}
    .header p {{ margin: 6px 0 0 0; font-size: 13px; opacity: 0.9; }}
    .badge {{ display: inline-block; background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.3); padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: bold; margin-top: 10px; }}
    .content {{ padding: 28px 24px; }}
    .slot-card {{ background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 14px 16px; margin-bottom: 20px; }}
    .slot-title {{ font-size: 12px; font-weight: 700; color: #1d4ed8; text-transform: uppercase; margin-bottom: 6px; }}
    .section-title {{ font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #0866d9; margin-bottom: 12px; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; }}
    .grid {{ width: 100%; border-collapse: collapse; margin-bottom: 20px; }}
    .grid td {{ padding: 8px 0; font-size: 14px; vertical-align: top; }}
    .grid td.label {{ width: 140px; color: #64748b; font-weight: 600; }}
    .grid td.value {{ color: #0f172a; font-weight: 500; }}
    .sap-box {{ background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px 16px; margin-bottom: 24px; }}
    .sap-title {{ font-size: 12px; font-weight: 700; color: #0f172a; text-transform: uppercase; margin-bottom: 8px; }}
    .message-box {{ background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px 16px; font-size: 14px; line-height: 1.6; color: #334155; white-space: pre-wrap; }}
    .footer {{ background: #f8fafc; padding: 18px 24px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b; text-align: center; }}
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>ATLAS Technosoft — Request a Callback</h1>
      <p>A new callback request has been logged via the corporate website.</p>
      <div class="badge">Ref: {ref_id}</div>
    </div>
    <div class="content">
      <div class="slot-card">
        <div class="slot-title">Requested Callback Window</div>
        <div style="font-size: 15px; font-weight: 700; color: #1e40af;">{pref_date} &bull; {pref_time}</div>
      </div>

      <div class="sap-box">
        <div class="sap-title">SAP Business One Lead & Activity</div>
        <table class="grid" style="margin-bottom: 0;">
          <tr>
            <td class="label">SAP Lead Code:</td>
            <td class="value"><strong>{sap_lead}</strong> (Business Partner)</td>
          </tr>
          <tr>
            <td class="label">SAP Activity ID:</td>
            <td class="value"><strong>#{sap_activity}</strong> (cn_Conversation - Phone Call)</td>
          </tr>
        </table>
      </div>

      <div class="section-title">Prospect Information</div>
      <table class="grid">
        <tr>
          <td class="label">Full Name:</td>
          <td class="value">{full_name}</td>
        </tr>
        <tr>
          <td class="label">Company Name:</td>
          <td class="value"><strong>{company}</strong></td>
        </tr>
        <tr>
          <td class="label">Business Email:</td>
          <td class="value"><a href="mailto:{email}" style="color: #0866d9; text-decoration: none;">{email}</a></td>
        </tr>
        <tr>
          <td class="label">Phone / WhatsApp:</td>
          <td class="value"><a href="tel:{phone}" style="color: #0866d9; text-decoration: none;">{phone}</a></td>
        </tr>
        <tr>
          <td class="label">Service of Interest:</td>
          <td class="value"><strong>{service}</strong></td>
        </tr>
        <tr>
          <td class="label">Submitted At:</td>
          <td class="value">{submitted_at}</td>
        </tr>
      </table>

      <div class="section-title">Additional Message / Context</div>
      <div class="message-box">{message}</div>
    </div>
    <div class="footer">
      Automated notification from ATLAS Technosoft API Backend &bull; SAP Business One Service Layer
    </div>
  </div>
</body>
</html>
"""
        return subject, text_body, html_body

    async def send_callback_notification(self, callback_data: Dict[str, Any]) -> bool:
        """Dispatches an asynchronous email notification for a Callback request."""
        subject, text_body, html_body = self._format_callback_email(callback_data)
        return await asyncio.to_thread(
            self._send_smtp_sync,
            subject,
            text_body,
            html_body,
            self.recipients
        )


# Global singleton instance
email_service = EmailService()
