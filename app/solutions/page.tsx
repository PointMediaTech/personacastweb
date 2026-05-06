import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { SolutionsHero } from '@/app/components/solutions/SolutionsContent';

export const metadata: Metadata = {
  title: '解決方案 — 公關危機、品牌聲譽、政治推演 | PersonaCast',
  description:
    '無論您面對公關危機、品牌聲譽管理、政治議題推演或政策輿論模擬，PersonaCast 都能在輿論定型前給您掌控權。探索適合您的解決方案。',
  alternates: { canonical: '/solutions' },
  openGraph: {
    title: '解決方案 — 公關危機、品牌聲譽、政治推演 | PersonaCast',
    description: '無論您面對公關危機、品牌聲譽管理、政治議題推演或政策輿論模擬，PersonaCast 都能在輿論定型前給您掌控權。',
    url: '/solutions',
  },
};

const SolutionsGridSection = dynamic(
  () => import('@/app/components/solutions/SolutionsContent').then((m) => ({ default: m.SolutionsGridSection })),
);
const SolutionsValueSection = dynamic(
  () => import('@/app/components/solutions/SolutionsContent').then((m) => ({ default: m.SolutionsValueSection })),
);
const SolutionsCTASection = dynamic(
  () => import('@/app/components/solutions/SolutionsContent').then((m) => ({ default: m.SolutionsCTASection })),
);

export default function SolutionsPage() {
  return (
    <main>
      <SolutionsHero />
      <SolutionsGridSection />
      <SolutionsValueSection />
      <SolutionsCTASection />
    </main>
  );
}
