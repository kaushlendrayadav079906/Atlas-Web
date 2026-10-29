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
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-50/40 via-white to-slate-50/50 pt-10 pb-14 lg:pt-14 lg:pb-20 border-b border-slate-100">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Column (Approx 58% on Desktop) */}
            <div className="lg:col-span-7 space-y-5 text-left">
              {/* Eyebrow Label: 13–14px */}
              <div className="inline-block">
                <span className="text-[13px] sm:text-[14px] font-bold uppercase tracking-wider text-blue-600 select-none">
                  Your Partner for a Smarter Tomorrow
                </span>
              </div>

              {/* Main Hero Heading: Desktop 48–56px, Mobile 34–40px */}
              <h1 className="text-[34px] sm:text-[42px] lg:text-[48px] xl:text-[52px] font-extrabold tracking-tight leading-[1.14] text-slate-900">
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

            {/* Right Column: Hero Visual with SAME Image in Perfect Proportion */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto w-full max-w-lg lg:max-w-none rounded-2xl overflow-hidden shadow-xl border border-slate-200/90 bg-white">
                <img
                  src="/images/same_crops_clean/hero_team.png"
                  alt="ATLAS Technosoft Enterprise Team collaborating on SAP Business One Dashboard"
                  className="w-full h-auto object-cover max-h-[360px]"
                />

                {/* Bottom Overlay Partner Logo Ribbon Box */}
                <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md rounded-xl py-2.5 px-4 shadow-lg border border-slate-200/90 flex items-center justify-around">
                  <SAPBusinessOneLogo className="h-6 sm:h-7" />
                  <div className="h-4 w-px bg-slate-200" />
                  <BoyumITLogo className="h-6 sm:h-7" />
                  <div className="h-4 w-px bg-slate-200" />
                  <UiPathLogo className="h-6 sm:h-7" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: COMPANY METRICS BAR (COMPACT "SMALL SIZE" BOX CARD)            */}
      {/* ========================================================================= */}
      <section id="metrics" className="py-6 sm:py-8 bg-white border-b border-slate-100">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Sleek, Single White Box-Type Container Bar */}
          <div className="rounded-2xl bg-white border border-slate-200/90 shadow-sm p-3 sm:p-5 lg:p-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
              {TRUST_METRICS.map((metric) => (
                <div key={metric.id} className="pt-3 sm:pt-0 first:pt-0">
                  <MetricCard metric={metric} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: SERVICES OVERVIEW (4 BOX-TYPE CARDS)                           */}
      {/* ========================================================================= */}
      <section id="services" className="py-14 sm:py-18 lg:py-20 bg-slate-50/50 border-b border-slate-100">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionHeading
            badge="OUR SERVICES"
            title="Comprehensive Solutions for Your Business"
            subtitle="From ERP implementation to intelligent automation, we deliver end-to-end solutions to help your business grow."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
      <section id="expertise" className="py-14 sm:py-18 lg:py-20 bg-white border-b border-slate-100">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Content (approx 55% width) */}
            <div className="lg:col-span-6 space-y-5">
              <div>
                <span className="text-[13px] sm:text-[14px] font-bold uppercase tracking-wider text-blue-600 block mb-2">
                  OUR EXPERTISE
                </span>
                <h2 className="text-[28px] sm:text-[34px] lg:text-[36px] font-bold text-slate-900 tracking-tight leading-tight">
                  Bridging ERP and Intelligent Automation
                </h2>
              </div>

              {/* Body Text */}
              <p className="text-[16px] sm:text-[17px] lg:text-[18px] text-slate-600 leading-relaxed">
                We combine deep expertise in SAP Business One, business process optimization, manufacturing and warehouse solutions, and intelligent automation to deliver real business value.
              </p>

              {/* Boxed Checklist Tiles */}
              <div className="space-y-2.5 pt-1">
                {[
                  "End-to-end ERP implementation and support",
                  "Industry-focused solutions for manufacturing, warehousing, and trading",
                  "Business process optimization",
                  "Intelligent automation with RPA and AI"
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-200/80 shadow-xs flex items-center gap-3 hover:border-blue-300 transition-colors"
                  >
                    <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                    <span className="text-[15px] sm:text-[16px] text-slate-800 font-medium">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Image: SAME Image in Perfect Proportion Box Frame */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200/90 bg-slate-900 max-h-[320px]">
                <img
                  src="/images/same_crops_clean/expertise_erp.png"
                  alt="Bridging ERP, Manufacturing Robotics, Analytics and Cloud Automation"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 7: INDUSTRIES WE SERVE (4 COMPACT BOX-TYPE CARDS)                 */}
      {/* ========================================================================= */}
      <section id="industries" className="py-14 sm:py-18 lg:py-20 bg-slate-50/50 border-b border-slate-100">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionHeading
            badge="INDUSTRIES WE SERVE"
            title="Industry-Focused Solutions"
            subtitle="We understand your industry challenges and deliver tailored solutions."
            align="center"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <IndustryCard
              id="manufacturing"
              title="Manufacturing"
              description="Streamline production, inventory and operations."
              imageSrc="/images/same_crops_clean/ind_manufacturing.png"
            />
            <IndustryCard
              id="warehouse"
              title="Warehouse & Logistics"
              description="Optimize warehousing, logistics and supply chain."
              imageSrc="/images/same_crops_clean/ind_warehouse.png"
            />
            <IndustryCard
              id="finance"
              title="Finance & Administration"
              description="Improve financial control and administrative efficiency."
              imageSrc="/images/same_crops_clean/ind_finance.png"
            />
            <IndustryCard
              id="trading"
              title="Trading & Shipping"
              description="Enhance trading operations and shipping processes."
              imageSrc="/images/same_crops_clean/ind_shipping.png"
            />
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 8: OUR APPROACH (4 INLINE STEP PROCESS)                           */}
      {/* ========================================================================= */}
      <section id="approach" className="py-14 sm:py-18 lg:py-20 bg-white border-b border-slate-100">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionHeading
            badge="OUR APPROACH"
            title="A Structured Approach for Lasting Success"
            subtitle="We follow a proven approach to understand, implement and optimize solutions for your business."
            align="center"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 relative pt-2">
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
      {/* SECTION 9: CUSTOMER SUCCESS (TWO COMPACT SIDE-BY-SIDE CARDS)              */}
      {/* ========================================================================= */}
      <section id="case-studies" className="py-14 sm:py-18 lg:py-20 bg-slate-50/50 border-b border-slate-100">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionHeading
            badge="CUSTOMER SUCCESS"
            title="Trusted by Growing Businesses"
            subtitle="We help businesses across industries streamline operations and achieve their goals."
            align="center"
          />

          {/* Two Side-by-Side Testimonial Box Cards as in Reference Image */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto mb-6">
            <TestimonialCard
              quote="ATLAS Technosoft helped us streamline our business processes with SAP Business One and automation solutions."
              author="— Customer Name (To be verified)"
              imageSrc="/images/same_crops_clean/testimonial_1.png"
            />
            <TestimonialCard
              quote="Their expertise in warehouse solutions significantly improved our operational efficiency."
              author="— Customer Name (To be verified)"
              imageSrc="/images/same_crops_clean/testimonial_2.png"
            />
          </div>

          {/* Carousel Indicator Dots */}
          <div className="flex items-center justify-center gap-2 pt-2">
            <span className="w-8 h-2 rounded-full bg-blue-600 transition-all" />
            <span className="w-2 h-2 rounded-full bg-slate-300" />
            <span className="w-2 h-2 rounded-full bg-slate-300" />
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 10: OUR PARTNERS (CENTERED LOGO BAR)                              */}
      {/* ========================================================================= */}
      <section id="partners" className="py-14 sm:py-18 bg-white border-b border-slate-100">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionHeading
            badge="OUR PARTNERS"
            title="Working with Global Technology Leaders"
            subtitle="We collaborate with industry-leading technology partners to deliver the best solutions."
            align="center"
          />

          <div className="max-w-2xl mx-auto flex items-center justify-center">
            <PartnerLogosStrip className="scale-105 sm:scale-115" />
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 11: LET'S DISCUSS YOUR BUSINESS NEEDS (BOX-TYPE BANNER)           */}
      {/* ========================================================================= */}
      <section id="contact" className="py-14 sm:py-18 lg:py-20 bg-slate-50/50">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Defined Box Container */}
          <div className="rounded-2xl bg-gradient-to-br from-blue-50/80 via-sky-50/40 to-blue-50/80 border border-blue-200/90 p-8 sm:p-10 lg:p-12 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              
              {/* Left Column: Heading, Subtext & CTA Button */}
              <div className="lg:col-span-6 space-y-4">
                <h2 className="text-[26px] sm:text-[32px] lg:text-[36px] font-bold text-slate-900 tracking-tight leading-tight">
                  Let's Discuss Your Business Needs
                </h2>
                
                <p className="text-[15px] sm:text-[17px] text-slate-600 leading-relaxed max-w-lg">
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

              {/* Right Column: 3 White Boxed Contact Info Cards */}
              <div className="lg:col-span-6 space-y-3.5">
                
                {/* Email Box Card */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-200 shadow-sm hover:border-blue-300 transition-colors">
                  <div className="w-11 h-11 rounded-lg bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[12px] font-bold uppercase tracking-wider text-slate-400 block">
                      Email
                    </span>
                    <a
                      href={`mailto:${BRAND_INFO.contact.email}`}
                      className="text-[15px] sm:text-[16px] font-bold text-slate-900 hover:text-blue-600 transition-colors"
                    >
                      {BRAND_INFO.contact.email}
                    </a>
                  </div>
                </div>

                {/* Phone Box Card */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-200 shadow-sm hover:border-blue-300 transition-colors">
                  <div className="w-11 h-11 rounded-lg bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[12px] font-bold uppercase tracking-wider text-slate-400 block">
                      Phone
                    </span>
                    <a
                      href={BRAND_INFO.contact.whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[15px] sm:text-[16px] font-bold text-slate-900 hover:text-blue-600 transition-colors"
                    >
                      {BRAND_INFO.contact.phone}
                    </a>
                  </div>
                </div>

                {/* Locations Box Card */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-200 shadow-sm hover:border-blue-300 transition-colors">
                  <div className="w-11 h-11 rounded-lg bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[12px] font-bold uppercase tracking-wider text-slate-400 block">
                      Locations
                    </span>
                    <span className="text-[15px] sm:text-[16px] font-bold text-slate-900 block leading-snug">
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
      {/* INTERACTIVE CONSULTATION BOOKING MODAL                                    */}
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
