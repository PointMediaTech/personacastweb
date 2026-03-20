# Hero Floating Elements Redesign — Agent Cards + Status Bar

## Overview

Replace the three DataCards (ConflictIndex, Trajectory, Sentiment) on the hero right side with **2 floating Agent cards + 1 bottom status bar**. The DataCards currently show abstract simulation metrics that are meaningless to first-time visitors. The new elements communicate "AI agents are actively simulating" — an immediately understandable product story for decision-makers.

## Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Target audience | Decision-makers / potential clients | Need to understand "what PersonaCast does" at a glance |
| Core message | "AI agents are operating in this chaos" | Atmosphere over data; visitors don't need to read numbers |
| Visual weight | Accent (點綴) | ChaosFlow remains the right-side hero; cards float on top |
| Agent count | 2 (Pro vs Anti) | Minimum for conflict tension; more would compete with ChaosFlow |
| Scenario specificity | Abstract / atmosphere-focused | No specific crisis scenario; system-style status text |
| Card style base | Existing AgentCards design language | Lightweight glass cards, already battle-tested |
| Bottom status | Replace existing system log | Unify atmosphere with Agent presence |

## Elements

### 1. Agent Cards (×2)

Based on existing `AgentCards.tsx` design language with modifications.

**Retained from current AgentCards:**
- Glass card shell (`bg-slate-950/40 backdrop-blur-md border-slate-700/50`, `border-radius: 0.75rem`)
- Top 2px accent border (Pro: `#769EDB` Strategic Blue / Anti: `#B57D7D` Dried Rose)
- LIVE SIMULATING status lamp (pulsing dot + mono text)
- Initial-letter avatar circle with accent-colored border
- Name + MBTI + role title
- Pro/Anti tag capsule
- Floating breath animation (`y: [0, -12, 0]`, 6s cycle, `ease: easeInOut`)
- Card width: `min-w-[220px] max-w-[260px]`

**Removed:**
- Tether lines (no central focal point to connect to — NeuralHead is gone)
- ConflictArc SVG (no arc needed between two separated cards)
- Specific action descriptions (e.g., "T+12h：啟動全球補償計畫")

**Modified — Action description replaced with abstract system status:**
- Pro card: `STANCE: DEFENSIVE · INFLUENCE ▲`
- Anti card: `VECTOR: EXPANDING · RISK ▲`
- Style: `font-mono text-[11px]`, accent color at 0.75 opacity (matching current `actionDesc` styling)

**Content (atmosphere-focused, not scenario-specific):**

| Field | Pro Card | Anti Card |
|-------|----------|-----------|
| Name | 林雅婷 | 張銳 |
| MBTI | ENFJ | ENTP |
| Role | 品牌發言人 | 科技評論家 |
| Tag | Brand Defense | Risk Source |
| Tag variant | `pro` (blue) | `anti` (rose) |
| Status text | `STANCE: DEFENSIVE · INFLUENCE ▲` | `VECTOR: EXPANDING · RISK ▲` |

Note: Names and roles are retained to give a human feel. The abstract status text replaces scenario-specific action descriptions.

**Positioning (staggered, asymmetric):**
- Card 1 (Pro): `top: 14%, right: 12%`
- Card 2 (Anti): `top: 48%, right: 8%`

**Entry animation:**
- Slide in from right: `x: 40 → 0, opacity: 0 → 1`
- Duration: 0.8s
- Easing: `[0.22, 1, 0.36, 1]`
- Card 1 delay: 1.8s
- Card 2 delay: 2.2s

**Responsive behavior:**

| Device | Behavior |
|--------|----------|
| Desktop (>1280px) | Both cards visible |
| Tablet (768–1280px) | Card 1 (Pro) only |
| Mobile (<768px) | Hidden |

### 2. Bottom Status Bar

Replaces the existing bottom system log in `HeroContent.tsx` (lines 97–125).

**Current content:**
```
● Simulating   Conflict_Idx: 72%   Window: T+72H   Latency: 14ms
```

