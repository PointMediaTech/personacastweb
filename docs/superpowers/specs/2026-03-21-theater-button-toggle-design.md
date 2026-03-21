# 推演劇場按鈕 Toggle State 設計

**Date:** 2026-03-21
**Scope:** `src/components/hero/HeroContent.tsx` — 首頁「啟動推演劇場」CTA 按鈕樣式重構
**Approach:** 方案 A — 經典控制台切換

## 設計目標

採用「二元狀態切換 (Toggle State)」的視覺邏輯，讓按鈕在 inactive 時強調「指令感」引導點擊，active 時「退居二線」讓右側決策卡片成為視覺焦點。

## Inactive 狀態（點擊前）

| 屬性 | 值 |
|---|---|
| 背景色 | `#769EDB`（strategic-blue）實心 |
| 文字色 | `#FFFFFF` 白色 |
| 文字 | 「啟動推演劇場」 |
| 圖示 | Play icon（lucide `Play`），白色，左側 |
| 圓角 | `rounded-sm`（維持現有） |
| Padding | `px-10 py-4`（維持現有） |
| 字級 | `text-[15px] font-bold tracking-wide`（維持現有） |
| Hover | `box-shadow: 0 0 30px 6px rgba(118,158,219,0.25)` — 同色系微光 |
| 過渡 | `transition-all duration-400`（維持現有） |

## Active 狀態（點擊後）

| 屬性 | 值 |
|---|---|
| 背景色 | `transparent` — 底色完全消失 |
| 邊框 | `1px solid rgba(255,184,0,0.3)` — 細金色邊框 |
| 文字色 | `#FFB800`（insight-gold） |
| 文字 | 「推演運行中」 |
| 圖示 | Play icon 移除，改為黃色呼吸燈圓點（左側） |
| 呼吸燈 | `w-2 h-2` 圓點，`#FFB800`，opacity `1 → 0.3 → 1`，`duration: 1.5s`，`ease: easeInOut` |
| Hover | 邊框提亮至 `rgba(255,184,0,0.5)` |
| Padding / 圓角 / 字級 | 與 inactive 完全一致，確保按鈕尺寸不跳動 |

## 狀態過渡動畫

| 屬性 | 說明 |
|---|---|
| 方式 | CSS `transition-all duration-400` 一次處理 bg-color、border、color 的變化 |
| 效果 | 青色底 fade out → 透明，同時邊框 fade in，文字色從白切換到金，~400ms 平滑過渡 |
| 圖示切換 | Play icon → 呼吸燈圓點，瞬間替換（背景色過渡已提供足夠的視覺連續性） |

## 不變的部分

- 右側「檢視戰略報告」按鈕 — 不做任何修改
- 底部狀態列（2 Agents Active, Simulation: T+56H 等） — 不做任何修改
- SimulationTheater 的 HUD labels / Decision cards 行為 — 不做任何修改

## 修改範圍

僅修改 `src/components/hero/HeroContent.tsx` 第 84-108 行的按鈕元素，包括：
- className 中的條件樣式
- style 中的 color 屬性
- 按鈕內部的文字和圖示渲染邏輯
