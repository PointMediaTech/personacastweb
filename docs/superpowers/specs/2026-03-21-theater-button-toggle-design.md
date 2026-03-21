# 推演劇場按鈕 Toggle State 設計

**Date:** 2026-03-21
**Scope:** `src/components/hero/HeroContent.tsx` — 首頁「啟動推演劇場」CTA 按鈕樣式重構
**Approach:** 方案 A — 經典控制台切換

## 設計目標

採用「二元狀態切換 (Toggle State)」的視覺邏輯，讓按鈕在 inactive 時強調「指令感」引導點擊，active 時「退居二線」讓右側決策卡片成為視覺焦點。

## 刻意變更清單（與現有實作的差異）

以下變更皆為設計決策，非遺漏：

1. **Inactive 背景色**：從純白 `bg-white` 改為 strategic-blue `#769EDB`
2. **Inactive 文字色**：從深藍 `#0A1128` 改為白色 `#FFFFFF`
3. **Inactive hover glow**：從白色 `rgba(255,255,255,0.15)` 改為同色系 `rgba(118,158,219,0.25)`
4. **Active 文字**：從英文 `SIMULATION ACTIVE` 改為中文「推演運行中」
5. **HeroContent 檔頭註解**（第 23 行）需同步更新為新的色彩說明

## Inactive 狀態（點擊前）

| 屬性 | 值 |
|---|---|
| 背景色 | `#769EDB`（strategic-blue）實心 — **變更自 `bg-white`** |
| 文字色 | `#FFFFFF` 白色 — **變更自 `#0A1128`** |
| 文字 | 「啟動推演劇場」（維持現有） |
| 圖示 | Play icon（lucide `Play`），白色（繼承文字色），左側 |
| 圓角 | `rounded-sm`（維持現有） |
| Padding | `px-10 py-4`（維持現有） |
| 字級 | `text-[15px] font-bold tracking-wide`（維持現有） |
| Hover | `box-shadow: 0 0 30px 6px rgba(118,158,219,0.25)` — **變更自白色 glow** |
| 過渡 | `transition-all duration-400`（維持現有，專案已擴展 Tailwind 支援此值） |

## Active 狀態（點擊後）

| 屬性 | 值 |
|---|---|
| 背景色 | `transparent` — 底色完全消失 |
| 邊框 | `1px solid rgba(255,184,0,0.3)` — 細金色邊框（維持現有） |
| 文字色 | `#FFB800`（insight-gold）（維持現有） |
| 文字 | 「推演運行中」 — **變更自 `SIMULATION ACTIVE`** |
| 圖示 | Play icon 移除，改為黃色呼吸燈圓點（左側）（維持現有） |
| 呼吸燈 | `w-2 h-2` 圓點，`#FFB800`，opacity `1 → 0.3 → 1`，`duration: 1.5s`，`ease: easeInOut`，`repeat: Infinity`（維持現有 Framer Motion 參數） |
| Hover | 邊框提亮至 `rgba(255,184,0,0.5)`（維持現有） |
| Padding / 圓角 / 字級 | 與 inactive 完全一致，確保按鈕尺寸不跳動 |

## Accessibility

| 屬性 | 說明 |
|---|---|
| `aria-pressed` | 按鈕加上 `aria-pressed={theaterActive}`，向螢幕閱讀器傳達 toggle 狀態 |
| `focus-visible` | 加上 `focus-visible:ring-2 focus-visible:ring-strategic-blue/60 focus-visible:ring-offset-2 focus-visible:ring-offset-deep-space`，確保鍵盤導航可見 |

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

僅修改 `src/components/hero/HeroContent.tsx` 中的第一個 `<button>` 元素（CTA flex 容器內），包括：
- className 中的條件樣式
- style 中的 color 屬性
- 按鈕內部的文字和圖示渲染邏輯
- 新增 `aria-pressed` 屬性
- 新增 `focus-visible` ring 樣式
- 更新檔頭色彩註解（第 23 行）
