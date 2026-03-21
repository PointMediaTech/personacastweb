# HUD Label Bilingual Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Chinese primary text with English secondary annotations to the 3 floating HUD labels on the hero section.

**Architecture:** Add `textZh` and `valueZh` fields to the data layer, then update the HUDLabel renderer to show a two-line layout: Chinese primary (14px) on top, English secondary (10px, low opacity) below. Typewriter animates Chinese only; English fades in after.

**Tech Stack:** React 19, TypeScript, Framer Motion, Tailwind CSS 4, Vite

**Spec:** `docs/superpowers/specs/2026-03-21-hud-label-bilingual-design.md`

---

### Task 1: Add bilingual fields to data layer

**Files:**
- Modify: `src/components/hero/theaterData.ts:5-13` (interface) and `src/components/hero/theaterData.ts:37-61` (data)

- [ ] **Step 1: Add `textZh` and `valueZh` to `HUDLabelConfig` interface**

In `src/components/hero/theaterData.ts`, update the interface:

```ts
export interface HUDLabelConfig {
  id: number;
  text: string;
  textZh: string;              // Chinese primary text
  value?: string;              // dynamic portion (e.g., "2.1M PATHS")
  valueZh?: string;            // Chinese dynamic portion (e.g., "2.1M 路徑")
  accentColor: string;
  position: { top: string; left?: string; right?: string };
  cardPosition: { top: string; right: string };
  hideBelow?: 'lg';
}
```

- [ ] **Step 2: Add Chinese text to each HUD_LABELS entry**

Update the `HUD_LABELS` array entries:

```ts
export const HUD_LABELS: HUDLabelConfig[] = [
  {
    id: 1,
    text: 'RISK VECTORS: DIVERGING',
    textZh: '風險向量：擴散中',
    accentColor: '#B57D7D',
    position: { top: '20%', left: '52%' },
    cardPosition: { top: '18%', right: '30%' },
    hideBelow: 'lg',
  },
  {
    id: 2,
    text: 'SCENARIO LOCK:',
    textZh: '情境鎖定：',
    value: '2.1M PATHS',
    valueZh: '2.1M 路徑',
    accentColor: '#769EDB',
    position: { top: '38%', right: '28%' },
    cardPosition: { top: '36%', right: '18%' },
  },
  {
    id: 3,
    text: 'OUTCOME: CONTROLLED ✓',
    textZh: '結果：已控制 ✓',
    accentColor: '#4ADE80',
    position: { top: '55%', right: '12%' },
    cardPosition: { top: '54%', right: '6%' },
  },
];
```

- [ ] **Step 3: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add src/components/hero/theaterData.ts
git commit -m "feat(hero): add textZh and valueZh fields to HUD label data"
```

---

### Task 2: Update HUDLabel to render bilingual two-line layout

**Files:**
- Modify: `src/components/hero/HUDLabel.tsx` (full rewrite of render logic)

- [ ] **Step 1: Update dynamic value state to track index instead of string**

Replace the current `dynamicValue` state and effect. Instead of storing a string, store a random index so both Chinese and English variants stay in sync:

```ts
const ZH_VARIANTS = ['2.0M 路徑', '2.1M 路徑', '2.2M 路徑'];
const EN_VARIANTS = ['2.0M PATHS', '2.1M PATHS', '2.2M PATHS'];
```

Change state from `useState(config.value)` to `useState(0)` (index), and update the interval to set a random index. Both lines read from their respective array using the same index.

- [ ] **Step 2: Update typewriter to use Chinese text**

Change `fullText` construction to use Chinese fields:

```ts
const hasCheckmark = config.textZh.includes('✓');

const fullTextZh = hasCheckmark
  ? config.textZh.replace(' ✓', '') + ' ✓'
  : config.valueZh
    ? config.textZh + ' ' + config.valueZh
    : config.textZh;
const typewriterDuration = fullTextZh.length * 0.04;
```

Also construct the English full text for the subtitle (no animation needed, just for display):

```ts
const fullTextEn = hasCheckmark
  ? config.text.replace(' ✓', '') + ' ✓'
  : config.value
    ? config.text + ' ' + config.value
    : config.text;
