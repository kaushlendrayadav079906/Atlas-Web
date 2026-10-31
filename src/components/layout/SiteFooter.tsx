import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, ChevronRight } from 'lucide-react';
import { BRAND_INFO } from '../../data/websiteContent';

// Official WhatsApp Vector Icon (Lucide/Simple-Icons compatible)
const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

// Official X (formerly Twitter) Vector Icon
const XTwitterIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
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
    { name: 'Contact Us', href: '/contact' },
  ];

  const serviceLinks = [
    { name: 'SAP Business One', href: '/services/sap-business-one' },
    { name: 'Boyum IT Solutions', href: '/services/boyum-it' },
    { name: 'UiPath Automation', href: '/services/uipath-automation' },
    { name: 'ATLAS Add-ons', href: '/services/atlas-addons' },
  ];

  return (
    <footer className="relative bg-[#06152B] text-slate-300 pt-16 pb-12 border-t border-slate-800/80 overflow-hidden">
      {/* Subtle Royal Blue accent line across top edge */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#0066CC] to-transparent opacity-80 pointer-events-none" />

      {/* Ambient background glows */}
      <div className="absolute -top-32 left-1/4 w-96 h-96 bg-[#0066CC]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 right-1/4 w-96 h-96 bg-[#0A66C2]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main 4-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-10 pb-14 border-b border-white/10">
          
          {/* Column 1: Brand & Description (3 cols on lg) */}
          <div className="lg:col-span-3 space-y-5 text-left">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <div className="w-14 h-12 flex items-center justify-center shrink-0">
                <img
                  src="/images/logo.png"
                  alt="ATLAS Technosoft Logo"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex flex-col leading-none select-none">
                <span className="text-[24px] font-black tracking-tight text-white group-hover:text-blue-200 transition-colors">
                  ATLAS
                </span>
                <span className="text-[15px] font-medium text-slate-200 tracking-normal mt-0.5">
                  Technosoft
                </span>
              </div>
            </Link>

            <p className="text-[14px] text-slate-300/90 leading-relaxed max-w-sm font-normal">
              Your technology partner for SAP Business One, Boyum IT solutions, and intelligent automation.
            </p>

            {/* Social Icons (Order: 1. LinkedIn, 2. WhatsApp, 3. X / Twitter) */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.linkedin.com/company/atlas-technosoft-pvt-ltd/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 hover:border-[#0066CC]/60 hover:bg-gradient-to-r hover:from-[#0052CC] hover:to-[#0A66C2] text-slate-300 hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-blue-500/20 hover:-translate-y-0.5"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/919372329599?text=Hello%20ATLAS%20Technosoft%2C%20I%20would%20like%20to%20book%20a%20consultation."
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 hover:border-[#0066CC]/60 hover:bg-gradient-to-r hover:from-[#0052CC] hover:to-[#0A66C2] text-slate-300 hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-blue-500/20 hover:-translate-y-0.5"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon className="w-4 h-4" />
              </a>
              <a
                href="https://x.com/atlastechnosoft"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 hover:border-[#0066CC]/60 hover:bg-gradient-to-r hover:from-[#0052CC] hover:to-[#0A66C2] text-slate-300 hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-blue-500/20 hover:-translate-y-0.5"
                aria-label="X (Twitter)"
              >
                <XTwitterIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links (3.5 cols on lg) */}
          <div className="lg:col-span-3 xl:col-span-3 text-left">
            <div className="mb-5 space-y-1.5">
              <h4 className="font-serif text-[18px] sm:text-[19px] font-bold text-white tracking-tight">
                Quick Links
              </h4>
              <div className="w-7 h-0.5 bg-gradient-to-r from-[#0052CC] to-[#0A66C2] rounded-full" />
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-[14px]">
              <ul className="space-y-2.5">
                {primaryQuickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-slate-300/90 hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all duration-200 whitespace-nowrap"
                    >
                      <ChevronRight className="w-3.5 h-3.5 text-[#1B72E8] shrink-0" />
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <ul className="space-y-2.5">
                {secondaryQuickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-slate-300/90 hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all duration-200 whitespace-nowrap"
                    >
                      <ChevronRight className="w-3.5 h-3.5 text-[#0066CC] shrink-0" />
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 3: Our Services (2.5 cols on lg) */}
          <div className="lg:col-span-3 xl:col-span-3 text-left">
            <div className="mb-5 space-y-1.5">
              <h4 className="font-serif text-[18px] sm:text-[19px] font-bold text-white tracking-tight">
                Our Services
              </h4>
              <div className="w-7 h-0.5 bg-gradient-to-r from-[#0052CC] to-[#0A66C2] rounded-full" />
            </div>

            <ul className="space-y-2.5 text-[14px]">
              {serviceLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-slate-300/90 hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all duration-200 whitespace-nowrap"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-[#1B72E8] shrink-0" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Us (3 cols on lg) */}
          <div className="lg:col-span-3 xl:col-span-3 text-left">
            <div className="mb-5 space-y-1.5">
              <h4 className="font-serif text-[18px] sm:text-[19px] font-bold text-white tracking-tight">
                Contact Us
              </h4>
              <div className="w-7 h-0.5 bg-gradient-to-r from-[#0052CC] to-[#0A66C2] rounded-full" />
            </div>

            <ul className="space-y-3.5 text-[14px]">
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-[#0066CC]" />
                </div>
                <a
                  href={`mailto:${BRAND_INFO.contact.email}`}
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  {BRAND_INFO.contact.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-[#10b981]" />
                </div>
                <a
                  href={BRAND_INFO.contact.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  {BRAND_INFO.contact.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-[#0066CC]" />
                </div>
                <Link
                  to="/contact#locations"
                  className="text-slate-300 hover:text-white transition-colors leading-relaxed block"
                >
                  <span>Borivali (West), Mumbai</span>
                  <br />
                  <span>Marine Lines, Mumbai</span>
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright & Legal Links */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] sm:text-[14px] text-slate-400">
          <div className="text-center sm:text-left">
            © {currentYear} ATLAS Technosoft. All rights reserved.
          </div>
          {/* Added pr-16 so floating scroll button never overlaps Sitemap */}
          <div className="flex items-center gap-6 pr-0 md:pr-16">
            <Link to="/about" className="hover:text-slate-200 transition-colors">Privacy Policy</Link>
            <span className="text-slate-600">•</span>
            <Link to="/about" className="hover:text-slate-200 transition-colors">Terms of Use</Link>
            <span className="text-slate-600">•</span>
            <Link to="/contact" className="hover:text-slate-200 transition-colors">Sitemap</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
