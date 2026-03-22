# PersonaCast Homepage Full Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate from Vite to Next.js and build the complete 6-section homepage with scroll animations, interactive SVG charts, and responsive design.

**Architecture:** Next.js App Router with Server Components for SEO-critical content and Client Components only for interactive/animated elements. Each homepage section lives in its own component folder under `app/components/`. Shared scroll animation and layout wrappers reduce duplication across sections.

**Tech Stack:** Next.js 15 (App Router), React 19, TypeScript 5.9, Tailwind CSS 4, Framer Motion 12, Embla Carousel (mobile Section 3), Lucide React (icons)

**Design Spec:** `docs/superpowers/specs/2026-03-22-homepage-full-design.md`

---

## File Structure

```
app/
├── layout.tsx                          # Root layout: fonts, metadata, Navbar
├── page.tsx                            # Homepage: assembles all 6 sections + JSON-LD
├── globals.css                         # Migrated from src/index.css (design tokens + Tailwind)
├── components/
│   ├── hero/
│   │   ├── index.ts                    # Barrel export (migrated from src/components/hero/)
│   │   ├── HeroSection.tsx             # 'use client' — root hero component
│   │   ├── HeroContent.tsx             # 'use client' — left-side text + CTA
│   │   ├── SimulationTheater.tsx       # 'use client' — two-phase interactive theater
│   │   ├── HUDLabel.tsx                # 'use client' — crisis detection labels
│   │   ├── DecisionCard.tsx            # 'use client' — decision simulation cards
│   │   ├── SimulationResult.tsx        # 'use client' — result panel
│   │   ├── ChaosFlowCanvas.tsx         # 'use client' — flow lines canvas
│   │   ├── DataRainCanvas.tsx          # 'use client' — matrix code rain canvas
│   │   ├── LiveBadge.tsx               # 'use client' — pulsing LIVE indicator
│   │   ├── DataCards.tsx               # 'use client' — data viz container
│   │   ├── AgentCards.tsx              # 'use client' — AI agent cards
│   │   ├── AgentDossier.tsx            # 'use client' — agent dossier
│   │   ├── StrategicRadar.tsx          # 'use client' — radar chart
│   │   ├── NeuralCanvas.tsx            # 'use client'
│   │   ├── ParticleCanvas.tsx          # 'use client'
│   │   ├── SimulationSphere.tsx        # 'use client'
│   │   ├── NeuralField.tsx             # 'use client'
│   │   ├── NeuralHead.tsx              # 'use client'
│   │   ├── NeuralHeadSilhouette.tsx    # 'use client'
│   │   ├── NeuralMap.tsx               # 'use client'
│   │   ├── NeuralOracle.tsx            # 'use client'
│   │   ├── CoordinateOverlay.tsx       # 'use client'
│   │   ├── PersonaCastLogo.tsx         # 'use client'
│   │   ├── cards/
│   │   │   ├── ConflictIndexCard.tsx   # 'use client'
│   │   │   ├── SentimentCard.tsx       # 'use client'
│   │   │   └── TrajectoryCard.tsx      # 'use client'
│   │   ├── theaterData.ts             # Pure data (no directive needed)
│   │   ├── useNeuralCanvas.ts         # 'use client' hook
│   │   ├── useParallax.ts             # 'use client' hook
│   │   └── useParticleSystem.ts       # 'use client' hook
│   ├── paradigm/
│   │   ├── ParadigmSection.tsx         # Server Component — title + SEO
│   │   ├── ComparisonPanel.tsx         # 'use client' — split-screen + scroll animation
│   │   ├── TraditionalChart.tsx        # SVG: chaotic grey lines
│   │   └── PredictionPath.tsx          # SVG: glowing prediction line + draw animation
│   ├── pillars/
│   │   ├── PillarsSection.tsx          # Server Component — title + SEO
│   │   ├── PillarCard.tsx              # 'use client' — card container + scroll animation
│   │   ├── RadarChart.tsx              # 'use client' — 6-axis persona radar SVG
│   │   ├── SentimentTimeline.tsx       # 'use client' — Morandi color band timeline SVG
│   │   └── ForceGraph.tsx              # 'use client' — stakeholder network SVG
│   ├── scenarios/
│   │   ├── ScenariosSection.tsx        # Server Component — title + SEO
│   │   ├── ScenarioCard.tsx            # 'use client' — scenario card + hover animation
│   │   └── scenarioData.ts            # Data: 3 scenarios (copy, colors, metrics)
│   ├── authority/
│   │   ├── AuthoritySection.tsx        # Server Component — title + SEO + OpenSpec link
│   │   ├── MethodologyPipeline.tsx     # 'use client' — 4-step flow + scroll animation
│   │   └── TrustMetrics.tsx            # 'use client' — countUp number animation
│   ├── footer/
│   │   ├── FooterSection.tsx           # Server Component — CTA copy + footer links
│   │   ├── CTAButton.tsx               # 'use client' — glow pulse animation
│   │   └── footerData.ts              # Data: footer link columns
│   └── shared/
│       ├── ScrollReveal.tsx            # 'use client' — scroll-triggered animation wrapper
│       ├── SectionWrapper.tsx          # Server Component — semantic <section> + layout
│       └── Navbar.tsx                  # 'use client' — extracted from hero, anchor scroll
```

---

## Task 1: Initialize Next.js Project

