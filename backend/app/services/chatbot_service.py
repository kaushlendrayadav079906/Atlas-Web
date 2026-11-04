"""
ATLAS Technosoft - Customer Support Chatbot & Knowledge Service
Provides accurate, verified, company-grounded answers for customer queries.
Supports built-in structured retrieval engine and optional external AI (OpenAI/Gemini).
"""

import os
import re
import uuid
import logging
from datetime import datetime, timezone
from typing import List, Dict, Any, Optional, Tuple

from app.config import settings
from app.schemas.chat import ChatMessage, ChatQuickAction, ChatResponse, ChatSuggestionsResponse

logger = logging.getLogger("atlas.chatbot")

# Standard Quick Actions
ACTION_BOOK_CONSULTATION = ChatQuickAction(
    label="📅 Book a Consultation",
    type="consultation",
    payload="#contact"
)
ACTION_WHATSAPP = ChatQuickAction(
    label="💬 Chat on WhatsApp",
    type="whatsapp",
    payload="https://wa.me/919372329599?text=Hello%20ATLAS%20Technosoft%2C%20I%20would%20like%20to%20know%20more%20about%20your%20SAP%20Business%20One%20and%20automation%20solutions."
)
ACTION_VIEW_SOLUTIONS = ChatQuickAction(
    label="🔍 Explore Solutions",
    type="link",
    payload="/solutions"
)
ACTION_VIEW_SERVICES = ChatQuickAction(
    label="⚙️ View Services",
    type="link",
    payload="/services"
)
ACTION_CONTACT_PAGE = ChatQuickAction(
    label="✉️ Contact Our Team",
    type="link",
    payload="/contact"
)

# Standard Suggested Questions for Welcome & Prompt Pills
DEFAULT_SUGGESTED_QUESTIONS = [
    "SAP Business One",
    "Boyum IT Solutions",
    "UiPath Automation",
    "ATLAS Add-ons",
    "Implementation & Support",
    "Book a Consultation",
    "Contact Our Team"
]

WELCOME_MESSAGE = "👋 Hi! Welcome to ATLAS Technosoft. How can we help you today?"

# ============================================================================
# VERIFIED ATLAS TECHNOSOFT COMPANY KNOWLEDGE BASE
# ============================================================================

