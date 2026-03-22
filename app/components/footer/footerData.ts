export const CTA_HREF = '#';

export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

export const footerColumns: FooterColumn[] = [
  {
    title: '產品',
    links: [
      { label: 'PersonaLab', href: '#' },
      { label: 'Casting Arena', href: '#' },
      { label: 'Strategy Graph', href: '#' },
      { label: '應用場景', href: '#' },
    ],
  },
  {
    title: '資源',
    links: [
      { label: 'OpenSpec 規格文件', href: '#' },
      { label: '技術文件', href: '#' },
      { label: 'API 文件', href: '#' },
      { label: '部落格', href: '#' },
    ],
  },
  {
    title: '公司',
    links: [
      { label: '關於我們', href: '#' },
      { label: '聯絡我們', href: '#' },
      { label: '隱私政策', href: '#' },
      { label: '服務條款', href: '#' },
    ],
  },
];
