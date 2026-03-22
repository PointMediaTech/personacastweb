# PersonaCast 官網首頁完整設計規格

## Context

PersonaCast 是一個 B2B AI 驅動的戰略推演平台，能在關鍵決策發出前提前 72 小時模擬公眾輿論走向。官網首頁是產品的第一接觸點，目標受眾為企業決策者（公關主管、策略長、中小企業主），需要在 10 秒內建立「高技術門檻」與「可信賴」的印象。

## Framework Migration: Vite React → Next.js (App Router)

現有專案使用 Vite + React 19 + TypeScript + Tailwind CSS 4 + Framer Motion。為了 SEO（搜尋引擎直接取得完整 HTML），遷移至 Next.js App Router。

### Migration Scope

- **保留**：所有現有 React 元件、Tailwind CSS 設計 token、Framer Motion 動畫、Canvas 元件邏輯
- **變更**：加入 `'use client'` 指令至互動元件、Navbar 提升為全站共用、新增 Next.js metadata export
- **Hero Section**：視覺和功能零變動，僅在需要瀏覽器 API 的元件頂部加 `'use client'`

### Project Structure

```
app/
├── layout.tsx              # 全站 layout（字體載入、metadata、Navbar）
├── page.tsx                # 首頁，組合所有 Section
├── globals.css             # 設計 token（現有 CSS 自訂屬性）+ Tailwind
└── components/
    ├── hero/               # 現有元件搬入，Canvas 元件加 'use client'
    ├── paradigm/           # Section 2
    ├── pillars/            # Section 3
    ├── scenarios/          # Section 4
    ├── authority/          # Section 5
    ├── footer/             # Section 6 (CTA + Footer)
    └── shared/
        ├── ScrollReveal.tsx     # 統一的滾動動畫容器 ('use client')
        ├── SectionWrapper.tsx   # Section 共用的 padding/max-width/語義 HTML
        └── Navbar.tsx           # 從 hero/ 提升為全站共用
```

### Server / Client Component Strategy

- **Server Component 為預設**：每個 Section 的外層容器（標題、文案、語義 HTML）都是 Server Component，搜尋引擎直接取得完整內容
- **`'use client'` 僅用於互動**：Canvas 動畫、ScrollReveal、Framer Motion 動畫、計數器動畫等標記為 Client Component
- **資料檔**（theaterData.ts、scenarioData.ts、footerData.ts）：純 TypeScript 物件，Server/Client 都可引用

### SEO Infrastructure

- **metadata export**（layout.tsx）：title、description、Open Graph image、Twitter Card
- **結構化資料**（page.tsx）：JSON-LD — Organization schema + SoftwareApplication schema
- **語義 HTML**：每個 Section 使用 `<section aria-label="...">` + 正確的 `<h2>` 層級
- **語言標記**：`lang="zh-Hant"` + `hreflang` 標記

## Scroll & Animation Strategy

### Scroll Behavior: Hybrid

- **Hero Section**：全螢幕（100vh），佔滿視窗，滾動前不會看到下方內容
- **Section 2-6**：連續滾動（natural flow），每個 Section 高度由內容決定，不受限制

### Animation Level: Medium Choreography

統一使用 `ScrollReveal` 共用元件處理滾動觸發動畫。基於 Framer Motion 的 `useInView`，元素進入視窗時觸發。

動畫手法：
- **淡入 + 上移**：fade-in + translateY(20px)，預設行為
- **交錯時序**：同層級元素使用 stagger delay（0.15-0.2s 間隔）
- **方向性進場**：對比面板左右分別進場，流程圖從左到右依序展開
- **圖表啟動**：容器就位後，內嵌的 SVG/Canvas 動畫才開始
- **Easing**：延續現有 `[0.22, 1, 0.36, 1]` cubic-bezier

### Navigation

- **Navbar**：固定頂部，連結使用頁內錨點滾動（smooth scroll）到對應 Section
- **CTA 按鈕**：暫用 `#` 佔位，未來連結至表單頁面

## Design Tokens (Existing)

延續現有設計系統，不新增 token：

