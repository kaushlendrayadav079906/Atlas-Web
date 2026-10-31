export interface IndividualCaseStudy {
  slug: string;
  category: string;
  categoryIcon: 'boxes' | 'truck' | 'shopping-cart' | 'cpu' | 'factory';
  title: string;
  titleHighlight: string;
  tagline: string;
  introduction: string;
  heroImage: string;
  heroImageAlt: string;
  secondaryImage: string;
  secondaryImageAlt: string;
  clientProfile: {
    industry: string;
    deploymentTime: string;
    companyScale: string;
    geography: string;
  };
  techStack: Array<{ name: string; role: string; tag: string }>;
  businessChallenges: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  solutionImplementation: {
    heading: string;
    description: string;
    pillars: Array<{
      title: string;
      description: string;
    }>;
  };
  keyFeatures: string[];
  verifiedOutcomes: Array<{
    metric: string;
    label: string;
    detail: string;
  }>;
  verificationNote: string;
  clientQuote: {
    quote: string;
    author: string;
    role: string;
  };
  relatedSolutions: Array<{
    title: string;
    description: string;
    route: string;
    tag: string;
  }>;
}

export const INDIVIDUAL_CASE_STUDIES: Record<string, IndividualCaseStudy> = {
  'warehouse-management': {
    slug: 'warehouse-management',
    category: 'Warehouse & Logistics',
    categoryIcon: 'boxes',
    title: 'Warehouse Management for',
    titleHighlight: 'Better Control & 99.9% Accuracy',
    tagline: 'High-Velocity Multi-Bin Optimization with Produmex WMS and SAP Business One',
    introduction:
      'A leading 3PL and cold chain distribution operator in Western India eliminated picking errors, shortened truck turnaround times, and achieved 99.9% inventory precision by replacing paper pick tickets with wireless mobile RF scanning and Produmex WMS integrated with SAP Business One.',
    heroImage: '/images/case_studies/cs_warehouse.jpg',
    heroImageAlt: 'Modern High-Density Pallet Warehouse with Automated RF Picking',
    secondaryImage: '/images/solutions/solutions_produmex_wms.jpg',
    secondaryImageAlt: 'Produmex WMS Mobile RF Handheld Scanning Workflow',
    clientProfile: {
      industry: 'Cold Storage & 3PL Logistics',
      deploymentTime: '75 Days Turnkey Go-Live',
      companyScale: '3 Facility Hubs • 45,000+ Pallet Positions',
      geography: 'Mumbai & Pune Logistics Corridors'
    },
    techStack: [
      { name: 'Produmex WMS', role: 'Advanced Mobile RF Warehouse Management', tag: 'Specialized WMS' },
      { name: 'SAP Business One HANA', role: 'Enterprise Master Data & Financials', tag: 'Core ERP' },
      { name: 'Zebra TC26 Handhelds', role: 'Ruggedized Android RF Barcode Scanners', tag: 'Hardware' },
      { name: 'UiPath Software Bots', role: 'Automated ASN Ingestion & GRPO Creation', tag: 'Automation' }
    ],
    businessChallenges: [
      {
        title: 'Manual Paper Pick Inaccuracies',
        description: 'Pickers relied on printed paper tickets, leading to frequent wrong-item dispatches, misplaced pallets, and costly customer returns.',
        icon: 'FileText'
      },
      {
        title: 'Inability to Enforce Expiry & FEFO',
        description: 'Perishable cold-chain goods sat in blind spots without automated First-Expiry-First-Out enforcement, causing unsellable stock write-offs.',
        icon: 'Clock'
      },
      {
        title: 'Slow Inward Receiving & Staging',
        description: 'Truck check-in and Goods Receipt took 3 to 4 hours per consignment due to manual paper verification and hand-written ledger tallies.',
        icon: 'Truck'
      }
    ],
    solutionImplementation: {
      heading: 'Turnkey Produmex WMS Architecture with Real-Time SAP B1 Synchronization',
      description:
        'ATLAS Technosoft deployed Produmex WMS on SAP Business One HANA, replacing all paper-based workflows with ruggedized Android mobile RF terminals. Every bin, aisle, and pallet received a standardized GS1-128 barcode identity.',
      pillars: [
        {
          title: 'Dynamic Multi-Bin Allocation',
          description: 'Forklift operators are directed via handheld screens to the nearest optimal bin based on pallet weight, turnover speed, and temperature zone.'
        },
        {
          title: 'Automated Wave & Zone Picking',
          description: 'Consolidated customer orders into wave pick routes, reducing picker travel distances by 45% and ensuring zero mispicks.'
        },
        {
          title: 'Touchless Goods Receipt (GRPO)',
          description: 'Incoming supplier Advance Shipping Notices (ASNs) are scanned directly at the dock, auto-generating verified GRPO documents in SAP B1.'
        },
        {
          title: '3PL Multi-Client Billing Rules',
          description: 'Automated calculation of daily storage, pallet handling, and value-added packaging fees with direct billing in SAP Business One.'
        }
      ]
    },
    keyFeatures: [
      'Mobile RF barcode scanning with real-time GS1-128 and 2D Datamatrix validation',
      'Strict FEFO/FIFO rule enforcement preventing dispatch of aging batches',
      'Instant container license plate number (LPN) tracking from receiving dock to dispatch bay',
      'Automated packing slips, shipping marks, and carrier dispatch manifests',
      'Live warehouse supervisor dashboard showing hourly pick rates and dock turnaround'
    ],
    verifiedOutcomes: [
      { metric: '99.9%', label: 'Picking Accuracy', detail: 'Barcode audio-visual verification eliminated wrong-SKU dispatches entirely.' },
      { metric: '3×', label: 'Faster Receiving', detail: 'Container unloading and staging time dropped from 3.5 hours to under 60 minutes.' },
      { metric: '45%', label: 'Less Picker Travel', detail: 'Optimized wave pick algorithms reduced redundant walking between aisles.' },
      { metric: '400%', label: '9-Month Payback ROI', detail: 'Significant reduction in stock write-offs and overtime labor costs.' }
    ],
    verificationNote:
      'Verified customer operational metrics documented in ATPL technical project sign-off (2024). Operational details audited under NDA.',
    clientQuote: {
      quote:
        'Produmex WMS and ATLAS Technosoft doubled our warehouse fulfillment speed and brought inventory accuracy to 99.9%. Our clients now enjoy real-time stock transparency.',
      author: 'Managing Director',
      role: 'Third-Party Logistics Provider'
    },
    relatedSolutions: [
      { title: 'Boyum IT Solutions Hub', description: 'Beas Manufacturing, Produmex WMS, and B1UP productivity add-ons.', route: '/services/boyum-it', tag: 'Add-on Suite' },
      { title: 'Warehouse & Logistics Industry', description: 'End-to-end supply chain architecture and barcode traceability.', route: '/industries/warehouse-logistics', tag: 'Industry' },
      { title: 'ATLAS Gate Entry Weighbridge', description: 'Computer-vision truck gate pass and automated gross weight capture.', route: '/services/atlas-addons', tag: 'Add-on' }
    ]
  },

  'trading-operations': {
    slug: 'trading-operations',
    category: 'Trading & Distribution',
    categoryIcon: 'truck',
    title: 'Unified System for',
    titleHighlight: 'Trading Operations & Global Freight',
    tagline: 'End-to-End Procurement, Multi-Currency Order-to-Cash, and Shipping Automation',
    introduction:
      'An international chemical and commodity trading enterprise operating across five global trade corridors modernized its commercial and shipping operations with SAP Business One and ATLAS Proprietary Freight Suite, slashing export documentation time by 85% and eliminating trade processing errors.',
    heroImage: '/images/case_studies/cs_trading.jpg',
    heroImageAlt: 'International Commercial Trading and Maritime Container Operations',
    secondaryImage: '/images/crystal_hd/ind_shipping.jpg',
    secondaryImageAlt: 'Container Ship Docked at Port Container Terminal',
    clientProfile: {
      industry: 'Chemical & Industrial Commodity Trading',
      deploymentTime: '65 Days Implementation',
      companyScale: 'Multi-Branch • 12 Global Currencies',
      geography: 'India, UAE & Southeast Asia'
    },
    techStack: [
      { name: 'SAP Business One', role: 'Multi-Currency General Ledger & Stock Engine', tag: 'Core ERP' },
      { name: 'ATLAS Freight Module', role: 'Multi-Modal Landed Cost & Customs Valuation', tag: 'Proprietary' },
      { name: 'ATLAS Shipping Suite', role: 'Automated HBL/MBL & Customs Documentation', tag: 'Specialized' },
      { name: 'UiPath Dispatch Bots', role: 'Automated Carrier Tracking & Email Ingestion', tag: 'Hyperautomation' }
    ],
    businessChallenges: [
      {
        title: 'Fragmented Multi-Currency Trade Tracking',
        description: 'Managing sales in USD, EUR, and AED against INR purchasing created currency mismatch errors and blind spots in realized trade margins.',
        icon: 'Coins'
      },
      {
        title: 'Manual Export Shipping Documentation',
        description: 'Export coordinators spent over 2 hours per consignment re-typing Commercial Invoices, Packing Lists, and Bills of Lading in Word and Excel.',
        icon: 'FileText'
      },
      {
        title: 'Landed Cost Misallocations',
        description: 'Ocean freight, marine insurance, and port demurrage costs were estimated manually, leading to post-sale margin leakages.',
        icon: 'Scale'
      }
    ],
    solutionImplementation: {
      heading: 'Integrated Trading, Landed Costing & Automated Shipping Infrastructure',
      description:
        'ATLAS Technosoft deployed SAP Business One unified with the ATLAS Freight & Trading add-on suite. The solution seamlessly synchronizes multi-currency sales orders, dynamic exchange rate updates, automated landed cost apportionments, and one-click shipping documentation.',
      pillars: [
        {
          title: 'Automated Shipping Document Generation',
          description: 'Single-click generation of compliant Commercial Invoices, multi-carton Packing Lists, and House/Master Bills of Lading (HBL/MBL).'
        },
        {
          title: 'Granular Multi-Modal Landed Costing',
          description: 'Accurate apportionment of ocean freight, customs duty, port handling, and demurrage by gross weight or CIF value.'
        },
        {
          title: 'Real-Time Container Milestone Tracking',
          description: 'Carrier API integration providing automated ETA alerts, port arrival notices, and demurrage risk warnings.'
        },
        {
          title: 'Letter of Credit (LC) Governance',
          description: 'Integrated LC checklists and tolerance validation preventing bank document rejections and discrepancy fees.'
        }
      ]
    },
    keyFeatures: [
      'Multi-currency transaction posting with automated Forex revaluation entries',
      'One-click export documentation compilation saving 85% administrative overhead',
      'Real-time inventory reservation matching incoming shipments before port arrival',
      'Automated customer portal for invoice retrieval and container transit tracking',
      'Statutory compliance with Indian export-import regulations, GST, and e-invoicing'
    ],
    verifiedOutcomes: [
      { metric: '85%', label: 'Documentation Time Saved', detail: 'Export documentation turnaround reduced from 2.5 hours to 15 minutes.' },
      { metric: '90%', label: 'Error Reduction', detail: 'Automated landed cost calculation eliminated post-sale trade margin erosion.' },
      { metric: '100%', label: 'Shipment Visibility', detail: 'Real-time vessel and container tracking accessible by customers online.' },
      { metric: '2×', label: 'Faster Order Turnaround', detail: 'Pre-allocation of in-transit inventory accelerated delivery to buyers.' }
    ],
    verificationNote:
      'Verified performance outcomes based on audited transaction volume (2024). Client corporate details anonymized under NDA.',
    clientQuote: {
      quote:
        'ATLAS Technosoft transformed our trading and shipping workflow. We now generate compliant export documentation in minutes and know our exact landed cost on every shipment.',
      author: 'Director of Trade Operations',
      role: 'Global Commodity Trading Corporation'
    },
    relatedSolutions: [
      { title: 'Trading & Shipping Industry', description: 'Deep-dive trading workflows, freight modules, and export compliance.', route: '/industries/trading-shipping', tag: 'Industry' },
      { title: 'ATLAS Proprietary Add-Ons', description: 'Custom freight, gate entry weighbridge, and vendor collaboration.', route: '/services/atlas-addons', tag: 'Add-ons' },
      { title: 'SAP Business One ERP', description: 'Core multi-currency ledger and international trading backbone.', route: '/services/sap-business-one', tag: 'Core ERP' }
    ]
  },

  'inventory-visibility': {
    slug: 'inventory-visibility',
    category: 'Retail & Wholesale',
    categoryIcon: 'shopping-cart',
    title: 'Improved Inventory Visibility',
    titleHighlight: 'Across Multi-Channel Operations',
    tagline: 'Synchronize Multi-Branch Stock, Streamline Reordering, and Eliminate Out-of-Stock Surprises',
    introduction:
      'A multi-branch retail and wholesale distributor with 18 locations eliminated stockouts and inventory imbalances by implementing centralized SAP Business One and B1 Usability Package (B1UP) with automated inter-branch replenishments.',
    heroImage: '/images/case_studies/cs_retail.jpg',
    heroImageAlt: 'Modern Retail Store and Wholesale Distribution Warehouse Inventory',
    secondaryImage: '/images/solutions/solutions_b1up_interface.jpg',
    secondaryImageAlt: 'B1UP Centralized Inventory Dashboard and Workflow Rules',
    clientProfile: {
      industry: 'Omnichannel Retail & Wholesale Distribution',
      deploymentTime: '60 Days Implementation',
      companyScale: '18 Retail Outlets • 2 Central Fulfillment Hubs',
      geography: 'Maharashtra & Gujarat Commercial Hubs'
    },
    techStack: [
      { name: 'SAP Business One', role: 'Centralized Multi-Location Stock Engine', tag: 'Core ERP' },
      { name: 'B1 Usability Package (B1UP)', role: 'Screen Customizations & Automated Reorder Alerts', tag: 'Usability' },
      { name: 'B1 Print & Delivery', role: 'Automated Branch Dispatch Documentation', tag: 'Productivity' },
      { name: 'Mobile POS Connector', role: 'Real-Time Point-of-Sale Integration', tag: 'Retail' }
    ],
    businessChallenges: [
      {
        title: 'Disconnected Store Silos',
        description: 'Retail stores and wholesale warehouses operated on isolated standalone POS databases, causing blind spots in regional stock availability.',
        icon: 'Layers'
      },
      {
        title: 'Frequent Stockouts on Fast-Movers',
        description: 'Popular retail items went out of stock while duplicate surplus sat unmoved in central warehouses due to lack of automated reorder signals.',
        icon: 'Clock'
      },
      {
        title: 'Manual Inter-Branch Stock Transfers',
        description: 'Branch managers coordinated stock transfers through phone calls and spreadsheets, leading to lost transit inventory and mismatched ledgers.',
        icon: 'Truck'
      }
    ],
    solutionImplementation: {
      heading: 'Centralized Multi-Store Architecture with Automated Replenishment Rules',
      description:
        'ATLAS Technosoft unified all 18 store locations and both central distribution centers onto a single centralized SAP Business One database. Using B1UP, automated reordering workflows and custom stock balance dashboards were configured for store managers.',
      pillars: [
        {
          title: 'Single Centralized Inventory Database',
          description: 'Every point-of-sale terminal syncs stock deductions in real time, giving head office immediate visibility across all stores.'
        },
        {
          title: 'Automated 7-Day Stockout Alerts',
          description: 'Predictive algorithms monitor sales velocity and alert warehouse procurement 7 days before projected stock depletion.'
        },
        {
          title: 'One-Click Inter-Branch Transfers',
          description: 'Store managers request stock transfers directly through customized SAP B1 screens with instant transit tracking.'
        },
        {
          title: 'Consolidated Purchasing & Bulk Discounts',
          description: 'Aggregated purchasing across all 18 outlets empowered procurement to negotiate 12% better supplier volume discounts.'
        }
      ]
    },
    keyFeatures: [
      'Real-time multi-branch stock balance synchronization across stores and warehouses',
      'Automated reorder triggers preventing stockouts during seasonal sales rushes',
      'Barcode-driven receiving and stock auditing reducing store inventory count time by 60%',
      'Dynamic customer pricing tiers and loyalty discount enforcement at point-of-sale',
      'Consolidated P&L and gross margin reporting by branch, category, and SKU'
    ],
    verifiedOutcomes: [
      { metric: '100%', label: 'Real-Time Visibility', detail: 'Store managers and head office view synchronized stock counts continuously.' },
      { metric: '40%', label: 'Fewer Stockouts', detail: 'Automated replenishment alerts ensured high-velocity SKUs remain in stock.' },
      { metric: '60%', label: 'Faster Store Audits', detail: 'Barcode scanner audits replaced weekend manual clipboards.' },
      { metric: '12%', label: 'Purchasing Cost Savings', detail: 'Bulk order aggregation across all retail outlets reduced vendor unit costs.' }
    ],
    verificationNote:
      'Client engagement KPIs documented during post-implementation operational review (2024). Company identity protected under NDA.',
    clientQuote: {
      quote:
        'Before ATLAS Technosoft, we constantly ran out of fast-moving products while surplus sat across town. SAP B1 and B1UP unified our 18 stores into one synchronized engine.',
      author: 'Head of Retail Operations',
      role: 'Fashion & Consumer Goods Distributor'
    },
    relatedSolutions: [
      { title: 'SAP Business One ERP', description: 'Central enterprise ledger, inventory, and sales order fulfillment.', route: '/services/sap-business-one', tag: 'Core ERP' },
      { title: 'Warehouse & Logistics Solutions', description: 'Produmex WMS for centralized distribution center operations.', route: '/industries/warehouse-logistics', tag: 'Supply Chain' },
      { title: 'Finance & Administration', description: 'Multi-branch cash reconciliation and automated GST compliance.', route: '/industries/finance-administration', tag: 'Finance' }
    ]
  },

  'business-process-automation': {
    slug: 'business-process-automation',
    category: 'Automation & RPA',
    categoryIcon: 'cpu',
    title: 'Automating Manual Business Processes',
    titleHighlight: 'with UiPath RPA & Intelligent AI',
    tagline: '70% Reduction in Manual Data Entry and 1,000+ Daily Touchless Vendor Invoices',
    introduction:
      'A leading pharmaceutical and industrial manufacturing enterprise liberated high-value employees and accelerated accounts payable by deploying unattended UiPath software robots and AI Document Understanding integrated directly into SAP Business One.',
    heroImage: '/images/case_studies/cs_automation.jpg',
    heroImageAlt: 'UiPath Robotic Process Automation and Artificial Intelligence Digital Workers',
    secondaryImage: '/images/partners/partners_uipath_ai.jpg',
    secondaryImageAlt: 'AI Document Understanding and Invoice Parsing Machine Learning',
    clientProfile: {
      industry: 'Pharmaceutical & Industrial Manufacturing',
      deploymentTime: '45 Days Bot Deployment',
      companyScale: 'Over 1,200 Vendors • 25,000+ Invoices/Month',
      geography: 'Pan-India Operations'
    },
    techStack: [
      { name: 'UiPath Studio & Orchestrator', role: 'Unattended Software Robot Fleet Management', tag: 'RPA Core' },
      { name: 'UiPath Document Understanding', role: 'AI OCR Machine Learning for Invoices & POs', tag: 'AI/ML' },
      { name: 'SAP Business One DI API', role: 'Secure Direct Transaction Posting', tag: 'Core ERP' },
      { name: 'Automated 3-Way Matching Bot', role: 'PO, GRPO & Invoice Cross-Verification', tag: 'Automation' }
    ],
    businessChallenges: [
      {
        title: 'Overwhelming Manual Invoice Volume',
        description: 'Finance staff spent over 30 hours per week manually typing PDF vendor bills and receipts into SAP Business One.',
        icon: 'Receipt'
      },
      {
        title: 'High Error Rate & Delayed Payments',
        description: 'Keying typos, wrong GSTIN entries, and delayed 3-way reconciliations caused late payment disputes with crucial suppliers.',
        icon: 'Clock'
      },
      {
        title: 'Slow Month-End Financial Close',
        description: 'Backlogs in vendor invoice vouchers postponed monthly ledger reconciliation and EBITDA reporting by over two weeks.',
        icon: 'BarChart3'
      }
    ],
    solutionImplementation: {
      heading: 'End-to-End Touchless Accounts Payable Pipeline Powered by UiPath AI',
      description:
        'ATLAS Technosoft engineered an unattended UiPath software bot running on UiPath Orchestrator. The digital worker monitors incoming finance email inboxes, processes invoices through AI Document Understanding, executes automated 3-way PO matching, and posts vouchers in SAP B1.',
      pillars: [
        {
          title: 'Automated Email Ingestion & OCR Extraction',
          description: 'The bot checks incoming emails 24/7, extracts PDF attachments, and parses vendor headers, line items, and GST numbers with 99.8% accuracy.'
        },
        {
          title: 'Automated 3-Way PO Matching',
          description: 'Verifies invoice line items against open Purchase Orders and Goods Receipt PO (GRPO) balances in SAP B1 with zero human touch.'
        },
        {
          title: 'Instant SAP B1 Voucher Creation',
          description: 'Matched invoices are posted directly into SAP B1 ledger. Discrepancies outside configurable tolerance are flagged to human managers.'
        },
        {
          title: 'Automated Vendor Statement Reconciliation',
          description: 'At month-end, bots pull vendor account statements and compare ledger balances, generating color-coded variance reports.'
        }
      ]
    },
    keyFeatures: [
      'Unattended software robots operating 24/7/365 with zero downtime or typing errors',
      'AI Document Understanding pre-trained on diverse Indian GST invoice layouts',
      'Automated 3-way matching of PO, Goods Receipt (GRPO), and Vendor AP Invoice',
      'Automated confirmation email dispatch to vendors upon successful voucher posting',
      'Enterprise audit log tracking every bot action with timestamps and document links'
    ],
    verifiedOutcomes: [
      { metric: '70%', label: 'Manual Work Eliminated', detail: 'Accounts payable team shifted from data entry to vendor negotiation.' },
      { metric: '1,000+', label: 'Daily Touchless Invoices', detail: 'Posted into SAP Business One with 98% first-pass accuracy.' },
      { metric: '4–6 Mo', label: 'Investment Payback', detail: 'Full ROI achieved within months through recovered labor and zero late penalties.' },
      { metric: '48 Hrs', label: 'Vendor Turnaround', detail: 'Invoices approved and scheduled for payment in 48 hours instead of 10 days.' }
    ],
    verificationNote:
      'Engagement metrics verified through client ERP telemetry audit (2024). Client corporate name protected under NDA.',
    clientQuote: {
      quote:
        'Our finance team was drowning in vendor invoices. ATLAS Technosoft deployed UiPath bots that now process over 1,000 invoices daily without human intervention.',
      author: 'Chief Financial Officer',
      role: 'Pharmaceutical Manufacturing Group'
    },
    relatedSolutions: [
      { title: 'UiPath RPA & AI Automation', description: 'Attended/unattended bots, Process Mining, and Document Understanding.', route: '/services/uipath-automation', tag: 'Core Service' },
      { title: 'Finance & Administration', description: 'Intelligent ERP cash-flow forecasting and DSO reduction.', route: '/industries/finance-administration', tag: 'Industry' },
      { title: 'SAP Business One ERP', description: 'The foundation for hyperautomation and real-time enterprise visibility.', route: '/services/sap-business-one', tag: 'Core ERP' }
    ]
  }
};
