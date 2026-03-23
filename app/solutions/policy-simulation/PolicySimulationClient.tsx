'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { GlowButton } from '@/app/components/shared/GlowButton';
import { Users, FileSearch, TrendingUp, ArrowRight, Play, CheckCircle2, AlertOctagon, Network, Cpu, MessageSquareWarning } from 'lucide-react';
import Link from 'next/link';

// === Hero Section ===
function HeroSection() {
  const [nodes, setNodes] = useState<Array<{ w: number, h: number, top: number, left: number, delay: number, dur: number }>>([]);

  useEffect(() => {
    // Generate random nodes representing "social networks"
    setNodes([...Array(30)].map(() => ({
      w: Math.random() * 4 + 2,
      h: Math.random() * 4 + 2,
      top: Math.random() * 100,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      dur: Math.random() * 3 + 4,
    })));
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-24 pb-16">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-cyan-900/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
        <div className="absolute bottom-1/4 -right-1/4 w-[800px] h-[600px] bg-blue-900/20 rounded-full blur-[150px] mix-blend-screen" />
        
        {/* Abstract Network Nodes */}
        {nodes.map((n, i) => (
          <motion.div
            key={i}
            className="absolute bg-cyan-400/30 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.5)]"
            style={{
              width: n.w,
              height: n.h,
              top: `${n.top}%`,
              left: `${n.left}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: n.dur,
              delay: n.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Connecting Lines Representation */}
        <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none">
          <pattern id="networkGrid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-cyan-900/40" />
            <circle cx="0" cy="0" r="1.5" className="fill-cyan-500/50" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#networkGrid)" />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-8 backdrop-blur-md"
        >
          <Network className="w-4 h-4 animate-pulse" />
          國家級社會演算法 3.0
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-8 leading-tight max-w-5xl mx-auto font-heading"
        >
          政策不該是盲測。<br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">
            讓 AI 為您推演真實社會的百萬種反應。
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed"
        >
          告別同溫層偏差與事後滅火。PersonaCast 政策模擬引擎，協助決策者在政策發布前，精準預測各階層群體反彈，提前化解阻力，凝聚社會共識。
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {/* Note: In a real component, replace the arbitrary style variant with matching cyan via GlowButton or explicit Tailwind. We will use a standard variant but customized. */}
          <GlowButton href="/contact" label="預約政策沙盤推演 →" variant="primary" />
          <Link
            href="#demo"
            className="flex items-center gap-2 px-8 py-3.5 rounded-full text-slate-300 hover:text-white transition-colors border border-slate-700 hover:border-slate-500 bg-slate-800/50 backdrop-blur-md"
          >
            <Play className="w-4 h-4" />
            觀看系統操作示範
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// === Pain Points Section ===
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
];

function PainPointCard({ point, index }: { point: typeof painPoints[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = point.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative h-[280px] rounded-2xl cursor-pointer group perspective-1000"
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
        <div className="absolute inset-0 backface-hidden w-full h-full rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-900/40 to-slate-900/80 backdrop-blur-md p-8 rotate-y-180 flex flex-col justify-between shadow-[0_0_30px_rgba(34,211,238,0.1)]">
          <div>
            <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 mb-6 shadow-[0_0_15px_rgba(34,211,238,0.3)]">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{point.after.title}</h3>
            <p className="text-cyan-100/80 leading-relaxed text-sm">{point.after.desc}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function PainPointsSection() {
  return (
    <section className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">為何多數政策一上路就觸礁？</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">因為人類的經驗無法處理百萬級的社會變數，但 PersonaCast 的演算法可以。</p>
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
    title: 'Step 1: 匯入草案與設定變數',
    desc: '直接輸入法規草稿、政策聲明稿，並定義實施對象與情境變數。系統將自動梳理潛在影響圈。',
    mockup: (
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 shadow-2xl h-full flex flex-col">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
          <div className="w-3 h-3 rounded-full bg-slate-700" />
          <div className="w-3 h-3 rounded-full bg-slate-700" />
          <div className="w-3 h-3 rounded-full bg-slate-700" />
          <span className="text-sm text-slate-400 ml-2">政策草案分析台</span>
        </div>
        <div className="space-y-4 flex-1">
          <div className="p-4 bg-slate-800 rounded-lg w-full text-slate-400 text-sm leading-relaxed border border-slate-700 shadow-inner">
            <span className="text-blue-400"># 能源轉型附加費草案</span>
            <br/><br/>
            為加速綠電發展，擬於下半年度針對每月用電量超過 1000 度的家戶級微型企業，開徵 5% 綠能附加費...
          </div>
          <div className="flex gap-4">
            <div className="h-8 bg-cyan-900/30 text-cyan-400 border border-cyan-500/30 rounded-full px-4 flex items-center text-xs">目標對象：微型企業、高用電戶</div>
            <div className="h-8 bg-slate-800 rounded-full px-4 flex items-center text-xs text-slate-300">變數：通貨膨脹預期</div>
          </div>
        </div>
      </div>
    )
  },
  {
    title: 'Step 2: 啟動社會節點碰撞模擬',
    desc: '系統將草案投放至 100,000+ 個具備不同政黨傾向、職涯背景的虛擬人格網絡中，觀察真實的社群共振現象。',
    mockup: (
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 shadow-2xl h-full flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        
        {/* Node Animation Mockup */}
        <div className="relative w-full h-full flex items-center justify-center z-10">
          <div className="absolute top-1/2 left-1/4 w-32 h-32 -translate-y-1/2 rounded-full border border-red-500/30 bg-red-500/10 flex items-center justify-center">
            <div className="text-center">
              <div className="text-red-400 font-bold text-lg">45%</div>
              <div className="text-slate-400 text-[10px]">強烈反彈 (微型企業)</div>
            </div>
          </div>
          <div className="absolute top-1/2 right-1/4 w-24 h-24 -translate-y-1/2 rounded-full border border-emerald-500/30 bg-emerald-500/10 flex items-center justify-center">
             <div className="text-center">
              <div className="text-emerald-400 font-bold text-sm">32%</div>
              <div className="text-slate-400 text-[10px]">表態支持 (環保團體)</div>
            </div>
          </div>
          {/* Connecting data lines */}
          <div className="absolute top-1/2 left-1/2 w-1/4 h-[1px] bg-gradient-to-r from-red-500/50 to-emerald-500/50 -translate-x-1/2 -translate-y-1/2 relative overflow-hidden">
            <div className="w-1/2 h-full bg-white opacity-50 shadow-[0_0_10px_#fff] absolute animate-[slideNetwork_1.5s_infinite]" />
          </div>
        </div>
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes slideNetwork {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(200%); }
          }
        `}} />
      </div>
    )
  },
  {
    title: 'Step 3: 獲取風險報告與優化建議',
    desc: '精確指出最容易引發爭議的條文，並提供 AI 改寫草稿與配套策略建議，助您將政策阻力降到最低。',
    mockup: (
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 shadow-2xl h-full flex flex-col gap-4 relative overflow-hidden">
        <div className="bg-teal-500/10 border border-teal-500/20 rounded-lg p-4 flex gap-4">
          <CheckCircle2 className="w-6 h-6 text-teal-400 shrink-0" />
          <div>
            <h4 className="text-teal-400 font-medium text-sm mb-1">最佳修正策略</h4>
            <p className="text-white text-lg font-bold">新增「節能補助過渡期」條款 <span className="text-slate-400 text-sm font-normal ml-2">(可降低 82% 企業端阻力)</span></p>
          </div>
        </div>
        
        <div className="flex-1 bg-slate-800/50 rounded-lg border border-slate-700 p-4">
          <div className="flex items-center justify-between mb-4">
             <span className="text-sm font-medium text-slate-300">🔍 措辭風險糾正</span>
          </div>
          <div className="space-y-3 text-sm text-slate-400 bg-slate-900 rounded p-3 font-mono leading-relaxed border border-slate-700/50">
            針對每月用電量超過 1000 度的<span className="bg-red-500/20 text-red-300 underline underline-offset-2">家戶級微型企業</span>，<span className="bg-red-500/20 text-red-300 underline underline-offset-2">開徵</span> 5% 綠能附加費。
          </div>
          <div className="mt-2 text-xs text-teal-400 flex items-center gap-1">
             <ArrowRight className="w-3 h-3" /> 建議改為：「針對高耗表燈營業用戶，逐步實施綠能轉型代金」以降低被剝奪感。
          </div>
        </div>
      </div>
    )
  }
];

function StepFlowSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      if (latest < 0.33) setActiveStep(0);
      else if (latest < 0.66) setActiveStep(1);
      else setActiveStep(2);
    });
  }, [scrollYProgress]);

  return (
    <section ref={containerRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen w-full flex items-center py-20">
        <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Text content */}
          <div className="space-y-12">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-12">
              化無形民意為具體數據
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
                  <div className="text-cyan-400 font-mono text-sm tracking-widest font-bold mb-3">{step.title.split(':')[0]}</div>
                  <h3 className="text-2xl font-bold text-white mb-4">{step.title.split(':')[1]}</h3>
                  <p className="text-slate-400 text-lg leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Mockup Display */}
          <div className="hidden lg:block h-[500px] w-full relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute inset-0 w-full h-full"
              >
                {steps[activeStep].mockup}
              </motion.div>
            </AnimatePresence>
            
            <div className="absolute inset-0 bg-cyan-500/5 blur-[100px] rounded-full -z-10" />
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
            <div className="text-5xl font-extrabold text-white mb-2 tracking-tight">1.2<span className="text-cyan-500">M+</span></div>
            <div className="text-slate-400">內建虛擬國民主態節點</div>
          </div>
          <div className="p-6">
            <div className="text-5xl font-extrabold text-white mb-2 tracking-tight">92<span className="text-cyan-500">%</span></div>
            <div className="text-slate-400">社會反彈預測準確率</div>
          </div>
          <div className="p-6">
            <div className="text-5xl font-extrabold text-white mb-2 tracking-tight">200<span className="text-cyan-500">+</span></div>
            <div className="text-slate-400">涵蓋法案與生活情境參數庫</div>
          </div>
        </div>
        
        <div className="mt-20 max-w-4xl mx-auto bg-slate-800/40 rounded-2xl p-8 md:p-12 border border-slate-700/50 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
          <p className="text-xl md:text-2xl text-slate-300 italic leading-relaxed mb-8">
            "在推動重大年金改革前，PersonaCast 的沙盤推演精準指出了核心反彈群體不是被砍福利的人，而是預期將面臨通貨膨脹的夾心階層。我們依此調整了宣傳側重點，成功讓法案在一讀通過時阻力減少了七成。"
          </p>
          <div className="text-white font-medium">中央決策幕僚長</div>
          <div className="text-sm text-slate-500">公共政策智庫機構</div>
        </div>
      </div>
    </section>
  );
}

// === CTA Section ===
function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-slate-900" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-cyan-900/20 blur-[150px] rounded-full" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-white mb-6">好的政策，不該死在溝通失誤上。</h2>
        <p className="text-xl text-slate-400 mb-10">為您的下一個重大提案進行全面的壓力測試。</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <GlowButton href="/contact" label="申請政策沙盤推演 →" variant="primary" />
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
export default function PolicySimulationClient() {
  return (
    <div className="bg-[#0B0F19] min-h-screen font-sans selection:bg-cyan-500/30">
      <style dangerouslySetInnerHTML={{__html: `
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}} />
      <HeroSection />
      <PainPointsSection />
      <StepFlowSection />
      <StatsSection />
      <CTASection />
    </div>
  );
}
