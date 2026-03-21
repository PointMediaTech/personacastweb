# Hero Card Visual Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade decision path cards, DataCards, and AgentCards with advanced glassmorphism, animated metrics, risk indicators, and unified visual language.

**Architecture:** Progressive enhancement — extend existing components in-place. Add 3 new CSS colors to the theme, extend `DecisionConfig` data model with `tags` and `executionTime`, rework `DecisionCard` layout, then sync DataCards and AgentCards to the new visual baseline.

**Tech Stack:** React 19, Tailwind CSS v4, framer-motion, pure CSS animations

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `src/index.css` | Modify | Add 3 color variables + 2 CSS keyframe animations |
| `src/components/hero/theaterData.ts` | Modify | Extend `DecisionConfig` interface, update data |
| `src/components/hero/DecisionCard.tsx` | Modify | Full layout rework with new visual features |
| `src/components/hero/SimulationTheater.tsx` | Modify | Adjust card positioning for new width |
| `src/components/hero/DataCards.tsx` | Modify | GlassCard style upgrade, sizing |
| `src/components/hero/cards/ConflictIndexCard.tsx` | Modify | Font sizing, container fit |
| `src/components/hero/cards/TrajectoryCard.tsx` | Modify | Font sizing, container fit |
| `src/components/hero/cards/SentimentCard.tsx` | Modify | Font sizing, container fit |
| `src/components/hero/AgentCards.tsx` | Modify | Style sync, sizing, fonts |

---

### Task 1: Color System & CSS Animations

**Files:**
- Modify: `src/index.css:1-34`

- [ ] **Step 1: Add 3 new color variables to @theme**

In `src/index.css`, add inside the `@theme` block after the existing color variables:

```css
--color-aurora-cyan: #00F2FF;
--color-amber-warn: #FFAD00;
--color-alert-red: #FF4D4D;
```

- [ ] **Step 2: Add CSS keyframes for pulse dot and breathing light**

After the existing `@keyframes hudTypewriter` block, add:

```css
@keyframes cardPulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.6); opacity: 0.3; }
}

@keyframes riskBreathing {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
}
```

- [ ] **Step 3: Verify the dev server compiles without errors**

Run: `npm run dev`
Expected: No CSS compilation errors, page loads normally.

- [ ] **Step 4: Commit**

```bash
git add src/index.css
git commit -m "feat(theme): add aurora-cyan, amber-warn, alert-red colors and card animations"
```

---

### Task 2: Extend DecisionConfig Data Model

**Files:**
- Modify: `src/components/hero/theaterData.ts:1-122`

- [ ] **Step 1: Add `tags` and `executionTime` fields to `DecisionConfig` interface**

Update the interface at lines 15-23:

```typescript
export interface DecisionConfig {
  key: DecisionKey;
  titleZh: string;
  titleEn: string;
  accentColor: string;
  accentRgb: string;
  metrics: { successRate: number; risk: string };
  tags: string[];
  executionTime: string;
  hideBelow?: 'lg';
}
```

- [ ] **Step 2: Update DECISIONS array with new titles, tags, and executionTime**

Replace the `DECISIONS` array (lines 61-89):

```typescript
export const DECISIONS: DecisionConfig[] = [
  {
    key: 'A',
    titleZh: '主動式誠意溝通',
    titleEn: 'PR PIVOT',
    accentColor: '#769EDB',
    accentRgb: '118,158,219',
    metrics: { successRate: 73, risk: '低' },
    tags: ['公關'],
    executionTime: '48-72h',
    hideBelow: undefined,
  },
  {
    key: 'B',
    titleZh: '法規防禦部署',
    titleEn: 'LEGAL WAR',
    accentColor: '#FFB800',
    accentRgb: '255,184,0',
    metrics: { successRate: 45, risk: '中' },
    tags: ['法律'],
    executionTime: '2-4 週',
    hideBelow: undefined,
  },
  {
    key: 'C',
    titleZh: '議題重構策略',
    titleEn: 'DIVERSION',
    accentColor: '#B57D7D',
    accentRgb: '181,125,125',
    metrics: { successRate: 28, risk: '高' },
    tags: ['公關', '技術'],
    executionTime: '24-48h',
    hideBelow: 'lg',
  },
];
```

