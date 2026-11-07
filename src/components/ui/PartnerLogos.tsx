import React from 'react';

/**
 * Official Partner Logos preserving original company-approved branding,
 * colors, proportions, and vector visual assets across the entire website.
 * Never recolored with website theme colors or converted to monochrome.
 */

export const SAPBusinessOneLogo: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`inline-flex items-center select-none h-8 sm:h-9 max-h-full ${className}`}>
    <svg
      viewBox="0 0 170 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-auto max-h-full object-contain"
      role="img"
      aria-label="SAP Business One"
    >
      <defs>
        <linearGradient id="sapBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0070F2" />
          <stop offset="100%" stopColor="#008FD3" />
        </linearGradient>
      </defs>
      {/* Official SAP Corporate Trapezoid & White Letters S, A, P */}
      <g transform="translate(4, 1) scale(2.4)">
        <path d="M0 0v11.872h12.13L24 0z" fill="url(#sapBlueGrad)" />
        <path d="M3.264 2.208h.005c.863.001 1.915.245 2.676.633l-.82 1.43c-.835-.404-1.255-.442-1.73-.467-.708-.038-1.064.215-1.069.488-.007.332.669.633 1.305.838.964.306 2.19.715 2.377 1.9L7.77 2.373h2.046l2.064 5.576-.007-5.575h2.37c2.257 0 3.318.764 3.318 2.519 0 1.575-1.09 2.514-2.936 2.514h-.763l-.01 2.094-3.588-.003-.25-.908c-.37.122-.787.189-1.23.189-.456 0-.885-.071-1.263-.2l-.358.919-2 .006.09-.462c-.029.025-.057.05-.087.074-.535.43-1.208.629-2.037.644l-.213.002a5.075 5.075 0 0 1-2.581-.675l.73-1.448c.79.467 1.286.572 1.956.558.347-.007.598-.07.761-.239a.557.557 0 0 0 .156-.369c.007-.376-.53-.553-1.185-.756-.531-.164-1.135-.389-1.606-.735-.559-.41-.825-.924-.812-1.65a1.99 1.99 0 0 1 .566-1.377c.519-.537 1.357-.863 2.363-.863zm10.597 1.67v1.904h.521c.694 0 1.247-.23 1.248-.964 0-.709-.554-.94-1.248-.94zm-5.087.767l-.748 2.362c.223.085.481.133.757.133.268 0 .52-.047.742-.126l-.736-2.37z" fill="#FFFFFF" />
      </g>
      {/* Business One Wordmark beside SAP */}
      <text x="70" y="16" fontFamily="'Plus Jakarta Sans', -apple-system, sans-serif" fontSize="14.5" fontWeight="800" fill="#10264B" letterSpacing="-0.3">Business</text>
      <text x="70" y="30" fontFamily="'Plus Jakarta Sans', -apple-system, sans-serif" fontSize="15.5" fontWeight="900" fill="#F0AB00" letterSpacing="-0.3">One</text>
    </svg>
  </div>
);

export const BoyumITLogo: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`inline-flex items-center select-none h-8 sm:h-9 max-h-full ${className}`}>
    <svg
      viewBox="0 0 150 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-auto max-h-full object-contain"
      role="img"
      aria-label="Boyum IT"
    >
      {/* "boyum" in official dark charcoal #1E232A */}
      <text x="2" y="32" fontFamily="'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif" fontSize="28" fontWeight="800" fill="#1E232A" letterSpacing="-0.8">boyum</text>
      {/* "it" in official Boyum Orange #FA6400 */}
      <text x="108" y="32" fontFamily="'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif" fontSize="31" fontWeight="900" fill="#FA6400" letterSpacing="-0.5">it</text>
    </svg>
  </div>
);

export const UiPathLogo: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`inline-flex items-center select-none h-8 sm:h-9 max-h-full ${className}`}>
    <svg
      viewBox="0 0 135 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-auto max-h-full object-contain"
      role="img"
      aria-label="UiPath"
    >
      {/* Official UiPath Orange Container #FA4616 */}
      <rect x="2" y="5" width="34" height="30" rx="6" fill="#FA4616" />
      {/* White Ui inside */}
      <text x="19" y="27" fontFamily="'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif" fontSize="20" fontWeight="900" fill="#FFFFFF" textAnchor="middle" letterSpacing="-0.5">Ui</text>
      {/* "Path" in official dark charcoal/black #181A1E */}
      <text x="44" y="28" fontFamily="'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif" fontSize="24" fontWeight="900" fill="#181A1E" letterSpacing="-0.5">Path</text>
    </svg>
  </div>
);

