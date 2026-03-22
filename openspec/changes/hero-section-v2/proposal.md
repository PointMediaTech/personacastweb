## Why

PersonaCast Strategy Hub 需要一個具備高端 B2B 決策感的首頁 Hero Section，作為產品的第一印象。一個精緻的 Hero Section 將直接影響潛在客戶的轉換率與品牌信任度。核心價值主張：「AI 驅動輿情預測與戰略模擬」——用戶需在首頁即刻感受到危機偵測、路徑分析與決策推演的能力。

## What Changes

- **完整 Hero Section 頁面組件**，包含：
  - **Glassmorphic Navbar**：固定頂部導覽列，帶毛玻璃模糊效果，純文字 Wordmark Logo（Persona + Cast）
  - **ChaosFlowCanvas 混沌流線背景**：300-400 條 Bézier 流線，左側混沌→右側秩序，噪聲擾動動畫
  - **DataRainCanvas 數據雨背景**：左側 Matrix 風格代碼雨效果
  - **Hero 內容區塊**：含 Framer Motion 進場動畫的標題、副標題與雙狀態 CTA 按鈕
  - **Simulation Theater 推演劇場**：兩階段互動體驗
    - Phase 1：3 個 HUD 標注標籤（危機偵測指標），中英雙語，打字機動畫
    - Phase 2：3 張決策卡片（公開道歉/法律攻防/轉移關注），含成功率進度條與結果面板
  - **DataCards 數據卡片**：衝突指數折線圖、72H 軌跡 SVG、情感分析極座標圖
  - **AgentCards 角色卡片**：林雅婷/ENFJ、張銳/ENTP 雙角色卡片
  - **底部狀態列**：Crisis Window / Sentiment / Scenarios 即時指標
- 建立精密極簡主義 (Precision Minimalism) 深色模式設計語言
- 色彩系統：Deep Space `#0F172A` / Strategic Blue `#769EDB` / Dried Rose `#B57D7D` / Mist Blue Gray `#8892B0` / Cyan `#00F2FF`
- 字體系統：Plus Jakarta Sans (標題) + Inter (內文)
- 響應式設計，行動裝置自適應渲染

## Capabilities

### New Capabilities
- `chaos-flow-canvas`: Bézier 流線系統，支援噪聲擾動、左混沌→右秩序漸變、金色高光粒子
- `data-rain-canvas`: Matrix 風格代碼雨背景，靜態詞庫池
- `simulation-theater`: 兩階段互動推演體驗（HUD 標籤 ↔ 決策卡片切換）
- `hud-label`: 中英雙語 HUD 標注標籤，打字機進場動畫，半透明背景容器
- `decision-card`: 互動式決策卡片，含成功率進度條、風險呼吸燈、類別徽章
- `simulation-result`: 決策結果面板，顯示各維度成效指標
- `hero-navbar`: 固定式毛玻璃導覽列，純文字 Wordmark Logo，hover 微互動
- `hero-content`: 動畫標題、副標題、雙狀態 CTA 按鈕（啟動/運行中）、底部狀態列
- `hero-section`: 整合所有子組件的 Hero Section 容器，管理 theaterActive/selectedDecision 狀態
- `data-cards`: 3 張數據視覺化卡片（衝突指數/軌跡/情感分析）
- `agent-cards`: 2 張 AI 角色卡片，呼吸動畫
- `live-badge`: 右上角 LIVE 狀態指示器

### Modified Capabilities
<!-- 無既有能力被修改 -->

## Impact

- **新增檔案**：`src/components/hero/` 目錄下 27+ React 組件與資料檔
- **依賴項**：`framer-motion`、`lucide-react`、`simplex-noise`
- **字體**：Plus Jakarta Sans 與 Inter Google Fonts
- **效能考量**：
  - Canvas 動畫使用 `requestAnimationFrame`，unmount 時清除
  - 行動裝置自適應粒子/流線數量
  - `prefers-reduced-motion` 媒體查詢支援
- **瀏覽器相容性**：Canvas API、backdrop-filter、CSS clip-path 需現代瀏覽器支援
- **無障礙**：WCAG AA 對比度 4.5:1+、`aria-pressed` 按鈕狀態、焦點可見環
