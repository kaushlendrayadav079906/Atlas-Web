import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import { SiteHeader } from './SiteHeader';
import { SiteFooter } from './SiteFooter';
import { MobileQuickCTA } from './MobileQuickCTA';

interface SiteLayoutProps {
  children: React.ReactNode;
}

export const SiteLayout: React.FC<SiteLayoutProps> = ({ children }) => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-brand-500 selection:text-white pb-16 md:pb-0 relative">
      <SiteHeader />
      <main className="flex-1 w-full overflow-hidden">
        {children}
      </main>
      <MobileQuickCTA />
      <SiteFooter />

      {/* Unified Global Scroll-to-Top Button */}
      <button
        type="button"
        onClick={scrollToTop}
        className={`fixed bottom-20 md:bottom-8 right-6 z-40 w-11 h-11 rounded-full bg-gradient-to-r from-[#0052CC] to-[#0A66C2] hover:from-[#0040A8] hover:to-[#08529C] text-white shadow-xl shadow-blue-900/25 flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer ${
          showScrollTop
            ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
            : 'opacity-0 translate-y-4 scale-90 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <ChevronUp className="w-5 h-5" />
      </button>
    </div>
  );
};
