import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Users,
  BarChart3,
  UserCheck,
  Sliders,
  Clock,
  Handshake,
  CheckCircle2,
  ChevronUp,
  ExternalLink,
  Send,
  AlertCircle,
  Cog
} from 'lucide-react';
import { Modal } from '../components/ui/Modal';
import { BRAND_INFO } from '../data/websiteContent';
import {
  CONTACT_HERO_DATA,
  GET_IN_TOUCH_CARDS,
  OFFICE_LOCATIONS,
  WHY_GET_IN_TOUCH_CARDS,
  SUBJECT_OPTIONS
} from '../data/contactContent';

interface ContactFormFields {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export const ContactPage: React.FC = () => {
  // Modal states
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Main page contact form state
  const [formData, setFormData] = useState<ContactFormFields>({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof ContactFormFields, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmittedSuccess, setIsSubmittedSuccess] = useState(false);

  // Consultation Modal form state
  const [modalData, setModalData] = useState<ContactFormFields>({
    fullName: '',
    email: '',
    phone: '',
    subject: 'sap-b1',
    message: ''
  });
  const [modalErrors, setModalErrors] = useState<Partial<Record<keyof ContactFormFields, string>>>({});
  const [isModalSubmitting, setIsModalSubmitting] = useState(false);
  const [isModalSubmittedSuccess, setIsModalSubmittedSuccess] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const validateField = (name: keyof ContactFormFields, value: string): string | undefined => {
    switch (name) {
      case 'fullName':
        if (!value.trim()) return 'Your full name is required';
        if (value.trim().length < 2) return 'Please enter at least 2 characters';
        return undefined;
      case 'email':
        if (!value.trim()) return 'Your email address is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return 'Please provide a valid email address';
        return undefined;
      case 'phone':
        if (!value.trim()) return 'Phone number is required';
        if (!/^[+0-9\s-]{8,16}$/.test(value.trim())) return 'Please provide a valid phone number (e.g. +91 9372329599)';
        return undefined;
      case 'subject':
        if (!value.trim()) return 'Please select a subject of inquiry';
        return undefined;
      case 'message':
        if (!value.trim()) return 'Please enter your message or business requirements';
        if (value.trim().length < 10) return 'Please provide a little more detail (at least 10 characters)';
        return undefined;
      default:
        return undefined;
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const fieldName = name as keyof ContactFormFields;
    setFormData(prev => ({ ...prev, [fieldName]: value }));

    if (formErrors[fieldName]) {
      setFormErrors(prev => ({ ...prev, [fieldName]: undefined }));
    }
  };

  const handleModalInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const fieldName = name as keyof ContactFormFields;
    setModalData(prev => ({ ...prev, [fieldName]: value }));

    if (modalErrors[fieldName]) {
      setModalErrors(prev => ({ ...prev, [fieldName]: undefined }));
    }
  };

  const handleMainFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const errors: Partial<Record<keyof ContactFormFields, string>> = {};
    (Object.keys(formData) as (keyof ContactFormFields)[]).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) errors[key] = error;
    });

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmittedSuccess(true);
    }, 450);
  };

  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const errors: Partial<Record<keyof ContactFormFields, string>> = {};
    (Object.keys(modalData) as (keyof ContactFormFields)[]).forEach((key) => {
      const error = validateField(key, modalData[key]);
      if (error) errors[key] = error;
    });

    if (Object.keys(errors).length > 0) {
      setModalErrors(errors);
      return;
    }

    setIsModalSubmitting(true);
    setTimeout(() => {
      setIsModalSubmitting(false);
      setIsModalSubmittedSuccess(true);
    }, 450);
  };

  const createMailtoLink = (data: ContactFormFields) => {
    const subjectLine = encodeURIComponent(`[ATLAS Inquiry] ${data.subject || 'Consultation Request'}`);
    const bodyText = encodeURIComponent(
      `Full Name: ${data.fullName}\nEmail: ${data.email}\nPhone: ${data.phone}\nSubject: ${data.subject}\n\nMessage:\n${data.message}`
    );
    return `mailto:sales@atlastechnosoft.com?subject=${subjectLine}&body=${bodyText}`;
  };

  const renderTouchIcon = (iconName: string) => {
    switch (iconName) {
      case 'Mail':
        return <Mail className="w-6 h-6 text-[#d99120]" />;
      case 'Phone':
        return <Phone className="w-6 h-6 text-[#10b981]" />;
      case 'MapPin':
        return <MapPin className="w-6 h-6 text-[#9333ea]" />;
      default:
        return <Mail className="w-6 h-6 text-[#d99120]" />;
    }
  };

  const renderWhyIcon = (iconName: string) => {
    switch (iconName) {
      case 'Users':
        return <Users className="w-6 h-6 text-white" />;
      case 'Cog':
        return <Cog className="w-6 h-6 text-white" />;
      case 'Clock':
        return <Clock className="w-6 h-6 text-white" />;
      case 'Handshake':
        return <Handshake className="w-6 h-6 text-white" />;
      default:
        return <Users className="w-6 h-6 text-white" />;
    }
  };

  return (
    <div className="relative bg-[#fffdfa] text-[#354765] selection:bg-[#d99120] selection:text-white">
      {/* Organic Topographic Contour Curves matching reference mockup */}
      <div className="absolute top-0 left-0 w-[420px] h-[900px] pointer-events-none select-none overflow-hidden -z-10 opacity-70 hidden sm:block">
        <svg viewBox="0 0 420 900" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M-120 40C-40 120 30 180 80 290C130 400 110 520 60 640C10 760 -40 820 -120 890" stroke="#d99120" strokeWidth="1.2" strokeOpacity="0.22" />
          <path d="M-90 10C-10 90 60 150 110 260C160 370 140 490 90 610C40 730 -10 790 -90 860" stroke="#d99120" strokeWidth="1.2" strokeOpacity="0.16" />
          <path d="M-60 -20C20 60 90 120 140 230C190 340 170 460 120 580C70 700 20 760 -60 830" stroke="#d99120" strokeWidth="1.2" strokeOpacity="0.11" />
          <path d="M-30 -50C50 30 120 90 170 200C220 310 200 430 150 550C100 670 50 730 -30 800" stroke="#d99120" strokeWidth="1.2" strokeOpacity="0.07" />
        </svg>
      </div>

      <div className="absolute top-[350px] right-0 w-[420px] h-[900px] pointer-events-none select-none overflow-hidden -z-10 opacity-70 hidden sm:block">
        <svg viewBox="0 0 420 900" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M540 40C460 120 390 180 340 290C290 400 310 520 360 640C410 760 460 820 540 890" stroke="#d99120" strokeWidth="1.2" strokeOpacity="0.22" />
          <path d="M510 10C430 90 360 150 310 260C260 370 280 490 330 610C380 730 430 790 510 860" stroke="#d99120" strokeWidth="1.2" strokeOpacity="0.16" />
          <path d="M480 -20C400 60 330 120 280 230C230 340 250 460 300 580C350 700 400 760 480 830" stroke="#d99120" strokeWidth="1.2" strokeOpacity="0.11" />
        </svg>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 1: HERO SECTION                                                   */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden pt-10 pb-14 lg:pt-14 lg:pb-18 border-b border-slate-100">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Column: Heading and CTAs */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Eyebrow: Gold/Orange */}
              <div className="inline-block">
                <span className="text-[13px] sm:text-[14px] font-bold uppercase tracking-wider text-[#d99120] select-none">
                  {CONTACT_HERO_DATA.eyebrow}
                </span>
              </div>

              {/* Main Headline (Elegant Serif) */}
              <h1 className="font-serif text-[38px] sm:text-[46px] lg:text-[52px] xl:text-[56px] font-bold tracking-tight leading-[1.14] text-[#10264b]">
                {CONTACT_HERO_DATA.titleStart}{' '}
                <span className="text-[#d99120]">{CONTACT_HERO_DATA.titleHighlight}</span>
              </h1>

              {/* Description */}
              <p className="text-[16px] sm:text-[17px] lg:text-[18px] text-[#354765] leading-relaxed max-w-2xl font-normal">
                {CONTACT_HERO_DATA.description}
              </p>

              {/* Dual Action CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={() => setIsConsultationModalOpen(true)}
                  className="inline-flex items-center justify-center gap-2 text-[16px] font-semibold px-8 py-3.5 rounded-xl bg-[#d99120] hover:bg-[#bd7810] text-white shadow-md shadow-amber-600/25 transition-all duration-200 cursor-pointer"
                >
                  <span>{CONTACT_HERO_DATA.primaryCtaText}</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <a
                  href="#contact-form"
                  className="inline-flex items-center justify-center gap-2 text-[16px] font-semibold px-8 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-[#10264b] border border-slate-300 shadow-sm transition-all duration-200 cursor-pointer"
                >
                  <span>{CONTACT_HERO_DATA.secondaryCtaText}</span>
                </a>
              </div>
            </div>

            {/* Right Column: Reception Visual with Logo on the Wall */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200/90 bg-white group">
                <img
                  src={CONTACT_HERO_DATA.heroImage}
                  alt="ATLAS Technosoft Office Reception and Headquarters"
                  className="w-full h-auto object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: GET IN TOUCH (3 CARDS IN A ROW)                                */}
      {/* ========================================================================= */}
      <section className="py-14 lg:py-18 border-b border-slate-100">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Heading: Left Aligned */}
          <div className="text-left mb-10 space-y-2">
            <h2 className="font-serif text-[32px] sm:text-[38px] lg:text-[42px] font-bold text-[#10264b] tracking-tight">
              Get in <span className="text-[#d99120]">Touch</span>
            </h2>
            <p className="text-[15px] sm:text-[16px] text-slate-600 leading-relaxed font-normal">
              Reach out to us through any of the following channels. Our team will be happy to assist you.
            </p>
          </div>

          {/* 3 Horizontal Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {GET_IN_TOUCH_CARDS.map((card) => (
              <div
                key={card.id}
                className={`bg-white rounded-2xl p-6 sm:p-7 border transition-all duration-300 hover:shadow-lg flex items-start gap-4 sm:gap-5 ${card.borderColor}`}
              >
                {/* Circular Icon */}
                <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shrink-0 shadow-sm ${card.iconBgColor}`}>
                  {renderTouchIcon(card.iconName)}
                </div>

                <div className="space-y-1 min-w-0">
                  <h3 className="font-serif text-[19px] sm:text-[20px] font-bold text-[#10264b]">
                    {card.title}
                  </h3>
                  {card.actionHref ? (
                    <a
                      href={card.actionHref}
                      className="text-[15px] sm:text-[16px] font-bold text-[#10264b] hover:text-[#d99120] transition-colors break-words block"
                    >
                      {card.primaryValue}
                    </a>
                  ) : (
                    <p className="text-[15px] sm:text-[16px] font-bold text-[#10264b]">
                      {card.primaryValue}
                    </p>
                  )}
                  <p className="text-[13px] sm:text-[14px] text-slate-500 leading-relaxed pt-1">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: MAIN TWO COLUMNS (SEND MESSAGE & OUR LOCATIONS)                 */}
      {/* ========================================================================= */}
      <section id="contact-form" className="py-16 lg:py-24 border-b border-slate-100">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            
            {/* ------------------------------------------------------------------- */}
            {/* LEFT COLUMN: SEND US A MESSAGE FORM                                */}
            {/* ------------------------------------------------------------------- */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <h2 className="font-serif text-[28px] sm:text-[34px] font-bold text-[#10264b] tracking-tight">
                  Send Us a <span className="text-[#d99120]">Message</span>
                </h2>
                <p className="text-[15px] sm:text-[16px] text-slate-600">
                  Fill in the details below and our team will get back to you shortly.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-md p-6 sm:p-8 lg:p-10">
                {isSubmittedSuccess ? (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 sm:p-8 text-center space-y-4">
                    <div className="w-14 h-14 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-[20px] font-bold text-emerald-950 font-serif">
                      Thank You, {formData.fullName}!
                    </h3>
                    <p className="text-[15px] text-emerald-800 leading-relaxed max-w-md mx-auto">
                      Your inquiry regarding <strong className="text-emerald-950">{formData.subject}</strong> has been logged. Our enterprise consultants will review your requirements and respond within 24 business hours.
                    </p>
                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                      <a
                        href={createMailtoLink(formData)}
                        className="inline-flex items-center gap-2 text-[14px] font-semibold text-emerald-700 bg-white hover:bg-emerald-100 px-5 py-2.5 rounded-lg border border-emerald-300 transition-colors"
                      >
                        <Mail className="w-4 h-4" />
                        <span>Open in Email Client</span>
                      </a>
                      <button
                        onClick={() => {
                          setIsSubmittedSuccess(false);
                          setFormData({
                            fullName: '',
                            email: '',
                            phone: '',
                            subject: '',
                            message: ''
                          });
                        }}
                        className="text-[14px] font-medium text-slate-600 hover:text-slate-900 underline underline-offset-2 py-2"
                      >
                        Send Another Message
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleMainFormSubmit} className="space-y-5" noValidate>
                    {/* Row 1: Name and Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="fullName" className="block text-[14px] font-semibold text-slate-700 mb-1.5">
                          Your Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          placeholder="Enter your full name"
                          className={`w-full px-4 py-3 rounded-xl border text-[15px] text-slate-800 placeholder-slate-400 bg-slate-50/50 focus:bg-white focus:outline-none transition-all ${
                            formErrors.fullName
                              ? 'border-rose-400 focus:ring-2 focus:ring-rose-200'
                              : 'border-slate-200 focus:border-[#d99120] focus:ring-2 focus:ring-amber-200/50'
                          }`}
                        />
                        {formErrors.fullName && (
                          <p className="mt-1 text-[13px] text-rose-600 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                            <span>{formErrors.fullName}</span>
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-[14px] font-semibold text-slate-700 mb-1.5">
                          Your Email <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Enter your email address"
                          className={`w-full px-4 py-3 rounded-xl border text-[15px] text-slate-800 placeholder-slate-400 bg-slate-50/50 focus:bg-white focus:outline-none transition-all ${
                            formErrors.email
                              ? 'border-rose-400 focus:ring-2 focus:ring-rose-200'
                              : 'border-slate-200 focus:border-[#d99120] focus:ring-2 focus:ring-amber-200/50'
                          }`}
                        />
                        {formErrors.email && (
                          <p className="mt-1 text-[13px] text-rose-600 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                            <span>{formErrors.email}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Row 2: Phone and Subject */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="phone" className="block text-[14px] font-semibold text-slate-700 mb-1.5">
                          Phone Number <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="Enter your phone number"
                          className={`w-full px-4 py-3 rounded-xl border text-[15px] text-slate-800 placeholder-slate-400 bg-slate-50/50 focus:bg-white focus:outline-none transition-all ${
                            formErrors.phone
                              ? 'border-rose-400 focus:ring-2 focus:ring-rose-200'
                              : 'border-slate-200 focus:border-[#d99120] focus:ring-2 focus:ring-amber-200/50'
                          }`}
                        />
                        {formErrors.phone && (
                          <p className="mt-1 text-[13px] text-rose-600 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                            <span>{formErrors.phone}</span>
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="subject" className="block text-[14px] font-semibold text-slate-700 mb-1.5">
                          Subject <span className="text-rose-500">*</span>
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-xl border text-[15px] text-slate-800 bg-slate-50/50 focus:bg-white focus:outline-none transition-all cursor-pointer ${
                            formErrors.subject
                              ? 'border-rose-400 focus:ring-2 focus:ring-rose-200'
                              : 'border-slate-200 focus:border-[#d99120] focus:ring-2 focus:ring-amber-200/50'
                          }`}
                        >
                          {SUBJECT_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                        {formErrors.subject && (
                          <p className="mt-1 text-[13px] text-rose-600 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                            <span>{formErrors.subject}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Row 3: Message Textarea */}
                    <div>
                      <label htmlFor="message" className="block text-[14px] font-semibold text-slate-700 mb-1.5">
                        Your Message <span className="text-rose-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us about your requirements..."
                        className={`w-full px-4 py-3 rounded-xl border text-[15px] text-slate-800 placeholder-slate-400 bg-slate-50/50 focus:bg-white focus:outline-none transition-all resize-y ${
                          formErrors.message
                            ? 'border-rose-400 focus:ring-2 focus:ring-rose-200'
                            : 'border-slate-200 focus:border-[#d99120] focus:ring-2 focus:ring-amber-200/50'
                        }`}
                      />
                      {formErrors.message && (
                        <p className="mt-1 text-[13px] text-rose-600 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{formErrors.message}</span>
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 rounded-xl bg-[#d99120] hover:bg-[#bd7810] text-white font-bold text-[16px] shadow-md shadow-amber-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Sending Message...</span>
                          </>
                        ) : (
                          <>
                            <span>Send Message</span>
                            <ArrowRight className="w-5 h-5" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* ------------------------------------------------------------------- */}
            {/* RIGHT COLUMN: OUR LOCATIONS (2 OFFICES WITH PHOTO & MAP)           */}
            {/* ------------------------------------------------------------------- */}
            <div id="locations" className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <h2 className="font-serif text-[28px] sm:text-[34px] font-bold text-[#10264b] tracking-tight">
                  Our <span className="text-[#d99120]">Locations</span>
                </h2>
                <p className="text-[15px] sm:text-[16px] text-slate-600">
                  Visit our offices to meet our team and discuss your business requirements.
                </p>
              </div>

              {/* 2 Office Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {OFFICE_LOCATIONS.map((office) => (
                  <div
                    key={office.id}
                    className="bg-white rounded-2xl border border-slate-200/90 shadow-md overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all duration-300 group"
                  >
                    <div>
                      {/* Building Photo */}
                      <div className="relative h-[155px] overflow-hidden bg-slate-100">
                        <img
                          src={office.image}
                          alt={office.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                      </div>

                      {/* Details */}
                      <div className="p-5 space-y-3">
                        <div className="flex items-center gap-2 text-[#d99120]">
                          <MapPin className="w-5 h-5 shrink-0" />
                          <h3 className="font-serif text-[18px] sm:text-[19px] font-bold text-[#10264b]">
                            {office.title}
                          </h3>
                        </div>

                        <p className="text-[13px] sm:text-[14px] text-slate-600 leading-relaxed">
                          {office.address}
                        </p>

                        <div>
                          <a
                            href={office.googleMapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-[13px] font-bold text-[#d99120] hover:text-[#bd7810] transition-colors py-1 px-3 rounded-lg border border-[#d99120]/40 hover:border-[#d99120] bg-amber-50/30"
                          >
                            <span>View on Google Maps</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Stylized Map Preview */}
                    <a
                      href={office.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block border-t border-slate-100 relative h-[130px] overflow-hidden bg-slate-50 group/map"
                    >
                      <img
                        src={office.mapImage}
                        alt={`Map location of ${office.title}`}
                        className="w-full h-full object-cover group-hover/map:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover/map:bg-transparent transition-colors flex items-center justify-center pointer-events-none">
                        <span className="sr-only">Open Google Maps</span>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: WHY GET IN TOUCH WITH US? (4 CARDS IN A ROW)                   */}
      {/* ========================================================================= */}
      <section className="py-16 lg:py-20 border-b border-slate-100">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Heading: Left Aligned */}
          <div className="text-left mb-10 space-y-2">
            <h2 className="font-serif text-[30px] sm:text-[36px] lg:text-[40px] font-bold text-[#10264b] tracking-tight">
              Why Get in <span className="text-[#d99120]">Touch with Us?</span>
            </h2>
            <p className="text-[15px] sm:text-[16px] text-slate-600 leading-relaxed font-normal">
              We are committed to understanding your business needs and providing the right technology solutions.
            </p>
          </div>

          {/* 4 Horizontal Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_GET_IN_TOUCH_CARDS.map((card) => (
              <div
                key={card.id}
                className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-4 text-left"
              >
                <div
                  className={`w-13 h-13 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-white shrink-0 shadow-sm ${card.bgColor}`}
                >
                  {renderWhyIcon(card.iconName)}
                </div>

                <div className="space-y-1 min-w-0">
                  <h3 className="font-bold text-[16px] sm:text-[17px] text-[#10264b] leading-snug">
                    {card.title}
                  </h3>
                  <p className="text-[12px] sm:text-[13px] text-slate-500 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SCROLL TO TOP FLOATING BUTTON                                             */}
      {/* ========================================================================= */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-[#d99120] text-white shadow-lg hover:bg-[#bd7810] focus:outline-none transition-all duration-300 cursor-pointer"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}

      {/* ========================================================================= */}
      {/* CONSULTATION MODAL                                                        */}
      {/* ========================================================================= */}
      <Modal
        isOpen={isConsultationModalOpen}
        onClose={() => {
          setIsConsultationModalOpen(false);
          setIsModalSubmittedSuccess(false);
        }}
        title="Book a Free Consultation"
      >
        <div className="p-6">
          {isModalSubmittedSuccess ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-[20px] font-bold text-slate-900 font-serif">
                Consultation Request Received!
              </h3>
              <p className="text-[15px] text-slate-600 leading-relaxed max-w-sm mx-auto">
                Thank you, <strong>{modalData.fullName}</strong>. An enterprise solution architect will contact you at <strong>{modalData.phone}</strong> or <strong>{modalData.email}</strong> within 24 hours.
              </p>
              <button
                onClick={() => {
                  setIsConsultationModalOpen(false);
                  setIsModalSubmittedSuccess(false);
                }}
                className="px-6 py-2.5 rounded-xl bg-[#d99120] text-white font-semibold hover:bg-[#bd7810] transition-colors"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleModalSubmit} className="space-y-4" noValidate>
              <p className="text-[14px] text-slate-600">
                Connect directly with ATLAS senior technology consultants for SAP Business One, Boyum IT, or UiPath automation.
              </p>

              <div>
                <label className="block text-[13px] font-semibold text-slate-700 mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={modalData.fullName}
                  onChange={handleModalInputChange}
                  placeholder="e.g. Ramesh Patel"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-[14px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#d99120]"
                />
                {modalErrors.fullName && (
                  <p className="text-xs text-rose-500 mt-1">{modalErrors.fullName}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-semibold text-slate-700 mb-1">
                    Email <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={modalData.email}
                    onChange={handleModalInputChange}
                    placeholder="name@company.com"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-[14px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#d99120]"
                  />
                  {modalErrors.email && (
                    <p className="text-xs text-rose-500 mt-1">{modalErrors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-[13px] font-semibold text-slate-700 mb-1">
                    Phone <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={modalData.phone}
                    onChange={handleModalInputChange}
                    placeholder="+91 93723 29599"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-[14px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#d99120]"
                  />
                  {modalErrors.phone && (
                    <p className="text-xs text-rose-500 mt-1">{modalErrors.phone}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-slate-700 mb-1">
                  Primary Area of Interest <span className="text-rose-500">*</span>
                </label>
                <select
                  name="subject"
                  value={modalData.subject}
                  onChange={handleModalInputChange}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-[14px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#d99120] cursor-pointer"
                >
                  {SUBJECT_OPTIONS.filter(o => o.value).map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-slate-700 mb-1">
                  Brief Requirements / Message <span className="text-rose-500">*</span>
                </label>
                <textarea
                  name="message"
                  rows={3}
                  value={modalData.message}
                  onChange={handleModalInputChange}
                  placeholder="Outline your challenges or business requirements..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-[14px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#d99120]"
                />
                {modalErrors.message && (
                  <p className="text-xs text-rose-500 mt-1">{modalErrors.message}</p>
                )}
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsConsultationModalOpen(false)}
                  className="px-4 py-2 text-[14px] font-semibold text-slate-600 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isModalSubmitting}
                  className="px-6 py-2.5 rounded-xl bg-[#d99120] hover:bg-[#bd7810] text-white text-[14px] font-bold shadow-md shadow-amber-600/20 transition-colors disabled:opacity-60"
                >
                  {isModalSubmitting ? 'Submitting...' : 'Submit Request'}
                </button>
              </div>
            </form>
          )}
        </div>
      </Modal>

    </div>
  );
};
export default ContactPage;
