import type { Metadata } from 'next';
import { PageHero } from '@/app/components/shared/PageHero';
import { ContentSection } from '@/app/components/shared/ContentSection';
import { PainPointCard } from '@/app/components/shared/PainPointCard';
import { StepFlow } from '@/app/components/shared/StepFlow';
import { TestimonialCard } from '@/app/components/shared/TestimonialCard';
import { BottomCTA } from '@/app/components/shared/BottomCTA';

export const metadata: Metadata = {
  title: '公關危機預判 — 在輿論風暴前建立防火牆 | PersonaCast',
  description:
    '使用 PersonaCast AI 推演，在公關危機爆發前預判輿論走向、識別風險群體、測試回應策略。讓您的公關團隊從被動救火轉為主動預判。',
};

const painPoints = [
  {
    title: '「又上熱搜了。」',
    description:
      '當品牌登上熱搜榜，一切為時已晚。傳統輿情監控只能告訴你火已經燒起來，但它不會告訴你火會燒到哪裡、燒多久、誰會被波及。等你看到警報的那一刻，輿論已經自己選好了劇本。',
  },
  {
    title: '「聲明發晚了。」',
    description:
      '黃金回應時間越來越短——從 24 小時壓縮到 4 小時，現在甚至是 90 分鐘。等到法務審核完新聞稿，等到老闆簽字，輿論風向早已不可逆轉。你發出的聲明，只是在對著已經離去的觀眾說話。',
  },
  {
    title: '「誤判了民意。」',
    description:
      '「這個應該沒人在意吧？」每一次品牌災難的開頭，都有人說了這句話。你忽略的不是新聞本身——你忽略的是沉默多數的臨界點。那條看不見的線，一旦被跨過，就再也回不來。',
  },
] as const;

const steps = [
  {
    number: '1',
    title: '注入危機情境',
    description:
      '輸入潛在的負面事件：產品缺陷、高管醜聞、環保爭議、供應鏈問題、員工爆料......任何讓你夜裡睡不好的事。PersonaCast 自動建構完整的相關輿論場——包括會被牽連的利害關係人、可能的擴散管道、以及最脆弱的受眾群體。',
  },
  {
    number: '2',
    title: '觀看推演劇場',
    description:
      '消費者在論壇上說什麼？記者會追問哪個角度？KOL 會站你這邊還是帶風向？競爭對手會不會趁機補刀？你不用猜。坐下來，看 AI 幫你演一遍。每一個角色都有自己的動機，每一種反應都有邏輯依據。',
  },
  {
    number: '3',
    title: '提取策略建議',
    description:
      '推演結束，你得到的不是一份「情緒分析報告」。你得到的是：什麼時候發聲明最有效（精確到小時）、誰來發、怎麼說、哪些論點必須避免。每一條建議都附帶信心指數。不是直覺，是計算。',
  },
] as const;

export default function CrisisPRPage() {
  return (
    <main>
      <PageHero
        layout="split"
        h1="別等火燒起來才找滅火器。"
        h2="你的品牌離一場輿論災難有多近？也許只差一則推文。PersonaCast 讓你的公關團隊在危機事件曝光前，就已經預演過所有可能的輿論劇本——並準備好最佳應對方案。"
        accentColor="rgba(181,125,125,0.12)"
        ctaPrimary={{ label: '預約危機預判演示 →', href: '/contact' }}
      />

      {/* Section 2 — Pain Points */}
      <ContentSection>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {painPoints.map((point, i) => (
            <PainPointCard
              key={point.title}
              title={point.title}
              description={point.description}
              delay={i * 0.1}
            />
          ))}
        </div>
      </ContentSection>

      {/* Section 3 — Step Flow */}
      <ContentSection>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-10">
          PersonaCast 的解法
        </h2>
        <div className="max-w-2xl">
          <StepFlow steps={steps} layout="vertical" accentColor="#B57D7D" />
        </div>
      </ContentSection>

      {/* Section 4 — Testimonial */}
      <ContentSection>
        <div className="max-w-3xl mx-auto">
          <TestimonialCard
            quote="PersonaCast 讓我們在一場本可能毀滅品牌的危機中，提前 72 小時準備好了完美的回應策略。當新聞真的爆出來的那天，我們的聲明在 47 分鐘內上線——比所有競爭對手預期的都快。輿論從來沒有失控過。"
            author="匿名受訪者"
            title="某上市科技公司公關副總裁"
          />
        </div>
      </ContentSection>

      {/* Section 5 — Bottom CTA */}
      <BottomCTA
        h2="下一場危機不知何時到來。但你可以先準備好劇本。"
        ctaPrimary={{ label: '立即預約演示 →', href: '/contact' }}
        ctaSecondary={{ label: '下載公關危機白皮書', href: '/resources/whitepapers' }}
      />
    </main>
  );
}
