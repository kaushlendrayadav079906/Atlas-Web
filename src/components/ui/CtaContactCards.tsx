import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import { BRAND_INFO } from '../../data/websiteContent';

export const CtaContactCards: React.FC = () => {
  return (
    <div className="space-y-3.5">
      {/* Direct Email */}
      <div className="p-4 sm:p-4.5 rounded-xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex items-center gap-4 text-left">
        <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0">
          <Mail className="w-5 h-5" />
        </div>
        <div className="min-w-0">
          <div className="text-[11px] sm:text-[12px] font-bold text-[#4A5876] uppercase tracking-wider">
            Direct Email
          </div>
          <a
            href={`mailto:${BRAND_INFO.contact.email}`}
            className="text-[14px] sm:text-[15.5px] font-bold text-[#0A1B4F] hover:text-[#E0A33B] transition-colors truncate block"
          >
            {BRAND_INFO.contact.email}
          </a>
        </div>
      </div>

      {/* Direct Phone & WhatsApp */}
      <div className="p-4 sm:p-4.5 rounded-xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex items-center gap-4 text-left">
        <div className="w-11 h-11 rounded-xl bg-blue-50 text-[#E0A33B] border border-blue-100 flex items-center justify-center shrink-0">
          <Phone className="w-5 h-5" />
        </div>
        <div className="min-w-0">
          <div className="text-[11px] sm:text-[12px] font-bold text-[#4A5876] uppercase tracking-wider">
            Direct Phone & WhatsApp
          </div>
          <a
            href={BRAND_INFO.contact.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[14px] sm:text-[15.5px] font-bold text-[#0A1B4F] hover:text-[#E0A33B] transition-colors truncate block"
          >
            +91-9372329599 (WhatsApp Enabled)
          </a>
        </div>
      </div>

      {/* Mumbai Offices */}
      <div className="p-4 sm:p-4.5 rounded-xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex items-center gap-4 text-left">
        <div className="w-11 h-11 rounded-xl bg-blue-50 text-[#E0A33B] border border-blue-100 flex items-center justify-center shrink-0">
          <MapPin className="w-5 h-5" />
        </div>
        <div className="min-w-0">
          <div className="text-[11px] sm:text-[12px] font-bold text-[#4A5876] uppercase tracking-wider">
            Mumbai Offices
          </div>
          <Link
            to="/contact#locations"
            className="text-[14px] sm:text-[15.5px] font-bold text-[#0A1B4F] hover:text-[#E0A33B] transition-colors block"
          >
            Borivali West & Marine Lines, Mumbai, India
          </Link>
        </div>
      </div>
    </div>
  );
};

