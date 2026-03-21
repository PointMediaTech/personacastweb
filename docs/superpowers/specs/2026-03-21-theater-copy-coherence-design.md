# Theater Copy Coherence: HUD Labels ↔ Decision Cards Narrative Bridge

## Problem

The HUD labels (pre-theater) and Decision Cards (post-theater) occupy the same screen positions and morph between each other, but their copy has almost no semantic relationship:

- **HUD labels** describe abstract system status: "risk vectors diverging", "scenario lock: 2.1M paths", "outcome: controlled"
- **Decision cards** describe specific PR crisis strategies: "主動式誠意溝通", "法規防禦部署", "議題重構策略"

Users experience a narrative gap when pressing "啟動推演劇場" — the content jumps from generic AI metrics to a specific crisis scenario with no causal bridge.

## Solution

Rewrite HUD labels as **crisis detection indicators** that 1:1 map to the Decision Cards. The narrative becomes:

> **Detect threat → Press button → AI presents response strategies**

Each HUD label detects a problem; the corresponding Decision Card (same position, same morph) proposes the solution.

## Changes

### 1. theaterData.ts — HUD_LABELS

#### HUD_LABELS[0] (maps to Decision A: 主動式誠意溝通 / PR PIVOT)

| Field | Before | After |
|---|---|---|
| text | `RISK VECTORS: DIVERGING` | `PUBLIC SENTIMENT: SPREADING` |
| textZh | `風險向量：擴散中` | `公眾情緒：負面擴散中` |
| value | _(none)_ | _(no change)_ |
| valueZh | _(none)_ | _(no change)_ |
| accentColor | `#B57D7D` | `#B57D7D` _(no change)_ |

#### HUD_LABELS[1] (maps to Decision B: 法規防禦部署 / LEGAL WAR)

| Field | Before | After |
|---|---|---|
| text | `SCENARIO LOCK:` | `REGULATORY: VIOLATION DETECTED` |
| textZh | `情境鎖定：` | `法規合規：潛在違規偵測` |
| value | `2.1M PATHS` | _(remove)_ |
| valueZh | `2.1M 路徑` | _(remove)_ |
| accentColor | `#769EDB` | `#769EDB` _(no change)_ |

#### HUD_LABELS[2] (maps to Decision C: 議題重構策略 / DIVERSION)

| Field | Before | After |
|---|---|---|
| text | `OUTCOME: CONTROLLED ✓` | `TOPIC HEAT: GOING VIRAL` |
| textZh | `結果：已控制 ✓` | `議題熱度：社群發酵中` |
| accentColor | `#4ADE80` | `#E2A76F` |

**Color rationale for #3:** The original green (`#4ADE80`) conveyed "controlled/positive". The new copy describes an escalating threat, so warm orange (`#E2A76F`) better matches the "heating up" semantics.

### 2. HeroContent.tsx — Bottom Status Bar

| Label | Before | After | Rationale |
|---|---|---|---|
| Agent count | `2 Agents Active` | _(no change)_ | Generic, works as-is |
| Time label | `Simulation: T+56H` | `Crisis Window: T-56H` | Countdown framing matches 72H decision window |
| Conflict label | `Conflict: 72%` | `Sentiment: 72%` | Echoes "公眾情緒" detection indicator |
| Paths label | `Paths Analyzed: 3.4M+` | `Scenarios: 3.4M+` | "Scenarios" aligns with simulation theater language |

### 3. What Does NOT Change

- **Decision Cards** — all copy, structure, metrics, tags, styles untouched
- **ChaosFlowCanvas** — no changes
- **SimulationTheater** — no logic changes
- **HUDLabel component** — generic renderer, consumes config, no changes needed
- **Positions, animations, morph transitions** — all untouched
- **SimulationResult** — no changes

## Files Affected

1. `src/components/hero/theaterData.ts` — HUD_LABELS array (text, textZh, value, valueZh, accentColor)
2. `src/components/hero/HeroContent.tsx` — bottom status bar text labels
