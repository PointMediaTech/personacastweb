# Split Reality Hero Section — Design Spec

## Overview

Replace the entire right-side visual (62vw) of the Hero Section — currently `NeuralCanvas` + `AgentDossiers` — with a **"Split Reality"** concept that communicates product value in under 3 seconds.

The visual shows two parallel universes side by side: the same brand crisis, two completely different outcomes. Left = "With PersonaCast" (calm, strategic, positive outcome). Right = "Without PersonaCast" (chaos, panic, catastrophic outcome). Users instantly understand: **this product lets you choose which reality you live in**.

## Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Right-side replacement scope | Full (NeuralCanvas + AgentDossiers removed) | User wants a clean break from the data-heavy approach |
| Visual approach | AI-generated flat illustrations | Stronger emotional impact than code-rendered graphics |
| Illustration style | Flat/minimalist vector, dark palette | Matches existing deep-space aesthetic |
| Scene concept | Command room — calm vs chaotic | Concrete, relatable scenario; "with preparation vs without" |
| Data overlay | Frosted-glass cards with key metrics | Provides quantitative punch without requiring chart literacy |
| Rendering | Static images + HTML/CSS/Framer Motion overlays | Simple, performant, no Canvas/WebGL needed |

## Visual Structure

```
HeroSection (unchanged shell)
├─ Atmospheric glow (unchanged, z-0)
├─ Right side 62vw (z-[1]) ← REPLACED
│  └─ SplitReality
│     ├─ CalmWorld (left half)
│     │  ├─ <img> calm command room illustration (object-fit: cover)
│     │  ├─ WorldLabel "With PersonaCast" (top-left, Strategic Blue dot)
│     │  └─ OutcomeOverlay (bottom, frosted glass card)
│     │     ├─ Headline: "品牌化危為轉機，支持率創新高"
│     │     ├─ Metric: +15% 支持率 (green)
│     │     └─ Metric: 23% 衝突指數 (blue)
│     ├─ FractureLine (center divider)
│     │  ├─ Dashed SVG line (vertical, white 10% opacity)
│     │  └─ Label pill: "同一場危機" (centered)
│     └─ ChaosWorld (right half)
│        ├─ <img> chaotic command room illustration (object-fit: cover)
│        ├─ WorldLabel "Without PersonaCast" (top-left, Dried Rose dot)
│        └─ OutcomeOverlay (bottom, frosted glass card)
│           ├─ Headline: "品牌信任崩塌，市值蒸發 30%"
│           ├─ Metric: -28% 支持率 (rose)
│           └─ Metric: 82% 衝突指數 (red)
├─ Left scrim (unchanged, z-[2])
├─ Text content / HeroContent (unchanged, z-10)
├─ LiveBadge (unchanged, z-50)
└─ Navbar (unchanged, z-50)
```

## Component Spec

### SplitReality

**File:** `src/components/hero/SplitReality.tsx`
**Replaces:** `NeuralCanvas` + `AgentDossiers` (both imports removed from `HeroSection.tsx`)
**Position:** `absolute top-0 right-0 bottom-0`, width `62vw`, z-[1], `hidden lg:block`

Container uses `display: flex` to split into two equal halves. Overflow hidden.

### CalmWorld / ChaosWorld (inline, not separate components)

Each half contains:
1. **Background image** — `<img>` with `object-fit: cover`, `absolute inset-0`, full bleed
2. **Gradient overlay** — subtle gradient from transparent to `rgba(2,6,23,0.4)` at bottom, ensuring text legibility over the illustration
3. **WorldLabel** — top-left positioned, contains:
   - Pulsing accent dot (8×8px, `animate-pulse`, box-shadow glow)
   - Label text in JetBrains Mono, 10px, uppercase, 2px letter-spacing
   - Calm: `#769EDB` "WITH PERSONACAST"
   - Chaos: `#B57D7D` "WITHOUT PERSONACAST"
4. **OutcomeOverlay** — bottom-positioned frosted glass card:
   - `bg-slate-950/70 backdrop-blur-md`
   - `border: 1px solid` accent color at 20% opacity
   - `border-radius: 0.75rem`
   - Headline: Inter, 15px, font-weight 700, white
   - Metrics row: JetBrains Mono, 20px, font-weight 700, accent-colored values
   - Metric labels: Inter, 10px, `#64748b`

### FractureLine

Absolutely positioned at `left: 50%`, `transform: translateX(-50%)`, full height.

Elements:
- **Dashed line:** SVG `<line>`, `stroke: rgba(255,255,255,0.1)`, `stroke-width: 1.5`, `stroke-dasharray: 6 10`
- **Center label:** Pill-shaped container, `bg-slate-950/90 backdrop-blur-sm`, `border: 1px solid rgba(255,255,255,0.15)`, `border-radius: 6px`, padding `4px 10px`
  - Text: JetBrains Mono, 8px, `rgba(255,255,255,0.4)`, uppercase, 2px letter-spacing
  - Content: "同一場危機"

## Animation Spec

All animations use Framer Motion. EASE curve: `[0.22, 1, 0.36, 1]`.

