import type { Metadata } from 'next';
import { Eye, UsersRound, BarChart3 } from 'lucide-react';
import { PageHero } from '@/app/components/shared/PageHero';
import { FeatureCard } from '@/app/components/shared/FeatureCard';
import { ContentSection } from '@/app/components/shared/ContentSection';
import { BottomCTA } from '@/app/components/shared/BottomCTA';
import { ScrollReveal } from '@/app/components/shared/ScrollReveal';

export const metadata: Metadata = {
  title: '關於 PersonaCast — AI 輿情預測的先驅者',
  description:
    'PersonaCast 結合前沿 AI 技術與深厚的公關傳播學底蘊，打造輿情預測與戰略模擬平台。了解我們的使命、團隊與願景。',
};

const coreValues = [
  {
    title: '預見 > 回應',
    description: '我們打造的工具，讓人們從被動應對者變成主動掌局者。',
    icon: <Eye size={22} />,
    accentColor: '#769EDB',
  },
  {
    title: '多元 > 單一',
    description: '真實的輿論場從不只有一種聲音。我們的 AI 也是。',
    icon: <UsersRound size={22} />,
    accentColor: '#A3B8A0',
  },
  {
    title: '數據 > 直覺',
    description: '決策不該靠感覺，該靠可量化的推演結果。',
    icon: <BarChart3 size={22} />,
    accentColor: '#C4A882',
  },
] as const;

const teamMembers = [
  { name: '創辦人 & CEO', initials: 'CEO' },
  { name: '技術長 CTO', initials: 'CTO' },
  { name: '首席科學家', initials: 'CSO' },
  { name: '產品總監', initials: 'CPO' },
] as const;

export default function AboutPage() {
  return (
    <>
      <PageHero
        h1="我們相信，輿論不該是一場賭博。"
        h2="PersonaCast 誕生於一個信念：如果我們能在風洞中模擬氣流，為什麼不能在虛擬場域中模擬民意？我們正在讓這個信念成為現實。"
      />

      {/* Company Story */}
      <ContentSection>
        <ScrollReveal>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
              我們的故事
            </h2>
            <div className="space-y-5 text-[#94A3B8] text-base leading-relaxed">
              <p>
                PersonaCast
                的起源，來自於一個令人沮喪的觀察：在這個資訊爆炸的時代，絕大多數組織面對輿論風暴的方式，依然停留在「出事了再說」。公關團隊疲於奔命地回應已經成形的輿論，決策者靠直覺判斷民意走向，顧問們拿著過時的民調數據開會。
              </p>
              <p>
                我們的創始團隊來自 AI
                研究、公關傳播與社會科學的交叉領域。我們相信，如果航空業可以用風洞模擬氣流，如果軍事可以用兵棋推演戰局，那麼輿論場——這個同樣複雜、同樣充滿變數的場域——也應該有自己的模擬系統。
              </p>
              <p>
                於是我們開始打造 PersonaCast：一個能夠生成數百個具備獨立人格的
                AI
                智能體，讓它們在虛擬輿論場中真實互動，從而讓決策者在風暴來臨之前，就已經預演過所有可能的劇本。這不是預言。這是科學。
              </p>
            </div>
          </div>
        </ScrollReveal>
      </ContentSection>

      {/* Core Values */}
      <ContentSection>
        <ScrollReveal>
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-12">
            核心價值
          </h2>
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
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-12">
            核心團隊
          </h2>
        </ScrollReveal>
        <div className="flex flex-wrap justify-center gap-10 lg:gap-16">
          {teamMembers.map((member, i) => (
            <ScrollReveal key={member.name} delay={i * 0.1}>
              <div className="flex flex-col items-center gap-3">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{
                    backgroundColor: 'rgba(118,158,219,0.1)',
                    border: '2px solid rgba(118,158,219,0.2)',
                    color: '#769EDB',
                  }}
                >
                  {member.initials}
                </div>
                <span className="text-sm text-[#94A3B8]">{member.name}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </ContentSection>

      <BottomCTA
        h2="想加入改變輿論遊戲規則的團隊？"
        ctaPrimary={{ label: '查看職缺 →', href: '/about/careers' }}
        ctaSecondary={{ label: '聯繫我們 →', href: '/contact' }}
      />
    </>
  );
}
