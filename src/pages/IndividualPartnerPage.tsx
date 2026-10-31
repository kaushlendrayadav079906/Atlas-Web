import { CtaContactCards } from '../components/ui/CtaContactCards';
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Mail,
  Phone,
  MapPin,
  ChevronUp,
  Building2,
  TrendingUp,
  ShoppingCart,
  Boxes,
  Factory,
  Cpu,
  Truck,
  Ship,
  Settings,
  ShieldCheck,
  FileCheck,
  Sparkles,
  Check,
  Award,
  Layers,
  ChevronRight,
  Send
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import {
  SAPBusinessOneLogo,
  BoyumITLogo,
  UiPathLogo,
  AtlasLogo
} from '../components/ui/PartnerLogos';
import {
  INDIVIDUAL_PARTNERS_DATA,
  IndividualPartner
} from '../data/individualPartnersData';
import { BRAND_INFO } from '../data/websiteContent';
import { ContactFormData } from '../types';

export const IndividualPartnerPage: React.FC = () => {
  const { partnerSlug } = useParams<{ partnerSlug: string }>();
  const navigate = useNavigate();

  // Find partner data
  const partner: IndividualPartner | undefined = partnerSlug
    ? INDIVIDUAL_PARTNERS_DATA[partnerSlug]
    : undefined;

  // Scroll to top indicator
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Modal and consultation state
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    companyName: '',
    workEmail: '',
    phoneNumber: '',
    areaOfInterest: partnerSlug || 'sap-b1',
    message: ''
  });
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessSubmitted, setIsSuccessSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [partnerSlug]);

  // If slug is invalid, redirect to /partners
  if (!partner) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center bg-white">
        <h2 className="font-serif text-3xl font-bold text-[#142B59] mb-4">Partner Not Found</h2>
        <p className="text-[#45546B] max-w-md mb-6">
          The technology partner page you are looking for does not exist or has been relocated.
        </p>
        <Link
          to="/partners"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#0052CC] to-[#0A66C2] text-white font-semibold shadow-md hover:shadow-lg transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to All Partners</span>
        </Link>
      </div>
    );
  }

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
      errors.message = 'Please briefly outline your requirements';
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
    }, 450);
  };

  const renderIcon = (iconName: string, className = "w-5 h-5") => {
    switch (iconName) {
      case 'Building2':
        return <Building2 className={className} />;
      case 'TrendingUp':
        return <TrendingUp className={className} />;
      case 'ShoppingCart':
        return <ShoppingCart className={className} />;
      case 'Boxes':
        return <Boxes className={className} />;
      case 'Factory':
        return <Factory className={className} />;
      case 'Cpu':
        return <Cpu className={className} />;
      case 'Truck':
        return <Truck className={className} />;
      case 'Ship':
        return <Ship className={className} />;
      case 'Settings':
        return <Settings className={className} />;
      case 'ShieldCheck':
        return <ShieldCheck className={className} />;
      case 'FileCheck':
        return <FileCheck className={className} />;
      case 'Sparkles':
        return <Sparkles className={className} />;
      default:
        return <CheckCircle2 className={className} />;
    }
  };

  const renderPartnerLogo = (badgeType: string, className = "h-9") => {
    switch (badgeType) {
      case 'sap':
        return <SAPBusinessOneLogo className={className} />;
      case 'boyum':
        return <BoyumITLogo className={className} />;
      case 'uipath':
        return <UiPathLogo className={className} />;
      case 'atlas':
        return <AtlasLogo className={className} />;
      default:
        return null;
    }
  };

  return (
    <div className="relative bg-white text-[#45546B] selection:bg-blue-600 selection:text-white">
      {/* Background Decorative Ambient Glow matching About Page */}
      <div className="absolute -left-12 top-1/2 -translate-y-1/2 w-48 h-80 opacity-25 pointer-events-none select-none hidden lg:block">
        <div className="w-full h-full bg-gradient-to-tr from-emerald-600/30 via-teal-500/10 to-transparent rounded-full blur-3xl" />
      </div>

      {/* ========================================================================= */}
      {/* TOP NAVIGATION STRIP & BREADCRUMBS                                       */}
      {/* ========================================================================= */}
      <section className="bg-slate-50/80 border-b border-slate-200/80 py-3.5">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            
            {/* Breadcrumbs: Home -> Partners -> Partner Name */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm font-medium">
              <Link to="/" className="text-slate-500 hover:text-[#1B72E8] transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <Link to="/partners" className="text-slate-500 hover:text-[#1B72E8] transition-colors">
                Partners
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-[#142B59] font-bold">
                {partner.name}
              </span>
            </nav>

            {/* Back to Partners Link Button */}
            <Link
              to="/partners"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#1B72E8] hover:text-[#1557B0] group transition-colors"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to All Partners</span>
            </Link>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 1: HERO SECTION                                                   */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-r from-sky-50/60 via-white to-blue-50/30 pt-10 pb-14 lg:pt-14 lg:pb-18 border-b border-slate-100">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Column: Eyebrow, Partner Logo, Heading, Intro & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* Eyebrow & Verified Partnership Pill */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-[12px] sm:text-[13px] font-bold uppercase tracking-wider text-[#1B72E8]">
                  {partner.eyebrow}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-[#1B72E8] border border-blue-200">
                  <Award className="w-3.5 h-3.5" />
                  <span>{partner.partnershipLevel}</span>
                </span>
              </div>

              {/* Partner Logo Ribbon */}
              <div className="pt-1">
                <div className="inline-block bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-xl border border-slate-200/90 shadow-sm">
                  {renderPartnerLogo(partner.badgeType, "h-9 sm:h-10")}
                </div>
              </div>

              {/* Main Headline */}
              <h1 className="font-serif text-[36px] sm:text-[44px] lg:text-[48px] xl:text-[52px] font-bold tracking-tight leading-[1.15] text-[#142B59]">
                {partner.heroTitle}{' '}
                <span className="bg-gradient-to-r from-[#0052CC] via-[#0066CC] to-[#0A66C2] bg-clip-text text-transparent">
                  {partner.heroHighlight}
                </span>
              </h1>

              {/* Partner Introduction */}
              <p className="text-[16px] sm:text-[17px] lg:text-[18px] text-[#45546B] leading-relaxed max-w-2xl font-normal">
                {partner.introduction}
              </p>

              {/* Dual Action CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={() => setIsConsultationModalOpen(true)}
                  className="inline-flex items-center justify-center gap-2 text-[16px] font-semibold px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#0052CC] to-[#0A66C2] hover:from-[#0040A8] hover:to-[#08529C] text-white shadow-md shadow-blue-500/25 transition-all duration-200 cursor-pointer"
                >
                  <span>Book a Consultation</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <a
                  href="#capabilities"
                  className="inline-flex items-center justify-center gap-2 text-[16px] font-semibold px-8 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-[#142B59] border border-slate-200/90 shadow-sm transition-all duration-200 cursor-pointer"
                >
                  <span>Explore Capabilities</span>
                </a>
              </div>
            </div>

            {/* Right Column: Hero Visual with Partner Logo Overlay */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200/90 bg-white group">
                <img
                  src={partner.heroImage}
                  alt={`${partner.name} enterprise technology deployment`}
                  className="w-full h-[380px] sm:h-[430px] lg:h-[460px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />

                {/* Overlaid Partner Badge at Bottom Left */}
                <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-md rounded-xl p-3.5 shadow-lg border border-slate-200/90 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                      Technology Partner
                    </span>
                    <span className="text-[14px] font-bold text-[#142B59]">
                      {partner.name}
                    </span>
                  </div>
                  <div className="shrink-0">
                    {renderPartnerLogo(partner.badgeType, "h-7")}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: VERIFIED METRICS BAR                                           */}
      {/* ========================================================================= */}
      <section className="py-8 sm:py-10 bg-white border-b border-slate-100">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {partner.metrics.map((metric, idx) => (
              <div
                key={idx}
                className="bg-slate-50/70 rounded-2xl p-5 sm:p-6 border border-slate-200/80 text-left hover:border-blue-300 hover:bg-white hover:shadow-md transition-all group"
              >
                <div className="font-serif text-[32px] sm:text-[40px] font-bold bg-gradient-to-r from-[#0052CC] to-[#0A66C2] bg-clip-text text-transparent leading-none mb-1.5">
                  {metric.value}
                </div>
                <div className="text-[14px] sm:text-[15px] font-bold text-[#142B59] leading-tight">
                  {metric.label}
                </div>
                <div className="text-[12px] text-slate-500 leading-snug mt-1">
                  {metric.sublabel}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: TECHNOLOGY & ARCHITECTURE OVERVIEW                             */}
      {/* ========================================================================= */}
      <section className="py-16 lg:py-24 bg-slate-50/60 border-b border-slate-100">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left 6 Cols: Secondary Visual */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200/90 bg-white group">
                <img
                  src={partner.secondaryImage}
                  alt={`${partner.name} architecture overview`}
                  className="w-full h-[360px] sm:h-[420px] object-cover group-hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md rounded-xl px-4 py-2 shadow-md border border-slate-200/90 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#1B72E8]" />
                  <span className="text-xs font-bold text-slate-700">
                    Enterprise Architecture
                  </span>
                </div>
              </div>
            </div>

            {/* Right 7 Cols: Overview Narrative & Architectural Highlights */}
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-6 text-left">
              <div className="inline-block">
                <span className="text-[13px] font-bold uppercase tracking-wider text-[#1B72E8]">
                  TECHNOLOGY & ARCHITECTURE —
                </span>
              </div>

              <h2 className="font-serif text-[30px] sm:text-[36px] lg:text-[40px] font-bold text-[#142B59] tracking-tight leading-tight">
                {partner.techOverview.title}
              </h2>

              <p className="text-[16px] sm:text-[17px] text-[#45546B] leading-relaxed font-normal">
                {partner.techOverview.description}
              </p>

              {/* 4 Architecture Points */}
              <div className="space-y-3 pt-2">
                {partner.techOverview.architecturePoints.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-sm">
                    <div className="w-6 h-6 rounded-md bg-blue-50 text-[#1B72E8] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-4 h-4 stroke-[2.5]" />
                    </div>
                    <span className="text-[14px] sm:text-[15px] font-medium text-slate-700 leading-snug">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: KEY CAPABILITIES & FEATURES (6 CARDS GRID)                    */}
      {/* ========================================================================= */}
      <section id="capabilities" className="py-16 lg:py-24 bg-white border-b border-slate-100">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-left mb-12 space-y-2">
            <span className="text-[13px] font-bold uppercase tracking-wider text-[#1B72E8] block">
              CORE CAPABILITIES —
            </span>
            <h2 className="font-serif text-[32px] sm:text-[38px] lg:text-[42px] font-bold text-[#142B59] tracking-tight">
              Key Features &{' '}
              <span className="bg-gradient-to-r from-[#0052CC] via-[#0066CC] to-[#0A66C2] bg-clip-text text-transparent">
                Functional Highlights
              </span>
            </h2>
            <p className="text-[16px] sm:text-[17px] text-[#45546B] leading-relaxed max-w-3xl">
              Engineered to handle complex business transactions, streamline cross-functional workflows, and empower teams with real-time operational accuracy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {partner.capabilities.map((cap, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between text-left group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200/80 text-[#1B72E8] flex items-center justify-center mb-5 group-hover:bg-[#1B72E8] group-hover:text-white transition-colors duration-200 shadow-sm">
                    {renderIcon(cap.iconName, "w-6 h-6")}
                  </div>

                  <h3 className="text-[19px] font-bold text-[#172B50] mb-2.5 leading-snug group-hover:text-[#1B72E8] transition-colors">
                    {cap.title}
                  </h3>

                  <p className="text-[14px] sm:text-[15px] text-[#53647A] leading-relaxed">
                    {cap.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: MEASURABLE BUSINESS BENEFITS (4 CARDS)                         */}
      {/* ========================================================================= */}
      <section className="py-16 lg:py-24 bg-slate-50/60 border-b border-slate-100">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-left mb-12 space-y-2">
            <span className="text-[13px] font-bold uppercase tracking-wider text-[#1B72E8] block">
              MEASURABLE ROI —
            </span>
            <h2 className="font-serif text-[32px] sm:text-[38px] lg:text-[42px] font-bold text-[#142B59] tracking-tight">
              Proven Business{' '}
              <span className="bg-gradient-to-r from-[#0052CC] via-[#0066CC] to-[#0A66C2] bg-clip-text text-transparent">
                Advantages
              </span>
            </h2>
            <p className="text-[16px] sm:text-[17px] text-[#45546B] leading-relaxed max-w-3xl">
              Concrete operational improvements and financial returns delivered through structured ATLAS Technosoft deployments.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {partner.benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between text-left group"
              >
                <div>
                  {benefit.metric && (
                    <div className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-[#1B72E8] border border-blue-200/80 mb-4">
                      {benefit.metric}
                    </div>
                  )}

                  <h3 className="text-[18px] font-bold text-[#172B50] mb-2 leading-snug group-hover:text-[#1B72E8] transition-colors">
                    {benefit.title}
                  </h3>

                  <p className="text-[14px] text-[#53647A] leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6: HOW ATLAS WORKS WITH PARTNER TECHNOLOGY                       */}
      {/* ========================================================================= */}
      <section className="py-16 lg:py-24 bg-white border-b border-slate-100">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-left mb-12 space-y-2">
            <span className="text-[13px] font-bold uppercase tracking-wider text-[#1B72E8] block">
              OUR IMPLEMENTATION METHODOLOGY —
            </span>
            <h2 className="font-serif text-[32px] sm:text-[38px] lg:text-[42px] font-bold text-[#142B59] tracking-tight">
              How ATLAS Delivers{' '}
              <span className="bg-gradient-to-r from-[#0052CC] via-[#0066CC] to-[#0A66C2] bg-clip-text text-transparent">
                {partner.name}
              </span>
            </h2>
            <p className="text-[16px] sm:text-[17px] text-[#45546B] leading-relaxed max-w-3xl">
              A structured 4-phase rollout methodology refined across 80+ live deployments ensuring on-time delivery and predictable results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {partner.howAtlasWorks.map((pillar, idx) => (
              <div
                key={idx}
                className="bg-slate-50/70 rounded-2xl p-6 border border-slate-200/90 text-left hover:bg-white hover:shadow-lg hover:border-blue-300 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="font-serif text-3xl font-bold text-[#1B72E8] mb-3">
                    {pillar.step}
                  </div>
                  
                  <h3 className="text-[18px] font-bold text-[#142B59] mb-2 leading-snug">
                    {pillar.title}
                  </h3>

                  <p className="text-[13px] sm:text-[14px] text-[#53647A] leading-relaxed mb-4">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200/80 space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    Key Deliverables:
                  </span>
                  {pillar.deliverables.map((item, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-2 text-xs text-slate-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#1B72E8] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 7: RELEVANT INDUSTRIES & USE CASES                                */}
      {/* ========================================================================= */}
      <section className="py-16 lg:py-24 bg-slate-50/60 border-b border-slate-100">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-left mb-12 space-y-2">
            <span className="text-[13px] font-bold uppercase tracking-wider text-[#1B72E8] block">
              INDUSTRY APPLICATIONS —
            </span>
            <h2 className="font-serif text-[32px] sm:text-[38px] lg:text-[42px] font-bold text-[#142B59] tracking-tight">
              Tailored Industry{' '}
              <span className="bg-gradient-to-r from-[#0052CC] via-[#0066CC] to-[#0A66C2] bg-clip-text text-transparent">
                Solutions
              </span>
            </h2>
            <p className="text-[16px] sm:text-[17px] text-[#45546B] leading-relaxed max-w-3xl">
              Discover how {partner.name} addresses sector-specific manufacturing, logistics, and trading challenges.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {partner.industryUseCases.map((useCase, idx) => (
              <div
                key={idx}
                onClick={() => navigate(useCase.route)}
                className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1.5 hover:border-blue-300 transition-all duration-300 flex flex-col justify-between text-left cursor-pointer group"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-200 text-[#1B72E8] flex items-center justify-center mb-4 group-hover:bg-[#1B72E8] group-hover:text-white transition-colors shadow-sm">
                    {renderIcon(useCase.iconName, "w-5 h-5")}
                  </div>

                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#1B72E8] block mb-1">
                    {useCase.industry}
                  </span>

                  <h3 className="text-[17px] font-bold text-[#172B50] mb-2 leading-snug group-hover:text-[#1B72E8] transition-colors">
                    {useCase.title}
                  </h3>

                  <p className="text-[13px] text-slate-600 leading-relaxed">
                    {useCase.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#1B72E8] group-hover:underline">
                    Explore Industry
                  </span>
                  <div className="w-7 h-7 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center group-hover:bg-[#1B72E8] group-hover:text-white transition-colors">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 8: RELATED SERVICES & SOLUTIONS                                   */}
      {/* ========================================================================= */}
      <section className="py-16 lg:py-20 bg-white border-b border-slate-100">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-left mb-10 space-y-2">
            <span className="text-[13px] font-bold uppercase tracking-wider text-[#1B72E8] block">
              ECOSYSTEM SYNERGY —
            </span>
            <h2 className="font-serif text-[28px] sm:text-[34px] font-bold text-[#142B59] tracking-tight">
              Complementary Services &{' '}
              <span className="bg-gradient-to-r from-[#0052CC] via-[#0066CC] to-[#0A66C2] bg-clip-text text-transparent">
                Solutions
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {partner.relatedServices.map((rel, idx) => (
              <Link
                key={idx}
                to={rel.route}
                className="bg-slate-50/70 rounded-2xl p-6 border border-slate-200/90 hover:bg-white hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between text-left group"
              >
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#1B72E8] block mb-1.5">
                    {rel.category}
                  </span>
                  <h3 className="text-[18px] font-bold text-[#142B59] mb-2 leading-snug group-hover:text-[#1B72E8] transition-colors">
                    {rel.title}
                  </h3>
                  <p className="text-[13px] sm:text-[14px] text-[#53647A] leading-relaxed">
                    {rel.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-200/60 flex items-center gap-1.5 text-xs font-bold text-[#1B72E8] group-hover:underline">
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 9: CONSULTATION CTA CARD (CONSISTENT WITH ABOUT/PARTNERS)          */}
      {/* ========================================================================= */}
      <section className="py-12 lg:py-16 bg-slate-50/50">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-[#eaf4ff] border border-blue-200/90 p-8 sm:p-10 lg:p-12 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Heading, Subtext & Button */}
              <div className="lg:col-span-6 space-y-4 text-left">
                <span className="text-[12px] sm:text-[13px] font-bold uppercase tracking-wider text-[#1B72E8]">
                  CONNECT WITH OUR SPECIALISTS
                </span>

                <h2 className="font-serif text-[28px] sm:text-[34px] lg:text-[38px] font-bold text-[#142B59] tracking-tight leading-tight">
                  Ready to Deploy{' '}
                  <span className="bg-gradient-to-r from-[#0052CC] via-[#0066CC] to-[#0A66C2] bg-clip-text text-transparent">
                    {partner.name}?
                  </span>
                </h2>

                <p className="text-[15px] sm:text-[16px] text-[#45546B] leading-relaxed max-w-xl">
                  Schedule a discovery session with our certified architects to explore how {partner.name} can streamline operations and drive bottom-line efficiency.
                </p>

                <div className="pt-2">
                  <button
                    onClick={() => setIsConsultationModalOpen(true)}
                    className="inline-flex items-center justify-center gap-2 text-[15px] sm:text-[16px] font-semibold px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#0052CC] to-[#0A66C2] hover:from-[#0040A8] hover:to-[#08529C] text-white shadow-md shadow-blue-500/25 transition-all cursor-pointer"
                  >
                    <span>Book a Partner Consultation</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Right Column: 3 Contact Boxes */}
              <div className="lg:col-span-6 space-y-3.5">
                {/* Email Box */}
                <a
                  href={`mailto:sales@atlastechnosoft.com?subject=Partnership%20Inquiry%20-%20${encodeURIComponent(partner.name)}`}
                  className="bg-white rounded-xl p-4 sm:p-4.5 border-2 border-[#16b978] shadow-sm hover:shadow-md transition-all flex items-center gap-4 group"
                >
                  <div className="w-11 h-11 rounded-lg bg-blue-50 border border-blue-100 text-[#0878f9] flex items-center justify-center shrink-0 group-hover:bg-[#0878f9] group-hover:text-white transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Direct Email
                    </p>
                    <p className="text-[15px] font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      sales@atlastechnosoft.com
                    </p>
                  </div>
                </a>

                {/* Phone Box */}
                <a
                  href="tel:+919372329599"
                  className="bg-white rounded-xl p-4 sm:p-4.5 border-2 border-[#2992ff] shadow-sm hover:shadow-md transition-all flex items-center gap-4 group"
                >
                  <div className="w-11 h-11 rounded-lg bg-blue-50 border border-blue-100 text-[#0878f9] flex items-center justify-center shrink-0 group-hover:bg-[#0878f9] group-hover:text-white transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Telephone
                    </p>
                    <p className="text-[15px] font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      +91-9372329599
                    </p>
                  </div>
                </a>

                {/* Office Location Box */}
                <div className="bg-white rounded-xl p-4 sm:p-4.5 border-2 border-[#0A66C2] shadow-sm flex items-center gap-4">
                  <div className="w-11 h-11 rounded-lg bg-blue-50 border border-blue-100 text-[#0878f9] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Locations
                    </p>
                    <p className="text-[14px] font-bold text-slate-900">
                      Borivali & Marine Lines, Mumbai
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* FLOATING SCROLL TO TOP BUTTON                                             */}
      {/* ========================================================================= */}
      /* Global scroll-to-top handled by SiteLayout */

      {/* ========================================================================= */}
      {/* INTERACTIVE CONSULTATION BOOKING MODAL                                    */}
      {/* ========================================================================= */}
      <Modal
        isOpen={isConsultationModalOpen}
        onClose={() => {
          setIsConsultationModalOpen(false);
          setIsSuccessSubmitted(false);
        }}
        title={`Consult with Our ${partner.name} Architects`}
      >
        {isSuccessSubmitted ? (
          <div className="p-6 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-[#142B59]">Inquiry Received</h3>
            <p className="text-slate-600 text-sm max-w-sm mx-auto">
              Thank you for reaching out regarding {partner.name}. A certified solution architect will contact you within 1 business day.
            </p>
            <button
              onClick={() => {
                setIsConsultationModalOpen(false);
                setIsSuccessSubmitted(false);
              }}
              className="mt-4 px-6 py-2.5 rounded-xl bg-[#1B72E8] text-white font-semibold text-sm hover:bg-blue-700 transition-colors"
            >
              Close Window
            </button>
          </div>
        ) : (
          <form onSubmit={handleFormSubmit} className="space-y-4 text-left">
            <p className="text-xs text-slate-500 mb-2">
              Fill in your details below and an enterprise partner specialist will arrange a tailored demonstration.
            </p>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Full Name *
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="e.g. Rajesh Sharma"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none transition-colors ${
                  formErrors.fullName ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300 focus:border-blue-500'
                }`}
              />
              {formErrors.fullName && (
                <p className="text-rose-500 text-xs mt-1">{formErrors.fullName}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Company Name *
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  placeholder="e.g. Apex Industries"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none transition-colors ${
                    formErrors.companyName ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300 focus:border-blue-500'
                  }`}
                />
                {formErrors.companyName && (
                  <p className="text-rose-500 text-xs mt-1">{formErrors.companyName}</p>
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
                  placeholder="e.g. +91 98765 43210"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none transition-colors ${
                    formErrors.phoneNumber ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300 focus:border-blue-500'
                  }`}
                />
                {formErrors.phoneNumber && (
                  <p className="text-rose-500 text-xs mt-1">{formErrors.phoneNumber}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Corporate Work Email *
              </label>
              <input
                type="email"
                name="workEmail"
                value={formData.workEmail}
                onChange={handleInputChange}
                placeholder="e.g. rajesh@apexindustries.com"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none transition-colors ${
                  formErrors.workEmail ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300 focus:border-blue-500'
                }`}
              />
              {formErrors.workEmail && (
                <p className="text-rose-500 text-xs mt-1">{formErrors.workEmail}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Project Scope / Key Requirements *
              </label>
              <textarea
                name="message"
                rows={3}
                value={formData.message}
                onChange={handleInputChange}
                placeholder={`Briefly describe your objectives or questions regarding ${partner.name}...`}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none transition-colors ${
                  formErrors.message ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300 focus:border-blue-500'
                }`}
              />
              {formErrors.message && (
                <p className="text-rose-500 text-xs mt-1">{formErrors.message}</p>
              )}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#0052CC] to-[#0A66C2] hover:from-[#0040A8] hover:to-[#08529C] text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
              >
                {isSubmitting ? (
                  <span>Submitting Inquiry...</span>
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
    </div>
  );
};

