/**
 * ATLAS Technosoft - Backend API Service
 * Connects frontend forms with FastAPI, SAP Business One, and Smart Chatbot.
 */

export interface ContactEnquiryPayload {
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  service: string;
  message: string;
}

export interface ConsultationPayload extends ContactEnquiryPayload {
  preferredDate?: string;
  preferredTime?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  status: string;
  message: string;
  sapCardCode?: string;
  sapActivityId?: number;
  referenceId?: string;
  preferredDate?: string;
  preferredTime?: string;
  submittedAt?: string;
  errors?: Array<{ field: string; message: string }>;
  details?: string;
}

export interface ChatQuickAction {
  label: string;
  type: 'link' | 'consultation' | 'whatsapp' | 'question';
  payload: string;
}

export interface ChatMessagePayload {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: string;
}

export interface ChatRequestPayload {
  message: string;
  sessionId?: string;
  history?: ChatMessagePayload[];
}

export interface ChatResponseData {
  success: boolean;
  reply: string;
  suggestedQuestions: string[];
  quickActions: ChatQuickAction[];
  sessionId: string;
  timestamp: string;
  source?: string;
}

export interface ChatSuggestionsData {
  welcomeMessage: string;
  suggestedQuestions: string[];
  quickActions: ChatQuickAction[];
}

const API_BASE_URL = ((import.meta as unknown as { env?: { VITE_API_URL?: string } }).env?.VITE_API_URL) || '';

async function handleResponse<T>(res: Response): Promise<T> {
  const data = await res.json().catch(() => ({}));
  
  if (!res.ok) {
    if (data.errors && Array.isArray(data.errors)) {
      const errorMsg = data.errors.map((e: any) => e.message).join('. ');
      throw new Error(errorMsg || data.message || 'Validation failed. Please review your inputs.');
    }

    if (data.detail) {
      if (typeof data.detail === 'string') {
        throw new Error(data.detail);
      } else if (data.detail.message) {
        throw new Error(data.detail.message);
      }
    }

    throw new Error(data.message || `Server request failed with status ${res.status}`);
  }

  return data as T;
}

