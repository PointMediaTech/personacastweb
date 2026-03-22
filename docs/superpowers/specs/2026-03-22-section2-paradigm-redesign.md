# Section 2 (Paradigm Shift) 重構設計規格

> **日期**：2026-03-22
> **範圍**：首頁 Section 2 — 文案重寫 + 排版重構
> **不在範圍內**：圖表內容重新設計、其他 section 的 min-h-screen 改造

---

## 1. 設計目標

- 解決現有「兩塊磚頭堆疊左側、右側留白」的視覺失衡問題
- 將對比感從「上下堆疊」升級為「左右對撞」
- 文案語氣從「恐懼驅動」調整為「賦權掌控」
- Section 高度拉至全螢幕（`min-h-screen`），與 Hero Section 一致

---

## 2. 文案定稿

### 2.1 標題區（置中）

| 元素 | 內容 |
|------|------|
| Eyebrow | `PARADIGM SHIFT` |
| H2 | 輿論定型前，掌控您的劇本。 |
| 副文案 | 當對手還在猜測您的下一步，您已在千萬次推演中看透結局。領先 72 小時佈局，讓每場危機都成為您的主場。 |

### 2.2 左卡片（事後救火）

| 元素 | 內容 |
|------|------|
| 狀態標籤 | `REACTIVE MODE`（紅色圓點） |
| H3 | 事後救火：昂貴的徒勞 |
| 內文 | 傳統工具只記錄失敗。當負面聲量爆發，傷害已成定局 —— 您在盲目博弈，對手在看您失血。 |

### 2.3 右卡片（預見式導航）

| 元素 | 內容 |
|------|------|
| 狀態標籤 | `PROACTIVE MODE`（cyan 圓點帶 glow） |
| H3 | 預見式導航：寫好的勝局 |
| 內文 | 行動前推演千萬次。鎖定 T+36h 最佳反擊窗口，看穿 80% 利益關係人的底牌，贏得毫無懸念。 |

### 2.4 數據標籤（右卡底部）

- `3.4M+ 情境模擬`
- `T+72h 預測深度`
- `80% 行為洞察`

### 2.5 CTA

- `了解預演算法如何運作 →`

---

## 3. 排版結構

### 3.1 整體容器

- `min-h-screen` + `flex flex-col justify-center` — 內容垂直居中於視口
- `SectionWrapper` 覆寫 padding 為 `py-24 lg:py-0`
- 保留 `ScanlineBackground` 背景動畫
- 對比區容器：`max-w-7xl mx-auto`

### 3.2 標題區

- 全部置中對齊
- Eyebrow：`font-mono`, `text-[11px]`, `tracking-[4px]`, `text-strategic-blue`
- H2：`text-5xl md:text-6xl lg:text-7xl`, `font-extrabold`, `font-heading`, `tracking-tighter`
- 副文案：`text-lg lg:text-xl`, `text-slate-300`, `max-w-3xl mx-auto`
- 標題與對比區間距：`mb-16 lg:mb-24`

### 3.3 對比區佈局

```
桌面端 (>= 1024px)：

┌──────────────┐ ┃ ┌──────────────────┐
│ 45%          │ ┃ │ 55%              │
│ 左卡（暗）    │漸│ 右卡（亮）         │
│ rounded-l-2xl│層│ rounded-r-2xl     │
│ rounded-r-0  │線│ rounded-l-0       │
└──────────────┘ ┃ └──────────────────┘

手機端 (< 1024px)：

┌──────────────────┐
│ 左卡（暗）        │
│ rounded-2xl      │
└──────────────────┘
───── 水平漸層線 ─────
┌──────────────────┐
│ 右卡（亮）        │
│ rounded-2xl      │
└──────────────────┘
```

- Flex 容器：`flex flex-col lg:flex-row gap-0`

### 3.4 漸層分隔線

- **桌面端**：垂直線，`w-px`，`self-stretch`
  - 漸層：`from-alert-red/40 via-transparent to-aurora-cyan/40`
- **手機端**：水平線，`h-px w-full`，`my-6`
  - 漸層方向改 `to right`（`from-alert-red/40 via-transparent to-aurora-cyan/40`）
- `aria-hidden="true"`（純裝飾）

### 3.5 CTA 區

- 位置：對比區下方，`mt-12 lg:mt-16`，置中
- 樣式：`text-strategic-blue hover:text-aurora-cyan transition-colors`
- 字體：`font-mono text-sm tracking-wide`
- 使用 `<a>` 或 `<Link>`（導航行為，非 `<button>`）

---

## 4. 左卡片設計細節

### 4.1 佈局

- 寬度：`lg:w-[45%]`
- 內距：`p-8 lg:p-10`
- 圓角：桌面 `rounded-l-2xl rounded-r-none`，手機 `rounded-2xl`
- 內部垂直排列：狀態標籤 → H3 → 內文 → 圖表佔位區

### 4.2 視覺調性（褪色、過時）

