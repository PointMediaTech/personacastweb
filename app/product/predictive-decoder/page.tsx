import type { Metadata } from 'next';
import { PageHero } from '@/app/components/shared/PageHero';
import { ContentSection } from '@/app/components/shared/ContentSection';
import { BottomCTA } from '@/app/components/shared/BottomCTA';
import { StepNavigation } from '@/app/components/shared/StepNavigation';
import { ScrollReveal } from '@/app/components/shared/ScrollReveal';

export const metadata: Metadata = {
  title: '預測解碼器 — 將推演結果轉化為可行動的輿情預測',
  description:
    'PersonaCast 預測解碼器將 AI 推演結果轉化為帶有信心指數的輿情走向預測、風險評分與策略建議，直接對接您的決策流程，告別盲目猜測。',
  keywords: [
    '預測解碼器', 'AI輿情預測', '輿情風險評分', '策略行動劇本',
    '信心指數', '公關決策支援', 'AI預測分析', 'PersonaCast預測',
    'predictive decoder', 'AI sentiment forecast', 'strategic playbook',
  ],
  alternates: { canonical: '/product/predictive-decoder' },
  openGraph: {
    title: '預測解碼器 — 將推演結果轉化為可行動的輿情預測',
    description:
      'PersonaCast 預測解碼器將 AI 推演結果轉化為帶有信心指數的輿情走向預測、風險評分與策略建議，直接對接您的決策流程，告別盲目猜測。',
    url: '/product/predictive-decoder',
    type: 'website',
    locale: 'zh_TW',
    siteName: 'PersonaCast',
  },
  twitter: {
    card: 'summary_large_image',
    title: '預測解碼器 — 將推演結果轉化為可行動的輿情預測',
    description:
      '從百萬種可能中萃取唯一最佳解。PersonaCast 預測解碼器直接輸出帶信心指數的行動劇本。',
  },
};

const outputCards = [
  {
    title: '視覺化輿情路徑圖',
    description:
      '掌握每一個關鍵轉折與介入窗口。以時間軸直觀呈現最可能演化的輿論路徑，告訴您哪一刻輿論會分裂，哪一刻沉默多數會加入。',
  },
  {
    title: '動態風險評估矩陣',
    description:
      '找出最脆弱的利害關係人群體。透過熱力圖深度解析各群體的敏感度，不僅警示風險，更指引您發現潛在的發聲盟友。',
  },
  {
    title: 'AI 生成的行動劇本',
    description:
      '不再是模糊建議，而是按優先級排序的具體行動清單。明確指出「何時發聲、誰來發、怎麼說」，每一條都附帶信心指數作為堅實後盾。',
  },
] as const;

const dashboardMetrics = [
  {
    label: '預測收斂度',
    value: '94.2%',
    sub: '基於 10,000+ 次平行劇本推演',
    color: 'from-[#00F2FF] to-[#769EDB]',
  },
  {
    label: '信心區間邊界',
    value: '±4.5%',
    sub: '動態誤差估測，劃定確定性範圍',
    color: 'from-[#769EDB] to-[#00F2FF]',
  },
  {
    label: '最佳策略勝率',
    value: '89.7%',
    sub: '多數壓力測試中導向最佳結局',
    color: 'from-blue-400 to-indigo-400',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.personacast.ai/product/predictive-decoder',
      url: 'https://www.personacast.ai/product/predictive-decoder',
      name: '預測解碼器 — 將推演結果轉化為可行動的輿情預測',
      description:
        'PersonaCast 預測解碼器將 AI 推演結果轉化為帶有信心指數的輿情走向預測、風險評分與策略建議，直接對接您的決策流程。',
      inLanguage: 'zh-TW',
      isPartOf: { '@id': 'https://www.personacast.ai' },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: '首頁', item: 'https://www.personacast.ai' },
        { '@type': 'ListItem', position: 2, name: '產品', item: 'https://www.personacast.ai/product' },
        {
          '@type': 'ListItem',
          position: 3,
          name: '預測解碼器',
          item: 'https://www.personacast.ai/product/predictive-decoder',
        },
      ],
    },
  ],
};

