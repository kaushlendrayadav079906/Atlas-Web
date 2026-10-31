export interface AboutFloatingCard {
  title: string;
  subtitle: string;
  color: 'blue' | 'purple' | 'emerald';
  iconName: string;
}

export interface AboutMetric {
  id: string;
  value: string;
  label: string;
  sublabel: string;
  color: 'blue' | 'green' | 'purple';
  iconName: string;
  requiresVerification: boolean;
  sourceNote: string;
}

export interface TimelineMilestone {
  year: string;
  title: string;
  description: string;
  color: 'blue' | 'sky' | 'rose' | 'emerald' | 'purple';
  iconName: string;
  requiresVerification?: boolean;
}

export interface WhyChooseFeature {
  title: string;
  description: string;
  iconName: string;
  color: 'blue' | 'rose' | 'purple' | 'emerald';
}

export const ABOUT_HERO_DATA = {
  eyebrow: "ABOUT ATLAS TECHNOSOFT",
  titleStart: "Turning Business Challenges into",
  titleHighlight: "Smarter Solutions",
  description: "ATLAS Technosoft is a specialized technology partner helping businesses across manufacturing, logistics, pharma, and trading industries achieve operational excellence with SAP Business One, Boyum IT solutions, UiPath RPA, and AI-driven automation.",
  primaryCtaText: "Our Story",
  secondaryCtaText: "Meet Our Team",
  imageSrc: "/images/crystal_hd/hero_team.jpg",
  floatingCards: [
    {
      title: "People",
      subtitle: "Empowering Businesses",
      color: "blue" as const,
      iconName: "Users"
    },
    {
      title: "Process",
      subtitle: "Optimizing Operations",
      color: "purple" as const,
      iconName: "Cog"
    },
    {
      title: "Technology",
      subtitle: "Driving Innovation",
      color: "emerald" as const,
      iconName: "Cpu"
    },
    {
      title: "Growth",
      subtitle: "Building a Smarter Future",
      color: "purple" as const,
      iconName: "TrendingUp"
    }
  ]
};

export const ABOUT_METRICS_DATA: AboutMetric[] = [
  {
    id: "clients",
    value: "80+",
    label: "Clients",
    sublabel: "Across multiple industries",
    color: "blue",
    iconName: "Users",
    requiresVerification: true,
    sourceNote: "Source: ATPL WEB Site_Content.pdf (Client references subject to formal verification)"
  },
  {
    id: "retention",
    value: "98.7%",
    label: "Retention",
    sublabel: "Long-term partnerships",
    color: "green",
    iconName: "TrendingUp",
    requiresVerification: true,
    sourceNote: "Source: ATPL WEB Site_Content.pdf (Historical retention figure subject to contract verification)"
  },
  {
    id: "transactions",
    value: "1.2M+",
    label: "Transactions",
    sublabel: "Automated yearly",
    color: "purple",
    iconName: "Database",
    requiresVerification: true,
    sourceNote: "Source: ATPL WEB Site_Content.pdf (Aggregated transaction count subject to client telemetry logs)"
  },
  {
    id: "consultants",
    value: "32",
    label: "Certified Consultants",
    sublabel: "Domain experts",
    color: "purple",
    iconName: "Award",
    requiresVerification: true,
    sourceNote: "Source: ATPL WEB Site_Content.pdf (Subject to consultant accreditation records)"
  }
];

export const OUR_STORY_DATA = {
  eyebrow: "OUR STORY",
  titleStart: "A Journey Driven by Innovation and",
  titleHighlight: "Client Success",
  paragraphs: [
    "ATLAS Technosoft was founded with a clear vision — to help businesses achieve operational excellence through the combined power of SAP Business One, industry-specific solutions, and intelligent automation.",
    "Over the years, we have grown into a trusted partner, delivering end-to-end solutions that simplify processes, improve efficiency, and create measurable business value."
  ],
  ctaText: "Explore Our Journey",
  imageSrc: "/images/about/about_story_team.jpg",
  overlayCardItems: ["Technology", "People", "Partnership", "Growth"]
};

export const MISSION_VISION_VALUES_DATA = {
  eyebrow: "OUR MISSION, VISION & VALUES",
  titleStart: "What Drives Us",
  titleHighlight: "Forward",
  intro: "We are committed to delivering innovative solutions that help businesses adapt, automate, and grow in a rapidly evolving world.",
  mission: {
    title: "Our Mission",
    description: "To deliver innovative and practical technology solutions that help businesses streamline operations and achieve sustainable growth.",
    iconName: "Target"
  },
  vision: {
    title: "Our Vision",
    description: "To be a leading technology partner for SAP Business One, intelligent automation, and industry-specific solutions across global markets.",
    iconName: "Eye"
  },
  values: {
    title: "Our Values",
    items: [
      "Client Success",
      "Innovation",
      "Integrity",
      "Continuous Improvement",
      "Long-Term Partnerships"
    ],
    iconName: "Gem"
  }
};

