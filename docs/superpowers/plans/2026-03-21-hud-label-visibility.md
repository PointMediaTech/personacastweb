# HUD Label Visibility Enhancement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make HUD annotation labels in the Hero Section visible and readable by adding a background container, increasing font/contrast, adding a CSS typewriter entry animation, and cleaning up dead code.

**Architecture:** Two-file change. HUDLabel.tsx gets a background panel, larger font, higher contrast, a CSS clip-path typewriter reveal, and accent bar height fix. SimulationTheater.tsx updates the parent opacity wrapper from 0.7 to 1. No state/data/API changes.

**Tech Stack:** React 19, Framer Motion 12, Tailwind CSS 4, TypeScript 5

**Spec:** `docs/superpowers/specs/2026-03-21-hud-label-visibility-design.md`

---

## File Structure

| File | Type | Responsibility |
|------|------|---------------|
| `src/components/hero/HUDLabel.tsx` | Modify | Single HUD annotation label — adding container, contrast, typewriter |
| `src/components/hero/SimulationTheater.tsx` | Modify | Parent container — updating opacity wrapper value, removing `visible` prop usage |
| `src/index.css` | Modify | Global stylesheet — adding `@keyframes hudTypewriter` |

---

### Task 1: Update HUDLabel container, font, contrast, accent bar, and clean up `visible` prop across both files

**Files:**
- Modify: `src/components/hero/HUDLabel.tsx`
- Modify: `src/components/hero/SimulationTheater.tsx`

This task covers all the non-animation visual changes: background container, font size, text color, opacity, maxWidth, accent bar, and removing the unused `visible` prop from both the interface and call site atomically (to avoid intermediate TS errors).

- [ ] **Step 1: Remove unused `visible` prop from HUDLabel interface**

In `src/components/hero/HUDLabel.tsx`, remove the `visible` prop:

```tsx
// Change interface (lines 5-9) from:
interface HUDLabelProps {
  readonly config: HUDLabelConfig;
  readonly delay: number;
  readonly visible?: boolean;
}

// To:
interface HUDLabelProps {
  readonly config: HUDLabelConfig;
  readonly delay: number;
}
```

No change needed to the destructuring on line 11 — it already only destructures `config` and `delay`.

- [ ] **Step 1b: Remove `visible` prop from call site in SimulationTheater.tsx**

In `src/components/hero/SimulationTheater.tsx` line 73, remove the `visible` prop:

```tsx
// From:
<HUDLabel
  config={label}
  delay={1.8 + i * 0.3}
  visible={!theaterActive}
/>

// To:
<HUDLabel
  config={label}
  delay={1.8 + i * 0.3}
/>
```

This must be done in the same commit as Step 1 to avoid a TypeScript error.

- [ ] **Step 2: Update the outer motion.div — opacity and maxWidth**

Change lines 30-38 from:

```tsx
<motion.div
  className={`absolute ${config.hideBelow === 'lg' ? 'hidden lg:block' : ''}`}
  style={{
    ...config.position,
    maxWidth: '200px',
  }}
  initial={reduced ? { opacity: 0.7 } : { opacity: 0, x: 20 }}
  animate={{ opacity: 0.7, x: 0 }}
  transition={{ duration: 0.8, delay, ease: EASE }}
>
```

To:

```tsx
<motion.div
  className={`absolute ${config.hideBelow === 'lg' ? 'hidden lg:block' : ''}`}
  style={{
    ...config.position,
    maxWidth: '240px',
  }}
  initial={reduced ? { opacity: 1 } : { opacity: 0, x: 20 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.8, delay, ease: EASE }}
>
```

Changes: `maxWidth` 200→240, `opacity` 0.7→1 in both `initial` and `animate`.

- [ ] **Step 3: Add background container and update inner layout**

Replace the inner `<div className="flex items-start gap-2">` wrapper (lines 40-77) with a container that has background, blur, border, padding, and the updated accent bar:

```tsx
<div
  className="flex items-start gap-2 rounded-md border border-white/[0.06] px-3 py-2 backdrop-blur-sm"
  style={{ backgroundColor: 'rgba(2,6,23,0.55)' }}
>
  {/* Accent bar */}
  <div
    className="w-1 self-stretch rounded-full flex-shrink-0"
    style={{ backgroundColor: config.accentColor }}
  />
  <div>
    <span
      className="font-mono text-[11px] uppercase leading-tight block"
      style={{
        letterSpacing: '0.15em',
        color: 'rgba(100,200,255,0.78)',
      }}
    >
      {hasCheckmark ? (
        <>
          {config.text.replace(' ✓', '')}{' '}
          <motion.span
            animate={reduced ? {} : { opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            style={{ color: config.accentColor }}
          >
            ✓
          </motion.span>
        </>
      ) : config.value ? (
        <>
          {config.text}{' '}
          <span style={{ color: 'rgba(100,200,255,0.85)' }}>
            {dynamicValue}
          </span>
        </>
      ) : (
        config.text
      )}
    </span>
  </div>
</div>
```

Changes from original:
- Added `rounded-md border border-white/[0.06] px-3 py-2 backdrop-blur-sm` and `backgroundColor` to the flex container
- Accent bar: `h-5 mt-0.5` → `self-stretch`, removed `mt-0.5`
- Text: `text-[10px]` → `text-[11px]`
- Text color: `rgba(100,200,255,0.5)` → `rgba(100,200,255,0.78)`
- Dynamic value color: `rgba(100,200,255,0.7)` → `rgba(100,200,255,0.85)`

- [ ] **Step 4: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: Zero errors (both interface and call site updated together)

