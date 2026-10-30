import {
  PartnerStatement,
  MetricItem,
  SolutionItem,
  IndustryItem,
  ProcessStepItem,
  TestimonialItem,
  CaseStudyItem
} from '../types';

export const BRAND_INFO = {
  name: "ATLAS Technosoft Pvt. Ltd.",
  shortName: "ATLAS Technosoft",
  tagline: "Where SAP Business One Meets Intelligent Automation",
  subTagline: "Mumbai’s Trusted SAP Business One, Boyum IT & UiPath Partner for High-Growth SMEs",
  promise: "Run SAP Smarter. Faster. With Zero Manual Touch.",
  contact: {
    email: "sales@atlastechnosoft.com",
    phone: "+91-9372329599",
    phoneDisplay: "+91-9372329599 (WhatsApp Enabled)",
    whatsappLink: "https://wa.me/919372329599?text=Hello%20ATLAS%20Technosoft%2C%20I%20would%20like%20to%20book%20a%20consultation.",
    locations: [
      {
        city: "Mumbai, India",
        area: "Borivali Office",
        address: "Borivali West, Mumbai, Maharashtra 400092"
      },
      {
        city: "Mumbai, India",
        area: "Marine Lines Office",
        address: "Marine Lines, Mumbai, Maharashtra 400020"
      }
    ],
    website: "www.atlastechnosoft.com"
  }
};

export const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/#services' },
  { name: 'Solutions', href: '/solutions' },
  { name: 'Industries', href: '/industries' },
  { name: 'Case Studies', href: '/case-studies' },
  { name: 'Partners', href: '/#partners' },
  { name: 'Contact', href: '/#contact' },
];

export const PARTNER_STATEMENTS: PartnerStatement[] = [
  {
    badge: "Official SAP Ecosystem",
    name: "Authorized SAP Channel Partner",
    level: "Channel Partner",
    description: "Certified deployment and optimization partner with 80+ successful SAP Business One implementations across India & global markets. Subject to formal partner agreement verification."
  },
  {
    badge: "Boyum IT Partner",
    name: "Boyum IT Silver Partner",
    level: "Silver Partner",
    description: "Certified specialists in Beas Manufacturing (APS, MRP, Shop Floor), Produmex WMS, and B1UP usability extensions. Subject to tier certification renewal verification."
  },
  {
    badge: "UiPath Automation",
    name: "UiPath Silver Partner",
    level: "Silver Partner",
    description: "Accredited hyperautomation specialists implementing robotic process automation and AI Document Understanding. Subject to annual tier audit verification."
  }
];

export const TRUST_METRICS: MetricItem[] = [
  {
    id: "clients",
    value: "80+",
    label: "Clients Worldwide",
    detail: "SAP Business One live deployments across discrete manufacturing, pharma, logistics & trading",
    requiresVerification: true,
    sourceNote: "Source: ATPL WEB Site_Content.pdf (Client references subject to formal verification before production publication)"
  },
  {
    id: "retention",
    value: "98.7%",
    label: "Customer Retention",
    detail: "Long-term relationships through continuous ERP optimization and dedicated SLA support",
    requiresVerification: true,
    sourceNote: "Source: ATPL WEB Site_Content.pdf (Historical retention figure subject to contract verification)"
  },
  {
    id: "transactions",
    value: "1.2M+",
    label: "Transactions Automated / Year",
    detail: "Touchless automated execution across invoices, GRPOs, vendor reconciliations, and warehouse scans",
    requiresVerification: true,
    sourceNote: "Source: ATPL WEB Site_Content.pdf (Aggregated transaction count subject to client telemetry logs)"
  },
  {
    id: "consultants",
    value: "32",
    label: "Certified Consultants",
    detail: "Technical and functional experts certified in SAP HANA, Beas Manufacturing, Produmex WMS, and UiPath RPA",
    requiresVerification: true,
    sourceNote: "Source: ATPL WEB Site_Content.pdf (Internal certification roster audit pending)"
  }
];

export interface CoreServiceItem {
  id: string;
  title: string;
  category: string;
  iconName: string;
  summary: string;
  keyDeliverables: string[];
  businessImpact: string;
  ctaText: string;
  ctaTarget: string;
}

