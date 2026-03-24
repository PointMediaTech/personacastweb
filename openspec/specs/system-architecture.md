# PersonaCast Web — System Architecture Specification

> Auto-generated: 2026-03-24 | Source: codebase scan

## 1. Overview

PersonaCast Web is a **marketing website** for the PersonaCast AI strategic simulation platform. Built on **Next.js 15 App Router** with **React 19**, it serves as the public-facing site at `personacast.io`. The site is entirely in **Traditional Chinese (zh-Hant)**.

```
┌─────────────────────────────────────────────────────────────────┐
│                     ROOT LAYOUT (layout.tsx)                    │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Navbar (client component — sticky, responsive)         │   │
│  ├──────────────────────────────────────────────────────────┤   │
│  │                                                          │   │
│  │                  {children} — Page Content                │   │
│  │                                                          │   │
│  ├──────────────────────────────────────────────────────────┤   │
│  │  FooterSection (client component)                        │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

## 2. Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 15.x |
| UI Library | React | 19.x |
| Language | TypeScript | 5.9.x |
| Styling | Tailwind CSS v4 (`@theme`) | 4.2.x |
| Icons | lucide-react | 0.577.x |
| Animation | Pure CSS + custom hooks | — |
| SEO | schema-dts (JSON-LD) | 1.1.x |
| Noise generation | simplex-noise | 4.x |
| Build tooling | @tailwindcss/postcss | 4.2.x |

**Note:** `framer-motion` is listed in `package.json` but is **banned** per CLAUDE.md — all animations use pure CSS keyframes + custom React hooks in `app/lib/animations.ts`.

## 3. Route Map

```
/                           → HomePage (SSR + dynamic imports)
/product                    → Product overview (NebulaHero + ScrollExperience + BentoTech)
/product/seed-injection     → Seed Injection Engine
/product/graph-engine       → Graph Construction System
/product/simulation-theater → Simulation Theater
/product/predictive-decoder → Predictive Decoder
/product/data-assets        → Data Assets Vault
/pricing                    → Pricing page (3-tier + FAQ + feature compare)
/solutions                  → Solutions overview (4 solution cards)
/solutions/crisis-pr        → Crisis PR solution
/solutions/political-strategy → Political Strategy solution
/solutions/brand-reputation → Brand Reputation solution
/solutions/policy-simulation → Policy Simulation solution
/resources                  → Resources hub
/resources/case-studies     → Case studies
/resources/whitepapers      → Whitepapers
/about                      → About page
/contact                    → Contact / Demo booking
```

### Disabled routes (in navigation, not yet implemented)
- `/resources/blog` — marked `disabled: true` in Navbar
- `/login` — linked but no page exists
- `/legal/privacy`, `/legal/terms` — linked in footer, no pages

## 4. Component Architecture

### 4.1 Rendering Strategy

```
┌──────────────────────────────────────────────────────┐
│                SERVER COMPONENTS (default)            │
│                                                      │
│  Page files (page.tsx) — metadata, JSON-LD, layout   │
│  ContentSection — pure wrapper                       │
│                                                      │
├──────────────────────────────────────────────────────┤
│             CLIENT COMPONENTS ('use client')          │
│                                                      │
│  Navbar — scroll detection, dropdowns, mobile menu   │
│  FooterSection — accordion collapse on mobile        │
│  PageHero — IntersectionObserver animations          │
│  BottomCTA — scroll-triggered fade                   │
│  ScrollReveal — intersection-based reveal            │
│  FeatureCard — intersection-based reveal             │
│  FAQAccordion — toggle state                         │
│  PricingInteractive — billing toggle                 │
│  BillingToggle — monthly/annual switch               │
│  PricingCard — interactive card                      │
│  Solution client wrappers — CrisisPRClient, etc.     │
│  Product interactives — InteractiveGraphFeatures     │
│  Hero sub-components — canvas, animations            │
│                                                      │
└──────────────────────────────────────────────────────┘
```

### 4.2 Component Directory Structure

```
app/components/
├── shared/           # Cross-page reusable components
│   ├── Navbar.tsx              (476 lines — largest component)
│   ├── PageHero.tsx            (113 lines)
│   ├── BottomCTA.tsx           (59 lines)
│   ├── ContentSection.tsx      (16 lines)
│   ├── ScrollReveal.tsx        (87 lines)
│   ├── FeatureCard.tsx         (60 lines)
│   ├── GlowButton.tsx
│   ├── FAQAccordion.tsx
│   ├── PricingCard.tsx
│   ├── BillingToggle.tsx
│   ├── FeatureCompareTable.tsx
│   ├── TrustBar.tsx
│   ├── StepFlow.tsx
│   ├── StepNavigation.tsx
│   ├── PainPointCard.tsx
│   ├── TestimonialCard.tsx
│   └── SectionWrapper.tsx
│
├── footer/           # Footer-specific
│   ├── FooterSection.tsx       (219 lines)
│   ├── MinimalFooter.tsx
│   ├── CTAButton.tsx
│   └── footerData.ts
│
├── product/          # Product page components
│   ├── NebulaHero.tsx
│   ├── ScrollExperience.tsx
│   ├── BentoTech.tsx
│   ├── ProductCTA.tsx
│   ├── TextRevealWrapper.tsx
│   └── FocusCursor.tsx
│
├── hero/             # Homepage hero section (13 components)
│   ├── HeroSection.tsx
│   ├── HeroContent.tsx
│   ├── NeuralOracle.tsx
│   ├── NeuralHead.tsx
│   ├── NeuralHeadSilhouette.tsx
│   ├── NeuralField.tsx
│   ├── SimulationTheater.tsx
│   ├── SimulationSphere.tsx
│   ├── SimulationResult.tsx
│   ├── StrategicRadar.tsx
│   ├── ChaosFlowCanvas.tsx
│   ├── DataRainCanvas.tsx
│   ├── AgentCards.tsx
│   ├── AgentDossier.tsx
│   ├── DecisionCard.tsx
│   ├── CoordinateOverlay.tsx
│   ├── HUDLabel.tsx
│   ├── LiveBadge.tsx
│   └── PersonaCastLogo.tsx
│
├── paradigm/         # Homepage "paradigm shift" section
├── pillars/          # Homepage "three pillars" section
├── scenarios/        # Homepage scenarios section
├── authority/        # Homepage authority/stats section
└── cta/              # Homepage CTA section
```

### 4.3 Solutions Page Pattern

Each solution uses a **Server page + Client wrapper** pattern:

```
app/solutions/<slug>/
├── page.tsx                    # Server: metadata, JSON-LD, imports Client
└── <Name>Client.tsx            # Client: interactive UI, animations
```

Solutions: `crisis-pr`, `political-strategy`, `brand-reputation`, `policy-simulation`

## 5. Design System

### 5.1 Color Tokens (defined in `globals.css @theme`)

| Token | Hex | Role |
|-------|-----|------|
| `deep-space` | `#020617` | Page background |
| `strategic-blue` | `#769EDB` | Primary accent |
| `aurora-cyan` | `#00F2FF` | Interactive highlight |
| `logo-navy` | `#0A3D7A` | Logo deep blue |
| `logo-cyan` | `#00A3E0` | Logo cyan |
| `dried-rose` | `#B57D7D` | Warm accent, persona labels |
| `mist-blue-gray` | `#8892B0` | Secondary text |
| `insight-gold` | `#FFB800` | Insight badges |
| `amber-warn` | `#FFAD00` | Warning state |
| `alert-red` | `#FF4D4D` | Error, high-risk |

