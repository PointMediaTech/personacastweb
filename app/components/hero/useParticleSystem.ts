'use client';
import { useRef, useEffect, useCallback } from 'react';

/**
 * useParticleSystem — Canvas-based particle animation with neural connection lines.
 *
 * Visual design:
 *   - Particles: small circles (radius 1–2 px) with low opacity (0.2–0.5)
 *   - Color distribution: 80% Mist Blue Gray, 10% Strategic Blue, 5% Dried Rose, 5% Insight Gold
 *   - Connection lines: faint lines drawn between particles within 120px, mirroring neural network style
 *   - Occasional "spark" — a line briefly flashes gold when two particles pass close
 *
 * Animation:
 *   - Brownian motion (random dx/dy) for organic drift
 *   - Base velocity gives directional bias
 *   - Mouse repulsion within 150px radius
 *
 * Performance:
 *   - Desktop: 100 particles; mobile: 50
 *   - Connection lines limited to nearby pairs (< 120px) to keep O(n²) manageable
 *   - requestAnimationFrame for frame-synced rendering
 */

const COLORS = {
  mistBlueGray: '#8892B0',
  strategicBlue: '#769EDB',
  driedRose: '#B57D7D',
  insightGold: '#FFB800',
} as const;

interface Particle {
  readonly x: number;
  readonly y: number;
  readonly vx: number;
  readonly vy: number;
  readonly color: string;
  readonly opacity: number;
  readonly radius: number;
}

function pickColor(): string {
  const roll = Math.random();
  if (roll < 0.80) return COLORS.mistBlueGray;
  if (roll < 0.90) return COLORS.strategicBlue;
  if (roll < 0.95) return COLORS.driedRose;
  return COLORS.insightGold;
}

function createParticle(width: number, height: number): Particle {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.6,
    vy: (Math.random() - 0.5) * 0.6,
    color: pickColor(),
    opacity: 0.2 + Math.random() * 0.3,
    radius: 1 + Math.random(),
  };
}

function getParticleCount(): number {
  return window.innerWidth >= 768 ? 100 : 50;
}

export function useParticleSystem(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const rafRef = useRef<number>(0);

  const initParticles = useCallback((width: number, height: number) => {
    const count = getParticleCount();
    particlesRef.current = Array.from({ length: count }, () =>
      createParticle(width, height)
    );
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles(canvas.width, canvas.height);
    };
    resize();

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    document.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', resize);

    const CONNECTION_DIST = 120;
    const REPULSION_RADIUS = 150;
    const REPULSION_STRENGTH = 2;

    const animate = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      const mouse = mouseRef.current;

      // Update particle positions
      particlesRef.current = particlesRef.current.map((p) => {
        let newX = p.x + p.vx + (Math.random() - 0.5) * 0.6;
        let newY = p.y + p.vy + (Math.random() - 0.5) * 0.6;

        const dx = newX - mouse.x;
        const dy = newY - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < REPULSION_RADIUS && dist > 0) {
          const force = (REPULSION_RADIUS - dist) / REPULSION_RADIUS * REPULSION_STRENGTH;
          newX += (dx / dist) * force;
          newY += (dy / dist) * force;
        }

        if (newX < 0) newX = width;
        if (newX > width) newX = 0;
        if (newY < 0) newY = height;
        if (newY > height) newY = 0;

        return { ...p, x: newX, y: newY };
      });

      const particles = particlesRef.current;

      // Draw connection lines between nearby particles (neural network effect)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * 0.12;
            // Occasional gold spark when very close
            const isGoldSpark = dist < 40 &&
              (a.color === COLORS.insightGold || b.color === COLORS.insightGold);

            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = isGoldSpark
              ? `rgba(255, 184, 0, ${alpha * 2.5})`
              : `rgba(136, 146, 176, ${alpha})`;
            ctx.lineWidth = isGoldSpark ? 0.8 : 0.4;
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resize);
    };
  }, [canvasRef, initParticles]);
}
