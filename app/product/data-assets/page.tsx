import type { Metadata } from 'next';
import Script from 'next/script';
import { PageHero } from '@/app/components/shared/PageHero';
import { ContentSection } from '@/app/components/shared/ContentSection';
import { BottomCTA } from '@/app/components/shared/BottomCTA';
import { StepNavigation } from '@/app/components/shared/StepNavigation';
import { ScrollReveal } from '@/app/components/shared/ScrollReveal';
import { generateBreadcrumbSchema } from '@/app/lib/structured-data';
import { SEO_CONFIG } from '@/app/lib/seo-config';

export const metadata: Metadata = {
  title: '數據資產庫 — 企業級策略知識庫',
  description:
    'PersonaCast 數據資產庫解決流失帶來的經驗斷層。將每一次兵棋推演與輿論應對，自動沉澱為可檢索、可複用的企業級策略庫。讓新人接手也能具備十年老手的預判直覺。',
  keywords: [
    '數據資產庫', '策略知識庫', '公關經驗傳承', '推演結果管理',
    'AI 策略大腦', '輿情知識庫', '危機應對資料庫', 'PersonaCast',
  ],
  alternates: { canonical: '/product/data-assets' },
  openGraph: {
    title: '數據資產庫 — 企業級策略大腦 | PersonaCast',
    description:
      '解決流失帶來的經驗斷層。將每一次兵棋推演與輿論應對，自動沉澱為可複用的企業級策略庫。',
    url: '/product/data-assets',
    type: 'website',
    locale: 'zh_TW',
    siteName: 'PersonaCast',
  },
  twitter: {
    card: 'summary_large_image',
    title: '數據資產庫 — 企業級策略大腦 | PersonaCast',
    description:
      '解決流失帶來的經驗斷層。將每一次兵棋推演與輿論應對，自動沉澱為可複用的企業級策略庫。',
  },
};

const outputCards = [
  {
    title: '全歷程高解析回溯',
    description:
      '隨時回放任何一次推演的完整過程。逐幀檢視每一種立場如何成形、輿論的雪球是如何滾大的，讓失敗的模擬也能成為高價值的教材。',
  },
  {
    title: '跨維度平行比較',
    description:
      '「上次的情境 A 和這次情境 B，到底哪個更穩健？」並排比較不同變數下的推演結果。不再依賴記憶，而是用精確的數據進行對比與驗證。',
  },
  {
    title: '語意標籤與 AI 檢索',
    description:
      '為策略結果自動添加客戶、議題、風險標籤。然後用自然語言向大腦提問：「去年關於工安事故的推演中，哪個聲明稿在年輕族群中效果最好？」',
  },
  {
    title: '無縫對接決策層 API',
    description:
      '將沉澱的策略資產無縫對接收至您既有的 BI 系統、企業內部知識庫或自動化決策工具。您的數據，您的格式，讓價值無限延伸。',
  },
] as const;

const dashboardMetrics = [
  {
    label: '歷史推演調用率',
    value: '100%',
    sub: '所有推演劇本皆可一鍵調閱與重現',
    color: 'from-[#00F2FF] to-[#769EDB]',
  },
  {
    label: '策略複用時間節省',
    value: '85%+',
    sub: '面對類似危機，大幅縮短反應時間',
    color: 'from-[#769EDB] to-[#00F2FF]',
  },
  {
    label: '知識庫自適應成長',
    value: '∞',
    sub: '每多一次推演，系統預判就更精準',
    color: 'from-blue-400 to-indigo-400',
  },
];

