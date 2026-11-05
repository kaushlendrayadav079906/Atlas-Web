import React, { useState, useEffect } from 'react';
import {
  HelpCircle,
  MessageCircle,
  Phone,
  Mail,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Building2,
  Sparkles
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { FaqAccordion } from '../components/ui/FaqAccordion';
import { ConsultationModal } from '../components/ui/ConsultationModal';
import { CtaContactCards } from '../components/ui/CtaContactCards';
import { FAQS_DATA, FAQ_CATEGORIES } from '../data/faqsData';

export const FaqsPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalService, setModalService] = useState('General Consultation & FAQ Inquiry');

  useEffect(() => {
    document.title = 'Frequently Asked Questions (FAQs) | ATLAS Technosoft';
    window.scrollTo(0, 0);
  }, []);

  const openConsultation = (serviceName?: string) => {
    if (serviceName) setModalService(serviceName);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-white text-slate-800 selection:bg-blue-600 selection:text-white">
      
      {/* ===================================================================== */}
      {/* 1. HERO HEADER                                                        */}
      {/* ===================================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-r from-sky-50/70 via-white to-blue-50/40 py-12 sm:py-16 lg:py-20 border-b border-slate-100">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-[#0052CC] text-xs font-bold uppercase tracking-wider">
              <HelpCircle className="w-4 h-4" />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>

            <h1 className="font-serif text-[32px] sm:text-[42px] lg:text-[48px] font-bold text-[#142B59] tracking-tight leading-[1.15]">
              Answers to Your <span className="bg-gradient-to-r from-[#0052CC] via-[#0066CC] to-[#0A66C2] bg-clip-text text-transparent">ERP & Automation Questions</span>
            </h1>

            <p className="text-[16px] sm:text-[19px] text-[#45546B] leading-relaxed font-normal">
              Find clear, straightforward answers regarding SAP Business One capabilities, deployment timelines, Boyum IT extensions, UiPath software robots, and ongoing AMS support.
            </p>
          </div>

        </div>
      </section>

      {/* ===================================================================== */}
      {/* 2. ACCESSIBLE ACCORDION FAQ DIRECTORY                                 */}
      {/* ===================================================================== */}
      <section className="py-12 sm:py-16 bg-[#F8FAFC]">
        <div className="max-w-[1080px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <FaqAccordion
            faqs={FAQS_DATA}
            categories={FAQ_CATEGORIES}
            activeCategory="All"
            showSearch={true}
          />

        </div>
      </section>

      {/* ===================================================================== */}
      {/* 3. VERIFIED FACT CHECKS & SUPPORT COMMITMENTS                         */}
      {/* ===================================================================== */}
      <section className="py-12 sm:py-14 bg-white border-y border-slate-100">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#0052CC] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#142B59]">
                Authorized Partner Guarantees
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Official SAP Channel Partner, certified Boyum IT Silver Partner, and accredited UiPath Silver Partner adhering strictly to authorized deployment standards.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#142B59]">
                99.9% Production Uptime
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Dedicated AMS account managers and certified consultants providing SLA-backed 24/7 technical incident resolution and system maintenance.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#142B59]">
                Dual Mumbai Delivery Centers
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Full-time delivery hubs in Borivali West and Marine Lines housing 32 certified consultants delivering on-site and remote execution across India.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 4. BOTTOM CTA & CONTACT CARDS                                         */}
      {/* ===================================================================== */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-[#142B59] to-[#0A1A3A] text-white">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-300 block">
                STILL HAVE QUESTIONS?
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
                Speak Directly with an ATLAS Solution Architect
              </h3>
              <p className="text-blue-100/90 text-sm sm:text-base leading-relaxed">
                Every enterprise operational environment is unique. Schedule a 45-minute discovery consultation to discuss your specific workflows, transaction volume, or system architecture.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Button
                  onClick={() => openConsultation('Discovery Consultation from FAQ')}
                  variant="gold"
                  size="md"
                  className="bg-[#1B72E8] hover:bg-[#1557B0] text-white font-semibold px-6 py-3 rounded-xl shadow-md"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Book Strategic Consultation
                </Button>
                <a
                  href="https://wa.me/919372329599?text=Hello%20ATLAS%20Technosoft%2C%20I%20have%20a%20question%20about%20your%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm backdrop-blur-xs transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-6">
              <CtaContactCards />
            </div>

          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* REUSABLE ENTERPRISE CONSULTATION MODAL                                */}
      {/* ===================================================================== */}
      <ConsultationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultService={modalService}
        title="Schedule a Consultation"
        subtitle="Speak directly with certified SAP Business One, Boyum IT, and UiPath solution architects."
      />

    </div>
  );
};

