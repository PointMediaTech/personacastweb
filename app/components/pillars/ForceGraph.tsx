'use client';

import { useState } from 'react';

interface Node {
  id: number;
  cx: number;
  cy: number;
  r: number;
  type: 'center' | 'secondary' | 'peripheral';
}

interface Edge {
  from: number;
  to: number;
  opacity: number;
}

const NODES: Node[] = [
  // Center
  { id: 0, cx: 80, cy: 50, r: 6, type: 'center' },
  // Secondary nodes
  { id: 1, cx: 40, cy: 25, r: 4, type: 'secondary' },
  { id: 2, cx: 120, cy: 25, r: 3.5, type: 'secondary' },
  { id: 3, cx: 130, cy: 55, r: 3, type: 'secondary' },
  { id: 4, cx: 115, cy: 80, r: 4, type: 'secondary' },
  { id: 5, cx: 45, cy: 78, r: 3.5, type: 'secondary' },
  { id: 6, cx: 30, cy: 50, r: 3, type: 'secondary' },
  // Peripheral nodes
  { id: 7, cx: 20, cy: 15, r: 2, type: 'peripheral' },
  { id: 8, cx: 60, cy: 12, r: 1.5, type: 'peripheral' },
  { id: 9, cx: 140, cy: 15, r: 1.5, type: 'peripheral' },
  { id: 10, cx: 150, cy: 45, r: 2, type: 'peripheral' },
  { id: 11, cx: 145, cy: 75, r: 1.5, type: 'peripheral' },
  { id: 12, cx: 100, cy: 90, r: 2, type: 'peripheral' },
  { id: 13, cx: 55, cy: 92, r: 1.5, type: 'peripheral' },
  { id: 14, cx: 15, cy: 70, r: 1.5, type: 'peripheral' },
  { id: 15, cx: 10, cy: 38, r: 2, type: 'peripheral' },
];

const EDGES: Edge[] = [
  // Center to secondary
  { from: 0, to: 1, opacity: 0.3 },
  { from: 0, to: 2, opacity: 0.25 },
  { from: 0, to: 3, opacity: 0.2 },
  { from: 0, to: 4, opacity: 0.3 },
  { from: 0, to: 5, opacity: 0.25 },
  { from: 0, to: 6, opacity: 0.2 },
  // Secondary to peripheral
  { from: 1, to: 7, opacity: 0.12 },
  { from: 1, to: 8, opacity: 0.1 },
  { from: 2, to: 9, opacity: 0.1 },
  { from: 3, to: 10, opacity: 0.12 },
  { from: 4, to: 11, opacity: 0.1 },
  { from: 4, to: 12, opacity: 0.12 },
  { from: 5, to: 13, opacity: 0.1 },
  { from: 6, to: 14, opacity: 0.12 },
  { from: 6, to: 15, opacity: 0.1 },
];

function getConnectedEdges(nodeId: number) {
  return EDGES.filter((e) => e.from === nodeId || e.to === nodeId);
}

function getConnectedNodeIds(nodeId: number) {
  const ids = new Set<number>();
  EDGES.forEach((e) => {
    if (e.from === nodeId) ids.add(e.to);
    if (e.to === nodeId) ids.add(e.from);
  });
  return ids;
}

export function ForceGraph() {
  const [hoveredNodeId, setHoveredNodeId] = useState<number | null>(null);

  const connectedIds = hoveredNodeId !== null ? getConnectedNodeIds(hoveredNodeId) : new Set<number>();

  return (
    <div className="w-full">
      <p className="text-[8px] font-mono text-mist-blue-gray mb-2">
        STAKEHOLDER NETWORK &middot; 80 NODES
      </p>
      <svg
        viewBox="0 0 160 105"
        className="w-full"
        role="img"
        aria-label="Stakeholder network force graph"
      >
        <style>{`
          @keyframes float {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(2px, -2px); }
          }
        `}</style>

        {/* Edges */}
        {EDGES.map((edge, i) => {
          const from = NODES[edge.from];
          const to = NODES[edge.to];
          const isHighlighted =
            hoveredNodeId !== null &&
            (edge.from === hoveredNodeId || edge.to === hoveredNodeId);
          return (
            <line
              key={i}
              x1={from.cx}
              y1={from.cy}
              x2={to.cx}
              y2={to.cy}
              stroke="rgb(181,125,125)"
              strokeWidth={isHighlighted ? 1 : 0.5}
              opacity={isHighlighted ? 0.6 : edge.opacity}
              style={{ transition: 'opacity 0.3s, stroke-width 0.3s' }}
            />
          );
        })}

        {/* Nodes */}
        {NODES.map((node, i) => {
          const isHovered = hoveredNodeId === node.id;
          const isConnected = connectedIds.has(node.id);
          const brightness = isHovered ? 1 : isConnected ? 0.8 : node.type === 'center' ? 0.7 : node.type === 'secondary' ? 0.5 : 0.35;
          return (
            <circle
              key={node.id}
              cx={node.cx}
              cy={node.cy}
              r={isHovered ? node.r * 1.3 : node.r}
              fill="#B57D7D"
              opacity={brightness}
              style={{
                animation: `float 4s ease-in-out infinite`,
                animationDelay: `${i * 0.3}s`,
                cursor: 'pointer',
                transition: 'r 0.2s, opacity 0.3s',
              }}
              onMouseEnter={() => setHoveredNodeId(node.id)}
              onMouseLeave={() => setHoveredNodeId(null)}
            />
          );
        })}
      </svg>

      {/* Stat boxes */}
      <div className="flex gap-1.5 mt-1">
        {[
          { value: '80', label: 'NODES' },
          { value: '30', label: 'RELATIONS' },
          { value: '132', label: 'STRATEGIC' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="flex-1 bg-dried-rose/[0.06] rounded px-2 py-1.5 text-center border border-dried-rose/10"
          >
            <div className="text-xs font-bold text-dried-rose">{stat.value}</div>
            <div className="text-[7px] text-mist-blue-gray font-mono">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
