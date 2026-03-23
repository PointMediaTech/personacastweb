# Homepage SEO Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement comprehensive SEO infrastructure for the PersonaCast homepage — structured data, metadata, robots/sitemap, semantic HTML, and dynamic OG image.

**Architecture:** Create two new library modules (`seo-config.ts`, `structured-data.ts`) as the SEO foundation. Enhance `layout.tsx` metadata via the config module. Replace hardcoded JSON-LD in `page.tsx` with modular schema functions. Add `robots.ts`, `sitemap.ts`, and `opengraph-image.tsx` as Next.js Metadata API conventions. Fix footer dead links and audit heading hierarchy / semantic HTML.

**Tech Stack:** Next.js 16 App Router (Metadata API), TypeScript, `schema-dts` (JSON-LD types), Satori/`ImageResponse` (OG image), Noto Sans TC (CJK font)

**Spec:** `docs/superpowers/specs/2026-03-23-homepage-seo-design.md`

---

## File Structure

| File | Status | Responsibility |
|------|--------|---------------|
| `app/lib/seo-config.ts` | Create | Centralized SEO constants (baseUrl, siteName, social links, keywords) |
| `app/lib/structured-data.ts` | Create | JSON-LD schema generator functions (WebSite, Organization, SoftwareApplication, BreadcrumbList) |
| `app/robots.ts` | Create | Dynamic robots.txt via Metadata API |
| `app/sitemap.ts` | Create | Dynamic sitemap.xml via Metadata API |
| `app/opengraph-image.tsx` | Create | Dynamic OG image with CJK font support |
| `app/layout.tsx` | Modify | Enhanced metadata using seo-config |
| `app/page.tsx` | Modify | Replace hardcoded JSON-LD with structured-data module |
| `app/components/footer/FooterSection.tsx` | Modify | Handle dead links (`href="#"`), use SEO_CONFIG for social URLs |
| `app/components/footer/footerData.ts` | Modify | Add `disabled` flag to links, extract `FooterLink` interface |

---

### Task 1: Install `schema-dts` dependency

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install schema-dts**

Run:
```bash
cd D:/Project/personacastweb && npm install schema-dts
```

Expected: `schema-dts` added to `dependencies` in `package.json`.

- [ ] **Step 2: Verify installation**

Run:
```bash
cd D:/Project/personacastweb && node -e "import('schema-dts').then(() => console.log('OK'))"
```

Note: This project uses `"type": "module"` in `package.json`, so `require()` is not available. Use dynamic `import()` instead.

Expected: `OK` printed.

- [ ] **Step 3: Commit**

```bash
cd D:/Project/personacastweb
git add package.json package-lock.json
git commit -m "chore: add schema-dts for JSON-LD type safety"
```

---

### Task 2: Create SEO config module (`app/lib/seo-config.ts`)

**Files:**
- Create: `app/lib/seo-config.ts`

- [ ] **Step 1: Create `app/lib/` directory**

Run:
```bash
ls D:/Project/personacastweb/app/lib/ 2>/dev/null || mkdir -p D:/Project/personacastweb/app/lib
```

- [ ] **Step 2: Create `seo-config.ts`**

