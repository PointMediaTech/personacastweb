'use client';

export function PersonaLabCard() {
  return (
    <div className="rounded-xl border border-white/[0.12] bg-gradient-to-b from-white/[0.05] to-white/[0.02] backdrop-blur-sm overflow-hidden flex flex-col shadow-[0_0_30px_rgba(118,158,219,0.05)]">
      {/* Header */}
      <div className="px-5 pt-[30px] lg:pt-[35px] pb-[22px] lg:pb-[29px]">
        <div className="text-base font-sans font-medium text-aurora-cyan/60 tracking-widest mb-1.5">[ 人格逆向建模 ]</div>
        <h3 className="text-xl lg:text-[25.6px] font-bold text-white/80 tracking-wide leading-tight">
          01. 行為逆向工程
        </h3>
      </div>

      {/* Visual Area */}
      <div className="relative h-[260px] lg:h-[380px] mx-3 rounded-lg overflow-hidden">
        <img
          src="/images/01_card.png"
          alt="PersonaLab 人格逆向建模"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Bottom description panel */}
      <div className="px-4 pb-4 pt-[22px] lg:pt-[26px]">
        <div className="bg-white/[0.04] border border-white/[0.08] rounded-lg px-[28px] lg:px-[35px] py-[22px] lg:py-[30px]">
          <div className="text-base font-sans font-medium text-aurora-cyan/60 tracking-widest mb-1.5">[ 執行：行為拆解 ]</div>
          <p className="text-xl lg:text-[25.6px] text-white/85 font-semibold leading-[1.4]">
            掌握行為底牌：比對手更了解他自己。
          </p>
        </div>
      </div>
    </div>
  );
}