- [ ] **Step 3: Verify TypeScript compiles without errors**

Run: `npx tsc --noEmit`
Expected: No type errors (DecisionCard will need updating in Task 3, but it only reads existing fields so no immediate breakage).

- [ ] **Step 4: Commit**

```bash
git add src/components/hero/theaterData.ts
git commit -m "feat(data): extend DecisionConfig with tags, executionTime; update titles"
```

---

### Task 3: DecisionCard Full Layout Rework

**Files:**
- Modify: `src/components/hero/DecisionCard.tsx:1-87`

- [ ] **Step 1: Replace the entire DecisionCard component**

Replace the full contents of `src/components/hero/DecisionCard.tsx` with:

```tsx
import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { EASE, type DecisionConfig, type DecisionKey } from './theaterData';

/** Map risk text to color */
function getRiskColor(risk: string): string {
  switch (risk) {
    case '低': return 'var(--color-aurora-cyan)';
    case '中': return 'var(--color-amber-warn)';
    case '高': return 'var(--color-alert-red)';
    default: return 'var(--color-aurora-cyan)';
  }
}

/** Map success rate to progress bar color */
function getProgressColor(rate: number): string {
  if (rate >= 60) return 'var(--color-aurora-cyan)';
  if (rate >= 40) return 'var(--color-amber-warn)';
  return 'var(--color-alert-red)';
}

interface DecisionCardProps {
  readonly config: DecisionConfig;
  readonly isSelected: boolean;
  readonly isOtherSelected: boolean;
  readonly onSelect: (key: DecisionKey) => void;
  readonly position: { top: string; right: string };
}

export function DecisionCard({
  config, isSelected, isOtherSelected, onSelect, position,
}: DecisionCardProps) {
  const reduced = useReducedMotion();
  const [animatedRate, setAnimatedRate] = useState(reduced ? config.metrics.successRate : 0);
  const [entranceComplete, setEntranceComplete] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Progress bar count-up animation
  useEffect(() => {
    if (!entranceComplete || reduced) {
      if (reduced) setAnimatedRate(config.metrics.successRate);
      return;
    }
    const target = config.metrics.successRate;
    const duration = 1200; // ms
    const delay = 300; // ms after entrance
    const timeout = setTimeout(() => {
      const start = performance.now();
      const animate = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // ease-out
        const eased = 1 - Math.pow(1 - progress, 3);
        setAnimatedRate(Math.round(target * eased));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }, delay);
    return () => clearTimeout(timeout);
  }, [entranceComplete, reduced, config.metrics.successRate]);

  const riskColor = getRiskColor(config.metrics.risk);
  const progressColor = getProgressColor(config.metrics.successRate);

  return (
    <motion.div
      className={`absolute ${config.hideBelow === 'lg' ? 'hidden lg:block' : ''}`}
      style={position}
      animate={{
        opacity: isOtherSelected ? 0.3 : 1,
      }}
      transition={{ duration: 0.3, ease: EASE }}
      onAnimationComplete={() => setEntranceComplete(true)}
    >
      <div
        role="button"
        aria-label={`選擇決策：${config.titleZh}`}
        tabIndex={0}
        className="w-[280px] overflow-hidden cursor-pointer"
        style={{
          backgroundColor: isHovered ? 'rgba(10,14,23,0.65)' : isSelected ? 'rgba(10,14,23,0.6)' : 'rgba(10,14,23,0.55)',
          border: isSelected
            ? `2px solid ${config.accentColor}`
            : '1px solid rgba(0,242,255,0.12)',
          borderRadius: '0.75rem',
          backdropFilter: isHovered ? 'blur(20px)' : 'blur(16px)',
          WebkitBackdropFilter: isHovered ? 'blur(20px)' : 'blur(16px)',
          boxShadow: '0 0 8px rgba(0,242,255,0.06)',
          pointerEvents: 'inherit',
          transform: isHovered ? 'scale(1.02) translate(-2px, -2px)' : 'scale(1)',
          transition: 'all 0.3s ease',
        }}
        onClick={() => onSelect(config.key)}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelect(config.key); }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="px-5 py-5">
          {/* Header: pulse dot + LIVE SIMULATION + pill badges */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span
                className="inline-block w-[6px] h-[6px] rounded-full flex-shrink-0"
                style={{
                  backgroundColor: 'var(--color-aurora-cyan)',
                  animation: reduced ? 'none' : 'cardPulse 2s infinite ease-in-out',
                }}
              />
              <span
                className="font-mono text-[12px] font-medium tracking-wider uppercase"
                style={{ color: 'var(--color-aurora-cyan)', opacity: 0.8 }}
              >
                LIVE SIMULATION
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              {config.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[12px] font-medium px-2.5 py-0.5 rounded-full"
                  style={{
                    backgroundColor: 'rgba(0,242,255,0.1)',
                    color: 'var(--color-aurora-cyan)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Title */}
          <p className="text-[16px] font-semibold text-white mb-0.5" style={{ letterSpacing: '0.02em' }}>
            {config.titleZh}
            {isSelected && (
              <span className="ml-2 text-[10px] font-mono uppercase tracking-wider" style={{ color: config.accentColor }}>
                ▸ SELECTED
              </span>
            )}
          </p>

          {/* English subtitle */}
          <p
            className="font-mono text-[12px] uppercase mb-4"
            style={{ letterSpacing: '0.2em', color: 'rgba(100,200,255,0.5)' }}
          >
            {config.titleEn}
          </p>

          {/* Success rate progress bar */}
          <div className="flex items-center gap-3 mb-3">
            <div className="flex-1 h-[3px] rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}>
              <div
                className="h-full rounded-full"
                style={{
                  width: `${animatedRate}%`,
                  backgroundColor: progressColor,
                  transition: reduced ? 'none' : undefined,
                }}
              />
            </div>
            <span className="font-mono text-[14px] font-semibold text-white min-w-[36px] text-right">
              {animatedRate}%
            </span>
          </div>

          {/* Risk breathing light */}
          <div className="flex items-center gap-2">
            <span
              className="inline-block w-[8px] h-[8px] rounded-full flex-shrink-0"
              style={{
                backgroundColor: riskColor,
                animation: reduced ? 'none' : 'riskBreathing 2.5s infinite ease-in-out',
              }}
            />
            <span className="font-mono text-[13px] text-mist-blue-gray uppercase">
              風險: <span style={{ color: riskColor }}>{config.metrics.risk}</span>
            </span>
          </div>

          {/* Hover expansion: execution time */}
          <div
            style={{
              maxHeight: isHovered ? '40px' : '0px',
              opacity: isHovered ? 1 : 0,
              overflow: 'hidden',
              transition: 'max-height 0.3s ease, opacity 0.3s ease',
            }}
          >
            <div className="mt-3 pt-2" style={{ borderTop: '1px solid rgba(0,242,255,0.1)' }}>
              <span className="font-mono text-[12px] text-mist-blue-gray">
                預估執行時間: <span className="text-white">{config.executionTime}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
```

