import type { Metadata } from 'next';
import { PageHero } from '@/app/components/shared/PageHero';
import { FeatureCard } from '@/app/components/shared/FeatureCard';
import { ContentSection } from '@/app/components/shared/ContentSection';
import { BottomCTA } from '@/app/components/shared/BottomCTA';
import { StepNavigation } from '@/app/components/shared/StepNavigation';
import { ScrollReveal } from '@/app/components/shared/ScrollReveal';

// New Interactive Components
import { SeedSimulationGraphic } from './components/SeedSimulationGraphic';
import { UseCaseChatBubbles } from './components/UseCaseChatBubbles';

export const metadata: Metadata = {
  title: '種子注入引擎 — 定義議題與情境變數',
  description:
    '透過 PersonaCast 種子注入引擎，將議題、背景資訊與角色設定轉化為 AI 推演的起點。精準定義模擬條件，獲得高保真輿論預測。',
  alternates: {
    canonical: '/product/seed-injection',
  },
  keywords: [
    '種子注入引擎', 'AI輿情模擬', '情境變數設定', '議題定義',
    'AI危機預演', '輿論預測', '角色建模', '公關危機模擬',
    'seed injection', 'AI scenario simulation', 'opinion forecasting',
  ],
  openGraph: {
    title: '種子注入引擎 — 定義議題與情境變數 | PersonaCast',
    description:
      '90 秒注入議題種子，PersonaCast AI 立即預演 500 位人格的輿論走向。掌握危機，領先 72 小時。',
    type: 'website',
    locale: 'zh_TW',
    url: '/product/seed-injection',
  },
  twitter: {
    card: 'summary_large_image',
    title: '種子注入引擎 — 定義議題與情境變數 | PersonaCast',
    description:
      '90 秒注入議題種子，PersonaCast AI 立即預演 500 位人格的輿論走向。掌握危機，領先 72 小時。',
  },
};

const features = [
  {
    title: '多維議題定義',
    description:
      '用你習慣的方式描述議題——自然語言就好。系統自動解析核心爭議點、利害關係人與潛在輿論斷裂線。不需要結構化表單，不需要技術知識。說人話，AI 聽得懂。',
  },
  {
    title: '情境變數控制',
    description:
      '輿論不是在真空中傳播的。你可以調整模擬環境的「溫度」：媒體關注度高還是低？時間壓力是 24 小時還是一週？既有民意偏正還是偏負？每個旋鈕都影響推演的走向——而你掌握所有旋鈕。',
  },
  {
    title: '角色種子庫',
    description:
      '從預建的社會人格模板庫中選取：記者、KOL、沉默的中產消費者、激進的社運人士⋯⋯或者自訂特定角色的背景、價值觀與發聲風格。你定義誰在這場輿論戰中登場。',
  },
] as const;

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: '首頁', item: 'https://personacast.io' },
    { '@type': 'ListItem', position: 2, name: '產品', item: 'https://personacast.io/product' },
    { '@type': 'ListItem', position: 3, name: '種子注入引擎', item: 'https://personacast.io/product/seed-injection' },
  ],
};

export default function SeedInjectionPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHero
        h1="一切推演，始於一顆精準的種子。"
        h2="你的競爭對手還在等輿論爆發才開會。你只需要 90 秒，就能把一個議題、新聞、傳言——注入 PersonaCast，讓數百位 AI 為你預演接下來的民意走向。"
        layout="split"
        rightContent={<SeedSimulationGraphic />}
        ctaPrimary={{ label: '觀看實機展演 →', href: '/product' }}
        ctaSecondary={{ label: '了解運作原理', href: '#how-it-works' }}
      />

      {/* Section 2 — 為什麼這很重要 (痛點放大) */}
      <ContentSection id="how-it-works">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                主動推演，<br/>
                不要等到危機發生才反應。
              </h2>
              <div className="space-y-4 text-[#94A3B8] text-lg leading-relaxed">
                <p>
                  每一場輿論風暴都有起源：一篇報導、一則推文、一句失言。
                </p>
                <p>
                  問題不在於事件本身——而在於你能不能在它擴散之前，看見它會如何被解讀、被扭曲、被放大。
                </p>
                <p>
                  <strong className="text-white">種子注入引擎</strong>讓你定義「如果這件事發生了」的起點，接著讓 AI 推演所有可能的劇本，讓你永遠領先輿論一步。
                </p>
              </div>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <div className="relative p-6 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 shadow-2xl">
               <div className="absolute -inset-1 bg-gradient-to-r from-red-500/20 to-[#769EDB]/40 blur-lg opacity-50 rounded-2xl" />
               <div className="relative space-y-4 z-10">
                 <div className="flex items-center space-x-4 border-b border-slate-700 pb-4">
                   <div className="w-12 h-12 rounded-full bg-red-900/50 flex items-center justify-center text-red-400 font-bold">VS</div>
                   <div>
                     <h4 className="text-slate-300 font-semibold">沒有 PersonaCast</h4>
                     <p className="text-slate-500 text-sm">花 24 小時開會、寫聲明、觀望風向</p>
                   </div>
                 </div>
                 <div className="flex items-center space-x-4 pt-2">
                   <div className="w-12 h-12 rounded-full bg-[#769EDB]/20 flex items-center justify-center text-[#769EDB] font-bold">✨</div>
                   <div>
                     <h4 className="text-white font-semibold flex items-center">
                       使用 PersonaCast 
                       <span className="ml-2 px-2 py-0.5 rounded text-[10px] uppercase bg-[#10B981]/20 text-[#10B981] font-bold">Faster</span>
                     </h4>
                     <p className="text-slate-400 text-sm">花 90 秒注入種子，AI 預演完 72 小時走向</p>
                   </div>
                 </div>
               </div>
            </div>
          </ScrollReveal>
        </div>
      </ContentSection>

      {/* Section 3 — 功能細節 */}
      <ContentSection>
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              定義你的沙盒環境
            </h2>
            <p className="text-lg text-[#94A3B8]">
              不寫程式碼，不填複雜表單。你的任務是描述情境，AI 的任務是理解並模擬。
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((item, i) => (
            <FeatureCard
              key={item.title}
              title={item.title}
              description={item.description}
              delay={i * 0.15}
            />
          ))}
        </div>
      </ContentSection>

      {/* Section 4 — 使用情境：具象化展示 */}
      <ContentSection>
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              公關實戰：新聞上線前的 4 小時
            </h2>
            <p className="text-lg text-[#94A3B8]">
              快速注入議題，預覽不同角色群體的連鎖反應。在危機爆發前，你的策略早已準備就緒。
            </p>
          </div>
        </ScrollReveal>

        <UseCaseChatBubbles />
        
      </ContentSection>

      {/* Section 5 — 銜接 CTA */}
      <BottomCTA
        h2="種子已就位。下一步：觀測輿論圖譜。"
        ctaPrimary={{ label: '了解圖譜建構系統 →', href: '/product/graph-engine' }}
      />
      <StepNavigation currentHref="/product/seed-injection" />
    </>
  );
}
