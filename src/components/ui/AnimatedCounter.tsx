import React, { useState, useEffect, useRef } from 'react';

export interface ParsedStat {
  prefix: string;
  target: number;
  decimals: number;
  suffix: string;
  isNumeric: boolean;
}

export function parseStatValue(raw: string): ParsedStat {
  if (!raw || typeof raw !== 'string') {
    return { prefix: '', target: 0, decimals: 0, suffix: '', isNumeric: false };
  }

  const trimmed = raw.trim();
  // Matches optional non-digits, followed by a valid integer or float, followed by any suffix
  const match = trimmed.match(/^([^0-9.]*)([0-9]+(?:\.[0-9]+)?)(.*)$/);

  if (!match) {
    return { prefix: '', target: 0, decimals: 0, suffix: trimmed, isNumeric: false };
  }

  const prefix = match[1] || '';
  const numStr = match[2];
  const suffix = match[3] || '';
  const target = parseFloat(numStr);

  if (isNaN(target)) {
    return { prefix: '', target: 0, decimals: 0, suffix: trimmed, isNumeric: false };
  }

  const decimalPart = numStr.includes('.') ? numStr.split('.')[1] : '';
  const decimals = decimalPart.length;

  return {
    prefix,
    target,
    decimals,
    suffix,
    isNumeric: true,
  };
}

export interface AnimatedCounterProps {
  value: string;
  duration?: number;
  delay?: number;
  className?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  duration = 2000,
  delay = 0,
  className = '',
}) => {
  const [displayValue, setDisplayValue] = useState<string>(() => {
    // Initial display value before viewport trigger
    const parsed = parseStatValue(value);
    if (!parsed.isNumeric) return value;
    return `${parsed.prefix}${(0).toFixed(parsed.decimals)}${parsed.suffix}`;
  });

  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    // Respect user's reduced motion preference
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setDisplayValue(value);
      return;
    }

    const element = elementRef.current;
    if (!element) return;

    // Viewport Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          if (delay > 0) {
            setTimeout(() => setHasStarted(true), delay);
          } else {
            setHasStarted(true);
          }
          // Disconnect so it runs only once per page visit
          observer.disconnect();
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -20px 0px',
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [value, delay]);

  useEffect(() => {
    if (!hasStarted) return;

    const parsed = parseStatValue(value);
    if (!parsed.isNumeric) {
      setDisplayValue(value);
      return;
    }

    const { prefix, target, decimals, suffix } = parsed;
    let animationFrameId: number;
    let startTime: number | null = null;

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const elapsed = Math.max(0, currentTime - startTime);
      const progress = Math.min(elapsed / duration, 1);

      // Quartic ease-out: smooth, elegant enterprise deceleration
      const ease = 1 - Math.pow(1 - progress, 4);
      const current = ease * target;

      if (progress < 1) {
        setDisplayValue(`${prefix}${current.toFixed(decimals)}${suffix}`);
        animationFrameId = requestAnimationFrame(animate);
      } else {
        // Guarantee final exact value with zero rounding drift
        setDisplayValue(`${prefix}${target.toFixed(decimals)}${suffix}`);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [hasStarted, value, duration]);

  return (
    <span ref={elementRef} className={`tabular-nums inline-block ${className}`}>
      {displayValue}
    </span>
  );
};

