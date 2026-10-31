import { CtaContactCards } from '../components/ui/CtaContactCards';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  B1UPLogo,
  AtlasLogo
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
  PARTNERS_CTA_DATA
} from '../data/partnersContent';

export const PartnersPage: React.FC = () => {
  const navigate = useNavigate();

  // Consultation Modal state
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
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
    <div className="relative bg-white text-[#45546B] selection:bg-blue-600 selection:text-white">
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
                <span className="text-[13px] sm:text-[14px] font-bold uppercase tracking-wider text-[#1B72E8] select-none">
                  {PARTNERS_HERO_DATA.eyebrow}
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="font-serif text-[38px] sm:text-[46px] lg:text-[52px] xl:text-[56px] font-bold tracking-tight leading-[1.14] text-[#142B59]">
                {PARTNERS_HERO_DATA.titleStart}{' '}
                <span className="bg-gradient-to-r from-[#0052CC] via-[#0066CC] to-[#0A66C2] bg-clip-text text-transparent">{PARTNERS_HERO_DATA.titleHighlight}</span>
              </h1>

              {/* Description */}
              <p className="text-[16px] sm:text-[17px] lg:text-[18px] text-[#45546B] leading-relaxed max-w-2xl font-normal">
                {PARTNERS_HERO_DATA.description}
              </p>

              {/* Dual Action CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="#overview"
                  className="inline-flex items-center justify-center gap-2 text-[16px] font-semibold px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#0052CC] to-[#0A66C2] hover:from-[#0040A8] hover:to-[#08529C] text-white shadow-md shadow-blue-500/25 transition-all duration-200 cursor-pointer"
                >
                  <span>{PARTNERS_HERO_DATA.primaryCtaText}</span>
                  <ArrowRight className="w-5 h-5" />
                </a>

                <button
                  onClick={() => setIsConsultationModalOpen(true)}
                  className="inline-flex items-center justify-center gap-2 text-[16px] font-semibold px-8 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-[#142B59] border border-slate-200/90 shadow-sm transition-all duration-200 cursor-pointer"
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
                      <span className="text-[12px] sm:text-[13px] font-bold text-[#142B59] leading-tight">
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
            <h2 className="font-serif text-[32px] sm:text-[38px] lg:text-[42px] font-bold text-[#142B59] tracking-tight">
              {TECHNOLOGY_PARTNERS_OVERVIEW_DATA.titleStart}{' '}
              <span className="bg-gradient-to-r from-[#0052CC] via-[#0066CC] to-[#0A66C2] bg-clip-text text-transparent">{TECHNOLOGY_PARTNERS_OVERVIEW_DATA.titleHighlight}</span>
            </h2>
            <p className="text-[16px] sm:text-[17px] text-[#45546B] leading-relaxed max-w-3xl">
              {TECHNOLOGY_PARTNERS_OVERVIEW_DATA.description}
            </p>
          </div>

          {/* 4 Partner Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TECHNOLOGY_PARTNERS_OVERVIEW_DATA.partners.map((partner) => (
              <div
                key={partner.id}
                onClick={() => navigate(partner.route)}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between cursor-pointer"
                style={{
                  border: `2px solid ${partner.borderColor}`
                }}
              >
                <div>
                  {/* Top Bar: Logo & Thumbnail Image */}
                  <div className="p-5 pb-2 flex items-center justify-between gap-3">
                    <div className="shrink-0">
                      {partner.badgeType === 'sap' && <SAPBusinessOneLogo className="h-8" />}
                      {partner.badgeType === 'boyum' && <BoyumITLogo className="h-8" />}
                      {partner.badgeType === 'uipath' && <UiPathLogo className="h-8" />}
                      {partner.badgeType === 'atlas' && <AtlasLogo className="h-8" />}
                    </div>
                    <div className="w-20 h-14 sm:w-22 sm:h-15 rounded-xl overflow-hidden shadow-inner border border-slate-100 shrink-0">
                      <img
                        src={partner.image}
                        alt={partner.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="px-5 py-3 space-y-2 text-left">
                    <Link to={partner.route} className="block">
                      <h3 className="text-[18px] sm:text-[19px] font-bold text-[#172B50] leading-snug group-hover:text-[#1B72E8] transition-colors">
                        {partner.title}
                      </h3>
                    </Link>
                    <p className="text-[13px] sm:text-[14px] text-[#53647A] leading-relaxed">
                      {partner.description}
                    </p>
                  </div>
                </div>

                {/* Card Action Link */}
                <div className="px-5 pb-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    to={partner.route}
                    className="text-[13px] sm:text-[14px] font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                    style={{ color: partner.arrowColor }}
                  >
                    <span>{partner.linkText}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                    to={partner.route}
                    aria-label={partner.linkText}
                    className="w-8 h-8 rounded-full flex items-center justify-center border transition-all cursor-pointer group-hover:scale-110"
                    style={{
                      borderColor: partner.arrowColor,
                      color: partner.arrowColor
                    }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
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
            <h2 className="font-serif text-[30px] sm:text-[36px] lg:text-[40px] font-bold text-[#142B59] tracking-tight max-w-4xl leading-tight">
              {SAP_PARTNERSHIP_DATA.titleStart}{' '}
              <span className="bg-gradient-to-r from-[#0052CC] via-[#0066CC] to-[#0A66C2] bg-clip-text text-transparent">{SAP_PARTNERSHIP_DATA.titleHighlight}</span>
            </h2>
            <p className="text-[16px] sm:text-[17px] text-[#45546B] leading-relaxed max-w-3xl">
              {SAP_PARTNERSHIP_DATA.description}
            </p>
            <div className="pt-2">
              <Link
                to="/partners/sap-business-one"
                className="inline-flex items-center justify-center gap-2 text-[15px] sm:text-[16px] font-semibold px-7 py-3 rounded-xl bg-gradient-to-r from-[#0052CC] to-[#0A66C2] hover:from-[#0040A8] hover:to-[#08529C] text-white shadow-md shadow-blue-500/25 transition-all cursor-pointer"
              >
                <span>{SAP_PARTNERSHIP_DATA.ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
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
                <h3 className="text-[19px] font-bold text-[#172B50] border-b border-slate-100 pb-3">
                  {SAP_PARTNERSHIP_DATA.capabilitiesTitle}
                </h3>
                
                <div className="space-y-4">
                  {SAP_PARTNERSHIP_DATA.capabilities.map((cap, idx) => (
                    <div key={idx} className="flex items-start gap-3.5 group">
                      <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200 text-[#0878f9] flex items-center justify-center shrink-0 group-hover:bg-[#0878f9] group-hover:text-white transition-colors">
                        {renderCapabilityIcon(cap.iconName)}
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-[15px] font-bold text-[#142B59] leading-tight group-hover:text-blue-600 transition-colors">
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
            <h2 className="font-serif text-[32px] sm:text-[38px] lg:text-[42px] font-bold text-[#142B59] tracking-tight">
              {BOYUM_PARTNERSHIP_DATA.titleStart}{' '}
              <span className="bg-gradient-to-r from-[#0052CC] via-[#0066CC] to-[#0A66C2] bg-clip-text text-transparent">{BOYUM_PARTNERSHIP_DATA.titleHighlight}</span>
            </h2>
            <p className="text-[16px] sm:text-[17px] text-[#45546B] leading-relaxed max-w-3xl">
              {BOYUM_PARTNERSHIP_DATA.description}
            </p>
          </div>

          {/* 3 Product Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {BOYUM_PARTNERSHIP_DATA.products.map((prod) => (
              <div
                key={prod.id}
                onClick={() => navigate(prod.route || '/partners/boyum-it')}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between cursor-pointer"
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
                    <Link to={prod.route || '/partners/boyum-it'} className="block">
                      <h3 className="text-[20px] font-bold text-[#172B50] leading-snug group-hover:text-[#1B72E8] transition-colors">
                        {prod.title}
                      </h3>
                    </Link>
                    <p className="text-[14px] text-[#53647A] leading-relaxed">
                      {prod.description}
                    </p>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="px-5 sm:px-6 pb-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    to={prod.route || '/partners/boyum-it'}
                    className="text-[14px] font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                    style={{ color: prod.borderColor }}
                  >
                    <span>{prod.linkText}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                    to={prod.route || '/partners/boyum-it'}
                    aria-label={`View ${prod.title}`}
                    className="w-8 h-8 rounded-full flex items-center justify-center border transition-all cursor-pointer group-hover:scale-110"
                    style={{
                      borderColor: prod.borderColor,
                      color: prod.borderColor
                    }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
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
            <h2 className="font-serif text-[30px] sm:text-[36px] lg:text-[40px] font-bold text-[#142B59] tracking-tight max-w-4xl leading-tight">
              {UIPATH_PARTNERSHIP_DATA.titleStart}{' '}
              <span className="bg-gradient-to-r from-[#0052CC] via-[#0066CC] to-[#0A66C2] bg-clip-text text-transparent">{UIPATH_PARTNERSHIP_DATA.titleHighlight}</span>
            </h2>
            <p className="text-[16px] sm:text-[17px] text-[#45546B] leading-relaxed max-w-3xl">
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
                  <Link
                    to="/partners/uipath"
                    className="w-full inline-flex items-center justify-center gap-2 text-[15px] font-semibold px-6 py-3 rounded-xl bg-gradient-to-r from-[#0052CC] to-[#0A66C2] hover:from-[#0040A8] hover:to-[#08529C] text-white shadow-lg shadow-blue-500/25 transition-all cursor-pointer"
                  >
                    <span>{UIPATH_PARTNERSHIP_DATA.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
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
                    <h3 className="text-[17px] font-bold text-[#172B50] leading-tight mb-1">
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
            <h2 className="font-serif text-[32px] sm:text-[38px] lg:text-[42px] font-bold text-[#142B59] tracking-tight">
              {TECHNOLOGY_ECOSYSTEM_DATA.titleStart}{' '}
              <span className="bg-gradient-to-r from-[#0052CC] via-[#0066CC] to-[#0A66C2] bg-clip-text text-transparent">{TECHNOLOGY_ECOSYSTEM_DATA.titleHighlight}</span>
            </h2>
            <p className="text-[16px] sm:text-[17px] text-[#45546B] leading-relaxed">
              {TECHNOLOGY_ECOSYSTEM_DATA.description}
            </p>
          </div>

          {/* 5-Step Connected Flow matching reference */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 lg:gap-2 items-center">
            {TECHNOLOGY_ECOSYSTEM_DATA.steps.map((step, idx) => {
              const isLast = idx === TECHNOLOGY_ECOSYSTEM_DATA.steps.length - 1;
              const stepRoute =
                step.badgeType === 'sap' ? '/partners/sap-business-one' :
                step.badgeType === 'boyum' ? '/partners/boyum-it' :
                step.badgeType === 'uipath' ? '/partners/uipath' :
                step.badgeType === 'atlas' ? '/partners/atlas-solutions' : null;

              const cardContent = (
                <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex flex-col items-center text-center justify-between min-h-[160px] group h-full">
                  <div className="h-10 flex items-center justify-center">
                    {step.badgeType === 'sap' && <SAPBusinessOneLogo className="scale-95" />}
                    {step.badgeType === 'boyum' && <BoyumITLogo className="scale-95" />}
                    {step.badgeType === 'uipath' && <UiPathLogo className="scale-95" />}
                    {step.badgeType === 'atlas' && (
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center shrink-0">
                          <img src="/images/logo.png" alt="ATLAS Logo" className="w-full h-full object-contain" />
                        </div>
                        <span className="font-extrabold text-sm text-[#142B59]">Technosoft</span>
                      </div>
                    )}
                    {step.badgeType === 'operations' && (
                      <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                        <TrendingUp className="w-5 h-5" />
                      </div>
                    )}
                  </div>

                  <div className="space-y-1 pt-2">
                    <h3 className="text-[14px] font-bold text-[#142B59] leading-tight group-hover:text-blue-600 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 leading-snug">
                      {step.role}
                    </p>
                  </div>
                </div>
              );

              return (
                <React.Fragment key={step.id}>
                  {stepRoute ? (
                    <Link to={stepRoute} className="block h-full cursor-pointer">
                      {cardContent}
                    </Link>
                  ) : (
                    <div>{cardContent}</div>
                  )}

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
            <h2 className="font-serif text-[32px] sm:text-[38px] lg:text-[42px] font-bold text-[#142B59] tracking-tight">
              {WHY_CHOOSE_PARTNERSHIP_DATA.titleStart}{' '}
              <span className="bg-gradient-to-r from-[#0052CC] via-[#0066CC] to-[#0A66C2] bg-clip-text text-transparent">{WHY_CHOOSE_PARTNERSHIP_DATA.titleHighlight}</span>
            </h2>
            <p className="text-[16px] sm:text-[17px] text-[#45546B] leading-relaxed">
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
                  <h3 className="text-[18px] font-bold text-[#172B50] mb-2 leading-snug group-hover:text-[#1B72E8] transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-[14px] text-[#53647A] leading-relaxed">
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
          <div className="rounded-2xl sm:rounded-3xl bg-[#eaf4ff] border border-blue-200/90 p-8 sm:p-10 lg:p-12 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Heading, Subtext & Both Action Buttons */}
              <div className="lg:col-span-6 space-y-4 text-left">
                <span className="text-[12px] sm:text-[13px] font-bold uppercase tracking-wider text-[#1B72E8] block">
                  LET'S WORK TOGETHER
                </span>
                <h2 className="font-serif text-[28px] sm:text-[34px] lg:text-[40px] font-bold text-[#142B59] tracking-tight leading-[1.18]">
                  {PARTNERS_CTA_DATA.titleStart}{' '}
                  <span className="bg-gradient-to-r from-[#0052CC] via-[#0066CC] to-[#0A66C2] bg-clip-text text-transparent">{PARTNERS_CTA_DATA.titleHighlight}</span>
                </h2>
                
                <p className="text-[15px] sm:text-[16px] text-[#45546B] leading-relaxed max-w-lg">
                  {PARTNERS_CTA_DATA.description}
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => setIsConsultationModalOpen(true)}
                    className="inline-flex items-center justify-center gap-2 text-[15px] sm:text-[16px] font-semibold px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#0052CC] to-[#0A66C2] hover:from-[#0040A8] hover:to-[#08529C] text-white shadow-md shadow-blue-500/25 transition-all cursor-pointer"
                  >
                    <span>{PARTNERS_CTA_DATA.buttonText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center font-semibold rounded-xl px-6 py-3.5 text-[15px] sm:text-[16px] bg-white text-[#142B59] hover:bg-slate-50 border border-slate-300 shadow-sm transition-colors"
                  >
                    Contact Us
                  </Link>
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

      {/* ========================================================================= */}
      {/* CONSULTATION BOOKING MODAL                                                */}
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
            <h3 className="text-[22px] font-bold text-[#142B59]">
              Consultation Request Received
            </h3>
            <p className="text-[15px] text-[#40506a] max-w-md mx-auto">
              Thank you, <span className="font-semibold text-[#142B59]">{formData.fullName}</span>.
              Our enterprise solutions architect will review requirements for{' '}
              <span className="font-semibold text-[#142B59]">{formData.companyName}</span> and
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
      /* Global scroll-to-top handled by SiteLayout */

    </div>
  );
};

export default PartnersPage;