- [ ] **Step 2: Verify the component renders correctly**

Run: `npm run dev`
Expected: Decision cards display with new layout — wider (280px), pill badges, progress bar, breathing light dot. Hover shows execution time.

- [ ] **Step 3: Commit**

```bash
git add src/components/hero/DecisionCard.tsx
git commit -m "feat(decision-card): rework layout with progress bar, breathing light, pill badges"
```

---

### Task 4: SimulationTheater Card Position Adjustment

**Files:**
- Modify: `src/components/hero/SimulationTheater.tsx:1-128`

The decision cards grew from 200px to 280px wide (+80px). The `cardPosition` values come from `HUD_LABELS` in `theaterData.ts`. Check if current positions cause overlap or clipping with the new width and adjust `right` values if needed.

- [ ] **Step 1: Adjust card positions in theaterData.ts**

In `src/components/hero/theaterData.ts`, update the `cardPosition` values in `HUD_LABELS` to account for wider cards. Increase `right` values by ~3-4% to prevent right-edge clipping:

```typescript
// HUD_LABELS[0] cardPosition — currently { top: '18%', right: '38%' }
// Change to:
cardPosition: { top: '18%', right: '40%' },

// HUD_LABELS[1] cardPosition — currently { top: '36%', right: '26%' }
// Change to:
cardPosition: { top: '36%', right: '28%' },

// HUD_LABELS[2] cardPosition — currently { top: '54%', right: '14%' }
// Change to:
cardPosition: { top: '54%', right: '16%' },
```

