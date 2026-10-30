import React, { useState, useEffect, useRef } from 'react';
import { 
  Building2, 
  Award, 
  Layers, 
  Trophy, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  Calendar,
  ArrowRight
} from 'lucide-react';
import { COMPANY_JOURNEY_DATA, MilestoneItem } from '../../data/timelineData';

const iconMap = {
  Building2: <Building2 className="w-5 h-5 text-[#d97706]" />,
  Award: <Award className="w-5 h-5 text-[#d97706]" />,
  Layers: <Layers className="w-5 h-5 text-[#d97706]" />,
  Trophy: <Trophy className="w-5 h-5 text-[#d97706]" />,
  Sparkles: <Sparkles className="w-5 h-5 text-[#d97706]" />
};

interface TimelineItemProps {
  item: MilestoneItem;
  index: number;
  isReducedMotion: boolean;
}

const TimelineItemCard: React.FC<TimelineItemProps> = ({ item, index, isReducedMotion }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.05,
        rootMargin: '300px 0px 300px 0px'
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    // Safety fallback: reveal all cards automatically after 1s so no content remains hidden
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1200);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [isReducedMotion]);

  const isRight = item.side === 'right';

  // Responsive motion classes
  const motionTransform = isReducedMotion
    ? 'opacity-100 translate-x-0'
    : isVisible
      ? 'opacity-100 translate-x-0'
      : isRight
        ? 'opacity-0 translate-x-8 sm:translate-x-12'
        : 'opacity-0 -translate-x-8 sm:-translate-x-12';

  return (
    <div
      ref={cardRef}
      className={`relative mb-10 sm:mb-14 last:mb-0 w-full flex items-center ${
        isRight ? 'lg:justify-end' : 'lg:justify-start'
      }`}
    >
      {/* =================================================================== */}
      {/* TIMELINE DOT (Centered on desktop, left-aligned on mobile)          */}
      {/* =================================================================== */}
      <div
        className={`absolute z-20 flex items-center justify-center transition-all duration-500 ${
          isReducedMotion ? 'scale-100 opacity-100' : isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
        } left-6 sm:left-8 -translate-x-1/2 lg:left-1/2 lg:-translate-x-1/2`}
        aria-hidden="true"
      >
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#fbf9f5] border-[3px] border-[#d97706] shadow-md flex items-center justify-center">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#d97706] animate-pulse" />
        </div>
      </div>

      {/* Horizontal Connector Line for Desktop */}
      {isRight ? (
        <div
          className="hidden lg:block absolute left-1/2 top-1/2 -translate-y-1/2 w-10 h-0.5 bg-gradient-to-r from-amber-400 to-amber-200 pointer-events-none"
          aria-hidden="true"
        />
      ) : (
        <div
          className="hidden lg:block absolute right-1/2 top-1/2 -translate-y-1/2 w-10 h-0.5 bg-gradient-to-l from-amber-400 to-amber-200 pointer-events-none"
          aria-hidden="true"
        />
      )}

      {/* =================================================================== */}
      {/* MILESTONE CARD                                                      */}
      {/* =================================================================== */}
      <div
        className={`w-full pl-14 sm:pl-20 lg:pl-0 lg:w-[calc(50%-2.5rem)] transition-all duration-700 ease-out ${
          isRight ? 'lg:ml-auto' : 'lg:mr-auto'
        } ${motionTransform}`}
      >
        <article className="group relative bg-white rounded-2xl p-6 sm:p-7 border border-amber-200/80 shadow-sm hover:shadow-xl hover:border-amber-400 hover:-translate-y-1 transition-all duration-300">
          
          {/* Subtle warm corner glow */}
          <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-amber-100/40 via-transparent to-transparent rounded-tr-2xl pointer-events-none" />

          {/* Top Header: Tag Pill + Milestone Icon */}
          <div className="flex items-center justify-between gap-3 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-50 text-[#b45309] border border-amber-200/70">
              <Calendar className="w-3.5 h-3.5 text-[#d97706]" />
              <span>{item.tag}</span>
            </span>

            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/80 flex items-center justify-center shadow-xs shrink-0 group-hover:scale-105 transition-transform">
              {iconMap[item.iconName]}
            </div>
          </div>

          {/* Year Display in Bold Gold/Orange (24–28px) */}
          <div className="mb-1.5">
            <time className="text-[24px] sm:text-[28px] font-black tracking-tight text-[#d97706] font-mono block leading-none">
              {item.displayYear}
            </time>
          </div>

          {/* Milestone Title (19–22px) */}
          <h3 className="text-[19px] sm:text-[21px] font-bold text-[#10264b] leading-snug tracking-tight mb-1 group-hover:text-[#0878f9] transition-colors">
            {item.title}
          </h3>

          {/* Optional Subtitle */}
          {item.subtitle && (
            <p className="text-[13px] sm:text-[14px] font-semibold text-slate-500 mb-3">
              {item.subtitle}
            </p>
          )}

          {/* Description Paragraph (15–16px) */}
          <p className="text-[15px] sm:text-[16px] text-[#354765] leading-relaxed mb-4 font-normal">
            {item.description}
          </p>

          {/* Key Stat Pills (if available) */}
          {item.keyStats && item.keyStats.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1 pb-3">
              {item.keyStats.map((stat, sIdx) => (
                <span
                  key={sIdx}
                  className="inline-flex items-center gap-1 text-[12px] font-semibold px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200"
                >
                  <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                  <span>{stat}</span>
                </span>
              ))}
            </div>
          )}

          {/* Verification / Source Status Tag */}
          <div className="pt-3 border-t border-amber-100/80 flex items-center justify-between text-xs">
            {item.isVerifiedFact ? (
              <span className="inline-flex items-center gap-1.5 text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified ATPL Achievement</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-amber-800 font-semibold bg-amber-50/90 px-2.5 py-1 rounded-md border border-amber-200">
                <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                <span>Date Subject to Formal Confirmation</span>
              </span>
            )}

            <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
              Milestone {index + 1} of {COMPANY_JOURNEY_DATA.milestones.length}
            </span>
          </div>

        </article>
      </div>
    </div>
  );
};

