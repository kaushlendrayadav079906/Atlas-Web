import React from 'react';
import { Mail, Phone } from 'lucide-react';
import { TOP_BAR_INFO } from '../../data/navigationData';

export interface TopInfoBarProps {
  onRequestCallback?: () => void;
}

export const TopInfoBar: React.FC<TopInfoBarProps> = () => {
  return (
    <div className="bg-white border-b border-atlas-line text-[13px] select-none">
      <div className="w-full max-w-[1720px] 2xl:max-w-[1840px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
        <div className="flex flex-wrap items-center justify-end gap-x-6 gap-y-1 py-2">
          <a
            href={TOP_BAR_INFO.emailMailto}
            className="inline-flex items-center gap-2 font-medium text-atlas-navy hover:text-atlas-royal transition-colors focus:outline-none focus-visible:underline"
          >
            <Mail className="w-3.5 h-3.5 text-atlas-royal shrink-0" aria-hidden="true" />
            <span>{TOP_BAR_INFO.email}</span>
          </a>
          <a
            href={TOP_BAR_INFO.phoneTel}
            className="inline-flex items-center gap-2 font-medium text-atlas-navy hover:text-atlas-royal transition-colors focus:outline-none focus-visible:underline"
          >
            <Phone className="w-3.5 h-3.5 text-atlas-royal shrink-0" aria-hidden="true" />
            <span>{TOP_BAR_INFO.phone}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
