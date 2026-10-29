import React from 'react';
import { Mail, Phone, MapPin, ExternalLink, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { BRAND_INFO, PARTNER_STATEMENTS } from '../../data/websiteContent';

export const SiteFooter: React.FC = () => {
  return (
    <footer className="bg-navy-950 text-slate-300 border-t border-navy-800">
      {/* Upper Footer: Partner Trust Ribbon */}
      <div className="border-b border-navy-900 bg-navy-900/40 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-accent-cyan shrink-0" />
            <div>
              <span className="text-sm font-bold text-white block">
                Official Strategic Partner Ecosystem
              </span>
              <span className="text-xs text-slate-400">
                Delivering enterprise stability, certified integrations, and verified implementation frameworks.
              </span>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {PARTNER_STATEMENTS.map((partner, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-lg bg-navy-950 border border-navy-800 text-xs font-semibold text-slate-200"
              >
                {partner.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white overflow-hidden p-1 flex items-center justify-center">
                <img src="/images/logo.jpeg" alt="ATLAS Logo" className="w-full h-full object-contain" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                ATLAS <span className="text-brand-400">Technosoft</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Empowering SMEs with Intelligent SAP Business One Ecosystems powered by Boyum IT, UiPath RPA, and Emerging AI. Run SAP Smarter. Faster. With Zero Manual Touch.
            </p>
            <div className="pt-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                Clutch & Industry Rating
              </div>
              <div className="flex items-center gap-2 text-xs text-amber-400 font-bold">
                <span>★★★★★ 5.0 Rating</span>
                <span className="text-slate-600">|</span>
                <span className="text-slate-300">99.9% Production Uptime</span>
              </div>
            </div>
          </div>

          {/* Solutions Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Solutions
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a href="#solutions" className="text-slate-400 hover:text-white transition-colors">
                  SAP Business One Core
                </a>
              </li>
              <li>
                <a href="#solutions" className="text-slate-400 hover:text-white transition-colors">
                  Beas Manufacturing (APS)
                </a>
              </li>
              <li>
                <a href="#solutions" className="text-slate-400 hover:text-white transition-colors">
                  Produmex WMS & Barcode
                </a>
              </li>
              <li>
                <a href="#solutions" className="text-slate-400 hover:text-white transition-colors">
                  UiPath Document AI
                </a>
              </li>
              <li>
                <a href="#solutions" className="text-slate-400 hover:text-white transition-colors">
                  Freight & Shipping Module
                </a>
              </li>
              <li>
                <a href="#solutions" className="text-slate-400 hover:text-white transition-colors">
                  AI Gate & Weighbridge
                </a>
              </li>
            </ul>
          </div>

          {/* Industries Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Industries
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a href="#industries" className="text-slate-400 hover:text-white transition-colors">
                  Manufacturing & Process
                </a>
              </li>
              <li>
                <a href="#industries" className="text-slate-400 hover:text-white transition-colors">
                  Warehousing & 3PL
                </a>
              </li>
              <li>
                <a href="#industries" className="text-slate-400 hover:text-white transition-colors">
                  Finance & Administration
                </a>
              </li>
              <li>
                <a href="#industries" className="text-slate-400 hover:text-white transition-colors">
                  Trading & Forwarding
                </a>
              </li>
              <li>
                <a href="#approach" className="text-slate-400 hover:text-white transition-colors">
                  Implementation Approach
                </a>
              </li>
              <li>
                <a href="#outcomes" className="text-slate-400 hover:text-white transition-colors">
                  Customer Case Studies
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Direct Contact
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
                <span>
                  Mumbai, India<br />
                  <span className="text-[11px] text-slate-500">Borivali West & Marine Lines</span>
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-400 shrink-0" />
                <a
                  href={`mailto:${BRAND_INFO.contact.email}`}
                  className="hover:text-white transition-colors"
                >
                  {BRAND_INFO.contact.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-accent-cyan shrink-0" />
                <a
                  href={BRAND_INFO.contact.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-cyan hover:underline"
                >
                  {BRAND_INFO.contact.phoneDisplay}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Claim Verification & Compliance Disclosure Notice */}
        <div className="mt-12 pt-6 border-t border-navy-900 text-[11px] text-slate-500 leading-relaxed">
          <p>
            <strong className="text-slate-400">Verification & Legal Notice:</strong> All client metrics (including the 80+ live clients, 98.7% retention rate, 1.2M+ annual transactions, and quoted percentage outcomes) are provided directly from ATLAS Technosoft source documentation (ATPL WEB Site_Content.pdf) and are subject to final audit verification and explicit client permissions prior to formal commercial production publication.
          </p>
        </div>

        {/* Bottom Bar: Copyright */}
        <div className="mt-8 pt-6 border-t border-navy-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} ATLAS Technosoft Pvt. Ltd. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="#about" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
            <a href="#about" className="hover:text-slate-400 transition-colors">Terms of Service</a>
            <a href="#contact" className="hover:text-slate-400 transition-colors">Security & Compliance</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
