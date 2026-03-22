'use client';

import { ScrollReveal } from '../shared/ScrollReveal';
import { DataTags } from './DataTags';

export function ComparisonPanel() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
      {/* Left card: Reactive Mode */}
      <ScrollReveal direction="left">
        <div className="relative rounded-xl bg-white/[0.03] border border-white/[0.07] p-8 lg:p-10 h-full">
          {/* Top accent — red risk bar */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-alert-red/50 to-transparent" />

          {/* Status badge */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-1.5 h-1.5 rounded-full bg-alert-red/70" />
            <span className="text-[10px] text-alert-red/60 tracking-[3px] uppercase font-mono font-medium">
              REACTIVE MODE
            </span>
          </div>

          {/* Heading */}
          <h3 className="text-2xl lg:text-[1.75rem] font-bold text-slate-300 font-heading tracking-tight leading-snug mb-4">
            事後救火：<br className="hidden lg:block" />昂貴的徒勞
          </h3>

          {/* Separator */}
          <div className="h-px w-10 bg-alert-red/20 mb-6" />

          {/* Body */}
          <p className="text-[15px] text-slate-500 leading-[1.8] max-w-md">
            傳統工具只記錄失敗。當負面聲量爆發，傷害已成定局 —— 您在盲目博弈，對手在看您失血。
          </p>

          {/* Bottom muted label — placeholder for future chart */}
          <div className="mt-10 pt-6 border-t border-white/[0.05]">
            <span className="text-[10px] font-mono text-white/15 tracking-[2px] uppercase">
              Reactive analysis · No prediction
            </span>
          </div>
        </div>
      </ScrollReveal>

      {/* Right card: Proactive Mode */}
      <ScrollReveal direction="right" delay={0.15}>
        <div className="relative rounded-xl bg-aurora-cyan/[0.03] border border-aurora-cyan/[0.12] p-8 lg:p-10 h-full">
          {/* Top accent — cyan signal bar */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-aurora-cyan/50 to-transparent" />

          {/* Status badge */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-1.5 h-1.5 rounded-full bg-aurora-cyan" />
            <span className="text-[10px] text-aurora-cyan/80 tracking-[3px] uppercase font-mono font-medium">
              PROACTIVE MODE
            </span>
          </div>

          {/* Heading */}
          <h3 className="text-2xl lg:text-[1.75rem] font-bold text-white font-heading tracking-tight leading-snug mb-4">
            預見式導航：<br className="hidden lg:block" />寫好的勝局
          </h3>

          {/* Separator */}
          <div className="h-px w-10 bg-aurora-cyan/25 mb-6" />

          {/* Body */}
          <p className="text-[15px] text-slate-400 leading-[1.8] max-w-md">
            行動前推演千萬次。鎖定 T+36h 最佳反擊窗口，看穿 80% 利益關係人的底牌，贏得毫無懸念。
          </p>

          {/* Data tags */}
          <DataTags />
        </div>
      </ScrollReveal>
    </div>
  );
}
