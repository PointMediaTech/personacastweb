import type { Metadata } from 'next';
import { PageHero } from '@/app/components/shared/PageHero';
import { ContentSection } from '@/app/components/shared/ContentSection';
import { BottomCTA } from '@/app/components/shared/BottomCTA';

export const metadata: Metadata = {
  title: '部落格 / 洞察 — PersonaCast',
  description: 'PersonaCast 團隊的最新觀點、產業分析與策略洞察。',
  alternates: { canonical: '/resources/blog' },
  robots: { index: false, follow: true },
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        h1="部落格與洞察"
        h2="PersonaCast 團隊的最新觀點、產業分析與策略洞察。"
      />
      <ContentSection className="text-center">
        <div className="max-w-2xl mx-auto py-12">
          <p className="text-2xl font-heading font-bold text-white mb-4">
            即將推出
          </p>
          <p className="text-[#94A3B8] leading-relaxed">
            我們正在準備精彩的內容。請持續關注，第一批文章即將上線。
          </p>
        </div>
      </ContentSection>
      <BottomCTA
        h2="搶先體驗 PersonaCast"
        body="留下您的資訊，我們將在部落格上線時第一時間通知您。"
        ctaPrimary={{ label: '聯絡我們', href: '/contact' }}
      />
    </>
  );
}
