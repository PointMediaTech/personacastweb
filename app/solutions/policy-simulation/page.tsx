import type { Metadata } from 'next';
import { PageHero } from '@/app/components/shared/PageHero';
import { ContentSection } from '@/app/components/shared/ContentSection';
import { StepFlow } from '@/app/components/shared/StepFlow';
import { BottomCTA } from '@/app/components/shared/BottomCTA';

export const metadata: Metadata = {
  title: '政策輿論模擬 — 預測政策發布後的社會反應 | PersonaCast',
  description:
    'PersonaCast 政策輿論模擬方案讓政府機關與智庫在政策發布前，預測不同社經群體的輿論反應，識別潛在反對聲浪與支持基礎。',
};

const steps = [
  {
    number: '1',
    title: '輸入政策草案',
    description:
      '定義政策內容、影響範圍與目標群體。不需要最終版本——草案階段就是最好的模擬時機。',
  },
  {
    number: '2',
    title: '建構社會圖譜',
    description:
      'AI 自動生成涵蓋勞工、企業主、學生、退休族群、自由業者、公務員等多元人格群體。每個群體都有自己的關切、偏見和資訊管道。',
  },
  {
    number: '3',
    title: '啟動推演',
    description:
      '觀察各群體對政策的即時反應。跨群體的意見如何傳播？反對聲浪會在哪裡聚合？支持者會不會因為某個措辭而轉向？',
  },
  {
    number: '4',
    title: '策略調整',
    description:
      '根據推演結果調整政策措辭、配套措施或溝通策略。也許只需要改一個段落的表述，就能將反對率從 40% 降到 15%。',
  },
] as const;

const applicableScenarios = [
  '稅制改革預評估',
  '社會福利政策民意測試',
  '環保法規影響預判',
  '教育政策社會反應模擬',
  '公共衛生政策推演',
  '都市規劃公聽會前置模擬',
] as const;

export default function PolicySimulationPage() {
  return (
    <main>
      <PageHero
        layout="center"
        h1="政策上路前，先聽聽「虛擬社會」怎麼說。"
        h2="好政策不該死在溝通失誤上。PersonaCast 為政策制定者提供前所未有的預見能力——在政策發布前，預演不同社經群體的真實反應與輿論走向。"
        ctaPrimary={{ label: '了解政策模擬方案 →', href: '/contact' }}
      />

      {/* Section 2 — Step Flow (Horizontal) */}
      <ContentSection>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-10 text-center">
          四步流程
        </h2>
        <StepFlow steps={steps} layout="horizontal" />
      </ContentSection>

      {/* Section 3 — Applicable Scenarios */}
      <ContentSection>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-10 text-center">
          適用場景
        </h2>
        <div className="flex flex-wrap justify-center gap-3">
          {applicableScenarios.map((scenario) => (
            <span
              key={scenario}
              className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-medium text-white"
              style={{
                backgroundColor: 'rgba(118,158,219,0.1)',
                border: '1px solid rgba(118,158,219,0.2)',
              }}
            >
              {scenario}
            </span>
          ))}
        </div>
      </ContentSection>

      {/* Section 4 — Bottom CTA */}
      <BottomCTA
        h2="好的政策，值得更好的溝通。"
        ctaPrimary={{ label: '預約政策模擬演示 →', href: '/contact' }}
      />
    </main>
  );
}
