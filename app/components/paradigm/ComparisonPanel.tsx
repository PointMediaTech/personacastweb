'use client';

import { ScrollReveal } from '../shared/ScrollReveal';
import { TraditionalChart } from './TraditionalChart';
import { PredictionPath } from './PredictionPath';
import { DataTags } from './DataTags';

export function ComparisonPanel() {
  return (
    <div className="flex flex-col lg:flex-row gap-0 max-w-7xl mx-auto">
      {/* Left card: Reactive Mode — "risk alert" aesthetic */}
      <ScrollReveal direction="left" className="w-full lg:w-[45%]">
        <div
          className="rounded-lg lg:rounded-l-lg lg:rounded-r-none bg-white/[0.02] border border-white/[0.06] p-8 lg:p-10 relative overflow-hidden h-full"
        >
          {/* Top accent bar — red warning stripe */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-alert-red/50" />

          <div className="relative flex flex-col">
            {/* Status label */}
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-2 h-2 rounded-full bg-alert-red/60" />
              <span className="text-[11px] text-alert-red/60 tracking-[3px] uppercase font-mono font-medium">
                REACTIVE MODE
              </span>
            </div>

            {/* Heading — higher contrast for WCAG AA */}
            <h3 className="text-xl lg:text-2xl font-bold text-slate-400 mb-3 font-heading tracking-tight">
              事後救火：昂貴的徒勞
            </h3>

            {/* Ruled separator */}
            <div className="h-px w-12 bg-white/10 mb-4" />

            {/* Body — slate-500 passes 4.5:1 on deep-space */}
            <p className="text-sm text-slate-500 leading-relaxed">
              傳統工具只記錄失敗。當負面聲量爆發，傷害已成定局 —— 您在盲目博弈，對手在看您失血。
            </p>

            {/* Chart area */}
            <div className="h-40 lg:h-48 mt-6 rounded-md border border-white/[0.06] bg-white/[0.01] flex items-center justify-center overflow-hidden">
              <TraditionalChart className="w-full h-full" />
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Gradient divider — sharper, finance-grade */}
      {/* Desktop: vertical line */}
      <div
        className="hidden lg:block w-px self-stretch bg-gradient-to-b from-alert-red/30 via-white/[0.06] to-aurora-cyan/30"
        aria-hidden="true"
      />
      {/* Mobile: horizontal line */}
      <div
        className="block lg:hidden h-px w-full my-8 bg-gradient-to-r from-alert-red/30 via-white/[0.06] to-aurora-cyan/30"
        aria-hidden="true"
      />

      {/* Right card: Proactive Mode — "signal confirmed" aesthetic */}
      <ScrollReveal direction="right" delay={0.15} className="w-full lg:w-[55%]">
        <div
          className="rounded-lg lg:rounded-r-lg lg:rounded-l-none bg-aurora-cyan/[0.03] border border-aurora-cyan/20 p-8 lg:p-10 relative overflow-hidden h-full"
        >
          {/* Top accent bar — cyan signal line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-aurora-cyan/60" />

          <div className="relative flex flex-col">
            {/* Status label */}
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-2 h-2 rounded-full bg-aurora-cyan" />
              <span className="text-[11px] text-aurora-cyan tracking-[3px] uppercase font-mono font-medium">
                PROACTIVE MODE
              </span>
            </div>

            {/* Heading */}
            <h3 className="text-xl lg:text-2xl font-bold text-white mb-3 font-heading tracking-tight">
              預見式導航：寫好的勝局
            </h3>

            {/* Ruled separator */}
            <div className="h-px w-12 bg-aurora-cyan/20 mb-4" />

            {/* Body */}
            <p className="text-sm text-slate-300 leading-relaxed">
              行動前推演千萬次。鎖定 T+36h 最佳反擊窗口，看穿 80% 利益關係人的底牌，贏得毫無懸念。
            </p>

            {/* Chart area */}
            <div className="h-40 lg:h-48 mt-6 rounded-md border border-aurora-cyan/10 bg-aurora-cyan/[0.02] overflow-hidden">
              <PredictionPath animate className="w-full h-full" />
            </div>

            {/* Data tags */}
            <DataTags />
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
