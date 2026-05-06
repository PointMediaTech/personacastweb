'use client';

import { useRef } from 'react';
import { useInView, useReducedMotion, cssTransition } from '@/app/lib/animations';

interface FeatureCardProps {
  readonly title: string;
  readonly description: string;
  readonly icon?: React.ReactNode;
  readonly accentColor?: string;
  readonly delay?: number;
  readonly cardBackground?: string;
  readonly titleColor?: string;
  readonly descColor?: string;
}

export function FeatureCard({
  title,
  description,
  icon,
  accentColor = '#769EDB',
  delay = 0,
  cardBackground = 'rgba(17,24,39,0.90)',
  titleColor = '#ffffff',
  descColor = '#94A3B8',
}: FeatureCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '-60px' });
  const reduced = useReducedMotion();

  return (
    <div
      ref={ref}
      className="group relative rounded-xl overflow-hidden"
      style={{
        backgroundColor: cardBackground,
        border: '1px solid rgba(118,158,219,0.12)',
        opacity: reduced ? 1 : inView ? 1 : 0,
        transform: reduced ? 'none' : inView ? 'translateY(0)' : 'translateY(20px)',
        transition: cssTransition(['opacity', 'transform'], 0.6, delay),
      }}
    >
      {/* Top accent line */}
      <div
        className="h-[2px] w-full"
        style={{
          background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
        }}
      />

      <div className="p-6 lg:p-8">
        {icon && (
          <div
            className="mb-4 text-2xl w-10 h-10 flex items-center justify-center rounded-lg"
            style={{ backgroundColor: `${accentColor}15`, color: accentColor }}
          >
            {icon}
          </div>
        )}

        <h3 className="text-xl font-bold mb-4" style={{ color: titleColor }}>{title}</h3>
        <p className="text-base md:text-lg leading-relaxed" style={{ color: descColor }}>{description}</p>
      </div>
    </div>
  );
}
