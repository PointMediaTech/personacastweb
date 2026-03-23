'use client';
import { useMountAnimation, cssTransition } from '@/app/lib/animations';

/**
 * LiveBadge — "LIVE SIMULATION" indicator in Insight Gold.
 * Positioned in the top-right area of the hero section.
 */
export function LiveBadge() {
  const mounted = useMountAnimation();

  return (
    <div
      className="fixed top-20 right-6 md:right-10 z-50 flex items-center gap-2"
      style={{
        opacity: mounted ? 1 : 0,
        transform: mounted ? 'translateX(0)' : 'translateX(20px)',
        transition: cssTransition(['opacity', 'transform'], 0.6, 1.5),
      }}
    >
      {/* Pulsing dot */}
      <span className="relative flex h-2 w-2">
        <span
          className="absolute inset-0 rounded-full bg-insight-gold"
          style={{ animation: 'pulse-dot 2s ease-in-out infinite' }}
        />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-insight-gold" />
      </span>

      <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-insight-gold uppercase">
        Live Simulation
      </span>
    </div>
  );
}
