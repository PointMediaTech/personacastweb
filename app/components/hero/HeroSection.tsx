'use client';

import Link from 'next/link';

const PROB_ROWS = [
  { label: '推薦行動路徑', pct: '68%', color: '#007A72' },
  { label: '高風險情境',   pct: '21%', color: '#C0392B' },
  { label: '低信心路徑',   pct: '11%', color: '#8898B8' },
];

export function HeroSection() {
  return (
    <section
      id="hero"
      aria-label="先看見結局"
      className="relative overflow-hidden"
      style={{
        minHeight: '100vh',
        background: '#0B1526',
        backgroundImage: [
          'radial-gradient(ellipse 75% 55% at 72% 38%, rgba(0,95,163,.20) 0%, transparent 62%)',
          'radial-gradient(ellipse 50% 42% at 14% 78%, rgba(0,122,114,.10) 0%, transparent 55%)',
        ].join(', '),
        display: 'grid',
        gridTemplateRows: '1fr auto',
        paddingTop: 56,
      }}
    >
      {/* Typographic "72" watermark */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          right: '-0.02em',
          top: '50%',
          transform: 'translateY(-52%)',
          fontSize: 'clamp(240px,32vw,500px)',
          fontWeight: 800,
          lineHeight: 1,
          letterSpacing: '-0.05em',
          color: 'rgba(255,255,255,.028)',
          userSelect: 'none',
          pointerEvents: 'none',
          fontFamily: 'var(--font-gf-heading, "Plus Jakarta Sans")',
        }}
      >
        72
      </div>

      {/* Main content */}
      <div
        className="relative flex items-center"
        style={{ padding: 'clamp(3rem,6vh,5rem) clamp(2rem,5vw,6rem)' }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 0,
            alignItems: 'center',
            width: '100%',
            maxWidth: 1360,
          }}
        >
          {/* Left: headline */}
          <div>
            {/* Eyebrow */}
            <div className="hero-anim-0 flex items-center gap-2.5 mb-8">
              <div style={{ width: 18, height: 1, background: 'rgba(255,255,255,.45)' }} />
              <span
                className="font-mono uppercase"
                style={{ fontSize: 11, letterSpacing: '0.22em', color: 'rgba(255,255,255,.62)' }}
              >
                AI Strategic Decision Simulation
              </span>
            </div>

            {/* H1 */}
            <h1
              className="font-heading"
              style={{
                fontSize: 'clamp(4.5rem,8.5vw,9.5rem)',
                fontWeight: 800,
                lineHeight: 0.95,
                letterSpacing: '-0.04em',
                marginBottom: 'clamp(1.5rem,3vh,2.5rem)',
              }}
            >
              <span
                className="hero-anim-0 block"
                style={{ color: '#fff' }}
              >
                先看見
              </span>
              <span
                className="hero-anim-1 block"
                style={{
                  background: 'linear-gradient(90deg,#fff 0%,#fff 48%,#007A72 48%,#007A72 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                結局
              </span>
            </h1>

            {/* Sub */}
            <p
              className="hero-anim-2 font-body"
              style={{
                fontSize: 16,
                fontWeight: 300,
                lineHeight: 1.85,
                color: 'rgba(255,255,255,.68)',
                maxWidth: 400,
                marginBottom: 'clamp(1.5rem,3vh,2.25rem)',
              }}
            >
              PersonaCast 在你行動前 <strong style={{ color: 'rgba(255,255,255,.95)', fontWeight: 600 }}>72 小時</strong>，
              以 AI 推演三百萬個情境路徑——帶著完整情報走進每一個決策現場。
            </p>

            {/* CTAs */}
            <div className="hero-anim-3 flex items-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 font-heading font-bold rounded-[2px] transition-opacity hover:opacity-85"
                style={{
                  padding: '12px 26px',
                  background: '#fff',
                  color: '#0B1526',
                  fontSize: 13.5,
                  letterSpacing: '0.01em',
                }}
              >
                啟動推演 →
              </Link>
              <Link
                href="/product"
                className="inline-flex items-center gap-1.5 font-body rounded-[2px] transition-all hover:border-white/40 hover:text-white"
                style={{
                  padding: '11px 20px',
                  border: '1px solid rgba(255,255,255,.32)',
                  color: 'rgba(255,255,255,.72)',
                  fontSize: 13.5,
                }}
              >
                了解產品
              </Link>
            </div>
          </div>

          {/* Right: 72 stat + probability table */}
          <div
            className="hero-anim-4 flex flex-col items-end"
            style={{ paddingLeft: 'clamp(3rem,5vw,7rem)' }}
          >
            {/* 72 Hours Ahead */}
            <div style={{ marginBottom: 'clamp(1.5rem,3vh,2.5rem)', textAlign: 'right' }}>
              <span
                className="font-heading block"
                style={{
                  fontSize: 'clamp(4.5rem,9vw,8.5rem)',
                  fontWeight: 800,
                  letterSpacing: '-0.05em',
                  lineHeight: 1,
                  color: '#fff',
                }}
              >
                72
              </span>
              <span
                className="font-mono block"
                style={{
                  fontSize: 'clamp(.75rem,1.6vw,1.3rem)',
                  color: 'rgba(255,255,255,.65)',
                  letterSpacing: '0.05em',
                  marginTop: '0.2rem',
                }}
              >
                Hours Ahead
              </span>
              <span
                className="font-body block"
                style={{
                  fontSize: 12,
                  fontWeight: 300,
                  color: 'rgba(255,255,255,.65)',
                  marginTop: '0.6rem',
                  lineHeight: 1.6,
                  maxWidth: 210,
                  textAlign: 'right',
                }}
              >
                行動前即看見所有可能的結局——包括<br />你最不希望發生的那個。
              </span>
            </div>

            {/* Probability table */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,.1)', paddingTop: '1.25rem', width: '100%' }}>
              {PROB_ROWS.map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between"
                  style={{ padding: '0.5rem 0', borderBottom: '1px solid rgba(255,255,255,.055)' }}
                >
                  <div className="flex items-center gap-2">
                    <div style={{ width: 5, height: 5, borderRadius: '50%', background: row.color, flexShrink: 0 }} />
                    <span className="font-body" style={{ fontSize: 12, color: 'rgba(255,255,255,.76)' }}>
                      {row.label}
                    </span>
                  </div>
                  <span
                    className="font-mono"
                    style={{ fontSize: 12.5, fontWeight: 500, color: row.color }}
                  >
                    {row.pct}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom metadata strip */}
      <div
        className="relative flex items-center justify-between"
        style={{
          padding: '1.1rem clamp(2rem,5vw,6rem)',
          borderTop: '1px solid rgba(255,255,255,.07)',
        }}
      >
        <span
          className="font-mono uppercase"
          style={{ fontSize: 10.5, letterSpacing: '0.22em', color: 'rgba(255,255,255,.58)' }}
        >
          3,412,698 Scenarios · 72H Lookahead · T−0
        </span>
        <div className="flex items-center gap-5">
          {[
            { dot: '#007A72', label: '推薦引擎就緒' },
            { dot: '#005FA3', label: '情境模型載入中' },
          ].map(({ dot, label }) => (
            <div key={label} className="flex items-center gap-1.5">
              <div style={{ width: 4, height: 4, borderRadius: '50%', background: dot }} />
              <span className="font-mono uppercase" style={{ fontSize: 10.5, letterSpacing: '0.15em', color: 'rgba(255,255,255,.58)' }}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
