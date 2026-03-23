'use client';

import { useState, useRef } from 'react';
import { useInView, useReducedMotion, cssTransition } from '@/app/lib/animations';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  readonly question: string;
  readonly answer: string;
}

interface FAQAccordionProps {
  readonly items: readonly FAQItem[];
}

function AccordionItem({ question, answer, index }: FAQItem & { index: number }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '-40px' });
  const reduced = useReducedMotion();

  return (
    <div
      ref={ref}
      className="border-b border-white/5"
      style={{
        opacity: reduced ? 1 : inView ? 1 : 0,
        transform: reduced ? 'none' : inView ? 'translateY(0)' : 'translateY(12px)',
        transition: cssTransition(['opacity', 'transform'], 0.4, index * 0.08),
      }}
    >
      <button
        type="button"
        className="w-full flex items-center justify-between py-5 text-left group"
        onClick={() => setOpen((p) => !p)}
        aria-expanded={open}
      >
        <span className="text-white font-semibold text-sm md:text-base pr-4 group-hover:text-[#769EDB] transition-colors">
          {question}
        </span>
        <ChevronDown
          size={18}
          className="shrink-0 text-[#94A3B8] transition-transform duration-300"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </button>

      <div
        className="overflow-hidden transition-all duration-300"
        style={{
          maxHeight: open ? '500px' : '0px',
          opacity: open ? 1 : 0,
        }}
      >
        <div className="pb-5 text-sm text-[#94A3B8] leading-relaxed whitespace-pre-line">
          {answer}
        </div>
      </div>
    </div>
  );
}

export function FAQAccordion({ items }: FAQAccordionProps) {
  return (
    <div className="max-w-3xl mx-auto">
      {items.map((item, i) => (
        <AccordionItem key={item.question} {...item} index={i} />
      ))}
    </div>
  );
}
