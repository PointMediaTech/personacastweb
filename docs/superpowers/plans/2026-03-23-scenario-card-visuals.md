# Scenario Card Visuals Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace three decorative Canvas 2D animations in ScenariosSection cards with meaningful SVG + Framer Motion conceptual diagrams that visually communicate each card's core message.

**Architecture:** Three new SVG components in `app/components/scenarios/visuals/`, each using Framer Motion's `motion.path` and `whileInView` for scroll-triggered animations. The existing `ModuleVisual` switch in `ScenarioCard.tsx` is updated to delegate to the new components instead of the old Canvas functions. Old Canvas code is deleted.

**Tech Stack:** React, SVG, Framer Motion (`motion.path`, `pathLength`, `useReducedMotion`, `whileInView`), TypeScript

**Spec:** `docs/superpowers/specs/2026-03-23-scenario-card-visuals-design.md`

---

## File Map

| Action | File | Responsibility |
|--------|------|----------------|
| Create | `app/components/scenarios/visuals/index.ts` | Barrel export + shared interface |
| Create | `app/components/scenarios/visuals/GlowFilter.tsx` | Shared SVG glow filter component (DRY) |
| Create | `app/components/scenarios/visuals/TimelineComparison.tsx` | Card 01 — before/after intervention timeline |
| Create | `app/components/scenarios/visuals/NetworkGraph.tsx` | Card 02 — stakeholder network node scan |
| Create | `app/components/scenarios/visuals/ConvergenceFunnel.tsx` | Card 03 — path convergence from many to one |
| Modify | `app/components/scenarios/ScenarioCard.tsx` | Remove Canvas visuals, rewire `ModuleVisual` to new SVG components |

---

### Task 1: Barrel Export + Shared Interface

**Files:**
- Create: `app/components/scenarios/visuals/index.ts`

- [ ] **Step 1: Create barrel export with shared interface**

```typescript
// app/components/scenarios/visuals/index.ts
export interface ScenarioVisualProps {
  readonly accentRgb: string;  // e.g. "229,62,62"
  readonly accentHex: string;  // e.g. "#E53E3E"
}

export { GlowFilter } from './GlowFilter';
export { TimelineComparison } from './TimelineComparison';
export { NetworkGraph } from './NetworkGraph';
export { ConvergenceFunnel } from './ConvergenceFunnel';
```

- [ ] **Step 2: Create shared GlowFilter component**

```typescript
// app/components/scenarios/visuals/GlowFilter.tsx
interface GlowFilterProps {
  readonly rgb: string;
  readonly id: string;
  readonly stdDeviation?: number;
  readonly floodOpacity?: number;
}

export function GlowFilter({ rgb, id, stdDeviation = 3, floodOpacity = 0.4 }: GlowFilterProps) {
  return (
    <filter id={id} x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur in="SourceGraphic" stdDeviation={stdDeviation} result="blur" />
      <feFlood floodColor={`rgb(${rgb})`} floodOpacity={floodOpacity} result="color" />
      <feComposite in="color" in2="blur" operator="in" result="glow" />
      <feMerge>
        <feMergeNode in="glow" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  );
}
```

> Note: Barrel export will have import errors until Tasks 2-4 create the components. That's expected — proceed.

- [ ] **Step 3: Commit**

```bash
git add app/components/scenarios/visuals/index.ts app/components/scenarios/visuals/GlowFilter.tsx
git commit -m "feat(scenarios): add barrel export, shared interface, and GlowFilter component"
```

---

### Task 2: TimelineComparison (Card 01 — 敘事攔截)

**Files:**
- Create: `app/components/scenarios/visuals/TimelineComparison.tsx`

**Visual spec recap:**
- viewBox `0 0 560 280`
- Two SVG path curves on a shared time axis
  - "Uncontrolled" curve: dashed, red (`#E53E3E`), exponential rise to top-right
  - "Intercepted" curve: solid, card accent, rises then flattens after intervention point
- Vertical dashed intervention marker at ~30% from left, labeled "介入點", subtle pulse
- Path-draw animation via `pathLength` 0→1, intercepted delays 0.3s
- Labels: "未攔截" (dim), "攔截後" (bright), "T-72hr" left, "T+0" right
- `useReducedMotion()`: if active, render final state at full opacity immediately
- Pre-animation: render diagram at opacity 0.15, animate to 1.0 on `whileInView`
- `role="img"` + `aria-label="危機輿論攔截前後對比時間軸"`