// Client-side verified company fallback knowledge in case backend is offline
const FALLBACK_KNOWLEDGE: Record<string, { reply: string; actions: ChatQuickAction[]; suggestions: string[] }> = {
  sap: {
    reply: "SAP Business One is an integrated ERP solution that helps businesses manage finance, sales, purchasing, inventory and daily operations. ATLAS Technosoft helps businesses implement and optimize SAP Business One. Would you like to speak with our SAP team?",
    actions: [
      { label: "📅 Book a Consultation", type: "consultation", payload: "#contact" },
      { label: "💬 Chat on WhatsApp", type: "whatsapp", payload: "https://wa.me/919372329599?text=Hello%20ATLAS%20Technosoft%2C%20I%20would%20like%20to%20know%20more%20about%20your%20SAP%20Business%20One%20and%20automation%20solutions." },
      { label: "🔍 Explore Solutions", type: "link", payload: "/solutions" }
    ],
    suggestions: ["Boyum IT Solutions", "Implementation & Support", "Book a Consultation"]
  },
  boyum: {
    reply: "Boyum IT solutions extend SAP Business One with specialized operational power. We implement Beas Manufacturing (APS, MRP II, quality control & shop floor data collection), Produmex WMS (high-performance warehouse automation, barcode/RF scanning), and B1 Usability Package (screen customization & automated workflows). Would you like to explore how Boyum IT fits your operational needs?",
    actions: [
      { label: "📦 Explore Boyum IT", type: "link", payload: "/solutions/boyum-it" },
      { label: "📅 Book a Consultation", type: "consultation", payload: "#contact" },
      { label: "💬 Chat on WhatsApp", type: "whatsapp", payload: "https://wa.me/919372329599?text=Hello%20ATLAS%20Technosoft%2C%20I%20would%20like%20to%20know%20more%20about%20your%20SAP%20Business%20One%20and%20automation%20solutions." }
    ],
    suggestions: ["Beas Manufacturing", "Produmex WMS", "Book a Consultation"]
  },
  uipath: {
    reply: "ATLAS Technosoft is an accredited UiPath Automation Partner. We implement RPA and AI solutions that eliminate repetitive manual work across departments, including automated AP invoice processing, bank reconciliation, sales order entry, and intelligent document understanding integrated directly with SAP Business One.",
    actions: [
      { label: "📅 Book a Consultation", type: "consultation", payload: "#contact" },
      { label: "🔍 Explore Solutions", type: "link", payload: "/solutions" },
      { label: "💬 Chat on WhatsApp", type: "whatsapp", payload: "https://wa.me/919372329599?text=Hello%20ATLAS%20Technosoft%2C%20I%20would%20like%20to%20know%20more%20about%20your%20SAP%20Business%20One%20and%20automation%20solutions." }
    ],
    suggestions: ["ATLAS Add-ons", "SAP Business One", "Book a Consultation"]
  },
  addons: {
    reply: "ATLAS proprietary add-ons are purpose-built to address specialized Indian and global business operations on top of SAP Business One: EXIM & Freight Trading, Gate Entry & Weighment, WMS & Vendor Portal, E-Invoicing & E-Way Bill (real-time GST compliance), and Shipping Automation.",
    actions: [
      { label: "🔍 Explore Solutions", type: "link", payload: "/solutions" },
      { label: "📅 Book a Consultation", type: "consultation", payload: "#contact" },
      { label: "💬 Chat on WhatsApp", type: "whatsapp", payload: "https://wa.me/919372329599?text=Hello%20ATLAS%20Technosoft%2C%20I%20would%20like%20to%20know%20more%20about%20your%20SAP%20Business%20One%20and%20automation%20solutions." }
    ],
    suggestions: ["SAP Business One", "Implementation Process", "Contact Our Team"]
  },
  contact: {
    reply: "You can reach ATLAS Technosoft through:\n• Email: sales@atlastechnosoft.com\n• Phone / WhatsApp: +91 93723 29599\n\nOur Mumbai Offices:\n📍 Borivali Office: Borivali (West), Mumbai, Maharashtra 400092\n📍 Marine Lines Office: Marine Lines, Mumbai, Maharashtra 400020\n\nOur team is available Monday through Friday to discuss your ERP and automation goals.",
    actions: [
      { label: "💬 Chat on WhatsApp", type: "whatsapp", payload: "https://wa.me/919372329599?text=Hello%20ATLAS%20Technosoft%2C%20I%20would%20like%20to%20know%20more%20about%20your%20SAP%20Business%20One%20and%20automation%20solutions." },
      { label: "✉️ Contact Our Team", type: "link", payload: "/contact" },
      { label: "📅 Book a Consultation", type: "consultation", payload: "#contact" }
    ],
    suggestions: ["Book a Consultation", "SAP Business One", "Boyum IT Solutions"]
  },
  pricing: {
    reply: "SAP Business One and enterprise automation licensing and implementation investments depend on your specific user count, required functional modules, cloud vs. on-premise infrastructure, and custom workflows. We do not publish generic prices. Would you like a customized assessment and transparent proposal from our team?",
    actions: [
      { label: "📅 Book a Consultation", type: "consultation", payload: "#contact" },
      { label: "💬 Chat on WhatsApp", type: "whatsapp", payload: "https://wa.me/919372329599?text=Hello%20ATLAS%20Technosoft%2C%20I%20would%20like%20to%20know%20more%20about%20your%20SAP%20Business%20One%20and%20automation%20solutions." }
    ],
    suggestions: ["Book a Consultation", "Implementation Process", "Contact Our Team"]
  }
};

