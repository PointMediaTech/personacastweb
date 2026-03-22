'use client';
import { useRef, useEffect, useState, useCallback } from 'react';

/**
 * useParallax — Tracks normalized mouse position for parallax depth effects.
 *
 * Returns { x, y } in range [-1, 1] relative to viewport center.
 * Components multiply by their own depth factor to create layered motion.
 */

interface ParallaxPosition {
  readonly x: number;
  readonly y: number;
}

export function useParallax(): ParallaxPosition {
  const [pos, setPos] = useState<ParallaxPosition>({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(0);

  const lerp = useCallback(() => {
    const t = targetRef.current;
    const c = currentRef.current;
    // Smooth interpolation (0.06 = silky slow follow)
    const nx = c.x + (t.x - c.x) * 0.06;
    const ny = c.y + (t.y - c.y) * 0.06;
    currentRef.current = { x: nx, y: ny };
    setPos({ x: nx, y: ny });
    rafRef.current = requestAnimationFrame(lerp);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
    };

    document.addEventListener('mousemove', handleMouseMove);
    rafRef.current = requestAnimationFrame(lerp);

    return () => {
      cancelAnimationFrame(rafRef.current);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [lerp]);

  return pos;
}
