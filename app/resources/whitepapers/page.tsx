import type { Metadata } from 'next';
import { Download, CheckCircle2, ChevronRight, BookOpen } from 'lucide-react';
import { PageHero } from '@/app/components/shared/PageHero';
import { ContentSection } from '@/app/components/shared/ContentSection';
import { BottomCTA } from '@/app/components/shared/BottomCTA';
import { ScrollReveal } from '@/app/components/shared/ScrollReveal';
import { SEO_CONFIG } from '@/app/lib/seo-config';

const pageUrl = `${SEO_CONFIG.baseUrl}/resources/whitepapers`;

export const metadata: Metadata = {
  title: '獨家白皮書與產業洞察 — PersonaCast',
  description:
    '下載 PersonaCast 的深度白皮書，掌握 AI 輿情預測方法論、公關危機預判框架與品牌韌性評估模型，為高階決策者提供前瞻性戰略參考。',
  alternates: { canonical: pageUrl },
  openGraph: {
    title: '獨家白皮書與產業洞察 — PersonaCast',
    description:
      '下載 PersonaCast 的深度白皮書，掌握 AI 輿情預測方法論、公關危機預判框架與品牌韌性評估模型。',
    url: pageUrl,
    siteName: SEO_CONFIG.siteName,
    locale: 'zh_TW',
    type: 'website',
    images: [{ url: `${SEO_CONFIG.baseUrl}/og/whitepapers.png`, width: 1200, height: 630, alt: 'PersonaCast 白皮書與產業洞察' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '獨家白皮書與產業洞察 — PersonaCast',
    description:
      '下載 PersonaCast 的深度白皮書，掌握 AI 輿情預測方法論、公關危機預判框架與品牌韌性評估模型。',
    images: [`${SEO_CONFIG.baseUrl}/og/whitepapers.png`],
  },
};

const whitepapers = [
  {
    slug: 'ai-opinion-simulation-methodology',
    title: 'AI 輿論推演方法論白皮書',
    badge: '技術架構解析',
    description:
      '深入解析 PersonaCast 核心技術。從多元人格引擎的建構方法、力導向圖譜的演算法設計，到預測輸出的信心指數計算，帶您一窺次世代輿情預測引擎的底層邏輯。',
    takeaways: [
      '圖神經網路 (GNN) 於輿論擴散之應用',
      'LLM Agent 群體博弈模型架構',
      '反事實推演 (Counterfactual Reasoning) 實務',
    ],
    color: 'from-blue-500/20 to-blue-500/5',
    borderColor: 'border-blue-500/30',
    iconColor: 'text-blue-400',
    buttonColor: 'bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border-blue-500/30',
  },
  {
    slug: 'crisis-pr-prediction-defense-framework',
    title: '公關危機預判與防禦框架',
    badge: '實戰教戰手冊',
    description:
      '引領企業從「被動回應」走向「主動防禦」。本指南涵蓋危機生命週期分析、沉默螺旋辨識方法，以及最佳介入時機判斷模型，助您在風暴成形前精準拆彈。',
    takeaways: [
      '危機前期的弱信號 (Weak Signals) 偵測',
      '多情境平行推演的策略比較法則',
      '公關資源投放的最佳化決策模型',
    ],
    color: 'from-emerald-500/20 to-emerald-500/5',
    borderColor: 'border-emerald-500/30',
    iconColor: 'text-emerald-400',
    buttonColor: 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  },
  {
    slug: 'brand-resilience-index-model',
    title: '企業品牌韌性 (BRI) 評估模型',
    badge: '量化指標指南',
    description:
      '如何科學化衡量品牌的輿論承受力？本報告提出品牌韌性指數（Brand Resilience Index）的計算方法，包含輿論壓力測試與恢復曲線分析，建立可量化的聲譽護城河。',
    takeaways: [
      '品牌韌性指數 (BRI) 的 5 大核心維度',
      '輿論壓力測試 (Stress Testing) 實施步驟',
      '長期聲譽趨勢與商業價值的關聯分析',
    ],
    color: 'from-amber-500/20 to-amber-500/5',
    borderColor: 'border-amber-500/30',
    iconColor: 'text-amber-400',
    buttonColor: 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border-amber-500/30',
  },
] as const;

function WhitepapersJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: '獨家白皮書與產業洞察 — PersonaCast',
    description:
      '下載 PersonaCast 的深度白皮書，掌握 AI 輿情預測方法論、公關危機預判框架與品牌韌性評估模型。',
    url: pageUrl,
    publisher: {
      '@type': 'Organization',
      name: SEO_CONFIG.siteName,
      url: SEO_CONFIG.baseUrl,
    },
    hasPart: whitepapers.map((wp) => ({
      '@type': 'Report',
      name: wp.title,
      description: wp.description,
      url: `${pageUrl}#${wp.slug}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function WhitepapersPage() {
  return (
    <>
      <WhitepapersJsonLd />
      <PageHero
        h1="以數據洞察，驅動前瞻決策"
        h2="免費下載 PersonaCast 獨家白皮書與研究報告。從底層技術解析到高階戰略框架，為您的公關防禦與輿情預判策略建立無懈可擊的理論基礎。"
      />

      <ContentSection>
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-white mb-4">技術與戰略的深度解盲</h3>
          <p className="text-slate-400 text-lg leading-relaxed">
            我們的研究團隊將數百場實戰推演經驗，淬鍊為系統化的方法論框架。<br className="hidden md:block" />
            無論您是技術推動者還是戰略決策者，都能在此找到關鍵的轉型解答。
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12">
          {whitepapers.map((wp, i) => (
            <ScrollReveal key={wp.title} delay={i * 0.1}>
              <article
                id={wp.slug}
                className={`group relative rounded-2xl overflow-hidden bg-slate-900/40 backdrop-blur-md border border-slate-800 transition-all duration-500 hover:border-slate-700 hover:bg-slate-900/60`}
              >
                <div className={`absolute top-0 right-0 w-full h-full bg-gradient-to-bl ${wp.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />
                
                <div className="relative flex flex-col lg:flex-row z-10 p-8 md:p-12 gap-10">
                  <div className="lg:w-1/3 flex-shrink-0 flex items-center justify-center">
                    <div className={`relative w-48 h-64 md:w-56 md:h-72 rounded-xl bg-slate-950 border ${wp.borderColor} shadow-2xl flex flex-col transform transition-transform duration-500 group-hover:-translate-y-2 group-hover:scale-105 group-hover:rotate-1`}>
                      <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-white/10 to-white/5 border-r border-white/10 rounded-l-xl z-20" />
                      
                      <div className="flex-1 p-6 flex flex-col justify-between relative z-10">
                        <div>
                          <p className={`text-[10px] font-bold tracking-widest uppercase mb-4 ${wp.iconColor}`}>
                            PersonaCast Research
                          </p>
                          <BookOpen className={`w-8 h-8 mb-4 opacity-80 ${wp.iconColor}`} />
                          <p className="text-white text-lg font-bold leading-snug" aria-hidden="true">
                            {wp.title}
                          </p>
                        </div>
                        
                        <div className="mt-auto">
                          <div className={`h-1 w-12 rounded-full mb-2 bg-current ${wp.iconColor} opacity-50`} />
                          <div className={`h-1 w-8 rounded-full bg-current ${wp.iconColor} opacity-30`} />
                        </div>
                      </div>
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-white/5 rounded-xl pointer-events-none" />
                    </div>
                  </div>

                  <div className="lg:w-2/3 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wider ${wp.buttonColor} border-none`}>
                        {wp.badge}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                      {wp.title}
                    </h3>
                    
                    <p className="text-slate-400 text-base md:text-lg leading-relaxed mb-8 max-w-2xl">
                      {wp.description}
                    </p>

                    <div className="mb-8 p-5 rounded-xl bg-slate-950/50 border border-slate-800/50">
                      <h5 className="text-sm font-semibold text-slate-300 mb-4 tracking-wide uppercase">本報告涵蓋核心重點：</h5>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {wp.takeaways.map((takeaway, idx) => (
                          <li key={idx} className="flex items-start gap-2.5">
                            <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${wp.iconColor}`} />
                            <span className="text-sm text-slate-400 leading-snug">{takeaway}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 mt-auto">
                      <a
                        href={`/resources/whitepapers/${wp.slug}`}
                        className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition-all duration-300 border ${wp.buttonColor}`}
                      >
                        <Download className="w-4 h-4" />
                        立即下載白皮書
                      </a>
                      <a
                        href={`/resources/whitepapers/${wp.slug}#outline`}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-slate-400 hover:text-white transition-colors"
                      >
                        預覽目錄大綱 <ChevronRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </ContentSection>

      <BottomCTA
        h2="想要更深入的一對一解說？"
        ctaPrimary={{ label: '預約專家諮詢 →', href: '/contact' }}
      />
    </>
  );
}
