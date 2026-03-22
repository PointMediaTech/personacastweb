'use client';
import { useRef, useEffect } from 'react';

const CYAN = { r: 100, g: 200, b: 255 };

const BASE_DATA = [
  0.42, 0.45, 0.48, 0.52, 0.55, 0.58, 0.62, 0.65, 0.61, 0.68,
  0.72, 0.74, 0.78, 0.76, 0.80, 0.83, 0.85, 0.87, 0.86, 0.884,
];

export function ConflictIndexCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = 290;
    const h = 80;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let time = 0;
    let lastFrame = 0;
    const FRAME_INTERVAL = 1000 / 30;

    const draw = (timestamp: number) => {
      if (timestamp - lastFrame < FRAME_INTERVAL) {
        if (!reducedMotion) rafRef.current = requestAnimationFrame(draw);
        return;
      }
      lastFrame = timestamp;
      time += 0.033;
      ctx.clearRect(0, 0, w, h);

      const padding = { top: 5, bottom: 5, left: 5, right: 5 };
      const chartW = w - padding.left - padding.right;
      const chartH = h - padding.top - padding.bottom;

      const data = BASE_DATA.map((v, i) =>
        v + Math.sin(time * Math.PI + i * 0.5) * 0.015
      );

      const minV = 0.3;
      const maxV = 1.0;

      const toX = (i: number) => padding.left + (i / (data.length - 1)) * chartW;
      const toY = (v: number) => padding.top + (1 - (v - minV) / (maxV - minV)) * chartH;

      ctx.beginPath();
      ctx.moveTo(toX(0), toY(data[0]));
      for (let i = 1; i < data.length; i++) {
        ctx.lineTo(toX(i), toY(data[i]));
      }
      ctx.lineTo(toX(data.length - 1), h - padding.bottom);
      ctx.lineTo(toX(0), h - padding.bottom);
      ctx.closePath();
      ctx.fillStyle = `rgba(${CYAN.r},${CYAN.g},${CYAN.b},0.08)`;
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(toX(0), toY(data[0]));
      for (let i = 1; i < data.length; i++) {
        ctx.lineTo(toX(i), toY(data[i]));
      }
      ctx.strokeStyle = `rgba(${CYAN.r},${CYAN.g},${CYAN.b},0.7)`;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      const lastX = toX(data.length - 1);
      const lastY = toY(data[data.length - 1]);
      ctx.beginPath();
      ctx.arc(lastX, lastY, 3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${CYAN.r},${CYAN.g},${CYAN.b},0.9)`;
      ctx.fill();

      if (!reducedMotion) {
        rafRef.current = requestAnimationFrame(draw);
      }
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[14px] font-semibold text-white/80 tracking-wide">
          CONFLICT INDEX: <span className="text-[16px] text-[#64C8FF]">88.4%</span>
        </span>
        <span className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-[#B57D7D]/20 text-[#B57D7D] font-bold tracking-wider">
          HIGH RISK
        </span>
      </div>
      <canvas ref={canvasRef} />
    </div>
  );
}
