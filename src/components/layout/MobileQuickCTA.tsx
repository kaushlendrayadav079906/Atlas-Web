import React from 'react';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { BRAND_INFO } from '../../data/websiteContent';

export const MobileQuickCTA: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 md:hidden bg-navy-950/95 backdrop-blur-md border-t border-navy-800 p-3 shadow-2xl">
      <div className="flex items-center gap-2">
        <a
          href={BRAND_INFO.contact.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center p-3 rounded-lg bg-emerald-600 text-white shrink-0 shadow-sm"
          aria-label="Chat on WhatsApp"
        >
          <MessageSquare className="w-5 h-5" />
        </a>

        <a
          href="#contact"
          className="flex-1 flex items-center justify-center gap-1.5 py-3 px-4 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold uppercase tracking-wider shadow-md transition-colors text-center"
        >
          <span>Free Health Check</span>
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};