- [ ] **Step 2: Visual verification**

Run: `npm run dev`
Expected: Decision cards don't clip the right edge of the viewport on 1440px+ screens. Cards maintain staggered cascade layout without overlapping each other.

- [ ] **Step 3: Commit**

```bash
git add src/components/hero/theaterData.ts
git commit -m "fix(theater): adjust card positions for wider 280px decision cards"
```

---

### Task 5: DataCards GlassCard Upgrade

**Files:**
- Modify: `src/components/hero/DataCards.tsx:1-64`

- [ ] **Step 1: Update GlassCard styles**

Replace the `GlassCard` function component (lines 14-43) with:

```tsx
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
```

- [ ] **Step 2: Add `useState` import**

Update the import at line 1:

```tsx
import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
```

- [ ] **Step 3: Verify DataCards render with new styles**

Run: `npm run dev`
Expected: DataCards are wider (320px), have cyan-tinted border, deeper blur, and hover scale effect.

- [ ] **Step 4: Commit**

```bash
git add src/components/hero/DataCards.tsx
git commit -m "feat(data-cards): upgrade GlassCard with new glassmorphism and hover effects"
```

---

### Task 6: DataCards Internal Components Font Sizing

**Files:**
- Modify: `src/components/hero/cards/ConflictIndexCard.tsx:1-107`
- Modify: `src/components/hero/cards/TrajectoryCard.tsx:1-65`
- Modify: `src/components/hero/cards/SentimentCard.tsx:1-126`

- [ ] **Step 1: Update ConflictIndexCard font sizes and canvas dimensions**

In `src/components/hero/cards/ConflictIndexCard.tsx`:

Change canvas dimensions (lines 21-22):
```typescript
const w = 290;
const h = 80;
```

Change title font size (line 96):
```tsx
<span className="font-mono text-[14px] font-semibold text-white/80 tracking-wide">
```

Change value font size — update the inner span (line 97):
```tsx
CONFLICT INDEX: <span className="text-[16px] text-[#64C8FF]">88.4%</span>
```

Change badge font size (line 99):
```tsx
<span className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-[#B57D7D]/20 text-[#B57D7D] font-bold tracking-wider">
```

- [ ] **Step 2: Update TrajectoryCard font sizes and SVG dimensions**

In `src/components/hero/cards/TrajectoryCard.tsx`:

Change dimensions (lines 8-9):
```typescript
const W = 290;
const H = 80;
```

Change title font size (line 34):
```tsx
<span className="font-mono text-[14px] font-semibold text-white/80 tracking-wide">
```

Change subtitle font size (line 59):
```tsx
<span className="font-mono text-[11px] text-white/30 tracking-widest uppercase">
```

- [ ] **Step 3: Update SentimentCard font sizes and canvas dimensions**

In `src/components/hero/cards/SentimentCard.tsx`:

Change canvas size (line 24):
```typescript
const size = 150;
```

Change title font size (line 115):
```tsx
<span className="font-mono text-[14px] font-semibold text-white/80 tracking-wide">
```

Change value font size — update the inner span (line 116):
```tsx
SENTIMENT: <span className="text-[16px] text-[#FFB800]">POLARIZED</span>
```

Change dots font size (line 118):
```tsx
<span className="font-mono text-[10px] text-white/20">•••</span>
```

- [ ] **Step 4: Verify all three card components render correctly**

Run: `npm run dev`
Expected: Charts fill the new 320px card width, text is clearly legible at the larger sizes.

- [ ] **Step 5: Commit**

```bash
git add src/components/hero/cards/ConflictIndexCard.tsx src/components/hero/cards/TrajectoryCard.tsx src/components/hero/cards/SentimentCard.tsx
git commit -m "feat(data-cards): increase font sizes and chart dimensions for readability"
```

---

### Task 7: AgentCards Style Sync

**Files:**
- Modify: `src/components/hero/AgentCards.tsx:1-148`