```typescript
// app/lib/seo-config.ts

export const SEO_CONFIG = {
  baseUrl: 'https://personacast.io',
  siteName: 'PersonaCast',
  defaultLocale: 'zh-TW' as const,

  brandDescription: {
    'zh-TW': '領先 72 小時的 AI 戰略預演。從人格建模到場景推演，PersonaCast 在關鍵決策發出前模擬公眾輿論走向，讓每一步都有數據支撐。',
    en: 'AI-powered strategic foresight platform. From persona modeling to scenario simulation, PersonaCast forecasts public sentiment before critical decisions are made.',
  },

  socialLinks: {
    twitter: 'https://twitter.com/personacast',
    linkedin: 'https://linkedin.com/company/personacast',
    github: 'https://github.com/personacast',
  },

  defaultKeywords: [
    // 中文
    'AI戰略推演', 'AI輿情分析', '人格建模', '場景推演', '戰略預演平台',
    '公眾輿論模擬', 'AI決策支援', '危機管理AI',
    // English
    'AI strategy simulation', 'AI sentiment analysis', 'persona modeling',
    'scenario simulation', 'strategic foresight platform',
    'public opinion forecasting', 'AI decision support', 'crisis management AI',
  ],

  features: [
    {
      name: 'PersonaLab',
      description: '人格建模引擎 — 建構精準的利害關係人數位分身，預測其行為與反應模式。',
    },
    {
      name: 'Strategy Graph',
      description: '戰略情報圖譜 — 視覺化呈現複雜的利害關係網絡與影響力路徑。',
    },
    {
      name: 'Casting Arena',
      description: '場景推演沙盤 — 在安全的模擬環境中測試不同決策方案的輿論影響。',
    },
  ],
} as const;
```

- [ ] **Step 3: Verify TypeScript compiles**

Run:
```bash
cd D:/Project/personacastweb && npx tsc --noEmit 2>&1 | head -20
```

Note: Always run `tsc --noEmit` without specifying individual files so that `tsconfig.json` is respected.

Expected: No errors (or only pre-existing errors unrelated to this file).

- [ ] **Step 4: Commit**

```bash
cd D:/Project/personacastweb
git add app/lib/seo-config.ts
git commit -m "feat(seo): add centralized SEO config module"
```

---

### Task 3: Create structured data module (`app/lib/structured-data.ts`)

**Files:**
- Create: `app/lib/structured-data.ts`
- Reference: `app/lib/seo-config.ts`

- [ ] **Step 1: Create `structured-data.ts`**

```typescript
// app/lib/structured-data.ts
import type { WithContext, WebSite, Organization, SoftwareApplication, BreadcrumbList } from 'schema-dts';
import { SEO_CONFIG } from './seo-config';

export function generateWebSiteSchema(): WithContext<WebSite> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SEO_CONFIG.siteName,
    url: SEO_CONFIG.baseUrl,
    inLanguage: SEO_CONFIG.defaultLocale,
  };
}

export function generateOrganizationSchema(): WithContext<Organization> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SEO_CONFIG.siteName,
    url: SEO_CONFIG.baseUrl,
    logo: `${SEO_CONFIG.baseUrl}/PersonaCast_Logo.png`,
    sameAs: [
      SEO_CONFIG.socialLinks.twitter,
      SEO_CONFIG.socialLinks.linkedin,
      SEO_CONFIG.socialLinks.github,
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Taipei',
      addressCountry: 'TW',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      url: 'https://calendly.com/personacast/demo',
    },
  };
}

export function generateSoftwareAppSchema(): WithContext<SoftwareApplication> {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: SEO_CONFIG.siteName,
    description: SEO_CONFIG.brandDescription['zh-TW'],
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      description: '免費演示預約',
      url: 'https://calendly.com/personacast/demo',
    },
    featureList: SEO_CONFIG.features.map((f) => `${f.name}: ${f.description}`),
    publisher: {
      '@type': 'Organization',
      name: SEO_CONFIG.siteName,
      url: SEO_CONFIG.baseUrl,
    },
  };
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]): WithContext<BreadcrumbList> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/** Convenience: generate all schemas for the homepage */
export function generateHomePageSchemas(): object[] {
  return [
    generateWebSiteSchema(),
    generateOrganizationSchema(),
    generateSoftwareAppSchema(),
    generateBreadcrumbSchema([
      { name: '首頁', url: SEO_CONFIG.baseUrl },
    ]),
  ];
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run:
```bash
cd D:/Project/personacastweb && npx tsc --noEmit 2>&1 | head -20
```

Expected: No errors (or only pre-existing errors unrelated to this file).

- [ ] **Step 3: Commit**

```bash
cd D:/Project/personacastweb
git add app/lib/structured-data.ts
git commit -m "feat(seo): add JSON-LD structured data generators

