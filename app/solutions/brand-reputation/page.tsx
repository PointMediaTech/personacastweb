import type { Metadata } from 'next';
import { SEO_CONFIG } from '@/app/lib/seo-config';
import BrandReputationClient from './BrandReputationClient';

const PAGE_URL = `${SEO_CONFIG.baseUrl}/solutions/brand-reputation`;
const PAGE_TITLE = '品牌聲譽管理 — AI 量化品牌輿論韌性 | PersonaCast';
const PAGE_DESCRIPTION =
  '使用 PersonaCast 定期模擬品牌面臨各類風險事件時的輿論反應，建立聲譽韌性基線，在品牌危機發生前就建立完善的防護網。';

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: PAGE_URL,
  },
  keywords: [
    '品牌聲譽管理', 'AI輿情監控', '品牌韌性', '聲譽風險預警', '品牌危機預防',
    'AI品牌防護', '輿論壓力測試', '品牌信任管理',
    'brand reputation management AI', 'brand resilience', 'reputation risk monitoring',
    ...SEO_CONFIG.defaultKeywords,
  ],
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    siteName: SEO_CONFIG.siteName,
    locale: 'zh_TW',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'PersonaCast 品牌聲譽管理',
  description: PAGE_DESCRIPTION,
  url: PAGE_URL,
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    availability: 'https://schema.org/OnlineOnly',
  },
  provider: {
    '@type': 'Organization',
    name: SEO_CONFIG.siteName,
    url: SEO_CONFIG.baseUrl,
  },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: '首頁',
      item: SEO_CONFIG.baseUrl,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: '解決方案',
      item: `${SEO_CONFIG.baseUrl}/solutions`,
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: '品牌聲譽管理',
      item: PAGE_URL,
    },
  ],
};

export default function BrandReputationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <BrandReputationClient />
    </>
  );
}
