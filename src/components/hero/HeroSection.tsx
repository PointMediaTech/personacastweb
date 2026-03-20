import { Navbar } from './Navbar';
import { HeroContent } from './HeroContent';
import { LiveBadge } from './LiveBadge';
import { ChaosFlowCanvas } from './ChaosFlowCanvas';
import { DataRainCanvas } from './DataRainCanvas';
import { DataCards } from './DataCards';

export function HeroSection() {
  return (
    <section className="relative h-screen bg-deep-space overflow-hidden">
      {/* Atmospheric glow — z-0 */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: [
            'radial-gradient(ellipse 65% 75% at 72% 45%, rgba(118,158,219,0.14) 0%, rgba(118,158,219,0.04) 40%, transparent 60%)',
            'radial-gradient(ellipse 35% 35% at 60% 40%, rgba(255,184,0,0.03) 0%, transparent 50%)',
          ].join(', '),
        }}
      />

      {/* DataRain — z-1, left 40% background texture */}
      <DataRainCanvas />

      {/* ChaosFlow — z-2, full-width flow lines */}
      <ChaosFlowCanvas />

      {/* Left scrim — z-[2], same z as ChaosFlow but renders on top via DOM order */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, rgba(2,6,23,0.95) 0%, rgba(2,6,23,0.85) 25%, rgba(2,6,23,0.4) 45%, transparent 62%)',
        }}
      />

      {/* Text content — z-10 */}
      <div
        className="relative z-10 h-screen flex items-center"
        style={{ paddingLeft: 'clamp(2.5rem, 8vw, 10rem)', paddingRight: '1.5rem' }}
      >
        <div className="w-full max-w-xl">
          <HeroContent />
        </div>
      </div>

      {/* DataCards — z-15, floating glassmorphism cards */}
      <DataCards />

      <LiveBadge />
      <Navbar />
    </section>
  );
}
