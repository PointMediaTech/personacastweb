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
      { label: '平台概覽', href: '/product' },
      { label: '種子注入', href: '/product/seed-injection' },
      { label: '圖譜建構', href: '/product/graph-engine' },
      { label: '推演劇場', href: '/product/simulation-theater' },
      { label: '預測解碼', href: '/product/predictive-decoder' },
      { label: '數據資產', href: '/product/data-assets' },
    ],
  },
  {
    title: '解決方案',
    links: [
      { label: '公關危機預判', href: '/solutions/crisis-pr' },
      { label: '政治議題推演', href: '/solutions/political-strategy' },
      { label: '品牌聲譽管理', href: '/solutions/brand-reputation' },
      { label: '政策輿論模擬', href: '/solutions/policy-simulation' },
    ],
  },
  {
    title: '資源',
    links: [
      { label: '部落格', href: '/resources/blog', disabled: true },
      { label: '客戶案例', href: '/resources/case-studies' },
      { label: '白皮書', href: '/resources/whitepapers' },
    ],
  },
  {
    title: '公司',
    links: [
      { label: '關於我們', href: '/about' },
      { label: '團隊', href: '/about/team', disabled: true },
      { label: '人才招募', href: '/about/careers', disabled: true },
      { label: '聯絡我們', href: '/contact' },
    ],
  },
];
