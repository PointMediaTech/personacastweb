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
export function SolutionsHero() {
  return (
    <section
      aria-label="解決方案"
      style={{
        background: '#0B1526',
        backgroundImage:
          'radial-gradient(ellipse 60% 50% at 70% 32%, rgba(0,95,163,.18) 0%, transparent 60%)',
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
          fontSize: 'clamp(120px,16vw,240px)',
          fontWeight: 800,
          color: 'rgba(255,255,255,.022)',
          letterSpacing: '-0.04em',
          lineHeight: 1,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        SOLUTIONS
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
        <span
          className="font-mono block uppercase"
          style={{ fontSize: 11, letterSpacing: '0.22em', color: 'rgba(255,255,255,.68)', marginBottom: '1.5rem' }}
        >
          解決方案
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
          每一場輿論戰，<br />
          我們都已{' '}
          <em style={{ fontStyle: 'italic', color: 'rgba(0,218,186,.9)' }}>預演過</em>
        </h1>
        <p
          className="font-body hero-anim-1"
          style={{
            fontSize: 'clamp(14.5px,1.7vw,17px)',
            fontWeight: 300,
            color: 'rgba(255,255,255,.76)',
            lineHeight: 1.85,
            maxWidth: 520,
          }}
        >
          無論您身處哪個戰場——公關風暴、政治議題、品牌危機或政策推動——
          PersonaCast 讓您在第一槍響前就看清全局。不是運氣，是推演。
        </p>
      </div>
    </section>
  );
}

/* ── Solutions Grid ───────────────────────────────────────────────── */
const SOLUTIONS = [
  {
    num: '01',
    title: '公關危機預判',
    subtitle: '在風暴登陸前建好防線',
    body: '模擬負面事件在不同人群中的擴散路徑，預判最壞情境，提前準備應對劇本。當危機真正來臨——您的團隊已經排練過了。',
    href: '/solutions/crisis-pr',
    metric: '−40%', metricLabel: '決策失誤降幅',
  },
  {
    num: '02',
    title: '政治議題推演',
    subtitle: '在民意成形前讀懂民心',
    body: '推演政策宣示、選舉策略或政治事件在多元選民群體中的反應。找出最大公約數的溝通角度，而不是撞牆才知道路錯了。',
    href: '/solutions/political-strategy',
    metric: '94%', metricLabel: '趨勢預測準確率',
  },
  {
    num: '03',
    title: '品牌聲譽管理',
    subtitle: '量化品牌在輿論場的韌性',
    body: '定期模擬品牌面臨各類風險事件時的輿論反應。建立聲譽韌性基線與預警機制——不是等裂縫出現才補，而是先知道哪裡最脆弱。',
    href: '/solutions/brand-reputation',
    metric: '72h', metricLabel: '行動前情報視窗',
  },
  {
    num: '04',
    title: '政策輿論模擬',
    subtitle: '預測政策的社會回聲',
    body: '在政策發布前，模擬不同社經群體的真實反應。識別潛在反對聲浪與支持基礎，讓好政策不會死在溝通失誤上。',
    href: '/solutions/policy-simulation',
    metric: '200+', metricLabel: '政府與企業客戶',
  },
] as const;

export function SolutionsGridSection() {
  const { ref, reveal } = useReveal('-60px');
  return (
    <section
      ref={ref}
      id="solutions-grid"
      aria-label="解決方案清單"
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
            style={{ ...reveal(0), fontSize: 11, letterSpacing: '0.22em', color: 'rgba(0,218,186,.9)', marginBottom: '0.75rem' }}
          >
            適用場景
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
            您的戰場在哪裡，<em style={{ fontStyle: 'italic', color: 'rgba(0,218,186,.88)' }}>我們在那裡</em>
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 1,
            background: 'rgba(255,255,255,.06)',
          }}
        >
          {SOLUTIONS.map((s, i) => (
            <Link
              key={s.num}
              href={s.href}
              style={{
                ...reveal(0.1 + i * 0.07),
                background: 'rgba(255,255,255,.04)',
                padding: '2.25rem 2rem',
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                transition: 'background 0.15s',
              }}
              className="group"
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,.08)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,.04)'; }}
            >
              <span
                className="font-mono block uppercase"
                style={{ fontSize: 11, letterSpacing: '0.25em', color: 'rgba(255,255,255,.65)', marginBottom: '0.75rem' }}
              >
                {s.num}
              </span>
              <div
                className="font-heading font-bold"
                style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '0.3rem', letterSpacing: '-0.01em' }}
              >
                {s.title}
              </div>
              <div
                className="font-mono uppercase"
                style={{ fontSize: 10.5, letterSpacing: '0.15em', color: 'rgba(0,218,186,.9)', marginBottom: '1rem' }}
              >
                {s.subtitle}
              </div>
              <p
                className="font-body"
                style={{ fontSize: 13.5, fontWeight: 300, color: 'rgba(255,255,255,.76)', lineHeight: 1.85, flex: 1, marginBottom: '1.5rem' }}
              >
                {s.body}
              </p>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                <span
                  className="font-body font-semibold"
                  style={{ fontSize: 13, color: 'rgba(0,218,186,.85)' }}
                >
                  深入了解 →
                </span>
                <div style={{ textAlign: 'right' }}>
                  <div className="font-heading" style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1 }}>
                    {s.metric}
                  </div>
                  <div className="font-body" style={{ fontSize: 11, color: 'rgba(255,255,255,.55)', fontWeight: 300 }}>
                    {s.metricLabel}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Value Propositions ───────────────────────────────────────────── */
