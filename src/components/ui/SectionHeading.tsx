import React from 'react';

interface SectionHeadingProps {
  badge?: string;
  title: string;
  titleHighlight?: string;
  subtitle?: string;
  align?: 'left' | 'center';
  theme?: 'dark' | 'light';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  title,
  titleHighlight,
  subtitle,
  align = 'center',
  theme = 'light',
  className = ''
}) => {
  const isDark = theme === 'dark';
  const isCenter = align === 'center';

  return (
    <div className={`max-w-3xl ${isCenter ? 'mx-auto text-center' : 'text-left'} mb-10 md:mb-14 ${className}`}>
      {badge && (
        <div className="mb-3">
          <span className="text-[13px] sm:text-[14px] font-bold uppercase tracking-wider text-[#0066CC] select-none">
            {badge}
          </span>
        </div>
      )}

      <h2 className={`font-serif text-[28px] sm:text-[32px] lg:text-[38px] font-bold tracking-tight leading-tight ${
        isDark ? 'text-white' : 'text-[#142B59]'
      }`}>
        {title}{' '}
        {titleHighlight && (
          <span className="bg-gradient-to-r from-[#0052CC] via-[#0066CC] to-[#0A66C2] bg-clip-text text-transparent">{titleHighlight}</span>
        )}
      </h2>

      {subtitle && (
        <p className={`mt-3.5 text-[16px] sm:text-[18px] leading-relaxed ${
          isDark ? 'text-slate-300' : 'text-[#45546B]'
        }`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};
