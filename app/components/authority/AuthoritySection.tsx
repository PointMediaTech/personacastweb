'use client';

import { useRef } from 'react';
import {
  useScrollProgress,
  useReducedMotion,
  interpolate,
} from '@/app/lib/animations';
import { CaseCard } from './CaseCard';
import { caseStudies } from './strategicRecordsData';

export function AuthoritySection() {
  return (
    <section
      id="authority"
      aria-label="戰略實績"
      className="relative"
    >
      {/* Background: dark base + grid + scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundColor: '#05070A' }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
        <div className="absolute inset-0 scanline-overlay" />
      </div>

      {/* Title — sticky at top of viewport */}
      <div
        className="sticky top-0 z-20 pt-20 md:pt-24 pb-6 px-6 lg:px-8 2xl:px-16"
        style={{
          background: 'linear-gradient(to bottom, #05070A 60%, transparent)',
        }}
      >
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-white mb-3 tracking-tight leading-[1.1]">
            被驗證的預演：從數據到結局的轉化
          </h2>
          <p className="text-sm md:text-base text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            我們不談論可能性。我們記錄的是如何透過算力，將不確定性從現實中肅清。
          </p>
        </div>
      </div>

      {/* Mobile: simple vertical stack */}
      <div className="md:hidden relative px-6 pt-12 pb-16 flex flex-col gap-6">
        {caseStudies.map((study, i) => (
          <CaseCard key={study.id} study={study} index={i} />
        ))}
      </div>

      {/* Desktop: sticky stacking cards */}
      <div className="hidden md:block relative pt-16 pb-[30vh]">
        {caseStudies.map((study, i) => (
          <StickyCard key={study.id} study={study} index={i} total={caseStudies.length} />
        ))}
      </div>

      {/* SEO content */}
      <ol className="sr-only">
        <li>案例 01：敘事攔截 — 72 小時內完成議題置換，負面聲量下降 82%</li>
        <li>案例 02：共識定錨 — 無衝突狀態下達成共識，排除 99.7% 阻礙路徑</li>
        <li>案例 03：爆紅路徑 — 鎖定 96% 爆紅路徑，完成一百次虛擬演習</li>
      </ol>
    </section>
  );
}

/* ─── Sticky Card with native CSS sticky + scroll-linked dimming ─── */

interface StickyCardProps {
  readonly study: (typeof caseStudies)[number];
  readonly index: number;
  readonly total: number;
}

function StickyCard({ study, index, total }: StickyCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const progress = useScrollProgress(cardRef);

  // Once this card scrolls past, dim + scale it so the next card stands out
  const hasNext = index < total - 1;

  const dimOpacity = hasNext
    ? interpolate(progress, 0.3, 0.8, 1, 0.35)
    : 1;

  const scale = hasNext && !prefersReducedMotion
    ? interpolate(progress, 0.3, 0.8, 1, 0.95)
    : 1;

  const rotateX = hasNext && !prefersReducedMotion
    ? interpolate(progress, 0.3, 0.8, 0, -2)
    : 0;

  // Each card sticks at an increasing top offset
  const stickyTop = 180 + index * 28;

  return (
    <div
      ref={cardRef}
      className="h-[80vh] px-6 lg:px-8 2xl:px-16"
    >
      <div
        className="sticky will-change-transform"
        style={{
          top: stickyTop,
          transform: `perspective(1200px) scale(${scale}) rotateX(${rotateX}deg)`,
          transformOrigin: 'center top',
          zIndex: index + 1,
        }}
      >
        <div
          style={{ opacity: dimOpacity }}
          className="max-w-5xl mx-auto"
        >
          <CaseCard study={study} index={index} />
        </div>
      </div>
    </div>
  );
}
