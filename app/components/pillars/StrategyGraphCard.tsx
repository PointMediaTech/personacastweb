import Image from 'next/image';

export function StrategyGraphCard() {
  return (
    <div className="rounded-xl border border-white/[0.12] bg-gradient-to-b from-white/[0.05] to-white/[0.02] backdrop-blur-sm overflow-hidden flex flex-col shadow-[0_0_30px_rgba(0,242,255,0.05)]">
      {/* Header */}
      <div className="px-5 pt-[30px] lg:pt-[35px] pb-[22px] lg:pb-[29px]">
        <div className="text-base font-sans font-medium text-aurora-cyan/60 tracking-widest mb-1.5">[ 因果邏輯掃描 ]</div>
        <h3 className="text-xl lg:text-[25.6px] font-bold text-white/80 tracking-wide leading-tight">
          02. 全局利益掃描
        </h3>
      </div>

      {/* Visual Area */}
      <div className="relative h-[260px] lg:h-[380px] mx-3 rounded-lg overflow-hidden">
        <Image
          src="/images/02_card.webp"
          alt="Strategy Graph 全局利益掃描"
          fill
          sizes="(max-width: 1024px) 100vw, 33vw"
          className="object-cover"
        />
      </div>

      {/* Bottom description panel */}
      <div className="px-4 pb-4 pt-[22px] lg:pt-[26px]">
        <div className="bg-white/[0.04] border border-white/[0.08] rounded-lg px-[28px] lg:px-[35px] py-[22px] lg:py-[30px]">
          <div className="text-base font-sans font-medium text-aurora-cyan/60 tracking-widest mb-1.5">[ 執行：源頭溯源 ]</div>
          <p className="text-xl lg:text-[25.6px] text-white/85 font-semibold leading-[1.4]">
            抓出操盤手：鎖定混亂背後的導火線。
          </p>
        </div>
      </div>
    </div>
  );
}
