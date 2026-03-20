# Order in Chaos Hero Section — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current hexagonal radar and neural canvas hero visuals with an "Order in Chaos" flow-line animation, matrix data rain, and three floating data cards.

**Architecture:** Canvas 2D for ChaosFlowCanvas (main visual) and DataRainCanvas (background texture), React + Framer Motion for DataCards with real mini-charts (Canvas/SVG). All new components are self-contained with no props. HeroSection.tsx is modified to swap imports.

**Tech Stack:** React 19, TypeScript, Canvas 2D, SVG, Framer Motion, Tailwind CSS, simplex-noise (~2KB)

**Spec:** `docs/superpowers/specs/2026-03-21-order-in-chaos-hero-design.md`

---

## File Map

| File | Action | Responsibility |
|------|--------|---------------|
| `src/components/hero/ChaosFlowCanvas.tsx` | Create | Chaos-to-order flow line Canvas animation |
| `src/components/hero/DataRainCanvas.tsx` | Create | Left-side matrix data rain Canvas |
| `src/components/hero/DataCards.tsx` | Create | Container for 3 floating glassmorphism cards |
| `src/components/hero/cards/ConflictIndexCard.tsx` | Create | Card 1: mini line chart |
| `src/components/hero/cards/TrajectoryCard.tsx` | Create | Card 2: prediction path SVG |
| `src/components/hero/cards/SentimentCard.tsx` | Create | Card 3: polar radar chart |
| `src/components/hero/HeroSection.tsx` | Modify | Swap old imports for new components |

---

### Task 1: Install simplex-noise dependency

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install simplex-noise**

```bash
npm install simplex-noise
```

- [ ] **Step 2: Verify installation**

```bash
node -e "import('simplex-noise').then(m => console.log(typeof m.createNoise2D))"
```

Expected: `function`

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add simplex-noise for chaos flow line distortion"
```

---

### Task 2: ChaosFlowCanvas — Core flow line animation

**Files:**
- Create: `src/components/hero/ChaosFlowCanvas.tsx`

- [ ] **Step 1: Create ChaosFlowCanvas component**

```tsx
import { useRef, useEffect, useCallback } from 'react';
import { createNoise2D } from 'simplex-noise';

// --- Colors ---
const CYAN = { r: 100, g: 200, b: 255 };
const GOLD = { r: 255, g: 184, b: 0 };

// --- Device tiers ---
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

// --- Flow line data ---
interface FlowLine {
  baseY: number;
  z: number; // 0–1 depth
  seed: number;
  bundleIndex: number;
}

interface GoldParticle {
  lineIndex: number;
  t: number; // 0–1 position along line
  speed: number;
  radius: number;
}

// --- Utility: lerp ---
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

