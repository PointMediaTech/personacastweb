'use client';

import { useRef } from 'react';
import { useInView, useReducedMotion, cssTransition } from '@/app/lib/animations';

interface TrustStat {
  readonly value: string;
  readonly label: string;
}

interface TrustBarProps {
  readonly stats: readonly TrustStat[];
  readonly badges?: readonly string[];
}

export function TrustBar({ stats, badges }: TrustBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '-40px' });
  const reduced = useReducedMotion();

  return (
    <div
      ref={ref}
      className="mx-auto max-w-5xl px-6"
      style={{
        opacity: reduced ? 1 : inView ? 1 : 0,
        transform: reduced ? 'none' : inView ? 'translateY(0)' : 'translateY(16px)',
        transition: cssTransition(['opacity', 'transform'], 0.6, 0),
      }}
    >
      <div
        className="rounded-2xl px-8 py-8"
        style={{
          background: 'rgba(17,24,39,0.5)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(118,158,219,0.1)',
        }}
      >
        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="text-center"
              style={{
                opacity: reduced ? 1 : inView ? 1 : 0,
                transform: reduced ? 'none' : inView ? 'translateY(0)' : 'translateY(12px)',
                transition: cssTransition(['opacity', 'transform'], 0.5, i * 0.08),
              }}
            >
              <div
                className="text-2xl md:text-3xl font-extrabold mb-1"
                style={{
                  background: 'linear-gradient(135deg, #A8C4F0, #769EDB)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {stat.value}
              </div>
              <div className="text-sm text-[#607080] leading-tight">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Divider */}
        {badges && badges.length > 0 && (
          <>
            <div
              className="h-px w-full mb-6"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(118,158,219,0.15), transparent)' }}
            />

            {/* Badges row */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              {badges.map((badge) => (
                <span
                  key={badge}
                  className="text-sm px-3.5 py-1.5 rounded-full font-medium"
                  style={{
                    backgroundColor: 'rgba(118,158,219,0.08)',
                    color: '#94A3B8',
                    border: '1px solid rgba(118,158,219,0.12)',
                  }}
                >
                  {badge}
                </span>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
