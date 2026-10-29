import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, ShieldCheck, ChevronRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { BRAND_INFO, NAV_LINKS } from '../../data/websiteContent';

export const SiteHeader: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('Home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-navy-950/95 backdrop-blur-md border-b border-navy-800/80 shadow-lg'
            : 'bg-navy-950 border-b border-navy-850'
        }`}
      >
        {/* Top Mini Accreditation Ribbon */}
        <div className="hidden xl:block bg-navy-900 border-b border-navy-800/60 py-1.5 px-4 sm:px-6 lg:px-8 text-xs text-slate-300">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1.5 text-slate-300 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-accent-cyan" />
                <span>Authorized SAP Channel Partner</span>
              </span>
              <span className="text-navy-700">|</span>
              <span className="text-slate-300">Boyum IT Silver Partner</span>
              <span className="text-navy-700">|</span>
              <span className="text-slate-300">UiPath Silver Partner</span>
            </div>
            <div className="flex items-center gap-4 text-[11px] text-slate-400">
              <span>Mumbai (Borivali & Marine Lines)</span>
              <span>•</span>
              <a
                href={`mailto:${BRAND_INFO.contact.email}`}
                className="text-slate-300 hover:text-accent-cyan transition-colors"
              >
                {BRAND_INFO.contact.email}
              </a>
              <span>•</span>
              <a
                href={BRAND_INFO.contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-cyan hover:underline"
              >
                +91-9372329599
              </a>
            </div>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand Identity */}
            <a
              href="#"
              className="flex items-center gap-3.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan rounded-lg p-1"
            >
              <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-white shadow-md border border-slate-200/20 shrink-0 flex items-center justify-center">
                <img
                  src="/images/logo.jpeg"
                  alt="ATLAS Technosoft Brand Identity"
                  className="w-full h-full object-contain p-1"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    if (e.currentTarget.parentElement) {
                      e.currentTarget.parentElement.innerText = 'ATPL';
                      e.currentTarget.parentElement.className =
                        'w-10 h-10 rounded-xl bg-brand-600 text-white font-black flex items-center justify-center text-xs';
                    }
                  }}
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-extrabold tracking-tight text-white group-hover:text-accent-cyan transition-colors">
                  ATLAS <span className="text-brand-400">Technosoft</span>
                </span>
                <span className="text-[10px] text-slate-400 tracking-wider uppercase font-medium">
                  SAP & Hyperautomation
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links (8 Items) */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5" aria-label="Main Navigation">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setActiveSection(link.name)}
                  className={`px-2.5 py-1.5 text-xs xl:text-sm font-medium rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan ${
                    activeSection === link.name
                      ? 'text-white bg-navy-850 font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-navy-850/60'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Primary Action Button */}
            <div className="hidden sm:flex items-center gap-3">
              <Button
                href="#contact"
                variant="primary"
                size="sm"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Book a Consultation
              </Button>
            </div>

            {/* Mobile / Tablet Menu Button */}
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-navy-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
                aria-expanded={isMobileMenuOpen}
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-between bg-navy-950/98 backdrop-blur-xl">
          <div className="p-4 border-b border-navy-800 flex items-center justify-between">
            <a href="#" className="flex items-center gap-3" onClick={() => setIsMobileMenuOpen(false)}>
              <div className="w-9 h-9 rounded-lg bg-white overflow-hidden p-1 flex items-center justify-center">
                <img src="/images/logo.jpeg" alt="ATLAS Logo" className="w-full h-full object-contain" />
              </div>
              <span className="text-base font-bold text-white">ATLAS Technosoft</span>
            </a>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-navy-800"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="px-6 py-6 overflow-y-auto flex-1">
            <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Website Navigation
            </div>
            <nav className="space-y-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => {
                    setActiveSection(link.name);
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-between py-3 text-base font-medium text-slate-200 border-b border-navy-900 hover:text-accent-cyan transition-colors"
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </a>
              ))}
            </nav>

            <div className="mt-8 pt-6 border-t border-navy-800 space-y-4">
              <div className="text-xs text-slate-400 space-y-1">
                <div>Authorized SAP Channel Partner</div>
                <div>Boyum IT Silver | UiPath Silver Partner</div>
                <div className="pt-2 text-slate-300 font-medium">
                  WhatsApp: +91-9372329599
                </div>
              </div>

              <Button
                href="#contact"
                variant="primary"
                fullWidth
                size="lg"
                onClick={() => setIsMobileMenuOpen(false)}
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Book a Consultation
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
