import React from 'react';
import { ArrowRight, Settings, CheckCircle2 } from 'lucide-react';
import { SAPBusinessOneLogo, BoyumITLogo, UiPathLogo } from './PartnerLogos';

interface ServiceCardProps {
  id: string;
  title: string;
  bullets: string[];
  ctaText?: string;
  ctaTarget?: string;
}

const cardStyleMap: Record<string, {
  borderColor: string;
  hoverBorder: string;
  hoverShadow: string;
  arrowBorder: string;
  arrowText: string;
  arrowHover: string;
}> = {
  'sap-b1': {
    borderColor: 'border-[#2992ff]',
    hoverBorder: 'hover:border-blue-600',
    hoverShadow: 'hover:shadow-blue-500/10',
    arrowBorder: 'border-blue-200',
    arrowText: 'text-blue-600',
    arrowHover: 'group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600',
  },
  'boyum': {
    borderColor: 'border-[#ff9b27]',
    hoverBorder: 'hover:border-orange-500',
    hoverShadow: 'hover:shadow-orange-500/10',
    arrowBorder: 'border-orange-200',
    arrowText: 'text-orange-500',
    arrowHover: 'group-hover:bg-[#ff9b27] group-hover:text-white group-hover:border-[#ff9b27]',
  },
  'uipath': {
    borderColor: 'border-[#ff4356]',
    hoverBorder: 'hover:border-red-500',
    hoverShadow: 'hover:shadow-red-500/10',
    arrowBorder: 'border-red-200',
    arrowText: 'text-red-500',
    arrowHover: 'group-hover:bg-[#ff4356] group-hover:text-white group-hover:border-[#ff4356]',
  },
  'atlas': {
    borderColor: 'border-[#a34dff]',
    hoverBorder: 'hover:border-purple-500',
    hoverShadow: 'hover:shadow-purple-500/10',
    arrowBorder: 'border-purple-200',
    arrowText: 'text-purple-600',
    arrowHover: 'group-hover:bg-[#a34dff] group-hover:text-white group-hover:border-[#a34dff]',
  },
};

export const ServiceCard: React.FC<ServiceCardProps> = ({
  id,
  title,
  bullets,
  ctaText = "Learn More",
  ctaTarget = "#contact"
}) => {
  const style = cardStyleMap[id] || cardStyleMap['sap-b1'];

  return (
    <div className={`group flex flex-col justify-between p-5 sm:p-6 rounded-xl bg-white border-2 ${style.borderColor} ${style.hoverBorder} shadow-sm ${style.hoverShadow} hover:-translate-y-1 transition-all duration-200 h-full`}>
      <div>
        {/* Top Logo / Icon Box with Circular Arrow in Top-Right Corner */}
        <div className="h-10 flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
          <div className="flex items-center">
            {id === 'sap-b1' && <SAPBusinessOneLogo className="h-6 sm:h-7" />}
            {id === 'boyum' && <BoyumITLogo className="h-6 sm:h-7" />}
            {id === 'uipath' && <UiPathLogo className="h-6 sm:h-7" />}
            {id === 'atlas' && (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-purple-50 text-[#a34dff] flex items-center justify-center border border-purple-100">
                  <Settings className="w-4 h-4 animate-[spin_10s_linear_infinite]" />
                </div>
                <span className="font-extrabold text-[15px] sm:text-[16px] tracking-tight text-slate-900">ATLAS Add-ons</span>
              </div>
            )}
          </div>

          {/* Circular arrow icon in top-right corner */}
          <div className={`w-7 h-7 rounded-full border ${style.arrowBorder} ${style.arrowText} ${style.arrowHover} flex items-center justify-center shrink-0 transition-all duration-200 shadow-sm`}>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>

        {/* Card Heading: 19–22px */}
        <h3 className="text-[19px] sm:text-[21px] font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug mb-3">
          {title}
        </h3>

        {/* Bullets with Blue Checkmark Icons: 15–16px */}
        <ul className="space-y-2 mb-6">
          {bullets.map((bullet, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-[14px] sm:text-[15px] text-slate-600">
              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <span className="leading-snug">{bullet}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Learn More link at the bottom: 16px */}
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
