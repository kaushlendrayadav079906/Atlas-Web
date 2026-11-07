import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import {
  SAPBusinessOneLogo,
  BoyumITLogo,
  UiPathLogo,
  AtlasLogo,
} from './PartnerLogos';
import { TECHNOLOGY_ECOSYSTEM_DATA } from '../../data/partnersContent';

export interface PartnerEcosystemProps {
  className?: string;
}

export const PartnerEcosystem: React.FC<PartnerEcosystemProps> = ({ className = '' }) => {
  const [isPaused, setIsPaused] = useState(false);

  // Helper to render one full sequential cycle of the 5 ecosystem steps + connecting arrows
  const renderEcosystemSet = (keyPrefix: string, isDuplicate = false) => {
    return TECHNOLOGY_ECOSYSTEM_DATA.steps.map((step, idx) => {
      const isLast = idx === TECHNOLOGY_ECOSYSTEM_DATA.steps.length - 1;
      const stepRoute =
        step.badgeType === 'sap' ? '/partners/sap-business-one' :
        step.badgeType === 'boyum' ? '/partners/boyum-it' :
        step.badgeType === 'uipath' ? '/partners/uipath' :
        step.badgeType === 'atlas' ? '/partners/atlas-solutions' : null;

      const cardContent = (
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex flex-col items-center text-center justify-between min-h-[160px] h-[168px] w-[230px] sm:w-[250px] md:w-[260px] lg:w-[275px] group shrink-0 select-none">
          <div className="h-10 flex items-center justify-center shrink-0">
            {step.badgeType === 'sap' && <SAPBusinessOneLogo className="scale-95" />}
            {step.badgeType === 'boyum' && <BoyumITLogo className="scale-95" />}
            {step.badgeType === 'uipath' && <UiPathLogo className="scale-95" />}
            {step.badgeType === 'atlas' && <AtlasLogo className="h-8" />}
          </div>

          <div className="space-y-1 pt-2 w-full">
            <h3 className="text-[14px] font-bold text-[#0A1B4F] leading-tight group-hover:text-[#E0A33B] transition-colors">
              {step.title}
            </h3>
            <p className="text-[11px] text-slate-500 leading-snug line-clamp-2">
              {step.role}
            </p>
          </div>
        </div>
      );

      return (
        <div key={`${keyPrefix}-${step.id}`} className="flex items-center shrink-0">
          {stepRoute ? (
            <Link
              to={stepRoute}
              className="block h-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E0A33B] rounded-2xl"
              tabIndex={isDuplicate ? -1 : 0}
              aria-label={`${step.title} - ${step.role}`}
            >
              {cardContent}
            </Link>
          ) : (
            <div className="block h-full">{cardContent}</div>
          )}

          {/* Golden connecting flow arrow */}
          <div
            className={`flex items-center justify-center text-[#E0A33B] shrink-0 px-2 sm:px-3.5 ${
              isLast ? 'ecosystem-loop-arrow' : ''
            }`}
            aria-hidden="true"
          >
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
          </div>
        </div>
      );
    });
  };

  return (
    <section
      id="partner-ecosystem"
      className={`py-16 lg:py-24 bg-white border-b border-slate-100 relative overflow-hidden ${className}`}
      aria-label="One Connected Technology Ecosystem"
    >
      <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-left max-w-3xl mb-10 sm:mb-14 space-y-2">
          <h2 className="atlas-h2-size font-serif font-extrabold text-[#0A1B4F]">
            {TECHNOLOGY_ECOSYSTEM_DATA.titleStart}{' '}
            <span className="bg-gradient-to-r from-[#E0A33B] via-[#E0A33B] to-[#E0A33B] bg-clip-text text-transparent font-accent italic font-semibold tracking-[-0.01em] pr-[0.08em]">
              {TECHNOLOGY_ECOSYSTEM_DATA.titleHighlight}
            </span>
          </h2>
          <p className="text-[16px] sm:text-[17px] text-[#4A5876] leading-relaxed">
            {TECHNOLOGY_ECOSYSTEM_DATA.description}
          </p>
        </div>

      </div>

      {/* Horizontal Continuous Left-to-Right Animated Track */}
      <div
        className="relative w-full overflow-hidden ecosystem-slider-group py-4"
        data-paused={isPaused ? 'true' : 'false'}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Left edge fade gradient mask */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-24 md:w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10"
          aria-hidden="true"
        />
        {/* Right edge fade gradient mask */}
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-24 md:w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10"
          aria-hidden="true"
        />

        {/* Marquee Track flex container */}
        <div className="flex items-center select-none py-2 ecosystem-track-container">
          {/* Primary Set 1 (Interactive & Accessible) */}
          <div className="animate-ecosystem-right flex items-center shrink-0">
            {renderEcosystemSet('primary', false)}
          </div>

          {/* Duplicate Set 2 for seamless infinite loop (hidden from assistive tech) */}
          <div
            className="animate-ecosystem-right ecosystem-duplicate-set flex items-center shrink-0"
            aria-hidden="true"
          >
            {renderEcosystemSet('dup-1', true)}
          </div>

          {/* Duplicate Set 3 for wide & ultra-wide screen coverage */}
          <div
            className="animate-ecosystem-right ecosystem-duplicate-set flex items-center shrink-0"
            aria-hidden="true"
          >
            {renderEcosystemSet('dup-2', true)}
          </div>

          {/* Duplicate Set 4 for large 4K displays */}
          <div
            className="animate-ecosystem-right ecosystem-duplicate-set flex items-center shrink-0"
            aria-hidden="true"
          >
            {renderEcosystemSet('dup-3', true)}
          </div>
        </div>
      </div>

      {/* Footnote note */}
      <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-[12px] text-slate-500 text-center mt-6 sm:mt-8 italic">
          {TECHNOLOGY_ECOSYSTEM_DATA.illustrativeNote}
        </p>
      </div>
    </section>
  );
};