KNOWLEDGE_BASE: List[Dict[str, Any]] = [
    {
        "id": "sap_b1_overview",
        "keywords": [
            "sap", "sap business one", "sap b1", "what is sap", "what is sap business one",
            "erp", "erp solution", "b1", "features of sap", "sap overview"
        ],
        "reply": (
            "SAP Business One is an integrated ERP solution that helps businesses manage finance, sales, "
            "purchasing, inventory and daily operations. ATLAS Technosoft helps businesses implement and "
            "optimize SAP Business One. Would you like to speak with our SAP team?"
        ),
        "quickActions": [ACTION_BOOK_CONSULTATION, ACTION_WHATSAPP, ACTION_VIEW_SOLUTIONS],
        "suggestedFollowups": ["Boyum IT Solutions", "Implementation & Support", "Book a Consultation"]
    },
    {
        "id": "company_profile",
        "keywords": [
            "atlas", "atlas technosoft", "who are you", "about atlas", "company profile",
            "experience", "partner", "silver partner", "about us", "background", "clients"
        ],
        "reply": (
            "ATLAS Technosoft is a certified SAP Silver Partner, Boyum IT Silver Partner, and UiPath "
            "Automation Partner based in Mumbai, India. With 20+ years of technology leadership and over "
            "80 successful implementations, we specialize in SAP Business One ERP, Boyum manufacturing & "
            "warehouse solutions, and intelligent RPA automation for high-growth enterprises."
        ),
        "quickActions": [ACTION_VIEW_SERVICES, ACTION_CONTACT_PAGE, ACTION_BOOK_CONSULTATION],
        "suggestedFollowups": ["SAP Business One", "Our Trusted Partners", "Office Locations"]
    },
    {
        "id": "boyum_it_solutions",
        "keywords": [
            "boyum", "boyum it", "beas", "beas manufacturing", "produmex", "produmex wms",
            "b1up", "b1 usability package", "wms", "manufacturing add-on", "boyum solutions"
        ],
        "reply": (
            "Boyum IT solutions extend SAP Business One with specialized operational power. We implement:\n"
            "• Beas Manufacturing: Advanced Planning & Scheduling (APS), MRP II, quality control & shop floor data collection.\n"
            "• Produmex WMS: High-performance warehouse automation, barcode/RF scanning, batch/serial tracking.\n"
            "• B1 Usability Package (B1UP): Screen customization, 300+ validation rules, and automated workflows.\n\n"
            "Would you like to explore how Boyum IT fits your operational needs?"
        ),
        "quickActions": [
            ChatQuickAction(label="📦 Explore Boyum IT", type="link", payload="/solutions/boyum-it"),
            ACTION_BOOK_CONSULTATION,
            ACTION_WHATSAPP
        ],
        "suggestedFollowups": ["Beas Manufacturing", "Produmex WMS", "Book a Consultation"]
    },
    {
        "id": "uipath_automation",
        "keywords": [
            "uipath", "rpa", "automation", "robotic process automation", "ai automation",
            "invoice processing", "document understanding", "hyperautomation", "bots"
        ],
        "reply": (
            "ATLAS Technosoft is an accredited UiPath Automation Partner. We implement RPA and AI solutions that "
            "eliminate repetitive manual work across departments, including automated AP invoice processing, "
            "bank reconciliation, sales order entry, and intelligent document understanding integrated directly "
            "with SAP Business One."
        ),
        "quickActions": [ACTION_BOOK_CONSULTATION, ACTION_VIEW_SOLUTIONS, ACTION_WHATSAPP],
        "suggestedFollowups": ["ATLAS Add-ons", "SAP Business One", "Book a Consultation"]
    },
    {
        "id": "atlas_addons",
        "keywords": [
            "addon", "add-on", "add ons", "add-ons", "atlas add-ons", "proprietary",
            "exim", "gate entry", "weighment", "shipping automation", "payroll", "e-invoicing", "gst"
        ],
        "reply": (
            "ATLAS proprietary add-ons are purpose-built to address specialized Indian and global business operations on top of SAP Business One:\n"
            "• EXIM & Freight Trading: Export-import documentation, shipping bill tracking & landed cost calculation.\n"
            "• Gate Entry & Weighment: Automated weighbridge capture and gate pass security.\n"
            "• WMS & Vendor Portal: Supplier collaboration, PO acknowledgment & ASN.\n"
            "• E-Invoicing & E-Way Bill: Seamless real-time GST portal compliance.\n"
            "• Shipping Automation: Logistics carrier integration & automated manifests."
        ),
        "quickActions": [ACTION_VIEW_SOLUTIONS, ACTION_BOOK_CONSULTATION, ACTION_WHATSAPP],
        "suggestedFollowups": ["SAP Business One", "Implementation Process", "Contact Our Team"]
    },
    {
        "id": "manufacturing_solutions",
        "keywords": [
            "manufacturing", "discrete manufacturing", "process manufacturing", "production",
            "bill of materials", "bom", "mrp", "routing", "shop floor", "machine utilization"
        ],
        "reply": (
            "Our manufacturing solutions combine SAP Business One with Beas Manufacturing to provide multi-level "
            "BOM management, Material Requirements Planning (MRP), Advanced Planning & Scheduling (APS), "
            "scrap tracking, and mobile shop-floor terminal execution for discrete, chemical, and industrial manufacturing."
        ),
        "quickActions": [ACTION_BOOK_CONSULTATION, ACTION_WHATSAPP],
        "suggestedFollowups": ["Boyum IT Solutions", "Case Studies", "Book a Consultation"]
    },
    {
        "id": "warehouse_logistics",
        "keywords": [
            "warehouse", "logistics", "inventory", "bin management", "rf scanning",
            "batch tracking", "serial tracking", "3pl", "supply chain"
        ],
        "reply": (
            "For warehouse and logistics, we deliver Produmex WMS and ATLAS logistics tools integrated with "
            "SAP Business One. Capabilities include multi-zone bin management, GS1 barcode scanning, real-time "
            "batch/expiry lifecycle traceability, guided pick-pack-ship, and automated consignment generation."
        ),
        "quickActions": [ACTION_BOOK_CONSULTATION, ACTION_VIEW_SOLUTIONS],
        "suggestedFollowups": ["Boyum IT Solutions", "ATLAS Add-ons", "Contact Our Team"]
    },
    {
        "id": "finance_admin",
        "keywords": [
            "finance", "accounting", "general ledger", "ap", "ar", "cash flow",
            "fixed assets", "multi currency", "financial reporting"
        ],
        "reply": (
            "SAP Business One delivers comprehensive financial management covering General Ledger, Accounts "
            "Payable and Receivable, automated bank reconciliation, asset management, budget control, and "
            "audit-ready reporting with multi-currency handling."
        ),
        "quickActions": [ACTION_BOOK_CONSULTATION, ACTION_VIEW_SERVICES],
        "suggestedFollowups": ["SAP Business One", "UiPath Automation", "Book a Consultation"]
    },
    {
        "id": "trading_shipping",
        "keywords": [
            "trading", "shipping", "freight", "export", "import", "customs",
            "indent", "container", "landed cost", "distribution"
        ],
        "reply": (
            "Our trading and shipping solutions streamline indent management, container tracking, landed cost "
            "allocation, multi-currency pricing, and customs clearance workflows, providing complete visibility from "
            "purchase order to port delivery."
        ),
        "quickActions": [ACTION_VIEW_SOLUTIONS, ACTION_BOOK_CONSULTATION],
        "suggestedFollowups": ["ATLAS Add-ons", "SAP Business One", "Book a Consultation"]
    },
    {
        "id": "implementation_process",
        "keywords": [
            "implementation", "methodology", "process", "how do you implement", "steps",
            "timeline", "deployment", "asap", "go live", "support", "amc"
        ],
        "reply": (
            "ATLAS Technosoft follows a disciplined 5-stage implementation methodology:\n"
            "1. Scoping & Project Kickoff\n"
            "2. Business Blueprint & Gap Analysis\n"
            "3. System Realization & Configuration\n"
            "4. User Acceptance Testing (UAT) & Data Migration\n"
            "5. Go-Live & Post-Go-Live Hypercare Support\n\n"
            "We also provide ongoing Annual Maintenance Contracts (AMC) and dedicated SLA support."
        ),
        "quickActions": [ACTION_BOOK_CONSULTATION, ACTION_VIEW_SERVICES, ACTION_WHATSAPP],
        "suggestedFollowups": ["Book a Consultation", "SAP Business One", "Contact Our Team"]
    },
    {
        "id": "consultation_process",
        "keywords": [
            "consultation", "book a consultation", "demo", "meeting", "assessment",
            "enquiry", "talk to expert", "how to start", "discovery"
        ],
        "reply": (
            "Booking a consultation with ATLAS Technosoft is fast and straightforward:\n"
            "1. Click 'Book a Consultation' on the website or message us here.\n"
            "2. Share your business profile and current system challenges.\n"
            "3. Our senior SAP solution architects will schedule a complimentary 45-minute discovery session and live demo tailored to your industry."
        ),
        "quickActions": [ACTION_BOOK_CONSULTATION, ACTION_WHATSAPP],
        "suggestedFollowups": ["Contact Our Team", "SAP Business One", "Office Locations"]
    },
    {
        "id": "contact_offices",
        "keywords": [
            "contact", "phone", "email", "address", "office", "location", "locations",
            "mumbai", "borivali", "marine lines", "reach you", "where are you", "call"
        ],
        "reply": (
            "You can reach ATLAS Technosoft through:\n"
            "• Email: sales@atlastechnosoft.com\n"
            "• Phone / WhatsApp: +91 93723 29599\n\n"
            "Our Mumbai Offices:\n"
            "📍 Borivali Office: Borivali (West), Mumbai, Maharashtra 400092\n"
            "📍 Marine Lines Office: Marine Lines, Mumbai, Maharashtra 400020\n\n"
            "Our team is available Monday through Friday to discuss your ERP and automation goals."
        ),
        "quickActions": [ACTION_WHATSAPP, ACTION_CONTACT_PAGE, ACTION_BOOK_CONSULTATION],
        "suggestedFollowups": ["Book a Consultation", "SAP Business One", "Boyum IT Solutions"]
    },
    {
        "id": "pricing_costs",
        "keywords": [
            "price", "pricing", "cost", "how much", "rate", "quotation", "quote", "charges", "fees"
        ],
        "reply": (
            "SAP Business One and enterprise automation licensing and implementation investments depend on your "
            "specific user count, required functional modules, cloud vs. on-premise infrastructure, and custom workflows. "
            "We do not publish generic prices. Would you like a customized assessment and transparent proposal from our team?"
        ),
        "quickActions": [ACTION_BOOK_CONSULTATION, ACTION_WHATSAPP, ACTION_CONTACT_PAGE],
        "suggestedFollowups": ["Book a Consultation", "Implementation Process", "Contact Our Team"]
    }
]

