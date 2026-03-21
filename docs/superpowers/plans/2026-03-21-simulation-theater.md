# Simulation Theater Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Hero Section's Agent Cards with a two-phase interactive Simulation Theater — HUD annotation labels by default, morphing into decision cards with crisis simulation on click.

**Architecture:** DOM overlay components (SimulationTheater, HUDLabel, DecisionCard, SimulationResult) render on top of ChaosFlowCanvas at z-15. State is centralized in HeroSection (`theaterActive`, `selectedDecision`) and passed down via props. ChaosFlowCanvas receives these props via refs bridged into its render loop to control brightness, particle count, and flow line divergence.

**Tech Stack:** React 19, Framer Motion 12, Tailwind CSS 4, Canvas 2D, Simplex Noise 4, TypeScript 5, Vite 8

**Spec:** `docs/superpowers/specs/2026-03-21-simulation-theater-design.md`

---

## File Structure

| File | Type | Responsibility |
|------|------|---------------|
| `src/components/hero/SimulationTheater.tsx` | New | Container: both HUD labels AND decision cards always in DOM (opacity-based switching for SEO); renders result panel and countdown timer |
| `src/components/hero/HUDLabel.tsx` | New | Single HUD annotation label with accent bar, entry animation, and optional continuous animation |
| `src/components/hero/DecisionCard.tsx` | New | Single interactive decision card with glassmorphism, hover/selected states |
| `src/components/hero/SimulationResult.tsx` | New | Result panel with progress bars and metrics |
| `src/components/hero/theaterData.ts` | New | Shared data constants: decision definitions, result datasets, HUD label configs |
| `src/components/hero/HeroSection.tsx` | Modify | Lift state, wire new props, swap AgentCards → SimulationTheater |
| `src/components/hero/HeroContent.tsx` | Modify | Accept props for button toggle and status bar dynamic Conflict value |
| `src/components/hero/ChaosFlowCanvas.tsx` | Modify | Accept `simulationActive` and `selectedDecision` props; implement brightness lerp, particle management, and right-side divergence |

---

### Task 1: Create shared data constants

**Files:**
- Create: `src/components/hero/theaterData.ts`

This file centralizes all static data so components stay clean and data is DRY.

- [ ] **Step 1: Create `theaterData.ts`**

