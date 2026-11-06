import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MessageSquare, Sparkles } from 'lucide-react';
import { ChatWindow } from './chat/ChatWindow';
import { UiChatMessage } from './chat/ChatMessage';
import {
  apiService,
  ChatQuickAction,
  ChatMessagePayload
} from '../../services/api';

const DEFAULT_SUGGESTED_QUESTIONS = [
  'SAP Business One',
  'Boyum IT Solutions',
  'UiPath Automation',
  'ATLAS Add-ons',
  'Implementation & Support',
  'Book a Consultation',
  'Contact Our Team'
];

export const CustomerSupportWidget: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const [sessionId] = useState(() => 'atlas-chat-' + Math.random().toString(36).substring(2, 10));
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<UiChatMessage[]>([]);

  // Initialize welcome message once
  useEffect(() => {
    setMessages([
      {
        id: 'welcome-1',
        role: 'assistant',
        content: '👋 Hi! Welcome to ATLAS Technosoft. How can we help you today?',
        suggestedQuestions: DEFAULT_SUGGESTED_QUESTIONS,
        quickActions: [
          {
            label: '📅 Book a Consultation',
            type: 'consultation',
            payload: '#contact'
          },
          {
            label: '💬 Chat on WhatsApp',
            type: 'whatsapp',
            payload: 'https://wa.me/919372329599?text=Hello%20ATLAS%20Technosoft%2C%20I%20would%20like%20to%20know%20more%20about%20your%20SAP%20Business%20One%20and%20automation%20solutions.'
          },
          {
            label: '🔍 Explore Solutions',
            type: 'link',
            payload: '/solutions'
          }
        ],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, []);

  const handleOpenChat = () => {
    setIsOpen(true);
    setIsMinimized(false);
    setHasUnread(false);
  };

  const handleCloseChat = () => {
    setIsOpen(false);
  };

  const handleMinimizeChat = () => {
    setIsMinimized(!isMinimized);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'welcome-reset-' + Date.now(),
        role: 'assistant',
        content: '👋 Conversation reset. How can we help you today?',
        suggestedQuestions: DEFAULT_SUGGESTED_QUESTIONS,
        quickActions: [
          {
            label: '📅 Book a Consultation',
            type: 'consultation',
            payload: '#contact'
          },
          {
            label: '💬 Chat on WhatsApp',
            type: 'whatsapp',
            payload: 'https://wa.me/919372329599?text=Hello%20ATLAS%20Technosoft%2C%20I%20would%20like%20to%20know%20more%20about%20your%20SAP%20Business%20One%20and%20automation%20solutions.'
          }
        ],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setInputValue('');
  };

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    const userMsg: UiChatMessage = {
      id: 'usr-' + Date.now(),
      role: 'user',
      content: trimmed,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Build history payload for backend context
      const historyPayload: ChatMessagePayload[] = messages.slice(-6).map(m => ({
        role: m.role,
        content: m.content
      }));

      const res = await apiService.sendChatMessage({
        message: trimmed,
        sessionId,
        history: historyPayload
      });

      const assistantMsg: UiChatMessage = {
        id: 'ast-' + Date.now(),
        role: 'assistant',
        content: res.reply,
        quickActions: res.quickActions,
        suggestedQuestions: res.suggestedQuestions,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch {
      const errorMsg: UiChatMessage = {
        id: 'err-' + Date.now(),
        role: 'assistant',
        content: "Thank you for reaching out. We are experiencing a brief connection delay. You can connect with our team immediately on WhatsApp or email sales@atlastechnosoft.com.",
        quickActions: [
          {
            label: '💬 Chat on WhatsApp',
            type: 'whatsapp',
            payload: 'https://wa.me/919372329599?text=Hello%20ATLAS%20Technosoft%2C%20I%20would%20like%20to%20know%20more%20about%20your%20SAP%20Business%20One%20and%20automation%20solutions.'
          },
          {
            label: '✉️ Contact Us',
            type: 'link',
            payload: '/contact'
          }
        ],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleActionClick = (action: ChatQuickAction) => {
    if (action.type === 'whatsapp') {
      window.open(action.payload, '_blank', 'noopener,noreferrer');
    } else if (action.type === 'consultation') {
      if (location.pathname === '/contact') {
        const contactForm = document.querySelector('#contact-form') || document.querySelector('form');
        contactForm?.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate('/contact');
      }
    } else if (action.type === 'link') {
      if (action.payload.startsWith('http')) {
        window.open(action.payload, '_blank', 'noopener,noreferrer');
      } else {
        navigate(action.payload);
      }
    } else if (action.type === 'question') {
      sendMessage(action.payload);
    }
  };

  return (
    <>
      {/* Floating Chat Trigger Button */}
      {!isOpen && (
        <div
          className="fixed z-40 right-4 md:right-8 bottom-20 md:bottom-6 transition-all duration-300"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Tooltip on hover */}
          <div
            className={`absolute right-full top-1/2 -translate-y-1/2 mr-3 px-3 py-1.5 rounded-lg bg-[#0A1B4F] text-white text-xs font-medium tracking-wide shadow-xl whitespace-nowrap pointer-events-none transition-all duration-200 flex items-center gap-1.5 ${
              isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Need help? Ask ATLAS Assistant</span>
            <div className="absolute left-full top-1/2 -translate-y-1/2 -ml-1 border-4 border-transparent border-l-[#0A1B4F]" />
          </div>

          <button
            type="button"
            onClick={handleOpenChat}
            aria-label="Open ATLAS Customer Support Chat"
            className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-[#0A1B4F] via-[#0052A3] to-[#1F4FE0] hover:from-[#071A3A] hover:to-[#004D99] text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-500/40 cursor-pointer"
          >
            {/* Pulsing ring indicator */}
            <span className="absolute inset-0 rounded-full bg-blue-500 opacity-20 animate-ping group-hover:opacity-0" />

            <MessageSquare className="w-6 h-6 text-white drop-shadow-sm transition-transform duration-300 group-hover:scale-110" />

            {/* Notification Badge */}
            {hasUnread && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-md ring-2 ring-white animate-pulse">
                1
              </span>
            )}
          </button>
        </div>
      )}

      {/* Modern Customer Support Chat Window */}
      <ChatWindow
        isOpen={isOpen}
        isMinimized={isMinimized}
        messages={messages}
        inputValue={inputValue}
        isLoading={isLoading}
        onInputChange={setInputValue}
        onSendMessage={sendMessage}
        onActionClick={handleActionClick}
        onClose={handleCloseChat}
        onMinimize={handleMinimizeChat}
        onReset={handleResetChat}
      />
    </>
  );
};

