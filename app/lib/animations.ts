'use client';

import { useRef, useState, useEffect, useCallback, useSyncExternalStore } from 'react';

/* ── useReducedMotion ──────────────────────────────────────────────── */

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

function rmSubscribe(callback: () => void): () => void {
  const mql = window.matchMedia(REDUCED_MOTION_QUERY);
  mql.addEventListener('change', callback);
  return () => mql.removeEventListener('change', callback);
}

/**
 * SSR-safe via useSyncExternalStore.
 * Server snapshot → false; client snapshot → real matchMedia value.
 * Both sides agree on `false` during hydration, then the store
 * subscription updates the value after mount without CLS.
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    rmSubscribe,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false,
  );
}

/* ── useInView ─────────────────────────────────────────────────────── */

interface UseInViewOptions {
  once?: boolean;
  margin?: string;
  threshold?: number;
}

export function useInView(
  ref: React.RefObject<Element | null>,
  options: UseInViewOptions = {},
): boolean {
  const { once = true, margin = '-80px', threshold = 0 } = options;
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin: margin, threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, once, margin, threshold]);

  return inView;
}

/* ── useScrollProgress ─────────────────────────────────────────────── */

/**
 * Tracks scroll progress of `target` relative to viewport.
 * Returns a value from 0 → 1 as the element scrolls from
 * "start hitting viewport top" to "end leaving viewport top".
 *
 * Uses passive scroll + resize listeners (event-driven) instead of a
 * continuous rAF loop, so it does not consume frame budget when idle.
 */
export function useScrollProgress(
  target: React.RefObject<Element | null>,
): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = target.current;
    if (!el) return;

    const compute = () => {
      const rect = el.getBoundingClientRect();
      const viewH = window.innerHeight;
      // 0 when element top is at viewport bottom, 1 when element top is above viewport top
      const raw = (viewH - rect.top) / (viewH + rect.height);
      setProgress(Math.max(0, Math.min(1, raw)));
    };

    compute(); // initial value
    window.addEventListener('scroll', compute, { passive: true });
    window.addEventListener('resize', compute, { passive: true });
    return () => {
      window.removeEventListener('scroll', compute);
      window.removeEventListener('resize', compute);
    };
  }, [target]);

  return progress;
}

/* ── useMountAnimation ─────────────────────────────────────────────── */

/**
 * Returns `true` after first paint, for triggering mount-based CSS transitions.
 * With an optional delay (ms) before flipping.
 */
export function useMountAnimation(delayMs = 10): boolean {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setMounted(true), delayMs);
    return () => clearTimeout(id);
  }, [delayMs]);

  return mounted;
}

/* ── interpolate ───────────────────────────────────────────────────── */

/** Linear interpolation: maps `t` from [inMin, inMax] → [outMin, outMax], clamped. */
export function interpolate(
  t: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
): number {
  const clamped = Math.max(inMin, Math.min(inMax, t));
  return outMin + ((clamped - inMin) / (inMax - inMin)) * (outMax - outMin);
}

/* ── CSS transition builder ────────────────────────────────────────── */

/** Standard easing matching framer-motion's [0.22, 1, 0.36, 1] */
export const EASE_CSS = 'cubic-bezier(0.22, 1, 0.36, 1)';

/** Builds a CSS transition string from multiple properties. */
export function cssTransition(
  properties: string[],
  duration: number,
  delay = 0,
  easing = EASE_CSS,
): string {
  return properties
    .map((prop) => `${prop} ${duration}s ${easing} ${delay}s`)
    .join(', ');
}

/* ── useAnimatePresence ────────────────────────────────────────────── */

/**
 * Manages delayed unmount for exit animations.
 * Returns { shouldRender, isVisible } — render while shouldRender,
 * apply CSS transitions based on isVisible.
 */
export function useAnimatePresence(
  isPresent: boolean,
  exitDurationMs = 300,
): { shouldRender: boolean; isVisible: boolean } {
  const [shouldRender, setShouldRender] = useState(isPresent);

  useEffect(() => {
    if (isPresent) {
      setShouldRender(true);
    } else {
      const timer = setTimeout(() => setShouldRender(false), exitDurationMs);
      return () => clearTimeout(timer);
    }
  }, [isPresent, exitDurationMs]);

  // isVisible is true only when both present AND rendered
  const isVisible = isPresent && shouldRender;

  return { shouldRender, isVisible };
}

/* ── useSvgPointsMorph ─────────────────────────────────────────────── */

/**
 * Animates SVG polygon `points` from `from` to `to` over `duration` ms.
 * Returns current interpolated points string.
 */
export function useSvgPointsMorph(
  from: string,
  to: string,
  duration: number,
  delay: number,
  easing: (t: number) => number = (t) => {
    // cubic-bezier(0.22, 1, 0.36, 1) approximation
    const c1 = 0.22, c2 = 1, c3 = 0.36, c4 = 1;
    let lo = 0, hi = 1;
    for (let i = 0; i < 16; i++) {
      const mid = (lo + hi) / 2;
      const x = 3 * c1 * mid * (1 - mid) ** 2 + 3 * c3 * mid ** 2 * (1 - mid) + mid ** 3;
      if (x < t) lo = mid; else hi = mid;
    }
    const mid2 = (lo + hi) / 2;
    return 3 * c2 * mid2 * (1 - mid2) ** 2 + 3 * c4 * mid2 ** 2 * (1 - mid2) + mid2 ** 3;
  },
): string {
  const [points, setPoints] = useState(from);

  useEffect(() => {
    const fromPts = parsePoints(from);
    const toPts = parsePoints(to);
    if (fromPts.length !== toPts.length) {
      setPoints(to);
      return;
    }

    let startTime: number | null = null;
    let raf = 0;

    const animate = (time: number) => {
      if (startTime === null) startTime = time;
      const elapsed = time - startTime - delay;

      if (elapsed < 0) {
        raf = requestAnimationFrame(animate);
        return;
      }

      const t = Math.min(1, elapsed / duration);
      const easedT = easing(t);

      const interpolated = fromPts.map((fp, i) => {
        const tp = toPts[i];
        return `${fp.x + (tp.x - fp.x) * easedT},${fp.y + (tp.y - fp.y) * easedT}`;
      }).join(' ');

      setPoints(interpolated);

      if (t < 1) {
        raf = requestAnimationFrame(animate);
      }
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [from, to, duration, delay, easing]);

  return points;
}

function parsePoints(str: string): Array<{ x: number; y: number }> {
  return str.trim().split(/\s+/).map((pair) => {
    const [x, y] = pair.split(',').map(Number);
    return { x, y };
  });
}
