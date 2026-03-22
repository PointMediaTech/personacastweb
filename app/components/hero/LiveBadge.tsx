'use client';
import { motion } from 'framer-motion';

/**
 * LiveBadge — "LIVE SIMULATION" indicator in Insight Gold.
 * Positioned in the top-right area of the hero section.
 */
export function LiveBadge() {
  return (
    <motion.div
      className="fixed top-20 right-6 md:right-10 z-50 flex items-center gap-2"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Pulsing dot */}
      <span className="relative flex h-2 w-2">
        <motion.span
          className="absolute inset-0 rounded-full bg-insight-gold"
          animate={{ scale: [1, 2, 1], opacity: [0.8, 0, 0.8] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-insight-gold" />
      </span>

      <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-insight-gold uppercase">
        Live Simulation
      </span>
    </motion.div>
  );
}
