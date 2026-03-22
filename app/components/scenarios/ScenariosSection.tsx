'use client';

import { ScenarioCard } from './ScenarioCard';
import { scenarios } from './scenarioData';

export function ScenariosSection() {
  return (
    <section
      id="scenarios"
      aria-label="應用場景"
      className="relative flex flex-col overflow-hidden"
      style={{
        backgroundColor: '#080B10',
        height: '100vh',
        maxHeight: '100vh',
      }}
    >
      {/* ── Background layers ── */}

      {/* Teal-tinted radial atmosphere */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 140% 100% at 50% 45%, rgba(0,80,60,0.14) 0%, rgba(0,60,70,0.07) 35%, transparent 70%)',
        }}
      />

      {/* Center glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(0,180,160,0.05) 0%, transparent 60%)',
        }}
      />

      {/* 50×50 grid lines — opacity 0.03 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />

      {/* ── Content wrapper — centered with controlled gap ── */}
      <div className="relative flex flex-col justify-center items-center flex-1 min-h-0 mx-auto w-full max-w-[1800px] px-4 lg:px-6 2xl:px-10 pt-14 lg:pt-16 pb-4 lg:pb-6 gap-8 lg:gap-14">
        {/* ── Header — tight spacing ── */}
        <div className="text-center flex-shrink-0">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-2 font-heading tracking-tight leading-[1.1]">
            讓未來，按計畫發生。
          </h2>
          <p className="text-lg md:text-xl lg:text-[1.55rem] text-[#8892B0] max-w-4xl mx-auto leading-[1.8]">
            在變數發生前 72 小時鎖定勝局。排除所有不確定性，將決策導向必然的結果。
          </p>
        </div>

        {/* ── Three pillars — natural height, not stretched ── */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr_auto_1fr] gap-y-8 lg:gap-x-5 items-stretch">
          {/* Module 01 */}
          <ScenarioCard data={scenarios[0]} index={0} />

          {/* Divider 1 */}
          <div className="hidden lg:flex flex-col items-center justify-center self-stretch py-12">
            <div className="w-px flex-1 bg-gradient-to-b from-transparent via-white/[0.07] to-transparent" />
            <div className="my-2 text-white/15">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L13.5 9L20 12L13.5 15L12 22L10.5 15L4 12L10.5 9L12 2Z" />
              </svg>
            </div>
            <div className="w-px flex-1 bg-gradient-to-b from-transparent via-white/[0.07] to-transparent" />
          </div>

          {/* Module 02 */}
          <ScenarioCard data={scenarios[1]} index={1} />

          {/* Divider 2 */}
          <div className="hidden lg:flex flex-col items-center justify-center self-stretch py-12">
            <div className="w-px flex-1 bg-gradient-to-b from-transparent via-white/[0.07] to-transparent" />
            <div className="my-2 text-white/15">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L13.5 9L20 12L13.5 15L12 22L10.5 15L4 12L10.5 9L12 2Z" />
              </svg>
            </div>
            <div className="w-px flex-1 bg-gradient-to-b from-transparent via-white/[0.07] to-transparent" />
          </div>

          {/* Module 03 */}
          <ScenarioCard data={scenarios[2]} index={2} />
        </div>
      </div>
    </section>
  );
}
