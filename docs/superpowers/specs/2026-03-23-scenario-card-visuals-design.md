# Scenario Card Visuals Redesign

**Date:** 2026-03-23
**Section:** ScenariosSection (Section 4 — "讓未來，按計畫發生。")
**Status:** Approved

## Problem

The three scenario cards each contain a canvas-based animated visual (waveform, orb, comet) that is purely decorative. These visuals have no semantic connection to the card text content, leaving users unable to derive additional understanding from the imagery. Each visual occupies 300px of card height without conveying information.

## Decision

Replace the three abstract Canvas 2D animations with **conceptual SVG diagrams animated via Framer Motion**. Each diagram directly illustrates the core concept described in the card's text.

## Technology Choice

**SVG + Framer Motion** (no new dependencies)

- Conceptual diagrams are vector graphics by nature — SVG is the correct primitive
- Framer Motion's `motion.path` with `pathLength` provides declarative path-drawing animations
- Canvas 2D (current) is better suited for particle systems / continuous simulations, not information graphics
- D3.js rejected as overkill — these are fixed conceptual illustrations, not data-driven charts

## Visual Specifications

### Card 01: 敘事攔截 — Timeline Comparison

**Concept:** Before/after intervention showing narrative control.

- **Layout:** Two overlapping curves on a shared time axis (left = T-72hr, right = T+0)
- **"Uncontrolled" curve (red, dashed, dim):** Exponential rise in crisis severity, peaks high at T+0
- **"Intercepted" curve (teal/green, solid, bright):** Rises initially then flattens / descends after intervention point
- **Intervention marker:** Vertical dashed line at ~30% from left labeled "介入點" with a subtle pulse animation
- **Animation:** Both paths draw left-to-right on scroll-into-view using `pathLength` 0→1. The intercepted curve draws ~0.3s after the uncontrolled curve to create a "before then after" narrative
- **Accent color:** `#E53E3E` for uncontrolled, card's accent for intercepted
- **Labels:** Minimal — "未攔截" (dim), "攔截後" (bright), time axis markers

### Card 02: 風險治理 — Network Node Graph

**Concept:** Scanning a stakeholder network to identify critical risk nodes.

- **Layout:** 12-16 circular nodes scattered in an organic cluster, connected by thin lines
- **3-4 "critical" nodes:** Larger, highlighted with card accent color (`#00A3FF`) ring + glow, pulsing subtly
- **Remaining nodes:** Small, dim, `rgba(255,255,255,0.15)`
- **Connection lines:** Thin (`1px`, `opacity="0.12"`), dim white, connecting nodes in a mesh pattern
- **Node positions:** Hardcoded as a static array of `{x, y}` coordinates — pre-designed layout ensuring no overlap and organic feel. No randomization at render time.
- **"Scan ring":** A 60-degree conical sector originating from the center of the node cluster, rotating 360 degrees clockwise over 2.5 seconds using Framer Motion `rotate`. As the leading edge passes a node, the node opacity jumps to 1.0 and scale bumps to 1.15, then fades back over 0.5s. Implemented as a masked SVG sector with `motion.g` rotation.
- **Animation:** Nodes fade in staggered on scroll. After all visible (~0.8s), the scan ring sweeps once, then critical nodes pulse continuously (scale 1.0↔1.08, 2s cycle)
- **Text label:** "80+ 節點掃描中" in mono font, bottom-right, dim

### Card 03: 演化推演 — Convergence Funnel

**Concept:** Millions of simulated paths filtering down to one optimal trajectory.

- **Layout:** Left side has 8-12 divergent path lines fanning out from a common origin. Right side converges to a single bright line terminating in a glowing endpoint
- **Divergent paths (left):** Thin, various angles, dim colors, some fade out (eliminated scenarios)
- **Surviving path (right):** Bright card accent color (`#00E5C8`), thicker stroke, with glow
- **"Elimination points":** Small `×` marks (6x6px cross, two 1px stroked lines at 45 degrees, `rgba(255,255,255,0.25)`) where paths terminate, appearing with 0.15s fade-in when their parent path stops drawing
- **Animation:** All paths draw simultaneously left-to-right. Non-surviving paths stop and fade at their elimination points. The surviving path continues to the endpoint with a glow intensification
- **Text label:** "3.4M+ 路徑" left side (dim), "最佳軌跡" right side (bright)

