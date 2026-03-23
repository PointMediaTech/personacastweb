import type { Metadata } from 'next';
import { TrendingUp, Clock, ShieldCheck, BarChart3 } from 'lucide-react';
import { PageHero } from '@/app/components/shared/PageHero';
import { ContentSection } from '@/app/components/shared/ContentSection';
import { BottomCTA } from '@/app/components/shared/BottomCTA';
import { ScrollReveal } from '@/app/components/shared/ScrollReveal';

export const metadata: Metadata = {
  title: '客戶成功案例 — 看看誰在用 PersonaCast 贏得輿論戰',
  description:
    '了解企業、政府與組織如何使用 PersonaCast AI 輿情推演平台預判危機、管理品牌聲譽、優化政治溝通策略。閱讀真實案例。',
};

const caseStudies = [
  {
    industry: '科技業',
    challenge: '新產品發布前需預判潛在的輿論風險與消費者反應',
    metrics: [
      { icon: <Clock size={16} />, label: '提前 72 小時預警' },
      { icon: <TrendingUp size={16} />, label: '負面輿情降低 45%' },
    ],
    description:
      '某國際科技企業在旗艦產品發布前，利用 PersonaCast 模擬多種輿論情境，提前辨識高風險議題並準備應對策略，成功將負面聲量控制在可管理範圍內。',
  },
  {
    industry: '金融業',
    challenge: '政策變動下的品牌聲譽保護與利害關係人溝通',
    metrics: [
      { icon: <ShieldCheck size={16} />, label: '回應時間縮短 60%' },
      { icon: <BarChart3 size={16} />, label: '媒體正面報導增加 30%' },
    ],
    description:
      '一家大型金融機構在監管政策變動期間，透過 PersonaCast 推演不同溝通策略的效果，選擇最佳方案主動發聲，成功維護品牌信任度。',
  },
  {
    industry: '醫療產業',
    challenge: '新藥上市前的社會輿論風險評估',
    metrics: [
      { icon: <Clock size={16} />, label: '預警窗口延長至 5 天' },
      { icon: <TrendingUp size={16} />, label: '危機事件歸零' },
    ],
    description:
      '某生技公司在新藥審批期間，利用 PersonaCast 模擬患者團體、醫療專業人士與媒體的多方反應，提前佈局溝通策略，順利通過輿論考驗。',
  },
  {
    industry: '公部門',
    challenge: '重大政策推動前的民意反應預測',
    metrics: [
      { icon: <BarChart3 size={16} />, label: '民意支持度提升 25%' },
      { icon: <ShieldCheck size={16} />, label: '抗議事件減少 40%' },
    ],
    description:
      '某政府機關在推動爭議性政策前，使用 PersonaCast 推演不同族群的反應路徑，找出最具共識的溝通角度，大幅降低政策推行的社會阻力。',
  },
] as const;

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero
        h1="他們已經在輿論戰中搶得先機。"
        h2="看看各產業領袖如何使用 PersonaCast，從「被動應對」轉型為「主動預判」。"
      />

      {/* Case Study Grid */}
      <ContentSection>
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {caseStudies.map((study, i) => (
            <ScrollReveal key={study.industry} delay={i * 0.1}>
              <div
                className="rounded-xl overflow-hidden h-full"
                style={{
                  backgroundColor: 'rgba(17,24,39,0.65)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: '1px solid rgba(118,158,219,0.08)',
                }}
              >
                <div className="p-6 lg:p-8">
                  {/* Industry Tag */}
                  <span
                    className="inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full mb-4"
                    style={{
                      backgroundColor: 'rgba(118,158,219,0.15)',
                      color: '#769EDB',
                    }}
                  >
                    {study.industry}
                  </span>

                  {/* Anonymized Logo Placeholder */}
                  <div
                    className="w-10 h-10 rounded-lg mb-4 flex items-center justify-center text-xs font-bold"
                    style={{
                      backgroundColor: 'rgba(118,158,219,0.08)',
                      color: '#94A3B8',
                      border: '1px solid rgba(118,158,219,0.1)',
                    }}
                  >
                    匿名
                  </div>

                  <h3 className="text-lg font-bold text-white mb-3">
                    {study.challenge}
                  </h3>
                  <p className="text-[#94A3B8] text-sm leading-relaxed mb-5">
                    {study.description}
                  </p>

                  {/* Metrics */}
                  <div className="flex flex-wrap gap-3 mb-5">
                    {study.metrics.map((metric) => (
                      <div
                        key={metric.label}
                        className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full"
                        style={{
                          backgroundColor: 'rgba(118,158,219,0.08)',
                          color: '#769EDB',
                        }}
                      >
                        {metric.icon}
                        {metric.label}
                      </div>
                    ))}
                  </div>

                  <span className="text-sm font-semibold text-[#94A3B8]/50 cursor-not-allowed">
                    閱讀完整案例 (即將推出)
                  </span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </ContentSection>

      <BottomCTA
        h2="準備好寫下您自己的成功案例了嗎？"
        ctaPrimary={{ label: '預約演示 →', href: '/contact' }}
      />
    </>
  );
}
