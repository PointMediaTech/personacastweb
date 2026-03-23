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

- **`metadataBase`**: `new URL('https://personacast.io')`（與現有 JSON-LD 中使用的域名一致）
- **`title`**: 使用 `{ default, template }` 格式，`template: '%s | PersonaCast'` 支援未來子頁面自動繼承品牌名
- **`description`**: 保留現有描述（~160 字元，長度適當）
- **`keywords`**: 中英雙語關鍵字陣列，覆蓋全球市場（如 `AI戰略推演`、`AI sentiment analysis`、`persona modeling`）
- **`authors` / `creator` / `publisher`**: 設定為 `PersonaCast`
- **`alternates`**: 加入 `canonical: '/'`。**不加入 `languages` 直到對應語言頁面實際存在**，避免 hreflang 指向不存在的頁面導致 Google 誤判
- **`openGraph`**: 完整設定含 `images`、`url`、`siteName`、`locale: 'zh_TW'`、`type: 'website'`
- **`twitter`**: 含 `creator` handle
- **`robots`**: 明確設定 `index: true`、`follow: true`、`googleBot['max-image-preview']: 'large'`
- **`icons`**: 保留現有 `icon: '/point_ico.ico'`，並新增 `apple-touch-icon` 供 iOS 裝置使用

## 2. JSON-LD 結構化資料（多層 Schema）

取代現有單一硬編碼 `SoftwareApplication` schema，建立多層結構。

### Schema 層次

| Schema | 用途 |
|--------|------|
| **WebSite** | 網站層級資訊：name、url（不含 SearchAction，待搜尋功能上線後再加入） |
| **Organization** | 公司資訊：name、url、logo、sameAs(Twitter/LinkedIn/GitHub)、address(台北)、contactPoint |
| **SoftwareApplication** | 產品主體（強化版）：applicationCategory: 'BusinessApplication'、operatingSystem: 'Web'、offers、**featureList**（列出 PersonaLab、Strategy Graph、Casting Arena 三大功能描述） |
| **BreadcrumbList** | 麵包屑導航：首頁 > (未來子頁面) |

> **設計決策：** 不為三大子功能建立獨立 `Product` schema。目前它們是首頁內的功能區塊，沒有獨立 URL 或定價，使用 `Product` schema 可能產生 Google Rich Results 警告。改為在 `SoftwareApplication.featureList` 中列舉。待未來各功能有獨立 landing page 時再升級為 `Product` schema。

### 實作方式

建立 `app/lib/structured-data.ts` 模組：

```typescript
export function generateWebSiteSchema(): WithContext<WebSite> { ... }
export function generateOrganizationSchema(): WithContext<Organization> { ... }
export function generateSoftwareAppSchema(): WithContext<SoftwareApplication> { ... }
export function generateBreadcrumbSchema(items: BreadcrumbItem[]): WithContext<BreadcrumbList> { ... }
```

- 每個 schema 是獨立純函數，回傳型別安全的 JSON-LD object
- 使用 `schema-dts` 套件提供 TypeScript 型別定義
- 在 `page.tsx` 中透過 `<script type="application/ld+json">` 注入多個 schema

## 3. robots.ts + sitemap.ts

### robots.ts（`app/robots.ts`）

使用 Next.js Metadata API 的 `robots.ts` convention（非 Route Handler），export default 函數回傳 `MetadataRoute.Robots` 物件：

- `userAgent: '*'`：允許所有爬蟲
- `allow: '/'`：允許爬取所有頁面
- `disallow: ['/api/']`：禁止爬取 API 路徑（預留，目前無 API routes）
- 指向 sitemap URL

### sitemap.ts（`app/sitemap.ts`）

使用 Next.js Metadata API 的 `sitemap.ts` convention，動態生成 sitemap：

- 首頁條目：`priority: 1.0`、`changeFrequency: 'weekly'`
- **不加入 `alternates.languages`**，直到對應語言頁面實際存在
- 未來新增頁面時在此擴展，可改為從資料庫/CMS 動態讀取

