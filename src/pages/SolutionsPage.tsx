import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  Mail, 
  Phone, 
  MapPin, 
  ChevronUp,
  Send,
  Users,
  TrendingUp,
  Database,
  Award,
  Cog,
  Cpu,
  Layers,
  Sparkles,
  Zap,
  LineChart,
  Clock,
  Check,
  Ship,
  Truck,
  Factory,
  Boxes,
  Handshake,
  ShieldCheck,
  Scale
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Modal } from '../components/ui/Modal';
import { SAPBusinessOneLogo, BoyumITLogo, UiPathLogo } from '../components/ui/PartnerLogos';
import { BRAND_INFO } from '../data/websiteContent';
import { ABOUT_METRICS_DATA } from '../data/aboutContent';
import { ContactFormData } from '../types';
import {
  SOLUTIONS_HERO_DATA,
  SOLUTIONS_OVERVIEW_CARDS,
  SAP_B1_DEEP_DIVE,
  BOYUM_IT_DEEP_DIVE,
  UIPATH_RPA_DEEP_DIVE,
  ATLAS_ADDONS_DEEP_DIVE,
  SOLUTIONS_INDUSTRIES_DATA,
  SOLUTIONS_CONTACT_CTA_DATA
} from '../data/solutionsContent';

const industryIcons: Record<string, React.ReactNode> = {
  manufacturing: <Factory className="w-5 h-5 text-blue-600" />,
  warehouse: <Truck className="w-5 h-5 text-emerald-600" />,
  finance: <Database className="w-5 h-5 text-orange-500" />,
  trading: <Ship className="w-5 h-5 text-purple-600" />
};

