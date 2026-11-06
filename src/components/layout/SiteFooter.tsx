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
  <div className={`inline-flex items-center rounded-2xl bg-white px-3 py-1.5 select-none ${className}`}>
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
    <footer className="relative atlas-cream text-white pt-16 sm:pt-20 pb-0 overflow-hidden">
      
      <div className="max-w-[1420px] 2xl:max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 relative z-10">
        
        {/* Main 4-Column Footer Grid matching Reference */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-10 pb-12">
          
          {/* Column 1: Brand Logo, Description, SAP Silver Partner Badge & Social Icons */}
          <div className="lg:col-span-3 space-y-4 text-left">
            <Link to="/" className="inline-flex items-center gap-3.5 group">
              {/* Increased Company Logo Size (+35-40%) with Preserved Proportions */}
              <div className="w-20 h-16 sm:w-[84px] sm:h-[68px] flex items-center justify-center shrink-0">
                <img
                  src="/images/logo.png"
                  alt="ATLAS Technosoft Logo"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex flex-col leading-none select-none">
                <span className="text-[26px] sm:text-[28px] font-extrabold tracking-[-0.02em] text-white group-hover:text-atlas-gold transition-colors">
                  ATLAS
                </span>
                <span className="text-[15px] sm:text-[16px] font-bold text-white tracking-normal mt-0.5">
                  Technosoft
                </span>
              </div>
            </Link>

            {/* Footer Description: 16-17px */}
            <p className="text-[16px] sm:text-[16.5px] text-atlas-onNavy leading-relaxed max-w-sm font-normal">
              Your technology partner for SAP Business One, Boyum IT solutions, and intelligent automation.
            </p>

            {/* Official SAP Silver Partner Badge */}
            <div className="pt-1.5">
              <SAPSilverPartnerBadge className="h-[64px] sm:h-[68px]" />
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href="https://www.linkedin.com/company/atlas-technosoft-pvt-ltd/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 border border-white/10 hover:border-atlas-gold hover:bg-atlas-gold text-white hover:text-atlas-navy flex items-center justify-center transition-all duration-200 shadow-2xs"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4.5 h-4.5" />
              </a>
              <a
                href="https://wa.me/919372329599?text=Hello%20ATLAS%20Technosoft%2C%20I%20would%20like%20to%20book%20a%20consultation."
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 border border-white/10 hover:border-atlas-gold hover:bg-atlas-gold text-white hover:text-atlas-navy flex items-center justify-center transition-all duration-200 shadow-2xs"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon className="w-4.5 h-4.5" />
              </a>
              <a
                href="https://x.com/atlastechnosoft"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 border border-white/10 hover:border-atlas-gold hover:bg-atlas-gold text-white hover:text-atlas-navy flex items-center justify-center transition-all duration-200 shadow-2xs"
                aria-label="X (Twitter)"
              >
                <XTwitterIcon className="w-4.5 h-4.5" />
              </a>
              <a
                href="https://youtube.com/@atlastechnosoft"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 border border-white/10 hover:border-atlas-gold hover:bg-atlas-gold text-white hover:text-atlas-navy flex items-center justify-center transition-all duration-200 shadow-2xs"
                aria-label="YouTube"
              >
                <YouTubeIcon className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>

          {/* Column 2: Contact Info (Headings: 19-21px, Text: 16-17px) */}
          <div className="lg:col-span-3 xl:col-span-3 text-left">
            <div className="mb-4">
              <h4 className="text-[19px] sm:text-[20px] font-bold text-atlas-gold tracking-wide">
                CONTACT
              </h4>
              <div className="w-10 h-[2.5px] bg-atlas-gold rounded-full mt-2" />
            </div>

            <ul className="space-y-3.5 text-[16px] sm:text-[16.5px]">
              <li className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/10 text-atlas-gold flex items-center justify-center shrink-0 border border-white/10">
                  <Mail className="w-4.5 h-4.5" />
                </div>
                <a
                  href={`mailto:${BRAND_INFO.contact.email}`}
                  className="font-medium text-white hover:text-atlas-gold transition-colors break-words"
                >
                  {BRAND_INFO.contact.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/10 text-atlas-gold flex items-center justify-center shrink-0 border border-white/10">
                  <Phone className="w-4.5 h-4.5" />
                </div>
                <a
                  href={`tel:+919372329599`}
                  className="font-medium text-white hover:text-atlas-gold transition-colors"
                >
                  +91 93723 29599
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/10 text-atlas-gold flex items-center justify-center shrink-0 border border-white/10">
                  <WhatsAppIcon className="w-4.5 h-4.5" />
                </div>
                <a
                  href={BRAND_INFO.contact.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-white hover:text-atlas-gold transition-colors"
                >
                  Chat on WhatsApp
                </a>
              </li>
              
              {/* Divider */}
              <li className="pt-3 border-t border-white/10">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/10 text-atlas-gold flex items-center justify-center shrink-0 border border-white/10 mt-0.5">
                    <MapPin className="w-4.5 h-4.5" />
                  </div>
                  <div className="space-y-1.5">
                    <div className="font-bold text-white uppercase tracking-wider text-[15px] sm:text-[16px]">
                      OUR OFFICES
                    </div>
                    <div className="text-atlas-onNavy flex items-center gap-2 font-medium text-[15px] sm:text-[16px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-atlas-gold shrink-0" />
                      <span>Borivali (West), Mumbai, Maharashtra</span>
                    </div>
                    <div className="text-atlas-onNavy flex items-center gap-2 font-medium text-[15px] sm:text-[16px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-atlas-gold shrink-0" />
                      <span>Marine Lines, Mumbai, Maharashtra</span>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 3: Our Trusted Partners (Heading: 19-21px, Names: 16-17px) */}
          <div className="lg:col-span-3 xl:col-span-3 text-left">
            <div className="mb-4">
              <h4 className="text-[19px] sm:text-[20px] font-bold text-atlas-gold tracking-wide">
                OUR TRUSTED PARTNERS
              </h4>
              <div className="w-10 h-[2.5px] bg-atlas-gold rounded-full mt-2" />
            </div>

            <ul className="space-y-4 text-[16px] sm:text-[16.5px]">
              {partnerLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="group inline-flex items-center gap-3 font-medium text-atlas-onNavy hover:text-atlas-gold transition-colors"
                  >
                    <span className="w-5 h-5 rounded-full bg-atlas-gold text-atlas-navy flex items-center justify-center shrink-0 shadow-2xs">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </span>
                    <span className="group-hover:translate-x-1 transition-transform">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Quick Links (Heading: 19-21px, Links: 16-17px, Improved Spacing) */}
          <div className="lg:col-span-3 xl:col-span-3 text-left">
            <div className="mb-4">
              <h4 className="text-[19px] sm:text-[20px] font-bold text-atlas-gold tracking-wide">
                QUICK LINKS
              </h4>
              <div className="w-10 h-[2.5px] bg-atlas-gold rounded-full mt-2" />
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-4 text-[16px] sm:text-[16.5px]">
              <ul className="space-y-3.5">
                {primaryQuickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-white hover:text-atlas-gold hover:translate-x-1 inline-flex items-center gap-1.5 font-semibold transition-all duration-200 whitespace-nowrap"
                    >
                      <ChevronRight className="w-4 h-4 text-atlas-gold shrink-0" />
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <ul className="space-y-3.5">
                {secondaryQuickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-white hover:text-atlas-gold hover:translate-x-1 inline-flex items-center gap-1.5 font-semibold transition-all duration-200 whitespace-nowrap"
                    >
                      <ChevronRight className="w-4 h-4 text-atlas-gold shrink-0" />
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

      </div>

      {/* Bottom Copyright Bar: 15-16px text */}
      <div className="atlas-cream atlas-cream-deep py-5 text-white text-[15px] sm:text-[16px] relative z-10 border-t border-white/10">
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
