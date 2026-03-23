'use client';

import { useRef } from 'react';
import { useInView, useReducedMotion } from '@/app/lib/animations';

/**
 * Wraps children with a mask-image linear gradient sweep effect.
 * Text appears to "emerge from darkness" as it enters the viewport.
 */
interface TextRevealWrapperProps {
  readonly children: React.ReactNode;
  readonly delay?: number;
  readonly className?: string;
}

export function TextRevealWrapper({
  children,
  delay = 0,
  className = '',
}: TextRevealWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '-80px' });
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        maskImage: inView
          ? 'linear-gradient(to bottom, #000 0%, #000 100%)'
          : 'linear-gradient(to bottom, #000 0%, transparent 30%)',
        WebkitMaskImage: inView
          ? 'linear-gradient(to bottom, #000 0%, #000 100%)'
          : 'linear-gradient(to bottom, #000 0%, transparent 30%)',
        opacity: inView ? 1 : 0.3,
        transform: inView ? 'translateY(0)' : 'translateY(8px)',
        transition: `mask-image 0.8s ease ${delay}s, -webkit-mask-image 0.8s ease ${delay}s, opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}
