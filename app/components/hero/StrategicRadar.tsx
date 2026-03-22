'use client';
import { useRef, useEffect, useCallback, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as const;

// --- Colors ---
const BLUE = { r: 118, g: 158, b: 219 };
const GOLD = { r: 255, g: 184, b: 0 };
const CYAN = { r: 100, g: 200, b: 255 };
const ROSE = { r: 181, g: 125, b: 125 };

// --- 6 Axes: withPC = With PersonaCast, withoutPC = Without ---
const AXES = [
  { zh: '集體衝突指數', en: 'Integrated Conflict Index', withPC: 0.76, withoutPC: 0.38 },
  { zh: '輿論影響力', en: 'Public Opinion Impact', withPC: 0.82, withoutPC: 0.45 },
  { zh: '風險緩解率', en: 'Risk Mitigation Rate', withPC: 0.65, withoutPC: 0.25 },
  { zh: '數據資產價值', en: 'Data Asset Value', withPC: 0.88, withoutPC: 0.32 },
  { zh: '戰略機遇', en: 'Strategic Opportunity', withPC: 0.70, withoutPC: 0.40 },
  { zh: '輿論鏡度分析', en: 'Public Sentiment Path', withPC: 0.74, withoutPC: 0.30 },
] as const;

// --- Bottom metrics ---
const METRICS = [
  { label: '集體衝突預測', value: '76%', color: `rgb(${GOLD.r},${GOLD.g},${GOLD.b})` },
  { label: '數據預測視界', value: 'T+72H', color: `rgb(${GOLD.r},${GOLD.g},${GOLD.b})` },
  { label: '處理中輿論路徑', value: '3.4M+', color: `rgb(${GOLD.r},${GOLD.g},${GOLD.b})` },
] as const;

// --- Utility: hex vertex positions ---
function hexVertex(cx: number, cy: number, r: number, i: number) {
  const angle = (Math.PI * 2 * i) / 6 - Math.PI / 2;
  return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
}

// --- Canvas hook: particles + crystal core ---
interface Particle {
  x: number; y: number; vx: number; vy: number;
  radius: number; gold: boolean; pulsePhase: number;
  orbitAngle: number; orbitSpeed: number; orbitRadius: number;
}

function useRadarCanvas(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  centerRef: React.RefObject<{ x: number; y: number; r: number } | null>,
) {
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef(0);
  const timeRef = useRef(0);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  const init = useCallback((w: number, h: number) => {
    const cx = w * 0.5;
    const cy = h * 0.5;
    const count = Math.min(Math.floor((w * h) / 6000), 160);
    const particles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = 60 + Math.random() * Math.max(w, h) * 0.45;
      particles.push({
        x: cx + Math.cos(angle) * dist,
        y: cy + Math.sin(angle) * dist,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: 1 + Math.random() * 2,
        gold: Math.random() < 0.1,
        pulsePhase: Math.random() * Math.PI * 2,
        orbitAngle: angle,
        orbitSpeed: (Math.random() - 0.5) * 0.002,
        orbitRadius: dist,
      });
    }
    particlesRef.current = particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      init(rect.width, rect.height);
    };
    resize();

    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    document.addEventListener('mousemove', handleMouse);
    window.addEventListener('resize', resize);

    const CONNECTION_DIST = 100;

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      const dpr = window.devicePixelRatio || 1;

      ctx.resetTransform();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, w, h);

      timeRef.current += 16;
      const t = timeRef.current / 1000;
      const center = centerRef.current;
      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      // Draw crystal core (octahedron-like inner geometry)
      if (center) {
        const { x: cx, y: cy, r: baseR } = center;
        const coreR = baseR * 0.35;
        const breathe = 1 + Math.sin(t * 0.8) * 0.03;
        const cr = coreR * breathe;

        // Inner octahedron vertices
        const top = { x: cx, y: cy - cr * 1.2 };
        const bottom = { x: cx, y: cy + cr * 1.2 };
        const left = { x: cx - cr, y: cy };
        const right = { x: cx + cr, y: cy };
        const front = { x: cx - cr * 0.4, y: cy - cr * 0.3 };
        const back = { x: cx + cr * 0.4, y: cy + cr * 0.3 };

        const faces = [
          [top, front, left],
          [top, right, front],
          [top, left, back],
          [top, back, right],
          [bottom, left, front],
          [bottom, front, right],
          [bottom, back, left],
          [bottom, right, back],
        ];

        // Draw faces with varying opacity
        for (let fi = 0; fi < faces.length; fi++) {
          const face = faces[fi];
          const faceAlpha = 0.03 + Math.sin(t * 1.2 + fi * 0.8) * 0.02;
          ctx.beginPath();
          ctx.moveTo(face[0].x, face[0].y);
          ctx.lineTo(face[1].x, face[1].y);
          ctx.lineTo(face[2].x, face[2].y);
          ctx.closePath();
          ctx.fillStyle = `rgba(${CYAN.r},${CYAN.g},${CYAN.b},${faceAlpha})`;
          ctx.fill();
        }

        // Draw crystal edges
        const edges = [
          [top, left], [top, right], [top, front], [top, back],
          [bottom, left], [bottom, right], [bottom, front], [bottom, back],
          [left, front], [front, right], [right, back], [back, left],
        ];

        for (let ei = 0; ei < edges.length; ei++) {
          const [a, b] = edges[ei];
          const edgeAlpha = 0.15 + Math.sin(t * 1.5 + ei * 0.5) * 0.1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(${GOLD.r},${GOLD.g},${GOLD.b},${edgeAlpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Crystal vertices glow
        const allPts = [top, bottom, left, right, front, back];
        for (let pi = 0; pi < allPts.length; pi++) {
          const p = allPts[pi];
          const glowAlpha = 0.3 + Math.sin(t * 2 + pi) * 0.2;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${GOLD.r},${GOLD.g},${GOLD.b},${glowAlpha})`;
          ctx.fill();
          // Glow halo
          ctx.beginPath();
          ctx.arc(p.x, p.y, 8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${GOLD.r},${GOLD.g},${GOLD.b},${glowAlpha * 0.15})`;
          ctx.fill();
        }

        // Central glow
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, cr * 1.5);
        grad.addColorStop(0, `rgba(${CYAN.r},${CYAN.g},${CYAN.b},${0.06 + Math.sin(t) * 0.03})`);
        grad.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(cx, cy, cr * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      // Update and draw particles
      for (const p of particles) {
        // Slow orbital drift
        p.orbitAngle += p.orbitSpeed;
        p.x += p.vx + (Math.random() - 0.5) * 0.2;
        p.y += p.vy + (Math.random() - 0.5) * 0.2;

        // Mouse repulsion
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120 && dist > 0) {
          const force = ((120 - dist) / 120) * 1.2;
          p.x += (dx / dist) * force;
          p.y += (dy / dist) * force;
        }

        // Wrap
        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        if (p.y > h + 20) p.y = -20;
      }

      // Connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const ddx = a.x - b.x;
          const ddy = a.y - b.y;
          const d = Math.sqrt(ddx * ddx + ddy * ddy);
          if (d < CONNECTION_DIST) {
            const alpha = (1 - d / CONNECTION_DIST) * 0.15;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${BLUE.r},${BLUE.g},${BLUE.b},${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const heartbeat = Math.sin(t * 1.5 + p.pulsePhase);
        const pf = 0.7 + heartbeat * 0.3;
        const r = p.radius * pf;
        const c = p.gold ? GOLD : BLUE;
        const baseAlpha = p.gold ? 0.5 : 0.25;

        // Halo
        ctx.beginPath();
        ctx.arc(p.x, p.y, r + 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${c.r},${c.g},${c.b},${pf * 0.04})`;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${c.r},${c.g},${c.b},${baseAlpha + pf * 0.2})`;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      document.removeEventListener('mousemove', handleMouse);
      window.removeEventListener('resize', resize);
    };
  }, [canvasRef, centerRef, init]);
}

// --- SVG Hex Radar ---
function HexRadarSVG({
  cx, cy, radius, onLayout,
}: {
  cx: number; cy: number; radius: number;
  onLayout: (info: { x: number; y: number; r: number }) => void;
}) {
  const reduced = useReducedMotion();

  // Report center to canvas layer
  useEffect(() => {
    onLayout({ x: cx, y: cy, r: radius });
  }, [cx, cy, radius, onLayout]);

  // Outer hex rings (guide lines)
  const rings = [1, 0.75, 0.5, 0.25];

  // "With PersonaCast" polygon (expanded, blue/gold)
  const withPCPoints = AXES.map((axis, i) => {
    const v = hexVertex(cx, cy, radius * axis.withPC, i);
    return `${v.x},${v.y}`;
  }).join(' ');

  // "Without PersonaCast" polygon (shrunken, rose/red)
  const withoutPCPoints = AXES.map((axis, i) => {
    const v = hexVertex(cx, cy, radius * axis.withoutPC, i);
    return `${v.x},${v.y}`;
  }).join(' ');

  // Collapsed center point for animation start
  const centerPoint = Array.from({ length: 6 }, () => `${cx},${cy}`).join(' ');

  // Label positions (offset outward)
  const labelOffset = radius + 45;

  return (
    <g>
      {/* Outer glow ring */}
      <circle cx={cx} cy={cy} r={radius + 8} fill="none" stroke="rgba(118,158,219,0.06)" strokeWidth="1" />

      {/* Hex grid rings */}
      {rings.map((scale) => {
        const pts = Array.from({ length: 6 }, (_, i) => {
          const v = hexVertex(cx, cy, radius * scale, i);
          return `${v.x},${v.y}`;
        }).join(' ');
        return (
          <polygon
            key={scale}
            points={pts}
            fill="none"
            stroke="rgba(118,158,219,0.08)"
            strokeWidth="0.5"
          />
        );
      })}

      {/* Axis spokes */}
      {Array.from({ length: 6 }, (_, i) => {
        const v = hexVertex(cx, cy, radius, i);
        return (
          <line
            key={i}
            x1={cx} y1={cy} x2={v.x} y2={v.y}
            stroke="rgba(118,158,219,0.06)"
            strokeWidth="0.5"
          />
        );
      })}

      {/* ===== WITHOUT PersonaCast — inner polygon (rose, renders first = behind) ===== */}
      <motion.polygon
        points={reduced ? withoutPCPoints : centerPoint}
        animate={{ points: withoutPCPoints }}
        transition={{ duration: 1.8, delay: 1.4, ease: EASE }}
        fill={`rgba(${ROSE.r},${ROSE.g},${ROSE.b},0.06)`}
        stroke={`rgba(${ROSE.r},${ROSE.g},${ROSE.b},0.35)`}
        strokeWidth="1.5"
        strokeDasharray="6 4"
      />

      {/* Without-PC data nodes (rose) */}
      {AXES.map((axis, i) => {
        const v = hexVertex(cx, cy, radius * axis.withoutPC, i);
        return (
          <motion.g
            key={`without-${i}`}
            initial={reduced ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 2.0 + i * 0.08, ease: EASE }}
          >
            <circle cx={v.x} cy={v.y} r="3" fill={`rgba(${ROSE.r},${ROSE.g},${ROSE.b},0.5)`} />
            <circle cx={v.x} cy={v.y} r="1.5" fill={`rgba(${ROSE.r},${ROSE.g},${ROSE.b},0.9)`} />
          </motion.g>
        );
      })}

      {/* ===== WITH PersonaCast — outer polygon (blue/gold, renders on top) ===== */}
      <motion.polygon
        points={reduced ? withPCPoints : centerPoint}
        animate={{ points: withPCPoints }}
        transition={{ duration: 2, delay: 0.8, ease: EASE }}
        fill="rgba(118,158,219,0.08)"
        stroke="rgba(118,158,219,0.4)"
        strokeWidth="2"
      />

      {/* Gold accent stroke overlay */}
      <motion.polygon
        points={reduced ? withPCPoints : centerPoint}
        animate={{ points: withPCPoints }}
        transition={{ duration: 2, delay: 0.8, ease: EASE }}
        fill="none"
        stroke={`rgba(${GOLD.r},${GOLD.g},${GOLD.b},0.3)`}
        strokeWidth="1"
        strokeDasharray="4 3"
      />

      {/* With-PC data nodes (gold) */}
      {AXES.map((axis, i) => {
        const v = hexVertex(cx, cy, radius * axis.withPC, i);
        return (
          <motion.g
            key={`with-${i}`}
            initial={reduced ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 + i * 0.1, ease: EASE }}
          >
            <circle cx={v.x} cy={v.y} r="8" fill={`rgba(${GOLD.r},${GOLD.g},${GOLD.b},0.08)`} />
            <circle cx={v.x} cy={v.y} r="3.5" fill={`rgba(${GOLD.r},${GOLD.g},${GOLD.b},0.7)`} />
            <circle cx={v.x} cy={v.y} r="2" fill={`rgba(${GOLD.r},${GOLD.g},${GOLD.b},1)`} />
          </motion.g>
        );
      })}

      {/* Difference lines connecting same-axis nodes */}
      {AXES.map((axis, i) => {
        const vWith = hexVertex(cx, cy, radius * axis.withPC, i);
        const vWithout = hexVertex(cx, cy, radius * axis.withoutPC, i);
        return (
          <motion.line
            key={`diff-${i}`}
            x1={vWithout.x} y1={vWithout.y}
            x2={vWith.x} y2={vWith.y}
            stroke={`rgba(${GOLD.r},${GOLD.g},${GOLD.b},0.15)`}
            strokeWidth="1"
            strokeDasharray="2 3"
            initial={reduced ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 2.4 + i * 0.05, ease: EASE }}
          />
        );
      })}

      {/* Hex vertex anchor points */}
      {Array.from({ length: 6 }, (_, i) => {
        const v = hexVertex(cx, cy, radius, i);
        return (
          <circle
            key={`anchor-${i}`}
            cx={v.x} cy={v.y} r="2"
            fill="rgba(118,158,219,0.3)"
          />
        );
      })}

      {/* Axis labels */}
      {AXES.map((axis, i) => {
        const v = hexVertex(cx, cy, labelOffset, i);
        const isLeft = v.x < cx - 10;
        const isRight = v.x > cx + 10;
        const anchor = isLeft ? 'end' : isRight ? 'start' : 'middle';

        return (
          <motion.g
            key={`label-${i}`}
            initial={reduced ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.5 + i * 0.08, ease: EASE }}
          >
            <text
              x={v.x} y={v.y - 6}
              textAnchor={anchor}
              fill="rgba(255,255,255,0.85)"
              fontSize="12"
              fontFamily="Inter, sans-serif"
              fontWeight="600"
            >
              {axis.zh}
            </text>
            <text
              x={v.x} y={v.y + 10}
              textAnchor={anchor}
              fill="rgba(136,146,176,0.5)"
              fontSize="9"
              fontFamily="'JetBrains Mono', monospace"
            >
              {axis.en}
            </text>
          </motion.g>
        );
      })}

      {/* ===== Legend ===== */}
      <motion.g
        initial={reduced ? {} : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 2.8, ease: EASE }}
      >
        {/* With PersonaCast */}
        <line x1={cx - 70} y1={cy + radius + 50} x2={cx - 50} y2={cy + radius + 50}
          stroke={`rgba(${GOLD.r},${GOLD.g},${GOLD.b},0.7)`} strokeWidth="2" />
        <circle cx={cx - 48} cy={cy + radius + 50} r="3" fill={`rgba(${GOLD.r},${GOLD.g},${GOLD.b},0.8)`} />
        <text x={cx - 40} y={cy + radius + 54}
          fill="rgba(255,255,255,0.7)" fontSize="11" fontFamily="Inter, sans-serif">
          With PersonaCast
        </text>

        {/* Without PersonaCast */}
        <line x1={cx - 70} y1={cy + radius + 70} x2={cx - 50} y2={cy + radius + 70}
          stroke={`rgba(${ROSE.r},${ROSE.g},${ROSE.b},0.6)`} strokeWidth="1.5" strokeDasharray="6 4" />
        <circle cx={cx - 48} cy={cy + radius + 70} r="3" fill={`rgba(${ROSE.r},${ROSE.g},${ROSE.b},0.7)`} />
        <text x={cx - 40} y={cy + radius + 74}
          fill="rgba(255,255,255,0.45)" fontSize="11" fontFamily="Inter, sans-serif">
          Without PersonaCast
        </text>
      </motion.g>
    </g>
  );
}

