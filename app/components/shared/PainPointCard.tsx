'use client';

import { useRef } from 'react';
import { useInView, useReducedMotion, cssTransition } from '@/app/lib/animations';

interface PainPointCardProps {
  readonly title: string;
  readonly description: string;
  readonly delay?: number;
}

export function PainPointCard({ title, description, delay = 0 }: PainPointCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '-60px' });
  const reduced = useReducedMotion();

  return (
    <div
      ref={ref}
      className="rounded-xl overflow-hidden"
      style={{
        backgroundColor: 'rgba(17,24,39,0.65)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(181,125,125,0.12)',
        opacity: reduced ? 1 : inView ? 1 : 0,
        transform: reduced ? 'none' : inView ? 'translateY(0)' : 'translateY(20px)',
        transition: cssTransition(['opacity', 'transform'], 0.6, delay),
      }}
    >
      {/* Red accent top line */}
      <div className="h-[2px] w-full" style={{ backgroundColor: '#B57D7D' }} />

      <div className="p-6 lg:p-8">
        <h3 className="text-lg font-bold text-white mb-3">{title}</h3>
        <p className="text-[#94A3B8] text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
