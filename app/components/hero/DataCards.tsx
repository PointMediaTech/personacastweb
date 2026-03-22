'use client';
import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ConflictIndexCard } from './cards/ConflictIndexCard';
import { TrajectoryCard } from './cards/TrajectoryCard';
import { SentimentCard } from './cards/SentimentCard';

const EASE = [0.22, 1, 0.36, 1] as const;

const CARD_POSITIONS = [
  { top: '10%', right: '16%', delay: 2.0 },
  { top: '26%', right: '10%', delay: 2.3 },
  { top: '58%', right: '14%', delay: 2.6 },
] as const;

function GlassCard({
  children,
  top,
  right,
  delay,
}: {
  children: React.ReactNode;
  top: string;
  right: string;
  delay: number;
}) {
  const reduced = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="absolute w-[320px] rounded-xl p-5"
      style={{
        top,
        right,
        background: 'rgba(10,14,23,0.55)',
        backdropFilter: isHovered ? 'blur(20px)' : 'blur(16px)',
        WebkitBackdropFilter: isHovered ? 'blur(20px)' : 'blur(16px)',
        border: '1px solid rgba(0,242,255,0.12)',
        boxShadow: '0 0 8px rgba(0,242,255,0.06)',
        transform: isHovered ? 'scale(1.02) translate(-2px, -2px)' : 'scale(1)',
        transition: 'all 0.3s ease',
      }}
      initial={reduced ? { opacity: 1 } : { opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay, ease: EASE }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </motion.div>
  );
}

export function DataCards() {
  return (
    <div className="absolute inset-0 z-[15] hidden md:block" style={{ pointerEvents: 'none' }}>
      {/* Card 1 + 2: visible on tablet (md) and desktop (lg) */}
      <GlassCard top={CARD_POSITIONS[0].top} right={CARD_POSITIONS[0].right} delay={CARD_POSITIONS[0].delay}>
        <ConflictIndexCard />
      </GlassCard>
      <GlassCard top={CARD_POSITIONS[1].top} right={CARD_POSITIONS[1].right} delay={CARD_POSITIONS[1].delay}>
        <TrajectoryCard />
      </GlassCard>
      {/* Card 3: desktop only (hidden on tablet) */}
      <div className="hidden lg:block">
        <GlassCard top={CARD_POSITIONS[2].top} right={CARD_POSITIONS[2].right} delay={CARD_POSITIONS[2].delay}>
          <SentimentCard />
        </GlassCard>
      </div>
    </div>
  );
}
