import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { SiteLayout } from './components/layout/SiteLayout';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { SolutionsPage } from './pages/SolutionsPage';
import { IndustriesPage } from './pages/IndustriesPage';
import { IndustryDetailPage } from './pages/IndustryDetailPage';
import { CaseStudiesPage } from './pages/CaseStudiesPage';
import { IndividualCaseStudyPage } from './pages/IndividualCaseStudyPage';
import { PartnersPage } from './pages/PartnersPage';
import { IndividualPartnerPage } from './pages/IndividualPartnerPage';
import { ContactPage } from './pages/ContactPage';
import { BoyumITPage } from './pages/BoyumITPage';

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
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/boyum-it" element={<BoyumITPage />} />
          <Route path="/services/:serviceSlug" element={<ServiceDetailPage />} />
          <Route path="/solutions" element={<SolutionsPage />} />
          <Route path="/solutions/boyum-it" element={<BoyumITPage />} />
          <Route path="/expertise" element={<ServicesPage />} />
          <Route path="/industries" element={<IndustriesPage />} />
          <Route path="/industries/:industrySlug" element={<IndustryDetailPage />} />
          <Route path="/case-studies" element={<CaseStudiesPage />} />
          <Route path="/case-studies/:studySlug" element={<IndividualCaseStudyPage />} />
          <Route path="/partners" element={<PartnersPage />} />
          <Route path="/partners/:partnerSlug" element={<IndividualPartnerPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </SiteLayout>
    </BrowserRouter>
  );
};

export default App;