export const SolutionsPage: React.FC = () => {
  // Modal & Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    companyName: '',
    workEmail: '',
    phoneNumber: '',
    areaOfInterest: 'sap-b1',
    message: ''
  });
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessSubmitted, setIsSuccessSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const validateForm = (): boolean => {
    const errors: Partial<Record<keyof ContactFormData, string>> = {};

    if (!formData.fullName.trim()) errors.fullName = 'Full name is required';
    if (!formData.companyName.trim()) errors.companyName = 'Company name is required';
    if (!formData.workEmail.trim()) {
      errors.workEmail = 'Work email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.workEmail)) {
      errors.workEmail = 'Please provide a valid work email address';
    }
    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = 'Phone number is required';
    } else if (!/^[+0-9\s-]{8,15}$/.test(formData.phoneNumber.trim())) {
      errors.phoneNumber = 'Please provide a valid phone number';
    }
    if (!formData.message.trim()) {
      errors.message = 'Please briefly outline your process or requirements';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name as keyof ContactFormData]) {
      setFormErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccessSubmitted(true);
    }, 400);
  };

  const generateMailtoLink = (data: ContactFormData) => {
    const subject = encodeURIComponent(`Solutions Consultation: ${data.companyName}`);
    const body = encodeURIComponent(
      `Dear ATLAS Technosoft Team,\n\n` +
      `I would like to book a consultation regarding ${data.areaOfInterest}.\n\n` +
      `Contact Details:\n` +
      `• Name: ${data.fullName}\n` +
      `• Company: ${data.companyName}\n` +
      `• Work Email: ${data.workEmail}\n` +
      `• Phone/WhatsApp: ${data.phoneNumber}\n\n` +
      `Requirements / Message:\n${data.message}\n\n` +
      `Submitted via ATLAS Technosoft Website (Solutions Page).`
    );
    return `mailto:${BRAND_INFO.contact.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="relative bg-white text-[#354765] selection:bg-blue-600 selection:text-white">

      {/* ========================================================================= */}
      {/* SECTION 1: SOLUTIONS HERO                                                 */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-r from-sky-50/60 via-white to-blue-50/30 pt-10 pb-12 lg:pt-14 lg:pb-16 border-b border-slate-100">
        
        {/* Soft subtle botanical ambient glow on far left */}
        <div className="absolute -left-12 top-1/2 -translate-y-1/2 w-48 h-80 opacity-25 pointer-events-none select-none hidden lg:block">
          <div className="w-full h-full bg-gradient-to-tr from-emerald-600/30 via-teal-500/10 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center">
            
            {/* Left Column (58% on Desktop) */}
            <div className="lg:col-span-7 space-y-5 text-left">
              
              {/* Eyebrow: 13–14px */}
              <div className="inline-block">
                <span className="text-[13px] sm:text-[14px] font-bold uppercase tracking-wider text-blue-600 select-none">
                  {SOLUTIONS_HERO_DATA.eyebrow}
                </span>
              </div>

              {/* Main Heading: 46–54px desktop, 34–40px mobile */}
              <h1 className="text-[34px] sm:text-[42px] lg:text-[48px] xl:text-[52px] font-extrabold tracking-tight leading-[1.14] text-[#10264b]">
                {SOLUTIONS_HERO_DATA.titleStart}{' '}
                <span className="text-[#7139e8]">{SOLUTIONS_HERO_DATA.titleHighlight}</span>
              </h1>

              {/* Supporting Text: 17–18px Desktop, 16px Mobile */}
              <p className="text-[16px] sm:text-[17px] lg:text-[18px] text-[#354765] leading-relaxed max-w-2xl font-normal">
                {SOLUTIONS_HERO_DATA.description}
              </p>

              {/* Dual Action CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Button
                  href="#overview"
                  variant="primary"
                  size="lg"
                  className="text-[16px] sm:text-[17px] font-semibold px-7 py-3.5 shadow-md shadow-blue-600/20 bg-[#0878f9] hover:bg-blue-700"
                  icon={<ArrowRight className="w-5 h-5" />}
                >
                  {SOLUTIONS_HERO_DATA.primaryCtaText}
                </Button>

                <Button
                  onClick={() => setIsModalOpen(true)}
                  variant="secondary"
                  size="lg"
                  className="text-[16px] sm:text-[17px] font-semibold px-7 py-3.5"
                >
                  {SOLUTIONS_HERO_DATA.secondaryCtaText}
                </Button>
              </div>
            </div>

            {/* Right Column: Office Workspace Monitor with 4 Floating Brand Badges */}
            <div className="lg:col-span-5 relative">
              <div className="relative w-full rounded-2xl overflow-hidden shadow-xl border border-slate-200/90 bg-white">
                <img
                  src={SOLUTIONS_HERO_DATA.imageSrc}
                  onError={(e) => {
                    e.currentTarget.src = SOLUTIONS_HERO_DATA.fallbackImageSrc;
                  }}
                  alt="Modern Enterprise Workstation Monitor Showing ERP Analytics"
                  className="w-full h-auto object-cover max-h-[390px]"
                />

                {/* 4 Floating Badges Matching Reference Mockup */}
                {/* 1. SAP Business One (Top Left) */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md rounded-xl p-2 sm:p-2.5 shadow-md border border-slate-200/90 flex items-center gap-2">
                  <div className="h-6 flex items-center">
                    <SAPBusinessOneLogo />
                  </div>
                </div>

                {/* 2. Boyum IT (Top Right) */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md rounded-xl p-2 sm:p-2.5 shadow-md border border-slate-200/90 flex items-center gap-2">
                  <div className="h-6 flex items-center">
                    <BoyumITLogo />
                  </div>
                </div>

                {/* 3. UiPath (Bottom Left) */}
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md rounded-xl p-2 sm:p-2.5 shadow-md border border-slate-200/90 flex items-center gap-2">
                  <div className="h-6 flex items-center">
                    <UiPathLogo />
                  </div>
                </div>

                {/* 4. ATLAS Add-ons (Bottom Right) */}
                <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md rounded-xl p-2 sm:p-2.5 shadow-md border border-slate-200/90 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-cyan-50 border border-cyan-200 text-cyan-600 flex items-center justify-center shrink-0">
                    <Boxes className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-[11px] font-bold text-slate-900 leading-tight">
                    ATLAS <span className="text-cyan-600">Add-ons</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: COMPANY METRICS BAR (4 CLEAN SEPARATED CARDS)                  */}
      {/* ========================================================================= */}
      <section id="metrics" className="py-6 sm:py-8 bg-white border-b border-slate-100">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl sm:rounded-2xl bg-white border border-slate-200/90 shadow-sm p-4 sm:p-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
              {ABOUT_METRICS_DATA.map((metric) => (
                <div key={metric.id} className="pt-3 sm:pt-0 first:pt-0 flex flex-col items-center text-center p-3 sm:p-4">
                  
                  {/* Colored Icon Circle */}
                  <div className={`w-10 h-10 rounded-full border flex items-center justify-center mb-2 mx-auto ${
                    metric.color === 'blue' ? 'bg-blue-50 border-blue-200 text-[#0878f9]' :
                    metric.color === 'green' ? 'bg-emerald-50 border-emerald-200 text-[#10b981]' :
                    metric.color === 'purple' ? 'bg-purple-50 border-purple-200 text-[#7139e8]' :
                    'bg-orange-50 border-orange-200 text-[#f28a24]'
                  }`}>
                    {metric.iconName === 'Users' && <Users className="w-5 h-5" />}
                    {metric.iconName === 'TrendingUp' && <TrendingUp className="w-5 h-5" />}
                    {metric.iconName === 'Database' && <Database className="w-5 h-5" />}
                    {metric.iconName === 'Award' && <Award className="w-5 h-5" />}
                  </div>

                  {/* Metric Numeric Value */}
                  <div className={`text-[32px] sm:text-[36px] lg:text-[40px] font-extrabold tracking-tight leading-none mb-1 ${
                    metric.color === 'blue' ? 'text-[#0878f9]' :
                    metric.color === 'green' ? 'text-[#10b981]' :
                    metric.color === 'purple' ? 'text-[#7139e8]' :
                    'text-[#f28a24]'
                  }`}>
                    {metric.value}
                  </div>

                  {/* Bold Label */}
                  <div className="text-[15px] sm:text-[16px] font-bold text-[#10264b] leading-snug">
                    {metric.label}
                  </div>

                  {/* Small Supporting Description */}
                  <div className="text-[12px] sm:text-[13px] text-slate-500 leading-snug mt-0.5">
                    {metric.sublabel}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: TECHNOLOGY SOLUTIONS FOR EVERY BUSINESS NEED (5 CARDS)         */}
      {/* ========================================================================= */}
      <section id="overview" className="py-12 sm:py-16 lg:py-20 bg-white border-b border-slate-100">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionHeading
            badge="OUR SOLUTIONS —"
            title="Technology Solutions for Every Business Need"
            subtitle="A comprehensive range of enterprise solutions to help businesses streamline processes, and achieve long-term growth."
            align="center"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 lg:gap-4 xl:gap-5">
            {SOLUTIONS_OVERVIEW_CARDS.map((card) => (
              <div
                key={card.id}
                className="group flex flex-col justify-between rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                {/* Header Image */}
                <div className="relative w-full h-32 sm:h-36 overflow-hidden bg-slate-100 border-b border-slate-100">
                  <img
                    src={card.imageSrc}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Card Body */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-2 mb-4">
                    {/* Badge / Logo */}
                    <div className="h-7 flex items-center">
                      {card.badgeType === 'sap' && <SAPBusinessOneLogo />}
                      {card.badgeType === 'boyum' && <BoyumITLogo />}
                      {card.badgeType === 'uipath' && <UiPathLogo />}
                      {card.badgeType === 'atlas' && (
                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                          <Boxes className="w-4 h-4 text-emerald-600" />
                          <span>ATLAS Add-ons</span>
                        </div>
                      )}
                      {card.badgeType === 'ecosystem' && (
                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                          <Layers className="w-4 h-4 text-blue-600" />
                          <span>Ecosystem</span>
                        </div>
                      )}
                    </div>

                    <h3 className="text-[17px] sm:text-[18px] font-bold text-[#10264b] group-hover:text-blue-600 transition-colors leading-snug">
                      {card.title}
                    </h3>

                    <p className="text-[13px] sm:text-[14px] text-slate-600 leading-snug">
                      {card.description}
                    </p>
                  </div>

                  {/* Footer Learn More Link with Circular Button */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <a
                      href={card.linkHref}
                      className="text-[13px] sm:text-[14px] font-semibold text-blue-600 group-hover:text-blue-700 transition-colors flex items-center gap-1.5"
                    >
                      <span>Learn More</span>
                    </a>
                    
                    <a
                      href={card.linkHref}
                      className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                        card.color === 'blue' ? 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white' :
                        card.color === 'coral' ? 'bg-rose-50 text-rose-600 group-hover:bg-rose-600 group-hover:text-white' :
                        card.color === 'purple' ? 'bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white' :
                        card.color === 'emerald' ? 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white' :
                        'bg-sky-50 text-sky-600 group-hover:bg-sky-600 group-hover:text-white'
                      }`}
                      aria-label={`Learn more about ${card.title}`}
                    >
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: DEEP DIVE — SAP BUSINESS ONE (ONE PLATFORM FOR SMARTER MGMT)   */}
      {/* ========================================================================= */}
      <section id="sap-b1-section" className="py-12 sm:py-16 lg:py-20 bg-slate-50/60 border-b border-slate-100">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center">
            
            {/* Left Content (4.5 cols) */}
            <div className="lg:col-span-5 space-y-4 text-left">
              <span className="text-[13px] font-bold uppercase tracking-wider text-blue-600 block">
                {SAP_B1_DEEP_DIVE.eyebrow}
              </span>
              
              <div className="h-8 flex items-center mb-1">
                <SAPBusinessOneLogo />
              </div>

              <h2 className="text-[26px] sm:text-[32px] lg:text-[34px] font-bold text-[#10264b] tracking-tight leading-tight">
                {SAP_B1_DEEP_DIVE.heading}
              </h2>

              <p className="text-[15px] sm:text-[16px] text-[#354765] leading-relaxed">
                {SAP_B1_DEEP_DIVE.description}
              </p>

              {/* Checklist */}
              <div className="space-y-2.5 pt-1">
                {SAP_B1_DEEP_DIVE.checklist.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[14px] sm:text-[15px] font-medium text-slate-800">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <Button
                  onClick={() => setIsModalOpen(true)}
                  variant="primary"
                  size="md"
                  className="text-[15px] sm:text-[16px] font-semibold px-6 py-3 bg-[#0878f9] hover:bg-blue-700 shadow-md shadow-blue-600/20"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  {SAP_B1_DEEP_DIVE.ctaText}
                </Button>
              </div>
            </div>

            {/* Center Monitor Image (4 cols) */}
            <div className="lg:col-span-4 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200/90 bg-white">
                <img
                  src={SAP_B1_DEEP_DIVE.imageSrc}
                  alt="SAP Business One Enterprise Management Monitor"
                  className="w-full h-auto object-cover max-h-[350px]"
                />
              </div>
            </div>

            {/* Right Column: Key Benefits (3.5 cols) */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="text-[16px] sm:text-[17px] font-bold text-[#10264b] mb-3 text-left">
                Key Benefits
              </h4>
              <div className="space-y-3">
                {SAP_B1_DEEP_DIVE.keyBenefits.map((b) => (
                  <div
                    key={b.id}
                    className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-3 text-left hover:border-blue-300 transition-colors"
                  >
                    <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center shrink-0">
                      {b.iconName === 'Database' && <Database className="w-4 h-4" />}
                      {b.iconName === 'LineChart' && <LineChart className="w-4 h-4" />}
                      {b.iconName === 'Zap' && <Zap className="w-4 h-4" />}
                      {b.iconName === 'TrendingUp' && <TrendingUp className="w-4 h-4" />}
                    </div>
                    <span className="text-[13px] sm:text-[14px] font-bold text-[#10264b] leading-tight">
                      {b.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: DEEP DIVE — BOYUM IT SOLUTIONS (EXTEND SAP BUSINESS ONE)       */}
      {/* ========================================================================= */}
      <section id="boyum-section" className="py-12 sm:py-16 lg:py-20 bg-white border-b border-slate-100">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center">
            
            {/* Left Content (4 cols) */}
            <div className="lg:col-span-4 space-y-4 text-left">
              <span className="text-[13px] font-bold uppercase tracking-wider text-blue-600 block">
                {BOYUM_IT_DEEP_DIVE.eyebrow}
              </span>

              <h2 className="text-[26px] sm:text-[32px] font-bold text-[#10264b] tracking-tight leading-tight">
                {BOYUM_IT_DEEP_DIVE.title}
              </h2>

              <h3 className="text-[17px] sm:text-[18px] font-semibold text-slate-700 leading-snug">
                {BOYUM_IT_DEEP_DIVE.subtitle}
              </h3>

              <p className="text-[15px] sm:text-[16px] text-[#354765] leading-relaxed">
                {BOYUM_IT_DEEP_DIVE.description}
              </p>

              <div className="pt-2">
                <Button
                  href="#contact-cta"
                  variant="primary"
                  size="md"
                  className="text-[15px] sm:text-[16px] font-semibold px-6 py-3 bg-[#0878f9] hover:bg-blue-700 shadow-md shadow-blue-600/20"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  {BOYUM_IT_DEEP_DIVE.ctaText}
                </Button>
              </div>
            </div>

            {/* Right 3 Module Cards (8 cols) */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-5">
              {BOYUM_IT_DEEP_DIVE.modules.map((mod) => (
                <div
                  key={mod.id}
                  className="group rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col justify-between"
                >
                  {/* Top Image */}
                  <div className="relative w-full h-32 overflow-hidden bg-slate-100 border-b border-slate-100">
                    <img
                      src={mod.imageSrc}
                      onError={(e) => {
                        e.currentTarget.src = "/images/crystal_hd/ind_warehouse.jpg";
                      }}
                      alt={mod.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Body Content */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                    <div className="space-y-2 mb-3">
                      <div className="flex items-center gap-2">
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                          mod.color === 'orange' ? 'bg-orange-50 text-orange-600' :
                          mod.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' :
                          'bg-purple-50 text-purple-600'
                        }`}>
                          {mod.id === 'beas' && <Factory className="w-4 h-4" />}
                          {mod.id === 'produmex' && <Boxes className="w-4 h-4" />}
                          {mod.id === 'b1up' && <Cog className="w-4 h-4" />}
                        </div>
                        <h4 className="text-[16px] sm:text-[17px] font-bold text-[#10264b] leading-snug">
                          {mod.title}
                        </h4>
                      </div>

                      <p className="text-[13px] text-slate-600 leading-snug">
                        {mod.subtitle}
                      </p>
                    </div>

                    {/* Footer Link with Button */}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <a
                        href={mod.linkHref}
                        className="text-[13px] font-semibold text-blue-600 group-hover:text-blue-700 transition-colors"
                      >
                        Learn More
                      </a>
                      <a
                        href={mod.linkHref}
                        className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                          mod.color === 'orange' ? 'bg-orange-50 text-orange-600 group-hover:bg-orange-600 group-hover:text-white' :
                          mod.color === 'emerald' ? 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white' :
                          'bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white'
                        }`}
                        aria-label={`Learn more about ${mod.title}`}
                      >
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6: DEEP DIVE — UIPATH RPA & AI AUTOMATION                         */}
      {/* ========================================================================= */}
      <section id="uipath-section" className="py-12 sm:py-16 lg:py-20 bg-slate-50/60 border-b border-slate-100">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center">
            
            {/* Left Content (4 cols) */}
            <div className="lg:col-span-4 space-y-4 text-left">
              <span className="text-[13px] font-bold uppercase tracking-wider text-blue-600 block">
                {UIPATH_RPA_DEEP_DIVE.eyebrow}
              </span>

              <div className="h-8 flex items-center mb-1">
                <UiPathLogo />
              </div>

              <h2 className="text-[26px] sm:text-[30px] font-bold text-[#10264b] tracking-tight leading-tight">
                {UIPATH_RPA_DEEP_DIVE.title}
              </h2>

              <h3 className="text-[16px] sm:text-[17px] font-semibold text-slate-700 leading-snug">
                {UIPATH_RPA_DEEP_DIVE.subtitle}
              </h3>

              <p className="text-[15px] sm:text-[16px] text-[#354765] leading-relaxed">
                {UIPATH_RPA_DEEP_DIVE.description}
              </p>

              <div className="pt-2">
                <Button
                  onClick={() => setIsModalOpen(true)}
                  variant="primary"
                  size="md"
                  className="text-[15px] sm:text-[16px] font-semibold px-6 py-3 bg-[#0878f9] hover:bg-blue-700 shadow-md shadow-blue-600/20"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  {UIPATH_RPA_DEEP_DIVE.ctaText}
                </Button>
              </div>
            </div>

            {/* Center Robot Visual (4 cols) */}
            <div className="lg:col-span-4 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200/90 bg-white">
                <img
                  src={UIPATH_RPA_DEEP_DIVE.imageSrc}
                  onError={(e) => {
                    e.currentTarget.src = "/images/about/about_expertise_hub.jpg";
                  }}
                  alt="UiPath Robotic Process Automation with AI Humanoid"
                  className="w-full h-auto object-cover max-h-[350px]"
                />
              </div>
            </div>

            {/* Right Column: Key Automation Areas 2x2 Grid (4 cols) */}
            <div className="lg:col-span-4 space-y-3">
              <h4 className="text-[16px] sm:text-[17px] font-bold text-[#10264b] mb-3 text-left">
                Key Automation Areas
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {UIPATH_RPA_DEEP_DIVE.areas.map((area) => (
                  <div
                    key={area.id}
                    className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between text-left hover:border-blue-300 transition-colors"
                  >
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-2.5 shrink-0 ${
                      area.color === 'purple' ? 'bg-purple-50 text-[#7139e8] border border-purple-200' :
                      area.color === 'sky' ? 'bg-sky-50 text-[#0284c7] border border-sky-200' :
                      area.color === 'orange' ? 'bg-orange-50 text-[#f28a24] border border-orange-200' :
                      'bg-rose-50 text-[#f43f5e] border border-rose-200'
                    }`}>
                      {area.iconName === 'Cog' && <Cog className="w-4 h-4" />}
                      {area.iconName === 'TrendingUp' && <TrendingUp className="w-4 h-4" />}
                      {area.iconName === 'Clock' && <Clock className="w-4 h-4" />}
                      {area.iconName === 'Cpu' && <Cpu className="w-4 h-4" />}
                    </div>

                    <div>
                      <h5 className="text-[14px] sm:text-[15px] font-bold text-[#10264b] leading-snug">
                        {area.title}
                      </h5>
                      <p className="text-[12px] text-slate-500 leading-snug mt-0.5">
                        {area.subtitle}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 7: ATLAS PROPRIETARY ADD-ONS (5 CARDS)                            */}
      {/* ========================================================================= */}
      <section id="atlas-addons-section" className="py-12 sm:py-16 lg:py-20 bg-white border-b border-slate-100">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 text-left">
            <div>
              <span className="text-[13px] font-bold uppercase tracking-wider text-blue-600 block mb-1">
                {ATLAS_ADDONS_DEEP_DIVE.eyebrow}
              </span>
              <h2 className="text-[26px] sm:text-[32px] lg:text-[36px] font-bold text-[#10264b] tracking-tight leading-tight">
                {ATLAS_ADDONS_DEEP_DIVE.title}
              </h2>
              <p className="text-[15px] sm:text-[16px] text-[#354765] max-w-2xl mt-1 leading-relaxed">
                {ATLAS_ADDONS_DEEP_DIVE.description}
              </p>
            </div>

            <Button
              href="#contact-cta"
              variant="primary"
              size="md"
              className="text-[15px] font-semibold px-6 py-3 shrink-0 bg-[#0878f9] hover:bg-blue-700 shadow-md shadow-blue-600/20"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              {ATLAS_ADDONS_DEEP_DIVE.ctaText}
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {ATLAS_ADDONS_DEEP_DIVE.items.map((item) => (
              <div
                key={item.id}
                className="group rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                {/* Image */}
                <div className="relative w-full h-28 sm:h-32 overflow-hidden bg-slate-100 border-b border-slate-100">
                  <img
                    src={item.imageSrc}
                    onError={(e) => {
                      e.currentTarget.src = "/images/crystal_hd/ind_shipping.jpg";
                    }}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Card Body */}
                <div className="p-4 flex-1 flex flex-col justify-between text-left">
                  <div className="space-y-1.5 mb-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                        item.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                        item.color === 'cyan' ? 'bg-cyan-50 text-cyan-600' :
                        item.color === 'orange' ? 'bg-orange-50 text-orange-600' :
                        item.color === 'purple' ? 'bg-purple-50 text-purple-600' :
                        'bg-rose-50 text-rose-600'
                      }`}>
                        {item.id === 'freight-trading' && <Ship className="w-4 h-4" />}
                        {item.id === 'gate-entry' && <Scale className="w-4 h-4" />}
                        {item.id === 'wms-vendor' && <Boxes className="w-4 h-4" />}
                        {item.id === 'shipping-auto' && <Truck className="w-4 h-4" />}
                        {item.id === 'rpa-sales' && <Handshake className="w-4 h-4" />}
                      </div>
                      <h4 className="text-[15px] sm:text-[16px] font-bold text-[#10264b] leading-snug">
                        {item.title}
                      </h4>
                    </div>

                    <p className="text-[12px] sm:text-[13px] text-slate-600 leading-snug">
                      {item.subtitle}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-end">
                    <a
                      href="#contact-cta"
                      className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                        item.color === 'blue' ? 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white' :
                        item.color === 'cyan' ? 'bg-cyan-50 text-cyan-600 group-hover:bg-cyan-600 group-hover:text-white' :
                        item.color === 'orange' ? 'bg-orange-50 text-orange-600 group-hover:bg-orange-600 group-hover:text-white' :
                        item.color === 'purple' ? 'bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white' :
                        'bg-rose-50 text-rose-600 group-hover:bg-rose-600 group-hover:text-white'
                      }`}
                      aria-label={`Inquire about ${item.title}`}
                    >
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 8: SOLUTIONS DESIGNED AROUND YOUR INDUSTRY (4 CARDS)              */}
      {/* ========================================================================= */}
      <section id="industries" className="py-12 sm:py-16 lg:py-20 bg-slate-50/60 border-b border-slate-100">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
            <span className="text-[13px] font-bold uppercase tracking-wider text-blue-600 block mb-2">
              INDUSTRIES WE SERVE —
            </span>
            <h2 className="text-[28px] sm:text-[34px] lg:text-[38px] font-bold text-[#10264b] tracking-tight leading-tight">
              Solutions Designed Around <span className="text-[#7139e8]">Your Industry</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {SOLUTIONS_INDUSTRIES_DATA.map((ind) => (
              <div
                key={ind.id}
                className="group flex flex-col justify-between rounded-xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 overflow-hidden"
              >
                {/* Header Image */}
                <div className="relative w-full h-28 sm:h-32 overflow-hidden bg-slate-100 border-b border-slate-200/90">
                  <img
                    src={ind.imageSrc}
                    alt={ind.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Card Content Bar */}
                <div className="p-3.5 sm:p-4 flex-1 flex items-center justify-between gap-3 text-left">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="shrink-0">
                        {industryIcons[ind.id]}
                      </div>
                      <h3 className="text-[16px] sm:text-[17px] font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                        {ind.title}
                      </h3>
                    </div>
                    <p className="text-[13px] text-slate-600 leading-snug">
                      {ind.description}
                    </p>
                  </div>

                  {/* Circular Arrow Button */}
                  <div className="w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-200 shadow-xs">
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 9: CONTACT CTA ("LET'S FIND THE RIGHT SOLUTION")                   */}
      {/* ========================================================================= */}
      <section id="contact-cta" className="py-10 sm:py-12 lg:py-14 bg-white">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="rounded-2xl bg-[#eaf4ff] border border-blue-200/90 p-6 sm:p-8 lg:p-10 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              
              {/* Left Column: Heading, Subtext & CTA Button */}
              <div className="lg:col-span-5 space-y-4 text-left">
                <span className="text-[12px] font-bold uppercase tracking-wider text-blue-600 block">
                  {SOLUTIONS_CONTACT_CTA_DATA.eyebrow}
                </span>
                <h2 className="text-[26px] sm:text-[32px] lg:text-[36px] font-bold text-[#10264b] tracking-tight leading-tight">
                  {SOLUTIONS_CONTACT_CTA_DATA.titleStart}{' '}
                  <span className="text-[#7139e8]">{SOLUTIONS_CONTACT_CTA_DATA.titleHighlight}</span>
                </h2>
                
                <p className="text-[15px] sm:text-[17px] text-[#354765] leading-relaxed max-w-lg">
                  {SOLUTIONS_CONTACT_CTA_DATA.description}
                </p>

                <div className="pt-2">
                  <Button
                    onClick={() => setIsModalOpen(true)}
                    variant="primary"
                    size="lg"
                    className="text-[16px] sm:text-[17px] font-semibold px-8 py-3.5 shadow-md shadow-blue-600/25 bg-[#0878f9] hover:bg-blue-700"
                    icon={<ArrowRight className="w-5 h-5" />}
                  >
                    {SOLUTIONS_CONTACT_CTA_DATA.buttonText}
                  </Button>
                </div>
              </div>

              {/* Right Column: 3 Contact Info Cards matching reference screenshot */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                
                {/* Email Box Card */}
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white border-2 border-[#16b978] shadow-sm hover:shadow-md transition-all">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-100 text-[#0878f9] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 text-left">
                    <span className="text-[12px] font-bold uppercase tracking-wider text-slate-400 block leading-tight">
                      Email
                    </span>
                    <a
                      href={`mailto:${BRAND_INFO.contact.email}`}
                      className="text-[13px] sm:text-[13.5px] font-bold text-slate-900 hover:text-blue-600 transition-colors truncate block leading-snug"
                    >
                      {BRAND_INFO.contact.email}
                    </a>
                  </div>
                </div>

                {/* Phone Box Card */}
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white border-2 border-[#2992ff] shadow-sm hover:shadow-md transition-all">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-100 text-[#0878f9] flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 text-left">
                    <span className="text-[12px] font-bold uppercase tracking-wider text-slate-400 block leading-tight">
                      Phone
                    </span>
                    <a
                      href={BRAND_INFO.contact.whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[13px] sm:text-[13.5px] font-bold text-slate-900 hover:text-blue-600 transition-colors truncate block leading-snug"
                    >
                      {BRAND_INFO.contact.phone}
                    </a>
                  </div>
                </div>

                {/* Locations Box Card */}
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white border-2 border-[#a34dff] shadow-sm hover:shadow-md transition-all">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-100 text-[#0878f9] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 text-left">
                    <span className="text-[12px] font-bold uppercase tracking-wider text-slate-400 block leading-tight">
                      Locations
                    </span>
                    <span className="text-[12.5px] sm:text-[13px] font-bold text-slate-900 block leading-tight">
                      Borivali, Mumbai<br className="hidden sm:inline" /> Marine Lines, Mumbai
                    </span>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* INTERACTIVE CONSULTATION BOOKING MODAL                                    */}
      {/* ========================================================================= */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setIsSuccessSubmitted(false);
        }}
        title="Book a Solutions Consultation with ATLAS Technosoft"
      >
        {!isSuccessSubmitted ? (
          <form onSubmit={handleFormSubmit} noValidate className="space-y-4">
            <p className="text-[14px] text-slate-600 mb-2">
              Explore how SAP Business One, Boyum IT, and UiPath RPA can transform your operations.
            </p>

            <div>
              <label htmlFor="fullName" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="e.g. Rajesh Sharma"
                className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
                  formErrors.fullName ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300 focus:ring-blue-500/20 focus:border-blue-500'
                }`}
              />
              {formErrors.fullName && <p className="mt-1 text-xs text-rose-600">{formErrors.fullName}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="companyName" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Company Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  placeholder="e.g. Apex Manufacturing Ltd"
                  className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
                    formErrors.companyName ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300 focus:ring-blue-500/20 focus:border-blue-500'
                  }`}
                />
                {formErrors.companyName && <p className="mt-1 text-xs text-rose-600">{formErrors.companyName}</p>}
              </div>

              <div>
                <label htmlFor="workEmail" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Work Email <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  id="workEmail"
                  name="workEmail"
                  value={formData.workEmail}
                  onChange={handleInputChange}
                  placeholder="e.g. rajesh@apex.com"
                  className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
                    formErrors.workEmail ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300 focus:ring-blue-500/20 focus:border-blue-500'
                  }`}
                />
                {formErrors.workEmail && <p className="mt-1 text-xs text-rose-600">{formErrors.workEmail}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="phoneNumber" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Phone / WhatsApp <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="e.g. +91 98200 12345"
                  className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
                    formErrors.phoneNumber ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300 focus:ring-blue-500/20 focus:border-blue-500'
                  }`}
                />
                {formErrors.phoneNumber && <p className="mt-1 text-xs text-rose-600">{formErrors.phoneNumber}</p>}
              </div>

              <div>
                <label htmlFor="areaOfInterest" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Solution of Interest
                </label>
                <select
                  id="areaOfInterest"
                  name="areaOfInterest"
                  value={formData.areaOfInterest}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                >
                  <option value="sap-b1">SAP Business One ERP</option>
                  <option value="boyum">Boyum IT Solutions (Beas / WMS)</option>
                  <option value="uipath-rpa">UiPath RPA & Automation</option>
                  <option value="atlas-addons">ATLAS Proprietary Add-ons</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Requirements / Goals <span className="text-rose-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={3}
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Briefly describe your ERP needs or operational bottlenecks..."
                className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
                  formErrors.message ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300 focus:ring-blue-500/20 focus:border-blue-500'
                }`}
              />
              {formErrors.message && <p className="mt-1 text-xs text-rose-600">{formErrors.message}</p>}
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              disabled={isSubmitting}
              icon={isSubmitting ? undefined : <Send className="w-4 h-4" />}
            >
              {isSubmitting ? 'Validating...' : 'Submit Solutions Request'}
            </Button>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold block">Solutions Inquiry Validated!</strong>
                Your details are validated. You can send this directly via Email or WhatsApp to our solutions team.
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5 text-left">
              <div><strong>Name:</strong> {formData.fullName}</div>
              <div><strong>Company:</strong> {formData.companyName}</div>
              <div><strong>Work Email:</strong> {formData.workEmail}</div>
              <div><strong>Phone:</strong> {formData.phoneNumber}</div>
              <div><strong>Message:</strong> {formData.message}</div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <a
                href={generateMailtoLink(formData)}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wider transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>Open Email Draft</span>
              </a>

              <a
                href={`https://wa.me/919372329599?text=${encodeURIComponent(
                  `Hello ATLAS Technosoft, I submitted a solutions consultation request for ${formData.companyName}. Name: ${formData.fullName}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Send via WhatsApp</span>
              </a>
            </div>
          </div>
        )}
      </Modal>

      {/* Floating Scroll-to-Top Button */}
      {showScrollTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-30 w-11 h-11 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-xl flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}

    </div>
  );
};
