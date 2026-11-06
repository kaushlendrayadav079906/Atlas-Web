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
    <div className={`max-w-4xl ${isCenter ? 'mx-auto text-center' : 'text-left'} mb-10 md:mb-14 ${className}`}>
      {badge && (
        <div className="mb-4">
          <span
            className="text-[13px] font-bold uppercase tracking-[0.14em] select-none text-[#E0A33B]"
          >
            {badge}
          </span>
        </div>
      )}

      <h2
        className={`atlas-h2-size font-extrabold ${
          isDark ? 'text-white' : 'text-atlas-navy'
        }`}
      >
        {title}{' '}
        {titleHighlight && (
          <span className="atlas-accent text-[#E0A33B]">{titleHighlight}</span>
        )}
      </h2>

      {subtitle && (
        <p
          className={`mt-4 text-[16px] sm:text-[17px] leading-relaxed ${
            isDark ? 'text-atlas-onNavy' : 'text-atlas-body'
          } ${isCenter ? 'max-w-2xl mx-auto' : 'max-w-2xl'}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};