export const ABOUT_EXPERTISE_DATA = {
  eyebrow: "OUR EXPERTISE",
  title: "Combining Technology, Domain Knowledge and Real-World Experience",
  titleStart: "Combining Technology, Domain Knowledge and",
  titleHighlight: "Real-World Experience",
  description: "We bring deep expertise in SAP Business One, business process optimization, manufacturing and warehouse solutions, and intelligent automation to deliver real business value.",
  checklist: [
    "End-to-end ERP implementation and support",
    "Industry-focused solutions for manufacturing, warehousing, and trading",
    "Business process optimization",
    "Intelligent automation with RPA and AI"
  ],
  ctaText: "Explore Our Expertise",
  imageSrc: "/images/about/about_expertise_hub.jpg",
  floatingPills: [
    { title: "Manufacturing Solutions", color: "blue" },
    { title: "Warehouse Management", color: "purple" },
    { title: "RPA & AI Automation", color: "blue" },
    { title: "Industry-Specific Add-ons", color: "emerald" }
  ]
};

export const ABOUT_INDUSTRIES_DATA = [
  {
    id: "manufacturing",
    title: "Manufacturing",
    description: "Streamline production, inventory and operations with intelligent solutions.",
    imageSrc: "/images/crystal_hd/ind_manufacturing.jpg",
    borderClass: "border-[#2992ff]",
    hoverBorderClass: "hover:border-blue-600",
    arrowBorderClass: "border-blue-200 text-blue-600 group-hover:bg-[#2992ff] group-hover:text-white"
  },
  {
    id: "warehouse",
    title: "Warehouse & Logistics",
    description: "Optimize warehousing, logistics and supply chain operations.",
    imageSrc: "/images/crystal_hd/ind_warehouse.jpg",
    borderClass: "border-[#2992ff]",
    hoverBorderClass: "hover:border-blue-600",
    arrowBorderClass: "border-blue-200 text-blue-600 group-hover:bg-[#2992ff] group-hover:text-white"
  },
  {
    id: "finance",
    title: "Finance & Administration",
    description: "Improve financial control and administrative efficiency.",
    imageSrc: "/images/crystal_hd/ind_finance.jpg",
    borderClass: "border-[#0066CC]",
    hoverBorderClass: "hover:border-[#5B21B6]",
    arrowBorderClass: "border-blue-200 text-[#0066CC] group-hover:bg-[#0066CC] group-hover:text-white"
  },
  {
    id: "trading",
    title: "Trading & Shipping",
    description: "Enhance trading operations and shipping processes with end-to-end visibility.",
    imageSrc: "/images/crystal_hd/ind_shipping.jpg",
    borderClass: "border-[#10b981]",
    hoverBorderClass: "hover:border-emerald-600",
    arrowBorderClass: "border-emerald-200 text-emerald-600 group-hover:bg-[#10b981] group-hover:text-white"
  }
];

export const WHY_CHOOSE_ATLAS_DATA = {
  eyebrow: "WHY CHOOSE ATLAS TECHNOSOFT",
  titleStart: "Your Trusted Partner for",
  titleHighlight: "Long-Term Growth",
  description: "We combine deep domain expertise with a client-centric approach to deliver solutions that are reliable, scalable, and future-ready.",
  ctaText: "Learn More",
  features: [
    {
      title: "Experienced Team",
      description: "Certified and skilled professionals with industry experience.",
      iconName: "Users",
      color: "blue" as const
    },
    {
      title: "Proven Methodology",
      description: "Structured and efficient implementation approach.",
      iconName: "Settings",
      color: "purple" as const
    },
    {
      title: "Client-Centric Approach",
      description: "Focused on your business objectives and success.",
      iconName: "HeartHandshake",
      color: "purple" as const
    },
    {
      title: "End-to-End Support",
      description: "From implementation to continuous improvement.",
      iconName: "Headphones",
      color: "emerald" as const
    }
  ]
};

export const JOURNEY_TIMELINE_DATA = {
  eyebrow: "OUR JOURNEY",
  title: "Key Milestones in Our Growth",
  milestones: [
    {
      year: "2010",
      title: "Foundation",
      description: "Established ATLAS Technosoft with a focus on ERP solutions.",
      color: "blue" as const,
      iconName: "Building2",
      requiresVerification: true
    },
    {
      year: "2014",
      title: "Expanding Expertise",
      description: "Added industry-specific solutions and product add-ons.",
      color: "sky" as const,
      iconName: "Layers",
      requiresVerification: true
    },
    {
      year: "2018",
      title: "Strategic Partnerships",
      description: "Strengthened partnerships with SAP, Boyum IT, and UiPath.",
      color: "purple" as const,
      iconName: "Handshake",
      requiresVerification: true
    },
    {
      year: "2021",
      title: "Growing Client Base",
      description: "Helped 80+ clients across multiple industries.",
      color: "emerald" as const,
      iconName: "Trophy",
      requiresVerification: true
    },
    {
      year: "2024",
      title: "Future Focus",
      description: "Continuing to drive innovation with AI and automation.",
      color: "purple" as const,
      iconName: "Sparkles",
      requiresVerification: true
    }
  ]
};

export const ABOUT_CONTACT_CTA_DATA = {
  eyebrow: "LET'S WORK TOGETHER",
  titleStart: "Ready to Transform",
  titleHighlight: "Your Business?",
  description: "Book a consultation with our experts and explore how we can help you streamline your operations and drive growth.",
  buttonText: "Book a Consultation"
};

