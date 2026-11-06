import React from 'react';
import { MetricItem } from '../../types';
import { VerificationBadge } from './VerificationBadge';
import { AnimatedCounter } from './AnimatedCounter';

interface MetricCardProps {
  metric: MetricItem;
}

export const MetricCard: React.FC<MetricCardProps> = ({ metric }) => {
  return (
    <div className="flex flex-col gap-1.5 px-6 py-7 sm:px-8 sm:py-8 text-left h-full">
      <div className="text-[40px] sm:text-[44px] lg:text-[48px] font-extrabold text-atlas-navy tracking-[-0.03em] leading-none min-h-[48px] flex items-center">
        <AnimatedCounter value={metric.value} duration={2000} />
      </div>
      <div className="text-[15px] font-semibold text-atlas-body leading-snug">{metric.label}</div>
      {metric.requiresVerification && (
        <div className="mt-1.5">
          <VerificationBadge note={metric.sourceNote} variant="subtle" />
        </div>
      )}
    </div>
  );
};
