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
import { BlogPage } from './pages/BlogPage';
import { BlogDetailPage } from './pages/BlogDetailPage';
import { SapGuidesPage } from './pages/SapGuidesPage';
import { IndustryInsightsPage } from './pages/IndustryInsightsPage';
import { FaqsPage } from './pages/FaqsPage';
import { ManufacturingSolutionPage } from './pages/solutions/ManufacturingSolutionPage';
import { WarehouseSolutionPage } from './pages/solutions/WarehouseSolutionPage';
import { FinanceSolutionPage } from './pages/solutions/FinanceSolutionPage';
import { LogisticsSolutionPage } from './pages/solutions/LogisticsSolutionPage';
import { AtlasAddonsPage } from './pages/solutions/AtlasAddonsPage';
import { SupportMaintenancePage } from './pages/SupportMaintenancePage';

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

          {/* Services Routes */}
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/support-maintenance" element={<SupportMaintenancePage />} />
          <Route path="/services/support-ams" element={<SupportMaintenancePage />} />
          <Route path="/services/boyum-it" element={<BoyumITPage />} />
          <Route path="/services/atlas-addons" element={<AtlasAddonsPage />} />
          <Route path="/services/:serviceSlug" element={<ServiceDetailPage />} />

          {/* Solutions Routes */}
          <Route path="/solutions" element={<SolutionsPage />} />
          <Route path="/solutions/manufacturing" element={<ManufacturingSolutionPage />} />
          <Route path="/solutions/warehouse-management" element={<WarehouseSolutionPage />} />
          <Route path="/solutions/finance-automation" element={<FinanceSolutionPage />} />
          <Route path="/solutions/logistics-shipping" element={<LogisticsSolutionPage />} />
          <Route path="/solutions/atlas-addons" element={<AtlasAddonsPage />} />
          <Route path="/solutions/boyum-it" element={<BoyumITPage />} />

          {/* Industries & Expertise */}
          <Route path="/expertise" element={<ServicesPage />} />
          <Route path="/industries" element={<IndustriesPage />} />
          <Route path="/industries/:industrySlug" element={<IndustryDetailPage />} />

          {/* Case Studies */}
          <Route path="/case-studies" element={<CaseStudiesPage />} />
          <Route path="/case-studies/:studySlug" element={<IndividualCaseStudyPage />} />

          {/* Partners */}
          <Route path="/partners" element={<PartnersPage />} />
          <Route path="/partners/:partnerSlug" element={<IndividualPartnerPage />} />

          {/* Blog & Resources */}
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogDetailPage />} />
          <Route path="/insights" element={<BlogPage />} />
          <Route path="/resources/sap-guides" element={<SapGuidesPage />} />
          <Route path="/resources/industry-insights" element={<IndustryInsightsPage />} />
          <Route path="/resources/faqs" element={<FaqsPage />} />
          <Route path="/sap-guides" element={<SapGuidesPage />} />
          <Route path="/industry-insights" element={<IndustryInsightsPage />} />
          <Route path="/faqs" element={<FaqsPage />} />

          {/* Contact */}
          <Route path="/contact" element={<ContactPage />} />

          {/* Fallback */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </SiteLayout>
    </BrowserRouter>
  );
};

export default App;
