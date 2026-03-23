'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { useInView, useReducedMotion, cssTransition } from '@/app/lib/animations';

/* ── Cell data ── */

interface CellData {
  readonly tag: string;
  readonly title: string;
  readonly zhTitle: string;
  readonly desc: string;
  readonly href: string;
  readonly accent: string;
  readonly metric: string;
  readonly metricValue: string;
  readonly area: string;
  readonly isCore?: boolean;
  readonly stagger: number;
}

const CELLS: readonly CellData[] = [
  {
    tag: '[01]',
    title: 'Prompt Inception',
    zhTitle: '種子注入引擎',
    desc: '用自然語言定義議題核心、角色與情境變數。90 秒啟動一場完整推演。',
    href: '/product/seed-injection',
    accent: '#769EDB',
    metric: '爭議點解析',
    metricValue: '12',
    area: 'a',
    stagger: 0,
  },
  {
    tag: '[02]',
    title: 'Synthesis Engine',
    zhTitle: '圖譜建構系統',
    desc: '自動生成人格節點與社會關係拓撲。意見領袖、同溫層、斷裂線——一眼現形。',
    href: '/product/graph-engine',
    accent: '#00F2FF',
    metric: '人格節點',
    metricValue: '347',
    area: 'b',
    stagger: 0.1,
  },
  {
    tag: '[03]',
    title: 'Nexus Simulator',
    zhTitle: '推演劇場',
    desc: '數百個具獨立意志的 AI 人格在議題上即時辯論、表態、互相影響。這不是模擬對話——是一整個虛擬社會在你眼前運作。觀測沉默螺旋的形成、輿論風向的翻轉、以及每一個不可逆轉的臨界瞬間。',
    href: '/product/simulation-theater',
    accent: '#FFB800',
    metric: '即時互動',
    metricValue: '2,847',
    area: 'core',
    isCore: true,
    stagger: 0.2,
  },
  {
    tag: '[04]',
    title: 'Intelligence Decoder',
    zhTitle: '預測解碼器',
    desc: '將推演海量數據萃取為信心指數、風險評分與策略建議。零猜測，純計算。',
    href: '/product/predictive-decoder',
    accent: '#A3B8A0',
    metric: '信心指數',
    metricValue: '87.3%',
    area: 'c',
    stagger: 0.3,
  },
  {
    tag: '[05]',
    title: 'Strategic Assets',
    zhTitle: '數據資產庫',
    desc: '每次推演自動沉澱為可檢索的策略知識庫。你的輿情預判能力隨使用次數指數級成長。',
    href: '/product/data-assets',
    accent: '#C4A882',
    metric: '累積洞察',
    metricValue: '1,204',
    area: 'd',
    stagger: 0.4,
  },
] as const;

/* ── Single Pipeline Cell ── */

