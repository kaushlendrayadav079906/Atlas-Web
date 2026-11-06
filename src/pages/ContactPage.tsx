import React, { useState } from 'react';
import {
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Building2,
  CheckCircle2,
  AlertCircle,
  Users,
  ShieldCheck,
  Clock,
  Handshake,
  ExternalLink,
  Send,
  Briefcase,
  PhoneCall
} from 'lucide-react';
import { ImageFeatureSlider } from '../components/ui/ImageFeatureSlider';
import { ConsultationModal } from '../components/ui/ConsultationModal';
import { CallbackModal } from '../components/ui/CallbackModal';
import { BRAND_INFO } from '../data/websiteContent';
import { apiService, ApiResponse } from '../services/api';
import {
  CONTACT_HERO_DATA,
  OFFICE_LOCATIONS,
  WHY_GET_IN_TOUCH_CARDS,
  SUBJECT_OPTIONS
} from '../data/contactContent';

interface ContactEnquiryFields {
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  service: string;
  message: string;
}

export const ContactPage: React.FC = () => {
  // Consultation Modal State
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [isCallbackModalOpen, setIsCallbackModalOpen] = useState(false);

  // Main Page Contact Enquiry Form State
  const [formData, setFormData] = useState<ContactEnquiryFields>({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    service: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof ContactEnquiryFields, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmittedSuccess, setIsSubmittedSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submittedDetails, setSubmittedDetails] = useState<ApiResponse | null>(null);


  const validateField = (name: keyof ContactEnquiryFields, value: string): string | undefined => {
    switch (name) {
      case 'fullName':
        if (!value.trim()) return 'Full name is required';
        if (value.trim().length < 2) return 'Please enter at least 2 characters';
        return undefined;
      case 'email':
        if (!value.trim()) return 'Business email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return 'Please provide a valid work email address';
        return undefined;
      case 'phone':
        if (!value.trim()) return 'Phone number is required';
        if (!/^[+0-9\s-]{8,18}$/.test(value.trim())) return 'Please enter a valid phone number';
        return undefined;
      case 'companyName':
        if (!value.trim()) return 'Company name is required';
        return undefined;
      case 'service':
        if (!value.trim()) return 'Please select a service of interest';
        return undefined;
      case 'message':
        if (!value.trim()) return 'Please enter a brief outline of your requirements';
        if (value.trim().length < 10) return 'Please provide at least 10 characters';
        return undefined;
      default:
        return undefined;
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const fieldName = name as keyof ContactEnquiryFields;
    setFormData(prev => ({ ...prev, [fieldName]: value }));

    if (formErrors[fieldName]) {
      setFormErrors(prev => ({ ...prev, [fieldName]: undefined }));
    }
  };


  const handleMainFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    const errors: Partial<Record<keyof ContactEnquiryFields, string>> = {};
    (Object.keys(formData) as (keyof ContactEnquiryFields)[]).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) errors[key] = error;
    });

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await apiService.submitContact(formData);
      setSubmittedDetails(res);
      setIsSubmittedSuccess(true);
    } catch (err: any) {
      setSubmitError(err.message || 'Unable to save enquiry in SAP Business One. Please check your connection or contact our team directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const createMailtoLink = (data: ContactEnquiryFields) => {
    const subjectLine = encodeURIComponent(`[ATLAS Consultation Enquiry] ${data.companyName} - ${data.service}`);
    const bodyText = encodeURIComponent(
      `Full Name: ${data.fullName}\n` +
      `Business Email: ${data.email}\n` +
      `Phone: ${data.phone}\n` +
      `Company: ${data.companyName}\n` +
      `Service of Interest: ${data.service}\n\n` +
      `Message / Requirements:\n${data.message}\n\n` +
      `Submitted via ATLAS Technosoft Contact Page`
    );
    return `mailto:sales@atlastechnosoft.com?subject=${subjectLine}&body=${bodyText}`;
  };

  const scrollToEnquiryForm = () => {
    const el = document.getElementById('contact-enquiry-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative bg-white text-[#4A5876] selection:bg-[#1F4FE0] selection:text-white">

      {/* ========================================================================= */}
      {/* SECTION 1: CONTACT HERO SECTION                                           */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden pt-10 pb-14 lg:pt-16 lg:pb-20 border-b border-white/10 bg-atlas-navy atlas-dark">
        
        {/* Subtle decorative background shapes */}
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[850px] h-[360px] bg-gradient-to-tr from-blue-400/10 via-sky-300/15 to-transparent rounded-full blur-3xl -z-10" />
        <div className="pointer-events-none absolute -left-12 top-1/3 w-72 h-72 bg-gradient-to-br from-[#1F4FE0]/10 via-teal-400/5 to-transparent rounded-full blur-2xl -z-10" />

        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column: Heading, Description & Dual CTA Buttons */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Eyebrow Label */}
              <div className="inline-block">
                <span className="text-[13px] sm:text-[14px] font-bold uppercase tracking-wider text-[#1F4FE0] select-none">
                  CONTACT US —
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="atlas-h1-size font-serif font-extrabold text-[#0A1B4F]">
                Let's Build Something Great{' '}
                <span className="bg-gradient-to-r from-[#1F4FE0] via-[#1F4FE0] to-[#1F4FE0] bg-clip-text text-transparent font-accent italic font-semibold tracking-[-0.01em] pr-[0.08em]">
                  Together
                </span>
              </h1>

              {/* Description */}
              <p className="text-[16px] sm:text-[18px] lg:text-[19px] text-[#4A5876] leading-relaxed max-w-2xl font-normal">
                We are here to help you with your business requirements. Get in touch with our experts to discuss how our technology solutions can support your growth.
              </p>

              {/* Dual Action CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  type="button"
                  onClick={() => setIsConsultationModalOpen(true)}
                  className="inline-flex items-center justify-center gap-2 text-[16px] font-semibold px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#1F4FE0] to-[#1F4FE0] hover:from-[#1739B8] hover:to-[#1739B8] text-white shadow-md shadow-blue-500/25 transition-all duration-200 cursor-pointer"
                >
                  <span>Book a Consultation</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button
                  type="button"
                  onClick={scrollToEnquiryForm}
                  className="inline-flex items-center justify-center gap-2 text-[16px] font-semibold px-8 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-[#0A1B4F] border border-blue-200 shadow-xs hover:border-[#1F4FE0] transition-all duration-200 cursor-pointer"
                >
                  <span>Talk to Our Experts</span>
                </button>
              </div>
            </div>

            {/* Right Column: Business Consultation Visual */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-blue-100/80 bg-white group">
                <img
                  src={CONTACT_HERO_DATA.heroImage}
                  alt="ATLAS Technosoft Executive Team Consultation"
                  className="w-full h-auto object-cover max-h-[420px] group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1B4F]/30 via-transparent to-transparent pointer-events-none" />

                {/* Subtle feature tag badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-xl p-3 border border-slate-200/80 shadow-md flex items-center justify-between text-[12px] sm:text-[13px]">
                  <div className="flex items-center gap-2 text-[#0A1B4F] font-semibold">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Response within 24 business hours</span>
                  </div>
                  <span className="font-bold text-[#1F4FE0]">SAP Silver Partner</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: CONTACT INFORMATION SECTION (4 INTERACTIVE CARDS)             */}
      {/* ========================================================================= */}
      <section className="py-12 sm:py-16 bg-white border-b border-blue-100/60">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Heading */}
          <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-12">
            <div className="mb-2.5">
              <span className="text-[13px] sm:text-[14px] font-bold uppercase tracking-wider text-[#1F4FE0] select-none">
                COMMUNICATION CHANNELS
              </span>
            </div>
            <h2 className="atlas-h2-size font-serif font-extrabold text-[#0A1B4F]">
              Get in Touch with{' '}
              <span className="bg-gradient-to-r from-[#1F4FE0] via-[#1F4FE0] to-[#1F4FE0] bg-clip-text text-transparent font-accent italic font-semibold tracking-[-0.01em] pr-[0.08em]">
                Our Specialists
              </span>
            </h2>
            <p className="mt-3 text-[15px] sm:text-[17px] text-[#4A5876] leading-relaxed">
              Reach out through any of the following channels. Our consultants are ready to assist you.
            </p>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1: Email */}
            <a
              href="mailto:sales@atlastechnosoft.com"
              className="group p-6 rounded-2xl bg-white border border-blue-100/80 hover:border-[#1F4FE0] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="w-13 h-13 rounded-2xl bg-blue-50 text-[#1F4FE0] flex items-center justify-center border border-blue-100/80 mb-4 group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6" />
                </div>
                <h3 className="text-[14px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Email Address
                </h3>
                <div className="text-[16px] font-bold text-[#0A1B4F] group-hover:text-[#1F4FE0] transition-colors break-words">
                  sales@atlastechnosoft.com
                </div>
              </div>
              <p className="text-[12.5px] text-[#4A5876] mt-4 pt-3 border-t border-slate-100">
                Typically responds within 24 business hours
              </p>
            </a>

            {/* Card 2: Phone */}
            <a
              href="tel:+919372329599"
              className="group p-6 rounded-2xl bg-white border border-blue-100/80 hover:border-emerald-500 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="w-13 h-13 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 mb-4 group-hover:scale-110 transition-transform">
                  <Phone className="w-6 h-6" />
                </div>
                <h3 className="text-[14px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Phone Number
                </h3>
                <div className="text-[16px] font-bold text-[#0A1B4F] group-hover:text-emerald-600 transition-colors">
                  +91 93723 29599
                </div>
              </div>
              <p className="text-[12.5px] text-[#4A5876] mt-4 pt-3 border-t border-slate-100">
                Mon – Sat: 9:30 AM to 6:30 PM IST
              </p>
            </a>

            {/* Card 3: WhatsApp */}
            <a
              href="https://wa.me/919372329599?text=Hello%20ATLAS%20Technosoft%2C%20I%20would%20like%20to%20book%20a%20consultation."
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 rounded-2xl bg-white border border-blue-100/80 hover:border-emerald-500 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="w-13 h-13 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 mb-4 group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <h3 className="text-[14px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  WhatsApp Support
                </h3>
                <div className="text-[16px] font-bold text-[#0A1B4F] group-hover:text-emerald-600 transition-colors">
                  +91 93723 29599
                </div>
              </div>
              <p className="text-[12.5px] text-[#4A5876] mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span>Instant chat with our team</span>
                <ExternalLink className="w-3.5 h-3.5 text-emerald-600" />
              </p>
            </a>

            {/* Card 4: Office Headquarters */}
            <a
              href="#locations"
              className="group p-6 rounded-2xl bg-white border border-blue-100/80 hover:border-[#1F4FE0] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="w-13 h-13 rounded-2xl bg-sky-50 text-[#1F4FE0] flex items-center justify-center border border-sky-100 mb-4 group-hover:scale-110 transition-transform">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="text-[14px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Our Locations
                </h3>
                <div className="text-[16px] font-bold text-[#0A1B4F] group-hover:text-[#1F4FE0] transition-colors">
                  Borivali & Marine Lines
                </div>
              </div>
              <p className="text-[12.5px] text-[#4A5876] mt-4 pt-3 border-t border-slate-100">
                Mumbai, Maharashtra, India
              </p>
            </a>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: MAIN SECTION – ENQUIRY FORM & OFFICE LOCATIONS                  */}
      {/* ========================================================================= */}
      <section id="contact-enquiry-form" className="py-14 sm:py-20 border-b border-white/10 bg-atlas-navy atlas-dark">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            
            {/* ------------------------------------------------------------------- */}
            {/* LEFT COLUMN: CONTACT ENQUIRY FORM                                  */}
            {/* ------------------------------------------------------------------- */}
            <div className="lg:col-span-6 space-y-5">
              <div>
                <span className="text-[13px] font-bold uppercase tracking-wider text-[#1F4FE0] block mb-1">
                  DIRECT ENQUIRY
                </span>
                <h2 className="atlas-h2-size font-serif font-extrabold text-[#0A1B4F]">
                  Send Us an <span className="bg-gradient-to-r from-[#1F4FE0] via-[#1F4FE0] to-[#1F4FE0] bg-clip-text text-transparent font-accent italic font-semibold tracking-[-0.01em] pr-[0.08em]">Enquiry</span>
                </h2>
                <p className="text-[15px] sm:text-[16px] text-[#4A5876] mt-1">
                  Fill in the details below and an ATLAS enterprise consultant will get back to you shortly.
                </p>
              </div>

                            {/* Quick Action: Request a Callback Card */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50/70 border border-blue-200/90 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#1F4FE0] text-white flex items-center justify-center shrink-0 shadow-sm">
                    <PhoneCall className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-[#0A1B4F]">
                      Prefer a Direct Phone Call?
                    </h3>
                    <p className="text-[13px] text-[#4A5876] mt-0.5">
                      Choose your preferred date and time slot. Our certified consultants will call you.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCallbackModalOpen(true)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-blue-50 text-[#1F4FE0] border border-blue-300 font-semibold text-[13.5px] shadow-xs hover:shadow transition-all shrink-0 cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4 text-[#1F4FE0]" />
                  <span>Request a Callback</span>
                </button>
              </div>

<div className="bg-white rounded-2xl border border-blue-100/80 shadow-md p-6 sm:p-8 lg:p-9">
                {isSubmittedSuccess ? (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 sm:p-8 text-center space-y-4">
                    <div className="w-14 h-14 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-[20px] font-bold text-emerald-950 font-serif">
                      Thank You, {formData.fullName}!
                    </h3>
                    <p className="text-[15px] text-emerald-800 leading-relaxed max-w-md mx-auto">
                      Your enquiry for <strong className="text-emerald-950">{formData.companyName}</strong> regarding <strong className="text-emerald-950">{formData.service}</strong> has been logged. Our consultants will review your requirements and respond within 24 business hours.
                    </p>
                    {submittedDetails?.referenceId && (
                      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-emerald-100/80 border border-emerald-300 text-[13px] font-semibold text-emerald-950 mx-auto">
                        <span>Ref: {submittedDetails.referenceId}</span>
                        {submittedDetails.sapCardCode && (
                          <span className="text-emerald-800 font-normal">| SAP Lead: {submittedDetails.sapCardCode}</span>
                        )}
                      </div>
                    )}
                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                      <a
                        href={createMailtoLink(formData)}
                        className="inline-flex items-center gap-2 text-[14px] font-semibold text-emerald-700 bg-white hover:bg-emerald-100 px-5 py-2.5 rounded-lg border border-emerald-300 transition-colors"
                      >
                        <Mail className="w-4 h-4" />
                        <span>Open in Email Client</span>
                      </a>
                      <button
                        type="button"
                        onClick={() => {
                          setIsSubmittedSuccess(false);
                          setFormData({
                            fullName: '',
                            email: '',
                            phone: '',
                            companyName: '',
                            service: '',
                            message: ''
                          });
                        }}
                        className="text-[14px] font-medium text-slate-600 hover:text-slate-900 underline underline-offset-2 py-2"
                      >
                        Submit Another Enquiry
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleMainFormSubmit} className="space-y-4 sm:space-y-5" noValidate>
                    {submitError && (
                      <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-[13.5px] flex items-start gap-2.5">
                        <AlertCircle className="w-5 h-5 shrink-0 text-rose-500 mt-0.5" />
                        <div>
                          <p className="font-semibold">Unable to submit enquiry</p>
                          <p className="text-[13px] mt-0.5 text-rose-600">{submitError}</p>
                        </div>
                      </div>
                    )}
                    
                    {/* Row 1: Full Name & Business Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      <div>
                        <label htmlFor="fullName" className="block text-[13.5px] font-semibold text-[#0A1B4F] mb-1.5">
                          Full Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          placeholder="e.g. Rahul Sharma"
                          className={`w-full px-4 py-3 rounded-xl border text-[14.5px] text-slate-800 placeholder-slate-400 bg-white focus:bg-white focus:outline-none transition-all ${
                            formErrors.fullName
                              ? 'border-rose-400 focus:ring-2 focus:ring-rose-200'
                              : 'border-slate-200 focus:border-[#1F4FE0] focus:ring-2 focus:ring-blue-100'
                          }`}
                        />
                        {formErrors.fullName && (
                          <p className="mt-1 text-[12.5px] text-rose-600 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                            <span>{formErrors.fullName}</span>
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-[13.5px] font-semibold text-[#0A1B4F] mb-1.5">
                          Business Email <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="e.g. rahul@company.com"
                          className={`w-full px-4 py-3 rounded-xl border text-[14.5px] text-slate-800 placeholder-slate-400 bg-white focus:bg-white focus:outline-none transition-all ${
                            formErrors.email
                              ? 'border-rose-400 focus:ring-2 focus:ring-rose-200'
                              : 'border-slate-200 focus:border-[#1F4FE0] focus:ring-2 focus:ring-blue-100'
                          }`}
                        />
                        {formErrors.email && (
                          <p className="mt-1 text-[12.5px] text-rose-600 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                            <span>{formErrors.email}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Row 2: Phone Number & Company Name */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      <div>
                        <label htmlFor="phone" className="block text-[13.5px] font-semibold text-[#0A1B4F] mb-1.5">
                          Phone Number <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="e.g. +91 93723 29599"
                          className={`w-full px-4 py-3 rounded-xl border text-[14.5px] text-slate-800 placeholder-slate-400 bg-white focus:bg-white focus:outline-none transition-all ${
                            formErrors.phone
                              ? 'border-rose-400 focus:ring-2 focus:ring-rose-200'
                              : 'border-slate-200 focus:border-[#1F4FE0] focus:ring-2 focus:ring-blue-100'
                          }`}
                        />
                        {formErrors.phone && (
                          <p className="mt-1 text-[12.5px] text-rose-600 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                            <span>{formErrors.phone}</span>
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="companyName" className="block text-[13.5px] font-semibold text-[#0A1B4F] mb-1.5">
                          Company Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="companyName"
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleInputChange}
                          placeholder="e.g. Acme Industries Ltd"
                          className={`w-full px-4 py-3 rounded-xl border text-[14.5px] text-slate-800 placeholder-slate-400 bg-white focus:bg-white focus:outline-none transition-all ${
                            formErrors.companyName
                              ? 'border-rose-400 focus:ring-2 focus:ring-rose-200'
                              : 'border-slate-200 focus:border-[#1F4FE0] focus:ring-2 focus:ring-blue-100'
                          }`}
                        />
                        {formErrors.companyName && (
                          <p className="mt-1 text-[12.5px] text-rose-600 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                            <span>{formErrors.companyName}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Row 3: Service Interested In */}
                    <div>
                      <label htmlFor="service" className="block text-[13.5px] font-semibold text-[#0A1B4F] mb-1.5">
                        Service Interested In <span className="text-rose-500">*</span>
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-xl border text-[14.5px] text-slate-800 bg-white focus:bg-white focus:outline-none transition-all cursor-pointer ${
                          formErrors.service
                            ? 'border-rose-400 focus:ring-2 focus:ring-rose-200'
                            : 'border-slate-200 focus:border-[#1F4FE0] focus:ring-2 focus:ring-blue-100'
                        }`}
                      >
                        {SUBJECT_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      {formErrors.service && (
                        <p className="mt-1 text-[12.5px] text-rose-600 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{formErrors.service}</span>
                        </p>
                      )}
                    </div>

                    {/* Row 4: Message Textarea */}
                    <div>
                      <label htmlFor="message" className="block text-[13.5px] font-semibold text-[#0A1B4F] mb-1.5">
                        Message <span className="text-rose-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Briefly outline your ERP requirements, current system, or challenges..."
                        className={`w-full px-4 py-3 rounded-xl border text-[14.5px] text-slate-800 placeholder-slate-400 bg-white focus:bg-white focus:outline-none transition-all resize-y ${
                          formErrors.message
                            ? 'border-rose-400 focus:ring-2 focus:ring-rose-200'
                            : 'border-slate-200 focus:border-[#1F4FE0] focus:ring-2 focus:ring-blue-100'
                        }`}
                      />
                      {formErrors.message && (
                        <p className="mt-1 text-[12.5px] text-rose-600 flex items-center gap-1">
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
                        className="w-full py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-[#1F4FE0] to-[#1F4FE0] hover:from-[#1739B8] hover:to-[#1739B8] text-white font-bold text-[16px] shadow-md shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Submitting Enquiry...</span>
                          </>
                        ) : (
                          <>
                            <span>Submit Enquiry</span>
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
            {/* RIGHT COLUMN: OUR OFFICE LOCATIONS (BORIVALI & MARINE LINES)       */}
            {/* ------------------------------------------------------------------- */}
            <div id="locations" className="lg:col-span-6 space-y-5">
              <div>
                <span className="text-[13px] font-bold uppercase tracking-wider text-[#1F4FE0] block mb-1">
                  OFFICE LOCATIONS
                </span>
                <h2 className="atlas-h2-size font-serif font-extrabold text-[#0A1B4F]">
                  Visit Our <span className="bg-gradient-to-r from-[#1F4FE0] via-[#1F4FE0] to-[#1F4FE0] bg-clip-text text-transparent font-accent italic font-semibold tracking-[-0.01em] pr-[0.08em]">Offices</span>
                </h2>
                <p className="text-[15px] sm:text-[16px] text-[#4A5876] mt-1">
                  Visit our Mumbai corporate offices to consult with our leadership and solution specialists in person.
                </p>
              </div>

              {/* 2 Office Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {OFFICE_LOCATIONS.map((office) => (
                  <div
                    key={office.id}
                    className="bg-white rounded-2xl border border-blue-100/80 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md hover:border-[#1F4FE0]/40 transition-all duration-300 group"
                  >
                    <div>
                      {/* Building Photo */}
                      <div className="relative h-[155px] overflow-hidden bg-slate-100">
                        <img
                          src={office.image}
                          alt={office.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1B4F]/50 via-transparent to-transparent pointer-events-none" />
                        <span className="absolute bottom-2.5 left-3 px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-md text-[11.5px] font-bold text-[#0A1B4F]">
                          {office.id === 'borivali' ? 'Borivali (West), Mumbai' : 'Marine Lines, Mumbai'}
                        </span>
                      </div>

                      {/* Details */}
                      <div className="p-4 sm:p-5 space-y-2.5">
                        <div className="flex items-center gap-2 text-[#1F4FE0]">
                          <MapPin className="w-4.5 h-4.5 shrink-0" />
                          <h3 className="font-serif text-[17px] sm:text-[18px] font-bold text-[#0A1B4F]">
                            {office.title}
                          </h3>
                        </div>

                        <p className="text-[13px] text-[#4A5876] leading-relaxed">
                          {office.address}
                        </p>

                        <div className="pt-1">
                          <a
                            href={office.googleMapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-[12.5px] font-bold text-[#1F4FE0] hover:text-[#1F4FE0] transition-colors py-1 px-3 rounded-lg border border-blue-200 hover:border-[#1F4FE0] bg-blue-50/50"
                          >
                            <span>Open in Google Maps</span>
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
                      className="block border-t border-slate-100 relative h-[125px] overflow-hidden bg-white group/map"
                      title={`Open map location for ${office.title}`}
                    >
                      <img
                        src={office.mapImage}
                        alt={`Map location of ${office.title}`}
                        className="w-full h-full object-cover group-hover/map:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-blue-900/10 group-hover/map:bg-transparent transition-colors flex items-center justify-center">
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
      {/* SECTION 4: WHY CONNECT WITH ATLAS TECHNOSOFT?                             */}
      {/* ========================================================================= */}
      <section className="py-14 sm:py-18 bg-white border-b border-blue-100/60">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Heading */}
          <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-12">
            <div className="mb-2.5">
              <span className="text-[13px] sm:text-[14px] font-bold uppercase tracking-wider text-[#1F4FE0] select-none">
                VALUE COMMITMENT
              </span>
            </div>
            <h2 className="atlas-h2-size font-serif font-extrabold text-[#0A1B4F]">
              Why Connect with{' '}
              <span className="bg-gradient-to-r from-[#1F4FE0] via-[#1F4FE0] to-[#1F4FE0] bg-clip-text text-transparent font-accent italic font-semibold tracking-[-0.01em] pr-[0.08em]">
                ATLAS Technosoft?
              </span>
            </h2>
            <p className="mt-3 text-[15px] sm:text-[17px] text-[#4A5876] leading-relaxed">
              We combine deep ERP domain expertise with agile automation to deliver measurable, lasting business impact.
            </p>
          </div>

          {/* Interactive image cards */}
          <ImageFeatureSlider
            ariaLabel="Why connect with ATLAS Technosoft"
            items={[
              {
                title: 'Certified Consultants',
                description: '32 certified experts across SAP HANA, Beas Manufacturing, Produmex WMS, and UiPath RPA.',
                image: '/images/about/about_expertise_hub.jpg',
                href: '/about#team',
              },
              {
                title: 'Proven Track Record',
                description: '80+ enterprise implementations completed on-time and within budget across India and globally.',
                image: '/images/case_studies/cs_featured_manufacturing.jpg',
                href: '/case-studies',
              },
              {
                title: 'SLA-Backed Support',
                description: 'Guaranteed response times, system health tuning, and dedicated AMS account managers.',
                image: '/images/dashboards/executive-command-center.jpg',
                href: '/services/support-maintenance',
              },
              {
                title: 'Strategic Partnership',
                description: 'Long-term collaboration focused on business process optimization and ROI maximization.',
                image: '/images/solutions/solutions_sales_handshake.jpg',
                href: '/partners',
              },
            ]}
          />

        </div>
      </section>

      {/* ========================================================================= */}
      {/* CONSULTATION MODAL                                                        */}
      {/* ========================================================================= */}
      <ConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
        defaultService="SAP Business One Implementation"
      />

      {/* Reusable Enterprise Callback Modal */}
      <CallbackModal
        isOpen={isCallbackModalOpen}
        onClose={() => setIsCallbackModalOpen(false)}
        defaultService={formData.service || 'SAP Business One Implementation'}
      />

    </div>
  );
};
