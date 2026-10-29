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
    <div className="group flex flex-col justify-between rounded-xl bg-white border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg hover:border-blue-300 transition-all duration-300 h-full">
      
      {/* Crystal Clear HD Photo Header */}
      <div className="relative w-full h-48 sm:h-52 overflow-hidden bg-slate-100 border-b border-slate-200">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>

      {/* Card Body Box */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
        <div>
          {/* Header with Icon Box and Title (19-22px) */}
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
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

        {/* Action Link Footer */}
        <div className="pt-3 flex items-center justify-between border-t border-slate-100">
          <span className="text-[15px] font-bold text-blue-600 group-hover:text-blue-700">
            Explore Sector
          </span>
          <div className="w-8 h-8 rounded-lg bg-blue-50 group-hover:bg-blue-600 group-hover:text-white text-blue-600 flex items-center justify-center transition-colors">
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>

    </div>
  );
};
