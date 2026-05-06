'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { useInView } from '@/app/lib/animations';

const DEMO_HREF = 'https://calendly.com/personacast/demo';

export function CTASection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const reveal = (delay = 0) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity 0.65s cubic-bezier(0.4,0,0.2,1) ${delay}s, transform 0.65s cubic-bezier(0.4,0,0.2,1) ${delay}s`,
  });

  return (
    <section
      ref={ref}
      id="cta"
      aria-label="行動召喚"
      style={{
        background: '#0B1526',
        padding: 'clamp(90px,12vh,140px) clamp(2rem,5vw,6rem)',
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
        {/* Left */}
        <div>
          <span
            className="font-mono block uppercase"
            style={{ ...reveal(0), fontSize: 11, letterSpacing: '0.22em', color: 'rgba(255,255,255,.72)', marginBottom: '1.5rem' }}
          >
            重要情報已就位
          </span>
          <h2
            className="font-heading"
            style={{
              ...reveal(0.1),
              fontSize: 'clamp(2rem,3.8vw,3.8rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.08,
              color: '#fff',
              marginBottom: '1.25rem',
            }}
          >
            下一個決策，<br />在行動前帶著{' '}
            <em style={{ fontStyle: 'italic', color: 'rgba(0,218,186,.92)' }}>完整情報</em>
          </h2>
          <p
            className="font-body"
            style={{
              ...reveal(0.2),
              fontSize: 14.5,
              fontWeight: 300,
              color: 'rgba(255,255,255,.68)',
              lineHeight: 1.85,
              marginBottom: '2rem',
              maxWidth: 440,
            }}
          >
            PersonaCast 已協助超過 200 位企業領導者在關鍵時刻做出正確選擇。
            立即預約 30 分鐘演示，見識 AI 如何為你的決策提供完整的情境地圖。
          </p>
          <div className="flex items-center gap-3" style={reveal(0.28)}>
            <a
              href={DEMO_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center font-heading font-bold rounded-[2px] transition-opacity hover:opacity-85"
              style={{
                padding: '13px 28px',
                background: '#fff',
                color: '#0B1526',
                fontSize: 13.5,
                letterSpacing: '0.01em',
              }}
            >
              預約 30 分鐘演示 →
            </a>
            <Link
              href="/product"
              className="inline-flex items-center font-body rounded-[2px] transition-all hover:border-white/40 hover:text-white"
              style={{
                padding: '12px 20px',
                border: '1px solid rgba(255,255,255,.28)',
                color: 'rgba(255,255,255,.68)',
                fontSize: 13.5,
              }}
            >
              了解產品
            </Link>
          </div>
        </div>

        {/* Right */}
        <div style={reveal(0.15)}>
          <div
            style={{
              background: 'rgba(255,255,255,.03)',
              border: '1px solid rgba(255,255,255,.07)',
              borderRadius: 4,
              padding: 'clamp(1.5rem,3vw,2.5rem)',
            }}
          >
            {[
              { num: '72h', desc: '行動前的完整情報視窗' },
              { num: '3.4M', desc: '每次推演的情境路徑數' },
              { num: '94%', desc: '置信度閥值標準' },
            ].map(({ num, desc }, i) => (
              <div
                key={num}
                style={{
                  padding: '1.1rem 0',
                  borderBottom: i < 2 ? '1px solid rgba(255,255,255,.06)' : 'none',
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '1rem',
                }}
              >
                <span
                  className="font-heading font-bold"
                  style={{ fontSize: '1.6rem', color: 'rgba(0,218,186,.85)', letterSpacing: '-0.02em', minWidth: 60 }}
                >
                  {num}
                </span>
                <span className="font-body" style={{ fontSize: 13.5, color: 'rgba(255,255,255,.76)', fontWeight: 300 }}>
                  {desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
