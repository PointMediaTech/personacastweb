# Section 2 (Paradigm Shift) Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign Section 2 from vertically stacked panels to a 45/55 asymmetric side-by-side comparison layout with updated Chinese copywriting, gradient divider, data tags, full-viewport height, and a CTA link.

**Architecture:** Three files changed, one new file. `ParadigmSection.tsx` (server component) handles copy, container layout, and CTA. `ComparisonPanel.tsx` (client component) is fully rewritten for the left-right split with gradient divider. `DataTags.tsx` (new client component) renders three animated stat badges. Existing `TraditionalChart.tsx`, `PredictionPath.tsx`, and `ScanlineBackground.tsx` are untouched.

**Tech Stack:** Next.js App Router, React, Tailwind CSS v4, Framer Motion

**Spec:** `docs/superpowers/specs/2026-03-22-section2-paradigm-redesign.md`

---

## File Structure

| File | Action | Responsibility |
|------|--------|----------------|
| `app/components/paradigm/DataTags.tsx` | Create | Three animated data stat badges for the right card |
| `app/components/paradigm/ParadigmSection.tsx` | Modify | Updated copy, `min-h-screen` centering, CTA link |
| `app/components/paradigm/ComparisonPanel.tsx` | Rewrite | 45/55 left-right layout, gradient divider, card styling, integrates DataTags |

Unchanged: `TraditionalChart.tsx`, `PredictionPath.tsx`, `ScanlineBackground.tsx`, `SectionWrapper.tsx`, `ScrollReveal.tsx`

---

### Task 1: Create DataTags component

**Files:**
- Create: `app/components/paradigm/DataTags.tsx`

- [ ] **Step 1: Create DataTags.tsx**

```tsx
'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

const tags = [
  '3.4M+ 情境模擬',
  'T+72h 預測深度',
  '80% 行為洞察',
];

export function DataTags() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const prefersReducedMotion = useReducedMotion();

  return (
    <div ref={ref} className="flex flex-wrap gap-3 mt-6">
      {tags.map((tag, i) => {
        if (prefersReducedMotion) {
          return (
            <span
              key={tag}
              className="px-3 py-1.5 rounded-md bg-aurora-cyan/10 border border-aurora-cyan/15 font-mono text-[11px] tracking-wider text-aurora-cyan/80"
            >
              {tag}
            </span>
          );
        }

        return (
          <motion.span
            key={tag}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{
              duration: 0.4,
              delay: 0.3 + i * 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="px-3 py-1.5 rounded-md bg-aurora-cyan/10 border border-aurora-cyan/15 font-mono text-[11px] tracking-wider text-aurora-cyan/80"
          >
            {tag}
          </motion.span>
        );
      })}
    </div>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npx next build`
Expected: Build succeeds (DataTags is not yet imported anywhere, so this just confirms no syntax errors)

- [ ] **Step 3: Commit**

```bash
git add app/components/paradigm/DataTags.tsx
git commit -m "feat(paradigm): add DataTags component with stagger animation"
```

---

### Task 2: Update ParadigmSection with new copy, layout, and CTA

**Files:**
- Modify: `app/components/paradigm/ParadigmSection.tsx`

**Reference:** Spec Section 2 (copy), Section 3.1 (DOM structure), Section 3.2 (title area), Section 3.5 (CTA), Section 10 (diff checklist for ParadigmSection)

- [ ] **Step 1: Rewrite ParadigmSection.tsx**

Replace the entire content of `app/components/paradigm/ParadigmSection.tsx` with:

```tsx
import Link from 'next/link';
import { SectionWrapper } from '../shared/SectionWrapper';
import { ComparisonPanel } from './ComparisonPanel';
import { ScanlineBackground } from './ScanlineBackground';

export function ParadigmSection() {
  return (
    <SectionWrapper id="paradigm" ariaLabel="範式轉移" className="!py-24 lg:!py-0 relative">
      <ScanlineBackground />
      <div className="relative z-10 min-h-screen flex flex-col justify-center">
        {/* Title area */}
        <div className="text-center mb-16 lg:mb-24">
          <p className="text-xs tracking-[4px] text-strategic-blue uppercase font-mono mb-6">
            PARADIGM SHIFT
          </p>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white font-heading tracking-tighter leading-[1.05]">
            輿論定型前，掌控您的劇本。
          </h2>
          <p className="text-lg lg:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed tracking-wide mt-12">
            當對手還在猜測您的下一步，您已在千萬次推演中看透結局。領先 72 小時佈局，讓每場危機都成為您的主場。
          </p>
        </div>

        {/* Comparison panel */}
        <ComparisonPanel />

        {/* CTA */}
        <div className="text-center mt-12 lg:mt-16">
          <Link
            href="#authority"
            className="font-mono text-sm tracking-wide text-strategic-blue hover:text-aurora-cyan transition-colors"
          >
            了解預演算法如何運作 →
          </Link>
        </div>
      </div>
    </SectionWrapper>
  );
}
```

