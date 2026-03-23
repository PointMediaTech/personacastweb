'use client';
import { useMemo } from 'react';
import { useReducedMotion, useMountAnimation, cssTransition, EASE_CSS } from '@/app/lib/animations';
import { Play, FileBarChart } from 'lucide-react';
import { DECISION_RESULTS, type DecisionKey } from './theaterData';

/**
 * HeroContent — Left wing text.
 *
 * Colors (NON-NEGOTIABLE):
 *   "掌握變數" → Pure White #FFFFFF
 *   "定義結局" → Luminous Blue #93C5FD with subtle glow
 *   Subtitle → Off-White #CBD5E1
 *   Primary CTA (inactive) → Matte Deep Teal-Blue #2A7B8B bg, Dark Blue #0A2540 text
 *   Primary CTA (active) → Transparent bg, Gold #FFB800 border/text
 */

/* ── Static style objects (never change, allocated once at module level) ── */

const BLUE_GLOW_STYLE: React.CSSProperties = {
  color: '#93C5FD',
  textShadow: '0 0 30px rgba(147,197,253,0.3), 0 0 60px rgba(147,197,253,0.1)',
};

const PULSE_STYLE: React.CSSProperties = {
  animation: 'pulse-opacity 1.5s ease-in-out infinite',
};

const SECONDARY_CTA_STYLE: React.CSSProperties = { color: '#CBD5E1' };

/* ── Helpers ── */

function slideLeftStyle(mounted: boolean, reduced: boolean, delay: number): React.CSSProperties {
  return {
    opacity: mounted ? 1 : 0,
    transform: mounted
      ? 'translateX(0)'
      : (reduced ? 'none' : 'translateX(-30px)'),
    transition: reduced
      ? cssTransition(['opacity'], 0.5, delay)
      : cssTransition(['opacity', 'transform'], 0.9, delay),
  };
}

