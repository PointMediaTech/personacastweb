'use client';
import { motion, useReducedMotion } from 'framer-motion';
import type { ScenarioVisualProps } from './index';
import { GlowFilter } from './GlowFilter';

const NODES: readonly { x: number; y: number; critical: boolean }[] = [
  { x: 230, y: 110, critical: true },
  { x: 310, y: 150, critical: true },
  { x: 260, y: 190, critical: true },
  { x: 350, y: 95, critical: true },
  { x: 150, y: 80, critical: false },
  { x: 180, y: 160, critical: false },
  { x: 130, y: 200, critical: false },
  { x: 200, y: 240, critical: false },
  { x: 340, y: 210, critical: false },
  { x: 400, y: 140, critical: false },
  { x: 420, y: 200, critical: false },
  { x: 380, y: 60, critical: false },
  { x: 290, y: 55, critical: false },
  { x: 450, y: 110, critical: false },
] as const;

const EDGES: readonly [number, number][] = [
  [0, 1], [0, 4], [0, 8], [1, 2], [1, 3], [1, 5], [2, 5], [2, 7],
  [3, 9], [3, 8], [4, 5], [4, 8], [5, 6], [6, 8], [6, 10],
  [7, 2], [7, 6], [9, 3], [9, 13], [10, 9], [11, 3], [11, 9], [12, 0], [12, 11], [13, 10],
] as const;

const CENTER_X = 290;
const CENTER_Y = 140;

export function NetworkGraph({ accentRgb, accentHex }: ScenarioVisualProps) {
  const reduced = useReducedMotion();
  const filterId = 'network-glow';

  return (
    <svg viewBox="0 0 560 280" className="w-full h-full" role="img" aria-label="利益網絡節點掃描示意圖">
      <defs>
        <GlowFilter rgb={accentRgb} id={filterId} stdDeviation={4} floodOpacity={0.5} />
        <clipPath id="scan-sector">
          <path d={`M${CENTER_X},${CENTER_Y} L${CENTER_X + 300},${CENTER_Y} A300,300 0 0,1 ${CENTER_X + 300 * Math.cos(Math.PI / 3)},${CENTER_Y + 300 * Math.sin(Math.PI / 3)} Z`} />
        </clipPath>
      </defs>

      {EDGES.map(([a, b], i) => (
        <motion.line
          key={`edge-${i}`}
          x1={NODES[a].x} y1={NODES[a].y}
          x2={NODES[b].x} y2={NODES[b].y}
          stroke="white"
          strokeWidth={1}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.12 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={reduced ? { duration: 0 } : { duration: 0.5, delay: i * 0.02 }}
        />
      ))}

      {!reduced && (
        <motion.g
          style={{ transformOrigin: `${CENTER_X}px ${CENTER_Y}px` }}
          initial={{ rotate: 0, opacity: 0 }}
          whileInView={{ rotate: 360, opacity: [0, 0.6, 0.6, 0] }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 2.5, delay: 0.8, ease: 'linear' }}
          clipPath="url(#scan-sector)"
        >
          <circle cx={CENTER_X} cy={CENTER_Y} r={250} fill={`rgba(${accentRgb},0.08)`} />
          <line x1={CENTER_X} y1={CENTER_Y} x2={CENTER_X + 300} y2={CENTER_Y} stroke={accentHex} strokeWidth={1} opacity={0.3} />
        </motion.g>
      )}

      {NODES.map((node, i) => {
        const r = node.critical ? 8 : 4;
        const baseDelay = i * 0.05;
        return (
          <g key={`node-${i}`}>
            <motion.circle
              cx={node.x} cy={node.y} r={r}
              fill={node.critical ? accentHex : 'rgba(255,255,255,0.15)'}
              style={{ transformOrigin: `${node.x}px ${node.y}px` }}
              {...(node.critical ? { filter: `url(#${filterId})` } : {})}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={reduced ? { duration: 0 } : { duration: 0.4, delay: baseDelay }}
            />
            {node.critical && (
              <motion.circle
                cx={node.x} cy={node.y} r={r + 4}
                fill="none" stroke={accentHex} strokeWidth={1}
                style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                initial={{ opacity: 0 }}
                animate={
                  reduced
                    ? { opacity: 0.5 }
                    : { opacity: [0.3, 0.6, 0.3], scale: [1, 1.08, 1] }
                }
                transition={
                  reduced
                    ? { duration: 0 }
                    : { duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 3.5 + i * 0.2 }
                }
              />
            )}
          </g>
        );
      })}

      <motion.text
        x={520} y={268}
        fill="rgba(255,255,255,0.4)" fontSize={11}
        fontFamily="'JetBrains Mono', monospace" textAnchor="end"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.4 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={reduced ? { duration: 0 } : { duration: 0.5, delay: 1.5 }}
      >
        80+ 節點掃描中
      </motion.text>
    </svg>
  );
}
