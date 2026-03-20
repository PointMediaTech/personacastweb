import { motion, useReducedMotion } from 'framer-motion';
import { Play, FileBarChart } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1] as const;

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
 *   Primary CTA → Solid White bg, Deep Blue text
 */
export function HeroContent() {
  const reduced = useReducedMotion();

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

        {/* CTAs — Primary: SOLID WHITE, brightest element on page */}
        <motion.div {...slideLeft(0.6, reduced)} className="flex items-center gap-4">
          <button
            type="button"
            className="group inline-flex items-center gap-3 rounded-sm bg-white px-10 py-4 text-[15px] font-bold tracking-wide transition-all duration-400 hover:shadow-[0_0_30px_6px_rgba(255,255,255,0.15)]"
            style={{ color: '#0A1128' }}
          >
            <Play className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
            啟動推演劇場
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

      {/* Bottom system log — JetBrains Mono, opacity 0.5 */}
      <motion.div
        className="absolute bottom-8 z-30"
        style={{ left: 'clamp(2.5rem, 8vw, 10rem)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <div className="flex items-center gap-5 opacity-50">
          <div className="flex items-center gap-2">
            <motion.span
              className="inline-block h-1.5 w-1.5 rounded-full bg-dried-rose"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span className="font-mono text-[10px] text-dried-rose tracking-[0.15em] uppercase">
              Simulating
            </span>
          </div>
          <span className="font-mono text-[10px] text-mist-blue-gray tracking-[0.12em] uppercase">
            Conflict_Idx: <span className="text-insight-gold">72%</span>
          </span>
          <span className="font-mono text-[10px] text-mist-blue-gray tracking-[0.12em] uppercase">
            Window: <span className="text-strategic-blue">T+72H</span>
          </span>
          <span className="font-mono text-[10px] text-mist-blue-gray tracking-[0.12em] uppercase">
            Latency: <span className="text-white">14ms</span>
          </span>
        </div>
      </motion.div>
    </>
  );
}
