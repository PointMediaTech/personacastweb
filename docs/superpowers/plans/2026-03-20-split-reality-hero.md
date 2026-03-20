# Split Reality Hero Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the right-side NeuralCanvas + AgentDossiers with a split-screen "parallel universe" visual using flat illustrations and frosted-glass data overlays.

**Architecture:** Single new component `SplitReality.tsx` replaces two existing components in `HeroSection.tsx`. Uses static images (with gradient placeholders until assets arrive) + Framer Motion animations + CSS backdrop-blur overlays. No Canvas/WebGL.

**Tech Stack:** React, TypeScript, Framer Motion, Tailwind CSS v4

**Spec:** `docs/superpowers/specs/2026-03-20-split-reality-hero-design.md`

---

## File Structure

| Action | File | Responsibility |
|--------|------|----------------|
| Create | `src/components/hero/SplitReality.tsx` | Split-reality visual: two world halves, fracture line, outcome overlays, all animations |
| Modify | `src/components/hero/HeroSection.tsx` | Swap NeuralCanvas + AgentDossiers import → SplitReality |
| Create | `public/images/hero/.gitkeep` | Placeholder for illustration assets directory |

---

### Task 1: Create SplitReality component with placeholder backgrounds

**Files:**
- Create: `src/components/hero/SplitReality.tsx`
- Create: `public/images/hero/.gitkeep`

- [ ] **Step 1: Create the image asset directory**

```bash
mkdir -p public/images/hero
touch public/images/hero/.gitkeep
```

- [ ] **Step 2: Create SplitReality.tsx with full implementation**

Create `src/components/hero/SplitReality.tsx` with the complete component. This is a single-file component containing all sub-elements inline (not separate components, per spec).

The component structure:

```tsx
// src/components/hero/SplitReality.tsx
import { motion, useReducedMotion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as const;

// --- Data for each world half ---

interface WorldData {
  label: string;
  accentColor: string;
  accentRgb: string;
  dotShadow: string;
  headline: string;
  metrics: { value: string; label: string; color: string }[];
  imageSrc: string;
  placeholderGradient: string;
  borderColor: string;
}

const CALM_WORLD: WorldData = {
  label: 'WITH PERSONACAST',
  accentColor: '#769EDB',
  accentRgb: '118,158,219',
  dotShadow: '0 0 10px rgba(118,158,219,0.6)',
  headline: '品牌化危為轉機，支持率創新高',
  metrics: [
    { value: '+15%', label: '支持率', color: '#4ade80' },
    { value: '23%', label: '衝突指數', color: '#769EDB' },
  ],
  imageSrc: '/images/hero/calm-command-room.png',
  placeholderGradient: 'linear-gradient(135deg, #0a1628 0%, #122a4a 100%)',
  borderColor: 'rgba(118,158,219,0.2)',
};

const CHAOS_WORLD: WorldData = {
  label: 'WITHOUT PERSONACAST',
  accentColor: '#B57D7D',
  accentRgb: '181,125,125',
  dotShadow: '0 0 10px rgba(181,125,125,0.6)',
  headline: '品牌信任崩塌，市值蒸發 30%',
  metrics: [
    { value: '-28%', label: '支持率', color: '#B57D7D' },
    { value: '82%', label: '衝突指數', color: '#ef4444' },
  ],
  imageSrc: '/images/hero/chaos-command-room.png',
  placeholderGradient: 'linear-gradient(135deg, #1a0a0a 0%, #1f0d12 100%)',
  borderColor: 'rgba(181,125,125,0.2)',
};

// --- Sub-elements (inline, not exported) ---

function WorldHalf({
  data,
  imageDelay,
  labelDelay,
  overlayDelay,
}: {
  data: WorldData;
  imageDelay: number;
  labelDelay: number;
  overlayDelay: number;
}) {
  const reduced = useReducedMotion();

  return (
    <div className="relative flex-1 overflow-hidden">
      {/* Background image (or placeholder gradient) */}
      <motion.div
        className="absolute inset-0"
        initial={reduced ? {} : { opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: imageDelay, ease: EASE }}
      >
        <img
          src={data.imageSrc}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            // Fallback: hide broken image, gradient placeholder shows through
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
        {/* Placeholder gradient (visible when image hasn't loaded) */}
        <div
          className="absolute inset-0"
          style={{ background: data.placeholderGradient, zIndex: -1 }}
        />
      </motion.div>

      {/* Bottom gradient for text legibility */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent 40%, rgba(2,6,23,0.4) 100%)',
        }}
      />

      {/* World label (top-left) */}
      <motion.div
        className="absolute top-5 left-5 z-10 flex items-center gap-2"
        initial={reduced ? {} : { opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: labelDelay, ease: EASE }}
      >
        <span
          className="w-2 h-2 rounded-full animate-pulse"
          style={{ backgroundColor: data.accentColor, boxShadow: data.dotShadow }}
        />
        <span
          className="font-mono text-[10px] font-semibold uppercase tracking-[2px]"
          style={{ color: data.accentColor }}
        >
          {data.label}
        </span>
      </motion.div>

      {/* Outcome overlay (bottom) */}
      <motion.div
        className="absolute bottom-4 left-4 right-4 z-10"
        initial={reduced ? {} : { opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: overlayDelay, ease: EASE }}
      >
        <div
          className="bg-slate-950/70 backdrop-blur-md p-4"
          style={{
            borderRadius: '0.75rem',
            border: `1px solid ${data.borderColor}`,
          }}
        >
          <p className="font-body text-[15px] font-bold text-white mb-2 leading-snug">
            {data.headline}
          </p>
          <div className="flex gap-4">
            {data.metrics.map((m) => (
              <div key={m.label}>
                <span
                  className="font-mono text-xl font-bold"
                  style={{ color: m.color }}
                >
                  {m.value}
                </span>
                <span className="font-body text-[10px] text-[#64748b] ml-1">
                  {m.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function FractureLine() {
  const reduced = useReducedMotion();

  return (
    <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 z-10 pointer-events-none">
      {/* Dashed vertical line */}
      <motion.svg
        className="absolute inset-0 w-[2px] h-full"
        style={{ overflow: 'visible' }}
        initial={reduced ? {} : { scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1, delay: 0.8, ease: EASE }}
      >
        <line
          x1="1" y1="0" x2="1" y2="100%"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="1.5"
          strokeDasharray="6 10"
        />
      </motion.svg>

      {/* Center label pill */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-950/90 backdrop-blur-sm whitespace-nowrap"
        style={{
          borderRadius: '6px',
          border: '1px solid rgba(255,255,255,0.15)',
          padding: '4px 10px',
        }}
        initial={reduced ? {} : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2, ease: EASE }}
      >
        <span
          className="font-mono text-[8px] uppercase tracking-[2px]"
          style={{ color: 'rgba(255,255,255,0.4)' }}
        >
          同一場危機
        </span>
      </motion.div>
    </div>
  );
}

// --- Main export ---

export function SplitReality() {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className="absolute inset-0 flex overflow-hidden"
      initial={reduced ? {} : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, delay: 0.3, ease: EASE }}
    >
      <WorldHalf
        data={CALM_WORLD}
        imageDelay={0.5}
        labelDelay={1.0}
        overlayDelay={1.3}
      />
      <WorldHalf
        data={CHAOS_WORLD}
        imageDelay={0.7}
        labelDelay={1.2}
        overlayDelay={1.5}
      />
      <FractureLine />
    </motion.div>
  );
}
```

