'use client';

import { useRef } from 'react';
import { useInView } from '@/app/lib/animations';

const PILLARS = [
  {
    num: '01 · 角色推演',
    title: '利害關係人數位分身',
    body: '建構每位關鍵人物的 AI 分身——媒體記者、監管機構、競爭對手——精準模擬他們在不同情境下的反應。',
  },
  {
    num: '02 · 策略圖譜',
    title: '多維度情報整合 MAM',
    body: '以知識圖譜技術整合市場動態、輿論走向與競爭態勢，即時揭示隱藏的機會節點與風險臨界點。',
  },
  {
    num: '03 · 情境引擎',
    title: '340 萬路徑並行推演',
    body: '每次推演同時計算超過 340 萬個情境路徑，即時生成機率評分、風險熱圖與最佳行動序列。',
  },
  {
    num: '04 · 決策簡報',
    title: 'C-suite 即時戰略報告',
    body: '自動生成決策摘要——有根據的建議、有數據的風險評估、有時間線的行動路徑。',
  },
];

const BAR_ROWS = [
  { label: '主動聲明', pct: 68, color: '#007A72' },
  { label: '法律強硬', pct: 21, color: '#C0392B' },
  { label: '沉默觀望', pct: 11, color: '#8898B8' },
];

export function PillarsSection() {
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
      id="pillars"
      aria-label="四個核心系統"
      style={{
        background: '#152035',
        padding: 'clamp(80px,10vh,120px) clamp(2rem,5vw,6rem)',
      }}
    >
      {/* Header */}
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          paddingBottom: '2.75rem',
          borderBottom: '1px solid rgba(255,255,255,.08)',
          marginBottom: '2.75rem',
        }}
      >
        <h2
          className="font-heading"
          style={{
            ...reveal(0),
            fontSize: 'clamp(1.9rem,3.3vw,3rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.15,
            color: '#fff',
            maxWidth: 480,
          }}
        >
          四個核心系統，{' '}
          <em style={{ fontStyle: 'italic', color: 'rgba(0,218,186,.82)' }}>完整</em>
          <br />
          <em style={{ fontStyle: 'italic', color: 'rgba(0,218,186,.82)' }}>覆蓋</em>決策鏈
        </h2>
        <p
          className="font-body"
          style={{
            ...reveal(0.15),
            fontSize: 14,
            fontWeight: 300,
            color: 'rgba(255,255,255,.76)',
            maxWidth: 260,
            lineHeight: 1.75,
            textAlign: 'right',
          }}
        >
          每一個功能都在回答一個問題：如果我這樣做，會發生什麼？
        </p>
      </div>

      {/* Grid */}
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 1,
          background: 'rgba(255,255,255,.06)',
        }}
      >
        {/* First 3 pillars */}
        {PILLARS.slice(0, 3).map((p, i) => (
          <PillarCard key={p.num} pillar={p} style={reveal(0.1 + i * 0.07)} />
        ))}

        {/* 4th pillar */}
        <PillarCard pillar={PILLARS[3]} style={reveal(0.31)} />

        {/* Result demo cell */}
        <div
          style={{
            ...reveal(0.38),
            gridColumn: '2 / 4',
            background: 'rgba(0,218,186,.04)',
            border: '1px solid rgba(0,218,186,.1)',
            padding: '2.25rem 2rem',
          }}
        >
          <span
            className="font-mono block uppercase"
            style={{ fontSize: 11, letterSpacing: '0.25em', color: 'rgba(0,218,186,.78)', marginBottom: '0.75rem' }}
          >
            推演結果示例 ·
          </span>
          <div
            className="font-heading font-bold"
            style={{ fontSize: '1.05rem', color: 'rgba(0,218,186,.85)', marginBottom: '1.25rem' }}
          >
            危機公關 · 漲價公告模擬
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
            {BAR_ROWS.map((row) => (
              <div key={row.label} className="flex items-center gap-3">
                <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${row.color}99 ${row.pct}%, rgba(255,255,255,.06) ${row.pct}%)` }} />
                <span
                  className="font-mono"
                  style={{ fontSize: 11, color: row.color, whiteSpace: 'nowrap', minWidth: 80, textAlign: 'right' }}
                >
                  {row.label} {row.pct}%
                </span>
              </div>
            ))}
          </div>
          <p
            className="font-body"
            style={{ marginTop: '1.25rem', fontSize: 11.5, fontWeight: 300, color: 'rgba(255,255,255,.52)', lineHeight: 1.7 }}
          >
            信任恢復 +78% · 訴訟風險 ×0.3 · 媒體輿論轉正 T+36h · 置信度 94%
          </p>
        </div>
      </div>
    </section>
  );
}

function PillarCard({
  pillar,
  style,
}: {
  pillar: { num: string; title: string; body: string };
  style: React.CSSProperties;
}) {
  return (
    <div
      style={{
        ...style,
        background: 'rgba(11,21,38,.7)',
        padding: '2.25rem 2rem',
        position: 'relative',
      }}
    >
      <span
        className="font-mono block uppercase"
        style={{ fontSize: 11, letterSpacing: '0.25em', color: 'rgba(255,255,255,.68)', marginBottom: '1.25rem' }}
      >
        {pillar.num}
      </span>
      <div
        className="font-heading font-bold"
        style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '0.65rem', letterSpacing: '-0.01em' }}
      >
        {pillar.title}
      </div>
      <p
        className="font-body"
        style={{ fontSize: 13.5, fontWeight: 300, color: 'rgba(255,255,255,.65)', lineHeight: 1.85 }}
      >
        {pillar.body}
      </p>
    </div>
  );
}
