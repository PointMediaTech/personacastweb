import type { Metadata } from 'next';
import { ContactForm } from './ContactForm';

export const metadata: Metadata = {
  title: '聯絡我們 & 預約 Demo | PersonaCast',
  description:
    '預約 PersonaCast 一對一產品演示，或聯繫我們的團隊討論您的輿情預判需求。我們通常在 24 小時內回覆。',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: '聯絡我們 & 預約 Demo | PersonaCast',
    description:
      '預約 PersonaCast 一對一產品演示，或聯繫我們的團隊討論您的輿情預判需求。',
    url: '/contact',
  },
};

const DEMO_HREF = 'https://calendly.com/personacast/demo';

export default function ContactPage() {
  return (
    <main>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section
        aria-label="聯絡我們"
        style={{
          background: '#0B1526',
          backgroundImage:
            'radial-gradient(ellipse 55% 50% at 30% 40%, rgba(0,95,163,.15) 0%, transparent 65%)',
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
            bottom: '-0.1em',
            fontSize: 'clamp(100px,13vw,200px)',
            fontWeight: 800,
            color: 'rgba(255,255,255,.022)',
            letterSpacing: '-0.04em',
            lineHeight: 1,
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          CONTACT
        </div>

        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(3rem,6vw,8rem)',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          {/* Left column */}
          <div>
            <span
              className="font-mono block uppercase"
              style={{ fontSize: 11, letterSpacing: '0.22em', color: 'rgba(255,255,255,.68)', marginBottom: '1.5rem' }}
            >
              聯絡我們
            </span>
            <h1
              className="font-heading hero-anim-0"
              style={{
                fontSize: 'clamp(2.2rem,4vw,4.2rem)',
                fontWeight: 800,
                letterSpacing: '-0.04em',
                lineHeight: 1.06,
                color: '#fff',
                marginBottom: '1.25rem',
              }}
            >
              讓我們為您<br />
              預演一場{' '}
              <em style={{ fontStyle: 'italic', color: 'rgba(0,218,186,.9)' }}>輿論戰</em>
            </h1>
            <p
              className="font-body hero-anim-1"
              style={{
                fontSize: 'clamp(14px,1.5vw,16px)',
                fontWeight: 300,
                color: 'rgba(255,255,255,.76)',
                lineHeight: 1.85,
                marginBottom: '2.5rem',
                maxWidth: 420,
              }}
            >
              預約一對一 Demo，我們的團隊將根據您的真實場景，
              現場演示推演能力。不是罐頭簡報——是用您的議題，跑您的推演。
            </p>

            {/* Contact info block */}
            <div
              className="hero-anim-2"
              style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    background: 'rgba(255,255,255,.07)',
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: 2,
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.7)" strokeWidth="1.5">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m2 7 10 7 10-7" />
                  </svg>
                </div>
                <div>
                  <div className="font-mono uppercase" style={{ fontSize: 10.5, letterSpacing: '0.2em', color: 'rgba(255,255,255,.62)', marginBottom: '0.2rem' }}>電子郵件</div>
                  <div className="font-body" style={{ fontSize: 13.5, color: 'rgba(255,255,255,.78)', fontWeight: 300 }}>contact@personacast.ai</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    background: 'rgba(255,255,255,.07)',
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: 2,
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.7)" strokeWidth="1.5">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <div>
                  <div className="font-mono uppercase" style={{ fontSize: 10.5, letterSpacing: '0.2em', color: 'rgba(255,255,255,.62)', marginBottom: '0.2rem' }}>社群媒體</div>
                  <div className="font-body" style={{ fontSize: 13.5, color: 'rgba(255,255,255,.78)', fontWeight: 300 }}>LinkedIn / X (Twitter)</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    background: 'rgba(255,255,255,.07)',
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: 2,
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.7)" strokeWidth="1.5">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <div className="font-mono uppercase" style={{ fontSize: 10.5, letterSpacing: '0.2em', color: 'rgba(255,255,255,.62)', marginBottom: '0.2rem' }}>辦公室</div>
                  <div className="font-body" style={{ fontSize: 13.5, color: 'rgba(255,255,255,.78)', fontWeight: 300 }}>台北市（詳細地址即將公布）</div>
                </div>
              </div>
            </div>

            {/* Calendly CTA */}
            <div className="hero-anim-2" style={{ marginTop: '2.5rem' }}>
              <div
                className="font-mono uppercase"
                style={{ fontSize: 10.5, letterSpacing: '0.2em', color: 'rgba(255,255,255,.55)', marginBottom: '0.75rem' }}
              >
                或直接預約時段
              </div>
              <a
                href={DEMO_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center font-heading font-bold rounded-[2px] transition-opacity hover:opacity-85"
                style={{
                  padding: '11px 22px',
                  background: 'rgba(0,218,186,.12)',
                  border: '1px solid rgba(0,218,186,.35)',
                  color: 'rgba(0,218,186,.9)',
                  fontSize: 13,
                  letterSpacing: '0.01em',
                  gap: '0.5rem',
                }}
              >
                Calendly 預約 Demo →
              </a>
            </div>
          </div>

          {/* Right column — Form */}
          <div
            style={{
              background: 'rgba(255,255,255,.04)',
              border: '1px solid rgba(255,255,255,.1)',
              borderRadius: 2,
              padding: 'clamp(1.5rem,3vw,2.5rem)',
            }}
          >
            <div style={{ marginBottom: '1.5rem' }}>
              <div className="font-mono uppercase" style={{ fontSize: 10.5, letterSpacing: '0.25em', color: 'rgba(0,218,186,.88)', marginBottom: '0.5rem' }}>
                預約演示申請
              </div>
              <h2 className="font-heading" style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>
                填寫申請表單
              </h2>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* ── Response promise strip ───────────────────────────────────── */}
      <section
        aria-label="回覆承諾"
        style={{
          background: '#EEF3FB',
          padding: 'clamp(48px,6vh,72px) clamp(2rem,5vw,6rem)',
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 1,
            background: '#D0DCF0',
          }}
        >
          {[
            { metric: '< 24h', label: '工作天回覆時效', desc: '我們的團隊承諾在一個工作天內聯繫您' },
            { metric: '1:1', label: '一對一演示', desc: '不是群組說明會，是針對您場景的客製化演示' },
            { metric: '0', label: '罐頭簡報', desc: '每次演示都使用您的真實議題即時推演' },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                background: '#fff',
                padding: '2rem',
              }}
            >
              <div
                className="font-heading"
                style={{ fontSize: '2rem', fontWeight: 800, color: '#020617', letterSpacing: '-0.03em', lineHeight: 1, marginBottom: '0.4rem' }}
              >
                {item.metric}
              </div>
              <div
                className="font-mono uppercase"
                style={{ fontSize: 10.5, letterSpacing: '0.18em', color: '#00838A', marginBottom: '0.6rem' }}
              >
                {item.label}
              </div>
              <p
                className="font-body"
                style={{ fontSize: 13, fontWeight: 300, color: '#4A5A72', lineHeight: 1.75 }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