```

- [ ] **Step 3: Render the two-line layout**

Replace the inner `<div>` content (after the accent bar) with a flex-column containing two lines. The full component should look like this:

```tsx
export function HUDLabel({ config, delay }: HUDLabelProps) {
  const reduced = useReducedMotion();

  // Label 2: fluctuating number — use index to keep zh/en in sync
  const ZH_VARIANTS = ['2.0M 路徑', '2.1M 路徑', '2.2M 路徑'];
  const EN_VARIANTS = ['2.0M PATHS', '2.1M PATHS', '2.2M PATHS'];
  const [variantIndex, setVariantIndex] = useState(1); // default index=1 → "2.1M"

  useEffect(() => {
    if (!config.value || reduced) return;
    const interval = setInterval(() => {
      setVariantIndex(Math.floor(Math.random() * ZH_VARIANTS.length));
    }, 3000);
    return () => clearInterval(interval);
  }, [config.value, reduced]);

  const hasCheckmark = config.textZh.includes('✓');

  // Chinese typewriter text
  const fullTextZh = hasCheckmark
    ? config.textZh.replace(' ✓', '') + ' ✓'
    : config.valueZh
      ? config.textZh + ' ' + config.valueZh
      : config.textZh;
  const typewriterDuration = fullTextZh.length * 0.04;
  const typewriterDelay = delay + 0.8;

  const [typewriterDone, setTypewriterDone] = useState(reduced === true);

  useEffect(() => {
    if (reduced === true) return;
    const timeout = setTimeout(() => {
      setTypewriterDone(true);
    }, (typewriterDelay + typewriterDuration) * 1000);
    return () => clearTimeout(timeout);
  }, [typewriterDelay, typewriterDuration, reduced]);

  return (
    <motion.div
      className={`absolute ${config.hideBelow === 'lg' ? 'hidden lg:block' : ''}`}
      style={{
        ...config.position,
        maxWidth: '260px',
      }}
      initial={reduced ? { opacity: 1 } : { opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      <div
        className="flex items-start gap-2 rounded-md border border-white/[0.06] px-3 py-2 backdrop-blur-sm"
        style={{ backgroundColor: 'rgba(2,6,23,0.55)' }}
      >
        {/* Accent bar */}
        <div
          className="w-1 self-stretch rounded-full flex-shrink-0"
          style={{ backgroundColor: config.accentColor }}
        />
        <div className="flex flex-col gap-0.5">
          {/* Line 1: Chinese primary text with typewriter */}
          <span
            className="font-mono text-[14px] leading-tight block"
            style={{
              letterSpacing: '0.08em',
              color: 'rgba(100,200,255,0.78)',
              ...(reduced ? {} : {
                clipPath: 'inset(0 0 0 0)',
                animation: `hudTypewriter ${typewriterDuration}s steps(${fullTextZh.length}) ${typewriterDelay}s both`,
              }),
            }}
          >
            {hasCheckmark ? (
              <>
                {config.textZh.replace(' ✓', '')}{' '}
                <motion.span
                  animate={reduced ? {} : typewriterDone ? { opacity: [0.5, 1, 0.5] } : { opacity: 1 }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ color: config.accentColor }}
                >
                  ✓
                </motion.span>
              </>
            ) : config.valueZh ? (
              <>
                {config.textZh}{' '}
                <span style={{ color: 'rgba(100,200,255,0.85)' }}>
                  {ZH_VARIANTS[variantIndex]}
                </span>
              </>
            ) : (
              config.textZh
            )}
          </span>

          {/* Line 2: English secondary text — fades in after typewriter */}
          <motion.span
            className="font-mono text-[10px] uppercase leading-tight block"
            style={{
              letterSpacing: '0.15em',
              color: 'rgba(100,200,255,0.4)',
            }}
            initial={reduced ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: typewriterDone ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          >
            {hasCheckmark ? (
              <>
                {config.text.replace(' ✓', '')}{' '}
                <span style={{ color: config.accentColor, opacity: 0.5 }}>✓</span>
              </>
            ) : config.value ? (
              <>
                {config.text}{' '}
                <span style={{ color: 'rgba(100,200,255,0.5)' }}>
                  {EN_VARIANTS[variantIndex]}
                </span>
              </>
            ) : (
              config.text
            )}
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
}
```

Key changes from original:
- `maxWidth`: `240px` → `260px`
- Inner div: added `flex flex-col gap-0.5`
- Chinese line: uses `textZh`/`valueZh`, `letterSpacing: '0.08em'` (tighter than English since CJK glyphs are wider), no `uppercase`
- English line: `text-[10px]`, `rgba(100,200,255,0.4)`, fades in via `typewriterDone`, keeps `uppercase` and `tracking-[0.15em]`
- Dynamic variants: both lines read from `ZH_VARIANTS[variantIndex]` / `EN_VARIANTS[variantIndex]`

- [ ] **Step 4: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 5: Verify build succeeds**

Run: `npm run build`
Expected: Build completes without errors

- [ ] **Step 6: Visual verification**

Run: `npm run dev`
Verify in browser:
1. All 3 HUD labels show Chinese on top, English below in smaller text
2. Chinese line has typewriter animation on load
3. English line fades in after typewriter completes
4. Label 2 value fluctuates every 3s (both lines update in sync)
5. Label 3 checkmark pulses on Chinese line
6. Labels don't overflow or clip at `260px` max width

- [ ] **Step 7: Commit**

```bash
git add src/components/hero/HUDLabel.tsx
git commit -m "feat(hero): render bilingual HUD labels with Chinese primary text"
```
