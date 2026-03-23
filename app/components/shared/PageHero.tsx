'use client';

import { useRef } from 'react';
import { useInView, useReducedMotion, cssTransition, EASE_CSS } from '@/app/lib/animations';
import { GlowButton } from '@/app/components/shared/GlowButton';

interface PageHeroProps {
  readonly h1: string;
  readonly h2: string;
  readonly ctaPrimary?: { label: string; href: string };
  readonly ctaSecondary?: { label: string; href: string };
  /** 'center' = full-width centered text; 'split' = left text, right slot */
  readonly layout?: 'center' | 'split';
  /** Optional right-side content for split layout */
  readonly rightContent?: React.ReactNode;
  /** Optional accent color for glow effects */
  readonly accentColor?: string;
}

export function PageHero({
  h1,
  h2,
  ctaPrimary,
  ctaSecondary,
  layout = 'center',
  rightContent,
  accentColor = 'rgba(118,158,219,0.12)',
}: PageHeroProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { margin: '-40px' });
  const reduced = useReducedMotion();

  // H1/H2 are LCP candidates — never start at opacity:0 or LCP is deferred until JS.
  // Use transform-only entrance so the text is visible in SSR HTML.
  const fadeUp = (delay: number) =>
    reduced
      ? {}
      : {
          transform: inView ? 'translateY(0)' : 'translateY(24px)',
          transition: cssTransition(['transform'], 0.7, delay),
        };

  // Secondary elements (CTA buttons, right panel) may fade in as normal.
  const fadeUpWithOpacity = (delay: number) =>
    reduced
      ? {}
      : {
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(24px)',
          transition: cssTransition(['opacity', 'transform'], 0.7, delay),
        };

  const isSplit = layout === 'split';

  return (
    <section
      ref={ref}
      className="relative min-h-[70vh] flex items-center overflow-hidden"
      style={{
        background: `radial-gradient(ellipse at 50% 40%, ${accentColor} 0%, transparent 60%)`,
      }}
    >
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8 py-24 lg:py-32">
        <div className={isSplit ? 'grid lg:grid-cols-2 gap-12 lg:gap-20 items-center' : ''}>
          {/* Text side */}
          <div className={isSplit ? '' : 'text-center max-w-4xl mx-auto'}>
            <h1
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight"
              style={fadeUp(0)}
            >
              {h1}
            </h1>

            <p
              className="mt-6 text-lg md:text-xl text-[#94A3B8] leading-relaxed max-w-2xl"
              style={{
                ...fadeUp(0.15),
                ...(isSplit ? {} : { marginLeft: 'auto', marginRight: 'auto' }),
              }}
            >
              {h2}
            </p>

              <div
                className={`mt-10 flex flex-wrap gap-4 ${isSplit ? '' : 'justify-center'}`}
                style={fadeUpWithOpacity(0.3)}
              >
                {ctaPrimary && (
                  <GlowButton href={ctaPrimary.href} label={ctaPrimary.label} variant="primary" />
                )}
                {ctaSecondary && (
                  <GlowButton href={ctaSecondary.href} label={ctaSecondary.label} variant="secondary" />
                )}
              </div>
          </div>

          {/* Right side (split only) */}
          {isSplit && rightContent && (
            <div style={fadeUpWithOpacity(0.2)}>{rightContent}</div>
          )}
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, #0A0E1A, transparent)',
        }}
      />
    </section>
  );
}
