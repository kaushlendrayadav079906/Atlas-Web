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
    <div className="group flex flex-col justify-between p-7 sm:p-8 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300">
      <div>
        {/* Top Partner Logo / Icon */}
        <div className="h-10 flex items-center mb-6">
          {id === 'sap-b1' && <SAPBusinessOneLogo className="h-7" />}
          {id === 'boyum' && <BoyumITLogo className="h-7" />}
          {id === 'uipath' && <UiPathLogo className="h-7" />}
          {id === 'atlas' && (
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Settings className="w-6 h-6 animate-[spin_10s_linear_infinite]" />
              </div>
              <span className="font-extrabold text-[15px] tracking-tight text-slate-800">ATLAS Add-ons</span>
            </div>
          )}
        </div>

        {/* Card Heading: 20–23px */}
        <h3 className="text-[20px] sm:text-[22px] font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug mb-5">
          {title}
        </h3>

        {/* Bullets: 16–17px */}
        <ul className="space-y-3 mb-8">
          {bullets.map((bullet, idx) => (
            <li key={idx} className="flex items-start gap-3 text-[15px] sm:text-[16px] text-slate-600">
              <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0 mt-2" />
              <span className="leading-snug">{bullet}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Learn More link: 16px or larger */}
      <div className="pt-4 border-t border-slate-100">
        <a
          href={ctaTarget}
          className="inline-flex items-center gap-2 text-[16px] font-bold text-blue-600 hover:text-blue-700 group-hover:gap-3 transition-all"
        >
          <span>{ctaText}</span>
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};
