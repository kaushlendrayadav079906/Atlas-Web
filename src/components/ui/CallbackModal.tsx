import React, { useState, useEffect } from 'react';
import {
  PhoneCall,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Clock,
  Sparkles,
  ArrowRight,
  MessageCircle,
  Building2,
  Mail,
  Phone,
  ShieldCheck,
  Check
} from 'lucide-react';
import { Modal } from './Modal';
import { apiService, ApiResponse, CallbackPayload } from '../../services/api';
import { BRAND_INFO } from '../../data/websiteContent';

export interface CallbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
  title?: string;
  subtitle?: string;
}

export interface CallbackFormFields {
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
  consent: boolean;
}

const SERVICE_OPTIONS = [
  'SAP Business One Implementation',
  'SAP HANA In-Memory Migration',
  'Boyum IT Solutions (Beas Manufacturing / Produmex WMS)',
  'UiPath RPA & Intelligent AI Automation',
  'ATLAS Proprietary Add-ons (EXIM, Freight, Gate Entry)',
  'Application Management Services (AMS) & 24/7 SLA Support',
  'ERP Architecture Audit & Advisory'
];

const TIME_SLOT_OPTIONS = [
  'Morning (10:00 AM - 1:00 PM IST)',
  'Afternoon (2:00 PM - 5:00 PM IST)',
  'Evening (5:00 PM - 7:00 PM IST)'
];

