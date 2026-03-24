'use client';

import { useRef, useState } from 'react';
import { useInView, useReducedMotion, cssTransition } from '@/app/lib/animations';

interface CompareRow {
  readonly feature: string;
  readonly insight: string | boolean;
  readonly foresight: string | boolean;
  readonly command: string | boolean;
}

const rows: CompareRow[] = [
  { feature: '月度推演次數', insight: '50 次', foresight: '300 次', command: '無上限' },
  { feature: 'AI 人格數量', insight: '最多 5 個', foresight: '最多 30 個', command: '無上限' },
  { feature: '推演歷史保留', insight: '30 天', foresight: '1 年', command: '永久' },
  { feature: '數據匯出', insight: 'CSV', foresight: 'CSV + API', command: '全格式' },
  { feature: 'SSO / SAML 登入', insight: false, foresight: true, command: true },
  { feature: '私有部署選項', insight: false, foresight: false, command: true },
  { feature: '客製化整合 + SLA', insight: false, foresight: false, command: true },
  { feature: '專屬客戶成功經理', insight: false, foresight: false, command: true },
  { feature: '技術支援', insight: '社群', foresight: '優先', command: '24/7 專屬' },
];

function Cell({ value }: { value: string | boolean }) {
  if (typeof value === 'boolean') {
    return value ? (
      <span style={{ color: '#769EDB' }} className="text-lg">✓</span>
    ) : (
      <span style={{ color: '#364050' }} className="text-base">—</span>
    );
  }
  return <span className="text-base text-[#94A3B8]">{value}</span>;
}

export function FeatureCompareTable() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '-40px' });
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);

  return (
    <div
      ref={ref}
      className="mx-auto max-w-4xl px-6"
      style={{
        opacity: reduced ? 1 : inView ? 1 : 0,
        transform: reduced ? 'none' : inView ? 'translateY(0)' : 'translateY(16px)',
        transition: cssTransition(['opacity', 'transform'], 0.6, 0),
      }}
    >
      {/* Toggle button */}
      <div className="text-center mb-6">
        <button
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center gap-2 text-base font-medium transition-colors duration-200"
          style={{ color: '#769EDB' }}
        >
          <span>{open ? '收起功能對比表' : '查看完整功能對比'}</span>
          <span
            className="text-xs transition-transform duration-300"
            style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', display: 'inline-block' }}
          >
            ▾
          </span>
        </button>
      </div>

      {/* Collapsible table */}
      <div
        className="overflow-hidden transition-all duration-500"
        style={{ maxHeight: open ? '800px' : '0px', opacity: open ? 1 : 0 }}
      >
        <div
          className="rounded-xl overflow-hidden"
          style={{ border: '1px solid rgba(118,158,219,0.1)' }}
        >
          {/* Table header */}
          <div
            className="grid grid-cols-4 px-5 py-4"
            style={{ background: 'rgba(118,158,219,0.06)' }}
          >
            <div className="text-base font-bold text-[#94A3B8] uppercase tracking-wider">功能</div>
            <div className="text-base font-bold text-center uppercase tracking-wider" style={{ color: '#94A3B8' }}>洞察版</div>
            <div className="text-base font-bold text-center uppercase tracking-wider" style={{ color: '#A8C4F0' }}>預判版 ✦</div>
            <div className="text-base font-bold text-center uppercase tracking-wider" style={{ color: '#94A3B8' }}>指揮版</div>
          </div>

          {/* Rows */}
          {rows.map((row, i) => (
            <div
              key={row.feature}
              className="grid grid-cols-4 px-5 py-4 items-center"
              style={{
                background: i % 2 === 0 ? 'rgba(17,24,39,0.4)' : 'rgba(17,24,39,0.2)',
                borderTop: '1px solid rgba(118,158,219,0.05)',
              }}
            >
              <div className="text-base text-[#94A3B8]">{row.feature}</div>
              <div className="text-center"><Cell value={row.insight} /></div>
              <div className="text-center"><Cell value={row.foresight} /></div>
              <div className="text-center"><Cell value={row.command} /></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
