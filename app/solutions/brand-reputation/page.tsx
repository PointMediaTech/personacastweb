import type { Metadata } from 'next';
import { PageHero } from '@/app/components/shared/PageHero';
import { ContentSection } from '@/app/components/shared/ContentSection';
import { FeatureCard } from '@/app/components/shared/FeatureCard';
import { BottomCTA } from '@/app/components/shared/BottomCTA';

export const metadata: Metadata = {
  title: '品牌聲譽管理 — AI 量化品牌輿論韌性 | PersonaCast',
  description:
    '使用 PersonaCast 定期模擬品牌面臨各類風險事件時的輿論反應，建立聲譽韌性基線，在品牌危機發生前就建立完善的防護網。',
};

const capabilities = [
  {
    title: '韌性基線建立',
    description:
      '在風平浪靜的時候，才是壓力測試的最佳時機。模擬各類風險事件——產品召回、員工爭議、環保指控、數據外洩、高管醜聞——建立你的品牌韌性基線分數。知道自己的「承受上限」在哪裡，才不會被意外擊潰。',
  },
  {
    title: '弱點識別',
    description:
      '也許你的品牌在年輕族群中比你想像的更脆弱。也許某個特定議題是你完全沒防備的盲區。PersonaCast 的推演會揭示這些——在對手發現之前，在媒體發現之前。',
  },
  {
    title: '預警機制',
    description:
      '當外部環境的變化可能觸發你的品牌風險——新的監管法規、競品醜聞的連帶效應、社會議題的升溫——PersonaCast 自動發出預警，並提供模擬建議。不是等警報響才行動，而是在風向改變時就先移動。',
  },
] as const;

const roiStats = [
  {
    number: '5-20%',
    label: '品牌危機的平均成本',
    description: '一次未預判的品牌危機，可能在 48 小時內抹去你花了十年建立的品牌價值。',
    suffix: '市值蒸發',
  },
  {
    number: '<1%',
    label: 'PersonaCast 的投入',
    description: '預防的成本，永遠低於治療。一年的訂閱費，可能還不到一次危機公關顧問的單次報價。',
    suffix: '危機成本佔比',
  },
  {
    number: '72',
    label: '平均預警提前量',
    description: '足以改變整場戰局的時間窗口。72 小時足夠你準備聲明、對齊內部、通知利害關係人、甚至搶先定義議題的敘事框架。',
    suffix: '小時',
  },
] as const;

export default function BrandReputationPage() {
  return (
    <main>
      <PageHero
        layout="split"
        h1="你的品牌，經得起幾級輿論地震？"
        h2="品牌聲譽不是出事才要管的東西。PersonaCast 讓你定期對品牌進行輿論壓力測試——量化你的聲譽韌性，在裂縫出現之前就知道它在哪裡。"
        ctaPrimary={{ label: '預約品牌韌性評估 →', href: '/contact' }}
      />

      {/* Section 2 — Three Capabilities */}
      <ContentSection>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-10 text-center">
          三大能力
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {capabilities.map((c, i) => (
            <FeatureCard
              key={c.title}
              title={c.title}
              description={c.description}
              delay={i * 0.1}
            />
          ))}
        </div>
      </ContentSection>

      {/* Section 3 — ROI Stats */}
      <ContentSection>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {roiStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl p-8 text-center"
              style={{
                backgroundColor: 'rgba(17,24,39,0.65)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(118,158,219,0.08)',
              }}
            >
              <p className="text-4xl md:text-5xl font-extrabold text-[#769EDB] mb-1">
                {stat.number}
              </p>
              <p className="text-xs text-[#94A3B8] uppercase tracking-widest mb-3">
                {stat.suffix}
              </p>
              <h3 className="text-base font-bold text-white mb-3">{stat.label}</h3>
              <p className="text-sm text-[#94A3B8] leading-relaxed">{stat.description}</p>
            </div>
          ))}
        </div>
      </ContentSection>

      {/* Section 4 — Bottom CTA */}
      <BottomCTA
        h2="品牌聲譽不是等出事再修補的。"
        ctaPrimary={{ label: '預約品牌韌性評估 →', href: '/contact' }}
      />
    </main>
  );
}
