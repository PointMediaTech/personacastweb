'use client';
import { useRef } from 'react';
import { useInView, useReducedMotion } from '@/app/lib/animations';
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

function EliminationMark({ x, y, delay, inView, reduced }: { x: number; y: number; delay: number; inView: boolean; reduced: boolean }) {
  const half = 3;
  return (
    <g
      style={{
        opacity: inView ? 0.8 : 0,
        transition: reduced ? 'none' : `opacity 0.15s ease-out ${delay}s`,
      }}
    >
      <line x1={x - half} y1={y - half} x2={x + half} y2={y + half} stroke="rgba(255,255,255,0.8)" strokeWidth={2} />
      <line x1={x + half} y1={y - half} x2={x - half} y2={y + half} stroke="rgba(255,255,255,0.8)" strokeWidth={2} />
    </g>
  );
}

export function ConvergenceFunnel({ accentRgb, accentHex }: ScenarioVisualProps) {
  const reduced = useReducedMotion();
  const svgRef = useRef<SVGSVGElement>(null);
  const inView = useInView(svgRef, { once: true, margin: '-80px', threshold: 0.3 });
  const filterId = 'convergence-glow';

  return (
    <svg ref={svgRef} viewBox="0 0 560 280" className="w-full h-full" role="img" aria-label="340萬次模擬路徑收斂至最佳軌跡">
      <defs>
        <GlowFilter rgb={accentRgb} id={filterId} stdDeviation={4} floodOpacity={0.5} />
      </defs>

      {PATHS.filter(p => !p.survives).map((p, i) => (
        <path
          key={`elim-${i}`}
          d={p.d}
          fill="none"
          stroke={`rgba(${accentRgb},0.6)`}
          strokeWidth={2}
          pathLength="1"
          strokeDasharray="1"
          strokeDashoffset={inView && !reduced ? 0 : 1}
          opacity={inView ? 0.6 : 0.15}
          style={{
            transition: reduced ? 'none' : `stroke-dashoffset 0.8s ease-out ${i * 0.08}s, opacity 0.8s ease-out ${i * 0.08}s`,
          }}
        />
      ))}

      {PATHS.filter(p => !p.survives).map((p, i) => (
        <EliminationMark
          key={`x-${i}`}
          x={p.eliminateX!}
          y={p.eliminateY!}
          delay={0.8 + i * 0.08}
          inView={inView}
          reduced={reduced}
        />
      ))}

      <path
        d={PATHS[0].d}
        fill="none"
        stroke={accentHex}
        strokeWidth={2.5}
        filter={`url(#${filterId})`}
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset={inView && !reduced ? 0 : 1}
        opacity={inView ? 1 : 0.15}
        style={{
          transition: reduced ? 'none' : 'stroke-dashoffset 1.5s ease-out 0.2s, opacity 1.5s ease-out 0.2s',
        }}
      />

      <circle
        cx={520} cy={140} r={5}
        fill={accentHex}
        filter={`url(#${filterId})`}
        opacity={inView ? 1 : 0}
        style={{
          transition: reduced ? 'none' : 'opacity 0.3s ease-out 1.7s',
        }}
      />

      <text
        x={45} y={268}
        fill="#FFFFFF" fontSize={20}
        fontFamily="'JetBrains Mono', monospace"
        opacity={inView ? 1 : 0}
        style={{
          transition: reduced ? 'none' : 'opacity 0.5s ease-out 0.5s',
        }}
      >
        3.4M+ 路徑
      </text>
      <text
        x={515} y={268}
        fill={accentHex} fontSize={20}
        fontFamily="'JetBrains Mono', monospace" textAnchor="end"
        opacity={inView ? 1 : 0}
        style={{
          transition: reduced ? 'none' : 'opacity 0.5s ease-out 1.7s',
        }}
      >
        最佳軌跡
      </text>
    </svg>
  );
}
