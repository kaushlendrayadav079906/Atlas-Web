import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  Factory,
  Truck,
  Boxes,
  ShoppingCart,
  Cog,
  Utensils,
  Pill,
  FlaskConical,
  MessageSquare,
  LineChart,
  Lightbulb,
  Settings,
  UserCheck,
  TrendingUp,
  Eye,
  BarChart3,
  Mail,
  Phone,
  MapPin,
  ChevronUp,
  CheckCircle2,
  X,
  Send,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { BRAND_INFO } from '../data/websiteContent';
import { ContactFormData } from '../types';
import {
  INDUSTRIES_HERO_DATA,
  INDUSTRIES_SECTION_HEADER,
  INDUSTRIES_CARDS_DATA,
  INDUSTRY_VALUE_DATA,
  INDUSTRY_ENGAGEMENT_DATA,
  INDUSTRIES_CONTACT_CTA_DATA,
  IndustryCardItem
} from '../data/industriesContent';

export const IndustriesPage: React.FC = () => {
  // Modal & Consultation States
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryCardItem | null>(null);
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

  const renderIndustryIcon = (iconName: string, className = 'w-6 h-6') => {
    switch (iconName) {
      case 'factory':
        return <Factory className={className} />;
      case 'truck':
        return <Truck className={className} />;
      case 'boxes':
        return <Boxes className={className} />;
      case 'shopping-cart':
        return <ShoppingCart className={className} />;
      case 'cog':
        return <Cog className={className} />;
      case 'utensils':
        return <Utensils className={className} />;
      case 'pill':
        return <Pill className={className} />;
      case 'flask':
        return <FlaskConical className={className} />;
      default:
        return <Factory className={className} />;
    }
  };

  const renderValueIcon = (iconName: string) => {
    switch (iconName) {
      case 'cog':
        return <Cog className="w-6 h-6 text-white" />;
      case 'trending-up':
        return <TrendingUp className="w-6 h-6 text-white" />;
      case 'eye':
        return <Eye className="w-6 h-6 text-white" />;
      case 'bar-chart':
        return <BarChart3 className="w-6 h-6 text-white" />;
      default:
        return <CheckCircle2 className="w-6 h-6 text-white" />;
    }
  };

  const renderEngagementIcon = (iconName: string) => {
    switch (iconName) {
      case 'message-square':
        return <MessageSquare className="w-6 h-6 text-white" />;
      case 'line-chart':
        return <LineChart className="w-6 h-6 text-white" />;
      case 'lightbulb':
        return <Lightbulb className="w-6 h-6 text-white" />;
      case 'settings':
        return <Settings className="w-6 h-6 text-white" />;
      case 'user-check':
        return <UserCheck className="w-6 h-6 text-white" />;
      case 'trending-up':
        return <TrendingUp className="w-6 h-6 text-white" />;
      default:
        return <Sparkles className="w-6 h-6 text-white" />;
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
                  {INDUSTRIES_HERO_DATA.eyebrow}
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-[36px] sm:text-[44px] lg:text-[50px] xl:text-[54px] font-extrabold tracking-tight leading-[1.14] text-[#10264b]">
                {INDUSTRIES_HERO_DATA.titleStart}{' '}
                <span className="text-[#7139e8]">{INDUSTRIES_HERO_DATA.titleHighlight}</span>
              </h1>

              {/* Subheading / Description */}
              <p className="text-[16px] sm:text-[17px] lg:text-[18px] text-[#354765] leading-relaxed max-w-2xl font-normal">
                {INDUSTRIES_HERO_DATA.description}
              </p>

              {/* Dual Action CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={() => setIsConsultationModalOpen(true)}
                  className="inline-flex items-center justify-center gap-2 text-[16px] font-semibold px-8 py-3.5 rounded-xl bg-[#0878f9] hover:bg-blue-700 text-white shadow-md shadow-blue-600/25 transition-all duration-200 cursor-pointer"
                >
                  <span>{INDUSTRIES_HERO_DATA.primaryCtaText}</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button
                  onClick={() => setIsConsultationModalOpen(true)}
                  className="inline-flex items-center justify-center gap-2 text-[16px] font-semibold px-8 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-200/90 shadow-sm transition-all duration-200 cursor-pointer"
                >
                  <span>{INDUSTRIES_HERO_DATA.secondaryCtaText}</span>
                </button>
              </div>
            </div>

            {/* Right Visual Column: Industrial Engineer with Floating Badges */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200/90 bg-white group">
                <img
                  src={INDUSTRIES_HERO_DATA.heroImage}
                  alt="Industrial Operations Engineer with Digital Tablet"
                  className="w-full h-[400px] sm:h-[460px] lg:h-[490px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    e.currentTarget.src = '/images/crystal_hd/ind_manufacturing.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />

                {/* Floating Top Right Card: Technology Solutions for Every Industry */}
                <div className="absolute top-5 right-5 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-slate-200/90 max-w-[270px]">
                  <p className="text-[13px] font-bold text-[#10264b] mb-3 leading-snug">
                    {INDUSTRIES_HERO_DATA.floatingTitle}
                  </p>
                  <div className="space-y-2">
                    {INDUSTRIES_HERO_DATA.floatingBadges.map((badge, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-slate-50/80 border border-slate-100"
                      >
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: badge.color }}
                        />
                        <span className="text-[12px] font-semibold text-slate-700">
                          {badge.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: SOLUTIONS DESIGNED AROUND YOUR INDUSTRY (8 CARDS)              */}
      {/* ========================================================================= */}
      <section id="industries-grid" className="py-16 lg:py-24 bg-white border-b border-slate-100 relative">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-5xl mx-auto mb-14 space-y-3">
            <span className="text-[13px] sm:text-[14px] font-bold uppercase tracking-wider text-blue-600">
              {INDUSTRIES_SECTION_HEADER.eyebrow}
            </span>
            <h2 className="text-[32px] sm:text-[38px] lg:text-[42px] font-extrabold text-[#10264b] tracking-tight">
              {INDUSTRIES_SECTION_HEADER.titleStart}{' '}
              <span className="text-[#7139e8]">{INDUSTRIES_SECTION_HEADER.titleHighlight}</span>
            </h2>
            <p className="text-[16px] sm:text-[17px] text-[#354765] leading-relaxed max-w-3xl mx-auto">
              {INDUSTRIES_SECTION_HEADER.description}
            </p>
          </div>

          {/* 8 Industry Cards Grid: 4 columns on desktop, 2 on tablet, 1 on mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
            {INDUSTRIES_CARDS_DATA.map((card) => {
              return (
                <div
                  key={card.id}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
                  style={{
                    border: `2px solid ${card.accentColor}`
                  }}
                >
                  <div>
                    {/* Card Image Banner */}
                    <div className="relative h-44 overflow-hidden bg-slate-100">
                      <img
                        src={card.image}
                        alt={card.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          if (card.fallbackCrop) {
                            e.currentTarget.src = card.fallbackCrop;
                          }
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                      {/* Icon Badge Positioned at bottom-left of photo */}
                      <div
                        className="absolute bottom-3 left-4 w-11 h-11 rounded-xl flex items-center justify-center text-white shadow-md"
                        style={{ backgroundColor: card.accentColor }}
                      >
                        {renderIndustryIcon(card.iconName, 'w-5 h-5')}
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5 sm:p-6 space-y-3">
                      <h3 className="text-[20px] font-bold text-[#10264b] leading-snug group-hover:text-blue-600 transition-colors">
                        {card.title}
                      </h3>
                      <p className="text-[14px] text-[#354765] leading-relaxed line-clamp-3">
                        {card.description}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer: Learn More Link + Circular Arrow */}
                  <div className="px-5 pb-5 pt-2 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => setSelectedIndustry(card)}
                      className="text-[14px] font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                      style={{ color: card.accentColor }}
                    >
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <button
                      onClick={() => setSelectedIndustry(card)}
                      aria-label={`View ${card.title} details`}
                      className="w-8 h-8 rounded-full flex items-center justify-center border transition-all cursor-pointer"
                      style={{
                        borderColor: card.accentColor,
                        color: card.accentColor
                      }}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: INDUSTRY VALUE WE DELIVER (4 CARDS)                            */}
      {/* ========================================================================= */}
      <section className="py-16 lg:py-20 bg-slate-50/60 border-b border-slate-100">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <h2 className="text-[32px] sm:text-[38px] lg:text-[42px] font-extrabold text-[#10264b] tracking-tight">
              {INDUSTRY_VALUE_DATA.titleStart}{' '}
              <span className="text-[#7139e8]">{INDUSTRY_VALUE_DATA.titleHighlight}</span>
            </h2>
            <p className="text-[16px] sm:text-[17px] text-[#354765] leading-relaxed">
              {INDUSTRY_VALUE_DATA.description}
            </p>
          </div>

          {/* 4 Value Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {INDUSTRY_VALUE_DATA.items.map((val) => (
              <div
                key={val.id}
                className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4"
              >
                {/* Circular Icon */}
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 shadow-sm"
                  style={{ backgroundColor: val.color }}
                >
                  {renderValueIcon(val.iconName)}
                </div>

                {/* Text Content */}
                <div className="space-y-1">
                  <h3 className="text-[17px] font-bold text-[#10264b] leading-snug">
                    {val.title}
                  </h3>
                  <p className="text-[13px] text-[#354765] leading-relaxed">
                    {val.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: OUR INDUSTRY ENGAGEMENT MODEL (6 CONNECTED STEPS)               */}
      {/* ========================================================================= */}
      <section className="py-16 lg:py-24 bg-white border-b border-slate-100 relative overflow-hidden">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="text-[32px] sm:text-[38px] lg:text-[42px] font-extrabold text-[#10264b] tracking-tight">
              {INDUSTRY_ENGAGEMENT_DATA.titleStart}{' '}
              <span className="text-[#7139e8]">{INDUSTRY_ENGAGEMENT_DATA.titleHighlight}</span>
            </h2>
            <p className="text-[16px] sm:text-[17px] text-[#354765] leading-relaxed">
              {INDUSTRY_ENGAGEMENT_DATA.description}
            </p>
          </div>

          {/* 6 Connected Steps with Arrows */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-2">
            {INDUSTRY_ENGAGEMENT_DATA.steps.map((step, idx) => {
              const isLast = idx === INDUSTRY_ENGAGEMENT_DATA.steps.length - 1;
              return (
                <React.Fragment key={step.number}>
                  {/* Step Item */}
                  <div className="flex flex-col items-center text-center max-w-[180px] group">
                    {/* Circle Badge */}
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: step.color }}
                    >
                      {renderEngagementIcon(step.iconName)}
                    </div>

                    {/* Step Title */}
                    <h3 className="mt-4 text-[15px] font-bold text-[#10264b] leading-tight group-hover:text-blue-600 transition-colors">
                      {step.title}
                    </h3>
                  </div>

                  {/* Connecting Arrow between steps (Desktop: horizontal, Mobile/Tablet: vertical arrow) */}
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
      {/* SECTION 5: SIMPLE CONTACT CTA (RULE 9 - NO COMPLICATED FORMS)             */}
      {/* ========================================================================= */}
      <section className="py-12 lg:py-16 bg-slate-50/50">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-[#eaf4ff] border border-blue-200/90 p-8 sm:p-10 lg:p-12 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Heading, Subheading & Consultation Button */}
              <div className="lg:col-span-6 space-y-4 text-left">
                <span className="text-[12px] sm:text-[13px] font-bold uppercase tracking-wider text-blue-600">
                  {INDUSTRIES_CONTACT_CTA_DATA.eyebrow}
                </span>

                <h2 className="text-[28px] sm:text-[34px] lg:text-[38px] font-extrabold text-[#10264b] tracking-tight leading-tight">
                  {INDUSTRIES_CONTACT_CTA_DATA.titleStart}{' '}
                  <span className="text-[#7139e8]">
                    {INDUSTRIES_CONTACT_CTA_DATA.titleHighlight}
                  </span>
                </h2>

                <p className="text-[15px] sm:text-[16px] text-[#354765] leading-relaxed max-w-xl">
                  {INDUSTRIES_CONTACT_CTA_DATA.description}
                </p>

                <div className="pt-2">
                  <button
                    onClick={() => setIsConsultationModalOpen(true)}
                    className="inline-flex items-center justify-center gap-2 text-[15px] sm:text-[16px] font-semibold px-8 py-3.5 rounded-xl bg-[#0878f9] hover:bg-blue-700 text-white shadow-md shadow-blue-600/25 transition-all cursor-pointer"
                  >
                    <span>{INDUSTRIES_CONTACT_CTA_DATA.primaryCtaText}</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Right Column: 3 Clean Box-Type Contact Cards matching About Page */}
              <div className="lg:col-span-6 space-y-3.5">
                {/* Email Card (Green border matching About page) */}
                <a
                  href={`mailto:${INDUSTRIES_CONTACT_CTA_DATA.email}?subject=Industry%20Consultation%20Enquiry`}
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
                      {INDUSTRIES_CONTACT_CTA_DATA.email}
                    </p>
                  </div>
                </a>

                {/* Phone Card (Blue border matching About page) */}
                <a
                  href={`tel:${INDUSTRIES_CONTACT_CTA_DATA.phone}`}
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
                      {INDUSTRIES_CONTACT_CTA_DATA.phone}
                    </p>
                  </div>
                </a>

                {/* Locations Card (Violet/Purple border matching About page) */}
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
      {/* MODAL 1: INDUSTRY DEEP DIVE MODAL                                          */}
      {/* ========================================================================= */}
      {selectedIndustry && (
        <Modal
          isOpen={!!selectedIndustry}
          onClose={() => setSelectedIndustry(null)}
          title={selectedIndustry.title}
        >
          <div className="space-y-6 text-left">
            <div className="relative h-56 rounded-2xl overflow-hidden bg-slate-100">
              <img
                src={selectedIndustry.image}
                alt={selectedIndustry.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  if (selectedIndustry.fallbackCrop) {
                    e.currentTarget.src = selectedIndustry.fallbackCrop;
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
              <div
                className="absolute bottom-4 left-4 px-4 py-1.5 rounded-lg text-white font-bold text-sm flex items-center gap-2 shadow-md"
                style={{ backgroundColor: selectedIndustry.accentColor }}
              >
                {renderIndustryIcon(selectedIndustry.iconName, 'w-4 h-4')}
                <span>{selectedIndustry.title} Solution Architecture</span>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-[18px] font-bold text-[#10264b]">Industry Focus & Value</h4>
              <p className="text-[15px] text-[#40506a] leading-relaxed">
                {selectedIndustry.description}
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-[16px] font-bold text-[#10264b]">
                Key Capabilities & Modules
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedIndustry.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-slate-700 text-[14px]"
                  >
                    <CheckCircle2
                      className="w-4 h-4 shrink-0"
                      style={{ color: selectedIndustry.accentColor }}
                    />
                    <span className="font-medium">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-[13px] text-slate-500">
                Ready to optimize your {selectedIndustry.title.toLowerCase()} operations?
              </p>
              <button
                onClick={() => {
                  setSelectedIndustry(null);
                  setIsConsultationModalOpen(true);
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#0878f9] hover:bg-blue-700 text-white font-semibold text-sm shadow-md transition-all cursor-pointer"
              >
                Book Industry Consultation
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: CONSULTATION BOOKING MODAL                                       */}
      {/* ========================================================================= */}
      <Modal
        isOpen={isConsultationModalOpen}
        onClose={() => {
          setIsConsultationModalOpen(false);
          setIsSuccessSubmitted(false);
        }}
        title="Book an Industry Consultation"
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
              Our industry solutions team will review your requirements for{' '}
              <span className="font-semibold text-[#10264b]">{formData.companyName}</span> and
              contact you within 24 hours.
            </p>
            <div className="pt-4">
              <button
                onClick={() => {
                  setIsConsultationModalOpen(false);
                  setIsSuccessSubmitted(false);
                }}
                className="px-6 py-2.5 rounded-lg bg-[#0878f9] text-white font-semibold hover:bg-blue-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleFormSubmit} className="space-y-4 text-left">
            <p className="text-[14px] text-slate-600 mb-2">
              Speak with ATLAS Technosoft ERP & Automation experts to assess your operations and
              discuss customized industry solutions.
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
                Industry of Interest
              </label>
              <select
                name="areaOfInterest"
                value={formData.areaOfInterest}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
              >
                <option value="manufacturing">Manufacturing (Discrete / Process)</option>
                <option value="trading-distribution">Trading & Distribution</option>
                <option value="logistics-supply-chain">Logistics & Supply Chain</option>
                <option value="retail-wholesale">Retail & Wholesale</option>
                <option value="engineering-projects">Engineering & Projects</option>
                <option value="food-beverages">Food & Beverages</option>
                <option value="pharmaceuticals">Pharmaceuticals & Life Sciences</option>
                <option value="chemicals-process">Chemicals & Process</option>
                <option value="sap-b1">General SAP Business One Consulting</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Tell Us About Your Requirement *
              </label>
              <textarea
                name="message"
                rows={3}
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Briefly describe your process bottlenecks or ERP timeline..."
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
                Direct phone:{' '}
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
          className="fixed bottom-6 right-6 z-30 p-3 rounded-full bg-[#10264b] hover:bg-blue-600 text-white shadow-xl transition-all duration-300 hover:scale-110 cursor-pointer"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default IndustriesPage;
