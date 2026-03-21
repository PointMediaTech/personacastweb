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
 *   Primary CTA (inactive) → Strategic Blue #769EDB bg, White text
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
      <div className="flex flex-col justify-center">
        {/* Eyebrow */}
        <motion.div {...slideLeft(0.1, reduced)} className="flex items-center gap-3 mb-8">
          <div className="h-[1px] w-10 bg-strategic-blue/40" />
          <span className="font-mono text-[10px] tracking-[0.25em] text-strategic-blue/60 uppercase">
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
          className="text-base md:text-lg leading-relaxed max-w-lg mb-10"
          style={{ color: '#CBD5E1' }}
        >
          在危機發生前{' '}
          <span className="font-mono text-insight-gold font-bold">72</span>{' '}
          小時，透過 AI 智能體模擬百萬種輿論路徑，讓未知的風險成為可控的數據資產。
        </motion.p>

        {/* CTAs — Primary: Strategic Blue toggle (see spec) */}
        <motion.div {...slideLeft(0.6, reduced)} className="flex items-center gap-4">
          <button
            type="button"
            onClick={onToggleTheater}
            className={`group inline-flex items-center gap-3 rounded-sm px-10 py-4 text-[15px] font-bold tracking-wide transition-all duration-400 ${
              theaterActive
                ? 'border border-[rgba(255,184,0,0.3)] hover:border-[rgba(255,184,0,0.5)]'
                : 'bg-[#769EDB] hover:shadow-[0_0_30px_6px_rgba(118,158,219,0.25)]'
            }`}
            style={{ color: theaterActive ? '#FFB800' : '#FFFFFF' }}
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
                <Play className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                啟動推演劇場
              </>
            )}
          </button>
          <button
            type="button"
            className="group inline-flex items-center gap-2 rounded-sm border border-white/10 px-6 py-4 text-sm tracking-wide transition-all duration-400 hover:border-white/25"
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
        <div className="flex items-center gap-5 opacity-50">
          <div className="flex items-center gap-2">
            <motion.span
              className="inline-block h-1.5 w-1.5 rounded-full bg-dried-rose"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span className="font-mono text-[10px] text-dried-rose tracking-[0.15em] uppercase">
              2 Agents Active
            </span>
          </div>
          <span className="font-mono text-[10px] text-mist-blue-gray tracking-[0.12em] uppercase">
            Simulation: <span className="text-strategic-blue">T+56H</span>
          </span>
          <span className="font-mono text-[10px] text-mist-blue-gray tracking-[0.12em] uppercase">
            Conflict:{' '}
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
          <span className="font-mono text-[10px] text-mist-blue-gray tracking-[0.12em] uppercase">
            Paths Analyzed: <span className="text-white">3.4M+</span>
          </span>
        </div>
      </motion.div>
    </>
  );
}
