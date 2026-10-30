import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Youtube, Twitter } from 'lucide-react';
import { BRAND_INFO, NAV_LINKS } from '../../data/websiteContent';

export const SiteFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#071d35] text-slate-300 pt-16 pb-12 border-t border-[#0e2a4d]">
      <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-[#0e2a4d]">
          
          {/* Column 1: Brand & Description (4 cols on lg) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-white overflow-hidden p-1 flex items-center justify-center shrink-0 shadow-md">
                <img src="/images/logo.png" alt="ATLAS Technosoft Logo" className="w-full h-full object-contain" />
              </div>
              <span className="text-[22px] font-extrabold text-white tracking-tight">
                ATLAS <span className="text-slate-300 font-medium">Technosoft</span>
              </span>
            </div>

            <p className="text-[15px] sm:text-[16px] text-slate-300 leading-relaxed max-w-sm">
              Your technology partner for SAP Business One, Boyum IT solutions, and intelligent automation.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-slate-800/80 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-slate-800/80 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-slate-800/80 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Twitter / X"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links (3 cols on lg) */}
          <div className="lg:col-span-3">
            <h4 className="text-[18px] sm:text-[19px] font-bold text-white mb-5 tracking-tight">
              Quick Links
            </h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-[15px] sm:text-[16px]">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-slate-300 hover:text-blue-400 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Column 3: Our Services (2.5 cols on lg) */}
          <div className="lg:col-span-2">
            <h4 className="text-[18px] sm:text-[19px] font-bold text-white mb-5 tracking-tight">
              Our Services
            </h4>
            <ul className="space-y-3 text-[15px] sm:text-[16px]">
              <li>
                <a href="/#services" className="text-slate-300 hover:text-blue-400 transition-colors">
                  SAP Business One
                </a>
              </li>
              <li>
                <a href="/#services" className="text-slate-300 hover:text-blue-400 transition-colors">
                  Boyum IT Solutions
                </a>
              </li>
              <li>
                <a href="/#services" className="text-slate-300 hover:text-blue-400 transition-colors">
                  UiPath Automation
                </a>
              </li>
              <li>
                <a href="/#services" className="text-slate-300 hover:text-blue-400 transition-colors">
                  ATLAS Add-ons
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Us (3 cols on lg) */}
          <div className="lg:col-span-3">
            <h4 className="text-[18px] sm:text-[19px] font-bold text-white mb-5 tracking-tight">
              Contact Us
            </h4>
            <ul className="space-y-3.5 text-[15px] sm:text-[16px]">
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-400 shrink-0" />
                <a
                  href={`mailto:${BRAND_INFO.contact.email}`}
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  {BRAND_INFO.contact.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-400 shrink-0" />
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
                <MapPin className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <span className="text-slate-300">
                  Borivali, Mumbai<br />
                  Marine Lines, Mumbai
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright & Legal Links */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[14px] sm:text-[15px] text-slate-400">
          <div>
            © {currentYear} ATLAS Technosoft. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="#about" className="hover:text-slate-200 transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#about" className="hover:text-slate-200 transition-colors">Terms of Use</a>
            <span>•</span>
            <a href="#about" className="hover:text-slate-200 transition-colors">Sitemap</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
