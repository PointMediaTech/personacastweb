'use client';

import { useEffect, useRef } from 'react';

/**
 * Animated diagonal wave grid with bokeh nodes.
 * Diagonal lines ripple like water waves with visible flowing motion.
 */
export function ScanlineBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0;
    let h = 0;

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas!.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    // ── Bokeh / data nodes ──
    const nodes = [
      { x: 0.07, y: 0.14, left: true },  { x: 0.14, y: 0.36, left: true },
      { x: 0.05, y: 0.56, left: true },  { x: 0.21, y: 0.76, left: true },
      { x: 0.11, y: 0.88, left: true },  { x: 0.29, y: 0.19, left: true },
      { x: 0.34, y: 0.48, left: true },  { x: 0.27, y: 0.66, left: true },
      { x: 0.39, y: 0.33, left: true },  { x: 0.17, y: 0.44, left: true },
      { x: 0.41, y: 0.80, left: true },
      { x: 0.57, y: 0.13, left: false }, { x: 0.64, y: 0.39, left: false },
      { x: 0.71, y: 0.54, left: false }, { x: 0.59, y: 0.76, left: false },
      { x: 0.77, y: 0.24, left: false }, { x: 0.84, y: 0.49, left: false },
      { x: 0.69, y: 0.86, left: false }, { x: 0.91, y: 0.34, left: false },
      { x: 0.87, y: 0.69, left: false }, { x: 0.94, y: 0.83, left: false },
      { x: 0.74, y: 0.14, left: false }, { x: 0.81, y: 0.61, left: false },
    ];

    function draw(time: number) {
      const t = time * 0.001; // seconds
      ctx!.clearRect(0, 0, w, h);

      const diag = Math.sqrt(w * w + h * h);

      // ────────────────────────────────────
      // Set 1: lines ~30° (top-left → bottom-right)
      // ────────────────────────────────────
      {
        const angleDeg = 30;
        const angleRad = (angleDeg * Math.PI) / 180;
        const cos = Math.cos(angleRad);
        const sin = Math.sin(angleRad);
        const perpX = -sin;
        const perpY = cos;
        const count = 28;
        const totalSpread = diag * 1.4;
        const spacing = totalSpread / count;
        const lineLen = diag * 1.6;

        // Global drift: gentle shift perpendicular over time
        const globalDrift = Math.sin(t * 0.15) * spacing * 0.5;

        for (let i = 0; i < count; i++) {
          const offset = (i - count / 2) * spacing + globalDrift;
          const centerDist = Math.abs(i - count / 2) / (count / 2);
          const opacity = 0.06 + (1 - centerDist) * 0.12;

          const startX = w / 2 + perpX * offset - cos * lineLen / 2;
          const startY = h / 2 + perpY * offset - sin * lineLen / 2;

          ctx!.beginPath();

          const segments = 80;
          for (let s = 0; s <= segments; s++) {
            const frac = s / segments;
            const along = frac * lineLen;

            let px = startX + cos * along;
            let py = startY + sin * along;

            // Gentle wave — slow visible undulation
            const wave1 = Math.sin(along * 0.003 + t * 0.6 + i * 0.6) * 18;
            const wave2 = Math.sin(along * 0.008 + t * 0.9 + i * 1.2) * 7;
            const wave = wave1 + wave2;

            px += perpX * wave;
            py += perpY * wave;

            if (s === 0) ctx!.moveTo(px, py);
            else ctx!.lineTo(px, py);
          }

          ctx!.strokeStyle = `rgba(118,158,219,${opacity.toFixed(3)})`;
          ctx!.lineWidth = 0.8;
          ctx!.stroke();
        }
      }

      // ────────────────────────────────────
      // Set 2: lines ~-30° (top-right → bottom-left)
      // ────────────────────────────────────
      {
        const angleDeg = -30;
        const angleRad = (angleDeg * Math.PI) / 180;
        const cos = Math.cos(angleRad);
        const sin = Math.sin(angleRad);
        const perpX = -sin;
        const perpY = cos;
        const count = 28;
        const totalSpread = diag * 1.4;
        const spacing = totalSpread / count;
        const lineLen = diag * 1.6;

        const globalDrift = Math.sin(t * 0.12 + 1.5) * spacing * 0.4;

        for (let i = 0; i < count; i++) {
          const offset = (i - count / 2) * spacing + globalDrift;
          const centerDist = Math.abs(i - count / 2) / (count / 2);
          const opacity = 0.05 + (1 - centerDist) * 0.10;

          const startX = w / 2 + perpX * offset - cos * lineLen / 2;
          const startY = h / 2 + perpY * offset - sin * lineLen / 2;

          ctx!.beginPath();

          const segments = 80;
          for (let s = 0; s <= segments; s++) {
            const frac = s / segments;
            const along = frac * lineLen;

            let px = startX + cos * along;
            let py = startY + sin * along;

            const wave1 = Math.sin(along * 0.0035 + t * 0.5 + i * 0.7 + 2.0) * 16;
            const wave2 = Math.sin(along * 0.009 + t * 0.8 + i * 1.0 + 1.0) * 6;
            const wave = wave1 + wave2;

            px += perpX * wave;
            py += perpY * wave;

            if (s === 0) ctx!.moveTo(px, py);
            else ctx!.lineTo(px, py);
          }

          ctx!.strokeStyle = `rgba(118,158,219,${opacity.toFixed(3)})`;
          ctx!.lineWidth = 0.7;
          ctx!.stroke();
        }
      }

      // ── Bokeh / data nodes with float ──
      nodes.forEach(({ x, y, left }) => {
        const px = x * w;
        const py = y * h;
        const r = 2.5;

        const floatX = Math.sin(t * 0.5 + x * 12) * 3;
        const floatY = Math.cos(t * 0.4 + y * 12) * 3;
        const nx = px + floatX;
        const ny = py + floatY;

        const gradient = ctx!.createRadialGradient(nx, ny, 0, nx, ny, r * 5);
        if (left) {
          gradient.addColorStop(0, 'rgba(255,120,80,0.6)');
          gradient.addColorStop(1, 'rgba(255,120,80,0)');
        } else {
          gradient.addColorStop(0, 'rgba(0,242,255,0.65)');
          gradient.addColorStop(1, 'rgba(0,242,255,0)');
        }
        ctx!.beginPath();
        ctx!.arc(nx, ny, r * 5, 0, Math.PI * 2);
        ctx!.fillStyle = gradient;
        ctx!.fill();

        ctx!.beginPath();
        ctx!.arc(nx, ny, r, 0, Math.PI * 2);
        ctx!.fillStyle = left ? 'rgba(255,120,80,0.7)' : 'rgba(0,242,255,0.75)';
        ctx!.fill();
      });

      rafRef.current = requestAnimationFrame(draw);
    }

    resize();
    rafRef.current = requestAnimationFrame(draw);

    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 25% 50%, rgba(255,90,50,0.04) 0%, transparent 50%), ' +
            'radial-gradient(ellipse at 75% 50%, rgba(0,242,255,0.04) 0%, transparent 50%), ' +
            'radial-gradient(ellipse at 50% 50%, rgba(118,158,219,0.03) 0%, transparent 60%)',
        }}
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}
