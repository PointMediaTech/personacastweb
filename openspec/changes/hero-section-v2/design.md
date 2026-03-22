## Context

PersonaCast Strategy Hub 是一個 AI 驅動的輿情預測與戰略模擬平台。前端使用 React 19 + TypeScript + Tailwind CSS v4 + Vite 8 技術棧。此設計為首頁 Hero Section，需傳達高端 B2B 決策工具的品牌形象。

設計語言：**精密極簡主義 (Precision Minimalism)**，深色模式優先。

UI/UX 設計系統：
- 風格：Modern Dark (Cinema) — 適合 AI 工具介面、企業級儀表板
- 字體配對：Plus Jakarta Sans (標題, ExtraBold 800) + Inter (內文, Regular 400)
- 動畫緩動：自訂 Bezier `[0.22, 1, 0.36, 1]`（絲滑高端感）
- 關鍵效果：Glassmorphism, spring-based 動畫, 混沌流線背景, 打字機動畫

色彩系統：
| Token | Hex | 用途 |
|-------|-----|------|
| Deep Space | `#0F172A` | 背景 |
| Strategic Blue | `#769EDB` | 主色、CTA、重點文字 |
| Dried Rose | `#B57D7D` | 破壞色、裝飾線、hover 暈光 |
| Mist Blue Gray | `#8892B0` | 內文、粒子主色 |
| Cyan | `#00F2FF` | 卡片邊框、高光、Navbar hover |
| Gold | `#FFD700` | 推演運行中狀態、倒數計時器 |
| Warm Orange | `#F59E0B` | HUD 標籤第三指標（議題熱度）|

## Goals / Non-Goals

**Goals:**
- 打造視覺衝擊力強的 Hero Section，傳達 AI 戰略平台的專業感
- ChaosFlowCanvas 混沌流線背景提供「混沌→秩序」的視覺敘事
- Simulation Theater 推演劇場提供互動式決策體驗，展示核心產品功能
- HUD 標籤以「危機偵測指標」敘事框架呈現，中英雙語
- 完整響應式設計，行動裝置保持效能
- 遵循 WCAG AA 無障礙標準（對比度 4.5:1+）
- 支援 `prefers-reduced-motion` 媒體查詢

**Non-Goals:**
- 不含登入/註冊功能實作（按鈕僅為 UI）
- 不含路由導航實作（連結僅為佔位）
- 不含後端 API 整合
- 不含其他頁面區塊（僅 Hero Section）
- 不含深色/淺色模式切換（僅深色模式）

## Decisions

### 1. 組件架構：Feature-based 拆分

```
HeroSection.tsx (容器，狀態管理)
├── Navbar.tsx (導覽列)
├── LiveBadge.tsx (LIVE 指示器)
├── ChaosFlowCanvas.tsx (混沌流線背景)
├── DataRainCanvas.tsx (數據雨背景)
├── HeroContent.tsx (左側文案 + CTA + 狀態列)
├── SimulationTheater.tsx (推演劇場容器)
│   ├── HUDLabel.tsx × 3 (HUD 標注標籤)
│   ├── DecisionCard.tsx × 3 (決策卡片)
│   └── SimulationResult.tsx (結果面板)
├── DataCards.tsx (數據卡片容器)
│   ├── ConflictIndexCard.tsx (衝突指數折線圖)
│   ├── TrajectoryCard.tsx (72H 軌跡 SVG)
│   └── SentimentCard.tsx (情感分析極座標圖)
├── AgentCards.tsx (角色卡片)
└── theaterData.ts (推演劇場集中配置)
```

**理由**：每個組件職責單一，Canvas 邏輯隔離避免影響其他組件重渲染。狀態集中於 HeroSection（`theaterActive`、`selectedDecision`），透過 props 向下傳遞。

### 2. 混沌流線系統：ChaosFlowCanvas

- 300-400 條 Bézier 流線，使用 simplex-noise 產生噪聲擾動
- 左側混沌（高擾動振幅）→ 右側秩序（低擾動振幅）漸變
- 金色高光粒子沿流線路徑流動
- 推演劇場啟動時，流線依選擇的決策路徑分岔
- 行動裝置自適應渲染（減少流線數量）

**理由**：混沌→秩序的視覺隱喻完美對應產品核心價值「從混沌輿情中找到策略路徑」。

### 3. Simulation Theater 推演劇場

**Phase 1（預設）：**
- 3 個 HUD 標注標籤，錨定於 ChaosFlowCanvas 特定區域
- 危機偵測指標敘事框架：
  - 標籤 1：「公眾情緒：負面擴散中」(PUBLIC SENTIMENT: SPREADING) — Rose 強調
  - 標籤 2：「法規合規：潛在違規偵測」(REGULATORY: VIOLATION DETECTED) — Blue，動態數值
  - 標籤 3：「議題熱度：社群發酵中」(TOPIC HEAT: GOING VIRAL) — Warm Orange，呼吸脈動
