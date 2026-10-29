import React from 'react';

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  theme?: 'dark' | 'light';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  title,
  subtitle,
  align = 'center',
  theme = 'light',
  className = ''
}) => {
  const isDark = theme === 'dark';
  const isCenter = align === 'center';

  return (
    <div className={`max-w-3xl ${isCenter ? 'mx-auto text-center' : 'text-left'} mb-12 md:mb-16 ${className}`}>
      {badge && (
        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border ${
          isDark
            ? 'bg-brand-900/40 text-accent-cyan border-accent-cyan/30 shadow-[0_0_15px_rgba(34,211,238,0.15)]'
            : 'bg-brand-50 text-brand-700 border-brand-200'
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-accent-cyan animate-pulse' : 'bg-brand-600'}`} />
          {badge}
        </div>
      )}

      <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight leading-tight ${
        isDark ? 'text-white' : 'text-slate-900'
      }`}>
        {title}
      </h2>

      {subtitle && (
        <p className={`mt-4 text-base sm:text-lg leading-relaxed ${
          isDark ? 'text-slate-300' : 'text-slate-600'
        }`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