## 4. 語義化 HTML 優化

### Heading Hierarchy

現有 `<h1>` 位於 `HeroContent.tsx`（使用 `motion.h1`），內容為「掌握變數 / 定義結局」。確認保留此 h1，不新增重複的 h1。

確保首頁 heading 結構正確（對應實際元件）：

```
<h1> — HeroContent.tsx: 主標題（已存在，保留）
  <h2> — ParadigmSection: 典範轉移
  <h2> — PillarsSection: 三大核心產品
    <h3> — PersonaLab
    <h3> — Strategy Graph
    <h3> — Casting Arena
  <h2> — ScenariosSection: 場景推演
  <h2> — AuthoritySection: 實證數據
  <h2> — CTASection: CTA
```

### 語義化改進

- 所有 `<section>` 確保有 `aria-label` 或 heading
- 圖片使用語義化 `alt` 屬性（裝飾圖用 `alt=""`）
- 連結使用描述性 anchor text
- **Footer 死連結處理**：實作時需審查 `FooterSection.tsx`，將 `href="#"` 的未啟用連結移除或標記 `aria-disabled`，避免爬蟲抓到死連結

## 5. i18n 預留架構

**現階段不建立多語言頁面，也不輸出 hreflang 標籤**，僅做程式碼層級的架構預留：

- `<html lang="zh-Hant">` 保持不變
- 建立 `app/lib/seo-config.ts` 集中管理 SEO 常數，具體內容包含：
  - `baseUrl`: `'https://personacast.io'`
  - `siteName`: `'PersonaCast'`
  - `defaultLocale`: `'zh-TW'`
  - `brandDescription`: 中英文各一
  - `socialLinks`: `{ twitter, linkedin, github }` URL
  - `defaultKeywords`: 中英雙語關鍵字陣列
- 未來 i18n 時在 `seo-config.ts` 擴展翻譯映射，使用 `[locale]/` 路由結構

## 6. Open Graph Image

### 動態 OG Image（`app/opengraph-image.tsx`）

使用 Next.js 內建 `ImageResponse` API（基於 Satori）：

- 自動生成 1200x630 品牌化分享圖
- 包含 PersonaCast logo、標語、品牌色彩
- 未來子頁面可覆寫產生獨立 OG image
- 不需外部服務或手動管理圖片檔案
- **CJK 字體處理**：Satori 不內建中文字體，必須在 `ImageResponse` 建構時載入 CJK 字體檔案（如 Noto Sans TC `.ttf`），放置於 `public/fonts/` 或透過 `fetch` 從 CDN 載入。否則中文字元會顯示為豆腐方塊（tofu）

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
| `app/layout.tsx` | 強化 metadata（metadataBase、title template、canonical、robots、icons 等） |
| `app/page.tsx` | 替換硬編碼 JSON-LD 為模組化 schema；檢查 heading hierarchy |
| `app/components/footer/FooterSection.tsx` | 處理死連結（`href="#"`） |

### 新增依賴

| 套件 | 用途 |
|------|------|
| `schema-dts` | JSON-LD TypeScript 型別定義 |

### 新增資源

| 檔案 | 用途 |
|------|------|
| `public/fonts/NotoSansTC-Bold.ttf`（或類似） | OG Image 中文字體渲染 |

## Out of Scope

- 多語言頁面實作（僅預留程式碼架構）
- hreflang 標籤輸出（待英文頁面存在時才加入）
- Performance / Core Web Vitals 優化
- Analytics 整合（GA4、Search Console）
- 新子頁面建立（Blog、About 等）
- 圖片壓縮 / next/image 優化
- 搜尋功能（WebSite schema 的 SearchAction 待搜尋上線後再加入）

## Validation

完成後使用以下工具驗證：

- **Google Rich Results Test** — 驗證結構化資料
- **Schema.org Validator** — 驗證 JSON-LD 語法
- **Lighthouse SEO audit** — 整體 SEO 分數
- **Open Graph debugger**（Facebook / Twitter）— 驗證分享預覽
