import re
import html
from typing import List, Optional, Literal
from pydantic import BaseModel, Field, field_validator


class ChatMessage(BaseModel):
    """Represents a single message in a chat history sequence."""
    role: Literal["user", "assistant", "system"]
    content: str = Field(..., min_length=1, max_length=2000)
    timestamp: Optional[str] = None

    @field_validator("content")
    @classmethod
    def sanitize_content(cls, v: str) -> str:
        # Strip harmful HTML tags and whitespace
        clean = re.sub(r"<[^>]*?>", "", v).strip()
        return clean


class ChatQuickAction(BaseModel):
    """Action chip displayed below assistant replies (e.g. Book Consultation, WhatsApp)."""
    label: str
    type: Literal["link", "consultation", "whatsapp", "question"]
    payload: str


class ChatRequest(BaseModel):
    """Incoming user chat query."""
    message: str = Field(..., min_length=1, max_length=1000, description="Visitor question or message")
    sessionId: Optional[str] = Field(default=None, max_length=64, description="Session identifier")
    history: Optional[List[ChatMessage]] = Field(default_factory=list, description="Recent conversation turns")

    @field_validator("message")
    @classmethod
    def validate_message(cls, v: str) -> str:
        if not v or not v.strip():
            raise ValueError("Message cannot be empty or blank")
        # Strip HTML tags and normalize whitespace
        sanitized = re.sub(r"<[^>]*?>", "", v).strip()
        if not sanitized:
            raise ValueError("Message contains invalid characters")
        return sanitized


class ChatResponse(BaseModel):
    """Outgoing assistant response with verified company knowledge."""
    success: bool = True
    reply: str
    suggestedQuestions: List[str] = Field(default_factory=list)
    quickActions: List[ChatQuickAction] = Field(default_factory=list)
    sessionId: str
    timestamp: str
    source: str = "knowledge_base"


class ChatSuggestionsResponse(BaseModel):
    """Welcome prompt and suggested query pills."""
    welcomeMessage: str
    suggestedQuestions: List[str]
    quickActions: List[ChatQuickAction]