- [ ] **Step 1: Update AgentCard body styles**

In `src/components/hero/AgentCards.tsx`, update the card body div (line 51):

Replace:
```tsx
<div
  className="min-w-[220px] max-w-[260px] bg-slate-950/40 backdrop-blur-md border border-slate-700/50 overflow-hidden"
  style={{
    borderRadius: '0.75rem',
    borderTop: `2px solid ${accentColor}`,
    boxShadow: `0 0 24px 2px rgba(${accentRgb}, 0.08)`,
  }}
>
```

With:
```tsx
<div
  className="min-w-[280px] max-w-[320px] overflow-hidden"
  style={{
    borderRadius: '0.75rem',
    backgroundColor: 'rgba(10,14,23,0.55)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    border: '1px solid rgba(0,242,255,0.12)',
    borderTop: `2px solid ${accentColor}`,
    boxShadow: `0 0 24px 2px rgba(${accentRgb}, 0.08), 0 0 8px rgba(0,242,255,0.06)`,
  }}
>
```

- [ ] **Step 2: Update font sizes**

Update name font size (line 86):
```tsx
<p className="font-sans text-[16px] font-bold text-white leading-tight">{name}</p>
```

Update MBTI/role font size (line 87-89):
```tsx
<p className="font-sans text-[13px] text-slate-400 leading-tight mt-0.5">
  {mbti} · {role}
</p>
```

Update avatar size (line 77):
```tsx
<div
  className="w-[44px] h-[44px] rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
```

Update tag font size (line 92):
```tsx
<span className={`text-[12px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${tagBg}`}>
```

- [ ] **Step 3: Update LIVE pulse dot to use CSS animation**

Replace the pulse dot span (line 61-63):
```tsx
<span
  className="w-[6px] h-[6px] rounded-full flex-shrink-0"
  style={{
    backgroundColor: accentColor,
    animation: prefersReducedMotion ? 'none' : 'cardPulse 2s infinite ease-in-out',
  }}
/>
```

Update the LIVE status text font size (line 65):
```tsx
<span
  className="font-mono text-[12px] font-medium tracking-wider uppercase"
  style={{ color: accentColor, opacity: 0.8 }}
>
```

Update status text font size (line 102):
```tsx
<p className="font-mono text-[13px] leading-relaxed" style={{ color: accentColor, opacity: 0.75 }}>
```

- [ ] **Step 4: Update padding**

Change card padding values — update `px-4 pt-3 pb-1` (line 59) to:
```tsx
<div className="flex items-center gap-1.5 px-5 pt-4 pb-1">
```

And `px-4 pb-4 pt-1` (line 72) to:
```tsx
<div className="px-5 pb-5 pt-1">
```

- [ ] **Step 5: Verify AgentCards render with updated styles**

Run: `npm run dev`
Expected: AgentCards are wider (280-320px), fonts are larger, avatar is 44px, pulse dot uses CSS animation, border has cyan tint with accent top border preserved.

- [ ] **Step 6: Commit**

```bash
git add src/components/hero/AgentCards.tsx
git commit -m "feat(agent-cards): sync visual style with new glassmorphism system"
```

---

### Task 8: Final Visual Verification & Build Check

- [ ] **Step 1: Run TypeScript check**

Run: `npx tsc --noEmit`
Expected: No type errors.

- [ ] **Step 2: Run production build**

Run: `npm run build`
Expected: Build succeeds with no errors.

- [ ] **Step 3: Visual spot-check all breakpoints**

Open dev server and check:
- **Mobile (<768px):** All cards hidden, hero text fills screen
- **Tablet (768-1023px):** DataCards (2 visible), AgentCards (1 visible), DecisionCards visible when theater active
- **Desktop (1024px+):** All cards visible, no overlap, no clipping
- **Hover states:** Cards scale, blur deepens, decision cards show execution time
- **Progress bar:** Counts up from 0 on entrance
- **Breathing light:** Risk dots pulse with correct colors
- **Reduced motion:** Animations disabled, final values shown immediately

- [ ] **Step 4: Commit any fixes from spot-check**

If any visual adjustments are needed, fix and commit:
```bash
git add -A
git commit -m "fix(cards): visual adjustments from spot-check"
```
