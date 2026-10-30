import React from 'react';

export const SAPBusinessOneLogo: React.FC<{ className?: string }> = ({ className = "h-8" }) => (
  <div className={`inline-flex items-center gap-1.5 select-none ${className}`}>
    <div className="bg-[#005CAD] text-white font-black text-xs sm:text-sm px-2 py-1 rounded-sm tracking-wider flex items-center">
      SAP
    </div>
    <div className="flex flex-col leading-none">
      <span className="text-[#005CAD] font-bold text-[13px] tracking-tight">Business</span>
      <span className="text-[#F0AB00] font-black text-[13px] tracking-tight">One</span>
    </div>
  </div>
);

export const BoyumITLogo: React.FC<{ className?: string }> = ({ className = "h-8" }) => (
  <div className={`inline-flex items-center select-none ${className}`}>
    <span className="text-slate-900 font-extrabold text-lg sm:text-xl tracking-tight">boyum</span>
    <span className="text-amber-500 font-black text-xl sm:text-2xl leading-none ml-0.5">it</span>
  </div>
);

export const UiPathLogo: React.FC<{ className?: string }> = ({ className = "h-8" }) => (
  <div className={`inline-flex items-center gap-1.5 select-none ${className}`}>
    <div className="bg-[#FA4616] text-white font-bold text-xs sm:text-sm px-1.5 py-0.5 rounded flex items-center justify-center">
      Ui
    </div>
    <span className="text-slate-900 font-extrabold text-base sm:text-lg tracking-tight">Path</span>
  </div>
);

export const BeasManufacturingLogo: React.FC<{ className?: string }> = ({ className = "h-7" }) => (
  <div className={`inline-flex items-center gap-1 select-none ${className}`}>
    <span className="text-[#e11d48] font-black text-xl leading-none">/</span>
    <span className="text-[#0f172a] font-extrabold text-lg sm:text-xl tracking-tight lowercase">beas</span>
  </div>
);

export const ProdumexWMSLogo: React.FC<{ className?: string }> = ({ className = "h-7" }) => (
  <div className={`inline-flex items-center gap-2 select-none ${className}`}>
    <div className="w-5 h-5 bg-[#10b981] rounded-sm flex items-center justify-center text-white text-[10px] font-black">
      ▦
    </div>
    <div className="flex flex-col leading-tight">
      <span className="text-[#0f172a] font-extrabold text-xs tracking-wider uppercase">PRODUMEX</span>
      <span className="text-[#10b981] font-black text-[11px] tracking-widest uppercase">WMS</span>
    </div>
  </div>
);

export const B1UPLogo: React.FC<{ className?: string }> = ({ className = "h-7" }) => (
  <div className={`inline-flex items-center gap-1.5 select-none ${className}`}>
    <div className="w-5 h-5 bg-[#ea580c] rounded flex items-center justify-center text-white text-[10px] font-black">
      B1
    </div>
    <div className="flex flex-col leading-none">
      <span className="text-[#0f172a] font-extrabold text-xs tracking-tight">B1 Usability</span>
      <span className="text-slate-500 font-semibold text-[10px] tracking-tight">Package</span>
    </div>
  </div>
);

export const AtlasLogo: React.FC<{ className?: string; showText?: boolean }> = ({ className = "h-8", showText = true }) => (
  <div className={`inline-flex items-center gap-2 select-none ${className}`}>
    <div className="h-full aspect-square flex items-center justify-center shrink-0">
      <img src="/images/logo.png" alt="ATLAS Logo" className="h-full w-full object-contain" />
    </div>
    {showText && (
      <div className="flex flex-col leading-tight">
        <span className="text-[#10264b] font-black text-sm tracking-tight">ATLAS</span>
        <span className="text-slate-500 font-bold text-[10px] tracking-wider uppercase">Technosoft</span>
      </div>
    )}
  </div>
);

export const PartnerLogosStrip: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`flex flex-wrap items-center justify-center gap-6 sm:gap-10 py-3 px-6 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-md ${className}`}>
    <SAPBusinessOneLogo />
    <div className="h-6 w-px bg-slate-200 hidden sm:block" />
    <BoyumITLogo />
    <div className="h-6 w-px bg-slate-200 hidden sm:block" />
    <UiPathLogo />
  </div>
);

