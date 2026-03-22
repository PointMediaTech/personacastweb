'use client';
import { useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

/**
 * NeuralHead — A 3D floating neural head silhouette made of glowing nodes and connection lines.
 *
 * Architecture:
 *   - Head profile defined as node coordinates along a human head silhouette
 *   - Nodes connected by thin lines (Delaunay-style proximity connections)
 *   - Each node pulses with staggered timing for organic feel
 *   - Mouse movement applies parallax rotation to the entire structure
 *   - Insight Gold (#FFB800) halo radiates behind the head
 */

// ── Node definitions: [x, y] normalized to 0–1 range, mapped to canvas size ──
// Profile faces right; a mix of contour nodes + interior "brain" nodes

const HEAD_CONTOUR: readonly [number, number][] = [
  // Forehead top
  [0.52, 0.08], [0.58, 0.06], [0.64, 0.07], [0.69, 0.10],
  // Crown
  [0.73, 0.15], [0.75, 0.22], [0.74, 0.30],
  // Back of head
  [0.72, 0.38], [0.70, 0.46], [0.68, 0.52], [0.66, 0.58],
  // Nape
  [0.62, 0.64], [0.58, 0.68], [0.55, 0.72],
  // Neck back
  [0.54, 0.78], [0.53, 0.85], [0.52, 0.92],
  // Neck front
  [0.42, 0.92], [0.40, 0.85], [0.38, 0.78],
  // Chin
  [0.36, 0.72], [0.33, 0.66], [0.30, 0.60],
  // Jaw
  [0.28, 0.54], [0.27, 0.48],
  // Mouth / Lips area
  [0.26, 0.42],
  // Nose
  [0.24, 0.36], [0.22, 0.32], [0.23, 0.28],
  // Nose bridge
  [0.26, 0.24], [0.30, 0.20],
  // Brow
  [0.34, 0.17], [0.40, 0.14], [0.46, 0.11],
];

const BRAIN_INTERIOR: readonly [number, number][] = [
  // Interior "thought" nodes — scattered inside the head
  [0.45, 0.25], [0.50, 0.20], [0.55, 0.18], [0.60, 0.22],
  [0.48, 0.32], [0.54, 0.28], [0.62, 0.30], [0.58, 0.36],
  [0.44, 0.40], [0.52, 0.42], [0.60, 0.44], [0.56, 0.50],
  [0.48, 0.50], [0.42, 0.55], [0.50, 0.58], [0.46, 0.46],
  [0.65, 0.38], [0.40, 0.34], [0.55, 0.55], [0.62, 0.50],
  [0.38, 0.28], [0.44, 0.16], [0.50, 0.45], [0.57, 0.42],
];

const ALL_NODES: readonly [number, number][] = [...HEAD_CONTOUR, ...BRAIN_INTERIOR];

// Pre-compute edges: connect nodes within a proximity threshold
const CONNECTION_DIST = 0.14;
const EDGES: readonly [number, number][] = (() => {
  const edges: [number, number][] = [];
  for (let i = 0; i < ALL_NODES.length; i++) {
    for (let j = i + 1; j < ALL_NODES.length; j++) {
      const dx = ALL_NODES[i][0] - ALL_NODES[j][0];
      const dy = ALL_NODES[i][1] - ALL_NODES[j][1];
      if (Math.sqrt(dx * dx + dy * dy) < CONNECTION_DIST) {
        edges.push([i, j]);
      }
    }
  }
  return edges;
})();

// Colors
const NODE_BLUE = { r: 118, g: 158, b: 219 };
const NODE_GOLD = { r: 255, g: 184, b: 0 };
const LINE_COLOR = 'rgba(118, 158, 219, 0.18)';
const LINE_COLOR_GOLD = 'rgba(255, 184, 0, 0.10)';

interface CanvasSize {
  readonly width: number;
  readonly height: number;
}

function getCanvasSize(): CanvasSize {
  const base = window.innerWidth >= 768 ? 320 : 220;
  return { width: base, height: base };
}

export function NeuralHead() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(0);
  const timeRef = useRef(0);
  const sizeRef = useRef(getCanvasSize());

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = sizeRef.current;
    const dpr = window.devicePixelRatio || 1;
    timeRef.current += 0.016;
    const t = timeRef.current;

    ctx.clearRect(0, 0, width * dpr, height * dpr);
    ctx.save();
    ctx.scale(dpr, dpr);

    // Mouse parallax: slight offset based on cursor position relative to center
    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;
    const parallaxX = mx * 6;
    const parallaxY = my * 4;

    // Map normalized nodes to pixel positions with parallax
    const pixelNodes = ALL_NODES.map(([nx, ny], i) => {
      // Interior nodes get more parallax for depth
      const isInterior = i >= HEAD_CONTOUR.length;
      const depthFactor = isInterior ? 1.5 : 1.0;
      return {
        x: nx * width + parallaxX * depthFactor,
        y: ny * height + parallaxY * depthFactor,
        isInterior,
      };
    });

    // Draw edges first (behind nodes)
    for (const [i, j] of EDGES) {
      const a = pixelNodes[i];
      const b = pixelNodes[j];
      // Some edges occasionally "spark" gold
      const sparkPhase = Math.sin(t * 0.8 + i * 0.5 + j * 0.3);
      const isSparking = sparkPhase > 0.85;

      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.strokeStyle = isSparking ? LINE_COLOR_GOLD : LINE_COLOR;
      ctx.lineWidth = isSparking ? 1.2 : 0.6;
      ctx.stroke();
    }

    // Draw nodes with pulsing opacity
    pixelNodes.forEach((node, i) => {
      const pulsePhase = Math.sin(t * 1.2 + i * 0.7);
      const pulse = 0.5 + pulsePhase * 0.5; // 0..1
      const radius = node.isInterior ? 2.2 + pulse * 1.0 : 2.5 + pulse * 0.8;

      // Color: mostly blue, some gold highlights for interior "active" nodes
      const isGold = node.isInterior && Math.sin(t * 0.6 + i * 1.1) > 0.7;
      const c = isGold ? NODE_GOLD : NODE_BLUE;
      const alpha = node.isInterior ? 0.5 + pulse * 0.5 : 0.6 + pulse * 0.4;

      // Outer glow
      ctx.beginPath();
      ctx.arc(node.x, node.y, radius + 3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${c.r}, ${c.g}, ${c.b}, ${alpha * 0.15})`;
      ctx.fill();

      // Core dot
      ctx.beginPath();
      ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${c.r}, ${c.g}, ${c.b}, ${alpha})`;
      ctx.fill();
    });

    ctx.restore();
    rafRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateSize = () => {
      sizeRef.current = getCanvasSize();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = sizeRef.current.width * dpr;
      canvas.height = sizeRef.current.height * dpr;
      canvas.style.width = `${sizeRef.current.width}px`;
      canvas.style.height = `${sizeRef.current.height}px`;
    };
    updateSize();

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize to -1..1 relative to viewport center
      mouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
    };

    document.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', updateSize);

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', updateSize);
    };
  }, [draw]);

  return (
    <div className="relative flex items-center justify-center" aria-hidden="true">
      {/* Insight Gold halo behind the head */}
      <motion.div
        className="absolute w-[280px] h-[280px] md:w-[380px] md:h-[380px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255,184,0,0.08) 0%, rgba(255,184,0,0.03) 35%, rgba(118,158,219,0.04) 55%, transparent 70%)',
        }}
        animate={{ scale: [1, 1.04, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Strategic Blue depth glow */}
      <div
        className="absolute w-[500px] h-[500px] md:w-[600px] md:h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(118,158,219,0.08) 0%, rgba(118,158,219,0.02) 50%, transparent 70%)',
        }}
      />

      {/* Neural head canvas */}
      <canvas
        ref={canvasRef}
        className="relative z-10"
        style={{ pointerEvents: 'none' }}
      />
    </div>
  );
}
