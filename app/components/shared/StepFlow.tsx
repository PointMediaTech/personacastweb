'use client';

import { useRef } from 'react';
import { useInView, useReducedMotion, cssTransition } from '@/app/lib/animations';

interface Step {
  readonly number: string;
  readonly title: string;
  readonly description: string;
}

interface StepFlowProps {
  readonly steps: readonly Step[];
  readonly layout?: 'horizontal' | 'vertical';
  readonly accentColor?: string;
}

export function StepFlow({
  steps,
  layout = 'vertical',
  accentColor = '#769EDB',
}: StepFlowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '-60px' });
  const reduced = useReducedMotion();

  const isHorizontal = layout === 'horizontal';

  return (
    <div
      ref={ref}
      className={
        isHorizontal
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'
          : 'relative flex flex-col gap-0'
      }
    >
      {steps.map((step, i) => {
        const fadeStyle = reduced
          ? {}
          : {
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(16px)',
              transition: cssTransition(['opacity', 'transform'], 0.5, i * 0.12),
            };

        if (isHorizontal) {
          return (
            <div
              key={step.number}
              className="relative rounded-xl p-6"
              style={{
                ...fadeStyle,
                backgroundColor: 'rgba(17,24,39,0.5)',
                border: '1px solid rgba(118,158,219,0.06)',
              }}
            >
              <span
                className="font-mono text-xs font-bold tracking-widest"
                style={{ color: accentColor }}
              >
                STEP {step.number}
              </span>
              <h3 className="mt-2 text-base font-bold text-white">{step.title}</h3>
              <p className="mt-2 text-sm text-[#94A3B8] leading-relaxed">{step.description}</p>
            </div>
          );
        }

        return (
          <div key={step.number} className="relative flex gap-6" style={fadeStyle}>
            {/* Connector line + dot */}
            <div className="flex flex-col items-center">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                style={{
                  backgroundColor: `${accentColor}20`,
                  border: `2px solid ${accentColor}60`,
                }}
              >
                {step.number}
              </div>
              {i < steps.length - 1 && (
                <div
                  className="w-px flex-1 my-2"
                  style={{ backgroundColor: `${accentColor}20` }}
                />
              )}
            </div>

            {/* Content */}
            <div className="pb-10">
              <h3 className="text-base font-bold text-white">{step.title}</h3>
              <p className="mt-2 text-sm text-[#94A3B8] leading-relaxed max-w-xl">
                {step.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