export const JourneyTimeline: React.FC = () => {
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0.5);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleMotionChange);
    return () => mediaQuery.removeEventListener('change', handleMotionChange);
  }, []);

  // Track scroll progress along the timeline line
  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;
      const rect = timelineRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const totalHeight = rect.height;
      const currentScroll = windowHeight - rect.top;
      
      const progress = Math.min(Math.max(currentScroll / (totalHeight + windowHeight * 0.4), 0.1), 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="journey-timeline"
      className="relative py-16 sm:py-20 lg:py-24 bg-[#fbf9f5] border-y border-amber-100/80 overflow-hidden"
    >
      <div id="timeline" className="absolute -top-20" />

      {/* Background warm aesthetic pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#d97706 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* =================================================================== */}
        {/* SECTION HEADER                                                      */}
        {/* =================================================================== */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18 lg:mb-20 space-y-3.5">
          
          {/* Eyebrow in Gold/Amber (13–14px) */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100/70 text-[#b45309] border border-amber-200 text-xs sm:text-sm font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-[#d97706]" />
            <span>{COMPANY_JOURNEY_DATA.eyebrow}</span>
          </div>

          {/* Large Main Heading with Serif Accent (34–48px) */}
          <h2 className="text-[32px] sm:text-[40px] lg:text-[46px] font-extrabold tracking-tight leading-[1.18] text-[#10264b]">
            {COMPANY_JOURNEY_DATA.headingMain}{' '}
            <span className="font-serif italic text-[#d97706] font-normal underline decoration-amber-300 decoration-wavy decoration-1 underline-offset-8">
              {COMPANY_JOURNEY_DATA.headingAccent}
            </span>
          </h2>

          {/* Subtitle Paragraph (16–18px) */}
          <p className="text-[16px] sm:text-[18px] text-[#354765] leading-relaxed font-normal">
            {COMPANY_JOURNEY_DATA.description}
          </p>

          {/* Company Confirmation Note */}
          <div className="pt-1 flex items-center justify-center gap-2 text-xs text-slate-500">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span>* Asterisked milestone dates are structured placeholders awaiting formal company registry confirmation.</span>
          </div>
        </div>

        {/* =================================================================== */}
        {/* VERTICAL TIMELINE CONTAINER                                         */}
        {/* =================================================================== */}
        <div ref={timelineRef} className="relative max-w-5xl mx-auto py-4">
          
          {/* Background Static Line */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-amber-200/60 rounded-full left-6 sm:left-8 -translate-x-1/2 lg:left-1/2 lg:-translate-x-1/2"
            aria-hidden="true"
          />

          {/* Dynamic Scroll Progress Fill Line */}
          <div
            className="absolute top-0 w-1 bg-gradient-to-b from-[#d97706] via-[#f59e0b] to-[#fbbf24] rounded-full left-6 sm:left-8 -translate-x-1/2 lg:left-1/2 lg:-translate-x-1/2 transition-all duration-150 ease-out shadow-sm"
            style={{
              height: `${scrollProgress * 100}%`,
              maxHeight: '100%'
            }}
            aria-hidden="true"
          />

          {/* List of Alternating Milestones */}
          <ol className="relative z-10 list-none m-0 p-0">
            {COMPANY_JOURNEY_DATA.milestones.map((item, index) => (
              <li key={item.id}>
                <TimelineItemCard
                  item={item}
                  index={index}
                  isReducedMotion={isReducedMotion}
                />
              </li>
            ))}
          </ol>

        </div>

        {/* Bottom CTA Callout */}
        <div className="mt-12 text-center">
          <p className="text-sm font-semibold text-slate-600 mb-2">
            Looking to partner with an experienced, certified ERP & automation team?
          </p>
          <a
            href="#contact-cta"
            className="inline-flex items-center gap-2 text-[15px] font-bold text-[#d97706] hover:text-[#b45309] transition-colors group"
          >
            <span>Speak with our senior SAP consultants</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

      </div>
    </section>
  );
};
