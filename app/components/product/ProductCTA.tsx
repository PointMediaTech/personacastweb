'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { useInView, useReducedMotion, cssTransition } from '@/app/lib/animations';

/* ── Military-grade Radar Background ── */
function RadarBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    let rafId: number;
    let angle = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    // Particles representing "public opinion points"
    const particles = Array.from({ length: 60 }, () => ({
      r: Math.random() * 300 + 50, // spread across radar
      theta: Math.random() * Math.PI * 2,
      speed: (Math.random() - 0.5) * 0.005,
      size: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.5 + 0.2,
      isRisk: Math.random() > 0.85 // 15% are red risks
    }));

    function draw() {
      if (!canvas || !ctx) return;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      const cx = w / 2;
      const cy = h / 2;

      ctx.clearRect(0, 0, w, h);

      // Draw faint grid rings
      ctx.strokeStyle = 'rgba(0, 242, 255, 0.04)';
      ctx.lineWidth = 1;
      for (let i = 1; i <= 6; i++) {
        ctx.beginPath();
        ctx.arc(cx, cy, i * 100, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Draw dashed crosshairs
      ctx.setLineDash([4, 15]);
      ctx.beginPath();
      ctx.moveTo(cx, 0); ctx.lineTo(cx, h);
      ctx.moveTo(0, cy); ctx.lineTo(w, cy);
      ctx.stroke();
      ctx.setLineDash([]); // reset

      // Draw particles
      particles.forEach(p => {
        p.theta += p.speed;
        const x = cx + p.r * Math.cos(p.theta);
        const y = cy + p.r * Math.sin(p.theta);
        
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        
        // Intensity spikes when the radar sweep passes over it
        let diff = angle - p.theta;
        // Normalize diff to 0 - 2PI
        diff = ((diff % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
        
        // Sweep trail is behind the angle (so diff between 0 and PI)
        let intensity = p.alpha * 0.3; // base opacity
        if (diff < 0.35) {
          intensity = 1.0; // bright flash
        } else if (diff < 1.0) {
          intensity = 1.0 - (diff / 1.0); // fade out
        }

        const color = p.isRisk ? `255, 74, 74` : `0, 242, 255`;
        ctx.fillStyle = `rgba(${color}, ${intensity})`;
        ctx.fill();

        // Add a faint glow aura to bright objects
        if (intensity > 0.7) {
          ctx.beginPath();
          ctx.arc(x, y, p.size * 4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${color}, ${intensity * 0.2})`;
          ctx.fill();
        }
      });

      // Draw radar sweep
      angle -= 0.015; // counter-clockwise rotation

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);
      
      // Conic gradient for the sweeping beam
      const sweepGradient = ctx.createConicGradient(0, 0, 0);
      sweepGradient.addColorStop(0, 'rgba(0, 242, 255, 0.15)'); // Leading edge
      sweepGradient.addColorStop(0.08, 'rgba(0, 242, 255, 0)'); // Fade out
      sweepGradient.addColorStop(1, 'rgba(0, 242, 255, 0)');
      
      ctx.fillStyle = sweepGradient;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, Math.max(w, h), 0, Math.PI * 2);
      ctx.fill();
      
      // Leading solid edge of the sweep
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(Math.max(w, h), 0);
      ctx.strokeStyle = 'rgba(0, 242, 255, 0.4)';
      ctx.lineWidth = 1;
      ctx.stroke();
      
      ctx.restore();

      rafId = requestAnimationFrame(draw);
    }
    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <canvas ref={canvasRef} className="w-full h-full opacity-60 mix-blend-screen" />
      {/* Vignette to fade out edges */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(circle, transparent 30%, #020617 80%)' }} />
    </div>
  );
}

/* ── Live Ticker Strip ── */
function TickerTape() {
  const reduced = useReducedMotion();
  const messages = [
    "SYS.OP: INITIATING CRISIS PROTOCOL",
    "WARN: SENTIMENT SHIFT DETECTED IN SECTOR 7",
    "CALC: CONFIDENCE INDEX AT 89.4%",
    "NODE: 347 ACTIVE PERSONAS ENGAGED",
    "TARGET: NARRATIVE TRAJECTORY STABILIZED",
    "ALERT: ANOMALY IN DEMOGRAPHIC CLUSTER B",
  ];

  return (
    <div className="absolute inset-x-0 bottom-0 overflow-hidden flex whitespace-nowrap opacity-30 pointer-events-none border-t border-white/5 bg-[#00F2FF]/5 py-2 z-10 hidden md:flex">
      <div 
        className="inline-block text-[10px] font-mono tracking-[0.2em] text-[#00F2FF]"
        style={{ animation: reduced ? 'none' : 'ticker 40s linear infinite' }}
      >
        {messages.concat(messages).map((m, i) => (
          <span key={i} className="mx-8 font-bold">{m}</span>
        ))}
        {/* Triple concat for seamless loop */}
        {messages.concat(messages).map((m, i) => (
          <span key={`dup-${i}`} className="mx-8 font-bold">{m}</span>
        ))}
      </div>
      <style jsx>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

/**
 * Immersive full-width closing CTA with deep gradient,
 * radar canvas, and high-tech typography.
 */
export function ProductCTA() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { margin: '-60px' });
  const reduced = useReducedMotion();

  const reveal = (delay: number) =>
    reduced
      ? {}
      : {
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(30px)',
          transition: cssTransition(['opacity', 'transform'], 0.9, delay),
        };

  return (
    <section
      ref={ref}
      className="relative py-36 lg:py-52 overflow-hidden bg-slate-950"
    >
      {/* Deep gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at center, #0B162C 0%, #020617 60%)',
        }}
      />
      
      {/* Interactive Radar Background */}
      <RadarBackground />
      <TickerTape />

      {/* Ambient core glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vh] opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0,242,255,0.4) 0%, transparent 70%)',
          filter: 'blur(60px)'
        }}
      />

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
        <div style={reveal(0)}>
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#00F2FF]/30 bg-[#00F2FF]/10 backdrop-blur-md mb-8 shadow-[0_0_15px_rgba(0,242,255,0.15)]">
            <span className="w-2 h-2 rounded-full bg-[#00F2FF] shadow-[0_0_8px_#00F2FF] animate-pulse"></span>
            <span className="text-xs font-mono text-[#00F2FF] tracking-widest uppercase font-bold">
              System Ready For Deployment
            </span>
          </div>
        </div>

        <h2
          className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/40 tracking-tighter leading-[1.1] pb-2"
          style={reveal(0.1)}
        >
          準備好預見未來的
          <br />
          <span className="relative inline-block mt-2">
            輿論風暴了嗎？
            <span className="absolute inset-0 bg-[#00F2FF]/20 blur-3xl -z-10 mix-blend-screen"></span>
          </span>
        </h2>

        <p
          className="mt-8 text-lg md:text-xl text-[#F8FAFC]/70 max-w-2xl mx-auto font-medium leading-relaxed"
          style={reveal(0.2)}
        >
          不用再靠直覺下注。與我們的團隊預約一對一演示，親眼見證 PersonaCast 如何實時解構每一次網民情緒的裂變，為您的組織建立軍事級的輿情防護網。
        </p>

        <div className="mt-14" style={reveal(0.3)}>
          <div className="relative inline-block group cursor-pointer">
            {/* Outer glowing border transition */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#00F2FF] to-[#769EDB] rounded-2xl blur-lg opacity-30 group-hover:opacity-100 group-hover:blur-xl transition duration-500"></div>
            
            <Link
              href="/contact"
              className="relative inline-flex items-center justify-center px-10 py-5 bg-slate-950/80 backdrop-blur-xl rounded-xl font-bold text-white text-lg tracking-wide border border-[#00F2FF]/30 group-hover:border-[#00F2FF]/80 group-hover:bg-slate-900 transition-all overflow-hidden"
              style={{ boxShadow: 'var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), inset 0 0 15px rgba(0,242,255,0.1)' }}
            >
              <span className="relative z-10 flex items-center gap-3">
                <span className="text-[#00F2FF] tracking-widest text-sm font-mono mr-1">['RUN_DEMO']</span>
                啟動預測引擎 
                <span className="font-mono text-[#00F2FF] opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all">-&gt;</span>
              </span>
              
              {/* Scanline hover effect layer */}
              <div className="absolute inset-0 w-full h-[200%] bg-gradient-to-b from-transparent via-[#00F2FF]/10 to-transparent -translate-y-full group-hover:animate-[scan_2s_linear_infinite] pointer-events-none"></div>
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(50%); }
        }
      `}</style>
    </section>
  );
}