**New content:**
```
● 2 AGENTS ACTIVE   Simulation: T+56H   Conflict: 72%   Paths Analyzed: 3.4M+
```

**Color mapping:**
| Segment | Color | Token |
|---------|-------|-------|
| `●` (pulsing dot) | `#B57D7D` | dried-rose |
| `2 AGENTS ACTIVE` | `#B57D7D` | dried-rose |
| `Simulation:` label | `text-mist-blue-gray` | — |
| `T+56H` value | `#769EDB` | strategic-blue |
| `Conflict:` label | `text-mist-blue-gray` | — |
| `72%` value | `#FFB800` | insight-gold |
| `Paths Analyzed:` label | `text-mist-blue-gray` | — |
| `3.4M+` value | `text-white` | — |

**Style:**
- Font: JetBrains Mono, 10px, `tracking-[0.12em]`, uppercase
- Overall opacity: 0.5
- Position: absolute, bottom 2rem, left aligned (matching existing `clamp(2.5rem, 8vw, 10rem)`)
- Pulsing dot animation: `opacity: [1, 0.3, 1]`, 1.5s cycle, easeInOut (unchanged)

**Entry animation:**
- Fade in: `opacity: 0 → 1`
- Delay: 2.6s, duration: 1.0s

## Animation Timeline

| Element | Delay | Duration | Notes |
|---------|-------|----------|-------|
| ChaosFlow canvas | 0s | Continuous | Unchanged |
| DataRain canvas | 0.5s | Continuous | Unchanged |
| HeroContent text + CTAs | 0.1–0.6s | 0.9s | Unchanged |
| Agent Card 1 (Pro) | 1.8s | 0.8s | After flow lines stabilize |
| Agent Card 2 (Anti) | 2.2s | 0.8s | 0.4s stagger from Card 1 |
| Bottom status bar | 2.6s | 1.0s | Final element, closes the sequence |

## File Changes

### Modified files

| File | Changes |
|------|---------|
| `AgentCards.tsx` | Remove tether SVG lines, remove ConflictArc component, replace `actionDesc` with abstract status text, update positioning from side-of-center to right-side staggered layout, update animation delays |
| `HeroSection.tsx` | Replace `DataCards` import with `AgentCards`, remove `DataCards` component |
| `HeroContent.tsx` | Update bottom system log content and colors (lines 97–125) |

### No longer imported (files kept, not deleted)

| File | Reason |
|------|--------|
| `DataCards.tsx` | Replaced by AgentCards |
| `cards/ConflictIndexCard.tsx` | No longer used |
| `cards/TrajectoryCard.tsx` | No longer used |
| `cards/SentimentCard.tsx` | No longer used |

### Untouched

| File | Status |
|------|--------|
| `AgentDossier.tsx` | Already not imported, unchanged |
| `StrategicRadar.tsx` | Already not imported, unchanged |
| `ChaosFlowCanvas.tsx` | Unchanged |
| `DataRainCanvas.tsx` | Unchanged |
| `HeroContent.tsx` (text/CTAs) | Unchanged except bottom log |
| `Navbar.tsx`, `LiveBadge.tsx` | Unchanged |

## Layer Stack (updated)

```
z-0   Atmosphere          Dark background gradients (unchanged)
z-1   DataRainCanvas      Left-side matrix data rain (unchanged)
z-2   ChaosFlowCanvas     Central chaos-to-order flow lines (unchanged)
z-[2] LeftScrim           Left→right gradient mask (unchanged)
z-10  HeroContent         Left-side copy, CTAs, bottom status bar (status bar content updated)
z-15  AgentCards           Two floating Agent cards (replaces DataCards)
```

## Accessibility

- Agent cards use `pointerEvents: 'none'` (decorative, non-interactive)
- `prefers-reduced-motion`: floating breath animation disabled, entry animations skipped (elements appear immediately)
- Card content is decorative mock data; no additional ARIA labels needed

## Dependencies

No new dependencies. All changes use existing libraries (React, Framer Motion, Tailwind CSS).
