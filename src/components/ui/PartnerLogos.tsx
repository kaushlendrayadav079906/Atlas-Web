import React from 'react';

export const SAPBusinessOneLogo: React.FC<{ className?: string }> = ({ className = "h-8 sm:h-9" }) => (
  <div className={`inline-flex items-center gap-2 select-none ${className}`}>
    <div className="bg-[#1F4FE0] text-white font-black text-sm sm:text-base px-2.5 py-1 rounded-sm tracking-wider flex items-center shadow-xs">
      SAP
    </div>
    <div className="flex flex-col leading-none">
      <span className="text-[#1F4FE0] font-bold text-[15px] sm:text-[16px] tracking-tight">Business</span>
      <span className="text-[#F0AB00] font-black text-[15px] sm:text-[16px] tracking-tight">One</span>
    </div>
  </div>
);

export const BoyumITLogo: React.FC<{ className?: string }> = ({ className = "h-8 sm:h-9" }) => (
  <div className={`inline-flex items-center select-none ${className}`}>
    <span className="text-slate-900 font-extrabold text-xl sm:text-2xl md:text-[26px] tracking-tight">boyum</span>
    <span className="text-[#1F4FE0] font-black text-2xl sm:text-3xl md:text-[30px] leading-none ml-1">it</span>
  </div>
);

export const UiPathLogo: React.FC<{ className?: string }> = ({ className = "h-8 sm:h-9" }) => (
  <div className={`inline-flex items-center gap-2 select-none ${className}`}>
    <div className="bg-[#FA4616] text-white font-black text-sm sm:text-base px-2 py-0.5 rounded-md flex items-center justify-center shadow-xs">
      Ui
    </div>
    <span className="text-slate-900 font-black text-xl sm:text-2xl tracking-tight">Path</span>
  </div>
);

export const BeasManufacturingLogo: React.FC<{ className?: string }> = ({ className = "h-8 sm:h-9" }) => (
  <div className={`inline-flex items-center gap-1.5 select-none ${className}`}>
    <span className="text-[#e11d48] font-black text-2xl sm:text-3xl leading-none">/</span>
    <span className="text-[#0f172a] font-black text-xl sm:text-2xl tracking-tight lowercase">beas</span>
    <span className="text-slate-500 font-bold text-xs sm:text-sm uppercase tracking-wider ml-1">mfg</span>
  </div>
);

export const ProdumexWMSLogo: React.FC<{ className?: string }> = ({ className = "h-8 sm:h-9" }) => (
  <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
    <div className="w-6 h-6 sm:w-7 sm:h-7 bg-[#10b981] rounded flex items-center justify-center text-white text-xs sm:text-sm font-black shadow-xs">
      ▦
    </div>
    <div className="flex flex-col leading-tight">
      <span className="text-[#0f172a] font-extrabold text-xs sm:text-sm tracking-wider uppercase">PRODUMEX</span>
      <span className="text-[#10b981] font-black text-[11px] sm:text-xs tracking-widest uppercase">WMS</span>
    </div>
  </div>
);

export const B1UPLogo: React.FC<{ className?: string }> = ({ className = "h-8 sm:h-9" }) => (
  <div className={`inline-flex items-center gap-2 select-none ${className}`}>
    <div className="w-6 h-6 sm:w-7 sm:h-7 bg-[#1F4FE0] rounded flex items-center justify-center text-white text-xs sm:text-sm font-black shadow-xs">
      B1
    </div>
    <div className="flex flex-col leading-none">
      <span className="text-[#0f172a] font-extrabold text-xs sm:text-sm tracking-tight">B1 Usability</span>
      <span className="text-slate-500 font-semibold text-[10px] sm:text-[11px] tracking-tight">Package</span>
    </div>
  </div>
);

export const SAPHANALogo: React.FC<{ className?: string }> = ({ className = "h-8 sm:h-9" }) => (
  <div className={`inline-flex items-center gap-2 select-none ${className}`}>
    <div className="bg-[#1F4FE0] text-white font-black text-sm sm:text-base px-2.5 py-1 rounded-sm tracking-wider flex items-center shadow-xs">
      SAP
    </div>
    <span className="text-[#1F4FE0] font-black text-lg sm:text-xl md:text-2xl tracking-wider">HANA</span>
  </div>
);

export const ProdumexScanLogo: React.FC<{ className?: string }> = ({ className = "h-8 sm:h-9" }) => (
  <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
    <div className="w-6 h-6 sm:w-7 sm:h-7 bg-[#0284c7] rounded flex items-center justify-center text-white text-[10px] sm:text-[11px] font-black shadow-xs">
      SCAN
    </div>
    <div className="flex flex-col leading-tight">
      <span className="text-[#0f172a] font-extrabold text-xs sm:text-sm tracking-wider uppercase">PRODUMEX</span>
      <span className="text-[#0284c7] font-black text-[11px] sm:text-xs tracking-widest uppercase">SCAN</span>
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
        <span className="text-[#0A1B4F] font-black text-sm tracking-tight">ATLAS</span>
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