// --- Bottom metrics display ---
function MetricsBar() {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className="absolute bottom-[8%] right-[8%] z-20 flex flex-col items-end gap-1"
      initial={reduced ? {} : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 2.2, ease: EASE }}
    >
      {METRICS.map((m) => (
        <div key={m.label} className="flex items-baseline gap-2">
          <span className="font-body text-[13px] text-white/60">{m.label}：</span>
          <span
            className="font-mono text-[15px] font-bold"
            style={{ color: m.color }}
          >
            {m.value}
          </span>
        </div>
      ))}
    </motion.div>
  );
}

// --- Main export ---
export function StrategicRadar() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const centerInfoRef = useRef<{ x: number; y: number; r: number } | null>(null);
  const [dims, setDims] = useState({ w: 800, h: 700 });
  const containerRef = useRef<HTMLDivElement>(null);

  useRadarCanvas(canvasRef, centerInfoRef);

  // Track container size
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ro = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        setDims({
          w: entry.contentRect.width,
          h: entry.contentRect.height,
        });
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const svgCx = dims.w * 0.48;
  const svgCy = dims.h * 0.44;
  const radarRadius = Math.min(dims.w, dims.h) * 0.28;

  const handleLayout = useCallback((info: { x: number; y: number; r: number }) => {
    centerInfoRef.current = info;
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      {/* Canvas layer: particles + crystal core */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ pointerEvents: 'none' }}
        aria-hidden="true"
      />

      {/* SVG layer: hex radar + labels */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox={`0 0 ${dims.w} ${dims.h}`}
        style={{ pointerEvents: 'none' }}
        aria-hidden="true"
      >
        <HexRadarSVG
          cx={svgCx}
          cy={svgCy}
          radius={radarRadius}
          onLayout={handleLayout}
        />
      </svg>

      {/* Bottom metrics */}
      <MetricsBar />
    </div>
  );
}