Key implementation notes:
- `WorldHalf` handles both worlds via data props — no duplication
- Image `onError` hides broken `<img>`, letting the placeholder gradient show through
- All Framer Motion animations respect `useReducedMotion`
- `font-body` and `font-mono` are Tailwind v4 tokens defined in `index.css` (Inter and JetBrains Mono)
- Border radius is hardcoded `0.75rem` per spec (not a Tailwind class, to be precise)

- [ ] **Step 3: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add src/components/hero/SplitReality.tsx public/images/hero/.gitkeep
git commit -m "feat: add SplitReality component with placeholder backgrounds"
```

---

### Task 2: Wire SplitReality into HeroSection

**Files:**
- Modify: `src/components/hero/HeroSection.tsx`

- [ ] **Step 1: Replace NeuralCanvas + AgentDossiers with SplitReality**

In `src/components/hero/HeroSection.tsx`:

1. Remove imports:
   ```tsx
   // REMOVE these two lines:
   import { NeuralCanvas } from './NeuralCanvas';
   import { AgentDossiers } from './AgentDossier';
   ```

2. Add import:
   ```tsx
   import { SplitReality } from './SplitReality';
   ```

3. Replace the right-side `<motion.div>` block (lines 25-34) that contains `<NeuralCanvas />` and `<AgentDossiers />`:

   ```tsx
   {/* Split Reality — right 62% */}
   <div
     className="absolute top-0 right-0 bottom-0 z-[1] hidden lg:block"
     style={{ width: '62vw' }}
   >
     <SplitReality />
   </div>
   ```

   Note: The container `<motion.div>` with its own fade-in is replaced by a plain `<div>` because `SplitReality` handles its own entrance animation. This avoids double-fading.

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Verify dev server renders correctly**

Run: `npm run dev`

Open browser and verify:
- Right side shows two halves with gradient placeholders (no images yet)
- "WITH PERSONACAST" / "WITHOUT PERSONACAST" labels appear with pulsing dots
- Dashed fracture line with "同一場危機" label in center
- Bottom overlay cards show headlines and metrics
- Animations play in sequence
- Left side (HeroContent, Navbar, LiveBadge) is unchanged

- [ ] **Step 4: Commit**

```bash
git add src/components/hero/HeroSection.tsx
git commit -m "feat: replace NeuralCanvas with SplitReality in HeroSection"
```

---

### Task 3: Swap in illustration assets (when available)

This task is executed **after the user generates illustrations** using the prompts in the spec.

**Files:**
- Add: `public/images/hero/calm-command-room.png`
- Add: `public/images/hero/chaos-command-room.png`

- [ ] **Step 1: Place illustration files**

Copy the user-provided images to:
- `public/images/hero/calm-command-room.png`
- `public/images/hero/chaos-command-room.png`

These filenames match `CALM_WORLD.imageSrc` and `CHAOS_WORLD.imageSrc` in `SplitReality.tsx`. No code changes needed.

- [ ] **Step 2: Verify images display correctly**

Run: `npm run dev`

Open browser and verify:
- Illustrations replace the gradient placeholders
- Images fill their halves with `object-fit: cover`
- Text overlays remain legible against the illustrations
- The contrast between calm (blue) and chaos (red) is immediately obvious

- [ ] **Step 3: Commit**

```bash
git add public/images/hero/
git commit -m "feat: add AI-generated illustrations for split-reality hero"
```
