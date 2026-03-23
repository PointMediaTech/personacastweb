import type { Metadata } from 'next';
import { PageHero } from '@/app/components/shared/PageHero';
import { FeatureCard } from '@/app/components/shared/FeatureCard';
import { ContentSection } from '@/app/components/shared/ContentSection';
import { BottomCTA } from '@/app/components/shared/BottomCTA';
import { StepNavigation } from '@/app/components/shared/StepNavigation';
import { ScrollReveal } from '@/app/components/shared/ScrollReveal';
import { generateBreadcrumbSchema } from '@/app/lib/structured-data';
import { SEO_CONFIG } from '@/app/lib/seo-config';

export const metadata: Metadata = {
  title: '推演劇場 — 觀看 AI 人格的輿論辯論與擴散',
  description:
    'PersonaCast 推演劇場讓您在公關危機引爆前，先看見每一種結局。輸入聲明稿，讓數百位具備真實價值觀的 AI 人格即時交鋒。',
  keywords: [
    '推演劇場', '公關危機模擬', '輿論沙盤', '沉默螺旋', '輿情推演',
    'AI 公關危機', 'AI 輿論模擬', '聲明稿測試', '危機決策模擬',
  ],
  alternates: { canonical: '/product/simulation-theater' },
  openGraph: {
    title: '推演劇場 — 在公關危機引爆前，先看見每一種結局',
    description:
      '讓數百位具備真實價值觀的 AI 人格即時交鋒，精準預判輿論走向，用數據找出完美對策。',
    url: '/product/simulation-theater',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '推演劇場 — 在公關危機引爆前，先看見每一種結局',
    description:
      '讓數百位具備真實價值觀的 AI 人格即時交鋒，精準預判輿論走向，用數據找出完美對策。',
  },
};

const capabilities = [
  {
    title: '高擬真社會縮影',
    description:
      '涵蓋從激進反對者到死忠鐵粉的極端光譜，最多支援數百個 AI 人格同時互動，絕不漏掉任何潛在的輿論引爆點。',
  },
  {
    title: '精準捕捉「沉默螺旋」斷裂點',
    description:
      '視覺化即時情緒曲線與立場轉變。當你看到某個群體的情緒指標急遽攀升，讓你知道何時該按兵不動，何時必須立刻止血。',
  },
  {
    title: '平行宇宙 A/B 測試',
    description:
      '不確定該發布強硬聲明還是溫和道歉？在關鍵分歧點建立平行宇宙，同時跑三種決策，用量化的輿論支持度來做最終選擇。',
  },
] as const;

