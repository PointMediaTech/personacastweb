'use client';
import { useRef, useEffect, useCallback } from 'react';
import { createNoise2D } from 'simplex-noise';
import type { DecisionKey } from './theaterData';

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

const DIVERGENCE_CONFIG = {
  A: { ratio: 0.1, maxOffset: 5 },
  B: { ratio: 0.5, maxOffset: 30 },
  C: { ratio: 0.8, maxOffset: 80 },
} as const;

const DECISION_COLORS = {
  A: { r: 100, g: 220, b: 255 },
  B: { r: 200, g: 192, b: 100 },
  C: { r: 181, g: 125, b: 125 },
} as const;

interface FlowLine {
  entryY: number;   // Y at left endpoint (spread)
  exitY: number;    // Y at right endpoint (spread, ordered)
  leftExtent: number;  // how far left this line reaches (0–1 normalized)
  rightExtent: number; // how far right this line reaches (0–1 normalized)
  z: number;        // 0–1 depth for visual layering
  seed: number;     // unique noise seed
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

// Smooth step for natural transitions
function smoothstep(t: number) {
  return t * t * (3 - 2 * t);
}

// Focal point: the vortex center where all lines converge
const FOCAL_X = 0.83; // 83% from left
const FOCAL_Y = 0.42; // 42% from top (slightly above center)

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
  const focalY = h * FOCAL_Y;

  let baseY: number;
  let amplitude: number;

  // Lines radiate from vortex center outward in both directions
  // Each line only exists between its leftExtent and rightExtent

  // Normalize xNorm relative to this line's own range
  const lineLeft = line.leftExtent;
  const lineRight = line.rightExtent;

  // Outside this line's range — no point
  if (xNorm < lineLeft || xNorm > lineRight) {
    return { x, y: focalY, skip: true };
  }

  // Map position relative to focal point
  if (xNorm < FOCAL_X - 0.03) {
    // Left side: spreading outward from vortex, chaos in mid-region
    const leftRange = FOCAL_X - 0.03 - lineLeft;
    const progress = leftRange > 0 ? (FOCAL_X - 0.03 - xNorm) / leftRange : 0; // 0 at vortex edge, 1 at far left
    baseY = lerp(focalY, line.entryY, smoothstep(progress));
    // Tangling peaks in the middle zone (not at the core)
    const midChaos = Math.sin(progress * Math.PI); // peaks at progress=0.5
    amplitude = lerp(3 + line.z * 4, 5 + line.z * 6, progress) + midChaos * (80 + line.z * 50);
  } else if (xNorm < FOCAL_X + 0.03) {
    // Vortex core: TIGHTEST point — minimal noise, all lines pinch together
    const distFromCenter = Math.abs(xNorm - FOCAL_X) / 0.03;
    baseY = focalY;
    amplitude = 2 + distFromCenter * 5;
  } else if (xNorm < FOCAL_X + 0.05) {
    // Right emergence: converge from focal toward tight exitY band
    const rightRange = 0.02; // FOCAL_X+0.05 - FOCAL_X+0.03
    const progress = smoothstep((xNorm - FOCAL_X - 0.03) / rightRange);
    baseY = lerp(focalY, line.exitY, progress);
    amplitude = lerp(4 + line.z * 2, 0.5 + line.z * 0.5, progress);
  } else {
    // Right fan zone: 90% tight band, 5% slight diverge, 5% irregular curves
    const fanProgress = (xNorm - (FOCAL_X + 0.05)) / (1.0 - (FOCAL_X + 0.05));
    const strayHash = (line.seed % 1000) / 1000;

    if (strayHash < 0.04) {
      // Tier 2 (4%): wide divergence — evenly spread above & below, each line unique curve
      const seedA = Math.sin(line.seed * 127.1) * 43758.5453 % 1;
      const seedB = Math.sin(line.seed * 269.5) * 17623.1327 % 1;
      const seedC = Math.sin(line.seed * 419.2) * 91225.8741 % 1;
      // Evenly distribute above/below: alternate based on seed
      const direction = seedA > 0.5 ? 1 : -1;
      const driftMag = (0.08 + seedB * 0.18) * h; // 8-26% of height
      const bendFreq = 1.0 + seedC * 3;
      const bendAmp = 15 + seedA * 50;
      const curvature = Math.sin(fanProgress * Math.PI * bendFreq + line.seed) * bendAmp * fanProgress;
      const drift = direction * fanProgress * driftMag;
      baseY = line.exitY + drift + curvature;
      amplitude = 2 + line.z * 2;
    } else if (strayHash < 0.10) {
      // Tier 1 (6%): slight divergence — mild drift with unique angles
      const seedD = Math.sin(line.seed * 331.7) * 28411.9237 % 1;
      const direction = seedD > 0.5 ? 1 : -1;
      const mildBend = Math.sin(fanProgress * Math.PI * (1 + seedD * 2) + line.seed) * 12 * fanProgress;
      const extraDiverge = direction * fanProgress * h * 0.04;
      baseY = line.exitY + extraDiverge + mildBend;
      amplitude = 1 + line.z * 1.2;
    } else {
      // Main bundle (90%): tight on the beam band
      const gentleDiverge = (line.exitY - focalY) * fanProgress * 0.08;
      baseY = line.exitY + gentleDiverge;
      amplitude = 0.4 + line.z * 0.4;
    }
  }

