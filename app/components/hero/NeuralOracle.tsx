'use client';
import { motion } from 'framer-motion';

/**
 * NeuralOracle — A clean, moderate-sized neural network visualization.
 *
 * NOT a head silhouette (that looked bad). Instead: an abstract network
 * graph inspired by the logo — nodes connected by thin lines, forming
 * a roughly circular cluster. Elegant, geometric, precise.
 *
 * Size: ~300px on desktop, sits between the two dossier cards.
 */

// Node positions: normalized 0–1, mapped to the viewBox
const NODES: readonly { x: number; y: number; gold: boolean }[] = [
  // Outer ring
  { x: 0.50, y: 0.05, gold: false },
  { x: 0.78, y: 0.15, gold: false },
  { x: 0.95, y: 0.40, gold: false },
  { x: 0.88, y: 0.70, gold: false },
  { x: 0.65, y: 0.90, gold: false },
  { x: 0.35, y: 0.90, gold: false },
  { x: 0.12, y: 0.70, gold: false },
  { x: 0.05, y: 0.40, gold: false },
  { x: 0.22, y: 0.15, gold: false },
  // Inner ring
  { x: 0.50, y: 0.25, gold: true },
  { x: 0.70, y: 0.35, gold: false },
  { x: 0.72, y: 0.60, gold: false },
  { x: 0.50, y: 0.75, gold: false },
  { x: 0.28, y: 0.60, gold: false },
  { x: 0.30, y: 0.35, gold: false },
  // Core
  { x: 0.50, y: 0.48, gold: true },
  { x: 0.60, y: 0.52, gold: false },
  { x: 0.40, y: 0.52, gold: false },
  { x: 0.55, y: 0.38, gold: true },
  { x: 0.45, y: 0.62, gold: false },
];

// Edges: pairs of node indices
const EDGES: readonly [number, number][] = [
  // Outer ring connections
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 0],
  // Outer → Inner
  [0, 9], [1, 10], [2, 10], [3, 11], [4, 12], [5, 12], [6, 13], [7, 14], [8, 14],
  // Inner ring
  [9, 10], [10, 11], [11, 12], [12, 13], [13, 14], [14, 9],
  // Inner → Core
  [9, 15], [10, 16], [11, 16], [12, 19], [13, 17], [14, 17],
  [9, 18], [15, 18], [15, 16], [15, 17], [15, 19], [18, 10], [19, 13],
  // Cross
  [0, 14], [1, 9], [3, 10], [5, 13], [7, 13], [6, 14],
];

const SIZE = 300;

export function NeuralOracle() {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: [1, 1.015, 1] }}
      transition={{
        opacity: { duration: 2, ease: [0.22, 1, 0.36, 1] },
        scale: { duration: 10, repeat: Infinity, ease: 'easeInOut' },
      }}
    >
      <svg
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="w-[200px] h-[200px] md:w-[280px] md:h-[280px] lg:w-[300px] lg:h-[300px]"
      >
        {/* Edges */}
        <g>
          {EDGES.map(([a, b], i) => {
            const na = NODES[a];
            const nb = NODES[b];
            const bothGold = na.gold && nb.gold;
            return (
              <line
                key={i}
                x1={na.x * SIZE} y1={na.y * SIZE}
                x2={nb.x * SIZE} y2={nb.y * SIZE}
                stroke={bothGold ? 'rgba(255,184,0,0.25)' : 'rgba(118,158,219,0.2)'}
                strokeWidth="0.7"
              />
            );
          })}
        </g>

        {/* Nodes */}
        {NODES.map((node, i) => {
          const cx = node.x * SIZE;
          const cy = node.y * SIZE;

          if (node.gold) {
            return (
              <g key={i}>
                <motion.circle
                  cx={cx} cy={cy} r="10"
                  fill="rgba(255,184,0,0.05)"
                  animate={{ r: [10, 14, 10], opacity: [0.05, 0.1, 0.05] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
                />
                <motion.circle
                  cx={cx} cy={cy} r="3.5"
                  fill="#FFB800"
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
                />
              </g>
            );
          }

          return (
            <circle
              key={i}
              cx={cx} cy={cy}
              r="2"
              fill="rgba(118,158,219,0.45)"
            />
          );
        })}
      </svg>
    </motion.div>
  );
}
