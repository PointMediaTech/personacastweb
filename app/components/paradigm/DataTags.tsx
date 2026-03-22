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

  return (
    <div ref={ref} className="mt-10 pt-6 border-t border-aurora-cyan/[0.08]">
      <div className="grid grid-cols-3 gap-4">
        {tags.map((tag, i) => {
          const content = (
            <div className="flex flex-col">
              <span className="font-mono text-base font-semibold text-aurora-cyan/90 tabular-nums tracking-wide">
                {tag.value}
              </span>
              <span className="font-mono text-[10px] text-slate-500 tracking-wider uppercase mt-1">
                {tag.label}
              </span>
            </div>
          );

          if (prefersReducedMotion) {
            return <div key={tag.value}>{content}</div>;
          }

          return (
            <motion.div
              key={tag.value}
              initial={{ opacity: 0, y: 6 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
              transition={{
                duration: 0.35,
                delay: 0.3 + i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {content}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
