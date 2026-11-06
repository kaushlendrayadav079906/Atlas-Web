import React from 'react';
import { Link } from 'react-router-dom';
import {
  SAPBusinessOneLogo,
  BoyumITLogo,
  UiPathLogo,
  BeasManufacturingLogo,
  ProdumexWMSLogo,
  B1UPLogo,
  SAPHANALogo,
  ProdumexScanLogo,
} from './PartnerLogos';
import { LOGO_SLIDER_ITEMS, LogoSliderItem } from '../../data/logoSliderData';
import { SectionHeading } from './SectionHeading';

interface LogoMarqueeProps {
  className?: string;
  showHeading?: boolean;
  badge?: string;
  title?: string;
  titleHighlight?: string;
  subtitle?: string;
}

const renderLogoComponent = (logoType: LogoSliderItem['logoType']) => {
  switch (logoType) {
    case 'sap-hana':
      return <SAPHANALogo className="h-7 sm:h-8" />;
    case 'produmex-scan':
      return <ProdumexScanLogo className="h-7 sm:h-8" />;
    case 'sap-b1':
      return <SAPBusinessOneLogo className="h-7 sm:h-8" />;
    case 'boyum-it':
      return <BoyumITLogo className="h-7 sm:h-8" />;
    case 'uipath':
      return <UiPathLogo className="h-7 sm:h-8" />;
    case 'beas':
      return <BeasManufacturingLogo className="h-7 sm:h-8" />;
    case 'produmex-wms':
      return <ProdumexWMSLogo className="h-7 sm:h-8" />;
    case 'b1up':
      return <B1UPLogo className="h-7 sm:h-8" />;
    default:
      return null;
  }
};

const LogoCard: React.FC<{ item: LogoSliderItem }> = ({ item }) => {
  return (
    <Link
      to={item.route}
      className="group flex flex-col items-center justify-center w-[220px] sm:w-[245px] md:w-[255px] lg:w-[265px] xl:w-[270px] h-[126px] sm:h-[136px] px-4 py-3 sm:py-3.5 bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:border-[#60a5fa] hover:shadow-md hover:-translate-y-0.5 transition-all text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 shrink-0"
      title={`${item.name} - ${item.badge}`}
    >
      {/* 1. Company / Technology Logo (Prominent & Scaled) */}
      <div className="h-8 sm:h-9 flex items-center justify-center transition-transform duration-200 group-hover:scale-105 shrink-0">
        {renderLogoComponent(item.logoType)}
      </div>

      {/* 2. Company Name in bold navy blue */}
      <div className="mt-2 font-bold text-[14px] sm:text-[15px] text-[#0A1B4F] group-hover:text-[#1F4FE0] transition-colors leading-tight truncate max-w-full">
        {item.name}
      </div>

      {/* 3. Short description or partnership label in smaller grey text */}
      <div className="mt-1 text-[11.5px] sm:text-[12.5px] font-medium text-[#4A5876] truncate max-w-full">
        {item.badge}
      </div>
    </Link>
  );
};

