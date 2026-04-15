import type { Metadata } from 'next';
import { PageHero } from '@/app/components/shared/PageHero';
import { ContentSection } from '@/app/components/shared/ContentSection';
import { BottomCTA } from '@/app/components/shared/BottomCTA';
import { StepNavigation } from '@/app/components/shared/StepNavigation';
import { ScrollReveal } from '@/app/components/shared/ScrollReveal';
import { InteractiveGraphFeatures } from './InteractiveGraphFeatures';
import { LeadMagnetForm } from './LeadMagnetForm';

export const metadata: Metadata = {
  title: '圖譜建構系統 — 透視輿論黑箱',
  description:
    'PersonaCast 圖譜引擎為您即時捕捉 KOL 隱形連結與社群同溫層邊界。在危機引爆前搶先佈局，精準鎖定每一波傳播源頭。',
  alternates: { canonical: '/product/graph-engine' },
  keywords: [
    '圖譜引擎', 'KOL 網絡分析', '社群同溫層', '輿論圖譜', '社群圖譜分析',
    '危機公關防禦', '輿情監控', '傳播路徑追蹤', '意見領袖分析',
    'graph engine', 'KOL network analysis', 'social graph', 'opinion network',
    'crisis PR', 'influencer mapping', 'PersonaCast',
  ],
  openGraph: {
    title: '圖譜建構系統 — 透視輿論黑箱 | PersonaCast',
    description:
      '即時捕捉 KOL 隱形連結與社群同溫層邊界。在危機引爆前搶先佈局，精準鎖定每一波傳播源頭。',
    type: 'website',
    locale: 'zh_TW',
    url: '/product/graph-engine',
  },
  twitter: {
    card: 'summary_large_image',
    title: '圖譜建構系統 — 透視輿論黑箱 | PersonaCast',
    description:
      '即時捕捉 KOL 隱形連結與社群同溫層邊界。在危機引爆前搶先佈局，精準鎖定每一波傳播源頭。',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'PersonaCast 圖譜引擎',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  description:
    '即時捕捉 KOL 隱形連結與社群同溫層邊界的 AI 圖譜分析系統。協助企業在危機引爆前搶先佈局，精準鎖定傳播源頭。',
  offers: {
    '@type': 'Offer',
    url: 'https://www.personacast.ai/pricing',
  },
  provider: {
    '@type': 'Organization',
    name: 'PersonaCast',
    url: 'https://www.personacast.ai',
  },
};

const bentoUseCases = [
  {
    title: '品牌危機公關防禦',
    description: '3 分鐘內抓出惡意源頭，切斷負面傳播鏈。系統自動化追蹤傳播路徑，幫助公關團隊第一時間做出反擊。',
    stat: '反應時間縮短 80%',
    style: 'md:col-span-2 bg-gradient-to-br from-[#1E293B] to-[#0F172A] border-[#334155]'
  },
  {
    title: '全網輿論操盤佈局',
    description: '找出競品網絡脆弱點，奪回話語主導權。直擊痛點進行攻防。',
    stat: 'KOL 精準覆蓋 3x',
    style: 'md:col-span-1 bg-[#111827] border-[#1F2937]'
  },
  {
    title: '新品擴散市場探測',
    description: '精準定位「種子傳播者」，放大行銷 ROI。不再盲目投放廣告，找到最願意主動幫您分享的核心聚落。',
    stat: '首波擴散率提升 150%',
    style: 'md:col-span-3 lg:col-span-3 flex flex-col md:flex-row items-center gap-6 bg-gradient-to-r from-[#0A0E1A] via-[#111827] to-[#1E293B] border-[#1F2937] p-8 lg:p-12 text-center md:text-left'
  }
];

export default function GraphEnginePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        h1="看透輿論黑箱，掌控權力的隱形網絡。"
        h2="PersonaCast 圖譜引擎為您即時捕捉 KOL 隱形連結與社群同溫層邊界。在危機引爆前搶先佈局，精準鎖定每一波傳播源頭。"
        ctaPrimary={{ label: '預約專屬戰情室演練', href: '/contact' }}
        ctaSecondary={{ label: '觀看 1 分鐘系統實測', href: '#demo' }}
        layout="center"
        accentColor="rgba(139, 92, 246, 0.15)"
      />

      {/* Section 2 — Interactive 4 Dimensions */}
      <ContentSection>
        <InteractiveGraphFeatures />
      </ContentSection>

      {/* Section 3 — Bento Box Use Cases */}
      <ContentSection className="bg-[#050812]">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">
              戰場上的絕對優勢
            </h2>
            <p className="text-lg text-[#94A3B8] max-w-2xl mx-auto">
              把冷硬的數據，轉化為您企業的護城河與攻擊武器。
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {bentoUseCases.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 0.1} className={item.style}>
              <div className="h-full rounded-3xl border border-white/5 p-8 flex flex-col justify-between group overflow-hidden relative transition-all duration-500 hover:border-white/10 hover:shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10 w-full">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
                    {item.title}
                  </h3>
                  <p className="text-[#94A3B8] leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>
                <div className="relative z-10 mt-auto">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 text-[#00F2FF] font-mono text-sm font-bold border border-[#00F2FF]/20 shadow-[0_0_15px_rgba(0,242,255,0.1)]">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F2FF] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00F2FF]"></span>
                    </span>
                    {item.stat}
                  </span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </ContentSection>

      {/* Section 4 — Lead Magnet */}
      <ContentSection>
        <ScrollReveal>
          <div className="max-w-5xl mx-auto relative rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-[#111827] to-[#050812] border border-[#769EDB]/20 p-8 md:p-16 lg:p-20 flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left shadow-[0_0_50px_rgba(118,158,219,0.1)]">
            {/* Background glow — reduced blur for performance */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-72 h-72 bg-[#00F2FF]/8 rounded-full blur-[60px] pointer-events-none" aria-hidden="true"></div>

            <div className="relative z-10 max-w-xl">
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest text-[#00F2FF] bg-[#00F2FF]/10 mb-6 border border-[#00F2FF]/20">
                限量免費下載
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 leading-tight">
                不確定圖譜系統能帶來多少優勢？
              </h2>
              <p className="text-lg text-[#94A3B8] mb-8 leading-relaxed">
                下載《2026 危機公關網絡戰術白皮書》，看頂尖品牌與操盤手如何運用網絡分析逆轉局勢。不再憑感覺下指令。
              </p>
              <LeadMagnetForm />
            </div>

            <div className="relative z-10 hidden md:block w-48 h-64 lg:w-64 lg:h-80 bg-gradient-to-tr from-[#0F1629] via-[#111827] to-[#1E293B] rounded-lg shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500 border border-[#769EDB]/30 flex items-center justify-center group overflow-hidden">
              <div className="absolute inset-y-0 left-0 w-2 bg-gradient-to-b from-[#769EDB]/40 to-[#00F2FF]/40 rounded-l-lg"></div>
              <div className="text-center p-6 w-full">
                <div className="w-12 h-12 bg-[#00F2FF]/10 border border-[#00F2FF]/30 rounded-full mx-auto mb-4 flex items-center justify-center shadow-[0_0_15px_rgba(0,242,255,0.2)]">
                  <svg className="w-6 h-6 text-[#00F2FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-white font-bold text-lg mb-2 leading-snug">2026 危機公關<br />網絡戰術</h3>
                <p className="text-[#769EDB] text-xs tracking-widest mt-4 border-t border-white/10 pt-4">PERSONACAST</p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-lg"></div>
            </div>
          </div>
        </ScrollReveal>
      </ContentSection>

      {/* Section 5 — Bottom CTA */}
      <BottomCTA
        h2="別讓競爭對手先看透這張底牌。"
        body="當危機發生，黃金反應時間只有3小時。現在就建立您的企業級防禦網絡。"
        ctaPrimary={{ label: '免費申請企業現況圖譜健檢 →', href: '/contact' }}
      />
      <StepNavigation currentHref="/product/graph-engine" />
    </>
  );
}