- [ ] **Step 1: Create TimelineComparison.tsx**

Build the component with these elements:
1. Outer `motion.svg` with `viewBox="0 0 560 280"`, `role="img"`, `aria-label`
2. Time axis: horizontal line at y=240 from x=40 to x=520, with tick marks at x=40 ("T-72hr") and x=520 ("T+0")
3. Uncontrolled curve path: `d` attribute tracing an exponential curve from (40,200) rising steeply to (520,40). Style: `stroke="#E53E3E"`, `strokeDasharray="6 4"`, `opacity={0.4}`, `strokeWidth={1.5}`, `fill="none"`
4. Intercepted curve path: from (40,200) rising to intervention point (~200,120) then flattening to (520,160). Style: `stroke={accentHex}`, solid, `strokeWidth={2}`, glow via SVG `<filter>` with `feGaussianBlur stdDeviation="3"`, `fill="none"`
5. Intervention marker: vertical dashed line at x=196 from y=50 to y=240. Animate opacity 0.4↔0.7 over 2s (pulse). Label "介入點" at (196, 45) in mono 11px
6. Labels: `<text>` elements — "未攔截" near uncontrolled curve endpoint (dim, 11px), "攔截後" near intercepted curve endpoint (bright, 11px)
7. Animation: wrap paths in `motion.path` with `initial={{ pathLength: 0, opacity: 0.15 }}` and `whileInView={{ pathLength: 1, opacity: 1 }}` with `viewport={{ once: true, amount: 0.3 }}`. Uncontrolled transition: `duration: 1.2`. Intercepted transition: `duration: 1.2, delay: 0.3`
8. Reduced motion: `const reduced = useReducedMotion()`. If `reduced`, set `initial` and `animate` to final state (pathLength: 1, opacity: 1) with `duration: 0`

