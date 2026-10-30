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
  Settings,
  TrendingUp,
  Building2,
  ShoppingCart,
  Boxes,
  Cog,
  Cpu,
  FileCheck,
  ShieldCheck,
  Headphones,
  Handshake,
  Check,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { Modal } from '../components/ui/Modal';
import {
  SAPBusinessOneLogo,
  BoyumITLogo,
  UiPathLogo,
  BeasManufacturingLogo,
  ProdumexWMSLogo,
  B1UPLogo
} from '../components/ui/PartnerLogos';
import { BRAND_INFO } from '../data/websiteContent';
import { ContactFormData } from '../types';
import {
  PARTNERS_HERO_DATA,
  TECHNOLOGY_PARTNERS_OVERVIEW_DATA,
  SAP_PARTNERSHIP_DATA,
  BOYUM_PARTNERSHIP_DATA,
  UIPATH_PARTNERSHIP_DATA,
  TECHNOLOGY_ECOSYSTEM_DATA,
  WHY_CHOOSE_PARTNERSHIP_DATA,
  PARTNERS_CTA_DATA,
  BoyumProductCardItem
} from '../data/partnersContent';

export const PartnersPage: React.FC = () => {
  // Modal states
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [selectedBoyumProduct, setSelectedBoyumProduct] = useState<BoyumProductCardItem | null>(null);
  const [isSapModalOpen, setIsSapModalOpen] = useState(false);
  const [isUiPathModalOpen, setIsUiPathModalOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Form state
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
      errors.message = 'Please briefly outline your partnership or ERP requirements';
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

  const renderBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case 'Settings':
        return <Settings className="w-4 h-4 text-white" />;
      case 'TrendingUp':
        return <TrendingUp className="w-4 h-4 text-white" />;
      case 'Users':
        return <Users className="w-4 h-4 text-white" />;
      case 'Handshake':
        return <Handshake className="w-4 h-4 text-white" />;
      default:
        return <CheckCircle2 className="w-4 h-4 text-white" />;
    }
  };

  const renderCapabilityIcon = (iconName: string) => {
    switch (iconName) {
      case 'Building2':
        return <Building2 className="w-5 h-5 text-[#0878f9]" />;
      case 'ShoppingCart':
        return <ShoppingCart className="w-5 h-5 text-[#0878f9]" />;
      case 'Boxes':
        return <Boxes className="w-5 h-5 text-[#0878f9]" />;
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5 text-[#0878f9]" />;
      default:
        return <CheckCircle2 className="w-5 h-5 text-[#0878f9]" />;
    }
  };

  const renderUiPathIcon = (iconName: string, color: string) => {
    switch (iconName) {
      case 'Cog':
        return <Cog className="w-6 h-6 text-white" />;
      case 'Cpu':
        return <Cpu className="w-6 h-6 text-white" />;
      case 'FileCheck':
        return <FileCheck className="w-6 h-6 text-white" />;
      case 'TrendingUp':
        return <TrendingUp className="w-6 h-6 text-white" />;
      default:
        return <Sparkles className="w-6 h-6 text-white" />;
    }
  };

  const renderWhyChooseIcon = (iconName: string, color: string) => {
    switch (iconName) {
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-white" />;
      case 'Building2':
        return <Building2 className="w-6 h-6 text-white" />;
      case 'Settings':
        return <Settings className="w-6 h-6 text-white" />;
      case 'Headphones':
        return <Headphones className="w-6 h-6 text-white" />;
      default:
        return <Users className="w-6 h-6 text-white" />;
    }
  };

  return (
    <div className="relative bg-white text-[#354765] selection:bg-blue-600 selection:text-white">
      {/* Background Decorative Ambient Glow matching About Page */}
      <div className="absolute -left-12 top-1/2 -translate-y-1/2 w-48 h-80 opacity-25 pointer-events-none select-none hidden lg:block">
        <div className="w-full h-full bg-gradient-to-tr from-emerald-600/30 via-teal-500/10 to-transparent rounded-full blur-3xl" />
      </div>

      {/* ========================================================================= */}
      {/* SECTION 1: HERO SECTION                                                   */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-r from-sky-50/60 via-white to-blue-50/30 pt-10 pb-14 lg:pt-14 lg:pb-18 border-b border-slate-100">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Eyebrow */}
              <div className="inline-block">
                <span className="text-[13px] sm:text-[14px] font-bold uppercase tracking-wider text-blue-600 select-none">
                  {PARTNERS_HERO_DATA.eyebrow}
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-[36px] sm:text-[44px] lg:text-[50px] xl:text-[54px] font-extrabold tracking-tight leading-[1.14] text-[#10264b]">
                {PARTNERS_HERO_DATA.titleStart}{' '}
                <span className="text-[#7139e8]">{PARTNERS_HERO_DATA.titleHighlight}</span>
              </h1>

              {/* Description */}
              <p className="text-[16px] sm:text-[17px] lg:text-[18px] text-[#354765] leading-relaxed max-w-2xl font-normal">
                {PARTNERS_HERO_DATA.description}
              </p>

              {/* Dual Action CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="#overview"
                  className="inline-flex items-center justify-center gap-2 text-[16px] font-semibold px-8 py-3.5 rounded-xl bg-[#0878f9] hover:bg-blue-700 text-white shadow-md shadow-blue-600/25 transition-all duration-200 cursor-pointer"
                >
                  <span>{PARTNERS_HERO_DATA.primaryCtaText}</span>
                  <ArrowRight className="w-5 h-5" />
                </a>

                <button
                  onClick={() => setIsConsultationModalOpen(true)}
                  className="inline-flex items-center justify-center gap-2 text-[16px] font-semibold px-8 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-200/90 shadow-sm transition-all duration-200 cursor-pointer"
                >
                  <span>{PARTNERS_HERO_DATA.secondaryCtaText}</span>
                </button>
              </div>
            </div>

            {/* Right Visual: Business Handshake with Floating Logos and Badges */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200/90 bg-white group">
                <img
                  src={PARTNERS_HERO_DATA.heroImage}
                  alt="Enterprise Executive Strategic Technology Partnership Handshake"
                  className="w-full h-[380px] sm:h-[430px] lg:h-[470px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />

                {/* Floating Partner Logos Strip Overlaid on Left Edge of Image */}
                <div className="absolute top-4 left-4 sm:top-5 sm:left-5 space-y-2 pointer-events-none">
                  <div className="bg-white/95 backdrop-blur-md rounded-xl px-3 py-1.5 shadow-md border border-slate-200/90 flex items-center">
                    <SAPBusinessOneLogo className="scale-95 origin-left" />
                  </div>
                  <div className="bg-white/95 backdrop-blur-md rounded-xl px-3 py-1.5 shadow-md border border-slate-200/90 flex items-center">
                    <BoyumITLogo className="scale-95 origin-left" />
                  </div>
                  <div className="bg-white/95 backdrop-blur-md rounded-xl px-3 py-1.5 shadow-md border border-slate-200/90 flex items-center">
                    <UiPathLogo className="scale-95 origin-left" />
                  </div>
                </div>

                {/* 4 Floating Information Badges Stacked on Right Edge matching reference */}
                <div className="absolute top-4 right-4 sm:top-5 sm:right-5 space-y-2 pointer-events-none">
                  {PARTNERS_HERO_DATA.floatingBadges.map((badge, idx) => (
                    <div
                      key={idx}
                      className="bg-white/95 backdrop-blur-md rounded-xl px-3.5 py-2 shadow-md border border-slate-200/90 flex items-center gap-2.5 max-w-[210px]"
                    >
                      <div
                        className="w-6 h-6 rounded-md flex items-center justify-center shrink-0"
                        style={{ backgroundColor: badge.color }}
                      >
                        {renderBadgeIcon(badge.iconName)}
                      </div>
                      <span className="text-[12px] sm:text-[13px] font-bold text-[#10264b] leading-tight">
                        {badge.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: TECHNOLOGY PARTNERS OVERVIEW (3 CARDS)                         */}
      {/* ========================================================================= */}
      <section id="overview" className="py-16 lg:py-24 bg-white border-b border-slate-100">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-left mb-12 space-y-2">
            <h2 className="text-[32px] sm:text-[38px] lg:text-[42px] font-extrabold text-[#10264b] tracking-tight">
              {TECHNOLOGY_PARTNERS_OVERVIEW_DATA.titleStart}{' '}
              <span className="text-[#7139e8]">{TECHNOLOGY_PARTNERS_OVERVIEW_DATA.titleHighlight}</span>
            </h2>
            <p className="text-[16px] sm:text-[17px] text-[#354765] leading-relaxed max-w-3xl">
              {TECHNOLOGY_PARTNERS_OVERVIEW_DATA.description}
            </p>
          </div>

          {/* 3 Partner Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {TECHNOLOGY_PARTNERS_OVERVIEW_DATA.partners.map((partner) => (
              <div
                key={partner.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
                style={{
                  border: `2px solid ${partner.borderColor}`
                }}
              >
                <div>
                  {/* Top Bar: Logo & Thumbnail Image */}
                  <div className="p-5 sm:p-6 pb-2 flex items-center justify-between gap-4">
                    <div>
                      {partner.badgeType === 'sap' && <SAPBusinessOneLogo className="h-9" />}
                      {partner.badgeType === 'boyum' && <BoyumITLogo className="h-9" />}
                      {partner.badgeType === 'uipath' && <UiPathLogo className="h-9" />}
                    </div>
                    <div className="w-24 h-16 sm:w-28 sm:h-18 rounded-xl overflow-hidden shadow-inner border border-slate-100 shrink-0">
                      <img
                        src={partner.image}
                        alt={partner.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="px-5 sm:px-6 py-3 space-y-2 text-left">
                    <h3 className="text-[20px] font-bold text-[#10264b] leading-snug">
                      {partner.title}
                    </h3>
                    <p className="text-[14px] text-[#354765] leading-relaxed">
                      {partner.description}
                    </p>
                  </div>
                </div>

                {/* Card Action Link */}
                <div className="px-5 sm:px-6 pb-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <a
                    href={partner.linkTarget}
                    className="text-[14px] font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                    style={{ color: partner.arrowColor }}
                  >
                    <span>{partner.linkText}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>

                  <a
                    href={partner.linkTarget}
                    aria-label={partner.linkText}
                    className="w-8 h-8 rounded-full flex items-center justify-center border transition-all cursor-pointer"
                    style={{
                      borderColor: partner.arrowColor,
                      color: partner.arrowColor
                    }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: SAP BUSINESS ONE PARTNERSHIP                                   */}
      {/* ========================================================================= */}
      <section id="sap-partnership" className="py-16 lg:py-24 bg-slate-50/60 border-b border-slate-100">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-left mb-10 space-y-2">
            <h2 className="text-[30px] sm:text-[36px] lg:text-[40px] font-extrabold text-[#10264b] tracking-tight max-w-4xl leading-tight">
              {SAP_PARTNERSHIP_DATA.titleStart}{' '}
              <span className="text-[#7139e8]">{SAP_PARTNERSHIP_DATA.titleHighlight}</span>
            </h2>
            <p className="text-[16px] sm:text-[17px] text-[#354765] leading-relaxed max-w-3xl">
              {SAP_PARTNERSHIP_DATA.description}
            </p>
            <div className="pt-2">
              <button
                onClick={() => setIsSapModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 text-[15px] sm:text-[16px] font-semibold px-7 py-3 rounded-xl bg-[#0878f9] hover:bg-blue-700 text-white shadow-md shadow-blue-600/20 transition-all cursor-pointer"
              >
                <span>{SAP_PARTNERSHIP_DATA.ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Monitor & Key Capabilities Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4">
            
            {/* Left 7 Cols: Desktop Monitor Visual */}
            <div className="lg:col-span-8">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200/90 bg-white group">
                <img
                  src={SAP_PARTNERSHIP_DATA.image}
                  alt="SAP Business One Comprehensive ERP Management Dashboard"
                  className="w-full h-[360px] sm:h-[440px] lg:h-[480px] object-cover group-hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                
                {/* Floating Badge on Monitor Bottom */}
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md rounded-xl px-4 py-2 shadow-md border border-slate-200/90 flex items-center gap-2">
                  <SAPBusinessOneLogo className="scale-90 origin-left" />
                  <span className="text-xs font-bold text-slate-700 hidden sm:inline">
                    • Enterprise Core Platform
                  </span>
                </div>
              </div>
            </div>

            {/* Right 4 Cols: Key Capabilities Floating Card */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm space-y-4 text-left">
                <h3 className="text-[19px] font-bold text-[#10264b] border-b border-slate-100 pb-3">
                  {SAP_PARTNERSHIP_DATA.capabilitiesTitle}
                </h3>
                
                <div className="space-y-4">
                  {SAP_PARTNERSHIP_DATA.capabilities.map((cap, idx) => (
                    <div key={idx} className="flex items-start gap-3.5 group">
                      <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200 text-[#0878f9] flex items-center justify-center shrink-0 group-hover:bg-[#0878f9] group-hover:text-white transition-colors">
                        {renderCapabilityIcon(cap.iconName)}
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-[15px] font-bold text-[#10264b] leading-tight group-hover:text-blue-600 transition-colors">
                          {cap.title}
                        </h4>
                        <p className="text-[13px] text-slate-500 leading-snug mt-0.5">
                          {cap.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: BOYUM IT PARTNERSHIP (3 CARDS)                                 */}
      {/* ========================================================================= */}
      <section id="boyum-partnership" className="py-16 lg:py-24 bg-white border-b border-slate-100">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-left mb-12 space-y-2">
            <h2 className="text-[32px] sm:text-[38px] lg:text-[42px] font-extrabold text-[#10264b] tracking-tight">
              {BOYUM_PARTNERSHIP_DATA.titleStart}{' '}
              <span className="text-[#7139e8]">{BOYUM_PARTNERSHIP_DATA.titleHighlight}</span>
            </h2>
            <p className="text-[16px] sm:text-[17px] text-[#354765] leading-relaxed max-w-3xl">
              {BOYUM_PARTNERSHIP_DATA.description}
            </p>
          </div>

          {/* 3 Product Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {BOYUM_PARTNERSHIP_DATA.products.map((prod) => (
              <div
                key={prod.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
                style={{
                  border: `2px solid ${prod.borderColor}`
                }}
              >
                <div>
                  {/* Top Bar with Product Logo */}
                  <div className="p-4 sm:p-5 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between">
                    <div>
                      {prod.productLogo === 'beas' && <BeasManufacturingLogo />}
                      {prod.productLogo === 'produmex' && <ProdumexWMSLogo />}
                      {prod.productLogo === 'b1up' && <B1UPLogo />}
                    </div>
                  </div>

                  {/* Product Image */}
                  <div className="relative h-44 overflow-hidden bg-slate-100">
                    <img
                      src={prod.image}
                      alt={prod.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Details */}
                  <div className="p-5 sm:p-6 space-y-2.5 text-left">
                    <h3 className="text-[20px] font-bold text-[#10264b] leading-snug group-hover:text-blue-600 transition-colors">
                      {prod.title}
                    </h3>
                    <p className="text-[14px] text-[#354765] leading-relaxed">
                      {prod.description}
                    </p>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="px-5 sm:px-6 pb-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedBoyumProduct(prod)}
                    className="text-[14px] font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                    style={{ color: prod.borderColor }}
                  >
                    <span>{prod.linkText}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={() => setSelectedBoyumProduct(prod)}
                    aria-label={`View ${prod.title}`}
                    className="w-8 h-8 rounded-full flex items-center justify-center border transition-all cursor-pointer"
                    style={{
                      borderColor: prod.borderColor,
                      color: prod.borderColor
                    }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: UIPATH PARTNERSHIP                                             */}
      {/* ========================================================================= */}
      <section id="uipath-partnership" className="py-16 lg:py-24 bg-slate-50/60 border-b border-slate-100">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-left mb-10 space-y-2">
            <h2 className="text-[30px] sm:text-[36px] lg:text-[40px] font-extrabold text-[#10264b] tracking-tight max-w-4xl leading-tight">
              {UIPATH_PARTNERSHIP_DATA.titleStart}{' '}
              <span className="text-[#7139e8]">{UIPATH_PARTNERSHIP_DATA.titleHighlight}</span>
            </h2>
            <p className="text-[16px] sm:text-[17px] text-[#354765] leading-relaxed max-w-3xl">
              {UIPATH_PARTNERSHIP_DATA.description}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* Left 5 Cols: AI Robot Visual with Button Overlay */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200/90 bg-white group">
                <img
                  src={UIPATH_PARTNERSHIP_DATA.image}
                  alt="UiPath Robotic Process Automation and AI Powered Document Understanding"
                  className="w-full h-[360px] sm:h-[400px] object-cover group-hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent pointer-events-none" />

                {/* UiPath Screen Overlay in top left */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md rounded-xl px-3.5 py-2 shadow-md border border-slate-200/90 flex items-center">
                  <UiPathLogo className="scale-95 origin-left" />
                </div>

                {/* Button Overlaid at bottom */}
                <div className="absolute bottom-5 left-5 right-5">
                  <button
                    onClick={() => setIsUiPathModalOpen(true)}
                    className="w-full inline-flex items-center justify-center gap-2 text-[15px] font-semibold px-6 py-3 rounded-xl bg-[#0878f9] hover:bg-blue-700 text-white shadow-lg transition-all cursor-pointer"
                  >
                    <span>{UIPATH_PARTNERSHIP_DATA.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right 7 Cols: 4 Benefit Cards Grid */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {UIPATH_PARTNERSHIP_DATA.benefits.map((benefit, idx) => (
                <div
                  key={idx}
                  className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex items-start gap-4 text-left"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm"
                    style={{ backgroundColor: benefit.color }}
                  >
                    {renderUiPathIcon(benefit.iconName, benefit.color)}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-[17px] font-bold text-[#10264b] leading-tight mb-1">
                      {benefit.title}
                    </h3>
                    <p className="text-[13px] text-slate-600 leading-snug">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6: ONE CONNECTED TECHNOLOGY ECOSYSTEM                             */}
      {/* ========================================================================= */}
      <section className="py-16 lg:py-24 bg-white border-b border-slate-100 relative overflow-hidden">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-left max-w-3xl mb-14 space-y-2">
            <h2 className="text-[32px] sm:text-[38px] lg:text-[42px] font-extrabold text-[#10264b] tracking-tight">
              {TECHNOLOGY_ECOSYSTEM_DATA.titleStart}{' '}
              <span className="text-[#7139e8]">{TECHNOLOGY_ECOSYSTEM_DATA.titleHighlight}</span>
            </h2>
            <p className="text-[16px] sm:text-[17px] text-[#354765] leading-relaxed">
              {TECHNOLOGY_ECOSYSTEM_DATA.description}
            </p>
          </div>

          {/* 5-Step Connected Flow matching reference */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 lg:gap-2 items-center">
            {TECHNOLOGY_ECOSYSTEM_DATA.steps.map((step, idx) => {
              const isLast = idx === TECHNOLOGY_ECOSYSTEM_DATA.steps.length - 1;
              return (
                <React.Fragment key={step.id}>
                  <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex flex-col items-center text-center justify-between min-h-[160px] group">
                    <div className="h-10 flex items-center justify-center">
                      {step.badgeType === 'sap' && <SAPBusinessOneLogo className="scale-95" />}
                      {step.badgeType === 'boyum' && <BoyumITLogo className="scale-95" />}
                      {step.badgeType === 'uipath' && <UiPathLogo className="scale-95" />}
                      {step.badgeType === 'atlas' && (
                        <div className="flex items-center gap-1.5">
                          <div className="w-7 h-7 rounded-lg bg-blue-600 text-white font-black flex items-center justify-center text-[10px]">
                            ATLAS
                          </div>
                          <span className="font-extrabold text-sm text-[#10264b]">Technosoft</span>
                        </div>
                      )}
                      {step.badgeType === 'operations' && (
                        <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                          <TrendingUp className="w-5 h-5" />
                        </div>
                      )}
                    </div>

                    <div className="space-y-1 pt-2">
                      <h3 className="text-[14px] font-bold text-[#10264b] leading-tight group-hover:text-blue-600 transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-[11px] text-slate-500 leading-snug">
                        {step.role}
                      </p>
                    </div>
                  </div>

                  {!isLast && (
                    <div className="hidden lg:flex items-center justify-center text-blue-600/50 -mx-1">
                      <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          <p className="text-[12px] text-slate-400 text-center mt-6 italic">
            {TECHNOLOGY_ECOSYSTEM_DATA.illustrativeNote}
          </p>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 7: WHY CHOOSE ATLAS TECHNOSOFT                                    */}
      {/* ========================================================================= */}
      <section className="py-16 lg:py-24 bg-slate-50/60 border-b border-slate-100">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-left max-w-3xl mb-12 space-y-2">
            <h2 className="text-[32px] sm:text-[38px] lg:text-[42px] font-extrabold text-[#10264b] tracking-tight">
              {WHY_CHOOSE_PARTNERSHIP_DATA.titleStart}{' '}
              <span className="text-[#7139e8]">{WHY_CHOOSE_PARTNERSHIP_DATA.titleHighlight}</span>
            </h2>
            <p className="text-[16px] sm:text-[17px] text-[#354765] leading-relaxed">
              {WHY_CHOOSE_PARTNERSHIP_DATA.description}
            </p>
          </div>

          {/* 4 Cards in a Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_CHOOSE_PARTNERSHIP_DATA.pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between text-left group"
              >
                <div>
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-sm"
                    style={{ backgroundColor: pillar.color }}
                  >
                    {renderWhyChooseIcon(pillar.iconName, pillar.color)}
                  </div>
                  <h3 className="text-[18px] font-bold text-[#10264b] mb-2 leading-snug group-hover:text-blue-600 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-[14px] text-[#354765] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 8: SIMPLE CONTACT CTA (RULE 9 - NO LENGTHY FORMS)                 */}
      {/* ========================================================================= */}
      <section className="py-12 lg:py-16 bg-slate-50/50">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-[#eaf4ff] border border-blue-200/90 p-8 sm:p-10 lg:p-12 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Heading, Subtext & Button */}
              <div className="lg:col-span-6 space-y-4 text-left">
                <span className="text-[12px] sm:text-[13px] font-bold uppercase tracking-wider text-blue-600">
                  LET'S WORK TOGETHER
                </span>

                <h2 className="text-[28px] sm:text-[34px] lg:text-[38px] font-extrabold text-[#10264b] tracking-tight leading-tight">
                  {PARTNERS_CTA_DATA.titleStart}{' '}
                  <span className="text-[#7139e8]">{PARTNERS_CTA_DATA.titleHighlight}</span>
                </h2>

                <p className="text-[15px] sm:text-[16px] text-[#354765] leading-relaxed max-w-xl">
                  {PARTNERS_CTA_DATA.description}
                </p>

                <div className="pt-2">
                  <button
                    onClick={() => setIsConsultationModalOpen(true)}
                    className="inline-flex items-center justify-center gap-2 text-[15px] sm:text-[16px] font-semibold px-8 py-3.5 rounded-xl bg-[#0878f9] hover:bg-blue-700 text-white shadow-md shadow-blue-600/25 transition-all cursor-pointer"
                  >
                    <span>{PARTNERS_CTA_DATA.buttonText}</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Right Column: 3 Clean Box Cards with Colored Borders matching About Page */}
              <div className="lg:col-span-6 space-y-3.5">
                {/* Email Box Card (Green border) */}
                <a
                  href={`mailto:${PARTNERS_CTA_DATA.email}?subject=Technology%20Partnership%20Inquiry`}
                  className="bg-white rounded-xl p-4 sm:p-4.5 border-2 border-[#16b978] shadow-sm hover:shadow-md transition-all flex items-center gap-4 group"
                >
                  <div className="w-11 h-11 rounded-lg bg-blue-50 border border-blue-100 text-[#0878f9] flex items-center justify-center shrink-0 group-hover:bg-[#0878f9] group-hover:text-white transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Email
                    </p>
                    <p className="text-[15px] font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {PARTNERS_CTA_DATA.email}
                    </p>
                  </div>
                </a>

                {/* Phone Box Card (Blue border) */}
                <a
                  href={`tel:${PARTNERS_CTA_DATA.phone}`}
                  className="bg-white rounded-xl p-4 sm:p-4.5 border-2 border-[#2992ff] shadow-sm hover:shadow-md transition-all flex items-center gap-4 group"
                >
                  <div className="w-11 h-11 rounded-lg bg-blue-50 border border-blue-100 text-[#0878f9] flex items-center justify-center shrink-0 group-hover:bg-[#0878f9] group-hover:text-white transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Phone
                    </p>
                    <p className="text-[15px] font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {PARTNERS_CTA_DATA.phone}
                    </p>
                  </div>
                </a>

                {/* Locations Box Card (Purple border) */}
                <div className="bg-white rounded-xl p-4 sm:p-4.5 border-2 border-[#a34dff] shadow-sm flex items-center gap-4">
                  <div className="w-11 h-11 rounded-lg bg-blue-50 border border-blue-100 text-[#0878f9] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Locations
                    </p>
                    <p className="text-[14px] font-bold text-slate-900">
                      Borivali, Mumbai
                    </p>
                    <p className="text-[14px] font-bold text-slate-900">
                      Marine Lines, Mumbai
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* MODAL 1: BOYUM PRODUCT DETAILS (BEAS, PRODUMEX, B1UP)                     */}
      {/* ========================================================================= */}
      {selectedBoyumProduct && (
        <Modal
          isOpen={!!selectedBoyumProduct}
          onClose={() => setSelectedBoyumProduct(null)}
          title={selectedBoyumProduct.title}
        >
          <div className="space-y-6 text-left">
            <div className="relative h-56 rounded-2xl overflow-hidden bg-slate-100">
              <img
                src={selectedBoyumProduct.image}
                alt={selectedBoyumProduct.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
              <div
                className="absolute bottom-4 left-4 px-4 py-1.5 rounded-lg text-white font-bold text-sm shadow-md flex items-center gap-2"
                style={{ backgroundColor: selectedBoyumProduct.borderColor }}
              >
                <span>Boyum IT Add-on</span>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-[18px] font-bold text-[#10264b]">
                {selectedBoyumProduct.title}
              </h4>
              <p className="text-[14px] text-slate-600 leading-relaxed">
                {selectedBoyumProduct.description}
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-[15px] font-bold text-[#10264b]">Key Functional Capabilities</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedBoyumProduct.fullDetails.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-[13px] text-slate-700">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-[#16a879]" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-[15px] font-bold text-[#10264b]">Verified Business Impact</h4>
              <div className="space-y-2">
                {selectedBoyumProduct.fullDetails.kpis.map((kpi, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2.5 text-[13px] text-slate-700 font-medium"
                  >
                    <Check className="w-4 h-4 shrink-0 text-amber-600" />
                    <span>{kpi}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-[13px] text-slate-500">
                Interested in evaluating this add-on for your SAP system?
              </p>
              <button
                onClick={() => {
                  setSelectedBoyumProduct(null);
                  setIsConsultationModalOpen(true);
                }}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#0878f9] hover:bg-blue-700 text-white font-semibold text-sm shadow-md transition-all cursor-pointer"
              >
                Request Product Demo
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: SAP BUSINESS ONE CAPABILITIES MODAL                              */}
      {/* ========================================================================= */}
      <Modal
        isOpen={isSapModalOpen}
        onClose={() => setIsSapModalOpen(false)}
        title="SAP Business One Enterprise Implementation"
      >
        <div className="space-y-6 text-left">
          <div className="relative h-56 rounded-2xl overflow-hidden bg-slate-100">
            <img
              src={SAP_PARTNERSHIP_DATA.image}
              alt="SAP Business One Operations"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-lg shadow-md">
              <SAPBusinessOneLogo className="scale-90 origin-left" />
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-[18px] font-bold text-[#10264b]">
              Complete ERP Solution for High-Growth SMEs
            </h4>
            <p className="text-[14px] text-slate-600 leading-relaxed">
              ATLAS Technosoft delivers certified implementation, HANA migration, and multi-country rollouts for SAP Business One, helping manufacturing, trading, and logistics enterprises operate with unified live visibility.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-[15px] font-bold text-[#10264b]">Implementation Highlights</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-[13px] text-slate-700">
                <span className="font-bold block text-[#10264b]">Cloud & On-Premise</span>
                HANA and SQL database deployment options.
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-[13px] text-slate-700">
                <span className="font-bold block text-[#10264b]">40% Faster Close</span>
                Streamlined month-end financial reporting cycles.
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-[13px] text-slate-700">
                <span className="font-bold block text-[#10264b]">Global Rollouts</span>
                Templates deployed across multiple entities and currencies.
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-[13px] text-slate-700">
                <span className="font-bold block text-[#10264b]">Certified Experts</span>
                32 SAP HANA and RPA specialists on team.
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-[13px] text-slate-500">
              Schedule a technical discovery session with our architects.
            </span>
            <button
              onClick={() => {
                setIsSapModalOpen(false);
                setIsConsultationModalOpen(true);
              }}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#0878f9] hover:bg-blue-700 text-white font-semibold text-sm shadow-md transition-all cursor-pointer"
            >
              Discuss Your SAP Project
            </button>
          </div>
        </div>
      </Modal>

      {/* ========================================================================= */}
      {/* MODAL 3: UIPATH HYPERAUTOMATION MODAL                                     */}
      {/* ========================================================================= */}
      <Modal
        isOpen={isUiPathModalOpen}
        onClose={() => setIsUiPathModalOpen(false)}
        title="UiPath RPA & Hyperautomation Solutions"
      >
        <div className="space-y-6 text-left">
          <div className="relative h-56 rounded-2xl overflow-hidden bg-slate-100">
            <img
              src={UIPATH_PARTNERSHIP_DATA.image}
              alt="UiPath Automation"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-lg shadow-md">
              <UiPathLogo className="scale-90 origin-left" />
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-[18px] font-bold text-[#10264b]">
              Eliminate Routine Repetitive Manual Operations
            </h4>
            <p className="text-[14px] text-slate-600 leading-relaxed">
              Integrate UiPath software robots directly with SAP Business One to automate vendor invoice entry, AP/AR 3-way matching, bank statement reconciliations, and logistics paperwork.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-[15px] font-bold text-[#10264b]">Documented Impact & Scope</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-[13px] text-slate-700">
                <span className="font-bold block text-[#10264b]">70% Less Manual Entry</span>
                Touchless posting from scanned vendor PDFs into SAP.
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-[13px] text-slate-700">
                <span className="font-bold block text-[#10264b]">4–6 Months Target ROI</span>
                Measurable payback on software robot development.
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-[13px] text-slate-700">
                <span className="font-bold block text-[#10264b]">AI Document Understanding</span>
                Extracts data from complex invoices and Bills of Lading.
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-[13px] text-slate-700">
                <span className="font-bold block text-[#10264b]">24/7 Unattended Robots</span>
                Night-time batch reconciliation and order verification.
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-[13px] text-slate-500">
              Calculate projected bot ROI for your business workflows.
            </span>
            <button
              onClick={() => {
                setIsUiPathModalOpen(false);
                setIsConsultationModalOpen(true);
              }}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#0878f9] hover:bg-blue-700 text-white font-semibold text-sm shadow-md transition-all cursor-pointer"
            >
              Book an RPA Demo
            </button>
          </div>
        </div>
      </Modal>

      {/* ========================================================================= */}
      {/* MODAL 4: CONSULTATION BOOKING MODAL                                       */}
      {/* ========================================================================= */}
      <Modal
        isOpen={isConsultationModalOpen}
        onClose={() => {
          setIsConsultationModalOpen(false);
          setIsSuccessSubmitted(false);
        }}
        title="Book a Technology Partnership Consultation"
      >
        {isSuccessSubmitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-[22px] font-bold text-[#10264b]">
              Consultation Request Received
            </h3>
            <p className="text-[15px] text-[#40506a] max-w-md mx-auto">
              Thank you, <span className="font-semibold text-[#10264b]">{formData.fullName}</span>.
              Our enterprise solutions architect will review requirements for{' '}
              <span className="font-semibold text-[#10264b]">{formData.companyName}</span> and
              contact you within 24 hours.
            </p>
            <div className="pt-4">
              <button
                onClick={() => {
                  setIsConsultationModalOpen(false);
                  setIsSuccessSubmitted(false);
                }}
                className="px-6 py-2.5 rounded-lg bg-[#0878f9] text-white font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleFormSubmit} className="space-y-4 text-left">
            <p className="text-[14px] text-slate-600 mb-2">
              Speak with ATLAS Technosoft experts to discuss SAP Business One, Boyum IT add-ons, or UiPath automation tailored to your business operations.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="e.g. Sanjay Verma"
                  className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                    formErrors.fullName ? 'border-red-400 bg-red-50/20' : 'border-slate-300'
                  }`}
                />
                {formErrors.fullName && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.fullName}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Company Name *
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  placeholder="e.g. Apex Industrial Systems"
                  className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                    formErrors.companyName ? 'border-red-400 bg-red-50/20' : 'border-slate-300'
                  }`}
                />
                {formErrors.companyName && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.companyName}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Work Email *
                </label>
                <input
                  type="email"
                  name="workEmail"
                  value={formData.workEmail}
                  onChange={handleInputChange}
                  placeholder="sanjay@apexsystems.com"
                  className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                    formErrors.workEmail ? 'border-red-400 bg-red-50/20' : 'border-slate-300'
                  }`}
                />
                {formErrors.workEmail && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.workEmail}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="+91-9876543210"
                  className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                    formErrors.phoneNumber ? 'border-red-400 bg-red-50/20' : 'border-slate-300'
                  }`}
                />
                {formErrors.phoneNumber && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.phoneNumber}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Area of Interest
              </label>
              <select
                name="areaOfInterest"
                value={formData.areaOfInterest}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
              >
                <option value="sap-b1">SAP Business One Implementation / Migration</option>
                <option value="boyum-beas">Boyum IT — Beas Manufacturing</option>
                <option value="boyum-produmex">Boyum IT — Produmex WMS</option>
                <option value="boyum-b1up">Boyum IT — B1 Usability Package (B1UP)</option>
                <option value="uipath-rpa">UiPath RPA & Document Understanding</option>
                <option value="ecosystem">Connected Technology Ecosystem Architecture</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Describe Your Current Challenge or Requirements *
              </label>
              <textarea
                name="message"
                rows={3}
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tell us about your current ERP version, key bottlenecks, or anticipated timeline..."
                className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                  formErrors.message ? 'border-red-400 bg-red-50/20' : 'border-slate-300'
                }`}
              />
              {formErrors.message && (
                <p className="text-red-500 text-xs mt-1">{formErrors.message}</p>
              )}
            </div>

            <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-[12px] text-slate-500">
                Direct contact:{' '}
                <a href={`tel:${BRAND_INFO.contact.phone}`} className="font-semibold text-slate-700">
                  {BRAND_INFO.contact.phone}
                </a>
              </span>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-7 py-3 rounded-xl bg-[#0878f9] hover:bg-blue-700 text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Submitting...</span>
                ) : (
                  <>
                    <span>Submit Consultation Request</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </Modal>

      {/* Floating Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll to top"
          className="fixed bottom-6 right-6 z-30 p-3 rounded-full bg-[#10264b] hover:bg-[#0878f9] text-white shadow-xl transition-all duration-300 hover:scale-110 cursor-pointer"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}

    </div>
  );
};

export default PartnersPage;

