import {
  LayoutDashboard, Sparkles, Network, Layers, Radar, Archive,
  ShieldAlert, Landmark, TrendingUp, Scale,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface SubItem {
  readonly label: string;
  readonly desc?: string;
  readonly href: string;
  readonly disabled?: boolean;
  readonly icon?: React.ElementType;
}

export interface NavItem {
  readonly label: string;
  readonly href?: string;
  readonly children?: readonly SubItem[];
  readonly mega?: boolean;
}

/* ------------------------------------------------------------------ */
/*  Navigation data                                                    */
/* ------------------------------------------------------------------ */

export const NAV_ITEMS: readonly NavItem[] = [
  {
    label: '產品',
    mega: true,
    children: [
      { label: '平台概覽', href: '/product', icon: LayoutDashboard },
      { label: '種子注入引擎', desc: '注入議題與情境變數，啟動推演', href: '/product/seed-injection', icon: Sparkles },
      { label: '圖譜建構系統', desc: 'AI 人格關係網路視覺化', href: '/product/graph-engine', icon: Network },
      { label: '全境模擬：預演公關劇本', desc: '觀察多元人格在議題中的即時交鋒', href: '/product/simulation-theater', icon: Layers },
      { label: '預測解碼器', desc: '數據驅動的輿情走向預測與風險評分', href: '/product/predictive-decoder', icon: Radar },
      { label: '輿情資產堡壘', desc: '推演結果沉澱為可檢索策略知識庫', href: '/product/data-assets', icon: Archive },
    ],
  },
  {
    label: '解決方案',
    mega: true,
    children: [
      { label: '公關危機預判', desc: '在輿論風暴引爆前攔截危機火線', href: '/solutions/crisis-pr', icon: ShieldAlert },
      { label: '政治議題推演', desc: '預判民意走向，精準規劃溝通策略', href: '/solutions/political-strategy', icon: Landmark },
      { label: '品牌聲譽管理', desc: '量化品牌在輿論場中的韌性指數', href: '/solutions/brand-reputation', icon: TrendingUp },
      { label: '政策輿論模擬', desc: '預測政策發布後的社會連鎖反應', href: '/solutions/policy-simulation', icon: Scale },
    ],
  },
  { label: '定價', href: '/pricing' },
  {
    label: '資源',
    children: [
      { label: '部落格 / 洞察', href: '/resources/blog', disabled: true },
      { label: '客戶案例', href: '/resources/case-studies' },
      { label: '白皮書下載', href: '/resources/whitepapers' },
    ],
  },
  { label: '關於我們', href: '/about' },
] as const;

/* ------------------------------------------------------------------ */
/*  Shared styles                                                      */
/* ------------------------------------------------------------------ */

export const DROPDOWN_GLASS = {
  backgroundColor: 'rgba(10, 14, 26, 0.95)',
  backdropFilter: 'blur(24px)',
  WebkitBackdropFilter: 'blur(24px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: '0 24px 40px -8px rgba(0, 0, 0, 0.8), 0 0 40px rgba(118, 158, 219, 0.12) inset',
} as const;