```typescript
// src/components/hero/theaterData.ts

export type DecisionKey = 'A' | 'B' | 'C';

export interface HUDLabelConfig {
  id: number;
  text: string;
  value?: string;           // dynamic portion (e.g., "2.1M")
  accentColor: string;       // hex
  position: { top: string; left?: string; right?: string };
  cardPosition: { top: string; right: string }; // position when morphed to decision card
  hideBelow?: 'lg';          // Tailwind responsive hiding
}

export interface DecisionConfig {
  key: DecisionKey;
  titleZh: string;           // e.g., "公開道歉"
  titleEn: string;           // e.g., "PR PIVOT"
  accentColor: string;
  accentRgb: string;         // for rgba usage
  metrics: { successRate: number; risk: string };
  hideBelow?: 'lg';
}

export interface DecisionResult {
  successRate: number;
  opinionControl: string;
  timeCost: string;
  riskLevel: string;
  conclusion: string;
  conflictValue: number;     // bottom status bar sync
  conflictColor: string;     // color for the conflict value
}

export const HUD_LABELS: HUDLabelConfig[] = [
  {
    id: 1,
    text: 'RISK VECTORS: DIVERGING',
    accentColor: '#B57D7D',
    position: { top: '20%', left: '52%' },
    cardPosition: { top: '18%', right: '38%' },
    hideBelow: 'lg',
  },
  {
    id: 2,
    text: 'SCENARIO LOCK:',
    value: '2.1M PATHS',
    accentColor: '#769EDB',
    position: { top: '38%', right: '28%' },
    cardPosition: { top: '36%', right: '26%' },
  },
  {
    id: 3,
    text: 'OUTCOME: CONTROLLED ✓',
    accentColor: '#4ADE80',
    position: { top: '55%', right: '12%' },
    cardPosition: { top: '54%', right: '14%' },
  },
];

export const DECISIONS: DecisionConfig[] = [
  {
    key: 'A',
    titleZh: '公開道歉',
    titleEn: 'PR PIVOT',
    accentColor: '#769EDB',
    accentRgb: '118,158,219',
    metrics: { successRate: 73, risk: '低' },
    hideBelow: undefined,
  },
  {
    key: 'B',
    titleZh: '法律攻防',
    titleEn: 'LEGAL WAR',
    accentColor: '#FFB800',
    accentRgb: '255,184,0',
    metrics: { successRate: 45, risk: '中' },
    hideBelow: undefined,
  },
  {
    key: 'C',
    titleZh: '轉移關注',
    titleEn: 'DIVERSION',
    accentColor: '#B57D7D',
    accentRgb: '181,125,125',
    metrics: { successRate: 28, risk: '高' },
    hideBelow: 'lg',
  },
];

export const DECISION_RESULTS: Record<DecisionKey, DecisionResult> = {
  A: {
    successRate: 73,
    opinionControl: 'HIGH',
    timeCost: 'T+24H',
    riskLevel: 'LOW',
    conclusion: '建議：立即執行',
    conflictValue: 34,
    conflictColor: '#4ADE80',
  },
  B: {
    successRate: 45,
    opinionControl: 'MEDIUM',
    timeCost: 'T+48H',
    riskLevel: 'MEDIUM',
    conclusion: '建議：備妥法務團隊',
    conflictValue: 58,
    conflictColor: '#FFB800',
  },
  C: {
    successRate: 28,
    opinionControl: 'LOW',
    timeCost: 'T+12H',
    riskLevel: 'CRITICAL',
    conclusion: '警告：高混亂度',
    conflictValue: 91,
    conflictColor: '#B57D7D',
  },
};

export const EASE = [0.22, 1, 0.36, 1] as const;
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors related to `theaterData.ts`

- [ ] **Step 3: Commit**

```bash
git add src/components/hero/theaterData.ts
git commit -m "feat(theater): add shared data constants for simulation theater"
```

---

### Task 2: Create HUDLabel component

**Files:**
- Create: `src/components/hero/HUDLabel.tsx`
- Reference: `src/components/hero/theaterData.ts`

- [ ] **Step 1: Create `HUDLabel.tsx`**

```tsx
// src/components/hero/HUDLabel.tsx
import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { EASE, type HUDLabelConfig } from './theaterData';

interface HUDLabelProps {
  readonly config: HUDLabelConfig;
  readonly delay: number;
  readonly visible?: boolean; // controls entry animation; parent controls opacity
}