// Helper to get minimum date string (today: YYYY-MM-DD)
const getTodayDateString = (): string => {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const CallbackModal: React.FC<CallbackModalProps> = ({
  isOpen,
  onClose,
  defaultService = 'SAP Business One Implementation',
  title = 'Request a Callback',
  subtitle = 'Schedule a direct phone consultation with certified ATLAS Technosoft solution architects.'
}) => {
  const todayStr = getTodayDateString();

  const [formData, setFormData] = useState<CallbackFormFields>({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    service: defaultService,
    preferredDate: todayStr,
    preferredTime: TIME_SLOT_OPTIONS[0],
    message: '',
    consent: false
  });

  const [formErrors, setFormErrors] = useState<Partial<Record<keyof CallbackFormFields, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submittedDetails, setSubmittedDetails] = useState<ApiResponse | null>(null);

  // Sync default service when opened
  useEffect(() => {
    if (isOpen) {
      setFormData(prev => ({
        ...prev,
        service: defaultService || prev.service || SERVICE_OPTIONS[0],
        preferredDate: prev.preferredDate || todayStr,
        preferredTime: prev.preferredTime || TIME_SLOT_OPTIONS[0]
      }));
      setSubmitError(null);
      setFormErrors({});
      setSubmittedDetails(null);
    }
  }, [isOpen, defaultService, todayStr]);

  const validateField = (name: keyof CallbackFormFields, value: any): string | undefined => {
    switch (name) {
      case 'fullName':
        if (!String(value).trim()) return 'Full name is required';
        if (String(value).trim().length < 2) return 'Please enter at least 2 characters';
        return undefined;
      case 'email':
        if (!String(value).trim()) return 'Business email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim())) return 'Please provide a valid work email address';
        return undefined;
      case 'phone':
        if (!String(value).trim()) return 'Phone number for callback is required';
        if (!/^[+0-9\s-]{8,20}$/.test(String(value).trim())) return 'Please enter a valid phone number (at least 8 digits)';
        return undefined;
      case 'companyName':
        if (!String(value).trim()) return 'Company name is required';
        if (String(value).trim().length < 2) return 'Please enter at least 2 characters';
        return undefined;
      case 'service':
        if (!String(value).trim()) return 'Please select a service of interest';
        return undefined;
      case 'preferredDate':
        if (!String(value).trim()) return 'Preferred callback date is required';
        if (String(value).trim() < todayStr) return 'Preferred date cannot be in the past';
        return undefined;
      case 'preferredTime':
        if (!String(value).trim()) return 'Please select a preferred time slot';
        return undefined;
      case 'consent':
        if (!value) return 'You must agree to the Privacy Policy to request a callback';
        return undefined;
      default:
        return undefined;
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    const val = type === 'checkbox' ? checked : value;

    setFormData(prev => ({ ...prev, [name]: val }));
    if (formErrors[name as keyof CallbackFormFields]) {
      setFormErrors(prev => ({ ...prev, [name]: undefined }));
    }
    if (submitError) {
      setSubmitError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    // Validate all required fields
    const errors: Partial<Record<keyof CallbackFormFields, string>> = {};
    const requiredKeys: (keyof CallbackFormFields)[] = [
      'fullName',
      'email',
      'phone',
      'companyName',
      'service',
      'preferredDate',
      'preferredTime',
      'consent'
    ];

    requiredKeys.forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) errors[key] = error;
    });

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    try {
      const payload: CallbackPayload = {
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        companyName: formData.companyName.trim(),
        service: formData.service.trim(),
        preferredDate: formData.preferredDate.trim(),
        preferredTime: formData.preferredTime.trim(),
        message: formData.message.trim(),
        consent: formData.consent
      };

      const res = await apiService.submitCallback(payload);
      setSubmittedDetails(res);
    } catch (err: any) {
      const errMsg = err?.message || 'Unable to schedule callback in SAP Business One. Please check your connection or contact our Mumbai office directly.';
      setSubmitError(errMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setSubmittedDetails(null);
    setSubmitError(null);
    setFormErrors({});
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleResetAndClose}
      title={submittedDetails ? 'Callback Scheduled' : title}
    >
      {!submittedDetails ? (
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <p className="text-[13.5px] sm:text-[14px] text-slate-600 leading-relaxed -mt-2 mb-3">
            {subtitle}
          </p>

          {/* Submission Error Alert */}
          {submitError && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div className="flex-1 font-medium leading-relaxed">
                {submitError}
              </div>
            </div>
          )}

          {/* Full Name */}
          <div>
            <label htmlFor="cb-fullName" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Full Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              id="cb-fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="e.g. Rajesh Deshmukh"
              disabled={isSubmitting}
              className={`w-full px-3.5 py-2.5 rounded-lg border text-sm transition-colors focus:outline-none focus:ring-2 ${
                formErrors.fullName
                  ? 'border-rose-400 bg-rose-50/20 focus:ring-rose-200'
                  : 'border-slate-300 focus:ring-blue-500/20 focus:border-[#1F4FE0]'
              }`}
            />
            {formErrors.fullName && <p className="mt-1 text-xs text-rose-600 font-medium">{formErrors.fullName}</p>}
          </div>

          {/* Company Name & Business Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label htmlFor="cb-companyName" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Company Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                id="cb-companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                placeholder="e.g. Acme Industries Ltd"
                disabled={isSubmitting}
                className={`w-full px-3.5 py-2.5 rounded-lg border text-sm transition-colors focus:outline-none focus:ring-2 ${
                  formErrors.companyName
                    ? 'border-rose-400 bg-rose-50/20 focus:ring-rose-200'
                    : 'border-slate-300 focus:ring-blue-500/20 focus:border-[#1F4FE0]'
                }`}
              />
              {formErrors.companyName && <p className="mt-1 text-xs text-rose-600 font-medium">{formErrors.companyName}</p>}
            </div>

            <div>
              <label htmlFor="cb-email" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Business Email <span className="text-rose-500">*</span>
              </label>
              <input
                type="email"
                id="cb-email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="e.g. rajesh@acme.com"
                disabled={isSubmitting}
                className={`w-full px-3.5 py-2.5 rounded-lg border text-sm transition-colors focus:outline-none focus:ring-2 ${
                  formErrors.email
                    ? 'border-rose-400 bg-rose-50/20 focus:ring-rose-200'
                    : 'border-slate-300 focus:ring-blue-500/20 focus:border-[#1F4FE0]'
                }`}
              />
              {formErrors.email && <p className="mt-1 text-xs text-rose-600 font-medium">{formErrors.email}</p>}
            </div>
          </div>

          {/* Phone Number & Service Interested In */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label htmlFor="cb-phone" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Phone Number (for Callback) <span className="text-rose-500">*</span>
              </label>
              <input
                type="tel"
                id="cb-phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="e.g. +91 98201 54321"
                disabled={isSubmitting}
                className={`w-full px-3.5 py-2.5 rounded-lg border text-sm transition-colors focus:outline-none focus:ring-2 ${
                  formErrors.phone
                    ? 'border-rose-400 bg-rose-50/20 focus:ring-rose-200'
                    : 'border-slate-300 focus:ring-blue-500/20 focus:border-[#1F4FE0]'
                }`}
              />
              {formErrors.phone && <p className="mt-1 text-xs text-rose-600 font-medium">{formErrors.phone}</p>}
            </div>

            <div>
              <label htmlFor="cb-service" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Interested Service <span className="text-rose-500">*</span>
              </label>
              <select
                id="cb-service"
                name="service"
                value={formData.service}
                onChange={handleInputChange}
                disabled={isSubmitting}
                className="w-full px-3 py-2.5 rounded-lg border border-slate-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#1F4FE0]"
              >
                {SERVICE_OPTIONS.map((opt, i) => (
                  <option key={i} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              {formErrors.service && <p className="mt-1 text-xs text-rose-600 font-medium">{formErrors.service}</p>}
            </div>
          </div>

          {/* Preferred Date & Time Window */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label htmlFor="cb-preferredDate" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Preferred Date <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  id="cb-preferredDate"
                  name="preferredDate"
                  min={todayStr}
                  value={formData.preferredDate}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  className={`w-full px-3.5 py-2.5 rounded-lg border text-sm transition-colors focus:outline-none focus:ring-2 ${
                    formErrors.preferredDate
                      ? 'border-rose-400 bg-rose-50/20 focus:ring-rose-200'
                      : 'border-slate-300 focus:ring-blue-500/20 focus:border-[#1F4FE0]'
                  }`}
                />
              </div>
              {formErrors.preferredDate && <p className="mt-1 text-xs text-rose-600 font-medium">{formErrors.preferredDate}</p>}
            </div>

            <div>
              <label htmlFor="cb-preferredTime" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Preferred Time Slot <span className="text-rose-500">*</span>
              </label>
              <select
                id="cb-preferredTime"
                name="preferredTime"
                value={formData.preferredTime}
                onChange={handleInputChange}
                disabled={isSubmitting}
                className={`w-full px-3 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
                  formErrors.preferredTime
                    ? 'border-rose-400 bg-rose-50/20 focus:ring-rose-200'
                    : 'border-slate-300 bg-white focus:ring-blue-500/20 focus:border-[#1F4FE0]'
                }`}
              >
                {TIME_SLOT_OPTIONS.map((slot, idx) => (
                  <option key={idx} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
              {formErrors.preferredTime && <p className="mt-1 text-xs text-rose-600 font-medium">{formErrors.preferredTime}</p>}
            </div>
          </div>

          {/* Additional Message / Requirements */}
          <div>
            <label htmlFor="cb-message" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Additional Message <span className="text-slate-500 text-[11px] font-normal lowercase">(optional)</span>
            </label>
            <textarea
              id="cb-message"
              name="message"
              rows={2}
              value={formData.message}
              onChange={handleInputChange}
              disabled={isSubmitting}
              placeholder="Any specific questions or process context you'd like our team to review before calling..."
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#1F4FE0]"
            />
          </div>

          {/* Privacy Policy Consent Checkbox */}
          <div className="pt-1">
            <label className="flex items-start gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                name="consent"
                checked={formData.consent}
                onChange={handleInputChange}
                disabled={isSubmitting}
                className="mt-0.5 w-4 h-4 rounded border-slate-300 text-[#1F4FE0] focus:ring-blue-500/30 cursor-pointer"
              />
              <span className="text-xs text-slate-600 leading-snug">
                I agree to ATLAS Technosoft's{' '}
                <span className="text-[#1F4FE0] font-semibold underline underline-offset-2">
                  Privacy Policy
                </span>{' '}
                and consent to receiving a phone call and email confirmation regarding this enquiry. <span className="text-rose-500">*</span>
              </span>
            </label>
            {formErrors.consent && (
              <p className="mt-1 text-xs text-rose-600 font-medium pl-6">{formErrors.consent}</p>
            )}
          </div>

          {/* Guarantee Note */}
          <div className="flex items-center gap-2 text-[11.5px] text-slate-500 pt-1">
            <ShieldCheck className="w-4 h-4 text-[#10b981] shrink-0" />
            <span>Direct contact with senior SAP consultants. No marketing spam. Guaranteed callback in selected slot.</span>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#1F4FE0] to-[#1F4FE0] hover:from-[#1739B8] hover:to-[#1739B8] shadow-md shadow-blue-500/25 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Registering in SAP Business One...</span>
                </>
              ) : (
                <>
                  <PhoneCall className="w-4 h-4" />
                  <span>Submit Callback Request</span>
                </>
              )}
            </button>
          </div>
        </form>
      ) : (
        /* Success State */
        <div className="space-y-5 text-left">
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex items-start gap-3">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm sm:text-base font-bold text-emerald-950 mb-0.5">
                Callback Request Successfully Registered!
              </h4>
              <p className="text-xs text-emerald-800 leading-relaxed">
                Your callback enquiry has been recorded in ATLAS Technosoft’s SAP Business One system. A phone interaction task has been assigned to our solutions team.
              </p>
            </div>
          </div>

          {/* Booking Summary Box */}
          <div className="p-4 sm:p-5 rounded-xl bg-white border border-slate-200 space-y-2 text-xs text-slate-700">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <span className="font-bold text-[#0A1B4F] uppercase tracking-wider text-[11px]">Enquiry Reference</span>
              <span className="font-mono font-bold text-[#1F4FE0] bg-blue-50 px-2 py-0.5 rounded border border-blue-200/60">
                {submittedDetails.referenceId || 'ATPL-CB-CONFIRMED'}
              </span>
            </div>

            {submittedDetails.sapCardCode && (
              <div className="flex items-center justify-between text-slate-600 text-[11.5px]">
                <span>SAP Lead Card Code:</span>
                <span className="font-mono font-semibold text-slate-800">{submittedDetails.sapCardCode}</span>
              </div>
            )}

            {submittedDetails.sapActivityId && (
              <div className="flex items-center justify-between text-slate-600 text-[11.5px]">
                <span>SAP Phone Activity ID:</span>
                <span className="font-mono font-semibold text-slate-800">#{submittedDetails.sapActivityId}</span>
              </div>
            )}

            <div className="grid grid-cols-2 gap-2 pt-1 text-[12px]">
              <div><strong>Contact:</strong> {formData.fullName}</div>
              <div><strong>Company:</strong> {formData.companyName}</div>
              <div className="truncate"><strong>Email:</strong> {formData.email}</div>
              <div><strong>Phone:</strong> {formData.phone}</div>
            </div>

            <div className="pt-1.5 border-t border-slate-200/70 text-[12px]">
              <strong>Service:</strong> {formData.service}
            </div>

            <div className="p-2.5 rounded-lg bg-blue-50/80 border border-blue-200 text-blue-950 text-[12px] flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#1F4FE0] shrink-0" />
              <span>
                <strong>Scheduled Window:</strong> {formData.preferredDate} &bull; {formData.preferredTime}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <a
              href={`https://wa.me/919372329599?text=${encodeURIComponent(
                `Hello ATLAS Technosoft, I requested a callback (${submittedDetails.referenceId || ''}) for ${formData.companyName} on ${formData.preferredDate} (${formData.preferredTime}).`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Connect on WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={handleResetAndClose}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-atlas-navy hover:bg-atlas-royal text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              <span>Done</span>
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};

