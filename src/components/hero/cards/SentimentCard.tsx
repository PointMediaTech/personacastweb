import { useRef, useEffect } from 'react';

const AXES = [
  { label: 'Positive', value: 0.3, color: { r: 100, g: 200, b: 255 } },
  { label: 'Negative', value: 0.65, color: { r: 181, g: 125, b: 125 } },
  { label: 'Neutral', value: 0.45, color: { r: 118, g: 158, b: 219 } },
  { label: 'Polarized', value: 0.8, color: { r: 255, g: 184, b: 0 } },
  { label: 'Viral', value: 0.55, color: { r: 100, g: 200, b: 255 } },
];

export function SentimentCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const size = 130;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cx = size / 2;
    const cy = size / 2;
    const maxR = size * 0.38;
    let progress = reducedMotion ? 1 : 0;
    const startTime = performance.now();

    function vertex(i: number, r: number) {
      const angle = (Math.PI * 2 * i) / AXES.length - Math.PI / 2;
      return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
    }

    const draw = () => {
      if (!reducedMotion) {
        const elapsed = (performance.now() - startTime) / 1000;
        progress = Math.min(1, elapsed);
      }

      ctx.clearRect(0, 0, size, size);

      for (const scale of [0.25, 0.5, 0.75, 1]) {
        ctx.beginPath();
        for (let i = 0; i < AXES.length; i++) {
          const v = vertex(i, maxR * scale);
          if (i === 0) ctx.moveTo(v.x, v.y);
          else ctx.lineTo(v.x, v.y);
        }
        ctx.closePath();
        ctx.strokeStyle = 'rgba(118,158,219,0.08)';
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      for (let i = 0; i < AXES.length; i++) {
        const v = vertex(i, maxR);
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(v.x, v.y);
        ctx.strokeStyle = 'rgba(118,158,219,0.06)';
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      ctx.beginPath();
      for (let i = 0; i < AXES.length; i++) {
        const v = vertex(i, maxR * AXES[i].value * progress);
        if (i === 0) ctx.moveTo(v.x, v.y);
        else ctx.lineTo(v.x, v.y);
      }
      ctx.closePath();
      ctx.fillStyle = 'rgba(100,200,255,0.06)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(100,200,255,0.4)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      for (let i = 0; i < AXES.length; i++) {
        const v = vertex(i, maxR * AXES[i].value * progress);
        const c = AXES[i].color;
        ctx.beginPath();
        ctx.arc(v.x, v.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${c.r},${c.g},${c.b},0.8)`;
        ctx.fill();
      }

      ctx.font = '7px "JetBrains Mono", monospace';
      for (let i = 0; i < AXES.length; i++) {
        const v = vertex(i, maxR + 12);
        ctx.fillStyle = 'rgba(255,255,255,0.35)';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(AXES[i].label, v.x, v.y);
      }

      if (!reducedMotion && progress < 1) {
        rafRef.current = requestAnimationFrame(draw);
      }
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[11px] font-semibold text-white/80 tracking-wide">
          SENTIMENT: <span className="text-[#FFB800]">POLARIZED</span>
        </span>
        <span className="font-mono text-[8px] text-white/20">•••</span>
      </div>
      <div className="flex justify-center">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}
