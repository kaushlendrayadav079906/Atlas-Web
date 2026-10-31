import { Link } from 'react-router-dom';
import { CtaContactCards } from '../components/ui/CtaContactCards';
import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  Check, 
  Mail, 
  Phone, 
  MapPin, 
  ChevronUp, 
  Send,
  Factory,
  Boxes,
  Wrench,
  TrendingUp,
  Eye,
  Zap,
  GitMerge,
  Award,
  ShieldCheck,
  Layers,
  Sparkles,
  Clock,
  ExternalLink
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Modal } from '../components/ui/Modal';
import { BoyumITLogo, SAPBusinessOneLogo } from '../components/ui/PartnerLogos';
import { 
  BOYUM_HERO_DATA,
  BOYUM_METRICS_DATA,
  BOYUM_INTRO_DATA,
  BOYUM_PRODUCTS_DATA,
  BOYUM_BENEFITS_DATA,
  BOYUM_PROCESS_DATA,
  BOYUM_INDUSTRIES_DATA,
  BOYUM_CTA_DATA,
  BoyumProductCard
} from '../data/boyumItContent';
import { BRAND_INFO } from '../data/websiteContent';
import { ContactFormData } from '../types';

export const BoyumITPage: React.FC = () => {
  // Modal & Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<BoyumProductCard | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    companyName: '',
    workEmail: '',
    phoneNumber: '',
    areaOfInterest: 'boyum',
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
    } else if (!/^\+?[0-9\s\-()]{8,20}$/.test(formData.phoneNumber.trim())) {
      errors.phoneNumber = 'Please enter a valid phone number';
    }
    if (!formData.message.trim()) errors.message = 'Please provide a brief description of your requirements';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccessSubmitted(true);
    }, 400);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name as keyof ContactFormData]) {
      setFormErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const openProductModal = (product: BoyumProductCard) => {
    setSelectedProduct(product);
    setFormData(prev => ({
      ...prev,
      areaOfInterest: product.id,
      message: `Inquiring about ${product.name} implementation for SAP Business One.`
    }));
    setIsModalOpen(true);
  };

  const generateMailtoLink = (data: ContactFormData) => {
    const subject = encodeURIComponent(`Boyum IT Consultation Request: ${data.companyName || 'Inquiry'}`);
    const body = encodeURIComponent(
      `Name: ${data.fullName}\n` +
      `Company: ${data.companyName}\n` +
      `Work Email: ${data.workEmail}\n` +
      `Phone: ${data.phoneNumber}\n` +
      `Product Interest: ${data.areaOfInterest}\n\n` +
      `Message / Requirements:\n${data.message}`
    );
    return `mailto:${BRAND_INFO.contact.email}?subject=${subject}&body=${body}`;
  };

  const renderBenefitIcon = (iconName: string) => {
    switch (iconName) {
      case 'TrendingUp': return <TrendingUp className="w-5 h-5" />;
      case 'Factory': return <Factory className="w-5 h-5" />;
      case 'Eye': return <Eye className="w-5 h-5" />;
      case 'Zap': return <Zap className="w-5 h-5" />;
      case 'GitMerge': return <GitMerge className="w-5 h-5" />;
      case 'Award': return <Award className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#45546B]">
      
      {/* ========================================================================= */}
      {/* SECTION 1: HERO SECTION                                                   */}
      {/* ========================================================================= */}
      <section className="relative pt-10 pb-14 sm:pb-16 lg:pt-14 lg:pb-20 overflow-hidden bg-white border-b border-slate-100">
        
        {/* Subtle background decoration */}
        <div className="absolute inset-0 bg-dot-pattern opacity-40 pointer-events-none" />
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -right-32 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Heading and CTAs */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* Eyebrow Label */}
              <div className="inline-flex items-center gap-2">
                <span className="text-[13px] sm:text-[14px] font-bold uppercase tracking-wider text-[#1B72E8] select-none">
                  {BOYUM_HERO_DATA.eyebrow}
                </span>
              </div>

              {/* Main Hero Heading */}
              <h1 className="font-serif text-[36px] sm:text-[44px] lg:text-[50px] xl:text-[54px] font-bold tracking-tight leading-[1.14] text-[#142B59]">
                {BOYUM_HERO_DATA.titleStart}{' '}
                <span className="bg-gradient-to-r from-[#0052CC] via-[#0066CC] to-[#0A66C2] bg-clip-text text-transparent">
                  {BOYUM_HERO_DATA.titleHighlight}
                </span>
              </h1>

              {/* Description */}
              <p className="text-[16px] sm:text-[18px] lg:text-[19px] text-[#45546B] leading-relaxed max-w-2xl font-normal">
                {BOYUM_HERO_DATA.description}
              </p>

              {/* Dual Action CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="#products"
                  className="inline-flex items-center justify-center gap-2 text-[16px] font-semibold px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#0052CC] to-[#0A66C2] hover:from-[#0040A8] hover:to-[#08529C] text-white shadow-md shadow-blue-500/25 transition-all duration-200 cursor-pointer"
                >
                  <span>{BOYUM_HERO_DATA.primaryCtaText}</span>
                  <ArrowRight className="w-5 h-5" />
                </a>

                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center justify-center gap-2 text-[16px] font-semibold px-8 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-[#142B59] border border-slate-300 shadow-sm transition-all duration-200 cursor-pointer"
                >
                  <span>{BOYUM_HERO_DATA.secondaryCtaText}</span>
                </button>
              </div>

              {/* Partner Badges Strip */}
              <div className="pt-3 flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-200 text-xs font-bold text-[#1B72E8]">
                  <Award className="w-4 h-4 text-[#1B72E8]" />
                  <span>Boyum IT Silver Partner</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-200 text-xs font-bold text-[#0066CC]">
                  <Layers className="w-4 h-4 text-[#0066CC]" />
                  <span>320+ Modules Deployed</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs font-bold text-[#10b981]">
                  <CheckCircle2 className="w-4 h-4 text-[#10b981]" />
                  <span>99.9% Inventory Accuracy</span>
                </div>
              </div>

            </div>

            {/* Right Column: Hero Visual with Partner Logo Badge */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200/90 bg-white group">
                <img
                  src={BOYUM_HERO_DATA.heroImage}
                  alt="Boyum IT Solutions for SAP Business One Warehouse and Manufacturing"
                  className="w-full h-auto object-cover max-h-[420px] group-hover:scale-105 transition-transform duration-700"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />

                {/* Floating Partner Ribbon */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-xl p-3 shadow-lg border border-slate-200/90 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <BoyumITLogo className="h-6 sm:h-7" />
                    <div className="h-5 w-px bg-slate-300" />
                    <SAPBusinessOneLogo className="h-6 sm:h-7" />
                  </div>
                  <span className="text-[11px] sm:text-[12px] font-bold text-[#142B59] bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
                    Certified Add-on
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 1.5: METRICS STRIP                                                */}
      {/* ========================================================================= */}
      <section className="py-6 sm:py-8 bg-white border-b border-slate-100">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl sm:rounded-2xl bg-white border border-slate-200/90 shadow-sm p-4 sm:p-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
              {BOYUM_METRICS_DATA.map((metric) => (
                <div key={metric.id} className="pt-3 sm:pt-0 first:pt-0 flex flex-col items-center text-center p-2 sm:p-3">
                  <div className={`text-[32px] sm:text-[38px] lg:text-[42px] font-extrabold tracking-tight leading-none mb-1 text-[${metric.color}]`}>
                    <span style={{ color: metric.color }}>{metric.value}</span>
                  </div>
                  <div className="text-[14px] sm:text-[15px] font-bold text-[#142B59] leading-snug">
                    {metric.label}
                  </div>
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
      {/* SECTION 2: INTRODUCTION (TWO-COLUMN EXPLAINER)                             */}
      {/* ========================================================================= */}
      <section id="introduction" className="py-14 sm:py-16 lg:py-20 bg-[#f4f9ff]/60 border-b border-slate-100">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Descriptive Content */}
            <div className="lg:col-span-6 space-y-5 text-left">
              <div>
                <span className="text-[13px] sm:text-[14px] font-bold uppercase tracking-wider text-[#1B72E8] block mb-2 select-none">
                  {BOYUM_INTRO_DATA.eyebrow}
                </span>
                <h2 className="font-serif text-[28px] sm:text-[34px] lg:text-[40px] font-bold text-[#142B59] tracking-tight leading-tight">
                  {BOYUM_INTRO_DATA.titleStart}{' '}
                  <span className="bg-gradient-to-r from-[#0052CC] via-[#0066CC] to-[#0A66C2] bg-clip-text text-transparent">
                    {BOYUM_INTRO_DATA.titleHighlight}
                  </span>
                </h2>
              </div>

              <p className="text-[16px] sm:text-[17px] text-[#45546B] leading-relaxed">
                {BOYUM_INTRO_DATA.description}
              </p>

              <p className="text-[15px] sm:text-[16px] text-[#45546B] leading-relaxed">
                {BOYUM_INTRO_DATA.secondaryParagraph}
              </p>

              {/* Key Bullet Points */}
              <div className="space-y-3 pt-2">
                {BOYUM_INTRO_DATA.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-r from-[#0052CC] to-[#0A66C2] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[15px] sm:text-[16px] font-medium text-[#172B50]">
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <Button
                  onClick={() => setIsModalOpen(true)}
                  variant="primary"
                  size="md"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Schedule Solution Walkthrough
                </Button>
              </div>

            </div>

            {/* Right Column: Integration Visual with Floating Badge */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200/90 bg-white">
                <img
                  src={BOYUM_INTRO_DATA.imageSrc}
                  alt="Connected SAP Business One and Boyum IT Ecosystem"
                  className="w-full h-auto object-cover max-h-[380px]"
                />
                
                {/* Floating Badge */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md rounded-xl py-2 px-3.5 shadow-md border border-slate-200/90 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-bold text-[#142B59]">100% Native SAP B1 Integration</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: BOYUM PRODUCT SOLUTIONS (3 ATTRACTIVE PRODUCT CARDS)           */}
      {/* ========================================================================= */}
      <section id="products" className="py-14 sm:py-16 lg:py-20 bg-white border-b border-slate-100">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionHeading
            badge="BOYUM PRODUCT SOLUTIONS"
            title="Complete Add-on Suites for"
            titleHighlight="SAP Business One"
            subtitle="Explore the three flagship Boyum IT solutions designed to transform your manufacturing floor, warehouse logistics, and everyday user efficiency."
            align="center"
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {BOYUM_PRODUCTS_DATA.map((product) => (
              <div
                key={product.id}
                className={`group flex flex-col justify-between rounded-2xl bg-white border-2 ${product.borderColor} ${product.hoverBorderColor} shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden`}
              >
                <div>
                  
                  {/* Top Product Image */}
                  <div className="relative w-full h-48 sm:h-52 overflow-hidden bg-slate-100 border-b border-slate-200/90">
                    <img
                      src={product.imageSrc}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
                    
                    {/* Category Badge on Image */}
                    <div className="absolute bottom-3 left-3">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-white bg-slate-900/80 backdrop-blur-sm px-2.5 py-1 rounded-md border border-white/20">
                        {product.badge}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-4 text-left">
                    
                    <div>
                      <h3 className="font-serif text-[22px] sm:text-[24px] font-bold text-[#142B59] group-hover:text-[#1B72E8] transition-colors leading-snug">
                        {product.name}
                      </h3>
                      <p className="text-[13px] font-semibold text-[#0066CC] mt-1 leading-snug">
                        {product.tagline}
                      </p>
                    </div>

                    <p className="text-[14px] text-[#53647A] leading-relaxed">
                      {product.description}
                    </p>

                    {/* Features List */}
                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      <div className="text-[12px] font-bold uppercase tracking-wider text-slate-400">
                        Core Capabilities
                      </div>
                      <ul className="space-y-2">
                        {product.features.map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-[13px] sm:text-[14px] text-[#172B50]">
                            <CheckCircle2 className="w-4 h-4 text-[#1B72E8] shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* KPI Badges */}
                    <div className="pt-3 flex flex-wrap gap-1.5">
                      {product.kpis.map((kpi, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700"
                        >
                          {kpi}
                        </span>
                      ))}
                    </div>

                  </div>
                </div>

                {/* Card Footer with CTA Button */}
                <div className="p-6 pt-0 border-t border-slate-100 mt-4">
                  <button
                    type="button"
                    onClick={() => openProductModal(product)}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold transition-all duration-200 shadow-sm cursor-pointer bg-gradient-to-r from-[#0052CC] to-[#0A66C2] hover:from-[#0040A8] hover:to-[#08529C] text-white"
                  >
                    <span>Inquire About {product.name}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: KEY BENEFITS (6-CARD GRID)                                     */}
      {/* ========================================================================= */}
      <section id="benefits" className="py-14 sm:py-16 lg:py-20 bg-[#f4f9ff]/60 border-b border-slate-100">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionHeading
            badge={BOYUM_BENEFITS_DATA.eyebrow}
            title={BOYUM_BENEFITS_DATA.titleStart}
            titleHighlight={BOYUM_BENEFITS_DATA.titleHighlight}
            subtitle={BOYUM_BENEFITS_DATA.description}
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BOYUM_BENEFITS_DATA.benefits.map((benefit) => (
              <div
                key={benefit.id}
                className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 text-left space-y-3"
              >
                {/* Colored Icon Circle */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${benefit.bgColor}`}>
                  {renderBenefitIcon(benefit.iconName)}
                </div>

                <h3 className="text-[18px] sm:text-[19px] font-bold text-[#172B50] leading-snug">
                  {benefit.title}
                </h3>

                <p className="text-[14px] text-[#53647A] leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: HOW IT WORKS (FOUR-STEP PROCESS PIPELINE)                       */}
      {/* ========================================================================= */}
      <section id="process" className="py-14 sm:py-16 lg:py-20 bg-white border-b border-slate-100">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionHeading
            badge={BOYUM_PROCESS_DATA.eyebrow}
            title={BOYUM_PROCESS_DATA.titleStart}
            titleHighlight={BOYUM_PROCESS_DATA.titleHighlight}
            subtitle={BOYUM_PROCESS_DATA.description}
            align="center"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 relative pt-2">
            {BOYUM_PROCESS_DATA.steps.map((step, idx) => (
              <div
                key={step.number}
                className="relative flex flex-col items-center text-center p-4 sm:p-5 rounded-2xl bg-[#f8faff] border border-blue-100/80 hover:shadow-md transition-all duration-200"
              >
                {/* Number Badge with Gemini gradient */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#0052CC] to-[#0A66C2] text-white font-extrabold text-[18px] flex items-center justify-center shadow-md shadow-blue-500/20 mb-3.5 shrink-0">
                  {step.number}
                </div>

                <h3 className="text-[17px] sm:text-[18px] font-bold text-[#172B50] mb-2 leading-snug">
                  {step.title}
                </h3>

                <p className="text-[13px] text-[#53647A] leading-relaxed mb-2">
                  {step.description}
                </p>

                <p className="text-[11px] text-slate-400 leading-snug mt-auto pt-2 border-t border-slate-200/60 w-full">
                  {step.detail}
                </p>

                {/* Connecting arrow for desktop */}
                {idx < BOYUM_PROCESS_DATA.steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-10 -right-3 translate-x-1/2 text-slate-300 z-10">
                    <ArrowRight className="w-5 h-5 text-blue-400" />
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6: INDUSTRIES                                                     */}
      {/* ========================================================================= */}
      <section id="industries" className="py-14 sm:py-16 lg:py-20 bg-[#f4f9ff]/60 border-b border-slate-100">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionHeading
            badge={BOYUM_INDUSTRIES_DATA.eyebrow}
            title={BOYUM_INDUSTRIES_DATA.titleStart}
            titleHighlight={BOYUM_INDUSTRIES_DATA.titleHighlight}
            subtitle={BOYUM_INDUSTRIES_DATA.description}
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {BOYUM_INDUSTRIES_DATA.industries.map((ind) => (
              <div
                key={ind.id}
                className={`group flex flex-col justify-between rounded-2xl bg-white border-2 ${ind.borderColor} shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden text-left`}
              >
                <div>
                  {/* Industry Image */}
                  <div className="relative w-full h-44 overflow-hidden bg-slate-100 border-b border-slate-100">
                    <img
                      src={ind.imageSrc}
                      alt={ind.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
                    <span className="absolute bottom-3 left-3 text-xs font-bold uppercase tracking-wider text-white bg-slate-900/80 px-2.5 py-1 rounded-md">
                      {ind.title}
                    </span>
                  </div>

                  <div className="p-5 sm:p-6 space-y-3">
                    <h3 className="font-serif text-[20px] font-bold text-[#142B59] leading-snug">
                      {ind.title}
                    </h3>
                    <p className="text-[14px] text-[#53647A] leading-relaxed">
                      {ind.description}
                    </p>
                    <div className="pt-2 flex items-start gap-2 text-xs font-semibold text-[#1B72E8]">
                      <Check className="w-4 h-4 shrink-0 mt-0.5 text-[#1B72E8]" />
                      <span>{ind.bullet}</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 sm:p-6 pt-0">
                  <button
                    type="button"
                    onClick={() => {
                      setFormData(prev => ({
                        ...prev,
                        message: `Inquiring about Boyum IT solutions for ${ind.title} industry.`
                      }));
                      setIsModalOpen(true);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1B72E8] hover:text-[#1557B0] transition-colors"
                  >
                    <span>Request Industry Assessment</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 7: CONSULTATION CTA BANNER                                        */}
      {/* ========================================================================= */}
      <section id="contact-cta" className="py-14 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="rounded-2xl bg-[#eaf4ff] border border-blue-200/90 p-6 sm:p-8 lg:p-12 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              
              {/* Left Column: Heading, Subtext & CTA Button */}
              <div className="lg:col-span-6 space-y-4 text-left">
                <span className="text-[12px] font-bold uppercase tracking-wider text-[#1B72E8] block select-none">
                  {BOYUM_CTA_DATA.eyebrow}
                </span>

                <h2 className="font-serif text-[26px] sm:text-[32px] lg:text-[38px] font-bold text-[#142B59] tracking-tight leading-tight">
                  {BOYUM_CTA_DATA.titleStart}{' '}
                  <span className="bg-gradient-to-r from-[#0052CC] via-[#0066CC] to-[#0A66C2] bg-clip-text text-transparent">
                    {BOYUM_CTA_DATA.titleHighlight}
                  </span>
                </h2>
                
                <p className="text-[15px] sm:text-[17px] text-[#45546B] leading-relaxed max-w-xl">
                  {BOYUM_CTA_DATA.description}
                </p>

                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <Button
                    onClick={() => setIsModalOpen(true)}
                    variant="primary"
                    size="lg"
                    icon={<ArrowRight className="w-5 h-5" />}
                  >
                    {BOYUM_CTA_DATA.buttonText}
                  </Button>

                  <a
                    href={`mailto:${BRAND_INFO.contact.email}`}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-[#142B59] border border-slate-300 text-[15px] font-semibold shadow-sm transition-all duration-200"
                  >
                    <Mail className="w-4 h-4 text-[#1B72E8]" />
                    <span>{BOYUM_CTA_DATA.secondaryButtonText}</span>
                  </a>
                </div>
              </div>

              {/* Right Column: 3 Clean Contact Info Cards matching reference */}
              <div className="lg:col-span-6">
                <CtaContactCards />
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Global scroll-to-top handled by SiteLayout */}

      {/* ========================================================================= */}
      {/* MODAL: BOOK A CONSULTATION FORM                                           */}
      {/* ========================================================================= */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setIsSuccessSubmitted(false);
          setSelectedProduct(null);
        }}
        title={selectedProduct ? `Consultation: ${selectedProduct.name}` : "Book a Boyum IT Consultation"}
      >
        {!isSuccessSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Speak directly with an ATLAS Technosoft certified Boyum IT specialist. We will evaluate your current SAP Business One workflow and share tailored implementation recommendations.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-[#142B59] mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="e.g. Rahul Sharma"
                  className={`w-full px-3.5 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
                    formErrors.fullName ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300 focus:ring-blue-500/20 focus:border-blue-500'
                  }`}
                />
                {formErrors.fullName && <p className="mt-1 text-xs text-rose-600">{formErrors.fullName}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-[#142B59] mb-1">
                  Company Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  placeholder="e.g. Apex Manufacturing Pvt Ltd"
                  className={`w-full px-3.5 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
                    formErrors.companyName ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300 focus:ring-blue-500/20 focus:border-blue-500'
                  }`}
                />
                {formErrors.companyName && <p className="mt-1 text-xs text-rose-600">{formErrors.companyName}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-[#142B59] mb-1">
                  Work Email <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  name="workEmail"
                  value={formData.workEmail}
                  onChange={handleInputChange}
                  placeholder="rahul@company.com"
                  className={`w-full px-3.5 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
                    formErrors.workEmail ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300 focus:ring-blue-500/20 focus:border-blue-500'
                  }`}
                />
                {formErrors.workEmail && <p className="mt-1 text-xs text-rose-600">{formErrors.workEmail}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-[#142B59] mb-1">
                  Phone Number <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="+91 98765 43210"
                  className={`w-full px-3.5 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
                    formErrors.phoneNumber ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300 focus:ring-blue-500/20 focus:border-blue-500'
                  }`}
                />
                {formErrors.phoneNumber && <p className="mt-1 text-xs text-rose-600">{formErrors.phoneNumber}</p>}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#142B59] mb-1">
                Area of Interest
              </label>
              <select
                name="areaOfInterest"
                value={formData.areaOfInterest}
                onChange={handleInputChange}
                className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
              >
                <option value="boyum">All Boyum IT Solutions</option>
                <option value="beas">Beas Manufacturing (APS / MRP / Shop Floor)</option>
                <option value="produmex">Produmex WMS (Warehouse / RF Barcoding)</option>
                <option value="b1up">B1 Usability Package (B1UP Automation)</option>
                <option value="sap-b1">SAP Business One Core Integration</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#142B59] mb-1">
                How Can We Help? <span className="text-rose-500">*</span>
              </label>
              <textarea
                name="message"
                rows={3}
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Briefly describe your manufacturing or warehouse requirements..."
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
              {isSubmitting ? 'Validating...' : 'Submit Consultation Request'}
            </Button>
          </form>
        ) : (
          <div className="space-y-4 text-left">
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold block">Consultation Details Validated!</strong>
                Your details are validated. You can send this directly via Email or WhatsApp to ATLAS Technosoft.
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
              <div><strong>Name:</strong> {formData.fullName}</div>
              <div><strong>Company:</strong> {formData.companyName}</div>
              <div><strong>Work Email:</strong> {formData.workEmail}</div>
              <div><strong>Phone:</strong> {formData.phoneNumber}</div>
              <div><strong>Area of Interest:</strong> {formData.areaOfInterest}</div>
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
                  `Hello ATLAS Technosoft, I submitted a Boyum IT consultation request for ${formData.companyName}. Name: ${formData.fullName}. Product: ${formData.areaOfInterest}.`
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

    </div>
  );
};

