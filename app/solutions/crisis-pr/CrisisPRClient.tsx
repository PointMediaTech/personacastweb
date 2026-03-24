'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { GlowButton } from '@/app/components/shared/GlowButton';
import { ShieldAlert, Clock, Activity, ArrowRight, Play, CheckCircle2, AlertTriangle, ShieldCheck, BarChart3, MessageSquare } from 'lucide-react';
import Link from 'next/link';

// === Intersection Observer Hook ===
function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.1, ...options }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}

// === Hero Section ===
function HeroSection() {
  const [particles, setParticles] = useState<Array<{ w: number, h: number, t: number, l: number, d: number, y: number }>>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setParticles([...Array(20)].map(() => ({
      w: Math.random() * 4 + 2,
      h: Math.random() * 4 + 2,
      t: Math.random() * 100,
      l: Math.random() * 100,
      d: Math.random() * 5 + 5,
      y: Math.random() * -100 - 50,
    })));
    // Trigger staggered entrance after mount
    requestAnimationFrame(() => setMounted(true));
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-24 pb-16">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-red-900/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[150px] mix-blend-screen" />

        {/* Abstract particles — CSS keyframe animation */}
        {particles.map((p, i) => (
          <div
            key={i}
            className="absolute bg-white/10 rounded-full animate-float-up"
            style={{
              width: p.w,
              height: p.h,
              top: `${p.t}%`,
              left: `${p.l}%`,
              animationDuration: `${p.d}s`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 text-center">
        <div
          className={cn(
            "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium mb-8 transition-all duration-700 ease-out",
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          主動防禦框架 2.0
        </div>

        <h1
          className={cn(
            "text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-8 leading-tight max-w-5xl mx-auto font-heading transition-all duration-700 ease-out delay-100",
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          掌握輿論的下一步。<br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">
            在危機引爆前，提早 72 小時寫好完美劇本。
          </span>
        </h1>

        <p
          className={cn(
            "text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed transition-all duration-700 ease-out delay-200",
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          透過 AI 深度推演，PersonaCast 幫助頂尖公關團隊從「被動救火」轉為「主動防禦」。
          精準預判輿論走向，讓每一次危機都成為展現品牌格局的轉機。
        </p>

        <div
          className={cn(
            "flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 ease-out delay-300",
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <GlowButton href="/contact" label="預約專屬危機推演展示 →" variant="primary" />
          <Link
            href="#demo"
            className="flex items-center gap-2 px-8 py-3.5 rounded-full text-slate-300 hover:text-white transition-colors border border-slate-700 hover:border-slate-500 bg-slate-800/50 backdrop-blur-md"
          >
            <Play className="w-4 h-4" />
            觀看 2 分鐘實機操作
          </Link>
        </div>
      </div>
    </section>
  );
}

// === Pain Points Section ===
const painPoints = [
  {
    icon: AlertTriangle,
    before: {
      title: '傳統作法：盲目滅火',
      desc: '當品牌登上熱搜榜，輿論早已失控，只能被動挨打。您看到的永遠是已經燒起來的火。',
    },
    after: {
      title: 'PersonaCast：精準預警',
      desc: '在負面訊號出現初期，AI 即可預判擴散路徑與受眾情緒，為您爭取最關鍵的防禦時間（平均提早 72 小時）。',
    },
  },
  {
    icon: Clock,
    before: {
      title: '傳統作法：無盡審核',
      desc: '黃金回應時間縮短至 90 分鐘，層層審核讓聲明永遠慢半拍，發出時觀眾早已離去。',
    },
    after: {
      title: 'PersonaCast：極速回應',
      desc: 'AI 幾秒內產出多套情境回應策略與公關稿草案，附帶風險評估數據，讓決策者安心秒簽。',
    },
  },
  {
    icon: Activity,
    before: {
      title: '傳統作法：直覺猜測',
      desc: '「這應該沒人在意吧？」憑直覺判斷，往往錯過沉默多數的臨界點，拿品牌聲譽擲骰子。',
    },
    after: {
      title: 'PersonaCast：數據決策',
      desc: '具象化百萬量級的虛擬受眾反應，真實測試各種回應策略。每一項決策背後都有強大的演算支撐。',
    },
  },
];

function PainPointCard({ point, index }: { point: typeof painPoints[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const { ref, inView } = useInView();
  const Icon = point.icon;

  return (
    <div
      ref={ref}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative h-[280px] rounded-2xl cursor-pointer group perspective-1000 transition-all duration-600 ease-out",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div
        className={cn(
          "relative w-full h-full transition-transform duration-700 preserve-3d",
          isHovered ? "rotate-y-180" : ""
        )}
      >
        {/* Front (Before) */}
        <div className="absolute inset-0 backface-hidden w-full h-full rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-8 flex flex-col justify-between">
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
        <div className="absolute inset-0 backface-hidden w-full h-full rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-900/40 to-slate-900/80 backdrop-blur-md p-8 rotate-y-180 flex flex-col justify-between shadow-[0_0_30px_rgba(59,130,246,0.15)]">
          <div>
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 mb-6 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{point.after.title}</h3>
            <p className="text-blue-100/80 leading-relaxed text-sm">{point.after.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function PainPointsSection() {
  return (
    <section className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">為什麼傳統公關工具總是慢半拍？</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">因為它們只能告訴您「過去發生了什麼」，而 PersonaCast 能告訴您「未來會發生什麼」。</p>
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

// === Step Flow ===
const steps = [
  {
    title: 'Step 1: 定義風暴中心',
    desc: '輸入潛在風險或初期負面事件（如：產品瑕疵、高管失言）。PersonaCast 將自動生成相關的利益關係人網路與擴散模組。',
    mockup: (
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 shadow-2xl h-full flex flex-col">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-amber-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="text-sm text-slate-400 ml-2">新增情境分析</span>
        </div>
        <div className="space-y-4 flex-1">
          <div className="h-10 bg-slate-800 rounded-lg w-full px-4 flex items-center text-slate-400 text-sm">事件描述：產品於昨晚發布後，論壇出現多篇關於電池過熱的討論...</div>
          <div className="flex gap-4">
            <div className="h-8 bg-slate-800 rounded-full px-4 flex items-center text-xs text-slate-300">#產品瑕疵</div>
            <div className="h-8 bg-slate-800 rounded-full px-4 flex items-center text-xs text-slate-300">#影響力：高</div>
          </div>
          <div className="mt-8 flex-1 border border-slate-800 rounded-lg bg-slate-800/30 flex items-center justify-center p-4">
            <div className="w-full max-w-[200px] aspect-square rounded-full border border-dashed border-slate-600 flex items-center justify-center relative">
               <div className="w-16 h-16 rounded-full bg-red-500/20 border border-red-500/50 flex items-center justify-center text-red-400 text-xs">核心爭議</div>
               <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-blue-500/20 border border-blue-500/40 text-[10px] flex items-center justify-center text-blue-300">KOL群</div>
               <div className="absolute -bottom-2 -left-6 w-14 h-14 rounded-full bg-amber-500/20 border border-amber-500/40 text-[10px] flex items-center justify-center text-amber-300">競品粉</div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    title: 'Step 2: 啟動百萬級沙盤推演',
    desc: '如同開啟上帝視角。觀看 AI 模擬 KOL 帶風向、對手攻擊與消費者情緒發酵。每一種反應都基於深度大語言模型生成，真實可靠。',
    mockup: (
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 shadow-2xl h-full flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-20 mix-blend-overlay"></div>
        <div className="w-full flex items-end h-48 gap-2 border-b border-slate-700 pb-2 z-10">
          {[40, 60, 45, 80, 110, 90, 140, 180, 140, 100, 70, 50].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t-sm animate-bar-grow"
              style={{
                backgroundColor: h > 120 ? '#ef4444' : h > 80 ? '#f59e0b' : '#3b82f6',
                height: `${(h/200)*100}%`,
                animationDelay: `${i * 50}ms`,
              }}
            />
          ))}
        </div>
        <div className="mt-6 flex justify-between w-full z-10 text-xs text-slate-400">
           <span>T+0h</span>
           <span>T+12h</span>
           <span>T+24h</span>
           <span>T+48h</span>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900/80 backdrop-blur-sm border border-slate-700 px-6 py-3 rounded-full text-white font-medium shadow-2xl z-20 flex items-center gap-2">
          <Activity className="w-4 h-4 text-red-400 animate-pulse" /> 模擬演算進行中...
        </div>
      </div>
    )
  },
  {
    title: 'Step 3: 獲取最佳防禦策略',
    desc: '推演結束後，您不只得到情緒報告，更會直接獲得：最佳發聲時機、推薦回應角度、應避開的雷區，以及自動生成的公關稿草案。',
    mockup: (
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 shadow-2xl h-full flex flex-col gap-4">
        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 flex gap-4">
          <CheckCircle2 className="w-6 h-6 text-green-400 shrink-0" />
          <div>
            <h4 className="text-green-400 font-medium text-sm mb-1">建議最佳發聲時間</h4>
            <p className="text-white text-lg font-bold">今晚 19:30 前 <span className="text-slate-400 text-sm font-normal ml-2">(可降低 68% 負面聲量擴散)</span></p>
          </div>
        </div>

        <div className="flex-1 bg-slate-800/50 rounded-lg border border-slate-700 p-4">
          <div className="flex items-center justify-between mb-4">
             <span className="text-sm font-medium text-slate-300">溝通切入點建議</span>
             <span className="text-xs text-blue-400 bg-blue-500/10 px-2 py-1 rounded">AI 信心度 94%</span>
          </div>
          <ul className="space-y-3 text-sm text-slate-400">
            <li className="flex gap-2 items-start"><span className="text-green-400">&#10003;</span> 承認硬體問題，但不提過熱，改稱「充電保護機制作動」</li>
            <li className="flex gap-2 items-start"><span className="text-green-400">&#10003;</span> 承諾無條件退換貨，建立負責任形象</li>
            <li className="flex gap-2 items-start"><span className="text-red-400">&#10007;</span> 切勿將問題推給使用者操作不當（模擬顯示此舉會引發炎上）</li>
          </ul>
        </div>

        <button className="w-full py-3 bg-white text-slate-900 font-medium rounded-lg hover:bg-slate-200 transition-colors flex items-center justify-center gap-2">
          <MessageSquare className="w-4 h-4" /> 產生公關聲明草案
        </button>
      </div>
    )
  }
];

function StepFlowSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const containerHeight = container.offsetHeight;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / (containerHeight - window.innerHeight)));

      if (progress < 0.33) setActiveStep(0);
      else if (progress < 0.66) setActiveStep(1);
      else setActiveStep(2);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={containerRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen w-full flex items-center py-20">
        <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left Text content */}
          <div className="space-y-12">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-12">
              PersonaCast 的解法
            </h2>

            <div className="space-y-16">
              {steps.map((step, i) => (
                <div
                   key={i}
                   className={cn(
                     "transition-all duration-500",
                     activeStep === i ? "opacity-100 translate-x-0" : "opacity-30 -translate-x-4"
                   )}
                >
                  <div className="text-blue-400 font-mono text-sm tracking-widest font-bold mb-3">{step.title.split(':')[0]}</div>
                  <h3 className="text-2xl font-bold text-white mb-4">{step.title.split(':')[1]}</h3>
                  <p className="text-slate-400 text-lg leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Mockup Display */}
          <div className="hidden lg:block h-[500px] w-full relative">
            {steps.map((step, i) => (
              <div
                key={i}
                className={cn(
                  "absolute inset-0 w-full h-full transition-all duration-500 ease-out",
                  activeStep === i
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-5 scale-95 pointer-events-none"
                )}
              >
                {step.mockup}
              </div>
            ))}

            {/* Background decorative glow */}
            <div className="absolute inset-0 bg-blue-500/10 blur-[100px] rounded-full -z-10" />
          </div>

        </div>
      </div>
    </section>
  );
}

// === Stats Section ===
function StatsSection() {
  return (
    <section className="py-24 border-t border-slate-800/50 bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-800">
          <div className="p-6">
            <div className="text-5xl font-extrabold text-white mb-2 tracking-tight">85<span className="text-blue-500">%</span></div>
            <div className="text-slate-400">平均縮短公關應對決策時間</div>
          </div>
          <div className="p-6">
            <div className="text-5xl font-extrabold text-white mb-2 tracking-tight">24<span className="text-blue-500">/7</span></div>
            <div className="text-slate-400">全天候 AI 潛在風險網路監控</div>
          </div>
          <div className="p-6">
            <div className="text-5xl font-extrabold text-white mb-2 tracking-tight">50<span className="text-blue-500">+</span></div>
            <div className="text-slate-400">跨國品牌與頂尖公關機構信任</div>
          </div>
        </div>

        <div className="mt-20 max-w-4xl mx-auto bg-slate-800/40 rounded-2xl p-8 md:p-12 border border-slate-700/50 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
          <svg className="w-10 h-10 text-slate-600 mx-auto mb-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
          <blockquote className="text-xl md:text-2xl text-slate-300 italic leading-relaxed mb-8">
            &ldquo;PersonaCast 讓我們在一場本可能毀滅品牌的危機中，提前 72 小時準備好了完美的回應策略。當新聞真的爆出來的那天，我們的聲明在 47 分鐘內上線。輿論從來沒有失控過。&rdquo;
          </blockquote>
          <div className="text-white font-medium">科技公司公關副總裁</div>
          <div className="text-sm text-slate-500">匿名受訪者 (財星 500 大企業)</div>
        </div>
      </div>
    </section>
  );
}

// === CTA Section ===
function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-blue-900/10" />
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-white mb-6">下一場危機不知何時到來。<br/>但您可以先準備好劇本。</h2>
        <p className="text-xl text-slate-400 mb-10">為您的品牌進行一次免費的「潛在公關風險健檢」。</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <GlowButton href="/contact" label="立即預約風險健檢 →" variant="primary" />
          <Link href="/resources/whitepapers" className="px-8 py-3.5 rounded-full text-slate-300 hover:text-white transition-colors border border-slate-700 hover:border-slate-500 bg-slate-800/50 backdrop-blur-md">
            下載公關危機防禦手冊
          </Link>
        </div>
      </div>
    </section>
  );
}

// === Utility for CSS Classes ===
function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

// === Main Page Export ===
export default function CrisisPRClient() {
  return (
    <div className="bg-[#0B0F19] min-h-screen font-sans selection:bg-blue-500/30">
      <style dangerouslySetInnerHTML={{__html: `
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }

        @keyframes float-up {
          0% { transform: translateY(0); opacity: 0; }
          10% { opacity: 0.5; }
          90% { opacity: 0.5; }
          100% { transform: translateY(var(--float-y, -80px)); opacity: 0; }
        }
        .animate-float-up {
          animation: float-up var(--duration, 6s) linear infinite;
        }

        @keyframes bar-grow {
          from { transform: scaleY(0); }
          to { transform: scaleY(1); }
        }
        .animate-bar-grow {
          transform-origin: bottom;
          animation: bar-grow 1s ease-out forwards;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-float-up,
          .animate-bar-grow {
            animation: none;
          }
        }
      `}} />
      <HeroSection />
      <PainPointsSection />
      <StepFlowSection />
      <StatsSection />
      <CTASection />
    </div>
  );
}
