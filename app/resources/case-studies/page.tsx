import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { PageHero } from '@/app/components/shared/PageHero';
import { ContentSection } from '@/app/components/shared/ContentSection';
import { BottomCTA } from '@/app/components/shared/BottomCTA';

export const metadata: Metadata = {
  title: '客戶成功案例 — AI 輿情推演實戰成果',
  description:
    '了解科技、金融、醫療與公部門如何使用 PersonaCast AI 輿情推演平台，提前 72 小時預判風險，將潛在危機轉化為品牌護城河。',
  alternates: {
    canonical: '/resources/case-studies',
  },
};

/* ── Static data ────────────────────────────────────────────────── */

const trustMetrics = [
  { label: '平均降低負面輿情', value: '45%' },
  { label: '前瞻預警時間', value: '72 小時' },
  { label: '政策推行阻力減少', value: '40%' },
  { label: '信任品牌與機構', value: '50+' },
] as const;

const caseStudies = [
  {
    id: 'tech',
    industry: '科技業',
    challenge: '新產品發布前需預判潛在的輿論風險與消費者反應，避免意外公關危機。',
    result: '提前辨識高風險議題並準備應對策略，成功將負面聲量控制在可管理範圍內。',
    metrics: [
      { label: '提前 72 小時預警' },
      { label: '負面輿情降低 45%' },
    ],
  },
  {
    id: 'finance',
    industry: '金融業',
    challenge: '監管政策變動期間，亟需保護品牌聲譽並與多方利害關係人進行有效溝通。',
    result: '推演不同溝通策略的效果，選擇最佳方案主動發聲，成功維護品牌信任度。',
    metrics: [
      { label: '回應時間縮短 60%' },
      { label: '媒體正面報導增加 30%' },
    ],
  },
  {
    id: 'healthcare',
    industry: '醫療產業',
    challenge: '新藥上市前，需進行全面的社會輿論風險評估，避免引發群眾恐慌或誤解。',
    result: '模擬患者團體、醫療專業人士與媒體的多方反應，提前佈局溝通策略，順利通過輿論考驗。',
    metrics: [
      { label: '預警窗口延長至 5 天' },
      { label: '危機事件歸零' },
    ],
  },
  {
    id: 'government',
    industry: '公部門',
    challenge: '在推動爭議性重大政策前，需要準確預測民意反應，降低社會阻力。',
    result: '推演不同族群的反應路徑，找出最具共識的溝通角度，大幅降低政策推行的社會阻力。',
    metrics: [
      { label: '民意支持度提升 25%' },
      { label: '抗議事件減少 40%' },
    ],
  },
] as const;

/* ── JSON-LD ────────────────────────────────────────────────────── */

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'PersonaCast 客戶成功案例',
  description: '各行業領袖使用 PersonaCast AI 輿情推演平台的實戰成果',
  numberOfItems: caseStudies.length,
  itemListElement: caseStudies.map((study, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'Article',
      name: `${study.industry} — AI 輿情推演成功案例`,
      description: study.challenge,
    },
  })),
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: '首頁', item: 'https://personacast.io' },
    { '@type': 'ListItem', position: 2, name: '資源中心', item: 'https://personacast.io/resources' },
    { '@type': 'ListItem', position: 3, name: '客戶成功案例', item: 'https://personacast.io/resources/case-studies' },
  ],
};

/* ── Page ────────────────────────────────────────────────────────── */

export default function CaseStudiesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <PageHero
        h1="實戰驗證：他們如何贏得輿論主導權？"
        h2="探索各行業領袖如何利用 PersonaCast 精準預判風險、引導輿論走向，將潛在危機轉化為品牌聲譽的護城河。"
      />

      {/* Trust Metrics */}
      <section className="border-b border-white/5 bg-white/[0.02]">
        <div className="max-w-[1200px] mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {trustMetrics.map((metric) => (
              <div key={metric.label} className="text-center">
                <div
                  className="text-3xl md:text-5xl font-bold mb-2"
                  style={{
                    background: 'linear-gradient(135deg, #A8C4F0, #769EDB)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {metric.value}
                </div>
                <div className="text-mist-blue-gray text-sm font-medium">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <ContentSection>
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-12">
          跨產業實戰成果
        </h2>
        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
          {caseStudies.map((study, i) => (
            <article
              key={study.id}
              className="case-study-card group relative rounded-2xl overflow-hidden h-full"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Card Content */}
              <div
                className="relative h-full p-8 lg:p-10 flex flex-col rounded-2xl transition-shadow duration-500 hover:shadow-[0_0_40px_rgba(118,158,219,0.1)]"
                style={{
                  backgroundColor: 'rgba(17,24,39,0.65)',
                  border: '1px solid rgba(118,158,219,0.1)',
                }}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <span
                    className="inline-block text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full"
                    style={{
                      backgroundColor: 'rgba(118,158,219,0.1)',
                      color: '#A8C4F0',
                      border: '1px solid rgba(118,158,219,0.2)',
                    }}
                  >
                    {study.industry}
                  </span>
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{
                      backgroundColor: 'rgba(17,24,39,0.8)',
                      color: '#94A3B8',
                      border: '1px solid rgba(118,158,219,0.2)',
                    }}
                  >
                    匿名
                  </div>
                </div>

                {/* Challenge & Result */}
                <div className="flex flex-col gap-6 mb-8 flex-grow">
                  <div>
                    <p className="flex items-center gap-2 text-[10px] font-bold text-mist-blue-gray/60 mb-3 uppercase tracking-widest border-l-2 border-mist-blue-gray/30 pl-2">
                      面臨挑戰
                    </p>
                    <h3 className="text-lg font-bold text-white leading-snug">
                      {study.challenge}
                    </h3>
                  </div>

                  <div
                    className="p-5 rounded-xl"
                    style={{
                      background: 'linear-gradient(90deg, rgba(118,158,219,0.06), transparent)',
                      border: '1px solid rgba(118,158,219,0.1)',
                    }}
                  >
                    <p className="flex items-center gap-2 text-[10px] font-bold text-strategic-blue mb-3 uppercase tracking-widest">
                      實際成效
                    </p>
                    <p className="text-[#94A3B8] text-[15px] leading-relaxed">
                      {study.result}
                    </p>
                  </div>
                </div>

                {/* Metrics */}
                <div className="flex flex-wrap gap-3 mb-8">
                  {study.metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="flex items-center gap-2 text-xs font-medium px-3.5 py-2 rounded-lg"
                      style={{
                        backgroundColor: 'rgba(118,158,219,0.08)',
                        color: '#A8C4F0',
                        border: '1px solid rgba(118,158,219,0.1)',
                      }}
                    >
                      <span style={{ color: '#769EDB' }}>✓</span>
                      {metric.label}
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="mt-auto pt-6 border-t border-white/5">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 text-sm font-medium text-mist-blue-gray hover:text-white transition-colors"
                  >
                    了解我們如何守護您的品牌
                    <ArrowRight size={16} className="text-strategic-blue" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </ContentSection>

      <BottomCTA
        h2="準備好寫下您自己的成功案例了嗎？"
        ctaPrimary={{ label: '與我們顧問聊聊 →', href: '/contact' }}
      />
    </>
  );
}
