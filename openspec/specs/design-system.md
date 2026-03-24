# Design System Specification

> Auto-generated: 2026-03-24 | Source: codebase scan

## Color Palette

### Primary Tokens (in `@theme`)

```css
--color-deep-space:       #020617   /* Page background */
--color-strategic-blue:   #769EDB   /* Primary accent, CTA secondary */
--color-aurora-cyan:      #00F2FF   /* Interactive highlight, nav underline */
--color-logo-navy:        #0A3D7A   /* Logo dark blue */
--color-logo-cyan:        #00A3E0   /* Logo light blue */
```

### Secondary Tokens (in `@theme`)

```css
--color-dried-rose:       #B57D7D   /* Warm accent, required field markers */
--color-mist-blue-gray:   #8892B0   /* Secondary text */
--color-insight-gold:     #FFB800   /* Insight badges */
--color-amber-warn:       #FFAD00   /* Warning state */
--color-alert-red:        #FF4D4D   /* Error, high-risk */
```

### Unregistered Colors (used but not in `@theme`)

| Hex | Where Used | Suggested Token |
|-----|-----------|----------------|
| `#00E0C2` | Navbar CTA, Footer accent, buttons | `brand-teal` |
| `#0A0E1A` | PageHero bottom gradient, section backgrounds | `deep-void` |
| `#0F172A` | Card backgrounds (About, impacts) | `card-surface` |
| `#060A14` | Footer background | `footer-surface` |
| `#111827` | BottomCTA gradient end, card backgrounds | `surface-elevated` |
| `#050B14` | CTA button text color | `text-on-accent` |
| `#CBD5E1` | Nav text default | `nav-text` |
| `#94A3B8` | Body text (hardcoded in many places) | `text-secondary` |
| `#64748B` | Disabled text, tertiary text | `text-tertiary` |
| `#E2E8F0` | Semi-emphasis text | `text-semi` |
| `#A3B8A0` | Solution accent (brand reputation) | — |
| `#C4A882` | Core value accent | — |
| `#8B9EB7` | Solution accent (policy simulation) | — |

## Typography

```
Headings: Plus Jakarta Sans (700, 800)  → var(--font-heading)
Body:     Inter (400, 500)              → var(--font-body)
Mono:     JetBrains Mono (400, 500, 700) → var(--font-mono)
```

### Scale (observed patterns)

| Element | Mobile | Desktop | Weight |
|---------|--------|---------|--------|
| Hero H1 | `text-4xl` | `text-5xl lg:text-6xl` | `font-extrabold` |
| Section H2 | `text-2xl` | `text-3xl md:text-4xl` | `font-bold` |
| Card title | `text-xl` | `text-xl` | `font-bold` |
| Body text | `text-sm` - `text-base` | `text-base md:text-lg` | `font-normal` |
| Secondary text | `text-xs` - `text-sm` | `text-sm` | `font-medium` |
| Nav items | `text-[15px]` | `text-[15px]` | `font-bold` |

## Spacing & Layout

- **Max width:** `max-w-7xl` (1280px) for page content
- **Horizontal padding:** `px-6 lg:px-8`
- **Section vertical padding:** `py-20 lg:py-28` (ContentSection)
- **Hero vertical padding:** `py-24 lg:py-32`
- **Grid gap:** `gap-6` to `gap-8` for cards

## Card Pattern

Common card visual treatment:

```css
background-color: rgba(17,24,39,0.65);  /* semi-transparent dark */
backdrop-filter: blur(16px);
border: 1px solid rgba(118,158,219,0.08);
border-radius: 0.75rem;  /* rounded-xl */
```

With top accent line:
```css
/* 2px gradient line at top */
height: 2px;
background: linear-gradient(90deg, transparent, {accent}, transparent);
```

## Animation Patterns

1. **Scroll reveal** — fade-in + translateY via IntersectionObserver
2. **Staggered entrance** — `delay` prop cascading across sibling cards
3. **Hover glow** — `box-shadow` transitions on interactive elements
4. **Breathing pulse** — CSS keyframes for CTA buttons
5. **Underline expand** — `transform: scaleX()` on nav links

All animations include `prefers-reduced-motion: reduce` handling.

## Interactive Patterns

- **Mega dropdown** — glass morphism panel with bento grid layout
- **Mobile sidebar** — slide-in from right, overlay backdrop
- **Accordion** — max-height transition with chevron rotation
- **Billing toggle** — monthly/annual price switch
- **Scroll-driven** — progress-based content reveal (product page)
