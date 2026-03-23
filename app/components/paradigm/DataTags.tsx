'use client';

import { useRef } from 'react';
import { useInView, useReducedMotion, EASE_CSS } from '@/app/lib/animations';

const tags = [
  { value: '340萬+', label: '模擬規模' },
  { value: '72h', label: '領先預警' },
  { value: '80%', label: '行為預判精度' },
] as const;

export function DataTags() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const prefersReducedMotion = useReducedMotion();

  return (
    <div ref={ref} className="mt-10 pt-6 border-t border-aurora-cyan/[0.1]">
      <div
        className="grid gap-0"
        style={{ gridTemplateColumns: 'auto 1px auto 1px auto' }}
      >
        {tags.map((tag, i) => {
          const delay = 0.3 + i * 0.15;
          const cell = (
            <div className="flex flex-col pr-6 lg:pr-8">
              <span className="font-heading text-3xl lg:text-4xl font-extrabold text-aurora-cyan tabular-nums tracking-tight leading-none">
                {tag.value}
              </span>
              <span className="font-mono text-[11px] text-slate-500 tracking-wider uppercase mt-2">
                {tag.label}
              </span>
            </div>
          );

          const animated = prefersReducedMotion ? (
            cell
          ) : (
            <div
              style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? 'translateY(0)' : 'translateY(8px)',
                transition: `opacity 0.4s ${EASE_CSS} ${delay}s, transform 0.4s ${EASE_CSS} ${delay}s`,
              }}
            >
              {cell}
            </div>
          );

          return (
            <div key={tag.value} className="contents">
              {/* Divider before 2nd and 3rd items */}
              {i > 0 && (
                <div className="bg-aurora-cyan/20 self-stretch mx-4 lg:mx-6" />
              )}
              {animated}
            </div>
          );
        })}
      </div>
    </div>
  );
}
