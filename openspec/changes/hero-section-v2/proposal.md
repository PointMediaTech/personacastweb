## Why

PersonaCast Strategy Hub 需要一個具備高端 B2B 決策感的首頁 Hero Section，作為產品的第一印象。目前專案缺乏品牌級的 Landing Page，無法有效傳達「AI 驅動輿情預測與戰略模擬」的核心價值主張。一個精緻的 Hero Section 將直接影響潛在客戶的轉換率與品牌信任度。

## What Changes

- 新增完整的 Hero Section 頁面組件，包含：
  - **Glassmorphic Navbar**：固定頂部導覽列，帶毛玻璃模糊效果
  - **Canvas 粒子背景系統**：基於 Canvas API 的互動式粒子動畫，支援滑鼠互動（排斥/吸引效果）
  - **Hero 內容區塊**：含 Framer Motion 進場動畫的標題、副標題與 CTA 按鈕
  - **CTA 按鈕**：具備 hover 暈光擴散效果
- 建立精密極簡主義 (Precision Minimalism) 深色模式設計語言
- 色彩系統：Deep Space `#0F172A` / Strategic Blue `#769EDB` / Dried Rose `#B57D7D` / Mist Blue Gray `#8892B0`
- 字體系統：Plus Jakarta Sans (標題) + Inter (內文)
- 響應式設計，手機端粒子數量減半以優化效能

## Capabilities

### New Capabilities
- `hero-navbar`: 固定式毛玻璃導覽列，含 Logo、導覽連結、Login/Request Demo 按鈕
- `particle-canvas`: Canvas API 粒子系統，支援布朗運動、滑鼠互動、響應式粒子數量
- `hero-content`: 動畫標題（Framer Motion fade-up）、副標題、CTA 按鈕（hover 暈光效果）
- `hero-section`: 整合所有子組件的 Hero Section 容器

### Modified Capabilities
<!-- No existing capabilities are being modified -->

## Impact

- **新增檔案**：`src/components/hero/` 目錄下的 React 組件
- **依賴項**：需安裝 `framer-motion`、`lucide-react`（若尚未安裝）
- **字體**：需在 HTML 或 CSS 引入 Plus Jakarta Sans 與 Inter Google Fonts
- **效能考量**：Canvas 粒子動畫需使用 `requestAnimationFrame` 並在 unmount 時清除，避免記憶體洩漏
- **瀏覽器相容性**：Canvas API 與 backdrop-filter 需現代瀏覽器支援
