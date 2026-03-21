# Theater Button Toggle State Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restyle the hero CTA button as a two-state toggle — solid blue CTA when inactive, subtle gold-bordered indicator when active.

**Architecture:** Single-file edit to `src/components/hero/HeroContent.tsx`. The button already has conditional rendering based on `theaterActive` prop; we update the className, style, inner text, and add accessibility attributes.

**Tech Stack:** React, Tailwind CSS, Framer Motion, Lucide icons

**Spec:** `docs/superpowers/specs/2026-03-21-theater-button-toggle-design.md`

---

### Task 1: Update file header comment

**Files:**
- Modify: `src/components/hero/HeroContent.tsx` (line 23 comment block)

- [ ] **Step 1: Update the color documentation comment**

Replace one line with two lines. Find this exact string:
```
 *   Primary CTA → Solid White bg, Deep Blue text
```
Replace with:
```
 *   Primary CTA (inactive) → Strategic Blue #769EDB bg, White text
 *   Primary CTA (active) → Transparent bg, Gold #FFB800 border/text
```

- [ ] **Step 2: Update the CTA section comment**

Change line 82 from:
```
{/* CTAs — Primary: SOLID WHITE, brightest element on page */}
```
to:
```
{/* CTAs — Primary: Strategic Blue toggle (see spec) */}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/hero/HeroContent.tsx
git commit -m "docs: update CTA color comments to match toggle design"
```

---

### Task 2: Restyle inactive state (background, text, hover)

**Files:**
- Modify: `src/components/hero/HeroContent.tsx` (button element, lines 84-92)

- [ ] **Step 1: Update className conditional — inactive branch**

Inside the ternary in the button's className, find the inactive branch (after the `:`):
```
: 'bg-white hover:shadow-[0_0_30px_6px_rgba(255,255,255,0.15)]'
```
Replace with:
```
: 'bg-[#769EDB] hover:shadow-[0_0_30px_6px_rgba(118,158,219,0.25)]'
```

- [ ] **Step 2: Update style color — inactive branch**

Change the inline style from:
```tsx
style={{ color: theaterActive ? '#FFB800' : '#0A1128' }}
```
to:
```tsx
style={{ color: theaterActive ? '#FFB800' : '#FFFFFF' }}
```

- [ ] **Step 3: Verify in browser**

Run: `npm run dev` (if not already running)
- Open homepage, confirm button shows blue background with white text
- Hover: confirm blue glow appears (not white)
- Click: confirm active state still works (gold border, gold text)

- [ ] **Step 4: Commit**

```bash
git add src/components/hero/HeroContent.tsx
git commit -m "style(hero): change CTA inactive state from white to strategic-blue"
```

---

### Task 3: Update active state text

**Files:**
- Modify: `src/components/hero/HeroContent.tsx`

**Note:** Line numbers below are relative to the original file. Prior tasks may shift them by 1-2 lines. Use content-based matching.

- [ ] **Step 1: Change active label text**

Find the text `SIMULATION ACTIVE` inside the theaterActive ternary's truthy branch (near the `<motion.span>` breathing dot). Replace with:
```tsx
推演運行中
```

- [ ] **Step 2: Verify in browser**

- Click button to activate theater
- Confirm button shows「推演運行中」with yellow breathing dot
- Confirm button size does not jump between states

- [ ] **Step 3: Commit**

```bash
git add src/components/hero/HeroContent.tsx
git commit -m "style(hero): change active CTA label to Chinese '推演運行中'"
```

---

### Task 4: Add accessibility attributes

**Files:**
- Modify: `src/components/hero/HeroContent.tsx` (button element)

- [ ] **Step 1: Add aria-pressed attribute**

Add to the `<button>` element:
```tsx
aria-pressed={theaterActive}
```

- [ ] **Step 2: Add focus-visible ring classes**

Add to the button's base className string (the part before the ternary):
```
focus-visible:ring-2 focus-visible:ring-strategic-blue/60 focus-visible:ring-offset-2 focus-visible:ring-offset-deep-space
```

After Tasks 1-3 are applied, the full className should look like:
```tsx
className={`group inline-flex items-center gap-3 rounded-sm px-10 py-4 text-[15px] font-bold tracking-wide transition-all duration-400 focus-visible:ring-2 focus-visible:ring-strategic-blue/60 focus-visible:ring-offset-2 focus-visible:ring-offset-deep-space ${
  theaterActive
    ? 'border border-[rgba(255,184,0,0.3)] hover:border-[rgba(255,184,0,0.5)]'
    : 'bg-[#769EDB] hover:shadow-[0_0_30px_6px_rgba(118,158,219,0.25)]'
}`}
```
Use this as a reference to verify correctness, not as a copy-paste target.

- [ ] **Step 3: Verify in browser**

- Tab to the button with keyboard, confirm blue focus ring appears
- Press Enter/Space, confirm toggle works via keyboard
- Use screen reader or inspect DOM to confirm `aria-pressed` toggles between `true`/`false`

- [ ] **Step 4: Commit**

```bash
git add src/components/hero/HeroContent.tsx
git commit -m "a11y(hero): add aria-pressed and focus-visible ring to CTA toggle"
```

---

### Task 5: Final visual QA

- [ ] **Step 1: Full flow test**

Verify the complete interaction loop:
1. Page loads → blue button「啟動推演劇場」with Play icon, white text
2. Hover → blue glow shadow
3. Click → smooth 400ms transition to transparent bg, gold border, yellow dot,「推演運行中」
4. Decision cards appear on right → button is visually subordinate
5. Click again → smooth transition back to blue solid state
6. Tab navigation → focus ring visible in both states

- [ ] **Step 2: Commit all if any remaining unstaged changes**

```bash
git status
# If clean, skip. Otherwise:
git add src/components/hero/HeroContent.tsx
git commit -m "style(hero): complete theater button toggle state redesign"
```
