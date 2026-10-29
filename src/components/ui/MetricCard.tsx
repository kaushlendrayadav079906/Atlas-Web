import React from 'react';
import { MetricItem } from '../../types';
import { VerificationBadge } from './VerificationBadge';

interface MetricCardProps {
  metric: MetricItem;
  theme?: 'dark' | 'light';
}

export const MetricCard: React.FC<MetricCardProps> = ({ metric, theme = 'dark' }) => {
  const isDark = theme === 'dark';

  return (
    <div
      className={`relative p-6 sm:p-7 rounded-xl border transition-all duration-300 hover:-translate-y-1 ${
        isDark
          ? 'bg-navy-900/80 border-navy-800 hover:border-brand-500/50 hover:shadow-[0_8px_30px_rgba(30,58,138,0.2)]'
          : 'bg-white border-slate-200 hover:border-brand-300 hover:shadow-lg'
      }`}
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight ${
          isDark ? 'text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-accent-cyan' : 'text-brand-600'
        }`}>
          {metric.value}
        </div>
        {metric.requiresVerification && (
          <VerificationBadge note={metric.sourceNote} variant={isDark ? 'subtle' : 'floating'} />
        )}
      </div>

      <div className={`text-base font-bold mb-1.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
        {metric.label}
      </div>

      <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
        {metric.detail}
      </p>
    </div>
  );
};
