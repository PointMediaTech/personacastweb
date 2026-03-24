'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { useInView, useReducedMotion, cssTransition } from '@/app/lib/animations';

/* ── Animated persona network canvas (left 60%) ── */
function PersonaNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);
  const visibleRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Use a mix of colors to represent different factions (e.g. red, blue, neutral)
    const NODES = Array.from({ length: 35 }, (_, i) => ({
      x: 0.08 + Math.random() * 0.84,
      y: 0.08 + Math.random() * 0.84,
      vx: (Math.random() - 0.5) * 0.0004,
      vy: (Math.random() - 0.5) * 0.0004,
      r: 2.5 + Math.random() * 4,
      faction: i < 5 ? 'critical' : i < 15 ? 'ally' : 'neutral',
      phase: Math.random() * Math.PI * 2,
    }));

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const io = new IntersectionObserver(([e]) => {
      visibleRef.current = e.isIntersecting;
      if (e.isIntersecting && !rafRef.current) rafRef.current = requestAnimationFrame(draw);
    }, { threshold: 0 });
    io.observe(canvas);

    let lastFrame = 0;
    function draw(ts: number) {
      if (!visibleRef.current || !canvas || !ctx) { rafRef.current = 0; return; }
      if (ts - lastFrame < 42) { rafRef.current = requestAnimationFrame(draw); return; }
      lastFrame = ts;
      const rect = canvas.getBoundingClientRect();
      const w = rect.width, h = rect.height, t = ts * 0.001;
      const dpr = window.devicePixelRatio || 1;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      if (!reduced) {
        for (const n of NODES) {
          n.x += n.vx; n.y += n.vy;
          if (n.x < 0.05 || n.x > 0.95) n.vx *= -1;
          if (n.y < 0.05 || n.y > 0.95) n.vy *= -1;
        }
      }

      for (let i = 0; i < NODES.length; i++) {
        for (let j = i + 1; j < NODES.length; j++) {
          const a = NODES[i], b = NODES[j];
          const dx = (a.x - b.x) * w, dy = (a.y - b.y) * h;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            const alpha = (1 - dist / 140) * 0.3;
            ctx.beginPath();
            ctx.moveTo(a.x * w, a.y * h);
            ctx.lineTo(b.x * w, b.y * h);
            
            // Red lines if both critical, else standard blue/gray
            let strokeColor = `rgba(118,158,219,${alpha * 0.7})`;
            if (a.faction === 'critical' || b.faction === 'critical') {
              strokeColor = `rgba(255,74,74,${alpha})`; // red warning mesh
            }
            
            ctx.strokeStyle = strokeColor;
            ctx.lineWidth = a.faction === 'critical' && b.faction === 'critical' ? 1.2 : 0.6;
            ctx.stroke();
          }
        }
      }

      for (const n of NODES) {
        const pulse = 0.5 + Math.sin(t * (n.faction === 'critical' ? 3 : 1.5) + n.phase) * 0.5;
        const px = n.x * w, py = n.y * h, r = n.r * (0.8 + pulse * 0.2);
        
        let rgb = '118,158,219'; // default blue
        if (n.faction === 'critical') rgb = '255,74,74'; // red
        if (n.faction === 'ally') rgb = '0,242,255'; // neon cyan
        
        ctx.beginPath(); ctx.arc(px, py, r + (n.faction === 'critical' ? 8 : 4), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb},${pulse * (n.faction === 'critical' ? 0.15 : 0.08)})`; ctx.fill();
        ctx.beginPath(); ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb},${0.4 + pulse * 0.4})`; ctx.fill();
      }

      if (!reduced) rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(rafRef.current); rafRef.current = 0;
      io.disconnect(); window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-80 mix-blend-screen" style={{ pointerEvents: 'none' }} aria-hidden="true" />;
}

