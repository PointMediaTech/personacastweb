'use client';
import { motion, useReducedMotion } from 'framer-motion';
import type { ScenarioVisualProps } from './index';
import { GlowFilter } from './GlowFilter';

const UNCONTROLLED_PATH = 'M40,200 C120,195 250,170 350,100 Q430,50 520,40';
const INTERCEPTED_PATH = 'M40,200 C100,190 160,150 200,120 Q280,100 360,140 Q440,160 520,160';

export function TimelineComparison({ accentRgb, accentHex }: ScenarioVisualProps) {
  const reduced = useReducedMotion();
  const filterId = 'timeline-glow';

  const pathAnim = (delay: number) => ({
    initial: { pathLength: reduced ? 1 : 0, opacity: reduced ? 1 : 0.15 },
    whileInView: { pathLength: 1, opacity: 1 },
    viewport: { once: true, amount: 0.3 } as const,
    transition: reduced ? { duration: 0 } : { duration: 1.2, delay, ease: 'easeOut' as const },
  });

  const fadeAnim = (delay: number) => ({
    initial: { opacity: reduced ? 1 : 0.15 },
    whileInView: { opacity: 1 },
    viewport: { once: true, amount: 0.3 } as const,
    transition: reduced ? { duration: 0 } : { duration: 0.8, delay, ease: 'easeOut' as const },
  });

  return (
    <svg viewBox="0 0 560 280" className="w-full h-full" role="img" aria-label="危機輿論攔截前後對比時間軸">
      <defs>
        <GlowFilter rgb={accentRgb} id={filterId} />
      </defs>

      {/* Time axis */}
      <motion.line x1={40} y1={240} x2={520} y2={240} stroke="rgba(255,255,255,0.1)" strokeWidth={1} {...fadeAnim(0)} />
      <motion.text x={40} y={260} fill="#FFFFFF" fontSize={20} fontFamily="'JetBrains Mono', monospace" {...fadeAnim(0)}>T-72hr</motion.text>
      <motion.text x={500} y={260} fill="#FFFFFF" fontSize={20} fontFamily="'JetBrains Mono', monospace" {...fadeAnim(0)}>T+0</motion.text>

      {/* Uncontrolled curve — red dashed, dim (fade only, no pathLength — strokeDasharray conflicts with pathLength animation) */}
      <motion.path
        d={UNCONTROLLED_PATH}
        fill="none"
        stroke="#FF8C00"
        strokeWidth={1.5}
        strokeDasharray="6 4"
        {...fadeAnim(0)}
      />

      {/* Intercepted curve — accent, solid, glow */}
      <motion.path
        d={INTERCEPTED_PATH}
        fill="none"
        stroke={accentHex}
        strokeWidth={2}
        filter={`url(#${filterId})`}
        {...pathAnim(0.3)}
      />

      {/* Intervention marker — vertical dashed */}
      <motion.line
        x1={196} y1={50} x2={196} y2={240}
        stroke="rgba(255,255,255,0.25)"
        strokeWidth={1}
        strokeDasharray="4 3"
        {...fadeAnim(0.6)}
      />
      <motion.text
        x={196} y={42}
        fill="#FFFFFF"
        fontSize={20}
        fontFamily="'JetBrains Mono', monospace"
        textAnchor="middle"
        {...fadeAnim(0.6)}
      >
        介入點
      </motion.text>

      {/* Intervention marker pulse — continuous after entry (skipped if reduced motion) */}
      {!reduced && (
        <motion.line
          x1={196} y1={50} x2={196} y2={240}
          stroke={accentHex}
          strokeWidth={1}
          strokeDasharray="4 3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: [0, 0.4, 0.7, 0.4, 0] }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        />
      )}

      {/* Labels */}
      <motion.text x={505} y={33} fill="#FFFFFF" fontSize={20} fontFamily="'JetBrains Mono', monospace" textAnchor="end" {...fadeAnim(1.0)}>未攔截</motion.text>
      <motion.text x={505} y={153} fill={accentHex} fontSize={20} fontFamily="'JetBrains Mono', monospace" textAnchor="end" {...fadeAnim(1.3)}>攔截後</motion.text>
    </svg>
  );
}
