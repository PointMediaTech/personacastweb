'use client';
import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { HeroContent } from './HeroContent';
import { LiveBadge } from './LiveBadge';
import { SimulationTheater } from './SimulationTheater';
import type { DecisionKey } from './theaterData';

// Heavy canvas/animation components — defer past LCP so the H1 paints first.
const ChaosFlowCanvas = dynamic(
  () => import('./ChaosFlowCanvas').then((m) => ({ default: m.ChaosFlowCanvas })),
  { ssr: false },
);
const DataRainCanvas = dynamic(
  () => import('./DataRainCanvas').then((m) => ({ default: m.DataRainCanvas })),
  { ssr: false },
);

export function HeroSection() {
  const [theaterActive, setTheaterActive] = useState(false);
  const [selectedDecision, setSelectedDecision] = useState<DecisionKey | null>(null);

  const handleToggleTheater = useCallback(() => {
    setTheaterActive((prev) => {
      if (prev) setSelectedDecision(null);
      return !prev;
    });
  }, [theaterActive]);

  return (
    <section aria-label="英雄區：AI 戰略預演平台" className="relative h-screen bg-deep-space overflow-hidden">
      {/* Atmospheric glow — z-0 */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: [
            'radial-gradient(ellipse 65% 75% at 75% 45%, rgba(118,158,219,0.14) 0%, rgba(118,158,219,0.04) 40%, transparent 60%)',
            'radial-gradient(ellipse 35% 35% at 60% 40%, rgba(255,184,0,0.03) 0%, transparent 50%)',
          ].join(', '),
        }}
      />

      {/* DataRain — z-1, left 40% background texture */}
      <DataRainCanvas />

      {/* ChaosFlow — z-2, full-width flow lines */}
      <ChaosFlowCanvas
        simulationActive={theaterActive}
        selectedDecision={selectedDecision}
      />

      {/* Left scrim — z-[2], same z as ChaosFlow but renders on top via DOM order */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, rgba(2,6,23,0.95) 0%, rgba(2,6,23,0.85) 25%, rgba(2,6,23,0.4) 45%, transparent 62%)',
        }}
      />

      {/* Text content — z-10 */}
      <div
        className="relative z-20 h-screen flex items-center"
        style={{ paddingLeft: 'clamp(2.5rem, 8vw, 10rem)', paddingRight: '1.5rem', paddingBottom: '4rem' }}
      >
        <div className="w-full max-w-xl">
          <HeroContent
            theaterActive={theaterActive}
            onToggleTheater={handleToggleTheater}
            selectedDecision={selectedDecision}
          />
        </div>
      </div>

      {/* SimulationTheater — z-15, HUD labels / decision cards */}
      <SimulationTheater
        theaterActive={theaterActive}
        selectedDecision={selectedDecision}
        onSelectDecision={setSelectedDecision}
      />

      <LiveBadge />
    </section>
  );
}
