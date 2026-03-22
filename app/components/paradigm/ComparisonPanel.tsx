'use client';

import { ScrollReveal } from '../shared/ScrollReveal';
import { DataTags } from './DataTags';

export function ComparisonPanel() {
  return (
    <div className="relative flex flex-col lg:flex-row items-stretch w-full">
      {/* ─── Left card: Reactive Mode ─── */}
      <ScrollReveal direction="left" className="w-full lg:w-[46%]">
        <div
          className="relative rounded-2xl h-full"
          style={{
            padding: '2rem 2.5rem',
            background:
              'radial-gradient(ellipse at 30% 40%, rgba(255,90,50,0.15), transparent 60%), rgba(15,8,8,0.9)',
            border: '1px solid rgba(255,77,77,0.5)',
            boxShadow:
              '0 0 25px rgba(255,77,77,0.35), 0 0 50px rgba(255,77,77,0.2), 0 0 100px rgba(255,77,77,0.12), inset 0 0 60px rgba(255,77,77,0.04)',
            backdropFilter: 'blur(16px)',
          }}
        >
          <h3
            className="font-bold font-heading tracking-tight leading-snug"
            style={{ fontSize: '1.6rem', color: '#e87058', marginBottom: '1.25rem' }}
          >
            傳統監測：盲目博弈的代價
          </h3>
          <p className="text-slate-400" style={{ fontSize: '15px', lineHeight: '1.9', letterSpacing: '0.025em' }}>
            等數據出現在螢幕上，您的品牌已在失血。此時的補救，只是昂貴的徒勞。
          </p>
        </div>
      </ScrollReveal>

      {/* ─── VS Divider ─── */}
      <div
        className="flex items-center justify-center lg:flex-col shrink-0"
        aria-hidden="true"
        style={{ padding: '1rem 0' }}
      >
        {/* Mobile */}
        <div className="flex lg:hidden w-full items-center" style={{ gap: '0.75rem' }}>
          <div className="flex-1" style={{ height: '1px', background: 'linear-gradient(to right, rgba(255,77,77,0.4), rgba(255,255,255,0.1), transparent)' }} />
          <span
            className="font-mono shrink-0 flex items-center justify-center"
            style={{
              fontSize: '11px',
              color: '#cbd5e1',
              letterSpacing: '3px',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              background: '#0c1220',
            }}
          >
            VS
          </span>
          <div className="flex-1" style={{ height: '1px', background: 'linear-gradient(to left, rgba(0,242,255,0.4), rgba(255,255,255,0.1), transparent)' }} />
        </div>

        {/* Desktop */}
        <div className="hidden lg:flex flex-col items-center h-full" style={{ padding: '1.5rem 0.75rem' }}>
          <div
            className="flex-1"
            style={{
              width: '1px',
              background: 'linear-gradient(to bottom, rgba(255,77,77,0.6), rgba(255,255,255,0.15), transparent)',
            }}
          />
          <span
            className="font-mono shrink-0 flex items-center justify-center"
            style={{
              fontSize: '11px',
              color: '#cbd5e1',
              letterSpacing: '3px',
              border: '1px solid rgba(255,255,255,0.25)',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              background: '#0c1220',
              margin: '0.75rem 0',
            }}
          >
            VS
          </span>
          <div
            className="flex-1"
            style={{
              width: '1px',
              background: 'linear-gradient(to top, rgba(0,242,255,0.6), rgba(255,255,255,0.15), transparent)',
            }}
          />
        </div>
      </div>

      {/* ─── Right card: Proactive Mode ─── */}
      <ScrollReveal direction="right" delay={0.15} className="w-full lg:w-[54%]">
        <div
          className="relative rounded-2xl h-full"
          style={{
            padding: '2rem 2.5rem',
            background:
              'radial-gradient(ellipse at 70% 40%, rgba(0,242,255,0.12), transparent 60%), rgba(8,15,30,0.9)',
            border: '1px solid rgba(0,242,255,0.45)',
            boxShadow:
              '0 0 25px rgba(0,242,255,0.3), 0 0 50px rgba(0,242,255,0.18), 0 0 100px rgba(0,242,255,0.1), inset 0 0 60px rgba(0,242,255,0.03)',
            backdropFilter: 'blur(16px)',
          }}
        >
          <h3
            className="font-bold font-heading tracking-tight leading-snug text-aurora-cyan"
            style={{ fontSize: '1.6rem', marginBottom: '1.25rem' }}
          >
            戰略導航：上帝視角的劇本
          </h3>
          <p className="text-slate-400" style={{ fontSize: '15px', lineHeight: '1.9', letterSpacing: '0.025em' }}>
            在正式行動前模擬千次，精準鎖定 T+36h 的黃金窗口。看穿 80 個利益方的底牌，讓局勢隨您起舞。
          </p>
          <DataTags />
        </div>
      </ScrollReveal>
    </div>
  );
}
