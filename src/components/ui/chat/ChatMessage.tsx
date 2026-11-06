import React from 'react';
import { ExternalLink, Calendar, ArrowRight, Mail } from 'lucide-react';
import { ChatQuickAction } from '../../../services/api';
import { SuggestedQuestions } from './SuggestedQuestions';

export interface UiChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  quickActions?: ChatQuickAction[];
  suggestedQuestions?: string[];
  timestamp: string;
}

interface ChatMessageProps {
  message: UiChatMessage;
  onActionClick: (action: ChatQuickAction) => void;
  onSuggestedQuestionClick: (question: string) => void;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  onActionClick,
  onSuggestedQuestionClick
}) => {
  const isUser = message.role === 'user';

  const renderFormattedContent = (content: string) => {
    // Process markdown bold (**text**) and line breaks cleanly
    const lines = content.split('\n');
    return lines.map((line, lineIdx) => {
      // Check if bullet line
      const isBullet = line.trim().startsWith('•') || line.trim().startsWith('-');
      const cleanLine = isBullet ? line.replace(/^[•\-]\s*/, '') : line;

      // Split by bold patterns
      const parts = cleanLine.split(/(\*\*[^*]+\*\*)/g);

      const parsedLine = parts.map((part, pIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={pIdx} className="font-semibold text-slate-900">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return part;
      });

      if (isBullet) {
        return (
          <div key={lineIdx} className="flex items-start gap-2 my-1">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
            <span className="flex-1">{parsedLine}</span>
          </div>
        );
      }

      return (
        <p key={lineIdx} className={lineIdx > 0 && !lines[lineIdx - 1]?.trim() ? 'mt-2' : ''}>
          {parsedLine}
        </p>
      );
    });
  };

  return (
    <div
      className={`flex flex-col transition-all duration-200 ${
        isUser ? 'items-end' : 'items-start'
      }`}
    >
      <div className={`flex items-start gap-2 max-w-[88%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        {!isUser && (
          <div className="w-7 h-7 rounded-full bg-[#0A1B4F] text-white flex items-center justify-center shrink-0 shadow-xs border border-blue-400/30 text-[11px] font-black mt-0.5">
            AT
          </div>
        )}

        <div
          className={`rounded-2xl px-3.5 py-2.5 shadow-xs text-[13.5px] leading-relaxed ${
            isUser
              ? 'bg-[#1F4FE0] text-white rounded-br-xs'
              : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-xs'
          }`}
        >
          {renderFormattedContent(message.content)}
        </div>
      </div>

      {/* Message Timestamp */}
      <span
        className={`text-[10px] text-slate-500 mt-1 px-1 ${
          isUser ? 'mr-1' : 'ml-9'
        }`}
      >
        {message.timestamp}
      </span>

      {/* Quick Action Chips */}
      {!isUser && message.quickActions && message.quickActions.length > 0 && (
        <div className="ml-9 mt-2.5 flex flex-wrap gap-1.5 max-w-[92%]">
          {message.quickActions.map((action, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onActionClick(action)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100 hover:text-blue-800 border border-blue-200/70 shadow-2xs transition-all duration-150 active:scale-95 cursor-pointer"
            >
              <span>{action.label}</span>
              {action.type === 'link' && action.payload === '/contact' && <Mail className="w-3 h-3 opacity-70" />}
              {action.type === 'link' && action.payload !== '/contact' && <ArrowRight className="w-3 h-3 opacity-70" />}
              {action.type === 'whatsapp' && <ExternalLink className="w-3 h-3 opacity-70" />}
              {action.type === 'consultation' && <Calendar className="w-3 h-3 opacity-70" />}
            </button>
          ))}
        </div>
      )}

      {/* Suggested Questions */}
      {!isUser && message.suggestedQuestions && message.suggestedQuestions.length > 0 && (
        <div className="ml-9 mt-3 w-[calc(100%-2.25rem)]">
          <SuggestedQuestions
            questions={message.suggestedQuestions}
            onSelect={onSuggestedQuestionClick}
          />
        </div>
      )}
    </div>
  );
};

