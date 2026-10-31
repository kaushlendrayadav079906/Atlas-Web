import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Factory, Truck, Database, Ship, ArrowRight } from 'lucide-react';

interface IndustryCardProps {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  targetRoute?: string;
}

const iconMap: Record<string, React.ReactNode> = {
  manufacturing: <Factory className="w-5 h-5 text-blue-600" />,
  warehouse: <Truck className="w-5 h-5 text-blue-600" />,
  finance: <Database className="w-5 h-5 text-blue-600" />,
  trading: <Ship className="w-5 h-5 text-blue-600" />,
};

const industryStyleMap: Record<string, {
  borderColor: string;
  hoverBorder: string;
  arrowBorder: string;
  arrowText: string;
  arrowHover: string;
}> = {
  manufacturing: {
    borderColor: 'border-[#0052CC]',
    hoverBorder: 'hover:border-[#0040A8]',
    arrowBorder: 'border-blue-200',
    arrowText: 'text-[#0052CC]',
    arrowHover: 'group-hover:bg-[#0052CC] group-hover:text-white group-hover:border-[#0052CC]',
  },
  warehouse: {
    borderColor: 'border-[#0066CC]',
    hoverBorder: 'hover:border-[#0052CC]',
    arrowBorder: 'border-blue-200',
    arrowText: 'text-[#0066CC]',
    arrowHover: 'group-hover:bg-[#0066CC] group-hover:text-white group-hover:border-[#0066CC]',
  },
  finance: {
    borderColor: 'border-[#0284c7]',
    hoverBorder: 'hover:border-[#0369a1]',
    arrowBorder: 'border-sky-200',
    arrowText: 'text-[#0284c7]',
    arrowHover: 'group-hover:bg-[#0284c7] group-hover:text-white group-hover:border-[#0284c7]',
  },
  trading: {
    borderColor: 'border-[#10b981]',
    hoverBorder: 'hover:border-[#059669]',
    arrowBorder: 'border-emerald-200',
    arrowText: 'text-[#10b981]',
    arrowHover: 'group-hover:bg-[#10b981] group-hover:text-white group-hover:border-[#10b981]',
  },
};

export const IndustryCard: React.FC<IndustryCardProps> = ({
  id,
  title,
  description,
  imageSrc,
  targetRoute = `/industries/${id}`
}) => {
  const navigate = useNavigate();
  const style = industryStyleMap[id] || industryStyleMap.manufacturing;

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('a')) return;
    if (targetRoute.startsWith('#')) {
      const el = document.querySelector(targetRoute);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(targetRoute);
    }
  };

  const isInternal = targetRoute.startsWith('/') && !targetRoute.startsWith('//');

  return (
    <div
      onClick={handleCardClick}
      className={`group flex flex-col justify-between rounded-xl bg-white border-2 ${style.borderColor} ${style.hoverBorder} overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 h-full cursor-pointer`}
    >
      
      {/* Sleek Landscape Image Container (Panoramic ~2.8:1 ratio, matching reference UI) */}
      <div className="relative w-full h-28 sm:h-32 overflow-hidden bg-slate-100 border-b border-slate-200/90">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>

      {/* Card Content Bar: Title, Description, and Action Arrow */}
      <div className="p-3.5 sm:p-4 flex-1 flex items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="text-blue-600 shrink-0">
              {iconMap[id] || <Factory className="w-4 h-4 text-blue-600" />}
            </div>
            <h3 className="text-[17px] sm:text-[18px] font-bold text-[#172B50] group-hover:text-[#1B72E8] transition-colors leading-snug">
              {isInternal ? (
                <Link to={targetRoute} className="hover:underline">
                  {title}
                </Link>
              ) : (
                <a href={targetRoute} className="hover:underline">
                  {title}
                </a>
              )}
            </h3>
          </div>

          <p className="text-[13px] sm:text-[14px] text-[#53647A] leading-snug">
            {description}
          </p>
        </div>

        {/* Circular Arrow Icon on Right matching card accent */}
        {isInternal ? (
          <Link
            to={targetRoute}
            aria-label={`View ${title} solutions`}
            className={`w-7 h-7 rounded-full border ${style.arrowBorder} ${style.arrowText} ${style.arrowHover} flex items-center justify-center shrink-0 transition-all duration-200 shadow-sm`}
          >
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        ) : (
          <a
            href={targetRoute}
            aria-label={`View ${title} solutions`}
            className={`w-7 h-7 rounded-full border ${style.arrowBorder} ${style.arrowText} ${style.arrowHover} flex items-center justify-center shrink-0 transition-all duration-200 shadow-sm`}
          >
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </a>
        )}
      </div>

    </div>
  );
};
