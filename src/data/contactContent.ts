export interface ContactHeroData {
  eyebrow: string;
  titleStart: string;
  titleHighlight: string;
  description: string;
  primaryCtaText: string;
  secondaryCtaText: string;
  heroImage: string;
  floatingBadges: {
    title: string;
    iconName: 'MessageSquare' | 'Users' | 'BarChart3';
    color: string;
    bgColor: string;
  }[];
}

export interface GetInTouchCard {
  id: string;
  title: string;
  primaryValue: string;
  description: string;
  iconName: 'Mail' | 'Phone' | 'MapPin';
  iconColor: string;
  iconBgColor: string;
  borderColor: string;
  actionHref?: string;
  isExternalLink?: boolean;
}

export interface OfficeLocationCard {
  id: string;
  title: string;
  address: string;
  image: string;
  mapImage: string;
  googleMapsUrl: string;
}

export interface WhyGetInTouchCard {
  id: string;
  title: string;
  description: string;
  iconName: 'UserCheck' | 'Sliders' | 'Clock' | 'Handshake';
  color: string;
  bgColor: string;
}

export const CONTACT_HERO_DATA: ContactHeroData = {
  eyebrow: "CONTACT US —",
  titleStart: "Let's Build Something Great",
  titleHighlight: "Together",
  description: "We are here to help you with your business requirements. Get in touch with our experts to discuss how our technology solutions can support your growth.",
  primaryCtaText: "Book a Consultation",
  secondaryCtaText: "Talk to Our Experts",
  heroImage: "/images/contact/contact_hero_consultation.jpg",
  floatingBadges: [
    {
      title: "Quick Response",
      iconName: "MessageSquare",
      color: "#1B72E8",
      bgColor: "bg-blue-50"
    },
    {
      title: "Expert Consultation",
      iconName: "Users",
      color: "#16a879",
      bgColor: "bg-emerald-50"
    },
    {
      title: "Customized Solutions",
      iconName: "BarChart3",
      color: "#0A66C2",
      bgColor: "bg-blue-50"
    }
  ]
};

export const GET_IN_TOUCH_CARDS: GetInTouchCard[] = [
  {
    id: "email",
    title: "Email Us",
    primaryValue: "sales@atlastechnosoft.com",
    description: "Drop us an email for any queries or consultation requests.",
    iconName: "Mail",
    iconColor: "text-[#1B72E8]",
    iconBgColor: "bg-[#e0e7ff]",
    borderColor: "border-[#1B72E8]/40 hover:border-[#1B72E8]",
    actionHref: "mailto:sales@atlastechnosoft.com"
  },
  {
    id: "phone",
    title: "Call Us",
    primaryValue: "+91-9372329599",
    description: "Speak to our experts for immediate assistance.",
    iconName: "Phone",
    iconColor: "text-[#10b981]",
    iconBgColor: "bg-[#d1fae5]",
    borderColor: "border-[#10b981]/40 hover:border-[#10b981]",
    actionHref: "https://wa.me/919372329599?text=Hello%20ATLAS%20Technosoft%2C%20I%20would%20like%20to%20book%20a%20consultation.",
    isExternalLink: true
  },
  {
    id: "locations",
    title: "Our Locations",
    primaryValue: "Borivali & Marine Lines, Mumbai",
    description: "Visit our offices to discuss your business needs.",
    iconName: "MapPin",
    iconColor: "text-[#0066CC]",
    iconBgColor: "bg-blue-50",
    borderColor: "border-[#0066CC]/40 hover:border-[#0066CC]",
    actionHref: "#locations"
  }
];

export const OFFICE_LOCATIONS: OfficeLocationCard[] = [
  {
    id: "borivali",
    title: "Borivali Office",
    address: "Office No. 201, 2nd Floor, Rajhans Bonista, L.T. Road, Borivali (West), Mumbai – 400092",
    image: "/images/contact/office_borivali.jpg",
    mapImage: "/images/contact/map_borivali.png",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Rajhans+Bonista+L+T+Road+Borivali+West+Mumbai+400092"
  },
  {
    id: "marine-lines",
    title: "Marine Lines Office",
    address: "Office No. 501, 5th Floor, Dalamal Towers, Nariman Point, Marine Lines, Mumbai – 400020",
    image: "/images/contact/office_marine_lines.jpg",
    mapImage: "/images/contact/map_marine_lines.png",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Dalamal+Towers+Nariman+Point+Mumbai+400020"
  }
];

export const WHY_GET_IN_TOUCH_CARDS: WhyGetInTouchCard[] = [
  {
    id: "expert-guidance",
    title: "Expert Guidance",
    description: "Get advice from experienced technology consultants.",
    iconName: "Users" as any,
    color: "#1B72E8",
    bgColor: "bg-[#1B72E8]"
  },
  {
    id: "tailored-solutions",
    title: "Tailored Solutions",
    description: "Solutions designed for your business requirements.",
    iconName: "Cog" as any,
    color: "#10b981",
    bgColor: "bg-[#10b981]"
  },
  {
    id: "quick-response",
    title: "Quick Response",
    description: "We value your time and ensure prompt communication.",
    iconName: "Clock",
    color: "#0A66C2",
    bgColor: "bg-[#0A66C2]"
  },
  {
    id: "long-term-partnership",
    title: "Long-Term Partnership",
    description: "We aim to build lasting relationships with our clients.",
    iconName: "Handshake",
    color: "#0284c7",
    bgColor: "bg-[#0284c7]"
  }
];

export const SUBJECT_OPTIONS = [
  { value: "", label: "Select a subject" },
  { value: "sap-b1", label: "SAP Business One Implementation / Support" },
  { value: "boyum-it", label: "Boyum IT Add-ons (Beas, Produmex, B1UP)" },
  { value: "uipath-rpa", label: "UiPath RPA & AI Automation" },
  { value: "atlas-addons", label: "ATLAS Proprietary Add-ons (WMS, Gate Entry, Freight)" },
  { value: "partnership", label: "Partnership & Collaboration" },
  { value: "general", label: "General Inquiry / Other" }
];

