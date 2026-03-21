# HUD Label Visibility Enhancement Design

**Date:** 2026-03-21
**Goal:** Improve the visibility of HUD annotation labels in the Hero Section's Simulation Theater, which are currently too small and low-contrast to be noticed against the ChaosFlowCanvas background.

**Problem:** The three HUD labels (`RISK VECTORS: DIVERGING`, `SCENARIO LOCK: 2.1M PATHS`, `OUTCOME: CONTROLLED ✓`) render at 10px mono font with 50% text opacity and no background container. They are nearly invisible on top of the busy cyan flow lines.

**Approach:** Enhance visibility while preserving the "ambient data annotation" aesthetic. Avoid full glassmorphism cards (reserved for DecisionCards in phase 2) to maintain visual hierarchy between passive HUD labels and interactive decision cards.

---

## Changes

### 1. HUDLabel.tsx — Visual Enhancement

**Container layer (new):**
- Add semi-transparent background: `bg-[rgba(2,6,23,0.55)]`
- Add `backdrop-blur-sm` for depth separation from flow canvas
- Add rounded corners: `rounded-md`
- Add subtle border: `border border-white/[0.06]`
- Add padding: `px-3 py-2`

**Font & contrast:**
- Font size: `text-[10px]` → `text-[11px]`
- Text color opacity: `rgba(100,200,255,0.5)` → `rgba(100,200,255,0.78)`
- Component animate opacity: `0.7` → `1` (so background panel renders clearly)

**Accent bar:**
- Height: `h-5` → `h-full` (stretch to full container height)

**Entry animation — typewriter effect:**
- Characters appear one by one at 30-50ms per character
- After completion, text remains static
- `prefers-reduced-motion`: skip typewriter, show text immediately

**Unchanged:**
- Positions (`position` values in theaterData.ts)
- `maxWidth: 200px`
- Label 2 value fluctuation (every 3s)
- Label 3 checkmark pulse animation

### 2. SimulationTheater.tsx — Opacity Adjustment

- HUD label wrapper `motion.div` animate opacity: `0.7` → `1` (when theater inactive)
- Fade to `0` when theater active (unchanged)

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
| `src/components/hero/HUDLabel.tsx` | Add background container, increase font/contrast, typewriter animation |
| `src/components/hero/SimulationTheater.tsx` | Update HUD label wrapper opacity from 0.7 to 1 |

## Risk Assessment

**Low risk.** Changes are purely visual/CSS with one animation addition. No state management, data flow, or component API changes. Phase transition logic is unaffected.
