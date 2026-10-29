import React from 'react';
import { Factory, Truck, Database, Ship, ArrowRight } from 'lucide-react';

interface IndustryCardProps {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
}

const iconMap: Record<string, React.ReactNode> = {
  manufacturing: <Factory className="w-5 h-5 text-blue-600" />,
  warehouse: <Truck className="w-5 h-5 text-blue-600" />,
  finance: <Database className="w-5 h-5 text-blue-600" />,
  trading: <Ship className="w-5 h-5 text-blue-600" />,
};

export const IndustryCard: React.FC<IndustryCardProps> = ({ id, title, description, imageSrc }) => {
  return (
    <div className="group flex flex-col justify-between rounded-2xl bg-white border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-lg hover:border-slate-300 transition-all duration-300">
      
      {/* Photo Header */}
      <div className="relative w-full h-44 sm:h-48 overflow-hidden bg-slate-100">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            // Fallback placeholder gradient if image cannot load
            e.currentTarget.style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Card Content with 24-30px padding */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
        <div>
          {/* Header with Icon and Title (19-22px) */}
          <div className="flex items-center gap-3 mb-2.5">
            <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
              {iconMap[id] || <Factory className="w-5 h-5 text-blue-600" />}
            </div>
            <h3 className="text-[19px] sm:text-[21px] font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
              {title}
            </h3>
          </div>

          {/* Description (16-17px) */}
          <p className="text-[15px] sm:text-[16px] text-slate-600 leading-relaxed mb-4">
            {description}
          </p>
        </div>

        {/* Action Link */}
        <div className="pt-2 flex items-center justify-between border-t border-slate-100">
          <span className="text-[14px] font-semibold text-blue-600 group-hover:text-blue-700 flex items-center gap-1.5">
            Explore Sector
          </span>
          <div className="w-8 h-8 rounded-full bg-slate-50 group-hover:bg-blue-600 group-hover:text-white text-slate-600 flex items-center justify-center transition-colors">
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>

    </div>
  );
};
