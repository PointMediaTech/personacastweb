# Hero Card Visual Upgrade Design

**Date:** 2026-03-21
**Scope:** Decision path cards (primary) + DataCards & AgentCards (style sync)
**Approach:** Progressive enhancement on existing components (方案 A)

---

## 1. Overview

Upgrade the three decision path cards (公開道歉、法律攻防、轉移關注) from static text panels into "live data nodes" with advanced glassmorphism, animated metrics, and risk indicators. Synchronize DataCards and AgentCards to the same visual language without restructuring their layouts.

---

## 2. Shared GlassCard Visual Upgrade

All card types adopt these baseline properties:

| Property | Current | New |
|----------|---------|-----|
| Min width | ~260px | **320px** |
| Backdrop blur | `blur(12px)` | **`blur(16px)`** |
| Background | `rgba(2,6,23,0.5)` | **`rgba(10,14,23,0.55)`** |
| Border | `border-slate-700/40` | **1px `rgba(0,242,255,0.12)`** |
| Corner glow | none | **`box-shadow: 0 0 8px rgba(0,242,255,0.06)`** |
| Title font | 12-13px | **16px, Inter Semibold, letter-spacing 0.02em** |
| Secondary text | 10-11px | **13-14px** |
| Label text | 9-10px | **12px** |
| Padding | 12-16px | **20-24px** |

### Hover State (all cards)

- `transform: scale(1.02) translate(-2px, -2px)`
- Backdrop blur deepens to `blur(20px)`
- Border brightens to `rgba(0,242,255,0.25)`
- `transition: all 0.3s ease`

---

## 3. Decision Path Card Layout

Restructured top-to-bottom:

```
┌─────────────────────────────────────┐
│ ● LIVE SIMULATION    [公關] [法律]  │  Header: pulse dot + Pill Badges
│                                     │
│ 主動式誠意溝通                       │  Title 16px Inter Semibold
│ PR PIVOT                            │  Subtitle 12px mono, low opacity
│                                     │
│ ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔░░░░░  73%         │  Success rate progress bar + number
│                                     │
│ ● 風險：低                           │  Breathing light dot + risk text
└─────────────────────────────────────┘
```

### Header

- **Pulse dot:** 6px circle, `aurora-cyan`, CSS `pulse 2s infinite`
- **Pill Badges:** `border-radius: 9999px`, bg `rgba(0,242,255,0.1)`, text `#00F2FF`, padding `2px 10px`, font 12px
- Tags: 公關, 法律, 技術 as applicable per card

### Title Copy Changes

| Original | New |
|----------|-----|
| 公開道歉 | **主動式誠意溝通** |
| 法律攻防 | **法規防禦部署** |
| 轉移關注 | **議題重構策略** |

### Success Rate Progress Bar

- Height: 3px
- Track: `rgba(255,255,255,0.08)`
- Fill color by value: ≥60% `aurora-cyan`, 40-59% `amber-warn`, <40% `alert-red`
- Trigger: 0.3s after card entrance animation completes
- Duration: 1.2s, `ease-out`, from 0% to target
- Number counts up in sync
- Plays once, no loop

### Risk Breathing Light

- Dot: 8px circle
- Colors: low = `aurora-cyan`, medium = `amber-warn`, high = `alert-red`
- Animation: `opacity 0.4 → 1 → 0.4`, 2.5s, infinite, ease-in-out
- Pure CSS, no framer-motion

### Hover Expansion (decision cards only)

- In addition to shared hover state, reveals a hidden info line (estimated execution time)
- Expand via `max-height` + `opacity` transition

---

## 4. DataCards Style Sync

No layout restructure. Changes:

- Apply new GlassCard styles (blur, border glow, background)
- Width: ~260px → **320px**
- Internal charts (Canvas/SVG) scale proportionally to fill new size
- Title text (e.g., "CONFLICT INDEX"): 10-11px → **14px**
- Value text (e.g., "88.4%"): → **16px**
- Add unified hover expansion effect

Affected files:
- `DataCards.tsx` (GlassCard wrapper)
- `cards/ConflictIndexCard.tsx`
- `cards/TrajectoryCard.tsx`
- `cards/SentimentCard.tsx`

---

## 5. AgentCards Style Sync

No layout restructure. Changes:

- Apply new GlassCard styles
- Keep top accent border (pro blue / anti rose) with added subtle glow coexisting with new border
- Name font: → **16px**
- MBTI / role text: → **13px**
- Avatar circle: 36px → **44px**
- LIVE pulse dot style unified with decision cards (6px, same animation pattern)
- Pro/anti colors remain `#769EDB` / `#B57D7D` — not replaced by aurora-cyan

---

## 6. Color System Extension

New entries added to `@theme` in `index.css`:

| Variable | Value | Purpose |
|----------|-------|---------|
| `--color-aurora-cyan` | `#00F2FF` | Progress bars (high), LIVE pulse, low risk, card border glow |
| `--color-amber-warn` | `#FFAD00` | Medium risk, progress bars (medium) |
| `--color-alert-red` | `#FF4D4D` | High risk, progress bars (low) |

Existing colors (`insight-gold`, `strategic-blue`, `dried-rose`, etc.) remain unchanged. `insight-gold (#FFB800)` stays for StrategicRadar; `amber-warn (#FFAD00)` is dedicated to risk indicators.

---

## 7. Animation Specifications

### Card Entrance (all cards)

- Existing framer-motion fade + slide from right
- Existing stagger delays unchanged
- Existing `EASE = [0.22, 1, 0.36, 1]`

### LIVE Pulse Dot (decision cards + AgentCards)

- CSS: `scale(1) → scale(1.6) → scale(1)` + `opacity 1 → 0.3 → 1`
- Duration: 2s, infinite
- Color: decision cards = `aurora-cyan`, AgentCards = respective pro/anti color

### Reduced Motion Handling

- Uses existing `useReducedMotion()` hook
- Disabled: breathing light, pulse, progress bar animation (show final values instantly)
- Kept: hover state changes (remove scale, keep border brightness only)

---

## 8. Scope Boundaries

### In scope:

- `src/index.css` — 3 new color variables
- `src/components/hero/DataCards.tsx` — GlassCard upgrade, sizing, fonts
- `src/components/hero/AgentCards.tsx` — style sync, sizing, fonts
- Decision path card component in SimulationTheater — full layout rework
- `src/components/hero/cards/ConflictIndexCard.tsx` — font sizing, container fit
- `src/components/hero/cards/TrajectoryCard.tsx` — same
- `src/components/hero/cards/SentimentCard.tsx` — same

### Explicitly out of scope:

- HeroSection.tsx layout structure and z-index layers
- ChaosFlowCanvas / DataRainCanvas (background animations)
- StrategicRadar.tsx (independent system)
- AgentDossier.tsx
- Navbar / HeroContent / LiveBadge
- H1 copy and SEO changes
- Hover-to-canvas connection lines (deferred)

### Technical constraints:

- No new npm dependencies
- All implementation with existing framer-motion + Tailwind + native CSS
- Preserve existing responsive breakpoint logic (mobile hidden, md visible, lg full)
