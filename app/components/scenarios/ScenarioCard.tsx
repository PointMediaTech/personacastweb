'use client';

import { motion } from 'framer-motion';
import { type ScenarioData } from './scenarioData';
import { TimelineComparison, NetworkGraph, ConvergenceFunnel } from './visuals';

/* ── Visual selector ── */
function ModuleVisual({ type, rgb, hex }: { type: ScenarioData['visualType']; rgb: string; hex: string }) {
  switch (type) {
    case 'waveform': return <TimelineComparison accentRgb={rgb} accentHex={hex} />;
    case 'orb':      return <NetworkGraph accentRgb={rgb} accentHex={hex} />;
    case 'comet':    return <ConvergenceFunnel accentRgb={rgb} accentHex={hex} />;
    default:         return null;
  }
}

/* ── Stagger animation variants ── */
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.22,
      duration: 0.75,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  }),
};

/* ── Highlight data numbers in description text ── */
function HighlightedDescription({ text, color }: { text: string; color: string }) {
  // Match patterns like "72 小時", "80+", "340 萬次", "89%", "94%", "100%"
  const parts = text.split(/([\d,]+[\+]?\s*[萬千百]?[次個小時%]*)/g);
  return (
    <>
      {parts.map((part, i) =>
        /[\d]/.test(part) ? (
          <span key={i} style={{ color, fontWeight: 500 }}>{part}</span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

/* ================================================================
   SCENARIO CARD
   ================================================================ */
interface ScenarioCardProps {
  data: ScenarioData;
  index: number;
}

export function ScenarioCard({ data, index }: ScenarioCardProps) {
  const { accentHex, accentRgb } = data;

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      whileHover={{
        boxShadow: `0 0 40px rgba(${accentRgb},0.2)`,
      }}
      className="group relative flex flex-col rounded-xl px-7 lg:px-9 xl:px-11 pt-3 lg:pt-4 pb-3 lg:pb-4 transition-shadow duration-300"
      style={{
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      {/* ── Large background number — outline/stroke style ── */}
      <div
        className="absolute top-0 right-4 select-none pointer-events-none font-heading font-extrabold leading-none"
        style={{
          fontSize: 'clamp(100px, 10vw, 160px)',
          color: 'transparent',
          WebkitTextStroke: `2px rgba(${accentRgb},0.05)`,
        }}
      >
        {data.number}
      </div>

      {/* ── Status tag ── */}
      <div className="relative z-10 mb-3 flex-shrink-0">
        <span
          className="inline-block text-[13px] lg:text-[15px] xl:text-[16px] font-mono tracking-[0.08em] px-3 py-1.5 rounded"
          style={{
            color: accentHex,
            opacity: 0.8,
            background: `rgba(${accentRgb},0.08)`,
            borderBottom: `1px solid rgba(${accentRgb},0.3)`,
          }}
        >
          {data.statusTag}
        </span>
      </div>

      {/* ── Title ── */}
      <h3 className="relative z-10 text-lg lg:text-xl xl:text-2xl font-semibold text-white mb-2 font-heading leading-[1.35] flex-shrink-0">
        <span style={{ color: accentHex }} className="mr-1.5">{data.number}.</span>
        {data.title}
      </h3>

      {/* ── Description — line-height 1.75, data highlights ── */}
      <p className="relative z-10 text-[#8892B0] mb-2 font-[350] flex-shrink-0"
        style={{ fontSize: 'clamp(1rem, 1.2vw, 1.25rem)', lineHeight: 1.75 }}
      >
        <HighlightedDescription text={data.description} color={data.highlightColor} />
      </p>

      {/* ── Visual area ── */}
      <div className="relative w-full h-[300px] flex items-center justify-center flex-shrink-0 mt-auto">
        <ModuleVisual type={data.visualType} rgb={accentRgb} hex={accentHex} />
      </div>

    </motion.div>
  );
}
