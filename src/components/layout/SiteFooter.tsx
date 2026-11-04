import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, ChevronRight, Check } from 'lucide-react';
import { BRAND_INFO } from '../../data/websiteContent';

// Official WhatsApp Vector Icon
const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

// Official X Vector Icon
const XTwitterIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// Official YouTube Vector Icon
const YouTubeIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

// Official SAP Silver Partner Badge matching Reference Screenshot
const SAPSilverPartnerBadge: React.FC<{ className?: string }> = ({ className = "h-[66px] sm:h-[72px]" }) => (
  <div className={`inline-block select-none ${className}`}>
    <img
      src="/images/sap_silver_partner_transparent.png"
      alt="SAP Silver Partner"
      width={180}
      height={76}
      className="h-full w-auto max-h-[76px] object-contain drop-shadow-xs"
      loading="eager"
      decoding="sync"
    />
  </div>
);

export const SiteFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const primaryQuickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Solutions', href: '/solutions' },
  ];

  const secondaryQuickLinks = [
    { name: 'Industries', href: '/industries' },
    { name: 'Case Studies', href: '/case-studies' },
    { name: 'Partners', href: '/partners' },
    { name: 'Blog & Insights', href: '/blog' },
    { name: 'Contact Us', href: '/contact' },
  ];

  const partnerLinks = [
    { name: 'SAP Business One', href: '/services/sap-business-one' },
    { name: 'Boyum IT Solutions', href: '/services/boyum-it' },
    { name: 'UiPath', href: '/services/uipath-automation' },
    { name: 'ATLAS Add-ons', href: '/services/atlas-addons' },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-[#F0F7FF] via-[#F8FBFF] to-[#E3F0FF] text-[#0B2450] pt-12 sm:pt-14 pb-0 border-t border-[#D0E4FF] overflow-hidden">
      
      {/* 1. Soft blue ambient background glow */}
      <div
        className="pointer-events-none absolute -top-24 left-1/4 w-[550px] h-[340px] bg-gradient-to-b from-[#E1F0FF]/80 via-[#F0F7FF]/50 to-transparent rounded-full blur-3xl -z-0"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-10 left-8 w-[400px] h-[240px] bg-gradient-to-tr from-[#E1F0FF]/50 to-transparent rounded-full blur-2xl -z-0"
        aria-hidden="true"
      />

      {/* 2. Subtle curved blue wave shapes at bottom-right (matching exact reference curves) */}
      <div
        className="pointer-events-none absolute bottom-0 right-0 w-[550px] sm:w-[750px] lg:w-[980px] xl:w-[1150px] h-[220px] sm:h-[280px] lg:h-[340px] overflow-hidden select-none -z-0"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1150 340"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover object-bottom"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="footerWaveGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E6F2FE" stopOpacity="0.45" />
              <stop offset="60%" stopColor="#D2E8FD" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#C4E0FD" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="footerWaveGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#DEF0FE" stopOpacity="0.4" />
              <stop offset="60%" stopColor="#C8E4FD" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#B6DCFD" stopOpacity="0.85" />
            </linearGradient>
            <linearGradient id="footerWaveGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D0E7FD" stopOpacity="0.35" />
              <stop offset="70%" stopColor="#BADEFD" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#A8D6FD" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          {/* Layer 1: High sweeping organic wave */}
          <path
            d="M150 340 C380 310 580 230 790 160 C940 110 1060 60 1150 20 L1150 340 Z"
            fill="url(#footerWaveGrad1)"
          />
          {/* Layer 2: Mid sweeping curve */}
          <path
            d="M360 340 C560 320 720 255 890 195 C1010 155 1090 120 1150 85 L1150 340 Z"
            fill="url(#footerWaveGrad2)"
          />
          {/* Layer 3: Foreground gentle curve */}
          <path
            d="M580 340 C750 325 870 280 990 235 C1070 205 1120 180 1150 160 L1150 340 Z"
            fill="url(#footerWaveGrad3)"
          />
        </svg>
      </div>

      <div className="max-w-[1420px] 2xl:max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 relative z-10">
        
        {/* Main 4-Column Footer Grid matching Reference */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-10 pb-12">
          
          {/* Column 1: Brand Logo, Description, SAP Silver Partner Badge & Social Icons */}
          <div className="lg:col-span-3 space-y-4 text-left">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <div className="w-14 h-12 flex items-center justify-center shrink-0">
                <img
                  src="/images/logo.png"
                  alt="ATLAS Technosoft Logo"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex flex-col leading-none select-none">
                <span className="text-[24px] font-black tracking-tight text-[#0B2450] group-hover:text-[#0066CC] transition-colors">
                  ATLAS
                </span>
                <span className="text-[15px] font-bold text-[#0B2450] tracking-normal mt-0.5">
                  Technosoft
                </span>
              </div>
            </Link>

            <p className="text-[13.5px] text-[#334D6E] leading-relaxed max-w-sm font-normal">
              Your technology partner for SAP Business One, Boyum IT solutions, and intelligent automation.
            </p>

            {/* Official SAP Silver Partner Badge (matching reference) */}
            <div className="pt-1.5">
              <SAPSilverPartnerBadge className="h-[64px] sm:h-[70px]" />
            </div>

            {/* Social Icons matching Reference: LinkedIn, WhatsApp, X (Twitter), YouTube */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href="https://www.linkedin.com/company/atlas-technosoft-pvt-ltd/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8.5 h-8.5 rounded-lg bg-[#E1F0FF] border border-blue-200/60 hover:border-[#0066CC] hover:bg-[#0066CC] text-[#0066CC] hover:text-white flex items-center justify-center transition-all duration-200 shadow-2xs"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/919372329599?text=Hello%20ATLAS%20Technosoft%2C%20I%20would%20like%20to%20book%20a%20consultation."
                target="_blank"
                rel="noopener noreferrer"
                className="w-8.5 h-8.5 rounded-lg bg-[#E1F0FF] border border-blue-200/60 hover:border-[#0066CC] hover:bg-[#0066CC] text-[#0066CC] hover:text-white flex items-center justify-center transition-all duration-200 shadow-2xs"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon className="w-4 h-4" />
              </a>
              <a
                href="https://x.com/atlastechnosoft"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8.5 h-8.5 rounded-lg bg-[#E1F0FF] border border-blue-200/60 hover:border-[#0066CC] hover:bg-[#0066CC] text-[#0066CC] hover:text-white flex items-center justify-center transition-all duration-200 shadow-2xs"
                aria-label="X (Twitter)"
              >
                <XTwitterIcon className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com/@atlastechnosoft"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8.5 h-8.5 rounded-lg bg-[#E1F0FF] border border-blue-200/60 hover:border-[#0066CC] hover:bg-[#0066CC] text-[#0066CC] hover:text-white flex items-center justify-center transition-all duration-200 shadow-2xs"
                aria-label="YouTube"
              >
                <YouTubeIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Contact Info */}
          <div className="lg:col-span-3 xl:col-span-3 text-left">
            <div className="mb-4">
              <h4 className="text-[16px] sm:text-[17px] font-bold text-[#0B2450] tracking-wide uppercase">
                CONTACT
              </h4>
              <div className="w-8 h-[2.5px] bg-[#0066CC] rounded-full mt-1.5" />
            </div>

            <ul className="space-y-3 text-[14px]">
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#E1F0FF] text-[#0066CC] flex items-center justify-center shrink-0 border border-blue-200/50 shadow-2xs">
                  <Mail className="w-4 h-4" />
                </div>
                <a
                  href={`mailto:${BRAND_INFO.contact.email}`}
                  className="font-medium text-[#0B2450] hover:text-[#0066CC] transition-colors break-words"
                >
                  {BRAND_INFO.contact.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#E1F0FF] text-[#0066CC] flex items-center justify-center shrink-0 border border-blue-200/50 shadow-2xs">
                  <Phone className="w-4 h-4" />
                </div>
                <a
                  href={`tel:+919372329599`}
                  className="font-medium text-[#0B2450] hover:text-[#0066CC] transition-colors"
                >
                  +91 93723 29599
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#E1F0FF] text-[#0066CC] flex items-center justify-center shrink-0 border border-blue-200/50 shadow-2xs">
                  <WhatsAppIcon className="w-4 h-4" />
                </div>
                <a
                  href={BRAND_INFO.contact.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-[#0B2450] hover:text-[#0066CC] transition-colors"
                >
                  Chat on WhatsApp
                </a>
              </li>
              
              {/* Divider */}
              <li className="pt-2 border-t border-blue-200/60">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#E1F0FF] text-[#0066CC] flex items-center justify-center shrink-0 border border-blue-200/50 shadow-2xs mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="space-y-1 text-[13px]">
                    <div className="font-bold text-[#0B2450] uppercase tracking-wide text-[12px]">
                      OUR OFFICES
                    </div>
                    <div className="text-[#334D6E] flex items-center gap-1.5 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0066CC]" />
                      <span>Borivali (West), Mumbai, Maharashtra</span>
                    </div>
                    <div className="text-[#334D6E] flex items-center gap-1.5 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0066CC]" />
                      <span>Marine Lines, Mumbai, Maharashtra</span>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 3: Our Trusted Partners */}
          <div className="lg:col-span-3 xl:col-span-3 text-left">
            <div className="mb-4">
              <h4 className="text-[16px] sm:text-[17px] font-bold text-[#0B2450] tracking-wide uppercase">
                OUR TRUSTED PARTNERS
              </h4>
              <div className="w-8 h-[2.5px] bg-[#0066CC] rounded-full mt-1.5" />
            </div>

            <ul className="space-y-3.5 text-[14px]">
              {partnerLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="group inline-flex items-center gap-2.5 font-semibold text-[#0B2450] hover:text-[#0066CC] transition-colors"
                  >
                    <span className="w-4 h-4 rounded-full bg-[#0066CC] text-white flex items-center justify-center shrink-0 shadow-2xs">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </span>
                    <span className="group-hover:translate-x-0.5 transition-transform">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Quick Links */}
          <div className="lg:col-span-3 xl:col-span-3 text-left">
            <div className="mb-4">
              <h4 className="text-[16px] sm:text-[17px] font-bold text-[#0B2450] tracking-wide uppercase">
                QUICK LINKS
              </h4>
              <div className="w-8 h-[2.5px] bg-[#0066CC] rounded-full mt-1.5" />
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-[14px]">
              <ul className="space-y-3">
                {primaryQuickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-[#0B2450] hover:text-[#0066CC] hover:translate-x-1 inline-flex items-center gap-1.5 font-semibold transition-all duration-200 whitespace-nowrap"
                    >
                      <ChevronRight className="w-3.5 h-3.5 text-[#0066CC] shrink-0" />
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <ul className="space-y-3">
                {secondaryQuickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-[#0B2450] hover:text-[#0066CC] hover:translate-x-1 inline-flex items-center gap-1.5 font-semibold transition-all duration-200 whitespace-nowrap"
                    >
                      <ChevronRight className="w-3.5 h-3.5 text-[#0066CC] shrink-0" />
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

      </div>

      {/* Bottom Deep Blue Copyright Bar matching Reference (#004DB3) */}
      <div className="bg-[#004DB3] py-4 text-white text-[13px] sm:text-[14px] relative z-10 border-t border-blue-400/20">
        <div className="max-w-[1420px] 2xl:max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-center sm:text-left text-white/95 font-normal">
            © {currentYear} ATLAS Technosoft. All rights reserved.
          </div>
          <div className="flex items-center gap-5 text-white/90">
            <Link to="/about" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span className="text-white/40">|</span>
            <Link to="/about" className="hover:text-white transition-colors">Terms of Use</Link>
            <span className="text-white/40">|</span>
            <Link to="/contact" className="hover:text-white transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>

    </footer>
  );
};