WebSite, Organization, SoftwareApplication, BreadcrumbList schemas
using schema-dts for type safety."
```

---

### Task 4: Enhance layout.tsx metadata

**Files:**
- Modify: `app/layout.tsx`
- Reference: `app/lib/seo-config.ts`

- [ ] **Step 1: Update `app/layout.tsx` metadata**

Add import at top (after existing imports):
```typescript
import { SEO_CONFIG } from './lib/seo-config';
```

Replace the existing `metadata` export (lines 27-44) with:

```typescript
export const metadata: Metadata = {
  metadataBase: new URL(SEO_CONFIG.baseUrl),
  title: {
    default: 'PersonaCast — AI 戰略推演平台',
    template: '%s | PersonaCast',
  },
  description: SEO_CONFIG.brandDescription['zh-TW'],
  keywords: SEO_CONFIG.defaultKeywords,
  authors: [{ name: SEO_CONFIG.siteName }],
  creator: SEO_CONFIG.siteName,
  publisher: SEO_CONFIG.siteName,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'PersonaCast — AI 戰略推演平台',
    description: '領先 72 小時的 AI 戰略預演。掌握變數，定義結局。',
    type: 'website',
    locale: 'zh_TW',
    siteName: SEO_CONFIG.siteName,
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PersonaCast — AI 戰略推演平台',
    description: '領先 72 小時的 AI 戰略預演。掌握變數，定義結局。',
    creator: '@personacast',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: '/point_ico.ico',
    apple: '/PersonaCast_Logo.png',
  },
};
```

Note: `openGraph.images` is intentionally omitted — the `app/opengraph-image.tsx` convention file (Task 8) auto-generates and injects the OG image URL. No manual `images` field needed.

- [ ] **Step 2: Verify build compiles**

Run:
```bash
cd D:/Project/personacastweb && npx next build 2>&1 | tail -20
```

Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
cd D:/Project/personacastweb
git add app/layout.tsx
git commit -m "feat(seo): enhance root layout metadata

Add metadataBase, title template, keywords, canonical URL,
enhanced robots directives, and apple-touch-icon."
```

---

### Task 5: Replace hardcoded JSON-LD in page.tsx

**Files:**
- Modify: `app/page.tsx`
- Reference: `app/lib/structured-data.ts`

- [ ] **Step 1: Update `app/page.tsx`**

Replace entire file content with:

```typescript
import { HeroSection } from './components/hero';
import { ParadigmSection } from './components/paradigm/ParadigmSection';
import { PillarsSection } from './components/pillars/PillarsSection';
import { ScenariosSection } from './components/scenarios/ScenariosSection';
import { AuthoritySection } from './components/authority/AuthoritySection';
import { CTASection } from './components/cta/CTASection';
import { FooterSection } from './components/footer/FooterSection';
import { generateHomePageSchemas } from './lib/structured-data';

export default function HomePage() {
  const schemas = generateHomePageSchemas();

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <main>
        <HeroSection />
        <ParadigmSection />
        <PillarsSection />
        <ScenariosSection />
        <AuthoritySection />
        <CTASection />
      </main>
      <FooterSection />
    </>
  );
}
```

- [ ] **Step 2: Verify build compiles**

Run:
```bash
cd D:/Project/personacastweb && npx next build 2>&1 | tail -20
```

Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
cd D:/Project/personacastweb
git add app/page.tsx
git commit -m "feat(seo): replace hardcoded JSON-LD with modular schema generators

Injects WebSite, Organization, SoftwareApplication, and
BreadcrumbList schemas from structured-data module."
```

---

### Task 6: Create robots.ts

**Files:**
- Create: `app/robots.ts`

- [ ] **Step 1: Create `app/robots.ts`**

```typescript
// app/robots.ts
import type { MetadataRoute } from 'next';
import { SEO_CONFIG } from './lib/seo-config';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: `${SEO_CONFIG.baseUrl}/sitemap.xml`,
  };
}
```

- [ ] **Step 2: Verify by building**

Run:
```bash
cd D:/Project/personacastweb && npx next build 2>&1 | tail -10
```

Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
cd D:/Project/personacastweb
git add app/robots.ts
git commit -m "feat(seo): add dynamic robots.txt via Metadata API"
```