| Token | Value | Usage |
|---|---|---|
| `--color-deep-space` | `#020617` | 主背景 |
| `--color-strategic-blue` | `#769EDB` | 主要行動色、Section 5 主色 |
| `--color-dried-rose` | `#B57D7D` | Section 3 Strategy Graph 主色 |
| `--color-mist-blue-gray` | `#8892B0` | 副文案 |
| `--color-insight-gold` | `#FFB800` | Section 3 Arena 主色、Section 4 金融 |
| `--color-aurora-cyan` | `#00F2FF` | 發光強調 |
| `--color-alert-red` | `#FF4D4D` | Section 4 政治場景 |
| `--font-heading` | Plus Jakarta Sans | 標題 700/800 |
| `--font-body` | Inter | 內文 400/500 |
| `--font-mono` | JetBrains Mono | 標籤、技術文字 |

## Section 1: Hero Section (Existing)

已完成。遷移至 Next.js 時視覺和功能不變，僅在以下元件加上 `'use client'`：

- `HeroSection.tsx`（state management）
- `ChaosFlowCanvas.tsx`、`DataRainCanvas.tsx`（Canvas API）
- `SimulationTheater.tsx`、`HUDLabel.tsx`（動畫 + 互動）
- 所有 custom hooks（useNeuralCanvas、useParallax、useParticleSystem）

## Section 2: Paradigm Shift (範式轉移)

### Purpose

透過左右 split-screen 對比，讓訪客直觀感受從「混亂事後分析」到「精準事前預演」的價值提升。

### Layout

- **標題區**：置中，eyebrow "PARADIGM SHIFT" + H2「別只看過去，讓我們定義未來。」+ 副文案
- **對比面板**：左右並排，圓角容器，中間以 border 分隔

### Left Panel: Traditional Monitoring

- 灰階色調（#444-#666）
- 雜亂重疊的折線圖（SVG，3 條隨機曲線）
- 中央半透明問號暗示盲目決策
- 標籤：「後設式分析」「無法重來的決策」「事後才知道」（灰色 + Alert Red）

### Right Panel: PersonaCast

- Strategic Blue → Aurora Cyan 漸層色調
- 清晰的預測導航線（SVG，單條上升曲線 + 發光濾鏡）
- 三個數據節點標註時間軸：T+0h、T+36h、T+72h
- 微弱網格背景暗示有序結構
- 標籤：「預測式分析」「可重來的決策」「事前就知道」（Cyan）

### Scroll Animation

1. 標題從上方滑入 + 淡入，副文案延遲 0.2s
2. 左面板從左滑入，灰色折線逐段繪製
3. 右面板從右滑入，預測線帶發光效果從左繪製到右，節點依序亮起

### Components

```
components/paradigm/
├── ParadigmSection.tsx      # Server Component — 標題文案 + SEO 語義
├── ComparisonPanel.tsx      # 'use client' — 雙面板容器 + 滾動動畫
├── TraditionalChart.tsx     # 左側灰色混亂折線 SVG
└── PredictionPath.tsx       # 右側發光預測導航線 SVG + 繪製動畫
```

### Responsive

- Desktop (≥1024px)：左右並排
- Tablet (768-1023px)：維持並排，縮小 padding
- Mobile (<768px)：上下堆疊，傳統在上、PersonaCast 在下

### SEO

```html
<section aria-label="範式轉移">
  <h2>別只看過去，讓我們定義未來。</h2>
  <p>傳統工具告訴你聲明發出後「發生了什麼」，PersonaCast 則在聲明發出前告訴你「將會發生什麼」。</p>
</section>
```

## Section 3: Core Pillars (三大戰略支柱)

### Purpose

透過三張功能卡片預覽核心模組，各內嵌輕量互動元件，建立「已開發系統」而非概念稿的印象。

### Layout

- **標題區**：置中，eyebrow "CORE PILLARS" + H2「三大戰略支柱」+ 副文案
- **三卡並排**：等高 flex 排列，各卡片有專屬色調邊框

### Card 1: PersonaLab (Strategic Blue)

- **標題**：PersonaLab — 模擬真實社會人格
- **互動元件**：六軸人格雷達圖（SVG）
  - 軸：政治立場、決斷力、風險偏好、社會信任、情緒穩定、媒體敏感
  - 示範人物：陳立峰 · ENTJ
  - 動畫：持續緩慢旋轉（CSS rotate 30s），hover 暫停 + tooltip 顯示數值
- **公式展示**：P_Final = w₁·M_Zep + w₂·I_User + w₃·S_Stereo
- **技術說明**：基於 Zep 記憶引擎，賦予 AI 智能體穩定的政治與情緒立場

