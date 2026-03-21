# Simulation Theater — Hero Section Redesign

## Overview

Replace the two Agent Cards and three DataCards on the hero right side with a **two-phase interactive experience**:

1. **Default state**: Three HUD annotation labels anchored to the ChaosFlowCanvas flow zones (chaos → convergence → order), providing a readable narrative layer over the abstract flow lines
2. **Theater mode**: Triggered by the "啟動推演劇場" button, the HUD labels morph in-place into three interactive decision cards with a crisis simulation mini-demo

This redesign solves the core problem: the current Agent Cards (林雅婷, 張銳) are meaningless to first-time visitors. The new design communicates value through **atmosphere first** (HUD annotations translate the flow lines into a story), then **interactive demo on demand** (decision cards let visitors experience the product).

## Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Hero primary goal | Hybrid: atmosphere default → interactive demo on click | 3-5 second value communication without interaction; deeper engagement for interested visitors |
| Default right-side content | HUD annotation labels on flow zones | Translates abstract flow lines into readable narrative: chaos → analysis → control |
| Expansion method | In-place transformation | HUD labels morph into decision cards; feels like "the screen comes alive" |
| Interaction depth | Select → Result (3 preset decisions) | Complete micro-experience loop: choose → see result → try another |
| Exit method | Scroll away; state preserved on return | Most natural; no explicit close button needed |
| Implementation approach | DOM overlay + Canvas signal (方案 B) | DOM handles text/interaction (SEO, a11y), Canvas handles visual feedback (flow line branching), bridged via React state |

## Phase 1: Default State — HUD Annotation Layer

### Elements Removed

- `AgentCards.tsx` — removed from HeroSection import (file kept, not deleted)
- `DataCards.tsx` — already not imported (file kept)
- `cards/ConflictIndexCard.tsx`, `TrajectoryCard.tsx`, `SentimentCard.tsx` — already not imported (files kept)

### HUD Labels (×3)

Three floating text labels anchored to the three visual zones of ChaosFlowCanvas. They serve as a "narrative translator" — telling visitors what the abstract flow lines mean: **left = risk, center = analysis, right = control**.

#### Label Definitions

| # | Anchor Zone | Position | Text | Accent Color | Auxiliary Visual |
|---|-------------|----------|------|-------------|-----------------|
| 1 | Left chaos (tangled lines) | `top: 20%, left: 52%` | `RISK VECTORS: DIVERGING` | `#B57D7D` (dried-rose) | Short red dashed line animation, implying divergence |
| 2 | Mid convergence (lines merging) | `top: 38%, right: 28%` | `SCENARIO LOCK: 2.1M PATHS` | `#769EDB` (strategic-blue) | Number subtly fluctuates (±0.1M every 3s) |
| 3 | Right order (parallel lines) | `top: 55%, right: 12%` | `OUTCOME: CONTROLLED ✓` | `#4ADE80` (green-400) | ✓ has faint green pulse glow |

#### Label Visual Style

- Font: JetBrains Mono, 10-11px, uppercase, `tracking-[0.15em]`
- Color: Main text `rgba(100,200,255,0.5)` (muted cyan), values slightly brighter `rgba(100,200,255,0.7)`
- Background: None (no glassmorphism) — pure text floating on flow lines
- Left accent bar: 4px wide short vertical line, color matches zone semantics (rose/blue/green)
- Max opacity: 0.7 (HUD is atmospheric accent, must not overpower flow lines)

#### Entry Animation

- Sequential fade-in: delay 1.8s / 2.1s / 2.4s (after left-side text animations complete)
- Animation: `opacity: 0 → 0.7, x: 20 → 0`, duration 0.8s, easing `[0.22, 1, 0.36, 1]`

#### Continuous Animation

- Label 2 number fluctuation: `2.1M → 2.2M → 2.0M`, random every 3s
- Label 3 ✓ pulse: `opacity: [0.5, 1, 0.5]`, 4s cycle
- No floating/breathing animation (unlike AgentCards — HUD should feel "pinned" to flow lines)

#### Responsive Behavior

| Device | Behavior |
|--------|----------|
| Desktop ≥1280px | All 3 labels visible |
| Tablet 768–1279px | Labels 2 and 3 only (chaos zone obscured by left-side text on tablet) |
| Mobile <768px | All hidden (flow lines also hidden) |

### Bottom Status Bar

