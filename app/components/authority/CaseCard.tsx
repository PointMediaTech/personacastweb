'use client';

import { AnimatedCounter } from './AnimatedCounter';
import type { CaseStudy } from './strategicRecordsData';

interface CaseCardProps {
  readonly study: CaseStudy;
  readonly index: number;
}

export function CaseCard({ study, index }: CaseCardProps) {
  const isLemon = study.id === 'case-01';
  const isCyan = study.id === 'case-02';
  const isElectric = isLemon || isCyan;

  // Per-card electric glow: sharp core + soft halo
  const electricGlow = isLemon
    ? `0 0 5px rgba(234, 255, 0, 0.7), 0 0 15px rgba(234, 255, 0, 0.3)`
    : isCyan
      ? `0 0 5px rgba(0, 255, 255, 0.7), 0 0 15px rgba(0, 255, 255, 0.3)`
      : undefined;

  return (
    <div
      className="relative w-full rounded-2xl backdrop-blur-xl overflow-hidden"
      style={{
        background: isElectric
          ? `rgba(0,0,0,1)`
          : `linear-gradient(135deg, rgba(8,12,20,0.97) 0%, rgba(5,7,10,0.98) 100%)`,
        border: `1px solid ${study.accentColor}33`,
        boxShadow: `0 0 40px ${study.accentGlow.replace('0.6', '0.08')}, 0 -1px 0 rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.04)`,
      }}
    >
      {/* Top accent bar — thicker + brighter for electric cards */}
      <div
        className={isElectric ? "h-[4px] w-full" : "h-[3px] w-full"}
        style={{
          background: `linear-gradient(90deg, transparent 5%, ${study.accentColor} 50%, transparent 95%)`,
          filter: isElectric ? 'brightness(1.6)' : undefined,
        }}
      />

      <div className="px-6 py-10 md:px-10 md:py-14 lg:px-12 lg:py-16">
        {/* Header row */}
        <div className="flex items-start justify-between gap-4 mb-8">
          <div className="flex items-center gap-5">
            {/* Case number badge */}
            <div
              className="shrink-0 w-16 h-16 rounded-lg flex items-center justify-center font-mono text-xl font-bold border"
              style={{
                color: study.accentColor,
                borderColor: `${study.accentColor}55`,
                background: `${study.accentColor}15`,
                boxShadow: isElectric
                  ? undefined
                  : `0 0 10px ${study.accentGlow.replace('0.6', '0.12')}`,
                textShadow: isElectric
                  ? electricGlow
                  : `0 0 4px ${study.accentColor}`,
              }}
            >
              {study.caseNumber}
            </div>
            <div>
              <p
                className="text-xs font-mono font-semibold tracking-[3px] uppercase mb-2"
                style={{
                  color: study.accentColor,
                  textShadow: isElectric
                    ? electricGlow
                    : `0 0 6px ${study.accentGlow.replace('0.6', '0.5')}`,
                }}
              >
                {study.subtitle}
              </p>
              <h3 className="text-xl md:text-2xl font-heading font-extrabold text-white leading-tight">
                {study.title}
              </h3>
            </div>
          </div>

          {/* Case label tag */}
          <span
            className="hidden sm:inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-1.5 text-sm font-mono font-semibold tracking-wider border"
            style={{
              color: study.accentColor,
              borderColor: `${study.accentColor}66`,
              background: `${study.accentColor}18`,
              boxShadow: isElectric
                ? undefined
                : `0 0 12px ${study.accentGlow.replace('0.6', '0.15')}`,
              textShadow: isElectric
                ? electricGlow
                : `0 0 3px ${study.accentGlow.replace('0.6', '0.5')}`,
            }}
          >
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{
                backgroundColor: study.accentColor,
                boxShadow: isElectric
                  ? `0 0 6px ${study.accentColor}`
                  : `0 0 4px ${study.accentColor}`,
              }}
            />
            案例 {study.caseNumber}：{study.label}
          </span>
        </div>

        {/* Outcome description */}
        <p className="text-base md:text-lg text-zinc-100 leading-relaxed mb-10 max-w-2xl">
          {study.outcome}
        </p>

        {/* Stats + Status row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-8">
          {/* Stat counters */}
          <div className="flex gap-10 md:gap-16">
            {study.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  accentColor={study.accentColor}
                  glowStyle={electricGlow}
                  className={isElectric
                    ? "text-5xl md:text-6xl lg:text-7xl font-mono font-extrabold tabular-nums"
                    : "text-5xl md:text-6xl lg:text-7xl font-mono font-bold tabular-nums"
                  }
                />
                <span className="text-xs font-mono text-zinc-300 mt-2 tracking-wider">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* Status badge */}
          <div
            className="inline-flex items-center gap-2.5 rounded-lg px-5 py-2.5 font-mono text-sm font-semibold tracking-wider border"
            style={{
              color: study.accentColor,
              borderColor: `${study.accentColor}55`,
              background: `${study.accentColor}14`,
              boxShadow: isElectric
                ? undefined
                : `0 0 16px ${study.accentGlow.replace('0.6', '0.15')}`,
              textShadow: isElectric
                ? electricGlow
                : `0 0 4px ${study.accentGlow.replace('0.6', '0.5')}`,
            }}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{
                backgroundColor: study.accentColor,
                boxShadow: isElectric
                  ? `0 0 6px ${study.accentColor}`
                  : `0 0 5px ${study.accentColor}`,
              }}
            />
            [ {study.status} ]
          </div>
        </div>
      </div>
    </div>
  );
}
