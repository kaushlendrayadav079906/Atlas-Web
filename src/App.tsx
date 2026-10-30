import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { SiteLayout } from './components/layout/SiteLayout';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { SolutionsPage } from './pages/SolutionsPage';

// Scroll to top helper or smooth scroll to hash element
const ScrollHandler: React.FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollHandler />
      <SiteLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* Phase 1 route aliases: smoothly map to homepage sections until Phase 2 dedicated pages */}
          <Route path="/solutions" element={<SolutionsPage />} />
          <Route path="/expertise" element={<HomePage />} />
          <Route path="/industries" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<HomePage />} />
          <Route path="/services" element={<HomePage />} />
          <Route path="/case-studies" element={<HomePage />} />
          <Route path="/partners" element={<HomePage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </SiteLayout>
    </BrowserRouter>
  );
};

export default App;

