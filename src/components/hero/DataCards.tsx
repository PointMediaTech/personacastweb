import { motion, useReducedMotion } from 'framer-motion';
import { ConflictIndexCard } from './cards/ConflictIndexCard';
import { TrajectoryCard } from './cards/TrajectoryCard';
import { SentimentCard } from './cards/SentimentCard';

const EASE = [0.22, 1, 0.36, 1] as const;

const CARD_POSITIONS = [
  { top: '12%', right: '5%', delay: 2.0 },
  { top: '38%', right: '3%', delay: 2.3 },
  { top: '62%', right: '8%', delay: 2.6 },
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

  return (
    <motion.div
      className="absolute w-[260px] rounded-xl border border-slate-700/40 p-4"
      style={{
        top,
        right,
        background: 'rgba(2,6,23,0.5)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
      initial={reduced ? { opacity: 1 } : { opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay, ease: EASE }}
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
