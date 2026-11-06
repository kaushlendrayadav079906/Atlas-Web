import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Site-wide scroll reveal. On every route it finds section headings, intro copy and
 * card-grid items inside <main>, hides them just below their resting position, and
 * fades them up as they enter the viewport (grid items stagger left to right).
 *
 * - Does nothing when the visitor prefers reduced motion or IntersectionObserver is missing.
 * - Opt a subtree out with data-no-reveal (used by the home hero, which has its own entrance).
 * - Classes are removed after the reveal so components' own hover transitions keep working.
 */

const TARGETS = [
  'main section .atlas-eyebrow',
  'main section h1',
  'main section h2',
  'main section h2 + p',
  'main section h2 ~ p',
  'main section .grid > *',
].join(', ');

const SKIP = '[data-no-reveal], [role="region"], [role="dialog"], [aria-modal="true"], .fixed, header, footer';

export const ScrollReveal: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const tagged: HTMLElement[] = [];
    const pending = new Set<HTMLElement>();
    const timers: number[] = [];

    const reveal = (el: HTMLElement) => {
      if (!pending.has(el)) return;
      pending.delete(el);
      el.classList.add('reveal-in');
      const delay = parseInt(el.style.getPropertyValue('--reveal-delay') || '0', 10);
      timers.push(
        window.setTimeout(() => {
          el.classList.remove('reveal-init', 'reveal-in', 'reveal-scale');
          el.style.removeProperty('--reveal-delay');
          delete el.dataset.revealTagged;
        }, delay + 950)
      );
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            observer.unobserve(entry.target);
            reveal(entry.target as HTMLElement);
          }
        });
      },
      { threshold: 0, rootMargin: '0px 0px -8% 0px' }
    );

    // Wait a tick so the new route has rendered
    const start = window.setTimeout(() => {
      const nodes = Array.from(document.querySelectorAll<HTMLElement>(TARGETS));
      nodes.forEach((el) => {
        if (el.closest(SKIP)) return;
        // Skip anything already inside an element we are revealing (avoid double motion)
        if (el.parentElement?.closest('[data-reveal-tagged]')) return;
        if (el.dataset.revealTagged) return;

        let delay = 0;
        const parent = el.parentElement;
        if (parent && parent.classList.contains('grid')) {
          const index = Array.prototype.indexOf.call(parent.children, el);
          delay = Math.min(index, 5) * 90;
          el.classList.add('reveal-scale');
        } else if (el.tagName === 'H2' || el.tagName === 'H1') {
          delay = 80;
        } else if (el.tagName === 'P') {
          delay = 160;
        }

        el.dataset.revealTagged = '1';
        el.style.setProperty('--reveal-delay', `${delay}ms`);
        el.classList.add('reveal-init');
        tagged.push(el);
        pending.add(el);
        observer.observe(el);
      });
    }, 60);

    // Fallback that doesn't depend on observer/frame timing: anything that has reached
    // (or been scrolled past) the lower part of the viewport is revealed. Guarantees
    // content can never stay hidden, e.g. after anchor jumps or in background tabs.
    const sweep = window.setInterval(() => {
      if (pending.size === 0) return;
      const limit = window.innerHeight * 0.92;
      pending.forEach((el) => {
        if (!el.isConnected) {
          pending.delete(el);
          return;
        }
        if (el.getBoundingClientRect().top < limit) {
          observer.unobserve(el);
          reveal(el);
        }
      });
    }, 250);

    return () => {
      window.clearTimeout(start);
      window.clearInterval(sweep);
      pending.clear();
      timers.forEach((t) => window.clearTimeout(t));
      observer.disconnect();
      // Never leave content hidden when navigating away mid-reveal
      tagged.forEach((el) => {
        el.classList.remove('reveal-init', 'reveal-in', 'reveal-scale');
        el.style.removeProperty('--reveal-delay');
        delete el.dataset.revealTagged;
      });
    };
  }, [pathname]);

  return null;
};
