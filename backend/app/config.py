import os
from typing import List
from pydantic import Field, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """
    Central application settings loaded from environment variables and .env file.
    Follows 12-factor configuration guidelines.
    """
    # Application Configuration
    APP_ENV: str = Field(default="development", description="Environment: development, staging, production")
    APP_NAME: str = Field(default="ATLAS Technosoft API", description="Service title")
    APP_HOST: str = Field(default="0.0.0.0", description="Host bind address")
    APP_PORT: int = Field(default=8000, description="Port number")

    # CORS Configuration
    FRONTEND_URL: str = Field(
        default="http://localhost:5173,http://127.0.0.1:5173,http://localhost:4173,http://127.0.0.1:4173",
        description="Comma-separated allowed frontend origins for CORS"
    )

    # SAP Business One Service Layer Configuration
    SAP_BASE_URL: str = Field(
        default="https://hana-b1-server.atlastechnosoft.com:50000/b1s/v1",
        description="Base URL of SAP Service Layer (e.g. https://server:50000/b1s/v1)"
    )
    SAP_COMPANY_DB: str = Field(default="SBODEMOIN", description="SAP Company Database name")
    SAP_USERNAME: str = Field(default="manager", description="SAP Service Layer User")
    SAP_PASSWORD: str = Field(default="", description="SAP Service Layer User Password")
    SAP_VERIFY_SSL: bool = Field(default=True, description="Enforce SSL verification for SAP requests")
    SAP_TIMEOUT_SECONDS: float = Field(default=20.0, description="Request timeout in seconds")
    SAP_SESSION_TIMEOUT_MINUTES: int = Field(default=25, description="Cached session validity period")
    
    # Mock fallback for offline / development environments
    # IMPORTANT: Automatically disabled and rejected when APP_ENV == "production"
    MOCK_SAP_IN_DEV: bool = Field(
        default=True,
        description="Allow high-fidelity mock fallback in development when live SAP server is unavailable"
    )

    # Security & Rate Limiting
    RATE_LIMIT_PER_MINUTE: int = Field(default=20, description="Max requests per minute per IP")
    DUPLICATE_WINDOW_SECONDS: int = Field(default=300, description="Window to prevent duplicate submissions")

    # Storage for Idempotency
    IDEMPOTENCY_STORAGE: str = Field(default="sqlite", description="Storage backend: memory or sqlite")
    IDEMPOTENCY_DB_PATH: str = Field(default="", description="Optional path to sqlite database")

    # Email Notifications (SMTP)
    ENABLE_EMAIL_NOTIFICATIONS: bool = Field(
        default=False,
        description="Enable automated email notifications on new enquiries"
    )
    SMTP_HOST: str = Field(default="smtp.gmail.com", description="SMTP server hostname")
    SMTP_PORT: int = Field(default=587, description="SMTP port (typically 587 for STARTTLS or 465 for SSL)")
    SMTP_USER: str = Field(default="", description="SMTP account username")
    SMTP_PASSWORD: str = Field(default="", description="SMTP account password or application password")
    SMTP_FROM_EMAIL: str = Field(default="sales@atlastechnosoft.com", description="Sender email address")
    SMTP_FROM_NAME: str = Field(default="ATLAS Technosoft Website", description="Sender display name")
    NOTIFICATION_RECIPIENT_EMAILS: str = Field(
        default="sales@atlastechnosoft.com",
        description="Comma-separated recipient emails for new enquiry notifications"
    )
    SMTP_USE_TLS: bool = Field(default=True, description="Enforce STARTTLS encryption for SMTP")

    # Chatbot & AI Configuration
    CHATBOT_RATE_LIMIT_PER_MINUTE: int = Field(
        default=30,
        description="Max chatbot requests per minute per IP"
    )
    CHATBOT_AI_ENABLED: bool = Field(
        default=False,
        description="Enable live external LLM for chatbot if API key is provided"
    )
    OPENAI_API_KEY: str = Field(
        default="",
        description="Optional OpenAI API key for LLM-powered chatbot responses"
    )
    GEMINI_API_KEY: str = Field(
        default="",
        description="Optional Gemini API key for LLM-powered chatbot responses"
    )
    CHATBOT_MODEL: str = Field(
        default="gpt-4o-mini",
        description="Model name to use for AI chat if enabled"
    )

    model_config = SettingsConfigDict(
        env_file=os.path.join(os.path.dirname(os.path.dirname(__file__)), ".env"),
        env_file_encoding="utf-8",
        extra="ignore",
        case_sensitive=True
    )

    @property
    def is_production(self) -> bool:
        return self.APP_ENV.lower() == "production"

    @property
    def cors_origins(self) -> List[str]:
        """Parse comma-separated origins into a clean list without trailing slashes."""
        origins = [orig.strip().rstrip("/") for orig in self.FRONTEND_URL.split(",") if orig.strip()]
        return origins

    @property
    def recipient_emails(self) -> List[str]:
        """Parse comma-separated recipient emails."""
        return [em.strip() for em in self.NOTIFICATION_RECIPIENT_EMAILS.split(",") if em.strip()]

    def model_post_init(self, __context):
        """Enforce production security constraints upon initialization."""
        if self.is_production:
            # Strictly disable mock mode in production
            self.MOCK_SAP_IN_DEV = False

    @field_validator("SAP_BASE_URL")
    @classmethod
    def clean_sap_base_url(cls, v: str) -> str:
        """Ensure base URL is stripped of trailing slashes."""
        return v.strip().rstrip("/")


# Singleton instance
settings = Settings()