Unchanged from current implementation:
```
● 2 AGENTS ACTIVE   Simulation: T+56H   Conflict: 72%   Paths Analyzed: 3.4M+
```

Color mapping, font, positioning, and animation all preserved as-is.

## Phase 2: Simulation Theater — Activation & Interaction

### Trigger

User clicks the "啟動推演劇場" (Launch Theater) button in HeroContent.

### Button State Change

| State | Text | Visual |
|-------|------|--------|
| Default | `▶ 啟動推演劇場` | Solid white bg, deep blue text (existing style) |
| Active | `◉ SIMULATION ACTIVE` | Border style, text `#FFB800` (insight-gold), border `rgba(255,184,0,0.3)`, ◉ has pulse animation |

The secondary button "檢視戰略報告" remains unchanged.

### Expansion Transition (~1.2s)

Three things happen simultaneously:

#### 1. HUD Labels Morph into Decision Cards

| Original Label | Morphs Into |
|----------------|-------------|
| `RISK VECTORS: DIVERGING` | Decision A: `公開道歉 · PR PIVOT` |
| `SCENARIO LOCK: 2.1M PATHS` | Decision B: `法律攻防 · LEGAL WAR` |
| `OUTCOME: CONTROLLED ✓` | Decision C: `轉移關注 · DIVERSION` |

Morph animation: text crossfade (old text fades out → new text fades in), simultaneously card expands glassmorphism background (`bg-slate-950/40 backdrop-blur-md`), duration 0.6s.

#### 2. ChaosFlowCanvas Reacts

Via React state `simulationActive: true`:
- Overall line brightness increases: base opacity from `0.1 + z * 0.4` to `0.15 + z * 0.5`
- Gold particle count doubles (50 → 100 desktop, 20 → 40 tablet)
- Particle speed increases 20% (`speed * 1.2`)
- Visual effect: entire flow field "activates" — brighter, busier

#### 3. Countdown Timer Appears

- Position: Top center-right of Hero Section, below LiveBadge
- Content: `72H CRISIS WINDOW: T-68H`
- Style: JetBrains Mono, 11px, uppercase, `tracking-[0.2em]`
- Color: `#FFB800` (insight-gold), opacity 0.6
- Entry: `opacity: 0 → 0.6, y: -10 → 0`, delay 0.3s (after HUD morph completes)
- Continuous: `T-68H` number ticks down every 5s (`68 → 67 → 66...`, decorative pacing)

### Decision Card Design

Three lightweight glassmorphism cards, smaller and more refined than the old AgentCards:

```
┌─────────────────────────┐
│ ● 公開道歉              │  ← Title: ● pulse dot + Chinese name
│   PR PIVOT              │  ← English subtitle: mono, 9px, muted
│   成功率: 73%  風險: 低  │  ← Metrics: numbers highlighted
└─────────────────────────┘
```

**Dimensions**: `w-[200px]` (narrower than old 220-260px cards)

**Internal structure**:
- Title: 14px, `font-medium`, white
- English subtitle: JetBrains Mono, 9px, `tracking-[0.2em]`, `rgba(100,200,255,0.5)`
- Metrics row: JetBrains Mono, 10px; labels in `text-mist-blue-gray`, values in card accent color

**Card color scheme**:

| Card | Pulse dot + accent | Default metrics |
|------|-------------------|-----------------|
| A 公開道歉 | `#769EDB` (strategic-blue) | 成功率: 73% · 風險: 低 |
| B 法律攻防 | `#FFB800` (insight-gold) | 成功率: 45% · 風險: 中 |
| C 轉移關注 | `#B57D7D` (dried-rose) | 成功率: 28% · 風險: 高 |

