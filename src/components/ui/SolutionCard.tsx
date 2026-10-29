import React from 'react';
import { ArrowRight, Settings } from 'lucide-react';
import { SAPBusinessOneLogo, BoyumITLogo, UiPathLogo } from './PartnerLogos';

interface ServiceCardProps {
  id: string;
  title: string;
  bullets: string[];
  ctaText?: string;
  ctaTarget?: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  id,
  title,
  bullets,
  ctaText = "Learn More",
  ctaTarget = "#contact"
}) => {
  return (
    <div className="group flex flex-col justify-between p-5 sm:p-6 rounded-xl bg-white border border-slate-200/90 shadow-sm hover:border-blue-400 hover:shadow-md transition-all duration-200 h-full">
      <div>
        {/* Top Logo / Icon Box */}
        <div className="h-10 flex items-center mb-4 pb-3 border-b border-slate-100">
          {id === 'sap-b1' && <SAPBusinessOneLogo className="h-6 sm:h-7" />}
          {id === 'boyum' && <BoyumITLogo className="h-6 sm:h-7" />}
          {id === 'uipath' && <UiPathLogo className="h-6 sm:h-7" />}
          {id === 'atlas' && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
                <Settings className="w-4 h-4 animate-[spin_10s_linear_infinite]" />
              </div>
              <span className="font-extrabold text-[15px] sm:text-[16px] tracking-tight text-slate-900">ATLAS Add-ons</span>
            </div>
          )}
        </div>

        {/* Card Heading: 20–23px */}
        <h3 className="text-[19px] sm:text-[21px] font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug mb-3">
          {title}
        </h3>

        {/* Bullets: 15–16px */}
        <ul className="space-y-2 mb-6">
          {bullets.map((bullet, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-[14px] sm:text-[15px] text-slate-600">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0 mt-2" />
              <span className="leading-snug">{bullet}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Learn More link: 16px */}
      <div className="pt-3 border-t border-slate-100">
        <a
          href={ctaTarget}
          className="inline-flex items-center gap-1.5 text-[15px] sm:text-[16px] font-bold text-blue-600 hover:text-blue-700 group-hover:gap-2.5 transition-all"
        >
          <span>{ctaText}</span>
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};
