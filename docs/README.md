# PersonaCast Strategy Hub

AI 驅動的輿情預測與戰略模擬平台 — 透過 AI 人格智能體（Persona Agents）在虛擬輿論場中進行多角色推演，預測公關危機、金融情緒、社會事件等場景的發展軌跡。

> **目前狀態**：純前端原型（Pure Frontend Prototype），後端規格已完成文件化，尚未實作。

---

## 工作流程

```
種子注入 ──▶ 圖譜建構 ──▶ 推演劇場 ──▶ 預測解碼 ──▶ 數據資產
  (01)        (02)         (03)         (04)        (05)
```

| 步驟 | 路由 | 說明 |
|------|------|------|
| 01 · 種子注入 | `/` | 上傳事件文件或輸入模擬需求，選擇預設模板 |
| 02 · 圖譜建構 | `/graph-build` | Canvas 力導向圖（80 節點、11 種實體、30 種關係），PersonaLab 智能體管理 |
| 03 · 推演劇場 | `/casting-arena` | 雙面板並行（公共輿論場 + 內部決策室），SentimentSlider 莫蘭迪色帶時間軸，戰略引導介入，情緒脈衝偵測 |
| 04 · 預測解碼 | `/strategy-report` | 多路徑預測圖表、FullStrategyReport 互動工具箱（InsightForge、PanoramaSearch） |
| 05 · 數據資產 | `/data-asset` | 智能體收割歸檔，持久化至 PersonaVault |

**其他頁面**：`/vault`（智庫管理）、`/projects`（專案總覽）、`/persona-lab`（人格實驗室）

---

## 技術棧

### 前端

| 層級 | 技術 | 版本 |
|------|------|------|
| 框架 | React + TypeScript | 18.3 / 5.8 |
| 建構工具 | Vite + SWC | 5.4 |
| 路由 | React Router DOM | v6 |
| UI 元件庫 | shadcn/ui (Radix UI) | 25+ 元件 |
| 樣式 | Tailwind CSS | 3.4 |
| 圖表 | Recharts + Canvas API | 2.15 |
| 力導向圖 | react-force-graph-2d | 1.29 |
| 動畫 | Framer Motion + tailwindcss-animate | 12.38 |
| 表單 | React Hook Form + Zod | 7.61 / 3.25 |
| 主題 | next-themes (dark/light) | 0.3 |
| 狀態管理 | Zustand + React useState + TanStack React Query | 5.3 / 5.83 |
| 測試 | Vitest + Testing Library + Playwright | 3.2 / 16.0 / 1.57 |

### 後端（規格已完成，待實作）

| 層級 | 技術 |
|------|------|
| 框架 | Flask 3.x (Python 3.11+, uv) |
| 資料庫 | SQLite → PostgreSQL (SQLAlchemy + Alembic) |
| LLM | OpenAI-compatible API |
| 知識圖譜 | Zep Cloud |
| 社會模擬 | CAMEL-OASIS |
| API 模式 | `{ success, data, error }` 信封格式，Flask Blueprints |

---

## 本地開發

```bash
# 安裝依賴
npm install

# 啟動開發伺服器 (port 8080)
npm run dev

# 型別檢查
npx tsc --noEmit

# 建置
npm run build
```

---

## 核心元件架構

```
src/
├── pages/                    # 9 個路由頁面
│   ├── Index.tsx             # Step 01 · 種子注入
│   ├── GraphBuild.tsx        # Step 02 · 圖譜建構
│   ├── CastingArena.tsx      # Step 03 · 推演劇場
│   ├── StrategyReport.tsx    # Step 04 · 預測解碼
│   ├── DataAsset.tsx         # Step 05 · 數據資產
│   ├── PersonaVault.tsx      # 智庫管理
│   ├── PersonaLab.tsx        # 人格實驗室
│   ├── AllProjects.tsx       # 專案總覽
│   └── NotFound.tsx          # 404
│
├── components/
│   ├── casting/              # 推演劇場子元件
│   │   ├── SentimentSlider.tsx        # 情緒熱力圖 + 時間軸（莫蘭迪色帶 + 漸進揭露）
│   │   ├── InterventionFAB.tsx        # 戰略引導浮動按鈕（⚡ + 冷卻機制）
│   │   ├── InterventionDrawer.tsx     # 戰略引導抽屜（議題 + 情緒 + 影響範圍）
│   │   ├── PublicSquare.tsx           # 公共輿論場（timeline 卡片）
│   │   ├── InternalDecision.tsx       # 內部決策對話（聊天泡泡）
│   │   ├── LiveTrendChart.tsx         # 即時趨勢圖（Canvas 雙線）
│   │   ├── FullStrategyReport.tsx     # 全版報告 + AI 聊天 + 工具箱
│   │   ├── InsightForgeOverlay.tsx    # 因果溯源偵探模式
│   │   ├── ContextMapOverlay.tsx      # 戰略脈絡圖（力導向圖 + 降溫連動 + 展開按鈕）
│   │   ├── AgentStrategyDrawer.tsx    # 策略詳情面板（降溫預覽 + countdown 動畫）
│   │   ├── PanoramaSearchDrawer.tsx   # 全域搜查抽屜
│   │   ├── InterviewSubAgentOverlay.tsx # 訪談智能體覆蓋層
│   │   ├── AgentDrawer.tsx            # 智能體側邊欄
│   │   ├── sentimentHighlight.tsx     # 衝突詞偵測 + 高亮
│   │   └── mockData.ts               # 19 智能體 + 62 訊息 + 132 戰略節點 + 287 關係
│   │
│   ├── ui/                   # 25+ shadcn/ui 元件
│   ├── home/                 # 首頁元件（粒子背景、步驟卡）
│   ├── strategy/             # 校準工具
│   ├── StepLayout.tsx        # 步驟頁面共用外殼
│   ├── ForceGraph.tsx        # Canvas 力導向知識圖譜
│   └── PersonaLabPanel.tsx   # 智能體管理面板
│
├── lib/
│   ├── utils.ts              # cn() class 合併工具
│   ├── persona-utils.ts      # Persona/VaultAgent 轉換
│   └── store/                # Zustand 狀態管理
│       ├── simulationStore.ts # 推演時鐘、趨勢、介入
│       └── types.ts           # SimulationState、Intervention、Agent
│
└── hooks/
    └── use-toast.ts          # Toast 通知系統
```

