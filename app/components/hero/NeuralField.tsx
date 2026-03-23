'use client';

/**
 * NeuralField — Fills entire right wing (65vw x 100vh).
 * Absolute positioned. Overflows right + bottom edges.
 * Dense, visible, with explicit gold flashpoint paths.
 */

interface FieldNode {
  readonly x: number;
  readonly y: number;
  readonly gold: boolean;
  readonly size: 'sm' | 'md' | 'lg';
}

function seeded(s: number) {
  let seed = s;
  return () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
}

function buildNodes(): readonly FieldNode[] {
  const rand = seeded(77);
  const nodes: FieldNode[] = [];

  // Dense core — center of the field
  for (let i = 0; i < 55; i++) {
    const angle = rand() * Math.PI * 2;
    const dist = rand() * 0.35 + 0.05;
    const x = 0.42 + Math.cos(angle) * dist;
    const y = 0.45 + Math.sin(angle) * dist;
    const isGold = rand() < 0.1;
    const size = rand() < 0.12 ? 'lg' : rand() < 0.35 ? 'md' : 'sm';
    nodes.push({ x, y, gold: isGold, size });
  }

  // Outer halo
  for (let i = 0; i < 40; i++) {
    const angle = rand() * Math.PI * 2;
    const dist = rand() * 0.25 + 0.38;
    const x = 0.42 + Math.cos(angle) * dist;
    const y = 0.45 + Math.sin(angle) * dist;
    nodes.push({ x, y, gold: false, size: 'sm' });
  }

  // Edge bleed — right side
  for (let i = 0; i < 15; i++) {
    nodes.push({ x: 0.82 + rand() * 0.25, y: rand() * 0.9 + 0.05, gold: false, size: 'sm' });
  }

  // Edge bleed — bottom
  for (let i = 0; i < 10; i++) {
    nodes.push({ x: rand() * 0.8 + 0.1, y: 0.88 + rand() * 0.15, gold: false, size: 'sm' });
  }

  // Edge bleed — top
  for (let i = 0; i < 8; i++) {
    nodes.push({ x: rand() * 0.6 + 0.2, y: rand() * 0.08, gold: false, size: 'sm' });
  }

  return nodes;
}

function buildEdges(nodes: readonly FieldNode[], maxDist: number): readonly [number, number][] {
  const edges: [number, number][] = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      if (Math.sqrt(dx * dx + dy * dy) < maxDist) {
        edges.push([i, j]);
      }
    }
  }
  return edges;
}

const NODES = buildNodes();
const EDGES = buildEdges(NODES, 0.1);

// Explicit gold flashpoint path — 3 strong lines
const FLASHPOINT_LINES: readonly { x1: number; y1: number; x2: number; y2: number }[] = [
  { x1: 0.25, y1: 0.30, x2: 0.42, y2: 0.42 },
  { x1: 0.42, y1: 0.42, x2: 0.58, y2: 0.35 },
  { x1: 0.58, y1: 0.35, x2: 0.72, y2: 0.55 },
];

interface NeuralFieldProps {
  readonly parallaxX: number;
  readonly parallaxY: number;
}

export function NeuralField({ parallaxX, parallaxY }: NeuralFieldProps) {
  const px = parallaxX * -12;
  const py = parallaxY * -8;

  return (
    <div
      className="w-full h-full"
      style={{ animation: 'breathe-scale 12s ease-in-out infinite' }}
    >
      <svg
        viewBox="0 0 1000 1000"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid slice"
        style={{ transform: `translate(${px}px, ${py}px)` }}
      >
        {/* Edges — visible */}
        {EDGES.map(([a, b], i) => {
          const na = NODES[a];
          const nb = NODES[b];
          const eitherGold = na.gold || nb.gold;
          return (
            <line
              key={i}
              x1={na.x * 1000} y1={na.y * 1000}
              x2={nb.x * 1000} y2={nb.y * 1000}
              stroke={eitherGold ? 'rgba(255,184,0,0.25)' : 'rgba(118,158,219,0.2)'}
              strokeWidth={eitherGold ? '1.2' : '0.6'}
            />
          );
        })}

        {/* Flashpoint path — explicit gold lines, BOLD */}
        {FLASHPOINT_LINES.map((line, i) => (
          <line
            key={`fp${i}`}
            x1={line.x1 * 1000} y1={line.y1 * 1000}
            x2={line.x2 * 1000} y2={line.y2 * 1000}
            stroke="#FFB800"
            strokeWidth="2"
          >
            <animate attributeName="opacity" values="0.3;0.7;0.3" dur="3s" repeatCount="indefinite" begin={`${i * 0.4}s`} />
          </line>
        ))}

        {/* Flashpoint path nodes — strong gold dots at junctions */}
        {[
          { x: 0.25, y: 0.30 },
          { x: 0.42, y: 0.42 },
          { x: 0.58, y: 0.35 },
          { x: 0.72, y: 0.55 },
        ].map((pt, i) => (
          <g key={`fpn${i}`}>
            <circle cx={pt.x * 1000} cy={pt.y * 1000} r="18" fill="rgba(255,184,0,0.04)">
              <animate attributeName="r" values="18;25;18" dur="4s" repeatCount="indefinite" begin={`${i * 0.3}s`} />
              <animate attributeName="opacity" values="0.04;0.08;0.04" dur="4s" repeatCount="indefinite" begin={`${i * 0.3}s`} />
            </circle>
            <circle cx={pt.x * 1000} cy={pt.y * 1000} r="5" fill="#FFB800">
              <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite" begin={`${i * 0.3}s`} />
            </circle>
          </g>
        ))}

        {/* Regular nodes */}
        {NODES.map((node, i) => {
          const cx = node.x * 1000;
          const cy = node.y * 1000;
          const r = node.size === 'lg' ? 4 : node.size === 'md' ? 2.8 : 1.8;

          if (node.gold) {
            return (
              <g key={i}>
                <circle cx={cx} cy={cy} r={r * 4} fill="rgba(255,184,0,0.04)">
                  <animate attributeName="r" values={`${r * 4};${r * 6};${r * 4}`} dur="5s" repeatCount="indefinite" begin={`${i * 0.15}s`} />
                </circle>
                <circle cx={cx} cy={cy} r={r} fill="#FFB800">
                  <animate attributeName="opacity" values="0.6;1;0.6" dur="4s" repeatCount="indefinite" begin={`${i * 0.15}s`} />
                </circle>
              </g>
            );
          }

          return (
            <circle key={i} cx={cx} cy={cy} r={r} fill="rgba(118,158,219,0.4)" />
          );
        })}
      </svg>
    </div>
  );
}
