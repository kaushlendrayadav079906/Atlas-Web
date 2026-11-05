const fs = require('fs');
const path = require('path');

// 1. Update MegaMenuDropdown.tsx icon imports and map
{
  const p = path.resolve('src/components/layout/MegaMenuDropdown.tsx');
  let c = fs.readFileSync(p, 'utf8');
  if (!c.includes('BookOpen,')) {
    c = c.replace('  Clock,\n', '  Clock,\n  BookOpen,\n  FileText,\n  HelpCircle,\n');
  }
  if (!c.includes('BookOpen,')) {
    c = c.replace('  Clock,', '  Clock,\n  BookOpen,\n  FileText,\n  HelpCircle,');
  }
  if (!c.includes('BookOpen: BookOpen')) {
    c = c.replace('  Clock,', '  Clock,\n  BookOpen,\n  FileText,\n  HelpCircle,');
  }
  // replace iconMap
  c = c.replace(/const iconMap: Record<string, React\.FC<\{ className\?: string \}>> = \{[\s\S]*?\};/, `const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Settings,
  Layers,
  Headphones,
  RefreshCw,
  Link2,
  Users,
  Database,
  Zap,
  Cpu,
  Factory,
  Truck,
  Boxes,
  TrendingUp,
  Building2,
  ShieldCheck,
  Clock,
  BookOpen,
  FileText,
  HelpCircle,
};`);
  fs.writeFileSync(p, c, 'utf8');
  console.log('Updated MegaMenuDropdown.tsx');
}

// 2. Update SiteHeader.tsx icon imports and map
{
  const p = path.resolve('src/components/layout/SiteHeader.tsx');
  let c = fs.readFileSync(p, 'utf8');
  if (!c.includes('BookOpen,')) {
    c = c.replace('  Linkedin\n', '  Linkedin,\n  BookOpen,\n  FileText,\n  HelpCircle\n');
  }
  c = c.replace(/const iconMap: Record<string, React\.FC<\{ className\?: string \}>> = \{[\s\S]*?\};/, `const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Settings,
  Layers,
  Headphones,
  RefreshCw,
  Link2,
  Users,
  Database,
  Zap,
  Cpu,
  Factory,
  Truck,
  Boxes,
  TrendingUp,
  CheckCircle2,
  Building2,
  ShieldCheck,
  Clock,
  BookOpen,
  FileText,
  HelpCircle,
};`);
  fs.writeFileSync(p, c, 'utf8');
  console.log('Updated SiteHeader.tsx');
}

// 3. Update navigationData.ts to replace Blog with Insights & Resources
{
  const p = path.resolve('src/data/navigationData.ts');
  let c = fs.readFileSync(p, 'utf8');
  
  const blogOldBlock = `  {
    name: 'Blog',
    href: '/blog',
    hasDropdown: false,
  },`;

  const insightsNewBlock = `  {
    name: 'Insights & Resources',
    href: '/blog',
    hasDropdown: true,
    categories: [
      {
        id: 'blog',
        name: 'Blog',
        icon: 'BookOpen',
        href: '/blog',
        description: 'Practical guides, strategic ERP insights, and technical breakthroughs written by ATLAS consultants.',
        subItems: [
          { name: 'All Insights & Articles', href: '/blog' },
          { name: 'SAP Business One Strategy', href: '/blog?category=SAP+Business+One' },
          { name: 'Manufacturing & Operations', href: '/blog?category=Manufacturing' },
          { name: 'UiPath & Intelligent RPA', href: '/blog?category=UiPath+%26+Intelligent+Automation' }
        ]
      },
      {
        id: 'sap-guides',
        name: 'SAP Guides',
        icon: 'FileText',
        href: '/resources/sap-guides',
        description: 'Educational resources and blueprints covering SAP Business One basics, HANA migration, and financial architecture.',
        subItems: [
          { name: 'SAP Business One Introduction', href: '/resources/sap-guides#sap-b1-introduction' },
          { name: 'SAP Implementation Methodology', href: '/resources/sap-guides#sap-implementation-methodology' },
          { name: 'SAP HANA Migration Guide', href: '/resources/sap-guides#sap-hana-migration' },
          { name: 'Inventory & Accounting Controls', href: '/resources/sap-guides#inventory-warehouse-management' }
        ]
      },
      {
        id: 'industry-insights',
        name: 'Industry Insights',
        icon: 'TrendingUp',
        href: '/resources/industry-insights',
        description: 'Sector-specific frameworks for discrete manufacturing, multi-bin warehousing, and automated trading operations.',
        subItems: [
          { name: 'Manufacturing ERP (Beas)', href: '/resources/industry-insights#manufacturing-erp-insight' },
          { name: 'Warehouse Logistics (Produmex)', href: '/resources/industry-insights#warehouse-management-insight' },
          { name: 'Finance & Compliance Automation', href: '/resources/industry-insights#finance-automation-insight' },
          { name: 'Trading & Shipping Automation', href: '/resources/industry-insights#trading-shipping-insight' }
        ]
      },
      {
        id: 'faqs',
        name: 'FAQs',
        icon: 'HelpCircle',
        href: '/resources/faqs',
        description: 'Answers to frequently asked questions regarding SAP Business One, Boyum IT modules, UiPath RPA, and support SLAs.',
        subItems: [
          { name: 'SAP Business One Essentials', href: '/resources/faqs#sap-b1' },
          { name: 'Implementation & Migration', href: '/resources/faqs#implementation' },
          { name: 'Boyum IT & WMS Modules', href: '/resources/faqs#boyum-it' },
          { name: 'UiPath RPA & Automation', href: '/resources/faqs#uipath' }
        ]
      }
    ]
  },`;

  c = c.replace(blogOldBlock, insightsNewBlock);
  fs.writeFileSync(p, c, 'utf8');
  console.log('Updated navigationData.ts');
}

// 4. Update App.tsx with new routes
{
  const p = path.resolve('src/App.tsx');
  let c = fs.readFileSync(p, 'utf8');
  
  if (!c.includes('SapGuidesPage')) {
    c = c.replace(
      "import { BlogDetailPage } from './pages/BlogDetailPage';",
      `import { BlogDetailPage } from './pages/BlogDetailPage';
import { SapGuidesPage } from './pages/SapGuidesPage';
import { IndustryInsightsPage } from './pages/IndustryInsightsPage';
import { FaqsPage } from './pages/FaqsPage';`
    );
  }

  const routesTarget = `<Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogDetailPage />} />
          <Route path="/insights" element={<BlogPage />} />`;

  const routesReplacement = `<Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogDetailPage />} />
          <Route path="/insights" element={<BlogPage />} />
          <Route path="/resources/sap-guides" element={<SapGuidesPage />} />
          <Route path="/resources/industry-insights" element={<IndustryInsightsPage />} />
          <Route path="/resources/faqs" element={<FaqsPage />} />
          <Route path="/sap-guides" element={<SapGuidesPage />} />
          <Route path="/industry-insights" element={<IndustryInsightsPage />} />
          <Route path="/faqs" element={<FaqsPage />} />`;

  c = c.replace(routesTarget, routesReplacement);
  fs.writeFileSync(p, c, 'utf8');
  console.log('Updated App.tsx');
}

