'use client';

import { useRef } from 'react';
import { useInView, useReducedMotion } from '@/app/lib/animations';

const CTA_HREF = 'https://calendly.com/personacast/demo';

const EASE = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-120px' });
  const prefersReducedMotion = useReducedMotion();

  const fadeUpStyle = (delay: number) =>
    prefersReducedMotion
      ? { opacity: 1 as const }
      : {
          opacity: isInView ? 1 : 0,
          transform: isInView ? 'translateY(0)' : 'translateY(24px)',
          transition: `opacity 0.9s ${EASE} ${delay}s, transform 0.9s ${EASE} ${delay}s`,
        };

  return (
    <section
      ref={sectionRef}
      id="cta"
      aria-label="行動召喚"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#000000' }}
    >
      {/* Radial vignette mask */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 50% 50% at 50% 50%, transparent 0%, rgba(0,0,0,0.6) 60%, #000 100%)',
        }}
      />

      {/* Ambient glow — replaces the crosshair icon */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full pointer-events-none"
        style={{
          background: 'rgba(0,242,255,0.10)',
          filter: 'blur(120px)',
        }}
      />

      {/* Glass floor reflection */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[40%] pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgba(0,242,255,0.015) 0%, transparent 60%)',
        }}
      />
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(0,242,255,0.08) 30%, rgba(0,242,255,0.12) 50%, rgba(0,242,255,0.08) 70%, transparent)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* Main headline */}
        <h2
          className="font-heading font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] leading-[1.05] tracking-tighter text-white"
          style={{
            textShadow: '0 0 40px rgba(255,255,255,0.08), 0 0 80px rgba(255,255,255,0.03)',
            ...fadeUpStyle(0.1),
          }}
        >
          讓現實，成為排演好的勝局
        </h2>

        {/* Subtitle — tight to headline, forms a text cluster */}
        <p
          className="font-body text-base md:text-lg mt-6 md:mt-8 mb-20 md:mb-24 max-w-md leading-relaxed"
          style={{
            color: '#9ca3af',
            letterSpacing: '0.06em',
            ...fadeUpStyle(0.4),
          }}
        >
          領先{' '}
          <span className="font-bold" style={{ color: '#00FFC2' }}>
            72
          </span>{' '}
          小時鎖定路徑。在這裡，沒有意外。
        </p>

        {/* CTA Button */}
        <div style={fadeUpStyle(0.6)}>
          <a
            href={CTA_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-void-button group relative inline-flex items-center justify-center px-10 py-4 md:px-14 md:py-5 font-mono text-sm md:text-base font-semibold tracking-[0.25em] overflow-hidden transition-all duration-500"
            style={{
              color: '#00FFC2',
              border: '2px solid #00FFC2',
              background: 'transparent',
              boxShadow:
                '0 0 20px rgba(0,255,194,0.3), 0 0 60px rgba(0,255,194,0.08)',
            }}
          >
            {/* Shimmer sweep on hover */}
            <span
              className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none"
              style={{
                background:
                  'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
              }}
            />
            {/* Hover fill background */}
            <span
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background:
                  'linear-gradient(135deg, #00FFC2 0%, #00D4AA 100%)',
              }}
            />
            <span className="relative z-10 group-hover:text-black transition-colors duration-500">
              [ 立即預約專屬展示 ]
            </span>
          </a>
        </div>
      </div>

      {/* SEO hidden text */}
      <p className="sr-only">
        PersonaCast — 領先 72 小時的 AI 戰略預演。立即啟動真理系統，預約專屬演示。
      </p>
    </section>
  );
}
