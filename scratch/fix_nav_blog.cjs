const fs = require('fs');
const path = require('path');

const p = path.resolve('src/data/navigationData.ts');
let lines = fs.readFileSync(p, 'utf8').split(/\r?\n/);

const blogIdx = lines.findIndex(l => l.includes("name: 'Blog'"));
if (blogIdx !== -1) {
  const newLines = [
    "  {",
    "    name: 'Insights & Resources',",
    "    href: '/blog',",
    "    hasDropdown: true,",
    "    categories: [",
    "      {",
    "        id: 'blog',",
    "        name: 'Blog',",
    "        icon: 'BookOpen',",
    "        href: '/blog',",
    "        description: 'Practical guides, strategic ERP insights, and technical breakthroughs written by ATLAS consultants.',",
    "        subItems: [",
    "          { name: 'All Insights & Articles', href: '/blog' },",
    "          { name: 'SAP Business One Strategy', href: '/blog?category=SAP+Business+One' },",
    "          { name: 'Manufacturing & Operations', href: '/blog?category=Manufacturing' },",
    "          { name: 'UiPath & Intelligent RPA', href: '/blog?category=UiPath+%26+Intelligent+Automation' }",
    "        ]",
    "      },",
    "      {",
    "        id: 'sap-guides',",
    "        name: 'SAP Guides',",
    "        icon: 'FileText',",
    "        href: '/resources/sap-guides',",
    "        description: 'Educational resources and blueprints covering SAP Business One basics, HANA migration, and financial architecture.',",
    "        subItems: [",
    "          { name: 'SAP Business One Introduction', href: '/resources/sap-guides#sap-b1-introduction' },",
    "          { name: 'SAP Implementation Methodology', href: '/resources/sap-guides#sap-implementation-methodology' },",
    "          { name: 'SAP HANA Migration Guide', href: '/resources/sap-guides#sap-hana-migration' },",
    "          { name: 'Inventory & Accounting Controls', href: '/resources/sap-guides#inventory-warehouse-management' }",
    "        ]",
    "      },",
    "      {",
    "        id: 'industry-insights',",
    "        name: 'Industry Insights',",
    "        icon: 'TrendingUp',",
    "        href: '/resources/industry-insights',",
    "        description: 'Sector-specific frameworks for discrete manufacturing, multi-bin warehousing, and automated trading operations.',",
    "        subItems: [",
    "          { name: 'Manufacturing ERP (Beas)', href: '/resources/industry-insights#manufacturing-erp-insight' },",
    "          { name: 'Warehouse Logistics (Produmex)', href: '/resources/industry-insights#warehouse-management-insight' },",
    "          { name: 'Finance & Compliance Automation', href: '/resources/industry-insights#finance-automation-insight' },",
    "          { name: 'Trading & Shipping Automation', href: '/resources/industry-insights#trading-shipping-insight' }",
    "        ]",
    "      },",
    "      {",
    "        id: 'faqs',",
    "        name: 'FAQs',",
    "        icon: 'HelpCircle',",
    "        href: '/resources/faqs',",
    "        description: 'Answers to frequently asked questions regarding SAP Business One, Boyum IT modules, UiPath RPA, and support SLAs.',",
    "        subItems: [",
    "          { name: 'SAP Business One Essentials', href: '/resources/faqs#sap-b1' },",
    "          { name: 'Implementation & Migration', href: '/resources/faqs#implementation' },",
    "          { name: 'Boyum IT & WMS Modules', href: '/resources/faqs#boyum-it' },",
    "          { name: 'UiPath RPA & Automation', href: '/resources/faqs#uipath' }",
    "        ]",
    "      }",
    "    ]",
    "  },"
  ];
  lines.splice(blogIdx - 1, 5, ...newLines);
  fs.writeFileSync(p, lines.join('\n'), 'utf8');
  console.log('Successfully replaced Blog with Insights & Resources dropdown in navigationData.ts');
} else {
  console.log('Blog item not found');
}

