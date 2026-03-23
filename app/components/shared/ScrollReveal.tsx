'use client';

import { useRef } from 'react';
import { useInView, useReducedMotion, EASE_CSS } from '@/app/lib/animations';

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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const prefersReducedMotion = useReducedMotion();
  const d = directionMap[direction];

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView
          ? 'translate(0, 0)'
          : `translate(${d.x * distance}px, ${d.y * distance}px)`,
        transition: `opacity 0.6s ${EASE_CSS} ${delay}s, transform 0.6s ${EASE_CSS} ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}
