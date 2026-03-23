'use client';

import { motion, useReducedMotion } from 'framer-motion';

export function DecisionLockIcon() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative w-36 h-36 md:w-44 md:h-44 flex items-center justify-center">
      {/* Deep cyan halo behind crosshair */}
      <div
        className="absolute inset-[-60%] pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(0,255,194,0.07) 0%, rgba(0,242,255,0.04) 30%, transparent 60%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Outer glow halo */}
      <div
        className="absolute inset-[-20%] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(0,242,255,0.15) 0%, rgba(0,242,255,0.04) 40%, transparent 70%)',
          filter: 'blur(12px)',
        }}
      />

      {/* Rotating tick marks layer */}
      <motion.svg
        viewBox="0 0 120 120"
        className="absolute inset-0 w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={prefersReducedMotion ? undefined : { rotate: 360 }}
        transition={
          prefersReducedMotion
            ? undefined
            : { duration: 90, repeat: Infinity, ease: 'linear' }
        }
      >
        {/* Tick marks at cardinal points */}
        <line x1="60" y1="6" x2="60" y2="18" stroke="#00FFC2" strokeWidth="1" opacity="0.6" />
        <line x1="60" y1="102" x2="60" y2="114" stroke="#00FFC2" strokeWidth="1" opacity="0.6" />
        <line x1="6" y1="60" x2="18" y2="60" stroke="#00FFC2" strokeWidth="1" opacity="0.6" />
        <line x1="102" y1="60" x2="114" y2="60" stroke="#00FFC2" strokeWidth="1" opacity="0.6" />

        {/* Minor tick marks at 45 deg */}
        <line x1="17.57" y1="17.57" x2="24.04" y2="24.04" stroke="#00FFC2" strokeWidth="0.5" opacity="0.3" />
        <line x1="95.96" y1="17.57" x2="102.43" y2="24.04" stroke="#00FFC2" strokeWidth="0.5" opacity="0.3" transform="rotate(90 60 60)" />
      </motion.svg>

      {/* Static crosshair structure */}
      <svg
        viewBox="0 0 120 120"
        className="w-full h-full relative z-[1]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer ring */}
        <circle
          cx="60"
          cy="60"
          r="48"
          stroke="#00F2FF"
          strokeWidth="0.6"
          opacity="0.35"
        />

        {/* Inner precision ring — dashed */}
        <circle
          cx="60"
          cy="60"
          r="24"
          stroke="#00F2FF"
          strokeWidth="0.5"
          opacity="0.25"
          strokeDasharray="3 6"
        />

        {/* Center neural node */}
        <circle cx="60" cy="60" r="4" fill="#00FFC2" opacity="0.95" />
        <circle cx="60" cy="60" r="8" stroke="#00F2FF" strokeWidth="0.5" opacity="0.5" />

        {/* Neural spokes */}
        <line x1="60" y1="52" x2="60" y2="36" stroke="#00F2FF" strokeWidth="0.4" opacity="0.4" />
        <line x1="60" y1="68" x2="60" y2="84" stroke="#00F2FF" strokeWidth="0.4" opacity="0.4" />
        <line x1="52" y1="60" x2="36" y2="60" stroke="#00F2FF" strokeWidth="0.4" opacity="0.4" />
        <line x1="68" y1="60" x2="84" y2="60" stroke="#00F2FF" strokeWidth="0.4" opacity="0.4" />

        {/* Diagonal micro-spokes */}
        <line x1="54.34" y1="54.34" x2="43" y2="43" stroke="#00F2FF" strokeWidth="0.3" opacity="0.2" />
        <line x1="65.66" y1="54.34" x2="77" y2="43" stroke="#00F2FF" strokeWidth="0.3" opacity="0.2" />
        <line x1="54.34" y1="65.66" x2="43" y2="77" stroke="#00F2FF" strokeWidth="0.3" opacity="0.2" />
        <line x1="65.66" y1="65.66" x2="77" y2="77" stroke="#00F2FF" strokeWidth="0.3" opacity="0.2" />

        {/* Satellite nodes */}
        <circle cx="60" cy="36" r="1.5" fill="#00F2FF" opacity="0.55" />
        <circle cx="60" cy="84" r="1.5" fill="#00F2FF" opacity="0.55" />
        <circle cx="36" cy="60" r="1.5" fill="#00F2FF" opacity="0.55" />
        <circle cx="84" cy="60" r="1.5" fill="#00F2FF" opacity="0.55" />
      </svg>

      {/* Center point intense glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full pointer-events-none z-[2]"
        style={{
          background:
            'radial-gradient(circle, rgba(0,255,194,0.6) 0%, rgba(0,242,255,0.2) 40%, transparent 70%)',
        }}
      />

      {/* Center light pulse */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full z-[3]"
        style={{
          backgroundColor: '#00FFC2',
          boxShadow:
            '0 0 8px #00FFC2, 0 0 24px #00F2FF, 0 0 70px rgba(0,255,194,0.45)',
        }}
        animate={
          prefersReducedMotion
            ? undefined
            : {
                boxShadow: [
                  '0 0 8px #00FFC2, 0 0 24px #00F2FF, 0 0 70px rgba(0,255,194,0.45)',
                  '0 0 12px #00FFC2, 0 0 36px #00F2FF, 0 0 100px rgba(0,255,194,0.6)',
                  '0 0 8px #00FFC2, 0 0 24px #00F2FF, 0 0 70px rgba(0,255,194,0.45)',
                ],
              }
        }
        transition={
          prefersReducedMotion
            ? undefined
            : { duration: 3, repeat: Infinity, ease: 'easeInOut' }
        }
      />
    </div>
  );
}
