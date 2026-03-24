'use client';

import { useRef } from 'react';
import { useInView, cssTransition, useReducedMotion, EASE_CSS } from '@/app/lib/animations';
import { GlowButton } from '@/app/components/shared/GlowButton';
import Link from 'next/link';
import {
  ShieldAlert,
  Activity,
  Play,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  TrendingUp,
  Radar,
  Zap,
  Check,
  X,
  ArrowRight,
} from 'lucide-react';

/* ── Shared animation helpers ──────────────────────────────────────── */

/** Transform-only fade-up (no opacity:0 on LCP elements) */
function useFadeUp(inView: boolean, reduced: boolean, delay = 0) {
  if (reduced) return {};
  return {
    transform: inView ? 'translateY(0)' : 'translateY(24px)',
    transition: cssTransition(['transform'], 0.7, delay),
  };
}

/** Full fade-up with opacity (safe for non-LCP elements) */
function useFadeUpOpacity(inView: boolean, reduced: boolean, delay = 0) {
  if (reduced) return {};
  return {
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(24px)',
    transition: cssTransition(['opacity', 'transform'], 0.7, delay),
  };
}

/* ── Hero Section ──────────────────────────────────────────────────── */

function HeroMockup() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const reduced = useReducedMotion();

  return (
    <div
      ref={ref}
      className="relative mx-auto w-full max-w-lg lg:max-w-none perspective-1000"
      style={useFadeUpOpacity(inView, reduced, 0.3)}
    >
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 opacity-30 blur-2xl" />
      <div className="relative bg-[#0A0E1A]/90 backdrop-blur-xl border border-cyan-500/20 rounded-2xl shadow-2xl overflow-hidden shadow-cyan-900/20 hover:rotate-y-[-2deg] hover:rotate-x-[2deg] transition-transform duration-700 rotate-y-[-5deg] rotate-x-[5deg]">
        {/* Top Bar */}
        <div className="flex border-b border-white/5 px-4 py-3 items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
            <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
            <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
          </div>
          <div className="bg-[#1e293b] px-3 py-1 rounded-md text-[10px] text-slate-400 mx-auto font-mono tracking-widest uppercase flex items-center gap-2">
            <Activity className="w-3 h-3 text-cyan-400" />
            Brand Resilience Dashboard
          </div>
        </div>
        {/* Content */}
        <div className="p-6 relative overflow-hidden">
          {/* Radar sweep background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-cyan-500/10 rounded-full flex items-center justify-center pointer-events-none">
            <div
              className="w-48 h-48 border border-cyan-500/20 rounded-full animate-ping opacity-30"
              style={{ animationDuration: '4s' }}
            />
          </div>

          <div className="flex justify-between items-start mb-8 relative z-10">
            <div>
              <h3 className="text-white text-xl font-bold mb-1">全球即時輿論防禦網</h3>
              <p className="text-slate-400 text-xs flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                系統狀態：正常監測中
              </p>
            </div>
            <div className="text-right">
              <div className="text-[10px] text-cyan-400 uppercase tracking-widest mb-1">
                Resilience Score
              </div>
              <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
                84<span className="text-lg text-slate-600">/100</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6 relative z-10">
            <div className="bg-[#1e293b]/60 border border-white/5 rounded-xl p-4 backdrop-blur-sm">
              <div className="text-xs text-slate-400 mb-2">潛在風險熱點區</div>
              <div className="text-lg font-bold text-rose-400 font-mono">X (Twitter)</div>
              <div className="text-[10px] text-rose-500/80 mt-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> 負向情緒微升 2.4%
              </div>
            </div>
            <div className="bg-[#1e293b]/60 border border-white/5 rounded-xl p-4 backdrop-blur-sm">
              <div className="text-xs text-slate-400 mb-2">防禦韌性最高族群</div>
              <div className="text-lg font-bold text-emerald-400 font-mono">18-24 歲受眾</div>
              <div className="text-[10px] text-emerald-500/80 mt-1 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> 品牌忠誠度穩固
              </div>
            </div>
          </div>

          {/* Bar chart — pure CSS stagger */}
          <div className="relative z-10 h-16 w-full flex items-end justify-between gap-1 mt-4">
            {[40, 30, 45, 20, 60, 40, 80, 50, 90, 40, 30, 20, 10, 25, 15, 30].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-sm bg-gradient-to-t from-cyan-500 to-blue-400 origin-bottom"
                style={{
                  height: inView ? `${h}%` : '0%',
                  transition: reduced
                    ? 'none'
                    : `height 1s ${EASE_CSS} ${i * 0.05}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { margin: '-40px' });
  const reduced = useReducedMotion();

  return (
    <section
      ref={ref}
      className="relative min-h-[90vh] flex items-center overflow-hidden pt-24 pb-16 border-b border-white/5"
    >
      <div className="absolute inset-0 z-0 bg-[#0B0F19]">
        <div className="absolute top-[20%] right-[10%] w-[600px] h-[600px] bg-cyan-900/20 rounded-full blur-[150px] mix-blend-screen pointer-events-none" />
        <div className="absolute bottom-0 left-[10%] w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="text-center lg:text-left">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-6 tracking-widest pl-1"
              style={useFadeUpOpacity(inView, reduced, 0)}
            >
              <span className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center">
                <Radar className="w-3 h-3" />
              </span>
              AI 主動聲譽管理系統
            </div>

            {/* H1 — LCP element: transform-only, no opacity:0 */}
            <h1
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight mb-6"
              style={useFadeUp(inView, reduced, 0.1)}
            >
              輿論風暴來襲前，
              <br />
              您的品牌防禦力是多少？
            </h1>

            <p
              className="text-lg text-slate-400 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed"
              style={useFadeUp(inView, reduced, 0.2)}
            >
              不要等危機爆發才開始公關補救。PersonaCast
              定期進行百萬次品牌壓力測試，量化聲譽韌性，讓您在裂縫擴大前精準修補。
            </p>

            <div
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
              style={useFadeUpOpacity(inView, reduced, 0.3)}
            >
              <GlowButton href="/contact" label="免費獲取品牌韌性報告 →" variant="primary" />
              <Link
                href="#demo"
                className="flex items-center gap-2 px-6 py-3.5 rounded-full text-slate-300 hover:text-white transition-colors border border-slate-700 hover:border-slate-500 bg-slate-800/30 backdrop-blur-md"
              >
                <Play className="w-4 h-4" />
                看 AI 如何推演危機
              </Link>
            </div>
          </div>

          <HeroMockup />
        </div>
      </div>
    </section>
  );
}

/* ── Trusted By Section ────────────────────────────────────────────── */

function TrustedBySection() {
  return (
    <section className="py-8 border-b border-white/5 bg-[#05080f] relative z-10">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-xs font-bold tracking-widest uppercase text-slate-500 mb-6">
          頂級跨國品牌與企業公關部門指定防禦系統
        </p>
        <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-30 grayscale filter">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-slate-200" />
            <span className="text-white font-bold text-lg tracking-tight">Vanguard PR</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-slate-200" />
            <span className="text-white font-bold text-lg tracking-tight">Apex Strategy Group</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rotate-45 bg-slate-200" />
            <span className="text-white font-bold text-lg tracking-tight">Civic Insight</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Scenarios / Capabilities ──────────────────────────────────────── */

function ScenarioMockup1() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '-100px' });
  const reduced = useReducedMotion();

  return (
    <div ref={ref} className="bg-[#0f172a] rounded-2xl border border-cyan-900/30 p-6 shadow-2xl relative overflow-hidden h-full flex flex-col">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-400" />
      <div className="flex items-center justify-between mb-6">
        <span className="text-white font-medium">全局壓力測試模擬器</span>
        <span className="px-2 py-1 bg-cyan-500/10 text-cyan-400 text-xs rounded border border-cyan-500/20">
          持續演算中
        </span>
      </div>
      <div className="space-y-4 flex-1">
        <div className="flex justify-between text-sm text-slate-400">
          <span>情境：核心產品因故全面召回</span>
          <span className="text-rose-400 font-mono">衝擊力：極高</span>
        </div>
        <div className="h-40 border border-slate-700/50 rounded-xl bg-slate-800/40 p-4 relative flex items-end">
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
            <path
              d="M0,80 Q20,80 30,50 T60,20 T100,60"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-cyan-500"
              strokeDasharray="200"
              strokeDashoffset={inView ? '0' : '200'}
              style={{
                transition: reduced ? 'none' : `stroke-dashoffset 1.5s ${EASE_CSS}`,
              }}
            />
            <path
              d="M0,80 Q20,80 30,50 T60,20 T100,60 L100,100 L0,100 Z"
              fill="url(#grad1)"
              className="opacity-20"
            />
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="1" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute top-4 left-4 bg-slate-900/80 border border-slate-700 rounded p-2 backdrop-blur">
            <div className="text-[10px] text-slate-400">韌性跌幅預測</div>
            <div className="text-white font-bold">
              -14.2% <span className="text-emerald-400 text-xs font-normal">仍在安全區間</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ScenarioMockup2() {
  return (
    <div className="bg-[#0f172a] rounded-2xl border border-emerald-900/30 p-6 shadow-2xl relative overflow-hidden h-full flex flex-col">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-400" />
      <div className="flex items-center justify-between mb-6">
        <span className="text-white font-medium">信任盲區圖譜</span>
        <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-xs rounded border border-emerald-500/20">
          分析完成
        </span>
      </div>
      <div className="relative flex-1 bg-slate-800/30 rounded-xl border border-slate-700/50 flex items-center justify-center p-4">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-400/20 via-slate-900 to-slate-900 pointer-events-none" />
        <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border border-emerald-500/20 flex flex-col items-center justify-center relative">
          <div className="absolute w-full h-[1px] bg-emerald-500/20 rotate-45" />
          <div className="absolute w-full h-[1px] bg-emerald-500/20 -rotate-45" />
          <div className="absolute w-[1px] h-full bg-emerald-500/20" />
          <div className="absolute w-full h-[1px] bg-emerald-500/20" />

          <div className="w-16 h-16 rounded-full bg-emerald-500/20 z-10 flex items-center justify-center border border-emerald-400/50 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
            <ShieldCheck className="w-6 h-6 text-emerald-300" />
          </div>

          <div className="absolute -top-4 -right-4 bg-rose-500/20 border border-rose-500/50 text-rose-300 text-[10px] px-2 py-1 rounded-full z-20 shadow-lg animate-pulse">
            隱患: 勞工爭議
          </div>

          <div className="absolute -bottom-6 -left-2 bg-amber-500/20 border border-amber-500/50 text-amber-300 text-[10px] px-2 py-1 rounded-full z-20 shadow-lg animate-pulse [animation-delay:1s]">
            盲區: Z世代動保意識
          </div>
        </div>
      </div>
    </div>
  );
}

function ScenarioMockup3() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '-100px' });
  const reduced = useReducedMotion();

  return (
    <div ref={ref} className="bg-[#0f172a] rounded-2xl border border-amber-900/30 p-6 shadow-2xl relative overflow-hidden h-full flex flex-col">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-orange-400" />
      <div className="flex items-center justify-between mb-4">
        <span className="text-white font-medium">預警儀表板</span>
        <Activity className="w-4 h-4 text-amber-500 animate-pulse" />
      </div>
      <div className="space-y-4 flex-1 mt-2">
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
              <AlertTriangle className="w-4 h-4" /> 高風險風暴成形中
            </div>
            <div className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded border border-slate-700">
              T-72h 預警
            </div>
          </div>
          <p className="text-sm text-amber-200/70 leading-relaxed">
            偵測到競品供應鏈事件正在局部社群串聯，預計 48
            小時內主流媒體將對同業進行無差別盤問，建議啟動防禦專案。
          </p>
        </div>

        <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/80">
          <div className="text-xs text-slate-400 mb-3">建議自動執行腳本</div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-white">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 origin-left"
                style={{
                  transform: inView ? 'scaleX(1)' : 'scaleX(0)',
                  transition: reduced ? 'none' : `transform 1.5s ${EASE_CSS} 0.5s`,
                }}
              />
            </div>
            <div className="text-xs text-white font-medium">生成澄清草稿</div>
          </div>
        </div>
      </div>
    </div>
  );
}

const scenarios = [
  {
    title: '壓力測試與品牌韌性量測',
    description:
      '在風平浪靜的時候，才是壓力測試的最佳時機。我們模擬各類破壞性事件——產品召回、高管醜聞、數據外洩——建立您的品牌韌性基線分數。知道「承受上限」，才不會被意外擊潰。',
    icon: <Activity className="w-5 h-5 text-cyan-400" />,
    mockup: <ScenarioMockup1 />,
  },
  {
    title: '深度盲區與系統弱點偵測',
    description:
      '也許品牌在特定族群中比想像的脆弱，某個話題是您完全沒防備的死穴。PersonaCast 自動繪製跨平台受眾信任圖譜，精準揪出系統性盲區，讓危機無所遁形。',
    icon: <Radar className="w-5 h-5 text-emerald-400" />,
    mockup: <ScenarioMockup2 />,
  },
  {
    title: '72 小時全天候自動預警',
    description:
      '當外部發生的微小變化即將重創品牌時，PersonaCast 會在風向改變初期就觸發警鈴，提早發佈 72 小時防護佈局通報，防患於未然。',
    icon: <Zap className="w-5 h-5 text-amber-400" />,
    mockup: <ScenarioMockup3 />,
  },
] as const;

function ScenarioCard({
  scenario,
  reverse,
}: {
  readonly scenario: (typeof scenarios)[number];
  readonly reverse: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '-100px' });
  const reduced = useReducedMotion();

  return (
    <div
      ref={ref}
      className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${reverse ? 'lg:flex-row-reverse' : ''}`}
    >
      <div className="flex-1 space-y-6">
        <div
          className="w-14 h-14 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-center shadow-2xl relative overflow-hidden"
          style={useFadeUpOpacity(inView, reduced, 0)}
        >
          <div className="absolute inset-0 bg-blue-500/10 mix-blend-screen pointer-events-none" />
          {scenario.icon}
        </div>
        <h3
          className="text-3xl md:text-4xl font-bold text-white tracking-tight"
          style={useFadeUp(inView, reduced, 0.1)}
        >
          {scenario.title}
        </h3>
        <p
          className="text-slate-400 text-lg leading-relaxed"
          style={useFadeUp(inView, reduced, 0.2)}
        >
          {scenario.description}
        </p>

        <ul className="space-y-3 pt-4" style={useFadeUpOpacity(inView, reduced, 0.4)}>
          <li className="flex items-center gap-3 text-slate-300 text-base">
            <Check className="w-4 h-4 text-cyan-400 shrink-0" /> 高度還原受眾情緒節點
          </li>
          <li className="flex items-center gap-3 text-slate-300 text-base">
            <Check className="w-4 h-4 text-cyan-400 shrink-0" /> 無限次自定義情境兵棋推演
          </li>
        </ul>
      </div>

      <div
        className="flex-1 w-full relative h-[400px]"
        style={useFadeUpOpacity(inView, reduced, 0.2)}
      >
        <div className="absolute -inset-10 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 blur-[80px] rounded-full pointer-events-none" />
        {scenario.mockup}
      </div>
    </div>
  );
}

function FeaturesSection() {
  return (
    <section className="py-24 relative z-10 bg-[#020617]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-900/30 border border-cyan-500/20 rounded-full text-cyan-300 text-sm font-medium mb-6 uppercase tracking-widest pl-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
            核心引擎
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
            用 AI 品牌輿情監控重構防護盾
          </h2>
          <p className="text-slate-400 text-lg">
            將無形的「品牌聲譽」轉化為精準的預警系統。
            <br className="hidden md:block" />
            在公關戰場上擁有上帝視角。
          </p>
        </div>

        <div className="space-y-32">
          {scenarios.map((s, i) => (
            <ScenarioCard key={s.title} scenario={s} reverse={i % 2 !== 0} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Comparison Section ────────────────────────────────────────────── */

const comparisonRows = [
  { dimension: '反應決策速度', personacast: '領先 72 小時預警', traditional: '事件失控後才開始追蹤' },
  {
    dimension: '策略判斷依據',
    personacast: '百萬級受眾 AI 模擬量化數據',
    traditional: '過度依賴公關主觀經驗判斷',
  },
  {
    dimension: '危機處置態勢',
    personacast: '事前模擬防禦、搶先佈局',
    traditional: '永遠被動救火、事後撰寫聲明',
  },
  {
    dimension: '韌性量測精度',
    personacast: '即時視覺化盲區圖譜',
    traditional: '缺乏可量測之風險基準線',
  },
];

function ComparisonSection() {
  return (
    <section className="py-24 bg-[#05080f] relative z-10 border-y border-white/5">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
            品牌聲譽管理：您還在盲飛嗎？
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            沒有數據防禦的公關操作如同盲眼飛行。比起被動滅火，PersonaCast 讓您提前佈防火線。
          </p>
        </div>

        <div className="relative">
          <div className="absolute top-0 right-0 lg:right-[33%] w-[100%] lg:w-1/3 h-[100%] bg-cyan-600/10 blur-[80px] pointer-events-none hidden md:block" />

          <div className="bg-[#0A0F1A] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl relative z-10 md:text-left text-base">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/50">
                  <th className="p-4 md:p-6 font-medium text-slate-400 w-1/4">決策維度</th>
                  <th className="p-4 md:p-6 font-bold w-[38%] bg-cyan-900/10 border-x border-t border-cyan-500/30 rounded-t-xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-400 to-blue-500" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400 flex items-center gap-2 md:text-lg tracking-wide">
                      <ShieldCheck className="w-5 h-5 text-cyan-400" /> PersonaCast
                    </span>
                  </th>
                  <th className="p-4 md:p-6 font-medium text-slate-500 w-[37%]">傳統公關監測</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr
                    key={row.dimension}
                    className="border-b border-slate-800/50 hover:bg-slate-800/20 transition-colors"
                  >
                    <td className="p-4 md:px-6 md:py-8 font-medium text-slate-300">
                      {row.dimension}
                    </td>
                    <td className="p-4 md:px-6 md:py-8 font-bold text-cyan-50 bg-cyan-900/5 border-x border-cyan-500/20 shadow-[inset_0_0_20px_rgba(6,182,212,0.02)]">
                      <div className="flex items-center gap-2 md:gap-3">
                        <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                        <span className="leading-snug">{row.personacast}</span>
                      </div>
                    </td>
                    <td className="p-4 md:px-6 md:py-8 text-slate-500">
                      <div className="flex items-center gap-2 md:gap-3">
                        <X className="w-4 h-4 text-rose-500/40 shrink-0" />
                        <span className="leading-snug">{row.traditional}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="absolute bottom-0 left-1/4 md:left-[25%] lg:left-[33%] w-1/2 lg:w-1/3 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── ROI Section ───────────────────────────────────────────────────── */

function ROISection() {
  return (
    <section className="py-24 relative bg-[#020617]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-800">
          <div className="p-6">
            <div className="text-6xl font-black text-white mb-2 tracking-tighter">
              5-20<span className="text-rose-500 text-3xl font-bold">%</span>
            </div>
            <h4 className="text-white font-bold mb-2">平均市值蒸發</h4>
            <p className="text-base text-slate-400">
              一次未預判的危機，便足以在週末摧毀您十年累積的品牌價值。
            </p>
          </div>
          <div className="p-6 relative group">
            <div className="text-6xl font-black text-white mb-2 tracking-tighter">
              &lt;1<span className="text-cyan-400 text-3xl font-bold">%</span>
            </div>
            <h4 className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 font-bold mb-2">
              PersonaCast 投入佔比
            </h4>
            <p className="text-sm text-slate-400">
              一整年的防禦佈局預算，可能還不及公關危機單次顧問諮詢的報價。
            </p>
          </div>
          <div className="p-6">
            <div className="text-6xl font-black text-white mb-2 tracking-tighter">
              72<span className="text-blue-500 text-3xl font-bold">h</span>
            </div>
            <h4 className="text-white font-bold mb-2">平均預警提前量</h4>
            <p className="text-sm text-slate-400">
              給您絕對充裕的時間：統一口徑、對齊內部，制定完美的公關劇本。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Related Solutions (Internal Cross-Links) ──────────────────────── */

const relatedSolutions = [
  {
    title: '公關危機預判',
    description: '在輿論風暴前建立防火牆，從被動救火轉為主動防禦。',
    href: '/solutions/crisis-pr',
  },
  {
    title: '政治議題推演',
    description: '預演政策宣示與選舉策略，掌握明天的輿論走向。',
    href: '/solutions/political-strategy',
  },
  {
    title: '政策模擬推演',
    description: '在政策發布前預測公眾反應，優化溝通策略。',
    href: '/solutions/policy-simulation',
  },
];

function RelatedSolutionsSection() {
  return (
    <section className="py-24 bg-[#020617]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            探索更多 AI 推演情境
          </h2>
          <p className="text-slate-400 text-lg">
            品牌聲譽管理只是起點。PersonaCast 為不同領域的危機與策略決策提供專屬推演方案。
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {relatedSolutions.map((sol) => (
            <Link
              key={sol.href}
              href={sol.href}
              className="group block bg-[#0A0F1A] border border-white/10 rounded-2xl p-8 hover:border-cyan-500/30 transition-all hover:shadow-lg hover:shadow-cyan-900/10"
            >
              <h3 className="text-lg font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                {sol.title}
              </h3>
              <p className="text-slate-400 text-base leading-relaxed mb-4">{sol.description}</p>
              <span className="text-cyan-400 text-base font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                了解更多 <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Pre-CTA Banner ────────────────────────────────────────────────── */

function PreCTABanner() {
  return (
    <section className="py-24 relative overflow-hidden bg-[#0A0E1A] border-t border-white/5">
      <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-cyan-600/20 rounded-full blur-[130px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-6 text-center z-10">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-8 leading-tight">
          聲譽崩盤往往只發生在一瞬間。
          <br />
          但您可以提前建立防護牆。
        </h2>
        <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
          不要將多年累積的品牌信任，暴露在不可預測的風險中。即刻啟動 AI 主動聲譽防禦系統。
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link
            href="/contact"
            className="px-10 py-4 bg-white text-slate-900 font-bold text-lg rounded-full hover:bg-cyan-50 transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_50px_rgba(6,182,212,0.4)] hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            預約專屬品牌韌性評估 <ArrowRight className="w-5 h-5" />
          </Link>
          <span className="flex items-center gap-2 text-slate-400 text-base mt-2 sm:mt-0 font-medium">
            <Zap className="w-4 h-4 text-cyan-400" />
            快速部署，保護立竿見影
          </span>
        </div>
        <p className="mt-8 text-slate-500 text-base">
          想先了解產品？
          <Link
            href="/product"
            className="text-cyan-400 hover:text-cyan-300 underline underline-offset-4 ml-1"
          >
            查看產品功能
          </Link>
          <span className="mx-2">|</span>
          <Link
            href="/pricing"
            className="text-cyan-400 hover:text-cyan-300 underline underline-offset-4"
          >
            查看方案與定價
          </Link>
        </p>
      </div>
    </section>
  );
}

/* ── Main Export ────────────────────────────────────────────────────── */

export default function BrandReputationClient() {
  return (
    <div className="bg-[#0B0F19] min-h-screen font-sans selection:bg-cyan-500/30">
      <HeroSection />
      <TrustedBySection />
      <FeaturesSection />
      <ComparisonSection />
      <ROISection />
      <RelatedSolutionsSection />
      <PreCTABanner />
    </div>
  );
}
