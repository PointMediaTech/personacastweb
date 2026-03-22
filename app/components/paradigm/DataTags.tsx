'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

const tags = [
  { value: '3.4M+', label: '情境模擬' },
  { value: 'T+72h', label: '預測深度' },
  { value: '80%', label: '行為洞察' },
];

export function DataTags() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const prefersReducedMotion = useReducedMotion();

  const tagClassName =
    'flex items-baseline gap-1.5 px-3 py-2 rounded border border-aurora-cyan/15 bg-aurora-cyan/[0.04]';

  return (
    <div ref={ref} className="flex flex-wrap gap-2.5 mt-8 pt-6 border-t border-white/[0.06]">
      {tags.map((tag, i) => {
        const content = (
          <>
            <span className="font-mono text-xs font-semibold text-aurora-cyan tabular-nums tracking-wide">
              {tag.value}
            </span>
            <span className="font-mono text-[10px] text-slate-500 tracking-wider uppercase">
              {tag.label}
            </span>
          </>
        );

        if (prefersReducedMotion) {
          return (
            <span key={tag.value} className={tagClassName}>
              {content}
            </span>
          );
        }

        return (
          <motion.span
            key={tag.value}
            initial={{ opacity: 0, y: 4 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
            transition={{
              duration: 0.3,
              delay: 0.3 + i * 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={tagClassName}
          >
            {content}
          </motion.span>
        );
      })}
    </div>
  );
}