export default function SimulationTheaterPage() {
  const mockupContent = (
    <div className="relative w-full max-w-2xl mx-auto rounded-xl border border-white/10 bg-[#0A0E1A] shadow-2xl overflow-hidden mt-8 lg:mt-0 xl:min-w-[500px]">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/5">
        <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
        <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        <span className="ml-2 text-xs text-[#94A3B8] font-mono tracking-wider">LIVE SIMULATION DASHBOARD</span>
        <div className="ml-auto w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
      </div>
      <div className="p-5 space-y-5 h-[340px] overflow-hidden relative border-t border-white/5">
        {/* Animated mock messages simulating real-time feed */}
        {/* Using standard Tailwind utility classes for animation or simple inline styling if custom isn't set up. We'll use inline delays and standard keyframes if needed, but existing tailwind or simple transition works well. */}
        <div className="flex flex-col gap-4 relative z-10">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 border border-red-500/30">
              <span className="text-red-400 text-xs font-bold">激進</span>
            </div>
            <div className="bg-[#1A2235] rounded-tl-sm rounded-br-2xl rounded-tr-2xl rounded-bl-2xl px-5 py-3 border border-red-500/10 shadow-lg">
              <p className="text-sm text-gray-200 leading-relaxed">這種聲明根本是在敷衍！完全沒有看到企業的誠意，抵制到底！</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[10px] text-red-500/80 font-mono bg-red-500/10 px-2 py-0.5 rounded-sm">情緒值: 暴怒 (+85)</span>
                <span className="text-[10px] text-gray-500">10秒前</span>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-4 opacity-90">
            <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center shrink-0 border border-green-500/30">
              <span className="text-green-400 text-xs font-bold">鐵粉</span>
            </div>
            <div className="bg-[#1A2235] rounded-tl-sm rounded-br-2xl rounded-tr-2xl rounded-bl-2xl px-5 py-3 border border-green-500/10 shadow-lg">
              <p className="text-sm text-gray-200 leading-relaxed">我覺得這次處理得很明快了，大家不要再帶風向好嗎？</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[10px] text-green-500/80 font-mono bg-green-500/10 px-2 py-0.5 rounded-sm">情緒值: 支持 (+40)</span>
                <span className="text-[10px] text-gray-500">24秒前</span>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-4 opacity-70">
            <div className="w-10 h-10 rounded-full bg-gray-500/10 flex items-center justify-center shrink-0 border border-gray-500/30">
              <span className="text-gray-400 text-xs font-bold">中間</span>
            </div>
            <div className="bg-[#1A2235] rounded-tl-sm rounded-br-2xl rounded-tr-2xl rounded-bl-2xl px-5 py-3 border border-gray-500/10 shadow-lg">
              <p className="text-sm text-gray-200 leading-relaxed">先觀望一下好了，等看後續官方會不會有實質補償...</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[10px] text-gray-400 font-mono bg-gray-500/10 px-2 py-0.5 rounded-sm">情緒值: 中立 (0)</span>
                <span className="text-[10px] text-gray-500">45秒前</span>
              </div>
            </div>
          </div>
        </div>

        {/* Gradient overlay for fade out effect at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0E1A] to-transparent pointer-events-none z-20"></div>
      </div>
    </div>
  );

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: '首頁', url: SEO_CONFIG.baseUrl },
    { name: '產品', url: `${SEO_CONFIG.baseUrl}/product` },
    { name: '推演劇場', url: `${SEO_CONFIG.baseUrl}/product/simulation-theater` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <PageHero
        h1="在公關危機引爆前，先看見每一種結局。"
        h2="告別瞎猜與直覺。讓數百位具備真實價值觀的 AI 人格在「推演劇場」中即時交鋒。在真實世界出錯前，用數據找出完美對策。"
        layout="split"
        rightContent={mockupContent}
        ctaPrimary={{ label: '預約專屬 Demo', href: '/contact?type=demo' }}
        ctaSecondary={{ label: '索取推演報告範例', href: '/product/predictive-decoder' }}
      />

      {/* Section 2 — 情境場景 (Before vs After) */}
      <ContentSection>
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16 px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">那些在真實世界不敢做的測試，<br className="hidden md:block" />在這裡都能大膽演練</h2>
            <p className="text-lg text-[#94A3B8]">不再依賴直覺或會議室裡的爭論。將你的決策放進高擬真的虛擬社會，讓數據告訴你答案。</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto px-4">
            {/* 傳統做法 */}
            <div className="bg-white/5 rounded-3xl p-8 md:p-10 border border-white/5 relative overflow-hidden group hover:border-red-500/20 transition-colors duration-500">
              <div className="absolute top-0 right-0 p-4 opacity-[0.03] font-black text-9xl text-white transform translate-x-4 -translate-y-8 select-none pointer-events-none duration-700 group-hover:text-red-500 group-hover:opacity-10 scale-150">?</div>
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <span className="w-2 h-8 bg-red-500 rounded-full block"></span>
                憑直覺盲測
              </h3>
              <ul className="space-y-6 text-[#94A3B8] text-lg">
                <li className="flex gap-4 items-start"><span className="text-red-500 mt-1 shrink-0">✕</span><span className="leading-relaxed">「如果不理會，事情會自己平息嗎？」</span></li>
                <li className="flex gap-4 items-start"><span className="text-red-500 mt-1 shrink-0">✕</span><span className="leading-relaxed">「這份道歉聲明，會不會引發二次炎上？」</span></li>
                <li className="flex gap-4 items-start"><span className="text-red-500 mt-1 shrink-0">✕</span><span className="leading-relaxed">「我們新產品的定價，競爭對手會怎麼帶風向？」</span></li>
              </ul>
              <div className="mt-10 pt-6 border-t border-white/5">
                <p className="text-sm text-gray-400 font-medium">結果：決策充滿風險，永遠處於被動防守。</p>
              </div>
            </div>

            {/* 推演劇場 */}
            <div className="bg-gradient-to-br from-[#1A2235] to-[#0A0E1A] rounded-3xl p-8 md:p-10 border border-[#769EDB]/30 relative overflow-hidden ring-1 ring-[#769EDB]/20 shadow-[0_0_40px_rgba(118,158,219,0.15)] group hover:shadow-[0_0_60px_rgba(0,242,255,0.2)] transition-all duration-700">
              <div className="absolute top-0 right-0 p-4 opacity-[0.03] font-black text-9xl text-blue-400 transform translate-x-4 -translate-y-8 select-none pointer-events-none duration-700 group-hover:text-[#00F2FF] group-hover:opacity-10 scale-150">!</div>
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <span className="w-2 h-8 bg-[#00F2FF] rounded-full block shadow-[0_0_15px_rgba(0,242,255,0.6)]"></span>
                數據化決策
              </h3>
              <ul className="space-y-6 text-[#E2E8F0] text-lg">
                <li className="flex gap-4 items-start"><span className="text-[#00F2FF] mt-1 shrink-0 text-xl font-bold">✓</span><span className="leading-relaxed">發現「保持沉默」將導致負面聲量在 4 小時後激增 300%</span></li>
                <li className="flex gap-4 items-start"><span className="text-[#00F2FF] mt-1 shrink-0 text-xl font-bold">✓</span><span className="leading-relaxed">測試三個版本的聲明，精準選出「能將憤怒值降低 70%」的版本</span></li>
                <li className="flex gap-4 items-start"><span className="text-[#00F2FF] mt-1 shrink-0 text-xl font-bold">✓</span><span className="leading-relaxed">預見對手網軍的攻擊路徑，提前部署反制論述</span></li>
              </ul>
              <div className="mt-10 pt-6 border-t border-white/10">
                <p className="text-sm text-[#00F2FF] font-medium tracking-wide">結果：掌控全域，將未知危機轉化為戰略優勢。</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </ContentSection>

      {/* Section 3 — 三大核心能力 */}
      <ContentSection>
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              精準預判的核心引擎
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
          {capabilities.map((item, i) => (
            <FeatureCard
              key={item.title}
              title={item.title}
              description={item.description}
              delay={i * 0.1}
            />
          ))}
        </div>
      </ContentSection>

      {/* Interactive Micro-demo / Highlight CTA */}
      <ContentSection>
        <ScrollReveal>
          <div className="max-w-5xl mx-auto px-4 mt-8">
            <div className="bg-gradient-to-r from-[#161F33] to-[#0D1322] rounded-[2.5rem] p-8 md:p-14 border border-[#769EDB]/20 text-center relative overflow-hidden shadow-2xl group">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#00F2FF]/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#769EDB]/5 rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 relative z-10 leading-tight">
                想看看真實的公關危機，<br className="hidden md:block"/>在劇場中如何推演？
              </h2>
              <p className="text-lg text-[#94A3B8] mb-10 max-w-2xl mx-auto relative z-10 leading-relaxed">
                我們準備了 3 個實戰案例（包含知名品牌食安危機與新品炎上事件），詳細剖析 PersonaCast 如何提前 48 小時預判輿論走向。
              </p>
              <div className="relative z-10">
                <a href="/contact?type=whitepaper" className="inline-flex items-center justify-center px-10 py-5 rounded-2xl bg-white text-[#0A0E1A] font-bold tracking-wide hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] text-lg">
                  <span className="mr-2">📝</span> 下載《2026 虛擬輿論推演白皮書》
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </ContentSection>

      {/* Section 4 — 銜接 CTA */}
      <BottomCTA
        h2="準備好建立您的虛擬作戰室了嗎？"
        ctaPrimary={{ label: '預約專屬 Demo →', href: '/contact?type=demo' }}
      />
      <StepNavigation currentHref="/product/simulation-theater" />
    </>
  );
}
