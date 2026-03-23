import type { Metadata } from 'next';
import { FileText, Download } from 'lucide-react';
import { PageHero } from '@/app/components/shared/PageHero';
import { ContentSection } from '@/app/components/shared/ContentSection';
import { BottomCTA } from '@/app/components/shared/BottomCTA';
import { ScrollReveal } from '@/app/components/shared/ScrollReveal';

export const metadata: Metadata = {
  title: '白皮書下載 — AI 輿情預測深度研究',
  description:
    '下載 PersonaCast 的深度白皮書：AI 輿情預測方法論、公關危機預判框架、品牌韌性評估模型。為決策者提供完整的理論與實務參考。',
};

const whitepapers = [
  {
    title: '《AI 輿論推演方法論白皮書》',
    description:
      'PersonaCast 的技術架構與推演原理完整解析。從多元人格引擎的建構方法，到力導向圖譜的演算法設計，再到預測輸出的信心指數計算——為技術決策者提供完整的評估依據。',
    color: '#769EDB',
  },
  {
    title: '《公關危機預判框架》',
    description:
      '從被動到主動的轉型路徑。涵蓋危機生命週期分析、沉默螺旋辨識方法、最佳介入時機判斷模型，以及多情境平行推演的策略比較框架。適合公關與企業傳播專業人士。',
    color: '#A3B8A0',
  },
  {
    title: '《品牌韌性評估模型》',
    description:
      '如何量化品牌的輿論承受力。提出品牌韌性指數（BRI）的計算方法，包含輿論衝擊測試、恢復曲線分析與長期聲譽趨勢預測。幫助品牌管理者建立可量化的聲譽防護機制。',
    color: '#C4A882',
  },
] as const;

export default function WhitepapersPage() {
  return (
    <>
      <PageHero
        h1="深度研究，為你的決策背書。"
        h2="下載 PersonaCast 的專業白皮書，從方法論到實務框架，為你的輿情預判策略建立堅實的理論基礎。"
      />

      {/* Whitepaper Cards */}
      <ContentSection>
        <div className="space-y-8">
          {whitepapers.map((wp, i) => (
            <ScrollReveal key={wp.title} delay={i * 0.1}>
              <div
                className="rounded-xl overflow-hidden"
                style={{
                  backgroundColor: 'rgba(17,24,39,0.65)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: '1px solid rgba(118,158,219,0.08)',
                }}
              >
                <div className="flex flex-col md:flex-row">
                  {/* Cover Mockup */}
                  <div
                    className="md:w-64 lg:w-72 shrink-0 flex items-center justify-center p-8 md:p-10"
                    style={{
                      background: `linear-gradient(135deg, rgba(17,24,39,0.9), rgba(17,24,39,0.6))`,
                    }}
                  >
                    <div
                      className="w-36 h-48 rounded-lg flex flex-col items-center justify-center gap-3"
                      style={{
                        backgroundColor: 'rgba(10,14,26,0.8)',
                        border: `1px solid ${wp.color}30`,
                        boxShadow: `0 0 30px ${wp.color}10`,
                      }}
                    >
                      <FileText size={32} style={{ color: wp.color }} />
                      <span
                        className="text-[10px] font-bold uppercase tracking-widest"
                        style={{ color: wp.color }}
                      >
                        白皮書
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 lg:p-8 flex flex-col justify-center flex-1">
                    <h3 className="text-xl font-bold text-white mb-3">
                      {wp.title}
                    </h3>
                    <p className="text-[#94A3B8] text-sm leading-relaxed mb-6">
                      {wp.description}
                    </p>
                    <div>
                      <button
                        type="button"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 cursor-default"
                        style={{
                          border: `1px solid ${wp.color}40`,
                          color: wp.color,
                        }}
                      >
                        <Download size={16} />
                        下載白皮書 →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </ContentSection>

      <BottomCTA
        h2="想要更深入的一對一解說？"
        ctaPrimary={{ label: '預約專家諮詢 →', href: '/contact' }}
      />
    </>
  );
}
