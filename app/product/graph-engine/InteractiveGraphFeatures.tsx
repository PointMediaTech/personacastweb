'use client';

import { useState } from 'react';
import { ScrollReveal } from '@/app/components/shared/ScrollReveal';

const dimensions = [
  {
    id: 'nodes',
    label: '鎖定獵物',
    title: '一秒揪出帶風向的真實核心',
    description: '不再被表面聲量最大的假帳號迷惑。真實識別並鎖定具有真實影響力的核心意見領袖，讓資源用在刀口上。',
    visualNode: (
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="absolute w-32 h-32 bg-red-500/20 rounded-full animate-ping"></div>
        <div className="absolute w-16 h-16 bg-red-400/40 rounded-full animate-pulse"></div>
        <div className="relative w-8 h-8 bg-red-500 rounded-full shadow-[0_0_30px_#ef4444] border-2 border-white z-10 flex items-center justify-center">
          <div className="w-2 h-2 bg-white rounded-full"></div>
        </div>
        {/* Mock other faint nodes */}
        <div className="absolute w-4 h-4 bg-slate-600 rounded-full top-[20%] left-[20%] opacity-50"></div>
        <div className="absolute w-6 h-6 bg-slate-500 rounded-full bottom-[30%] right-[15%] opacity-50"></div>
        <div className="absolute w-3 h-3 bg-slate-700 rounded-full top-[60%] left-[10%] opacity-50"></div>
        <div className="absolute w-5 h-5 bg-slate-600 rounded-full bottom-[15%] left-[40%] opacity-50"></div>
      </div>
    )
  },
  {
    id: 'edges',
    label: '透視戰局',
    title: '精準拆解輿論的擴散佈局',
    description: '藍線是擴散跳板，紅線是公關地雷。系統為你揭露誰在拉攏誰，在輿論戰中清楚判斷影響力走向，不再盲目作戰。',
    visualNode: (
      <div className="relative w-full h-full">
        {/* Connecting lines */}
        <svg className="absolute inset-0 w-full h-full pb-4">
          <line x1="20%" y1="20%" x2="50%" y2="50%" stroke="#3B82F6" strokeWidth="2" strokeDasharray="4 4" className="animate-dash" />
          <line x1="50%" y1="50%" x2="80%" y2="30%" stroke="#EF4444" strokeWidth="2" />
          <line x1="50%" y1="50%" x2="70%" y2="80%" stroke="#3B82F6" strokeWidth="2" strokeDasharray="4 4" className="animate-dash" />
          <line x1="20%" y1="80%" x2="50%" y2="50%" stroke="#3B82F6" strokeWidth="2" opacity="0.4"/>
        </svg>
        {/* Nodes */}
        <div className="absolute w-6 h-6 bg-blue-500 rounded-full top-[20%] left-[20%] shadow-[0_0_15px_#3b82f6] transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute w-8 h-8 bg-white border-4 border-slate-800 rounded-full top-[50%] left-[50%] shadow-[0_0_20px_#ffffff] transform -translate-x-1/2 -translate-y-1/2 z-10"></div>
        <div className="absolute w-6 h-6 bg-red-500 rounded-full top-[30%] left-[80%] shadow-[0_0_15px_#ef4444] transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute w-5 h-5 bg-blue-400 rounded-full top-[80%] left-[70%] shadow-[0_0_10px_#3b82f6] transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute w-4 h-4 bg-slate-500 rounded-full top-[80%] left-[20%] transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>
    )
  },
  {
    id: 'clusters',
    label: '攻破壁壘',
    title: '跨越同溫層的溝通橋樑',
    description: '精準識別堅不可摧的同溫層，並找出能跨越圈層的「邊界傳播者」。打破資訊壁壘，讓你的訊息不再石沉大海。',
    visualNode: (
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Left Cluster — no backdrop-blur for perf */}
        <div className="absolute w-40 h-40 bg-blue-500/10 border border-blue-500/30 rounded-full left-[10%] flex items-center justify-center">
          <div className="w-16 h-16 bg-blue-500/20 rounded-full animate-pulse"></div>
        </div>
        {/* Right Cluster */}
        <div className="absolute w-40 h-40 bg-purple-500/10 border border-purple-500/30 rounded-full right-[10%] flex items-center justify-center">
          <div className="w-16 h-16 bg-purple-500/20 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        </div>
        
        {/* Bridge Node */}
        <div className="absolute w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.8)] border border-white z-10 flex items-center justify-center left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        </div>
        {/* Bridge Lines */}
        <svg className="absolute inset-0 w-full h-full -z-10">
           <line x1="30%" y1="50%" x2="50%" y2="50%" stroke="#60A5FA" strokeWidth="2" strokeDasharray="4 4" className="animate-dash" />
           <line x1="50%" y1="50%" x2="70%" y2="50%" stroke="#C084FC" strokeWidth="2" strokeDasharray="4 4" />
        </svg>
      </div>
    )
  },
  {
    id: 'dynamics',
    label: '預判風暴',
    title: '即時攔截病毒式爆發',
    description: '從第一篇破口貼文到全網引爆，即時追蹤輿論的病毒式傳播路徑，幫助你搶佔公關回應的「黃金三小時」。',
    visualNode: (
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        {/* Ripple effect — 2 rings to reduce composite layers */}
        <div className="absolute w-[170%] h-[170%] border border-red-500/20 rounded-full animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
        <div className="absolute w-[100%] h-[100%] border border-orange-500/30 rounded-full animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite]" style={{ animationDelay: '0.7s' }}></div>
        <div className="relative w-10 h-10 bg-red-600 rounded-full shadow-[0_0_30px_#dc2626] border-2 border-white/50 z-10 flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        </div>
      </div>
    )
  }
];