**Interaction states**:
- Default: `pointerEvents: 'auto'` (clickable, unlike HUD's `none`)
- Hover: border opacity `0.3 → 0.6`, corresponding flow line paths brighten slightly
- Selected: see Decision Interaction section

### Decision Interaction — Select & Result

#### Selection Flow

User clicks any decision card:

**1. Card State Update**

| Element | Change |
|---------|--------|
| Selected card | Border becomes 2px solid accent color, background deepens to `bg-slate-950/60`, `▸ SELECTED` label appears |
| Unselected cards | Opacity drops to 0.3, `pointerEvents` remains `auto` (can switch anytime) |

**2. ChaosFlowCanvas Path Branching**

Via React state `selectedDecision: 'A' | 'B' | 'C' | null`.

Canvas reacts in right-side order zone (x > 75%):

| Selection | Flow Line Behavior |
|-----------|--------------------|
| A 公開道歉 | 90% lines stay parallel/converged (order), color shifts blue-green `rgba(100,200,255,0.5)` → success paths dominate |
| B 法律攻防 | Lines split into two streams (55/45 ratio), one maintains order, one diverges upward. Mixed blue and gold → moderate uncertainty |
| C 轉移關注 | Lines diverge dramatically into multiple streams, color shifts warm `rgba(181,125,125,0.4)` (dried-rose tint) → chaos expanding |

**Implementation**: Do not regenerate flow lines. On existing lines' right-side segments (last 4-5 control points), apply additional Y offset based on `selectedDecision`:
- A: offset ≈ 0 (nearly unchanged)
- B: 50% of lines get `±30px` gradual offset
- C: 80% of lines get `±60-100px` random offset + noise frequency doubles

Transition: offset lerps from 0 to target over 0.8s, easing `[0.22, 1, 0.36, 1]`. When switching decisions, lerp back to 0 first, then to new value.

**3. Result Panel Appears**

Slides out below or beside the selected card:

```
┌─────────────────────────────┐
│  SIMULATION RESULT          │
│  ─────────────────────────  │
│  成功率    73%  ████████░░  │  ← Progress bar, accent color fill
│  輿論控制  HIGH             │
│  時間成本  T+24H            │
│  ─────────────────────────  │
│  建議：立即執行              │  ← Conclusion text
└─────────────────────────────┘
```

**Three preset result datasets**:

| Metric | A 公開道歉 | B 法律攻防 | C 轉移關注 |
|--------|-----------|-----------|-----------|
| 成功率 | 73% | 45% | 28% |
| 輿論控制 | HIGH | MEDIUM | LOW |
| 時間成本 | T+24H | T+48H | T+12H |
| 風險等級 | LOW | MEDIUM | CRITICAL |
| 結論 | 建議：立即執行 | 建議：備妥法務團隊 | 警告：高混亂度 |

**Result panel visual**:
- Dimensions: `w-[220px]`
- Style: glassmorphism, same as decision cards
- Entry: `opacity: 0 → 1, y: 10 → 0`, duration 0.5s
- Progress bar: 4px height, rounded, background `rgba(255,255,255,0.1)`, fill uses card accent color
- Font: JetBrains Mono, 10px, uppercase

**4. Bottom Status Bar Sync**

After selecting a decision, the bottom status bar's `Conflict` value animates:

| Selection | Conflict Value |
|-----------|---------------|
| A | `72% → 34%` (conflict decreases) |
| B | `72% → 58%` (conflict moderate) |
| C | `72% → 91%` (conflict escalates) |

Value change uses count-up/down animation, duration 0.6s. Color also shifts: A → greenish, B → stays gold, C → reddish.

#### Re-selection

User can click another decision card at any time:
1. Current result panel fades out (0.3s)
2. Flow line offset lerps back to neutral (0.4s)
3. New decision effects expand (same sequence as above)

No "reset" button needed — just click another card to switch.

## Component Architecture

### New/Modified Components

| Component | Type | Responsibility |
|-----------|------|---------------|
| `SimulationTheater.tsx` | **New** | Container component; manages theater state; renders HUD labels / decision cards / result panels |
| `HUDLabel.tsx` | **New** | Single HUD label component (default state) |
| `DecisionCard.tsx` | **New** | Single decision card component (theater active state) |
| `SimulationResult.tsx` | **New** | Result panel component |
| `ChaosFlowCanvas.tsx` | **Modified** | Accepts new props to control flow line behavior |
| `HeroContent.tsx` | **Modified** | Button triggers theater; status bar syncs values |
| `HeroSection.tsx` | **Modified** | Removes AgentCards/DataCards; adds SimulationTheater |

### State Design

State is centralized in `HeroSection.tsx`, passed down via props:

```typescript
// State managed by HeroSection
const [theaterActive, setTheaterActive] = useState(false)
const [selectedDecision, setSelectedDecision] = useState<'A' | 'B' | 'C' | null>(null)
```

**Props flow**:

```
HeroSection
├── theaterActive, setTheaterActive → HeroContent (button control)
├── theaterActive, selectedDecision → ChaosFlowCanvas (flow line reaction)
├── theaterActive, selectedDecision, setSelectedDecision → SimulationTheater
│   ├── → HUDLabel ×3 (default state, visible when theaterActive=false)
│   ├── → DecisionCard ×3 (visible when theaterActive=true)
│   └── → SimulationResult (visible when selectedDecision !== null)
└── selectedDecision → HeroContent (bottom status bar Conflict value sync)
```

### ChaosFlowCanvas New Props

```typescript
interface ChaosFlowCanvasProps {
  simulationActive?: boolean              // Flow line brightness boost, particle doubling
  selectedDecision?: 'A' | 'B' | 'C' | null  // Right-side flow line divergence offset
}
```

Canvas internals use `useRef` to store target values, lerping in the render loop:
- `targetBrightness`: `simulationActive ? 1.2 : 1.0`
- `targetDivergence`: set offset parameters based on `selectedDecision`
- Per-frame lerp factor ≈ 0.05 (~0.8s natural transition)

### Removed Component Imports

| Component | Handling |
|-----------|---------|
| `AgentCards.tsx` | Remove import from HeroSection; file kept, not deleted |
| `DataCards.tsx` | Already not imported; file kept |
| `cards/ConflictIndexCard.tsx` | File kept, not deleted |
| `cards/TrajectoryCard.tsx` | File kept, not deleted |
| `cards/SentimentCard.tsx` | File kept, not deleted |

## Layer Stack (Updated)

```
z-0   Atmosphere          Dark background gradients (unchanged)
z-1   DataRainCanvas      Left-side matrix data rain (unchanged)
z-2   ChaosFlowCanvas     Central chaos-to-order flow lines (modified: accepts new props)
z-[2] LeftScrim           Left→right gradient mask (unchanged)
z-10  HeroContent         Left-side copy & CTAs (modified: button state + status bar sync)
z-15  SimulationTheater   HUD labels / decision cards / result panels (new, replaces AgentCards)
z-20  CountdownTimer      Countdown timer (new, appears after theater activation)
z-30  StatusBar           Bottom status bar (inside HeroContent, z-30 preserved)
z-50  Navbar, LiveBadge   Fixed navigation (unchanged)
```

## Animation Timeline

### Page Load Sequence

| Time | Element | Animation | Notes |
|------|---------|-----------|-------|
| 0s | ChaosFlow + DataRain | Begin rendering | Unchanged |
| 0.1s | Eyebrow | Slide-in + fade | Unchanged |
| 0.2s | H1 headline | Slide-in + fade | Unchanged |
| 0.4s | Subtitle | Slide-in + fade | Unchanged |
| 0.6s | CTA buttons | Slide-in + fade | Unchanged |
| 1.5s | LiveBadge | Fade + slide-in | Unchanged |
| 1.8s | HUD Label 1 (RISK VECTORS) | `opacity: 0→0.7, x: 20→0` | New |
| 2.1s | HUD Label 2 (SCENARIO LOCK) | `opacity: 0→0.7, x: 20→0` | New |
| 2.4s | HUD Label 3 (OUTCOME) | `opacity: 0→0.7, x: 20→0` | New |
| 2.6s | Bottom status bar | Fade-in | Unchanged |

### Theater Activation Sequence (T=0 at button click)

| T+ | Element | Animation |
|----|---------|-----------|
| 0s | Button state | Text crossfade → `◉ SIMULATION ACTIVE` |
| 0s | ChaosFlow | Begin lerp brightness boost + particle doubling |
| 0.1s | HUD Labels ×3 | Text crossfade + background expands to decision cards (0.6s) |
| 0.3s | Countdown timer | Fade-in `y: -10→0` |
| 0.7s | Decision cards | `pointerEvents` switches from `none` to `auto` |

### Decision Selection Sequence (T=0 at card click)

| T+ | Element | Animation |
|----|---------|-----------|
| 0s | Selected card | Border highlight, `▸ SELECTED` appears |
| 0s | Unselected cards | Opacity → 0.3 (0.3s) |
| 0s | ChaosFlow | Begin lerp flow line offset (0.8s) |
| 0.2s | Result panel | Slide-out `y: 10→0, opacity: 0→1` (0.5s) |
| 0.2s | Bottom Conflict | Value count animation (0.6s) |

### Decision Switch Sequence

| T+ | Element | Animation |
|----|---------|-----------|
| 0s | Old result panel | Fade-out (0.3s) |
| 0s | Flow line offset | Lerp back to neutral (0.4s) |
| 0.3s | New card highlight + result | Same as selection sequence |

## Responsive Behavior

| Device | Default State | Theater Active |
|--------|--------------|----------------|
| Desktop ≥1280px | 3 HUD labels | 3 decision cards + result panel + countdown timer |
| Tablet 768–1279px | 2 HUD labels (1+2) | 2 decision cards (C hidden) + result panel + countdown timer |
| Mobile <768px | All hidden | Button still clickable; theater effects only in bottom status bar value changes and button state |

## Accessibility

- Default HUD labels: `aria-hidden="true"`, `pointerEvents: 'none'` (decorative)
- Theater decision cards: `role="button"`, `aria-label="選擇決策：公開道歉"`, `pointerEvents: 'auto'`
- Result panel: `aria-live="polite"` (screen readers announce result updates)
- `prefers-reduced-motion`: all animations skipped; elements appear immediately at final position
- Countdown timer: `aria-hidden="true"` (decorative, not real-time data)

## SEO Strategy

All HUD labels and decision cards are DOM elements. Indexable text:

| Element | Indexable Text | Target Keywords |
|---------|---------------|-----------------|
| HUD Label 1 | `RISK VECTORS: DIVERGING` | 風險分析, risk vectors |
| HUD Label 2 | `SCENARIO LOCK: 2.1M PATHS` | 情境模擬, scenario analysis |
| HUD Label 3 | `OUTCOME: CONTROLLED` | 結局控制, outcome prediction |
| Decision A | `公開道歉 · PR PIVOT · 成功率 73%` | 公關危機, 公開道歉策略 |
| Decision B | `法律攻防 · LEGAL WAR · 成功率 45%` | 法律戰略, legal strategy |
| Decision C | `轉移關注 · DIVERSION · 成功率 28%` | 輿論轉移, crisis diversion |
| Result panel | `輿論控制 · 時間成本 · 風險等級` | 輿論控制, crisis management |
| Countdown | `72H CRISIS WINDOW` | 危機預警, 72小時黃金窗口 |

**SEO implementation notes**:
- All text rendered as real DOM elements (`<span>`, `<div>`), not canvas
- Decision cards always present in HTML (hidden with `opacity: 0` + `pointer-events: none`, not `display: none`) to ensure crawler indexability
- Countdown timer similarly always present in HTML, visibility controlled via opacity
- `aria-hidden="true"` does not affect SEO indexing (search engines do not follow ARIA)

## Performance Budget

| Metric | Target |
|--------|--------|
| New DOM elements | ≤ 15 (3 HUD/cards + 3 result panels + timer + wrappers) |
| JS bundle increase | ≤ 5KB gzipped (pure React + Framer Motion, no new dependencies) |
| Canvas performance | FPS ≥ 30 when particles doubled (50→100, within budget) |
| Animations | All use `transform` + `opacity` (GPU-accelerated, no layout triggers) |

## Dependencies

No new dependencies. All changes use existing libraries (React, Framer Motion, Tailwind CSS, Simplex Noise).

## File Changes Summary

### New files

| File | Purpose |
|------|---------|
| `src/components/hero/SimulationTheater.tsx` | Container: manages theater state, renders HUD/cards/results |
| `src/components/hero/HUDLabel.tsx` | Single HUD annotation label |
| `src/components/hero/DecisionCard.tsx` | Single interactive decision card |
| `src/components/hero/SimulationResult.tsx` | Result panel after decision selection |

### Modified files

| File | Changes |
|------|---------|
| `HeroSection.tsx` | Remove AgentCards/DataCards imports; add SimulationTheater; lift theater state (`theaterActive`, `selectedDecision`); pass new props to ChaosFlowCanvas and HeroContent |
| `ChaosFlowCanvas.tsx` | Accept `simulationActive` and `selectedDecision` props; implement brightness lerp, particle doubling, and right-side divergence offset |
| `HeroContent.tsx` | Accept `theaterActive` and `setTheaterActive`; button state toggle; accept `selectedDecision` for bottom status bar Conflict value sync with count animation |

### Removed imports (files kept, not deleted)

| File | Reason |
|------|--------|
| `AgentCards.tsx` | Replaced by SimulationTheater |
| `DataCards.tsx` | Already not imported |
| `cards/ConflictIndexCard.tsx` | Already not imported |
| `cards/TrajectoryCard.tsx` | Already not imported |
| `cards/SentimentCard.tsx` | Already not imported |
