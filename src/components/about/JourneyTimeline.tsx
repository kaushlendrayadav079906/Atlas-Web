import React from 'react';
import { 
  Building2, 
  Layers, 
  Handshake, 
  Trophy, 
  Sparkles, 
  ArrowRight,
  Info
} from 'lucide-react';
import { JOURNEY_TIMELINE_DATA, TimelineMilestone } from '../../data/aboutContent';

const colorStyles: Record<TimelineMilestone['color'], {
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  yearText: string;
  iconBg: string;
  iconBorder: string;
  iconText: string;
}> = {
  blue: {
    badgeBg: 'bg-blue-50',
    badgeBorder: 'border-blue-200',
    badgeText: 'text-[#0878f9]',
    yearText: 'text-[#0878f9]',
    iconBg: 'bg-blue-50',
    iconBorder: 'border-blue-200',
    iconText: 'text-[#0878f9]',
  },
  sky: {
    badgeBg: 'bg-sky-50',
    badgeBorder: 'border-sky-200',
    badgeText: 'text-[#0284c7]',
    yearText: 'text-[#0284c7]',
    iconBg: 'bg-sky-50',
    iconBorder: 'border-sky-200',
    iconText: 'text-[#0284c7]',
  },
  rose: {
    badgeBg: 'bg-blue-50',
    badgeBorder: 'border-blue-200',
    badgeText: 'text-[#0066CC]',
    yearText: 'text-[#0066CC]',
    iconBg: 'bg-blue-50',
    iconBorder: 'border-blue-200',
    iconText: 'text-[#0066CC]',
  },
  emerald: {
    badgeBg: 'bg-emerald-50',
    badgeBorder: 'border-emerald-200',
    badgeText: 'text-[#10b981]',
    yearText: 'text-[#10b981]',
    iconBg: 'bg-emerald-50',
    iconBorder: 'border-emerald-200',
    iconText: 'text-[#10b981]',
  },
  purple: {
    badgeBg: 'bg-blue-50',
    badgeBorder: 'border-blue-200',
    badgeText: 'text-[#0066CC]',
    yearText: 'text-[#0066CC]',
    iconBg: 'bg-blue-50',
    iconBorder: 'border-blue-200',
    iconText: 'text-[#0066CC]',
  }
};

const renderMilestoneIcon = (iconName: string, iconClass: string) => {
  switch (iconName) {
    case 'Building2':
      return <Building2 className={iconClass} />;
    case 'Layers':
      return <Layers className={iconClass} />;
    case 'Handshake':
      return <Handshake className={iconClass} />;
    case 'Trophy':
      return <Trophy className={iconClass} />;
    case 'Sparkles':
      return <Sparkles className={iconClass} />;
    default:
      return <Building2 className={iconClass} />;
  }
};

export const JourneyTimeline: React.FC = () => {
  const { eyebrow, title, milestones } = JOURNEY_TIMELINE_DATA;

  return (
    <section id="journey" className="py-12 sm:py-16 lg:py-20 bg-white border-b border-slate-100">
      <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-left mb-10 sm:mb-12">
          <span className="text-[13px] sm:text-[14px] font-bold uppercase tracking-wider text-[#0066CC] block mb-2 select-none">
            {eyebrow}
          </span>
          <h2 className="font-serif text-[28px] sm:text-[34px] lg:text-[40px] font-bold text-[#142B59] tracking-tight leading-tight">
            Key Milestones in <span className="bg-gradient-to-r from-[#0052CC] via-[#0066CC] to-[#0A66C2] bg-clip-text text-transparent">Our Growth</span>
          </h2>
        </div>

        {/* 5-Card Connected Horizontal Timeline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-3 items-stretch relative">
          {milestones.map((item, index) => {
            const styles = colorStyles[item.color];
            const isLast = index === milestones.length - 1;

            return (
              <div key={item.year} className="relative flex flex-col">
                <div className="bg-white rounded-xl border border-slate-200/90 p-4 sm:p-5 shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between h-full relative group">
                  
                  {/* Top row: Icon + Year */}
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-9 h-9 rounded-lg ${styles.iconBg} border ${styles.iconBorder} flex items-center justify-center shrink-0`}>
                        {renderMilestoneIcon(item.iconName, `w-4.5 h-4.5 ${styles.iconText}`)}
                      </div>
                      <div className="flex flex-col">
                        <span className={`text-[17px] sm:text-[18px] font-extrabold ${styles.yearText} leading-none tracking-tight`}>
                          {item.year}
                        </span>
                        <span className="text-[13px] sm:text-[14px] font-bold text-[#142B59] leading-tight mt-0.5">
                          {item.title}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-[12.5px] sm:text-[13px] text-[#45546B] leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                </div>

                {/* Arrow connector between cards (visible on desktop) */}
                {!isLast && (
                  <div className="hidden lg:flex absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-slate-300 pointer-events-none">
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Subtle Verification Disclaimer */}
        <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-center gap-2 text-xs text-slate-400">
          <Info className="w-3.5 h-3.5 shrink-0" />
          <span>Historical milestones reflect ATLAS Technosoft organizational milestones; company records subject to verification.</span>
        </div>

      </div>
    </section>
  );
};