interface HeroContentProps {
  readonly theaterActive: boolean;
  readonly onToggleTheater: () => void;
  readonly selectedDecision: DecisionKey | null;
}
export function HeroContent({ theaterActive, onToggleTheater, selectedDecision }: HeroContentProps) {
  const reduced = useReducedMotion();
  const mounted = useMountAnimation();
  const conflictData = selectedDecision ? DECISION_RESULTS[selectedDecision] : null;
  const conflictDisplay = conflictData ? conflictData.conflictValue : 72;
  const conflictColor = conflictData ? conflictData.conflictColor : undefined;

  // Memoize slide-left entrance styles (depend on mounted + reduced)
  const slideLeft01 = useMemo(() => slideLeftStyle(mounted, reduced, 0.1), [mounted, reduced]);
  const slideLeft02 = useMemo(() => slideLeftStyle(mounted, reduced, 0.2), [mounted, reduced]);
  const slideLeft04 = useMemo(() => slideLeftStyle(mounted, reduced, 0.4), [mounted, reduced]);
  const slideLeft06 = useMemo(() => slideLeftStyle(mounted, reduced, 0.6), [mounted, reduced]);

  // Memoize composite H1 style (static typography + entrance animation)
  const h1Style = useMemo(() => ({
    fontSize: 'clamp(3.5rem, 8vw, 7.5rem)' as const,
    lineHeight: 1.2,
    letterSpacing: '-0.02em',
    ...slideLeft02,
  }), [slideLeft02]);

  // Memoize subtitle style (static color/margin + entrance animation)
  const subtitleStyle = useMemo(() => ({
    color: '#CBD5E1',
    marginBottom: 'calc(2rem + 30px)',
    ...slideLeft04,
  }), [slideLeft04]);

  // Memoize primary CTA button style (depends on theaterActive)
  const primaryCtaStyle = useMemo(() => ({
    backgroundColor: 'transparent' as const,
    color: theaterActive ? '#FFB800' : '#4DC8D2',
    padding: '0.65rem 1.75rem',
    fontSize: '15px',
    border: theaterActive ? '1.5px solid #FFB800' : '1.5px solid #4DC8D2',
  }), [theaterActive]);

  // Memoize bottom status bar style (depends on mounted)
  const statusBarStyle = useMemo(() => ({
    left: 'clamp(2.5rem, 8vw, 10rem)',
    opacity: mounted ? 1 : 0,
    transition: cssTransition(['opacity'], 1, 2.6),
  }), [mounted]);

  // Memoize sentiment color style (depends on conflictColor)
  const sentimentStyle = useMemo(() => ({
    color: conflictColor || undefined,
    transition: `opacity 0.3s ${EASE_CSS}`,
  }), [conflictColor]);

  return (
    <>
      <div className="flex flex-col">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-8" style={slideLeft01}>
          <div className="h-[1px] w-10 bg-strategic-blue/40" />
          <span className="font-mono text-[13px] tracking-[0.25em] text-strategic-blue/60 uppercase">
            AI-Powered Simulation
          </span>
        </div>

        {/* H1 — line-height: 1.2, clear gap between lines */}
        <h1
          className="font-body font-black mb-10"
          style={h1Style}
        >
          <span className="text-white block">
            掌握變數
          </span>
          <span
            className="block mt-3"
            style={BLUE_GLOW_STYLE}
          >
            定義結局
          </span>
        </h1>

        {/* Subtitle — #CBD5E1 */}
        <p
          className="text-base md:text-lg leading-relaxed max-w-lg"
          style={subtitleStyle}
        >
          領先{' '}
          <span className="font-mono text-insight-gold font-bold">72</span>{' '}
          小時的 AI 戰略預演，讓每個決策都有數據撐腰。
        </p>

        {/* CTAs — Primary: Strategic Blue toggle (see spec) */}
        <div className="flex items-center gap-4" style={slideLeft06}>
          <button
            type="button"
            onClick={onToggleTheater}
            aria-pressed={theaterActive}
            className="group inline-flex items-center gap-3 rounded-full text-[15px] font-bold tracking-wide transition-all duration-400 focus-visible:ring-2 focus-visible:ring-strategic-blue/60 focus-visible:ring-offset-2 focus-visible:ring-offset-deep-space hover:brightness-110"
            style={primaryCtaStyle}
          >
            {theaterActive ? (
              <>
                <span
                  className="inline-block w-2 h-2 rounded-full bg-[#FFB800]"
                  style={PULSE_STYLE}
                />
                推演運行中
              </>
            ) : (
              <>
                <Play className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                啟動推演劇場
              </>
            )}
          </button>
          <button
            type="button"
            className="group inline-flex items-center gap-2 border border-white/10 px-5 py-2.5 text-[15px] font-bold tracking-wide transition-all duration-400 hover:border-white/25"
            style={SECONDARY_CTA_STYLE}
          >
            <FileBarChart className="h-3.5 w-3.5" />
            檢視戰略報告
          </button>
        </div>
      </div>

      {/* Bottom status bar — JetBrains Mono, opacity 0.5 */}
      <div
        className="absolute bottom-8 z-30"
        style={statusBarStyle}
      >
        <div className="flex items-center gap-5 opacity-70">
          <div className="flex items-center gap-2">
            <span
              className="inline-block h-1.5 w-1.5 rounded-full bg-dried-rose"
              style={PULSE_STYLE}
            />
            <span className="font-mono text-[12px] text-dried-rose tracking-[0.15em] uppercase">
              2 Agents Active
            </span>
          </div>
          <span className="font-mono text-[12px] text-mist-blue-gray tracking-[0.12em] uppercase">
            Crisis Window: <span className="text-strategic-blue">T-56H</span>
          </span>
          <span className="font-mono text-[12px] text-mist-blue-gray tracking-[0.12em] uppercase">
            Sentiment:{' '}
            <span
              key={conflictDisplay}
              className={conflictColor ? '' : 'text-insight-gold'}
              style={sentimentStyle}
            >
              {conflictDisplay}%
            </span>
          </span>
          <span className="font-mono text-[12px] text-mist-blue-gray tracking-[0.12em] uppercase">
            Scenarios: <span className="text-white">3.4M+</span>
          </span>
        </div>
      </div>
    </>
  );
}
