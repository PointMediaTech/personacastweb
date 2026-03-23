'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from '@/app/lib/animations';

interface AnimatedCounterProps {
  readonly value: number;
  readonly suffix: string;
  readonly accentColor?: string;
  readonly glowStyle?: string;
  readonly duration?: number;
  readonly className?: string;
}

export function AnimatedCounter({
  value,
  suffix,
  accentColor,
  glowStyle,
  duration = 1800,
  className = '',
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const prefersReducedMotion = useReducedMotion();
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (!isInView) return;
    if (prefersReducedMotion) {
      setDisplay(formatNumber(value));
      return;
    }

    const startTime = performance.now();
    let rafId: number;

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * value;
      setDisplay(formatNumber(current));

      if (progress < 1) {
        rafId = requestAnimationFrame(animate);
      }
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [isInView, value, duration, prefersReducedMotion]);

  return (
    <span ref={ref} className={className} style={accentColor ? { color: accentColor, textShadow: glowStyle } : undefined}>
      {display}
      <span className="text-[0.55em] opacity-60 ml-0.5">{suffix}</span>
    </span>
  );
}

function formatNumber(n: number): string {
  if (n >= 1000) return Math.round(n).toLocaleString();
  if (Number.isInteger(n) || n >= 100) return Math.round(n).toString();
  // Preserve one decimal for values like 99.7
  return n.toFixed(1);
}