export function InteractiveGraphFeatures() {
  const [activeId, setActiveId] = useState(dimensions[0].id);

  const activeContent = dimensions.find((d) => d.id === activeId);

  return (
    <div className="max-w-6xl mx-auto w-full">
      <ScrollReveal>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">
            透視圖譜的 4 個上帝視角
          </h2>
          <p className="text-lg text-[#94A3B8] max-w-2xl mx-auto">
            我們將複雜的點線面，轉化為您能掌控的戰略武器。
          </p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 lg:h-[500px]">
        {/* Left Side: Tabs */}
        <div className="lg:col-span-5 flex flex-col gap-4 justify-center">
          {dimensions.map((dim) => {
            const isActive = dim.id === activeId;
            return (
              <button
                key={dim.id}
                onClick={() => setActiveId(dim.id)}
                aria-expanded={isActive}
                className={`text-left p-6 rounded-2xl transition-all duration-300 border ${
                  isActive
                    ? 'bg-[#111827] border-[#769EDB]/40 shadow-[0_0_30px_rgba(118,158,219,0.1)]'
                    : 'bg-transparent border-transparent hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-4 mb-2">
                  <span
                    className={`text-sm font-bold tracking-wider px-3 py-1 rounded-full ${
                      isActive ? 'bg-[#769EDB] text-[#0A0E1A]' : 'bg-white/10 text-[#94A3B8]'
                    }`}
                  >
                    {dim.label}
                  </span>
                  <h3
                    className={`text-xl font-bold ${
                      isActive ? 'text-white' : 'text-[#94A3B8]'
                    }`}
                  >
                    {dim.title}
                  </h3>
                </div>
                {/* Always in DOM for SEO — hidden via grid-rows collapse */}
                <div
                  className="grid transition-[grid-template-rows] duration-300 ease-out"
                  style={{ gridTemplateRows: isActive ? '1fr' : '0fr' }}
                >
                  <p className="overflow-hidden text-[#94A3B8] leading-relaxed mt-4">
                    {dim.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Side: Interactive Visual */}
        <div className="lg:col-span-7 h-[400px] lg:h-full relative overflow-hidden rounded-3xl border border-white/10 bg-[#0F1629] shadow-2xl flex items-center justify-center p-8">
          {/* Subtle Grid Background */}
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '30px 30px', opacity: 0.2 }}></div>
          
          <div className="absolute inset-0 transition-opacity duration-500 flex items-center justify-center p-12">
             {activeContent?.visualNode}
          </div>
        </div>
      </div>
    </div>
  );
}
