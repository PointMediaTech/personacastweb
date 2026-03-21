# Theater Copy Coherence Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite HUD labels and status bar text so the pre-theater and post-theater copy form a coherent "detect threat → respond with strategy" narrative.

**Architecture:** Data-only changes in two files. HUD label configs get new text/color values; status bar gets relabeled. No logic, component, or style changes.

**Tech Stack:** TypeScript (static data), React JSX (string literals)

---

### Task 1: Update HUD_LABELS in theaterData.ts

**Files:**
- Modify: `src/components/hero/theaterData.ts:39-67`

- [ ] **Step 1: Update HUD_LABELS[0] text fields**

Change `text` and `textZh` for the first label (maps to PR PIVOT decision card):

```ts
{
    id: 1,
    text: 'PUBLIC SENTIMENT: SPREADING',
    textZh: '公眾情緒：負面擴散中',
    accentColor: '#B57D7D',
    position: { top: '20%', left: '52%' },
    cardPosition: { top: '18%', right: '30%' },
    hideBelow: 'lg',
},
```

- [ ] **Step 2: Update HUD_LABELS[1] — remove value/valueZh, update text**

Change `text` and `textZh`, remove `value` and `valueZh` fields (maps to LEGAL WAR decision card):

```ts
{
    id: 2,
    text: 'REGULATORY: VIOLATION DETECTED',
    textZh: '法規合規：潛在違規偵測',
    accentColor: '#769EDB',
    position: { top: '38%', right: '28%' },
    cardPosition: { top: '36%', right: '18%' },
},
```

- [ ] **Step 3: Update HUD_LABELS[2] — text and accentColor**

Change `text`, `textZh`, and `accentColor` (maps to DIVERSION decision card). Color changes from green `#4ADE80` to warm orange `#E2A76F` because the new copy describes escalation, not control:

```ts
{
    id: 3,
    text: 'TOPIC HEAT: GOING VIRAL',
    textZh: '議題熱度：社群發酵中',
    accentColor: '#E2A76F',
    position: { top: '55%', right: '12%' },
    cardPosition: { top: '54%', right: '6%' },
},
```

- [ ] **Step 4: Commit**

```bash
git add src/components/hero/theaterData.ts
git commit -m "copy(hero): rewrite HUD labels as crisis detection indicators"
```

---

### Task 2: Update bottom status bar in HeroContent.tsx

**Files:**
- Modify: `src/components/hero/HeroContent.tsx:144-162`

- [ ] **Step 1: Change "Simulation" to "Crisis Window" and flip time direction**

On line 145, change:
```tsx
Simulation: <span className="text-strategic-blue">T+56H</span>
```
to:
```tsx
Crisis Window: <span className="text-strategic-blue">T-56H</span>
```

- [ ] **Step 2: Change "Conflict" to "Sentiment"**

On line 148, change:
```tsx
Conflict:{' '}
```
to:
```tsx
Sentiment:{' '}
```

- [ ] **Step 3: Change "Paths Analyzed" to "Scenarios"**

On line 161, change:
```tsx
Paths Analyzed: <span className="text-white">3.4M+</span>
```
to:
```tsx
Scenarios: <span className="text-white">3.4M+</span>
```

- [ ] **Step 4: Commit**

```bash
git add src/components/hero/HeroContent.tsx
git commit -m "copy(hero): relabel status bar for crisis narrative coherence"
```

---

### Task 3: Visual verification

- [ ] **Step 1: Run dev server and verify**

```bash
npm run dev
```

Open browser and check:
1. HUD labels show new Chinese/English crisis detection text
2. HUD label #3 accent color is warm orange, not green
3. Bottom status bar reads "Crisis Window: T-56H", "Sentiment: 72%", "Scenarios: 3.4M+"
4. Click "啟動推演劇場" — decision cards appear in same positions, morph feels narratively connected
5. Click a decision card — "Sentiment" value updates dynamically (same as before)
