import Link from 'next/link';

export function NebulaHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ backgroundColor: '#03050C' }}>
      {/* ── Custom CSS Definitions ── */}
      <style suppressHydrationWarning>{`
        @keyframes custom-float {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
          33% { transform: translate(4vw, -6vh) scale(1.1); opacity: 0.5; }
          66% { transform: translate(-3vw, 3vh) scale(0.95); opacity: 0.4; }
        }
        @keyframes custom-float-reverse {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.2; }
          33% { transform: translate(-5vw, 5vh) scale(1.15); opacity: 0.45; }
          66% { transform: translate(2vw, -2vh) scale(0.85); opacity: 0.3; }
        }
        .anim-float { animation: custom-float 22s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
        .anim-float-rev { animation: custom-float-reverse 26s cubic-bezier(0.4, 0, 0.2, 1) infinite; }

        .text-neon-glow {
          text-shadow: 0 0 40px rgba(0, 242, 255, 0.25), 0 0 80px rgba(118, 158, 219, 0.15);
        }

        .text-gradient-bg {
          background: linear-gradient(135deg, #FFFFFF 0%, #D8E4F8 40%, #00F2FF 80%, #769EDB 100%);
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          -webkit-text-fill-color: transparent;
        }

        @media (prefers-reduced-motion: reduce) {
          .anim-float, .anim-float-rev { animation: none; }
        }
      `}</style>

      {/* ── Deep Nebula Background Layer ── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">

        {/* Core center ambiance glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[1000px] max-h-[1000px] rounded-full blur-[140px] opacity-50 mix-blend-screen"
          style={{
            background: 'radial-gradient(circle, rgba(29, 78, 216, 0.15) 0%, rgba(3, 5, 12, 0) 70%)',
          }}
        />

        {/* Floating Flowing Orbs */}
        <div
          className="absolute top-[10%] left-[10%] w-[45vw] h-[45vw] max-w-[600px] max-h-[600px] rounded-full blur-[120px] mix-blend-screen anim-float"
          style={{ background: 'radial-gradient(circle, rgba(0, 242, 255, 0.12) 0%, rgba(3, 5, 12, 0) 70%)' }}
        />
        <div
          className="absolute bottom-[5%] right-[5%] w-[50vw] h-[50vw] max-w-[800px] max-h-[800px] rounded-full blur-[130px] mix-blend-screen anim-float-rev"
          style={{ background: 'radial-gradient(circle, rgba(118, 158, 219, 0.15) 0%, rgba(3, 5, 12, 0) 70%)' }}
        />

        {/* Subtle noise texture overlay for organic feel */}
        <div
          className="absolute inset-0 opacity-[0.025] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: '160px 160px',
          }}
        />

        {/* Dynamic Grid Floor/Background */}
        <div
          className="absolute inset-0 opacity-40 mix-blend-screen"
          style={{
            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
            backgroundPosition: 'center center',
            maskImage: 'radial-gradient(ellipse 70% 80% at 50% 50%, black 15%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(ellipse 70% 80% at 50% 50%, black 15%, transparent 70%)',
          }}
        ></div>
      </div>

      {/* ── Main Hero Content ── */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto flex flex-col items-center justify-center">

        {/* Advanced Badge Component */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full mb-8 border border-white/5 bg-white/5 backdrop-blur-xl shadow-[0_0_30px_rgba(0,242,255,0.08)] hover:bg-white/10 hover:border-white/10 hover:shadow-[0_0_30px_rgba(0,242,255,0.15)] cursor-default overflow-hidden relative group transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00F2FF]/20 to-transparent translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out"></div>

          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F2FF] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00F2FF] shadow-[0_0_8px_#00F2FF]"></span>
          </span>
          <span className="text-[13px] font-semibold tracking-widest text-slate-300 uppercase relative">
            PersonaCast Advanced
          </span>
        </div>

        {/* Hero Headline */}
        <h1 className="font-heading leading-[1.05] flex flex-col items-center gap-2 select-none">
          <span className="block text-5xl sm:text-7xl md:text-8xl lg:text-[110px] xl:text-[130px] font-black tracking-[-0.04em] text-white drop-shadow-2xl">
            AI 輿情推演
          </span>
          <span className="block text-4xl sm:text-6xl md:text-7xl lg:text-[90px] xl:text-[110px] font-bold pb-4 text-neon-glow tracking-[-0.02em] text-gradient-bg">
            五步到位
          </span>
        </h1>

        <p className="mt-6 md:mt-8 text-lg sm:text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto text-slate-400 font-light tracking-wide drop-shadow-sm">
          從議題注入到策略資產，PersonaCast 將不可預測的輿論場，
          <br className="hidden md:block" />
          無縫轉化為您的戰略模擬沙盤。
        </p>

        {/* ── Premium High-End CTAs ── */}
        <div className="mt-12 md:mt-16 flex flex-col sm:flex-row items-center gap-6 sm:gap-8 justify-center w-full">

          {/* Primary Glow Neon Button */}
          <Link
            href="/contact"
            className="group relative inline-flex items-center justify-center min-w-[200px] px-8 py-4 text-lg font-bold text-white transition-all duration-500 hover:scale-[1.03] active:scale-95"
            draggable="false"
          >
            {/* Dynamic Glowing Border Behind */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#00F2FF] via-[#769EDB] to-[#00F2FF] opacity-60 blur-md group-hover:opacity-100 group-hover:blur-xl transition-all duration-500"></div>
            {/* Dark inner layer for contrast */}
            <div className="absolute inset-[1.5px] rounded-[15px] bg-[#03050C] transition-all duration-500 group-hover:bg-[#03050C]/90"></div>
            {/* Metallic subtle top gradient overlay */}
            <div className="absolute inset-[1.5px] rounded-[15px] bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>

            <span className="relative flex items-center gap-3 text-white tracking-widest text-shadow-sm">
              預約產品演示
              <svg
                className="w-5 h-5 transition-transform duration-500 ease-out group-hover:translate-x-1.5"
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </Link>

          {/* Secondary Glass Ghost Button */}
          <a
            href="#experience"
            className="group relative inline-flex items-center justify-center min-w-[200px] px-8 py-4 rounded-2xl text-lg font-semibold tracking-widest text-slate-300 transition-all duration-300 hover:text-white border border-white/5 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-white/15"
          >
            探索工作流
            <svg
              className="w-5 h-5 ml-2 transition-transform duration-500 ease-out group-hover:translate-y-1 group-hover:text-white"
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
      </div>

      {/* ── Bottom Fade Out Mask Overlay ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[20vh] pointer-events-none z-10"
        style={{ background: 'linear-gradient(to top, #03050C 10%, transparent 100%)' }}
      />
    </section>
  );
}
