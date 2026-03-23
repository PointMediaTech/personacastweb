'use client';

import { useRef } from 'react';
import { useInView, useReducedMotion, cssTransition } from '@/app/lib/animations';

interface PricingCardProps {
  readonly name: string;
  readonly badge?: string;
  readonly audience: string;
  readonly features: readonly string[];
  readonly valueProposition: string;
  readonly cta: { label: string; href: string };
  readonly highlighted?: boolean;
  readonly delay?: number;
}

export function PricingCard({
  name,
  badge,
  audience,
  features,
  valueProposition,
  cta,
  highlighted = false,
  delay = 0,
}: PricingCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '-60px' });
  const reduced = useReducedMotion();

  return (
    <div
      ref={ref}
      className={`relative rounded-xl overflow-hidden flex flex-col ${highlighted ? 'lg:scale-105' : ''}`}
      style={{
        backgroundColor: 'rgba(17,24,39,0.65)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: highlighted
          ? '2px solid rgba(118,158,219,0.4)'
          : '1px solid rgba(118,158,219,0.08)',
        boxShadow: highlighted ? '0 0 40px rgba(118,158,219,0.12)' : 'none',
        opacity: reduced ? 1 : inView ? 1 : 0,
        transform: reduced ? 'none' : inView ? 'translateY(0)' : 'translateY(20px)',
        transition: cssTransition(['opacity', 'transform'], 0.6, delay),
      }}
    >
      {highlighted && (
        <div
          className="h-[2px] w-full"
          style={{
            background: 'linear-gradient(90deg, transparent, #769EDB, transparent)',
          }}
        />
      )}

      <div className="p-6 lg:p-8 flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-center gap-3 mb-1">
          <h3 className="text-xl font-bold text-white">{name}</h3>
          {badge && (
            <span
              className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
              style={{ backgroundColor: 'rgba(118,158,219,0.15)', color: '#769EDB' }}
            >
              {badge}
            </span>
          )}
        </div>
        <p className="text-xs text-[#94A3B8] mb-6">{audience}</p>

        {/* Features */}
        <ul className="space-y-3 mb-6 flex-1">
          {features.map((f) => (
            <li key={f} className="flex items-start gap-2 text-sm text-[#94A3B8]">
              <span style={{ color: '#769EDB' }} className="mt-0.5 shrink-0">✓</span>
              {f}
            </li>
          ))}
        </ul>

        {/* Value proposition */}
        <p className="text-sm text-white/80 mb-6 leading-relaxed border-t border-white/5 pt-6">
          {valueProposition}
        </p>

        {/* CTA */}
        <a
          href={cta.href}
          className="block text-center py-3 rounded-lg font-semibold text-sm transition-all duration-300"
          style={
            highlighted
              ? {
                  backgroundColor: '#769EDB',
                  color: '#fff',
                  boxShadow: '0 0 20px rgba(118,158,219,0.25)',
                }
              : {
                  border: '1px solid rgba(118,158,219,0.3)',
                  color: '#769EDB',
                }
          }
        >
          {cta.label}
        </a>
      </div>
    </div>
  );
}