### Card 2: Casting Arena (Insight Gold)

- **標題**：Casting Arena — 72 小時劇場推演
- **互動元件**：情緒色帶時間軸（SVG）
  - 莫蘭迪色調矩形色帶，從 Dried Rose（T+0h）漸變至 Aurora Cyan（T+72h）
  - 動畫：色帶呼吸脈動（opacity），hover 顯示該時段情緒摘要
- **雙面板標籤**：PUBLIC（公共輿論）+ INTERNAL（內部決策）
- **技術說明**：雙面板並行模擬，即時偵測情緒脈衝

### Card 3: Strategy Graph (Dried Rose)

- **標題**：Strategy Graph — 全域利益關係圖譜
- **互動元件**：力導向關係圖（SVG）
  - 中央主節點 + 6 個二級節點 + 散佈的小型外圍節點
  - 發光連線表示利益關係
  - 動畫：節點緩慢漂浮（隨機微位移），hover 高亮相鄰節點與連線
- **數據指標**：80 Nodes / 30 Relations / 132 Strategic
- **技術說明**：梳理 80 個節點與 30 種關係，解析事件擴散的底層邏輯

### Scroll Animation

1. 標題淡入
2. 三張卡片從下方交錯滑入（0.15s stagger）
3. 卡片就位後，內嵌圖表啟動動畫：雷達圖繪製、色帶依序亮起、節點漂浮

### Components

```
components/pillars/
├── PillarsSection.tsx       # Server Component — 標題 + SEO 語義結構
├── PillarCard.tsx           # 'use client' — 通用卡片容器 + 滾動動畫
├── RadarChart.tsx           # 'use client' — 人格雷達圖 SVG + 旋轉動畫
├── SentimentTimeline.tsx    # 'use client' — 情緒色帶時間軸 SVG
└── ForceGraph.tsx           # 'use client' — 力導向關係圖 SVG
```

### Responsive

- Desktop (≥1024px)：三卡並排，等高
- Tablet (768-1023px)：2+1 排列（前兩張並排，第三張居中）
- Mobile (<768px)：垂直堆疊，可左右滑動切換（swipeable carousel）

### SEO

```html
<section aria-label="三大戰略支柱">
  <h2>三大戰略支柱</h2>
  <article aria-label="PersonaLab">
    <h3>PersonaLab — 模擬真實社會人格</h3>
    <p>基於 Zep 記憶引擎...</p>
  </article>
  <!-- Arena, Graph 同理 -->
</section>
```

## Section 4: Scenario Entry (戰場選擇)

### Purpose

引導訪客進入最重視的應用場景，用抽象背景 + 前景 UI 疊加建立代入感。

### Layout

- **標題區**：置中，eyebrow "SCENARIO ENTRY" + H2「為您的決策場景，定制專屬沙盒。」
- **三卡並排**：各卡片包含上方圖片區域（160px）+ 下方文案區域

### Card Design Pattern

每張卡片由三層構成：
1. **抽象幾何背景**（CSS/SVG）：角狀張力、盾牌結構、波動曲線，各自暗示場景特性
2. **前景 UI 疊加元素**：glassmorphism 風格的警告視窗、策略報告預覽、連鎖反應偵測
3. **文案區**：場景名稱 + 一句話描述 + 「進入沙盒 →」連結

### Card 1: Political Campaign (Alert Red #FF4D4D)

- **背景**：角狀對稱圖形暗示張力、脈衝圓環
- **UI 疊加**：ALERT 警告視窗「衝突指數 > 70%」+ CRISIS T-48H 進度條
- **文案**：政治選戰 — 醜聞爆發與議題置換的 72 小時壓力測試

### Card 2: Corporate PR (Strategic Blue #769EDB)

- **背景**：矩形網格暗示企業結構、盾牌圖形暗示防護
- **UI 疊加**：STRATEGY 視窗「議題置換策略」模擬報告 + BRAND RISK 進度條
- **文案**：企業公關 — 產品合規與品牌聲譽的風險控管

### Card 3: Financial/Social (Insight Gold #FFB800)

- **背景**：波動曲線暗示市場波動、蠟燭圖元素
- **UI 疊加**：CASCADE 視窗「連鎖反應偵測」群體恐慌指數 + MARKET IMPACT 進度條
- **文案**：金融社會 — 群體情緒對市場動盪的連鎖反應預演