function Cell({
  cell,
  activeTag,
  onActivate,
}: {
  readonly cell: CellData;
  readonly activeTag: string | null;
  readonly onActivate: (tag: string | null) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '-40px' });
  const reduced = useReducedMotion();
  const [hoverPos, setHoverPos] = useState<{ x: number; y: number } | null>(null);

  const isDimmed = activeTag !== null && activeTag !== cell.tag;
  const isActive = activeTag === cell.tag;

  const enterStyle = reduced
    ? {}
    : {
        opacity: inView ? (isDimmed ? 0.7 : 1) : 0,
        transform: inView ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.97)',
        transition: cssTransition(['opacity', 'transform'], 0.5, cell.stagger),
      };

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      setHoverPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    },
    [],
  );

  return (
    <div
      ref={ref}
      className={`relative rounded-3xl overflow-hidden group w-full h-full flex flex-col ${cell.isCore ? 'core-cell' : ''}`}
      style={{ gridArea: cell.area, ...enterStyle }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHoverPos(null)}
      onClick={() => onActivate(isActive ? null : cell.tag)}
    >
      {/* Glass background — blur disabled on mobile for GPU perf */}
      <div
        className="absolute inset-0 md:[backdrop-filter:blur(12px)] md:[-webkit-backdrop-filter:blur(12px)]"
        style={{
          backgroundColor: cell.isCore ? 'rgba(2, 6, 23, 0.95)' : 'rgba(2, 6, 23, 0.8)',
        }}
      />

      {/* Spotlight glow following mouse */}
      {hoverPos && (
        <div
          className="absolute pointer-events-none"
          style={{
            left: hoverPos.x - 180,
            top: hoverPos.y - 180,
            width: 360,
            height: 360,
            background: `radial-gradient(circle, ${cell.accent}15 0%, transparent 70%)`,
          }}
        />
      )}

      {/* Border: default → accent on hover; inner shadow */}
      <div
        className="absolute inset-0 rounded-3xl pointer-events-none transition-all duration-300"
        style={{
          border: `1px solid ${isActive || cell.isCore ? cell.accent + (cell.isCore ? '80' : '60') : 'rgba(255,255,255,0.1)'}`,
          boxShadow: isActive || cell.isCore
            ? `inset 0 1px 1px rgba(255,255,255,0.04), 0 0 ${cell.isCore ? '50px' : '30px'} ${cell.accent}${cell.isCore ? '25' : '18'}`
            : 'inset 0 1px 1px rgba(255,255,255,0.04)',
        }}
      />
      
      <div
        className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ border: `1px solid ${cell.accent}50` }}
      />

      {/* Active or Core neon breathing */}
      {(isActive || cell.isCore) && (
        <div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{
            boxShadow: `0 0 ${cell.isCore ? '60px' : '40px'} ${cell.accent}${cell.isCore ? '30' : '20'}`,
            animation: 'neonBreathe 3s ease-in-out infinite',
          }}
        />
      )}

      {/* Content */}
      <Link
        href={cell.href}
        className={`relative z-10 flex flex-col h-full p-7 transition-transform duration-300 group-hover:-translate-y-0.5 ${cell.isCore ? 'lg:p-12 justify-center' : 'lg:p-8'}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Tag */}
        <div className="mb-4">
          <span
            className={`font-mono tracking-wider font-bold ${cell.isCore ? 'text-sm' : 'text-xs'}`}
            style={{ color: cell.accent }}
          >
            {cell.tag} <span className="text-white/40 ml-1">{cell.title}</span>
          </span>
        </div>

        {/* Chinese title */}
        <h3 className={`${cell.isCore ? 'text-4xl lg:text-5xl' : 'text-3xl lg:text-3xl'} font-bold text-white tracking-tight mb-4`}>
          {cell.zhTitle}
        </h3>

        {/* Description */}
        <p className={`${cell.isCore ? 'text-lg lg:text-xl' : 'text-base'} text-[#F8FAFC]/80 leading-relaxed flex-1`}>
          {cell.desc}
        </p>

        {/* Metric */}
        <div className={`mt-8 pt-5 border-t border-white/5 flex items-end justify-between ${cell.isCore ? 'mt-12' : ''}`}>
          <div>
            <p className={`font-mono text-white/30 uppercase tracking-widest mb-1 ${cell.isCore ? 'text-xs' : 'text-[10px]'}`}>
              {cell.metric}
            </p>
            <p
              className={`font-mono font-black ${cell.isCore ? 'text-6xl lg:text-7xl' : 'text-5xl lg:text-5xl'}`}
              style={{ color: cell.accent }}
            >
              {cell.metricValue}
            </p>
          </div>

          <span
            className="font-mono text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ color: cell.accent }}
          >
            深入探索 →
          </span>
        </div>
      </Link>
    </div>
  );
}

/* ── Main export ── */

