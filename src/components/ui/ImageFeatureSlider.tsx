import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from 'lucide-react';

export interface ImageFeatureItem {
  title: string;
  description?: string;
  image: string;
  /** Internal route; the whole card becomes a link */
  href?: string;
  /** Action instead of a link (e.g. open the consultation modal) */
  onClick?: () => void;
  /** Accessible/visible name for the card's action */
  actionLabel?: string;
  /** Small label above the title — an industry, a metric, etc. */
  eyebrow?: string;
  /** Optional feature list, revealed with the description */
  bullets?: string[];
}

interface ImageFeatureSliderProps {
  items: ImageFeatureItem[];
  ariaLabel: string;
  /** Cards visible per row on large screens */
  perView?: 2 | 3 | 4;
  /** 'slider' = swipeable track with arrows; 'grid' = wrapping grid (for narrow columns) */
  layout?: 'slider' | 'grid';
}

const BASIS: Record<2 | 3 | 4, string> = {
  2: 'lg:basis-[calc(50%-12px)]',
  3: 'lg:basis-[calc(33.333%-16px)]',
  4: 'lg:basis-[calc(25%-18px)]',
};
const GRID_COLS: Record<2 | 3 | 4, string> = {
  2: 'lg:grid-cols-2',
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4',
};

// White card: photo on top, content below. On white sections the stylesheet adds a
// dark border (see "Card surfaces" in index.css); on navy sections the white card
// stands out on its own.
const CARD_BASE =
  'group relative flex flex-col h-full text-left overflow-hidden rounded-3xl bg-white text-atlas-navy transition-all duration-300 hover:-translate-y-1 hover:shadow-enterprise-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-atlas-royal focus-visible:ring-offset-2';

const CardBody: React.FC<{ item: ImageFeatureItem }> = ({ item }) => (
  <>
    {/* Photo */}
    <span className="relative block h-48 sm:h-52 shrink-0 overflow-hidden bg-atlas-navy">
      <img
        src={item.image}
        alt=""
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        onError={(e) => {
          e.currentTarget.style.display = 'none';
        }}
      />
      <span
        className="absolute inset-0 bg-atlas-royal/25 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-50"
        aria-hidden="true"
      />
      {item.eyebrow && (
        <span className="absolute top-4 left-4 px-2.5 py-1 bg-atlas-gold text-atlas-navy text-[11px] font-extrabold uppercase tracking-[0.12em] rounded-md">
          {item.eyebrow}
        </span>
      )}
      {(item.href || item.onClick) && (
        <span className="absolute bottom-4 right-4 w-11 h-11 rounded-xl bg-atlas-gold text-atlas-navy flex items-center justify-center shadow-float transition-all duration-300 group-hover:bg-white group-hover:rotate-45">
          <ArrowUpRight className="w-5 h-5" aria-hidden="true" />
        </span>
      )}
    </span>

    {/* Content */}
    <span className="flex flex-col flex-1 gap-2.5 p-6 sm:p-7">
      <span className="block text-[19px] sm:text-[20px] font-extrabold leading-snug tracking-[-0.01em] text-atlas-navy group-hover:text-atlas-royal transition-colors">
        {item.title}
      </span>
      {item.description && (
        <span className="block text-[14.5px] leading-relaxed text-atlas-body">{item.description}</span>
      )}
      {item.bullets && item.bullets.length > 0 && (
        <span className="mt-1 block space-y-1.5">
          {item.bullets.map((b) => (
            <span key={b} className="flex items-start gap-2 text-[14px] leading-snug text-atlas-body">
              <Check className="w-4 h-4 mt-0.5 shrink-0 text-atlas-royal" strokeWidth={2.5} aria-hidden="true" />
              <span>{b}</span>
            </span>
          ))}
        </span>
      )}
      {(item.href || item.onClick) && item.actionLabel && (
        <span className="mt-auto pt-3 inline-flex items-center gap-1.5 text-[14px] font-bold text-atlas-royal">
          {item.actionLabel.split(':')[0]}
          <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
        </span>
      )}
    </span>
  </>
);

const Card: React.FC<{ item: ImageFeatureItem; className?: string }> = ({ item, className = '' }) => {
  const cls = `${CARD_BASE} ${className}`;
  if (item.href) {
    return (
      <Link to={item.href} data-card className={cls}>
        <CardBody item={item} />
      </Link>
    );
  }
  if (item.onClick) {
    return (
      <button type="button" onClick={item.onClick} data-card className={`${cls} w-full`}>
        <CardBody item={item} />
      </button>
    );
  }
  // Informational card
  return (
    <article data-card className={cls}>
      <CardBody item={item} />
    </article>
  );
};

/** A single photo card, for grids that render their own layout */
export const ImageCard = Card;

/**
 * White photo cards (image on top, content below) with a gold arrow button.
 * Laid out as a swipeable slider or a grid.
 */
export const ImageFeatureSlider: React.FC<ImageFeatureSliderProps> = ({
  items,
  ariaLabel,
  perView = 4,
  layout = 'slider',
}) => {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    if (layout !== 'slider') return;
    updateArrows();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateArrows, { passive: true });
    window.addEventListener('resize', updateArrows);
    return () => {
      el.removeEventListener('scroll', updateArrows);
      window.removeEventListener('resize', updateArrows);
    };
  }, [updateArrows, layout, items.length]);

  if (layout === 'grid') {
    return (
      <div role="group" aria-label={ariaLabel} className={`grid grid-cols-1 sm:grid-cols-2 ${GRID_COLS[perView]} gap-5 lg:gap-6`}>
        {items.map((item) => (
          <Card key={item.title} item={item} className="" />
        ))}
      </div>
    );
  }

  const scrollByCard = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('[data-card]');
    const step = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  const showArrows = canPrev || canNext;

  return (
    <div className="relative">
      <div
        ref={trackRef}
        role="region"
        aria-label={ariaLabel}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item) => (
          <Card
            key={item.title}
            item={item}
            className={`snap-start shrink-0 basis-[85%] sm:basis-[calc(50%-12px)] ${BASIS[perView]}`}
          />
        ))}
      </div>

      {showArrows && (
        <>
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            disabled={!canPrev}
            aria-label="Previous cards"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-atlas-gold text-atlas-navy flex items-center justify-center shadow-float transition-opacity disabled:opacity-0 disabled:pointer-events-none hover:bg-white"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            disabled={!canNext}
            aria-label="Next cards"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-atlas-gold text-atlas-navy flex items-center justify-center shadow-float transition-opacity disabled:opacity-0 disabled:pointer-events-none hover:bg-white"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </>
      )}
    </div>
  );
};