---

### Task 7: Create sitemap.ts

**Files:**
- Create: `app/sitemap.ts`

- [ ] **Step 1: Create `app/sitemap.ts`**

```typescript
// app/sitemap.ts
import type { MetadataRoute } from 'next';
import { SEO_CONFIG } from './lib/seo-config';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SEO_CONFIG.baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
  ];
}
```

- [ ] **Step 2: Verify by building**

Run:
```bash
cd D:/Project/personacastweb && npx next build 2>&1 | tail -10
```

Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
cd D:/Project/personacastweb
git add app/sitemap.ts
git commit -m "feat(seo): add dynamic sitemap.xml via Metadata API"
```

---

### Task 8: Download CJK font and create OG image

**Files:**
- Create: `public/fonts/NotoSansTC-Bold.ttf`
- Create: `app/opengraph-image.tsx`

- [ ] **Step 1: Download Noto Sans TC Bold font**

Download a static-weight Noto Sans TC Bold TTF file. The variable font (~15MB+) may cause issues with Satori; prefer a static-weight file if available.

Run:
```bash
mkdir -p D:/Project/personacastweb/public/fonts
curl -L -o D:/Project/personacastweb/public/fonts/NotoSansTC-Bold.ttf \
  "https://github.com/google/fonts/raw/main/ofl/notosanstc/NotoSansTC%5Bwght%5D.ttf"
```

After download, verify the file exists and is a valid TTF:
```bash
ls -lh D:/Project/personacastweb/public/fonts/NotoSansTC-Bold.ttf
```

If the file is too large (>15MB), consider using a font subsetting tool or switching to runtime fetch from Google Fonts CDN. In that case, replace `readFile` in the OG image with:
```typescript
const fontData = await fetch('https://fonts.gstatic.com/s/notosanstc/v36/...').then(r => r.arrayBuffer());
```

- [ ] **Step 2: Create `app/opengraph-image.tsx`**

```tsx
// app/opengraph-image.tsx
import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const alt = 'PersonaCast — AI 戰略推演平台';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OGImage() {
  const fontPath = join(process.cwd(), 'public/fonts/NotoSansTC-Bold.ttf');
  const fontBuffer = await readFile(fontPath);
  // Convert Node.js Buffer to ArrayBuffer for Satori compatibility
  const fontData = fontBuffer.buffer.slice(
    fontBuffer.byteOffset,
    fontBuffer.byteOffset + fontBuffer.byteLength,
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #0a0a0a 0%, #111827 50%, #0a0a0a 100%)',
          fontFamily: '"Noto Sans TC"',
        }}
      >
        {/* Brand name */}
        <div style={{ display: 'flex', marginBottom: 24 }}>
          <span style={{ fontSize: 56, fontWeight: 700, color: '#ffffff' }}>
            Persona
          </span>
          <span style={{ fontSize: 56, fontWeight: 700, color: '#00E0C2' }}>
            Cast
          </span>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 32,
            color: '#9ca3af',
            textAlign: 'center',
            maxWidth: 800,
            lineHeight: 1.4,
          }}
        >
          AI 戰略推演平台
        </div>

        {/* Subline */}
        <div
          style={{
            fontSize: 22,
            color: '#6b7280',
            marginTop: 16,
            textAlign: 'center',
            maxWidth: 700,
          }}
        >
          領先 72 小時的戰略預演。掌握變數，定義結局。
        </div>

        {/* Accent line */}
        <div
          style={{
            width: 120,
            height: 3,
            background: '#00E0C2',
            marginTop: 40,
            borderRadius: 2,
          }}
        />
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Noto Sans TC',
          data: fontData,
          style: 'normal' as const,
          weight: 700 as const,
        },
      ],
    },
  );
}
```

- [ ] **Step 3: Verify by building**

Run:
```bash
cd D:/Project/personacastweb && npx next build 2>&1 | tail -20
```

Expected: Build succeeds. Check that `/opengraph-image` route is listed in build output.

- [ ] **Step 4: Commit**

```bash
cd D:/Project/personacastweb
git add public/fonts/ app/opengraph-image.tsx
git commit -m "feat(seo): add dynamic OG image with CJK font support

