'use client';

import { motion } from 'framer-motion';

interface PredictionPathProps {
  animate: boolean;
  className?: string;
}

interface NodeData {
  cx: number;
  cy: number;
  label: string;
  annotation: string | null;
  code: string;
  isFlashpoint?: boolean;
}

const nodes: NodeData[] = [
  { cx: 70, cy: 72, label: 'T+0h', annotation: null, code: 'P_Final Calibration...' },
  { cx: 175, cy: 48, label: 'T+36h', annotation: 'FLASHPOINT INTERVENTION', code: 'Conflict_Pulse: 19 detected', isFlashpoint: true },
  { cx: 285, cy: 18, label: 'T+72h', annotation: null, code: 'Agent_ENTJ_Conflict: Low' },
];

const pathD = 'M 0,82 C 25,80 45,76 70,72 C 100,67 140,55 175,48 C 210,41 250,28 330,14';
const PATH_LENGTH = 390;

export function PredictionPath({ animate, className }: PredictionPathProps) {
  return (
    <svg viewBox="0 0 340 130" className={className} role="img" aria-label="PersonaCast 預測導航線">
      <defs>
        <linearGradient id="predLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#769EDB" />
          <stop offset="50%" stopColor="#00C8E0" />
          <stop offset="100%" stopColor="#00F2FF" />
        </linearGradient>

        <linearGradient id="predFlowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="40%" stopColor="transparent" />
          <stop offset="50%" stopColor="rgba(0,242,255,0.9)" />
          <stop offset="60%" stopColor="transparent" />
          <stop offset="100%" stopColor="transparent" />
          <animateTransform
            attributeName="gradientTransform"
            type="translate"
            values="-1 0; 1 0"
            dur="3s"
            repeatCount="indefinite"
          />
        </linearGradient>

        <filter id="predGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="4" result="blur1" />
          <feGaussianBlur stdDeviation="8" in="SourceGraphic" result="blur2" />
          <feMerge>
            <feMergeNode in="blur2" />
            <feMergeNode in="blur1" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="predNodeGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Flashpoint red glow */}
        <filter id="flashpointGlow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="6" result="blur1" />
          <feGaussianBlur stdDeviation="3" in="SourceGraphic" result="blur2" />
          <feMerge>
            <feMergeNode in="blur1" />
            <feMergeNode in="blur2" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Faint grid */}
      {[30, 55, 80, 105].map((y) => (
        <line key={y} x1="0" y1={y} x2="340" y2={y} stroke="rgba(118,158,219,0.04)" strokeWidth="0.5" />
      ))}

      {/* Ultra-wide glow underlay */}
      <motion.path
        d={pathD}
        fill="none"
        stroke="rgba(118,158,219,0.08)"
        strokeWidth="18"
        strokeLinecap="round"
        initial={{ strokeDasharray: PATH_LENGTH, strokeDashoffset: PATH_LENGTH }}
        animate={animate ? { strokeDashoffset: 0 } : { strokeDashoffset: PATH_LENGTH }}
        transition={{ duration: 1.8, ease: 'easeOut' }}
      />

      {/* Main prediction line */}
      <motion.path
        d={pathD}
        fill="none"
        stroke="url(#predLineGrad)"
        strokeWidth="3.5"
        strokeLinecap="round"
        filter="url(#predGlow)"
        initial={{ strokeDasharray: PATH_LENGTH, strokeDashoffset: PATH_LENGTH }}
        animate={animate ? { strokeDashoffset: 0 } : { strokeDashoffset: PATH_LENGTH }}
        transition={{ duration: 1.8, ease: 'easeOut' }}
      />

      {/* Flowing highlight */}
      {animate && (
        <motion.path
          d={pathD}
          fill="none"
          stroke="url(#predFlowGrad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.0, duration: 0.6 }}
        />
      )}

      {/* Nodes */}
      {nodes.map((node, i) => (
        <motion.g
          key={node.label}
          initial={{ opacity: 0, scale: 0 }}
          animate={animate ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{ duration: 0.5, delay: 1.2 + i * 0.35, ease: 'backOut' }}
          style={{ transformOrigin: `${node.cx}px ${node.cy}px` }}
        >
          {/* Pulse rings */}
          {node.isFlashpoint ? (
            <>
              {/* Red breathing rings for flashpoint */}
              <circle cx={node.cx} cy={node.cy} r="10" fill="none" stroke="rgba(255,77,77,0.4)" strokeWidth="1.5">
                <animate attributeName="r" values="10;22;10" dur="1.8s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.6;0;0.6" dur="1.8s" repeatCount="indefinite" />
              </circle>
              <circle cx={node.cx} cy={node.cy} r="16" fill="none" stroke="rgba(255,77,77,0.2)" strokeWidth="0.8">
                <animate attributeName="r" values="16;28;16" dur="2.2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.4;0;0.4" dur="2.2s" repeatCount="indefinite" />
              </circle>
              <circle cx={node.cx} cy={node.cy} r="22" fill="none" stroke="rgba(255,77,77,0.08)" strokeWidth="0.5">
                <animate attributeName="r" values="22;34;22" dur="2.8s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.2;0;0.2" dur="2.8s" repeatCount="indefinite" />
              </circle>
            </>
          ) : (
            <circle cx={node.cx} cy={node.cy} r="8" fill="none" stroke="rgba(0,242,255,0.12)" strokeWidth="1">
              <animate attributeName="r" values="8;14;8" dur="3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.3;0;0.3" dur="3s" repeatCount="indefinite" />
            </circle>
          )}

          {/* Node dot */}
          <circle
            cx={node.cx}
            cy={node.cy}
            r={node.isFlashpoint ? 7 : 4.5}
            fill={node.isFlashpoint ? '#FF4D4D' : '#00F2FF'}
            filter={node.isFlashpoint ? 'url(#flashpointGlow)' : 'url(#predNodeGlow)'}
          >
            {node.isFlashpoint && (
              <animate attributeName="r" values="7;8.5;7" dur="1.5s" repeatCount="indefinite" />
            )}
          </circle>
          <circle cx={node.cx} cy={node.cy} r={node.isFlashpoint ? 3 : 2} fill="white" />

          {/* Time label below */}
          <text
            x={node.cx} y={node.cy + 18}
            fontSize="8"
            fill={node.isFlashpoint ? '#FF4D4D' : '#00F2FF'}
            textAnchor="middle"
            fontFamily="var(--font-mono), monospace" fontWeight="600"
          >
            {node.label}
          </text>

          {/* Flashpoint annotation — red, bold */}
          {node.isFlashpoint && (
            <>
              <text
                x={node.cx} y={node.cy - 22}
                fontSize="5" fill="rgba(255,77,77,0.5)" textAnchor="middle"
                fontFamily="var(--font-mono), monospace" fontWeight="400"
                letterSpacing="1.5"
              >
                戰略引爆點
              </text>
              <text
                x={node.cx} y={node.cy - 15}
                fontSize="4.5" fill="rgba(255,77,77,0.35)" textAnchor="middle"
                fontFamily="var(--font-mono), monospace" fontWeight="400"
                letterSpacing="1"
              >
                FLASHPOINT INTERVENTION
              </text>
            </>
          )}

          {/* Floating agent code */}
          <motion.text
            x={node.cx + (i === 0 ? 28 : i === 1 ? 34 : -34)}
            y={node.cy + (i === 0 ? -6 : i === 1 ? 6 : 2)}
            fontSize="4.5"
            fill={node.isFlashpoint ? 'rgba(255,77,77,0.3)' : 'rgba(0,242,255,0.3)'}
            textAnchor={i === 2 ? 'end' : 'start'}
            fontFamily="var(--font-mono), monospace"
            fontWeight="400"
            initial={{ opacity: 0 }}
            animate={animate ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 2.5 + i * 0.3, duration: 0.8 }}
          >
            {node.code}
          </motion.text>
        </motion.g>
      ))}
    </svg>
  );
}
