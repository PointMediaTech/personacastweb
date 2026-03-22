'use client';
import { useRef, useEffect, useCallback } from 'react';

/**
 * useNeuralCanvas — Dynamic canvas-based neural network.
 *
 * Features:
 *   - Nodes drift slowly with Brownian motion
 *   - Proximity-based connection lines draw/fade dynamically
 *   - Every ~3s a "Signal Pulse" in Insight Gold travels a random path
 *   - Mouse repulsion: nodes gently move away from cursor
 *   - Organic "heartbeat" node pulsing
 */

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  gold: boolean;
  pulsePhase: number;
}

const BLUE = { r: 118, g: 158, b: 219 };
const GOLD = { r: 255, g: 184, b: 0 };

function seeded(s: number) {
  let seed = s;
  return () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
}

export function useNeuralCanvas(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
) {
  const nodesRef = useRef<Node[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef(0);
  const timeRef = useRef(0);
  const pulseRef = useRef<{ path: number[]; progress: number; active: boolean }>({
    path: [],
    progress: 0,
    active: false,
  });

  const init = useCallback((w: number, h: number) => {
    const rand = seeded(42);
    const count = Math.min(Math.floor((w * h) / 8000), 120);
    const nodes: Node[] = [];

    for (let i = 0; i < count; i++) {
      nodes.push({
        x: rand() * w,
        y: rand() * h,
        vx: (rand() - 0.5) * 0.4,
        vy: (rand() - 0.5) * 0.4,
        radius: 1.5 + rand() * 2,
        gold: rand() < 0.08,
        pulsePhase: rand() * Math.PI * 2,
      });
    }
    nodesRef.current = nodes;
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

    const CONNECTION_DIST = 120;
    const REPULSION_RADIUS = 130;
    const PULSE_INTERVAL = 5000; // ms
    let lastPulseTime = 0;

    const triggerPulse = (nodes: Node[]) => {
      // Pick a random start node, BFS outward for a path
      const start = Math.floor(Math.random() * nodes.length);
      const path = [start];
      const visited = new Set([start]);

      for (let step = 0; step < 6; step++) {
        const current = path[path.length - 1];
        let closest = -1;
        let closestDist = Infinity;

        for (let j = 0; j < nodes.length; j++) {
          if (visited.has(j)) continue;
          const dx = nodes[current].x - nodes[j].x;
          const dy = nodes[current].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST && dist < closestDist) {
            closest = j;
            closestDist = dist;
          }
        }

        if (closest === -1) break;
        path.push(closest);
        visited.add(closest);
      }

      pulseRef.current = { path, progress: 0, active: true };
    };

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
      const mouse = mouseRef.current;
      const nodes = nodesRef.current;

      // Trigger pulse every ~3s
      if (timeRef.current - lastPulseTime > PULSE_INTERVAL) {
        triggerPulse(nodes);
        lastPulseTime = timeRef.current;
      }

      // Update pulse
      const pulse = pulseRef.current;
      if (pulse.active) {
        pulse.progress += 0.02;
        if (pulse.progress >= 1) {
          pulse.active = false;
        }
      }

      // Update nodes
      for (const node of nodes) {
        // Brownian drift
        node.x += node.vx + (Math.random() - 0.5) * 0.3;
        node.y += node.vy + (Math.random() - 0.5) * 0.3;

        // Mouse repulsion
        const dx = node.x - mouse.x;
        const dy = node.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < REPULSION_RADIUS && dist > 0) {
          const force = ((REPULSION_RADIUS - dist) / REPULSION_RADIUS) * 1.5;
          node.x += (dx / dist) * force;
          node.y += (dy / dist) * force;
        }

        // Wrap edges
        if (node.x < -20) node.x = w + 20;
        if (node.x > w + 20) node.x = -20;
        if (node.y < -20) node.y = h + 20;
        if (node.y > h + 20) node.y = -20;
      }

      // Build active pulse edge set
      const pulseEdges = new Set<string>();
      if (pulse.active) {
        const segIdx = Math.floor(pulse.progress * (pulse.path.length - 1));
        for (let i = 0; i <= Math.min(segIdx, pulse.path.length - 2); i++) {
          const a = Math.min(pulse.path[i], pulse.path[i + 1]);
          const b = Math.max(pulse.path[i], pulse.path[i + 1]);
          pulseEdges.add(`${a}-${b}`);
        }
      }

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const ddx = a.x - b.x;
          const ddy = a.y - b.y;
          const d = Math.sqrt(ddx * ddx + ddy * ddy);

          if (d < CONNECTION_DIST) {
            const alpha = (1 - d / CONNECTION_DIST);
            const key = `${i}-${j}`;
            const isPulse = pulseEdges.has(key);

            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);

            if (isPulse) {
              const pulseAlpha = 0.4 + Math.sin(pulse.progress * Math.PI) * 0.4;
              ctx.strokeStyle = `rgba(${GOLD.r},${GOLD.g},${GOLD.b},${pulseAlpha})`;
              ctx.lineWidth = 1.5;
            } else {
              ctx.strokeStyle = `rgba(${BLUE.r},${BLUE.g},${BLUE.b},${alpha * 0.2})`;
              ctx.lineWidth = 0.6;
            }
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        // Heartbeat pulse
        const heartbeat = Math.sin(t * 1.5 + n.pulsePhase);
        const pulseFactor = 0.7 + heartbeat * 0.3;
        const r = n.radius * pulseFactor;

        const isPulseNode = pulse.active && pulse.path.includes(i) &&
          pulse.progress > (pulse.path.indexOf(i) / pulse.path.length) * 0.8;

        if (isPulseNode || n.gold) {
          // Gold glow
          ctx.beginPath();
          ctx.arc(n.x, n.y, r + 6, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${GOLD.r},${GOLD.g},${GOLD.b},0.06)`;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${GOLD.r},${GOLD.g},${GOLD.b},${0.6 + heartbeat * 0.3})`;
          ctx.fill();
        } else {
          // Blue node
          ctx.beginPath();
          ctx.arc(n.x, n.y, r + 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${BLUE.r},${BLUE.g},${BLUE.b},${pulseFactor * 0.06})`;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${BLUE.r},${BLUE.g},${BLUE.b},${0.25 + pulseFactor * 0.25})`;
          ctx.fill();
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      document.removeEventListener('mousemove', handleMouse);
      window.removeEventListener('resize', resize);
    };
  }, [canvasRef, init]);
}
