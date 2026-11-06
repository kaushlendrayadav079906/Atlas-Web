import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import { SiteHeader } from './SiteHeader';
import { TopInfoBar } from './TopInfoBar';
import { ScrollReveal } from './ScrollReveal';
import { ScrollProgress } from './ScrollProgress';
import { SiteFooter } from './SiteFooter';
import { MobileQuickCTA } from './MobileQuickCTA';
import { WhatsAppFloatingButton } from '../ui/WhatsAppFloatingButton';
import { CustomerSupportWidget } from '../ui/CustomerSupportWidget';

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
    <div className="min-h-screen flex flex-col bg-white text-atlas-navy selection:bg-atlas-royal selection:text-white pb-16 md:pb-0 relative">
      <ScrollProgress />
      <ScrollReveal />
      <div className="hidden md:block">
        <TopInfoBar />
      </div>
      <SiteHeader />
      <main className="flex-1 w-full overflow-hidden">
        {children}
      </main>
      <MobileQuickCTA />
      <SiteFooter />

      {/* Global Floating Communication & Support Tools */}
      <WhatsAppFloatingButton />
      <CustomerSupportWidget />
    </div>
  );
};
