# Navbar Visual Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade the navbar from functional-minimal to a refined "floating command center" with improved typography, hover micro-interactions, breathing CTA, and gradient separator.

**Architecture:** Pure CSS approach — keyframes and pseudo-element styles in `index.css`, applied via class names in `Navbar.tsx`. No Framer Motion needed for these simple hover/animation effects.

**Tech Stack:** React, Tailwind CSS v4, CSS keyframes, CSS pseudo-elements

**Spec:** `docs/superpowers/specs/2026-03-21-navbar-visual-upgrade-design.md`

---

## File Map

| File | Action | Responsibility |
|:---|:---|:---|
| `src/index.css` | Modify | Add `ctaBreathing` keyframe, `.nav-link` hover underline styles, `.nav-bar` bottom gradient, `focus-visible` states, `prefers-reduced-motion` rules |
| `src/components/hero/Navbar.tsx` | Modify | Apply CSS classes, update typography, wire up CTA animation class |

---

### Task 1: Add CSS keyframe and nav link styles to `index.css`

**Files:**
- Modify: `src/index.css:44-47` (after existing keyframes)

- [ ] **Step 1: Add `ctaBreathing` keyframe**

Append after the `riskBreathing` keyframe block (line 47) in `src/index.css`:

```css
@keyframes ctaBreathing {
  0%, 100% { box-shadow: 0 0 0 0 rgba(118, 158, 219, 0); }
  50% { box-shadow: 0 0 12px 2px rgba(118, 158, 219, 0.4); }
}
```

- [ ] **Step 2: Add `.nav-link` styles with hover underline and glow**

Append after the new keyframe:

```css
.nav-link {
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: var(--color-aurora-cyan);
  transform: scaleX(0);
  transform-origin: center;
  transition: transform 300ms ease-out;
}

.nav-link:hover::after,
.nav-link:focus-visible::after {
  transform: scaleX(1);
}

.nav-link:hover,
.nav-link:focus-visible {
  color: white;
  text-shadow: 0 0 8px rgba(0, 242, 255, 0.8);
}

.nav-link:focus-visible {
  outline: none;
}
```

- [ ] **Step 3: Add `.nav-bar` bottom gradient separator**

Append after the nav-link styles:

```css
.nav-bar::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(0, 242, 255, 0.3),
    transparent
  );
}
```

- [ ] **Step 4: Add `.cta-breathing` class**

Append after the nav-bar styles:

```css
.cta-breathing {
  animation: ctaBreathing 2.5s ease-in-out infinite;
}

.cta-breathing:hover {
  animation: none;
}
```

- [ ] **Step 5: Add `prefers-reduced-motion` rules**

Append after the cta-breathing styles:

```css
@media (prefers-reduced-motion: reduce) {
  .nav-link::after {
    transition: none;
  }

  .nav-link:hover,
  .nav-link:focus-visible {
    text-shadow: none;
  }

  .cta-breathing {
    animation: none;
  }
}
```

- [ ] **Step 6: Verify CSS syntax**

Run: `npx vite build 2>&1 | head -20`
Expected: No CSS parse errors.

- [ ] **Step 7: Commit CSS changes**

```bash
git add src/index.css
git commit -m "feat(navbar): add ctaBreathing keyframe, nav-link hover styles, gradient separator"
```

---

### Task 2: Update `Navbar.tsx` component

**Files:**
- Modify: `src/components/hero/Navbar.tsx`

- [ ] **Step 1: Add `nav-bar` class to `<nav>` element**

Change the `<nav>` className from:
```
"fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-10"
```
to:
```
"nav-bar fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-10"
```

- [ ] **Step 2: Update nav link `<a>` — typography and hover classes**

Change the `<a>` className from:
```
"text-mist-blue-gray text-lg transition-colors duration-200 hover:text-white"
```
to:
```
"nav-link text-mist-blue-gray text-base tracking-[0.08em] transition-all duration-200"
```

Note: `tracking-[0.08em]` is Tailwind's arbitrary value syntax for `letter-spacing: 0.08em`. The `hover:text-white` is removed because the `.nav-link:hover` CSS rule now handles color + text-shadow together. Changed `transition-colors` to `transition-all` so `text-shadow` also transitions.

- [ ] **Step 3: Update CTA button — add breathing animation class**

Change the CTA `<button>` className from:
```
"rounded-lg bg-strategic-blue px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:shadow-[0_0_16px_2px_rgba(255,184,0,0.3)] hover:brightness-110"
```
to:
```
"cta-breathing rounded-lg bg-strategic-blue px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:shadow-[0_0_16px_2px_rgba(255,184,0,0.3)] hover:brightness-110"
```

- [ ] **Step 4: Visual verification**

Run: `npx vite dev`

Verify in browser:
1. Nav links are 16px with visible letter-spacing
2. Hovering a nav link shows white text + cyan glow + expanding underline from center
3. Tab-navigating nav links shows the same underline + glow (focus-visible)
4. CTA button pulses with subtle blue glow
5. CTA breathing stops on hover, gold glow appears cleanly (no conflict)
6. Faint cyan gradient line visible at navbar bottom edge (visible on all screen sizes — acceptable as it is a subtle 1px visual element that does not affect layout)
7. Nav links and CTA are desktop-only (hidden on mobile via existing `hidden md:flex`)

- [ ] **Step 5: Commit component changes**

```bash
git add src/components/hero/Navbar.tsx
git commit -m "feat(navbar): apply typography, hover effects, breathing CTA, gradient separator"
```