  const noiseVal = noise2D(
    x * 0.004 + timeOffset,
    line.entryY * 0.003 + line.seed,
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

  return { x, y, skip: false };
}

interface ChaosFlowCanvasProps {
  simulationActive?: boolean;
  selectedDecision?: DecisionKey | null;
}

export function ChaosFlowCanvas({
  simulationActive = false,
  selectedDecision = null,
}: ChaosFlowCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const linesRef = useRef<FlowLine[]>([]);
  const particlesRef = useRef<GoldParticle[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef(0);
  const timeOffsetRef = useRef(0);
  const noise2DRef = useRef<ReturnType<typeof createNoise2D> | null>(null);
  const lastFrameRef = useRef(0);
  const simulationActiveRef = useRef(simulationActive);
  const selectedDecisionRef = useRef(selectedDecision);
  const brightnessRef = useRef(1.0);
  const divergenceRef = useRef(0);
  const colorBlendRef = useRef(0);

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

    const lines: FlowLine[] = [];
    const focalY = h * FOCAL_Y;

    for (let i = 0; i < config.lineCount; i++) {
      const t = i / (config.lineCount - 1); // 0–1 distribution

      // Entry Y (LEFT endpoint): spread outward from focal center
      const spread = (t - 0.5) * 2; // -1 to 1
      const biasedSpread = Math.sign(spread) * Math.pow(Math.abs(spread), 0.7);
      const entryY = focalY + biasedSpread * h * 0.48;

      // Exit Y (RIGHT endpoint): spread evenly above/below focal center
      const exitY = focalY + (t - 0.5) * h * 0.03;

      // How far left/right each line extends from the vortex center
      // Lines radiate different distances — some short, some long
      const leftExtent = FOCAL_X - 0.35 - Math.pow(Math.random(), 0.5) * 0.45; // bias toward longer lines, denser on left
      const rightExtent = 1.02; // always extend past browser right edge to avoid gaps

      lines.push({
        entryY: entryY + (Math.random() - 0.5) * 10,
        exitY: exitY + (Math.random() - 0.5) * 4,
        leftExtent: Math.max(0.05, leftExtent),
        rightExtent: rightExtent, // allow extending past 1.0 to ensure no gap at right edge
        z: Math.random(),
        seed: Math.random() * 1000,
      });
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
    simulationActiveRef.current = simulationActive;
    selectedDecisionRef.current = selectedDecision;
  }, [simulationActive, selectedDecision]);

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

      // Lerp brightness toward target
      const targetBrightness = simulationActiveRef.current ? 1.25 : 1.0;
      brightnessRef.current += (targetBrightness - brightnessRef.current) * 0.05;
      const brightness = brightnessRef.current;

      // Lerp divergence toward target
      const decision = selectedDecisionRef.current;
      const targetDivergence = decision ? 1.0 : 0.0;
      divergenceRef.current += (targetDivergence - divergenceRef.current) * 0.05;
      const divergence = divergenceRef.current;

      // Lerp color blend
      const targetColorBlend = decision ? 1.0 : 0.0;
      colorBlendRef.current += (targetColorBlend - colorBlendRef.current) * 0.05;
      const colorBlend = colorBlendRef.current;

      // Convergence point glow — radial gradient at the vortex center
      const glowX = w * FOCAL_X;
      const glowY = h * FOCAL_Y;
      const glowRadius = Math.min(w, h) * 0.18;
      const glow = ctx.createRadialGradient(glowX, glowY, 0, glowX, glowY, glowRadius);
      glow.addColorStop(0, `rgba(${CYAN.r},${CYAN.g},${CYAN.b},0.12)`);
      glow.addColorStop(0.4, `rgba(${CYAN.r},${CYAN.g},${CYAN.b},0.04)`);
      glow.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = glow;
      ctx.fillRect(glowX - glowRadius, glowY - glowRadius, glowRadius * 2, glowRadius * 2);

      if (!reducedMotion) {
        timeOffsetRef.current += 0.003;
      }
      const timeOffset = timeOffsetRef.current;

      const tier = getDeviceTier(w);
      const cpCount = TIER_CONFIG[tier].controlPoints;

      // Dynamic particle count
      const baseParticleCount = TIER_CONFIG[tier].particles;
      const desiredCount = simulationActiveRef.current ? baseParticleCount * 2 : baseParticleCount;

      while (particles.length < desiredCount) {
        particles.push({
          lineIndex: Math.floor(Math.random() * lines.length),
          t: Math.random(),
          speed: 0.001 + Math.random() * 0.002,
          radius: 1.5 + Math.random() * 1.5,
        });
      }

      for (const line of lines) {
        const strayHash = (line.seed % 1000) / 1000;
        const isTier2 = strayHash < 0.05;
        const isTier1 = strayHash >= 0.05 && strayHash < 0.10;
        const lineWidth = isTier2 ? (1.2 + line.z * 1.8) : isTier1 ? (0.8 + line.z * 2) : (0.5 + line.z * 2.5);
        const rawOpacity = isTier2 ? (0.18 + line.z * 0.3) : isTier1 ? (0.14 + line.z * 0.35) : (0.1 + line.z * 0.4);
        const baseOpacity = Math.min(rawOpacity * brightness, 0.85);

        // Collect control points: exact endpoints + uniform grid in between
        const points: { x: number; y: number }[] = [];
        const SNAP_THRESHOLD = 0.5 / cpCount; // skip grid points too close to endpoints

        // First point: exact leftExtent
        const ptFirst = getFlowPoint(line, line.leftExtent, w, h, noise2D, timeOffset, mouse.x, mouse.y);
        if (!ptFirst.skip) points.push({ x: ptFirst.x, y: ptFirst.y });

        // Middle points: uniform grid, only those within (leftExtent, rightExtent)
        for (let cp = 1; cp < cpCount; cp++) {
          const xNorm = cp / cpCount;
          if (xNorm <= line.leftExtent + SNAP_THRESHOLD || xNorm >= line.rightExtent - SNAP_THRESHOLD) continue;
          const pt = getFlowPoint(line, xNorm, w, h, noise2D, timeOffset, mouse.x, mouse.y);
          if (!pt.skip) points.push({ x: pt.x, y: pt.y });
        }

        // Last point: exact rightExtent
        const ptLast = getFlowPoint(line, line.rightExtent, w, h, noise2D, timeOffset, mouse.x, mouse.y);
        if (!ptLast.skip) points.push({ x: ptLast.x, y: ptLast.y });

        if (points.length < 2) continue;

        // Apply divergence offset to right-side points
        if (divergence > 0.01 && decision) {
          const dvConfig = DIVERGENCE_CONFIG[decision];
          const strayHash = (line.seed % 1000) / 1000;
          const shouldDiverge = strayHash < dvConfig.ratio;

          if (shouldDiverge) {
            for (const pt of points) {
              const xNorm = pt.x / w;
              if (xNorm > 0.75) {
                const progress = (xNorm - 0.75) / 0.25;
                const seedOffset = Math.sin(line.seed * 127.1) * 2 - 1;
                pt.y += seedOffset * dvConfig.maxOffset * progress * divergence;
              }
            }
          }
        }

        // Color interpolation for decision-dependent right-zone tint
        let drawR = CYAN.r, drawG = CYAN.g, drawB = CYAN.b;
        if (colorBlend > 0.01 && decision) {
          const dc = DECISION_COLORS[decision];
          const rightmost = points[points.length - 1];
          if (rightmost && rightmost.x / w > 0.7) {
            drawR = Math.round(lerp(CYAN.r, dc.r, colorBlend));
            drawG = Math.round(lerp(CYAN.g, dc.g, colorBlend));
            drawB = Math.round(lerp(CYAN.b, dc.b, colorBlend));
          }
        }

        const opacity = baseOpacity;

        // Glow pass
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
          const prev = points[i - 1];
          const curr = points[i];
          ctx.quadraticCurveTo(prev.x, prev.y, (prev.x + curr.x) / 2, (prev.y + curr.y) / 2);
        }
        ctx.strokeStyle = `rgba(${drawR},${drawG},${drawB},${opacity * 0.05})`;
        ctx.lineWidth = lineWidth * 3;
        ctx.stroke();

        // Core pass
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
          const prev = points[i - 1];
          const curr = points[i];
          ctx.quadraticCurveTo(prev.x, prev.y, (prev.x + curr.x) / 2, (prev.y + curr.y) / 2);
        }
        ctx.strokeStyle = `rgba(${drawR},${drawG},${drawB},${opacity})`;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
      }

      if (!reducedMotion) {
        const speedMult = simulationActiveRef.current ? 1.2 : 1.0;

        for (let pi = particles.length - 1; pi >= 0; pi--) {
          const p = particles[pi];
          p.t += p.speed * speedMult;
          if (p.t >= 1) {
            if (particles.length > desiredCount) {
              particles.splice(pi, 1);
              continue;
            }
            p.t = 0;
            p.lineIndex = Math.floor(Math.random() * lines.length);
          }

          const line = lines[p.lineIndex];
          const mappedT = lerp(line.leftExtent, line.rightExtent, p.t);
          const pt = getFlowPoint(line, mappedT, w, h, noise2D, timeOffset, mouse.x, mouse.y);
          if (pt.skip) continue;

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
