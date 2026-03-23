import type { Metadata } from 'next';
import { PageHero } from '@/app/components/shared/PageHero';
import { ContentSection } from '@/app/components/shared/ContentSection';
import { FeatureCard } from '@/app/components/shared/FeatureCard';
import { BottomCTA } from '@/app/components/shared/BottomCTA';

export const metadata: Metadata = {
  title: '政治議題推演 — 預判民意走向，規劃溝通策略 | PersonaCast',
  description:
    'PersonaCast 助力政治團隊推演政策宣示、選舉策略在多元選民群體中的反應。在民意成形前掌握局勢，優化政治溝通策略。',
};

const scenarios = [
  {
    title: '政策溝通預演',
    description:
      '在推出爭議性政策前，模擬不同年齡、職業、地域群體的接受度與反對力度。哪個群體會是盟友？哪個群體最難說服？答案不在直覺裡，在推演裡。',
  },
  {
    title: '選舉策略測試',
    description:
      '預演不同訴求策略在搖擺選民中的影響力。「經濟牌」還是「安全牌」？哪個論述最能打穿同溫層？不用花兩週做焦點團體，90 分鐘就有答案。',
  },
  {
    title: '危機議題應對',
    description:
      '當政治人物面臨醜聞或爭議，快速模擬不同回應策略的輿論效果。道歉？反擊？沉默？每一條路的結局，推演給你看。',
  },
] as const;

const comparisonRows = [
  { dimension: '速度', personacast: '小時級', traditional: '數週' },
  { dimension: '成本', personacast: '固定訂閱制', traditional: '每次數十萬' },
  { dimension: '樣本多元性', personacast: '數百種人格自動生成', traditional: '受限於招募條件' },
  { dimension: '可重複性', personacast: '無限次重複、調整變數', traditional: '一次性結果' },
  { dimension: '保密性', personacast: '完全內部運作，零洩漏風險', traditional: '參與者可能洩漏議題' },
] as const;

export default function PoliticalStrategyPage() {
  return (
    <main>
      <PageHero
        layout="center"
        h1="民意不可測？那是因為你還沒推演過。"
        h2="選前民調只能告訴你昨天的數字。PersonaCast 讓你看見明天的輿論——在政策宣示、選舉造勢或議題操作之前，預覽多元選民群體的真實反應。"
        ctaPrimary={{ label: '了解政治推演方案 →', href: '/contact' }}
      />

      {/* Section 2 — Scenario Cards */}
      <ContentSection>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-10 text-center">
          三大應用場景
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {scenarios.map((s, i) => (
            <FeatureCard
              key={s.title}
              title={s.title}
              description={s.description}
              delay={i * 0.1}
            />
          ))}
        </div>
      </ContentSection>

      {/* Section 3 — Comparison Table */}
      <ContentSection>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-10 text-center">
          PersonaCast vs. 傳統民調
        </h2>
        <div
          className="rounded-xl overflow-hidden"
          style={{
            backgroundColor: 'rgba(17,24,39,0.65)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(118,158,219,0.08)',
          }}
        >
          <table className="w-full text-left">
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(118,158,219,0.12)' }}>
                <th className="px-6 py-4 text-sm font-semibold text-[#94A3B8]">維度</th>
                <th className="px-6 py-4 text-sm font-semibold text-[#769EDB]">PersonaCast</th>
                <th className="px-6 py-4 text-sm font-semibold text-[#94A3B8]">傳統民調 / 焦點團體</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, i) => (
                <tr
                  key={row.dimension}
                  style={{
                    borderBottom:
                      i < comparisonRows.length - 1
                        ? '1px solid rgba(118,158,219,0.06)'
                        : undefined,
                  }}
                >
                  <td className="px-6 py-4 text-sm font-medium text-white">{row.dimension}</td>
                  <td className="px-6 py-4 text-sm text-[#769EDB]">{row.personacast}</td>
                  <td className="px-6 py-4 text-sm text-[#94A3B8]">{row.traditional}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ContentSection>

      {/* Section 4 — Bottom CTA */}
      <BottomCTA
        h2="讓數據說話，而不是猜測。"
        ctaPrimary={{ label: '預約政治推演演示 →', href: '/contact' }}
      />
    </main>
  );
}
