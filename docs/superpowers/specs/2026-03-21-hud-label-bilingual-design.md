# HUD Label Bilingual Design

**Date:** 2026-03-21
**Scope:** 3 HUD labels on the hero section canvas overlay only

## Problem

The hero section's 3 floating HUD labels are in English, but the rest of the page (headings, CTAs, subtitle) is in Chinese. Visitors who don't read English may not understand these labels, creating a language inconsistency.

## Decision

Add Chinese as the primary text line, with the original English displayed below in smaller, lower-opacity text as a secondary annotation. Only the 3 HUD labels are affected — the bottom status bar, eyebrow, and LIVE SIMULATION badge remain unchanged.

## Visual Structure

Each HUD label becomes a two-line element:

```
┌──────────────────────────┐
│▎ 風險向量：擴散中          │  ← 14px, rgba(100,200,255,0.78)
│▎ RISK VECTORS: DIVERGING  │  ← 10px, rgba(100,200,255,0.4)
└──────────────────────────┘
```

## Content Mapping

| # | Chinese (primary, new) | English (secondary, existing) |
|---|---|---|
| 1 | `風險向量：擴散中` | `RISK VECTORS: DIVERGING` |
| 2 | `情境鎖定：2.1M 路徑` (dynamic) | `SCENARIO LOCK: 2.1M PATHS` (dynamic) |
| 3 | `結果：已控制 ✓` | `OUTCOME: CONTROLLED ✓` |

## Data Structure Changes (`theaterData.ts`)

### `HUDLabelConfig` interface additions

- `textZh: string` — Chinese primary text
- `valueZh?: string` — Chinese dynamic portion (e.g., `2.0M 路徑`)

### Updated `HUD_LABELS` array

```ts
{
  id: 1,
  text: 'RISK VECTORS: DIVERGING',
  textZh: '風險向量：擴散中',
  accentColor: '#B57D7D',
  // ... positions unchanged
},
{
  id: 2,
  text: 'SCENARIO LOCK:',
  textZh: '情境鎖定：',
  value: '2.1M PATHS',
  valueZh: '2.1M 路徑',
  accentColor: '#769EDB',
  // ... positions unchanged
},
{
  id: 3,
  text: 'OUTCOME: CONTROLLED ✓',
  textZh: '結果：已控制 ✓',
  accentColor: '#4ADE80',
  // ... positions unchanged
},
```

## Rendering Changes (`HUDLabel.tsx`)

### Layout

- The `<div>` containing text becomes a flex-column with two lines
- Line 1 (Chinese): `font-mono text-[14px]`, color `rgba(100,200,255,0.78)` (unchanged from current English)
- Line 2 (English): `font-mono text-[10px] uppercase`, color `rgba(100,200,255,0.4)`, `tracking-[0.15em]`
- `maxWidth` increases from `240px` to `260px`

### Animation

- Typewriter animation applies to the Chinese line only
- Chinese `fullText` is constructed as `textZh` (or `textZh + ' ' + valueZh` for Label 2) — same logic as the existing English construction
- Per-character duration stays at 40ms; Chinese text is shorter so the animation is naturally faster, which feels appropriate for the denser glyphs
- English subtitle fades in (`opacity 0 → 1`, 0.4s) after the typewriter completes, triggered by the existing `typewriterDone` state boolean
- Label 2 dynamic value fluctuation uses a single state variable; Chinese variants: `['2.0M 路徑', '2.1M 路徑', '2.2M 路徑']`, English variants: `['2.0M PATHS', '2.1M PATHS', '2.2M PATHS']` — both lines update from the same random index
- Label 3 checkmark pulse animation stays on the Chinese line
- When `prefers-reduced-motion` is enabled, both Chinese and English lines render immediately at full opacity with no typewriter or fade-in

## Files to Modify

1. `src/components/hero/theaterData.ts` — add `textZh`, `valueZh` fields to interface and data
2. `src/components/hero/HUDLabel.tsx` — render bilingual two-line layout with animation adjustments
3. `src/index.css` — verify `hudTypewriter` keyframe still works with the two-line layout (likely no change needed)
