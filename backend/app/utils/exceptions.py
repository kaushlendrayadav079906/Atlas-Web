from typing import Optional, Any, Dict


class BackendBaseException(Exception):
    """Base exception for ATLAS Technosoft backend services."""
    def __init__(self, message: str, details: Optional[Dict[str, Any]] = None):
        super().__init__(message)
        self.message = message
        self.details = details or {}


class SAPError(BackendBaseException):
    """Base exception for SAP Business One Service Layer interactions."""
    def __init__(self, message: str, status_code: int = 502, error_code: Optional[int] = None, details: Optional[Dict[str, Any]] = None):
        super().__init__(message, details)
        self.status_code = status_code
        self.error_code = error_code


class SAPAuthenticationError(SAPError):
    """Raised when SAP login fails due to invalid credentials, locked user, or database mismatch."""
    def __init__(self, message: str = "Failed to authenticate with SAP Service Layer", details: Optional[Dict[str, Any]] = None):
        super().__init__(message=message, status_code=401, error_code=1001, details=details)


class SAPSessionExpiredError(SAPError):
    """Raised when the cached SAP session is invalid or timed out."""
    def __init__(self, message: str = "SAP session has expired or is invalid", details: Optional[Dict[str, Any]] = None):
        super().__init__(message=message, status_code=401, error_code=1002, details=details)


class SAPConnectionError(SAPError):
    """Raised when the SAP Service Layer is unreachable or timed out."""
    def __init__(self, message: str = "SAP Service Layer connection failed or timed out", details: Optional[Dict[str, Any]] = None):
        super().__init__(message=message, status_code=504, error_code=1003, details=details)


class SAPRecordCreationError(SAPError):
    """Raised when SAP rejects creation of Business Partner, Lead, or Activity."""
    def __init__(self, message: str, error_code: Optional[int] = None, details: Optional[Dict[str, Any]] = None):
        super().__init__(message=message, status_code=422, error_code=error_code, details=details)


class DuplicateSubmissionError(BackendBaseException):
    """Raised when a client submits an identical enquiry within the deduplication window."""
    def __init__(self, message: str = "An identical submission was recently received. Please allow a few minutes before resubmitting."):
        super().__init__(message=message, details={"duplicate": True})