**Additional brand color in use:** `#00E0C2` — used extensively in Navbar CTA, Footer, and buttons but **not defined as a token** in `@theme`.

### 5.2 Typography

| Use | Font | Tailwind Class |
|-----|------|---------------|
| Headings (H1-H3) | Plus Jakarta Sans | `font-heading` |
| Body text | Inter | `font-body` |
| Code / Monospace | JetBrains Mono | `font-mono` |

### 5.3 CSS Utility Classes (globals.css)

| Class | Purpose |
|-------|---------|
| `.nav-link` | Nav link with underline expand + glow hover |
| `.nav-bar` | Top nav container with gradient bottom border |
| `.cta-ghost` | Ghost CTA button (cyan border) |
| `.cta-void-button` | Dark breathing glow CTA |
| `.scanline-overlay` | Scanline effect overlay |

### 5.4 Animation System

All animations are **pure CSS** + custom React hooks (no framer-motion):

**`app/lib/animations.ts` exports:**
- `useReducedMotion()` — SSR-safe via `useSyncExternalStore`
- `useInView(ref, options)` — IntersectionObserver wrapper
- `useScrollProgress(ref)` — scroll progress 0→1
- `useMountAnimation(delay)` — mount-based transition trigger
- `interpolate(t, inMin, inMax, outMin, outMax)` — linear interpolation
- `cssTransition(props, duration, delay, easing)` — CSS transition builder
- `useAnimatePresence(isPresent, exitDuration)` — delayed unmount
- `useSvgPointsMorph(from, to, duration, delay)` — SVG point animation
- `EASE_CSS` — standard easing constant