- 半透明深色背景 `rgba(2,6,23,0.55)` + backdrop-blur
- 打字機進場動畫（CSS clip-path），中文先出現，英文延遲淡入

**Phase 2（推演啟動）：**
- HUD 標籤變形為 3 張決策卡片
- 決策 A：公開道歉 (PR PIVOT) — 73% 成功率
- 決策 B：法律攻防 (LEGAL WAR) — 45% 成功率
- 決策 C：轉移關注 (DIVERSION) — 28% 成功率
- 倒數計時器：「72H CRISIS WINDOW: T-68H」
- 選擇後顯示 SimulationResult 結果面板

**理由**：兩階段設計讓用戶先感受「危機情境」，再透過互動體驗「決策推演」，完整展示產品核心功能。

### 4. CTA 按鈕：雙狀態切換

- **未啟動**：Strategic Blue 背景，白色文字「啟動推演劇場」，hover 藍色暈光
- **運行中**：透明背景，金色邊框，金色文字「推演運行中」，黃色呼吸指示點
- `aria-pressed` 無障礙屬性，focus-visible 焦點環

**理由**：CTA 同時作為劇場開關，雙狀態視覺回饋讓用戶清楚知道目前模式。

### 5. Navbar 設計

- `backdrop-filter: blur(12px)` + 半透明背景 `rgba(15, 23, 42, 0.8)`
- 固定定位 `position: fixed` + `z-index: 50`
- 純文字 Wordmark Logo：「Persona」(mist white, 600) + 「Cast」(cyan, 800)
- 導覽連結 hover：cyan 底線從中心展開 + `text-shadow` 暈光
- Request Demo CTA：呼吸動畫（藍色暈光脈動）

**理由**：原生 CSS backdrop-filter 效能優於 JS 方案。純文字 Logo 減少資源載入，提升品牌辨識度。

### 6. HUD 標籤雙語設計

- 雙行佈局：中文主文（14px）在上，英文副文（10px, muted）在下
- 打字機動畫僅套用於中文文字
- 英文在打字機動畫完成後延遲淡入
- 標籤 2 動態數值同時追蹤中英文

**理由**：目標客群為台灣/大中華區企業決策者，中文主導但英文專業術語增加國際感。

### 7. 底部狀態列

- 危機敘事重構：
  - 「Crisis Window: T-56H」（倒數框架取代正數）
  - 「Sentiment: 72%」（情感分析取代衝突度）
  - 「Scenarios: 3.4M+」（路徑分析取代通用描述）

**理由**：統一「危機偵測→路徑分析→決策推演」的敘事弧線，與 HUD 標籤的危機指標框架一致。

### 8. 卡片視覺統一系統

- 統一 Glassmorphism 風格：`backdrop-blur: 16px`、cyan 邊框 `rgba(0,242,255,0.12)`
- 角落暈光：`box-shadow: 0 0 8px rgba(0,242,255,0.06)`
- 決策卡片：膠囊型類別徽章、成功率進度條（cyan/amber/red）、風險呼吸燈
- 決策卡片寬度 280px，數據卡片寬度 320px

**理由**：統一的 Glassmorphism 語言確保視覺一致性，層次化的暈光效果增加深度感。

## Z-Index 層級堆疊

```
z-0    背景漸層
z-1    DataRainCanvas（左側背景）
z-2    ChaosFlowCanvas（主視覺）+ LeftScrim（遮罩）
z-10   HeroContent（文案 + CTA）
z-15   SimulationTheater（HUD/決策卡片）
z-20   倒數計時器
z-30   狀態列
z-50   Navbar, LiveBadge（固定）
```

## Risks / Trade-offs

- **[Canvas 效能]** 雙 Canvas（ChaosFlow + DataRain）持續消耗 GPU/CPU → `requestAnimationFrame` + unmount 清除；行動裝置自適應；`prefers-reduced-motion` 降級
- **[backdrop-filter 相容性]** 舊版瀏覽器不支援 → 退化為純色半透明背景
- **[字體載入]** Google Fonts 外部依賴 → `font-display: swap` 避免 FOIT，系統字體 fallback
- **[推演劇場狀態]** Phase 1/2 切換涉及多組件動畫協調 → 狀態集中管理於 HeroSection，避免競態條件
- **[雙語維護]** 中英文文案需同步更新 → 集中於 theaterData.ts，單一資料源
