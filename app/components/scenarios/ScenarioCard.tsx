'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CTA_PLACEHOLDER, type ScenarioData } from './scenarioData';

/* ================================================================
   VISUAL: Waveform (Module 01 — thicker stroke + glow dots at peaks)
   ================================================================ */
function WaveformVisual({ rgb }: { rgb: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      const midY = H * 0.48;
      const ampMax = H * 0.30;

      // Store points for glow dots
      const points: { x: number; y: number; amp: number }[] = [];

      ctx.beginPath();
      ctx.strokeStyle = `rgb(${rgb})`;
      ctx.lineWidth = 3;
      ctx.shadowColor = `rgb(${rgb})`;
      ctx.shadowBlur = 12;

      for (let x = 0; x < W * 0.78; x++) {
        const progress = x / (W * 0.78);
        const envelope = Math.max(0, 1 - progress * 1.1);
        const amp = ampMax * envelope;
        const y =
          midY +
          amp * Math.sin((progress * 12 + t * 2.5) * Math.PI) * 0.6 +
          amp * Math.sin((progress * 18 + t * 3.8) * Math.PI) * 0.25 +
          amp * Math.sin((progress * 7 + t * 1.2) * Math.PI) * 0.15;

        const px = x + W * 0.05;
        if (x === 0) ctx.moveTo(px, y);
        else ctx.lineTo(px, y);

        // Sample points for glow dots at intervals
        if (x % 28 === 0 && amp > ampMax * 0.15) {
          points.push({ x: px, y, amp });
        }
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Glow dots at wave peaks
      for (const p of points) {
        const intensity = Math.abs(p.y - midY) / ampMax;
        if (intensity > 0.3) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${0.4 * intensity})`;
          ctx.shadowColor = `rgb(${rgb})`;
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      // Flat line continuation
      ctx.beginPath();
      ctx.strokeStyle = `rgba(${rgb},0.3)`;
      ctx.lineWidth = 2;
      ctx.moveTo(W * 0.83, midY);
      ctx.lineTo(W * 0.93, midY);
      ctx.stroke();

      // Arrow head
      ctx.beginPath();
      ctx.strokeStyle = `rgba(${rgb},0.4)`;
      ctx.lineWidth = 2;
      ctx.moveTo(W * 0.90, midY - 5);
      ctx.lineTo(W * 0.93, midY);
      ctx.lineTo(W * 0.90, midY + 5);
      ctx.stroke();

      // "48hr" label
      ctx.fillStyle = `rgba(${rgb},0.7)`;
      ctx.font = 'bold 18px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText('T+72hr', W * 0.78, midY + ampMax * 0.6 + 24);

      t += 0.008;
      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, [rgb]);

  return (
    <canvas ref={canvasRef} width={560} height={280} className="w-full h-full" />
  );
}

/* ================================================================
   VISUAL: Orb (Module 02 — dark sphere with blue glow + particles)
   ================================================================ */
function OrbVisual({ rgb }: { rgb: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const particles: { angle: number; dist: number; size: number; speed: number; opacity: number }[] = [];
    for (let i = 0; i < 80; i++) {
      particles.push({
        angle: Math.random() * Math.PI * 2,
        dist: 75 + Math.random() * 75,
        size: 0.6 + Math.random() * 2.5,
        speed: 0.002 + Math.random() * 0.008,
        opacity: 0.2 + Math.random() * 0.6,
      });
    }

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      const cx = W / 2;
      const cy = H / 2;
      ctx.clearRect(0, 0, W, H);

      const outerGlow = ctx.createRadialGradient(cx, cy, 40, cx, cy, 140);
      outerGlow.addColorStop(0, `rgba(${rgb},0.12)`);
      outerGlow.addColorStop(0.5, `rgba(${rgb},0.04)`);
      outerGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = outerGlow;
      ctx.fillRect(0, 0, W, H);

      const sphereR = 68;
      const sphereGrad = ctx.createRadialGradient(cx - 10, cy - 10, 6, cx, cy, sphereR);
      sphereGrad.addColorStop(0, 'rgba(16,22,35,0.95)');
      sphereGrad.addColorStop(0.7, 'rgba(8,11,16,0.98)');
      sphereGrad.addColorStop(1, 'rgba(8,11,16,0.6)');
      ctx.beginPath();
      ctx.arc(cx, cy, sphereR, 0, Math.PI * 2);
      ctx.fillStyle = sphereGrad;
      ctx.fill();

      const pulse = 0.6 + 0.4 * Math.sin(t * 1.5);
      const coreGrad = ctx.createRadialGradient(cx, cy, 3, cx, cy, 28);
      coreGrad.addColorStop(0, `rgba(${rgb},${0.5 * pulse})`);
      coreGrad.addColorStop(0.5, `rgba(${rgb},${0.2 * pulse})`);
      coreGrad.addColorStop(1, 'transparent');
      ctx.beginPath();
      ctx.arc(cx, cy, 28, 0, Math.PI * 2);
      ctx.fillStyle = coreGrad;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(cx, cy, sphereR, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${rgb},${0.15 + 0.1 * pulse})`;
      ctx.lineWidth = 1.2;
      ctx.stroke();

      for (const p of particles) {
        p.angle += p.speed;
        const wobble = Math.sin(t * 2 + p.angle * 3) * 10;
        const px = cx + Math.cos(p.angle) * (p.dist + wobble);
        const py = cy + Math.sin(p.angle) * (p.dist * 0.7 + wobble * 0.5);
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb},${p.opacity * (0.3 + 0.4 * Math.sin(t + p.angle))})`;
        ctx.fill();
      }

      t += 0.02;
      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, [rgb]);

  return (
    <canvas ref={canvasRef} width={420} height={300} className="w-full h-full" />
  );
}

/* ================================================================
   VISUAL: Comet (Module 03 — softer cyan-green streak)
   ================================================================ */
function CometVisual({ rgb }: { rgb: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      const startX = W * 0.03;
      const startY = H * 0.88;
      const endX = W * 0.97;
      const endY = H * 0.12;

      const shimmer = 0.55 + 0.25 * Math.sin(t * 2);

      ctx.save();
      ctx.translate(startX, startY);
      const angle = Math.atan2(endY - startY, endX - startX);
      ctx.rotate(angle);
      const len = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);

      // Wide glow — softer
      const wideGrad = ctx.createLinearGradient(0, 0, len, 0);
      wideGrad.addColorStop(0, 'transparent');
      wideGrad.addColorStop(0.3, `rgba(${rgb},${0.02 * shimmer})`);
      wideGrad.addColorStop(0.7, `rgba(${rgb},${0.07 * shimmer})`);
      wideGrad.addColorStop(1, `rgba(${rgb},${0.14 * shimmer})`);
      ctx.fillStyle = wideGrad;
      ctx.beginPath();
      ctx.moveTo(0, -35);
      ctx.lineTo(len, -8);
      ctx.lineTo(len, 8);
      ctx.lineTo(0, 35);
      ctx.closePath();
      ctx.fill();

      // Core streak — softer tail fade
      const coreGrad = ctx.createLinearGradient(0, 0, len, 0);
      coreGrad.addColorStop(0, 'transparent');
      coreGrad.addColorStop(0.3, `rgba(${rgb},0.03)`);
      coreGrad.addColorStop(0.65, `rgba(${rgb},${0.3 * shimmer})`);
      coreGrad.addColorStop(0.88, `rgba(${rgb},${0.55 * shimmer})`);
      coreGrad.addColorStop(1, `rgba(255,255,255,${0.7 * shimmer})`);
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.moveTo(len * 0.15, -4);
      ctx.lineTo(len, -1.5);
      ctx.lineTo(len, 1.5);
      ctx.lineTo(len * 0.15, 4);
      ctx.closePath();
      ctx.fill();

      // Tip glow — reduced
      const tipGlow = ctx.createRadialGradient(len, 0, 0, len, 0, 20);
      tipGlow.addColorStop(0, `rgba(255,255,255,${0.7 * shimmer})`);
      tipGlow.addColorStop(0.3, `rgba(${rgb},${0.3 * shimmer})`);
      tipGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = tipGlow;
      ctx.beginPath();
      ctx.arc(len, 0, 20, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      t += 0.015;
      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, [rgb]);

  return (
    <canvas ref={canvasRef} width={560} height={280} className="w-full h-full" />
  );
}

/* ── Visual selector ── */
function ModuleVisual({ type, rgb }: { type: ScenarioData['visualType']; rgb: string }) {
  switch (type) {
    case 'waveform': return <WaveformVisual rgb={rgb} />;
    case 'orb':      return <OrbVisual rgb={rgb} />;
    case 'comet':    return <CometVisual rgb={rgb} />;
  }
}

/* ── Stagger animation variants ── */
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.22,
      duration: 0.75,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

/* ── Highlight data numbers in description text ── */
function HighlightedDescription({ text, color }: { text: string; color: string }) {
  // Match patterns like "72 小時", "80+", "340 萬次", "89%", "94%", "100%"
  const parts = text.split(/([\d,]+[\+]?\s*[萬千百]?[次個小時%]*)/g);
  return (
    <>
      {parts.map((part, i) =>
        /[\d]/.test(part) ? (
          <span key={i} style={{ color, fontWeight: 500 }}>{part}</span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

/* ================================================================
   SCENARIO CARD
   ================================================================ */
interface ScenarioCardProps {
  data: ScenarioData;
  index: number;
}

export function ScenarioCard({ data, index }: ScenarioCardProps) {
  const { accentHex, accentRgb } = data;

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      whileHover={{
        boxShadow: `0 0 40px rgba(${accentRgb},0.2)`,
      }}
      className="group relative flex flex-col rounded-xl px-7 lg:px-9 xl:px-11 pt-3 lg:pt-4 pb-3 lg:pb-4 transition-shadow duration-300"
      style={{
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      {/* ── Large background number — outline/stroke style ── */}
      <div
        className="absolute top-0 right-4 select-none pointer-events-none font-heading font-extrabold leading-none"
        style={{
          fontSize: 'clamp(100px, 10vw, 160px)',
          color: 'transparent',
          WebkitTextStroke: `2px rgba(${accentRgb},0.05)`,
        }}
      >
        {data.number}
      </div>

      {/* ── Status tag ── */}
      <div className="relative z-10 mb-3 flex-shrink-0">
        <span
          className="inline-block text-[13px] lg:text-[15px] xl:text-[16px] font-mono tracking-[0.08em] px-3 py-1.5 rounded"
          style={{
            color: accentHex,
            opacity: 0.8,
            background: `rgba(${accentRgb},0.08)`,
            borderBottom: `1px solid rgba(${accentRgb},0.3)`,
          }}
        >
          {data.statusTag}
        </span>
      </div>

      {/* ── Title ── */}
      <h3 className="relative z-10 text-lg lg:text-xl xl:text-2xl font-semibold text-white mb-2 font-heading leading-[1.35] flex-shrink-0">
        <span style={{ color: accentHex }} className="mr-1.5">{data.number}.</span>
        {data.title}
      </h3>

      {/* ── Description — line-height 1.75, data highlights ── */}
      <p className="relative z-10 text-[#8892B0] mb-2 font-[350] flex-shrink-0"
        style={{ fontSize: 'clamp(1rem, 1.2vw, 1.25rem)', lineHeight: 1.75 }}
      >
        <HighlightedDescription text={data.description} color={data.highlightColor} />
      </p>

      {/* ── Visual area ── */}
      <div className="relative w-full h-[300px] flex items-center justify-center flex-shrink-0 mt-auto">
        <ModuleVisual type={data.visualType} rgb={accentRgb} />
      </div>

    </motion.div>
  );
}