**Files:**
- Create: `package.json` (overwrite), `next.config.ts`, `tsconfig.json` (overwrite), `app/layout.tsx`, `app/page.tsx`, `app/globals.css`
- Delete: `src/main.tsx`, `src/App.tsx`, `vite.config.ts`, `tsconfig.app.json`, `tsconfig.node.json`
- Modify: `index.html` → delete (Next.js generates its own)
- Modify: `.gitignore` → add `.next/`

- [ ] **Step 1: Install Next.js and remove Vite**

```bash
npm install next@latest
npm uninstall vite @vitejs/plugin-react @tailwindcss/vite
npm install -D @types/node
```

Note: Keep `tailwindcss` (v4), `framer-motion`, `lucide-react`, `simplex-noise`, `react`, `react-dom`. Remove only Vite-specific packages.

- [ ] **Step 2: Create `next.config.ts`**

```typescript
// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
};

export default nextConfig;
```

- [ ] **Step 3: Update `tsconfig.json`**

Replace the existing `tsconfig.json` with Next.js-compatible config:

```json
{
  "compilerOptions": {
    "target": "ES2023",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 4: Update `package.json` scripts**

Replace the `scripts` section:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

- [ ] **Step 5: Create `app/globals.css`**

Copy the content of `src/index.css` to `app/globals.css`. The file is identical — all design tokens, keyframes, and utility classes carry over as-is.

- [ ] **Step 6: Create `app/layout.tsx`**

```tsx
import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-heading',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '800'],
  variable: '--font-body',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'PersonaCast — AI 戰略推演平台',
  description:
    '領先 72 小時的 AI 戰略預演。從人格建模到場景推演，PersonaCast 在關鍵決策發出前模擬公眾輿論走向，讓每一步都有數據支撐。',
  openGraph: {
    title: 'PersonaCast — AI 戰略推演平台',
    description: '領先 72 小時的 AI 戰略預演。掌握變數，定義結局。',
    locale: 'zh_TW',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PersonaCast — AI 戰略推演平台',
    description: '領先 72 小時的 AI 戰略預演。掌握變數，定義結局。',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="zh-Hant"
      className={`${plusJakarta.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <link rel="icon" href="/point_ico.ico" />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 7: Create minimal `app/page.tsx`**

```tsx
export default function HomePage() {
  return <main>PersonaCast</main>;
}
```

- [ ] **Step 8: Delete Vite-specific files**

```bash
rm -f vite.config.ts tsconfig.app.json tsconfig.node.json src/main.tsx src/App.tsx index.html
```

- [ ] **Step 9: Add `.next/` to `.gitignore`**

Append `.next/` to the existing `.gitignore`.

- [ ] **Step 10: Verify build**

```bash
npm run dev
```

Expected: Next.js dev server starts at localhost:3000, shows "PersonaCast" text. No TypeScript or build errors.

- [ ] **Step 11: Commit**

```bash
git add -A
git commit -m "chore: migrate from Vite to Next.js App Router"
```

---

## Task 2: Migrate Hero Section

**Files:**
- Move: all files from `src/components/hero/` → `app/components/hero/`
- Modify: all `.tsx` component files (add `'use client'` directive)
- Modify: `app/page.tsx` (import and render HeroSection)

- [ ] **Step 1: Move hero components to `app/components/`**

```bash
mkdir -p app/components
cp -r src/components/hero app/components/hero
```

- [ ] **Step 2: Add `'use client'` to all hero component files**

Add `'use client';` as the first line of every `.tsx` file in `app/components/hero/` and `app/components/hero/cards/`. Also add to all `.ts` hook files (`useNeuralCanvas.ts`, `useParallax.ts`, `useParticleSystem.ts`).

Do NOT add `'use client'` to:
- `index.ts` (barrel export)
- `theaterData.ts` (pure data)

- [ ] **Step 3: Update `app/page.tsx` to render HeroSection**

```tsx
import { HeroSection } from './components/hero';

export default function HomePage() {
  return (
    <main>
      <HeroSection />
    </main>
  );
}
```

- [ ] **Step 4: Update font references in `app/globals.css`**

The `@theme` block in `globals.css` defines `--font-heading`, `--font-body`, `--font-mono` with Google Font names. Next.js `next/font` applies CSS variables via class names on `<html>`. Update the `@theme` block to reference these CSS variables instead of font names:

```css
@theme {
  /* ... color tokens unchanged ... */
  --font-heading: var(--font-heading), system-ui, sans-serif;
  --font-body: var(--font-body), system-ui, sans-serif;
  --font-mono: var(--font-mono), ui-monospace, monospace;
}
```

Note: This creates a circular reference with the Tailwind `@theme` names. The actual fix is to rename the `next/font` CSS variables to avoid collision (e.g., `--font-gf-heading`), then reference them in `@theme`. Test carefully — if fonts render correctly without changes (because Tailwind 4 picks up the `next/font` variables directly), skip this step.

- [ ] **Step 5: Verify Hero Section renders correctly**

```bash
npm run dev
```

Expected: Hero Section renders identically to the Vite version — Canvas animations, HUD labels, decision cards, Navbar all working. No console errors about hydration mismatches.

- [ ] **Step 6: Delete old `src/` directory**

```bash
rm -rf src/
```

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: migrate Hero Section to Next.js App Router"
```

---

## Task 3: Extract Navbar + Build Shared Components

**Files:**
- Create: `app/components/shared/Navbar.tsx`
- Create: `app/components/shared/ScrollReveal.tsx`
- Create: `app/components/shared/SectionWrapper.tsx`
- Modify: `app/layout.tsx` (add Navbar)
- Modify: `app/components/hero/HeroSection.tsx` (remove Navbar import)

- [ ] **Step 1: Create `app/components/shared/Navbar.tsx`**

Copy `app/components/hero/Navbar.tsx` to `app/components/shared/Navbar.tsx`. Modify the copy:
- Add `'use client';` at top (for scroll behavior)
- Update nav links to use anchor scroll (`href="#paradigm"`, `href="#pillars"`, `href="#scenarios"`, etc.)
- Add smooth scroll onClick handler:

```tsx
'use client';

import { useCallback } from 'react';

export function Navbar() {
  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // ... existing Navbar JSX with onClick handlers calling scrollTo
  // Replace href="#" on nav links with onClick={() => scrollTo('section-id')}
}
```

Keep the existing styling (backdrop blur, z-50, glassmorphism) unchanged.

- [ ] **Step 2: Create `app/components/shared/ScrollReveal.tsx`**

```tsx
'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  distance?: number;
  className?: string;
}

const directionMap = {
  up: { y: 1, x: 0 },
  down: { y: -1, x: 0 },
  left: { x: 1, y: 0 },
  right: { x: -1, y: 0 },
};

export function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  distance = 20,
  className,
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const d = directionMap[direction];

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        x: d.x * distance,
        y: d.y * distance,
      }}
      animate={
        isInView
          ? { opacity: 1, x: 0, y: 0 }
          : { opacity: 0, x: d.x * distance, y: d.y * distance }
      }
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 3: Create `app/components/shared/SectionWrapper.tsx`**

```tsx
interface SectionWrapperProps {
  children: React.ReactNode;
  id: string;
  ariaLabel: string;
  className?: string;
}

export function SectionWrapper({
  children,
  id,
  ariaLabel,
  className,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={`py-20 lg:py-28 ${className ?? ''}`}
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">{children}</div>
    </section>
  );
}
```

- [ ] **Step 4: Move Navbar to layout.tsx**

Update `app/layout.tsx` to import and render the shared Navbar:

```tsx
import { Navbar } from './components/shared/Navbar';

// ... in the body:
<body>
  <Navbar />
  {children}
</body>
```

- [ ] **Step 5: Remove Navbar from HeroSection**

In `app/components/hero/HeroSection.tsx`:
- Remove the `import` of `Navbar` from `./Navbar`
- Remove `<Navbar />` from the JSX return

Do NOT delete `app/components/hero/Navbar.tsx` yet (keep as reference until shared version is verified).

- [ ] **Step 6: Verify Navbar renders globally and Hero still works**

```bash
npm run dev
```

Expected: Navbar appears fixed at top across the page. Hero Section renders below it without visual changes. Scroll anchor links don't navigate yet (only hero section exists).

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: extract Navbar to shared, add ScrollReveal and SectionWrapper"
```

---

## Task 4: Section 2 — Paradigm Shift

**Files:**
- Create: `app/components/paradigm/ParadigmSection.tsx`
- Create: `app/components/paradigm/ComparisonPanel.tsx`
- Create: `app/components/paradigm/TraditionalChart.tsx`
- Create: `app/components/paradigm/PredictionPath.tsx`
- Modify: `app/page.tsx` (add Section 2)

- [ ] **Step 1: Create `app/components/paradigm/TraditionalChart.tsx`**

SVG component showing 3 overlapping chaotic grey lines + faded question mark. No animation — pure SVG. Accepts `className` prop.

```tsx
export function TraditionalChart({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 280 100" className={className} role="img" aria-label="雜亂的傳統監測折線圖">
      {/* 3 overlapping polylines in grey #444-#666 */}
      {/* Central "?" text element at 50% opacity */}
    </svg>
  );
}
```

Use the exact SVG paths from the design mockup. Colors: strokes `#555`, `#444`, `#666` at varying opacities.

- [ ] **Step 2: Create `app/components/paradigm/PredictionPath.tsx`**

```tsx
'use client';
```

SVG component showing a clean ascending prediction line (Strategic Blue → Aurora Cyan gradient) with glow filter. Three data nodes at T+0h, T+36h, T+72h. Includes draw animation triggered by `animate` boolean prop:

- Line uses `stroke-dashoffset` animation to draw from left to right
- Nodes fade in sequentially after line completes

Props: `animate: boolean`, `className?: string`

- [ ] **Step 3: Create `app/components/paradigm/ComparisonPanel.tsx`**

```tsx
'use client';
```

Client component that:
- Uses `ScrollReveal` to animate left panel from left, right panel from right
- Contains the split-screen layout (flex row, responsive to flex col on mobile)
- Left panel: grey background, `TraditionalChart`, tag badges
- Right panel: blue-tinted background, `PredictionPath`, tag badges
- Passes `animate` prop to `PredictionPath` based on `useInView`

Layout details:
- Container: `rounded-xl border border-white/5 overflow-hidden`
- Left: `flex-1 bg-white/[0.02] p-7 border-r border-white/5`
- Right: `flex-1 bg-strategic-blue/[0.04] p-7`
- Mobile (`<768px`): `flex-col` — left stacks on top of right
- Tags: small pills with appropriate colors (grey for traditional, cyan for PersonaCast)

- [ ] **Step 4: Create `app/components/paradigm/ParadigmSection.tsx`**

Server Component (no `'use client'`):

```tsx
import { SectionWrapper } from '../shared/SectionWrapper';
import { ComparisonPanel } from './ComparisonPanel';

export function ParadigmSection() {
  return (
    <SectionWrapper id="paradigm" ariaLabel="範式轉移">
      <div className="text-center mb-12">
        <p className="text-xs tracking-[3px] text-strategic-blue uppercase font-mono mb-2">
          PARADIGM SHIFT
        </p>
        <h2 className="text-2xl lg:text-4xl font-extrabold text-white mb-3">
          別只看過去，讓我們定義未來。
        </h2>
        <p className="text-sm text-mist-blue-gray max-w-xl mx-auto">
          傳統工具告訴你聲明發出後「發生了什麼」，PersonaCast
          則在聲明發出前告訴你「將會發生什麼」。
        </p>
      </div>
      <ComparisonPanel />
    </SectionWrapper>
  );
}
```

- [ ] **Step 5: Add Section 2 to `app/page.tsx`**

```tsx
import { HeroSection } from './components/hero';
import { ParadigmSection } from './components/paradigm/ParadigmSection';

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <ParadigmSection />
    </main>
  );
}
```

- [ ] **Step 6: Verify Section 2 renders and animations work**

```bash
npm run dev
```

Expected: Scroll past Hero → Section 2 appears with split-screen comparison. Left panel slides from left, right panel slides from right. Prediction line draws on scroll. Responsive: stacks vertically on mobile viewport.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: add Section 2 (Paradigm Shift) with split-screen comparison"
```

---

## Task 5: Section 3 — Core Pillars

**Files:**
- Create: `app/components/pillars/PillarsSection.tsx`
- Create: `app/components/pillars/PillarCard.tsx`
- Create: `app/components/pillars/RadarChart.tsx`
- Create: `app/components/pillars/SentimentTimeline.tsx`
- Create: `app/components/pillars/ForceGraph.tsx`
- Modify: `app/page.tsx` (add Section 3)

- [ ] **Step 1: Create `app/components/pillars/RadarChart.tsx`**

```tsx
'use client';
```

SVG radar chart with 6 axes (政治立場, 決斷力, 風險偏好, 社會信任, 情緒穩定, 媒體敏感). Static polygon with data points. CSS animation: `animate-[spin_30s_linear_infinite]` on the data polygon group. Hover: animation pauses via `[&:hover]:animation-play-state-paused` (or equivalent Tailwind).

Header label: "AGENT: 陳立峰 · ENTJ" in mono font.

Colors: Strategic Blue (#769EDB) for fill/stroke. Grid lines at `rgba(118,158,219,0.1)`.

- [ ] **Step 2: Create `app/components/pillars/SentimentTimeline.tsx`**

```tsx
'use client';
```

SVG showing 6 vertical color bands (Morandi-inspired) representing T+0h to T+72h sentiment progression. Colors transition from Dried Rose → Insight Gold → Strategic Blue → Aurora Cyan.

Animation: CSS `riskBreathing` keyframe (already defined in globals.css) applied to bands for opacity pulsing. Hover: shows tooltip with time period label.

Header label: "SENTIMENT PULSE · 72H WINDOW" in mono font.

Below the chart: two small badges "PUBLIC 公共輿論" and "INTERNAL 內部決策" in gold.

- [ ] **Step 3: Create `app/components/pillars/ForceGraph.tsx`**

```tsx
'use client';
```

SVG stakeholder network with pre-positioned nodes (NOT actual force simulation — static positions with CSS animation for floating effect).

Structure:
- 1 central node (r=6, Dried Rose)
- 6 secondary nodes (r=3-4) connected to center
- 8-10 peripheral small nodes (r=1.5-2) with faint connections
- All connections as `<line>` elements with low-opacity Dried Rose

Animation: Each node has a CSS animation with slight random `translate` offset (use inline `animation-delay` for variation). Hover on a node: brighten that node + its direct connections (manage via useState tracking hovered node ID).

Below chart: three stat boxes "80 NODES / 30 RELATIONS / 132 STRATEGIC" in Dried Rose.

- [ ] **Step 4: Create `app/components/pillars/PillarCard.tsx`**

```tsx
'use client';
```

Generic card container that accepts:
- `title: string` (e.g., "PersonaLab")
- `subtitle: string` (e.g., "模擬真實社會人格")
- `icon: string` (emoji)
- `color: string` (Tailwind color class prefix, e.g., "strategic-blue")
- `children: React.ReactNode` (the interactive chart component)
- `footer: React.ReactNode` (formula/tags/stats below chart)
- `description: string` (tech highlight text)
- `index: number` (for stagger delay calculation)

Uses `ScrollReveal` with `direction="up"` and `delay={index * 0.15}`.

Card styling: `rounded-xl border p-6` with color-tinted background and border.

- [ ] **Step 5: Create `app/components/pillars/PillarsSection.tsx`**

Server Component:

```tsx
import { SectionWrapper } from '../shared/SectionWrapper';
import { PillarCard } from './PillarCard';
import { RadarChart } from './RadarChart';
import { SentimentTimeline } from './SentimentTimeline';
import { ForceGraph } from './ForceGraph';

export function PillarsSection() {
  return (
    <SectionWrapper id="pillars" ariaLabel="三大戰略支柱">
      {/* Centered title: eyebrow + h2 + subtitle */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        <PillarCard
          title="PersonaLab"
          subtitle="模擬真實社會人格"
          icon="🧬"
          color="strategic-blue"
          index={0}
          description="基於 Zep 記憶引擎，賦予 AI 智能體穩定的政治與情緒立場。"
          footer={/* P_Final formula display */}
        >
          <RadarChart />
        </PillarCard>

        <PillarCard
          title="Casting Arena"
          subtitle="72 小時劇場推演"
          icon="⚔️"
          color="insight-gold"
          index={1}
          description="雙面板並行模擬，即時偵測情緒脈衝 (Sentiment Pulse)。"
          footer={/* PUBLIC / INTERNAL badges */}
        >
          <SentimentTimeline />
        </PillarCard>

        <PillarCard
          title="Strategy Graph"
          subtitle="全域利益關係圖譜"
          icon="🕸️"
          color="dried-rose"
          index={2}
          description="梳理 80 個節點與 30 種關係，解析事件擴散的底層邏輯。"
          footer={/* 80/30/132 stat boxes */}
        >
          <ForceGraph />
        </PillarCard>
      </div>
    </SectionWrapper>
  );
}
```

Responsive: The grid handles breakpoints automatically — 1 col on mobile, 2 on tablet (with 3rd card centered via `md:col-span-2 lg:col-span-1`), 3 on desktop.

Mobile carousel (swipeable): Install `embla-carousel-react` and wrap the grid in a carousel container on mobile. Use a media query or Tailwind `lg:grid` / `max-lg:flex max-lg:overflow-x-auto max-lg:snap-x` approach. The simpler CSS snap-scroll approach is preferred over adding a library dependency.

- [ ] **Step 6: Add Section 3 to `app/page.tsx`**

```tsx
import { PillarsSection } from './components/pillars/PillarsSection';
// Add after ParadigmSection in the JSX
```

- [ ] **Step 7: Verify Section 3 renders with all three interactive charts**

```bash
npm run dev
```

Expected: Three cards appear below Section 2. Radar chart rotates slowly, sentiment bands pulse, force graph nodes float. Cards stagger in on scroll. Responsive: stacks on mobile.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: add Section 3 (Core Pillars) with interactive SVG charts"
```

---

## Task 6: Section 4 — Scenario Entry

**Files:**
- Create: `app/components/scenarios/scenarioData.ts`
- Create: `app/components/scenarios/ScenarioCard.tsx`
- Create: `app/components/scenarios/ScenariosSection.tsx`
- Modify: `app/page.tsx` (add Section 4)

- [ ] **Step 1: Create `app/components/scenarios/scenarioData.ts`**

```typescript
export const CTA_PLACEHOLDER = '#';

export interface ScenarioData {
  id: string;
  title: string;
  description: string;
  color: string;          // Tailwind color name (e.g., 'alert-red')
  hex: string;            // Hex for SVG (e.g., '#FF4D4D')
  alertLabel: string;     // e.g., 'ALERT'
  alertTitle: string;     // e.g., '衝突指數 > 70%'
  alertSubtitle: string;  // e.g., '醜聞擴散速率異常'
  meterLabel: string;     // e.g., 'CRISIS T-48H'
  meterPercent: number;   // e.g., 70
  backgroundType: 'angular' | 'shield' | 'wave';
}

export const scenarios: ScenarioData[] = [
  {
    id: 'political',
    title: '政治選戰',
    description: '醜聞爆發與議題置換的 72 小時壓力測試。',
    color: 'alert-red',
    hex: '#FF4D4D',
    alertLabel: 'ALERT',
    alertTitle: '衝突指數 > 70%',
    alertSubtitle: '醜聞擴散速率異常',
    meterLabel: 'CRISIS T-48H',
    meterPercent: 70,
    backgroundType: 'angular',
  },
  {
    id: 'corporate',
    title: '企業公關',
    description: '產品合規與品牌聲譽的風險控管。',
    color: 'strategic-blue',
    hex: '#769EDB',
    alertLabel: 'STRATEGY',
    alertTitle: '議題置換策略',
    alertSubtitle: '模擬報告 #PR-2847',
    meterLabel: 'BRAND RISK',
    meterPercent: 45,
    backgroundType: 'shield',
  },
  {
    id: 'financial',
    title: '金融社會',
    description: '群體情緒對市場動盪的連鎖反應預演。',
    color: 'insight-gold',
    hex: '#FFB800',
    alertLabel: 'CASCADE',
    alertTitle: '連鎖反應偵測',
    alertSubtitle: '群體恐慌指數: 62%',
    meterLabel: 'MARKET IMPACT',
    meterPercent: 62,
    backgroundType: 'wave',
  },
];
```

- [ ] **Step 2: Create `app/components/scenarios/ScenarioCard.tsx`**

```tsx
'use client';
```

Client component receiving `ScenarioData` + `index` props. Structure:

1. **Image area** (h-40 lg:h-[160px]): Contains an inline SVG background (switch on `backgroundType`), two glassmorphism UI overlay divs (alert window top-right, meter bottom-left)
2. **Content area**: Title (h3), description (p), "進入沙盒 →" link

Hover animation (Framer Motion `whileHover`):
- Card: `y: -4`, border opacity increase
- Background SVG: `scale: 1.05`
- Arrow text: `x: 4`

Uses `ScrollReveal` with `delay={index * 0.2}`.

Each `backgroundType` renders a different SVG pattern:
- `angular`: Triangular shapes + pulse circles (political tension)
- `shield`: Rectangles + hexagonal shield (corporate protection)
- `wave`: Sinusoidal curves + candlestick lines (market volatility)

- [ ] **Step 3: Create `app/components/scenarios/ScenariosSection.tsx`**

Server Component:

```tsx
import { SectionWrapper } from '../shared/SectionWrapper';
import { ScenarioCard } from './ScenarioCard';
import { scenarios } from './scenarioData';

export function ScenariosSection() {
  return (
    <SectionWrapper id="scenarios" ariaLabel="應用場景">
      {/* Centered title: eyebrow SCENARIO ENTRY + h2 + subtitle */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
        {scenarios.map((scenario, i) => (
          <ScenarioCard key={scenario.id} data={scenario} index={i} />
        ))}
      </div>
    </SectionWrapper>
  );
}
```

- [ ] **Step 4: Add Section 4 to `app/page.tsx`**

```tsx
import { ScenariosSection } from './components/scenarios/ScenariosSection';
```

- [ ] **Step 5: Verify Section 4 renders with hover effects**

```bash
npm run dev
```

Expected: Three scenario cards with abstract SVG backgrounds and glassmorphism UI overlays. Hover: card lifts, background scales, arrow shifts. Cards stagger in on scroll. Responsive: stacks vertically on mobile.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add Section 4 (Scenario Entry) with abstract background cards"
```

---

## Task 7: Section 5 — Authority

**Files:**
- Create: `app/components/authority/AuthoritySection.tsx`
- Create: `app/components/authority/MethodologyPipeline.tsx`
- Create: `app/components/authority/TrustMetrics.tsx`
- Modify: `app/page.tsx` (add Section 5)

- [ ] **Step 1: Create `app/components/authority/TrustMetrics.tsx`**

```tsx
'use client';
```

Client component showing 4 metric boxes in a row. Each box displays a number that counts up from 0 to its target value when scrolled into view.

Props: none (data is hardcoded — 132, 80, "100%", "3 層").

Use `useInView` to trigger counting. Animation: increment number over ~1.5s using `requestAnimationFrame`. For non-numeric values ("100%", "3 層"), animate the numeric part only.

Layout: `grid grid-cols-2 lg:grid-cols-4 gap-3`. Each cell: centered, Strategic Blue number, mono label below.

- [ ] **Step 2: Create `app/components/authority/MethodologyPipeline.tsx`**

```tsx
'use client';
```

Client component showing 4 step cards connected by animated arrows.

Data (hardcoded array):
```typescript
const steps = [
  { icon: 'Radio', title: '數據收集', subtitle: 'DATA INGESTION', detail: '多源輿情抓取\n結構化事件解析', color: 'strategic-blue' },
  { icon: 'Dna', title: '人格建模', subtitle: 'PERSONA MODELING', detail: 'P_Final 公式計算\nZep 記憶注入', color: 'strategic-blue' },
  { icon: 'Swords', title: '場景推演', subtitle: 'SIMULATION', detail: '72 小時多路徑模擬\n3.4M+ 場景分支', color: 'aurora-cyan' },
  { icon: 'CheckCircle', title: '結果驗證', subtitle: 'VALIDATION', detail: '因果鏈追蹤\n可解釋性報告', color: 'aurora-cyan' },
];
```

Icons: Use Lucide React (`Radio`, `Dna`, `Swords`, `CheckCircle`) instead of emoji for professional look (Lucide is already a dependency).

Layout:
- Desktop: horizontal flex with SVG arrows between cards. Each card uses `ScrollReveal` with stagger.
- Tablet: 2×2 grid with connecting lines
- Mobile: vertical timeline with alternating left/right cards

Arrows: SVG `<line>` + `<polygon>` with gradient from Strategic Blue to Aurora Cyan. Animate `stroke-dashoffset` on scroll trigger.

- [ ] **Step 3: Create `app/components/authority/AuthoritySection.tsx`**

Server Component:

```tsx
import { SectionWrapper } from '../shared/SectionWrapper';
import { MethodologyPipeline } from './MethodologyPipeline';
import { TrustMetrics } from './TrustMetrics';

export function AuthoritySection() {
  return (
    <SectionWrapper id="authority" ariaLabel="方法論與信任">
      {/* Centered title: eyebrow METHODOLOGY + h2 + subtitle */}
      <MethodologyPipeline />
      <TrustMetrics />
      {/* OpenSpec callout banner */}
      <div className="mt-6 rounded-xl border border-strategic-blue/10 bg-strategic-blue/[0.04] p-4 lg:p-5 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-white">OpenSpec 開放規格文件</p>
          <p className="text-xs text-mist-blue-gray">
            完整的系統架構與模擬框架規格，公開透明，歡迎技術審查。
          </p>
        </div>
        <a
          href="#"
          className="shrink-0 rounded-md border border-strategic-blue/30 px-4 py-2 text-xs text-strategic-blue hover:bg-strategic-blue/10 transition-colors"
        >
          檢視規格文件 →
        </a>
      </div>
    </SectionWrapper>
  );
}
```

SEO: The `<ol>` with methodology steps is rendered in the Server Component as visually-hidden text for search engines, while the visual pipeline is the Client Component.

- [ ] **Step 4: Add Section 5 to `app/page.tsx`**

```tsx
import { AuthoritySection } from './components/authority/AuthoritySection';
```

- [ ] **Step 5: Verify Section 5 renders with pipeline animation and countUp**

```bash
npm run dev
```

Expected: 4-step pipeline flows from left to right on scroll. Arrows draw sequentially. Numbers count up (132, 80, 100%, 3). OpenSpec banner at bottom.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add Section 5 (Authority) with methodology pipeline and trust metrics"
```

---

## Task 8: Section 6 — Final CTA + Footer

**Files:**
- Create: `app/components/footer/footerData.ts`
- Create: `app/components/footer/CTAButton.tsx`
- Create: `app/components/footer/FooterSection.tsx`
- Modify: `app/page.tsx` (add Section 6)
- Modify: `app/globals.css` (add CTA glow keyframe)

- [ ] **Step 1: Create `app/components/footer/footerData.ts`**

```typescript
export const CTA_HREF = '#';

export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

export const footerColumns: FooterColumn[] = [
  {
    title: '產品',
    links: [
      { label: 'PersonaLab', href: '#' },
      { label: 'Casting Arena', href: '#' },
      { label: 'Strategy Graph', href: '#' },
      { label: '應用場景', href: '#' },
    ],
  },
  {
    title: '資源',
    links: [
      { label: 'OpenSpec 規格文件', href: '#' },
      { label: '技術文件', href: '#' },
      { label: 'API 文件', href: '#' },
      { label: '部落格', href: '#' },
    ],
  },
  {
    title: '公司',
    links: [
      { label: '關於我們', href: '#' },
      { label: '聯絡我們', href: '#' },
      { label: '隱私政策', href: '#' },
      { label: '服務條款', href: '#' },
    ],
  },
];
```

- [ ] **Step 2: Add CTA glow keyframe to `app/globals.css`**

```css
@keyframes ctaGlow {
  0%, 100% { box-shadow: 0 4px 20px rgba(118,158,219,0.3), 0 0 40px rgba(118,158,219,0.1); }
  50% { box-shadow: 0 4px 28px rgba(118,158,219,0.45), 0 0 50px rgba(118,158,219,0.15); }
}
```

- [ ] **Step 3: Create `app/components/footer/CTAButton.tsx`**

```tsx
'use client';

import { CTA_HREF } from './footerData';

export function CTAButton() {
  return (
    <a
      href={CTA_HREF}
      className="inline-block rounded-lg bg-gradient-to-br from-strategic-blue to-[#5A82C4] px-9 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:from-[#8BAEE5] hover:to-[#6B92D0] hover:-translate-y-px active:translate-y-px"
      style={{ animation: 'ctaGlow 3s ease-in-out infinite' }}
    >
      立即預約專屬演示
    </a>
  );
}
```

- [ ] **Step 4: Create `app/components/footer/FooterSection.tsx`**

Server Component:

```tsx
import { SectionWrapper } from '../shared/SectionWrapper';
import { ScrollReveal } from '../shared/ScrollReveal';
import { CTAButton } from './CTAButton';
import { footerColumns } from './footerData';

export function FooterSection() {
  return (
    <>
      {/* CTA Area */}
      <SectionWrapper id="cta" ariaLabel="立即行動">
        <ScrollReveal>
          <div className="text-center relative">
            {/* Subtle background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] bg-[radial-gradient(ellipse,rgba(118,158,219,0.06),transparent_70%)] pointer-events-none" />
            <p className="text-xs tracking-[3px] text-strategic-blue uppercase font-mono mb-3 relative">
              TAKE ACTION
            </p>
            <h2 className="text-2xl lg:text-4xl font-extrabold text-white mb-2 relative">
              停止在不確定性中博弈。
            </h2>
            <p className="text-sm text-mist-blue-gray max-w-md mx-auto mb-7 relative">
              讓 PersonaCast 為您的下一個關鍵決策，提前 72 小時預演所有可能。
            </p>
            <div className="relative">
              <CTAButton />
            </div>
            <p className="mt-3.5 text-xs text-[#555] relative">
              免費 · 30 分鐘 · 專人導覽
            </p>
          </div>
        </ScrollReveal>
      </SectionWrapper>

      {/* Footer */}
      <footer className="border-t border-white/[0.04]">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand column (spans 2 on mobile, 1 on desktop) */}
            <div className="col-span-2 lg:col-span-1">
              <p className="text-base mb-3">
                <span className="font-semibold text-white">Persona</span>
                <span className="font-extrabold text-[#00E0C2]">Cast</span>
              </p>
              <p className="text-xs text-[#555] leading-relaxed mb-4">
                AI 驅動的戰略推演平台。
                <br />
                領先 72 小時，掌握變數，定義結局。
              </p>
              {/* Social icons: X, LinkedIn, GitHub */}
              <div className="flex gap-2.5">
                {['𝕏', 'in', 'GH'].map((icon) => (
                  <a
                    key={icon}
                    href="#"
                    className="flex h-7 w-7 items-center justify-center rounded-md bg-white/[0.04] border border-white/[0.06] text-xs text-[#555] hover:text-white hover:border-white/10 transition-colors"
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Link columns */}
            {footerColumns.map((col) => (
              <div key={col.title}>
                <p className="text-[10px] font-semibold tracking-widest uppercase text-strategic-blue font-mono mb-3">
                  {col.title}
                </p>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-xs text-mist-blue-gray hover:text-white transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.04] py-4 px-6 lg:px-8">
          <div className="mx-auto max-w-4xl flex justify-between items-center">
            <p className="text-[9px] text-[#333]">
              © 2026 PersonaCast. All rights reserved.
            </p>
            <p className="text-[9px] text-[#333]">Taipei, Taiwan 🇹🇼</p>
          </div>
        </div>
      </footer>
    </>
  );
}
```

- [ ] **Step 5: Add Section 6 to `app/page.tsx`**

```tsx
import { FooterSection } from './components/footer/FooterSection';
// Add as the last element inside <main>, or after </main>
```

Note: The `<footer>` element should be outside `<main>`. Structure:

```tsx
export default function HomePage() {
  return (
    <>
      <main>
        <HeroSection />
        <ParadigmSection />
        <PillarsSection />
        <ScenariosSection />
        <AuthoritySection />
      </main>
      <FooterSection />
    </>
  );
}
```

- [ ] **Step 6: Verify Section 6 and footer render correctly**

```bash
npm run dev
```

Expected: CTA section with pulsing glow button, then 4-column footer below. Button has hover/active states. Mobile: footer stacks to single column.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: add Section 6 (Final CTA + Footer)"
```

---

## Task 9: SEO + JSON-LD + Final Polish

**Files:**
- Modify: `app/page.tsx` (add JSON-LD structured data)
- Modify: `app/globals.css` (add reduced-motion rules for new sections)
- Modify: `app/components/shared/Navbar.tsx` (verify anchor links work for all sections)

- [ ] **Step 1: Add JSON-LD structured data to `app/page.tsx`**

```tsx
import Script from 'next/script';

// Inside HomePage component, before the JSX return:
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'PersonaCast',
  applicationCategory: 'BusinessApplication',
  description: '領先 72 小時的 AI 戰略預演平台。從人格建模到場景推演，在關鍵決策發出前模擬公眾輿論走向。',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    description: '免費演示預約',
  },
  publisher: {
    '@type': 'Organization',
    name: 'PersonaCast',
    url: 'https://personacast.io',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Taipei',
      addressCountry: 'TW',
    },
  },
};

