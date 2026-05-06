'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { useInView } from '@/app/lib/animations';

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
export function ResourcesHero() {
  return (
    <section
      aria-label="資源中心"
      style={{
        background: '#0B1526',
        backgroundImage:
          'radial-gradient(ellipse 60% 50% at 65% 35%, rgba(0,95,163,.15) 0%, transparent 60%)',
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
          fontSize: 'clamp(100px,14vw,220px)',
          fontWeight: 800,
          color: 'rgba(255,255,255,.022)',
          letterSpacing: '-0.04em',
          lineHeight: 1,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        KNOWLEDGE
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
        <span
          className="font-mono block uppercase"
          style={{ fontSize: 11, letterSpacing: '0.22em', color: 'rgba(255,255,255,.68)', marginBottom: '1.5rem' }}
        >
          資源中心
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
          掌握輿論的{' '}
          <em style={{ fontStyle: 'italic', color: 'rgba(0,218,186,.9)' }}>知識武器庫</em>
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
          深度洞察、實戰案例與研究白皮書——
          持續武裝您的輿情預判能力。
        </p>
      </div>
    </section>
  );
}

/* ── Resource Cards ───────────────────────────────────────────────── */
const RESOURCES = [
  {
    num: '01',
    title: '部落格 / 洞察',
    subtitle: '產業觀點與趨勢分析',
    body: '輿情分析趨勢、AI 應用深度解析、產業觀點。每篇文章都源自真實推演場景，而非空洞理論。',
    cta: '閱讀最新文章',
    href: '/resources/blog',
    disabled: true,
    badge: '即將推出',
  },
  {
    num: '02',
    title: '客戶成功案例',
    subtitle: '真實場景的推演紀錄',
    body: '了解其他組織如何使用 PersonaCast 贏得輿論戰。從危機公關到選舉策略，每個案例都有數據支撐。',
    cta: '探索案例',
    href: '/resources/case-studies',
    disabled: false,
    badge: null,
  },
  {
    num: '03',
    title: '白皮書下載',
    subtitle: '決策者的完整評估依據',
    body: '深度研究報告，適合需要完整評估的決策者。從方法論到效益量化，一份說清楚的完整文件。',
    cta: '下載白皮書',
    href: '/resources/whitepapers',
    disabled: false,
    badge: null,
  },
] as const;

export function ResourcesGridSection() {
  const { ref, reveal } = useReveal('-60px');
  return (
    <section
      ref={ref}
      id="resources-grid"
      aria-label="資源類型"
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
            知識庫
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
            選擇您需要的{' '}
            <em style={{ fontStyle: 'italic', color: 'rgba(0,218,186,.88)' }}>知識深度</em>
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 1,
            background: 'rgba(255,255,255,.06)',
          }}
        >
          {RESOURCES.map((r, i) => {
            const inner = (
              <div
                style={{
                  ...reveal(0.1 + i * 0.07),
                  background: 'rgba(255,255,255,.04)',
                  padding: '2.25rem 2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  position: 'relative',
                  opacity: r.disabled ? 0.55 : undefined,
                }}
                className={r.disabled ? '' : 'group hover:bg-[rgba(255,255,255,0.08)]'}
              >
                {r.badge && (
                  <span
                    className="font-mono uppercase"
                    style={{
                      position: 'absolute',
                      top: '1.25rem',
                      right: '1.25rem',
                      fontSize: 10,
                      letterSpacing: '0.18em',
                      color: 'rgba(255,255,255,.65)',
                      background: 'rgba(255,255,255,.08)',
                      padding: '3px 8px',
                      borderRadius: 2,
                    }}
                  >
                    {r.badge}
                  </span>
                )}
                <span
                  className="font-mono block uppercase"
                  style={{ fontSize: 11, letterSpacing: '0.25em', color: 'rgba(255,255,255,.65)', marginBottom: '0.75rem' }}
                >
                  {r.num}
                </span>
                <div
                  className="font-heading font-bold"
                  style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '0.3rem', letterSpacing: '-0.01em' }}
                >
                  {r.title}
                </div>
                <div
                  className="font-mono uppercase"
                  style={{ fontSize: 10.5, letterSpacing: '0.15em', color: 'rgba(0,218,186,.9)', marginBottom: '1rem' }}
                >
                  {r.subtitle}
                </div>
                <p
                  className="font-body"
                  style={{ fontSize: 13.5, fontWeight: 300, color: 'rgba(255,255,255,.76)', lineHeight: 1.85, flex: 1, marginBottom: '1.5rem' }}
                >
                  {r.body}
                </p>
                <span
                  className="font-body font-semibold"
                  style={{ fontSize: 13, color: r.disabled ? 'rgba(255,255,255,.65)' : 'rgba(0,218,186,.85)' }}
                >
                  {r.cta} {r.disabled ? '（即將推出）' : '→'}
                </span>
              </div>
            );

            return r.disabled ? (
              <div key={r.num} style={{ cursor: 'not-allowed' }}>{inner}</div>
            ) : (
              <Link key={r.num} href={r.href} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column' }}>
                {inner}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── Newsletter ───────────────────────────────────────────────────── */
export function ResourcesNewsletterSection() {
  const { ref, reveal } = useReveal();
  return (
    <section
      ref={ref}
      id="resources-newsletter"
      aria-label="電子報訂閱"
      style={{
        background: '#152035',
        padding: 'clamp(70px,9vh,110px) clamp(2rem,5vw,6rem)',
      }}
    >
      <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
        <span
          className="font-mono block uppercase"
          style={{ ...reveal(0), fontSize: 11, letterSpacing: '0.22em', color: 'rgba(0,218,186,.78)', marginBottom: '1.5rem' }}
        >
          每週輿情洞察
        </span>
        <h2
          className="font-heading"
          style={{
            ...reveal(0.08),
            fontSize: 'clamp(1.8rem,2.8vw,2.6rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            color: '#fff',
            marginBottom: '1rem',
          }}
        >
          每週一份洞察，<br />
          <em style={{ fontStyle: 'italic', color: 'rgba(0,218,186,.85)' }}>直達您的信箱</em>
        </h2>
        <p
          className="font-body"
          style={{ ...reveal(0.16), fontSize: 14, fontWeight: 300, color: 'rgba(255,255,255,.55)', lineHeight: 1.8, marginBottom: '2rem' }}
        >
          訂閱我們的電子報，獲取最新輿情分析趨勢與產業洞察。
        </p>
        <div style={{ ...reveal(0.22), display: 'flex', gap: 1, maxWidth: 440, margin: '0 auto' }}>
          <input
            type="email"
            placeholder="輸入您的 Email"
            readOnly
            aria-label="Email 訂閱"
            style={{
              flex: 1,
              padding: '12px 16px',
              background: 'rgba(255,255,255,.07)',
              border: '1px solid rgba(255,255,255,.12)',
              borderRadius: 2,
              fontSize: 13.5,
              color: '#fff',
              outline: 'none',
              fontFamily: 'inherit',
            }}
          />
          <button
            type="button"
            className="font-heading font-bold rounded-[2px]"
            style={{
              padding: '12px 20px',
              background: 'rgba(0,218,186,.15)',
              border: '1px solid rgba(0,218,186,.35)',
              color: 'rgba(0,218,186,.9)',
              fontSize: 13,
              letterSpacing: '0.01em',
              cursor: 'default',
              whiteSpace: 'nowrap',
            }}
          >
            訂閱 →
          </button>
        </div>
        <p
          className="font-body"
          style={{ ...reveal(0.28), fontSize: 11, color: 'rgba(255,255,255,.5)', marginTop: '1rem', fontWeight: 300 }}
        >
          不定期發送，可隨時取消訂閱。
        </p>
      </div>
    </section>
  );
}
