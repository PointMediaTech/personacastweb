'use client';
import { useRef, useState, useEffect } from 'react';
import { useInView, useReducedMotion } from '@/app/lib/animations';
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
  const svgRef = useRef<SVGSVGElement>(null);
  const inView = useInView(svgRef, { once: true, margin: '-80px', threshold: 0.3 });
  const filterId = 'network-glow';

  // Scan sector: brief one-shot effect via state timers
  const [scanActive, setScanActive] = useState(false);
  useEffect(() => {
    if (inView && !reduced) {
      const startTimer = setTimeout(() => setScanActive(true), 800);
      const endTimer = setTimeout(() => setScanActive(false), 3300);
      return () => { clearTimeout(startTimer); clearTimeout(endTimer); };
    }
  }, [inView, reduced]);

  return (
    <svg ref={svgRef} viewBox="0 0 560 280" className="w-full h-full" role="img" aria-label="利益網絡節點掃描示意圖">
      <defs>
        <GlowFilter rgb={accentRgb} id={filterId} stdDeviation={4} floodOpacity={0.5} />
        <clipPath id="scan-sector">
          <path d={`M${CENTER_X},${CENTER_Y} L${CENTER_X + 300},${CENTER_Y} A300,300 0 0,1 ${CENTER_X + 300 * Math.cos(Math.PI / 3)},${CENTER_Y + 300 * Math.sin(Math.PI / 3)} Z`} />
        </clipPath>
      </defs>

      {EDGES.map(([a, b], i) => (
        <line
          key={`edge-${i}`}
          x1={NODES[a].x} y1={NODES[a].y}
          x2={NODES[b].x} y2={NODES[b].y}
          stroke="white"
          strokeWidth={1.5}
          opacity={inView ? 0.4 : 0}
          style={{
            transition: reduced ? 'none' : `opacity 0.5s ease-out ${i * 0.02}s`,
          }}
        />
      ))}

      {!reduced && (
        <g
          style={{
            transformOrigin: `${CENTER_X}px ${CENTER_Y}px`,
            opacity: scanActive ? 0.6 : 0,
            transition: 'opacity 0.3s ease',
          }}
          clipPath="url(#scan-sector)"
        >
          <circle cx={CENTER_X} cy={CENTER_Y} r={250} fill={`rgba(${accentRgb},0.08)`} />
          <line x1={CENTER_X} y1={CENTER_Y} x2={CENTER_X + 300} y2={CENTER_Y} stroke={accentHex} strokeWidth={1} opacity={0.3} />
        </g>
      )}

      {NODES.map((node, i) => {
        const r = node.critical ? 8 : 4;
        const baseDelay = i * 0.05;
        return (
          <g key={`node-${i}`}>
            <circle
              cx={node.x} cy={node.y} r={r}
              fill={node.critical ? accentHex : 'rgba(255,255,255,0.45)'}
              style={{
                transformOrigin: `${node.x}px ${node.y}px`,
                opacity: inView ? 1 : 0,
                transform: inView ? 'scale(1)' : 'scale(0.5)',
                transition: reduced ? 'none' : `opacity 0.4s ease-out ${baseDelay}s, transform 0.4s ease-out ${baseDelay}s`,
              }}
              {...(node.critical ? { filter: `url(#${filterId})` } : {})}
            />
            {node.critical && (
              <circle
                cx={node.x} cy={node.y} r={r + 4}
                fill="none" stroke={accentHex} strokeWidth={1}
                style={{
                  transformOrigin: `${node.x}px ${node.y}px`,
                }}
                opacity={reduced ? 0.5 : undefined}
              >
                {!reduced && (
                  <animate
                    attributeName="opacity"
                    values="0.3;0.6;0.3"
                    dur="2s"
                    repeatCount="indefinite"
                    begin={`${3.5 + i * 0.2}s`}
                  />
                )}
              </circle>
            )}
          </g>
        );
      })}

      <text
        x={520} y={268}
        fill="#FFFFFF" fontSize={20}
        fontFamily="'JetBrains Mono', monospace" textAnchor="end"
        opacity={inView ? 1 : 0}
        style={{
          transition: reduced ? 'none' : 'opacity 0.5s ease-out 1.5s',
        }}
      >
        80+ 節點掃描中
      </text>
    </svg>
  );
}
