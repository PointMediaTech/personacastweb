'use client';

import { useRef, useState } from 'react';
import { useInView, useScrollProgress, cssTransition, useReducedMotion, interpolate, EASE_CSS } from '@/app/lib/animations';
import { GlowButton } from '@/app/components/shared/GlowButton';
import Link from 'next/link';
import {
  Users,
  Play,
  CheckCircle2,
  AlertOctagon,
  Network,
  Cpu,
  MessageSquareWarning,
  ArrowRight,
} from 'lucide-react';

/* ── Shared animation helpers ──────────────────────────────────────── */

function useFadeUp(inView: boolean, reduced: boolean, delay = 0) {
  if (reduced) return {};
  return {
    transform: inView ? 'translateY(0)' : 'translateY(24px)',
    transition: cssTransition(['transform'], 0.7, delay),
  };
}

function useFadeUpOpacity(inView: boolean, reduced: boolean, delay = 0) {
  if (reduced) return {};
  return {
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(24px)',
    transition: cssTransition(['opacity', 'transform'], 0.7, delay),
  };
}

/* ── Hero Section ──────────────────────────────────────────────────── */

function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const reduced = useReducedMotion();

  return (
    <section ref={ref} className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-24 pb-16">
      {/* Background effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-strategic-blue/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-1/4 w-[800px] h-[600px] bg-logo-navy/20 rounded-full blur-[150px]" />

        {/* Network grid pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none" aria-hidden="true">
          <pattern id="networkGrid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-strategic-blue/30" />
            <circle cx="0" cy="0" r="1.5" className="fill-aurora-cyan/40" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#networkGrid)" />
        </svg>

        {/* Ambient floating dots via CSS animation */}
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-aurora-cyan/40 shadow-[0_0_6px_var(--color-aurora-cyan)]"
              style={{
                top: `${10 + (i * 7) % 80}%`,
                left: `${5 + (i * 11) % 90}%`,
                animation: reduced ? 'none' : `policyNodePulse ${4 + (i % 3)}s ease-in-out ${(i * 0.4)}s infinite`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 text-center">
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-aurora-cyan/10 border border-aurora-cyan/20 text-aurora-cyan text-sm font-medium mb-8 backdrop-blur-md"
          style={useFadeUpOpacity(inView, reduced)}
        >
          <Network className="w-4 h-4" />
          國家級社會演算法 3.0
        </div>

        <h1
          className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-8 leading-tight max-w-5xl mx-auto font-heading"
          style={useFadeUp(inView, reduced, 0.1)}
        >
          政策不該是盲測。
          <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-aurora-cyan to-strategic-blue">
            讓 AI 為您推演真實社會的百萬種反應。
          </span>
        </h1>

        <p
          className="text-lg md:text-xl text-mist-blue-gray max-w-3xl mx-auto mb-12 leading-relaxed"
          style={useFadeUpOpacity(inView, reduced, 0.2)}
        >
          告別同溫層偏差與事後滅火。PersonaCast 政策模擬引擎，協助決策者在政策發布前，精準預測各階層群體反彈，提前化解阻力，凝聚社會共識。
        </p>

        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          style={useFadeUpOpacity(inView, reduced, 0.3)}
        >
          <GlowButton href="/contact" label="預約政策沙盤推演 →" variant="primary" />
          <Link
            href="#demo"
            className="flex items-center gap-2 px-8 py-3.5 rounded-full text-slate-300 hover:text-white transition-colors border border-slate-700 hover:border-slate-500 bg-slate-800/50 backdrop-blur-md"
          >
            <Play className="w-4 h-4" />
            觀看系統操作示範
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── Pain Points Section ──────────────────────────────────────────── */

const painPoints = [
  {
    icon: Users,
    before: {
      title: '傳統困境：同溫層盲點',
      desc: '決策圈往往與普羅大眾脫節，容易誤判民意。自以為周全的政策，一上路卻引發強烈反彈。',
    },
    after: {
      title: '解決方案：全景社會圖譜',
      desc: 'AI 精準生成涵蓋勞工、長照群體、中小企業主等十萬量級虛擬人格網絡，打破同溫層偏差。',
    },
  },
  {
    icon: AlertOctagon,
    before: {
      title: '傳統困境：事後滅火',
      desc: '總是得等政策發布、媒體炎上後，才驚覺配套方案不足，陷入被動的損害控制。',
    },
    after: {
      title: '解決方案：事前演算法',
      desc: '在草案階段即可進行高頻社會沙盤推演，看見未來的熱點與反對聲浪，提前部署資源。',
    },
  },
  {
    icon: MessageSquareWarning,
    before: {
      title: '傳統困境：直覺式修法',
      desc: '憑經驗猜測是哪一句話、哪個詞彙惹怒民眾。修法毫無方向，朝令夕改損害政府威信。',
    },
    after: {
      title: '解決方案：精確風險歸因',
      desc: '逐字掃描政策條文，AI 直接標示引發特定群體不滿的關鍵字，並給出科學的替換詞建議。',
    },
  },
] as const;

function PainPointCard({ point, index }: { point: typeof painPoints[number]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const reduced = useReducedMotion();
  const Icon = point.icon;

  return (
    <div
      ref={ref}
      style={useFadeUpOpacity(inView, reduced, index * 0.15)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative h-[280px] rounded-2xl cursor-pointer group"
    >
      <div
        className="relative w-full h-full transition-transform duration-700"
        style={{
          perspective: '1000px',
          transformStyle: 'preserve-3d',
          transform: isHovered ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Front (Before) */}
        <div
          className="absolute inset-0 w-full h-full rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-8 flex flex-col justify-between"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div>
            <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 mb-6">
              <Icon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-300 mb-3">{point.before.title}</h3>
            <p className="text-slate-500 leading-relaxed text-sm">{point.before.desc}</p>
          </div>
          <div className="text-xs text-slate-600 font-medium uppercase tracking-wider flex items-center gap-2">
            懸停查看解法 <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Back (After) */}
        <div
          className="absolute inset-0 w-full h-full rounded-2xl border border-aurora-cyan/30 bg-gradient-to-br from-logo-navy/40 to-slate-900/80 backdrop-blur-md p-8 flex flex-col justify-between shadow-[0_0_30px_rgba(0,242,255,0.08)]"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div>
            <div className="w-12 h-12 rounded-xl bg-aurora-cyan/15 flex items-center justify-center text-aurora-cyan mb-6 shadow-[0_0_15px_rgba(0,242,255,0.2)]">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{point.after.title}</h3>
            <p className="text-strategic-blue/80 leading-relaxed text-sm">{point.after.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function PainPointsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const reduced = useReducedMotion();

  return (
    <section className="py-24 relative z-10">
      <div ref={ref} className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2
            className="text-3xl md:text-4xl font-bold text-white mb-4 font-heading"
            style={useFadeUp(inView, reduced)}
          >
            為何多數政策一上路就觸礁？
          </h2>
          <p
            className="text-mist-blue-gray max-w-2xl mx-auto"
            style={useFadeUpOpacity(inView, reduced, 0.1)}
          >
            因為人類的經驗無法處理百萬級的社會變數，但 PersonaCast 的演算法可以。
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {painPoints.map((pt, i) => (
            <PainPointCard key={i} point={pt} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Step Flow Section ─────────────────────────────────────────────── */

function StepMockup1() {
  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 shadow-2xl h-full flex flex-col">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
        <div className="w-3 h-3 rounded-full bg-slate-700" />
        <div className="w-3 h-3 rounded-full bg-slate-700" />
        <div className="w-3 h-3 rounded-full bg-slate-700" />
        <span className="text-sm text-mist-blue-gray ml-2">政策草案分析台</span>
      </div>
      <div className="space-y-4 flex-1">
        <div className="p-4 bg-slate-800 rounded-lg w-full text-slate-400 text-sm leading-relaxed border border-slate-700 shadow-inner">
          <span className="text-strategic-blue"># 能源轉型附加費草案</span>
          <br /><br />
          為加速綠電發展，擬於下半年度針對每月用電量超過 1000 度的家戶級微型企業，開徵 5% 綠能附加費...
        </div>
        <div className="flex gap-4 flex-wrap">
          <div className="h-8 bg-aurora-cyan/10 text-aurora-cyan border border-aurora-cyan/30 rounded-full px-4 flex items-center text-xs">
            目標對象：微型企業、高用電戶
          </div>
          <div className="h-8 bg-slate-800 rounded-full px-4 flex items-center text-xs text-slate-300">
            變數：通貨膨脹預期
          </div>
        </div>
      </div>
    </div>
  );
}

function StepMockup2() {
  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 shadow-2xl h-full flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-20 mix-blend-overlay" />

      <div className="relative w-full h-full flex items-center justify-center z-10 min-h-[200px]">
        <div className="absolute top-1/2 left-[15%] w-32 h-32 -translate-y-1/2 rounded-full border border-alert-red/30 bg-alert-red/10 flex items-center justify-center">
          <div className="text-center">
            <div className="text-alert-red font-bold text-lg">45%</div>
            <div className="text-mist-blue-gray text-[10px]">強烈反彈 (微型企業)</div>
          </div>
        </div>
        <div className="absolute top-1/2 right-[15%] w-24 h-24 -translate-y-1/2 rounded-full border border-emerald-500/30 bg-emerald-500/10 flex items-center justify-center">
          <div className="text-center">
            <div className="text-emerald-400 font-bold text-sm">32%</div>
            <div className="text-mist-blue-gray text-[10px]">表態支持 (環保團體)</div>
          </div>
        </div>
        {/* Connecting line */}
        <div className="absolute top-1/2 left-1/2 w-1/4 h-[1px] bg-gradient-to-r from-alert-red/50 to-emerald-500/50 -translate-x-1/2 -translate-y-1/2 overflow-hidden">
          <div className="w-1/2 h-full bg-white/50 shadow-[0_0_10px_#fff] animate-[policySlideNetwork_1.5s_infinite]" />
        </div>
      </div>
    </div>
  );
}

function StepMockup3() {
  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 shadow-2xl h-full flex flex-col gap-4 relative overflow-hidden">
      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4 flex gap-4">
        <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
        <div>
          <h4 className="text-emerald-400 font-medium text-sm mb-1">最佳修正策略</h4>
          <p className="text-white text-lg font-bold">
            新增「節能補助過渡期」條款
            <span className="text-mist-blue-gray text-sm font-normal ml-2">(可降低 82% 企業端阻力)</span>
          </p>
        </div>
      </div>

      <div className="flex-1 bg-slate-800/50 rounded-lg border border-slate-700 p-4">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-slate-300">措辭風險糾正</span>
        </div>
        <div className="space-y-3 text-sm text-slate-400 bg-slate-900 rounded p-3 font-mono leading-relaxed border border-slate-700/50">
          針對每月用電量超過 1000 度的
          <span className="bg-alert-red/20 text-red-300 underline underline-offset-2">家戶級微型企業</span>
          ，
          <span className="bg-alert-red/20 text-red-300 underline underline-offset-2">開徵</span>
          {' '}5% 綠能附加費。
        </div>
        <div className="mt-2 text-xs text-emerald-400 flex items-center gap-1">
          <ArrowRight className="w-3 h-3" /> 建議改為：「針對高耗表燈營業用戶，逐步實施綠能轉型代金」以降低被剝奪感。
        </div>
      </div>
    </div>
  );
}

const steps = [
  {
    step: 'Step 1',
    title: '匯入草案與設定變數',
    desc: '直接輸入法規草稿、政策聲明稿，並定義實施對象與情境變數。系統將自動梳理潛在影響圈。',
    Mockup: StepMockup1,
  },
  {
    step: 'Step 2',
    title: '啟動社會節點碰撞模擬',
    desc: '系統將草案投放至 100,000+ 個具備不同政黨傾向、職涯背景的虛擬人格網絡中，觀察真實的社群共振現象。',
    Mockup: StepMockup2,
  },
  {
    step: 'Step 3',
    title: '獲取風險報告與優化建議',
    desc: '精確指出最容易引發爭議的條文，並提供 AI 改寫草稿與配套策略建議，助您將政策阻力降到最低。',
    Mockup: StepMockup3,
  },
] as const;

function StepFlowSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const progress = useScrollProgress(containerRef);
  const reduced = useReducedMotion();

  const activeStep = progress < 0.33 ? 0 : progress < 0.66 ? 1 : 2;

  return (
    <section ref={containerRef} className="relative min-h-[200vh]">
      <div className="sticky top-0 h-screen w-full flex items-center py-20">
        <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left: text steps */}
          <div className="space-y-12">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-12 font-heading">
              化無形民意為具體數據
            </h2>

            <div className="space-y-16">
              {steps.map((s, i) => (
                <div
                  key={i}
                  className="transition-all duration-500"
                  style={{
                    opacity: activeStep === i ? 1 : 0.3,
                    transform: activeStep === i ? 'translateX(0)' : 'translateX(-16px)',
                    transition: reduced ? 'none' : `opacity 0.5s ${EASE_CSS}, transform 0.5s ${EASE_CSS}`,
                  }}
                >
                  <div className="text-aurora-cyan font-mono text-sm tracking-widest font-bold mb-3">{s.step}</div>
                  <h3 className="text-2xl font-bold text-white mb-4">{s.title}</h3>
                  <p className="text-mist-blue-gray text-lg leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: mockup */}
          <div className="hidden lg:block h-[500px] w-full relative">
            {steps.map((s, i) => {
              const MockupComponent = s.Mockup;
              return (
                <div
                  key={i}
                  className="absolute inset-0 w-full h-full"
                  style={{
                    opacity: activeStep === i ? 1 : 0,
                    transform: activeStep === i ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0.97)',
                    transition: reduced ? 'none' : `opacity 0.5s ${EASE_CSS}, transform 0.5s ${EASE_CSS}`,
                    pointerEvents: activeStep === i ? 'auto' : 'none',
                  }}
                >
                  <MockupComponent />
                </div>
              );
            })}
            <div className="absolute inset-0 bg-aurora-cyan/5 blur-[100px] rounded-full -z-10" aria-hidden="true" />
          </div>

        </div>
      </div>
    </section>
  );
}

/* ── Stats Section ─────────────────────────────────────────────────── */

function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const reduced = useReducedMotion();

  return (
    <section className="py-24 border-t border-slate-800/50 bg-slate-900/30">
      <div ref={ref} className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-800">
          {[
            { value: '1.2', suffix: 'M+', label: '內建虛擬國民主態節點' },
            { value: '92', suffix: '%', label: '社會反彈預測準確率' },
            { value: '200', suffix: '+', label: '涵蓋法案與生活情境參數庫' },
          ].map((stat, i) => (
            <div
              key={i}
              className="p-6"
              style={useFadeUpOpacity(inView, reduced, i * 0.1)}
            >
              <div className="text-5xl font-extrabold text-white mb-2 tracking-tight">
                {stat.value}<span className="text-aurora-cyan">{stat.suffix}</span>
              </div>
              <div className="text-mist-blue-gray">{stat.label}</div>
            </div>
          ))}
        </div>

        <div
          className="mt-20 max-w-4xl mx-auto bg-slate-800/40 rounded-2xl p-8 md:p-12 border border-slate-700/50 text-center relative overflow-hidden"
          style={useFadeUpOpacity(inView, reduced, 0.3)}
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-aurora-cyan to-transparent" />
          <p className="text-xl md:text-2xl text-slate-300 italic leading-relaxed mb-8">
            &ldquo;在推動重大年金改革前，PersonaCast 的沙盤推演精準指出了核心反彈群體不是被砍福利的人，而是預期將面臨通貨膨脹的夾心階層。我們依此調整了宣傳側重點，成功讓法案在一讀通過時阻力減少了七成。&rdquo;
          </p>
          <div className="text-white font-medium">中央決策幕僚長</div>
          <div className="text-sm text-mist-blue-gray">公共政策智庫機構</div>
        </div>
      </div>
    </section>
  );
}

/* ── CTA Section ───────────────────────────────────────────────────── */

function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const reduced = useReducedMotion();

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-deep-space" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-logo-navy/20 blur-[150px] rounded-full" aria-hidden="true" />

      <div ref={ref} className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <h2
          className="text-4xl font-bold text-white mb-6 font-heading"
          style={useFadeUp(inView, reduced)}
        >
          好的政策，不該死在溝通失誤上。
        </h2>
        <p
          className="text-xl text-mist-blue-gray mb-10"
          style={useFadeUpOpacity(inView, reduced, 0.1)}
        >
          為您的下一個重大提案進行全面的壓力測試。
        </p>
        <div style={useFadeUpOpacity(inView, reduced, 0.2)}>
          <GlowButton href="/contact" label="預約政策沙盤推演 →" variant="primary" />
        </div>
      </div>
    </section>
  );
}

/* ── Main Export ────────────────────────────────────────────────────── */

export default function PolicySimulationClient() {
  return (
    <div className="bg-deep-space min-h-screen font-body selection:bg-aurora-cyan/30">
      <HeroSection />
      <PainPointsSection />
      <StepFlowSection />
      <StatsSection />
      <CTASection />
    </div>
  );
}