export const CORE_SERVICES: CoreServiceItem[] = [
  {
    id: "sap-b1-impl",
    title: "SAP Business One Implementation & Optimization",
    category: "Enterprise ERP Core",
    iconName: "Database",
    summary: "Deploy SAP Business One the right way — fast, scalable, and future-ready. Tailored for small and mid-sized enterprises across Cloud & On-Premise architectures.",
    keyDeliverables: [
      "Full-cycle Cloud & On-Premise implementations",
      "SAP B1 HANA migrations, SQL upgrades & performance tuning",
      "Multi-company, multi-currency & global template design (10+ countries)"
    ],
    businessImpact: "40% faster month-end financial close | Real-time CXO executive dashboards",
    ctaText: "Start Your SAP B1 Project",
    ctaTarget: "#contact"
  },
  {
    id: "boyum-solutions",
    title: "Boyum IT Solutions",
    category: "Manufacturing & WMS",
    iconName: "Layers",
    summary: "Unlock the full extended power of SAP Business One with certified Boyum IT modules engineered for shop-floor excellence and zero-touch warehousing.",
    keyDeliverables: [
      "Beas Manufacturing: Advanced Planning & Scheduling (APS), MRP, Shop Floor data capture",
      "Produmex WMS: High-speed barcode scanning, RF terminal processing, 3PL billing",
      "B1 Usability Package (B1UP): 300+ custom UI screens, validation rules & approval automations"
    ],
    businessImpact: "35% manufacturing efficiency gain | 99.9% inventory picking accuracy",
    ctaText: "Explore Boyum Solutions",
    ctaTarget: "#contact"
  },
  {
    id: "uipath-automation",
    title: "UiPath RPA & AI Automation",
    category: "Hyperautomation",
    iconName: "Cpu",
    summary: "Move beyond standard ERP into intelligent hyperautomation. Eliminate repetitive manual keying with autonomous digital workers and AI Document Understanding.",
    keyDeliverables: [
      "Attended & unattended bots for Invoice, GRPO, AP/AR touchless posting",
      "UiPath Document Understanding: AI OCR parsing across POs, bills of lading & statements",
      "Process & Task Mining workshops to identify and prioritize high-ROI automation workflows"
    ],
    businessImpact: "70% reduction in manual data entry | Measurable ROI achieved in 4–6 months",
    ctaText: "Book an RPA Demo",
    ctaTarget: "#contact"
  },
  {
    id: "atlas-addons",
    title: "ATLAS Proprietary Add-ons",
    category: "Specialized Add-On Suite",
    iconName: "BrainCircuit",
    summary: "Built directly on SAP Business One. Proven across challenging industry environments and deployed in weeks to solve critical operational gaps.",
    keyDeliverables: [
      "Freight & Trading Module: Automated HBL/MBL generation & multi-currency landed cost",
      "Gate Entry & Weighment: Computer vision vehicle recognition & auto weighbridge sync",
      "ATLAS AI-Ready Suite: Intelligent Document Distributor & Predictive Stock Alert Bots"
    ],
    businessImpact: "90% error reduction in shipping | Zero-touch gate clearance & stock alerts",
    ctaText: "Deploy ATLAS Add-Ons",
    ctaTarget: "#contact"
  }
];

