'use client';
import { motion, useReducedMotion } from 'framer-motion';
import type { ScenarioVisualProps } from './index';
import { GlowFilter } from './GlowFilter';

interface FunnelPath {
  d: string;
  survives: boolean;
  eliminateX?: number;
  eliminateY?: number;
}

const PATHS: readonly FunnelPath[] = [
  { d: 'M40,140 C120,140 200,130 280,135 Q380,140 520,140', survives: true },
  { d: 'M40,140 C100,110 160,70 220,50',    survives: false, eliminateX: 220, eliminateY: 50 },
  { d: 'M40,140 C100,120 170,95 250,80',    survives: false, eliminateX: 250, eliminateY: 80 },
  { d: 'M40,140 C110,130 180,110 300,100',  survives: false, eliminateX: 300, eliminateY: 100 },
  { d: 'M40,140 C110,150 180,170 260,190',  survives: false, eliminateX: 260, eliminateY: 190 },
  { d: 'M40,140 C100,160 160,200 230,220',  survives: false, eliminateX: 230, eliminateY: 220 },
  { d: 'M40,140 C120,155 200,180 320,195',  survives: false, eliminateX: 320, eliminateY: 195 },
  { d: 'M40,140 C110,145 190,160 350,170',  survives: false, eliminateX: 350, eliminateY: 170 },
  { d: 'M40,140 C100,135 170,115 380,110',  survives: false, eliminateX: 380, eliminateY: 110 },
  { d: 'M40,140 C110,160 200,190 400,200',  survives: false, eliminateX: 400, eliminateY: 200 },
] as const;

function EliminationMark({ x, y, delay, reduced }: { x: number; y: number; delay: number; reduced: boolean | null }) {
  const half = 3;
  return (
    <motion.g
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 0.8 }}
      viewport={{ once: true, amount: 0.3 } as const}
      transition={reduced ? { duration: 0 } : { duration: 0.15, delay }}
    >
      <line x1={x - half} y1={y - half} x2={x + half} y2={y + half} stroke="rgba(255,255,255,0.8)" strokeWidth={2} />
      <line x1={x + half} y1={y - half} x2={x - half} y2={y + half} stroke="rgba(255,255,255,0.8)" strokeWidth={2} />
    </motion.g>
  );
}

export function ConvergenceFunnel({ accentRgb, accentHex }: ScenarioVisualProps) {
  const reduced = useReducedMotion();
  const filterId = 'convergence-glow';

  return (
    <svg viewBox="0 0 560 280" className="w-full h-full" role="img" aria-label="340萬次模擬路徑收斂至最佳軌跡">
      <defs>
        <GlowFilter rgb={accentRgb} id={filterId} stdDeviation={4} floodOpacity={0.5} />
      </defs>

      {PATHS.filter(p => !p.survives).map((p, i) => (
        <motion.path
          key={`elim-${i}`}
          d={p.d}
          fill="none"
          stroke={`rgba(${accentRgb},0.6)`}
          strokeWidth={2}
          initial={{ pathLength: reduced ? 1 : 0, opacity: reduced ? 0.6 : 0.15 }}
          whileInView={{ pathLength: 1, opacity: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={reduced ? { duration: 0 } : { duration: 0.8, delay: i * 0.08, ease: 'easeOut' as const }}
        />
      ))}

      {PATHS.filter(p => !p.survives).map((p, i) => (
        <EliminationMark
          key={`x-${i}`}
          x={p.eliminateX!}
          y={p.eliminateY!}
          delay={0.8 + i * 0.08}
          reduced={reduced}
        />
      ))}

      <motion.path
        d={PATHS[0].d}
        fill="none"
        stroke={accentHex}
        strokeWidth={2.5}
        filter={`url(#${filterId})`}
        initial={{ pathLength: reduced ? 1 : 0, opacity: reduced ? 1 : 0.15 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={reduced ? { duration: 0 } : { duration: 1.5, delay: 0.2, ease: 'easeOut' as const }}
      />

      <motion.circle
        cx={520} cy={140} r={5}
        fill={accentHex}
        filter={`url(#${filterId})`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={reduced ? { duration: 0 } : { duration: 0.3, delay: 1.7 }}
      />

      <motion.text
        x={45} y={268}
        fill="#FFFFFF" fontSize={20}
        fontFamily="'JetBrains Mono', monospace"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={reduced ? { duration: 0 } : { duration: 0.5, delay: 0.5 }}
      >
        3.4M+ 路徑
      </motion.text>
      <motion.text
        x={515} y={268}
        fill={accentHex} fontSize={20}
        fontFamily="'JetBrains Mono', monospace" textAnchor="end"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={reduced ? { duration: 0 } : { duration: 0.5, delay: 1.7 }}
      >
        最佳軌跡
      </motion.text>
    </svg>
  );
}
