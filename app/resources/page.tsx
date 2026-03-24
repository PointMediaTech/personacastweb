import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, Users, FileText, Mail } from 'lucide-react';
import { PageHero } from '@/app/components/shared/PageHero';
import { ContentSection } from '@/app/components/shared/ContentSection';
import { ScrollReveal } from '@/app/components/shared/ScrollReveal';

export const metadata: Metadata = {
  title: '資源中心 — 輿情預測洞察、案例與白皮書',
  description:
    '探索 PersonaCast 的輿情預測知識庫：深度部落格文章、客戶成功案例、可下載白皮書。掌握 AI 輿情分析的最新趨勢與最佳實踐。',
  alternates: { canonical: '/resources' },
  openGraph: {
    title: '資源中心 — 輿情預測洞察、案例與白皮書',
    description:
      '探索 PersonaCast 的輿情預測知識庫：深度部落格文章、客戶成功案例、可下載白皮書。',
    url: '/resources',
  },
};

const resourceTypes = [
  {
    icon: <BookOpen size={28} />,
    title: '部落格 / 洞察',
    description: '輿情分析趨勢、AI 應用深度解析、產業觀點。',
    cta: '閱讀最新文章',
    href: '/resources/blog',
    disabled: true,
  },
  {
    icon: <Users size={28} />,
    title: '客戶成功案例',
    description: '了解其他組織如何使用 PersonaCast 贏得輿論戰。',
    cta: '探索案例',
    href: '/resources/case-studies',
    disabled: false,
  },
  {
    icon: <FileText size={28} />,
    title: '白皮書下載',
    description: '深度研究報告，適合需要完整評估的決策者。',
    cta: '下載白皮書',
    href: '/resources/whitepapers',
    disabled: false,
  },
] as const;

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        h1="掌握輿論的知識武器庫。"
        h2="深度洞察、實戰案例與研究白皮書——持續武裝您的輿情預判能力。"
      />

      {/* Resource Type Nav Cards */}
      <ContentSection>
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {resourceTypes.map((item, i) => {
            const cardContent = (
              <div
                className="group relative rounded-xl overflow-hidden h-full flex flex-col"
                style={{
                  backgroundColor: 'rgba(17,24,39,0.65)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: '1px solid rgba(118,158,219,0.08)',
                }}
              >
                <div
                  className="h-[2px] w-full"
                  style={{
                    background:
                      'linear-gradient(90deg, transparent, #769EDB, transparent)',
                  }}
                />
                <div className="p-8 lg:p-10 flex flex-col flex-1">
                  <div
                    className="mb-5 w-12 h-12 flex items-center justify-center rounded-lg"
                    style={{
                      backgroundColor: 'rgba(118,158,219,0.12)',
                      color: '#769EDB',
                    }}
                  >
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-[#94A3B8] text-sm leading-relaxed mb-6 flex-1">
                    {item.description}
                  </p>
                  <span
                    className={`text-sm font-semibold ${
                      item.disabled
                        ? 'text-[#94A3B8]/50 cursor-not-allowed'
                        : 'text-[#769EDB] group-hover:underline'
                    }`}
                  >
                    {item.cta} {item.disabled ? '(即將推出)' : '→'}
                  </span>
                </div>
              </div>
            );

            return (
              <ScrollReveal key={item.title} delay={i * 0.1}>
                {item.disabled ? (
                  <div className="opacity-60 cursor-not-allowed h-full">
                    {cardContent}
                  </div>
                ) : (
                  <Link href={item.href} className="block h-full">
                    {cardContent}
                  </Link>
                )}
              </ScrollReveal>
            );
          })}
        </div>
      </ContentSection>

      {/* Newsletter Section */}
      <ContentSection>
        <ScrollReveal>
          <div className="max-w-2xl mx-auto text-center">
            <div
              className="mb-4 mx-auto w-12 h-12 flex items-center justify-center rounded-lg"
              style={{
                backgroundColor: 'rgba(118,158,219,0.12)',
                color: '#769EDB',
              }}
            >
              <Mail size={24} />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              每週一份輿情洞察，直達您的信箱。
            </h2>
            <p className="text-[#94A3B8] text-sm mb-8">
              訂閱我們的電子報，獲取最新輿情分析趨勢與產業洞察。
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="輸入您的 Email"
                className="flex-1 px-4 py-3 rounded-lg text-sm text-white placeholder-[#94A3B8]/60 outline-none"
                style={{
                  backgroundColor: 'rgba(17,24,39,0.65)',
                  border: '1px solid rgba(118,158,219,0.15)',
                }}
                readOnly
                aria-label="Email 訂閱"
              />
              <button
                type="button"
                className="px-6 py-3 rounded-lg font-semibold text-white text-sm cursor-default"
                style={{
                  backgroundColor: '#769EDB',
                  boxShadow: '0 0 20px rgba(118,158,219,0.25)',
                }}
              >
                訂閱 →
              </button>
            </div>
          </div>
        </ScrollReveal>
      </ContentSection>
    </>
  );
}