# Polite fallback response when question cannot be answered from verified knowledge
FALLBACK_REPLY = (
    "Thank you for your question. While I don't have that specific detail in our verified company "
    "knowledge base, our ATLAS Technosoft team is ready to assist you personally.\n\n"
    "Would you like to book a quick consultation or chat directly with our team on WhatsApp?"
)


STOPWORDS = {
    "a", "an", "the", "is", "are", "was", "were", "be", "been", "being",
    "have", "has", "had", "do", "does", "did", "can", "could", "shall",
    "should", "will", "would", "may", "might", "must", "and", "or", "but",
    "if", "because", "as", "what", "which", "who", "whom", "this", "that",
    "these", "those", "am", "it", "its", "you", "your", "yours", "we",
    "our", "ours", "i", "me", "my", "mine", "he", "she", "they", "them",
    "their", "of", "in", "to", "for", "with", "on", "at", "from", "by",
    "about", "into", "through", "during", "before", "after", "above", "below",
    "up", "down", "off", "over", "under", "again", "further", "then", "once",
    "here", "there", "when", "where", "why", "how", "all", "any", "both",
    "each", "few", "more", "most", "other", "some", "such", "no", "nor",
    "not", "only", "own", "same", "so", "than", "too", "very", "just",
    "tell", "know", "want", "like", "please", "help"
}


