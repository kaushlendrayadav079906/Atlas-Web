import React, { useEffect, useRef, useState } from 'react';
import { 
  Building2, 
  Award, 
  Layers, 
  Trophy, 
  Sparkles, 
  Info,
  CheckCircle2,
  Calendar,
  ArrowRight
} from 'lucide-react';
import { COMPANY_JOURNEY_DATA, MilestoneItem } from '../../data/timelineData';

const iconMap = {
  Building2,
  Award,
  Layers,
  Trophy,
  Sparkles
};

export const JourneyTimeline: React.FC = () => {
  const { eyebrow, headingMain, headingAccent, description, milestones } = COMPANY_JOURNEY_DATA;
  const sectionRef = useRef<HTMLElement>(null);
  const [visibleItems, setVisibleItems] = useState<Record<string, boolean>>({});
  const [lineProgress, setLineProgress] = useState(0);

  useEffect(() => {
    // Check user preference for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      // Show all immediately without animation
      const allVisible: Record<string, boolean> = {};
      milestones.forEach(m => { allVisible[m.id] = true; });
      setVisibleItems(allVisible);
      setLineProgress(100);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-milestone-id');
            if (id) {
              setVisibleItems(prev => ({ ...prev, [id]: true }));
            }
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = document.querySelectorAll('[data-milestone-id]');
    elements.forEach(el => observer.observe(el));

    // Scroll progress listener for timeline line reveal
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how far the section has scrolled through viewport
      const start = rect.top - windowHeight * 0.7;
      const total = rect.height;
      if (start < 0) {
        const progress = Math.min(100, Math.max(0, (-start / total) * 100));
        setLineProgress(progress);
      } else {
        setLineProgress(0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [milestones]);

  return (
    <section 
      ref={sectionRef} 
      id="timeline" 
      className="py-16 sm:py-20 lg:py-24 bg-white border-b border-slate-100 relative overflow-hidden"
    >
      <span id="journey" className="absolute -top-24 opacity-0 pointer-events-none" />
      {/* Subtle ambient corporate blue glow matching other sections */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-b from-blue-500/8 via-sky-400/5 to-transparent rounded-full blur-3xl pointer-events-none -z-0" 
        aria-hidden="true"
      />

      <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* =================================================================== */}
        {/* SECTION HEADER                                                      */}
        {/* =================================================================== */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          {/* Eyebrow Badge matching ATLAS standards */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-[#E0A33B] border border-blue-200/80 mb-3.5 select-none">
            <Sparkles className="w-3.5 h-3.5 text-[#E0A33B]" />
            <span>{eyebrow}</span>
          </div>

          {/* Main Display Heading */}
          <h2 className="atlas-h2-size font-serif font-extrabold text-[#0A1B4F]">
            {headingMain}{' '}
            <span className="bg-gradient-to-r from-[#E0A33B] via-[#E0A33B] to-[#E0A33B] bg-clip-text text-transparent font-accent italic font-semibold tracking-[-0.01em] pr-[0.08em]">
              {headingAccent}
            </span>
          </h2>

          {/* Subtitle */}
          <p className="mt-4 text-[15px] sm:text-[17px] text-[#4A5876] leading-relaxed">
            {description}
          </p>

          {/* Disclaimer Note for Placeholders */}
          <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-slate-500 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block" />
            <span>* Asterisked milestone dates are structured placeholders awaiting formal company registry confirmation.</span>
          </div>
        </div>

        {/* =================================================================== */}
        {/* TIMELINE CONTAINER                                                  */}
        {/* =================================================================== */}
        <div className="relative max-w-5xl mx-auto pt-4 pb-8">
          
          {/* Desktop Central Timeline Line (hidden on mobile) */}
          <div 
            className="hidden md:block absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-[2px] bg-slate-200 rounded-full"
            aria-hidden="true"
          >
            {/* Animated Progress Line */}
            <div 
              className="w-full bg-gradient-to-b from-[#1F4FE0] via-[#1F4FE0] to-[#00A3BF] transition-all duration-300 rounded-full"
              style={{ height: `${lineProgress}%` }}
            />
          </div>

          {/* Mobile Left-Aligned Timeline Line (visible only on mobile) */}
          <div 
            className="md:hidden absolute left-6 top-4 bottom-4 w-[2px] bg-slate-200 rounded-full"
            aria-hidden="true"
          >
            <div 
              className="w-full bg-gradient-to-b from-[#1F4FE0] via-[#1F4FE0] to-[#00A3BF] transition-all duration-300 rounded-full"
              style={{ height: `${lineProgress}%` }}
            />
          </div>

          {/* Milestone Items List */}
          <div className="space-y-12 sm:space-y-16 lg:space-y-20">
            {milestones.map((item, index) => {
              const isRight = item.side === 'right';
              const isVisible = Boolean(visibleItems[item.id]);
              const IconComponent = iconMap[item.iconName] || Building2;

              // Node dot color scheme harmonized to ATLAS enterprise blue palette
              const dotColors: Record<MilestoneItem['color'], { ring: string; dot: string; glow: string }> = {
                blue: { ring: 'ring-blue-500/20 border-[#1F4FE0]', dot: 'bg-[#1F4FE0]', glow: 'shadow-blue-500/20' },
                sky: { ring: 'ring-sky-500/20 border-[#1F4FE0]', dot: 'bg-[#1F4FE0]', glow: 'shadow-sky-500/20' },
                rose: { ring: 'ring-blue-500/20 border-[#1F4FE0]', dot: 'bg-[#1F4FE0]', glow: 'shadow-blue-500/20' },
                emerald: { ring: 'ring-emerald-500/20 border-emerald-500', dot: 'bg-emerald-500', glow: 'shadow-emerald-500/20' },
                purple: { ring: 'ring-indigo-500/20 border-[#0A1B4F]', dot: 'bg-[#0A1B4F]', glow: 'shadow-indigo-500/20' }
              };
              const dotStyle = dotColors[item.color];

              return (
                <div
                  key={item.id}
                  data-milestone-id={item.id}
                  className={`relative flex items-center ${
                    isRight 
                      ? 'md:flex-row-reverse' 
                      : 'md:flex-row'
                  } flex-row`}
                >
                  {/* Central Node Dot on Timeline */}
                  {/* Desktop Central Dot */}
                  <div 
                    className={`hidden md:flex absolute left-1/2 -translate-x-1/2 z-20 w-8 h-8 rounded-full bg-white border-2 ${dotStyle.ring} ${dotStyle.glow} items-center justify-center transition-all duration-500 ${
                      isVisible ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
                    }`}
                  >
                    <div className={`w-3.5 h-3.5 rounded-full ${dotStyle.dot} ring-2 ring-white`} />
                  </div>

                  {/* Mobile Left Dot */}
                  <div 
                    className={`md:hidden absolute left-6 -translate-x-1/2 z-20 w-7 h-7 rounded-full bg-white border-2 ${dotStyle.ring} items-center justify-center transition-all duration-500 ${
                      isVisible ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
                    }`}
                  >
                    <div className={`w-3 h-3 rounded-full ${dotStyle.dot} ring-2 ring-white`} />
                  </div>

                  {/* Milestone Card Container */}
                  <div 
                    className={`w-full md:w-[calc(50%-42px)] pl-14 sm:pl-16 pr-2 md:px-0 transition-all duration-700 ease-out ${
                      isVisible 
                        ? 'opacity-100 translate-x-0' 
                        : isRight 
                          ? 'opacity-0 translate-x-8 md:translate-x-12' 
                          : 'opacity-0 translate-x-8 md:-translate-x-12'
                    }`}
                  >
                    <article className="group bg-white rounded-2xl border border-slate-200/90 hover:border-blue-400/80 p-6 sm:p-7 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative">
                      
                      {/* Card Header: Tag Pill & Icon */}
                      <div className="flex items-center justify-between gap-3 mb-3.5">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50/80 text-[#E0A33B] border border-blue-200/80">
                          <Calendar className="w-3 h-3 text-[#E0A33B]" />
                          <span>{item.tag}</span>
                        </span>

                        <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200/80 text-[#E0A33B] flex items-center justify-center shadow-2xs group-hover:scale-105 group-hover:bg-[#1F4FE0] group-hover:text-white transition-all">
                          <IconComponent className="w-4.5 h-4.5" />
                        </div>
                      </div>

                      {/* Year Highlight in Signature ATLAS Royal Blue */}
                      <div className="text-[26px] sm:text-[30px] font-black text-[#E0A33B] tracking-tight leading-none mb-1.5">
                        {item.displayYear}
                      </div>

                      {/* Title in Dark Navy */}
                      <h3 className="font-serif text-[19px] sm:text-[21px] font-bold text-[#0A1B4F] leading-snug mb-1">
                        {item.title}
                      </h3>

                      {/* Subtitle */}
                      {item.subtitle && (
                        <div className="text-xs sm:text-[13px] font-semibold text-slate-500 mb-3">
                          {item.subtitle}
                        </div>
                      )}

                      {/* Description */}
                      <p className="text-[14px] text-slate-600 leading-relaxed mb-4">
                        {item.description}
                      </p>

                      {/* Key Stats / Tags */}
                      {item.keyStats && item.keyStats.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100 mb-3.5">
                          {item.keyStats.map((stat, sIdx) => (
                            <span 
                              key={sIdx}
                              className="inline-flex items-center gap-1 px-2.5 py-0.8 rounded-md text-[11.5px] font-semibold bg-white text-slate-700 border border-slate-200/60"
                            >
                              <CheckCircle2 className="w-3 h-3 text-[#E0A33B]" />
                              <span>{stat}</span>
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Card Footer: Verification Notice */}
                      <div className="pt-2.5 flex items-center justify-between text-[11px] text-slate-500">
                        {item.isVerifiedFact ? (
                          <span className="inline-flex items-center gap-1 font-semibold text-emerald-600">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Verified ATPL Achievement</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 font-medium text-slate-500">
                            <Info className="w-3.5 h-3.5 text-blue-500" />
                            <span>Date Subject to Formal Confirmation</span>
                          </span>
                        )}
                        <span className="text-slate-500 font-mono">
                          Milestone {index + 1} of {milestones.length}
                        </span>
                      </div>

                    </article>
                  </div>

                  {/* Empty Spacer Column on opposite side for desktop balance */}
                  <div className="hidden md:block w-[calc(50%-42px)]" />
                </div>
              );
            })}
          </div>

        </div>

        {/* =================================================================== */}
        {/* BOTTOM CONSULTATION TEASER LINK                                     */}
        {/* =================================================================== */}
        <div className="text-center mt-12 sm:mt-16">
          <p className="text-xs sm:text-sm text-slate-600 mb-2">
            Looking to partner with an experienced, certified ERP & automation team?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-[#E0A33B] hover:text-[#1739B8] transition-colors group"
          >
            <span>Speak with our senior SAP consultants</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

      </div>
    </section>
  );
};
