const fs = require('fs');

const path = 'src/data/navigationData.ts';
let content = fs.readFileSync(path, 'utf8');

// Replace support-ams block
const oldSupportAms = `      {
        id: 'support-ams',
        name: 'Support & AMS',
        icon: 'Headphones',
        href: '/services/sap-business-one',
        description: 'Dedicated Application Management Services (AMS) backed by guaranteed SLAs and certified specialists.',
        subItems: [
          { name: '24/7 SLA-Backed Support', href: '/services/sap-business-one' },
          { name: 'Incident & Defect Resolution', href: '/services/sap-business-one' },
          { name: 'System Health Checks & Tuning', href: '/services/sap-business-one' },
          { name: 'End-User Knowledge Transfer', href: '/services/sap-business-one' }
        ]
      }`;

const newSupportAms = `      {
        id: 'support-ams',
        name: 'Support & AMS',
        icon: 'Headphones',
        href: '/services/support-maintenance',
        description: 'Dedicated Application Management Services (AMS) backed by guaranteed SLAs and certified specialists.',
        subItems: [
          { name: '24/7 SLA-Backed Support', href: '/services/support-maintenance#sla-matrix' },
          { name: 'Incident & Defect Resolution', href: '/services/support-maintenance#sla-matrix' },
          { name: 'System Health Checks & Tuning', href: '/services/support-maintenance' },
          { name: 'End-User Knowledge Transfer', href: '/services/support-maintenance' }
        ]
      }`;

// Normalize line endings for replacement
const normalize = (str) => str.replace(/\r\n/g, '\n');

let normalizedContent = normalize(content);
let normalizedOld = normalize(oldSupportAms);
let normalizedNew = normalize(newSupportAms);

if (normalizedContent.includes(normalizedOld)) {
  normalizedContent = normalizedContent.replace(normalizedOld, normalizedNew);
  console.log('Replaced support-ams');
} else {
  console.log('Old support-ams pattern not found exactly, trying regex');
  normalizedContent = normalizedContent.replace(
    /id:\s*'support-ams'[\s\S]*?id:\s*'upgrades-migration'/,
    `${normalizedNew},\n      {\n        id: 'upgrades-migration'`
  );
}

// Replace Solutions categories
const oldSolutionsRegex = /name:\s*'Solutions',\s*href:\s*'\/solutions',\s*hasDropdown:\s*true,\s*categories:\s*\[[\s\S]*?\]\s*\},/m;

const newSolutionsBlock = `name: 'Solutions',
    href: '/solutions',
    hasDropdown: true,
    categories: [
      {
        id: 'manufacturing-solutions',
        name: 'Manufacturing Solutions',
        icon: 'Factory',
        href: '/solutions/manufacturing',
        description: 'Closed-loop discrete and process manufacturing ERP with Beas APS, MRP II, and touch terminals.',
        subItems: [
          { name: 'Beas Manufacturing (APS / MRP)', href: '/solutions/manufacturing' },
          { name: 'Multi-Level BOM & Cost Estimation', href: '/solutions/manufacturing' },
          { name: 'Shop-Floor Data Collection (Terminal)', href: '/solutions/manufacturing' },
          { name: 'Quality Control & Batch Traceability', href: '/solutions/manufacturing' }
        ]
      },
      {
        id: 'warehouse-solutions',
        name: 'Warehouse Management (WMS)',
        icon: 'Truck',
        href: '/solutions/warehouse-management',
        description: 'Multi-bin storage hierarchy, RF handheld barcode scanning, automated e-way billing, and lot control.',
        subItems: [
          { name: 'Produmex WMS Integration', href: '/solutions/warehouse-management' },
          { name: 'Handheld RF Barcode Scanning', href: '/solutions/warehouse-management' },
          { name: 'Batch & Serial Number Tracking', href: '/solutions/warehouse-management' },
          { name: 'Automated E-Way Bill & Dispatch', href: '/solutions/warehouse-management' }
        ]
      },
      {
        id: 'finance-automation',
        name: 'Finance Automation Solutions',
        icon: 'TrendingUp',
        href: '/solutions/finance-automation',
        description: 'SAP HANA in-memory financials, UiPath OCR AP invoice ingestion, and automated bank reconciliation.',
        subItems: [
          { name: 'SAP HANA In-Memory Financials', href: '/solutions/finance-automation' },
          { name: 'UiPath AI Invoice & GRPO Ingestion', href: '/solutions/finance-automation' },
          { name: 'GSTR-2B & Vendor Statement Matching', href: '/solutions/finance-automation' },
          { name: 'Automated Bank Reconciliation', href: '/solutions/finance-automation' }
        ]
      },
      {
        id: 'logistics-shipping',
        name: 'Logistics & Shipping Solutions',
        icon: 'Ship',
        href: '/solutions/logistics-shipping',
        description: 'Multi-modal freight forwarding, precision landed cost allocation, weighbridge automation, and EXIM compliance.',
        subItems: [
          { name: 'Multi-Modal Freight & Cargo Tracking', href: '/solutions/logistics-shipping' },
          { name: 'Precision Landed Cost Allocation', href: '/solutions/logistics-shipping' },
          { name: 'Electronic Weighbridge & Gate Entry', href: '/solutions/logistics-shipping' },
          { name: 'EXIM Customs Documentation', href: '/solutions/logistics-shipping' }
        ]
      },
      {
        id: 'boyum-it-solutions',
        name: 'Boyum IT Solutions',
        icon: 'Layers',
        href: '/solutions/boyum-it',
        description: 'World-class SAP Certified add-ons for discrete manufacturing, advanced warehousing, and screen customization.',
        subItems: [
          { name: 'Beas Manufacturing', href: '/solutions/manufacturing' },
          { name: 'Produmex WMS Suite', href: '/solutions/warehouse-management' },
          { name: 'B1 Usability Package (B1UP)', href: '/solutions/boyum-it' },
          { name: 'Boyum Cloud & Usability', href: '/solutions/boyum-it' }
        ]
      },
      {
        id: 'atlas-proprietary-addons',
        name: 'ATLAS Proprietary Add-ons',
        icon: 'Cpu',
        href: '/solutions/atlas-addons',
        description: 'Niche proprietary IP solutions designed to address complex industrial, trading, and logistics requirements.',
        subItems: [
          { name: 'Multi-Modal Freight & Cargo Trading', href: '/solutions/atlas-addons' },
          { name: 'AI Gate Entry & Weighbridge Automation', href: '/solutions/atlas-addons' },
          { name: 'Vendor Collaboration Portal', href: '/solutions/atlas-addons' },
          { name: 'Export & Shipping Documentation', href: '/solutions/atlas-addons' }
        ]
      }
    ]
  },`;

if (oldSolutionsRegex.test(normalizedContent)) {
  normalizedContent = normalizedContent.replace(oldSolutionsRegex, newSolutionsBlock);
  console.log('Replaced Solutions categories successfully');
} else {
  console.error('Could not match oldSolutionsRegex');
}

fs.writeFileSync(path, normalizedContent, 'utf8');
console.log('Finished writing navigationData.ts');

