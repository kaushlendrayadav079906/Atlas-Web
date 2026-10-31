import { CtaContactCards } from '../components/ui/CtaContactCards';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  Mail,
  Phone,
  MapPin,
  ChevronUp,
  ShieldCheck,
  Sparkles,
  Layers,
  Cpu,
  BarChart3,
  Truck,
  Settings,
  Send,
  Workflow,
  Zap
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { SectionHeading } from '../components/ui/SectionHeading';
import { ServiceCard } from '../components/ui/SolutionCard';
import { Modal } from '../components/ui/Modal';
import { BRAND_INFO, TRUST_METRICS } from '../data/websiteContent';
import { ContactFormData } from '../types';

export const ServicesPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    workEmail: '',
    phoneNumber: '',
    companyName: '',
    areaOfInterest: 'Enterprise Services & Solutions',
    message: ''
  });

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setFormSubmitted(false);
      setFormData({
        fullName: '',
        workEmail: '',
        phoneNumber: '',
        companyName: '',
        areaOfInterest: 'Enterprise Services & Solutions',
        message: ''
      });
    }, 2500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-slate-800">
      {/* ========================================================================= */}
      {/* SECTION 1: SERVICES HERO                                                  */}
      {/* ========================================================================= */}
      <section className="relative pt-8 pb-12 sm:pb-16 bg-gradient-to-b from-blue-50/60 via-white to-white border-b border-slate-100 overflow-hidden">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-[#53647A] mb-6">
            <Link to="/" className="hover:text-[#1B72E8] transition-colors">Home</Link>
            <span>/</span>
            <span className="font-semibold text-[#142B59]">Services</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/80 border border-blue-200/60">
                <Sparkles className="w-4 h-4 text-[#1B72E8]" />
                <span className="text-[12px] sm:text-[13px] font-bold uppercase tracking-wider text-[#1B72E8]">
                  OUR SERVICES & EXPERTISE
                </span>
              </div>

              <h1 className="font-serif text-[34px] sm:text-[44px] lg:text-[50px] font-bold text-[#142B59] tracking-tight leading-[1.15]">
                Enterprise Services Where SAP Meets{' '}
                <span className="bg-gradient-to-r from-[#0052CC] via-[#0066CC] to-[#0A66C2] bg-clip-text text-transparent">
                  Intelligent Automation
                </span>
              </h1>

              <p className="text-[16px] sm:text-[18px] lg:text-[19px] text-[#45546B] leading-relaxed max-w-2xl">
                ATLAS Technosoft helps manufacturing, logistics, pharma, and trading enterprises eliminate up to 70% of manual work, gain real-time visibility, and achieve measurable ROI using certified SAP Business One, Boyum IT, and UiPath RPA solutions.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Button
                  onClick={() => setIsModalOpen(true)}
                  variant="gold"
                  size="lg"
                  className="text-[15px] sm:text-[16px] font-semibold px-7 py-3.5 shadow-md shadow-blue-500/25 bg-gradient-to-r from-[#0052CC] to-[#0A66C2] hover:from-[#0040A8] hover:to-[#08529C] text-white"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Book a Consultation
                </Button>

                <a
                  href="#services-catalog"
                  className="inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 px-6 py-3.5 text-[15px] sm:text-[16px] bg-white text-[#142B59] hover:bg-slate-50 border border-slate-300 shadow-xs"
                >
                  Explore Service Suites
                </a>
              </div>

              <div className="pt-2 flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#142B59]">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Authorized SAP Channel Partner | Boyum IT Silver Partner | UiPath Silver Partner</span>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200/90 bg-white">
                <img
                  src="/images/crystal_hd/expertise_erp.jpg"
                  alt="ATLAS Technosoft Enterprise Services & Digital Transformation Team"
                  className="w-full h-auto object-cover max-h-[400px]"
                />
              </div>
            </div>

          </div>

          {/* Metric Strip */}
          <div className="mt-12 pt-8 border-t border-slate-200/70">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {TRUST_METRICS.map((m) => (
                <div key={m.id} className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200/80 shadow-xs">
                  <div className="text-[28px] sm:text-[34px] font-black text-[#1B72E8] tracking-tight leading-none mb-1.5">
                    {m.value}
                  </div>
                  <div className="text-[14px] sm:text-[15px] font-bold text-[#142B59] leading-snug">
                    {m.label}
                  </div>
                  <div className="text-[12px] sm:text-[13px] text-[#53647A] leading-normal mt-1">
                    {m.detail}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: 4 CORE SERVICE SUITES CATALOG                                  */}
      {/* ========================================================================= */}
      <section id="services-catalog" className="py-12 sm:py-16 bg-[#f4f9ff]/60 border-b border-slate-100 scroll-mt-20">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionHeading
            badge="OUR CORE SERVICE SUITES"
            title="Comprehensive Solutions for"
            titleHighlight="Your Business"
            subtitle="Explore our specialized practices across core ERP, manufacturing add-ons, hyperautomation, and proprietary extensions."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 pt-4">
            <ServiceCard
              id="sap-b1"
              title="SAP Business One Implementation & Optimization"
              bullets={[
                "Cloud & On-Premise implementations",
                "SAP B1 HANA migrations & upgrades",
                "Multi-company & global rollouts"
              ]}
              ctaText="Learn More"
              ctaTarget="/services/sap-business-one"
            />

            <ServiceCard
              id="boyum"
              title="Boyum IT Solutions"
              bullets={[
                "Beas Manufacturing APS & MRP",
                "Produmex WMS & Mobile RF",
                "B1 Usability Package (B1UP)"
              ]}
              ctaText="Learn More"
              ctaTarget="/services/boyum-it"
            />

            <ServiceCard
              id="uipath"
              title="UiPath RPA & AI Automation"
              bullets={[
                "Invoice, GRPO & AP/AR automation",
                "Document Understanding (OCR + AI)",
                "Process Mining & 4–6 month ROI"
              ]}
              ctaText="Learn More"
              ctaTarget="/services/uipath-automation"
            />

            <ServiceCard
              id="atlas"
              title="ATLAS Proprietary Add-ons"
              bullets={[
                "Freight & Multi-Modal Trading",
                "AI Gate Entry & Weighbridge",
                "WMS & Vendor Collaboration",
                "Export Shipping Documentation"
              ]}
              ctaText="Learn More"
              ctaTarget="/services/atlas-addons"
            />
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: BRIDGING ERP & HYPERAUTOMATION                                 */}
      {/* ========================================================================= */}
      <section className="py-12 sm:py-16 bg-white border-b border-slate-100">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-4">
              <span className="text-[13px] sm:text-[14px] font-bold uppercase tracking-wider text-[#1B72E8] block">
                INTEGRATED ECOSYSTEM
              </span>
              <h2 className="font-serif text-[28px] sm:text-[36px] font-bold text-[#142B59] tracking-tight leading-tight">
                Bridging ERP and <span className="bg-gradient-to-r from-[#0052CC] via-[#0066CC] to-[#0A66C2] bg-clip-text text-transparent">Intelligent Automation</span>
              </h2>
              <p className="text-[16px] sm:text-[17px] text-[#45546B] leading-relaxed">
                We combine deep expertise in SAP Business One, business process optimization, manufacturing and warehouse solutions, and intelligent automation to deliver real business value.
              </p>

              <div className="space-y-2.5 pt-2">
                {[
                  "End-to-end ERP implementation and continuous optimization support",
                  "Industry-focused solutions for manufacturing, warehousing, and trading",
                  "Turnkey business process re-engineering and approval workflows",
                  "Intelligent automation with UiPath software robots and machine learning"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#142B59] text-white flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-[15px] sm:text-[16px] text-[#172B50] font-medium">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200/90 bg-slate-950 max-h-[350px]">
                <img
                  src="/images/solutions/solutions_integrated_ecosystem.jpg"
                  alt="Integrated Ecosystem connecting SAP Business One, Boyum IT and UiPath"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: CONSULTATION CALL-TO-ACTION                                    */}
      {/* ========================================================================= */}
      <section id="contact-cta" className="py-12 sm:py-16 bg-[#f4f9ff]/60">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="rounded-2xl bg-[#eaf4ff] border border-blue-200/90 p-8 sm:p-10 lg:p-12 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              
              <div className="lg:col-span-6 space-y-4 text-left">
                <span className="text-[12px] font-bold uppercase tracking-wider text-[#1B72E8] block">
                  LET'S WORK TOGETHER
                </span>
                <h2 className="font-serif text-[28px] sm:text-[34px] lg:text-[40px] font-bold text-[#142B59] tracking-tight leading-tight">
                  Ready to Transform{' '}
                  <span className="bg-gradient-to-r from-[#0052CC] via-[#0066CC] to-[#0A66C2] bg-clip-text text-transparent">
                    Your Business?
                  </span>
                </h2>
                <p className="text-[15px] sm:text-[16px] text-[#45546B] leading-relaxed">
                  Book a consultation with our experts and explore how we can help you streamline your operations and drive growth.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <Button
                    onClick={() => setIsModalOpen(true)}
                    variant="gold"
                    size="lg"
                    className="text-[15px] sm:text-[16px] font-semibold px-7 py-3.5 bg-gradient-to-r from-[#0052CC] to-[#0A66C2] hover:from-[#0040A8] hover:to-[#08529C] text-white shadow-md shadow-blue-500/25"
                    icon={<ArrowRight className="w-4 h-4" />}
                  >
                    Book a Consultation
                  </Button>
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center font-semibold rounded-lg px-6 py-3.5 text-[15px] sm:text-[16px] bg-white text-[#142B59] hover:bg-slate-50 border border-slate-300 shadow-xs"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-6 space-y-3.5">
                <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#53647A] uppercase tracking-wider">Direct Email</div>
                    <a href={`mailto:${BRAND_INFO.contact.email}`} className="text-sm sm:text-base font-bold text-[#142B59] hover:text-[#1B72E8]">
                      {BRAND_INFO.contact.email}
                    </a>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#1B72E8] flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#53647A] uppercase tracking-wider">Direct Phone & WhatsApp</div>
                    <a href={BRAND_INFO.contact.whatsappLink} target="_blank" rel="noopener noreferrer" className="text-sm sm:text-base font-bold text-[#142B59] hover:text-[#1B72E8]">
                      {BRAND_INFO.contact.phoneDisplay}
                    </a>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#0066CC] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#53647A] uppercase tracking-wider">Mumbai Offices</div>
                    <div className="text-sm sm:text-base font-bold text-[#142B59]">
                      Borivali West & Marine Lines, Mumbai, India
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Consultation Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Book a Consultation — ATLAS Technosoft"
      >
        {formSubmitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-[#142B59]">Thank You!</h3>
            <p className="text-sm text-[#45546B]">
              Your consultation request has been received. Our team will contact you shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleFormSubmit} className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-[#142B59] uppercase tracking-wider mb-1">Full Name *</label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="e.g. Rajesh Sharma"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B72E8]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#142B59] uppercase tracking-wider mb-1">Work Email *</label>
                <input
                  type="email"
                  required
                  value={formData.workEmail}
                  onChange={e => setFormData({ ...formData, workEmail: e.target.value })}
                  placeholder="name@company.com"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B72E8]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#142B59] uppercase tracking-wider mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={formData.phoneNumber}
                  onChange={e => setFormData({ ...formData, phoneNumber: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B72E8]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#142B59] uppercase tracking-wider mb-1">Company Name *</label>
              <input
                type="text"
                required
                value={formData.companyName}
                onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                placeholder="Company Pvt. Ltd."
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B72E8]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#142B59] uppercase tracking-wider mb-1">Service of Interest</label>
              <select
                value={formData.areaOfInterest}
                onChange={e => setFormData({ ...formData, areaOfInterest: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B72E8]"
              >
                <option value="SAP Business One">SAP Business One Implementation & Optimization</option>
                <option value="Boyum IT Solutions">Boyum IT Solutions (Beas Manufacturing, Produmex WMS, B1UP)</option>
                <option value="UiPath RPA & AI Automation">UiPath RPA & AI Automation</option>
                <option value="ATLAS Proprietary Add-ons">ATLAS Proprietary Add-ons</option>
              </select>
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                fullWidth
                size="md"
                icon={<Send className="w-4 h-4" />}
              >
                Submit Consultation Request
              </Button>
            </div>
          </form>
        )}
      </Modal>

      /* Global scroll-to-top handled by SiteLayout */
    </div>
  );
};
