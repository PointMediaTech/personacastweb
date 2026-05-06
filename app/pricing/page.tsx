import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { PricingHero } from '@/app/components/pricing/PricingContent';

export const metadata: Metadata = {
  title: '定價方案 — 從試用到企業級 AI 輿情推演',
  description:
    '探索 PersonaCast 彈性定價：免費洞察版、預判版 NT$29,900/月起、企業指揮版客製報價。AI 輿情推演，72 小時戰略先機。',
  alternates: { canonical: '/pricing' },
};

const PricingCardsSection = dynamic(
  () => import('@/app/components/pricing/PricingContent').then((m) => ({ default: m.PricingCardsSection })),
);
const PricingTrustSection = dynamic(
  () => import('@/app/components/pricing/PricingContent').then((m) => ({ default: m.PricingTrustSection })),
);
const PricingFAQSection = dynamic(
  () => import('@/app/components/pricing/PricingContent').then((m) => ({ default: m.PricingFAQSection })),
);
const PricingCTASection = dynamic(
  () => import('@/app/components/pricing/PricingContent').then((m) => ({ default: m.PricingCTASection })),
);

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: '我們的資料安全嗎？推演內容會不會被用來訓練 AI？', acceptedAnswer: { '@type': 'Answer', text: '絕對不會。資料隔離，零交叉存取，不用於訓練任何 AI 模型。' } },
    { '@type': 'Question', name: '推演結果的準確度如何驗證？', acceptedAnswer: { '@type': 'Answer', text: '三層驗證機制：交叉推演收斂性、歷史回測、信心指數透明化，整體趨勢準確率達 94%。' } },
    { '@type': 'Question', name: 'PersonaCast 的 AI 人格是怎麼建構的？', acceptedAnswer: { '@type': 'Answer', text: '每個人格由多維度參數定義，基於大規模社會行為數據訓練，模擬真實人群的反應分布。' } },
  ],
};

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <main>
        <PricingHero />
        <PricingCardsSection />
        <PricingTrustSection />
        <PricingFAQSection />
        <PricingCTASection />
      </main>
    </>
  );
}