export const SOLUTIONS_DATA: SolutionItem[] = [
  {
    id: "sap-b1",
    title: "SAP Business One Implementation & Optimization",
    tagline: "Deploy SAP Business One the right way — fast, scalable, and future-ready.",
    iconName: "Database",
    description: "Full lifecycle enterprise deployment engineered for high-growth manufacturers, traders, and logistics companies.",
    capabilities: [
      "Cloud & On-Premise implementations tailored to SME workflows",
      "SAP B1 HANA migrations, version upgrades, and performance tuning",
      "Multi-company, multi-currency, and global template rollouts (10+ countries)"
    ],
    businessImpact: "40% faster financial close | Real-time dashboards for CXOs",
    ctaText: "Start Your SAP B1 Project",
    ctaTarget: "#contact",
    highlight: true
  },
  {
    id: "boyum-it",
    title: "Boyum IT Add-Ons – Manufacturing & WMS Excellence",
    tagline: "Unlock the full power of SAP Business One with certified Boyum IT solutions.",
    iconName: "Layers",
    description: "World-class advanced manufacturing planning and touchless warehouse management seamlessly embedded into SAP B1.",
    capabilities: [
      "Beas Manufacturing: Advanced Planning & Scheduling (APS), MRP, shop-floor data collection",
      "Produmex WMS: High-speed barcode scanning, RF terminal handling, 3PL billing",
      "B1 Usability Package (B1UP): 300+ custom screens, rules, and approval automations"
    ],
    businessImpact: "35% productivity improvement | 99.9% inventory accuracy",
    ctaText: "Explore Boyum Solutions",
    ctaTarget: "#contact"
  },
  {
    id: "uipath-rpa",
    title: "UiPath RPA & AI Automation",
    tagline: "Move beyond ERP to hyperautomation.",
    iconName: "Cpu",
    description: "Replace repetitive manual keying with autonomous software bots powered by computer vision and machine learning.",
    capabilities: [
      "End-to-end touchless Invoice, GRPO, and AP/AR transaction processing",
      "UiPath Document Understanding: AI OCR parsing across invoices, POs, and bills of lading",
      "Process & Task Mining workshops to pinpoint high-ROI automation candidates"
    ],
    businessImpact: "70% reduction in manual data entry | Measurable ROI in 4–6 months",
    ctaText: "Book an RPA Demo",
    ctaTarget: "#contact"
  },
  {
    id: "freight-trading",
    title: "Freight & Trading Module",
    tagline: "Custom-crafted module built on SAP B1 for maritime shipping and global traders.",
    iconName: "Ship",
    description: "Proven across high-volume trading hubs to streamline maritime cargo tracking, automated billing, and compliance.",
    capabilities: [
      "Automated HBL / MBL generation from inbound shipping email instructions",
      "Multi-currency landed cost computation with integrated customs tracking",
      "Instant milestone updates dispatched directly to clients via WhatsApp and email"
    ],
    businessImpact: "90% error reduction | 85% shipping documentation time saved",
    ctaText: "Explore Freight Module",
    ctaTarget: "#contact"
  },
  {
    id: "gate-entry",
    title: "Gate Entry & Weighment Automation",
    tagline: "Computer vision and IoT weighbridge integration for zero-touch yard operations.",
    iconName: "Truck",
    description: "Replaces slow security booth logging with computer vision vehicle recognition and direct weighbridge sensor logging.",
    capabilities: [
      "Computer vision license plate recognition & vehicle entry validation",
      "Automated gross and tare weighbridge reading capture directly into SAP B1",
      "Instant GRPO generation eliminating fraudulent entry and turnaround delays"
    ],
    businessImpact: "3× faster gate clearance | 100% elimination of weighment fraud",
    ctaText: "Discover Gate Automation",
    ctaTarget: "#contact"
  },
  {
    id: "ai-ready-suite",
    title: "ATLAS AI-Ready Add-On Suite",
    tagline: "Built on SAP B1. Proven Across Industries. Deployed in Weeks.",
    iconName: "BrainCircuit",
    description: "Proprietary intelligent accelerators engineered specifically to bridge SAP Business One with predictive AI tools.",
    capabilities: [
      "Intelligent Document Distributor: ML classification & automated routing of 50+ document formats",
      "Predictive Stock Alert Bot: UiPath + SAP algorithm alerting stock-outs 7 days in advance",
      "Smart Vendor Reconciliation RPA: Autonomous 3-way matching with 98% accuracy"
    ],
    businessImpact: "Zero-touch operational processes | Proactive, data-backed decision making",
    ctaText: "Deploy ATLAS Add-Ons",
    ctaTarget: "#contact"
  }
];

