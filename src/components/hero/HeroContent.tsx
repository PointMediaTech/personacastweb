import { motion, useReducedMotion } from 'framer-motion';
import { Play, FileBarChart } from 'lucide-react';
import { DECISION_RESULTS, EASE, type DecisionKey } from './theaterData';

function slideLeft(delay: number, reduced: boolean | null) {
  if (reduced) {
    return { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.5, delay, ease: EASE } };
  }
  return {
    initial: { x: -30, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { duration: 0.9, delay, ease: EASE },
  };
}

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
interface HeroContentProps {
  readonly theaterActive: boolean;
  readonly onToggleTheater: () => void;
  readonly selectedDecision: DecisionKey | null;
}
export function HeroContent({ theaterActive, onToggleTheater, selectedDecision }: HeroContentProps) {
  const reduced = useReducedMotion();
  const conflictData = selectedDecision ? DECISION_RESULTS[selectedDecision] : null;
  const conflictDisplay = conflictData ? conflictData.conflictValue : 72;
  const conflictColor = conflictData ? conflictData.conflictColor : undefined;

  return (
    <>
      <div className="flex flex-col">
        {/* Eyebrow */}
        <motion.div {...slideLeft(0.1, reduced)} className="flex items-center gap-3 mb-8">
          <div className="h-[1px] w-10 bg-strategic-blue/40" />
          <span className="font-mono text-[13px] tracking-[0.25em] text-strategic-blue/60 uppercase">
            AI-Powered Simulation
          </span>
        </motion.div>

        {/* H1 — line-height: 1.2, clear gap between lines */}
        <motion.h1
          {...slideLeft(0.2, reduced)}
          className="font-body font-black mb-10"
          style={{
            fontSize: 'clamp(3.5rem, 8vw, 7.5rem)',
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
          }}
        >
          <span className="text-white block">
            掌握變數
          </span>
          <span
            className="block mt-3"
            style={{
              color: '#93C5FD',
              textShadow: '0 0 30px rgba(147,197,253,0.3), 0 0 60px rgba(147,197,253,0.1)',
            }}
          >
            定義結局
          </span>
        </motion.h1>

        {/* Subtitle — #CBD5E1 */}
        <motion.p
          {...slideLeft(0.4, reduced)}
          className="text-base md:text-lg leading-relaxed max-w-lg"
          style={{ color: '#CBD5E1', marginBottom: 'calc(2rem + 30px)' }}
        >
          領先{' '}
          <span className="font-mono text-insight-gold font-bold">72</span>{' '}
          小時的 AI 戰略預演，讓每個決策都有數據撐腰。
        </motion.p>

        {/* CTAs — Primary: Strategic Blue toggle (see spec) */}
        <motion.div {...slideLeft(0.6, reduced)} className="flex items-center gap-4">
          <button
            type="button"
            onClick={onToggleTheater}
            aria-pressed={theaterActive}
            className="group inline-flex items-center gap-3 rounded-full text-[15px] font-bold tracking-wide transition-all duration-400 focus-visible:ring-2 focus-visible:ring-strategic-blue/60 focus-visible:ring-offset-2 focus-visible:ring-offset-deep-space hover:brightness-110"
            style={{
              backgroundColor: 'transparent',
              color: theaterActive ? '#FFB800' : '#4DC8D2',
              padding: '0.65rem 1.75rem',
              fontSize: '15px',
              border: theaterActive ? '1.5px solid #FFB800' : '1.5px solid #4DC8D2',
            }}
          >
            {theaterActive ? (
              <>
                <motion.span
                  className="inline-block w-2 h-2 rounded-full bg-[#FFB800]"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
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
            style={{ color: '#CBD5E1' }}
          >
            <FileBarChart className="h-3.5 w-3.5" />
            檢視戰略報告
          </button>
        </motion.div>
      </div>

      {/* Bottom status bar — JetBrains Mono, opacity 0.5 */}
      <motion.div
        className="absolute bottom-8 z-30"
        style={{ left: 'clamp(2.5rem, 8vw, 10rem)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.6 }}
      >
        <div className="flex items-center gap-5 opacity-70">
          <div className="flex items-center gap-2">
            <motion.span
              className="inline-block h-1.5 w-1.5 rounded-full bg-dried-rose"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
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
            <motion.span
              key={conflictDisplay}
              className={conflictColor ? '' : 'text-insight-gold'}
              style={conflictColor ? { color: conflictColor } : undefined}
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {conflictDisplay}%
            </motion.span>
          </span>
          <span className="font-mono text-[12px] text-mist-blue-gray tracking-[0.12em] uppercase">
            Scenarios: <span className="text-white">3.4M+</span>
          </span>
        </div>
      </motion.div>
    </>
  );
}
