# PersonaCast Web — CLAUDE.md

## 專案概述

PersonaCast 是一個 AI 戰略推演平台，協助企業領導者在行動前 72 小時進行情境模擬與決策預演。
本倉庫為官方行銷網站，基於 Next.js App Router 建構。

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4（使用 `@theme` 定義 CSS 變數，無 `tailwind.config.js`）
- **Fonts**: Google Fonts — Plus Jakarta Sans（標題）、Inter（內文）、JetBrains Mono（等寬）
- **語系**: zh-Hant（正體中文）

## 色系標準（Design Token）

定義於 `app/globals.css` 的 `@theme` 區塊，以 CSS 變數形式暴露，Tailwind 可直接以 `text-*` / `bg-*` / `border-*` 使用。

### 主要色彩

| Token | CSS 變數 | Hex | 用途 |
|---|---|---|---|
| `deep-space` | `--color-deep-space` | `#020617` | 頁面背景（主色） |
| `strategic-blue` | `--color-strategic-blue` | `#769EDB` | 主要強調色、CTA 輔助 |
| `aurora-cyan` | `--color-aurora-cyan` | `#00F2FF` | 互動高亮、nav 底線、聚焦環 |
| `logo-navy` | `--color-logo-navy` | `#0A3D7A` | Logo 深藍 |
| `logo-cyan` | `--color-logo-cyan` | `#00A3E0` | Logo 水藍 |

### 輔助色彩

| Token | CSS 變數 | Hex | 用途 |
|---|---|---|---|
| `dried-rose` | `--color-dried-rose` | `#B57D7D` | 溫和警示、人物角色標示 |
| `mist-blue-gray` | `--color-mist-blue-gray` | `#8892B0` | 次要文字、說明文字 |
| `insight-gold` | `--color-insight-gold` | `#FFB800` | 洞察標籤、重點標示 |
| `amber-warn` | `--color-amber-warn` | `#FFAD00` | 警告狀態 |
| `alert-red` | `--color-alert-red` | `#FF4D4D` | 錯誤、高風險指示 |

### 使用規則

1. **背景**：永遠以 `deep-space` (`#020617`) 為基底。
2. **主要 CTA**：使用 `aurora-cyan` 邊框搭配半透明填色（參考 `.cta-ghost`）。
3. **聚焦環（focus-visible）**：統一使用 `aurora-cyan`，`outline-offset: 4px`。
4. **互動高亮**：nav link hover / active 使用 `aurora-cyan` 底線 + text-shadow glow。
5. **警告階層**：`insight-gold` → `amber-warn` → `alert-red`（由低到高）。
6. **不得**在新元件中引入上述清單以外的品牌色。

## 字型標準

| 用途 | Font Family | CSS 變數 | Tailwind |
|---|---|---|---|
| 標題（H1–H3） | Plus Jakarta Sans | `--font-heading` | `font-heading` |
| 內文 | Inter | `--font-body` | `font-body` |
| 程式碼 / 等寬 | JetBrains Mono | `--font-mono` | `font-mono` |

## CSS 工具類別

定義於 `app/globals.css`，直接使用 class 名稱：

| Class | 說明 |
|---|---|
| `.nav-link` | 導覽連結，含底線展開動畫與 glow hover |
| `.nav-bar` | 頂部導覽列容器，含漸層底線 |
| `.cta-ghost` | Ghost 樣式 CTA 按鈕（cyan 邊框） |
| `.cta-void-button` | 深色背景呼吸 glow CTA（#00FFC2） |
| `.scanline-overlay` | 掃描線疊加效果（Strategic Records 區塊） |

## 目錄結構

```
app/
├── globals.css          # 設計 Token、全域 CSS
├── layout.tsx           # 根 Layout（Navbar + FooterSection）
├── page.tsx             # 首頁
├── about/               # 關於頁面
├── pricing/             # 定價頁面
├── product/             # 產品介紹
├── solutions/           # 解決方案
├── resources/           # 資源中心
├── contact/             # 聯絡我們
├── components/
│   ├── shared/          # 共用元件（Navbar、PageHero、BottomCTA…）
│   ├── footer/          # Footer 元件
│   └── product/         # 產品相關元件
└── lib/
    └── seo-config.ts    # SEO 設定
```

## 開發規範

- 所有新元件放在 `app/components/shared/` 或對應功能目錄。
- 元件檔案上限 **800 行**，超過則拆分。
- 禁止使用 `framer-motion`（已移除，改用純 CSS animation）。
- 動畫需遵守 `@media (prefers-reduced-motion: reduce)` 規則。
- 所有圖片須提供有意義的 `alt` 文字。