```typescript
'use client';
import { motion, useReducedMotion } from 'framer-motion';
import type { ScenarioVisualProps } from './index';

// SVG path d-attributes for the two curves
const UNCONTROLLED_PATH = 'M40,200 C120,195 250,170 350,100 Q430,50 520,40';
const INTERCEPTED_PATH = 'M40,200 C100,190 160,150 200,120 Q280,100 360,140 Q440,160 520,160';

import { GlowFilter } from './GlowFilter';

export function TimelineComparison({ accentRgb, accentHex }: ScenarioVisualProps) {
  const reduced = useReducedMotion();
  const filterId = 'timeline-glow';

  const pathAnim = (delay: number) =>
    reduced
      ? { initial: { pathLength: 1, opacity: 1 }, animate: { pathLength: 1, opacity: 1 } }
      : {
          initial: { pathLength: 0, opacity: 0.15 },
          whileInView: { pathLength: 1, opacity: 1 },
          viewport: { once: true, amount: 0.3 },
          transition: { duration: 1.2, delay, ease: 'easeOut' },
        };

  const fadeAnim = (delay: number) =>
    reduced
      ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
      : {
          initial: { opacity: 0.15 },
          whileInView: { opacity: 1 },
          viewport: { once: true, amount: 0.3 },
          transition: { duration: 0.8, delay, ease: 'easeOut' },
        };

  return (
    <svg viewBox="0 0 560 280" className="w-full h-full" role="img" aria-label="危機輿論攔截前後對比時間軸">
      <defs>
        <GlowFilter rgb={accentRgb} id={filterId} />
      </defs>

      {/* Time axis */}
      <motion.line x1={40} y1={240} x2={520} y2={240} stroke="rgba(255,255,255,0.1)" strokeWidth={1} {...fadeAnim(0)} />
      <motion.text x={40} y={260} fill="rgba(255,255,255,0.3)" fontSize={11} fontFamily="'JetBrains Mono', monospace" {...fadeAnim(0)}>T-72hr</motion.text>
      <motion.text x={500} y={260} fill="rgba(255,255,255,0.3)" fontSize={11} fontFamily="'JetBrains Mono', monospace" {...fadeAnim(0)}>T+0</motion.text>

      {/* Uncontrolled curve — red dashed, dim (fade only, no pathLength — strokeDasharray conflicts with pathLength animation) */}
      <motion.path
        d={UNCONTROLLED_PATH}
        fill="none"
        stroke="#E53E3E"
        strokeWidth={1.5}
        strokeDasharray="6 4"
        {...fadeAnim(0)}
      />

      {/* Intercepted curve — accent, solid, glow */}
      <motion.path
        d={INTERCEPTED_PATH}
        fill="none"
        stroke={accentHex}
        strokeWidth={2}
        filter={`url(#${filterId})`}
        {...pathAnim(0.3)}
      />

      {/* Intervention marker — vertical dashed */}
      <motion.line
        x1={196} y1={50} x2={196} y2={240}
        stroke="rgba(255,255,255,0.25)"
        strokeWidth={1}
        strokeDasharray="4 3"
        {...fadeAnim(0.6)}
      />
      <motion.text
        x={196} y={42}
        fill="rgba(255,255,255,0.5)"
        fontSize={11}
        fontFamily="'JetBrains Mono', monospace"
        textAnchor="middle"
        {...fadeAnim(0.6)}
      >
        介入點
      </motion.text>

      {/* Intervention marker pulse — continuous after entry (skipped if reduced motion) */}
      {!reduced && (
        <motion.line
          x1={196} y1={50} x2={196} y2={240}
          stroke={accentHex}
          strokeWidth={1}
          strokeDasharray="4 3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: [0, 0.4, 0.7, 0.4, 0] }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        />
      )}

      {/* Labels */}
      <motion.text x={505} y={33} fill="rgba(229,62,62,0.5)" fontSize={11} fontFamily="'JetBrains Mono', monospace" textAnchor="end" {...fadeAnim(1.0)}>未攔截</motion.text>
      <motion.text x={505} y={153} fill={accentHex} fontSize={11} fontFamily="'JetBrains Mono', monospace" textAnchor="end" {...fadeAnim(1.3)}>攔截後</motion.text>
    </svg>
  );
}
```

- [ ] **Step 2: Verify it builds**

Run: `npx next build --no-lint 2>&1 | head -20` (or `npm run build`)
Expected: No TypeScript errors in TimelineComparison.tsx

- [ ] **Step 3: Commit**

```bash
git add app/components/scenarios/visuals/TimelineComparison.tsx
git commit -m "feat(scenarios): add TimelineComparison SVG visual for card 01"
```

---

### Task 3: NetworkGraph (Card 02 — 風險治理)

**Files:**
- Create: `app/components/scenarios/visuals/NetworkGraph.tsx`

**Visual spec recap:**
- viewBox `0 0 560 280`
- 14 hardcoded nodes in organic cluster. 4 marked critical (larger, accent ring + glow, pulse)
- Connection lines: 1px, opacity 0.12, mesh pattern
- Scan ring: 60-degree conical sector, rotates 360deg clockwise over 2.5s from center. Nodes illuminate (opacity 1.0, scale 1.15) as leading edge passes, fade back 0.5s
- Animation sequence: nodes staggered fade-in → scan ring sweep once → critical nodes pulse continuously
- Label: "80+ 節點掃描中" bottom-right, mono, dim
- Reduced motion: static final state, no scan ring, critical nodes highlighted without pulse

**Important:** SVG `scale` transforms need explicit `transformOrigin` per-element to scale from node center, not SVG origin `(0,0)`. Use `style={{ transformOrigin: '${x}px ${y}px' }}`.

- [ ] **Step 1: Create NetworkGraph.tsx**

```typescript
'use client';
import { motion, useReducedMotion } from 'framer-motion';
import type { ScenarioVisualProps } from './index';
import { GlowFilter } from './GlowFilter';

// Hardcoded node positions — pre-designed organic layout in 560x280 viewBox
const NODES: readonly { x: number; y: number; critical: boolean }[] = [
  // Critical nodes (4)
  { x: 230, y: 110, critical: true },
  { x: 310, y: 150, critical: true },
  { x: 260, y: 190, critical: true },
  { x: 350, y: 95, critical: true },
  // Regular nodes (10)
  { x: 150, y: 80, critical: false },
  { x: 180, y: 160, critical: false },
  { x: 130, y: 200, critical: false },
  { x: 200, y: 240, critical: false },
  { x: 340, y: 210, critical: false },
  { x: 400, y: 140, critical: false },
  { x: 420, y: 200, critical: false },
  { x: 380, y: 60, critical: false },
  { x: 290, y: 55, critical: false },
  { x: 450, y: 110, critical: false },
] as const;