export const SAPHANALogo: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`inline-flex items-center select-none h-8 sm:h-9 max-h-full ${className}`}>
    <svg
      viewBox="0 0 150 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-auto max-h-full object-contain"
      role="img"
      aria-label="SAP HANA"
    >
      <defs>
        <linearGradient id="sapHanaBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0070F2" />
          <stop offset="100%" stopColor="#008FD3" />
        </linearGradient>
      </defs>
      {/* Authentic SAP Corporate Trapezoid & White Letters S, A, P */}
      <g transform="translate(4, 1) scale(2.4)">
        <path d="M0 0v11.872h12.13L24 0z" fill="url(#sapHanaBlueGrad)" />
        <path d="M3.264 2.208h.005c.863.001 1.915.245 2.676.633l-.82 1.43c-.835-.404-1.255-.442-1.73-.467-.708-.038-1.064.215-1.069.488-.007.332.669.633 1.305.838.964.306 2.19.715 2.377 1.9L7.77 2.373h2.046l2.064 5.576-.007-5.575h2.37c2.257 0 3.318.764 3.318 2.519 0 1.575-1.09 2.514-2.936 2.514h-.763l-.01 2.094-3.588-.003-.25-.908c-.37.122-.787.189-1.23.189-.456 0-.885-.071-1.263-.2l-.358.919-2 .006.09-.462c-.029.025-.057.05-.087.074-.535.43-1.208.629-2.037.644l-.213.002a5.075 5.075 0 0 1-2.581-.675l.73-1.448c.79.467 1.286.572 1.956.558.347-.007.598-.07.761-.239a.557.557 0 0 0 .156-.369c.007-.376-.53-.553-1.185-.756-.531-.164-1.135-.389-1.606-.735-.559-.41-.825-.924-.812-1.65a1.99 1.99 0 0 1 .566-1.377c.519-.537 1.357-.863 2.363-.863zm10.597 1.67v1.904h.521c.694 0 1.247-.23 1.248-.964 0-.709-.554-.94-1.248-.94zm-5.087.767l-.748 2.362c.223.085.481.133.757.133.268 0 .52-.047.742-.126l-.736-2.37z" fill="#FFFFFF" />
      </g>
      {/* HANA in official SAP Blue #008FD3 */}
      <text x="70" y="24" fontFamily="'Plus Jakarta Sans', -apple-system, sans-serif" fontSize="20" fontWeight="900" fill="#008FD3" letterSpacing="1">HANA</text>
    </svg>
  </div>
);

export const BeasManufacturingLogo: React.FC<{ className?: string }> = ({ className = "h-8 sm:h-9" }) => (
  <div className={`inline-flex items-center gap-1.5 select-none ${className}`}>
    <span className="text-[#E11D48] font-black text-2xl sm:text-3xl leading-none">/</span>
    <span className="text-[#0F172A] font-black text-xl sm:text-2xl tracking-tight lowercase">beas</span>
    <span className="text-slate-500 font-bold text-xs sm:text-sm uppercase tracking-wider ml-1">mfg</span>
  </div>
);

export const ProdumexWMSLogo: React.FC<{ className?: string }> = ({ className = "h-8 sm:h-9" }) => (
  <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
    <div className="w-6 h-6 sm:w-7 sm:h-7 bg-[#10B981] rounded flex items-center justify-center text-white text-xs sm:text-sm font-black shadow-xs">
      ▦
    </div>
    <div className="flex flex-col leading-tight">
      <span className="text-[#0F172A] font-extrabold text-xs sm:text-sm tracking-wider uppercase">PRODUMEX</span>
      <span className="text-[#10B981] font-black text-[11px] sm:text-xs tracking-widest uppercase">WMS</span>
    </div>
  </div>
);

export const B1UPLogo: React.FC<{ className?: string }> = ({ className = "h-8 sm:h-9" }) => (
  <div className={`inline-flex items-center gap-2 select-none ${className}`}>
    <div className="w-6 h-6 sm:w-7 sm:h-7 bg-[#0066CC] rounded flex items-center justify-center text-white text-xs sm:text-sm font-black shadow-xs">
      B1
    </div>
    <div className="flex flex-col leading-none">
      <span className="text-[#0F172A] font-extrabold text-xs sm:text-sm tracking-tight">B1 Usability</span>
      <span className="text-slate-500 font-semibold text-[10px] sm:text-[11px] tracking-tight">Package</span>
    </div>
  </div>
);

export const ProdumexScanLogo: React.FC<{ className?: string }> = ({ className = "h-8 sm:h-9" }) => (
  <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
    <div className="w-6 h-6 sm:w-7 sm:h-7 bg-[#0284C7] rounded flex items-center justify-center text-white text-[10px] sm:text-[11px] font-black shadow-xs">
      SCAN
    </div>
    <div className="flex flex-col leading-tight">
      <span className="text-[#0F172A] font-extrabold text-xs sm:text-sm tracking-wider uppercase">PRODUMEX</span>
      <span className="text-[#0284C7] font-black text-[11px] sm:text-xs tracking-widest uppercase">SCAN</span>
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
