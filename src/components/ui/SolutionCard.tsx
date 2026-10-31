import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
    borderColor: 'border-[#0052CC]',
    hoverBorder: 'hover:border-[#0040A8]',
    hoverShadow: 'hover:shadow-blue-500/10',
    arrowBorder: 'border-blue-200',
    arrowText: 'text-[#0052CC]',
    arrowHover: 'group-hover:bg-[#0052CC] group-hover:text-white group-hover:border-[#0052CC]',
  },
  'boyum': {
    borderColor: 'border-[#0066CC]',
    hoverBorder: 'hover:border-[#0052CC]',
    hoverShadow: 'hover:shadow-blue-500/10',
    arrowBorder: 'border-blue-200',
    arrowText: 'text-[#0066CC]',
    arrowHover: 'group-hover:bg-[#0066CC] group-hover:text-white group-hover:border-[#0066CC]',
  },
  'uipath': {
    borderColor: 'border-[#0284c7]',
    hoverBorder: 'hover:border-[#0369a1]',
    hoverShadow: 'hover:shadow-sky-500/10',
    arrowBorder: 'border-sky-200',
    arrowText: 'text-[#0284c7]',
    arrowHover: 'group-hover:bg-[#0284c7] group-hover:text-white group-hover:border-[#0284c7]',
  },
  'atlas': {
    borderColor: 'border-[#0A66C2]',
    hoverBorder: 'hover:border-[#0066CC]',
    hoverShadow: 'hover:shadow-blue-500/10',
    arrowBorder: 'border-blue-200',
    arrowText: 'text-[#0A66C2]',
    arrowHover: 'group-hover:bg-[#0A66C2] group-hover:text-white group-hover:border-[#0A66C2]',
  },
};

export const ServiceCard: React.FC<ServiceCardProps> = ({
  id,
  title,
  bullets,
  ctaText = "Learn More",
  ctaTarget = "#contact"
}) => {
  const navigate = useNavigate();
  const style = cardStyleMap[id] || cardStyleMap['sap-b1'];

  const handleCardClick = (e: React.MouseEvent) => {
    // Avoid double triggering if an explicit link was clicked
    if ((e.target as HTMLElement).closest('a')) return;
    if (ctaTarget.startsWith('#')) {
      const el = document.querySelector(ctaTarget);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(ctaTarget);
    }
  };

  const isInternal = ctaTarget.startsWith('/') && !ctaTarget.startsWith('//');

  return (
    <div
      onClick={handleCardClick}
      className={`group flex flex-col justify-between p-5 sm:p-6 rounded-xl bg-white border-2 ${style.borderColor} ${style.hoverBorder} shadow-sm ${style.hoverShadow} hover:-translate-y-1 transition-all duration-200 h-full cursor-pointer`}
    >
      <div>
        {/* Top Logo / Icon Box with Circular Arrow in Top-Right Corner */}
        <div className="h-10 flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
          <div className="flex items-center">
            {id === 'sap-b1' && <SAPBusinessOneLogo className="h-6 sm:h-7" />}
            {id === 'boyum' && <BoyumITLogo className="h-6 sm:h-7" />}
            {id === 'uipath' && <UiPathLogo className="h-6 sm:h-7" />}
            {id === 'atlas' && (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0066CC] flex items-center justify-center border border-blue-100">
                  <Settings className="w-4 h-4 animate-[spin_10s_linear_infinite]" />
                </div>
                <span className="font-extrabold text-[15px] sm:text-[16px] tracking-tight text-slate-900">ATLAS Add-ons</span>
              </div>
            )}
          </div>

          {/* Circular arrow icon in top-right corner */}
          {isInternal ? (
            <Link
              to={ctaTarget}
              aria-label={`Open ${title}`}
              className={`w-7 h-7 rounded-full border ${style.arrowBorder} ${style.arrowText} ${style.arrowHover} flex items-center justify-center shrink-0 transition-all duration-200 shadow-sm`}
            >
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          ) : (
            <a
              href={ctaTarget}
              aria-label={`Open ${title}`}
              className={`w-7 h-7 rounded-full border ${style.arrowBorder} ${style.arrowText} ${style.arrowHover} flex items-center justify-center shrink-0 transition-all duration-200 shadow-sm`}
            >
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
          )}
        </div>

        {/* Card Heading: 19–22px */}
        <h3 className="text-[19px] sm:text-[21px] font-bold text-[#172B50] group-hover:text-[#1B72E8] transition-colors leading-snug mb-3">
          {isInternal ? (
            <Link to={ctaTarget} className="hover:underline">
              {title}
            </Link>
          ) : (
            <a href={ctaTarget} className="hover:underline">
              {title}
            </a>
          )}
        </h3>

        {/* Bullets with Blue Checkmark Icons: 15–16px */}
        <ul className="space-y-2 mb-6">
          {bullets.map((bullet, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-[14px] sm:text-[15px] text-[#53647A]">
              <CheckCircle2 className="w-4 h-4 text-[#1B72E8] shrink-0 mt-0.5" />
              <span className="leading-snug">{bullet}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Learn More link at the bottom: 16px */}
      <div className="pt-3 border-t border-slate-100">
        {isInternal ? (
          <Link
            to={ctaTarget}
            className="inline-flex items-center gap-1.5 text-[15px] sm:text-[16px] font-bold text-[#142B59] hover:text-[#1B72E8] group-hover:gap-2.5 transition-all"
          >
            <span>{ctaText}</span>
            <ArrowRight className="w-4 h-4 text-[#1B72E8]" />
          </Link>
        ) : (
          <a
            href={ctaTarget}
            className="inline-flex items-center gap-1.5 text-[15px] sm:text-[16px] font-bold text-[#142B59] hover:text-[#1B72E8] group-hover:gap-2.5 transition-all"
          >
            <span>{ctaText}</span>
            <ArrowRight className="w-4 h-4 text-[#1B72E8]" />
          </a>
        )}
      </div>
    </div>
  );
};