// Connections: index pairs forming a mesh
const EDGES: readonly [number, number][] = [
  [0, 1], [0, 4], [0, 8], [1, 2], [1, 3], [1, 5], [2, 5], [2, 7],
  [3, 9], [3, 8], [4, 5], [4, 8], [5, 6], [6, 8], [6, 10],
  [7, 2], [7, 6], [9, 3], [9, 13], [10, 9], [11, 3], [11, 9], [12, 0], [12, 11], [13, 10],
] as const;

const CENTER_X = 290;
const CENTER_Y = 140;

export function NetworkGraph({ accentRgb, accentHex }: ScenarioVisualProps) {
  const reduced = useReducedMotion();
  const filterId = 'network-glow';

  return (
    <svg viewBox="0 0 560 280" className="w-full h-full" role="img" aria-label="利益網絡節點掃描示意圖">
      <defs>
        <GlowFilter rgb={accentRgb} id={filterId} stdDeviation={4} floodOpacity={0.5} />
        {/* Conical sector mask for scan ring — 60-degree wedge */}
        <clipPath id="scan-sector">
          <path d={`M${CENTER_X},${CENTER_Y} L${CENTER_X + 300},${CENTER_Y} A300,300 0 0,1 ${CENTER_X + 300 * Math.cos(Math.PI / 3)},${CENTER_Y + 300 * Math.sin(Math.PI / 3)} Z`} />
        </clipPath>
      </defs>

      {/* Connection lines */}
      {EDGES.map(([a, b], i) => (
        <motion.line
          key={`edge-${i}`}
          x1={NODES[a].x} y1={NODES[a].y}
          x2={NODES[b].x} y2={NODES[b].y}
          stroke="white"
          strokeWidth={1}
          initial={{ opacity: 0 }}
          {...(reduced
            ? { animate: { opacity: 0.12 } }
            : {
                whileInView: { opacity: 0.12 },
                viewport: { once: true, amount: 0.3 },
                transition: { duration: 0.5, delay: i * 0.02 },
              }
          )}
        />
      ))}

      {/* Scan ring — rotating sector (only if not reduced motion) */}
      {!reduced && (
        <motion.g
          style={{ transformOrigin: `${CENTER_X}px ${CENTER_Y}px` }}
          initial={{ rotate: 0, opacity: 0 }}
          whileInView={{ rotate: 360, opacity: [0, 0.6, 0.6, 0] }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 2.5, delay: 0.8, ease: 'linear' }}
          clipPath="url(#scan-sector)"
        >
          <circle cx={CENTER_X} cy={CENTER_Y} r={250} fill={`rgba(${accentRgb},0.08)`} />
          {/* Leading edge line */}
          <line x1={CENTER_X} y1={CENTER_Y} x2={CENTER_X + 300} y2={CENTER_Y} stroke={accentHex} strokeWidth={1} opacity={0.3} />
        </motion.g>
      )}

      {/* Nodes */}
      {NODES.map((node, i) => {
        const r = node.critical ? 8 : 4;
        const baseDelay = i * 0.05;

        return (
          <g key={`node-${i}`}>
            {/* Node circle — transformOrigin set to node center for correct scale animation */}
            <motion.circle
              cx={node.x}
              cy={node.y}
              r={r}
              fill={node.critical ? accentHex : 'rgba(255,255,255,0.15)'}
              style={{ transformOrigin: `${node.x}px ${node.y}px` }}
              {...(node.critical ? { filter: `url(#${filterId})` } : {})}
              initial={{ opacity: 0, scale: 0.5 }}
              {...(reduced
                ? { animate: { opacity: 1, scale: 1 } }
                : {
                    whileInView: { opacity: 1, scale: 1 },
                    viewport: { once: true, amount: 0.3 },
                    transition: { duration: 0.4, delay: baseDelay },
                  }
              )}
            />
            {/* Critical node accent ring + pulse — transformOrigin at node center */}
            {node.critical && (
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={r + 4}
                fill="none"
                stroke={accentHex}
                strokeWidth={1}
                style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                initial={{ opacity: 0 }}
                {...(reduced
                  ? { animate: { opacity: 0.5 } }
                  : {
                      animate: { opacity: [0.3, 0.6, 0.3], scale: [1, 1.08, 1] },
                      transition: { duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 3.5 + i * 0.2 },
                    }
                )}
              />
            )}
          </g>
        );
      })}

      {/* Label */}
      <motion.text
        x={520}
        y={268}
        fill="rgba(255,255,255,0.25)"
        fontSize={11}
        fontFamily="'JetBrains Mono', monospace"
        textAnchor="end"
        initial={{ opacity: 0 }}
        {...(reduced
          ? { animate: { opacity: 0.25 } }
          : {
              whileInView: { opacity: 0.25 },
              viewport: { once: true, amount: 0.3 },
              transition: { duration: 0.5, delay: 1.5 },
            }
        )}
      >
        80+ 節點掃描中
      </motion.text>
    </svg>
  );
}
```

- [ ] **Step 2: Verify it builds**

Run: `npx next build --no-lint 2>&1 | head -20`
Expected: No TypeScript errors

- [ ] **Step 3: Commit**

```bash
git add app/components/scenarios/visuals/NetworkGraph.tsx
git commit -m "feat(scenarios): add NetworkGraph SVG visual for card 02"
```

---

### Task 4: ConvergenceFunnel (Card 03 — 演化推演)

**Files:**
- Create: `app/components/scenarios/visuals/ConvergenceFunnel.tsx`

**Visual spec recap:**
- viewBox `0 0 560 280`
- 10 divergent paths fanning from origin (~40, 140). Each is a bezier curve going right
- 7-8 paths terminate at various x-positions with `×` marks (6x6px cross, `rgba(255,255,255,0.25)`, 0.15s fade-in)
- 1-2 surviving paths merge into a single bright accent line reaching endpoint (~520, 140) with glow
- Animation: all paths draw left-to-right via `pathLength`. Non-surviving paths stop + fade at elimination x. Surviving path glow intensifies at end
- Labels: "3.4M+ 路徑" left (dim), "最佳軌跡" right (bright)
- Reduced motion: static final state
- Pre-animation: opacity 0.15 → 1.0

- [ ] **Step 1: Create ConvergenceFunnel.tsx**

```typescript
'use client';
import { motion, useReducedMotion } from 'framer-motion';
import type { ScenarioVisualProps } from './index';
import { GlowFilter } from './GlowFilter';

