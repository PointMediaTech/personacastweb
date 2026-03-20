# Order in Chaos — Hero Section Redesign

## Overview

Replace the current StrategicRadar (hexagonal radar chart) and NeuralCanvas (particle network) with a new "Order in Chaos" visual that communicates PersonaCast's core value proposition: transforming chaotic public opinion into controllable strategic intelligence.

## Goals

1. **Immediate visual impact**: Hundreds of tangled energy streams converging into ordered flow lines — the product metaphor in motion.
2. **Data credibility**: Three floating glassmorphism cards with real mini-charts (line, trajectory, polar) reinforce that this is a data-driven system.
3. **Atmosphere**: Matrix-style data rain on the left background creates a "war room" feel.
4. **Performance**: Device-adaptive rendering ensures smooth experience across desktop/tablet/mobile.

## Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Rendering tech | Pure Canvas 2D + SVG + Framer Motion | Matches existing architecture. One small dep allowed: `simplex-noise` (~2KB) for flow line distortion |
| Left-side copy | Keep existing Chinese text | No content changes requested |
| Background texture | DataRain (matrix code rain) with static word pool | Phase 2 will connect to news API for live content |
| Frame rate target | ChaosFlow: 30fps, DataRain: 15fps | User preference for power efficiency |
| Card charts | Real dynamic mini-charts (Canvas/SVG) | Not decorative — animated data visualizations |
| Device strategy | Auto-degrade by screen width | Desktop full, tablet reduced, mobile hidden |

## Architecture

### Layer Stack (back to front)

Within the hero section (`position: relative`):

```
z-0   Atmosphere          Dark background gradients (existing, unchanged)
z-1   DataRainCanvas      Left-side matrix data flow text
z-2   ChaosFlowCanvas     Central chaos-to-order particle flow (hero visual)
z-[2] LeftScrim           Left→right gradient mask (existing z value, unchanged)
z-10  HeroContent         Left-side copy & CTAs (existing, unchanged)
z-15  DataCards           Three floating glassmorphism data cards
```

Outside hero section (`position: fixed`, existing and unchanged):

```
z-50  LiveBadge           Top-right status indicator (fixed, existing)
z-50  Navbar              Top navigation (fixed, existing)
```

Note: `CoordinateOverlay.tsx` (currently at `z-[8]`) is removed along with the other replaced components.

### Layout

- Left 38% / Right 62% split — unchanged from current
- `ChaosFlowCanvas` spans full hero width, visual center-of-mass shifted right
- `DataRainCanvas` covers left 40% only, extremely low opacity (0.03–0.06)
- `DataCards` absolutely positioned in a staggered zigzag pattern on the right side

## Component Specifications

### 1. ChaosFlowCanvas

**Concept**: Hundreds of Bézier curves emanate from the upper-left in a tangled, chaotic state, then gradually converge into smooth, ordered horizontal flow lines extending toward the lower-right.

**Algorithm**:
- Each flow line is a multi-segment quadratic Bézier curve with N evenly-spaced control points along a horizontal baseline
- **Baseline generation**: Each line has a base Y position evenly distributed across the canvas height (spread: ±canvas.height * 0.4 from center). Control points are spaced evenly along X from 0 to canvas.width.
- **Noise distortion** (using `simplex-noise` library, ~2KB):
  - **Chaos zone (left 40%)**: Control points offset by `noise2D(x * 0.005, y * 0.005 + seed) * amplitude`, where amplitude = 50–80px. Each line has a unique `seed` so they tangle differently.
  - **Transition zone (middle 20%)**: Amplitude linearly decays from full to near-zero via `lerp(chaosAmp, 0, (x - 0.4w) / 0.2w)`
  - **Order zone (right 40%)**: Amplitude ≈ 2–5px (subtle residual wobble), lines converge to evenly-spaced horizontal flows
- **Preventing visual blob**: Lines are grouped into 8–10 "bundles" of ~40 lines each with similar base Y. Within a bundle, lines share a general trajectory but diverge in the chaos zone. This creates visible strand structure rather than uniform noise.

