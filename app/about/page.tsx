import type { Metadata } from 'next';
import { Eye, UsersRound, BarChart3, Activity, ShieldCheck, Zap } from 'lucide-react';
import { PageHero } from '@/app/components/shared/PageHero';
import { FeatureCard } from '@/app/components/shared/FeatureCard';
import { ContentSection } from '@/app/components/shared/ContentSection';
import { BottomCTA } from '@/app/components/shared/BottomCTA';
import { ScrollReveal } from '@/app/components/shared/ScrollReveal';

export const metadata: Metadata = {
  title: '關於 PersonaCast — AI 輿情預測與戰略決策的先驅',
  description:
    'PersonaCast 結合頂尖 AI 技術與公關傳播學，為企業打造專屬的虛擬輿論風洞。我們不僅預測未來，更協助您改寫未來。',
  alternates: {
    canonical: '/about',
  },
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

const coreValues = [
  {
    title: '預見 > 回應',
    description: '告別「出事了再說」的被動公關。我們的預測模型能讓您在風暴成形前，就已部署好防線。',
    icon: <Eye size={22} />,
    accentColor: '#769EDB',
  },
  {
    title: '多元 > 單一',
    description: '真實的網路聲量從不只有單一面向。我們模擬數百種數位人格，還原最真實的輿論生態系。',
    icon: <UsersRound size={22} />,
    accentColor: '#A3B8A0',
  },
  {
    title: '數據 > 直覺',
    description: '公關決策不該依賴主觀直覺。我們提供具象化、可量化的推演結果，讓每一份預算都有跡可循。',
    icon: <BarChart3 size={22} />,
    accentColor: '#C4A882',
  },
] as const;

const impacts = [
  {
    icon: <Activity />,
    title: '即時演算',
    value: '24/7',
    description: '無間斷監控與平行推演'
  },
  {
    icon: <UsersRound />,
    title: '智能體模擬',
    value: '500+',
    description: '獨立行為參數的數位人格'
  },
  {
    icon: <ShieldCheck />,
    title: '決策覆蓋率',
    value: '360°',
    description: '零死角的公關防禦網'
  },
  {
    icon: <Zap />,
    title: '反應時間',
    value: 'T-0',
    description: '風暴來襲前的超前部署'
  }
];

const teamMembers = [
  { role: '創辦人 & CEO', label: '戰略願景與企業方向', initials: 'CEO', bg: 'rgba(118,158,219,0.1)', border: 'rgba(118,158,219,0.3)', color: '#769EDB' },
  { role: '技術長 CTO', label: 'AI 模型架構與演算法', initials: 'CTO', bg: 'rgba(163,184,160,0.1)', border: 'rgba(163,184,160,0.3)', color: '#A3B8A0' },
  { role: '首席科學家', label: '資料科學與大模型研究', initials: 'CSO', bg: 'rgba(196,168,130,0.1)', border: 'rgba(196,168,130,0.3)', color: '#C4A882' },
  { role: '產品總監', label: '用戶體驗與解決方案設計', initials: 'CPO', bg: 'rgba(219,158,118,0.1)', border: 'rgba(219,158,118,0.3)', color: '#DB9E76' },
] as const;

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
      <PageHero
        h1="讓輿論不再是賭博，而是可預測的科學。"
        h2="PersonaCast 結合頂尖 AI 技術與公關傳播學，為企業打造專屬的虛擬輿論風洞。我們不僅預測未來，更協助您改寫未來。"
      />

      {/* Mission & Vision */}
      <ContentSection>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal>
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                從被動應對<br /> <span className="text-[#769EDB]">到主動掌握全局</span>
              </h2>
              <p className="text-[#94A3B8] text-lg leading-relaxed">
                PersonaCast 的起源來自一個簡單的信念：在這個變幻莫測的數位時代，傳統公關的「事後補救」已經不足以保護企業的品牌價值。
              </p>
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-sm relative overflow-hidden group hover:border-white/20 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-[#769EDB]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <p className="text-white relative z-10 font-medium">
                  「如果航空業可以用風洞模擬氣流，軍事可以用兵推演算戰局，那麼輿論場——同樣複雜的場域——也應有自己的科學模擬系統。」
                </p>
              </div>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <div className="space-y-6 text-[#94A3B8] text-base leading-relaxed">
              <p>
                我們的創始團隊匯聚了 AI 大模型開發、資料科學、公關危機處理與社會傳理學的頂尖人才。我們打破了學科之間的藩籬，將最前沿的技術引入傳統的公關戰場。
              </p>
              <p>
                透過 PersonaCast，我們創造了一個具備數百個獨立人格特徵的 AI 智能體虛擬城鎮。這些智能體擁有各自的價值觀、偏好與反應機制，能在虛擬環境中真實互動，為您提前演練每一次聲明發布、每一個行銷活動可能引發的漣漪效應。
              </p>
              <div className="pt-4 flex items-center gap-4">
                <div className="h-[1px] flex-1 bg-gradient-to-r from-[#769EDB]/50 to-transparent" />
                <span className="text-[#769EDB] text-sm tracking-wider font-semibold">這不是預言，這是科學。</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </ContentSection>

      {/* Trust & Impact Section */}
      <ContentSection>
        <ScrollReveal>
          <div className="text-center mb-16">
             <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
               重新定義決策的維度
             </h2>
             <p className="text-[#94A3B8] max-w-2xl mx-auto">
               我們將龐大的數據流轉化為具體的戰略資產，讓您在面對危機時擁有絕對的信心。
             </p>
          </div>
        </ScrollReveal>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {impacts.map((impact, i) => (
             <ScrollReveal key={impact.title} delay={i * 0.1}>
               <div className="p-6 rounded-2xl bg-[#0F172A] border border-white/5 hover:border-white/10 transition-all flex flex-col items-center text-center group relative overflow-hidden h-full">
                 <div className="absolute -inset-2 bg-gradient-to-t from-[rgba(118,158,219,0.05)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                 <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-[#769EDB] mb-4 group-hover:scale-110 transition-transform">
                   {impact.icon}
                 </div>
                 <h3 className="text-3xl font-bold text-white mb-2">{impact.value}</h3>
                 <p className="text-sm font-semibold text-[#E2E8F0] mb-1">{impact.title}</p>
                 <p className="text-xs text-[#64748B]">{impact.description}</p>
               </div>
             </ScrollReveal>
          ))}
        </div>
      </ContentSection>

      {/* Core Values */}
      <ContentSection>
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              核心驅動力
            </h2>
            <p className="text-[#94A3B8] max-w-2xl mx-auto">
              打造無懈可擊的公關防線，需要的不僅是工具，更是思維的升級。
            </p>
          </div>
        </ScrollReveal>
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {coreValues.map((value, i) => (
            <FeatureCard
              key={value.title}
              title={value.title}
              description={value.description}
              icon={value.icon}
              accentColor={value.accentColor}
              delay={i * 0.1}
            />
          ))}
        </div>
      </ContentSection>

      {/* Team Teaser */}
      <ContentSection>
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              引領變革的跨界專家
            </h2>
            <p className="text-[#94A3B8] max-w-2xl mx-auto">
              最棘手的挑戰，需要跨領域的思維來突破。
            </p>
          </div>
        </ScrollReveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, i) => (
            <ScrollReveal key={member.role} delay={i * 0.1}>
               <div className="p-8 pb-10 rounded-2xl bg-[#0F172A] border flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg h-full"
                 style={{ borderColor: member.border }}
               >
                 <div
                   className="w-20 h-20 rounded-full flex items-center justify-center text-xl font-bold mb-6 shadow-inner"
                   style={{
                     backgroundColor: member.bg,
                     color: member.color,
                     border: `1px solid ${member.border}`
                   }}
                 >
                   {member.initials}
                 </div>
                 <h3 className="text-lg font-bold text-white mb-2">{member.role}</h3>
                 <span className="text-sm text-[#94A3B8]">{member.label}</span>
               </div>
            </ScrollReveal>
          ))}
        </div>
      </ContentSection>

      <BottomCTA
        h2="準備好掌控您的輿論主場了嗎？"
        ctaPrimary={{ label: '預約專屬演示 →', href: '/contact' }}
        ctaSecondary={{ label: '探索應用場景 →', href: '/solutions/brand-reputation' }}
      />
    </>
  );
}