- 背景：`bg-red-950/15`，疊加 `radial-gradient(ellipse at center, rgba(255,77,77,0.05), transparent)`
- 整卡 `opacity-75`
- 狀態標籤圓點：`bg-alert-red/50`
- 狀態標籤文字：`text-alert-red/50`
- H3：`text-[#888]`
- 內文：`text-[#666]`

### 4.3 圖表佔位區

- `h-40 lg:h-48`
- `rounded-xl`
- `bg-red-950/10`
- `border border-dashed border-white/10`
- 目前保留 `TraditionalChart.tsx`，日後替換

---

## 5. 右卡片設計細節

### 5.1 佈局

- 寬度：`lg:w-[55%]`
- 內距：`p-8 lg:p-10`
- 圓角：桌面 `rounded-r-2xl rounded-l-none`，手機 `rounded-2xl`
- 內部垂直排列：狀態標籤 → H3 → 內文 → 圖表佔位區 → 數據標籤列

### 5.2 視覺調性（清晰、掌控）

- 背景：`bg-blue-950/20`，疊加雙層 radial gradient（strategic-blue + aurora-cyan 光暈）
- 邊框：`border border-aurora-cyan/15`
- 外光暈：`shadow-[0_0_30px_rgba(0,242,255,0.06)]`
- 狀態標籤圓點：`bg-aurora-cyan`，帶 `shadow-[0_0_10px_rgba(0,242,255,0.6)]` glow
- 狀態標籤文字：`text-aurora-cyan`
- H3：`text-white font-bold`
- 內文：`text-mist-blue-gray`

### 5.3 圖表佔位區

- `h-40 lg:h-48`
- `rounded-xl`
- `bg-blue-950/15`
- `border border-dashed border-aurora-cyan/15`
- 目前保留 `PredictionPath.tsx`，日後替換

### 5.4 數據標籤列

- 容器：`flex gap-3 mt-6`
- 每個標籤：
  - `px-3 py-1.5`
  - `rounded-md`
  - `bg-aurora-cyan/8`
  - `border border-aurora-cyan/15`
  - `font-mono text-[11px] tracking-wider text-aurora-cyan/80`
- 三個標籤內容：`3.4M+ 情境模擬` / `T+72h 預測深度` / `80% 行為洞察`

---

## 6. 動畫

| 元素 | 方向 | delay | duration | 備註 |
|------|------|-------|----------|------|
| 標題區 | fade-in + from top | 0s | 0.6s | 維持現有 ScrollReveal |
| 左卡片 | from left | 0s | 0.6s | 改方向：原 `up` → `left` |
| 右卡片 | from right | 0.15s | 0.6s | 改方向：原 `up` → `right` |
| 數據標籤 1 | fade-in | 0.3s | 0.4s | stagger |
| 數據標籤 2 | fade-in | 0.45s | 0.4s | stagger |
| 數據標籤 3 | fade-in | 0.6s | 0.4s | stagger |
| 漸層分隔線 | fade-in | 0.1s | 0.5s | 配合左右卡出現 |

- 所有動畫遵守 `prefers-reduced-motion`
- Easing：`cubic-bezier(0.22, 1, 0.36, 1)`（維持現有）

---

## 7. 元件架構

```
components/paradigm/
├── ParadigmSection.tsx      # Server Component — 標題區 + CTA
├── ComparisonPanel.tsx      # 'use client' — 重構：左右佈局容器 + 漸層線
├── TraditionalChart.tsx     # 不修改，保留於左卡圖表區
├── PredictionPath.tsx       # 不修改，保留於右卡圖表區
├── ScanlineBackground.tsx   # 不變
└── DataTags.tsx             # 新增：三個數據標籤元件
```

### 7.1 變更摘要

| 檔案 | 動作 | 說明 |
|------|------|------|
| `ParadigmSection.tsx` | 修改 | 更新文案、容器改 `min-h-screen` + flex 居中、新增 CTA |
| `ComparisonPanel.tsx` | 重構 | 從上下堆疊改為左右並排 45/55、新增漸層分隔線、整合 DataTags |
| `DataTags.tsx` | 新增 | 三個數據標籤，獨立元件方便日後替換 |
| `TraditionalChart.tsx` | 不動 | — |
| `PredictionPath.tsx` | 不動 | — |
| `ScanlineBackground.tsx` | 不動 | — |

---

## 8. SEO 與可及性

- `<section aria-label="範式轉移">`
- `<h2>`：輿論定型前，掌控您的劇本。
- `<h3>` × 2：事後救火：昂貴的徒勞 / 預見式導航：寫好的勝局
- 漸層分隔線：`aria-hidden="true"`
- 數據標籤：保留可讀文字，不用 `aria-label` 覆寫
- CTA：`<a>` 或 `<Link>`，含完整文字（`了解預演算法如何運作`）

---

## 9. 響應式行為

| 斷點 | 佈局 | 卡片圓角 | 分隔線 |
|------|------|----------|--------|
| `>= 1024px` | 左右並排 45%/55% | 左卡 `rounded-l-2xl rounded-r-none`，右卡反之 | 垂直 `w-px` |
| `< 1024px` | 上下堆疊，等寬 | 兩卡皆 `rounded-2xl` | 水平 `h-px`，`my-6` |
