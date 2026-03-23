'use client';
import { useReducedMotion, useMountAnimation, EASE_CSS } from '@/app/lib/animations';

/**
 * NeuralHeadSilhouette — Centered, breathing neural head.
 * Positioned dead center of the viewport as the visual anchor.
 */
export function NeuralHeadSilhouette() {
  const reduced = useReducedMotion();
  const mounted = useMountAnimation();

  return (
    <div
      className="absolute inset-0 z-[1] flex items-center justify-center pointer-events-none"
      aria-hidden="true"
    >
      {/* Ambient radial glow — the only light source */}
      <div
        className="absolute w-[700px] h-[700px] md:w-[900px] md:h-[900px]"
        style={{
          background: 'radial-gradient(circle, rgba(118,158,219,0.12) 0%, rgba(118,158,219,0.03) 40%, transparent 65%)',
        }}
      />

      {/* The Neural Oracle SVG — mount fade + breathing scale */}
      <div
        style={{
          opacity: mounted ? 1 : 0,
          transition: `opacity 2.5s ${EASE_CSS}`,
        }}
      >
        <svg
          viewBox="0 0 500 700"
          className="w-[280px] h-[400px] md:w-[380px] md:h-[530px] lg:w-[420px] lg:h-[590px]"
          style={{
            marginTop: '3vh',
            animation: reduced ? 'none' : 'breathe-scale 10s ease-in-out infinite',
          }}
        >
          {/* Head contour */}
          <path
            d="M 230 65 C 260 40, 330 30, 370 55 C 405 75, 425 110, 435 155
               C 445 205, 440 260, 430 310 C 420 355, 400 395, 375 430
               C 355 455, 335 478, 315 498 C 300 512, 290 535, 285 565
               C 280 595, 282 625, 285 660 L 215 660
               C 218 625, 215 595, 208 565 C 198 535, 182 510, 165 488
               C 145 460, 128 432, 118 400 C 108 365, 103 330, 102 295
               C 101 255, 110 218, 128 188 C 140 168, 155 148, 170 132
               C 188 108, 205 88, 230 65 Z"
            fill="none"
            stroke="rgba(118,158,219,0.15)"
            strokeWidth="1"
          />

          {/* Internal neural lines */}
          <g stroke="rgba(118,158,219,0.2)" strokeWidth="0.7">
            <line x1="260" y1="90" x2="340" y2="120" />
            <line x1="340" y1="120" x2="390" y2="190" />
            <line x1="390" y1="190" x2="400" y2="280" />
            <line x1="400" y1="280" x2="370" y2="360" />
            <line x1="370" y1="360" x2="320" y2="420" />
            <line x1="260" y1="90" x2="200" y2="140" />
            <line x1="200" y1="140" x2="160" y2="220" />
            <line x1="160" y1="220" x2="145" y2="310" />
            <line x1="145" y1="310" x2="180" y2="390" />
            <line x1="180" y1="390" x2="240" y2="450" />
            <line x1="200" y1="140" x2="340" y2="120" />
            <line x1="260" y1="180" x2="390" y2="190" />
            <line x1="160" y1="220" x2="310" y2="210" />
            <line x1="310" y1="210" x2="400" y2="280" />
            <line x1="200" y1="270" x2="350" y2="260" />
            <line x1="145" y1="310" x2="280" y2="320" />
            <line x1="280" y1="320" x2="400" y2="280" />
            <line x1="210" y1="350" x2="370" y2="360" />
            <line x1="180" y1="390" x2="320" y2="390" />
            <line x1="320" y1="390" x2="370" y2="360" />
            <line x1="240" y1="450" x2="320" y2="420" />
            <line x1="270" y1="160" x2="340" y2="200" />
            <line x1="250" y1="230" x2="340" y2="260" />
            <line x1="300" y1="170" x2="360" y2="240" />
            <line x1="220" y1="280" x2="300" y2="330" />
            <line x1="300" y1="330" x2="360" y2="310" />
            <line x1="250" y1="400" x2="310" y2="380" />
          </g>

          {/* Vertex nodes */}
          <g>
            {[
              [260, 90], [340, 120], [390, 190], [400, 280], [370, 360], [320, 420],
              [200, 140], [160, 220], [145, 310], [180, 390], [240, 450],
              [310, 210], [270, 160], [250, 230], [200, 270], [280, 320],
              [210, 350], [320, 390], [340, 260], [360, 240],
            ].map(([cx, cy], i) => (
              <circle key={i} cx={cx} cy={cy} r="2" fill="rgba(118,158,219,0.4)" />
            ))}
          </g>

          {/* 3 Insight Gold nodes — SVG <animate> for r/opacity pulses */}
          {[
            { cx: 300, cy: 170 },
            { cx: 350, cy: 260 },
            { cx: 260, cy: 90 },
          ].map((node, i) => (
            <g key={i}>
              <circle cx={node.cx} cy={node.cy} r="8" fill="rgba(255,184,0,0.06)">
                <animate attributeName="r" values="8;12;8" dur="4s" repeatCount="indefinite" begin={`${i * 0.5}s`} />
                <animate attributeName="opacity" values="0.06;0.12;0.06" dur="4s" repeatCount="indefinite" begin={`${i * 0.5}s`} />
              </circle>
              <circle cx={node.cx} cy={node.cy} r="3" fill="#FFB800">
                <animate attributeName="opacity" values="0.5;0.9;0.5" dur="4s" repeatCount="indefinite" begin={`${i * 0.5}s`} />
              </circle>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
