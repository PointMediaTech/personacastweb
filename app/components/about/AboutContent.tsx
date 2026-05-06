'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { useInView } from '@/app/lib/animations';

const DEMO_HREF = 'https://calendly.com/personacast/demo';

const STATS = [
  { num: '24', sup: '/7', label1: '無間斷監控', label2: '平行推演' },
  { num: '500', sup: '+', label1: 'AI 人格', label2: '獨立行為參數' },
  { num: '360', sup: '°', label1: '零死角', label2: '決策覆蓋率' },
  { num: '94', sup: '%', label1: '趨勢預測', label2: '準確率' },
];

const VALUES = [
  {
    num: '01',
    title: '預見 > 回應',
    body: '告別「出事了再說」的被動公關。我們的預測模型讓您在風暴成形前，就已部署好防線。',
  },
  {
    num: '02',
    title: '多元 > 單一',
    body: '真實的網路聲量從不只有單一面向。我們模擬數百種數位人格，還原最真實的輿論生態系。',
  },
  {
    num: '03',
    title: '數據 > 直覺',
    body: '公關決策不該依賴主觀直覺。我們提供具象化、可量化的推演結果，讓每一份預算都有跡可循。',
  },
];

const TEAM = [
  { initials: 'CEO', role: '創辦人 & CEO', label: '戰略願景與企業方向' },
  { initials: 'CTO', role: '技術長 CTO', label: 'AI 模型架構與演算法' },
  { initials: 'CSO', role: '首席科學家', label: '資料科學與大模型研究' },
  { initials: 'CPO', role: '產品總監', label: '用戶體驗與解決方案設計' },
];

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
export function AboutHero() {
  return (
    <section
      aria-label="關於 PersonaCast"
      style={{
        background: '#0B1526',
        backgroundImage:
          'radial-gradient(ellipse 60% 50% at 80% 30%, rgba(0,95,163,.18) 0%, transparent 60%), radial-gradient(ellipse 40% 40% at 20% 70%, rgba(0,122,114,.10) 0%, transparent 55%)',
        padding: 'clamp(100px,14vh,160px) clamp(2rem,5vw,6rem) clamp(80px,10vh,120px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative watermark */}
      <div
        aria-hidden
        className="font-heading"
        style={{
          position: 'absolute',
          right: '-0.05em',
          bottom: '-0.15em',
          fontSize: 'clamp(160px,22vw,340px)',
          fontWeight: 800,
          color: 'rgba(255,255,255,.022)',
          letterSpacing: '-0.04em',
          lineHeight: 1,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        ABOUT
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
        <span
          className="font-mono block uppercase"
          style={{ fontSize: 11, letterSpacing: '0.22em', color: 'rgba(255,255,255,.68)', marginBottom: '1.5rem' }}
        >
          關於 PersonaCast
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
            marginBottom: '1.5rem',
          }}
        >
          讓決策<br />
          <em style={{ fontStyle: 'italic', color: 'rgba(0,218,186,.9)' }}>不再</em>是賭注
        </h1>

        <p
          className="font-body hero-anim-1"
          style={{
            fontSize: 'clamp(15px,1.8vw,18px)',
            fontWeight: 300,
            color: 'rgba(255,255,255,.68)',
            lineHeight: 1.85,
            maxWidth: 560,
            marginBottom: '2.5rem',
          }}
        >
          PersonaCast 結合頂尖 AI 技術與公關傳播學，為企業打造專屬的虛擬輿論風洞。
          我們不僅預測未來，更協助您改寫未來。
        </p>

        <div className="flex items-center gap-3 hero-anim-2">
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
            href="/product"
            className="inline-flex items-center font-body rounded-[2px] transition-all hover:border-white/40 hover:text-white"
            style={{ padding: '12px 20px', border: '1px solid rgba(255,255,255,.28)', color: 'rgba(255,255,255,.68)', fontSize: 13.5 }}
          >
            探索產品
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── Mission ──────────────────────────────────────────────────────── */
export function MissionSection() {
  const { ref, reveal } = useReveal();
  return (
    <section
      ref={ref}
      id="mission"
      aria-label="使命"
      style={{
        background: '#0B1526',
        padding: 'clamp(80px,10vh,120px) clamp(2rem,5vw,6rem)',
        borderTop: '1px solid rgba(255,255,255,.08)',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '48% 52%',
          gap: 'clamp(3rem,6vw,8rem)',
          alignItems: 'center',
        }}
      >
        {/* Left */}
        <div>
          <span
            className="font-mono block uppercase"
            style={{ ...reveal(0), fontSize: 11, letterSpacing: '0.22em', color: 'rgba(0,218,186,.9)', marginBottom: '1.5rem' }}
          >
            使命
          </span>
          <h2
            className="font-heading"
            style={{
              ...reveal(0.1),
              fontSize: 'clamp(2rem,3.5vw,3.4rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.12,
              color: '#fff',
              marginBottom: '1.25rem',
            }}
          >
            從被動應對，<br />到{' '}
            <em style={{ fontStyle: 'italic', color: 'rgba(0,218,186,.88)' }}>主動掌握全局</em>
          </h2>
          <p
            className="font-body"
            style={{
              ...reveal(0.2),
              fontSize: 14.5,
              fontWeight: 300,
              color: 'rgba(255,255,255,.76)',
              lineHeight: 1.85,
            }}
          >
            PersonaCast 的起源來自一個簡單的信念：在這個變幻莫測的數位時代，
            傳統公關的「事後補救」已經不足以保護企業的品牌價值。
          </p>
        </div>

        {/* Right */}
        <div style={{ ...reveal(0.15) }}>
          <blockquote
            style={{
              margin: 0,
              padding: 'clamp(1.5rem,3vw,2.5rem)',
              borderLeft: '3px solid rgba(0,218,186,.5)',
              background: 'rgba(0,218,186,.05)',
            }}
          >
            <p
              className="font-body"
              style={{ fontSize: 'clamp(15px,1.6vw,17px)', fontWeight: 400, color: 'rgba(255,255,255,.85)', lineHeight: 1.8, marginBottom: '1.5rem' }}
            >
              「如果航空業可以用風洞模擬氣流，軍事可以用兵推演算戰局，那麼輿論場——
              同樣複雜的場域——也應有自己的科學模擬系統。」
            </p>
            <footer className="font-mono" style={{ fontSize: 10.5, letterSpacing: '0.2em', color: 'rgba(255,255,255,.65)', textTransform: 'uppercase' }}>
              PersonaCast 創辦團隊
            </footer>
          </blockquote>
          <div
            className="font-body"
            style={{
              marginTop: '1.75rem',
              padding: '1.5rem',
              background: 'rgba(255,255,255,.04)',
              borderTop: '1px solid rgba(255,255,255,.08)',
            }}
          >
            <p style={{ fontSize: 14, fontWeight: 300, color: 'rgba(255,255,255,.76)', lineHeight: 1.85 }}>
              我們的創始團隊匯聚了 AI 大模型開發、資料科學、公關危機處理與社會傳理學的頂尖人才。
              我們打破了學科之間的藩籬，將最前沿的技術引入傳統的公關戰場。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Stats ────────────────────────────────────────────────────────── */
export function AboutStatsSection() {
  const { ref, reveal } = useReveal();
  return (
    <section
      ref={ref}
      id="about-stats"
      aria-label="關鍵指標"
      style={{
        background: '#EEF3FB',
        padding: 'clamp(70px,9vh,110px) clamp(2rem,5vw,6rem)',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ marginBottom: '2.5rem', ...reveal(0) }}>
          <span
            className="font-mono block uppercase"
            style={{ fontSize: 11, letterSpacing: '0.22em', color: '#00838A', marginBottom: '0.75rem' }}
          >
            規模與影響力
          </span>
          <h2
            className="font-heading"
            style={{ fontSize: 'clamp(1.6rem,2.8vw,2.6rem)', fontWeight: 800, letterSpacing: '-0.03em', color: '#020617' }}
          >
            重新定義決策的維度
          </h2>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            background: '#D0DCF0',
            gap: 1,
          }}
        >
          {STATS.map((stat, i) => (
            <div
              key={stat.num}
              style={{
                ...reveal(i * 0.08),
                background: '#fff',
                padding: '2rem clamp(1.5rem,2.5vw,2.5rem)',
              }}
            >
              <div
                className="font-heading"
                style={{ fontSize: '2.8rem', fontWeight: 800, color: '#020617', lineHeight: 1, letterSpacing: '-0.03em', marginBottom: '0.25rem' }}
              >
                {stat.num}
                <sup style={{ fontSize: '1.1rem', fontWeight: 700, verticalAlign: 'super', marginLeft: 2, color: '#00838A' }}>
                  {stat.sup}
                </sup>
              </div>
              <div className="font-body" style={{ fontSize: 13, color: '#4A5A72', marginTop: '0.5rem', lineHeight: 1.55 }}>
                {stat.label1}<br />{stat.label2}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Values ───────────────────────────────────────────────────────── */
export function ValuesSection() {
  const { ref, reveal } = useReveal();
  return (
    <section
      ref={ref}
      id="values"
      aria-label="核心驅動力"
      style={{
        background: '#0B1526',
        padding: 'clamp(80px,10vh,120px) clamp(2rem,5vw,6rem)',
        borderTop: '1px solid rgba(255,255,255,.08)',
        borderBottom: '1px solid rgba(255,255,255,.08)',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ marginBottom: '3rem' }}>
          <span
            className="font-mono block uppercase"
            style={{ ...reveal(0), fontSize: 11, letterSpacing: '0.22em', color: 'rgba(0,218,186,.9)', marginBottom: '0.75rem' }}
          >
            核心驅動力
          </span>
          <h2
            className="font-heading"
            style={{
              ...reveal(0.1),
              fontSize: 'clamp(1.8rem,2.8vw,2.6rem)',
              fontWeight: 800,
              letterSpacing: '-0.025em',
              color: '#fff',
            }}
          >
            打造無懈可擊的<em style={{ fontStyle: 'italic', color: 'rgba(0,218,186,.88)' }}>決策防線</em>
          </h2>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            background: 'rgba(255,255,255,.05)',
            gap: 1,
          }}
        >
          {VALUES.map((v, i) => (
            <div
              key={v.num}
              style={{
                ...reveal(0.1 + i * 0.08),
                background: 'rgba(255,255,255,.04)',
                padding: '2.25rem 2rem',
              }}
            >
              <span
                className="font-mono block uppercase"
                style={{ fontSize: 11, letterSpacing: '0.25em', color: 'rgba(255,255,255,.65)', marginBottom: '1rem' }}
              >
                {v.num}
              </span>
              <div
                className="font-heading font-bold"
                style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '0.75rem', letterSpacing: '-0.01em' }}
              >
                {v.title}
              </div>
              <p
                className="font-body"
                style={{ fontSize: 13.5, fontWeight: 300, color: 'rgba(255,255,255,.76)', lineHeight: 1.85 }}
              >
                {v.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Team ─────────────────────────────────────────────────────────── */
export function TeamSection() {
  const { ref, reveal } = useReveal();
  return (
    <section
      ref={ref}
      id="team"
      aria-label="核心團隊"
      style={{
        background: '#0B1526',
        padding: 'clamp(80px,10vh,120px) clamp(2rem,5vw,6rem)',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            paddingBottom: '2.5rem',
            borderBottom: '1px solid rgba(255,255,255,.08)',
            marginBottom: '2.5rem',
          }}
        >
          <div>
            <span
              className="font-mono block uppercase"
              style={{ ...reveal(0), fontSize: 11, letterSpacing: '0.22em', color: 'rgba(255,255,255,.68)', marginBottom: '0.75rem' }}
            >
              核心團隊
            </span>
            <h2
              className="font-heading"
              style={{
                ...reveal(0.08),
                fontSize: 'clamp(1.8rem,2.8vw,2.6rem)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                color: '#fff',
              }}
            >
              引領變革的<em style={{ fontStyle: 'italic', color: 'rgba(0,218,186,.85)' }}>跨界專家</em>
            </h2>
          </div>
          <p
            className="font-body"
            style={{
              ...reveal(0.15),
              fontSize: 14,
              fontWeight: 300,
              color: 'rgba(255,255,255,.55)',
              maxWidth: 240,
              lineHeight: 1.75,
              textAlign: 'right',
            }}
          >
            最棘手的挑戰，需要跨領域的思維來突破。
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 1,
            background: 'rgba(255,255,255,.06)',
          }}
        >
          {TEAM.map((member, i) => (
            <div
              key={member.initials}
              style={{
                ...reveal(0.1 + i * 0.07),
                background: 'rgba(11,21,38,.7)',
                padding: '2.25rem 2rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <div
                className="font-heading font-bold"
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1rem',
                  letterSpacing: '0.04em',
                  background: 'rgba(0,218,186,.08)',
                  border: '1px solid rgba(0,218,186,.2)',
                  color: 'rgba(0,218,186,.85)',
                  marginBottom: '1.25rem',
                }}
              >
                {member.initials}
              </div>
              <div
                className="font-heading font-bold"
                style={{ fontSize: '1rem', color: '#fff', marginBottom: '0.4rem', letterSpacing: '-0.01em' }}
              >
                {member.role}
              </div>
              <p className="font-body" style={{ fontSize: 12.5, fontWeight: 300, color: 'rgba(255,255,255,.68)', lineHeight: 1.65 }}>
                {member.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── About CTA ────────────────────────────────────────────────────── */
export function AboutCTASection() {
  const { ref, reveal } = useReveal();
  return (
    <section
      ref={ref}
      id="about-cta"
      aria-label="行動召喚"
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
          準備好了嗎
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
          準備好掌控<br />您的{' '}
          <em style={{ fontStyle: 'italic', color: 'rgba(0,218,186,.92)' }}>輿論主場</em>了嗎？
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
          30 分鐘演示，見識 AI 如何為您的下一個關鍵決策提供完整的情境地圖。
        </p>
        <div className="flex items-center justify-center gap-3" style={reveal(0.28)}>
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
            href="/solutions"
            className="inline-flex items-center font-body rounded-[2px] transition-all hover:border-white/40 hover:text-white"
            style={{ padding: '12px 20px', border: '1px solid rgba(255,255,255,.28)', color: 'rgba(255,255,255,.68)', fontSize: 13.5 }}
          >
            探索應用場景
          </Link>
        </div>
      </div>
    </section>
  );
}
