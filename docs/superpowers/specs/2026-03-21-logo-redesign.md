# Logo Redesign — Pure Text Wordmark

**Date:** 2026-03-21
**Status:** Approved

## Problem

1. The neural-head icon (dot-connected brain silhouette) is too small at navbar scale and adds visual noise without adding recognizability.
2. The current PNG logo renders "Persona" and "Cast" in similar dark-blue tones, making them indistinguishable on the dark navbar background.

## Design

Replace the PNG image logo with a CSS/inline text wordmark in the Navbar.

### Specification

| Property | Persona | Cast |
|----------|---------|------|
| Color | `#E2E8F0` (mist white) | `#00E0C2` (cyan-teal) |
| Font weight | 600 (Semi-Bold) | 800 (Extra-Bold) |
| Font family | Plus Jakarta Sans | Plus Jakarta Sans |
| Font size | `text-[26px]` | `text-[26px]` |
| Line height | `leading-none` | `leading-none` |
| Letter spacing | `-0.02em` | `-0.02em` |

- **No icon** — the neural-head graphic is removed entirely.
- **No separator** — no dot or divider between the two words.
- The two `<span>` elements sit flush with no extra gap.
- Wrap the wordmark in an `<a href="/">` for home navigation, with `aria-label="PersonaCast"`.
- Plus Jakarta Sans is already the site's primary font — no additional imports needed.

### Responsive

- Desktop & mobile use the same text size (`text-[26px]`). The previous PNG had `h-8 md:h-9`; the new text wordmark at 26px is visually comparable to `h-9` and does not need a breakpoint adjustment. The wordmark width (~160px) fits comfortably beside any mobile hamburger icon.

## Implementation

### Changes

1. **`src/components/hero/Navbar.tsx`** — Replace the `<img src="/PersonaCast_Logo.png">` with two `<span>` elements styled per the spec above.

### No changes needed

- `PersonaCastLogo.tsx` — SVG component, not used by Navbar. Leave as-is for potential use elsewhere.
- `NeuralHead.tsx` — Hero section component, unrelated to navbar logo.
- `public/PersonaCast_Logo.png` — Keep the file for now (may be referenced elsewhere or useful as a brand asset).

## Success Criteria

- "Persona" and "Cast" are visually distinct in color and weight at a glance.
- Logo is legible on the dark navbar background without squinting.
- No layout shift or navbar height change.