export const EXPERTISE_PILLARS = [
  {
    id: "enterprise-software",
    title: "Enterprise Software & ERP Core",
    subtitle: "SAP Business One Architecture",
    description: "Architecting central business databases, chart of accounts, master item data, and multi-tier supply chain workflows for robust performance, auditability, and speed.",
    bulletPoints: [
      "Cloud & On-premise implementation with zero operational downtime cutover",
      "SAP HANA in-memory analytics & custom executive query dashboards",
      "Multi-entity consolidation across multiple legal companies and foreign currencies"
    ]
  },
  {
    id: "process-optimization",
    title: "Process Optimization & Usability",
    subtitle: "Boyum IT & B1UP Extensions",
    description: "Transforming standard ERP interfaces into streamlined, error-proof role-based screens with embedded validation logic and automated notification triggers.",
    bulletPoints: [
      "300+ usability automations eliminating redundant clicks and manual verification",
      "Automated multi-tier approval hierarchies on purchase orders & credit limits",
      "Deep Microsoft Outlook & CRM integration for real-time sales and customer support"
    ]
  },
  {
    id: "manufacturing-warehouse",
    title: "Manufacturing & Warehouse Excellence",
    subtitle: "Beas Manufacturing & Produmex WMS",
    description: "Bridging the gap between the shop floor, distribution centers, and central financial ledgers with real-time barcode telemetry and advanced planning.",
    bulletPoints: [
      "Advanced Planning & Scheduling (APS) and finite capacity resource allocation",
      "Wireless RF barcode scanning, lot and batch tracking, and touchless 3PL billing",
      "Automated machine downtime telemetry and electronic batch manufacturing records"
    ]
  },
  {
    id: "intelligent-automation",
    title: "Intelligent Automation & Applied AI",
    subtitle: "UiPath RPA & Machine Learning",
    description: "Deploying software robots to read PDFs, extract line-item pricing, reconcile statements, and execute SAP transactions with zero human fatigue.",
    bulletPoints: [
      "Attended & unattended bots operating 24/7 across finance, logistics, and sales",
      "AI OCR extraction for unstructured vendor invoices, POs, and packing slips",
      "Predictive models forecasting cash-flow delays and inventory stock-outs"
    ]
  }
];

export const INDUSTRY_SOLUTIONS: IndustryItem[] = [
  {
    id: "manufacturing",
    title: "Manufacturing & Production",
    subtitle: "Discrete & Process Manufacturers",
    iconName: "Factory",
    painPoints: "Unscheduled machine downtime, inaccurate scrap reporting, and disconnected paper-based shop floor job cards.",
    deliveredSolution: "Beas Manufacturing integrated with real-time machine IoT telemetry and UiPath shop-floor digital assistants.",
    keyOutcomes: [
      "Overall Equipment Effectiveness (OEE) improved by +28%",
      "Scrap material reduction of 42% recorded in production audits",
      "Fastest verified SAP B1 + Beas go-live in 58 days (Pharma, 2024)"
    ]
  },
  {
    id: "warehouse",
    title: "Warehouse & Logistics",
    subtitle: "3PL, Distribution Centers & Yards",
    iconName: "Boxes",
    painPoints: "Manual barcode audits, picking errors, slow container turnarounds, and inventory count discrepancies.",
    deliveredSolution: "Produmex WMS paired with wireless RF scanning bots and automated computer vision gate weighbridges.",
    keyOutcomes: [
      "99.9% inventory picking accuracy achieved across high-SKU warehouses",
      "3× faster inbound container receiving and automated GRPO creation",
      "400% return on investment achieved within 9 months"
    ]
  },
  {
    id: "finance",
    title: "Finance & Corporate Administration",
    subtitle: "CFOs, Controllers & Accounts Teams",
    iconName: "Finance",
    painPoints: "High volumes of manual vendor invoice entry, delayed month-end closures, and error-prone bank reconciliations.",
    deliveredSolution: "UiPath Document Understanding coupled with B1UP automated approval routes and cash flow analytics.",
    keyOutcomes: [
      "1,000+ invoices processed daily with touchless validation",
      "Days Sales Outstanding (DSO) reduced by 18 days",
      "40% reduction in month-end financial book closing duration"
    ]
  },
  {
    id: "trading",
    title: "Trading, Import & Maritime Shipping",
    subtitle: "Commodity Traders & Forwarders",
    iconName: "Ship",
    painPoints: "Complex landed-cost tracking across multiple currencies, custom clearance delays, and heavy paper BL filing.",
    deliveredSolution: "ATLAS Proprietary Shipping Add-On with automated email parsing and real-time port tracking feeds.",
    keyOutcomes: [
      "85% reduction in shipping documentation preparation time",
      "90% reduction in shipping compliance and filing errors",
      "Automated WhatsApp tracking notifications dispatched to end clients"
    ]
  }
];

