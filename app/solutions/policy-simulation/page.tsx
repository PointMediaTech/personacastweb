import type { Metadata } from 'next';
import { SEO_CONFIG } from '@/app/lib/seo-config';
import PolicySimulationClient from './PolicySimulationClient';

const PAGE_URL = `${SEO_CONFIG.baseUrl}/solutions/policy-simulation`;
const PAGE_TITLE = '政策輿論模擬 — 預測政策發布後的社會反應 | PersonaCast';
const PAGE_DESCRIPTION =
  '告別同溫層偏差與事後滅火。PersonaCast 政策模擬引擎，協助決策者在政策發布前，精準預測各階層群體反彈，提前化解阻力，凝聚社會共識。';

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: PAGE_URL,
  },
  keywords: [
    '政策輿論模擬', '政策風險預測', 'AI政策分析', '社會反應預測', '政策沙盤推演',
    '輿情模擬引擎', '政策衝擊評估', '社會共識凝聚',
    'policy simulation AI', 'public opinion forecasting', 'policy risk assessment',
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
  name: 'PersonaCast 政策輿論模擬',
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
      name: '政策輿論模擬',
      item: PAGE_URL,
    },
  ],
};

export default function PolicySimulationPage() {
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
      <PolicySimulationClient />
    </>
  );
}
