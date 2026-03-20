import { useRef, useEffect, useCallback } from 'react';
import { createNoise2D } from 'simplex-noise';

const CYAN = { r: 100, g: 200, b: 255 };
const GOLD = { r: 255, g: 184, b: 0 };

function getDeviceTier(w: number) {
  if (w < 768) return 'mobile';
  if (w < 1280) return 'tablet';
  return 'desktop';
}

const TIER_CONFIG = {
  desktop: { lineCount: 350, controlPoints: 20, particles: 50 },
  tablet: { lineCount: 150, controlPoints: 14, particles: 20 },
  mobile: { lineCount: 0, controlPoints: 0, particles: 0 },
} as const;

interface FlowLine {
  baseY: number;
  z: number;
  seed: number;
  bundleIndex: number;
}

interface GoldParticle {
  lineIndex: number;
  t: number;
  speed: number;
  radius: number;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function getFlowPoint(
  line: FlowLine,
  xNorm: number,
  w: number,
  h: number,
  noise2D: (x: number, y: number) => number,
  timeOffset: number,
  mouseX: number,
  mouseY: number,
) {
  const x = xNorm * w;
  const baseY = line.baseY;

  let amplitude: number;
  if (xNorm < 0.4) {
    amplitude = 50 + line.z * 30;
  } else if (xNorm < 0.6) {
    const progress = (xNorm - 0.4) / 0.2;
    const chaosAmp = 50 + line.z * 30;
    amplitude = lerp(chaosAmp, 3, progress);
  } else {
    amplitude = 2 + line.z * 3;
  }

  const noiseVal = noise2D(
    x * 0.005 + timeOffset,
    baseY * 0.005 + line.seed,
  );
  let y = baseY + noiseVal * amplitude;

  const dx = x - mouseX;
  const dy = y - mouseY;
  const dist = Math.sqrt(dx * dx + dy * dy);
  if (dist < 150 && dist > 0) {
    const force = ((150 - dist) / 150) * 30;
    y += (dy / dist) * force;
  }

  return { x, y };
}

export function ChaosFlowCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const linesRef = useRef<FlowLine[]>([]);
  const particlesRef = useRef<GoldParticle[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef(0);
  const timeOffsetRef = useRef(0);
  const noise2DRef = useRef<ReturnType<typeof createNoise2D> | null>(null);
  const lastFrameRef = useRef(0);

  const init = useCallback((w: number, h: number) => {
    const tier = getDeviceTier(w);
    const config = TIER_CONFIG[tier];
    if (config.lineCount === 0) {
      linesRef.current = [];
      particlesRef.current = [];
      return;
    }

    if (!noise2DRef.current) {
      noise2DRef.current = createNoise2D();
    }

    const bundleCount = 10;
    const linesPerBundle = Math.ceil(config.lineCount / bundleCount);
    const lines: FlowLine[] = [];

    for (let b = 0; b < bundleCount; b++) {
      const bundleCenterY = (h * 0.1) + (b / (bundleCount - 1)) * (h * 0.8);
      for (let i = 0; i < linesPerBundle && lines.length < config.lineCount; i++) {
        lines.push({
          baseY: bundleCenterY + (Math.random() - 0.5) * (h * 0.08),
          z: Math.random(),
          seed: Math.random() * 1000,
          bundleIndex: b,
        });
      }
    }

    lines.sort((a, b) => a.z - b.z);
    linesRef.current = lines;

    const particles: GoldParticle[] = [];
    for (let i = 0; i < config.particles; i++) {
      particles.push({
        lineIndex: Math.floor(Math.random() * lines.length),
        t: Math.random(),
        speed: 0.001 + Math.random() * 0.002,
        radius: 1.5 + Math.random() * 1.5,
      });
    }
    particlesRef.current = particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      init(rect.width, rect.height);
    };
    resize();

    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    document.addEventListener('mousemove', handleMouse);
    window.addEventListener('resize', resize);

    const FRAME_INTERVAL = 1000 / 30;

    const animate = (timestamp: number) => {
      if (timestamp - lastFrameRef.current < FRAME_INTERVAL) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }
      lastFrameRef.current = timestamp;

      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      const dpr = window.devicePixelRatio || 1;
      const noise2D = noise2DRef.current;
      const lines = linesRef.current;
      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      if (!noise2D || lines.length === 0) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      if (!reducedMotion) {
        timeOffsetRef.current += 0.003;
      }
      const timeOffset = timeOffsetRef.current;

      const tier = getDeviceTier(w);
      const cpCount = TIER_CONFIG[tier].controlPoints;

      for (const line of lines) {
        const lineWidth = 0.5 + line.z * 2.5;
        const opacity = 0.1 + line.z * 0.4;

        const points: { x: number; y: number }[] = [];
        for (let cp = 0; cp <= cpCount; cp++) {
          const xNorm = cp / cpCount;
          points.push(getFlowPoint(line, xNorm, w, h, noise2D, timeOffset, mouse.x, mouse.y));
        }

        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
          const prev = points[i - 1];
          const curr = points[i];
          const cpx = (prev.x + curr.x) / 2;
          const cpy = (prev.y + curr.y) / 2;
          ctx.quadraticCurveTo(prev.x, prev.y, cpx, cpy);
        }
        ctx.strokeStyle = `rgba(${CYAN.r},${CYAN.g},${CYAN.b},${opacity * 0.04})`;
        ctx.lineWidth = lineWidth * 3;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
          const prev = points[i - 1];
          const curr = points[i];
          const cpx = (prev.x + curr.x) / 2;
          const cpy = (prev.y + curr.y) / 2;
          ctx.quadraticCurveTo(prev.x, prev.y, cpx, cpy);
        }
        ctx.strokeStyle = `rgba(${CYAN.r},${CYAN.g},${CYAN.b},${opacity})`;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
      }

      if (!reducedMotion) {
        for (const p of particles) {
          p.t += p.speed;
          if (p.t >= 1) {
            p.t = 0;
            p.lineIndex = Math.floor(Math.random() * lines.length);
          }

          const line = lines[p.lineIndex];
          const pt = getFlowPoint(line, p.t, w, h, noise2D, timeOffset, mouse.x, mouse.y);

          ctx.beginPath();
          ctx.arc(pt.x, pt.y, p.radius + 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${GOLD.r},${GOLD.g},${GOLD.b},0.06)`;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(pt.x, pt.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${GOLD.r},${GOLD.g},${GOLD.b},0.6)`;
          ctx.fill();
        }
      }

      if (reducedMotion) return;
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      document.removeEventListener('mousemove', handleMouse);
      window.removeEventListener('resize', resize);
    };
  }, [init]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-[2] w-full h-full hidden md:block"
      style={{ pointerEvents: 'none' }}
      aria-hidden="true"
    />
  );
}
