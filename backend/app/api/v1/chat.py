"""
ATLAS Technosoft - Chatbot API Endpoint
Enables visitor assistance grounded in verified company knowledge.
"""

import logging
from fastapi import APIRouter, HTTPException, status, Request
from app.config import settings
from app.schemas.chat import (
    ChatRequest,
    ChatResponse,
    ChatSuggestionsResponse
)
from app.services.chatbot_service import chatbot_service
from app.utils.rate_limiter import rate_limiter

logger = logging.getLogger("atlas.api.chat")

router = APIRouter(prefix="/chat", tags=["Customer Support Chatbot"])


@router.get(
    "/suggestions",
    response_model=ChatSuggestionsResponse,
    summary="Get initial welcome message and suggested query topics",
    description="Returns verified quick-reply options, company topics, and default action chips for the chat widget."
)
async def get_chat_suggestions() -> ChatSuggestionsResponse:
    """Returns initial suggested questions and welcome text."""
    return chatbot_service.get_welcome_suggestions()


@router.post(
    "",
    response_model=ChatResponse,
    status_code=status.HTTP_200_OK,
    summary="Ask ATLAS Support Assistant a question",
    description="Queries the verified ATLAS knowledge base for accurate company information regarding SAP B1, Boyum, UiPath, and proprietary solutions."
)
async def chat_message(
    payload: ChatRequest,
    request: Request
) -> ChatResponse:
    """
    Handles customer support messages.
    Enforces IP-based rate limiting and validates input to prevent abuse.
    """
    # 1. Rate limiting
    rate_limiter.check(
        request,
        max_requests=settings.CHATBOT_RATE_LIMIT_PER_MINUTE,
        window_sec=60
    )

    try:
        # 2. Generate response from company knowledge
        response = await chatbot_service.generate_reply(
            message=payload.message,
            session_id=payload.sessionId,
            history=payload.history
        )
        return response

    except Exception as exc:
        logger.error(f"Error handling chat message: {exc}", exc_info=True)
        safe_detail = {
            "message": "Unable to process chat inquiry at this moment. Please try again or chat with our team on WhatsApp.",
            "error_type": "chatbot_service_error"
        }
        if not settings.is_production:
            safe_detail["details"] = str(exc)

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=safe_detail
        )
