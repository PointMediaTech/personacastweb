'use client';

import { PersonaLabCard } from './PersonaLabCard';
import { StrategyGraphCard } from './StrategyGraphCard';
import { CastingArenaCard } from './CastingArenaCard';

export function PillarsSection() {
  return (
    <section
      id="pillars"
      aria-label="從洞察到贏局"
      className="relative min-h-screen flex flex-col justify-center pt-[90px] pb-[65px] lg:pt-[95px] lg:pb-[68px] overflow-hidden"
    >
      {/* Multi-layer background */}

      {/* Base: wide strategic-blue radial glow (mirrors hero atmosphere) */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 130% 90% at 50% 55%, rgba(118,158,219,0.10) 0%, rgba(2,6,23,0) 68%)' }}
      />

      {/* Per-card ambient glows — all use strategic-blue (#769EDB) like hero */}
      {/* Left card glow */}
      <div className="absolute pointer-events-none"
        style={{ top: '20%', left: '5%', width: '35%', height: '65%',
          background: 'radial-gradient(ellipse, rgba(118,158,219,0.20) 0%, transparent 68%)',
          filter: 'blur(40px)' }}
      />
      {/* Center card glow */}
      <div className="absolute pointer-events-none"
        style={{ top: '15%', left: '30%', width: '40%', height: '72%',
          background: 'radial-gradient(ellipse, rgba(118,158,219,0.15) 0%, transparent 65%)',
          filter: 'blur(50px)' }}
      />
      {/* Right card glow — slight gold tint like hero's secondary glow */}
      <div className="absolute pointer-events-none"
        style={{ top: '20%', right: '4%', width: '35%', height: '65%',
          background: 'radial-gradient(ellipse, rgba(118,158,219,0.17) 0%, transparent 68%)',
          filter: 'blur(40px)' }}
      />

      {/* Dot-grid texture — use strategic-blue tone */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(118,158,219,0.55) 1.2px, transparent 1.2px)',
          backgroundSize: '36px 36px',
          opacity: 0.35,
        }}
      />

      {/* Top-center title area glow */}
      <div className="absolute pointer-events-none"
        style={{ top: '-5%', left: '20%', width: '60%', height: '40%',
          background: 'radial-gradient(ellipse, rgba(118,158,219,0.12) 0%, transparent 60%)',
          filter: 'blur(60px)' }}
      />

      <div className="relative mx-auto w-full px-10 lg:px-[78px]">
        <h2 className="text-center text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-8 lg:mb-[50px] font-heading tracking-tight leading-[1.1]">
          從洞察到贏局：主導戰場的決策鏈
        </h2>

        <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-[70px]">
          <PersonaLabCard />
          <StrategyGraphCard />
          <CastingArenaCard />

          {/* Sparkle icon bottom right */}
          <div className="absolute -bottom-10 -right-1 text-white/15">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L13.5 9L20 12L13.5 15L12 22L10.5 15L4 12L10.5 9L12 2Z" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

