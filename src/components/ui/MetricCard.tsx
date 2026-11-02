import React from 'react';
import { Users, TrendingUp, Database, Users2 } from 'lucide-react';
import { MetricItem } from '../../types';
import { VerificationBadge } from './VerificationBadge';
import { AnimatedCounter } from './AnimatedCounter';

interface MetricCardProps {
  metric: MetricItem;
}

const metricColorMap: Record<string, {
  icon: React.ReactNode;
  iconBg: string;
  numberColor: string;
}> = {
  clients: {
    icon: <Users className="w-5 h-5 text-[#0878f9]" />,
    iconBg: 'bg-blue-50 border-blue-200',
    numberColor: 'text-[#0878f9]',
  },
  retention: {
    icon: <TrendingUp className="w-5 h-5 text-[#16b978]" />,
    iconBg: 'bg-emerald-50 border-emerald-200',
    numberColor: 'text-[#16b978]',
  },
  transactions: {
    icon: <Database className="w-5 h-5 text-[#0284c7]" />,
    iconBg: 'bg-sky-50 border-sky-200',
    numberColor: 'text-[#0284c7]',
  },
  consultants: {
    icon: <Users2 className="w-5 h-5 text-[#0066CC]" />,
    iconBg: 'bg-blue-50 border-blue-200',
    numberColor: 'text-[#0066CC]',
  },
};

export const MetricCard: React.FC<MetricCardProps> = ({ metric }) => {
  const config = metricColorMap[metric.id] || metricColorMap.clients;

  return (
    <div className="flex flex-col items-center text-center p-3 sm:p-4 transition-all duration-200">
      {/* Icon in themed circle matching reference */}
      <div className={`w-11 h-11 rounded-full border ${config.iconBg} flex items-center justify-center mb-2 mx-auto`}>
        {config.icon}
      </div>

      {/* Metric Number: 32–40px bold with Animated Count-Up */}
      <div className={`text-[32px] sm:text-[36px] lg:text-[40px] font-extrabold ${config.numberColor} tracking-tight leading-none mb-1.5 min-h-[44px] flex items-center justify-center`}>
        <AnimatedCounter value={metric.value} duration={2000} />
      </div>

      {/* Metric Label: 15–16px */}
      <div className="text-[15px] sm:text-[16px] font-bold text-[#142B59] leading-snug">
        {metric.label}
      </div>

      {metric.requiresVerification && (
        <div className="mt-2">
          <VerificationBadge note={metric.sourceNote} variant="subtle" />
        </div>
      )}
    </div>
  );
};
