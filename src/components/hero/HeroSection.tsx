import { motion } from 'framer-motion';
import { Navbar } from './Navbar';
import { NeuralCanvas } from './NeuralCanvas';
import { HeroContent } from './HeroContent';
import { AgentDossiers } from './AgentDossier';
import { LiveBadge } from './LiveBadge';

const EASE = [0.22, 1, 0.36, 1] as const;

export function HeroSection() {
  return (
    <section className="relative h-screen bg-deep-space overflow-hidden">
      {/* Atmospheric glow */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: [
            'radial-gradient(ellipse 65% 75% at 72% 45%, rgba(118,158,219,0.14) 0%, rgba(118,158,219,0.04) 40%, transparent 60%)',
            'radial-gradient(ellipse 35% 35% at 60% 40%, rgba(255,184,0,0.03) 0%, transparent 50%)',
          ].join(', '),
        }}
      />

      {/* Dynamic Neural Canvas — right 62% */}
      <motion.div
        className="absolute top-0 right-0 bottom-0 z-[1] hidden lg:block"
        style={{ width: '62vw' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.3, ease: EASE }}
      >
        <NeuralCanvas />
        <AgentDossiers />
      </motion.div>

      {/* Left scrim */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, rgba(2,6,23,0.95) 0%, rgba(2,6,23,0.85) 25%, rgba(2,6,23,0.4) 45%, transparent 62%)',
        }}
      />

      {/* Text content — INLINE paddingLeft to guarantee spacing */}
      <div
        className="relative z-10 h-screen flex items-center"
        style={{ paddingLeft: 'clamp(2.5rem, 8vw, 10rem)', paddingRight: '1.5rem' }}
      >
        <div className="w-full max-w-xl">
          <HeroContent />
        </div>
      </div>

      <LiveBadge />
      <Navbar />
    </section>
  );
}
