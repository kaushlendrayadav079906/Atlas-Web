import { CtaContactCards } from '../components/ui/CtaContactCards';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Factory,
  Boxes,
  Truck,
  ShoppingCart,
  Cpu,
  Building2,
  Lightbulb,
  Settings,
  TrendingUp,
  MessageSquare,
  FileCheck,
  ShieldCheck,
  CheckCircle2,
  Mail,
  Phone,
  MapPin,
  ChevronUp,
  Send,
  Users,
  Award,
  Sparkles,
  Check
} from 'lucide-react';
import { Modal } from '../components/ui/Modal';
import { SAPBusinessOneLogo, BoyumITLogo, UiPathLogo } from '../components/ui/PartnerLogos';
import { BRAND_INFO } from '../data/websiteContent';
import { ContactFormData } from '../types';
import {
  CASE_STUDIES_HERO_DATA,
  FEATURED_CASE_STUDY_DATA,
  MORE_CASE_STUDIES_DATA,
  OUR_APPROACH_DATA,
  TECHNOLOGY_SHOWCASE_DATA,
  CASE_STUDIES_CTA_DATA,
  CaseStudyItem
} from '../data/caseStudiesContent';

export const CaseStudiesPage: React.FC = () => {
  const navigate = useNavigate();
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Form State
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

  const renderCardIcon = (iconName: string, className = 'w-5 h-5') => {
    switch (iconName) {
      case 'boxes':
        return <Boxes className={className} />;
      case 'truck':
        return <Truck className={className} />;
      case 'shopping-cart':
        return <ShoppingCart className={className} />;
      case 'cpu':
        return <Cpu className={className} />;
      case 'factory':
        return <Factory className={className} />;
      default:
        return <CheckCircle2 className={className} />;
    }
  };

  const renderApproachIcon = (iconName: string) => {
    switch (iconName) {
      case 'message-square':
        return <MessageSquare className="w-6 h-6 text-white" />;
      case 'file-check':
        return <FileCheck className="w-6 h-6 text-white" />;
      case 'lightbulb':
        return <Lightbulb className="w-6 h-6 text-white" />;
      case 'settings':
        return <Settings className="w-6 h-6 text-white" />;
      case 'shield-check':
        return <ShieldCheck className="w-6 h-6 text-white" />;
      default:
        return <Sparkles className="w-6 h-6 text-white" />;
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
                  {CASE_STUDIES_HERO_DATA.eyebrow}
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="font-serif text-[38px] sm:text-[46px] lg:text-[52px] xl:text-[56px] font-bold tracking-tight leading-[1.14] text-[#142B59]">
                {CASE_STUDIES_HERO_DATA.titleStart}{' '}
                <span className="bg-gradient-to-r from-[#0052CC] via-[#0066CC] to-[#0A66C2] bg-clip-text text-transparent">{CASE_STUDIES_HERO_DATA.titleHighlight}</span>
              </h1>

              {/* Subheading / Description */}
              <p className="text-[16px] sm:text-[17px] lg:text-[18px] text-[#45546B] leading-relaxed max-w-2xl font-normal">
                {CASE_STUDIES_HERO_DATA.description}
              </p>

              {/* Dual Action CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="#featured-case-study"
                  className="inline-flex items-center justify-center gap-2 text-[16px] font-semibold px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#0052CC] to-[#0A66C2] hover:from-[#0040A8] hover:to-[#08529C] text-white shadow-md shadow-blue-500/25 transition-all duration-200 cursor-pointer"
                >
                  <span>{CASE_STUDIES_HERO_DATA.primaryCtaText}</span>
                  <ArrowRight className="w-5 h-5" />
                </a>

                <button
                  onClick={() => setIsConsultationModalOpen(true)}
                  className="inline-flex items-center justify-center gap-2 text-[16px] font-semibold px-8 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-[#142B59] border border-slate-200/90 shadow-sm transition-all duration-200 cursor-pointer"
                >
                  <span>{CASE_STUDIES_HERO_DATA.secondaryCtaText}</span>
                </button>
              </div>
            </div>

            {/* Right Visual Column: Business Team with 3 Floating Cards */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200/90 bg-white group">
                <img
                  src={CASE_STUDIES_HERO_DATA.heroImage}
                  alt="ATLAS Technosoft Enterprise Team Reviewing Real-Time ERP Dashboards"
                  className="w-full h-[380px] sm:h-[440px] lg:h-[480px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />

                {/* 3 Floating Badges Stacked Top Right */}
                <div className="absolute top-4 right-4 sm:top-5 sm:right-5 space-y-2 pointer-events-none">
                  {CASE_STUDIES_HERO_DATA.floatingBadges.map((badge, idx) => (
                    <div
                      key={idx}
                      className="bg-white/95 backdrop-blur-md rounded-xl px-3.5 py-2 shadow-md border border-slate-200/90 flex items-center gap-2.5 max-w-[220px]"
                    >
                      <span
                        className="w-6 h-6 rounded-md flex items-center justify-center text-white shrink-0 text-xs font-bold"
                        style={{ backgroundColor: badge.color }}
                      >
                        ✓
                      </span>
                      <span className="text-[12px] sm:text-[13px] font-bold text-[#142B59]">
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
      {/* SECTION 2: FEATURED CASE STUDY (MANUFACTURING COMPANY)                     */}
      {/* ========================================================================= */}
      <section id="featured-case-study" className="py-16 lg:py-24 bg-white border-b border-slate-100">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Eyebrow & Main Heading */}
          <div className="mb-10 text-left space-y-2">
            <span className="text-[13px] sm:text-[14px] font-bold uppercase tracking-wider text-[#1B72E8]">
              {FEATURED_CASE_STUDY_DATA.eyebrow}
            </span>
            <h2 className="font-serif text-[30px] sm:text-[36px] lg:text-[40px] font-bold text-[#142B59] tracking-tight max-w-4xl leading-tight">
              Manufacturing Company Streamlines Operations with{' '}
              <span className="bg-gradient-to-r from-[#0052CC] via-[#0066CC] to-[#0A66C2] bg-clip-text text-transparent">SAP Business One</span>
            </h2>
          </div>

          {/* Two-Column Featured Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Image: Robotic Assembly Plant */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200/90 bg-slate-100 group">
                <img
                  src={FEATURED_CASE_STUDY_DATA.image}
                  alt="Industrial Automotive Assembly Robotics"
                  className="w-full h-[360px] sm:h-[420px] lg:h-[460px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Right Content: 2x2 Feature Grid & CTA Button */}
            <div className="lg:col-span-6 space-y-6 text-left">
              {/* Category Pill + Subtitle */}
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-50 border border-blue-200 text-[#1B72E8] font-bold text-xs uppercase tracking-wider">
                  <Factory className="w-4 h-4" />
                  <span>{FEATURED_CASE_STUDY_DATA.industryLabel}</span>
                </div>
                <h3 className="font-serif text-[22px] sm:text-[25px] font-bold text-[#142B59] leading-snug">
                  {FEATURED_CASE_STUDY_DATA.title}
                </h3>
              </div>

              {/* 2x2 Key Breakdown Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 1. Business Challenge */}
                <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 space-y-1.5 hover:shadow-sm transition-shadow">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0066CC] border border-blue-200/80 flex items-center justify-center shrink-0">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <h4 className="text-[14px] font-bold text-[#142B59]">
                      {FEATURED_CASE_STUDY_DATA.challenge.title}
                    </h4>
                  </div>
                  <p className="text-[13px] text-[#45546B] leading-relaxed">
                    {FEATURED_CASE_STUDY_DATA.challenge.description}
                  </p>
                </div>

                {/* 2. Solution Implemented */}
                <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 space-y-1.5 hover:shadow-sm transition-shadow">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#16a879] flex items-center justify-center shrink-0">
                      <Lightbulb className="w-4 h-4" />
                    </div>
                    <h4 className="text-[14px] font-bold text-[#142B59]">
                      {FEATURED_CASE_STUDY_DATA.solution.title}
                    </h4>
                  </div>
                  <p className="text-[13px] text-[#45546B] leading-relaxed">
                    {FEATURED_CASE_STUDY_DATA.solution.description}
                  </p>
                </div>

                {/* 3. Technology Used */}
                <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 space-y-1.5 hover:shadow-sm transition-shadow">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0066CC] flex items-center justify-center shrink-0">
                      <Settings className="w-4 h-4" />
                    </div>
                    <h4 className="text-[14px] font-bold text-[#142B59]">
                      {FEATURED_CASE_STUDY_DATA.technology.title}
                    </h4>
                  </div>
                  <p className="text-[13px] text-[#45546B] leading-relaxed">
                    {FEATURED_CASE_STUDY_DATA.technology.description}
                  </p>
                </div>

                {/* 4. Key Outcomes */}
                <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 space-y-1.5 hover:shadow-sm transition-shadow">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0878f9] flex items-center justify-center shrink-0">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <h4 className="text-[14px] font-bold text-[#142B59]">
                      {FEATURED_CASE_STUDY_DATA.outcomes.title}
                    </h4>
                  </div>
                  <p className="text-[13px] text-[#45546B] leading-relaxed">
                    {FEATURED_CASE_STUDY_DATA.outcomes.description}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <Link
                  to="/industries/manufacturing"
                  className="inline-flex items-center justify-center gap-2 text-[15px] sm:text-[16px] font-semibold px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#0052CC] to-[#0A66C2] hover:from-[#0040A8] hover:to-[#08529C] text-white shadow-md shadow-blue-500/25 transition-all cursor-pointer"
                >
                  <span>{FEATURED_CASE_STUDY_DATA.ctaText}</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: MORE CASE STUDIES (4 CARDS)                                    */}
      {/* ========================================================================= */}
      <section id="more-case-studies" className="py-16 lg:py-24 bg-slate-50/60 border-b border-slate-100">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-left mb-12 space-y-2">
            <h2 className="font-serif text-[32px] sm:text-[38px] lg:text-[42px] font-bold text-[#142B59] tracking-tight">
              More Case <span className="bg-gradient-to-r from-[#0052CC] via-[#0066CC] to-[#0A66C2] bg-clip-text text-transparent">Studies</span>
            </h2>
            <p className="text-[16px] sm:text-[17px] text-[#45546B] leading-relaxed max-w-3xl">
              Explore how businesses across different industries have improved their operations with our solutions.
            </p>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
            {MORE_CASE_STUDIES_DATA.map((study) => (
              <div
                key={study.id}
                onClick={(e) => {
                  if ((e.target as HTMLElement).closest('a')) return;
                  navigate(study.route);
                }}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between cursor-pointer"
                style={{
                  border: `2px solid ${study.accentColor}`
                }}
              >
                <div>
                  {/* Card Image */}
                  <div className="relative h-44 overflow-hidden bg-slate-100">
                    <img
                      src={study.image}
                      alt={study.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        if (study.fallbackCrop) {
                          e.currentTarget.src = study.fallbackCrop;
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                    {/* Category Icon Badge */}
                    <div
                      className="absolute bottom-3 left-4 w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-md"
                      style={{ backgroundColor: study.accentColor }}
                    >
                      {renderCardIcon(study.iconName, 'w-5 h-5')}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 sm:p-6 space-y-2.5 text-left">
                    <span
                      className="text-[11px] font-bold uppercase tracking-wider block"
                      style={{ color: study.accentColor }}
                    >
                      {study.category}
                    </span>
                    <h3 className="text-[19px] font-bold text-[#172B50] leading-snug group-hover:text-[#1B72E8] transition-colors">
                      <Link to={study.route}>
                        {study.title}
                      </Link>
                    </h3>
                    <p className="text-[14px] text-[#53647A] leading-relaxed line-clamp-3">
                      {study.description}
                    </p>
                  </div>
                </div>

                {/* Card Footer: Read More Link + Circular Arrow */}
                <div className="px-5 pb-5 pt-2 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    to={study.route}
                    className="text-[14px] font-bold text-[#142B59] hover:text-[#1B72E8] flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Read More</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                    to={study.route}
                    aria-label={`Read ${study.title}`}
                    className="w-8 h-8 rounded-full flex items-center justify-center border transition-all cursor-pointer"
                    style={{
                      borderColor: study.accentColor,
                      color: study.accentColor
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
      {/* SECTION 4: OUR APPROACH TO SUCCESS (5 CONNECTED STEPS)                     */}
      {/* ========================================================================= */}
      <section className="py-16 lg:py-24 bg-white border-b border-slate-100 relative overflow-hidden">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-left max-w-3xl mb-16 space-y-2">
            <h2 className="font-serif text-[32px] sm:text-[38px] lg:text-[42px] font-bold text-[#142B59] tracking-tight">
              {OUR_APPROACH_DATA.titleStart}{' '}
              <span className="bg-gradient-to-r from-[#0052CC] via-[#0066CC] to-[#0A66C2] bg-clip-text text-transparent">{OUR_APPROACH_DATA.titleHighlight}</span>
            </h2>
            <p className="text-[16px] sm:text-[17px] text-[#45546B] leading-relaxed">
              {OUR_APPROACH_DATA.description}
            </p>
          </div>

          {/* 5 Connected Steps with Arrows */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-2">
            {OUR_APPROACH_DATA.steps.map((step, idx) => {
              const isLast = idx === OUR_APPROACH_DATA.steps.length - 1;
              return (
                <React.Fragment key={step.stepNumber}>
                  {/* Step Item */}
                  <div className="flex flex-col items-center text-center max-w-[210px] group">
                    {/* Circle Badge */}
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: step.color }}
                    >
                      {renderApproachIcon(step.iconName)}
                    </div>

                    {/* Step Title & Number */}
                    <h3 className="mt-4 text-[15px] font-bold text-[#172B50] leading-tight group-hover:text-[#1B72E8] transition-colors">
                      <span className="font-extrabold block text-xs opacity-70 mb-0.5">
                        {step.stepNumber}
                      </span>
                      {step.title}
                    </h3>
                  </div>

                  {/* Connecting Arrow between steps */}
                  {!isLast && (
                    <div className="hidden lg:flex items-center justify-center text-blue-600/50 px-1">
                      <ArrowRight className="w-6 h-6 stroke-[2.5]" />
                    </div>
                  )}
                  {!isLast && (
                    <div className="flex lg:hidden items-center justify-center text-blue-600/50 py-2">
                      <div className="w-0.5 h-6 bg-blue-600/30" />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: TECHNOLOGIES USED IN OUR CASE STUDIES (4 TECH CARDS)            */}
      {/* ========================================================================= */}
      <section className="py-16 lg:py-24 bg-slate-50/60 border-b border-slate-100">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-left max-w-3xl mb-12 space-y-2">
            <h2 className="font-serif text-[32px] sm:text-[38px] lg:text-[42px] font-bold text-[#142B59] tracking-tight">
              {TECHNOLOGY_SHOWCASE_DATA.titleStart}{' '}
              <span className="bg-gradient-to-r from-[#0052CC] via-[#0066CC] to-[#0A66C2] bg-clip-text text-transparent">{TECHNOLOGY_SHOWCASE_DATA.titleHighlight}</span>
            </h2>
            <p className="text-[16px] sm:text-[17px] text-[#45546B] leading-relaxed">
              {TECHNOLOGY_SHOWCASE_DATA.description}
            </p>
          </div>

          {/* 4 Partner / Technology Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TECHNOLOGY_SHOWCASE_DATA.items.map((tech) => (
              <div
                key={tech.id}
                className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4 text-left">
                  {/* Logo Display */}
                  <div className="h-12 flex items-center">
                    {tech.type === 'sap' && <SAPBusinessOneLogo className="scale-105" />}
                    {tech.type === 'boyum' && <BoyumITLogo className="scale-105" />}
                    {tech.type === 'uipath' && <UiPathLogo className="scale-105" />}
                    {tech.type === 'atlas' && (
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center shrink-0">
                          <img src="/images/logo.png" alt="ATLAS Logo" className="w-full h-full object-contain" />
                        </div>
                        <span className="font-extrabold text-[17px] text-slate-900 tracking-tight">
                          ATLAS <span className="text-slate-500 font-semibold text-xs block">Technosoft</span>
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Text Details */}
                  <div className="space-y-1 pt-1">
                    <h3 className="text-[17px] font-bold text-[#172B50]">
                      {tech.name}
                    </h3>
                    <p className="text-[13px] font-semibold text-blue-600">
                      {tech.role}
                    </p>
                    <p className="text-[13px] text-[#53647A] leading-relaxed pt-1">
                      {tech.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6: SIMPLE CONTACT CTA (RULE 9 - NO COMPLICATED FORMS)             */}
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
                  {CASE_STUDIES_CTA_DATA.titleStart}{' '}
                  <span className="bg-gradient-to-r from-[#0052CC] via-[#0066CC] to-[#0A66C2] bg-clip-text text-transparent">{CASE_STUDIES_CTA_DATA.titleHighlight}</span>
                </h2>
                
                <p className="text-[15px] sm:text-[16px] text-[#45546B] leading-relaxed max-w-lg">
                  {CASE_STUDIES_CTA_DATA.description}
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => setIsConsultationModalOpen(true)}
                    className="inline-flex items-center justify-center gap-2 text-[15px] sm:text-[16px] font-semibold px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#0052CC] to-[#0A66C2] hover:from-[#0040A8] hover:to-[#08529C] text-white shadow-md shadow-blue-500/25 transition-all cursor-pointer"
                  >
                    <span>{CASE_STUDIES_CTA_DATA.primaryCtaText}</span>
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
        title="Book a Case Study Consultation"
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
              Speak with ATLAS Technosoft ERP & Automation experts to explore relevant case studies
              and calculate estimated ROI for your business.
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
                  placeholder="e.g. Rahul Sharma"
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
                  placeholder="e.g. Acme Industries Ltd."
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
                  placeholder="rahul@company.com"
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
                <option value="manufacturing">Manufacturing (Discrete / Process)</option>
                <option value="warehouse">Warehouse & Logistics (Produmex WMS)</option>
                <option value="trading">Trading & Distribution (Freight Suite)</option>
                <option value="retail">Retail & Multi-Channel Inventory</option>
                <option value="automation">UiPath RPA & Hyperautomation</option>
                <option value="sap-b1">General SAP Business One Implementation</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Describe Your Current Challenge *
              </label>
              <textarea
                name="message"
                rows={3}
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Briefly describe your process bottlenecks or expected project timeline..."
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

export default CaseStudiesPage;