Uses Next.js ImageResponse API with Noto Sans TC for
Traditional Chinese rendering in social share previews."
```

---

### Task 9: Fix footer dead links

**Files:**
- Modify: `app/components/footer/footerData.ts`
- Modify: `app/components/footer/FooterSection.tsx`

- [ ] **Step 1: Update `footerData.ts` — add `disabled` flag**

Replace the entire file. Key changes:
- Extract the inline `{ label: string; href: string }` type into a named `FooterLink` interface with `disabled?: boolean`
- Replace `FooterColumn.links` type from inline to `FooterLink[]`
- Mark all `href: '#'` links as `disabled: true`

```typescript
// app/components/footer/footerData.ts
export const CTA_HREF = '#';

export interface FooterLink {
  label: string;
  href: string;
  disabled?: boolean;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export const footerColumns: FooterColumn[] = [
  {
    title: '產品',
    links: [
      { label: 'PersonaLab', href: '#', disabled: true },
      { label: 'Casting Arena', href: '#', disabled: true },
      { label: 'Strategy Graph', href: '#', disabled: true },
      { label: '應用場景', href: '#', disabled: true },
    ],
  },
  {
    title: '資源',
    links: [
      { label: 'OpenSpec 規格文件', href: '#', disabled: true },
      { label: '技術文件', href: '#', disabled: true },
      { label: 'API 文件', href: '#', disabled: true },
      { label: '部落格', href: '#', disabled: true },
    ],
  },
  {
    title: '公司',
    links: [
      { label: '關於我們', href: '#', disabled: true },
      { label: '聯絡我們', href: '#', disabled: true },
      { label: '隱私政策', href: '#', disabled: true },
      { label: '服務條款', href: '#', disabled: true },
    ],
  },
];
```

- [ ] **Step 2: Update `FooterSection.tsx` — render disabled links as `<span>`, use SEO_CONFIG for social URLs**

Import `SEO_CONFIG` at the top:
```typescript
import { SEO_CONFIG } from '../../lib/seo-config';
```

Note: `FooterSection.tsx` does not need to import `FooterLink` — TypeScript infers the type from the `footerColumns` data. No additional import changes needed beyond `SEO_CONFIG`.

Replace the social links section (lines 21-30) — use `SEO_CONFIG.socialLinks` as single source of truth:

```tsx
<div className="flex gap-2.5">
  {[
    { icon: '𝕏', href: SEO_CONFIG.socialLinks.twitter },
    { icon: 'in', href: SEO_CONFIG.socialLinks.linkedin },
    { icon: 'GH', href: SEO_CONFIG.socialLinks.github },
  ].map(({ icon, href }) => (
    <a
      key={icon}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-7 w-7 items-center justify-center rounded-md bg-white/[0.04] border border-white/[0.06] text-xs text-[#555] hover:text-white hover:border-white/10 transition-colors"
    >
      {icon}
    </a>
  ))}
</div>
```

Replace the link rendering section (lines 41-49) — render disabled links as `<span>`:

```tsx
{col.links.map((link) => (
  <li key={link.label}>
    {link.disabled ? (
      <span
        className="text-sm text-mist-blue-gray/50 cursor-default"
        aria-disabled="true"
      >
        {link.label}
      </span>
    ) : (
      <a
        href={link.href}
        className="text-sm text-mist-blue-gray hover:text-white transition-colors"
      >
        {link.label}
      </a>
    )}
  </li>
))}
```

- [ ] **Step 3: Verify build compiles**

Run:
```bash
cd D:/Project/personacastweb && npx next build 2>&1 | tail -10
```

Expected: Build succeeds.

- [ ] **Step 4: Commit**

```bash
cd D:/Project/personacastweb
git add app/components/footer/footerData.ts app/components/footer/FooterSection.tsx
git commit -m "fix(seo): handle footer dead links for crawlers

Disabled links render as <span aria-disabled> instead of <a href='#'>.
Social links use SEO_CONFIG for single source of truth."
```

---

### Task 10: Audit semantic HTML and heading hierarchy

**Files:**
- Audit (read-only): all section components
- Potentially modify: any component with incorrect heading levels or missing aria-labels

This task verifies the spec's Section 4 requirements. The codebase has been pre-audited and currently has:

**Heading hierarchy (verified correct):**
- `<h1>` in `HeroContent.tsx` (motion.h1) — "掌握變數 / 定義結局" — ✅ single h1
- `<h2>` in `ParadigmSection.tsx` — ✅
- `<h2>` in `PillarsSection.tsx`, with `<h3>` in PersonaLabCard, StrategyGraphCard, CastingArenaCard — ✅
- `<h2>` in `ScenariosSection.tsx`, with `<h3>` in ScenarioCard — ✅
- `<h2>` in `AuthoritySection.tsx`, with `<h3>` in CaseCard — ✅
- `<h2>` in `CTASection.tsx` (motion.h2) — ✅

**Semantic audit checklist:**

- [ ] **Step 1: Verify no duplicate h1 tags**

Run:
```bash
cd D:/Project/personacastweb && grep -rn '<h1\|motion\.h1' app/components/ | grep -v node_modules
```

Expected: Only one match in `HeroContent.tsx`.

- [ ] **Step 2: Verify all sections have aria-label or heading**

Run:
```bash
cd D:/Project/personacastweb && grep -rn '<section' app/components/ | head -20
```

Check each `<section>` has either an `aria-label` attribute or contains a heading element. If any section is missing both, add `aria-label`.

- [ ] **Step 3: Check images for alt attributes**

Run:
```bash
cd D:/Project/personacastweb && grep -rn '<img\|<Image' app/components/ | head -20
```

Verify all `<img>` / `<Image>` elements have meaningful `alt` text (or `alt=""` for decorative images). Fix any missing alt attributes.

- [ ] **Step 4: Commit (if changes were made)**

```bash
cd D:/Project/personacastweb
git add -A
git commit -m "fix(seo): improve semantic HTML — aria-labels and image alt text"
```

If no changes were needed, skip this step.

---

### Task 11: Final build verification

**Files:** None (verification only)

- [ ] **Step 1: Full build**

Run:
```bash
cd D:/Project/personacastweb && npx next build 2>&1 | tail -30
```

Expected: Build succeeds with no errors.

- [ ] **Step 2: Start dev server and verify outputs**

Use the preview tools (preview_start) or start manually. Then verify:

**JSON-LD count:**
```bash
curl -s http://localhost:3000 2>/dev/null | grep -o 'application/ld+json' | wc -l
```
Expected: `4` (WebSite + Organization + SoftwareApplication + BreadcrumbList).

**robots.txt:**
```bash
curl -s http://localhost:3000/robots.txt
```
Expected: Contains `User-Agent: *`, `Allow: /`, `Disallow: /api/`, `Sitemap:` URL.

**sitemap.xml:**
```bash
curl -s http://localhost:3000/sitemap.xml
```
Expected: Valid XML with `<url>` entry for `https://personacast.io` with `priority` 1.0.

**OG image:**
```bash
curl -sI http://localhost:3000/opengraph-image 2>/dev/null | head -10
```
Expected: `Content-Type: image/png`, `200 OK`.

Note: On Windows, backgrounding with `&` may not work reliably. Use the preview_start tool or open a separate terminal for the dev server.

- [ ] **Step 3: Stop dev server**

Stop the dev server once verification is complete.
