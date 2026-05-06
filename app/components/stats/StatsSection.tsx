'use client';

import { useRef } from 'react';
import { useInView } from '@/app/lib/animations';

const STATS = [
  { num: '3.4', sup: 'M+', label1: '每次推演', label2: '情境路徑數' },
  { num: '98',  sup: '%',  label1: '情境預測', label2: '準確率' },
  { num: '−40', sup: '%',  label1: '決策失誤', label2: '平均降幅' },
  { num: '200', sup: '+',  label1: '企業領導者', label2: '信報使用' },
];

export function StatsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const reveal = (delay = 0) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(16px)',
    transition: `opacity 0.6s cubic-bezier(0.4,0,0.2,1) ${delay}s, transform 0.6s cubic-bezier(0.4,0,0.2,1) ${delay}s`,
  });

  return (
    <section
      ref={ref}
      id="stats"
      aria-label="關鍵指標"
      style={{
        background: '#EEF3FB',
        padding: 'clamp(60px,8vh,90px) clamp(2rem,5vw,6rem)',
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
        {STATS.map((stat, i) => (
          <div
            key={stat.num}
            style={{
              ...reveal(i * 0.08),
              padding: '2rem 0',
              borderRight: i < 3 ? '1px solid #D0DCF0' : 'none',
              paddingLeft: i > 0 ? 'clamp(1.5rem,3vw,3rem)' : 0,
              paddingRight: i < 3 ? 'clamp(1.5rem,3vw,3rem)' : 0,
            }}
          >
            <div className="font-heading" style={{ fontSize: '2.6rem', fontWeight: 800, color: '#020617', lineHeight: 1, marginBottom: '0.25rem', letterSpacing: '-0.03em' }}>
              {stat.num}
              <sup style={{ fontSize: '1rem', fontWeight: 700, verticalAlign: 'super', marginLeft: 2, color: '#00838A' }}>{stat.sup}</sup>
            </div>
            <div className="font-body" style={{ fontSize: 13, color: '#4A5A72', marginTop: '0.5rem', lineHeight: 1.55 }}>
              {stat.label1}<br />{stat.label2}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
