import { LogoMarquee } from '../components/ui/LogoMarquee';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { BlogSection } from '../components/ui/blog/BlogSection';
import { 
  ArrowRight, 
  CheckCircle2, 
  Mail, 
  Phone, 
  MapPin, 
  ChevronLeft, 
  ChevronRight,
  ChevronUp,
  Send,
  PhoneCall
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { SectionHeading } from '../components/ui/SectionHeading';
import { MetricCard } from '../components/ui/MetricCard';
import { ServiceCard } from '../components/ui/SolutionCard';
import { IndustryCard } from '../components/ui/IndustryCard';
import { ProcessStep } from '../components/ui/ProcessStep';
import { TestimonialCard } from '../components/ui/TestimonialCard';
import { ConsultationModal } from '../components/ui/ConsultationModal';
import { CallbackModal } from '../components/ui/CallbackModal';
import { CtaContactCards } from '../components/ui/CtaContactCards';
import { SAPBusinessOneLogo, BoyumITLogo, UiPathLogo } from '../components/ui/PartnerLogos';
import { BRAND_INFO, TRUST_METRICS } from '../data/websiteContent';

export interface CustomerStoryItem {
  id: string;
  category: string;
  quote: string;
  designation: string;
  companyCategory: string;
  imageSrc: string;
  objectPosition?: string;
  caseStudyUrl: string;
  verificationNote: string;
}

export const CUSTOMER_STORIES: CustomerStoryItem[] = [
  {
    id: 'warehouse-management',
    category: 'Warehouse Management',
    quote: 'Deploying Produmex WMS with SAP Business One transformed our fulfillment. Dispatch errors dropped significantly, and warehouse throughput increased by over 40%.',
    designation: 'Supply Chain & Logistics Director',
    companyCategory: 'Industrial Distribution Sector',
    imageSrc: '/images/case_studies/cs_warehouse.jpg',
    objectPosition: '50% 40%',
    caseStudyUrl: '/case-studies/warehouse-management',
    verificationNote: 'Sample Enterprise Story · Logistics'
  },
  {
    id: 'trading-distribution',
    category: 'Trading & Distribution',
    quote: 'The multi-currency reconciliation and automated landed-cost tracking unified our import-export operations across four distribution centers with live visibility.',
    designation: 'Head of International Trade',
    companyCategory: 'Global Commodity & Trading Group',
    imageSrc: '/images/crystal_hd/ind_shipping.jpg',
    objectPosition: 'center 45%',
    caseStudyUrl: '/case-studies/trading-operations',
    verificationNote: 'Sample Enterprise Story · Trading'
  },
  {
    id: 'retail-wholesale',
    category: 'Retail & Wholesale',
    quote: 'Our omnichannel inventory synchronization between retail storefronts and central warehousing eliminated stockouts and gave our management instant cash-flow control.',
    designation: 'Retail Operations Director',
    companyCategory: 'Multi-Store Retail Chain',
    imageSrc: '/images/solutions/solutions_sales_handshake.jpg',
    objectPosition: 'center 35%',
    caseStudyUrl: '/case-studies/inventory-visibility',
    verificationNote: 'Sample Enterprise Story · Retail'
  },
  {
    id: 'manufacturing',
    category: 'Manufacturing',
    quote: 'Beas Manufacturing integration with SAP Business One gave our production floor live shop-floor data capture, job costing precision, and flawless BOM scheduling.',
    designation: 'Plant & Production Manager',
    companyCategory: 'Precision Component Manufacturing',
    imageSrc: '/images/case_studies/cs_featured_manufacturing.jpg',
    objectPosition: 'center 40%',
    caseStudyUrl: '/case-studies/warehouse-management',
    verificationNote: 'Sample Enterprise Story · Manufacturing'
  },
  {
    id: 'finance-administration',
    category: 'Finance & Administration',
    quote: 'Automated invoice approvals and instant bank reconciliations cut our month-end financial closing time from ten days to under 48 hours without increasing headcount.',
    designation: 'Chief Financial Officer',
    companyCategory: 'Commercial Services Group',
    imageSrc: '/images/crystal_hd/ind_finance.jpg',
    objectPosition: 'center 35%',
    caseStudyUrl: '/case-studies/business-process-automation',
    verificationNote: 'Sample Enterprise Story · Finance'
  },
  {
    id: 'business-process-automation',
    category: 'Business Process Automation',
    quote: 'UiPath software robots implemented by ATLAS now process our routine vendor validations and transactional entries 24/7 with zero processing errors.',
    designation: 'Head of Digital Transformation',
    companyCategory: 'Enterprise Logistics & Supply',
    imageSrc: '/images/solutions/solutions_uipath_robot.jpg',
    objectPosition: 'center 40%',
    caseStudyUrl: '/case-studies/business-process-automation',
    verificationNote: 'Sample Enterprise Story · RPA & AI'
  }
];

export const HomePage: React.FC = () => {
  // Contact Form & Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCallbackModalOpen, setIsCallbackModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("SAP Business One Implementation");
  const [activeSlide, setActiveSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setActiveSlide(prev => {
        const max = mobile ? CUSTOMER_STORIES.length - 1 : Math.ceil(CUSTOMER_STORIES.length / 2) - 1;
        return Math.min(prev, Math.max(0, max));
      });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const slides = useMemo(() => {
    if (isMobile) {
      return CUSTOMER_STORIES.map(story => [story]);
    }
    const pairs: CustomerStoryItem[][] = [];
    for (let i = 0; i < CUSTOMER_STORIES.length; i += 2) {
      pairs.push(CUSTOMER_STORIES.slice(i, i + 2));
    }
    return pairs;
  }, [isMobile]);

  const totalSlides = slides.length;

  const nextSlide = useCallback(() => {
    setActiveSlide(prev => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setActiveSlide(prev => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (diff > 45) {
      nextSlide();
    } else if (diff < -45) {
      prevSlide();
    }
    setTouchStartX(null);
  };
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openConsultationFor = (area: string) => {
    setSelectedService(area);
    setIsModalOpen(true);
  };


  return (
    <div className="relative bg-white text-[#354765] selection:bg-blue-600 selection:text-white">

      {/* ========================================================================= */}
      {/* SECTION 2: HERO SECTION                                                   */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-r from-sky-50/60 via-white to-blue-50/30 pt-10 pb-12 lg:pt-14 lg:pb-16 border-b border-slate-100">
        
        {/* Subtle ambient office plant botanical glow on far left as in reference */}
        <div className="absolute -left-12 top-1/2 -translate-y-1/2 w-48 h-80 opacity-25 pointer-events-none select-none hidden lg:block">
          <div className="w-full h-full bg-gradient-to-tr from-emerald-600/30 via-teal-500/10 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center">
            
            {/* Left Column (Approx 58% on Desktop, well-proportioned covering left side) */}
            <div className="lg:col-span-7 space-y-5 text-left">
              {/* Eyebrow Label: 13–14px */}
              <div className="inline-block">
                <span className="text-[13px] sm:text-[14px] font-bold uppercase tracking-wider text-[#1B72E8] select-none">
                  Your Partner for a Smarter Tomorrow —
                </span>
              </div>

              {/* Main Hero Heading: Desktop 48–56px, Mobile 34–40px */}
              <h1 className="font-serif text-[34px] sm:text-[42px] lg:text-[48px] xl:text-[52px] font-bold tracking-tight leading-[1.14] text-[#142B59]">
                Where SAP Business One Meets{' '}
                <span className="bg-gradient-to-r from-[#0052CC] via-[#0066CC] to-[#0A66C2] bg-clip-text text-transparent">Intelligent Automation</span>
              </h1>

              {/* Supporting Text: 18–19px Desktop */}
              <p className="text-[16px] sm:text-[18px] lg:text-[19px] text-[#45546B] leading-relaxed max-w-2xl font-normal">
                ATLAS Technosoft helps manufacturing, logistics, pharma, and trading companies streamline operations with SAP Business One, Boyum IT solutions, UiPath RPA, and AI-driven automation.
              </p>

              {/* Dual Action CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Button
                  id="hero-book-btn"
                  onClick={() => setIsModalOpen(true)}
                  variant="gold"
                  size="lg"
                  className="text-[16px] sm:text-[17px] font-semibold px-7 py-3.5 shadow-md shadow-blue-500/25 bg-gradient-to-r from-[#0052CC] to-[#0A66C2] hover:from-[#0040A8] hover:to-[#08529C] text-white"
                  icon={<ArrowRight className="w-5 h-5" />}
                >
                  Book a Consultation
                </Button>

                <Button
                  href="/about"
                  variant="secondary"
                  size="lg"
                  className="text-[16px] sm:text-[17px] font-semibold px-7 py-3.5 text-[#142B59]"
                  icon={<ArrowRight className="w-4 h-4 text-[#1B72E8]" />}
                >
                  Our Story & Team
                </Button>
              </div>
            </div>

            {/* Right Column: Hero Visual seamlessly filling right side proportion */}
            <div className="lg:col-span-5 relative">
              <div className="relative w-full rounded-2xl overflow-hidden shadow-md border border-slate-100 bg-white">
                <img
                  src="/images/crystal_hd/hero_team.jpg"
                  alt="ATLAS Technosoft Enterprise Team collaborating on SAP Business One Dashboard"
                  className="w-full h-auto object-cover max-h-[390px]"
                />


              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: COMPANY METRICS BAR (COMPACT "SMALL SIZE" SINGLE BOX CARD)     */}
      {/* ========================================================================= */}
      <section id="metrics" className="py-6 sm:py-7 bg-white border-b border-slate-100">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Sleek, Single White Box-Type Container Bar matching Reference Image */}
          <div className="rounded-xl sm:rounded-2xl bg-white border border-slate-200/90 shadow-sm py-4 px-3 sm:px-6">
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
      {/* SECTION 4: SERVICES OVERVIEW (4 COMPACT BOX-TYPE CARDS)                   */}
      {/* ========================================================================= */}
      <section id="services" className="pt-10 sm:pt-12 lg:pt-14 pb-3 sm:pb-4 lg:pb-4 bg-[#f4f9ff]/60">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionHeading
            badge="OUR SERVICES"
            title="Comprehensive Solutions for"
            titleHighlight="Your Business"
            subtitle="From ERP implementation to intelligent automation, we deliver end-to-end solutions to help your business grow."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
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
              ctaTarget="/services/sap-business-one"
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
              ctaTarget="/services/boyum-it"
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
              ctaTarget="/services/uipath-automation"
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
              ctaTarget="/services/atlas-addons"
            />
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* CONTINUOUS COMPANY LOGO SLIDER (SEPARATE ADDITIONAL SECTION)              */}
      {/* ========================================================================= */}
      <LogoMarquee />

      {/* ========================================================================= */}
      {/* SECTION 5: OUR EXPERTISE (BRIDGING ERP AND AUTOMATION)                    */}
      {/* ========================================================================= */}
      <section id="expertise" className="py-10 sm:py-12 lg:py-14 bg-white border-b border-slate-100">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content (approx 55% width) */}
            <div className="lg:col-span-6 space-y-4">
              <div>
                <span className="text-[13px] sm:text-[14px] font-bold uppercase tracking-wider text-[#1B72E8] block mb-2">
                  OUR EXPERTISE
                </span>
                <h2 className="font-serif text-[28px] sm:text-[34px] lg:text-[38px] font-bold text-[#142B59] tracking-tight leading-tight">
                  Bridging ERP and <span className="bg-gradient-to-r from-[#0052CC] via-[#0066CC] to-[#0A66C2] bg-clip-text text-transparent">Intelligent Automation</span>
                </h2>
              </div>

              {/* Body Text */}
              <p className="text-[16px] sm:text-[17px] lg:text-[18px] text-[#45546B] leading-relaxed">
                We combine deep expertise in SAP Business One, business process optimization, manufacturing and warehouse solutions, and intelligent automation to deliver real business value.
              </p>

              {/* Checklist items with blue checkmarks */}
              <div className="space-y-2.5 pt-1">
                {[
                  "End-to-end ERP implementation and support",
                  "Industry-focused solutions for manufacturing, warehousing, and trading",
                  "Business process optimization",
                  "Intelligent automation with RPA and AI"
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

              {/* Link to dedicated Services & Expertise page */}
              <div className="pt-2">
                <Button
                  href="/services"
                  variant="primary"
                  size="md"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Explore Our Services & Expertise
                </Button>
              </div>
            </div>

            {/* Right Image: Crystal-Clear Expertise Visual from Reference Image */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200/90 bg-slate-950 max-h-[320px]">
                <img
                  src="/images/crystal_hd/expertise_erp.jpg"
                  alt="Bridging ERP, Manufacturing Robotics, Analytics and Cloud Automation"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6: INDUSTRIES WE SERVE (4 COMPACT BOX-TYPE CARDS)                 */}
      {/* ========================================================================= */}
      <section id="industries" className="py-10 sm:py-12 lg:py-14 bg-[#f4f9ff]/60 border-b border-slate-100">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionHeading
            badge="INDUSTRIES WE SERVE"
            title="Industry-Focused"
            titleHighlight="Solutions"
            subtitle="We understand your industry challenges and deliver tailored solutions."
            align="center"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            <IndustryCard
              id="manufacturing"
              title="Manufacturing"
              description="Streamline production, inventory and operations."
              imageSrc="/images/crystal_hd/ind_manufacturing.jpg"
              targetRoute="/industries/manufacturing"
            />
            <IndustryCard
              id="warehouse"
              title="Warehouse & Logistics"
              description="Optimize warehousing, logistics and supply chain."
              imageSrc="/images/crystal_hd/ind_warehouse.jpg"
              targetRoute="/industries/warehouse-logistics"
            />
            <IndustryCard
              id="finance"
              title="Finance & Administration"
              description="Improve financial control and administrative efficiency."
              imageSrc="/images/crystal_hd/ind_finance.jpg"
              targetRoute="/industries/finance-administration"
            />
            <IndustryCard
              id="trading"
              title="Trading & Shipping"
              description="Enhance trading operations and shipping processes."
              imageSrc="/images/crystal_hd/ind_shipping.jpg"
              targetRoute="/industries/trading-shipping"
            />
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 7: OUR APPROACH (INLINE PROCESS FLOW FROM REFERENCE IMAGE)        */}
      {/* ========================================================================= */}
      <section id="approach" className="py-10 sm:py-12 lg:py-14 bg-white border-b border-slate-100">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionHeading
            badge="OUR APPROACH"
            title="A Structured Approach for"
            titleHighlight="Lasting Success"
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
      {/* SECTION 8: CUSTOMER SUCCESS (RESPONSIVE CAROUSEL)                      */}
      {/* ========================================================================= */}
      <section id="case-studies" className="py-12 sm:py-14 lg:py-16 bg-[#f4f9ff]/60 border-b border-slate-100">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionHeading
            badge="CUSTOMER SUCCESS"
            title="Trusted by"
            titleHighlight="Growing Businesses"
            subtitle="We help businesses across industries streamline operations and achieve their goals with proven enterprise solutions."
            align="center"
          />

          {/* Testimonials Carousel Container with outer clearance for arrows */}
          <div className="relative max-w-[1320px] mx-auto px-3 sm:px-4 md:px-14 lg:px-16">
            {/* Desktop Left navigation arrow */}
            <button
              type="button"
              onClick={prevSlide}
              className="hidden md:flex absolute left-0 lg:left-1 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white border border-slate-200 text-[#142B59] hover:text-[#1B72E8] hover:border-[#1B72E8] items-center justify-center shadow-md hover:shadow-xl z-20 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
              aria-label="Previous customer testimonials"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Testimonials Carousel Track Viewport */}
            <div
              className="overflow-hidden rounded-2xl focus:outline-none"
              tabIndex={0}
              role="region"
              aria-label="Customer Testimonial Carousel"
              onKeyDown={(e) => {
                if (e.key === 'ArrowLeft') {
                  e.preventDefault();
                  prevSlide();
                } else if (e.key === 'ArrowRight') {
                  e.preventDefault();
                  nextSlide();
                }
              }}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className="flex transition-transform duration-500 ease-out items-stretch"
                style={{ transform: `translateX(-${activeSlide * 100}%)` }}
              >
                {slides.map((slideStories, slideIdx) => (
                  <div
                    key={slideIdx}
                    className="w-full shrink-0 flex-none px-1"
                  >
                    <div className={`grid grid-cols-1 ${isMobile ? '' : 'md:grid-cols-2'} gap-6 items-stretch h-full`}>
                      {slideStories.map((story) => (
                        <TestimonialCard
                          key={story.id}
                          id={story.id}
                          category={story.category}
                          quote={story.quote}
                          author={story.designation}
                          companyCategory={story.companyCategory}
                          imageSrc={story.imageSrc}
                          objectPosition={story.objectPosition}
                          to={story.caseStudyUrl}
                          verificationNote={story.verificationNote}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop Right navigation arrow */}
            <button
              type="button"
              onClick={nextSlide}
              className="hidden md:flex absolute right-0 lg:right-1 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white border border-slate-200 text-[#142B59] hover:text-[#1B72E8] hover:border-[#1B72E8] items-center justify-center shadow-md hover:shadow-xl z-20 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
              aria-label="Next customer testimonials"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Carousel Controls Bar (Pagination Dots + Mobile Arrows) */}
          <div className="flex items-center justify-center gap-3 pt-6">
            {/* Mobile Left Arrow */}
            <button
              type="button"
              onClick={prevSlide}
              className="flex md:hidden w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-700 items-center justify-center shadow-xs active:scale-95"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Indicator Dots */}
            <div className="flex items-center gap-2">
              {Array.from({ length: totalSlides }).map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={() => setActiveSlide(dotIdx)}
                  aria-label={`Go to slide ${dotIdx + 1}`}
                  role="tab"
                  aria-selected={activeSlide === dotIdx}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    activeSlide === dotIdx
                      ? 'w-7 h-2.5 bg-gradient-to-r from-[#0052CC] to-[#0A66C2] shadow-xs'
                      : 'w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>

            {/* Mobile Right Arrow */}
            <button
              type="button"
              onClick={nextSlide}
              className="flex md:hidden w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-700 items-center justify-center shadow-xs active:scale-95"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Explore Case Studies Link */}
          <div className="text-center pt-6">
            <Link
              to="/case-studies"
              className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-[#142B59] hover:text-[#1B72E8] group transition-colors"
            >
              <span>Explore All Verified Customer Case Studies</span>
              <ArrowRight className="w-4 h-4 text-[#1B72E8] group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>
      </section>
      {/* ========================================================================= */}
      {/* SECTION 9: OUR PARTNERS (SIDE-BY-SIDE AS IN REFERENCE IMAGE im2)          */}
      {/* ========================================================================= */}
      <section id="partners" className="py-8 sm:py-10 bg-white border-b border-slate-100">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            
            {/* Left Side: Title & Subtitle */}
            <div className="lg:col-span-6 space-y-2 text-left">
              <span className="text-[13px] sm:text-[14px] font-bold uppercase tracking-wider text-[#1B72E8] block">
                OUR PARTNERS
              </span>
              <h2 className="font-serif text-[26px] sm:text-[32px] font-bold text-[#142B59] tracking-tight leading-tight">
                Working with <span className="bg-gradient-to-r from-[#0052CC] via-[#0066CC] to-[#0A66C2] bg-clip-text text-transparent">Global Technology Leaders</span>
              </h2>
              <p className="text-[15px] sm:text-[16px] text-[#45546B]">
                We collaborate with industry-leading technology partners to deliver the best solutions.
              </p>
            </div>

            {/* Right Side: Clean Partner Logos inline with dividers matching im2 */}
            <div className="lg:col-span-6 flex flex-col items-start lg:items-end justify-center gap-2">
              <Link to="/partners" className="group flex items-center gap-6 sm:gap-8 py-2 px-3 rounded-xl hover:bg-slate-50 transition-colors">
                <SAPBusinessOneLogo className="h-8 sm:h-9" />
                <div className="h-7 w-px bg-slate-300" />
                <BoyumITLogo className="h-8 sm:h-9" />
                <div className="h-7 w-px bg-slate-300" />
                <UiPathLogo className="h-8 sm:h-9" />
              </Link>
              <Link
                to="/partners"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#1B72E8] hover:underline"
              >
                <span>Explore Certified Partner Ecosystem</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>
        </div>
      </section>

            {/* ========================================================================= */}
      {/* SECTION: LATEST INSIGHTS & ARTICLES (BLOG)                               */}
      {/* ========================================================================= */}
      <BlogSection />

{/* ========================================================================= */}
      {/* SECTION 10: READY TO TRANSFORM YOUR BUSINESS (BOX-TYPE BANNER im2)         */}
      {/* ========================================================================= */}
      <section id="contact" className="py-10 sm:py-12 lg:py-14 bg-[#f4f9ff]/60">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Defined Light Cyan/Blue Box Container matching Reference UI */}
          <div className="rounded-2xl sm:rounded-3xl bg-[#eaf4ff] border border-blue-200/90 p-8 sm:p-10 lg:p-12 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Heading, Subtext & Both Action Buttons */}
              <div className="lg:col-span-6 space-y-4 text-left">
                <span className="text-[12px] sm:text-[13px] font-bold uppercase tracking-wider text-[#1B72E8] block">
                  LET'S WORK TOGETHER
                </span>
                <h2 className="font-serif text-[28px] sm:text-[34px] lg:text-[40px] font-bold text-[#142B59] tracking-tight leading-[1.18]">
                  Ready to Transform <span className="bg-gradient-to-r from-[#0052CC] via-[#0066CC] to-[#0A66C2] bg-clip-text text-transparent">Your Business?</span>
                </h2>
                
                <p className="text-[15px] sm:text-[16px] text-[#45546B] leading-relaxed max-w-lg">
                  Book a consultation with our experts and explore how we can help you streamline operations and drive growth.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <Button
                    onClick={() => setIsModalOpen(true)}
                    variant="primary"
                    size="lg"
                    className="text-[15px] sm:text-[16px] font-semibold px-7 py-3.5 bg-gradient-to-r from-[#0052CC] to-[#0A66C2] hover:from-[#0040A8] hover:to-[#08529C] text-white shadow-md shadow-blue-500/25 rounded-xl"
                    icon={<ArrowRight className="w-4 h-4" />}
                  >
                    Book a Consultation
                  </Button>
                  <button
                    type="button"
                    onClick={() => setIsCallbackModalOpen(true)}
                    className="inline-flex items-center justify-center font-semibold rounded-xl px-6 py-3.5 text-[15px] sm:text-[16px] bg-white text-[#0052CC] hover:bg-blue-50 border border-blue-300 shadow-sm transition-colors gap-2 cursor-pointer"
                  >
                    <PhoneCall className="w-4 h-4 text-[#0052CC]" />
                    <span>Request a Callback</span>
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
      {/* REUSABLE ENTERPRISE CONSULTATION MODAL                                    */}
      {/* ========================================================================= */}
      <ConsultationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultService={selectedService}
      />

      {/* Reusable Enterprise Callback Modal */}
      <CallbackModal
        isOpen={isCallbackModalOpen}
        onClose={() => setIsCallbackModalOpen(false)}
        defaultService={selectedService}
      />


    </div>
  );
};
