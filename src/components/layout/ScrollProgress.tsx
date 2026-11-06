import React, { useEffect, useRef } from 'react';

/** Thin gold reading-progress bar pinned to the top of the viewport. */
export const ScrollProgress: React.FC = () => {
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Writing one transform per scroll event is cheap (compositor-only), so no rAF throttle needed
    const update = () => {
      const el = barRef.current;
      if (!el) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      el.style.transform = `scaleX(${progress})`;
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-[60] pointer-events-none" aria-hidden="true">
      <div
        ref={barRef}
        className="h-full origin-left bg-gradient-to-r from-atlas-royal to-atlas-gold"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  );
};
