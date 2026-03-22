'use client';

const BANDS = [
  { color: '#B57D7D', opacity: 0.25, height: 50 },
  { color: '#B57D7D', opacity: 0.18, height: 38 },
  { color: '#FFB800', opacity: 0.2, height: 55 },
  { color: '#FFB800', opacity: 0.15, height: 42 },
  { color: '#769EDB', opacity: 0.2, height: 60 },
  { color: '#00F2FF', opacity: 0.15, height: 35 },
];

const TIME_LABELS = ['T+0h', 'T+24h', 'T+48h', 'T+72h'];

export function SentimentTimeline() {
  const bandWidth = 20;
  const gap = 4;
  const startX = 10;
  const baseY = 75;

  return (
    <div className="w-full">
      <p className="text-[8px] font-mono text-mist-blue-gray mb-2">
        SENTIMENT PULSE &middot; 72H WINDOW
      </p>
      <svg
        viewBox="0 0 160 100"
        className="w-full"
        role="img"
        aria-label="Sentiment timeline over 72 hours"
      >
        {/* Sentiment bands */}
        {BANDS.map((band, i) => (
          <rect
            key={i}
            x={startX + i * (bandWidth + gap)}
            y={baseY - band.height}
            width={bandWidth}
            height={band.height}
            rx={3}
            ry={3}
            fill={band.color}
            opacity={band.opacity}
            style={{
              animation: 'riskBreathing 2.5s infinite ease-in-out',
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}

        {/* Dashed trend line */}
        <line
          x1={startX + 5}
          y1={baseY - 55}
          x2={startX + (BANDS.length - 1) * (bandWidth + gap) + bandWidth - 5}
          y2={baseY - 20}
          stroke="#FFB800"
          strokeWidth={1}
          strokeDasharray="3 2"
          opacity={0.5}
        />

        {/* Time labels */}
        {TIME_LABELS.map((label, i) => {
          const totalWidth = BANDS.length * (bandWidth + gap) - gap;
          const x = startX + (i / (TIME_LABELS.length - 1)) * totalWidth;
          return (
            <text
              key={i}
              x={x}
              y={baseY + 10}
              textAnchor="middle"
              className="fill-mist-blue-gray"
              style={{ fontSize: '6px', fontFamily: 'var(--font-mono, monospace)' }}
            >
              {label}
            </text>
          );
        })}
      </svg>

      {/* Badges */}
      <div className="flex gap-1.5 mt-1">
        <span className="text-[7px] font-mono text-insight-gold bg-insight-gold/[0.08] rounded px-1.5 py-0.5">
          PUBLIC 公共輿論
        </span>
        <span className="text-[7px] font-mono text-insight-gold bg-insight-gold/[0.08] rounded px-1.5 py-0.5">
          INTERNAL 內部決策
        </span>
      </div>
    </div>
  );
}