export const ENGAGEMENT_APPROACH_STEPS: ProcessStepItem[] = [
  {
    step: "01",
    title: "Discover",
    timeframe: "Phase 1: Diagnostic",
    description: "A comprehensive process audit and 30-minute discovery session with senior consultants to evaluate your current SAP environment, workflow bottlenecks, and high-friction operational tasks.",
    deliverables: [
      "Current process maturity assessment",
      "Pain point & operational bottleneck catalog",
      "Stakeholder alignment & preliminary ROI estimation"
    ]
  },
  {
    step: "02",
    title: "Design",
    timeframe: "Phase 2: Architecture",
    description: "Detailed architecture design mapping SAP Business One, Boyum IT extensions, and UiPath digital bot integrations into a cohesive, high-ROI target operating model.",
    deliverables: [
      "System integration blueprint & data flow diagrams",
      "Prioritized automation use-case matrix with financial impact",
      "Transparent fixed-scope proposal and milestone plan"
    ]
  },
  {
    step: "03",
    title: "Implement",
    timeframe: "Phase 3: Deployment",
    description: "Agile, rapid deployment executed by certified SAP HANA, Boyum, and UiPath engineers, featuring rigorous sandbox testing, data migration, and comprehensive user training.",
    deliverables: [
      "Production-ready ERP and RPA configurations",
      "Clean legacy data migration and validation",
      "Staff user-acceptance testing (UAT) and sign-off"
    ]
  },
  {
    step: "04",
    title: "Optimize & Support",
    timeframe: "Phase 4: Continuous Value",
    description: "Ongoing 24×7 intelligent bot monitoring, quarterly ERP health checks, continuous performance tuning, and rollout of future AI capabilities.",
    deliverables: [
      "Proactive automated system telemetry & exception handling",
      "Guaranteed SLAs with senior consultant escalation",
      "3-Year strategic AI and automation maturity guidance"
    ]
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "testimonial-1",
    quote: "Inventory accuracy reached 99.9% and warehouse speed doubled within four months of deploying Produmex WMS with ATLAS.",
    authorRole: "Chief Executive Officer",
    companyContext: "Leading Indian Logistics & 3PL Provider",
    verifiedClaim: false,
    claimNote: "Claim documented in ATPL WEB Site_Content.pdf. Requires formal customer release before production deployment.",
    rating: 5
  },
  {
    id: "testimonial-2",
    quote: "We achieved a 70% reduction in manual finance entries within 3 months. Our accounts team now manages triple the transaction volume with zero additions in headcount.",
    authorRole: "Chief Financial Officer",
    companyContext: "Tier-1 Automotive & Industrial Manufacturing Client",
    verifiedClaim: false,
    claimNote: "Claim documented in ATPL WEB Site_Content.pdf. Requires formal customer release before production deployment.",
    rating: 5
  },
  {
    id: "testimonial-3",
    quote: "ATLAS helped us eliminate manual SAP work by 70% within months. Their single-vendor accountability across SAP B1, Boyum and UiPath made the difference.",
    authorRole: "Managing Director",
    companyContext: "Specialty Chemicals Manufacturer, India",
    verifiedClaim: false,
    claimNote: "Claim documented in ATPL WEB Site_Content.pdf. Requires formal customer release before production deployment.",
    rating: 5
  }
];

export const CASE_STUDY_HIGHLIGHTS: CaseStudyItem[] = [
  {
    id: "pharma",
    sector: "Pharmaceutical Manufacturing",
    timeframeOrSpeed: "Fastest 58-Day Go-Live (2024)",
    headlineMetric: "OEE +28% | Scrap -42%",
    summary: "Integrated SAP B1 HANA with Beas Manufacturing and UiPath shop-floor bots for strict electronic batch tracking and real-time scrap reduction.",
    requiresVerification: true
  },
  {
    id: "logistics",
    sector: "Cold-Chain Logistics & 3PL",
    timeframeOrSpeed: "Full Rollout in 90 Days",
    headlineMetric: "3× Warehouse Speed | 400% ROI in 9 Months",
    summary: "Implemented Produmex WMS with wireless RF scanning and automated GRPO generation across four multi-state distribution hubs.",
    requiresVerification: true
  },
  {
    id: "trading",
    sector: "Global Commodity Trading & Freight",
    timeframeOrSpeed: "Turnkey Implementation in 45 Days",
    headlineMetric: "85% Less Documentation Time | 90% Error Drop",
    summary: "Custom Freight & Shipping module on SAP B1 with automated email parsing for instant HBL/MBL creation and customs reconciliation.",
    requiresVerification: true
  }
];

export const CONSULTATION_BENEFITS = [
  "Comprehensive SAP B1 health, patch & schema optimization evaluation",
  "Tailored Hyperautomation Readiness Score generated in 48 hours",
  "Pinpointed manual operational leakages with measurable cost-saving benchmarks",
  "Complimentary 3-Year Strategic AI & Automation Roadmap for your executive team",
  "Direct interaction with senior certified architects — zero junior sales pitches"
];
