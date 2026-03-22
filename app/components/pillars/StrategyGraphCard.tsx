'use client';

export function StrategyGraphCard() {
  const nodes = [
    // Central hub - largest
    { x: 50, y: 48, r: 6, glow: 12, opacity: 1 },
    // Inner ring
    { x: 35, y: 32, r: 4.5, glow: 8, opacity: 0.85 },
    { x: 65, y: 30, r: 4, glow: 8, opacity: 0.8 },
    { x: 30, y: 55, r: 3.5, glow: 7, opacity: 0.75 },
    { x: 68, y: 58, r: 4, glow: 8, opacity: 0.8 },
    { x: 50, y: 72, r: 4.5, glow: 8, opacity: 0.85 },
    // Outer ring
    { x: 18, y: 22, r: 3, glow: 5, opacity: 0.55 },
    { x: 80, y: 20, r: 2.5, glow: 5, opacity: 0.5 },
    { x: 12, y: 48, r: 2.5, glow: 5, opacity: 0.45 },
    { x: 88, y: 50, r: 2.5, glow: 5, opacity: 0.5 },
    { x: 20, y: 78, r: 2.5, glow: 5, opacity: 0.5 },
    { x: 78, y: 78, r: 3, glow: 5, opacity: 0.55 },
    { x: 50, y: 12, r: 2, glow: 4, opacity: 0.4 },
    { x: 48, y: 90, r: 2, glow: 4, opacity: 0.4 },
    // Periphery
    { x: 8, y: 32, r: 1.5, glow: 3, opacity: 0.3 },
    { x: 92, y: 68, r: 1.5, glow: 3, opacity: 0.3 },
    { x: 28, y: 92, r: 1.5, glow: 3, opacity: 0.3 },
    { x: 75, y: 10, r: 1.5, glow: 3, opacity: 0.3 },
  ];

  const edges: [number, number][] = [
    [0, 1], [0, 2], [0, 3], [0, 4], [0, 5],
    [1, 2], [1, 3], [1, 6],
    [2, 4], [2, 7],
    [3, 8], [3, 10],
    [4, 9], [4, 11],
    [5, 10], [5, 11], [5, 13],
    [6, 8], [6, 14], [6, 12],
    [7, 9], [7, 12], [7, 17],
    [8, 14],
    [9, 15],
    [10, 16],
    [11, 15],
    [12, 17],
    [1, 12], [5, 13],
  ];

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
        <img
          src="/images/02_card.png"
          alt="Strategy Graph 全局利益掃描"
          className="absolute inset-0 w-full h-full object-cover"
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
