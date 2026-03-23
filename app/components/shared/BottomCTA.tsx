'use client';

import { useRef } from 'react';
import { useInView, useReducedMotion, cssTransition } from '@/app/lib/animations';
import { GlowButton } from '@/app/components/shared/GlowButton';

interface BottomCTAProps {
  readonly h2: string;
  readonly body?: string;
  readonly ctaPrimary: { label: string; href: string };
  readonly ctaSecondary?: { label: string; href: string };
}

export function BottomCTA({ h2, body, ctaPrimary, ctaSecondary }: BottomCTAProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { margin: '-60px' });
  const reduced = useReducedMotion();

  const fade = (delay: number) =>
    reduced
      ? {}
      : {
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(16px)',
          transition: cssTransition(['opacity', 'transform'], 0.6, delay),
        };

  return (
    <section
      ref={ref}
      className="relative py-24 lg:py-32"
      style={{
        background: 'linear-gradient(180deg, #0A0E1A 0%, #111827 100%)',
      }}
    >
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2
          className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-snug"
          style={fade(0)}
        >
          {h2}
        </h2>

        {body && (
          <p className="mt-5 text-[#94A3B8] text-base leading-relaxed" style={fade(0.1)}>
            {body}
          </p>
        )}

        <div className="mt-12 flex flex-wrap gap-6 justify-center" style={fade(0.2)}>
          <GlowButton href={ctaPrimary.href} label={ctaPrimary.label} variant="primary" minWidth="200px" />
          {ctaSecondary && (
            <GlowButton href={ctaSecondary.href} label={ctaSecondary.label} variant="secondary" minWidth="200px" />
          )}
        </div>
      </div>
    </section>
  );
}