/* ── Mini glowing graph for top right panel ── */
function MiniGraph() {
  const reduced = useReducedMotion();
  // We represent two clusters: Top-Left (Echo Chamber A) vs Bottom-Right (Echo Chamber B)
  const nodes = [
    { cx: 25, cy: 30, r: 8, color: '#FF4A4A', label: '激進反對派' },
    { cx: 35, cy: 20, r: 4, color: '#FF4A4A' },
    { cx: 15, cy: 45, r: 5, color: '#FF4A4A' },
    
    { cx: 75, cy: 70, r: 9, color: '#00F2FF', label: '死忠基本盤' },
    { cx: 85, cy: 85, r: 5, color: '#00F2FF' },
    { cx: 65, cy: 80, r: 4, color: '#00F2FF' },
    
    { cx: 50, cy: 50, r: 12, color: '#A3B8A0', label: '關鍵中立 KOL' }, // Bridge node
    { cx: 45, cy: 65, r: 3, color: 'rgba(255,255,255,0.4)' },
    { cx: 60, cy: 35, r: 3, color: 'rgba(255,255,255,0.4)' },
  ];
  const edges = [
    [0,1],[0,2], // Red cluster
    [3,4],[3,5], // Cyan cluster
    [0,6],[3,6],[0,8],[3,7],[6,7],[6,8], // Bridge connections (Neutral connects to both)
  ];

  return (
    <div className="relative w-full h-full">
      <svg viewBox="0 0 100 100" className="w-full h-full absolute inset-0" aria-hidden="true" style={{ overflow: 'visible' }}>
        <defs>
          <filter id="miniGlowGraph">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {edges.map(([a, b], i) => (
          <line
            key={`e-${i}`}
            x1={nodes[a].cx} y1={nodes[a].cy}
            x2={nodes[b].cx} y2={nodes[b].cy}
            stroke="rgba(255,255,255,0.15)" strokeWidth="0.5"
            strokeDasharray={nodes[a].color === '#A3B8A0' || nodes[b].color === '#A3B8A0' ? '1 1' : 'none'}
          />
        ))}

        {nodes.map((n, i) => (
          <g key={`n-${i}`}>
            <circle
              cx={n.cx} cy={n.cy} r={n.r}
              fill={n.color}
              filter="url(#miniGlowGraph)"
              style={{
                animation: reduced ? 'none' : `miniPulse ${2 + i * 0.4}s ease-in-out infinite alternate`,
              }}
            />
            {n.label && (
              <text x={n.cx + n.r + 2} y={n.cy + 1} fill="rgba(255,255,255,0.8)" fontSize="4" fontFamily="monospace" fontWeight="bold">
                {n.label}
              </text>
            )}
          </g>
        ))}
      </svg>
      
      {/* Target scope overlay */}
      <div className="absolute top-[40%] left-[40%] w-[20%] h-[20%] border border-[#A3B8A0]/50 rounded-full animate-[ping_4s_ease-in-out_infinite]" />
    </div>
  );
}