// In the JSX, add before <main>:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
/>
```

- [ ] **Step 2: Add reduced-motion rules for new sections to `app/globals.css`**

```css
@media (prefers-reduced-motion: reduce) {
  /* Disable all scroll-triggered animations */
  [data-motion] {
    animation: none !important;
    transition: none !important;
  }

  /* Disable radar chart rotation */
  .animate-spin {
    animation: none !important;
  }

  /* Disable CTA glow */
  .cta-glow {
    animation: none !important;
  }

  /* Disable force graph floating */
  .animate-float {
    animation: none !important;
  }
}
```

Also ensure `ScrollReveal` respects this — add a `useReducedMotion` check from Framer Motion:

In `ScrollReveal.tsx`, import `useReducedMotion` and skip animation if true (render children directly).

- [ ] **Step 3: Verify all Navbar anchor links scroll to correct sections**

Each section has an `id` set via `SectionWrapper`:
- `#paradigm` → Section 2
- `#pillars` → Section 3
- `#scenarios` → Section 4
- `#authority` → Section 5
- `#cta` → Section 6

Update Navbar link text and targets to match:
- 核心推演 → `#paradigm`
- 三大支柱 → `#pillars`
- 應用場景 → `#scenarios`
- 技術方法 → `#authority`
- 預約演示 (CTA button) → `#cta`