// Path definitions: each has a d-attribute, whether it survives, and elimination x-position
interface FunnelPath {
  d: string;
  survives: boolean;
  eliminateX?: number;  // x where the × mark appears (only for non-surviving)
  eliminateY?: number;
}

const PATHS: readonly FunnelPath[] = [
  // Surviving path — the one that reaches the endpoint
  { d: 'M40,140 C120,140 200,130 280,135 Q380,140 520,140', survives: true },
  // Eliminated paths — fan out then stop
  { d: 'M40,140 C100,110 160,70 220,50',    survives: false, eliminateX: 220, eliminateY: 50 },
  { d: 'M40,140 C100,120 170,95 250,80',    survives: false, eliminateX: 250, eliminateY: 80 },
  { d: 'M40,140 C110,130 180,110 300,100',  survives: false, eliminateX: 300, eliminateY: 100 },
  { d: 'M40,140 C110,150 180,170 260,190',  survives: false, eliminateX: 260, eliminateY: 190 },
  { d: 'M40,140 C100,160 160,200 230,220',  survives: false, eliminateX: 230, eliminateY: 220 },
  { d: 'M40,140 C120,155 200,180 320,195',  survives: false, eliminateX: 320, eliminateY: 195 },
  { d: 'M40,140 C110,145 190,160 350,170',  survives: false, eliminateX: 350, eliminateY: 170 },
  { d: 'M40,140 C100,135 170,115 380,110',  survives: false, eliminateX: 380, eliminateY: 110 },
  { d: 'M40,140 C110,160 200,190 400,200',  survives: false, eliminateX: 400, eliminateY: 200 },
] as const;

