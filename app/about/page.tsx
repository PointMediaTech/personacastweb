import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

export const metadata: Metadata = {
  title: '關於 PersonaCast — AI 輿情預測與戰略決策的先驅',
  description:
    'PersonaCast 結合頂尖 AI 技術與公關傳播學，為企業打造專屬的虛擬輿論風洞。我們不僅預測未來，更協助您改寫未來。',
  alternates: { canonical: '/about' },
  openGraph: {
    title: '關於 PersonaCast — AI 輿情預測與戰略決策的先驅',
    description: 'PersonaCast 結合頂尖 AI 技術與公關傳播學，為企業打造專屬的虛擬輿論風洞。我們不僅預測未來，更協助您改寫未來。',
    url: '/about',
  },
  twitter: {
    title: '關於 PersonaCast — AI 輿情預測與戰略決策的先驅',
    description: 'PersonaCast 結合頂尖 AI 技術與公關傳播學，為企業打造專屬的虛擬輿論風洞。',
  },
};

import { AboutHero } from '@/app/components/about/AboutContent';

const MissionSection = dynamic(
  () => import('@/app/components/about/AboutContent').then((m) => ({ default: m.MissionSection })),
);
const AboutStatsSection = dynamic(
  () => import('@/app/components/about/AboutContent').then((m) => ({ default: m.AboutStatsSection })),
);
const ValuesSection = dynamic(
  () => import('@/app/components/about/AboutContent').then((m) => ({ default: m.ValuesSection })),
);
const TeamSection = dynamic(
  () => import('@/app/components/about/AboutContent').then((m) => ({ default: m.TeamSection })),
);
const AboutCTASection = dynamic(
  () => import('@/app/components/about/AboutContent').then((m) => ({ default: m.AboutCTASection })),
);

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'PersonaCast',
  url: 'https://www.personacast.ai',
  description: 'PersonaCast 結合頂尖 AI 技術與公關傳播學，為企業打造專屬的虛擬輿論風洞。',
  foundingDate: '2024',
  sameAs: [
    'https://twitter.com/personacast',
    'https://linkedin.com/company/personacast',
    'https://github.com/personacast',
  ],
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        <AboutHero />
        <MissionSection />
        <AboutStatsSection />
        <ValuesSection />
        <TeamSection />
        <AboutCTASection />
      </main>
    </>
  );
}