export const LogoMarquee: React.FC<LogoMarqueeProps> = ({
  className = '',
  showHeading = true,
  badge = 'OUR TRUSTED PARTNERS',
  title = 'Authorized Technology',
  titleHighlight = 'Ecosystem',
  subtitle = 'Certified Enterprise Implementations & Authorized Channel Partnerships',
}) => {
  return (
    <section
      id="technology-partners-slider"
      className={`relative pt-8 pb-10 sm:pt-10 sm:pb-14 lg:pt-12 lg:pb-16 bg-atlas-navy atlas-dark border-b border-white/10 overflow-hidden z-20 ${className}`}
      aria-label="Certified Technology Partners & Platforms"
    >
      <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {showHeading && (
          <SectionHeading
            badge={badge}
            title={title}
            titleHighlight={titleHighlight}
            subtitle={subtitle}
            align="center"
            className="mb-8 md:mb-10"
          />
        )}

        {/* Marquee Track Container with gradient fade edges and generous vertical padding */}
        <div className="relative w-full overflow-hidden logo-slider-group py-3.5 sm:py-4">
          {/* Left fade gradient mask matching section background */}
          <div
            className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-28 bg-gradient-to-r from-atlas-navy via-atlas-navy/80 to-transparent z-10"
            aria-hidden="true"
          />
          {/* Right fade gradient mask matching section background */}
          <div
            className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-28 bg-gradient-to-l from-atlas-navy via-atlas-navy/80 to-transparent z-10"
            aria-hidden="true"
          />

          {/* Marquee Track flex container */}
          <div className="flex items-center select-none py-1">
            {/* Primary Set 1 */}
            <div className="animate-marquee-left flex items-center gap-4 sm:gap-5 shrink-0 pr-4 sm:pr-5">
              {LOGO_SLIDER_ITEMS.map((item, idx) => (
                <LogoCard key={`set1-${item.id}-${idx}`} item={item} />
              ))}
            </div>

            {/* Duplicate Set 2 for seamless infinite loop */}
            <div
              className="animate-marquee-left flex items-center gap-4 sm:gap-5 shrink-0 pr-4 sm:pr-5"
              aria-hidden="true"
            >
              {LOGO_SLIDER_ITEMS.map((item, idx) => (
                <LogoCard key={`set2-${item.id}-${idx}`} item={item} />
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

/* ========================================================================= */
/* CONTINUOUS CLIENT LOGO SHOWCASE (MATCHING REFERENCE IMAGE 3)              */
/* ========================================================================= */

const ExcelLogo: React.FC = () => (
  <div className="inline-flex items-center gap-2 select-none h-10 sm:h-12">
    <div className="w-10 h-9 bg-slate-100 border border-slate-400 rounded-sm p-1 grid grid-cols-3 gap-0.5 shrink-0">
      <div className="bg-slate-400 h-1.5 rounded-[1px]" />
      <div className="bg-slate-500 h-1.5 rounded-[1px]" />
      <div className="bg-slate-400 h-1.5 rounded-[1px]" />
      <div className="bg-slate-500 h-1.5 rounded-[1px] col-span-2" />
      <div className="bg-slate-400 h-1.5 rounded-[1px]" />
      <div className="bg-slate-400 h-1.5 rounded-[1px]" />
      <div className="bg-slate-500 h-1.5 rounded-[1px] col-span-2" />
    </div>
    <div className="flex flex-col leading-none">
      <span className="text-[#334155] font-black text-lg sm:text-xl tracking-tight">EXCEL</span>
      <span className="text-[#475569] font-bold text-[9px] sm:text-[10px] tracking-wider uppercase">AAC BLOCKS</span>
      <span className="text-[#64748b] font-medium text-[7.5px] sm:text-[8px] tracking-tight mt-0.5">RISHTA MAZBOOTI KA</span>
    </div>
  </div>
);

const BritishSchoolLogo: React.FC = () => (
  <div className="inline-flex items-center gap-2 select-none h-11 sm:h-13">
    <svg viewBox="0 0 100 100" className="h-10 w-10 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="46" stroke="#0A1B4F" strokeWidth="4" fill="#ffffff" />
      <circle cx="50" cy="50" r="38" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="3 2" />
      <path d="M50 22 L55 35 L68 35 L58 43 L62 56 L50 48 L38 56 L42 43 L32 35 L45 35 Z" fill="#2563eb" />
      <path d="M26 62 Q50 56 74 62 L70 70 Q50 64 30 70 Z" fill="#0A1B4F" />
      <text x="50" y="86" textAnchor="middle" fill="#0A1B4F" fontSize="7" fontWeight="bold" fontFamily="system-ui">BRITISH SCHOOL</text>
    </svg>
    <div className="flex flex-col leading-tight">
      <span className="text-[#0A1B4F] font-extrabold text-[12px] sm:text-[13px] tracking-tight">THE BRITISH SCHOOL</span>
      <span className="text-slate-500 font-bold text-[9px] uppercase tracking-wider">NEW DELHI</span>
    </div>
  </div>
);

const AmpleLogo: React.FC = () => (
  <div className="inline-flex items-center select-none h-9 sm:h-10">
    <div className="bg-black text-white px-4 py-1.5 rounded-sm flex items-center justify-center shadow-xs">
      <span className="font-serif font-black text-base sm:text-lg tracking-[0.25em] pl-1">AMPLE</span>
    </div>
  </div>
);

const LinkLocksLogo: React.FC = () => (
  <div className="inline-flex items-center select-none h-10 sm:h-12">
    <div className="bg-[#e11d48] text-white px-3.5 py-1.5 rounded flex flex-col items-center justify-center shadow-xs">
      <span className="font-serif italic font-black text-xl sm:text-2xl leading-none tracking-tight">Link</span>
      <span className="font-sans font-bold text-[8px] sm:text-[9px] tracking-widest uppercase mt-0.5">LOCKS</span>
    </div>
  </div>
);

const RGPPL_Logo: React.FC = () => (
  <div className="inline-flex items-center gap-2 select-none h-10 sm:h-12">
    <svg viewBox="0 0 100 100" className="h-10 w-10 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="46" stroke="#eab308" strokeWidth="6" fill="#fefce8" />
      <circle cx="50" cy="50" r="32" stroke="#ca8a04" strokeWidth="4" />
      <circle cx="50" cy="50" r="18" fill="#eab308" />
      <path d="M50 14 Q65 30 50 50 Q35 70 50 86" stroke="#ca8a04" strokeWidth="3" />
    </svg>
    <div className="flex flex-col leading-tight">
      <span className="text-[#a16207] font-bold text-[10px]">आरजीपीपीएल</span>
      <span className="text-[#854d0e] font-black text-sm sm:text-base tracking-wider">RGPPL</span>
    </div>
  </div>
);

const SteelbirdLogo: React.FC = () => (
  <div className="inline-flex items-center select-none h-8 sm:h-10">
    <span className="text-[#dc2626] font-serif font-black text-2xl sm:text-3xl tracking-tight scale-y-110">
      Steelbird
    </span>
  </div>
);

const SonyLogo: React.FC = () => (
  <div className="inline-flex items-center select-none h-7 sm:h-9">
    <span className="text-black font-serif font-black text-2xl sm:text-3xl tracking-[0.18em]">
      SONY
    </span>
  </div>
);

const MegaLogo: React.FC = () => (
  <div className="inline-flex items-center select-none h-8 sm:h-10">
    <span className="text-[#db2777] font-sans font-black text-2xl sm:text-3xl tracking-tight">
      MEGA
    </span>
  </div>
);

const CLIENT_ITEMS = [
  { id: 'mega', component: <MegaLogo /> },
  { id: 'excel', component: <ExcelLogo /> },
  { id: 'british-school', component: <BritishSchoolLogo /> },
  { id: 'ample', component: <AmpleLogo /> },
  { id: 'link-locks', component: <LinkLocksLogo /> },
  { id: 'rgppl', component: <RGPPL_Logo /> },
  { id: 'steelbird', component: <SteelbirdLogo /> },
  { id: 'sony', component: <SonyLogo /> },
];

export const ClientLogoMarquee: React.FC<{ className?: string; showPill?: boolean }> = ({
  className = '',
  showPill = true,
}) => {
  return (
    <section
      id="client-logos-showcase"
      className={`relative pt-5 pb-8 sm:pt-6 sm:pb-10 bg-white border-y border-blue-100/70 overflow-hidden ${className}`}
      aria-label="Our Trusted Clients & Partners"
    >
      <div className="max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
        {showPill && (
          <div className="flex justify-center mb-5 sm:mb-6">
            <span className="inline-flex items-center justify-center px-6 py-1.5 rounded-full text-white font-bold text-xs sm:text-[13px] bg-gradient-to-r from-[#1F4FE0] via-[#1F4FE0] to-[#1F4FE0] shadow-sm tracking-wide uppercase">
              Trusted by Industry Leaders
            </span>
          </div>
        )}

        <div className="relative w-full overflow-hidden logo-slider-group py-2">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-24 bg-gradient-to-r from-atlas-navy via-atlas-navy/80 to-transparent z-10"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-24 bg-gradient-to-l from-atlas-navy via-atlas-navy/80 to-transparent z-10"
            aria-hidden="true"
          />

          <div className="flex items-center select-none py-1">
            <div className="animate-marquee-left flex items-center gap-8 sm:gap-12 md:gap-16 shrink-0 pr-8 sm:pr-12 md:pr-16">
              {CLIENT_ITEMS.map((item, idx) => (
                <div
                  key={`client-1-${item.id}-${idx}`}
                  className="shrink-0 flex items-center justify-center px-2 py-1 grayscale-0 hover:scale-105 transition-transform duration-200"
                >
                  {item.component}
                </div>
              ))}
            </div>

            <div
              className="animate-marquee-left flex items-center gap-8 sm:gap-12 md:gap-16 shrink-0 pr-8 sm:pr-12 md:pr-16"
              aria-hidden="true"
            >
              {CLIENT_ITEMS.map((item, idx) => (
                <div
                  key={`client-2-${item.id}-${idx}`}
                  className="shrink-0 flex items-center justify-center px-2 py-1 grayscale-0 hover:scale-105 transition-transform duration-200"
                >
                  {item.component}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