- [ ] **Step 5: Commit**

```bash
git add src/components/hero/HUDLabel.tsx src/components/hero/SimulationTheater.tsx
git commit -m "feat(hud): add background container, increase font/contrast, fix accent bar"
```

---

### Task 2: Add CSS typewriter animation to HUDLabel

**Files:**
- Modify: `src/components/hero/HUDLabel.tsx`

This task adds the clip-path based typewriter reveal animation and adjusts Label 3's checkmark pulse to start after the typewriter completes.

- [ ] **Step 1: Add typewriter state and CSS class**

At the top of the `HUDLabel` function (after `const hasCheckmark = ...` on line 27), add:

```tsx
// Typewriter reveal via CSS clip-path
const fullText = hasCheckmark
  ? config.text.replace(' ✓', '') + ' ✓'
  : config.value
    ? config.text + ' ' + config.value
    : config.text;
const typewriterDuration = fullText.length * 0.04; // 40ms per character
const typewriterDelay = delay + 0.8; // starts after fade-in completes

const [typewriterDone, setTypewriterDone] = useState(reduced ? true : false);

useEffect(() => {
  if (reduced) return;
  const timeout = setTimeout(() => {
    setTypewriterDone(true);
  }, (typewriterDelay + typewriterDuration) * 1000);
  return () => clearTimeout(timeout);
}, [typewriterDelay, typewriterDuration, reduced]);
```

- [ ] **Step 2: Add inline CSS animation style to the text span**

Wrap the existing `<span className="font-mono text-[11px] ...">` with a typewriter container. Replace the `<span>` tag (the one with `font-mono text-[11px]`) to add the clip-path animation:

```tsx
<span
  className="font-mono text-[11px] uppercase leading-tight block"
  style={{
    letterSpacing: '0.15em',
    color: 'rgba(100,200,255,0.78)',
    ...(reduced ? {} : {
      clipPath: 'inset(0 0 0 0)',
      animation: `hudTypewriter ${typewriterDuration}s steps(${fullText.length}) ${typewriterDelay}s both`,
    }),
  }}
>
```

- [ ] **Step 3: Add the CSS keyframes to global stylesheet**

In `src/index.css`, add the keyframes definition inside the existing `@layer base` block (or after it):

```css
@keyframes hudTypewriter {
  from { clip-path: inset(0 100% 0 0); }
  to { clip-path: inset(0 0 0 0); }
}
```

This avoids injecting duplicate `<style>` tags per HUDLabel instance (component is rendered 3 times).

- [ ] **Step 4: Delay Label 3 checkmark pulse until typewriter completes**

Update the checkmark `motion.span` to only start pulsing after typewriter is done:

```tsx
<motion.span
  animate={reduced ? {} : typewriterDone ? { opacity: [0.5, 1, 0.5] } : { opacity: 1 }}
  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
  style={{ color: config.accentColor }}
>
  ✓
</motion.span>
```

This changes from always-pulsing to: static at opacity 1 during typewriter → pulsing after `typewriterDone` becomes true.

- [ ] **Step 5: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors related to HUDLabel

- [ ] **Step 6: Commit**

```bash
git add src/components/hero/HUDLabel.tsx src/index.css
git commit -m "feat(hud): add CSS clip-path typewriter entry animation"
```

---

### Task 3: Update SimulationTheater parent wrapper opacity

**Files:**
- Modify: `src/components/hero/SimulationTheater.tsx`

Note: the `visible` prop removal was already done in Task 1 (Step 1b) to keep the interface and call site change atomic.

- [ ] **Step 1: Update HUD label wrapper opacity**

In `src/components/hero/SimulationTheater.tsx`, change line 66 from:

```tsx
animate={{ opacity: theaterActive ? 0 : 0.7 }}
```

To:

```tsx
animate={{ opacity: theaterActive ? 0 : 1 }}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: Zero errors

- [ ] **Step 3: Commit**

```bash
git add src/components/hero/SimulationTheater.tsx
git commit -m "feat(hud): update parent opacity wrapper from 0.7 to 1"
```

---

### Task 4: Visual verification and build check

**Files:**
- All modified files

- [ ] **Step 1: Full TypeScript check**

Run: `npx tsc --noEmit`
Expected: Zero errors

- [ ] **Step 2: Production build**

Run: `npm run build`
Expected: Build succeeds with no errors

- [ ] **Step 3: Visual verification**

Run: `npm run dev`

Verify in browser:
- [ ] HUD labels have visible dark background panels with subtle border
- [ ] Text is readable at 11px with improved contrast against flow canvas
- [ ] Accent bars stretch full height of their containers
- [ ] Typewriter animation plays: text clips in from left, character by character
- [ ] Typewriter starts after the fade-in slide completes (staggered per label)
- [ ] Label 2's dynamic value is included in initial typewriter; subsequent fluctuations swap instantly
- [ ] Label 3's ✓ stays static during typewriter, then pulses after completion
- [ ] `prefers-reduced-motion` (enable in OS settings): no typewriter, text shows immediately
- [ ] Click "啟動推演劇場": HUD labels (with background panels) fade out cleanly, no visual artifacts
- [ ] Decision cards appear and function as before
- [ ] Tablet (768-1023px): Label 1 hidden, Labels 2 & 3 visible with backgrounds
- [ ] Mobile (<768px): no labels visible (entire theater container hidden)

- [ ] **Step 4: Final commit (if any fixes needed)**

```bash
git add src/components/hero/HUDLabel.tsx src/components/hero/SimulationTheater.tsx
git commit -m "fix(hud): visual polish from verification"
```
