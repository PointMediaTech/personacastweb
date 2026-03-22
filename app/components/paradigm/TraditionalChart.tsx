export function TraditionalChart({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 340 120" className={className} role="img" aria-label="混亂的傳統監測折線圖">
      {/* Subtle grid */}
      {[30, 55, 80, 105].map((y) => (
        <line key={y} x1="0" y1={y} x2="340" y2={y} stroke="rgba(255,255,255,0.025)" strokeWidth="0.5" />
      ))}

      {/* Chaotic overlapping lines — with red tint */}
      <polyline
        points="0,65 18,48 36,72 54,32 72,68 90,42 108,78 126,38 144,82 162,28 180,72 198,52 216,62 234,48 252,58 270,70 288,40 306,65 324,50 340,55"
        fill="none"
        stroke="rgba(255,77,77,0.35)"
        strokeWidth="1.5"
      />
      <polyline
        points="0,42 18,58 36,32 54,68 72,38 90,72 108,28 126,62 144,42 162,78 180,32 198,68 216,48 234,72 252,38 270,58 288,68 306,35 324,60 340,45"
        fill="none"
        stroke="rgba(255,77,77,0.25)"
        strokeWidth="1.5"
      />
      <polyline
        points="0,52 18,72 36,48 54,58 72,82 90,32 108,62 126,52 144,72 162,42 180,58 198,78 216,38 234,52 252,68 270,42 288,55 306,75 324,42 340,60"
        fill="none"
        stroke="rgba(255,100,100,0.15)"
        strokeWidth="1"
      />

      {/* Noise scatter dots with red tint */}
      {[
        [30, 55], [65, 70], [95, 38], [130, 65], [160, 50], [195, 72],
        [225, 42], [260, 60], [290, 48], [320, 58],
        [50, 45], [110, 75], [170, 35], [240, 68], [305, 52],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1.2" fill="rgba(255,77,77,0.2)" />
      ))}

      {/* Large question mark — uncertainty */}
      <text x="170" y="72" fontSize="36" fill="rgba(255,77,77,0.12)" textAnchor="middle" fontWeight="bold">
        ?
      </text>
    </svg>
  );
}
