import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '@/app/components/shared/PageHero';
import { ContentSection } from '@/app/components/shared/ContentSection';
import { BottomCTA } from '@/app/components/shared/BottomCTA';

export const metadata: Metadata = {
  title: '解決方案 — 公關危機、品牌聲譽、政治推演 | PersonaCast',
  description:
    '無論您面對公關危機、品牌聲譽管理、政治議題推演或政策輿論模擬，PersonaCast 都能在輿論定型前給您掌控權。探索適合您的解決方案。',
  alternates: { canonical: '/solutions' },
  openGraph: {
    title: '解決方案 — 公關危機、品牌聲譽、政治推演 | PersonaCast',
    description:
      '無論您面對公關危機、品牌聲譽管理、政治議題推演或政策輿論模擬，PersonaCast 都能在輿論定型前給您掌控權。',
    url: '/solutions',
  },
};

const solutions = [
  {
    title: '公關危機預判',
    subtitle: '在風暴登陸前建好防線',
    description:
      '模擬負面事件在不同人群中的擴散路徑，預判最壞情境，提前準備應對劇本。當危機真正來臨——您的團隊已經排練過了。',
    href: '/solutions/crisis-pr',
    accent: '#769EDB',
  },
  {
    title: '政治議題推演',
    subtitle: '在民意成形前讀懂民心',
    description:
      '推演政策宣示、選舉策略或政治事件在多元選民群體中的反應。找出最大公約數的溝通角度，而不是撞牆才知道路錯了。',
    href: '/solutions/political-strategy',
    accent: '#B57D7D',
  },
  {
    title: '品牌聲譽管理',
    subtitle: '量化品牌在輿論場的韌性',
    description:
      '定期模擬品牌面臨各類風險事件時的輿論反應。建立聲譽韌性基線與預警機制——不是等裂縫出現才補，而是先知道哪裡最脆弱。',
    href: '/solutions/brand-reputation',
    accent: '#A3B8A0',
  },
  {
    title: '政策輿論模擬',
    subtitle: '預測政策的社會回聲',
    description:
      '在政策發布前，模擬不同社經群體的真實反應。識別潛在反對聲浪與支持基礎，讓好政策不會死在溝通失誤上。',
    href: '/solutions/policy-simulation',
    accent: '#8B9EB7',
  },
] as const;

const valueBadges = [
  { label: '「先見」而非「事後」', description: '從被動回應轉為主動預判' },
  { label: '「模擬」取代「猜測」', description: '以 AI 推演取代經驗直覺' },
  { label: '「量化」驅動「決策」', description: '從定性判斷升級為數據驅動策略' },
] as const;

export default function SolutionsPage() {
  return (
    <main>
      <PageHero
        layout="center"
        h1="每一場輿論戰，我們都已預演過。"
        h2="無論您身處哪個戰場——公關風暴、政治議題、品牌危機或政策推動——PersonaCast 讓您在第一槍響前就看清全局。不是運氣，是推演。"
        ctaPrimary={{ label: '找到您的解決方案 ↓', href: '#solutions' }}
      />

      {/* Section 2 — Solution Cards 2x2 Grid */}
      <ContentSection id="solutions">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {solutions.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group relative rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.01]"
              style={{
                backgroundColor: 'rgba(17,24,39,0.65)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(118,158,219,0.08)',
              }}
            >
              {/* Top accent glow line */}
              <div
                className="h-[2px] w-full transition-opacity duration-300 opacity-60 group-hover:opacity-100"
                style={{
                  background: `linear-gradient(90deg, transparent, ${s.accent}, transparent)`,
                }}
              />

              <div className="p-6 lg:p-8">
                <h3 className="text-xl font-bold text-white mb-1">{s.title}</h3>
                <p className="text-sm font-medium mb-4" style={{ color: s.accent }}>
                  {s.subtitle}
                </p>
                <p className="text-[#94A3B8] text-sm leading-relaxed mb-6">{s.description}</p>
                <span
                  className="inline-flex items-center text-sm font-semibold transition-colors duration-200 group-hover:text-white"
                  style={{ color: s.accent }}
                >
                  了解更多 →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </ContentSection>

      {/* Section 3 — Value Badges */}
      <ContentSection>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {valueBadges.map((badge) => (
            <div
              key={badge.label}
              className="rounded-xl p-6 text-center"
              style={{
                backgroundColor: 'rgba(17,24,39,0.5)',
                border: '1px solid rgba(118,158,219,0.06)',
              }}
            >
              <p className="text-lg font-bold text-white mb-2">{badge.label}</p>
              <p className="text-sm text-[#94A3B8]">{badge.description}</p>
            </div>
          ))}
        </div>
      </ContentSection>

      {/* Section 4 — Bottom CTA */}
      <BottomCTA
        h2="不確定哪個方案最適合您？"
        body="預約一對一諮詢，我們的團隊將根據您的具體場景，推薦最佳方案。"
        ctaPrimary={{ label: '預約免費諮詢 →', href: '/contact' }}
      />
    </main>
  );
}
