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
      
    </div>
  );
};