| Element | Animation | Duration | Delay | Details |
|---------|-----------|----------|-------|---------|
| SplitReality container | Fade in | 1.5s | 0.3s | opacity 0 → 1 |
| CalmWorld image | Fade in + slight scale | 1.2s | 0.5s | opacity 0→1, scale 1.05→1 |
| ChaosWorld image | Fade in + slight scale | 1.2s | 0.7s | opacity 0→1, scale 1.05→1 |
| FractureLine dashed line | Draw from center outward | 1s | 0.8s | clipPath or scaleY animation |
| FractureLine label | Fade in | 0.6s | 1.2s | opacity 0→1 |
| WorldLabel (both) | Fade in + slide right | 0.8s | 1.0s (calm), 1.2s (chaos) | opacity 0→1, x: -10→0 |
| OutcomeOverlay (both) | Fade in + slide up | 0.8s | 1.3s (calm), 1.5s (chaos) | opacity 0→1, y: 15→0 |
| Accent dots | Pulse | Infinite | — | CSS animate-pulse, staggered |

**Reduced motion:** When `prefers-reduced-motion` is active, all animations resolve immediately (no movement, instant opacity).

## Typography

| Element | Font | Size | Weight | Color |
|---------|------|------|--------|-------|
| WorldLabel text | JetBrains Mono | 10px | 600 | Accent color (blue/rose) |
| FractureLine label | JetBrains Mono | 8px | 400 | rgba(255,255,255,0.4) |
| Headline | Inter | 15px | 700 | white |
| Metric values | JetBrains Mono | 20px | 700 | Accent (green/blue/rose/red) |
| Metric labels | Inter | 10px | 400 | #64748b |

## Color Spec

| Token | Hex | Usage |
|-------|-----|-------|
| Strategic Blue | #769EDB | Calm world accent, borders, labels |
| Green (positive) | #4ade80 | Positive metric values (+15%) |
| Dried Rose | #B57D7D | Chaos world accent, borders, labels |
| Red (danger) | #ef4444 | Danger metric values (82%) |
| Mist Blue Gray | #8892B0 | Neutral text |
| Slate 950/70 | rgba(2,6,23,0.7) | Card backgrounds |

## Illustration Assets

Two AI-generated flat illustrations required. Store in `public/images/hero/`.

### Image 1: `calm-command-room.png`

**Prompt for generation:**

> Flat illustration, minimalist vector style, dark navy background (#0A1628). A modern command room seen from a slight elevated angle. A calm professional team of 3-4 people seated around a curved desk, looking at a large wall-mounted display showing upward-trending graphs in soft blue (#769EDB) and green (#4ADE80). Holographic data panels float gently in the air. The room is bathed in cool blue ambient light. Clean geometric furniture, muted tones. One person gestures confidently at the screen. The mood is composed, strategic, in-control. No text on screen. Aspect ratio 1:1.2, suitable for web hero section background.

**Requirements:** ~1200×1440px minimum, PNG with transparency or solid dark background. Must be dark enough that white/colored text overlays remain legible.

### Image 2: `chaos-command-room.png`

**Prompt for generation:**

> Flat illustration, minimalist vector style, dark crimson-black background (#1A0A0A). The same command room but in crisis — red warning lights flash, the large wall display shows downward-crashing graphs in red (#EF4444) and dusty rose (#B57D7D). Holographic panels flicker and glitch. 3-4 people are standing, some with hands on heads in distress, one leaning on the desk. Papers or data fragments scatter in the air. The room is bathed in harsh red-orange emergency lighting. The mood is panic, loss of control, overwhelmed. No text on screen. Same camera angle as the calm version. Aspect ratio 1:1.2.

**Requirements:** Same dimensions and constraints as Image 1. **Critical: same camera angle and room layout** to maximize the parallel-universe contrast.

## Files Changed

| Action | File | Description |
|--------|------|-------------|
| **Create** | `src/components/hero/SplitReality.tsx` | New component: split-reality visual |
| **Edit** | `src/components/hero/HeroSection.tsx` | Replace NeuralCanvas + AgentDossiers with SplitReality |
| **Add** | `public/images/hero/calm-command-room.png` | Illustration asset (user-provided) |
| **Add** | `public/images/hero/chaos-command-room.png` | Illustration asset (user-provided) |
| **No change** | `src/components/hero/AgentDossier.tsx` | Kept in codebase but no longer imported |
| **No change** | `src/components/hero/NeuralCanvas.tsx` | Kept in codebase but no longer imported |
| **No change** | `src/components/hero/AgentCards.tsx` | Already unused in HeroSection |

## Responsive Behavior

- **lg+ (1024px+):** Full split-reality visual, 62vw width
- **Below lg:** Hidden entirely (same as current NeuralCanvas behavior). Mobile users see only HeroContent on the left side. The left scrim and atmospheric glow provide the background.

## Accessibility

- Both images get `alt=""` and `aria-hidden="true"` (decorative)
- All text overlays are real DOM elements (not baked into images), so screen readers can access the headlines and metrics
- `prefers-reduced-motion` disables all animations
- Color contrast: all text meets WCAG AA against their frosted-glass card backgrounds

## Placeholder Handling

Before illustrations are generated, use solid color backgrounds as fallback:
- Calm: `bg-gradient-to-br from-[#0a1628] to-[#122a4a]`
- Chaos: `bg-gradient-to-br from-[#1a0a0a] to-[#1f0d12]`

This allows the frontend to be built and tested immediately, with illustrations swapped in later.