Key changes from current code (spec Section 10):
- `className`: `!py-48` → `!py-24 lg:!py-0`
- Inner div: added `min-h-screen flex flex-col justify-center`
- H2: `別讓公眾定義您的結局。` → `輿論定型前，掌控您的劇本。`
- Subtitle: updated copy, `max-w-4xl` → `max-w-3xl`
- Title spacing: `mb-24 lg:mb-32` → `mb-16 lg:mb-24`
- Added CTA `<Link>` below ComparisonPanel

- [ ] **Step 2: Verify build**

Run: `npx next build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add app/components/paradigm/ParadigmSection.tsx
git commit -m "feat(paradigm): update copy, add min-h-screen centering and CTA"
```

---

### Task 3: Rewrite ComparisonPanel for 45/55 left-right layout

**Files:**
- Rewrite: `app/components/paradigm/ComparisonPanel.tsx`

**Reference:** Spec Sections 3.3-3.4 (layout), 4 (left card), 5 (right card), 6 (animation), 10 (diff checklist for ComparisonPanel)

- [ ] **Step 1: Rewrite ComparisonPanel.tsx**

Replace the entire content of `app/components/paradigm/ComparisonPanel.tsx` with:

```tsx
'use client';

import { ScrollReveal } from '../shared/ScrollReveal';
import { DataTags } from './DataTags';

export function ComparisonPanel() {
  return (
    <div className="flex flex-col lg:flex-row gap-0 max-w-7xl mx-auto">
      {/* Left card: Reactive Mode */}
      <ScrollReveal direction="left" className="w-full lg:w-[45%]">
        <div
          className="rounded-2xl lg:rounded-l-2xl lg:rounded-r-none bg-red-950/15 p-8 lg:p-10 relative overflow-hidden h-full"
        >
          {/* Radial gradient overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,77,77,0.05),transparent_70%)] pointer-events-none" />

          <div className="relative flex flex-col">
            {/* Status label */}
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-2.5 h-2.5 rounded-full bg-alert-red/40" />
              <span className="text-[11px] text-alert-red/40 tracking-[2px] uppercase font-mono">
                REACTIVE MODE
              </span>
            </div>

            {/* Heading */}
            <h3 className="text-xl lg:text-2xl font-bold text-[#777] mb-4 font-heading">
              事後救火：昂貴的徒勞
            </h3>

            {/* Body */}
            <p className="text-sm text-[#666] leading-relaxed">
              傳統工具只記錄失敗。當負面聲量爆發，傷害已成定局 —— 您在盲目博弈，對手在看您失血。
            </p>

            {/* Chart placeholder */}
            <div className="h-40 lg:h-48 mt-6 flex items-center justify-center rounded-xl border border-dashed border-white/10 bg-red-950/10">
              <span className="text-[11px] font-mono text-white/20 tracking-wider uppercase">
                Reactive Chart
              </span>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Gradient divider */}
      {/* Desktop: vertical line */}
      <div
        className="hidden lg:block w-px self-stretch bg-gradient-to-b from-alert-red/40 via-transparent to-aurora-cyan/40"
        aria-hidden="true"
      />
      {/* Mobile: horizontal line */}
      <div
        className="block lg:hidden h-px w-full my-6 bg-gradient-to-r from-alert-red/40 via-transparent to-aurora-cyan/40"
        aria-hidden="true"
      />

      {/* Right card: Proactive Mode */}
      <ScrollReveal direction="right" delay={0.15} className="w-full lg:w-[55%]">
        <div
          className="rounded-2xl lg:rounded-r-2xl lg:rounded-l-none bg-blue-950/20 p-8 lg:p-10 relative overflow-hidden border border-aurora-cyan/15 shadow-[0_0_30px_rgba(0,242,255,0.06)] h-full"
        >
          {/* Radial gradient overlays */}
          <div className="absolute top-0 right-0 w-2/3 h-full bg-[radial-gradient(ellipse_at_right,rgba(118,158,219,0.08),transparent_70%)] pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-1/2 h-1/2 bg-[radial-gradient(ellipse_at_bottom,rgba(0,242,255,0.03),transparent_70%)] pointer-events-none" />

          <div className="relative flex flex-col">
            {/* Status label */}
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-2.5 h-2.5 rounded-full bg-aurora-cyan shadow-[0_0_10px_rgba(0,242,255,0.6)]" />
              <span className="text-[11px] text-aurora-cyan tracking-[2px] uppercase font-mono">
                PROACTIVE MODE
              </span>
            </div>

            {/* Heading */}
            <h3 className="text-xl lg:text-2xl font-bold text-white mb-4 font-heading">
              預見式導航：寫好的勝局
            </h3>

            {/* Body */}
            <p className="text-sm text-mist-blue-gray leading-relaxed">
              行動前推演千萬次。鎖定 T+36h 最佳反擊窗口，看穿 80% 利益關係人的底牌，贏得毫無懸念。
            </p>

            {/* Chart placeholder */}
            <div className="h-40 lg:h-48 mt-6 flex items-center justify-center rounded-xl border border-dashed border-aurora-cyan/15 bg-blue-950/15">
              <span className="text-[11px] font-mono text-white/20 tracking-wider uppercase">
                Proactive Chart
              </span>
            </div>

            {/* Data tags */}
            <DataTags />
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
```