## Architecture

### File Structure

```
app/components/scenarios/
  ScenarioCard.tsx          — remove Canvas visuals, import new SVG components
  scenarioData.ts           — no changes needed (visualType field still used)
  visuals/
    TimelineComparison.tsx  — Card 01 SVG + Framer Motion
    NetworkGraph.tsx         — Card 02 SVG + Framer Motion
    ConvergenceFunnel.tsx    — Card 03 SVG + Framer Motion
    index.ts                — barrel export
```

### Component Interface

Each visual component receives the same props for consistency:

```typescript
interface ScenarioVisualProps {
  accentRgb: string;    // e.g. "229,62,62"
  accentHex: string;    // e.g. "#E53E3E"
}
```

### Integration Point

In `ScenarioCard.tsx`, the existing `ModuleVisual` switch replaces Canvas components with the new SVG components:

```typescript
function ModuleVisual({ type, rgb, hex }: { type: ScenarioData['visualType']; rgb: string; hex: string }) {
  switch (type) {
    case 'waveform': return <TimelineComparison accentRgb={rgb} accentHex={hex} />;
    case 'orb':      return <NetworkGraph accentRgb={rgb} accentHex={hex} />;
    case 'comet':    return <ConvergenceFunnel accentRgb={rgb} accentHex={hex} />;
    default:         return null;
  }
}
```

**Call site update:** The `<ModuleVisual>` invocation in `ScenarioCard` must be updated to pass the additional `hex` prop: `<ModuleVisual type={data.visualType} rgb={accentRgb} hex={accentHex} />`

### Animation Trigger

All visuals use Framer Motion's `whileInView` with `viewport={{ once: true, amount: 0.3 }}` to trigger on scroll, consistent with the existing `ScenarioCard` stagger animation.

## Constraints

- **No new dependencies.** SVG + Framer Motion only.
- **Responsive.** SVG `viewBox` scales naturally. All three visuals use standardized `viewBox="0 0 560 280"` (current OrbVisual canvas was 420x300 but this is a full redesign, so standardized dimensions are fine).
- **Performance.** No `requestAnimationFrame` loops. Framer Motion handles animation lifecycle and cleanup. Continuous animations (pulse, scan ring) use CSS animations or Framer `animate` with `repeat: Infinity`.
- **Dark theme.** All visuals assume dark background (`#080B10`). Labels use mono font (`JetBrains Mono`).
- **Accessibility.** Each SVG has `role="img"` and `aria-label` describing the concept.
- **Reduced motion.** All animations must respect `prefers-reduced-motion: reduce` via Framer Motion's `useReducedMotion()`. When active: skip path-drawing animations (render final state immediately), disable continuous animations (pulse, scan ring). Static diagram at full opacity is shown instead.
- **Pre-animation state.** Before scroll trigger fires, each SVG renders its final-state diagram at `opacity: 0.15` as a static preview, then animates to full state when `whileInView` triggers. This avoids a 300px blank gap.

## Files to Delete

After implementation, remove the three Canvas visual functions from `ScenarioCard.tsx`:
- `WaveformVisual`
- `OrbVisual`
- `CometVisual`

These will be fully replaced by the new SVG components in `visuals/`.

## Success Criteria

1. Each visual immediately communicates the card's core concept without reading the text
2. Visuals feel cohesive with existing dark-theme aesthetic (glow, transparency, mono labels)
3. No new npm dependencies added
4. Animations are smooth, trigger on scroll, and don't loop excessively
5. Total bundle size impact is neutral or reduced (SVG < Canvas animation code)
