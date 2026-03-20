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
  delay: number;
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
      const canvasWidth = rect.width * 0.4;
      canvas.style.width = `${canvasWidth}px`;
      canvas.style.height = `${rect.height}px`;
      canvas.width = canvasWidth * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      init(canvasWidth, rect.height);
    };
    resize();
    window.addEventListener('resize', resize);

    const FRAME_INTERVAL = 1000 / 15;
    const STARTUP_DELAY = 500;
    let lastFrame = 0;
    let started = false;
    const initTime = performance.now();

    const animate = (timestamp: number) => {
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

        for (let j = 0; j < col.chars.length; j++) {
          const charY = col.y - j * 18;
          if (charY < 0 || charY > h) continue;

          const fadeAlpha = j === 0 ? 1 : Math.max(0, 1 - j / col.chars.length);
          const isGold = Math.random() < 0.1;
          const c = isGold ? GOLD : CYAN;
          const baseOpacity = isGold ? 0.06 : 0.04;

          const xFade = col.x < w * 0.7 ? 1 : Math.max(0, 1 - (col.x - w * 0.7) / (w * 0.3));

          const alpha = Math.min(0.06, baseOpacity * fadeAlpha * xFade);
          ctx.fillStyle = `rgba(${c.r},${c.g},${c.b},${alpha})`;
          ctx.fillText(col.chars[j], col.x, charY);
        }

        if (col.y - col.chars.length * 18 > h) {
          col.y = -20;
          col.delayRemaining = Math.floor(Math.random() * 45);
          for (let j = 0; j < col.chars.length; j++) {
            col.chars[j] = WORD_POOL[Math.floor(Math.random() * WORD_POOL.length)];
          }
        }
      }

      if (reducedMotion) return;
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
