export function TraditionalChart({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 280 100" className={className} role="img" aria-label="雜亂的傳統監測折線圖">
      <polyline points="0,60 20,45 40,70 60,30 80,65 100,40 120,75 140,35 160,80 180,25 200,70 220,50 240,60 260,45 280,55" fill="none" stroke="#555" strokeWidth="1.5" opacity="0.5"/>
      <polyline points="0,40 20,55 40,30 60,65 80,35 100,70 120,25 140,60 160,40 180,75 200,30 220,65 240,45 260,70 280,35" fill="none" stroke="#444" strokeWidth="1.5" opacity="0.4"/>
      <polyline points="0,50 20,70 40,45 60,55 80,80 100,30 120,60 140,50 160,70 180,40 200,55 220,75 240,35 260,50 280,65" fill="none" stroke="#666" strokeWidth="1" opacity="0.3"/>
      <text x="140" y="55" fontSize="28" fill="#555" textAnchor="middle" opacity="0.4">?</text>
    </svg>
  );
}