function getClientFallbackReply(query: string, sessionId: string): ChatResponseData {
  const q = query.toLowerCase();
  let matched = FALLBACK_KNOWLEDGE.sap;

  if (q.includes("price") || q.includes("cost") || q.includes("how much") || q.includes("quote")) {
    matched = FALLBACK_KNOWLEDGE.pricing;
  } else if (q.includes("boyum") || q.includes("beas") || q.includes("produmex") || q.includes("b1up") || q.includes("wms")) {
    matched = FALLBACK_KNOWLEDGE.boyum;
  } else if (q.includes("uipath") || q.includes("rpa") || q.includes("automation") || q.includes("bot")) {
    matched = FALLBACK_KNOWLEDGE.uipath;
  } else if (q.includes("add-on") || q.includes("addon") || q.includes("exim") || q.includes("gate entry") || q.includes("freight")) {
    matched = FALLBACK_KNOWLEDGE.addons;
  } else if (q.includes("contact") || q.includes("office") || q.includes("address") || q.includes("phone") || q.includes("email") || q.includes("mumbai") || q.includes("where")) {
    matched = FALLBACK_KNOWLEDGE.contact;
  } else if (q.includes("sap") || q.includes("erp") || q.includes("business one")) {
    matched = FALLBACK_KNOWLEDGE.sap;
  } else {
    return {
      success: true,
      reply: "Thank you for reaching out to ATLAS Technosoft. While I don't have that specific detail in our verified company knowledge base, our team is ready to assist you personally.\n\nWould you like to book a quick consultation or chat directly with our team on WhatsApp?",
      suggestedQuestions: ["SAP Business One", "Boyum IT Solutions", "Book a Consultation"],
      quickActions: [
        { label: "📅 Book a Consultation", type: "consultation", payload: "#contact" },
        { label: "💬 Chat on WhatsApp", type: "whatsapp", payload: "https://wa.me/919372329599?text=Hello%20ATLAS%20Technosoft%2C%20I%20would%20like%20to%20know%20more%20about%20your%20SAP%20Business%20One%20and%20automation%20solutions." },
        { label: "✉️ Contact Our Team", type: "link", payload: "/contact" }
      ],
      sessionId: sessionId || 'session-' + Date.now(),
      timestamp: new Date().toISOString(),
      source: "client_verified_fallback"
    };
  }

  return {
    success: true,
    reply: matched.reply,
    suggestedQuestions: matched.suggestions,
    quickActions: matched.actions,
    sessionId: sessionId || 'session-' + Date.now(),
    timestamp: new Date().toISOString(),
    source: "client_verified_fallback"
  };
}

export const apiService = {
  /**
   * Submit Contact Us Enquiry to SAP Business One
   */
  async submitContact(payload: ContactEnquiryPayload): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/api/v1/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    return handleResponse<ApiResponse>(response);
  },

  /**
   * Book a Strategic Consultation in SAP Business One
   */
  async submitConsultation(payload: ConsultationPayload): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/api/v1/consultations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    return handleResponse<ApiResponse>(response);
  },

  /**
   * Fetch Initial Chat Suggestions & Welcome Prompt
   */
  async getChatSuggestions(): Promise<ChatSuggestionsData> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/chat/suggestions`);
      if (response.ok) {
        return await response.json();
      }
    } catch {
      // Fallback
    }

    return {
      welcomeMessage: "👋 Hi! Welcome to ATLAS Technosoft. How can we help you today?",
      suggestedQuestions: [
        "SAP Business One",
        "Boyum IT Solutions",
        "UiPath Automation",
        "ATLAS Add-ons",
        "Implementation & Support",
        "Book a Consultation",
        "Contact Our Team"
      ],
      quickActions: [
        { label: "📅 Book a Consultation", type: "consultation", payload: "#contact" },
        { label: "💬 Chat on WhatsApp", type: "whatsapp", payload: "https://wa.me/919372329599?text=Hello%20ATLAS%20Technosoft%2C%20I%20would%20like%20to%20know%20more%20about%20your%20SAP%20Business%20One%20and%20automation%20solutions." },
        { label: "🔍 Explore Solutions", type: "link", payload: "/solutions" }
      ]
    };
  },

  /**
   * Send Message to Customer Support Chatbot
   */
  async sendChatMessage(payload: ChatRequestPayload): Promise<ChatResponseData> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      return await handleResponse<ChatResponseData>(response);
    } catch (err) {
      console.warn("Backend chat unavailable, using verified client knowledge responder:", err);
      // Seamlessly answer with client verified knowledge responder
      return getClientFallbackReply(payload.message, payload.sessionId || '');
    }
  },

  /**
   * Health and diagnostics check
   */
  async checkHealth(): Promise<{ status: string; service: string }> {
    const response = await fetch(`${API_BASE_URL}/api/v1/health`);
    return response.json();
  }
};