export function ScrollExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { margin: '-60px' });
  const reduced = useReducedMotion();
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const titleReveal = reduced
    ? {}
    : {
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(20px)',
        transition: cssTransition(['opacity', 'transform'], 0.7, 0),
      };

  return (
    <section ref={sectionRef} id="experience" className="py-28 lg:py-40 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <div className="text-center mb-24" style={titleReveal}>
          <div className="inline-block px-4 py-1.5 rounded-full border border-[#00F2FF]/20 bg-[#00F2FF]/5 mb-6">
            <span className="text-sm font-mono text-[#00F2FF] uppercase tracking-widest">
              Deduction Pipeline
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            五步推演架構
          </h2>
          <p className="mt-6 text-lg text-[#E2E8F0] max-w-2xl mx-auto leading-relaxed">
            透過高度串聯的管線流，從議題注入到策略資產，每一步都為下一步鋪路。
          </p>
        </div>

        {/* Pipeline Grid Layout */}
        <div className="relative">
          {/* Animated Connectors (Desktop Only) */}
          <div className="hidden lg:block absolute inset-0 pointer-events-none z-0">
            <svg preserveAspectRatio="none" viewBox="0 0 100 100" className="w-full h-full opacity-60">
              <defs>
                <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FFB800" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#FFB800" stopOpacity="0" />
                </radialGradient>
              </defs>
              
              {/* Core intense background glow */}
              <circle cx="50" cy="50" r="35" fill="url(#coreGlow)" />
              
              {/* Base thin connecting lines */}
              <path d="M 14 25 C 28 25, 32 50, 48 50" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
              <path d="M 14 75 C 28 75, 32 50, 48 50" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
              <path d="M 52 50 C 68 50, 72 25, 86 25" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
              <path d="M 52 50 C 68 50, 72 75, 86 75" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2" vectorEffect="non-scaling-stroke" />

              {/* Glowing Data Flow lines */}
              <path d="M 14 25 C 28 25, 32 50, 48 50" fill="none" stroke="#769EDB" strokeWidth="2" vectorEffect="non-scaling-stroke" className="path-flow" style={{ animationDelay: '0s' }} />
              <path d="M 14 75 C 28 75, 32 50, 48 50" fill="none" stroke="#00F2FF" strokeWidth="2" vectorEffect="non-scaling-stroke" className="path-flow" style={{ animationDelay: '1s' }} />
              <path d="M 52 50 C 68 50, 72 25, 86 25" fill="none" stroke="#A3B8A0" strokeWidth="2" vectorEffect="non-scaling-stroke" className="path-flow" style={{ animationDelay: '2s' }} />
              <path d="M 52 50 C 68 50, 72 75, 86 75" fill="none" stroke="#C4A882" strokeWidth="2" vectorEffect="non-scaling-stroke" className="path-flow" style={{ animationDelay: '3s' }} />
            </svg>
          </div>

          <div className="pipelineGrid relative z-10 w-full">
            {CELLS.map((cell) => (
              <Cell
                key={cell.tag}
                cell={cell}
                activeTag={activeTag}
                onActivate={setActiveTag}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .pipelineGrid {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        @media (min-width: 1024px) {
          .pipelineGrid {
            display: grid;
            grid-template-columns: 1fr 1.6fr 1fr;
            grid-template-rows: 1fr 1fr;
            grid-template-areas:
              "a core c"
              "b core d";
            gap: 2.5rem;
            align-items: stretch;
            min-height: 700px;
          }
        }
        @keyframes neonBreathe {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; filter: brightness(1.2); }
        }
        .path-flow {
          stroke-dasharray: 10 100;
          stroke-dashoffset: 100;
          animation: flow 4s ease-in-out infinite;
          stroke-linecap: round;
          filter: drop-shadow(0 0 6px currentColor);
        }
        @keyframes flow {
          0% { stroke-dashoffset: 100; opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { stroke-dashoffset: -10; opacity: 0; }
        }
      `}</style>
    </section>
  );
}
