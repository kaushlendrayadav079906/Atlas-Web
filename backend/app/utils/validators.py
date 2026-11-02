import re
import html
from typing import Optional


# Regular Expressions
EMAIL_REGEX = re.compile(r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$")
PHONE_REGEX = re.compile(r"^\+?[0-9\s().-]{7,25}$")


def sanitize_text(text: Optional[str]) -> str:
    """
    Sanitize text input:
    - Strips leading/trailing whitespace
    - Escapes dangerous HTML entities (<, >, &, \", \')
    - Removes zero-width or non-printable control characters
    """
    if not text:
        return ""
    
    # Strip dangerous control characters while preserving newline & tab
    cleaned = "".join(ch for ch in text if ch == "\n" or ch == "\t" or (32 <= ord(ch) <= 126) or ord(ch) > 127)
    # Strip and escape HTML
    cleaned = html.escape(cleaned.strip())
    return cleaned


def validate_email_format(email: str) -> str:
    """Validate and normalize email address."""
    email_clean = email.strip().lower()
    if not EMAIL_REGEX.match(email_clean):
        raise ValueError("Invalid business email format. Please provide a valid address (e.g. name@company.com).")
    if len(email_clean) > 100:
        raise ValueError("Email address cannot exceed 100 characters.")
    return email_clean


def validate_phone_format(phone: str) -> str:
    """Validate phone number string."""
    phone_clean = phone.strip()
    if not PHONE_REGEX.match(phone_clean):
        raise ValueError("Invalid phone number format. Please provide a valid phone number (e.g. +91 93723 29599).")
    # Verify it has at least 7 digits
    digits_only = re.sub(r"\D", "", phone_clean)
    if len(digits_only) < 7 or len(digits_only) > 16:
        raise ValueError("Phone number must contain between 7 and 16 digits.")
    return phone_clean


def validate_full_name(name: str) -> str:
    """Validate full name string."""
    clean_name = sanitize_text(name)
    if len(clean_name) < 2:
        raise ValueError("Full name must be at least 2 characters.")
    if len(clean_name) > 100:
        raise ValueError("Full name cannot exceed 100 characters.")
    return clean_name


def validate_company_name(company: str) -> str:
    """Validate company name string."""
    clean_company = sanitize_text(company)
    if len(clean_company) < 2:
        raise ValueError("Company name must be at least 2 characters.")
    if len(clean_company) > 120:
        raise ValueError("Company name cannot exceed 120 characters.")
    return clean_company


def validate_message_text(message: str) -> str:
    """Validate message body."""
    clean_msg = sanitize_text(message)
    if len(clean_msg) < 10:
        raise ValueError("Message must be at least 10 characters long to provide sufficient context.")
    if len(clean_msg) > 3000:
        raise ValueError("Message cannot exceed 3000 characters.")
    return clean_msg

