'use client';
import { useRef } from 'react';
import { useInView, useReducedMotion } from '@/app/lib/animations';
import type { ScenarioVisualProps } from './index';
import { GlowFilter } from './GlowFilter';

const UNCONTROLLED_PATH = 'M40,200 C120,195 250,170 350,100 Q430,50 520,40';
const INTERCEPTED_PATH = 'M40,200 C100,190 160,150 200,120 Q280,100 360,140 Q440,160 520,160';

export function TimelineComparison({ accentRgb, accentHex }: ScenarioVisualProps) {
  const reduced = useReducedMotion();
  const svgRef = useRef<SVGSVGElement>(null);
  const inView = useInView(svgRef, { once: true, margin: '-80px', threshold: 0.3 });
  const filterId = 'timeline-glow';

  const fadeStyle = (delay: number) => ({
    opacity: inView ? 1 : (reduced ? 1 : 0.15),
    transition: reduced ? 'none' : `opacity 0.8s ease-out ${delay}s`,
  });

  const pathStyle = (delay: number) => ({
    opacity: inView ? 1 : (reduced ? 1 : 0.15),
    strokeDashoffset: inView && !reduced ? 0 : 1,
    transition: reduced ? 'none' : `stroke-dashoffset 1.2s ease-out ${delay}s, opacity 1.2s ease-out ${delay}s`,
  });

  return (
    <svg ref={svgRef} viewBox="0 0 560 280" className="w-full h-full" role="img" aria-label="危機輿論攔截前後對比時間軸">
      <defs>
        <GlowFilter rgb={accentRgb} id={filterId} />
      </defs>

      {/* Time axis */}
      <line x1={40} y1={240} x2={520} y2={240} stroke="rgba(255,255,255,0.1)" strokeWidth={1} style={fadeStyle(0)} />
      <text x={40} y={260} fill="#FFFFFF" fontSize={20} fontFamily="'JetBrains Mono', monospace" style={fadeStyle(0)}>T-72hr</text>
      <text x={500} y={260} fill="#FFFFFF" fontSize={20} fontFamily="'JetBrains Mono', monospace" style={fadeStyle(0)}>T+0</text>

      {/* Uncontrolled curve — red dashed, dim (fade only, no pathLength — strokeDasharray conflicts with pathLength animation) */}
      <path
        d={UNCONTROLLED_PATH}
        fill="none"
        stroke="#FF8C00"
        strokeWidth={1.5}
        strokeDasharray="6 4"
        style={fadeStyle(0)}
      />

      {/* Intercepted curve — accent, solid, glow */}
      <path
        d={INTERCEPTED_PATH}
        fill="none"
        stroke={accentHex}
        strokeWidth={2}
        filter={`url(#${filterId})`}
        pathLength="1"
        strokeDasharray="1"
        style={pathStyle(0.3)}
      />

      {/* Intervention marker — vertical dashed */}
      <line
        x1={196} y1={50} x2={196} y2={240}
        stroke="rgba(255,255,255,0.25)"
        strokeWidth={1}
        strokeDasharray="4 3"
        style={fadeStyle(0.6)}
      />
      <text
        x={196} y={42}
        fill="#FFFFFF"
        fontSize={20}
        fontFamily="'JetBrains Mono', monospace"
        textAnchor="middle"
        style={fadeStyle(0.6)}
      >
        介入點
      </text>

      {/* Intervention marker pulse — continuous after entry (skipped if reduced motion) */}
      {!reduced && (
        <line
          x1={196} y1={50} x2={196} y2={240}
          stroke={accentHex}
          strokeWidth={1}
          strokeDasharray="4 3"
          opacity={0}
        >
          <animate
            attributeName="opacity"
            values="0;0.4;0.7;0.4;0"
            dur="2s"
            repeatCount="indefinite"
            begin="1.5s"
          />
        </line>
      )}

      {/* Labels */}
      <text x={505} y={33} fill="#FFFFFF" fontSize={20} fontFamily="'JetBrains Mono', monospace" textAnchor="end" style={fadeStyle(1.0)}>未攔截</text>
      <text x={505} y={153} fill={accentHex} fontSize={20} fontFamily="'JetBrains Mono', monospace" textAnchor="end" style={fadeStyle(1.3)}>攔截後</text>
    </svg>
  );
}
