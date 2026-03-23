'use client';
import { useMountAnimation, cssTransition } from '@/app/lib/animations';

/**
 * CoordinateOverlay — Faint "coordinate numbers" scattered around screen edges.
 * Creates the illusion of a strategic map/radar interface.
 * All values use JetBrains Mono, very low opacity.
 */

const COORDINATES = [
  { text: '25.04°N', x: '3%', y: '8%' },
  { text: '121.56°E', x: '6%', y: '12%' },
  { text: 'SEC:4.7', x: '92%', y: '6%' },
  { text: 'λ=0.847', x: '88%', y: '92%' },
  { text: '34.02°N', x: '2%', y: '88%' },
  { text: 'θ=142.3', x: '95%', y: '45%' },
  { text: 'Δt=0.016', x: '80%', y: '96%' },
  { text: 'NODE:A7', x: '12%', y: '95%' },
  { text: 'GRID:7F', x: '45%', y: '3%' },
  { text: '22.63°N', x: '70%', y: '5%' },
  { text: 'σ=2.41', x: '3%', y: '55%' },
  { text: 'μ=0.72', x: '96%', y: '70%' },
] as const;

export function CoordinateOverlay() {
  const mounted = useMountAnimation();

  return (
    <div className="absolute inset-0 z-[8] pointer-events-none overflow-hidden" aria-hidden="true">
      {COORDINATES.map((coord, i) => (
        <span
          key={i}
          className="absolute font-mono text-[9px] text-mist-blue-gray/[0.12] tracking-wider"
          style={{
            left: coord.x,
            top: coord.y,
            opacity: mounted ? 1 : 0,
            transition: cssTransition(['opacity'], 1, 1.5 + i * 0.1),
          }}
        >
          {coord.text}
        </span>
      ))}
    </div>
  );
}
