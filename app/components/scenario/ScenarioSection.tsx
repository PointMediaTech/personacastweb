'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { useInView } from '@/app/lib/animations';

const TERMINAL_LINES = [
  '> scenario: 產品漲價公告 · 競爭對手反應模擬',
  '> personas: 12 · paths: 3,412,690 · time: 2.3s',
  '> confidence threshold: 85% ··· DONE',
];

const RESULT_ROWS = [
  { name: '主動聲明：附補償方案', pct: 89, tag: '推薦', tagColor: 'rgba(0,218,186,.9)', tagBg: 'rgba(0,218,186,.1)' },
  { name: '沉默觀望：待媒體反應', pct: 67, tag: '中性', tagColor: 'rgba(150,165,190,.78)', tagBg: 'rgba(255,255,255,.06)' },
  { name: '法律強硬回應',           pct: 31, tag: '高風險', tagColor: 'rgba(220,100,90,.9)', tagBg: 'rgba(192,57,43,.1)' },
];

export function ScenarioSection() {
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
      id="scenario"
      aria-label="推演劇場"
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
          gridTemplateColumns: '42% 58%',
          gap: 'clamp(3rem,5vw,6rem)',
          alignItems: 'center',
        }}
      >
        {/* Left */}
        <div>
          <span
            className="font-mono block uppercase"
            style={{ ...reveal(0), fontSize: 11, letterSpacing: '0.22em', color: 'rgba(0,218,186,.82)', marginBottom: '1.5rem' }}
          >
            推演劇場
          </span>
          <h2
            className="font-heading"
            style={{
              ...reveal(0.1),
              fontSize: 'clamp(1.8rem,2.8vw,2.7rem)',
              fontWeight: 800,
              letterSpacing: '-0.025em',
              lineHeight: 1.18,
              color: '#fff',
              marginBottom: '1rem',
            }}
          >
            帶著{' '}
            <em style={{ fontStyle: 'italic', color: 'rgba(0,218,186,.88)' }}>完整情報</em>
            <br />走進會議室
          </h2>
          <p
            className="font-body"
            style={{
              ...reveal(0.2),
              fontSize: 14.5,
              fontWeight: 300,
              color: 'rgba(255,255,255,.76)',
              lineHeight: 1.85,
              marginBottom: '1.5rem',
            }}
          >
            每個情境路徑都有機率評分、時間線預測、與建議行動序列。
            在行動前，你已看過所有可能的結局。
          </p>
          <Link
            href="/product/simulation-theater"
            className="font-body font-semibold transition-colors hover:underline"
            style={{ ...reveal(0.28), display: 'inline-block', fontSize: 13.5, color: 'rgba(0,218,186,.85)' }}
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
            boxShadow: '0 20px 60px rgba(0,0,0,.15)',
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
              style={{ fontSize: 10.5, color: 'rgba(255,255,255,.62)', letterSpacing: '0.14em' }}
            >
              PersonaCast · Simulation Live
            </span>
          </div>

          {/* Terminal body */}
          <div style={{ padding: '16px 14px' }}>
            {/* Prompt lines */}
            <div style={{ marginBottom: 16 }}>
              {TERMINAL_LINES.map((line, i) => (
                <div
                  key={i}
                  className="font-mono"
                  style={{
                    fontSize: 11,
                    color: 'rgba(0,218,186,.78)',
                    lineHeight: 1.65,
                  }}
                >
                  {line}
                </div>
              ))}
            </div>

            {/* Result rows */}
            {RESULT_ROWS.map((row) => (
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
                {/* Fill bar */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0, left: 0, bottom: 0,
                    width: `${row.pct}%`,
                    background: 'rgba(255,255,255,.02)',
                    zIndex: 0,
                  }}
                />
                <span
                  className="font-body relative"
                  style={{ fontSize: 12.5, fontWeight: 500, color: 'rgba(220,228,245,.88)', zIndex: 1 }}
                >
                  {row.name}
                </span>
                <div className="relative flex items-center gap-1.5" style={{ zIndex: 1 }}>
                  <span className="font-mono" style={{ fontSize: 12.5, fontWeight: 500, color: 'rgba(220,228,245,.88)' }}>
                    {row.pct}%
                  </span>
                  <span
                    className="font-mono uppercase"
                    style={{
                      fontSize: 8,
                      letterSpacing: '0.1em',
                      padding: '2px 5px',
                      borderRadius: 2,
                      color: row.tagColor,
                      background: row.tagBg,
                    }}
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
