'use client';
import { motion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * SimulationSphere — The "AI Heart" central visual.
 *
 * Composed of:
 *   1. A soft radial gradient backdrop for depth (Strategic Blue → transparent)
 *   2. A glowing semi-transparent core orb with pulsing opacity
 *   3. Two spinning orbital rings at different angles and speeds
 *   4. A bright inner highlight that breathes with a slower pulse
 */
export function SimulationSphere() {
  return (
    <div className="relative flex items-center justify-center" aria-hidden="true">
      {/* Radial glow backdrop — creates depth and light source */}
      <div
        className="absolute w-[500px] h-[500px] md:w-[600px] md:h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(118,158,219,0.10) 0%, rgba(118,158,219,0.03) 50%, transparent 70%)',
        }}
      />

      {/* Outer orbital ring — slow rotation, tilted on X axis */}
      <motion.div
        className="absolute w-52 h-52 md:w-64 md:h-64 rounded-full border border-strategic-blue/20"
        style={{ rotateX: '65deg' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />

      {/* Inner orbital ring — faster counter-rotation, different tilt */}
      <motion.div
        className="absolute w-36 h-36 md:w-44 md:h-44 rounded-full border border-dried-rose/15"
        style={{ rotateX: '72deg', rotateZ: '30deg' }}
        animate={{ rotate: -360 }}
        transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
      />

      {/* Core orb — glowing, pulsing sphere */}
      <motion.div
        className="relative w-24 h-24 md:w-32 md:h-32 rounded-full"
        style={{
          background: 'radial-gradient(circle at 35% 35%, rgba(118,158,219,0.4) 0%, rgba(118,158,219,0.15) 40%, rgba(15,23,42,0.6) 100%)',
          boxShadow: '0 0 60px 15px rgba(118,158,219,0.15), 0 0 120px 40px rgba(118,158,219,0.06)',
        }}
        animate={{
          scale: [1, 1.06, 1],
          opacity: [0.85, 1, 0.85],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: EASE,
        }}
      >
        {/* Inner bright core — the "calculation" heart */}
        <motion.div
          className="absolute inset-4 md:inset-5 rounded-full"
          style={{
            background: 'radial-gradient(circle at 40% 40%, rgba(118,158,219,0.6) 0%, rgba(181,125,125,0.15) 60%, transparent 100%)',
          }}
          animate={{
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.5,
          }}
        />

        {/* Tiny specular highlight */}
        <div
          className="absolute top-3 left-4 md:top-4 md:left-5 w-3 h-3 md:w-4 md:h-4 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.5) 0%, transparent 70%)',
          }}
        />
      </motion.div>
    </div>
  );
}