// --- Utility: get point on flow line at parameterized x ---
function getFlowPoint(
  line: FlowLine,
  xNorm: number, // 0–1 normalized x
  w: number,
  h: number,
  noise2D: (x: number, y: number) => number,
  timeOffset: number,
  mouseX: number,
  mouseY: number,
) {
  const x = xNorm * w;
  const baseY = line.baseY;

  // Noise amplitude by zone
  let amplitude: number;
  if (xNorm < 0.4) {
    // Chaos zone
    amplitude = 50 + line.z * 30; // 50–80px
  } else if (xNorm < 0.6) {
    // Transition zone
    const progress = (xNorm - 0.4) / 0.2;
    const chaosAmp = 50 + line.z * 30;
    amplitude = lerp(chaosAmp, 3, progress);
  } else {
    // Order zone
    amplitude = 2 + line.z * 3;
  }

  const noiseVal = noise2D(
    x * 0.005 + timeOffset,
    baseY * 0.005 + line.seed,
  );
  let y = baseY + noiseVal * amplitude;

  // Mouse repulsion
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

    // Sort by z for back-to-front drawing
    lines.sort((a, b) => a.z - b.z);
    linesRef.current = lines;

    // Gold particles
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

    // Check reduced motion
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

    const FRAME_INTERVAL = 1000 / 30; // 30fps

    const animate = (timestamp: number) => {
      // Throttle to 30fps
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

      // Draw flow lines
      for (const line of lines) {
        const lineWidth = 0.5 + line.z * 2.5;
        const opacity = 0.1 + line.z * 0.4;

        // Compute control points
        const points: { x: number; y: number }[] = [];
        for (let cp = 0; cp <= cpCount; cp++) {
          const xNorm = cp / cpCount;
          points.push(getFlowPoint(line, xNorm, w, h, noise2D, timeOffset, mouse.x, mouse.y));
        }

        // Pass 1: glow (wider, low opacity)
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

        // Pass 2: core line
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

      // Draw gold particles (skip in reduced motion)
      if (!reducedMotion) {
        for (const p of particles) {
          p.t += p.speed;
          if (p.t >= 1) {
            p.t = 0;
            p.lineIndex = Math.floor(Math.random() * lines.length);
          }

          const line = lines[p.lineIndex];
          const pt = getFlowPoint(line, p.t, w, h, noise2D, timeOffset, mouse.x, mouse.y);

          // Halo
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, p.radius + 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${GOLD.r},${GOLD.g},${GOLD.b},0.06)`;
          ctx.fill();

          // Core
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${GOLD.r},${GOLD.g},${GOLD.b},0.6)`;
          ctx.fill();
        }
      }

      if (reducedMotion) return; // Single frame rendered, stop
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
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd d:/Project/personacastweb && npx tsc --noEmit
```

Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/components/hero/ChaosFlowCanvas.tsx
git commit -m "feat: add ChaosFlowCanvas with chaos-to-order flow lines"
```

---

### Task 3: DataRainCanvas — Matrix data rain background

**Files:**
- Create: `src/components/hero/DataRainCanvas.tsx`

- [ ] **Step 1: Create DataRainCanvas component**

```tsx
import { useRef, useEffect, useCallback } from 'react';

// --- Word pool ---
const WORD_POOL = [
  'C', 'O', 'N', 'F', 'L', 'I', 'C', 'T',
  'R', 'I', 'S', 'K',
  'P', 'E', 'R', 'S', 'O', 'N', 'A',
  '0', '.', '7', '8',
  'T', '+', '7', '2', 'H',
  '衝', '突', '輿', '論', '策', '略', '風', '險',
  'S', 'E', 'N', 'T', 'I', 'M', 'E', 'N', 'T',
  'A', 'L', 'E', 'R', 'T',
  'I', 'N', 'D', 'E', 'X',
];

const CYAN = { r: 100, g: 200, b: 255 };
const GOLD = { r: 255, g: 184, b: 0 };

interface RainColumn {
  x: number;
  y: number;
  speed: number;
  chars: string[];
  delay: number; // frames to wait before starting
  delayRemaining: number;
}

function getColumnCount(w: number) {
  if (w < 768) return 0;
  if (w < 1280) return 8;
  return Math.min(Math.floor(w * 0.4 / 30), 16);
}

export function DataRainCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const columnsRef = useRef<RainColumn[]>([]);
  const rafRef = useRef(0);
  const frameCountRef = useRef(0);

  const init = useCallback((w: number, h: number) => {
    const count = getColumnCount(w);
    if (count === 0) {
      columnsRef.current = [];
      return;
    }

    const trailLength = 10;
    const columns: RainColumn[] = [];
    for (let i = 0; i < count; i++) {
      const chars: string[] = [];
      for (let j = 0; j < trailLength; j++) {
        chars.push(WORD_POOL[Math.floor(Math.random() * WORD_POOL.length)]);
      }
      columns.push({
        x: 10 + i * 30,
        y: Math.random() * h,
        speed: 0.3 + Math.random() * 0.5,
        chars,
        delay: 0,
        delayRemaining: 0,
      });
    }
    columnsRef.current = columns;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = window.devicePixelRatio || 1;
      const rect = parent.getBoundingClientRect();
      const canvasWidth = rect.width * 0.4; // Only left 40%
      canvas.style.width = `${canvasWidth}px`;
      canvas.style.height = `${rect.height}px`;
      canvas.width = canvasWidth * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      init(canvasWidth, rect.height);
    };
    resize();
    window.addEventListener('resize', resize);

    const FRAME_INTERVAL = 1000 / 15; // 15fps
    const STARTUP_DELAY = 500; // 0.5s delay per spec
    let lastFrame = 0;
    let started = false;
    const initTime = performance.now();

    const animate = (timestamp: number) => {
      // Startup delay
      if (!started) {
        if (timestamp - initTime < STARTUP_DELAY) {
          rafRef.current = requestAnimationFrame(animate);
          return;
        }
        started = true;
      }

      if (timestamp - lastFrame < FRAME_INTERVAL) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }
      lastFrame = timestamp;
      frameCountRef.current++;

      const w = parseFloat(canvas.style.width);
      const h = parseFloat(canvas.style.height);
      const dpr = window.devicePixelRatio || 1;
      const columns = columnsRef.current;

      if (columns.length === 0) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      ctx.font = '12px "JetBrains Mono", monospace';

      for (const col of columns) {
        if (col.delayRemaining > 0) {
          col.delayRemaining--;
          continue;
        }

        col.y += col.speed;

        // Draw trail
        for (let j = 0; j < col.chars.length; j++) {
          const charY = col.y - j * 18;
          if (charY < 0 || charY > h) continue;

          const fadeAlpha = j === 0 ? 1 : Math.max(0, 1 - j / col.chars.length);
          const isGold = Math.random() < 0.1;
          const c = isGold ? GOLD : CYAN;
          const baseOpacity = isGold ? 0.06 : 0.04;

          // Right-edge fade
          const xFade = col.x < w * 0.7 ? 1 : Math.max(0, 1 - (col.x - w * 0.7) / (w * 0.3));

          const alpha = Math.min(0.06, baseOpacity * fadeAlpha * xFade);
          ctx.fillStyle = `rgba(${c.r},${c.g},${c.b},${alpha})`;
          ctx.fillText(col.chars[j], col.x, charY);
        }

        // Reset when off bottom
        if (col.y - col.chars.length * 18 > h) {
          col.y = -20;
          col.delayRemaining = Math.floor(Math.random() * 45); // 0–3s at 15fps
          // Refresh chars
          for (let j = 0; j < col.chars.length; j++) {
            col.chars[j] = WORD_POOL[Math.floor(Math.random() * WORD_POOL.length)];
          }
        }
      }

      if (reducedMotion) return; // Single frame
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [init]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 z-[1] hidden md:block"
      style={{ pointerEvents: 'none' }}
      aria-hidden="true"
    />
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd d:/Project/personacastweb && npx tsc --noEmit
```

Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/components/hero/DataRainCanvas.tsx
git commit -m "feat: add DataRainCanvas matrix data rain background"
```

---

### Task 4: ConflictIndexCard — Mini line chart

**Files:**
- Create: `src/components/hero/cards/ConflictIndexCard.tsx`

- [ ] **Step 1: Create ConflictIndexCard component**

```tsx
import { useRef, useEffect } from 'react';

const CYAN = { r: 100, g: 200, b: 255 };

// Hardcoded 20-point data simulating 72h conflict index
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
    const w = 230;
    const h = 70;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let time = 0;
    let lastFrame = 0;
    const FRAME_INTERVAL = 1000 / 30; // Throttle to 30fps

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

      // Compute oscillating data
      const data = BASE_DATA.map((v, i) =>
        v + Math.sin(time * Math.PI + i * 0.5) * 0.015
      );

      const minV = 0.3;
      const maxV = 1.0;

      const toX = (i: number) => padding.left + (i / (data.length - 1)) * chartW;
      const toY = (v: number) => padding.top + (1 - (v - minV) / (maxV - minV)) * chartH;

      // Area fill
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

      // Line
      ctx.beginPath();
      ctx.moveTo(toX(0), toY(data[0]));
      for (let i = 1; i < data.length; i++) {
        ctx.lineTo(toX(i), toY(data[i]));
      }
      ctx.strokeStyle = `rgba(${CYAN.r},${CYAN.g},${CYAN.b},0.7)`;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Latest point dot
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
        <span className="font-mono text-[11px] font-semibold text-white/80 tracking-wide">
          CONFLICT INDEX: <span className="text-[#64C8FF]">88.4%</span>
        </span>
        <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-[#B57D7D]/20 text-[#B57D7D] font-bold tracking-wider">
          HIGH RISK
        </span>
      </div>
      <canvas ref={canvasRef} />
    </div>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd d:/Project/personacastweb && npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/components/hero/cards/ConflictIndexCard.tsx
git commit -m "feat: add ConflictIndexCard with animated mini line chart"
```

---

### Task 5: TrajectoryCard — SVG prediction path

**Files:**
- Create: `src/components/hero/cards/TrajectoryCard.tsx`

- [ ] **Step 1: Create TrajectoryCard component**

```tsx
import { motion, useReducedMotion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as const;

// Actual trend (15 points) — normalized 0–1
const ACTUAL = [0.2, 0.25, 0.28, 0.35, 0.32, 0.40, 0.45, 0.50, 0.48, 0.55, 0.60, 0.58, 0.65, 0.68, 0.70];
// Predicted extension (8 points)
const PREDICTED = [0.70, 0.73, 0.76, 0.80, 0.78, 0.82, 0.85, 0.88];

const W = 230;
const H = 70;
const PAD = { top: 8, bottom: 18, left: 5, right: 5 };

function toSVGPath(data: number[], startIdx: number = 0) {
  const chartW = W - PAD.left - PAD.right;
  const chartH = H - PAD.top - PAD.bottom;
  const totalPoints = ACTUAL.length + PREDICTED.length - 1; // -1 because they share a point

  return data
    .map((v, i) => {
      const x = PAD.left + ((startIdx + i) / (totalPoints - 1)) * chartW;
      const y = PAD.top + (1 - v) * chartH;
      return `${i === 0 ? 'M' : 'L'}${x},${y}`;
    })
    .join(' ');
}

export function TrajectoryCard() {
  const reduced = useReducedMotion();
  const actualPath = toSVGPath(ACTUAL, 0);
  const predictedPath = toSVGPath(PREDICTED, ACTUAL.length - 1);
  const predictedLength = 300; // approximate

  return (
    <div className="flex flex-col gap-2">
      <span className="font-mono text-[11px] font-semibold text-white/80 tracking-wide">
        72h TRAJECTORY
      </span>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        {/* Actual trend — solid cyan */}
        <path d={actualPath} fill="none" stroke="rgba(100,200,255,0.7)" strokeWidth="1.5" />
        {/* Predicted — dashed gold with draw-in animation */}
        <motion.path
          d={predictedPath}
          fill="none"
          stroke="rgba(255,184,0,0.6)"
          strokeWidth="1.5"
          strokeDasharray={predictedLength}
          strokeDashoffset={reduced ? 0 : predictedLength}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 1.5, delay: 0.3, ease: EASE }}
        />
        {/* X-axis labels */}
        <text x={PAD.left} y={H - 3} fill="rgba(255,255,255,0.3)" fontSize="8" fontFamily="'JetBrains Mono', monospace">
          Low
        </text>
        <text x={W - PAD.right} y={H - 3} fill="rgba(255,255,255,0.3)" fontSize="8" fontFamily="'JetBrains Mono', monospace" textAnchor="end">
          High
        </text>
        <text x={W / 2} y={H - 3} fill="rgba(255,255,255,0.25)" fontSize="7" fontFamily="'JetBrains Mono', monospace" textAnchor="middle">
          Risk
        </text>
      </svg>
      <span className="font-mono text-[9px] text-white/30 tracking-widest uppercase">
        Predicted Pathway
      </span>
    </div>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd d:/Project/personacastweb && npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/components/hero/cards/TrajectoryCard.tsx
git commit -m "feat: add TrajectoryCard with SVG prediction path"
```

---

### Task 6: SentimentCard — Polar radar mini chart

**Files:**
- Create: `src/components/hero/cards/SentimentCard.tsx`

- [ ] **Step 1: Create SentimentCard component**

```tsx
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
        progress = Math.min(1, elapsed); // 1s expand
      }

      ctx.clearRect(0, 0, size, size);

      // Guide rings
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

      // Spokes
      for (let i = 0; i < AXES.length; i++) {
        const v = vertex(i, maxR);
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(v.x, v.y);
        ctx.strokeStyle = 'rgba(118,158,219,0.06)';
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // Data polygon
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

      // Data nodes with individual colors
      for (let i = 0; i < AXES.length; i++) {
        const v = vertex(i, maxR * AXES[i].value * progress);
        const c = AXES[i].color;
        ctx.beginPath();
        ctx.arc(v.x, v.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${c.r},${c.g},${c.b},0.8)`;
        ctx.fill();
      }

      // Axis labels
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
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd d:/Project/personacastweb && npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/components/hero/cards/SentimentCard.tsx
git commit -m "feat: add SentimentCard with polar radar mini chart"
```

---

### Task 7: DataCards — Container with glassmorphism and Framer Motion

**Files:**
- Create: `src/components/hero/DataCards.tsx`

- [ ] **Step 1: Create DataCards component**

```tsx
import { motion, useReducedMotion } from 'framer-motion';
import { ConflictIndexCard } from './cards/ConflictIndexCard';
import { TrajectoryCard } from './cards/TrajectoryCard';
import { SentimentCard } from './cards/SentimentCard';

const EASE = [0.22, 1, 0.36, 1] as const;

const CARD_POSITIONS = [
  { top: '12%', right: '5%', delay: 2.0 },
  { top: '38%', right: '3%', delay: 2.3 },
  { top: '62%', right: '8%', delay: 2.6 },
] as const;

function GlassCard({
  children,
  top,
  right,
  delay,
}: {
  children: React.ReactNode;
  top: string;
  right: string;
  delay: number;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className="absolute w-[260px] rounded-xl border border-slate-700/40 p-4"
      style={{
        top,
        right,
        background: 'rgba(2,6,23,0.5)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
      initial={reduced ? { opacity: 1 } : { opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function DataCards() {
  return (
    <div className="absolute inset-0 z-[15] hidden md:block" style={{ pointerEvents: 'none' }}>
      {/* Card 1 + 2: visible on tablet (md) and desktop (lg) */}
      <GlassCard top={CARD_POSITIONS[0].top} right={CARD_POSITIONS[0].right} delay={CARD_POSITIONS[0].delay}>
        <ConflictIndexCard />
      </GlassCard>
      <GlassCard top={CARD_POSITIONS[1].top} right={CARD_POSITIONS[1].right} delay={CARD_POSITIONS[1].delay}>
        <TrajectoryCard />
      </GlassCard>
      {/* Card 3: desktop only (hidden on tablet) */}
      <div className="hidden lg:block">
        <GlassCard top={CARD_POSITIONS[2].top} right={CARD_POSITIONS[2].right} delay={CARD_POSITIONS[2].delay}>
          <SentimentCard />
        </GlassCard>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd d:/Project/personacastweb && npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/components/hero/DataCards.tsx
git commit -m "feat: add DataCards glassmorphism container with 3 floating cards"
```

---

### Task 8: Wire into HeroSection — Replace old components

**Files:**
- Modify: `src/components/hero/HeroSection.tsx:1-56`

- [ ] **Step 1: Update HeroSection.tsx**

Replace the entire file content with:

```tsx
import { Navbar } from './Navbar';
import { HeroContent } from './HeroContent';
import { LiveBadge } from './LiveBadge';
import { ChaosFlowCanvas } from './ChaosFlowCanvas';
import { DataRainCanvas } from './DataRainCanvas';
import { DataCards } from './DataCards';

export function HeroSection() {
  return (
    <section className="relative h-screen bg-deep-space overflow-hidden">
      {/* Atmospheric glow — z-0 */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: [
            'radial-gradient(ellipse 65% 75% at 72% 45%, rgba(118,158,219,0.14) 0%, rgba(118,158,219,0.04) 40%, transparent 60%)',
            'radial-gradient(ellipse 35% 35% at 60% 40%, rgba(255,184,0,0.03) 0%, transparent 50%)',
          ].join(', '),
        }}
      />

      {/* DataRain — z-1, left 40% background texture */}
      <DataRainCanvas />

      {/* ChaosFlow — z-2, full-width flow lines */}
      <ChaosFlowCanvas />

      {/* Left scrim — z-[2], unchanged */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, rgba(2,6,23,0.95) 0%, rgba(2,6,23,0.85) 25%, rgba(2,6,23,0.4) 45%, transparent 62%)',
        }}
      />

      {/* Text content — z-10 */}
      <div
        className="relative z-10 h-screen flex items-center"
        style={{ paddingLeft: 'clamp(2.5rem, 8vw, 10rem)', paddingRight: '1.5rem' }}
      >
        <div className="w-full max-w-xl">
          <HeroContent />
        </div>
      </div>

      {/* DataCards — z-15, floating glassmorphism cards */}
      <DataCards />

      <LiveBadge />
      <Navbar />
    </section>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd d:/Project/personacastweb && npx tsc --noEmit
```

- [ ] **Step 3: Verify dev server starts**

```bash
cd d:/Project/personacastweb && npm run dev
```

Check that the page loads without errors in the browser.

- [ ] **Step 4: Commit**

```bash
git add src/components/hero/HeroSection.tsx
git commit -m "feat: wire Order in Chaos components into HeroSection

Replace StrategicRadar, NeuralCanvas, AgentCards, AgentDossier with
ChaosFlowCanvas, DataRainCanvas, and DataCards."
```

---

### Task 9: Visual QA and polish

**Files:**
- Possibly modify: any of the new files

- [ ] **Step 1: Desktop QA checklist**

Open in browser at 1440px+ width. Verify:
- Flow lines animate from chaotic (left) to ordered (right)
- Flow lines form visible bundles, not a uniform blob
- Gold particles move along flow lines
- Data rain appears faintly on left side only
- Three data cards are visible on right side in staggered positions
- Conflict Index card shows animated line chart
- Trajectory card shows cyan + gold dashed prediction line
- Sentiment card shows expanding polar radar
- Mouse repulsion works on flow lines
- Left-side text content is fully readable against the scrim

- [ ] **Step 2: Tablet QA (768–1280px)**

Resize browser to 1024px. Verify:
- Flow lines are present but fewer (120–180)
- Data rain shows 8 columns
- Only Card 1 + Card 2 are visible
- Performance feels smooth

- [ ] **Step 3: Mobile QA (<768px)**

Resize to 375px. Verify:
- No canvases or cards visible
- Text content takes full width
- Page loads fast with no canvas initialization

- [ ] **Step 4: Reduced motion QA**

Enable `prefers-reduced-motion` in browser DevTools. Verify:
- ChaosFlowCanvas shows static frame, no animation
- DataRainCanvas shows static frame
- DataCards appear immediately without slide-in animation

- [ ] **Step 5: Fix any issues found and commit**

```bash
git add -A
git commit -m "fix: visual QA polish for Order in Chaos hero"
```