- [ ] **Step 4: Full visual walkthrough**

```bash
npm run dev
```

Walk through the entire page top to bottom:
1. Hero Section loads with full-screen canvas animations
2. Scroll → Section 2 comparison panels slide in from sides
3. Scroll → Section 3 cards stagger in, charts animate
4. Scroll → Section 4 scenario cards stagger in, hover effects work
5. Scroll → Section 5 pipeline steps cascade left-to-right, numbers count up
6. Scroll → Section 6 CTA fades in with glow button, footer visible below
7. Navbar links scroll to correct sections
8. Test mobile viewport (Chrome DevTools → responsive)
9. Test `prefers-reduced-motion` (Chrome DevTools → Rendering → Emulate)

- [ ] **Step 5: Build check**

```bash
npm run build
```

Expected: Build succeeds with no TypeScript errors. Check for any SSR/hydration warnings.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add SEO structured data, reduced-motion support, finalize navigation"
```

---

## Task 10: Cleanup

**Files:**
- Delete: `app/components/hero/Navbar.tsx` (old copy, replaced by shared version)
- Verify: no unused imports or dead code

- [ ] **Step 1: Delete old Navbar from hero folder**

```bash
rm app/components/hero/Navbar.tsx
```

- [ ] **Step 2: Verify hero barrel export doesn't reference Navbar**

Check `app/components/hero/index.ts` — it only exports `HeroSection`, so no change needed.

- [ ] **Step 3: Verify `HeroSection.tsx` no longer imports from `./Navbar`**

This was handled in Task 3 Step 5, but double-check.

- [ ] **Step 4: Final build and visual check**

```bash
npm run build && npm run start
```

Expected: Production build runs cleanly. All sections render. No console errors.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: cleanup old Navbar, verify build"
```