### Hover Effect

卡片整體上移 4px + border 亮度提升 + 背景 SVG 微幅放大（scale 1.05）+ 「進入沙盒 →」文字右移

### Scroll Animation

1. 標題淡入
2. 三張卡片從下方交錯滑入（0.2s stagger）
3. UI 疊加元素延遲淡入

### Components

```
components/scenarios/
├── ScenariosSection.tsx     # Server Component — 標題 + SEO 語義
├── ScenarioCard.tsx         # 'use client' — 通用場景卡片 + hover 動畫
└── scenarioData.ts          # 三個場景的文案、顏色、指標數據
```

### Responsive

- Desktop (≥1024px)：三卡並排，圖片區域 160px
- Tablet (768-1023px)：三卡並排，圖片區域縮至 120px
- Mobile (<768px)：垂直堆疊，圖片區域維持 140px

### SEO

```html
<section aria-label="應用場景">
  <h2>為您的決策場景，定制專屬沙盒。</h2>
  <article aria-label="政治選戰">
    <h3>政治選戰</h3>
    <p>醜聞爆發與議題置換的 72 小時壓力測試。</p>
  </article>
  <!-- 企業公關、金融社會同理 -->
</section>
```

## Section 5: Authority (透明度與權威)

### Purpose

用方法論流程圖展示推演的因果邏輯鏈，建立「非黑盒 AI」的信任感。不直接展示 API，改為對決策者友善的方式呈現工程嚴謹度。

### Layout

- **標題區**：置中，eyebrow "METHODOLOGY" + H2「工程級的嚴謹，數據級的信任。」
- **四步驟流程圖**：水平排列，箭頭連接
- **信任指標列**：四格數字展示
- **OpenSpec 橫幅**：底部行動連結

### Methodology Pipeline (4 Steps)

| Step | Icon | Title | Subtitle | Details |
|---|---|---|---|---|
| 1 | 📡 | 數據收集 | DATA INGESTION | 多源輿情抓取、結構化事件解析 |
| 2 | 🧬 | 人格建模 | PERSONA MODELING | P_Final 公式計算、Zep 記憶注入 |
| 3 | ⚔️ | 場景推演 | SIMULATION | 72 小時多路徑模擬、3.4M+ 場景分支 |
| 4 | ✅ | 結果驗證 | VALIDATION | 因果鏈追蹤、可解釋性報告 |

步驟 1-2 使用 Strategic Blue 色調，步驟 3-4 使用 Aurora Cyan 色調，暗示從輸入到輸出的漸進。

### Trust Metrics Bar

四格並排：132 戰略節點 / 80 利害關係人 / 100% 規格文件化 / 3 層驗證機制

### OpenSpec Callout

底部橫幅：「OpenSpec 開放規格文件 — 完整的系統架構與模擬框架規格，公開透明，歡迎技術審查。」+ [檢視規格文件 →] 連結

### Scroll Animation

1. 標題淡入
2. 四個步驟卡片從左到右依序淡入（0.2s stagger），箭頭跟隨繪製
3. 信任指標數字從 0 計數到目標值（countUp 動畫）
4. OpenSpec 橫幅最後淡入

### Components

```
components/authority/
├── AuthoritySection.tsx      # Server Component — 標題 + SEO 語義 + OpenSpec 連結
├── MethodologyPipeline.tsx   # 'use client' — 四步驟流程圖 + 滾動觸發動畫
└── TrustMetrics.tsx          # 'use client' — 數字計數動畫
```

### Responsive

- Desktop (≥1024px)：四步驟水平排列 + 箭頭連接
- Tablet (768-1023px)：2×2 網格，箭頭改為連接線
- Mobile (<768px)：垂直時間軸，步驟卡片交替左右排列

### SEO

```html
<section aria-label="方法論與信任">
  <h2>工程級的嚴謹，數據級的信任。</h2>
  <p>我們不只提供結果，我們公開過程。每一次模擬都具有可追蹤的因果邏輯。</p>
  <ol>
    <li>數據收集 — 多源輿情抓取、結構化事件解析</li>
    <li>人格建模 — P_Final 公式計算、Zep 記憶注入</li>
    <li>場景推演 — 72 小時多路徑模擬</li>
    <li>結果驗證 — 因果鏈追蹤、可解釋性報告</li>
  </ol>
</section>
```

## Section 6: Final CTA + Footer

