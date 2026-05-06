import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { ResourcesHero } from '@/app/components/resources/ResourcesContent';

export const metadata: Metadata = {
  title: '資源中心 — 輿情預測洞察、案例與白皮書 | PersonaCast',
  description:
    '探索 PersonaCast 的輿情預測知識庫：深度部落格文章、客戶成功案例、可下載白皮書。掌握 AI 輿情分析的最新趨勢與最佳實踐。',
  alternates: { canonical: '/resources' },
  openGraph: {
    title: '資源中心 — 輿情預測洞察、案例與白皮書 | PersonaCast',
    description:
      '探索 PersonaCast 的輿情預測知識庫：深度部落格文章、客戶成功案例、可下載白皮書。',
    url: '/resources',
  },
};

const ResourcesGridSection = dynamic(
  () => import('@/app/components/resources/ResourcesContent').then((m) => ({ default: m.ResourcesGridSection })),
);
const ResourcesNewsletterSection = dynamic(
  () => import('@/app/components/resources/ResourcesContent').then((m) => ({ default: m.ResourcesNewsletterSection })),
);

export default function ResourcesPage() {
  return (
    <main>
      <ResourcesHero />
      <ResourcesGridSection />
      <ResourcesNewsletterSection />
    </main>
  );
}
