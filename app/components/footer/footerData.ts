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
      { label: 'PersonaLab', href: '#', disabled: true },
      { label: 'Casting Arena', href: '#', disabled: true },
      { label: 'Strategy Graph', href: '#', disabled: true },
      { label: '應用場景', href: '#', disabled: true },
    ],
  },
  {
    title: '資源',
    links: [
      { label: 'OpenSpec 規格文件', href: '#', disabled: true },
      { label: '技術文件', href: '#', disabled: true },
      { label: 'API 文件', href: '#', disabled: true },
      { label: '部落格', href: '#', disabled: true },
    ],
  },
  {
    title: '公司',
    links: [
      { label: '關於我們', href: '#', disabled: true },
      { label: '聯絡我們', href: '#', disabled: true },
      { label: '隱私政策', href: '#', disabled: true },
      { label: '服務條款', href: '#', disabled: true },
    ],
  },
];