Key changes from current code (spec Section 10):
- Layout: `flex-col gap-10 lg:gap-12` → `flex-col lg:flex-row gap-0` (divider handles spacing)
- Container: `max-w-6xl` → `max-w-7xl`
- Left card: `lg:w-[30%]` text + `flex-1` image → full-width `lg:w-[45%]` vertical card
- Right card: same restructure at `lg:w-[55%]`
- Rounded corners: `rounded-2xl` → responsive `lg:rounded-l-2xl lg:rounded-r-none` / `lg:rounded-r-2xl lg:rounded-l-none`
- Left card colors dimmed: `bg-alert-red/60` → `/40`, `text-[#999]` → `text-[#777]`, `bg-red-950/20` → `/15`
- Left card radial gradient: `rgba(255,77,77,0.04)` → `rgba(255,77,77,0.05)` (spec Section 4.2)
- Left card body text: `當新聞爆發，損失已成定局。` → `當負面聲量爆發，傷害已成定局 ——` (spec Section 2.2)
- Right card: added `border border-aurora-cyan/15` and `shadow-[0_0_30px_rgba(0,242,255,0.06)]`
- Right H3: `事前導航：上帝的劇本` → `預見式導航：寫好的勝局`
- Right body text updated
- ScrollReveal directions: both `up` → `left` + `right`
- Added gradient divider between cards (desktop vertical, mobile horizontal)
- Added `DataTags` at bottom of right card
- Removed `ImagePlaceholder` helper (inline placeholders instead)
- Note: `TraditionalChart.tsx` and `PredictionPath.tsx` are no longer imported (become dormant code, preserved for future chart redesign)

- [ ] **Step 2: Verify build**

Run: `npx next build`
Expected: Build succeeds with no errors

- [ ] **Step 3: Commit**

```bash
git add app/components/paradigm/ComparisonPanel.tsx
git commit -m "feat(paradigm): rewrite ComparisonPanel to 45/55 side-by-side layout with gradient divider"
```

---

### Task 4: Visual verification and final commit

- [ ] **Step 1: Start dev server and verify**

Run: `npx next dev`

Check the following in browser at `http://localhost:3000`:
1. Section 2 fills the viewport (`min-h-screen`) and content is vertically centered
2. Desktop (>= 1024px): two cards side by side, left 45% / right 55%, with a faint gradient vertical line between them
3. Left card appears faded (grey text, muted red tones)
4. Right card has cyan glow border and three data tags at the bottom
5. Data tags fade in sequentially after the card appears
6. Cards animate in from left and right respectively on scroll
7. CTA link "了解預演算法如何運作 →" appears below the cards, links to `#authority`
8. Mobile (< 1024px): cards stack vertically with horizontal gradient line between them, all cards have full `rounded-2xl`
9. H2 reads "輿論定型前，掌控您的劇本。"
10. No double padding (content should align with other sections)

- [ ] **Step 2: Run production build**

Run: `npx next build`
Expected: Build succeeds with no errors or warnings

- [ ] **Step 3: Final commit if any adjustments were needed**

```bash
git add -A
git commit -m "fix(paradigm): visual adjustments from Section 2 redesign review"
```

Only create this commit if adjustments were made in Step 1. If no changes, skip.
