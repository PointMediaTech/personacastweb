# CTA Button Redesign Spec

## Overview

Redesign the navbar CTA button from a solid-fill style to a Ghost Button (transparent with border) to match PersonaCast's wire-like visual aesthetic. The current solid `strategic-blue` button feels heavy against the delicate flow-line background.

## Scope

**In scope:**
- Ghost Button visual style (transparent + border)
- Capsule shape (pill-shaped)
- Hover state with fill + glow
- Focus-visible and reduced-motion accessibility
- SEO title attribute

**Out of scope:**
- Text change (keep "預約專屬演示")
- English sub-label (rejected)
- Scan beam animation (rejected — unnecessary complexity)
- Breathing animation (removed — Ghost Button is already lightweight)

## Current State

File: `src/components/hero/Navbar.tsx` (line 36-41)

- Solid fill: `bg-strategic-blue` (#769EDB)
- Small rounded corners: `rounded-lg` (8px)
- Font: `text-sm` (14px), `font-medium`, white
- Padding: `px-4 py-2`
- Animation class: `cta-breathing` (pulsing box-shadow keyframe)
- Hover: gold glow + brightness (defined in CSS `.cta-breathing:hover`)

File: `src/index.css` (lines 49-52, 102-110)

- `@keyframes ctaBreathing` — box-shadow pulse
- `.cta-breathing` — applies animation
- `.cta-breathing:hover` — stops animation, applies gold glow

## Design Specification

### 1. Button Shape & Border

| Property | Current | Target |
|:---|:---|:---|
| Background | `bg-strategic-blue` (solid #769EDB) | `rgba(0, 242, 255, 0.05)` (near-transparent cyan tint) |
| Border | none | `1px solid rgba(0, 242, 255, 0.6)` |
| Border radius | `rounded-lg` (8px) | `rounded-full` (9999px, capsule/pill shape) |
| Padding | `px-4 py-2` | `px-6 py-2.5` (wider for capsule comfort) |

### 2. Typography

| Property | Current | Target |
|:---|:---|:---|
| Font size | `text-sm` (14px) | `text-base` (16px) |
| Letter spacing | default | `0.08em` (matching nav links) |
| Font weight | `font-medium` (500) | `font-medium` (no change) |
| Color | white | white (no change) |
| Text content | 預約專屬演示 | No change |

### 3. Hover State

When hovering the CTA button:
- Background fills to `rgba(0, 242, 255, 0.15)`
- Border brightens to `rgba(0, 242, 255, 0.9)`
- Outer glow: `box-shadow: 0 0 15px rgba(0, 242, 255, 0.3)`
- Transition: `300ms ease-out` on all properties

### 4. Removed Elements

- Remove `cta-breathing` class from button
- Remove `@keyframes ctaBreathing` from `index.css`
- Remove `.cta-breathing` and `.cta-breathing:hover` rules from `index.css`
- Remove `bg-strategic-blue` from button

### 5. Accessibility

- Add `title="預約 AI 智能體模擬演示"` to the button element for SEO
- `focus-visible`: same visual treatment as hover (border brighten + glow)
- `prefers-reduced-motion`: keep color/border transitions, remove box-shadow glow transition

## Implementation Approach

### CSS Changes (`src/index.css`)

Remove:
- `@keyframes ctaBreathing` (lines 49-52)
- `.cta-breathing` rule (lines 102-104)
- `.cta-breathing:hover` rule (lines 106-110)
- `.cta-breathing` reference in `prefers-reduced-motion` block (lines 122-124)

Add new `.cta-ghost` styles:

```css
.cta-ghost {
  background: rgba(0, 242, 255, 0.05);
  border: 1px solid rgba(0, 242, 255, 0.6);
  transition: all 300ms ease-out;
}

.cta-ghost:hover,
.cta-ghost:focus-visible {
  background: rgba(0, 242, 255, 0.15);
  border-color: rgba(0, 242, 255, 0.9);
  box-shadow: 0 0 15px rgba(0, 242, 255, 0.3);
}

.cta-ghost:focus-visible {
  outline: 2px solid var(--color-aurora-cyan);
  outline-offset: 4px;
}

@media (prefers-reduced-motion: reduce) {
  .cta-ghost {
    transition: background 300ms ease-out, border-color 300ms ease-out;
  }

  .cta-ghost:hover,
  .cta-ghost:focus-visible {
    box-shadow: none;
  }
}
```

### Component Changes (`src/components/hero/Navbar.tsx`)

Change the CTA button from:
```tsx
<button
  type="button"
  className="cta-breathing rounded-lg bg-strategic-blue px-4 py-2 text-sm font-medium text-white transition-all duration-200"
>
  預約專屬演示
</button>
```

To:
```tsx
<button
  type="button"
  className="cta-ghost rounded-full px-6 py-2.5 text-base font-medium text-white tracking-[0.08em]"
  title="預約 AI 智能體模擬演示"
>
  預約專屬演示
</button>
```

Note: `transition-all duration-200` removed from Tailwind since `.cta-ghost` handles transition in CSS (300ms ease-out).

## Files to Modify

1. `src/index.css` — remove ctaBreathing keyframe and rules, add `.cta-ghost` styles
2. `src/components/hero/Navbar.tsx` — swap button classes and add title attribute