const VALUES = [
  { label: '先見，而非事後', desc: '從被動回應轉為主動預判' },
  { label: '模擬，取代猜測', desc: '以 AI 推演取代經驗直覺' },
  { label: '量化，驅動決策', desc: '從定性判斷升級為數據驅動策略' },
];

export function SolutionsValueSection() {
  const { ref, reveal } = useReveal();
  return (
    <section
      ref={ref}
      id="solutions-values"
      aria-label="核心價值"
      style={{
        background: '#EEF3FB',
        padding: 'clamp(70px,9vh,110px) clamp(2rem,5vw,6rem)',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ marginBottom: '2.75rem', ...reveal(0) }}>
          <span
            className="font-mono block uppercase"
            style={{ fontSize: 11, letterSpacing: '0.22em', color: '#00838A', marginBottom: '0.75rem' }}
          >
            為什麼選擇 PersonaCast
          </span>
          <h2
            className="font-heading"
            style={{ fontSize: 'clamp(1.6rem,2.6vw,2.4rem)', fontWeight: 800, letterSpacing: '-0.025em', color: '#020617' }}
          >
            不是工具，是<em style={{ fontStyle: 'italic', color: '#00838A' }}>思維的升級</em>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: '#D0DCF0' }}>
          {VALUES.map((v, i) => (
            <div
              key={v.label}
              style={{
                ...reveal(0.1 + i * 0.08),
                background: '#fff',
                padding: '2rem',
              }}
            >
              <div
                className="font-heading font-bold"
                style={{ fontSize: '1.15rem', color: '#020617', marginBottom: '0.6rem', letterSpacing: '-0.01em' }}
              >
                {v.label}
              </div>
              <p className="font-body" style={{ fontSize: 13.5, fontWeight: 300, color: '#4A5A72', lineHeight: 1.75 }}>
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Solutions CTA ────────────────────────────────────────────────── */
export function SolutionsCTASection() {
  const { ref, reveal } = useReveal();
  return (
    <section
      ref={ref}
      id="solutions-cta"
      aria-label="諮詢"
      style={{
        background: '#0B1526',
        borderTop: '1px solid rgba(255,255,255,.06)',
        padding: 'clamp(80px,10vh,120px) clamp(2rem,5vw,6rem)',
      }}
    >
      <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
        <span
          className="font-mono block uppercase"
          style={{ ...reveal(0), fontSize: 11, letterSpacing: '0.22em', color: 'rgba(255,255,255,.65)', marginBottom: '1.5rem' }}
        >
          不確定哪個方案適合您
        </span>
        <h2
          className="font-heading"
          style={{
            ...reveal(0.1),
            fontSize: 'clamp(2rem,3.5vw,3.2rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            color: '#fff',
            marginBottom: '1.25rem',
          }}
        >
          讓我們根據您的場景<br />
          <em style={{ fontStyle: 'italic', color: 'rgba(0,218,186,.92)' }}>找到最佳解答</em>
        </h2>
        <p
          className="font-body"
          style={{
            ...reveal(0.2),
            fontSize: 14.5,
            fontWeight: 300,
            color: 'rgba(255,255,255,.76)',
            lineHeight: 1.85,
            marginBottom: '2rem',
          }}
        >
          預約一對一諮詢，我們的團隊將根據您的具體場景推薦最佳方案。
          沒有通用答案，只有為您量身設計的推演策略。
        </p>
        <div className="flex items-center justify-center gap-3" style={reveal(0.28)}>
          <a
            href={DEMO_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center font-heading font-bold rounded-[2px] transition-opacity hover:opacity-85"
            style={{ padding: '13px 28px', background: '#fff', color: '#0B1526', fontSize: 13.5, letterSpacing: '0.01em' }}
          >
            預約免費諮詢 →
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center font-body rounded-[2px] transition-all hover:border-white/40 hover:text-white"
            style={{ padding: '12px 20px', border: '1px solid rgba(255,255,255,.28)', color: 'rgba(255,255,255,.68)', fontSize: 13.5 }}
          >
            聯繫我們
          </Link>
        </div>
      </div>
    </section>
  );
}
