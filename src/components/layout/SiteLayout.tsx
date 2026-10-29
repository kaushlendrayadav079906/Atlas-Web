import React from 'react';
import { SiteHeader } from './SiteHeader';
import { SiteFooter } from './SiteFooter';
import { MobileQuickCTA } from './MobileQuickCTA';

interface SiteLayoutProps {
  children: React.ReactNode;
}

export const SiteLayout: React.FC<SiteLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-brand-500 selection:text-white pb-16 md:pb-0">
      <SiteHeader />
      <main className="flex-1 w-full overflow-hidden">
        {children}
      </main>
      <MobileQuickCTA />
      <SiteFooter />
    </div>
  );
};

