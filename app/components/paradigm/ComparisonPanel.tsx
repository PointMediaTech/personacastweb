'use client';

import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { ScrollReveal } from '../shared/ScrollReveal';
import { TraditionalChart } from './TraditionalChart';
import { PredictionPath } from './PredictionPath';

export function ComparisonPanel() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div ref={ref} className="flex flex-col md:flex-row rounded-xl border border-white/5 overflow-hidden">
      {/* Left Panel: Traditional */}
      <ScrollReveal direction="left" className="flex-1 bg-white/[0.02] p-7 border-b md:border-b-0 md:border-r border-white/5">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 rounded-full bg-[#666]" />
          <span className="text-[10px] text-[#666] tracking-[2px] uppercase font-mono">傳統輿情監測</span>
        </div>
        <div className="bg-white/[0.02] rounded-lg p-4 mb-3 border border-white/[0.04]">
          <TraditionalChart className="w-full h-auto" />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          <span className="text-[9px] px-2 py-0.5 rounded bg-white/[0.04] text-[#555] border border-white/[0.06]">後設式分析</span>
          <span className="text-[9px] px-2 py-0.5 rounded bg-white/[0.04] text-[#555] border border-white/[0.06]">無法重來的決策</span>
          <span className="text-[9px] px-2 py-0.5 rounded bg-alert-red/10 text-alert-red border border-alert-red/15">事後才知道</span>
        </div>
      </ScrollReveal>

      {/* Right Panel: PersonaCast */}
      <ScrollReveal direction="right" delay={0.2} className="flex-1 bg-strategic-blue/[0.04] p-7">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 rounded-full bg-aurora-cyan shadow-[0_0_8px_rgba(0,242,255,0.4)]" />
          <span className="text-[10px] text-aurora-cyan tracking-[2px] uppercase font-mono">PersonaCast 預演系統</span>
        </div>
        <div className="bg-strategic-blue/[0.06] rounded-lg p-4 mb-3 border border-strategic-blue/[0.12]">
          <PredictionPath animate={isInView} className="w-full h-auto" />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          <span className="text-[9px] px-2 py-0.5 rounded bg-aurora-cyan/[0.08] text-aurora-cyan border border-aurora-cyan/15">預測式分析</span>
          <span className="text-[9px] px-2 py-0.5 rounded bg-aurora-cyan/[0.08] text-aurora-cyan border border-aurora-cyan/15">可重來的決策</span>
          <span className="text-[9px] px-2 py-0.5 rounded bg-strategic-blue/10 text-strategic-blue border border-strategic-blue/15">事前就知道</span>
        </div>
      </ScrollReveal>
    </div>
  );
}
