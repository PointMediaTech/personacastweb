import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { HUDLabel } from './HUDLabel';
import { DecisionCard } from './DecisionCard';
import { SimulationResult } from './SimulationResult';
import {
  HUD_LABELS, DECISIONS, DECISION_RESULTS, EASE,
  type DecisionKey,
} from './theaterData';

interface SimulationTheaterProps {
  readonly theaterActive: boolean;
  readonly selectedDecision: DecisionKey | null;
  readonly onSelectDecision: (key: DecisionKey) => void;
}

export function SimulationTheater({
  theaterActive, selectedDecision, onSelectDecision,
}: SimulationTheaterProps) {
  const reduced = useReducedMotion();
  const [cardsInteractive, setCardsInteractive] = useState(false);

  // Reset interactivity when theater deactivates
  useEffect(() => {
    if (!theaterActive) setCardsInteractive(false);
  }, [theaterActive]);

  // Countdown timer state
  const [countdown, setCountdown] = useState(68);
  useEffect(() => {
    if (!theaterActive || reduced) return;
    const interval = setInterval(() => {
      setCountdown((prev) => (prev > 1 ? prev - 1 : 68));
    }, 5000);
    return () => clearInterval(interval);
  }, [theaterActive, reduced]);

  const handleMorphComplete = useCallback(() => {
    setCardsInteractive(true);
  }, []);

  // Find the selected decision config for result panel positioning
  const selectedConfig = selectedDecision
    ? DECISIONS.find((d) => d.key === selectedDecision)
    : null;
  const selectedLabel = selectedConfig
    ? HUD_LABELS[DECISIONS.indexOf(selectedConfig)]
    : null;

  return (
    <div
      className="absolute inset-0 z-[15] hidden md:block"
      style={{ pointerEvents: 'none' }}
      aria-hidden={!theaterActive ? 'true' : undefined}
    >
      {/*
       * SEO: Both HUD labels and decision cards are ALWAYS in the DOM.
       * Visibility is controlled via opacity + pointer-events, never display:none
       * or conditional rendering, so crawlers can index all text.
       */}

      {/* Phase 1: HUD Labels — opacity-based show/hide */}
      {HUD_LABELS.map((label, i) => (
        <motion.div
          key={`hud-${label.id}`}
          animate={{ opacity: theaterActive ? 0 : 0.7 }}
          transition={{ duration: 0.3, ease: EASE }}
          style={{ pointerEvents: 'none' }}
        >
          <HUDLabel
            config={label}
            delay={1.8 + i * 0.3}
          />
        </motion.div>
      ))}

      {/* Phase 2: Decision Cards — opacity-based show/hide */}
      {DECISIONS.map((decision, i) => (
        <motion.div
          key={`card-${decision.key}`}
          animate={{ opacity: theaterActive ? 1 : 0 }}
          transition={{ duration: 0.6, delay: theaterActive ? 0.1 : 0, ease: EASE }}
          onAnimationComplete={() => {
            if (theaterActive && i === 0) handleMorphComplete();
          }}
          style={{ pointerEvents: theaterActive && cardsInteractive ? 'auto' : 'none' }}
        >
          <DecisionCard
            config={decision}
            isSelected={selectedDecision === decision.key}
            isOtherSelected={selectedDecision !== null && selectedDecision !== decision.key}
            onSelect={onSelectDecision}
            position={HUD_LABELS[i].cardPosition}
          />
        </motion.div>
      ))}

      {/* Countdown Timer — always in DOM, opacity-controlled */}
      <motion.div
        className="absolute"
        style={{ top: '6%', right: '12%' }}
        animate={{ opacity: theaterActive ? 0.6 : 0, y: theaterActive ? 0 : -10 }}
        transition={{ duration: 0.5, delay: theaterActive ? 0.3 : 0, ease: EASE }}
        aria-hidden="true"
      >
        <span
          className="font-mono text-[11px] uppercase"
          style={{ letterSpacing: '0.2em', color: '#FFB800' }}
        >
          72H CRISIS WINDOW: T-{countdown}H
        </span>
      </motion.div>

      {/* Result Panel */}
      <AnimatePresence mode="wait">
        {selectedDecision && selectedConfig && selectedLabel && (
          <SimulationResult
            key={selectedDecision}
            result={DECISION_RESULTS[selectedDecision]}
            accentColor={selectedConfig.accentColor}
            position={selectedLabel.cardPosition}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
