'use client';
import { useRef, useEffect, useCallback } from 'react';

/**
 * NeuralMap — BOLD, visible neural network canvas that fills the right side.
 *
 * Cranked-up visual density:
 *   - Line opacity 0.35 (was 0.07) — clearly visible web of connections
 *   - Node radius 2–4px with heavy glow halos
 *   - Critical gold path pulses at high opacity (0.5–0.9)
 *   - Denser node grid (spacing 55px instead of 70px)
 */

interface MapNode {
  readonly x: number;
  readonly y: number;
  readonly radius: number;
  readonly isCritical: boolean;
}

const NODE_BLUE = 'rgba(118, 158, 219,';
const NODE_GOLD = 'rgba(255, 184, 0,';
const LINE_BLUE = 'rgba(118, 158, 219,';
const LINE_GOLD = 'rgba(255, 184, 0,';

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return s / 2147483647;
  };
}

function generateNodes(width: number, height: number): readonly MapNode[] {
  const rand = seededRandom(42);
  const nodes: MapNode[] = [];
  const spacing = 55;
  const cols = Math.ceil(width / spacing) + 2;
  const rows = Math.ceil(height / spacing) + 2;
  const criticalSlope = height / width;

  for (let r = -1; r < rows; r++) {
    for (let c = -1; c < cols; c++) {
      const x = c * spacing + (rand() - 0.5) * spacing * 0.6;
      const y = r * spacing + (rand() - 0.5) * spacing * 0.6;
      if (rand() < 0.18) continue;

      const expectedY = x * criticalSlope;
      const distFromDiag = Math.abs(y - expectedY);
      const isCritical = distFromDiag < 80 && rand() < 0.4;

      nodes.push({
        x,
        y,
        radius: 1.8 + rand() * 2.2,
        isCritical,
      });
    }
  }
  return nodes;
}

function generateEdges(nodes: readonly MapNode[], maxDist: number): readonly [number, number][] {
  const edges: [number, number][] = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < maxDist) {
        edges.push([i, j]);
      }
    }
  }
  return edges;
}

interface NeuralMapProps {
  readonly parallaxX: number;
  readonly parallaxY: number;
}

export function NeuralMap({ parallaxX, parallaxY }: NeuralMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);
  const timeRef = useRef(0);
  const dataRef = useRef<{
    nodes: readonly MapNode[];
    edges: readonly [number, number][];
    width: number;
    height: number;
  } | null>(null);

  const setup = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const w = Math.ceil(window.innerWidth * 1.3);
    const h = Math.ceil(window.innerHeight * 1.3);

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    const nodes = generateNodes(w, h);
    const edges = generateEdges(nodes, 90);
    dataRef.current = { nodes, edges, width: w, height: h };
  }, []);

  useEffect(() => {
    setup();
    window.addEventListener('resize', setup);
    return () => window.removeEventListener('resize', setup);
  }, [setup]);

  const parallaxRef = useRef({ x: 0, y: 0 });
  parallaxRef.current = { x: parallaxX, y: parallaxY };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      const data = dataRef.current;
      if (!data) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      timeRef.current += 0.012;
      const t = timeRef.current;
      const { nodes, edges, width, height } = data;
      const dpr = window.devicePixelRatio || 1;
      const px = parallaxRef.current;

      ctx.clearRect(0, 0, width * dpr, height * dpr);
      ctx.save();
      ctx.scale(dpr, dpr);

      const offsetX = px.x * -15;
      const offsetY = px.y * -10;
      const goldPulse = 0.5 + Math.sin(t * 1.5) * 0.5;

      // Draw edges — BOLD opacity
      for (const [i, j] of edges) {
        const a = nodes[i];
        const b = nodes[j];
        const bothCritical = a.isCritical && b.isCritical;

        const ax = a.x + offsetX;
        const ay = a.y + offsetY;
        const bx = b.x + offsetX;
        const by = b.y + offsetY;

        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);

        if (bothCritical) {
          // Gold critical path — HIGH visibility
          ctx.strokeStyle = `${LINE_GOLD}${(0.3 + goldPulse * 0.5).toFixed(3)})`;
          ctx.lineWidth = 1.5;
        } else {
          // Blue lines — visible, not invisible
          ctx.strokeStyle = `${LINE_BLUE}0.35)`;
          ctx.lineWidth = 0.5;
        }
        ctx.stroke();
      }

      // Draw nodes — bigger, with glowing halos
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const nx = n.x + offsetX;
        const ny = n.y + offsetY;
        const pulse = 0.5 + Math.sin(t * 0.8 + i * 0.3) * 0.5;

        if (n.isCritical) {
          // Gold halo — BIG
          ctx.beginPath();
          ctx.arc(nx, ny, n.radius + 8, 0, Math.PI * 2);
          ctx.fillStyle = `${NODE_GOLD}${(goldPulse * 0.12).toFixed(3)})`;
          ctx.fill();

          // Gold core
          ctx.beginPath();
          ctx.arc(nx, ny, n.radius + 1, 0, Math.PI * 2);
          ctx.fillStyle = `${NODE_GOLD}${(0.5 + goldPulse * 0.4).toFixed(3)})`;
          ctx.fill();
        } else {
          // Blue halo
          ctx.beginPath();
          ctx.arc(nx, ny, n.radius + 5, 0, Math.PI * 2);
          ctx.fillStyle = `${NODE_BLUE}${(pulse * 0.08).toFixed(3)})`;
          ctx.fill();

          // Blue core — clearly visible
          ctx.beginPath();
          ctx.arc(nx, ny, n.radius, 0, Math.PI * 2);
          ctx.fillStyle = `${NODE_BLUE}${(0.3 + pulse * 0.4).toFixed(3)})`;
          ctx.fill();
        }
      }

      ctx.restore();
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute -top-[15%] -left-[15%] z-0"
      style={{ pointerEvents: 'none' }}
      aria-hidden="true"
    />
  );
}