**Motion accessibility:** All animations respect `@media (prefers-reduced-motion: reduce)` via both CSS and the `useReducedMotion` hook.

## 6. SEO Architecture

### 6.1 Metadata

- Root layout sets global metadata via `SEO_CONFIG`
- Each page exports its own `metadata: Metadata` object
- Canonical URLs set per page via `alternates.canonical`

### 6.2 Structured Data (JSON-LD)

```
lib/structured-data.ts
├── generateWebSiteSchema()
├── generateOrganizationSchema()
├── generateSoftwareAppSchema()
├── generateBreadcrumbSchema(items)
└── generateHomePageSchemas()    → [WebSite, Organization, SoftwareApp, Breadcrumb]
```

Pages inject `<script type="application/ld+json">` for:
- Homepage: WebSite + Organization + SoftwareApp + Breadcrumb
- Product: Breadcrumb + SoftwareApp
- Pricing: FAQPage + SoftwareApplication (with Offers)
- About: Organization
- Contact: (none currently)

### 6.3 Other SEO assets
- `app/robots.ts` — robots.txt generation
- `app/sitemap.ts` — sitemap.xml generation
- `app/opengraph-image.tsx` — dynamic OG image

## 7. Performance Patterns

1. **Dynamic imports** — below-fold homepage sections use `next/dynamic`
2. **Font loading** — `display: 'swap'` on all Google Fonts
3. **No framer-motion** — removed to reduce bundle size
4. **Passive event listeners** — scroll/resize handlers use `{ passive: true }`
5. **IntersectionObserver** — animations only trigger when elements enter viewport
6. **SSR text visibility** — PageHero uses transform-only entrance to avoid hiding LCP text

## 8. Data Flow

```
┌──────────────────┐     ┌──────────────────┐
│  seo-config.ts   │────▶│  structured-     │
│  (brand data)    │     │  data.ts         │
└──────────────────┘     │  (JSON-LD)       │
                         └────────┬─────────┘
                                  │
                                  ▼
┌──────────────────────────────────────────────┐
│            Server Components (pages)          │
│  • Read SEO_CONFIG for metadata               │
│  • Generate JSON-LD schemas                   │
│  • Pass static data to client components      │
└──────────────────────────────────────────────┘
                    │
                    ▼
┌──────────────────────────────────────────────┐
│           Client Components                   │
│  • Local state only (useState)                │
│  • No global state management                 │
│  • No API calls (static marketing site)       │
│  • Animation hooks (IntersectionObserver)      │
└──────────────────────────────────────────────┘
```

**Key insight:** This is a **purely static marketing site** with no backend, no API calls, no database, and no authentication. All data is hardcoded in component files or `seo-config.ts`. The contact form is **non-functional** (all inputs are `readOnly` / `disabled`).

## 9. Codebase Statistics

| Metric | Value |
|--------|-------|
| Total TSX lines | ~14,750 |
| Total TSX files | ~90 |
| Shared components | 17 |
| Homepage sections | 6 (Hero, Paradigm, Pillars, Scenarios, Authority, CTA) |
| Product sub-pages | 5 |
| Solution sub-pages | 4 |
| Resource pages | 3 |
| Utility/lib files | 3 (seo-config, structured-data, animations) |

## 10. Known Issues & Gaps

1. **`framer-motion` still in package.json** — banned per CLAUDE.md but not uninstalled
2. **`#00E0C2` not in design tokens** — widely used but missing from `@theme` block
3. **Contact form is non-functional** — all inputs are `readOnly`, no form submission
4. **Missing pages** — `/login`, `/legal/privacy`, `/legal/terms`, `/resources/blog`
5. **No tests** — zero test files in the codebase
6. **No error boundaries** — no error.tsx or not-found.tsx files
7. **Navbar is 476 lines** — exceeds the 400-line soft limit per CLAUDE.md
8. **No i18n infrastructure** — hardcoded zh-Hant strings, no translation system
