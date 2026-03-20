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
| Rendering tech | Pure Canvas 2D + SVG + Framer Motion | Matches existing architecture, no new dependencies |
| Left-side copy | Keep existing Chinese text | No content changes requested |
| Background texture | DataRain (matrix code rain) with static word pool | Phase 2 will connect to news API for live content |
| Frame rate target | ChaosFlow: 30fps, DataRain: 15fps | User preference for power efficiency |
| Card charts | Real dynamic mini-charts (Canvas/SVG) | Not decorative — animated data visualizations |
| Device strategy | Auto-degrade by screen width | Desktop full, tablet reduced, mobile hidden |

## Architecture

### Layer Stack (back to front)

```
z-0   Atmosphere          Dark background gradients (existing, unchanged)
z-1   DataRainCanvas      Left-side matrix data flow text
z-2   ChaosFlowCanvas     Central chaos-to-order particle flow (hero visual)
z-3   LeftScrim           Left→right gradient mask (protect text readability)
z-10  HeroContent         Left-side copy & CTAs (existing, unchanged)
z-15  DataCards           Three floating glassmorphism data cards
z-20  LiveBadge           Bottom status bar
z-30  Navbar              Top navigation
```

### Layout

- Left 38% / Right 62% split — unchanged from current
- `ChaosFlowCanvas` spans full hero width, visual center-of-mass shifted right
- `DataRainCanvas` covers left 40% only, extremely low opacity (0.03–0.06)
- `DataCards` absolutely positioned along a diagonal from top-right to bottom-right

## Component Specifications

### 1. ChaosFlowCanvas

**Concept**: Hundreds of Bézier curves emanate from the upper-left in a tangled, chaotic state, then gradually converge into smooth, ordered horizontal flow lines extending toward the lower-right.

**Algorithm**:
- Each flow line is a multi-segment Bézier curve defined by control points
- **Chaos zone (left 40%)**: Control points offset by high-amplitude Perlin noise (±50–80px), lines are tangled, color is bright cyan `#64C8FF` at higher opacity
- **Transition zone (middle 20%)**: Noise amplitude linearly decays, lines straighten
- **Order zone (right 40%)**: Near-zero noise, lines become smooth horizontal flows with even spacing, color fades

**Visual effects**:
- **Glow**: `ctx.shadowBlur = 15–25`, shadowColor cyan
- **Depth simulation**: Each line has a random `z` value (0–1) affecting line width (0.5–3px), opacity (0.1–0.5), and blur. Foreground lines are thick and bright, background lines are thin and faint.
- **Animation**: Noise field shifts slowly over time (`timeOffset += 0.003`), chaos zone writhes continuously, order zone remains nearly static
- **Gold highlight particles**: Sparse gold dots (`#FFB800`) scattered along flow lines, moving at varying speeds to emphasize "data flow"

**Mouse interaction**: Lines near cursor are gently repelled (repulsion radius 150px).

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
- **Character content**: Random selection from static word pool (`CONFLICT`, `0.78`, `T+72H`, `PERSONA`, `RISK`, `輿論`, `衝突`, `策略`, etc.)
- **Behavior**: Multiple vertical columns falling at different speeds, characters fade in/out individually
- **Color**: Primary cyan `rgba(100,200,255,0.04)`, occasional gold flash `rgba(255,184,0,0.06)`
- **Coverage**: Left 40% of viewport only, fades out naturally toward center
- **Opacity cap**: Never exceeds 0.06 overall — pure background texture

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
- Title: "CONFLICT INDEX: 88.4%" + red "HIGH RISK" badge
- Chart: Canvas mini line chart, simulating 72h conflict index trend, cyan line with semi-transparent area fill
- Data: 20 hardcoded points with subtle random oscillation animation

**Card 2 — 72h Trajectory**:
- Title: "72h TRAJECTORY"
- Chart: SVG prediction path — one solid line (actual trend) + one dashed line (predicted extension), cyan/gold colors
- Bottom label: "PREDICTED PATHWAY"
- X-axis labels: Low → High (Risk)

**Card 3 — Sentiment Analysis**:
- Title: "SENTIMENT: POLARIZED"
- Chart: Canvas polar/radar mini chart, 5 axes (Good, Data, Sentiment, Polarized, Remanent)
- Color: Multi-color ring segments, center-outward gradient

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