**Visual effects**:
- **Glow** (manual technique, no `shadowBlur`): Each line is drawn twice — first pass: wider stroke (lineWidth * 3) at 0.04 opacity (soft halo), second pass: actual lineWidth at full opacity. This matches the existing codebase pattern and avoids the severe performance penalty of `ctx.shadowBlur`.
- **Depth simulation**: Each line has a random `z` value (0–1) affecting line width (0.5–3px), opacity (0.1–0.5). Foreground lines are thick and bright, background lines are thin and faint.
- **Animation**: Noise time offset increments by 0.003 per frame, chaos zone writhes continuously, order zone remains nearly static.
- **Gold highlight particles**: Sparse gold dots (`#FFB800`), radius 1.5–3px, scattered along flow lines. Each particle has a `t` parameter (0–1) representing position along its parent line, advancing at 0.001–0.003 per frame. When `t` reaches 1, it resets to 0 with a new random parent line. Desktop: 50 particles, tablet: 20.

**Mouse interaction**: Control points within 150px of cursor receive an additive offset pushing them away. Force = `(150 - distance) / 150 * 30px`. Applies to all zones equally. Offset is applied per-frame and not persisted (points snap back when cursor moves away).

**Reduced motion**: When `prefers-reduced-motion` is active, render a single static frame (noise at `t=0`) and stop the animation loop. Gold particles are hidden.

**Device tiers**:

| Device | Flow lines | Control points/line | Gold particles |
|--------|-----------|---------------------|----------------|
| Desktop (>1280px) | 300–400 | 20 | 50 |
| Tablet (768–1280px) | 120–180 | 14 | 20 |
| Mobile (<768px) | Hidden | — | — |

**Canvas config**: Single Canvas, DPR-aware, `requestAnimationFrame` loop throttled to 30fps.

### 2. DataRainCanvas

**Concept**: Subtle matrix-style code rain on the left background using real data/strategy vocabulary.

**Implementation**:
- **Character content**: Random selection from static word pool (`CONFLICT`, `0.78`, `T+72H`, `PERSONA`, `RISK`, `輿論`, `衝突`, `策略`, `SENTIMENT`, `INDEX`, `ALERT`, etc.)
- **Rendering**: Character-by-character (not full words). Each column picks one character at a time from the pool. Font: JetBrains Mono, 12px. Column width: 20px, spacing: 10px between columns.
- **Behavior**: Each column falls at 0.3–0.8 px/frame. Leading character is fully opaque, trailing characters fade over 8–12 characters. When a column reaches the bottom, it resets to the top with a random delay (0–3s).
- **Color**: Primary cyan `rgba(100,200,255,0.04)`, occasional gold flash `rgba(255,184,0,0.06)` (10% chance per character)
- **Coverage**: Canvas element sized to left 40% of viewport width only (saves 60% pixel buffer vs full-width). Right edge fades out via a horizontal alpha gradient drawn on canvas.
- **Opacity cap**: Never exceeds 0.06 overall — pure background texture

**Reduced motion**: When `prefers-reduced-motion` is active, render a single static frame and stop animation.

**Device tiers**:

| Device | Columns | Displayed |
|--------|---------|-----------|
| Desktop | 12–16 | Yes |
| Tablet | 8 | Yes |
| Mobile | — | Hidden |

**Canvas config**: Separate Canvas from ChaosFlow, 15fps, no mouse interaction.

**Phase 2 (future)**: Replace static word pool with weekly-updated news headlines fetched via RSS/News API pipeline. This will be designed in a separate brainstorming session.

### 3. DataCards

Three floating glassmorphism cards positioned diagonally from top-right to bottom-right.

**Shared card style**:
- Background: `bg-slate-950/50` + `backdrop-blur-md`
- Border: `1px border-slate-700/40`
- Border radius: `0.75rem`
- Size: ~260px × 160px
- Entry animation: Framer Motion, from right `x: 40` fade-in, staggered delays 2.0s / 2.3s / 2.6s

**Card positions**:
- Card 1 (Conflict Index): `top: 12%, right: 5%`
- Card 2 (Trajectory): `top: 38%, right: 3%`
- Card 3 (Sentiment): `top: 62%, right: 8%`

**Card 1 — Conflict Index**:
- Title: "CONFLICT INDEX: 88.4%" + Dried Rose `#B57D7D` "HIGH RISK" badge
- Chart: Canvas mini line chart, simulating 72h conflict index trend, cyan line with semi-transparent area fill
- Data: 20 hardcoded points with continuous subtle oscillation (±1.5% amplitude, 0.5Hz frequency per point with staggered phase)