### Purpose

矽谷新創風格的合併區塊：上半部聚焦轉換（預約演示），下半部提供完整導航。

### CTA Area

- **標題**：eyebrow "TAKE ACTION" + H2「停止在不確定性中博弈。」
- **副文案**：「讓 PersonaCast 為您的下一個關鍵決策，提前 72 小時預演所有可能。」
- **按鈕**：實心漸層（Strategic Blue #769EDB → #5A82C4），圓角 8px
  - Default：box-shadow 20px 擴散
  - Hover：亮度提升 + 上移 1px + shadow 擴大至 28px
  - Active：下沉 1px + shadow 縮小
  - 持續微幅 glow 脈動（box-shadow 呼吸動畫）
- **按鈕下方**：「免費 · 30 分鐘 · 專人導覽」
- **背景**：微弱的 radial-gradient 光暈，聚焦視線
- **CTA 連結**：暫用 `#`，未來指向表單頁面

### Footer Area

以細線（linear-gradient 透明→白→透明）與 CTA 區域分隔。

四欄佈局（max-width 960px 置中）：

| Column | Title | Items |
|---|---|---|
| 品牌（1.5x 寬） | PersonaCast logo + tagline + 社群 icon（X, LinkedIn, GitHub） | — |
| 產品 | 產品 | PersonaLab, Casting Arena, Strategy Graph, 應用場景 |
| 資源 | 資源 | OpenSpec 規格文件, 技術文件, API 文件, 部落格 |
| 公司 | 公司 | 關於我們, 聯絡我們, 隱私政策, 服務條款 |

底部列：© 2026 PersonaCast. All rights reserved. | Taipei, Taiwan

### Scroll Animation

- **CTA 區域**：標題 + 按鈕從下方滑入，背景光暈同步淡入
- **Footer 區域**：不做動畫，靜態呈現，不搶 CTA 注意力

### Components

```
components/footer/
├── FooterSection.tsx    # Server Component — CTA 文案 + Footer 連結 + SEO
├── CTAButton.tsx        # 'use client' — 按鈕 hover/glow 動畫
└── footerData.ts        # Footer 連結資料
```

### Responsive

- Desktop (≥1024px)：四欄 Footer，CTA 置中
- Tablet (768-1023px)：2×2 網格 Footer
- Mobile (<768px)：CTA 按鈕全寬，Footer 單欄堆疊，連結欄位可手風琴展開

### SEO

```html
<section aria-label="立即行動">
  <h2>停止在不確定性中博弈。</h2>
  <p>讓 PersonaCast 為您的下一個關鍵決策，提前 72 小時預演所有可能。</p>
  <a href="#">立即預約專屬演示</a>
</section>
<footer>
  <!-- 結構化導航連結 -->
</footer>
```

## Shared Components

### ScrollReveal

統一的滾動動畫容器，基於 Framer Motion `useInView`。

Props:
- `direction`: 'up' | 'down' | 'left' | 'right'（進場方向，預設 'up'）
- `delay`: number（延遲秒數，用於 stagger）
- `distance`: number（位移距離 px，預設 20）

### SectionWrapper

每個 Section 的共用外層，處理：
- 語義 HTML：`<section>` + `aria-label`
- 一致的 padding（py-20 lg:py-28）和 max-width（max-w-6xl mx-auto）
- 背景色：統一 deep-space，Section 間以微弱漸層線分隔

## Accessibility

延續現有標準：
- WCAG AA（4.5:1+ 對比度）
- `prefers-reduced-motion`：關閉所有滾動動畫和圖表動畫，保持靜態呈現
- 所有互動元件有 `aria-label`
- SVG 圖表提供 `role="img"` + `aria-label` 描述
- Focus-visible：2px outline + 4px offset

## Performance Considerations

- **SVG over Canvas**：Section 2-5 的圖表使用 SVG 而非 Canvas，減少 GPU 負擔（Hero Section 的 Canvas 已經很重）
- **Intersection Observer**：ScrollReveal 使用 `useInView` 搭配 `once: true`，動畫只觸發一次
- **圖表 lazy rendering**：Section 3 的互動圖表在卡片進入視窗後才初始化動畫
- **Image optimization**：使用 Next.js `<Image>` 元件處理所有圖片（如社群 icon）
- **Font subsetting**：延續現有字體載入策略（Google Fonts preconnect + display=swap）
