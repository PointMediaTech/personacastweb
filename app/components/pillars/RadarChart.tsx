'use client';

const AXES = [
  { label: '政治立場', angle: -90 },
  { label: '決斷力', angle: -30 },
  { label: '風險偏好', angle: 30 },
  { label: '社會信任', angle: 90 },
  { label: '情緒穩定', angle: 150 },
  { label: '媒體敏感', angle: 210 },
];

const DATA_VALUES = [0.8, 0.65, 0.7, 0.55, 0.75, 0.6];

function polarToXY(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function hexagonPoints(cx: number, cy: number, r: number) {
  return AXES.map((_, i) => {
    const angle = -90 + i * 60;
    const p = polarToXY(cx, cy, r, angle);
    return `${p.x},${p.y}`;
  }).join(' ');
}

export function RadarChart() {
  const cx = 80;
  const cy = 55;
  const maxR = 35;

  const dataPoints = AXES.map((_, i) => {
    const angle = -90 + i * 60;
    return polarToXY(cx, cy, maxR * DATA_VALUES[i], angle);
  });

  const dataPolygon = dataPoints.map((p) => `${p.x},${p.y}`).join(' ');

  const labelPositions = AXES.map((axis, i) => {
    const angle = -90 + i * 60;
    const p = polarToXY(cx, cy, maxR + 12, angle);
    return { ...p, label: axis.label };
  });

  return (
    <div className="w-full">
      <p className="text-[8px] font-mono text-mist-blue-gray mb-2">
        AGENT: 陳立峰 &middot; ENTJ
      </p>
      <svg
        viewBox="0 0 160 115"
        className="w-full"
        role="img"
        aria-label="Radar chart showing agent personality profile"
      >
        {/* Grid hexagons */}
        <polygon
          points={hexagonPoints(cx, cy, maxR)}
          fill="none"
          stroke="rgba(118,158,219,0.1)"
          strokeWidth={0.5}
        />
        <polygon
          points={hexagonPoints(cx, cy, maxR * 0.5)}
          fill="none"
          stroke="rgba(118,158,219,0.08)"
          strokeWidth={0.5}
        />

        {/* Axis lines */}
        {AXES.map((_, i) => {
          const angle = -90 + i * 60;
          const p = polarToXY(cx, cy, maxR, angle);
          return (
            <line
              key={i}
              x1={cx}
              y1={cy}
              x2={p.x}
              y2={p.y}
              stroke="rgba(118,158,219,0.08)"
              strokeWidth={0.3}
            />
          );
        })}

        {/* Rotating data group */}
        <g
          className="animate-[spin_30s_linear_infinite] hover:[animation-play-state:paused]"
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        >
          <polygon
            points={dataPolygon}
            fill="rgba(118,158,219,0.12)"
            stroke="#769EDB"
            strokeWidth={1.5}
          />
          {dataPoints.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r={2.5} fill="#769EDB" />
          ))}
        </g>

        {/* Axis labels */}
        {labelPositions.map((p, i) => (
          <text
            key={i}
            x={p.x}
            y={p.y}
            textAnchor="middle"
            dominantBaseline="central"
            className="fill-mist-blue-gray"
            style={{ fontSize: '7px', fontFamily: 'var(--font-mono, monospace)' }}
          >
            {p.label}
          </text>
        ))}
      </svg>
    </div>
  );
}