**Card 2 — 72h Trajectory**:
- Title: "72h TRAJECTORY"
- Chart: SVG prediction path — one solid cyan line (actual trend, 15 points) + one dashed gold line (predicted extension, 8 points)
- Bottom label: "PREDICTED PATHWAY"
- X-axis labels: Low → High (Risk)
- Animation: Dashed line draws in via `strokeDashoffset` animation over 1.5s after card entry

**Card 3 — Sentiment Analysis**:
- Title: "SENTIMENT: POLARIZED"
- Chart: Canvas polar/radar mini chart, 5 axes (Positive, Negative, Neutral, Polarized, Viral)
- Color: Multi-color ring segments, center-outward gradient
- Animation: Radar polygon expands from center over 1s after card entry

**Device tiers**:

| Device | Cards shown |
|--------|------------|
| Desktop (>1280px) | All 3 |
| Tablet (768–1280px) | Card 1 + Card 2 only |
| Mobile (<768px) | Hidden |

## File Structure

### New files

```
src/components/hero/
├── ChaosFlowCanvas.tsx       # Chaos-to-order flow line main visual
├── DataRainCanvas.tsx         # Left-side matrix data rain background
├── DataCards.tsx              # Three floating data card container
├── cards/
│   ├── ConflictIndexCard.tsx  # Card 1: line chart
│   ├── TrajectoryCard.tsx     # Card 2: prediction path
│   └── SentimentCard.tsx      # Card 3: polar chart
```

### Modified files

```
HeroSection.tsx    # Remove StrategicRadar/NeuralCanvas/AgentCards/AgentDossier imports
                   # Add ChaosFlowCanvas + DataRainCanvas + DataCards
```

### Removed references (files kept, imports removed)

```
StrategicRadar.tsx
NeuralCanvas.tsx
AgentCards.tsx
AgentDossier.tsx
CoordinateOverlay.tsx
```

## Component Interfaces

```typescript
// All three main components are self-contained, no props needed

// ChaosFlowCanvas — manages its own resize/DPR/device tier
<ChaosFlowCanvas />

// DataRainCanvas — manages its own resize/columns
<DataRainCanvas />

// DataCards — manages card positioning and animations internally
<DataCards />
```

## Colors

| Name | Hex | Usage |
|------|-----|-------|
| Cyan | `#64C8FF` / `rgb(100,200,255)` | Flow lines, chart lines, data rain primary |
| Strategic Blue | `#769EDB` / `rgb(118,158,219)` | Background accents, connections |
| Gold | `#FFB800` / `rgb(255,184,0)` | Highlight particles, chart accents |
| Dried Rose | `#B57D7D` / `rgb(181,125,125)` | HIGH RISK badge, warning indicators |
| Slate-950 | `rgb(2,6,23)` | Card backgrounds |

## Typography

- Body text: Inter
- Data/numbers: JetBrains Mono
- Card titles: Inter, 12–13px, font-weight 600
- Data values: JetBrains Mono, 15–18px, font-weight 700

## Animation Timing

| Element | Delay | Duration | Easing |
|---------|-------|----------|--------|
| ChaosFlow canvas | 0s | Continuous | — |
| DataRain canvas | 0.5s | Continuous | — |
| DataCard 1 | 2.0s | 0.8s | [0.22, 1, 0.36, 1] |
| DataCard 2 | 2.3s | 0.8s | [0.22, 1, 0.36, 1] |
| DataCard 3 | 2.6s | 0.8s | [0.22, 1, 0.36, 1] |

## Mobile Behavior (<768px)

All three visual components (ChaosFlowCanvas, DataRainCanvas, DataCards) are hidden on mobile. The layout collapses to full-width: HeroContent takes 100% width with centered text alignment. The dark atmosphere gradient remains as the sole background. This is intentional — mobile users get a clean, fast-loading text-focused experience.

## Accessibility

- All Canvas elements use `aria-hidden="true"` (matching existing codebase pattern)
- All Canvas elements use `style={{ pointerEvents: 'none' }}` to avoid blocking interaction
- `prefers-reduced-motion`: ChaosFlowCanvas and DataRainCanvas render a single static frame and stop animation loops. DataCards entry animations are skipped (elements appear immediately).
- Card content is decorative (hardcoded mock data), so no additional ARIA labels are needed

## Dependencies

- **New**: `simplex-noise` (~2KB gzipped) — for flow line Perlin/simplex noise distortion
- **Existing**: React 19, Framer Motion, Tailwind CSS (unchanged)