class ChatbotService:
    """
    Intelligent chatbot service for ATLAS Technosoft.
    Enforces factual accuracy from verified company knowledge base.
    """

    def __init__(self):
        self.knowledge = KNOWLEDGE_BASE

    def get_welcome_suggestions(self) -> ChatSuggestionsResponse:
        """Returns standard suggestions and quick action chips for initial widget render."""
        return ChatSuggestionsResponse(
            welcomeMessage=WELCOME_MESSAGE,
            suggestedQuestions=DEFAULT_SUGGESTED_QUESTIONS,
            quickActions=[ACTION_BOOK_CONSULTATION, ACTION_WHATSAPP, ACTION_VIEW_SOLUTIONS]
        )

    def _match_knowledge(self, query: str) -> Optional[Dict[str, Any]]:
        """
        Calculates match score across knowledge base entries using whole-word matching,
        phrase overlap, and intent weighting. Returns None if confidence is low.
        """
        clean_query = query.lower()

        # Check intent-specific precedence first
        pricing_terms = ["price", "pricing", "cost", "how much", "rate", "quotation", "quote", "charges", "fees", "expensive"]
        if any(re.search(rf"\b{re.escape(term)}\b", clean_query) for term in pricing_terms):
            for entry in self.knowledge:
                if entry["id"] == "pricing_costs":
                    return entry

        best_entry = None
        best_score = 0.0

        for entry in self.knowledge:
            score = 0.0
            for keyword in entry["keywords"]:
                keyword_clean = keyword.lower().strip()
                words = keyword_clean.split()

                if len(words) > 1:
                    # Multi-word phrase match
                    if keyword_clean in clean_query:
                        score += 8.0 + (3.0 * len(words))
                else:
                    # Single word match - ignore stopwords
                    if keyword_clean not in STOPWORDS:
                        if re.search(rf"\b{re.escape(keyword_clean)}\b", clean_query):
                            score += 5.0

            if score > best_score:
                best_score = score
                best_entry = entry

        # Threshold check: requires a confident, domain-relevant match
        if best_score >= 5.0 and best_entry:
            return best_entry

        return None

        # Threshold check
        if best_score >= 3.0 and best_entry:
            return best_entry

        return None

    async def _query_external_llm(
        self,
        user_message: str,
        history: List[ChatMessage]
    ) -> Optional[str]:
        """
        Queries external AI LLM (OpenAI/Gemini) if configured, using ATLAS knowledge as ground truth.
        """
        if not settings.CHATBOT_AI_ENABLED:
            return None

        # Build context from knowledge base
        context_text = "\n\n".join([
            f"Topic: {k['id']}\nContent: {k['reply']}" for k in self.knowledge
        ])

        system_instruction = (
            "You are the official ATLAS Technosoft Assistant on the company website.\n"
            "Rules:\n"
            "1. Answer strictly and factually based on the provided company facts.\n"
            "2. Never invent pricing, certifications, or implementation timelines.\n"
            "3. If information is not known, politely tell the user that an ATLAS team member can assist them and suggest contacting sales@atlastechnosoft.com or WhatsApp.\n"
            "4. Keep answers concise, professional, customer-friendly, and under 150 words.\n\n"
            f"Approved Company Facts:\n{context_text}"
        )

        # Check OpenAI
        if settings.OPENAI_API_KEY:
            try:
                import httpx
                messages = [{"role": "system", "content": system_instruction}]
                for h in history[-4:]:
                    messages.append({"role": h.role, "content": h.content})
                messages.append({"role": "user", "content": user_message})

                async with httpx.AsyncClient(timeout=10.0) as client:
                    resp = await client.post(
                        "https://api.openai.com/v1/chat/completions",
                        headers={
                            "Authorization": f"Bearer {settings.OPENAI_API_KEY}",
                            "Content-Type": "application/json"
                        },
                        json={
                            "model": settings.CHATBOT_MODEL,
                            "messages": messages,
                            "temperature": 0.3,
                            "max_tokens": 300
                        }
                    )
                    if resp.status_code == 200:
                        data = resp.json()
                        reply = data["choices"][0]["message"]["content"].strip()
                        return reply
            except Exception as exc:
                logger.warning(f"External OpenAI call failed, falling back to local knowledge engine: {exc}")

        return None

    async def generate_reply(
        self,
        message: str,
        session_id: Optional[str] = None,
        history: Optional[List[ChatMessage]] = None
    ) -> ChatResponse:
        """
        Generates an authoritative, factual company response for customer questions.
        """
        effective_session_id = session_id or str(uuid.uuid4())
        effective_history = history or []
        timestamp = datetime.now(timezone.utc).isoformat()

        # Step 1: Check if an external LLM is configured and reachable
        ai_reply = await self._query_external_llm(message, effective_history)
        if ai_reply:
            return ChatResponse(
                success=True,
                reply=ai_reply,
                suggestedQuestions=["Book a Consultation", "Chat on WhatsApp", "SAP Business One"],
                quickActions=[ACTION_BOOK_CONSULTATION, ACTION_WHATSAPP],
                sessionId=effective_session_id,
                timestamp=timestamp,
                source="ai_engine"
            )

        # Step 2: Use deterministic high-precision Knowledge Base Matcher
        matched = self._match_knowledge(message)

        if matched:
            return ChatResponse(
                success=True,
                reply=matched["reply"],
                suggestedQuestions=matched.get("suggestedFollowups", DEFAULT_SUGGESTED_QUESTIONS[:3]),
                quickActions=matched.get("quickActions", [ACTION_BOOK_CONSULTATION, ACTION_WHATSAPP]),
                sessionId=effective_session_id,
                timestamp=timestamp,
                source="knowledge_base"
            )

        # Step 3: Polite fallback without hallucinating or inventing claims
        return ChatResponse(
            success=True,
            reply=FALLBACK_REPLY,
            suggestedQuestions=["SAP Business One", "Boyum IT Solutions", "Book a Consultation"],
            quickActions=[ACTION_BOOK_CONSULTATION, ACTION_WHATSAPP, ACTION_CONTACT_PAGE],
            sessionId=effective_session_id,
            timestamp=timestamp,
            source="knowledge_base_fallback"
        )


chatbot_service = ChatbotService()