/* ── Main export ── */
export function BentoTech() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { margin: '-60px' });
  const reduced = useReducedMotion();
  const [hoverPos, setHoverPos] = useState<{ x: number; y: number } | null>(null);

  const titleReveal = reduced
    ? {} : {
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(20px)',
        transition: cssTransition(['opacity', 'transform'], 0.7, 0),
      };

  const cardReveal = (delay: number) =>
    reduced ? {} : {
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : 'translateY(20px)',
      transition: cssTransition(['opacity', 'transform'], 0.6, delay),
    };

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setHoverPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  return (
    <section ref={sectionRef} className="py-28 lg:py-36 px-6 relative">
      {/* Background glow for the section */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00F2FF]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Title */}
        <div className="text-center mb-20" style={titleReveal}>
          <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 mb-6 backdrop-blur-sm">
            <span className="text-sm font-mono text-[#E2E8F0] tracking-widest">
              FOR PR MANAGERS & STRATEGISTS
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            公關操盤手的秘密武器
          </h2>
          <p className="mt-7 text-lg lg:text-xl text-[#F8FAFC]/80 max-w-3xl mx-auto leading-relaxed">
            當別人還在疲於「事後滅火」，您已經在 PersonaCast 跑過了一萬次「未來局勢」。從被動防守，進化為掌控全局的風向工程師。
          </p>
        </div>

        {/* 60/40 Asymmetric Bento */}
        <div
          className="relative grid grid-cols-1 lg:grid-cols-5 gap-5 lg:gap-6 rounded-3xl"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoverPos(null)}
        >
          {/* ── Left 60%: 沙盤推演危機防護網 ── */}
          <div
            className="relative lg:col-span-3 min-h-[460px] rounded-3xl overflow-hidden group border border-white/10 bg-slate-950/80 backdrop-blur-xl"
            style={{
              ...cardReveal(0),
              boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.05)',
            }}
          >
            <PersonaNetwork />
            
            {/* Live Status Overlay */}
            <div className="absolute top-6 right-6 px-3 py-1.5 rounded-full border border-[#FF4A4A]/40 bg-[#FF4A4A]/10 text-xs font-mono text-[#FF4A4A] flex items-center gap-2 backdrop-blur-md shadow-[0_0_15px_rgba(255,74,74,0.15)] z-20">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF4A4A] shadow-[0_0_5px_#FF4A4A] animate-pulse"></span>
              CRITICAL RISK DETECTED
            </div>

            {/* Spotlight glow */}
            {hoverPos && (
              <div
                className="absolute pointer-events-none transition-opacity duration-300"
                style={{
                  left: hoverPos.x - 250, top: hoverPos.y - 250,
                  width: 500, height: 500,
                  background: 'radial-gradient(circle, rgba(255,74,74,0.08) 0%, transparent 70%)',
                }}
              />
            )}

            {/* Content overlay */}
            <div className="absolute inset-x-0 bottom-0 z-10 p-8 lg:p-12">
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(to top, rgba(2,6,23,0.98) 20%, rgba(2,6,23,0.6) 60%, transparent 100%)' }}
              />
              <div className="relative">
                <p className="font-mono text-[11px] text-[#FF4A4A] uppercase tracking-widest mb-3 font-bold">
                  Crisis War-gaming
                </p>
                <h3 className="text-3xl lg:text-4xl font-bold text-white tracking-tight mb-5 flex items-center">
                  <span className="text-[#FF4A4A] mr-3 text-2xl">●</span>
                  沙盤推演危機防護網
                </h3>
                <p className="text-base lg:text-lg text-[#F8FAFC]/70 leading-relaxed max-w-xl">
                  在把敏感聲明稿發佈給百萬粉絲前，先交給系統進行十萬次壓力測試。成千上萬名具備真實政治傾向、年齡與價值的虛擬網民，將對您的文案進行「炎上攻擊」，讓您提前預判公關災難與完美回擊點。
                </p>
              </div>
            </div>

            {/* Hover border glow */}
            <div
              className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ border: '1px solid rgba(255,74,74,0.4)', boxShadow: 'inset 0 0 40px rgba(255,74,74,0.1)' }}
            />
          </div>

          {/* ── Right 40%: stacked ── */}
          <div className="lg:col-span-2 flex flex-col gap-5 lg:gap-6">
            
            {/* Top Right: 同溫層與斷裂線解碼 */}
            <div
              className="relative flex-1 min-h-[220px] rounded-3xl overflow-hidden group border border-white/10 bg-slate-950/80 backdrop-blur-xl"
              style={{
                ...cardReveal(0.12),
                boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.05)',
              }}
            >
              {/* Glowing mini graph fills the top section */}
              <div className="absolute -top-10 -right-10 w-full h-[150%] opacity-50 group-hover:opacity-80 transition-opacity duration-500 pointer-events-none">
                <MiniGraph />
              </div>

              {/* Bottom label & Text */}
              <div className="absolute inset-x-0 bottom-0 z-10 p-7 lg:p-8">
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(to top, rgba(2,6,23,0.95) 40%, rgba(2,6,23,0.4) 80%, transparent 100%)' }}
                />
                <div className="relative">
                  <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-2">Echo Chamber Decoder</p>
                  <h3 className="text-xl lg:text-2xl font-bold text-white tracking-tight mb-2">
                    同溫層與斷裂線解碼
                  </h3>
                  <p className="text-sm lg:text-md text-[#F8FAFC]/60 leading-relaxed">
                    公眾輿論沒有「平均值」。系統為您自動描出死忠鐵粉、激進反對派與沉默多數的拓撲圖，一眼看穿是誰在帶風向，以及哪裡是能夠被說服的「遊離票」。
                  </p>
                </div>
              </div>

              <div
                className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ border: '1px solid rgba(0,242,255,0.3)', boxShadow: 'inset 0 0 20px rgba(0,242,255,0.05)' }}
              />
            </div>

            {/* Bottom Right: 高精度風向工程 */}
            <div
              className="relative flex-1 min-h-[220px] rounded-3xl overflow-hidden group border border-white/10 bg-slate-950/80 backdrop-blur-xl"
              style={{
                ...cardReveal(0.24),
                boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.05)',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#00F2FF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="p-7 lg:p-8 h-full flex flex-col justify-between relative z-10">
                <div>
                  <p className="font-mono text-[10px] text-[#00F2FF]/60 uppercase tracking-widest mb-2">Precision Narrative Engineering</p>
                  <h3 className="text-xl lg:text-2xl font-bold text-white tracking-tight mb-3">
                    演算級的風向工程
                  </h3>
                  <p className="text-sm lg:text-md text-[#F8FAFC]/60 leading-relaxed">
                    不再訴諸直覺與運氣。演算出不同切入點的蝴蝶效應，用數學公式計算您的政治籌碼。
                  </p>
                </div>

                {/* Mock UI for sentiment shifts */}
                <div className="mt-6 space-y-2.5 font-mono text-sm">
                  <div className="flex justify-between items-center px-4 py-2.5 rounded-xl bg-black/50 border border-white/5 shadow-inner">
                    <span className="text-white/70 tracking-tight">「強調核心價值」路徑</span>
                    <span className="text-[#00F2FF] font-bold">Z世代支持度 ▲ +14.2%</span>
                  </div>
                  <div className="flex justify-between items-center px-4 py-2.5 rounded-xl bg-black/50 border border-white/5 shadow-inner">
                    <span className="text-white/70 tracking-tight">「反擊對手」路徑</span>
                    <span className="text-[#FF4A4A] font-bold">中間派好感度 ▼ -8.7%</span>
                  </div>
                </div>
              </div>

              <div
                className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ border: '1px solid rgba(0,242,255,0.3)' }}
              />
            </div>
            
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes miniPulse {
          from { opacity: 0.6; r: inherit; box-shadow: 0 0 0px currentColor; }
          to { opacity: 1; filter: brightness(1.3); }
        }
      `}</style>
    </section>
  );
}