export default function PredictiveDecoderPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHero
        h1="從百萬種可能中，為您萃取「唯一最佳解」。"
        h2="預測解碼器不只預見未來，更直接對接您的決策流程。我們將《推演劇場》的千萬種平行時空，收斂成帶有信心指數的「具體行動清單」。不再依靠直覺摸黑前行——我們直接告訴您下一步該怎麼走。"
        ctaPrimary={{ label: '獲取《產業解碼範例》', href: '/contact?type=report' }}
        ctaSecondary={{ label: '預約實機演示', href: '/contact?type=demo' }}
        layout="center"
      />

      {/* Section 2 — 核心價值觀 (New Lead Gen Hook Section) */}
      <ContentSection>
        <div className="max-w-4xl mx-auto text-center mb-16">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              告別模稜兩可，只提供可執行的策略。
            </h2>
            <p className="text-[#94A3B8] text-lg leading-relaxed">
              頂尖公關與決策者依賴 PersonaCast 的原因很簡單：我們不只給數據，我們直接為您生成確切的「行動劇本」。
            </p>
          </ScrollReveal>
        </div>
      </ContentSection>

      {/* Section 3 — 核心產出視覺化升級 */}
      <ContentSection>
        <ScrollReveal>
          <div className="flex flex-col items-center mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
              解碼結果展示
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#00F2FF] to-[#769EDB] rounded-full"></div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {outputCards.map((card, i) => (
             <ScrollReveal key={card.title} delay={i * 0.1}>
              <div className="group relative h-full flex flex-col p-8 rounded-2xl bg-[#0A0E1A] border border-white/10 hover:border-[#769EDB]/30 transition-all duration-500 hover:-translate-y-1">
                {/* 裝飾性光暈背景 */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#769EDB]/0 via-transparent to-[#00F2FF]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <h3 className="relative text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#769EDB]/20 flex items-center justify-center text-[#769EDB] text-sm">
                    {i + 1}
                  </span>
                  {card.title}
                </h3>
                <p className="relative text-[#94A3B8] text-base leading-relaxed flex-grow">
                  {card.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </ContentSection>

      {/* Section 4 — 數據信心指標 (儀表板風格) */}
      <ContentSection>
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
              絕對透明的信心指標
            </h2>
            <p className="text-[#94A3B8]">每一項預測，都有背後嚴格計算的信心背書。</p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {dashboardMetrics.map((metric, i) => (
            <ScrollReveal key={metric.label} delay={i * 0.1}>
              <div
                className="relative rounded-2xl p-8 text-center flex flex-col items-center justify-center overflow-hidden transition-all duration-300 hover:scale-[1.02] bg-[#111827] border border-[#769EDB]/15"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#769EDB] opacity-[0.03] rounded-full blur-2xl -mr-10 -mt-10"></div>
                
                <h3 className="text-base font-semibold text-[#94A3B8] uppercase tracking-wider mb-3">
                  {metric.label}
                </h3>
                <div className={`text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r ${metric.color} mb-4 drop-shadow-sm`}>
                  {metric.value}
                </div>
                <p className="text-[#94A3B8] text-xs">
                  {metric.sub}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </ContentSection>

      {/* Section 5 — 銜接 CTA (終極引流區塊) */}
      <BottomCTA
        h2="準備好讓每一次決策都有絕對的把握了嗎？"
        body="索取針對您產業定制的《PersonaCast 綜合解碼白皮書》，或立即預約由專家帶領的系統演示，親自見證 AI 如何顛覆傳統公關決策。"
        ctaPrimary={{ label: '免費下載白皮書', href: '/contact?type=whitepaper' }}
        ctaSecondary={{ label: '預約解碼器演示', href: '/contact?type=demo' }}
      />
      <StepNavigation currentHref="/product/predictive-decoder" />
    </>
  );
}