---

## 推演模擬系統

### 6 核心智能體

| ID | 名稱 | 角色 | MBTI | 陣營 |
|----|------|------|------|------|
| ceo | 陳立峰 | 縣市長候選人 | ENTJ | Pro |
| pr | 林雅婷 | 競選發言人 | ENFJ | Pro |
| employee | 王建國 | 鐵票支持者 | ISFJ | Pro |
| reporter | 張銳 | 政論名嘴 | ENTP | Anti |
| union | 趙小芳 | 首投族代表 | INFP | Neutral |
| kol | 阿達 | 政治網紅 | INTJ | Neutral |

### 人格公式

```
P_Final = w₁·M_Zep + w₂·I_User + w₃·S_Stereo    (w₁ + w₂ + w₃ = 1)
```

### 72 小時模擬時間軸

- **T+12h**：醜聞爆發臨界 — 候選人強硬聲明觸發輿論風暴
- **T+32h**：對手猛攻轉折 — 名嘴追擊報導造成不可逆轉折
- **T+56h**：辯論反彈窗口 — 能源白皮書實現議題置換，支持率回升

### 情緒偵測

19 個衝突觸發詞（抹黑、造謠、黑函…）即時偵測 → 趨勢圖脈衝跳升 → 衝突指數 >70% 觸發 flashpoint

---

## 設計系統

| 元素 | 規格 |
|------|------|
| 主色（Strategic Blue） | `#769EDB` / `hsl(216, 56%, 66%)` |
| 破壞色（Dried Rose） | `#B57D7D` / `hsl(0, 28%, 60%)` |
| 莫蘭迪卡片色 | 6 色循環（暖米、冷灰藍、鼠尾草綠、乾燥玫瑰、莫蘭迪金、薰衣草灰） |
| 字體 | Inter (400/500/600/700) |
| 圓角 | `--radius: 0.75rem` |
| 深色模式 | 完整支援，class-based toggle，深海軍藍基調 |

---

## OpenSpec 規格文件

完整系統規格存放於 `openspec/` 目錄：

```
openspec/
├── specs/
│   ├── architecture.md              # 系統架構總覽
│   ├── data-models.md               # 核心資料模型
│   ├── casting-arena.md             # 推演劇場規格
│   ├── backend/                     # 後端規格（8 檔案）
│   │   ├── architecture.md          # 系統架構圖
│   │   ├── api-schemas.md           # 24 個 API 端點
│   │   ├── data-model.md            # SQLAlchemy 模型
│   │   ├── pipeline.md              # 5 步驟管線
│   │   ├── external-services.md     # LLM / Zep / OASIS 整合
│   │   ├── cross-step-dataflow.md   # 跨步驟資料流
│   │   ├── frontend-integration.md  # 前後端契約
│   │   └── devops.md                # 部署與維運
│   ├── frontend-pages/spec.md       # 頁面規格
│   ├── component-system/spec.md     # 元件系統
│   ├── design-system/spec.md        # 設計系統
│   ├── casting-simulation/spec.md   # 推演模擬
│   ├── state-routing/spec.md        # 狀態與路由
│   ├── tech-dependencies/spec.md    # 技術依賴
│   ├── insightforge-overlay/spec.md # InsightForge 規格
│   └── [15+ feature specs]         # 功能規格
│
└── changes/                         # 變更提案與歸檔
    ├── [active changes]
    └── archive/                     # 30+ 已完成迭代
```

詳細架構說明：[`openspec/specs/architecture.md`](openspec/specs/architecture.md)