// × mark component
function EliminationMark({ x, y, delay, reduced }: { x: number; y: number; delay: number; reduced: boolean | null }) {
  const half = 3; // 6px cross = ±3
  return (
    <motion.g
      initial={{ opacity: reduced ? 0.25 : 0 }}
      {...(reduced
        ? { animate: { opacity: 0.25 } }
        : {
            whileInView: { opacity: 0.25 },
            viewport: { once: true, amount: 0.3 },
            transition: { duration: 0.15, delay },
          }
      )}
    >
      <line x1={x - half} y1={y - half} x2={x + half} y2={y + half} stroke="rgba(255,255,255,0.25)" strokeWidth={1} />
      <line x1={x + half} y1={y - half} x2={x - half} y2={y + half} stroke="rgba(255,255,255,0.25)" strokeWidth={1} />
    </motion.g>
  );
}

export function ConvergenceFunnel({ accentRgb, accentHex }: ScenarioVisualProps) {
  const reduced = useReducedMotion();
  const filterId = 'convergence-glow';

  return (
    <svg viewBox="0 0 560 280" className="w-full h-full" role="img" aria-label="340萬次模擬路徑收斂至最佳軌跡">
      <defs>
        <GlowFilter rgb={accentRgb} id={filterId} stdDeviation={4} floodOpacity={0.5} />
      </defs>

      {/* Eliminated paths — thin, dim, various angles */}
      {PATHS.filter(p => !p.survives).map((p, i) => (
        <motion.path
          key={`elim-${i}`}
          d={p.d}
          fill="none"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth={1}
          {...(reduced
            ? { initial: { pathLength: 1, opacity: 0.12 }, animate: { pathLength: 1, opacity: 0.12 } }
            : {
                initial: { pathLength: 0, opacity: 0.15 },
                whileInView: { pathLength: 1, opacity: 0.12 },
                viewport: { once: true, amount: 0.3 },
                transition: { duration: 0.8, delay: i * 0.08, ease: 'easeOut' },
              }
          )}
        />
      ))}

      {/* Elimination × marks */}
      {PATHS.filter(p => !p.survives).map((p, i) => (
        <EliminationMark
          key={`x-${i}`}
          x={p.eliminateX!}
          y={p.eliminateY!}
          delay={0.8 + i * 0.08}
          reduced={reduced}
        />
      ))}

      {/* Surviving path — bright, thick, glow */}
      <motion.path
        d={PATHS[0].d}
        fill="none"
        stroke={accentHex}
        strokeWidth={2.5}
        filter={`url(#${filterId})`}
        {...(reduced
          ? { initial: { pathLength: 1, opacity: 1 }, animate: { pathLength: 1, opacity: 1 } }
          : {
              initial: { pathLength: 0, opacity: 0.15 },
              whileInView: { pathLength: 1, opacity: 1 },
              viewport: { once: true, amount: 0.3 },
              transition: { duration: 1.5, delay: 0.2, ease: 'easeOut' },
            }
        )}
      />

      {/* Endpoint glow dot */}
      <motion.circle
        cx={520}
        cy={140}
        r={5}
        fill={accentHex}
        filter={`url(#${filterId})`}
        initial={{ opacity: 0 }}
        {...(reduced
          ? { animate: { opacity: 1 } }
          : {
              whileInView: { opacity: [0, 1] },
              viewport: { once: true, amount: 0.3 },
              transition: { duration: 0.3, delay: 1.7 },
            }
        )}
      />

      {/* Labels */}
      <motion.text
        x={45}
        y={268}
        fill="rgba(255,255,255,0.25)"
        fontSize={11}
        fontFamily="'JetBrains Mono', monospace"
        initial={{ opacity: 0 }}
        {...(reduced
          ? { animate: { opacity: 0.25 } }
          : {
              whileInView: { opacity: 0.25 },
              viewport: { once: true, amount: 0.3 },
              transition: { duration: 0.5, delay: 0.5 },
            }
        )}
      >
        3.4M+ 路徑
      </motion.text>
      <motion.text
        x={515}
        y={268}
        fill={accentHex}
        fontSize={11}
        fontFamily="'JetBrains Mono', monospace"
        textAnchor="end"
        initial={{ opacity: 0 }}
        {...(reduced
          ? { animate: { opacity: 1 } }
          : {
              whileInView: { opacity: 1 },
              viewport: { once: true, amount: 0.3 },
              transition: { duration: 0.5, delay: 1.7 },
            }
        )}
      >
        最佳軌跡
      </motion.text>
    </svg>
  );
}
```

- [ ] **Step 2: Verify it builds**

Run: `npx next build --no-lint 2>&1 | head -20`
Expected: No TypeScript errors

- [ ] **Step 3: Commit**

```bash
git add app/components/scenarios/visuals/ConvergenceFunnel.tsx
git commit -m "feat(scenarios): add ConvergenceFunnel SVG visual for card 03"
```

---

### Task 5: Integrate New Visuals + Remove Old Canvas Code

**Files:**
- Modify: `app/components/scenarios/ScenarioCard.tsx` (lines 1-297 deleted/replaced, lines 338-404 modified)

- [ ] **Step 1: Rewrite ScenarioCard.tsx**

Remove: `WaveformVisual` (lines 10-109), `OrbVisual` (lines 114-199), `CometVisual` (lines 204-288), and the old `ModuleVisual` function (lines 291-297).

Replace with new imports and updated `ModuleVisual`:

At the top of the file, replace imports:
```typescript
'use client';

