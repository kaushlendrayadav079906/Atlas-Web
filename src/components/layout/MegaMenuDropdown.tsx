import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronRight,
  Check,
  Settings,
  Layers,
  Headphones,
  RefreshCw,
  Link2,
  Users,
  Database,
  Zap,
  Cpu,
  Factory,
  Truck,
  Boxes,
  TrendingUp,
  Building2,
  ShieldCheck,
  Clock,
} from 'lucide-react';
import { MegaMenuCategory } from '../../data/navigationData';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Settings,
  Layers,
  Headphones,
  RefreshCw,
  Link2,
  Users,
  Database,
  Zap,
  Cpu,
  Factory,
  Truck,
  Boxes,
  TrendingUp,
  Building2,
  ShieldCheck,
  Clock,
};

interface MegaMenuDropdownProps {
  categories: MegaMenuCategory[];
  isOpen: boolean;
  onClose: () => void;
  menuName: string;
}

export const MegaMenuDropdown: React.FC<MegaMenuDropdownProps> = ({
  categories,
  isOpen,
  onClose,
  menuName,
}) => {
  const [activeCategoryId, setActiveCategoryId] = useState<string>(
    categories[0]?.id || ''
  );
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [styleOffset, setStyleOffset] = useState<React.CSSProperties>({
    left: '0px',
  });

  // Reset active category when menu opens or categories change
  useEffect(() => {
    if (categories.length > 0) {
      setActiveCategoryId(categories[0].id);
    }
  }, [categories, isOpen]);

  // Handle outside click and escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Viewport-aware horizontal positioning: directly below trigger and clamped within screen
  useEffect(() => {
    if (!isOpen || !menuRef.current) return;

    const el = menuRef.current;
    const parent = el.parentElement;
    if (!parent) return;

    const updatePosition = () => {
      const parentRect = parent.getBoundingClientRect();
      const dropdownWidth = el.offsetWidth || 540;
      const viewportWidth = window.innerWidth;
      const margin = 16;

      // Align directly with the left edge of trigger button
      let desiredLeft = parentRect.left;

      // Clamp within viewport so it never overflows right edge
      if (desiredLeft + dropdownWidth > viewportWidth - margin) {
        desiredLeft = viewportWidth - margin - dropdownWidth;
      }
      // Clamp left edge so it never overflows left edge
      if (desiredLeft < margin) {
        desiredLeft = margin;
      }

      // Relative to parent trigger element
      const relativeLeft = desiredLeft - parentRect.left;
      setStyleOffset({
        left: `${relativeLeft}px`,
      });
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, [isOpen, menuName]);

  if (!isOpen || categories.length === 0) return null;

  const activeCategory =
    categories.find((c) => c.id === activeCategoryId) || categories[0];

  return (
    <div
      ref={menuRef}
      style={styleOffset}
      className="absolute top-full mt-2 w-[530px] sm:w-[550px] max-w-[calc(100vw-32px)] bg-white rounded-2xl shadow-xl border border-slate-200/90 z-50 overflow-hidden transition-all duration-200 ease-out"
      role="region"
      aria-label={`${menuName} Mega Menu`}
    >
      <div className="grid grid-cols-12 min-h-[300px]">
        
        {/* Left Column: Categories List */}
        <div className="col-span-5 bg-slate-50/60 p-2.5 sm:p-3 border-r border-slate-100 flex flex-col justify-start space-y-1">
          {categories.map((cat) => {
            const IconComponent = iconMap[cat.icon] || Settings;
            const isSelected = cat.id === activeCategory.id;

            return (
              <button
                key={cat.id}
                type="button"
                onMouseEnter={() => setActiveCategoryId(cat.id)}
                onClick={() => setActiveCategoryId(cat.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left transition-all text-[13.5px] ${
                  isSelected
                    ? 'bg-[#eef4ff] text-[#1B72E8] font-semibold'
                    : 'text-[#142B59] font-medium hover:bg-white hover:text-[#1B72E8]'
                }`}
                aria-selected={isSelected}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <IconComponent
                    className={`w-4 h-4 shrink-0 transition-colors ${
                      isSelected ? 'text-[#1B72E8]' : 'text-slate-400'
                    }`}
                  />
                  <span className="truncate">{cat.name}</span>
                </div>
                {isSelected && (
                  <ChevronRight className="w-4 h-4 text-[#1B72E8] shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Right Column: Category Details & Submenu Items */}
        <div className="col-span-7 p-5 sm:p-6 flex flex-col justify-start bg-white">
          {/* Category Header & Description */}
          <div>
            <Link
              to={activeCategory.href}
              onClick={onClose}
              className="text-[17px] font-bold text-[#142B59] hover:text-[#1B72E8] tracking-tight block transition-colors"
            >
              {activeCategory.name}
            </Link>
            <p className="text-[13px] text-slate-500 leading-relaxed mt-1">
              {activeCategory.description}
            </p>
          </div>

          {/* Submenu Item Links with Filled Blue Circle Checkmarks */}
          <div className="mt-4 pt-3 border-t border-slate-100">
            <ul className="space-y-2.5">
              {activeCategory.subItems.map((sub, idx) => (
                <li key={idx}>
                  <Link
                    to={sub.href}
                    onClick={onClose}
                    className="group flex items-center gap-2.5 text-[13.5px] font-medium text-[#142B59] hover:text-[#1B72E8] transition-colors"
                  >
                    <span className="w-4 h-4 rounded-full bg-[#1B72E8] text-white flex items-center justify-center shrink-0 shadow-xs">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </span>
                    <span className="group-hover:translate-x-0.5 transition-transform">
                      {sub.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
};
