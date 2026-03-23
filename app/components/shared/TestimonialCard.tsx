'use client';

import { useRef } from 'react';
import { useInView, useReducedMotion, cssTransition } from '@/app/lib/animations';

interface TestimonialCardProps {
  readonly quote: string;
  readonly author: string;
  readonly title: string;
}

export function TestimonialCard({ quote, author, title }: TestimonialCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '-60px' });
  const reduced = useReducedMotion();

  return (
    <div
      ref={ref}
      className="relative rounded-xl p-8 lg:p-10"
      style={{
        backgroundColor: 'rgba(17,24,39,0.65)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(118,158,219,0.1)',
        opacity: reduced ? 1 : inView ? 1 : 0,
        transform: reduced ? 'none' : inView ? 'translateY(0)' : 'translateY(16px)',
        transition: cssTransition(['opacity', 'transform'], 0.7, 0),
      }}
    >
      {/* Quote mark */}
      <span
        className="absolute top-4 left-6 text-5xl font-serif leading-none select-none"
        style={{ color: 'rgba(118,158,219,0.15)' }}
        aria-hidden="true"
      >
        &ldquo;
      </span>

      <blockquote className="relative">
        <p className="text-white text-base md:text-lg leading-relaxed italic">
          &ldquo;{quote}&rdquo;
        </p>
        <footer className="mt-6 flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold"
            style={{ backgroundColor: 'rgba(118,158,219,0.15)', color: '#769EDB' }}
          >
            {author.charAt(0)}
          </div>
          <div>
            <cite className="not-italic text-sm font-semibold text-white">{author}</cite>
            <p className="text-xs text-[#94A3B8]">{title}</p>
          </div>
        </footer>
      </blockquote>
    </div>
  );
}
