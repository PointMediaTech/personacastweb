# PersonaCast 官方網站

**Production:** https://www.personacast.ai/
**Repo:** `PointMediaTech/personacastweb` (public, main branch)
**Deploy:** GitHub Actions → GitHub Pages（`build_type: workflow`）
**Do NOT** confuse with `PointMediaTech/pointmediaweb`（那是 www.point.tv 的 repo）

> 掌握變數，定義結局 — AI 驅動的社會模擬與輿論預演平台

## 技術棧

- **框架：** React 19 + TypeScript
- **建構工具：** Vite
- **樣式：** Tailwind CSS 4
- **動畫：** Framer Motion
- **圖示：** Lucide React

## 文件

- [網站架構圖 (Sitemap)](docs/sitemap.md)

## 開發

```bash
# 安裝依賴
npm install

# 啟動開發伺服器
npm run dev

# 建構生產版本
npm run build
```

## 專案結構

```text
src/
├── components/
│   └── hero/          # 首頁 Hero 區域元件
├── assets/            # 靜態資源
├── App.tsx            # 主應用元件
├── main.tsx           # 應用進入點
└── index.css          # 全域樣式
```
