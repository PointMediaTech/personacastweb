## Context

PersonaCast Strategy Hub 是一個 AI 驅動的輿情預測與戰略模擬平台。目前前端使用 React + TypeScript + Tailwind CSS 技術棧。此設計為首頁 Hero Section，需傳達高端 B2B 決策工具的品牌形象。

設計語言：**精密極簡主義 (Precision Minimalism)**，深色模式優先。

UI/UX Pro Max 設計系統分析結果：
- 風格匹配：Modern Dark (Cinema) — 適合 AI 工具介面、企業級儀表板
- 字體配對：Plus Jakarta Sans (標題, ExtraBold 800) + Inter (內文, Regular 400)
- 動畫緩動：自訂 Bezier `[0.22, 1, 0.36, 1]`（絲滑高端感）
- 關鍵效果：BlurView glassmorphism, spring-based 動畫, 微妙的粒子背景

色彩系統（用戶指定，覆蓋推薦值）：
| Token | Hex | 用途 |
|-------|-----|------|
| Deep Space | `#0F172A` | 背景 |
| Strategic Blue | `#769EDB` | 主色、CTA、重點文字 |
| Dried Rose | `#B57D7D` | 破壞色、裝飾線、hover 暈光 |
| Mist Blue Gray | `#8892B0` | 內文、粒子主色 |

## Goals / Non-Goals

**Goals:**
- 打造視覺衝擊力強的 Hero Section，傳達 AI 戰略平台的專業感
- Canvas 粒子背景提供互動式科技感氛圍
- Framer Motion 動畫營造高端產品的絲滑進場體驗
- 完整響應式設計，手機端保持效能
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
- `HeroSection.tsx` — 容器組件，整合所有子組件
- `Navbar.tsx` — 獨立導覽列組件
- `ParticleCanvas.tsx` — Canvas 粒子系統（獨立 hook: `useParticleSystem`）
- `HeroContent.tsx` — 標題、副標題、CTA 區塊

**理由**：每個組件職責單一，Canvas 邏輯隔離避免影響其他組件重渲染。

### 2. 粒子系統：原生 Canvas API
- 使用原生 Canvas 2D API，不引入額外粒子庫（如 tsParticles）
- 粒子數量：桌面 120 顆，手機 60 顆（透過 `window.innerWidth` 判斷）
- 布朗運動：每幀隨機微小位移 (dx, dy ∈ [-0.3, 0.3])
- 滑鼠互動：150px 範圍內的粒子產生排斥效果（反方向位移）
- 粒子色彩分佈：85% Mist Blue Gray, 10% Strategic Blue, 5% Dried Rose

**理由**：自訂實作更輕量、可控性更高，避免引入大型依賴。粒子數量在手機端減半確保 60fps。

### 3. 動畫方案：Framer Motion
- 進場動畫：`y: 30 → 0, opacity: 0 → 1`
- 延遲策略：每個元素遞增 0.2s（標題 0s → 副標題 0.2s → CTA 0.4s）
- 緩動曲線：`[0.22, 1, 0.36, 1]`（高端絲滑感）
- Dried Rose 底線：`scaleX: 0 → 1`，從中心向兩側延伸
- CTA hover：`y: -2px` + `box-shadow` Dried Rose 暈光

**理由**：Framer Motion 是 React 生態最成熟的動畫庫，支援宣告式 API 且與 React 生命週期完美整合。

### 4. Navbar 毛玻璃效果
- `backdrop-filter: blur(12px)` + 半透明背景 `rgba(15, 23, 42, 0.8)`
- 固定定位 `position: fixed` + `z-index: 50`

**理由**：原生 CSS backdrop-filter 效能優於 JS 方案，現代瀏覽器支援率 >95%。

## Risks / Trade-offs

- **[Canvas 效能]** 粒子動畫持續消耗 GPU/CPU → 使用 `requestAnimationFrame`，unmount 時清除；手機端粒子減半；提供 `prefers-reduced-motion` 降級
- **[backdrop-filter 相容性]** 舊版瀏覽器不支援 → 退化為純色半透明背景（graceful degradation）
- **[字體載入]** Google Fonts 外部依賴 → 使用 `font-display: swap` 避免 FOIT，系統字體作為 fallback
- **[Canvas 與觸控]** 手機端觸控事件可能與滑動衝突 → Canvas 設為 `pointer-events: none`，僅監聽 document 級別 mousemove
