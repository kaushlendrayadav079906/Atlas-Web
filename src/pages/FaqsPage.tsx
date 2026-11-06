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
import { ImageFeatureSlider } from '../components/ui/ImageFeatureSlider';
import { cardImage, poolForSlug } from '../data/cardImagePools';

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
      <section className="relative overflow-hidden py-12 sm:py-16 lg:py-20 border-b border-white/10 bg-atlas-navy atlas-dark">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-[#1F4FE0] text-xs font-bold uppercase tracking-wider">
              <HelpCircle className="w-4 h-4" />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>

            <h1 className="atlas-h1-size font-serif font-extrabold text-[#0A1B4F]">
              Answers to Your <span className="bg-gradient-to-r from-[#1F4FE0] via-[#1F4FE0] to-[#1F4FE0] bg-clip-text text-transparent font-accent italic font-semibold tracking-[-0.01em] pr-[0.08em]">ERP & Automation Questions</span>
            </h1>

            <p className="text-[16px] sm:text-[19px] text-[#4A5876] leading-relaxed font-normal">
              Find clear, straightforward answers regarding SAP Business One capabilities, deployment timelines, Boyum IT extensions, UiPath software robots, and ongoing AMS support.
            </p>
          </div>

        </div>
      </section>

      {/* ===================================================================== */}
      {/* 2. ACCESSIBLE ACCORDION FAQ DIRECTORY                                 */}
      {/* ===================================================================== */}
      <section className="py-12 sm:py-16 bg-atlas-navy atlas-dark">
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
          <ImageFeatureSlider
            layout="grid"
            perView={3}
            ariaLabel="Our support commitments"
            items={[
              { title: 'Authorized Partner Guarantees', description: 'Official SAP Channel Partner, certified Boyum IT Silver Partner, and accredited UiPath Silver Partner adhering strictly to authorized deployment standards.', image: cardImage('people', 5) },
              { title: '99.9% Production Uptime', description: 'Dedicated AMS account managers and certified consultants providing SLA-backed 24/7 technical incident resolution and system maintenance.', image: cardImage('technology', 2) },
              { title: 'Dual Mumbai Delivery Centers', description: 'Full-time delivery hubs in Borivali West and Marine Lines housing 32 certified consultants delivering on-site and remote execution across India.', image: cardImage('people', 6) },
            ]}
          />
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 4. BOTTOM CTA & CONTACT CARDS                                         */}
      {/* ===================================================================== */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-[#0A1B4F] to-[#0A1B4F] text-white">
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
                  className="bg-[#1F4FE0] hover:bg-[#1F4FE0] text-white font-semibold px-6 py-3 rounded-xl shadow-md"
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

