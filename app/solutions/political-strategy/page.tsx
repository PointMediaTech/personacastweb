import type { Metadata } from 'next';
import { PageHero } from '@/app/components/shared/PageHero';
import { ContentSection } from '@/app/components/shared/ContentSection';
import { Check, X, ShieldAlert, TrendingUp, Users, Target, Activity, Globe, Zap } from 'lucide-react';

export const metadata: Metadata = {
  title: '政治議題推演 — 在輿論風暴前先掌握劇本 | PersonaCast',
  description:
    'PersonaCast 助力政治團隊推演政策宣示、選舉策略與危機處理。看見明天的輿論走向，讓決策快人一步。',
};

const scenarios = [
  {
    title: '政策風向測試',
    description:
      '在記者會前，先看見明天的頭條。模擬不同年齡、職業群體對新政策的接受度與反彈力。精準鎖定盟友，預先安撫潛在反對者。',
    icon: <Globe className="w-5 h-5 text-blue-400" />,
    mockup: (
      <div className="bg-[#0f172a] rounded-xl border border-blue-900/30 p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-400" />
        <div className="flex items-center justify-between mb-6">
          <span className="text-white font-medium">政策情緒熱度預測</span>
          <span className="px-2 py-1 bg-blue-900/40 text-blue-300 text-xs rounded border border-blue-800/50">分析完成</span>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-center bg-[#1e293b]/50 p-3 rounded-lg border border-white/5">
            <div className="flex items-center gap-3"><Users className="w-4 h-4 text-cyan-400"/><span className="text-sm text-slate-300">20-29歲 中間選民</span></div>
            <span className="text-sm text-emerald-400 flex items-center gap-1"><TrendingUp className="w-3 h-3"/> +12% 支持</span>
          </div>
          <div className="flex justify-between items-center bg-[#1e293b]/50 p-3 rounded-lg border border-white/5">
            <div className="flex items-center gap-3"><Target className="w-4 h-4 text-rose-400"/><span className="text-sm text-slate-300">40-49歲 傳統票倉</span></div>
            <span className="text-sm text-rose-400 flex items-center gap-1"><TrendingUp className="w-3 h-3 transform rotate-180"/> -5% 流失警告</span>
          </div>
        </div>
      </div>
    )
  },
  {
    title: '選戰防禦與攻擊',
    description:
      '預演不同訴求在搖擺選區中的破壞力。「經濟牌」還是「安全牌」？兵棋推演對手攻擊路徑，在事發前準備好最佳反擊論述。',
    icon: <Target className="w-5 h-5 text-purple-400" />,
    mockup: (
      <div className="bg-[#0f172a] rounded-xl border border-purple-900/30 p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-400" />
        <div className="flex items-center justify-between mb-6">
          <span className="text-white font-medium">論述穿透力對比 (A/B Test)</span>
          <span className="px-2 py-1 bg-purple-900/40 text-purple-300 text-xs rounded border border-purple-800/50">實時推演</span>
        </div>
        <div className="relative h-24 mt-4">
          <div className="absolute bottom-0 left-0 w-full h-full flex items-end justify-around gap-2">
            <div className="w-1/3 bg-purple-500/20 hover:bg-purple-500/40 border-t border-purple-500/50 rounded-t-sm transition-all h-[40%] flex justify-center pb-2"><span className="text-xs text-purple-200 mt-auto">防禦論述 A</span></div>
            <div className="w-1/3 bg-pink-500/40 hover:bg-pink-500/60 border-t border-pink-400 shadow-[0_0_15px_rgba(236,72,153,0.3)] rounded-t-sm transition-all h-[85%] flex justify-center pb-2"><span className="text-xs text-pink-100 mt-auto font-bold">攻擊論述 B</span></div>
          </div>
        </div>
      </div>
    )
  },
  {
    title: '危機公關止血',
    description:
      '當面臨政治醜聞或突發爭議，快速模擬不同回應策略（道歉、切割、反擊）的輿論收尾效果。每一條路的結局，推演給你看。',
    icon: <ShieldAlert className="w-5 h-5 text-rose-400" />,
    mockup: (
      <div className="bg-[#0f172a] rounded-xl border border-rose-900/30 p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-500 to-orange-400" />
        <div className="flex items-center justify-between mb-4">
          <span className="text-white font-medium text-sm">危機擴散指數預測</span>
          <Activity className="w-4 h-4 text-rose-500 animate-pulse" />
        </div>
        <div className="space-y-3 mt-4">
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1"><span>策略 A: 立即道歉</span><span className="text-emerald-400">損害中斷</span></div>
            <div className="h-1.5 w-full bg-[#1e293b] rounded-full overflow-hidden"><div className="h-full bg-emerald-500 w-[30%]" /></div>
          </div>
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1"><span>策略 B: 保持沉默</span><span className="text-rose-400">炎上風險極高</span></div>
            <div className="h-1.5 w-full bg-[#1e293b] rounded-full overflow-hidden"><div className="h-full bg-rose-500 w-[85%]" /></div>
          </div>
        </div>
      </div>
    )
  },
] as const;

const comparisonRows = [
  { dimension: '洞察決策速度', personacast: '領先 72 小時', traditional: '落後 2 星期' },
  { dimension: '預測顆粒度', personacast: '數百種人格標籤動態生成', traditional: '粗略的 demographic 分類' },
  { dimension: '策略迭代', personacast: '無限次更改變數、即時 A/B Test', traditional: '單次拋棄式結果' },
  { dimension: '機密安全性', personacast: '完全離線演算，零洩密風險', traditional: '焦點團體可能走漏風聲' },
] as const;

// Quick Dashboard Mockup for Hero
const HeroMockup = () => (
  <div className="relative mx-auto w-full max-w-lg lg:max-w-none transform perspective-1000 rotate-y-[-5deg] rotate-x-[5deg] hover:rotate-y-[-2deg] hover:rotate-x-[2deg] transition-all duration-700">
    <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-600 opacity-20 blur-xl"></div>
    <div className="relative bg-[#0A0E1A]/80 backdrop-blur-xl border border-[#769EDB]/20 rounded-2xl shadow-2xl overflow-hidden shadow-cyan-900/20">
      {/* Top Bar map */}
      <div className="flex border-b border-white/5 px-4 py-3 items-center gap-2">
        <div className="flex gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div><div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div><div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div></div>
        <div className="bg-[#1e293b] px-3 py-1 rounded-md text-[10px] text-slate-400 mx-auto font-mono tracking-widest uppercase">PersonaCast / 戰略推演系統</div>
      </div>
      {/* Content */}
      <div className="p-6">
        <h3 className="text-white text-lg font-semibold mb-1">2026 大選：青年住宅政策推演</h3>
        <p className="text-slate-400 text-xs mb-6">狀態: 演算完成 / 預測信心水準: 94%</p>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-[#1e293b]/50 border border-white/5 rounded-lg p-4">
            <div className="text-xs text-slate-400 mb-1">預期整體支持度</div>
            <div className="text-2xl font-bold text-emerald-400">+18.5%</div>
            <div className="text-[10px] text-emerald-500/70 mt-1 flex items-center gap-1"><TrendingUp className="w-3 h-3"/> 政策B方案顯著優於A方案</div>
          </div>
          <div className="bg-[#1e293b]/50 border border-white/5 rounded-lg p-4">
            <div className="text-xs text-slate-400 mb-1">高風險反彈群體</div>
            <div className="text-lg font-bold text-rose-400">已擁房族群 (45+)</div>
            <div className="text-[10px] text-rose-500/70 mt-1 flex items-center gap-1"><ShieldAlert className="w-3 h-3"/> 建議配套補貼論述</div>
          </div>
        </div>

        <div className="h-1 w-full bg-[#1e293b] rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 w-[85%]"></div>
        </div>
      </div>
    </div>
  </div>
);

export default function PoliticalStrategyPage() {
  return (
    <main>
      <PageHero
        layout="split"
        h1="在輿論風暴來臨前，先拿到劇本。"
        h2="選前民調只能告訴你昨天的數字。PersonaCast 讓你看見明天的輿論——在政策宣示、選舉造勢或議題操作之前，預覽多元選民群體的真實反應。"
        ctaPrimary={{ label: '預演你的下一場選戰 →', href: '/contact' }}
        rightContent={<HeroMockup />}
      />

      {/* Section: Social Proof / Trusted By */}
      <section className="py-8 border-y border-white/5 bg-[#05080f]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-xs font-semibold tracking-widest uppercase text-slate-500 mb-6">深受頂尖選戰操盤手與危機公關團隊信賴</p>
          <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-40 grayscale filter">
             {/* Abstract Shapes as Logos */}
             <div className="flex items-center gap-2"><div className="w-6 h-6 rounded bg-slate-200"></div><span className="text-white font-bold text-lg tracking-tight">Vanguard PR</span></div>
             <div className="flex items-center gap-2"><div className="w-6 h-6 rounded-full bg-slate-200"></div><span className="text-white font-bold text-lg tracking-tight">Apex Strategy Group</span></div>
             <div className="flex items-center gap-2"><div className="w-6 h-6 transform rotate-45 bg-slate-200"></div><span className="text-white font-bold text-lg tracking-tight">Civic Insight</span></div>
          </div>
        </div>
      </section>

      {/* Section 2 — Alternating Scenario Cards */}
      <ContentSection>
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-900/30 border border-blue-500/20 rounded-full text-blue-300 text-xs font-medium mb-6">
            <Target className="w-4 h-4" /> Three Core Scenarios
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            不再猜測，讓數據引導每一次政治傳播
          </h2>
          <p className="text-slate-400 text-lg">透過 AI 代理人模擬真實社會神經網絡，為你的每一次發言進行壓力測試。</p>
        </div>

        <div className="space-y-24 md:space-y-32">
          {scenarios.map((s, i) => {
            const isEven = i % 2 === 0;
            return (
              <div key={s.title} className={`flex flex-col md:flex-row items-center gap-12 lg:gap-20 ${isEven ? '' : 'md:flex-row-reverse'}`}>
                <div className="flex-1 space-y-6">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                    {s.icon}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white">{s.title}</h3>
                  <p className="text-slate-400 text-lg leading-relaxed">{s.description}</p>
                  <ul className="space-y-3 pt-4">
                    <li className="flex items-center gap-3 text-slate-300 text-sm"><Check className="w-4 h-4 text-cyan-400 shrink-0"/> 高度還原真實選民結構</li>
                    <li className="flex items-center gap-3 text-slate-300 text-sm"><Check className="w-4 h-4 text-cyan-400 shrink-0"/> 識別關鍵意見領袖 (KOL) 節點</li>
                  </ul>
                </div>
                <div className="flex-1 w-full">
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-2xl opacity-50 rounded-full"></div>
                    {s.mockup}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </ContentSection>

      {/* Section 3 — Comparison Table */}
      <ContentSection>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            為什麼頂尖戰略家都在放棄傳統民調？
          </h2>
          <p className="text-slate-400 text-lg">政治是一場只爭朝夕的戰爭。當對手還在等下週的民調報告，你已經開始執行反擊計畫。</p>
        </div>

        <div className="max-w-5xl mx-auto relative">
          {/* PersonaCast Glow Background behind table */}
          <div className="absolute top-0 right-0 lg:right-[33%] w-1/3 h-full bg-blue-500/5 rounded-xl blur-md -z-10 pointer-events-none hidden md:block" />

          <div className="bg-[#0A0F1A] border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative z-10">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/5 text-sm md:text-base">
                  <th className="px-6 py-5 font-medium text-slate-400 w-1/3">決策維度</th>
                  <th className="px-6 py-5 font-bold text-white bg-blue-900/20 border-x border-t border-blue-500/30 rounded-t-xl w-1/3">
                    <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">PersonaCast</span>
                  </th>
                  <th className="px-6 py-5 font-medium text-slate-500 w-1/3">傳統民調 / 焦點團體</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr
                    key={row.dimension}
                    className={`border-b border-white/5 transition-colors hover:bg-white/[0.02]`}
                  >
                    <td className="px-6 py-6 text-sm font-medium text-slate-300">{row.dimension}</td>
                    <td className="px-6 py-6 text-sm font-bold text-blue-100 bg-blue-900/10 border-x border-blue-500/20 shadow-[inset_0_0_10px_rgba(59,130,246,0.05)]">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-cyan-400" />
                        {row.personacast}
                      </div>
                    </td>
                    <td className="px-6 py-6 text-sm text-slate-500">
                      <div className="flex items-center gap-2 opacity-70">
                        <X className="w-4 h-4" />
                        {row.traditional}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Table Bottom highlight for PC column */}
            <div className="absolute bottom-0 left-1/3 w-1/3 h-[1px] bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
          </div>
        </div>
      </ContentSection>

      {/* Section 4 — Pre-CTA Banner */}
      <section className="py-24 relative overflow-hidden bg-[#02050b] border-t border-white/5">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="relative max-w-4xl mx-auto px-6 text-center z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-8">
            下一場選戰的勝負，<br className="hidden md:block" />從一次精準的推演開始。
          </h2>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
            不要把政治生涯交給機率。現在就開始使用 AI 進行戰略兵棋推演，拿回局勢的主導權。
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/contact" className="px-8 py-4 bg-white text-black font-bold rounded-lg hover:bg-slate-200 transition-all shadow-xl shadow-white/10 hover:shadow-white/20">
              預約政治推演演示
            </a>
            <span className="text-slate-500 text-sm mt-3 sm:mt-0 flex items-center gap-1">
              <Zap className="w-4 h-4" /> 需時 15 分鐘・了解客製化方案
            </span>
          </div>
        </div>
      </section>

      {/* (Optional) We can keep or remove BottomCTA, but I replaced it with the Pre-CTA Banner which serves the same purpose better */}
    </main>
  );
}
