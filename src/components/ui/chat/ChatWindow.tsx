import React, { useRef, useEffect } from 'react';
import { Minus, X, RotateCcw, Maximize2 } from 'lucide-react';
import { ChatMessage, UiChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { ChatQuickAction } from '../../../services/api';

interface ChatWindowProps {
  isOpen: boolean;
  isMinimized: boolean;
  messages: UiChatMessage[];
  inputValue: string;
  isLoading: boolean;
  onInputChange: (val: string) => void;
  onSendMessage: (text: string) => void;
  onActionClick: (action: ChatQuickAction) => void;
  onClose: () => void;
  onMinimize: () => void;
  onReset: () => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  isOpen,
  isMinimized,
  messages,
  inputValue,
  isLoading,
  onInputChange,
  onSendMessage,
  onActionClick,
  onClose,
  onMinimize,
  onReset
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages or loading state change
  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isMinimized, isLoading]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-label="ATLAS Customer Support Assistant"
      className={`fixed z-50 right-2 sm:right-4 md:right-8 bottom-16 md:bottom-6 w-[385px] max-w-[calc(100vw-16px)] bg-white rounded-2xl shadow-2xl border border-slate-200/90 flex flex-col overflow-hidden transition-all duration-300 ease-out ${
        isMinimized ? 'h-[62px]' : 'h-[590px] max-h-[calc(100vh-80px)]'
      }`}
    >
      {/* ===================================================================== */}
      {/* Header                                                                */}
      {/* ===================================================================== */}
      <div className="bg-atlas-navy text-white p-3.5 select-none flex items-center justify-between shrink-0 shadow-md">
        <div className="flex items-center gap-2.5">
          {/* ATLAS Monogram Avatar */}
          <div className="relative w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center shrink-0">
            <span className="text-xs font-black tracking-tight text-blue-200">AT</span>
            <span
              className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#0A1B4F]"
              title="Online"
            />
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-sm font-bold tracking-tight text-white leading-tight">
                How can we help you?
              </h3>
              <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded text-[9.5px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Online
              </span>
            </div>
            <p className="text-[11px] text-blue-200/90 leading-tight mt-0.5">
              Ask us anything about our solutions.
            </p>
          </div>
        </div>

        {/* Window Controls: Reset, Minimize, Close */}
        <div className="flex items-center gap-0.5">
          {!isMinimized && (
            <button
              type="button"
              onClick={onReset}
              title="Reset conversation"
              aria-label="Reset conversation"
              className="p-1.5 rounded-md text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}

          <button
            type="button"
            onClick={onMinimize}
            title={isMinimized ? 'Expand' : 'Minimize'}
            aria-label={isMinimized ? 'Expand' : 'Minimize'}
            className="p-1.5 rounded-md text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minus className="w-4 h-4" />}
          </button>

          <button
            type="button"
            onClick={onClose}
            title="Close chat"
            aria-label="Close chat"
            className="p-1.5 rounded-md text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* Body: Scrollable Messages Area & Input                                 */}
      {/* ===================================================================== */}
      {!isMinimized && (
        <>
          <div className="flex-1 overflow-y-auto p-3.5 space-y-3.5 bg-white text-slate-800 text-[13.5px] leading-relaxed">
            {messages.map(msg => (
              <ChatMessage
                key={msg.id}
                message={msg}
                onActionClick={onActionClick}
                onSuggestedQuestionClick={onSendMessage}
              />
            ))}

            {/* Typing / Loading indicator */}
            {isLoading && (
              <div className="flex items-center gap-2 text-slate-500 text-xs py-1">
                <div className="w-7 h-7 rounded-full bg-[#0A1B4F] text-white flex items-center justify-center shrink-0 shadow-xs border border-blue-400/30 text-[11px] font-black">
                  AT
                </div>
                <div className="flex items-center gap-1 bg-white border border-slate-200/90 px-3 py-2 rounded-2xl rounded-bl-xs shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '300ms' }} />
                  <span className="ml-1 text-[11px] font-medium text-slate-500">
                    ATLAS Assistant is typing...
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <ChatInput
            value={inputValue}
            onChange={onInputChange}
            onSubmit={() => onSendMessage(inputValue)}
            isLoading={isLoading}
            placeholder="Ask us anything about our solutions..."
            autoFocus={true}
          />
        </>
      )}
    </div>
  );
};

