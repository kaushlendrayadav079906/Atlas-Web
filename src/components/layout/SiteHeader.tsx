import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, ChevronRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { NAV_LINKS } from '../../data/websiteContent';

export const SiteHeader: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('Home');
  const isGoldTheme = ['/contact', '/solutions', '/industries', '/case-studies', '/partners'].includes(location.pathname);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (location.pathname === '/about') {
      setActiveSection('About');
    } else if (location.pathname === '/solutions') {
      setActiveSection('Solutions');
    } else if (location.pathname === '/industries') {
      setActiveSection('Industries');
    } else if (location.pathname === '/case-studies') {
      setActiveSection('Case Studies');
    } else if (location.pathname === '/partners') {
      setActiveSection('Partners');
    } else if (location.pathname === '/contact') {
      setActiveSection('Contact');
    } else if (location.pathname === '/' && !location.hash) {
      setActiveSection('Home');
    } else if (location.hash) {
      const matched = NAV_LINKS.find(link => link.href.includes(location.hash));
      if (matched) {
        setActiveSection(matched.name);
      }
    }
  }, [location.pathname, location.hash]);

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-sm'
            : 'bg-white border-b border-slate-100'
        }`}
      >
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[84px]">
            
            {/* Brand Logo & Name */}
            <Link
              to="/"
              className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-lg p-1"
            >
              <div className="relative h-12 w-14 shrink-0 flex items-center justify-center">
                <img
                  src="/images/logo.png"
                  alt="ATLAS Technosoft Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[22px] sm:text-[24px] font-black tracking-tight text-[#10264b] group-hover:text-[#d99120] transition-colors">
                  ATLAS
                </span>
                <span className="text-[13px] sm:text-[14px] font-bold text-[#10264b] tracking-normal mt-0.5">
                  Technosoft
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links (Large 16-17px typography) */}
            <nav className="hidden xl:flex items-center gap-7 lg:gap-8" aria-label="Main Navigation">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.name;
                return (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => setActiveSection(link.name)}
                    className={`text-[16px] xl:text-[17px] font-medium transition-colors relative py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded ${
                      isActive
                        ? isGoldTheme
                          ? 'text-[#d99120] font-semibold'
                          : 'text-blue-600 font-semibold'
                        : isGoldTheme
                        ? 'text-slate-700 hover:text-[#d99120]'
                        : 'text-slate-700 hover:text-blue-600'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full ${
                        isGoldTheme ? 'bg-[#d99120]' : 'bg-blue-600'
                      }`} />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Primary CTA: Prominent Book a Consultation Button */}
            <div className="hidden sm:flex items-center gap-3">
              <Button
                href={location.pathname === '/contact' ? '#contact-form' : '/contact'}
                variant={isGoldTheme ? 'gold' : 'primary'}
                size="md"
                className="text-[16px] sm:text-[17px] font-semibold px-6 py-3 rounded-lg text-white"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Book a Consultation
              </Button>
            </div>

            {/* Mobile / Tablet Menu Button */}
            <div className="flex items-center xl:hidden">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2.5 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                aria-expanded={isMobileMenuOpen}
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 xl:hidden flex flex-col justify-between bg-white/98 backdrop-blur-xl">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3" onClick={() => setIsMobileMenuOpen(false)}>
              <div className="w-12 h-10 shrink-0 flex items-center justify-center">
                <img src="/images/logo.png" alt="ATLAS Logo" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[20px] font-black text-slate-900">ATLAS</span>
                <span className="text-[12px] font-bold text-slate-800">Technosoft</span>
              </div>
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label="Close menu"
            >
              <X className="w-7 h-7" />
            </button>
          </div>

          <div className="px-6 py-6 overflow-y-auto flex-1">
            <div className="mb-3 text-[13px] font-bold uppercase tracking-wider text-slate-400">
              Navigation Menu
            </div>
            <nav className="space-y-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => {
                    setActiveSection(link.name);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center justify-between py-3.5 text-[17px] font-medium border-b border-slate-100 transition-colors ${
                    activeSection === link.name
                      ? isGoldTheme
                        ? 'text-[#d99120] font-semibold'
                        : 'text-blue-600 font-semibold'
                      : isGoldTheme
                      ? 'text-slate-800 hover:text-[#d99120]'
                      : 'text-slate-800 hover:text-blue-600'
                  }`}
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-5 h-5 text-slate-400" />
                </Link>
              ))}
            </nav>

            <div className="mt-8 pt-6 border-t border-slate-200 space-y-4">
              <div className="text-[14px] text-slate-600 space-y-1">
                <div className="font-semibold text-slate-900">Authorized SAP Channel Partner</div>
                <div>Boyum IT Silver | UiPath Silver Partner</div>
                <div className={`pt-2 font-medium text-[15px] ${isGoldTheme ? 'text-[#d99120]' : 'text-blue-600'}`}>
                  WhatsApp: +91-9372329599
                </div>
              </div>

              <Button
                href={location.pathname === '/contact' ? '#contact-form' : '/contact'}
                variant={isGoldTheme ? 'gold' : 'primary'}
                fullWidth
                size="lg"
                className={`text-[17px] font-semibold py-3.5 text-white ${
                  isGoldTheme ? 'bg-[#d99120] hover:bg-[#bd7810]' : ''
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
                icon={<ArrowRight className="w-5 h-5" />}
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
