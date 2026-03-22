'use client';

import { motion } from 'framer-motion';

interface PredictionPathProps {
  animate: boolean;
  className?: string;
}

const nodes = [
  { cx: 80, cy: 55, label: 'T+0h' },
  { cx: 160, cy: 40, label: 'T+36h' },
  { cx: 240, cy: 28, label: 'T+72h' },
];

const pathPoints = '0,70 40,65 80,55 120,50 160,40 200,35 240,28 280,22';

// Approximate total length of the polyline for stroke-dasharray animation
const PATH_LENGTH = 300;

export function PredictionPath({ animate, className }: PredictionPathProps) {
  return (
    <svg viewBox="0 0 280 100" className={className} role="img" aria-label="PersonaCast 預測導航線">
      <defs>
        <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#769EDB" />
          <stop offset="100%" stopColor="#00F2FF" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Subtle grid lines */}
      <line x1="0" y1="25" x2="280" y2="25" stroke="rgba(118,158,219,0.08)" strokeWidth="0.5" />
      <line x1="0" y1="50" x2="280" y2="50" stroke="rgba(118,158,219,0.08)" strokeWidth="0.5" />
      <line x1="0" y1="75" x2="280" y2="75" stroke="rgba(118,158,219,0.08)" strokeWidth="0.5" />

      {/* Main prediction line */}
      <motion.polyline
        points={pathPoints}
        fill="none"
        stroke="url(#lineGrad)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#glow)"
        initial={{ strokeDasharray: PATH_LENGTH, strokeDashoffset: PATH_LENGTH }}
        animate={
          animate
            ? { strokeDashoffset: 0 }
            : { strokeDashoffset: PATH_LENGTH }
        }
        transition={{ duration: 1.5, ease: 'easeOut' }}
      />

      {/* Data nodes */}
      {nodes.map((node, i) => (
        <motion.g
          key={node.label}
          initial={{ opacity: 0 }}
          animate={animate ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4, delay: 1.2 + i * 0.25 }}
        >
          <circle
            cx={node.cx}
            cy={node.cy}
            r="3.5"
            fill="#00F2FF"
            filter="url(#glow)"
          />
          <text
            x={node.cx}
            y={node.cy + 12}
            fontSize="7"
            fill="#00F2FF"
            textAnchor="middle"
            fontFamily="var(--font-mono), monospace"
          >
            {node.label}
          </text>
        </motion.g>
      ))}
    </svg>
  );
}
