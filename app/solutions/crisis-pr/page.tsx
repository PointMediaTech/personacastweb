import type { Metadata } from 'next';
import { SEO_CONFIG } from '@/app/lib/seo-config';
import CrisisPRClient from './CrisisPRClient';

const PAGE_URL = `${SEO_CONFIG.baseUrl}/solutions/crisis-pr`;
const PAGE_TITLE = '公關危機預判 — 在輿論風暴前建立防火牆 | PersonaCast';
const PAGE_DESCRIPTION =
  '掌握輿論的下一步。在危機引爆前，提早 72 小時寫好完美劇本。透過 AI 深度推演，PersonaCast 幫助頂尖公關團隊從「被動救火」轉為「主動防禦」。';

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: PAGE_URL,
  },
  keywords: [
    '公關危機管理', 'AI危機預判', '輿情分析', '危機公關', '品牌聲譽管理',
    'crisis management AI', 'PR crisis prediction', 'reputation management',
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
  name: 'PersonaCast 公關危機預判',
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

export default function CrisisPRPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CrisisPRClient />
    </>
  );
}
