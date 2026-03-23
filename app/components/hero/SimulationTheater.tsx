'use client';
import { useState, useEffect } from 'react';
import { HUDLabel } from './HUDLabel';
import { DecisionCard } from './DecisionCard';
import { SimulationResult } from './SimulationResult';
import {
  HUD_LABELS, DECISIONS, DECISION_RESULTS,
  type DecisionKey,
} from './theaterData';
import { useReducedMotion, useAnimatePresence, EASE_CSS } from '@/app/lib/animations';

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

  // When theater activates, set cards interactive after transition completes
  useEffect(() => {
    if (theaterActive) {
      const timer = setTimeout(() => setCardsInteractive(true), 600);
      return () => clearTimeout(timer);
    }
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

  // Find the selected decision config for result panel positioning
  const selectedConfig = selectedDecision
    ? DECISIONS.find((d) => d.key === selectedDecision)
    : null;
  const selectedLabel = selectedConfig
    ? HUD_LABELS[DECISIONS.indexOf(selectedConfig)]
    : null;

  const showResult = selectedDecision !== null;
  const { shouldRender, isVisible } = useAnimatePresence(showResult, 300);

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
        <div
          key={`hud-${label.id}`}
          style={{
            opacity: theaterActive ? 0 : 1,
            transition: `opacity 0.3s ${EASE_CSS}`,
            pointerEvents: 'none',
          }}
        >
          <HUDLabel
            config={label}
            delay={1.8 + i * 0.3}
          />
        </div>
      ))}

      {/* Phase 2: Decision Cards — opacity-based show/hide */}
      {DECISIONS.map((decision, i) => (
        <div
          key={`card-${decision.key}`}
          style={{
            opacity: theaterActive ? 1 : 0,
            transition: `opacity 0.6s ${EASE_CSS} ${theaterActive ? '0.1s' : '0s'}`,
            pointerEvents: theaterActive && cardsInteractive ? 'auto' : 'none',
          }}
        >
          <DecisionCard
            config={decision}
            isSelected={selectedDecision === decision.key}
            isOtherSelected={selectedDecision !== null && selectedDecision !== decision.key}
            onSelect={onSelectDecision}
            position={HUD_LABELS[i].cardPosition}
          />
        </div>
      ))}

      {/* Countdown Timer — always in DOM, opacity-controlled */}
      <div
        className="fixed top-28 right-6 md:right-10 z-50 flex items-center gap-2"
        style={{
          opacity: theaterActive ? 1 : 0,
          transform: theaterActive ? 'translateX(0)' : 'translateX(20px)',
          transition: `opacity 0.5s ${EASE_CSS} ${theaterActive ? '0.3s' : '0s'}, transform 0.5s ${EASE_CSS} ${theaterActive ? '0.3s' : '0s'}`,
        }}
        aria-hidden="true"
      >
        <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-insight-gold uppercase">
          72H CRISIS WINDOW: T-{countdown}H
        </span>
      </div>

      {/* Result Panel */}
      {shouldRender && selectedConfig && selectedLabel && (
        <SimulationResult
          key={selectedDecision}
          result={DECISION_RESULTS[selectedDecision!]}
          accentColor={selectedConfig.accentColor}
          position={selectedLabel.cardPosition}
          isVisible={isVisible}
        />
      )}
    </div>
  );
}
