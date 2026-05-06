'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { useInView } from '@/app/lib/animations';

const DEMO_HREF = 'https://calendly.com/personacast/demo';

function useReveal(margin = '-80px') {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin });
  const reveal = (delay = 0): React.CSSProperties => ({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity 0.65s cubic-bezier(0.4,0,0.2,1) ${delay}s, transform 0.65s cubic-bezier(0.4,0,0.2,1) ${delay}s`,
  });
  return { ref, reveal };
}

/* ── Hero ─────────────────────────────────────────────────────────── */
export function ProductHero() {
  return (
    <section
      aria-label="產品功能"
      style={{
        background: '#0B1526',
        backgroundImage:
          'radial-gradient(ellipse 65% 50% at 80% 30%, rgba(0,95,163,.18) 0%, transparent 58%), radial-gradient(ellipse 40% 40% at 15% 75%, rgba(0,122,114,.10) 0%, transparent 55%)',
        padding: 'clamp(100px,14vh,160px) clamp(2rem,5vw,6rem) clamp(80px,10vh,120px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        aria-hidden
        className="font-heading"
        style={{
          position: 'absolute',
          right: '-0.02em',
          bottom: '-0.12em',
          fontSize: 'clamp(130px,17vw,260px)',
          fontWeight: 800,
          color: 'rgba(255,255,255,.022)',
          letterSpacing: '-0.04em',
          lineHeight: 1,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        PRODUCT
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
        <span
          className="font-mono block uppercase"
          style={{ fontSize: 11, letterSpacing: '0.24em', color: 'rgba(255,255,255,.65)', marginBottom: '1.5rem' }}
        >
          產品功能
        </span>

        <h1
          className="font-heading hero-anim-0"
          style={{
            fontSize: 'clamp(2.4rem,5vw,5rem)',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            lineHeight: 1.06,
            color: '#fff',
            maxWidth: 720,
            marginBottom: '1.25rem',
          }}
        >
          五步推演，<br />決策{' '}
          <em style={{ fontStyle: 'italic', color: 'rgba(0,218,186,.9)' }}>零盲點</em>
        </h1>

        <p
          className="font-body hero-anim-1"
          style={{
            fontSize: 'clamp(14.5px,1.7vw,17px)',
            fontWeight: 300,
            color: 'rgba(255,255,255,.62)',
            lineHeight: 1.85,
            maxWidth: 520,
            marginBottom: '2.5rem',
          }}
        >
          從議題注入到策略資產，PersonaCast 的完整 AI 工作流讓您在輿論成形前
          就掌握全局——每個情境路徑，每個風險臨界點，都已計算完畢。
        </p>

        {/* Mini workflow preview */}
        <div
          className="hero-anim-2"
          style={{
            display: 'flex',
            gap: 1,
            background: 'rgba(255,255,255,.1)',
            maxWidth: 680,
          }}
        >
          {[
            { num: '01', name: '種子注入' },
            { num: '02', name: '圖譜建構' },
            { num: '03', name: '推演劇場' },
            { num: '04', name: '預測解碼' },
            { num: '05', name: '數據資產' },
          ].map((step, i) => (
            <div
              key={step.num}
              style={{
                flex: 1,
                padding: '0.9rem 0.6rem',
                background: i === 2 ? 'rgba(0,218,186,.15)' : 'rgba(255,255,255,.04)',
                textAlign: 'center',
                borderTop: i === 2 ? '2px solid rgba(0,218,186,.85)' : '2px solid rgba(255,255,255,.1)',
              }}
            >
              <div className="font-mono" style={{ fontSize: 10, letterSpacing: '0.12em', color: i === 2 ? 'rgba(0,218,186,.95)' : 'rgba(0,218,186,.7)', marginBottom: '0.35rem' }}>
                {step.num}
              </div>
              <div className="font-body" style={{ fontSize: 12.5, color: i === 2 ? '#fff' : 'rgba(255,255,255,.72)', fontWeight: i === 2 ? 500 : 300 }}>
                {step.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 5-Step Workflow ──────────────────────────────────────────────── */
const STEPS = [
  {
    num: '01',
    tag: 'Prompt Inception',
    zhTitle: '種子注入引擎',
    href: '/product/seed-injection',
    accent: '#005FA3',
    metric: '90 秒',
    metricLabel: '啟動完整推演',
    body: '用自然語言定義議題核心、角色與情境變數。PersonaCast 自動解析爭議點、識別關鍵利益方，並在 90 秒內啟動一場完整推演。',
  },
  {
    num: '02',
    tag: 'Synthesis Engine',
    zhTitle: '圖譜建構系統',
    href: '/product/graph-engine',
    accent: '#005FA3',
    metric: '347+',
    metricLabel: '人格節點自動生成',
    body: '自動生成人格節點與社會關係拓撲。意見領袖、同溫層、斷裂線——一眼現形。知識圖譜整合市場動態、輿論走向與競爭態勢。',
  },
  {
    num: '03',
    tag: 'Nexus Simulator',
    zhTitle: '推演劇場',
    href: '/product/simulation-theater',
    accent: '#007A72',
    metric: '3.4M',
    metricLabel: '情境路徑並行推演',
    body: '數百個具獨立意志的 AI 人格在議題上即時辯論、表態、互相影響。觀測沉默螺旋的形成、輿論風向的翻轉，以及每一個不可逆的臨界瞬間。',
    isFeatured: true,
  },
  {
    num: '04',
    tag: 'Intelligence Decoder',
    zhTitle: '預測解碼器',
    href: '/product/predictive-decoder',
    accent: '#005FA3',
    metric: '94%',
    metricLabel: '趨勢預測準確率',
    body: '將推演海量數據萃取為信心指數、風險評分與策略建議。每項預測都附帶推演依據，讓您自己判斷，而非盲目相信數字。',
  },
  {
    num: '05',
    tag: 'Strategic Assets',
    zhTitle: '數據資產庫',
    href: '/product/data-assets',
    accent: '#005FA3',
    metric: '∞',
    metricLabel: '累積洞察，持續成長',
    body: '每次推演自動沉澱為可檢索的策略知識庫。您的輿情預判能力隨使用次數指數級成長。組織的決策智識，成為真正的戰略資產。',
  },
] as const;

export function ProductStepsSection() {
  const { ref, reveal } = useReveal('-60px');
  return (
    <section
      ref={ref}
      id="product-steps"
      aria-label="五步工作流"
      style={{
        background: '#0B1526',
        padding: 'clamp(80px,10vh,120px) clamp(2rem,5vw,6rem)',
        borderTop: '1px solid rgba(255,255,255,.08)',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ marginBottom: '3rem' }}>
          <span
            className="font-mono block uppercase"
            style={{ ...reveal(0), fontSize: 11, letterSpacing: '0.24em', color: 'rgba(0,218,186,.9)', marginBottom: '0.75rem' }}
          >
            工作流程
          </span>
          <h2
            className="font-heading"
            style={{
              ...reveal(0.08),
              fontSize: 'clamp(1.8rem,2.8vw,2.6rem)',
              fontWeight: 800,
              letterSpacing: '-0.025em',
              color: '#fff',
            }}
          >
            從議題到決策的<em style={{ fontStyle: 'italic', color: 'rgba(0,218,186,.88)' }}>完整路徑</em>
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 1, background: 'rgba(255,255,255,.06)' }}>
          {STEPS.map((step, i) => (
            <StepRow key={step.num} step={step} style={reveal(0.1 + i * 0.06)} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StepRow({
  step,
  style,
}: {
  step: (typeof STEPS)[number];
  style: React.CSSProperties;
}) {
  const isFeatured = 'isFeatured' in step && step.isFeatured;
  return (
    <Link
      href={step.href}
      style={{
        ...style,
        display: 'grid',
        gridTemplateColumns: '64px 1fr auto',
        gap: 0,
        background: isFeatured ? 'rgba(0,218,186,.06)' : 'rgba(255,255,255,.03)',
        borderLeft: isFeatured ? `3px solid ${step.accent}` : '3px solid transparent',
        textDecoration: 'none',
        transition: 'background 0.2s',
      }}
      className="group"
    >
      {/* Step number */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem 0',
          borderRight: '1px solid rgba(255,255,255,.06)',
        }}
      >
        <span
          className="font-mono"
          style={{ fontSize: 11, letterSpacing: '0.1em', color: isFeatured ? step.accent : 'rgba(255,255,255,.55)' }}
        >
          {step.num}
        </span>
      </div>

      {/* Content */}
      <div style={{ padding: '2rem clamp(1.5rem,3vw,3rem)' }}>
        <div style={{ marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div
            className="font-heading font-bold"
            style={{ fontSize: '1.15rem', color: '#fff', letterSpacing: '-0.01em' }}
          >
            {step.zhTitle}
          </div>
          <span
            className="font-mono uppercase"
            style={{ fontSize: 8.5, letterSpacing: '0.15em', color: 'rgba(255,255,255,.45)' }}
          >
            {step.tag}
          </span>
        </div>
        <p
          className="font-body"
          style={{ fontSize: 14, fontWeight: 300, color: 'rgba(255,255,255,.75)', lineHeight: 1.85, maxWidth: 640 }}
        >
          {step.body}
        </p>
      </div>

      {/* Metric */}
      <div
        style={{
          padding: '2rem clamp(1.5rem,2.5vw,2.5rem)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          justifyContent: 'center',
          borderLeft: '1px solid rgba(255,255,255,.06)',
          minWidth: 160,
        }}
      >
        <div
          className="font-heading"
          style={{ fontSize: '1.8rem', fontWeight: 800, color: step.accent, letterSpacing: '-0.02em', lineHeight: 1 }}
        >
          {step.metric}
        </div>
        <div
          className="font-body"
          style={{ fontSize: 11.5, color: 'rgba(255,255,255,.65)', marginTop: '0.3rem', textAlign: 'right', fontWeight: 300, lineHeight: 1.5 }}
        >
          {step.metricLabel}
        </div>
        <span
          className="font-mono"
          style={{ fontSize: 10, color: 'rgba(0,218,186,.75)', marginTop: '0.6rem', opacity: 0, transition: 'opacity 0.2s' }}
        >
          深入了解 →
        </span>
      </div>
    </Link>
  );
}

/* ── Simulation Theater Feature ───────────────────────────────────── */
const TERMINAL_LINES = [
  '> scenario: 產品漲價公告 · 競爭對手反應模擬',
  '> personas: 347 · paths: 3,412,690 · time: 2.3s',
  '> confidence threshold: 85% ··· COMPLETE',
];

const SIM_RESULTS = [
  { name: '主動聲明：附補償方案', pct: 89, tag: '推薦', tagColor: 'rgba(0,218,186,.9)', tagBg: 'rgba(0,218,186,.1)' },
  { name: '沉默觀望：待媒體反應', pct: 67, tag: '中性', tagColor: 'rgba(136,152,184,.85)', tagBg: 'rgba(255,255,255,.06)' },
  { name: '法律強硬回應', pct: 31, tag: '高風險', tagColor: 'rgba(220,100,90,.9)', tagBg: 'rgba(192,57,43,.1)' },
];

export function SimulationFeatureSection() {
  const { ref, reveal } = useReveal();
  return (
    <section
      ref={ref}
      id="simulation-feature"
      aria-label="推演劇場"
      style={{
        background: '#EEF3FB',
        padding: 'clamp(80px,10vh,120px) clamp(2rem,5vw,6rem)',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '40% 60%',
          gap: 'clamp(3rem,5vw,6rem)',
          alignItems: 'center',
        }}
      >
        {/* Left */}
        <div>
          <span
            className="font-mono block uppercase"
            style={{ ...reveal(0), fontSize: 11, letterSpacing: '0.22em', color: '#00838A', marginBottom: '1.5rem' }}
          >
            03 · 推演劇場
          </span>
          <h2
            className="font-heading"
            style={{
              ...reveal(0.1),
              fontSize: 'clamp(1.8rem,2.8vw,2.6rem)',
              fontWeight: 800,
              letterSpacing: '-0.025em',
              lineHeight: 1.18,
              color: '#020617',
              marginBottom: '1rem',
            }}
          >
            340 萬路徑，<br />
            <em style={{ fontStyle: 'italic', color: '#00838A' }}>同時計算</em>
          </h2>
          <p
            className="font-body"
            style={{
              ...reveal(0.2),
              fontSize: 14.5,
              fontWeight: 300,
              color: '#4A5A72',
              lineHeight: 1.85,
              marginBottom: '1.5rem',
            }}
          >
            每個情境路徑都有機率評分、時間線預測、與建議行動序列。
            在行動前，您已看過所有可能的結局。
          </p>
          <Link
            href="/product/simulation-theater"
            className="font-body font-semibold"
            style={{ ...reveal(0.28), display: 'inline-block', fontSize: 13.5, color: '#00838A', textDecoration: 'none' }}
          >
            深入了解推演劇場 →
          </Link>
        </div>

        {/* Right: terminal card */}
        <div
          style={{
            ...reveal(0.15),
            background: '#0B1526',
            border: '1px solid rgba(255,255,255,.08)',
            borderRadius: 4,
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(0,0,0,.25)',
          }}
        >
          {/* Title bar */}
          <div
            className="flex items-center justify-between"
            style={{ padding: '10px 14px', borderBottom: '1px solid rgba(255,255,255,.06)' }}
          >
            <div className="flex gap-1.5">
              {['#FF5F57', '#FFBD2E', '#28C840'].map((c) => (
                <div key={c} style={{ width: 8, height: 8, borderRadius: '50%', background: c }} />
              ))}
            </div>
            <span
              className="font-mono uppercase"
              style={{ fontSize: 9, color: 'rgba(255,255,255,.42)', letterSpacing: '0.14em' }}
            >
              PersonaCast · Simulation Live
            </span>
          </div>

          <div style={{ padding: '16px 14px' }}>
            <div style={{ marginBottom: 16 }}>
              {TERMINAL_LINES.map((line, i) => (
                <div
                  key={i}
                  className="font-mono"
                  style={{ fontSize: 11, color: 'rgba(0,218,186,.78)', lineHeight: 1.65 }}
                >
                  {line}
                </div>
              ))}
            </div>

            {SIM_RESULTS.map((row) => (
              <div
                key={row.name}
                className="flex items-center justify-between"
                style={{
                  padding: '8px 10px',
                  borderRadius: 2,
                  marginBottom: 6,
                  background: 'rgba(255,255,255,.03)',
                  border: '1px solid rgba(255,255,255,.04)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    position: 'absolute', top: 0, left: 0, bottom: 0,
                    width: `${row.pct}%`,
                    background: 'rgba(255,255,255,.02)',
                    zIndex: 0,
                  }}
                />
                <span className="font-body relative" style={{ fontSize: 12.5, fontWeight: 500, color: 'rgba(220,228,245,.88)', zIndex: 1 }}>
                  {row.name}
                </span>
                <div className="relative flex items-center gap-1.5" style={{ zIndex: 1 }}>
                  <span className="font-mono" style={{ fontSize: 12.5, fontWeight: 500, color: 'rgba(220,228,245,.88)' }}>{row.pct}%</span>
                  <span
                    className="font-mono uppercase"
                    style={{ fontSize: 8, letterSpacing: '0.1em', padding: '2px 5px', borderRadius: 2, color: row.tagColor, background: row.tagBg }}
                  >
                    {row.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Platform Stats ───────────────────────────────────────────────── */
const PLATFORM_STATS = [
  { num: '3.4', sup: 'M+', label1: '每次推演', label2: '情境路徑數' },
  { num: '98', sup: '%', label1: '情境預測', label2: '準確率' },
  { num: '2.3', sup: 's', label1: '平均推演', label2: '完成時間' },
  { num: '347', sup: '+', label1: '人格節點', label2: '自動生成' },
];

export function ProductStatsSection() {
  const { ref, reveal } = useReveal();
  return (
    <section
      ref={ref}
      id="product-stats"
      aria-label="平台規格"
      style={{
        background: '#0B1526',
        padding: 'clamp(60px,8vh,90px) clamp(2rem,5vw,6rem)',
        borderTop: '1px solid rgba(255,255,255,.08)',
        borderBottom: '1px solid rgba(255,255,255,.08)',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
        }}
      >
        {PLATFORM_STATS.map((stat, i) => (
          <div
            key={stat.num}
            style={{
              ...reveal(i * 0.08),
              padding: '2rem 0',
              borderRight: i < 3 ? '1px solid rgba(255,255,255,.08)' : 'none',
              paddingLeft: i > 0 ? 'clamp(1.5rem,3vw,3rem)' : 0,
              paddingRight: i < 3 ? 'clamp(1.5rem,3vw,3rem)' : 0,
            }}
          >
            <div
              className="font-heading"
              style={{ fontSize: '2.6rem', fontWeight: 800, color: '#fff', lineHeight: 1, marginBottom: '0.25rem', letterSpacing: '-0.03em' }}
            >
              {stat.num}
              <sup style={{ fontSize: '1rem', fontWeight: 700, verticalAlign: 'super', marginLeft: 2 }}>{stat.sup}</sup>
            </div>
            <div className="font-body" style={{ fontSize: 13, color: 'rgba(255,255,255,.55)', marginTop: '0.5rem', lineHeight: 1.55 }}>
              {stat.label1}<br />{stat.label2}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── Product CTA ──────────────────────────────────────────────────── */
export function ProductCTASection() {
  const { ref, reveal } = useReveal();
  return (
    <section
      ref={ref}
      id="product-cta"
      aria-label="行動召喚"
      style={{
        background: '#0B1526',
        padding: 'clamp(80px,10vh,120px) clamp(2rem,5vw,6rem)',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '55% 45%',
          gap: 'clamp(3rem,6vw,7rem)',
          alignItems: 'center',
        }}
      >
        <div>
          <span
            className="font-mono block uppercase"
            style={{ ...reveal(0), fontSize: 9.5, letterSpacing: '0.28em', color: 'rgba(255,255,255,.45)', marginBottom: '1.5rem' }}
          >
            開始使用
          </span>
          <h2
            className="font-heading"
            style={{
              ...reveal(0.1),
              fontSize: 'clamp(2rem,3.5vw,3.4rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.08,
              color: '#fff',
              marginBottom: '1.25rem',
            }}
          >
            在行動前，<br />帶著{' '}
            <em style={{ fontStyle: 'italic', color: 'rgba(0,218,186,.92)' }}>完整情報</em>
          </h2>
          <p
            className="font-body"
            style={{
              ...reveal(0.2),
              fontSize: 14.5,
              fontWeight: 300,
              color: 'rgba(255,255,255,.62)',
              lineHeight: 1.85,
              marginBottom: '2rem',
              maxWidth: 420,
            }}
          >
            PersonaCast 已協助超過 200 位企業領導者在關鍵時刻做出正確選擇。
            立即預約 30 分鐘演示，見識 AI 如何為您的決策提供完整的情境地圖。
          </p>
          <div className="flex items-center gap-3" style={reveal(0.28)}>
            <a
              href={DEMO_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center font-heading font-bold rounded-[2px] transition-opacity hover:opacity-85"
              style={{ padding: '13px 28px', background: '#fff', color: '#0B1526', fontSize: 13.5, letterSpacing: '0.01em' }}
            >
              預約 30 分鐘演示 →
            </a>
            <Link
              href="/pricing"
              className="inline-flex items-center font-body rounded-[2px] transition-all hover:border-white/40 hover:text-white"
              style={{ padding: '12px 20px', border: '1px solid rgba(255,255,255,.28)', color: 'rgba(255,255,255,.68)', fontSize: 13.5 }}
            >
              查看定價
            </Link>
          </div>
        </div>

        {/* Right: sub-product links */}
        <div style={reveal(0.15)}>
          <div
            style={{
              background: 'rgba(255,255,255,.03)',
              border: '1px solid rgba(255,255,255,.07)',
              borderRadius: 4,
              overflow: 'hidden',
            }}
          >
            {[
              { num: '01', name: '種子注入引擎', href: '/product/seed-injection' },
              { num: '02', name: '圖譜建構系統', href: '/product/graph-engine' },
              { num: '03', name: '推演劇場', href: '/product/simulation-theater' },
              { num: '04', name: '預測解碼器', href: '/product/predictive-decoder' },
              { num: '05', name: '數據資產庫', href: '/product/data-assets' },
            ].map((item, i) => (
              <Link
                key={item.num}
                href={item.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem 1.25rem',
                  borderBottom: i < 4 ? '1px solid rgba(255,255,255,.06)' : 'none',
                  textDecoration: 'none',
                  transition: 'background 0.15s',
                  background: 'transparent',
                }}
                className="hover:bg-white/5"
              >
                <span className="font-mono" style={{ fontSize: 9, letterSpacing: '0.15em', color: 'rgba(0,218,186,.6)', minWidth: 20 }}>
                  {item.num}
                </span>
                <span className="font-body" style={{ fontSize: 13.5, color: 'rgba(255,255,255,.72)', fontWeight: 300 }}>
                  {item.name}
                </span>
                <span style={{ marginLeft: 'auto', fontSize: 11, color: 'rgba(255,255,255,.3)' }}>→</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
