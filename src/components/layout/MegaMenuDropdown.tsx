import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { MegaMenuCategory } from '../../data/navigationData';

interface MegaMenuDropdownProps {
  categories: MegaMenuCategory[];
  isOpen: boolean;
  onClose: () => void;
  menuName: string;
}

interface FeaturedCard {
  image: string;
  title: string;
  summary: string;
  href: string;
  cta: string;
}

// Featured promo card shown on the right of each mega menu
const FEATURED: Record<string, FeaturedCard> = {
  About: {
    image: '/images/about/about_story_team.jpg',
    title: 'Meet the ATLAS team',
    summary: 'Certified consultants across SAP, Boyum IT and UiPath.',
    href: '/about#team',
    cta: 'Meet the team',
  },
  Services: {
    image: '/images/crystal_hd/expertise_erp.jpg',
    title: 'Support & AMS',
    summary: 'SLA-backed support that keeps SAP Business One running smoothly.',
    href: '/services/support-maintenance',
    cta: 'Explore support',
  },
  Solutions: {
    image: '/images/solutions/solutions_integrated_ecosystem.jpg',
    title: 'ATLAS Add-ons',
    summary: 'Our own SAP add-ons for trading, gate entry and shipping.',
    href: '/solutions/atlas-addons',
    cta: 'Explore add-ons',
  },
  Industries: {
    image: '/images/industries/industries_hero_engineer.jpg',
    title: 'Customer stories',
    summary: 'See how companies like yours run on SAP Business One.',
    href: '/case-studies',
    cta: 'Read case studies',
  },
  Partners: {
    image: '/images/partners/partners_hero.jpg',
    title: 'Our partner ecosystem',
    summary: 'Certified with SAP, Boyum IT and UiPath.',
    href: '/partners',
    cta: 'View partners',
  },
  Resources: {
    image: '/images/case_studies/cs_hero_team.jpg',
    title: 'Talk to an expert',
    summary: 'Book a consultation about your ERP and automation plans.',
    href: '/contact',
    cta: 'Book a consultation',
  },
};

export const MegaMenuDropdown: React.FC<MegaMenuDropdownProps> = ({
  categories,
  isOpen,
  onClose,
  menuName,
}) => {
  const [activeCategoryId, setActiveCategoryId] = useState<string>(categories[0]?.id || '');
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Reset to the first tab whenever the menu opens
  useEffect(() => {
    if (categories.length > 0) setActiveCategoryId(categories[0].id);
  }, [categories, isOpen]);

  // Escape key and outside click close the menu
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen || categories.length === 0) return null;

  const activeCategory = categories.find((c) => c.id === activeCategoryId) || categories[0];
  const featured = FEATURED[menuName];

  return (
    // Positioned against the sticky <header>, spanning the full width under it
    <div ref={menuRef} className="absolute left-0 right-0 top-full z-50 pt-0" role="region" aria-label={`${menuName} menu`}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="animate-menu-in grid grid-cols-12 gap-6 bg-white rounded-b-3xl border border-t-0 border-atlas-line shadow-[0_30px_60px_-30px_rgba(10,27,79,0.35)] p-6">
          {/* Left: tabs + items */}
          <div className={`${featured ? 'col-span-8' : 'col-span-12'} flex flex-col min-w-0`}>
            {/* Category tabs */}
            <div
              className="grid border-b border-atlas-line"
              style={{ gridTemplateColumns: `repeat(${categories.length}, minmax(0, 1fr))` }}
              role="tablist"
              aria-label={`${menuName} categories`}
            >
              {categories.map((cat) => {
                const isSelected = cat.id === activeCategory.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onMouseEnter={() => setActiveCategoryId(cat.id)}
                    onFocus={() => setActiveCategoryId(cat.id)}
                    onClick={() => setActiveCategoryId(cat.id)}
                    className={`relative px-2 pb-3.5 pt-1 text-[13.5px] leading-snug text-center transition-colors ${
                      isSelected ? 'text-atlas-royal font-bold' : 'text-atlas-navy font-semibold hover:text-atlas-royal'
                    }`}
                  >
                    {cat.name}
                    <span
                      className={`absolute left-2 right-2 -bottom-px h-[2px] rounded-full transition-colors ${
                        isSelected ? 'bg-atlas-royal' : 'bg-transparent'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Active category heading */}
            <div className="pt-5 pb-4">
              <Link
                to={activeCategory.href}
                onClick={onClose}
                className="text-[20px] font-extrabold text-atlas-navy hover:text-atlas-royal transition-colors"
              >
                {activeCategory.name}
              </Link>
              <p className="mt-1 text-[14px] text-atlas-body line-clamp-1">{activeCategory.description}</p>
            </div>

            {/* Items: title + one-line summary + link */}
            <div className="grid grid-cols-2 border-t border-l border-atlas-line rounded-2xl overflow-hidden">
              {activeCategory.subItems.map((sub) => (
                <Link
                  key={sub.name}
                  to={sub.href}
                  onClick={onClose}
                  className="group flex items-start justify-between gap-4 px-5 py-4 border-b border-r border-atlas-line hover:bg-atlas-mist transition-colors"
                >
                  <span className="min-w-0">
                    <span className="block text-[15px] font-bold text-atlas-navy group-hover:text-atlas-royal transition-colors">
                      {sub.name}
                    </span>
                    {sub.summary && (
                      <span className="block mt-1 text-[13px] text-atlas-body truncate">{sub.summary}</span>
                    )}
                  </span>
                  <ArrowUpRight
                    className="w-5 h-5 mt-0.5 shrink-0 text-atlas-navy group-hover:text-atlas-royal group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all"
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </div>

            <div className="pt-4 text-center">
              <Link
                to={activeCategory.href}
                onClick={onClose}
                className="inline-flex items-center gap-2 text-[14px] font-bold text-atlas-royal hover:text-atlas-royalDark"
              >
                View all {activeCategory.name}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Right: featured card */}
          {featured && (
            <Link
              to={featured.href}
              onClick={onClose}
              className="col-span-4 group flex flex-col rounded-2xl overflow-hidden bg-atlas-tint hover:bg-atlas-mist transition-colors"
            >
              <img
                src={featured.image}
                alt=""
                className="w-full h-48 object-cover group-hover:scale-[1.02] transition-transform duration-500"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <span className="p-5 flex flex-col gap-1.5 flex-1">
                <span className="text-[18px] font-extrabold text-atlas-navy">{featured.title}</span>
                <span className="text-[13.5px] leading-relaxed text-atlas-body">{featured.summary}</span>
                <span className="mt-auto pt-3 inline-flex items-center gap-1.5 text-[14px] font-bold text-atlas-royal">
                  {featured.cta}
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </span>
              </span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
