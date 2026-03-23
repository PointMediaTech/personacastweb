'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { useReducedMotion, EASE_CSS } from '@/app/lib/animations';

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  distance?: number;
  className?: string;
}

const directionMap = {
  up: { y: 1, x: 0 },
  down: { y: -1, x: 0 },
  left: { x: 1, y: 0 },
  right: { x: -1, y: 0 },
};

export function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  distance = 20,
  className,
}: ScrollRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const [hydrated, setHydrated] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => { setHydrated(true); }, []);

  // Callback ref ensures the observer is created when the DOM node mounts,
  // regardless of render phase (fixes the hydration-guard timing bug).
  const setRef = useCallback((node: HTMLDivElement | null) => {
    // Disconnect previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '-80px', threshold: 0 },
    );
    observer.observe(node);
    observerRef.current = observer;
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => { observerRef.current?.disconnect(); };
  }, []);

  const d = directionMap[direction];

  // Before hydration or with reduced motion: render fully visible (no opacity:0 in SSR).
  const skipAnimation = prefersReducedMotion || !hydrated;

  return (
    <div
      ref={skipAnimation ? undefined : setRef}
      className={className}
      style={
        skipAnimation
          ? undefined
          : {
              opacity: isInView ? 1 : 0,
              transform: isInView
                ? 'translate(0, 0)'
                : `translate(${d.x * distance}px, ${d.y * distance}px)`,
              transition: `opacity 0.6s ${EASE_CSS} ${delay}s, transform 0.6s ${EASE_CSS} ${delay}s`,
            }
      }
    >
      {children}
    </div>
  );
}
