'use client';

import { ScrollReveal } from '../shared/ScrollReveal';
import { TraditionalChart } from './TraditionalChart';
import { PredictionPath } from './PredictionPath';
import { DataTags } from './DataTags';

export function ComparisonPanel() {
  return (
    <div className="flex flex-col lg:flex-row gap-0 max-w-7xl mx-auto">
      {/* Left card: Reactive Mode */}
      <ScrollReveal direction="left" className="w-full lg:w-[45%]">
        <div
          className="rounded-2xl lg:rounded-l-2xl lg:rounded-r-none bg-red-950/15 p-8 lg:p-10 relative overflow-hidden h-full"
        >
          {/* Radial gradient overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,77,77,0.05),transparent_70%)] pointer-events-none" />

          <div className="relative flex flex-col">
            {/* Status label */}
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-2.5 h-2.5 rounded-full bg-alert-red/40" />
              <span className="text-[11px] text-alert-red/40 tracking-[2px] uppercase font-mono">
                REACTIVE MODE
              </span>
            </div>

            {/* Heading */}
            <h3 className="text-xl lg:text-2xl font-bold text-[#777] mb-4 font-heading">
              事後救火：昂貴的徒勞
            </h3>

            {/* Body */}
            <p className="text-sm text-[#666] leading-relaxed">
              傳統工具只記錄失敗。當負面聲量爆發，傷害已成定局 —— 您在盲目博弈，對手在看您失血。
            </p>

            {/* Chart area — TraditionalChart preserved, to be redesigned later */}
            <div className="h-40 lg:h-48 mt-6 rounded-xl border border-dashed border-white/10 bg-red-950/10 flex items-center justify-center overflow-hidden">
              <TraditionalChart className="w-full h-full" />
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Gradient divider */}
      {/* Desktop: vertical line */}
      <div
        className="hidden lg:block w-px self-stretch bg-gradient-to-b from-alert-red/40 via-transparent to-aurora-cyan/40"
        aria-hidden="true"
      />
      {/* Mobile: horizontal line */}
      <div
        className="block lg:hidden h-px w-full my-6 bg-gradient-to-r from-alert-red/40 via-transparent to-aurora-cyan/40"
        aria-hidden="true"
      />

      {/* Right card: Proactive Mode */}
      <ScrollReveal direction="right" delay={0.15} className="w-full lg:w-[55%]">
        <div
          className="rounded-2xl lg:rounded-r-2xl lg:rounded-l-none bg-blue-950/20 p-8 lg:p-10 relative overflow-hidden border border-aurora-cyan/15 shadow-[0_0_30px_rgba(0,242,255,0.06)] h-full"
        >
          {/* Radial gradient overlays */}
          <div className="absolute top-0 right-0 w-2/3 h-full bg-[radial-gradient(ellipse_at_right,rgba(118,158,219,0.08),transparent_70%)] pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-1/2 h-1/2 bg-[radial-gradient(ellipse_at_bottom,rgba(0,242,255,0.03),transparent_70%)] pointer-events-none" />

          <div className="relative flex flex-col">
            {/* Status label */}
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-2.5 h-2.5 rounded-full bg-aurora-cyan shadow-[0_0_10px_rgba(0,242,255,0.6)]" />
              <span className="text-[11px] text-aurora-cyan tracking-[2px] uppercase font-mono">
                PROACTIVE MODE
              </span>
            </div>

            {/* Heading */}
            <h3 className="text-xl lg:text-2xl font-bold text-white mb-4 font-heading">
              預見式導航：寫好的勝局
            </h3>

            {/* Body */}
            <p className="text-sm text-mist-blue-gray leading-relaxed">
              行動前推演千萬次。鎖定 T+36h 最佳反擊窗口，看穿 80% 利益關係人的底牌，贏得毫無懸念。
            </p>

            {/* Chart area — PredictionPath preserved, to be redesigned later */}
            <div className="h-40 lg:h-48 mt-6 rounded-xl border border-dashed border-aurora-cyan/15 bg-blue-950/15 overflow-hidden">
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
