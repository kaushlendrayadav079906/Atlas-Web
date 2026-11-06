import React, { useState, useEffect } from 'react';
import {
  Send,
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
  ShieldCheck
} from 'lucide-react';
import { Modal } from './Modal';
import { Button } from './Button';
import { apiService, ApiResponse } from '../../services/api';
import { BRAND_INFO } from '../../data/websiteContent';

export interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
  title?: string;
  subtitle?: string;
}

export interface ConsultationFormFields {
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  service: string;
  message: string;
  preferredDate?: string;
  preferredTime?: string;
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

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  defaultService = 'SAP Business One Implementation',
  title = 'Book a Strategic Consultation',
  subtitle = 'Connect directly with certified SAP Business One, Boyum IT, and UiPath RPA solution architects.'
}) => {
  const [formData, setFormData] = useState<ConsultationFormFields>({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    service: defaultService,
    message: '',
    preferredDate: '',
    preferredTime: ''
  });

  const [formErrors, setFormErrors] = useState<Partial<Record<keyof ConsultationFormFields, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submittedDetails, setSubmittedDetails] = useState<ApiResponse | null>(null);

  // Sync default service when opened or prop changes
  useEffect(() => {
    if (isOpen) {
      setFormData(prev => ({
        ...prev,
        service: defaultService || prev.service || SERVICE_OPTIONS[0]
      }));
      setSubmitError(null);
      setFormErrors({});
      setSubmittedDetails(null);
    }
  }, [isOpen, defaultService]);

  const validateField = (name: keyof ConsultationFormFields, value: string): string | undefined => {
    switch (name) {
      case 'fullName':
        if (!value.trim()) return 'Full name is required';
        if (value.trim().length < 2) return 'Please enter at least 2 characters';
        return undefined;
      case 'email':
        if (!value.trim()) return 'Business email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return 'Please provide a valid work email address';
        return undefined;
      case 'phone':
        if (!value.trim()) return 'Phone or WhatsApp number is required';
        if (!/^[+0-9\s-]{8,20}$/.test(value.trim())) return 'Please enter a valid phone number (at least 8 digits)';
        return undefined;
      case 'companyName':
        if (!value.trim()) return 'Company name is required';
        if (value.trim().length < 2) return 'Please enter at least 2 characters';
        return undefined;
      case 'service':
        if (!value.trim()) return 'Please select a service of interest';
        return undefined;
      case 'message':
        if (!value.trim()) return 'Please briefly outline your process or requirements';
        if (value.trim().length < 10) return 'Please provide at least 10 characters describing your requirement';
        return undefined;
      default:
        return undefined;
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name as keyof ConsultationFormFields]) {
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
    const errors: Partial<Record<keyof ConsultationFormFields, string>> = {};
    const requiredKeys: (keyof ConsultationFormFields)[] = [
      'fullName',
      'email',
      'phone',
      'companyName',
      'service',
      'message'
    ];

    requiredKeys.forEach(key => {
      const error = validateField(key, formData[key] || '');
      if (error) errors[key] = error;
    });

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        companyName: formData.companyName.trim(),
        service: formData.service.trim(),
        message: formData.message.trim(),
        ...(formData.preferredDate ? { preferredDate: formData.preferredDate } : {}),
        ...(formData.preferredTime ? { preferredTime: formData.preferredTime } : {})
      };

      const res = await apiService.submitConsultation(payload);
      setSubmittedDetails(res);
    } catch (err: any) {
      const errMsg = err?.message || 'Unable to schedule consultation. Please check your connection or contact our Mumbai office directly.';
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
      title={submittedDetails ? 'Consultation Confirmed' : title}
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
            <label htmlFor="modal-fullName" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Full Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              id="modal-fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="e.g. Vikram Malhotra"
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
              <label htmlFor="modal-companyName" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Company Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                id="modal-companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                placeholder="e.g. Apex Pharma Ltd"
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
              <label htmlFor="modal-email" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Work Email <span className="text-rose-500">*</span>
              </label>
              <input
                type="email"
                id="modal-email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="e.g. vikram@apexpharma.com"
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

          {/* Phone / WhatsApp & Service Interested In */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label htmlFor="modal-phone" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Phone / WhatsApp <span className="text-rose-500">*</span>
              </label>
              <input
                type="tel"
                id="modal-phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="e.g. +91 98200 12345"
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
              <label htmlFor="modal-service" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Service of Interest <span className="text-rose-500">*</span>
              </label>
              <select
                id="modal-service"
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
            </div>
          </div>

          {/* Message / Requirements */}
          <div>
            <label htmlFor="modal-message" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Project Requirements / Process Bottlenecks <span className="text-rose-500">*</span>
            </label>
            <textarea
              id="modal-message"
              name="message"
              rows={3}
              value={formData.message}
              onChange={handleInputChange}
              disabled={isSubmitting}
              placeholder="Outline your current business system, user count, or timeline..."
              className={`w-full px-3.5 py-2.5 rounded-lg border text-sm transition-colors focus:outline-none focus:ring-2 ${
                formErrors.message
                  ? 'border-rose-400 bg-rose-50/20 focus:ring-rose-200'
                  : 'border-slate-300 focus:ring-blue-500/20 focus:border-[#1F4FE0]'
              }`}
            />
            {formErrors.message && <p className="mt-1 text-xs text-rose-600 font-medium">{formErrors.message}</p>}
          </div>

          {/* Optional: Preferred Date and Time slot */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
            <div>
              <label htmlFor="modal-date" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                Preferred Date (Optional)
              </label>
              <input
                type="date"
                id="modal-date"
                name="preferredDate"
                value={formData.preferredDate || ''}
                onChange={handleInputChange}
                disabled={isSubmitting}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#1F4FE0]"
              />
            </div>
            <div>
              <label htmlFor="modal-time" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                Preferred Time (Optional)
              </label>
              <select
                id="modal-time"
                name="preferredTime"
                value={formData.preferredTime || ''}
                onChange={handleInputChange}
                disabled={isSubmitting}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#1F4FE0]"
              >
                <option value="">Any Convenient Time</option>
                <option value="Morning (10:00 AM - 1:00 PM IST)">Morning (10:00 AM - 1:00 PM IST)</option>
                <option value="Afternoon (2:00 PM - 5:00 PM IST)">Afternoon (2:00 PM - 5:00 PM IST)</option>
                <option value="Evening (5:00 PM - 7:00 PM IST)">Evening (5:00 PM - 7:00 PM IST)</option>
              </select>
            </div>
          </div>

          {/* Security & Response Guarantee */}
          <div className="flex items-center gap-2 text-[11.5px] text-slate-500 pt-1">
            <ShieldCheck className="w-4 h-4 text-[#10b981] shrink-0" />
            <span>Enterprise SLA: Direct consultation with certified architects. Guaranteed response within 1 business day.</span>
          </div>

          {/* Submit Button with Loading State */}
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
                  <Send className="w-4 h-4" />
                  <span>Submit Strategic Consultation Request</span>
                </>
              )}
            </button>
          </div>
        </form>
      ) : (
        /* Confirmation & Success State */
        <div className="space-y-5 text-left">
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex items-start gap-3">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm sm:text-base font-bold text-emerald-950 mb-0.5">
                Consultation Request Successfully Registered!
              </h4>
              <p className="text-xs text-emerald-800 leading-relaxed">
                Your consultation has been registered in ATLAS Technosoft’s SAP Business One system. A dedicated lead activity has been created for our solutions team.
              </p>
            </div>
          </div>

          {/* Booking Summary Box */}
          <div className="p-4 sm:p-5 rounded-xl bg-white border border-slate-200 space-y-2 text-xs text-slate-700">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <span className="font-bold text-[#0A1B4F] uppercase tracking-wider text-[11px]">Reference ID</span>
              <span className="font-mono font-bold text-[#1F4FE0] bg-blue-50 px-2 py-0.5 rounded border border-blue-200/60">
                {submittedDetails.referenceId || 'ATLAS-CNS-ACTIVE'}
              </span>
            </div>

            {submittedDetails.sapCardCode && (
              <div className="flex items-center justify-between text-slate-600 text-[11.5px]">
                <span>SAP Lead Card Code:</span>
                <span className="font-mono font-semibold text-slate-800">{submittedDetails.sapCardCode}</span>
              </div>
            )}

            <div className="grid grid-cols-2 gap-2 pt-1 text-[12px]">
              <div><strong>Name:</strong> {formData.fullName}</div>
              <div><strong>Company:</strong> {formData.companyName}</div>
              <div className="truncate"><strong>Email:</strong> {formData.email}</div>
              <div><strong>Phone:</strong> {formData.phone}</div>
            </div>

            <div className="pt-1.5 border-t border-slate-200/70 text-[12px]">
              <strong>Service:</strong> {formData.service}
            </div>

            {formData.preferredDate && (
              <div className="text-[12px] text-slate-600">
                <strong>Preferred Date:</strong> {formData.preferredDate} {formData.preferredTime ? `(${formData.preferredTime})` : ''}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <a
              href={`https://wa.me/919372329599?text=${encodeURIComponent(
                `Hello ATLAS Technosoft, I submitted consultation ${submittedDetails.referenceId || ''} for ${formData.companyName}.`
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

