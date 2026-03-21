import { motion, useReducedMotion } from 'framer-motion';
import { EASE, type DecisionResult } from './theaterData';

interface SimulationResultProps {
  readonly result: DecisionResult;
  readonly accentColor: string;
  readonly position: { top: string; right: string };
}

export function SimulationResult({ result, accentColor, position }: SimulationResultProps) {
  const reduced = useReducedMotion();

  const rows = [
    { label: '成功率', value: `${result.successRate}%`, bar: result.successRate },
    { label: '輿論控制', value: result.opinionControl },
    { label: '時間成本', value: result.timeCost },
    { label: '風險等級', value: result.riskLevel },
  ];

  // Offset below the decision card — shift down ~120px from card position
  const resultTop = `calc(${position.top} + 120px)`;

  return (
    <motion.div
      className="absolute"
      style={{ top: resultTop, right: position.right }}
      initial={reduced ? { opacity: 1 } : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 5, transition: { duration: 0.3, ease: EASE } }}
      transition={{ duration: 0.5, ease: EASE }}
      aria-live="polite"
    >
      <div
        className="w-[220px] backdrop-blur-md border border-slate-700/40 overflow-hidden"
        style={{
          backgroundColor: 'rgba(2,6,23,0.5)',
          borderRadius: '0.75rem',
        }}
      >
        <div className="px-3.5 py-3">
          {/* Header */}
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/60 mb-2">
            Simulation Result
          </p>
          <div className="h-[1px] bg-white/10 mb-2.5" />

          {/* Metric rows */}
          {rows.map((row) => (
            <div key={row.label} className="flex items-center justify-between mb-1.5 last:mb-0">
              <span className="font-mono text-[10px] uppercase text-mist-blue-gray">
                {row.label}
              </span>
              <div className="flex items-center gap-2">
                {row.bar !== undefined && (
                  <div className="w-16 h-1 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: accentColor }}
                      initial={{ width: 0 }}
                      animate={{ width: `${row.bar}%` }}
                      transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
                    />
                  </div>
                )}
                <span className="font-mono text-[10px] uppercase" style={{ color: accentColor }}>
                  {row.value}
                </span>
              </div>
            </div>
          ))}

          {/* Conclusion */}
          <div className="h-[1px] bg-white/10 mt-2.5 mb-2" />
          <p className="font-mono text-[10px] uppercase" style={{ color: accentColor }}>
            {result.conclusion}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
