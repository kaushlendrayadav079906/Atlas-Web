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
    whatsappLink: "https://wa.me/919372329599?text=Hello%20ATLAS%20Technosoft%2C%20I%20would%20like%20to%20request%20a%20Hyperautomation%20Health%20Check.",
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

export const PARTNER_STATEMENTS: PartnerStatement[] = [
  {
    badge: "Official SAP",
    name: "Authorized SAP Channel Partner",
    level: "Channel Partner",
    description: "Certified deployment and optimization partner with 80+ successful SAP B1 implementations across India & Global markets."
  },
  {
    badge: "Boyum IT",
    name: "Boyum IT Silver Partner",
    level: "Silver Partner",
    description: "Certified experts in Beas Manufacturing, Produmex WMS, and B1UP productivity and UI automation suites."
  },
  {
    badge: "UiPath",
    name: "UiPath Silver Partner",
    level: "Silver Partner",
    description: "Accredited hyperautomation specialists implementing robotic process automation and AI Document Understanding."
  }
];

export const TRUST_METRICS: MetricItem[] = [
  {
    id: "clients",
    value: "80+",
    label: "Live SAP B1 Clients",
    detail: "Enterprises deployed across India and global territories",
    requiresVerification: true,
    sourceNote: "Source: ATPL WEB Site_Content.pdf (Pending legal verification & client permission before production publication)"
  },
  {
    id: "retention",
    value: "98.7%",
    label: "Customer Retention",
    detail: "Long-term partnerships delivering continuous ERP & RPA enhancement",
    requiresVerification: true,
    sourceNote: "Source: ATPL WEB Site_Content.pdf (Pending legal verification before production publication)"
  },
  {
    id: "transactions",
    value: "1.2M+",
    label: "Transactions Automated / Year",
    detail: "Mission-critical invoice, warehouse, and AP/AR operations handled touchlessly",
    requiresVerification: true,
    sourceNote: "Source: ATPL WEB Site_Content.pdf (Pending audited transactional logs before production publication)"
  },
  {
    id: "consultants",
    value: "32",
    label: "Certified Consultants",
    detail: "SAP HANA, Beas, Produmex, and UiPath RPA certified specialists in Mumbai",
    requiresVerification: true,
    sourceNote: "Source: ATPL WEB Site_Content.pdf (Internal certification roster audit pending)"
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
    id: "erp",
    title: "ERP Core Optimization",
    subtitle: "SAP Business One Foundation",
    description: "Ensures your central database, chart of accounts, production master data, and supply-chain configurations are architected for sub-second query performance and audit compliance.",
    bulletPoints: [
      "Cloud & On-premise implementation with zero downtime cutover",
      "SAP HANA in-memory analytics & custom executive query dashboards",
      "Multi-entity consolidation across multiple legal entities and currencies"
    ]
  },
  {
    id: "workflow",
    title: "Workflow & UI Automation",
    subtitle: "Boyum IT & B1UP Extensions",
    description: "Transforms standard ERP screens into streamlined, error-proof role-based interfaces with embedded validation logic and automated notification triggers.",
    bulletPoints: [
      "300+ out-of-the-box UI enhancements eliminating redundant clicks",
      "Automated multi-tier approval hierarchies on purchase orders & credit limits",
      "Deep Microsoft Outlook & CRM integration for sales and customer support"
    ]
  },
  {
    id: "rpa",
    title: "Document & Process Hyperautomation",
    subtitle: "UiPath Robotic Automation",
    description: "Deploys digital workers to read PDFs, extract line-item pricing, reconcile supplier statements, and execute SAP transactions with 99%+ accuracy.",
    bulletPoints: [
      "Attended & unattended bots operating 24/7 without human fatigue",
      "AI OCR extraction for unstructured vendor invoices and packing slips",
      "Seamless integration connecting SAP B1 with supplier portals and logistics APIs"
    ]
  },
  {
    id: "ai-decision",
    title: "Predictive & Intelligent Decision Support",
    subtitle: "Applied AI & Machine Learning",
    description: "Supercharges ERP operational data with predictive machine learning models that forecast cash runway, production bottlenecks, and supplier fulfillment delays.",
    bulletPoints: [
      "Predictive cash flow modeling and payment default probability scoring",
      "Automated re-order point calculations accounting for seasonal lead times",
      "Natural language querying for CXO reporting via ATLAS AI Co-Pilot"
    ]
  }
];

export const INDUSTRY_SOLUTIONS: IndustryItem[] = [
  {
    id: "manufacturing",
    title: "Manufacturing & Production",
    subtitle: "Discrete & Process Manufacturers",
    iconName: "Factory",
    painPoints: "Unscheduled machine downtime, inaccurate scrap reporting, and disconnected shop-floor paper job cards.",
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

export const IMPLEMENTATION_STEPS: ProcessStepItem[] = [
  {
    step: "01",
    title: "Understand Your Business",
    timeframe: "Day 1–3",
    description: "A focused 30-minute discovery session with senior SAP & RPA consultants to analyze operational bottlenecks, current ERP health, and highest-friction workflows.",
    deliverables: [
      "Current process maturity assessment",
      "Pain point & bottleneck catalog",
      "Executive stakeholder alignment"
    ]
  },
  {
    step: "02",
    title: "Automation Opportunity Mapping",
    timeframe: "Day 4–7",
    description: "Deep-dive mapping of high-impact use cases across SAP B1, Boyum IT extensions, and UiPath digital bots, backed by quantifiable ROI and timeline benchmarks.",
    deliverables: [
      "Prioritized automation matrix with ROI projection",
      "System architecture & data flow plan",
      "Risk mitigation & integration blueprint"
    ]
  },
  {
    step: "03",
    title: "Clear Roadmap & Costing",
    timeframe: "Day 8–10",
    description: "Delivery of a fixed-scope, fixed-price proposal detailing milestone dates, guaranteed SLAs, licensing requirements, and expected operational payoffs.",
    deliverables: [
      "Transparent fixed-cost implementation quotation",
      "3-Year AI & Hyperautomation readiness roadmap",
      "Dedicated senior implementation team assignment"
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
    summary: "Integrated SAP B1 HANA with Beas Manufacturing and UiPath shop-floor bots for strict 21 CFR Part 11 electronic batch tracking.",
    requiresVerification: true
  },
  {
    id: "logistics",
    sector: "Cold-Chain Logistics & 3PL",
    timeframeOrSpeed: "Full Rollout in 90 Days",
    headlineMetric: "3× Warehouse Speed | 400% ROI in 9 Months",
    summary: "Implemented Produmex WMS with voice-assisted picking and touchless automated GRPO generation across 4 distribution hubs.",
    requiresVerification: true
  },
  {
    id: "trading",
    sector: "Global Commodity Trading & Freight",
    timeframeOrSpeed: "Turnkey Implementation in 45 Days",
    headlineMetric: "85% Less Documentation Time | 90% Error Drop",
    summary: "Custom Freight & Shipping module on SAP B1 with AI email parsing for instant HBL/MBL creation and automated customs filing.",
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
