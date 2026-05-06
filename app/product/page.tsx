import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { ProductHero } from '@/app/components/product/ProductContent';
import { SEO_CONFIG } from '@/app/lib/seo-config';
import { generateBreadcrumbSchema, generateSoftwareAppSchema } from '@/app/lib/structured-data';

export const metadata: Metadata = {
  title: '產品功能 — AI 輿情推演與預測平台',
  description:
    '透過五步 AI 工作流——種子注入、圖譜建構、推演劇場、預測解碼、數據資產——讓您在輿論成形前掌控局勢。探索 PersonaCast 的完整功能。',
  alternates: { canonical: '/product' },
  openGraph: {
    title: 'PersonaCast 產品功能 — AI 輿情推演與預測平台',
    description: '五步推演，一步到位。從議題注入到策略資產的完整 AI 工作流。',
    url: '/product',
  },
};

const ProductStepsSection = dynamic(
  () => import('@/app/components/product/ProductContent').then((m) => ({ default: m.ProductStepsSection })),
);
const SimulationFeatureSection = dynamic(
  () => import('@/app/components/product/ProductContent').then((m) => ({ default: m.SimulationFeatureSection })),
);
const ProductStatsSection = dynamic(
  () => import('@/app/components/product/ProductContent').then((m) => ({ default: m.ProductStatsSection })),
);
const ProductCTASection = dynamic(
  () => import('@/app/components/product/ProductContent').then((m) => ({ default: m.ProductCTASection })),
);

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: '首頁', url: SEO_CONFIG.baseUrl },
  { name: '產品功能', url: `${SEO_CONFIG.baseUrl}/product` },
]);

const softwareAppSchema = generateSoftwareAppSchema();

export default function ProductPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
      />
      <main>
        <ProductHero />
        <ProductStepsSection />
        <SimulationFeatureSection />
        <ProductStatsSection />
        <ProductCTASection />
      </main>
    </>
  );
}
