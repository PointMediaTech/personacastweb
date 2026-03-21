import { motion, useReducedMotion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as const;

const ACTUAL = [0.2, 0.25, 0.28, 0.35, 0.32, 0.40, 0.45, 0.50, 0.48, 0.55, 0.60, 0.58, 0.65, 0.68, 0.70];
const PREDICTED = [0.70, 0.73, 0.76, 0.80, 0.78, 0.82, 0.85, 0.88];

const W = 290;
const H = 80;
const PAD = { top: 8, bottom: 18, left: 5, right: 5 };

function toSVGPath(data: number[], startIdx: number = 0) {
  const chartW = W - PAD.left - PAD.right;
  const chartH = H - PAD.top - PAD.bottom;
  const totalPoints = ACTUAL.length + PREDICTED.length - 1;

  return data
    .map((v, i) => {
      const x = PAD.left + ((startIdx + i) / (totalPoints - 1)) * chartW;
      const y = PAD.top + (1 - v) * chartH;
      return `${i === 0 ? 'M' : 'L'}${x},${y}`;
    })
    .join(' ');
}

export function TrajectoryCard() {
  const reduced = useReducedMotion();
  const actualPath = toSVGPath(ACTUAL, 0);
  const predictedPath = toSVGPath(PREDICTED, ACTUAL.length - 1);
  const predictedLength = 300;

  return (
    <div className="flex flex-col gap-2">
      <span className="font-mono text-[14px] font-semibold text-white/80 tracking-wide">
        72h TRAJECTORY
      </span>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        <path d={actualPath} fill="none" stroke="rgba(100,200,255,0.7)" strokeWidth="1.5" />
        <motion.path
          d={predictedPath}
          fill="none"
          stroke="rgba(255,184,0,0.6)"
          strokeWidth="1.5"
          strokeDasharray={predictedLength}
          strokeDashoffset={reduced ? 0 : predictedLength}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 1.5, delay: 0.3, ease: EASE }}
        />
        <text x={PAD.left} y={H - 3} fill="rgba(255,255,255,0.3)" fontSize="8" fontFamily="'JetBrains Mono', monospace">
          Low
        </text>
        <text x={W - PAD.right} y={H - 3} fill="rgba(255,255,255,0.3)" fontSize="8" fontFamily="'JetBrains Mono', monospace" textAnchor="end">
          High
        </text>
        <text x={W / 2} y={H - 3} fill="rgba(255,255,255,0.25)" fontSize="7" fontFamily="'JetBrains Mono', monospace" textAnchor="middle">
          Risk
        </text>
      </svg>
      <span className="font-mono text-[11px] text-white/30 tracking-widest uppercase">
        Predicted Pathway
      </span>
    </div>
  );
}
