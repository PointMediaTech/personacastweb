'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { useInView } from '@/app/lib/animations';

export function StatementSection() {
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
      id="statement"
      aria-label="核心命題"
      style={{
        background: '#0B1526',
        padding: 'clamp(80px,12vh,140px) clamp(2rem,5vw,6rem)',
        borderBottom: '1px solid rgba(255,255,255,.08)',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(3rem,6vw,7rem)',
          alignItems: 'end',
        }}
      >
        {/* Left */}
        <div>
          <span
            className="font-mono block uppercase"
            style={{ ...reveal(0), fontSize: 11, letterSpacing: '0.22em', color: 'rgba(0,218,186,.82)', marginBottom: '1.75rem' }}
          >
            核心命題
          </span>
          <h2
            className="font-heading"
            style={{
              ...reveal(0.1),
              fontSize: 'clamp(2.6rem,4.8vw,4.8rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.08,
              color: '#fff',
            }}
          >
            決策失誤<br />從不是因為<br />
            <em style={{ fontStyle: 'normal', color: 'rgba(0,218,186,.88)' }}>不夠勇敢</em>
          </h2>
        </div>

        {/* Right */}
        <div style={{ paddingBottom: '0.5rem' }}>
          <blockquote
            className="font-body"
            style={{
              ...reveal(0.2),
              fontSize: 'clamp(1rem,1.9vw,1.45rem)',
              fontWeight: 300,
              color: 'rgba(255,255,255,.76)',
              lineHeight: 1.75,
              marginBottom: '1.75rem',
              borderLeft: '2px solid rgba(0,218,186,.5)',
              paddingLeft: '1.4rem',
            }}
          >
            大多數的戰略失誤，根本原因是{' '}
            <strong style={{ color: '#fff', fontWeight: 700 }}>情報不足</strong>——你用
            有限的資訊做了代價昂貴的賭注。PersonaCast
            讓你在行動前，看見你所有的可能性。
          </blockquote>
          <Link
            href="/product"
            className="font-body font-semibold transition-colors hover:underline"
            style={{ ...reveal(0.3), display: 'inline-block', fontSize: 13.5, color: 'rgba(0,218,186,.85)' }}
          >
            了解 PersonaCast 如何運作 →
          </Link>
        </div>
      </div>
    </section>
  );
}
