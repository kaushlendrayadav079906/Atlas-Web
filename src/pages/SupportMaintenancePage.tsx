import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Layers,
  ChevronRight,
  Clock,
  Database,
  RefreshCw,
  Settings,
  ShieldCheck,
  TrendingUp,
  Headphones,
  Check,
  FileCheck2,
  FileCode2,
  Award,
  Zap,
  Activity,
  Server,
  PhoneCall
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { ConsultationModal } from '../components/ui/ConsultationModal';
import { CallbackModal } from '../components/ui/CallbackModal';
import { CtaContactCards } from '../components/ui/CtaContactCards';

export const SupportMaintenancePage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCallbackModalOpen, setIsCallbackModalOpen] = useState(false);

  useEffect(() => {
    document.title = 'Support & Maintenance (AMS) | ATLAS Technosoft';
    window.scrollTo(0, 0);
  }, []);

  const slaTiers = [
    {
      tier: 'P1 — Critical System Outage',
      responseTime: '1 Hour Guaranteed',
      coverage: '24/7/365 Continuous Coverage',
      description: 'Production system down, database inaccessible, or critical core billing halted with no immediate workaround.',
      action: 'Immediate mobilization of Senior Technical Architect and incident bridge.'
    },
    {
      tier: 'P2 — High Priority Blocker',
      responseTime: '4 Hours Guaranteed',
      coverage: 'Business Hours (Extended)',
      description: 'Major business process blocked (e.g. e-way bill generation failing, dispatch gate stuck) with partial workaround available.',
      action: 'Functional specialist dedicated until temporary workaround and permanent patch are delivered.'
    },
    {
      tier: 'P3 — Medium Operational Query',
      responseTime: '1 Business Day',
      coverage: 'Standard Business Hours',
      description: 'Routine functional error, custom report adjustment, or individual user access issue not halting general operations.',
      action: 'Standard ticketing workflow, root-cause investigation, and user verification.'
    },
    {
      tier: 'P4 — Minor Enhancements & Advisory',
      responseTime: '2 Business Days',
      coverage: 'Standard Business Hours',
      description: 'User layout modifications, report format improvements, or configuration guidance for new staff.',
      action: 'Scheduled release window and documentation handover.'
    }
  ];

  const amsOfferings = [
    {
      title: '24/7 System Health & HANA Monitoring',
      description: 'Proactive monitoring of SAP HANA memory heaps, CPU spikes, background jobs, and log file sizes to prevent unexpected downtimes.',
      icon: Activity
    },
    {
      title: 'Statutory GST & E-Invoicing Patching',
      description: 'Regular compliance updates for GST rate changes, GSTR-1/2B reconciliations, and government API schema updates without business interruption.',
      icon: ShieldCheck
    },
    {
      title: 'Add-on Ecosystem Maintenance',
      description: 'Certified support for Boyum Beas Manufacturing, Produmex WMS, B1 Usability Package, and ATLAS proprietary gate/freight modules.',
      icon: Layers
    },
    {
      title: 'Database Performance & Index Tuning',
      description: 'Periodic database re-indexing, query optimization, memory reallocation, and storage hygiene for peak transactional responsiveness.',
      icon: Database
    },
    {
      title: 'End-User Support & Knowledge Sharing',
      description: 'Dedicated ticketing helpdesk for operational queries, error troubleshooting, and hands-on guidance for new corporate team members.',
      icon: Headphones
    },
    {
      title: 'Disaster Recovery & Backup Validation',
      description: 'Scheduled backup audits, point-in-time restore drills, and failover verification ensuring zero-data-loss business continuity.',
      icon: Server
    }
  ];

  const onboardingSteps = [
    {
      step: 1,
      title: 'ERP Landscape & Customization Audit',
      description: 'Comprehensive review of your SAP Business One environment, custom stored procedures, user-defined fields, and connected add-ons.',
      output: 'System Health & Technical Baseline Report'
    },
    {
      step: 2,
      title: 'SLA Matrix & Escalation Protocol Setup',
      description: 'Formalizing response thresholds, authorized ticket submitters, and direct escalation paths to certified functional leads.',
      output: 'Authorized SLA & Escalation Governance Charter'
    },
    {
      step: 3,
      title: 'Knowledge Transfer & Runbook Authoring',
      description: 'Documenting client-specific workflows, third-party API keys, scheduled jobs, and standard operational operating procedures.',
      output: 'Client-Specific Operational Runbook'
    },
    {
      step: 4,
      title: 'Hypercare Shadowing & Handover',
      description: 'Two-week parallel ticket handling alongside internal stakeholders to calibrate response velocity and domain nuances.',
      output: '100% Validated Helpdesk Cutover'
    },
    {
      step: 5,
      title: 'Continuous Monthly Service Governance',
      description: 'Monthly SLA reviews, ticket resolution metrics, proactive tuning recommendations, and future patch roadmaps.',
      output: 'Monthly Executive Service Review'
    }
  ];

  return (
    <div className="min-h-screen bg-white text-[#4A5876]">
      {/* ========================================================================= */}
      {/* 1. BREADCRUMBS                                                           */}
      {/* ========================================================================= */}
      <nav aria-label="Breadcrumb" className="bg-white border-b border-slate-200/80 py-3">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          <ol className="flex items-center space-x-2 text-xs sm:text-sm text-slate-500">
            <li>
              <Link to="/" className="hover:text-[#E0A33B] transition-colors">
                Home
              </Link>
            </li>
            <li>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            </li>
            <li>
              <Link to="/services" className="hover:text-[#E0A33B] transition-colors">
                Services
              </Link>
            </li>
            <li>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            </li>
            <li className="font-semibold text-slate-800 truncate" aria-current="page">
              Support & Maintenance (AMS)
            </li>
          </ol>
        </div>
      </nav>

      {/* ========================================================================= */}
      {/* 2. HERO SECTION                                                          */}
      {/* ========================================================================= */}
      <section className="relative pt-10 pb-16 lg:pt-14 lg:pb-20 overflow-hidden border-b border-white/10 atlas-dark">
        <div className="absolute inset-0 bg-dot-pattern opacity-40 pointer-events-none" />
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -right-32 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2">
                <span className="text-[12px] sm:text-[13px] font-bold uppercase tracking-wider text-[#E0A33B] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                  APPLICATION MANAGEMENT SERVICES (AMS)
                </span>
              </div>

              <h1 className="atlas-h1-size font-extrabold text-[#1A202C]">
                Enterprise SAP Business One <span className="text-[#E0A33B]">Support & Maintenance</span>
              </h1>

              <p className="text-lg sm:text-xl font-medium text-slate-700 leading-snug">
                Guaranteed 99.9% Uptime, Proactive HANA Tuning & Dual Mumbai Delivery Centers
              </p>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                Protect enterprise business continuity with ATLAS Technosoft’s dedicated SAP Business One and automation support operations. From 1-hour critical response times to proactive database optimization and GST statutory compliance, our certified consultants keep your ERP humming.
              </p>

              {/* Partner Badges */}
              <div className="pt-2">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2.5">
                  Accredited Service Standards:
                </p>
                <div className="flex flex-wrap gap-2 sm:gap-2.5">
                  {[
                    'SAP Certified Consultants',
                    'Boyum IT Gold Support',
                    '1-Hour P1 Critical Response',
                    'Dual Mumbai Support Centers'
                  ].map((badge, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs sm:text-sm font-semibold bg-slate-100 text-slate-700 border border-slate-200"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap gap-3 sm:gap-4 items-center">
                <Button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-atlas-gold hover:bg-[#D4972F] !text-atlas-navy font-bold shadow-[0_4px_14px_rgba(224,163,59,0.35)] font-semibold px-6 py-3.5 rounded-lg shadow-sm transition-all duration-200 inline-flex items-center gap-2"
                >
                  Request AMS Proposal
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <a
                  href="#sla-matrix"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-lg text-slate-700 font-semibold bg-white border border-slate-300 hover:bg-slate-50 hover:border-slate-400 transition-all duration-200"
                >
                  <Clock className="w-4 h-4 text-[#E0A33B]" />
                  Review SLA Tiers
                </a>
              </div>
            </div>

            {/* Right Media Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200/80 bg-atlas-navy group">
                <img
                  src="/images/dashboards/executive-command-center.jpg"
                  alt="ATLAS Technosoft Executive Command Center and 24/7 Monitoring Desk"
                  className="w-full h-[380px] sm:h-[440px] object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.includes('solutions_hero_monitor.jpg')) {
                      target.src = '/images/solutions/solutions_hero_monitor.jpg';
                    }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-xl p-4 border border-slate-200/60 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                        99.9% Uptime Commitment
                      </p>
                      <p className="text-xs font-medium text-slate-700">
                        Proactive Ticket Resolution • Zero Invoice Disruption
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. PERFORMANCE METRICS                                                   */}
      {/* ========================================================================= */}
      <section className="py-12 bg-white border-b border-slate-200/80">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 hover:border-blue-300 transition-all duration-200 hover:shadow-md">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#E0A33B] tracking-tight mb-2">
                1 Hour
              </div>
              <div className="text-base sm:text-lg font-bold text-slate-900 mb-1">
                P1 Critical Response SLA
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Guaranteed immediate engineer mobilization for mission-critical production blockers.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 hover:border-blue-300 transition-all duration-200 hover:shadow-md">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-emerald-600 tracking-tight mb-2">
                99.9%
              </div>
              <div className="text-base sm:text-lg font-bold text-slate-900 mb-1">
                Contractual System Uptime
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Continuous background health monitoring and proactive memory/log hygiene.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 hover:border-blue-300 transition-all duration-200 hover:shadow-md">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#E06D53] tracking-tight mb-2">
                80+
              </div>
              <div className="text-base sm:text-lg font-bold text-slate-900 mb-1">
                Active Managed Deployments
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Long-term enterprise partnerships across manufacturing, wholesale, logistics, and retail.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. SLA TIER MATRIX                                                       */}
      {/* ========================================================================= */}
      <section id="sla-matrix" className="py-16 lg:py-24 border-b border-white/10 atlas-dark">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#E0A33B]">
              Contractual Transparency
            </span>
            <h2 className="atlas-h2-size font-extrabold text-slate-900 mt-2 mb-4">
              Tiered SLA Response & Resolution Matrix
            </h2>
            <p className="text-base text-slate-600">
              Clear accountability and guaranteed response windows tailored to the operational severity of each incident.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {slaTiers.map((tier, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#E0A33B] bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
                      {tier.coverage}
                    </span>
                    <span className="text-xs sm:text-sm font-extrabold text-slate-900 bg-slate-100 px-3 py-1 rounded-full">
                      {tier.responseTime}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
                    {tier.tier}
                  </h3>

                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-4">
                    {tier.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 text-xs sm:text-sm text-slate-700">
                  <span className="font-bold text-[#E0A33B]">Resolution Action: </span>
                  {tier.action}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. CORE AMS OFFERINGS                                                    */}
      {/* ========================================================================= */}
      <section className="py-16 lg:py-24 bg-white border-b border-slate-200/80">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-emerald-600">
              Complete Protection
            </span>
            <h2 className="atlas-h2-size font-extrabold text-slate-900 mt-2 mb-4">
              Comprehensive Support Scope
            </h2>
            <p className="text-base text-slate-600">
              Beyond reactive firefighting, our team provides continuous system stewardship, performance tuning, and regulatory updates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {amsOfferings.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 hover:border-blue-400 hover:shadow-md transition-all duration-200 group"
                >
                  <div className="p-3 rounded-xl bg-blue-100 text-[#E0A33B] group-hover:bg-[#1F4FE0] group-hover:text-white transition-colors duration-200 w-fit mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. STEP-BY-STEP ONBOARDING PROCESS                                       */}
      {/* ========================================================================= */}
      <section className="py-16 lg:py-24 border-b border-white/10 atlas-dark">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#E0A33B]">
              Seamless Transition
            </span>
            <h2 className="atlas-h2-size font-extrabold text-slate-900 mt-2 mb-4">
              5-Stage AMS Onboarding Framework
            </h2>
            <p className="text-base text-slate-600">
              A risk-free onboarding methodology ensuring zero disruption to live operations during support handover.
            </p>
          </div>

          <div className="space-y-4 sm:space-y-6 max-w-4xl mx-auto">
            {onboardingSteps.map((step) => (
              <div
                key={step.step}
                className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 hover:border-blue-400 transition-all duration-200 shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#E0A33B] border border-blue-200 flex items-center justify-center font-extrabold text-lg flex-shrink-0">
                    0{step.step}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">
                      {step.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                <div className="sm:text-right flex-shrink-0 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-[#E0A33B] border border-blue-200">
                    <FileCheck2 className="w-3.5 h-3.5" />
                    {step.output}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. VERIFIED ENTERPRISE AMS SUCCESS STORY                                  */}
      {/* ========================================================================= */}
      <section className="py-16 lg:py-20 atlas-cream text-white">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white atlas-light-surface rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
            <div className="max-w-3xl relative z-10">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-atlas-royalTint text-atlas-royal border border-blue-400/30 mb-4">
                LONG-TERM AMS PARTNERSHIP TRACK RECORD
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-atlas-navy mb-4">
                36 Consecutive Months of 99.95% System Uptime
              </h3>
              <blockquote className="text-lg sm:text-xl text-atlas-body italic mb-6 leading-relaxed">
                "Having ATLAS Technosoft manage our SAP Business One HANA cluster eliminated the recurring memory slowdowns and dispatch stoppages we experienced before. Their Mumbai team is exceptionally fast, technically grounded, and treats our business like their own."
              </blockquote>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white text-sm">
                  ATPL
                </div>
                <div>
                  <div className="font-bold text-atlas-navy text-sm">
                    Leading Industrial Manufacturing & Distribution Client
                  </div>
                  <div className="text-xs text-slate-500">
                    Application Management Services • Managed by ATLAS Technosoft
                  </div>
                </div>
              </div>
              <Link
                to="/case-studies/industrial-manufacturing"
                className="inline-flex items-center gap-2 bg-atlas-gold hover:bg-[#D4972F] !text-atlas-navy font-bold shadow-[0_4px_14px_rgba(224,163,59,0.35)] font-semibold px-6 py-3 rounded-lg shadow-sm transition-all duration-200"
              >
                Read Manufacturing Case Study
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. RELATED SERVICES                                                      */}
      {/* ========================================================================= */}
      <section className="py-16 lg:py-20 border-b border-white/10 atlas-dark">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#E0A33B]">
              Comprehensive Services
            </span>
            <h2 className="atlas-h2-size font-extrabold text-slate-900 mt-2 mb-3">
              Explore Our Full ERP Lifecycle
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Combine support with full-lifecycle implementation and add-on modernization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between">
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded text-xs font-semibold bg-slate-100 text-slate-700 mb-3">
                  Core ERP
                </span>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  SAP Business One Implementation
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  Turnkey multi-company deployment, data migration, and workflow customization on SAP HANA.
                </p>
              </div>
              <Link
                to="/services/sap-business-one"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#E0A33B] hover:text-blue-700 transition-colors"
              >
                Learn More
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between">
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded text-xs font-semibold bg-slate-100 text-slate-700 mb-3">
                  Shop-Floor Add-ons
                </span>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Boyum IT Solutions
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  Certified Beas Manufacturing, Produmex WMS, and B1 Usability Package support and upgrades.
                </p>
              </div>
              <Link
                to="/solutions/boyum-it"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#E0A33B] hover:text-blue-700 transition-colors"
              >
                Learn More
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between">
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded text-xs font-semibold bg-slate-100 text-slate-700 mb-3">
                  RPA Automation
                </span>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  UiPath Automation Support
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  Bot exception handling, OCR Document Understanding tuning, and bank reconciliation automation.
                </p>
              </div>
              <Link
                to="/services/uipath-automation"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#E0A33B] hover:text-blue-700 transition-colors"
              >
                Learn More
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. CALL TO ACTION & CONSULTATION FORM MODAL                             */}
      {/* ========================================================================= */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1380px] xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="atlas-cream rounded-3xl p-8 sm:p-14 text-white text-center relative overflow-hidden mb-12">
            <div className="max-w-2xl mx-auto space-y-5 relative z-10">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-blue-300">
                Guaranteed Response Times
              </span>
              <h2 className="atlas-h2-size font-extrabold text-white">
                Ensure Uninterrupted ERP Performance Today
              </h2>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                Connect with our Mumbai support leadership to review SLA tiers, baseline system audits, and customized AMS pricing for your SAP environment.
              </p>
              <div className="pt-3 flex flex-wrap items-center justify-center gap-4">
                <Button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-atlas-gold hover:bg-[#D4972F] !text-atlas-navy font-bold shadow-[0_4px_14px_rgba(224,163,59,0.35)] font-bold text-base px-8 py-4 rounded-xl shadow-lg transition-all duration-200 inline-flex items-center gap-2"
                >
                  Schedule AMS Consultation
                  <ArrowRight className="w-5 h-5" />
                </Button>
                <button
                  type="button"
                  onClick={() => setIsCallbackModalOpen(true)}
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-base px-7 py-4 rounded-xl transition-all duration-200 inline-flex items-center gap-2 cursor-pointer"
                >
                  <PhoneCall className="w-5 h-5 text-blue-300" />
                  Request a Callback
                </button>
              </div>
            </div>
          </div>

          {/* Contact Details Cards */}
          <CtaContactCards />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. REUSABLE BACKEND-CONNECTED CONSULTATION MODAL                        */}
      {/* ========================================================================= */}
      <ConsultationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultService="Support & Maintenance (AMS)"
      />

      {/* Reusable Enterprise Callback Modal */}
      <CallbackModal
        isOpen={isCallbackModalOpen}
        onClose={() => setIsCallbackModalOpen(false)}
        defaultService="Support & Maintenance (AMS)"
      />
    </div>
  );
};

export default SupportMaintenancePage;

