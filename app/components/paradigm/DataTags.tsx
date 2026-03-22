'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

const tags = [
  '3.4M+ 情境模擬',
  'T+72h 預測深度',
  '80% 行為洞察',
];

export function DataTags() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const prefersReducedMotion = useReducedMotion();

  return (
    <div ref={ref} className="flex flex-wrap gap-3 mt-6">
      {tags.map((tag, i) => {
        if (prefersReducedMotion) {
          return (
            <span
              key={tag}
              className="px-3 py-1.5 rounded-md bg-aurora-cyan/10 border border-aurora-cyan/15 font-mono text-[11px] tracking-wider text-aurora-cyan/80"
            >
              {tag}
            </span>
          );
        }

        return (
          <motion.span
            key={tag}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{
              duration: 0.4,
              delay: 0.3 + i * 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="px-3 py-1.5 rounded-md bg-aurora-cyan/10 border border-aurora-cyan/15 font-mono text-[11px] tracking-wider text-aurora-cyan/80"
          >
            {tag}
          </motion.span>
        );
      })}
    </div>
  );
}
