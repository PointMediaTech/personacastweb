# Navbar Visual Upgrade Design Spec

## Overview

Upgrade the PersonaCast top navigation bar from a functional-minimal style to a refined "floating command center" aesthetic with improved typography, hover micro-interactions, and a breathing CTA button — while maintaining readability for all age groups.

## Scope

**In scope:**
- Typography refinement (size, letter-spacing)
- Hover states: cyan text glow + expanding underline
- CTA breathing animation
- Bottom gradient separator line

**Out of scope:**
- English sub-labels beneath menu items
- Menu label renaming (keep current Chinese labels)
- Scroll-based hide/show behavior (deferred to multi-page phase)
- Neon border CTA style (rejected in favor of solid fill)

## Current State

File: `src/components/hero/Navbar.tsx`

- Fixed position navbar with glassmorphism (`blur(12px)`, `rgba(2,6,23,0.85)`)
- Nav links: `text-lg` (18px), `text-mist-blue-gray`, hover → white
- CTA: solid `bg-strategic-blue`, gold hover glow, text "預約專屬演示"
- No bottom border or separator
- No hover underline animation
- No CTA breathing animation

## Design Specification

### 1. Typography

| Property | Current | Target |
|:---|:---|:---|
| Font size | `text-lg` (18px) | `text-base` (16px) |
| Letter spacing | default (0) | `0.08em` |
| Font family | Inter (inherited) | No change |
| Font weight | normal (400) | No change |
| Color (normal) | `mist-blue-gray` (#8892B0) | No change |

### 2. Hover State — Text Glow

When hovering a nav link:
- Text color transitions to `white`
- Add cyan text-shadow: `0 0 8px rgba(0, 242, 255, 0.8)`
- Transition duration: `200ms`

### 3. Hover State — Expanding Underline

When hovering a nav link:
- A 2px `aurora-cyan` (#00F2FF) line expands from center outward
- Implementation: CSS pseudo-element `::after` with `scaleX(0)` → `scaleX(1)`
- `transform-origin: center`
- Transition duration: `300ms` ease-out
- Line positioned 4px below text (`bottom: -4px`)

### 4. CTA Button — Breathing Animation

- Maintain solid `bg-strategic-blue` fill
- Add subtle breathing `box-shadow` animation:
  - Keyframe: `0%, 100%` → `box-shadow: 0 0 0 0 rgba(118, 158, 219, 0)`
  - Keyframe: `50%` → `box-shadow: 0 0 12px 2px rgba(118, 158, 219, 0.4)`
  - Duration: `2.5s`, infinite, ease-in-out
- Hover state: maintain existing gold glow (`rgba(255,184,0,0.3)`), breathing pauses on hover
- CTA text: "預約專屬演示" (no change)
- CTA font size: maintain `text-sm` (14px)

### 5. Bottom Gradient Separator

- Replace hard border with a 1px gradient line at the navbar bottom edge
- Gradient: `transparent → rgba(0, 242, 255, 0.3) → transparent`
- Implementation: CSS pseudo-element `::after` on the `<nav>` element
- Full width, `height: 1px`, positioned at `bottom: 0`

### 6. Background & Border

- Maintain existing glassmorphism: `backdrop-filter: blur(12px)`, `rgba(2,6,23,0.85)`
- No hard border (remove if any)
- Boundary defined solely by bottom gradient line

## Implementation Notes

### CSS Approach

The expanding underline and bottom gradient line require pseudo-elements. Since Tailwind utility classes don't natively support `::after` with complex transforms, these should be implemented via:

**Option A (Recommended):** Inline styles + CSS classes defined in `index.css` using `@layer components` or a scoped class.

**Option B:** Framer Motion for the underline animation (consistent with existing animation approach), though CSS is lighter for simple hover effects.

### Keyframe Definition

Add to `index.css`:

```css
@keyframes ctaBreathing {
  0%, 100% { box-shadow: 0 0 0 0 rgba(118, 158, 219, 0); }
  50% { box-shadow: 0 0 12px 2px rgba(118, 158, 219, 0.4); }
}
```

### Accessibility

- All hover effects respect `prefers-reduced-motion`: when enabled, disable breathing animation and underline expand, keep color transitions only
- 16px font size meets WCAG readability guidelines
- Color contrast: `#8892B0` on `rgba(2,6,23,0.85)` meets AA standard for large text

## Files to Modify

1. `src/components/hero/Navbar.tsx` — component updates (typography, hover classes, CTA animation, bottom gradient)
2. `src/index.css` — add `ctaBreathing` keyframe, nav link hover underline styles, bottom gradient styles

## Visual Summary

```
┌─────────────────────────────────────────────────────────────────────┐
│  [Logo]    核心推演  應用場景  技術深度  實戰案例  資源中心    [預約專屬演示] │
│                                                          ✨ breathing │
│─ ─ ─ ─ ─ ─ ─ ─ ─ ── gradient line (cyan, 1px) ── ─ ─ ─ ─ ─ ─ ─ ─│
│                                                                     │
│  hover state:                                                       │
│     核心推演   ← white + cyan glow                                   │
│     ────────   ← 2px cyan line, expand from center                  │
└─────────────────────────────────────────────────────────────────────┘
```
