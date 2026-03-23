# Homepage SEO Structured Data Design

**Date:** 2026-03-23
**Status:** Draft
**Scope:** PersonaCast 首頁 SEO 結構化優化

## Overview

為 PersonaCast（AI 戰略推演平台）首頁建立完整的 SEO 基礎架構，讓搜尋引擎能以高度結構化的方式理解網站內容。目標市場為全球，網站定位為 SaaS 產品。架構預留未來多頁面及多語言擴展能力。

## Decision Context

### 選擇方案 B（Next.js SEO 基礎架構）的原因

- 方案 A（靜態檔案最小實作）不支援多語言與動態擴展
- 方案 C（全方位 SEO + 效能優化）範圍過大，超出當前需求
- 方案 B 在結構完整性與實施成本間取得平衡

## 1. Metadata 架構

### Root Layout Metadata 強化（`app/layout.tsx`）

強化現有 metadata，使用 Next.js Metadata API：

- **`metadataBase`**: 設定為正式域名，讓所有相對路徑自動解析為絕對 URL
- **`title`**: 使用 `{ default, template }` 格式，`template: '%s | PersonaCast'` 支援未來子頁面自動繼承品牌名
- **`description`**: 保留現有描述（~160 字元，長度適當）
- **`keywords`**: 中英雙語關鍵字陣列，覆蓋全球市場（如 `AI戰略推演`、`AI sentiment analysis`、`persona modeling`）
- **`authors` / `creator` / `publisher`**: 設定為 `PersonaCast`
- **`alternates`**: 加入 `canonical` URL 和 `languages`（`zh-TW`、`en`）預留 hreflang
- **`openGraph`**: 完整設定含 `images`、`url`、`siteName`、`locale`、`type`
- **`twitter`**: 含 `creator` handle
- **`robots`**: 明確設定 `index: true`、`follow: true`、`googleBot['max-image-preview']: 'large'`

## 2. JSON-LD 結構化資料（多層 Schema）

取代現有單一硬編碼 `SoftwareApplication` schema，建立多層結構。

### Schema 層次

| Schema | 用途 |
|--------|------|
| **WebSite** | 網站層級資訊：name、url、potentialAction(SearchAction) |
| **Organization** | 公司資訊：name、url、logo、sameAs(社群連結)、address(台北)、contactPoint |
| **SoftwareApplication** | 產品主體（強化版）：applicationCategory、operatingSystem、offers、featureList |
| **Product x3** | 三大子產品：PersonaLab、Strategy Graph、Casting Arena，各有 name、description、brand、category |
| **BreadcrumbList** | 麵包屑導航：首頁 > (未來子頁面) |

### 實作方式

建立 `app/lib/structured-data.ts` 模組：

```typescript
export function generateWebSiteSchema(): WithContext<WebSite> { ... }
export function generateOrganizationSchema(): WithContext<Organization> { ... }
export function generateSoftwareAppSchema(): WithContext<SoftwareApplication> { ... }
export function generateProductSchemas(): WithContext<Product>[] { ... }
export function generateBreadcrumbSchema(items: BreadcrumbItem[]): WithContext<BreadcrumbList> { ... }
```

- 每個 schema 是獨立純函數，回傳型別安全的 JSON-LD object
- 使用 `schema-dts` 套件提供 TypeScript 型別定義
- 在 `page.tsx` 中透過 `<script type="application/ld+json">` 注入多個 schema

## 3. robots.ts + sitemap.ts

### robots.ts（`app/robots.ts`）

使用 Next.js Route Handler 動態生成：

- `userAgent: '*'`：允許所有爬蟲
- `allow: '/'`：允許爬取所有頁面
- `disallow: ['/api/', '/private/']`：禁止爬取 API 和私有路徑
- 指向 sitemap URL

### sitemap.ts（`app/sitemap.ts`）

動態生成 sitemap：

- 首頁條目：`priority: 1.0`、`changeFrequency: 'weekly'`
- `alternates.languages` 預留 `zh-TW` 和 `en`
- 未來新增頁面時在此擴展，可改為從資料庫/CMS 動態讀取

## 4. 語義化 HTML 優化

### Heading Hierarchy

確保首頁 heading 結構正確：

```
<h1> — PersonaCast 主標題（每頁僅一個）
  <h2> — Section 2: 典範轉移
  <h2> — Section 3: 三大核心產品
    <h3> — PersonaLab
    <h3> — Strategy Graph
    <h3> — Casting Arena
  <h2> — Section 4: 場景推演
  <h2> — Section 5: 實證數據
  <h2> — Section 6: CTA
```

### 語義化改進

- 所有 `<section>` 確保有 `aria-label` 或 heading
- 圖片使用語義化 `alt` 屬性（裝飾圖用 `alt=""`）
- 連結使用描述性 anchor text
- Footer 中未啟用的連結移除或標記 `aria-disabled`，避免爬蟲抓到死連結

## 5. i18n 預留架構

**現階段不建立多語言頁面**，僅做架構預留：

- `<html lang="zh-Hant">` 保持不變
- metadata 中 `alternates.languages` 先寫入
- 建立 `app/lib/seo-config.ts` 集中管理 SEO 常數（baseUrl、品牌名、社群連結等）
- 未來 i18n 時在 `seo-config.ts` 擴展翻譯映射，使用 `[locale]/` 路由結構

## 6. Open Graph Image

### 動態 OG Image（`app/opengraph-image.tsx`）

使用 Next.js 內建 `ImageResponse` API（基於 Satori）：

- 自動生成 1200x630 品牌化分享圖
- 包含 PersonaCast logo、標語、品牌色彩
- 未來子頁面可覆寫產生獨立 OG image
- 不需外部服務或手動管理圖片檔案

## File Changes

### 新增檔案

| 檔案 | 用途 |
|------|------|
| `app/robots.ts` | 動態 robots.txt 生成 |
| `app/sitemap.ts` | 動態 sitemap.xml 生成 |
| `app/opengraph-image.tsx` | 動態 OG 分享圖生成 |
| `app/lib/structured-data.ts` | JSON-LD schema 生成函數 |
| `app/lib/seo-config.ts` | SEO 常數集中管理 |

### 修改檔案

| 檔案 | 變更 |
|------|------|
| `app/layout.tsx` | 強化 metadata（metadataBase、title template、alternates、robots 等） |
| `app/page.tsx` | 替換硬編碼 JSON-LD 為模組化 schema；檢查 heading hierarchy |

### 新增依賴

| 套件 | 用途 |
|------|------|
| `schema-dts` | JSON-LD TypeScript 型別定義 |

## Out of Scope

- 多語言頁面實作（僅預留架構）
- Performance / Core Web Vitals 優化
- Analytics 整合（GA4、Search Console）
- 新子頁面建立（Blog、About 等）
- 圖片壓縮 / next/image 優化

## Validation

完成後使用以下工具驗證：

- **Google Rich Results Test** — 驗證結構化資料
- **Schema.org Validator** — 驗證 JSON-LD 語法
- **Lighthouse SEO audit** — 整體 SEO 分數
- **Open Graph debugger**（Facebook / Twitter）— 驗證分享預覽