export default function DataAssetsPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: '首頁', url: SEO_CONFIG.baseUrl },
    { name: '產品', url: `${SEO_CONFIG.baseUrl}/product` },
    { name: '數據資產庫', url: `${SEO_CONFIG.baseUrl}/product/data-assets` },
  ]);

  return (
    <>
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <PageHero
        h1="把每一次危機應對，變成永不遺忘的戰略大腦。"
        h2="解決人員流失帶來的經驗斷層。將每一次兵棋推演與輿論應對，自動沉澱為可檢索、可複用的企業級策略庫。讓團隊新人接手也能擁有十年老手的預判直覺。"
        ctaPrimary={{ label: '預約大腦建置諮詢', href: '/contact?type=demo' }}
        ctaSecondary={{ label: '下載資產化案例', href: '/contact?type=case-study' }}
        layout="center"
      />

      {/* Section 2 — 核心價值觀 (New Lead Gen Hook Section) */}
      <section className="relative min-h-[60vh] flex items-center py-20 overflow-hidden">
        {/* Subtle background layers for visual depth */}
        <div className="absolute inset-0 bg-[#060913] z-0 pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-[#00F2FF]/5 to-[#769EDB]/10 blur-[100px] rounded-full pointer-events-none z-0"></div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 w-full">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#769EDB] text-sm font-medium mb-8">
                <span className="w-2 h-2 rounded-full bg-[#00F2FF] animate-pulse"></span>
                企業級策略傳承
              </div>
              <h2 className="text-3xl md:text-5xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#94A3B8] tracking-tight mb-8 leading-tight drop-shadow-sm">
                告別公關斷層，<br className="md:hidden" />把經驗轉變成<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F2FF] to-[#769EDB]">防彈級的組織大腦</span>。
              </h2>
              <p className="text-[#94A3B8] text-lg md:text-xl leading-relaxed mb-10 max-w-3xl mx-auto">
                每一次的輿論交鋒不該只留在員工的記憶裡。您的組織需要一個專屬的策略防護網，它將隨著每一次推演與實戰，化無形知識為有形資產。
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="/contact?type=consultation"
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#00F2FF]/20 to-[#769EDB]/20 hover:from-[#00F2FF]/30 hover:to-[#769EDB]/30 border border-[#00F2FF]/30 text-white font-medium transition-all duration-300 shadow-[0_0_20px_rgba(0,242,255,0.15)] hover:shadow-[0_0_30px_rgba(0,242,255,0.25)] flex items-center justify-center gap-2"
                >
                  下載企業建置藍圖
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Section 3 — 資產化功能展示 (Premium Cards) */}
      <section className="relative min-h-screen flex flex-col justify-center py-24 z-10">
        {/* Subtle Cyber Grid Background Indicator */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#769EDB 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 w-full">
          <ScrollReveal>
            <div className="flex flex-col items-center mb-20 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight">
                戰略知識庫核心機能
              </h2>
              <p className="text-[#94A3B8] text-lg max-w-2xl mb-6">從混沌的輿論數據中提煉出高度結構化的策略模組，讓知識成為真正的資產。</p>
              <div className="w-24 h-1 bg-gradient-to-r from-[#00F2FF] to-[#769EDB] rounded-full"></div>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {outputCards.map((card, i) => (
               <ScrollReveal key={card.title} delay={i * 0.1} className="h-full">
                <div className="group relative h-full flex flex-col p-8 md:p-10 rounded-2xl bg-[#111827]/60 backdrop-blur-md border border-white/5 hover:border-[#769EDB]/40 transition-all duration-500 hover:-translate-y-2 overflow-hidden shadow-lg">
                  {/* Decorative glowing gradient inside card */}
                  <div className="absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-br from-[#769EDB]/20 to-[#00F2FF]/0 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                  
                  {/* Glassmorphism subtle overlay */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none"></div>

                  <h3 className="relative z-10 text-2xl font-bold text-white mb-5 flex items-center gap-4">
                    <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-white/10 flex items-center justify-center text-[#00F2FF] font-black font-mono shadow-inner group-hover:border-[#00F2FF]/40 transition-colors">
                      <div className="absolute inset-0 bg-[#00F2FF]/10 blur-sm rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      0{i + 1}
                    </div>
                    {card.title}
                  </h3>
                  <p className="relative z-10 text-[#94A3B8] text-lg leading-relaxed flex-grow">
                    {card.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4 — 數據信心指標 (儀表板風格) */}
      <section className="relative bg-[#060913]">
        {/* Top border glowing line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#769EDB]/20 to-transparent"></div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 lg:py-32">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight">
                資產的無盡增值
              </h2>
              <p className="text-[#94A3B8] text-lg max-w-2xl mx-auto">當推演次數不斷累積，您的組織在面對未知危機時，將不再依靠運氣，而是仰賴堅實的數據。</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {dashboardMetrics.map((metric, i) => (
              <ScrollReveal key={metric.label} delay={i * 0.1} className="h-full">
                <div className="group relative rounded-3xl p-10 text-center flex flex-col items-center justify-center overflow-hidden transition-all duration-500 hover:scale-[1.03] bg-gradient-to-b from-[#111827] to-[#0A0E1A] border border-white/5 hover:border-white/10 shadow-2xl h-full">
                  {/* Background ambient glow matching the metric color */}
                  <div className={"absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-r opacity-0 group-hover:opacity-[0.08] rounded-full blur-[60px] transition-all duration-700 " + metric.color}></div>
                  
                  <h3 className="relative z-10 text-sm font-semibold text-[#94A3B8] uppercase tracking-[0.2em] mb-4">
                    {metric.label}
                  </h3>
                  <div className={"relative z-10 text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br tracking-tighter drop-shadow-lg mb-6 " + metric.color}>
                    {metric.value}
                  </div>
                  <p className="relative z-10 text-[#94A3B8] text-sm md:text-base font-medium leading-relaxed">
                    {metric.sub}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5 — 銜接 CTA (終極引流區塊) */}
      <BottomCTA
        h2="準備好建立貴公司的第一座輿情戰備庫了嗎？"
        body="立即預約由專家帶領的系統建置評估，親自見證 AI 如何為您企業保留每一次的公關作戰經驗，化無形知識為有形資產。"
        ctaPrimary={{ label: '預約建置評估', href: '/contact?type=consultation' }}
        ctaSecondary={{ label: '返回產品總覽', href: '/product' }}
      />
      <StepNavigation currentHref="/product/data-assets" />
    </>
  );
}
