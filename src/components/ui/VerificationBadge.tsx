import React, { useState } from 'react';
import { AlertCircle, HelpCircle } from 'lucide-react';

interface VerificationBadgeProps {
  note?: string;
  variant?: 'inline' | 'floating' | 'subtle';
  className?: string;
}

export const VerificationBadge: React.FC<VerificationBadgeProps> = ({
  note = "Claim supplied by ATPL WEB Site_Content.pdf. Flagged for verification & client permission before production publication.",
  variant = 'subtle',
  className = ''
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className={`relative inline-flex items-center ${className}`}>
      <button
        type="button"
        onClick={() => setShowTooltip(!showTooltip)}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium transition-colors border ${
          variant === 'subtle'
            ? 'bg-blue-500/10 text-blue-700 border-blue-500/30 hover:bg-blue-500/20'
            : 'bg-blue-50 text-blue-800 border-blue-200 hover:bg-blue-100'
        }`}
        aria-label="Source Claim Verification Note"
      >
        <AlertCircle className="w-2.5 h-2.5 text-blue-500" />
        <span>Source Claim</span>
        <HelpCircle className="w-2.5 h-2.5 opacity-60" />
      </button>

      {showTooltip && (
        <div
          role="tooltip"
          className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-2.5 text-[11px] leading-snug rounded-md bg-slate-900 text-slate-100 shadow-xl border border-slate-700 pointer-events-none transition-all"
        >
          <div className="font-semibold text-blue-400 mb-1 flex items-center gap-1">
            <AlertCircle className="w-3 h-3 inline" />
            Verification Notice
          </div>
          <p className="text-slate-300">{note}</p>
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900" />
        </div>
      )}
    </div>
  );
};

