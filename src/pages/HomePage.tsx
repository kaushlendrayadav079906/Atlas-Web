import React, { useState } from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  Mail, 
  Phone, 
  MapPin, 
  ChevronLeft, 
  ChevronRight,
  Send,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { SectionHeading } from '../components/ui/SectionHeading';
import { MetricCard } from '../components/ui/MetricCard';
import { ServiceCard } from '../components/ui/SolutionCard';
import { IndustryCard } from '../components/ui/IndustryCard';
import { ProcessStep } from '../components/ui/ProcessStep';
import { TestimonialCard } from '../components/ui/TestimonialCard';
import { Modal } from '../components/ui/Modal';
import { PartnerLogosStrip, SAPBusinessOneLogo, BoyumITLogo, UiPathLogo } from '../components/ui/PartnerLogos';
import { BRAND_INFO, TRUST_METRICS } from '../data/websiteContent';
import { ContactFormData } from '../types';

export const HomePage: React.FC = () => {
  // Testimonial Carousel State
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  // Contact Form & Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const testimonialsData = [
    {
      id: 'test-1',
      quote: "ATLAS Technosoft helped us streamline our business processes with SAP Business One and automation solutions.",
      author: "— CEO, Leading Logistics Company (To be verified)",
      imageSrc: "/images/reference_crops/testimonial_1.jpg"
    },
    {
      id: 'test-2',
      quote: "Their expertise in warehouse solutions significantly improved our operational efficiency and reduced inventory errors.",
      author: "— CFO, Manufacturing Client (To be verified)",
      imageSrc: "/images/reference_crops/testimonial_2.jpg"
    }
  ];

  const handlePrevTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev === 0 ? testimonialsData.length - 1 : prev - 1));
  };

  const handleNextTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev === testimonialsData.length - 1 ? 0 : prev + 1));
  };

  // Form Field Validation
  const validateForm = (): boolean => {
    const errors: Partial<Record<keyof ContactFormData, string>> = {};

    if (!formData.fullName.trim()) {
      errors.fullName = 'Full name is required';
    }
    if (!formData.companyName.trim()) {
      errors.companyName = 'Company name is required';
    }
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
    const subject = encodeURIComponent(`Consultation Booking: ${data.companyName}`);
    const body = encodeURIComponent(
      `Dear ATLAS Technosoft Team,\n\n` +
      `I would like to book a consultation regarding ${data.areaOfInterest}.\n\n` +
      `Contact Details:\n` +
      `• Name: ${data.fullName}\n` +
      `• Company: ${data.companyName}\n` +
      `• Work Email: ${data.workEmail}\n` +
      `• Phone/WhatsApp: ${data.phoneNumber}\n\n` +
      `Requirements / Message:\n${data.message}\n\n` +
      `Submitted via ATLAS Technosoft Website.`
    );
    return `mailto:${BRAND_INFO.contact.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="relative bg-white text-slate-900 selection:bg-blue-600 selection:text-white">

      {/* ========================================================================= */}
      {/* SECTION 2: HERO SECTION                                                   */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-50/50 via-white to-slate-50/60 pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-slate-100">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Column (Approx 58% on Desktop) */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Eyebrow Label: 13–14px */}
              <div className="inline-block">
                <span className="text-[13px] sm:text-[14px] font-bold uppercase tracking-wider text-blue-600 select-none">
                  Your Partner for a Smarter Tomorrow
                </span>
              </div>

              {/* Main Hero Heading: Desktop 48–56px, Mobile 34–40px */}
              <h1 className="text-[34px] sm:text-[42px] lg:text-[50px] xl:text-[54px] font-extrabold tracking-tight leading-[1.14] text-slate-900">
                Where SAP Business One Meets{' '}
                <span className="text-blue-600">Intelligent Automation</span>
              </h1>

              {/* Supporting Text: 18–19px Desktop, 16–18px Mobile */}
              <p className="text-[16px] sm:text-[18px] lg:text-[19px] text-slate-600 leading-relaxed max-w-2xl font-normal">
                ATLAS Technosoft helps manufacturing, logistics, pharma, and trading companies streamline operations with SAP Business One, Boyum IT solutions, UiPath RPA, and AI-driven automation.
              </p>

              {/* Dual Action CTAs: 16–18px Primary Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Button
                  id="hero-book-btn"
                  onClick={() => setIsModalOpen(true)}
                  variant="primary"
                  size="lg"
                  className="text-[16px] sm:text-[17px] font-semibold px-7 py-3.5 shadow-md shadow-blue-600/20"
                  icon={<ArrowRight className="w-5 h-5" />}
                >
                  Book a Consultation
                </Button>

                <Button
                  href="#solutions"
                  variant="secondary"
                  size="lg"
                  className="text-[16px] sm:text-[17px] font-semibold px-7 py-3.5"
                >
                  Explore Our Solutions
                </Button>
              </div>
            </div>

            {/* Right Column: Hero Visual with Real Team Photo & Partner Logos Strip */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto w-full max-w-lg lg:max-w-none rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 bg-white">
                <img
                  src="/images/reference_crops/hero_team.jpg"
                  alt="ATLAS Technosoft Enterprise Team collaborating on SAP Business One Dashboard"
                  className="w-full h-auto object-cover max-h-[380px]"
                  onError={(e) => {
                    // Fallback to executive command center dashboard if crop is unavailable
                    e.currentTarget.src = "/images/dashboards/executive-command-center.jpg";
                  }}
                />

                {/* Bottom Overlay Partner Logo Ribbon */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl py-3 px-5 shadow-lg border border-slate-200/80 flex items-center justify-around">
                  <SAPBusinessOneLogo className="h-6 sm:h-7" />
                  <div className="h-5 w-px bg-slate-200" />
                  <BoyumITLogo className="h-6 sm:h-7" />
                  <div className="h-5 w-px bg-slate-200" />
                  <UiPathLogo className="h-6 sm:h-7" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: COMPANY METRICS BAR                                            */}
      {/* ========================================================================= */}
      <section id="metrics" className="py-8 bg-white border-b border-slate-100">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-white border border-slate-200/90 shadow-sm p-4 sm:p-6 lg:p-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
              {TRUST_METRICS.map((metric) => (
                <div key={metric.id} className="pt-4 sm:pt-0 first:pt-0">
                  <MetricCard metric={metric} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: SERVICES OVERVIEW (4 SPACIOUS CARDS)                           */}
      {/* ========================================================================= */}
      <section id="services" className="py-16 sm:py-20 lg:py-24 bg-slate-50/60 border-b border-slate-100">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionHeading
            badge="OUR SERVICES"
            title="Comprehensive Solutions for Your Business"
            subtitle="From ERP implementation to intelligent automation, we deliver end-to-end solutions to help your business grow."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Card 1: SAP Business One */}
            <ServiceCard
              id="sap-b1"
              title="SAP Business One Implementation & Optimization"
              bullets={[
                "Complete implementation",
                "Customization and configuration",
                "Streamline business operations"
              ]}
              ctaText="Learn More"
              ctaTarget="#contact"
            />

            {/* Card 2: Boyum IT Solutions */}
            <ServiceCard
              id="boyum"
              title="Boyum IT Solutions"
              bullets={[
                "Beas Manufacturing",
                "Produmex WMS",
                "B1 Usability Package (B1UP)"
              ]}
              ctaText="Learn More"
              ctaTarget="#contact"
            />

            {/* Card 3: UiPath RPA & AI Automation */}
            <ServiceCard
              id="uipath"
              title="UiPath RPA & AI Automation"
              bullets={[
                "Automate business processes",
                "RPA and AI-driven solutions",
                "Improve efficiency and reduce costs"
              ]}
              ctaText="Learn More"
              ctaTarget="#contact"
            />

            {/* Card 4: ATLAS Proprietary Add-ons */}
            <ServiceCard
              id="atlas"
              title="ATLAS Proprietary Add-ons"
              bullets={[
                "Freight & Trading",
                "Gate Entry & Weighment",
                "WMS & Vendor Portal",
                "Shipping Automation",
                "RPA Vendor & Sales Automation"
              ]}
              ctaText="Learn More"
              ctaTarget="#contact"
            />
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6: OUR EXPERTISE (BRIDGING ERP AND AUTOMATION)                    */}
      {/* ========================================================================= */}
      <section id="expertise" className="py-16 sm:py-20 lg:py-24 bg-white border-b border-slate-100">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Content (approx 55% width) */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-[13px] sm:text-[14px] font-bold uppercase tracking-wider text-blue-600 block mb-2">
                  OUR EXPERTISE
                </span>
                <h2 className="text-[28px] sm:text-[34px] lg:text-[38px] font-bold text-slate-900 tracking-tight leading-tight">
                  Bridging ERP and Intelligent Automation
                </h2>
              </div>

              {/* Body Text: 17–18px Desktop, 16–18px Mobile */}
              <p className="text-[16px] sm:text-[17px] lg:text-[18px] text-slate-600 leading-relaxed">
                We combine deep expertise in SAP Business One, business process optimization, manufacturing and warehouse solutions, and intelligent automation to deliver real business value.
              </p>

              {/* Large, Readable Checklist: 16–18px */}
              <ul className="space-y-4 pt-2">
                {[
                  "End-to-end ERP implementation and support",
                  "Industry-focused solutions for manufacturing, warehousing, and trading",
                  "Business process optimization",
                  "Intelligent automation with RPA and AI"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3.5 text-[16px] sm:text-[17px] text-slate-800 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Image: High-Tech ERP Laptop Visual */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200 bg-slate-900 max-h-[380px]">
                <img
                  src="/images/reference_crops/expertise_erp.jpg"
                  alt="Bridging ERP, Manufacturing Robotics, Analytics and Cloud Automation"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/images/dashboards/multi-plant.jpg";
                  }}
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 7: INDUSTRIES WE SERVE (4 CARDS)                                  */}
      {/* ========================================================================= */}
      <section id="industries" className="py-16 sm:py-20 lg:py-24 bg-slate-50/60 border-b border-slate-100">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionHeading
            badge="INDUSTRIES WE SERVE"
            title="Industry-Focused Solutions"
            subtitle="We understand your industry challenges and deliver tailored solutions."
            align="center"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            <IndustryCard
              id="manufacturing"
              title="Manufacturing"
              description="Streamline production, inventory and operations."
              imageSrc="/images/reference_crops/ind_manufacturing.jpg"
            />
            <IndustryCard
              id="warehouse"
              title="Warehouse & Logistics"
              description="Optimize warehousing, logistics and supply chain."
              imageSrc="/images/reference_crops/ind_warehouse.jpg"
            />
            <IndustryCard
              id="finance"
              title="Finance & Administration"
              description="Improve financial control and administrative efficiency."
              imageSrc="/images/reference_crops/ind_finance.jpg"
            />
            <IndustryCard
              id="trading"
              title="Trading & Shipping"
              description="Enhance trading operations and shipping processes."
              imageSrc="/images/reference_crops/ind_shipping.jpg"
            />
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 8: OUR APPROACH (4 PROCESS STEPS)                                 */}
      {/* ========================================================================= */}
      <section id="approach" className="py-16 sm:py-20 lg:py-24 bg-white border-b border-slate-100">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionHeading
            badge="OUR APPROACH"
            title="A Structured Approach for Lasting Success"
            subtitle="We follow a proven approach to understand, implement and optimize solutions for your business."
            align="center"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 relative pt-4">
            <ProcessStep
              number={1}
              title="Discover"
              description="Understand your business requirements and challenges."
            />
            <ProcessStep
              number={2}
              title="Design"
              description="Create the right solution for your needs."
            />
            <ProcessStep
              number={3}
              title="Implement"
              description="Deploy and integrate the solution."
            />
            <ProcessStep
              number={4}
              title="Optimize"
              description="Provide ongoing support and continuous improvement."
              isLast
            />
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 9: CUSTOMER SUCCESS (TESTIMONIALS)                                */}
      {/* ========================================================================= */}
      <section id="case-studies" className="py-16 sm:py-20 lg:py-24 bg-slate-50/60 border-b border-slate-100">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionHeading
            badge="CUSTOMER SUCCESS"
            title="Trusted by Growing Businesses"
            subtitle="We help businesses across industries streamline operations and achieve their goals."
            align="center"
          />

          {/* Testimonials Carousel Container */}
          <div className="relative max-w-4xl mx-auto">
            <TestimonialCard
              quote={testimonialsData[currentTestimonialIndex].quote}
              author={testimonialsData[currentTestimonialIndex].author}
              imageSrc={testimonialsData[currentTestimonialIndex].imageSrc}
            />

            {/* Left / Right Carousel Controls */}
            <div className="flex items-center justify-between mt-6 px-4">
              <button
                type="button"
                onClick={handlePrevTestimonial}
                className="w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-blue-600 flex items-center justify-center shadow-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                aria-label="Previous Testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Carousel Indicator Dots */}
              <div className="flex items-center gap-2">
                {testimonialsData.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentTestimonialIndex(idx)}
                    className={`h-2.5 rounded-full transition-all ${
                      currentTestimonialIndex === idx ? 'w-8 bg-blue-600' : 'w-2.5 bg-slate-300'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={handleNextTestimonial}
                className="w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-blue-600 flex items-center justify-center shadow-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                aria-label="Next Testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 10: OUR PARTNERS                                                  */}
      {/* ========================================================================= */}
      <section id="partners" className="py-16 sm:py-20 lg:py-22 bg-white border-b border-slate-100">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionHeading
            badge="OUR PARTNERS"
            title="Working with Global Technology Leaders"
            subtitle="We collaborate with industry-leading technology partners to deliver the best solutions."
            align="center"
          />

          <div className="max-w-2xl mx-auto flex items-center justify-center">
            <PartnerLogosStrip className="scale-110 sm:scale-125" />
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 11: LET'S DISCUSS YOUR BUSINESS NEEDS (CONTACT CTA & DETAILS)     */}
      {/* ========================================================================= */}
      <section id="contact" className="py-16 sm:py-20 lg:py-24 bg-slate-50/60">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Large Rounded Consultation Card from Reference Design */}
          <div className="rounded-3xl bg-gradient-to-br from-blue-50/80 via-sky-50/40 to-blue-50/80 border border-blue-100 p-8 sm:p-12 lg:p-14 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              
              {/* Left Column: Heading, Subtext & CTA Button */}
              <div className="lg:col-span-6 space-y-5">
                <h2 className="text-[28px] sm:text-[34px] lg:text-[38px] font-bold text-slate-900 tracking-tight leading-tight">
                  Let's Discuss Your Business Needs
                </h2>
                
                <p className="text-[16px] sm:text-[18px] text-slate-600 leading-relaxed max-w-lg">
                  Book a consultation with our experts and explore how we can help you streamline your operations and drive growth.
                </p>

                <div className="pt-2">
                  <Button
                    onClick={() => setIsModalOpen(true)}
                    variant="primary"
                    size="lg"
                    className="text-[16px] sm:text-[17px] font-semibold px-8 py-3.5 shadow-md shadow-blue-600/25"
                    icon={<ArrowRight className="w-5 h-5" />}
                  >
                    Book a Consultation
                  </Button>
                </div>
              </div>

              {/* Right Column: 3 Contact Info Cards */}
              <div className="lg:col-span-6 space-y-4">
                
                {/* Email Card */}
                <div className="flex items-center gap-4 p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[12px] sm:text-[13px] font-bold uppercase tracking-wider text-slate-400 block">
                      Email
                    </span>
                    <a
                      href={`mailto:${BRAND_INFO.contact.email}`}
                      className="text-[16px] sm:text-[17px] font-bold text-slate-900 hover:text-blue-600 transition-colors"
                    >
                      {BRAND_INFO.contact.email}
                    </a>
                  </div>
                </div>

                {/* Phone Card */}
                <div className="flex items-center gap-4 p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[12px] sm:text-[13px] font-bold uppercase tracking-wider text-slate-400 block">
                      Phone
                    </span>
                    <a
                      href={BRAND_INFO.contact.whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[16px] sm:text-[17px] font-bold text-slate-900 hover:text-blue-600 transition-colors"
                    >
                      {BRAND_INFO.contact.phone}
                    </a>
                  </div>
                </div>

                {/* Locations Card */}
                <div className="flex items-center gap-4 p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[12px] sm:text-[13px] font-bold uppercase tracking-wider text-slate-400 block">
                      Locations
                    </span>
                    <span className="text-[16px] sm:text-[17px] font-bold text-slate-900 block leading-snug">
                      Borivali, Mumbai &bull; Marine Lines, Mumbai
                    </span>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* INTERACTIVE CONSULTATION BOOKING MODAL (Zero Backend Pretending)          */}
      {/* ========================================================================= */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setIsSuccessSubmitted(false);
        }}
        title="Book a Consultation with ATLAS Technosoft"
      >
        {!isSuccessSubmitted ? (
          <form onSubmit={handleFormSubmit} noValidate className="space-y-4">
            <p className="text-[14px] text-slate-600 mb-2">
              Speak directly with certified SAP Business One, Boyum IT, and UiPath RPA experts.
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
                  Area of Interest
                </label>
                <select
                  id="areaOfInterest"
                  name="areaOfInterest"
                  value={formData.areaOfInterest}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                >
                  <option value="sap-b1">SAP Business One Implementation</option>
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
                placeholder="Briefly describe your process bottlenecks or ERP requirements..."
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
          <div className="space-y-4">
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
                  `Hello ATLAS Technosoft, I submitted a consultation request for ${formData.companyName}. Name: ${formData.fullName}.`
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
