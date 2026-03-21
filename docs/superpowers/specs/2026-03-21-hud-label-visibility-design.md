# HUD Label Visibility Enhancement Design

**Date:** 2026-03-21
**Goal:** Improve the visibility of HUD annotation labels in the Hero Section's Simulation Theater, which are currently too small and low-contrast to be noticed against the ChaosFlowCanvas background.

**Problem:** The three HUD labels (`RISK VECTORS: DIVERGING`, `SCENARIO LOCK: 2.1M PATHS`, `OUTCOME: CONTROLLED ✓`) render at 10px mono font with 50% text opacity and no background container. They are nearly invisible on top of the busy cyan flow lines. Combined effective opacity is ~0.49 (0.7 component × 0.7 parent wrapper).

**Approach:** Enhance visibility while preserving the "ambient data annotation" aesthetic. Avoid full glassmorphism cards (reserved for DecisionCards in phase 2) to maintain visual hierarchy between passive HUD labels and interactive decision cards.

---

## Changes

### 1. HUDLabel.tsx — Visual Enhancement

**Container layer (new):**
- Add semi-transparent background: `rgba(2,6,23,0.55)` — dark enough to ensure text readability against bright flow lines
- Add `backdrop-blur-sm` (`blur(4px)`) for depth separation from flow canvas
- Add rounded corners: `rounded-md`
- Add subtle border: `border border-white/[0.06]`
- Add padding: `px-3 py-2`

**Font & contrast:**
- Font size: `text-[10px]` → `text-[11px]`
- Text color opacity: `rgba(100,200,255,0.5)` → `rgba(100,200,255,0.78)`
- Component animate opacity: `0.7` → `1` (combined with parent change, effective opacity goes from ~0.49 to 1.0; text-level color opacity 0.78 becomes the sole contrast control)

**Max width:**
- `maxWidth: 200px` → `maxWidth: 240px` to compensate for new padding (24px total) and prevent text wrapping at 11px

**Accent bar:**
- Height: `h-5` → `self-stretch` (flex context: stretches to match sibling text height, more reliable than `h-full` in flex layout)

**Entry animation — typewriter effect:**
- Implementation: CSS `clip-path: inset(0 X% 0 0)` animation on the text span, avoiding React re-renders. A CSS `@keyframes` transitions `clip-path` from fully clipped to fully revealed.
- Speed: total reveal duration = character count × 40ms (e.g., 20 chars = 800ms)
- Sequencing: typewriter begins after the existing staggered `delay` prop (1.8s / 2.1s / 2.4s). The fade-in + slide plays first, then the text reveals via typewriter.
- **Label 2** (dynamic value): typewriter applies to the full string including the initial value. Subsequent value fluctuations (every 3s) swap instantly — no re-typewrite.
- **Label 3** (checkmark): the ✓ character is included in the typewriter sequence. The pulse animation on ✓ begins only after the typewriter completes.
- `prefers-reduced-motion`: skip typewriter entirely, show full text immediately

**Unused `visible` prop:** Remove from the interface — it is accepted but never used. The parent controls visibility via its own opacity wrapper. Out of scope for functionality changes, but cleaning up dead code.

**Unchanged:**
- Positions (`position` values in theaterData.ts)
- Label 2 value fluctuation logic (every 3s)
- Label 3 checkmark pulse animation (timing adjusted to start after typewriter)

### 2. SimulationTheater.tsx — Opacity Adjustment

- HUD label wrapper `motion.div` animate opacity: `0.7` → `1` (when theater inactive)
- Fade to `0` when theater active (unchanged behavior)
- Phase transition note: the fade-out of background containers with `backdrop-blur` is visually clean since opacity 1→0 gracefully fades both the panel and the blur effect simultaneously

### 3. No Changes To

- DecisionCard.tsx
- SimulationResult.tsx
- ChaosFlowCanvas.tsx
- HeroSection.tsx
- HeroContent.tsx
- theaterData.ts

---

## Files Modified

| File | Change |
|------|--------|
| `src/components/hero/HUDLabel.tsx` | Add background container, increase font/contrast, typewriter animation, remove unused `visible` prop |
| `src/components/hero/SimulationTheater.tsx` | Update HUD label wrapper opacity from 0.7 to 1 |

## Accessibility Notes

- Labels are atmospheric/decorative text within `aria-hidden` theater container — screen reader accessibility is handled at a higher level
- `prefers-reduced-motion` respected: typewriter skipped, fade-in simplified
- Text contrast: `rgba(100,200,255,0.78)` on `rgba(2,6,23,0.55)` background with dark canvas behind provides sufficient contrast; the semi-transparent background acts as a safety net against bright flow lines passing behind

## Performance Notes

- Typewriter uses CSS `clip-path` animation (GPU-composited), no JS state updates
- Three `backdrop-blur-sm` elements are lightweight compositing operations; no measurable impact on canvas frame rate (tested tier: desktop 350 lines, tablet 150 lines)

## Risk Assessment

**Low risk.** Changes are purely visual/CSS with one CSS animation addition. No state management, data flow, or component API changes. Phase transition logic is unaffected.
