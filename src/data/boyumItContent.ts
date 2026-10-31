export interface BoyumProductCard {
  id: string;
  name: string;
  badge: string;
  tagline: string;
  description: string;
  imageSrc: string;
  features: string[];
  kpis: string[];
  accentColor: string;
  borderColor: string;
  hoverBorderColor: string;
  badgeBg: string;
}

export interface BoyumBenefitItem {
  id: string;
  title: string;
  description: string;
  iconName: 'TrendingUp' | 'Factory' | 'Eye' | 'Zap' | 'GitMerge' | 'Award';
  color: string;
  bgColor: string;
}

export interface BoyumProcessStep {
  number: number;
  title: string;
  description: string;
  detail: string;
}

export interface BoyumIndustryItem {
  id: string;
  title: string;
  description: string;
  bullet: string;
  imageSrc: string;
  color: string;
  borderColor: string;
}

export const BOYUM_HERO_DATA = {
  eyebrow: "BOYUM IT SOLUTIONS FOR SAP BUSINESS ONE",
  titleStart: "Enhance SAP Business One with",
  titleHighlight: "Boyum IT Solutions",
  description:
    "Extend your SAP Business One capabilities with powerful solutions designed to improve manufacturing, warehouse management and everyday business operations.",
  heroImage: "/images/partners/partners_boyum_warehouse.jpg",
  primaryCtaText: "Explore Solutions",
  secondaryCtaText: "Book a Consultation",
  floatingBadges: [
    { label: "Boyum IT Silver Partner", color: "#1B72E8", iconName: "Award" },
    { label: "320+ Add-On Modules Deployed", color: "#0066CC", iconName: "Layers" },
    { label: "99.9% Inventory Accuracy", color: "#10b981", iconName: "CheckCircle2" },
    { label: "SAP Certified Integration", color: "#0284c7", iconName: "ShieldCheck" }
  ]
};

export const BOYUM_METRICS_DATA = [
  {
    id: "modules",
    value: "320+",
    label: "Boyum Modules Deployed",
    sublabel: "Across manufacturing & logistics",
    color: "#1B72E8",
    bgColor: "bg-blue-50 border-blue-200"
  },
  {
    id: "productivity",
    value: "35%",
    label: "Productivity Improvement",
    sublabel: "Average operational efficiency gain",
    color: "#10b981",
    bgColor: "bg-emerald-50 border-emerald-200"
  },
  {
    id: "accuracy",
    value: "99.9%",
    label: "Inventory Accuracy",
    sublabel: "With Produmex WMS mobile RF",
    color: "#0066CC",
    bgColor: "bg-blue-50 border-blue-200"
  },
  {
    id: "oee",
    value: "28%",
    label: "OEE Improvement",
    sublabel: "With Beas Manufacturing APS",
    color: "#0284c7",
    bgColor: "bg-sky-50 border-sky-200"
  }
];

export const BOYUM_INTRO_DATA = {
  eyebrow: "POWERFUL ADD-ONS",
  titleStart: "Powerful Add-ons for",
  titleHighlight: "Smarter Business Operations",
  description:
    "Boyum IT Solutions extend the core functionality of SAP Business One, helping businesses in manufacturing, warehousing, and daily operations achieve greater efficiency, visibility, and control without costly custom development.",
  secondaryParagraph:
    "As an authorized Boyum IT Silver Partner, ATLAS Technosoft combines deep industry domain knowledge with certified technical expertise. We deliver complete, turn-key implementations that bridge your shop floor, warehouse racks, and administrative offices into one seamless digital ecosystem.",
  imageSrc: "/images/solutions/solutions_integrated_ecosystem.jpg",
  highlights: [
    "Native, certified integration inside SAP Business One",
    "Real-time operational visibility from shop floor to CXO dashboards",
    "Eliminates manual workarounds, disparate systems & spreadsheets",
    "Certified Boyum IT Silver Partner implementation & local 24x7 support"
  ]
};