export function HUDLabel({ config, delay, visible = true }: HUDLabelProps) {
  const reduced = useReducedMotion();

  // Label 2: fluctuating number
  const [dynamicValue, setDynamicValue] = useState(config.value);

  useEffect(() => {
    if (!config.value || reduced) return;
    const interval = setInterval(() => {
      const variants = ['2.0M PATHS', '2.1M PATHS', '2.2M PATHS'];
      setDynamicValue(variants[Math.floor(Math.random() * variants.length)]);
    }, 3000);
    return () => clearInterval(interval);
  }, [config.value, reduced]);

  // Label 3: ✓ pulse — handled via Framer Motion animate prop on the ✓ character
  const hasCheckmark = config.text.includes('✓');

  return (
    <motion.div
      className={`absolute ${config.hideBelow === 'lg' ? 'hidden lg:block' : ''}`}
      style={{
        ...config.position,
        maxWidth: '200px',
      }}
      initial={reduced ? { opacity: 0.7 } : { opacity: 0, x: 20 }}
      animate={{ opacity: 0.7, x: 0 }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      <div className="flex items-start gap-2">
        {/* Accent bar */}
        <div
          className="w-1 h-5 rounded-full flex-shrink-0 mt-0.5"
          style={{ backgroundColor: config.accentColor }}
        />
        <div>
          <span
            className="font-mono text-[10px] uppercase leading-tight block"
            style={{
              letterSpacing: '0.15em',
              color: 'rgba(100,200,255,0.5)',
            }}
          >
            {hasCheckmark ? (
              <>
                {config.text.replace(' ✓', '')}{' '}
                <motion.span
                  animate={reduced ? {} : { opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ color: config.accentColor }}
                >
                  ✓
                </motion.span>
              </>
            ) : config.value ? (
              <>
                {config.text}{' '}
                <span style={{ color: 'rgba(100,200,255,0.7)' }}>
                  {dynamicValue}
                </span>
              </>
            ) : (
              config.text
            )}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/components/hero/HUDLabel.tsx
git commit -m "feat(theater): add HUDLabel component with animations"
```

---

### Task 3: Create DecisionCard component

**Files:**
- Create: `src/components/hero/DecisionCard.tsx`
- Reference: `src/components/hero/theaterData.ts`

- [ ] **Step 1: Create `DecisionCard.tsx`**

```tsx
// src/components/hero/DecisionCard.tsx
import { motion, useReducedMotion } from 'framer-motion';
import { EASE, type DecisionConfig, type DecisionKey } from './theaterData';

interface DecisionCardProps {
  readonly config: DecisionConfig;
  readonly isSelected: boolean;
  readonly isOtherSelected: boolean; // another card is selected (dim this one)
  readonly onSelect: (key: DecisionKey) => void;
  readonly position: { top: string; right: string };
}

/**
 * DecisionCard — pointer-events are controlled by the parent SimulationTheater
 * wrapper div (via cardsInteractive state + onAnimationComplete), not by this
 * component. This avoids DOM querySelector anti-patterns.
 */
export function DecisionCard({
  config, isSelected, isOtherSelected, onSelect, position,
}: DecisionCardProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={`absolute ${config.hideBelow === 'lg' ? 'hidden lg:block' : ''}`}
      style={position}
      animate={{
        opacity: isOtherSelected ? 0.3 : 1,
      }}
      transition={{ duration: 0.3, ease: EASE }}
    >
      <div
        role="button"
        aria-label={`選擇決策：${config.titleZh}`}
        tabIndex={0}
        className="w-[200px] backdrop-blur-md border overflow-hidden cursor-pointer transition-colors duration-200"
        style={{
          backgroundColor: isSelected ? 'rgba(2,6,23,0.6)' : 'rgba(2,6,23,0.4)',
          borderColor: isSelected
            ? config.accentColor
            : `rgba(${config.accentRgb},0.3)`,
          borderWidth: isSelected ? '2px' : '1px',
          borderRadius: '0.75rem',
          pointerEvents: 'inherit',
        }}
        onClick={() => onSelect(config.key)}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelect(config.key); }}
      >
        <div className="px-3.5 py-3">
          {/* Title row with pulse dot */}
          <div className="flex items-center gap-2 mb-1">
            <motion.span
              className="inline-block w-[6px] h-[6px] rounded-full flex-shrink-0"
              style={{ backgroundColor: config.accentColor }}
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span className="text-[14px] font-medium text-white">
              {config.titleZh}
            </span>
            {isSelected && (
              <span className="text-[9px] font-mono uppercase tracking-wider" style={{ color: config.accentColor }}>
                ▸ SELECTED
              </span>
            )}
          </div>

          {/* English subtitle */}
          <p
            className="font-mono text-[9px] uppercase mb-2 ml-[14px]"
            style={{ letterSpacing: '0.2em', color: 'rgba(100,200,255,0.5)' }}
          >
            {config.titleEn}
          </p>

          {/* Metrics row */}
          <div className="flex items-center gap-3 font-mono text-[10px] uppercase ml-[14px]">
            <span className="text-mist-blue-gray">
              成功率: <span style={{ color: config.accentColor }}>{config.metrics.successRate}%</span>
            </span>
            <span className="text-mist-blue-gray">
              風險: <span style={{ color: config.accentColor }}>{config.metrics.risk}</span>
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/components/hero/DecisionCard.tsx
git commit -m "feat(theater): add DecisionCard component with interaction states"
```

---

### Task 4: Create SimulationResult component

**Files:**
- Create: `src/components/hero/SimulationResult.tsx`
- Reference: `src/components/hero/theaterData.ts`

- [ ] **Step 1: Create `SimulationResult.tsx`**

```tsx
// src/components/hero/SimulationResult.tsx
import { motion, useReducedMotion } from 'framer-motion';
import { EASE, type DecisionResult } from './theaterData';

interface SimulationResultProps {
  readonly result: DecisionResult;
  readonly accentColor: string;
  readonly position: { top: string; right: string };
}

export function SimulationResult({ result, accentColor, position }: SimulationResultProps) {
  const reduced = useReducedMotion();

  const rows = [
    { label: '成功率', value: `${result.successRate}%`, bar: result.successRate },
    { label: '輿論控制', value: result.opinionControl },
    { label: '時間成本', value: result.timeCost },
    { label: '風險等級', value: result.riskLevel },
  ];

  // Offset below the decision card — shift down ~120px from card position
  const resultTop = `calc(${position.top} + 120px)`;

  return (
    <motion.div
      className="absolute"
      style={{ top: resultTop, right: position.right }}
      initial={reduced ? { opacity: 1 } : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 5, transition: { duration: 0.3, ease: EASE } }}
      transition={{ duration: 0.5, ease: EASE }}
      aria-live="polite"
    >
      <div
        className="w-[220px] backdrop-blur-md border border-slate-700/40 overflow-hidden"
        style={{
          backgroundColor: 'rgba(2,6,23,0.5)',
          borderRadius: '0.75rem',
        }}
      >
        <div className="px-3.5 py-3">
          {/* Header */}
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/60 mb-2">
            Simulation Result
          </p>
          <div className="h-[1px] bg-white/10 mb-2.5" />

          {/* Metric rows */}
          {rows.map((row) => (
            <div key={row.label} className="flex items-center justify-between mb-1.5 last:mb-0">
              <span className="font-mono text-[10px] uppercase text-mist-blue-gray">
                {row.label}
              </span>
              <div className="flex items-center gap-2">
                {row.bar !== undefined && (
                  <div className="w-16 h-1 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: accentColor }}
                      initial={{ width: 0 }}
                      animate={{ width: `${row.bar}%` }}
                      transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
                    />
                  </div>
                )}
                <span className="font-mono text-[10px] uppercase" style={{ color: accentColor }}>
                  {row.value}
                </span>
              </div>
            </div>
          ))}

          {/* Conclusion */}
          <div className="h-[1px] bg-white/10 mt-2.5 mb-2" />
          <p className="font-mono text-[10px] uppercase" style={{ color: accentColor }}>
            {result.conclusion}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/components/hero/SimulationResult.tsx
git commit -m "feat(theater): add SimulationResult panel component"
```

---

### Task 5: Create SimulationTheater container

**Files:**
- Create: `src/components/hero/SimulationTheater.tsx`
- Reference: all new components + `theaterData.ts`

- [ ] **Step 1: Create `SimulationTheater.tsx`**

```tsx
// src/components/hero/SimulationTheater.tsx
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
            visible={!theaterActive}
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
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/components/hero/SimulationTheater.tsx
git commit -m "feat(theater): add SimulationTheater container with phase switching"
```

---

### Task 6: Modify HeroContent — button toggle + status bar sync

**Files:**
- Modify: `src/components/hero/HeroContent.tsx`

The current `HeroContent` is a zero-props component. We need to:
1. Accept `theaterActive`, `setTheaterActive`, and `selectedDecision` props
2. Toggle button appearance when theater is active
3. Animate the Conflict value in the bottom status bar based on `selectedDecision`

- [ ] **Step 1: Update HeroContent props and button**

Modify `src/components/hero/HeroContent.tsx`:

Change the function signature from:
```tsx
export function HeroContent() {
```
to:
```tsx
import { DECISION_RESULTS, EASE, type DecisionKey } from './theaterData';

interface HeroContentProps {
  readonly theaterActive: boolean;
  readonly onToggleTheater: () => void;
  readonly selectedDecision: DecisionKey | null;
}

export function HeroContent({ theaterActive, onToggleTheater, selectedDecision }: HeroContentProps) {
```

Also remove the local `EASE` constant (line 4 in current file: `const EASE = [0.22, 1, 0.36, 1] as const;`) since it's now imported from `theaterData.ts`.

Replace the primary button (lines 77-84 in current file):
```tsx
{/* from: */}
<button
  type="button"
  className="group inline-flex items-center gap-3 rounded-sm bg-white px-10 py-4 text-[15px] font-bold tracking-wide transition-all duration-400 hover:shadow-[0_0_30px_6px_rgba(255,255,255,0.15)]"
  style={{ color: '#0A1128' }}
>
  <Play className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
  啟動推演劇場
</button>

{/* to: */}
<button
  type="button"
  onClick={onToggleTheater}
  className={`group inline-flex items-center gap-3 rounded-sm px-10 py-4 text-[15px] font-bold tracking-wide transition-all duration-400 ${
    theaterActive
      ? 'border border-[rgba(255,184,0,0.3)] hover:border-[rgba(255,184,0,0.5)]'
      : 'bg-white hover:shadow-[0_0_30px_6px_rgba(255,255,255,0.15)]'
  }`}
  style={{ color: theaterActive ? '#FFB800' : '#0A1128' }}
>
  {theaterActive ? (
    <>
      <motion.span
        className="inline-block w-2 h-2 rounded-full bg-[#FFB800]"
        animate={{ opacity: [1, 0.3, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      />
      SIMULATION ACTIVE
    </>
  ) : (
    <>
      <Play className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
      啟動推演劇場
    </>
  )}
</button>
```

- [ ] **Step 2: Update status bar Conflict value**

Add at the top of the component function (after `const reduced = useReducedMotion();`):

```tsx
// Animated conflict value
const conflictData = selectedDecision
  ? DECISION_RESULTS[selectedDecision]
  : null;
const conflictDisplay = conflictData ? conflictData.conflictValue : 72;
const conflictColor = conflictData ? conflictData.conflictColor : undefined;
```

Import `DECISION_RESULTS` from `./theaterData`.

Replace the Conflict span in status bar (line 118-120 in current file):
```tsx
{/* from: */}
<span className="font-mono text-[10px] text-mist-blue-gray tracking-[0.12em] uppercase">
  Conflict: <span className="text-insight-gold">72%</span>
</span>

{/* to: */}
<span className="font-mono text-[10px] text-mist-blue-gray tracking-[0.12em] uppercase">
  Conflict:{' '}
  <motion.span
    key={conflictDisplay}
    className={conflictColor ? '' : 'text-insight-gold'}
    style={conflictColor ? { color: conflictColor } : undefined}
    initial={{ opacity: 0.5 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3 }}
  >
    {conflictDisplay}%
  </motion.span>
</span>
```

- [ ] **Step 3: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add src/components/hero/HeroContent.tsx
git commit -m "feat(theater): wire HeroContent button toggle and status bar sync"
```

---

### Task 7: Modify HeroSection — lift state and swap components

**Files:**
- Modify: `src/components/hero/HeroSection.tsx`

- [ ] **Step 1: Update HeroSection**

Replace the entire file content:

```tsx
import { useState, useCallback } from 'react';
import { Navbar } from './Navbar';
import { HeroContent } from './HeroContent';
import { LiveBadge } from './LiveBadge';
import { ChaosFlowCanvas } from './ChaosFlowCanvas';
import { DataRainCanvas } from './DataRainCanvas';
import { SimulationTheater } from './SimulationTheater';
import type { DecisionKey } from './theaterData';

export function HeroSection() {
  const [theaterActive, setTheaterActive] = useState(false);
  const [selectedDecision, setSelectedDecision] = useState<DecisionKey | null>(null);

  const handleToggleTheater = useCallback(() => {
    setTheaterActive((prev) => {
      if (prev) setSelectedDecision(null); // reset decision when deactivating
      return !prev;
    });
  }, []);

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
      <ChaosFlowCanvas
        simulationActive={theaterActive}
        selectedDecision={selectedDecision}
      />

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
          <HeroContent
            theaterActive={theaterActive}
            onToggleTheater={handleToggleTheater}
            selectedDecision={selectedDecision}
          />
        </div>
      </div>

      {/* SimulationTheater — z-15, HUD labels / decision cards */}
      <SimulationTheater
        theaterActive={theaterActive}
        selectedDecision={selectedDecision}
        onSelectDecision={setSelectedDecision}
      />

      <LiveBadge />
      <Navbar />
    </section>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: Will show type errors for `ChaosFlowCanvas` props (component doesn't accept them yet). This is expected — fixed in Task 8. Proceed despite the error.

- [ ] **Step 3: Commit**

```bash
git add src/components/hero/HeroSection.tsx
git commit -m "feat(theater): wire HeroSection state and swap AgentCards for SimulationTheater"
```

---

### Task 8: Modify ChaosFlowCanvas — accept props and implement visual reactions

**Files:**
- Modify: `src/components/hero/ChaosFlowCanvas.tsx`

This is the most complex task. We need to:
1. Accept `simulationActive` and `selectedDecision` props
2. Bridge props into the render loop via refs
3. Implement brightness lerp
4. Implement dynamic particle injection/removal
5. Implement right-side flow line divergence + color interpolation

- [ ] **Step 1: Add props interface and refs bridge**

At the top of `ChaosFlowCanvas.tsx`, change the component signature and add refs:

```tsx
// Change from:
export function ChaosFlowCanvas() {

// To:
import type { DecisionKey } from './theaterData';

interface ChaosFlowCanvasProps {
  simulationActive?: boolean;
  selectedDecision?: DecisionKey | null;
}

export function ChaosFlowCanvas({
  simulationActive = false,
  selectedDecision = null,
}: ChaosFlowCanvasProps) {
```

After the existing refs (line ~156), add:

```tsx
// Props → refs bridge for render loop access
const simulationActiveRef = useRef(simulationActive);
const selectedDecisionRef = useRef(selectedDecision);
const brightnessRef = useRef(1.0);        // current lerped brightness multiplier
const divergenceRef = useRef(0);          // current lerped divergence amount (0 = none)
const colorBlendRef = useRef(0);          // 0 = cyan, 1 = decision color
const targetParticleCount = useRef(0);    // target particle count based on active state
```

Add a `useEffect` to sync props → refs:

```tsx
useEffect(() => {
  simulationActiveRef.current = simulationActive;
  selectedDecisionRef.current = selectedDecision;
}, [simulationActive, selectedDecision]);
```

- [ ] **Step 2: Implement brightness lerp in render loop**

Inside the `animate` function, after `ctx.clearRect(0, 0, w, h);` (line ~264), add:

```tsx
// Lerp brightness toward target
const targetBrightness = simulationActiveRef.current ? 1.25 : 1.0;
brightnessRef.current += (targetBrightness - brightnessRef.current) * 0.05;
const brightness = brightnessRef.current;
```

Then modify the opacity calculation in the line drawing loop. Change line ~290:

```tsx
// from:
const baseOpacity = isTier2 ? (0.18 + line.z * 0.3) : isTier1 ? (0.14 + line.z * 0.35) : (0.1 + line.z * 0.4);

// to:
const rawOpacity = isTier2 ? (0.18 + line.z * 0.3) : isTier1 ? (0.14 + line.z * 0.35) : (0.1 + line.z * 0.4);
const baseOpacity = Math.min(rawOpacity * brightness, 0.85); // cap to avoid pure white
```

- [ ] **Step 3: Implement dynamic particle management**

In the `animate` function, after the brightness lerp code, add particle management:

```tsx
// Dynamic particle count based on simulation active state
const tier = getDeviceTier(w);
const baseParticleCount = TIER_CONFIG[tier].particles;
const desiredCount = simulationActiveRef.current ? baseParticleCount * 2 : baseParticleCount;

// Add particles if needed
while (particles.length < desiredCount) {
  particles.push({
    lineIndex: Math.floor(Math.random() * lines.length),
    t: Math.random(),
    speed: 0.001 + Math.random() * 0.002,
    radius: 1.5 + Math.random() * 1.5,
  });
}

// Speed multiplier
const speedMult = simulationActiveRef.current ? 1.2 : 1.0;
```

Remove the duplicate `const tier = getDeviceTier(w);` that already exists around line 282 — move the particle management block to use the same `tier` variable (place it after `const tier = getDeviceTier(w);` on line 282).

Replace the existing particle update loop (the `for (const p of particles)` block, lines 342-365) with a **reverse index-based loop** to safely handle particle removal during iteration:

```tsx
// Speed multiplier for simulation active state
const speedMult = simulationActiveRef.current ? 1.2 : 1.0;

for (let pi = particles.length - 1; pi >= 0; pi--) {
  const p = particles[pi];
  p.t += p.speed * speedMult;
  if (p.t >= 1) {
    if (particles.length > desiredCount) {
      // Remove excess particles by not respawning them
      particles.splice(pi, 1);
      continue;
    }
    p.t = 0;
    p.lineIndex = Math.floor(Math.random() * lines.length);
  }

  const line = lines[p.lineIndex];
  const mappedT = lerp(line.leftExtent, line.rightExtent, p.t);
  const pt = getFlowPoint(line, mappedT, w, h, noise2D, timeOffset, mouse.x, mouse.y);
  if (pt.skip) continue;

  ctx.beginPath();
  ctx.arc(pt.x, pt.y, p.radius + 3, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(${GOLD.r},${GOLD.g},${GOLD.b},0.06)`;
  ctx.fill();

  ctx.beginPath();
  ctx.arc(pt.x, pt.y, p.radius, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(${GOLD.r},${GOLD.g},${GOLD.b},0.6)`;
  ctx.fill();
}
```

This replaces the `for...of` loop with a reverse index loop that safely splices excess particles when deactivating.

- [ ] **Step 4: Implement right-side divergence offset**

Add divergence config constants near the top of the file:

```tsx
const DIVERGENCE_CONFIG = {
  A: { ratio: 0.1, maxOffset: 5 },      // 10% of lines, tiny offset
  B: { ratio: 0.5, maxOffset: 30 },     // 50% of lines, ±30px
  C: { ratio: 0.8, maxOffset: 80 },     // 80% of lines, ±60-100px
} as const;

// Decision-specific colors for right-side zone
const DECISION_COLORS = {
  A: { r: 100, g: 220, b: 255 },   // blue-green (success)
  B: { r: 200, g: 192, b: 100 },   // mixed gold
  C: { r: 181, g: 125, b: 125 },   // dried-rose
} as const;
```

In the render loop, after brightness lerp, add divergence lerp:

```tsx
// Lerp divergence toward target
const decision = selectedDecisionRef.current;
const targetDivergence = decision ? 1.0 : 0.0;
divergenceRef.current += (targetDivergence - divergenceRef.current) * 0.05;
const divergence = divergenceRef.current;

// Lerp color blend
const targetColorBlend = decision ? 1.0 : 0.0;
colorBlendRef.current += (targetColorBlend - colorBlendRef.current) * 0.05;
const colorBlend = colorBlendRef.current;
```

In the line drawing loop, after computing `points`, apply Y offset for the right-side zone. Before the glow pass (line ~316), add:

```tsx
// Apply divergence offset to right-side points
if (divergence > 0.01 && decision) {
  const config = DIVERGENCE_CONFIG[decision];
  const strayHash = (line.seed % 1000) / 1000;
  const shouldDiverge = strayHash < config.ratio;

  if (shouldDiverge) {
    for (const pt of points) {
      const xNorm = pt.x / w;
      if (xNorm > 0.75) {
        const progress = (xNorm - 0.75) / 0.25; // 0 at 75%, 1 at 100%
        const seedOffset = Math.sin(line.seed * 127.1) * 2 - 1; // -1 to 1
        pt.y += seedOffset * config.maxOffset * progress * divergence;
      }
    }
  }
}
```

For the color interpolation, in the stroke calls for glow pass and core pass, replace the hardcoded CYAN:

```tsx
// Determine draw color — lerp toward decision color in right zone
let drawR = CYAN.r, drawG = CYAN.g, drawB = CYAN.b;
if (colorBlend > 0.01 && decision) {
  const dc = DECISION_COLORS[decision];
  // Only blend for lines in the right zone
  const rightmost = points[points.length - 1];
  if (rightmost && rightmost.x / w > 0.7) {
    drawR = Math.round(lerp(CYAN.r, dc.r, colorBlend));
    drawG = Math.round(lerp(CYAN.g, dc.g, colorBlend));
    drawB = Math.round(lerp(CYAN.b, dc.b, colorBlend));
  }
}

// Then use drawR, drawG, drawB in place of CYAN.r, CYAN.g, CYAN.b:
ctx.strokeStyle = `rgba(${drawR},${drawG},${drawB},${opacity * 0.05})`; // glow
ctx.strokeStyle = `rgba(${drawR},${drawG},${drawB},${opacity})`;        // core
```

- [ ] **Step 5: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 6: Visual verification**

Run: `npm run dev`

Verify in browser:
1. Default state: HUD labels appear over flow lines at correct positions
2. Click "啟動推演劇場": button changes to gold "SIMULATION ACTIVE", HUD labels disappear and decision cards appear, flow lines brighten, particles increase, countdown timer visible
3. Click a decision card: selected card highlights, others dim, flow lines diverge in right zone with color shift, result panel slides in below selected card, bottom Conflict value changes
4. Click a different decision: smooth transition between selections
5. Scroll down and back up: theater state preserved
6. Tablet (resize to 768-1023px): only 2 labels/cards visible
7. Mobile (resize to <768px): no labels/cards visible

- [ ] **Step 7: Commit**

```bash
git add src/components/hero/ChaosFlowCanvas.tsx
git commit -m "feat(theater): add canvas reactions for simulation theater — brightness, particles, divergence"
```

---

### Task 9: Final cleanup and build verification

**Files:**
- Verify all modified/new files

- [ ] **Step 1: Full TypeScript check**

Run: `npx tsc --noEmit`
Expected: Zero errors

- [ ] **Step 2: Lint check**

Run: `npm run lint`
Expected: No new lint errors (fix any that appear)

- [ ] **Step 3: Production build**

Run: `npm run build`
Expected: Build succeeds with no errors

- [ ] **Step 4: Visual regression check**

Run: `npm run preview`

Full checklist:
- [ ] Page loads without console errors
- [ ] HUD labels animate in at correct timing (1.8s, 2.1s, 2.4s)
- [ ] Label 2 number fluctuates every ~3s
- [ ] Label 3 ✓ pulses
- [ ] Button click activates theater mode
- [ ] Decision cards appear with glassmorphism
- [ ] Cards are clickable, hover shows border brightening
- [ ] Selected card highlights, others dim
- [ ] Result panel appears with correct data
- [ ] Flow lines brighten and particles increase when theater active
- [ ] Flow lines diverge on decision selection
- [ ] Bottom Conflict value updates with animation
- [ ] Countdown timer ticks down
- [ ] Responsive: tablet shows 2 elements, mobile hides all
- [ ] `prefers-reduced-motion` works (animations skipped)

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "feat(theater): complete simulation theater implementation — visual verification passed"
```
