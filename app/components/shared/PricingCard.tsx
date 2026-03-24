'use client';

import { useRef, ReactNode } from 'react';
import { useInView, useReducedMotion, cssTransition } from '@/app/lib/animations';

interface PricingCardProps {
  readonly name: string;
  readonly badge?: string;
  readonly audience: string;
  readonly priceDisplay?: string;
  readonly priceSuffix?: string;
  readonly originalPriceDisplay?: string;
  readonly socialProof?: string;
  readonly features: readonly string[];
  readonly valueProposition: ReactNode;
  readonly commitment?: string;
  readonly cta: { label: string; href: string; variant?: 'primary' | 'secondary' | 'outline' };
  readonly highlighted?: boolean;
  readonly delay?: number;
}

export function PricingCard({
  name,
  badge,
  audience,
  priceDisplay,
  priceSuffix,
  originalPriceDisplay,
  socialProof,
  features,
  valueProposition,
  commitment,
  cta,
  highlighted = false,
  delay = 0,
}: PricingCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '-60px' });
  const reduced = useReducedMotion();

  const ctaVariant = cta.variant ?? (highlighted ? 'primary' : 'outline');

  return (
    <div
      ref={ref}
      className={`relative rounded-xl overflow-hidden flex flex-col ${highlighted ? 'lg:scale-105 z-10' : ''}`}
      style={{
        backgroundColor: highlighted ? 'rgba(30,41,59,0.75)' : 'rgba(17,24,39,0.7)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: highlighted
          ? '2px solid rgba(118,158,219,0.5)'
          : '1px solid rgba(118,158,219,0.1)',
        boxShadow: highlighted
          ? '0 0 60px rgba(118,158,219,0.18), 0 0 120px rgba(118,158,219,0.06), inset 0 0 30px rgba(118,158,219,0.05)'
          : 'none',
        opacity: reduced ? 1 : inView ? 1 : 0,
        transform: reduced ? 'none' : inView ? 'translateY(0)' : 'translateY(20px)',
        transition: cssTransition(['opacity', 'transform', 'box-shadow'], 0.6, delay),
      }}
    >
      {/* Highlighted top accent line */}
      {highlighted && (
        <div
          className="h-[3px] w-full relative"
          style={{
            background: 'linear-gradient(90deg, transparent, #769EDB, #CAE0FF, #769EDB, transparent)',
          }}
        >
          {/* Animated glow pulse on the line */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(202,224,255,0.7), transparent)',
              animation: reduced ? 'none' : 'glowPulse 2.4s ease-in-out infinite',
            }}
          />
        </div>
      )}

      {/* Ambient glow backdrop for highlighted card */}
      {highlighted && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 0%, rgba(118,158,219,0.12) 0%, transparent 55%)',
          }}
        />
      )}

      <div className="p-6 lg:p-8 flex flex-col flex-1 relative">
        {/* Header */}
        <div className="flex justify-between items-start mb-2">
          <h3 className={`text-[1.35rem] font-bold ${highlighted ? 'text-white drop-shadow-sm' : 'text-white/90'}`}>
            {name}
          </h3>
          {badge && (
            <span
              className="text-xs font-bold px-2.5 py-1 rounded-full shadow-sm"
              style={{
                background: 'linear-gradient(135deg, rgba(118,158,219,0.85), rgba(90,134,201,0.95))',
                color: '#FFFFFF',
                border: '1px solid rgba(255,255,255,0.15)',
              }}
            >
              {badge}
            </span>
          )}
        </div>
        
        {/* Audience */}
        <p className="text-sm text-[#94A3B8] mb-4 min-h-[40px] leading-relaxed">
          {audience}
        </p>

        {/* Value proposition — Moved directly below audience to anchor value first */}
        <div className={`mb-6 pb-6 border-b ${highlighted ? 'border-[#769EDB]/20' : 'border-white/10'}`}>
          <p className={`text-[15px] font-medium leading-relaxed tracking-wide ${highlighted ? 'text-white' : 'text-slate-200'}`}>
            {valueProposition}
          </p>
        </div>

        {/* Price Block */}
        {priceDisplay && (
          <div className="mb-8 flex flex-col justify-center min-h-[72px]">
            {originalPriceDisplay ? (
              <div className="flex items-center gap-2 mb-1.5 opacity-100 transition-opacity">
                <span className="text-sm font-medium text-[#607080] line-through">
                  {originalPriceDisplay}
                </span>
                <span className="text-xs font-bold text-[#10B981] bg-[#10B981]/15 px-2.5 py-0.5 rounded-sm border border-[#10B981]/20 tracking-wide">
                  年繳省下 20%
                </span>
              </div>
            ) : (
              // Empty spacer when no original price to keep alignment
              priceDisplay !== '企業客製報價' && priceDisplay !== '免費開始' && <div className="h-6 mb-1.5" />
            )}
            
            <div className="flex items-baseline gap-2 flex-wrap drop-shadow-md">
              <span className={`font-extrabold tracking-tight leading-none ${highlighted ? 'text-white text-[2.75rem]' : 'text-white/95 text-[2.25rem]'}`}>
                {priceDisplay}
              </span>
              {priceSuffix && (
                <span className="text-sm font-medium text-[#94A3B8]">{priceSuffix}</span>
              )}
            </div>
          </div>
        )}

        {/* CTA Button */}
        <div className="mb-8">
          <a
            href={cta.href}
            className={`block text-center py-3.5 rounded-lg font-bold text-sm transition-all duration-300 ${highlighted ? 'hover:scale-[1.03]' : 'hover:scale-[1.02]'}`}
            style={
              ctaVariant === 'primary'
                ? {
                    background: 'linear-gradient(135deg, #769EDB, #5A86C9)',
                    color: '#fff',
                    boxShadow: '0 4px 14px 0 rgba(118,158,219, 0.39)',
                  }
                : ctaVariant === 'secondary'
                ? {
                    backgroundColor: 'rgba(118,158,219,0.12)',
                    color: '#A8C4F0',
                    border: '1px solid rgba(118,158,219,0.3)',
                    boxShadow: '0 4px 14px 0 rgba(0,0,0, 0.1)',
                  }
                : {
                    border: '1px solid rgba(118,158,219,0.35)',
                    color: '#A8C4F0',
                    backgroundColor: 'transparent',
                    boxShadow: '0 4px 14px 0 rgba(0,0,0, 0.05)',
                  }
            }
          >
            {cta.label}
          </a>
          
          {/* Commitment or Social Proof right below button to reduce friction */}
          {(commitment || socialProof) && (
            <p className={`text-center mt-3 text-xs font-medium tracking-wide ${socialProof ? 'text-[#A8C4F0]' : 'text-[#607080]'}`}>
              {socialProof || commitment}
            </p>
          )}
        </div>

        {/* Features */}
        <p className="text-sm font-bold text-white mb-4">包含以下功能：</p>
        <ul className="space-y-3 mb-6 flex-1">
          {features.map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-[14px] text-[#94A3B8] leading-relaxed">
              <span style={{ color: '#769EDB' }} className="mt-[3px] shrink-0 font-bold">✓</span>
              {f}
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
}
