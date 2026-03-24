import type { Metadata } from 'next';
import { SEO_CONFIG } from '@/app/lib/seo-config';
import PoliticalStrategyClient from './PoliticalStrategyClient';

const PAGE_URL = `${SEO_CONFIG.baseUrl}/solutions/political-strategy`;
const PAGE_TITLE = '政治議題推演 — 在輿論風暴前先掌握劇本 | PersonaCast';
const PAGE_DESCRIPTION =
  'PersonaCast 助力政治團隊推演政策宣示、選舉策略與危機處理。透過 AI 輿情模擬，看見明天的輿論走向，讓決策快人一步。';

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: PAGE_URL,
  },
  keywords: [
    '政治策略推演', 'AI選舉模擬', '選舉策略', '政治輿情分析', '政策風向預測',
    'AI政治顧問', '選戰兵棋推演', '政治公關',
    'political strategy AI', 'election simulation', 'political sentiment analysis',
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
  name: 'PersonaCast 政治議題推演',
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
      name: '政治議題推演',
      item: PAGE_URL,
    },
  ],
};

export default function PoliticalStrategyPage() {
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
      <PoliticalStrategyClient />
    </>
  );
}