export const BOYUM_PRODUCTS_DATA: BoyumProductCard[] = [
  {
    id: "beas",
    name: "Beas Manufacturing",
    badge: "MANUFACTURING EXECUTION & PLANNING",
    tagline: "Comprehensive Production Planning & Control for SAP Business One",
    description:
      "A modular, industry-proven manufacturing suite designed for discrete and process manufacturers. Features advanced planning & scheduling (APS), live Gantt capacity charts, multi-level BOMs, quality management, and shop floor data capture.",
    imageSrc: "/images/solutions/solutions_beas_manufacturing.jpg",
    features: [
      "Manufacturing planning and management",
      "Production process control",
      "Manufacturing visibility",
      "Resource and production management",
      "Netronic Gantt real-time capacity scheduling",
      "Shop floor terminal data collection"
    ],
    kpis: ["28% OEE Improvement", "42% Scrap & Rework Reduction", "Automated Netronic Gantt APS"],
    accentColor: "#1B72E8",
    borderColor: "border-[#1B72E8]",
    hoverBorderColor: "hover:border-[#1557B0]",
    badgeBg: "bg-blue-50 text-[#1B72E8] border border-blue-200"
  },
  {
    id: "produmex",
    name: "Produmex WMS",
    badge: "ADVANCED WAREHOUSE MANAGEMENT",
    tagline: "High-Speed Mobile RF Scanning & Inventory Optimization",
    description:
      "A robust, mobile warehouse management system built specifically for SAP Business One. Automates inbound receiving, multi-zone directed picking, packing, shipping, and multi-bin lot traceability with mobile handheld barcode scanners.",
    imageSrc: "/images/solutions/solutions_produmex_wms.jpg",
    features: [
      "Warehouse management",
      "Inventory visibility",
      "Warehouse operations",
      "Stock movement and control",
      "Mobile RF terminal barcode scanning (GS1 / SSCC)",
      "Multi-zone guided wave picking & 3PL customer billing"
    ],
    kpis: ["99.9% Inventory Accuracy", "50% Faster Order Picking", "Zero Paper Workflows"],
    accentColor: "#10b981",
    borderColor: "border-[#10b981]",
    hoverBorderColor: "hover:border-[#059669]",
    badgeBg: "bg-emerald-50 text-[#10b981] border border-emerald-200"
  },
  {
    id: "b1up",
    name: "B1 Usability Package (B1UP)",
    badge: "WORKFLOW & USABILITY SUITE",
    tagline: "Tailor SAP Business One to Your Exact Business Workflows",
    description:
      "The global benchmark for customizing SAP Business One. Enables business users to modify screen layouts, automate routine multi-step processes, enforce data validation rules, and build custom dashboards without writing custom code.",
    imageSrc: "/images/solutions/solutions_b1up_interface.jpg",
    features: [
      "SAP Business One usability enhancements",
      "Workflow improvements",
      "Productivity and automation",
      "Customization capabilities",
      "Dynamic field rules & mandatory field validations",
      "Automated scheduled reports & email delivery"
    ],
    kpis: ["35% Higher Productivity", "300+ Pre-built Automations", "Zero-Code Customization"],
    accentColor: "#0066CC",
    borderColor: "border-[#0066CC]",
    hoverBorderColor: "hover:border-[#5B21B6]",
    badgeBg: "bg-blue-50 text-[#0066CC] border border-blue-200"
  }
];

export const BOYUM_BENEFITS_DATA = {
  eyebrow: "KEY BENEFITS",
  titleStart: "Measurable Advantages for",
  titleHighlight: "Your Business",
  description:
    "Boyum IT solutions turn operational challenges into strategic advantages with proven, measurable business outcomes across every department.",
  benefits: [
    {
      id: "b1",
      title: "Improved Operational Efficiency",
      description: "Streamline multi-department workflows, eliminate manual re-keying, and connect your front and back office.",
      iconName: "TrendingUp" as const,
      color: "#1B72E8",
      bgColor: "bg-blue-50 text-[#1B72E8] border border-blue-200"
    },
    {
      id: "b2",
      title: "Better Manufacturing Control",
      description: "Gain complete transparency over bills of materials, machine capacity, shop floor execution, and quality inspection.",
      iconName: "Factory" as const,
      color: "#0066CC",
      bgColor: "bg-blue-50 text-[#0066CC] border border-blue-200"
    },
    {
      id: "b3",
      title: "Warehouse Visibility",
      description: "Real-time stock tracking with handheld RF scanners, multi-bin layout control, and zero stockout risk.",
      iconName: "Eye" as const,
      color: "#10b981",
      bgColor: "bg-emerald-50 text-[#10b981] border border-emerald-200"
    },
    {
      id: "b4",
      title: "Increased Productivity",
      description: "Empower staff with intuitive interfaces, customized shortcuts, and automated routine data validation.",
      iconName: "Zap" as const,
      color: "#0284c7",
      bgColor: "bg-sky-50 text-[#0284c7] border border-sky-200"
    },
    {
      id: "b5",
      title: "Improved Business Workflows",
      description: "Establish automated approval processes, scheduled alerts, and seamless handoffs between production and logistics.",
      iconName: "GitMerge" as const,
      color: "#0A66C2",
      bgColor: "bg-blue-50 text-[#0A66C2] border border-blue-200"
    },
    {
      id: "b6",
      title: "Better SAP Business One Experience",
      description: "Unlock the full power of your ERP investment with certified, cohesive add-ons that grow alongside your business.",
      iconName: "Award" as const,
      color: "#1B72E8",
      bgColor: "bg-blue-50 text-[#1B72E8] border border-blue-200"
    }
  ]
};