import { motion } from 'framer-motion';
import { type ScenarioData } from './scenarioData';
import { TimelineComparison, NetworkGraph, ConvergenceFunnel } from './visuals';
```

Replace the `ModuleVisual` function:
```typescript
function ModuleVisual({ type, rgb, hex }: { type: ScenarioData['visualType']; rgb: string; hex: string }) {
  switch (type) {
    case 'waveform': return <TimelineComparison accentRgb={rgb} accentHex={hex} />;
    case 'orb':      return <NetworkGraph accentRgb={rgb} accentHex={hex} />;
    case 'comet':    return <ConvergenceFunnel accentRgb={rgb} accentHex={hex} />;
    default:         return null;
  }
}
```

Update the call site in `ScenarioCard` (around line 399):
```diff
- <ModuleVisual type={data.visualType} rgb={accentRgb} />
+ <ModuleVisual type={data.visualType} rgb={accentRgb} hex={accentHex} />
```

Keep all other code unchanged: `cardVariants`, `HighlightedDescription`, `ScenarioCard`.

Remove these imports that are no longer needed:
```diff
- import { useRef, useEffect } from 'react';
- import { CTA_PLACEHOLDER, type ScenarioData } from './scenarioData';
+ import { type ScenarioData } from './scenarioData';
```

- [ ] **Step 2: Verify it builds**

Run: `npx next build --no-lint 2>&1 | head -20`
Expected: Clean build, no errors

- [ ] **Step 3: Visual check in dev server**

Run: `npm run dev`
Navigate to `http://localhost:3000`, scroll to the Scenarios section.
Verify:
- Card 01 shows timeline comparison with two curves + intervention marker
- Card 02 shows network node graph with connections and highlighted critical nodes
- Card 03 shows convergence funnel with paths converging to single bright line
- All animations trigger on scroll
- No console errors

- [ ] **Step 4: Commit**

```bash
git add app/components/scenarios/ScenarioCard.tsx app/components/scenarios/visuals/
git commit -m "feat(scenarios): replace Canvas decorative animations with meaningful SVG conceptual diagrams

- Card 01: Timeline comparison showing crisis before/after intervention
- Card 02: Network node graph with stakeholder scan animation
- Card 03: Convergence funnel showing path elimination to optimal trajectory
- All visuals use SVG + Framer Motion, no new dependencies
- Respects prefers-reduced-motion, includes pre-animation preview state"
```

---

### Task 6: Visual Polish + Final Verification

**Files:**
- Possibly tweak: any of the three visual components

- [ ] **Step 1: Test reduced motion**

In browser DevTools → Rendering → Emulate `prefers-reduced-motion: reduce`.
Verify all three visuals render static final state without animations.

- [ ] **Step 2: Test responsive**

Resize browser to mobile width (~375px). Verify SVGs scale correctly within cards and remain legible.

- [ ] **Step 3: Adjust curves/positions if needed**

After seeing the visuals rendered:
- If curves look wrong, adjust the SVG `d` path data
- If node positions overlap, adjust `NODES` coordinates
- If timing feels off, adjust Framer Motion `delay` / `duration` values

This is a visual tuning step — make judgement calls based on how it looks.

- [ ] **Step 4: Final commit if any tweaks were made**

```bash
git add -A
git commit -m "fix(scenarios): visual polish for SVG diagram positions and timing"
```
