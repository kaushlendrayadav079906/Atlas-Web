import { FaqItem, FaqCategory } from '../types/resources';

export const FAQ_CATEGORIES: FaqCategory[] = [
  'SAP Business One',
  'Implementation & Migration',
  'Boyum IT',
  'UiPath RPA & AI',
  'Support & Maintenance',
  'Consultation & Contact'
];

export const FAQS_DATA: FaqItem[] = [
  // 1. SAP Business One
  {
    id: 'sap-b1-overview',
    category: 'SAP Business One',
    question: 'What is SAP Business One, and who is it designed for?',
    answer: 'SAP Business One is an integrated Enterprise Resource Planning (ERP) platform engineered specifically for small-to-midsize enterprises (SMEs) typically ranging from 10 to 500+ employees. Unlike fragmented accounting software, it unifies financials, sales CRM, purchasing, inventory management, production (MRP), and reporting into a single centralized database.',
    tags: ['Overview', 'SME', 'ERP'],
    relatedLink: {
      text: 'Explore SAP Business One Services',
      href: '/services/sap-business-one'
    }
  },
  {
    id: 'sap-b1-vs-s4hana',
    category: 'SAP Business One',
    question: 'How does SAP Business One differ from SAP S/4HANA?',
    answer: 'SAP Business One is designed specifically for mid-market businesses seeking complete ERP capabilities with rapid deployment timelines (typically 45–90 days) and manageable total cost of ownership. SAP S/4HANA is designed for large multinational conglomerates with complex custom supply chains and thousands of simultaneous users. Both provide enterprise-grade reliability, but SAP Business One gives growing businesses the right balance of agility and control.',
    tags: ['Comparison', 'Architecture'],
    relatedLink: {
      text: 'Review SAP Architectural Guides',
      href: '/resources/sap-guides'
    }
  },
  {
    id: 'sap-b1-cloud-vs-onprem',
    category: 'SAP Business One',
    question: 'Can SAP Business One be deployed on the cloud or only on-premise?',
    answer: 'SAP Business One supports both deployment models. You can deploy on-premise on your dedicated physical servers, or in a secure private cloud (AWS, Microsoft Azure, Google Cloud, or dedicated hosting). Users access the identical rich desktop client or the modern web browser interface (Web Client) from any location.',
    tags: ['Cloud', 'Hosting', 'Deployment']
  },
  {
    id: 'sap-b1-statutory-gst',
    category: 'SAP Business One',
    question: 'Does SAP Business One support Indian statutory tax compliance (GST, TDS, e-Invoicing)?',
    answer: 'Yes. SAP Business One natively provides comprehensive Indian statutory compliance, including automated CGST, SGST, IGST calculations, e-Invoicing with direct government portal integration, signed QR codes on invoices, automated e-Way bill generation, and TDS/TCS deduction tracking.',
    tags: ['GST', 'Compliance', 'Taxation'],
    relatedLink: {
      text: 'Read Finance & Tax Architecture Guide',
      href: '/resources/sap-guides'
    }
  },

  // 2. Implementation & Migration
  {
    id: 'implementation-timeline',
    category: 'Implementation & Migration',
    question: 'How long does a typical SAP Business One implementation take?',
    answer: 'A standard ATLAS implementation for a mid-sized organization typically spans 45 to 90 days, depending on company size, number of locations, data complexity, and customization requirements. Our structured 5-phase methodology ensures clear milestones from initial blueprint to Go-Live cutover.',
    tags: ['Timeline', 'Roadmap', 'Methodology'],
    relatedLink: {
      text: 'View Implementation Methodology',
      href: '/resources/sap-guides'
    }
  },
  {
    id: 'legacy-data-migration',
    category: 'Implementation & Migration',
    question: 'How is data migrated from legacy software like Tally, Excel, or custom systems?',
    answer: 'ATLAS uses standardized SAP Data Transfer Workbench (DTW) templates. We guide your team through master data extraction, deduplication, and cleansing for Customers, Vendors, Chart of Accounts, and Item Masters. Opening balances and open transactions are audited and imported during cutover with zero disruption to daily business.',
    tags: ['Migration', 'Data Cleansing', 'Tally']
  },
  {
    id: 'sql-to-hana-migration',
    category: 'Implementation & Migration',
    question: 'Can an existing SAP Business One system on Microsoft SQL Server be upgraded to SAP HANA?',
    answer: 'Yes. ATLAS specializes in database migrations from MS SQL Server to SAP HANA In-Memory. We conduct compatibility audits of your queries, crystal reports, and add-ons, rewrite incompatible scripts to HANA SQLScript, and execute weekend cutovers to ensure Monday morning operations run without interruption.',
    tags: ['HANA', 'Database', 'Upgrade'],
    relatedLink: {
      text: 'Read SQL to HANA Migration Guide',
      href: '/resources/sap-guides'
    }
  },
  {
    id: 'staff-training-uat',
    category: 'Implementation & Migration',
    question: 'What training and change management does ATLAS provide during rollout?',
    answer: 'We provide role-based, hands-on user training tailored to each department (Accounting, Procurement, Sales, Warehouse, Production). Training occurs in a dedicated sandbox environment using your actual operational data. Users receive reference standard operating procedures (SOPs) and undergo supervised User Acceptance Testing (UAT) before production sign-off.',
    tags: ['Training', 'UAT', 'Change Management']
  },

  // 3. Boyum IT
  {
    id: 'boyum-overview',
    category: 'Boyum IT',
    question: 'What is Boyum IT and what solutions does it provide for SAP Business One?',
    answer: 'Boyum IT is the leading global software solution provider for SAP Business One. As a certified Boyum IT Silver Partner, ATLAS implements three core Boyum platforms: Beas Manufacturing (for advanced production and MRP II), Produmex WMS (for multi-bin warehouse logistics and barcode RF scanning), and B1 Usability Package / B1UP (for screen customization and workflow automation).',
    tags: ['Boyum IT', 'Manufacturing', 'WMS'],
    relatedLink: {
      text: 'Explore Boyum IT Solutions',
      href: '/services/boyum-it'
    }
  },
  {
    id: 'beas-manufacturing-benefits',
    category: 'Boyum IT',
    question: 'Why choose Beas Manufacturing over standard SAP Business One production?',
    answer: 'Standard SAP Business One handles basic assembly and simple production orders. Beas Manufacturing is built for complex discrete and process manufacturing requiring multi-level bill of materials (BOM), finite capacity Advanced Planning & Scheduling (APS), scrap tracking, machine terminal data capture, tool management, and rigorous quality control (QC).',
    tags: ['Beas', 'Production', 'APS'],
    relatedLink: {
      text: 'Read Manufacturing Industry Insights',
      href: '/resources/industry-insights'
    }
  },
  {
    id: 'produmex-wms-capabilities',
    category: 'Boyum IT',
    question: 'What benefits does Produmex WMS bring to warehouse operations?',
    answer: 'Produmex WMS turns manual warehouses into barcode-directed fulfillment centers. Using handheld Android RF scanners, operators perform directed putaway, guided wave/zone picking, batch and serial verification, cycle counting, and packing with automated shipping label and e-way bill generation, achieving 99%+ inventory record accuracy.',
    tags: ['Produmex', 'WMS', 'Barcoding'],
    relatedLink: {
      text: 'Read Warehouse Management Insights',
      href: '/resources/industry-insights'
    }
  },
  {
    id: 'add-boyum-to-existing-sap',
    category: 'Boyum IT',
    question: 'Can Boyum modules be integrated into our existing SAP Business One system?',
    answer: 'Yes. Boyum modules are built natively for SAP Business One and can be added to existing live deployments without reimplementing the core ERP database. ATLAS performs a readiness assessment, configures the modules, and trains your operators.',
    tags: ['Add-ons', 'Integration']
  },

  // 4. UiPath RPA & AI
  {
    id: 'uipath-rpa-overview',
    category: 'UiPath RPA & AI',
    question: 'How does UiPath RPA and AI integrate with SAP Business One?',
    answer: 'As an accredited UiPath Silver Partner, ATLAS builds intelligent software robots that interface directly with SAP Business One via Service Layer REST APIs and desktop UI automation. Software robots execute repetitive transactional tasks 24/7 without human intervention, logging all steps in an audit trail.',
    tags: ['UiPath', 'RPA', 'Automation'],
    relatedLink: {
      text: 'Explore UiPath RPA Services',
      href: '/services/uipath-rpa'
    }
  },
  {
    id: 'best-processes-for-rpa',
    category: 'UiPath RPA & AI',
    question: 'Which enterprise business processes are best suited for RPA bots?',
    answer: 'Processes with high transactional volume and structured data are ideal: Accounts Payable (AP) invoice entry, Goods Receipt PO (GRPO) creation from vendor packing slips, automated bank statement reconciliation, GST portal invoice matching, customer order processing from PDF emails, and e-way bill generation.',
    tags: ['Use Cases', 'Invoice Automation', 'AP']
  },
  {
    id: 'attended-vs-unattended-bots',
    category: 'UiPath RPA & AI',
    question: 'What is the difference between Attended and Unattended software robots?',
    answer: 'Attended robots work alongside employees on desktop workstations, triggered by user actions to assist with specific data lookup or validation tasks. Unattended robots operate autonomously on secure back-end servers, running continuously or on scheduled triggers to process high-volume background batches without user supervision.',
    tags: ['Attended', 'Unattended', 'Bot Architecture']
  },
  {
    id: 'rpa-error-handling',
    category: 'UiPath RPA & AI',
    question: 'What happens if a bot encounters an unexpected exception or invalid document?',
    answer: 'UiPath robots include rigorous business rule exception handling. If a document has illegible data or a vendor is not registered in SAP, the bot flags the record into an exception queue, sends an email notification to the designated manager with the exact issue, and proceeds to process the next transaction.',
    tags: ['Exception Handling', 'Governance']
  },

  // 5. Support & Maintenance
  {
    id: 'ams-support-scope',
    category: 'Support & Maintenance',
    question: 'What services are included in ATLAS Application Management Services (AMS)?',
    answer: 'ATLAS AMS provides comprehensive post-go-live care, including 24/7 technical helpdesk support, functional consulting, database performance optimization, patch and hotfix deployments, statutory tax updates (e.g. new GST rules), custom query creation, and proactive system health monitoring.',
    tags: ['AMS', 'Support', 'Maintenance'],
    relatedLink: {
      text: 'Contact Our Support Helpdesk',
      href: '/contact'
    }
  },
  {
    id: 'sla-response-times',
    category: 'Support & Maintenance',
    question: 'What are your standard SLA response times for system incidents?',
    answer: 'Our SLA agreements define priority tiers: Critical production outage issues receive immediate response within 1 hour; high-priority operational bottlenecks within 4 hours; and standard user guidance inquiries within 1 business day. We maintain a verified 99.9% production uptime commitment.',
    tags: ['SLA', 'Uptime', 'Helpdesk']
  },
  {
    id: 'dedicated-account-manager',
    category: 'Support & Maintenance',
    question: 'Do we get a dedicated consultant or contact person for ongoing support?',
    answer: 'Yes. Every AMS client is assigned a dedicated Account Manager and a primary functional lead familiar with your specific business processes and custom database schemas, eliminating the frustration of explaining your workflow to unfamiliar technicians.',
    tags: ['Account Manager', 'Dedicated Team']
  },

  // 6. Consultation & Contact
  {
    id: 'how-to-book-consultation',
    category: 'Consultation & Contact',
    question: 'How can I schedule a strategic consultation with ATLAS solutions architects?',
    answer: 'You can book a consultation directly through the "Book a Consultation" button on any page, submit an inquiry on our Contact page, or message our official WhatsApp business desk at +91 93723 29599. Our team will review your requirements and respond within one business day.',
    tags: ['Consultation', 'Discovery', 'Booking'],
    relatedLink: {
      text: 'Go to Contact Page',
      href: '/contact'
    }
  },
  {
    id: 'what-happens-in-discovery',
    category: 'Consultation & Contact',
    question: 'What happens during the initial 45-minute discovery consultation?',
    answer: 'Our certified SAP Business One and automation architects review your existing software landscape, departmental bottlenecks, transaction volume, and operational goals. We provide high-level architecture recommendations, module scoping, and practical next steps tailored to your industry.',
    tags: ['Discovery', 'Scoping', 'Consultation']
  },
  {
    id: 'mumbai-office-locations',
    category: 'Consultation & Contact',
    question: 'Where are ATLAS Technosoft offices located?',
    answer: 'ATLAS Technosoft operates dual offices in Mumbai: our primary Delivery & Technology Center in Borivali West (Mumbai 400092), and our Corporate Liaison Office in Marine Lines (Mumbai 400020). We serve enterprise clients across India and global markets.',
    tags: ['Offices', 'Mumbai', 'Locations'],
    relatedLink: {
      text: 'View Office Addresses & Maps',
      href: '/contact'
    }
  }
];