export const BOYUM_PROCESS_DATA = {
  eyebrow: "HOW IT WORKS",
  titleStart: "A Proven Four-Step",
  titleHighlight: "Implementation Approach",
  description:
    "We follow a structured, consultative methodology to understand, deploy, and optimize Boyum IT solutions for long-term operational success.",
  steps: [
    {
      number: 1,
      title: "Understand Business Requirements",
      description: "Comprehensive discovery to evaluate your manufacturing, warehouse, and operational bottlenecks.",
      detail: "30-minute discovery assessment mapping existing workflows, ERP gaps, and high-impact automation opportunities."
    },
    {
      number: 2,
      title: "Select the Right Boyum Solution",
      description: "Expert module selection tailored to your specific industry, volumes, and business goals.",
      detail: "Matching Beas Manufacturing, Produmex WMS, or B1UP configurations with a clear ROI timeline and scope definition."
    },
    {
      number: 3,
      title: "Implementation and Integration",
      description: "Structured configuration, SAP Business One integration, data migration, and sandbox stress testing.",
      detail: "Rigorous testing of RF scanner terminals, BOM data validation, and pilot production runs before cutover."
    },
    {
      number: 4,
      title: "Training and Ongoing Support",
      description: "Hands-on team training, smooth go-live assistance, and 24x7 local SLA support.",
      detail: "Role-based training for shop floor operators, warehouse staff, and system administrators with continuous optimization."
    }
  ]
};

export const BOYUM_INDUSTRIES_DATA = {
  eyebrow: "INDUSTRIES WE SERVE",
  titleStart: "Solutions Designed Around",
  titleHighlight: "Your Industry",
  description:
    "Boyum IT solutions are deployed across demanding industries where precision, traceability, and speed are critical to competitive advantage.",
  industries: [
    {
      id: "manufacturing",
      title: "Manufacturing",
      description:
        "Discrete, process, chemical, and industrial manufacturing companies rely on Beas Manufacturing for production planning, BOM control, and shop-floor execution.",
      bullet: "BOM, APS scheduling, machine capacity & live shop-floor tracking",
      imageSrc: "/images/crystal_hd/ind_manufacturing.jpg",
      color: "#1B72E8",
      borderColor: "border-[#1B72E8]"
    },
    {
      id: "warehouse-logistics",
      title: "Warehouse & Logistics",
      description:
        "Distribution hubs, cold storage, and 3PL providers deploy Produmex WMS for barcode RF scanning, multi-bin optimization, and fast order fulfillment.",
      bullet: "Mobile RF scanning, multi-zone wave picking & 3PL billing automation",
      imageSrc: "/images/crystal_hd/ind_warehouse.jpg",
      color: "#10b981",
      borderColor: "border-[#10b981]"
    },
    {
      id: "trading-distribution",
      title: "Trading & Distribution",
      description:
        "High-volume wholesale traders and multi-branch distributors utilize B1UP and Produmex WMS to speed up order-to-cash workflows and eliminate errors.",
      bullet: "Automated order entry, real-time stock allocation & dispatch tracking",
      imageSrc: "/images/crystal_hd/ind_shipping.jpg",
      color: "#0066CC",
      borderColor: "border-[#0066CC]"
    }
  ]
};

export const BOYUM_CTA_DATA = {
  eyebrow: "LET'S WORK TOGETHER",
  titleStart: "Ready to Enhance Your",
  titleHighlight: "SAP Business One Experience?",
  description:
    "Book a consultation with our certified Boyum IT specialists. Discover how Beas Manufacturing, Produmex WMS, and B1UP can transform your operations and drive measurable ROI.",
  buttonText: "Book a Consultation",
  secondaryButtonText: "Talk to Our Experts"
};

