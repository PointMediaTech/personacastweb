'use client';

import { useState, useEffect } from 'react';
import { Terminal, CheckCircle2, Zap } from 'lucide-react';

export function SeedSimulationGraphic() {
  const [textIndex, setTextIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [showRipples, setShowRipples] = useState(false);
  const fullText = "品牌最新旗艦款手機爆出發熱爭議...";

  useEffect(() => {
    if (textIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setTextIndex(prev => prev + 1);
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      setIsTyping(false);
      const rippleTimeout = setTimeout(() => setShowRipples(true), 500);
      return () => clearTimeout(rippleTimeout);
    }
  }, [textIndex, fullText.length]);

  return (
    <div className="relative w-full max-w-lg mx-auto mt-12 lg:mt-0" style={{ perspective: '1000px' }}>
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[#769EDB] blur-[80px] opacity-20 rounded-full mix-blend-screen" />
      
      {/* Terminal UI */}
      <div 
        className="relative z-10 rounded-xl overflow-hidden shadow-2xl transition-all duration-700 hover:scale-[1.02] hover:-translate-y-1"
        style={{
          background: 'rgba(15, 23, 42, 0.7)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(118, 158, 219, 0.2)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px rgba(118, 158, 219, 0.1)',
        }}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#769EDB]/20 bg-slate-900/50">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <div className="flex items-center space-x-2 text-slate-400 text-xs font-mono">
            <Terminal size={14} />
            <span>seed-terminal</span>
          </div>
        </div>
        
        <div className="p-6 font-mono text-sm leading-relaxed min-h-[160px]">
          <div className="flex items-start space-x-2 mb-4">
            <span className="text-[#769EDB] font-bold">~</span>
            <span className="text-white font-bold">./inject-seed</span>
            <span className="text-slate-400">--topic</span>
          </div>
          
          <div className="mb-4 pl-4 border-l-2 border-slate-700 text-slate-300">
            {fullText.slice(0, textIndex)}
            {isTyping && <span className="animate-pulse inline-block w-2 h-4 bg-[#769EDB] ml-1 align-middle" />}
          </div>

          {!isTyping && (
            <div className="seed-fade-in text-[#10B981] flex items-center space-x-2">
              <CheckCircle2 size={16} />
              <span>✔ Seed Injected Successfully</span>
            </div>
          )}
          {!isTyping && (
            <div className="mt-2 text-slate-400 seed-fade-in-delayed flex items-center space-x-2">
              <Zap size={16} className="text-yellow-400" />
              <span>Initializing 500 AI Personas...</span>
            </div>
          )}
        </div>
      </div>

      {/* Ripple Nodes (Shown after typing) */}
      {showRipples && (
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full border border-[#769EDB]/40 opacity-0 animate-[ripple_3s_ease-out_infinite]"
              style={{
                width: '100%',
                height: '100%',
                animationDelay: `${i * 0.6}s`,
              }}
            />
          ))}
          {/* Avatar Nodes */}
          <div className="absolute -top-12 -right-8 w-12 h-12 rounded-full border-2 border-slate-700 bg-slate-800 flex items-center justify-center text-xs text-white shadow-lg animate-bounce" style={{ animationDelay: '0s' }}>😠</div>
          <div className="absolute top-1/2 -right-16 w-10 h-10 rounded-full border-2 border-slate-700 bg-slate-800 flex items-center justify-center text-xs text-white shadow-lg animate-bounce" style={{ animationDelay: '0.2s' }}>🤔</div>
          <div className="absolute -bottom-10 left-1/4 w-14 h-14 rounded-full border-2 border-[#769EDB]/50 bg-slate-800 flex items-center justify-center text-xs text-white shadow-lg animate-bounce" style={{ animationDelay: '0.4s' }}>🔥</div>
          <div className="absolute -left-12 top-10 w-12 h-12 rounded-full border-2 border-slate-700 bg-slate-800 flex items-center justify-center text-xs text-white shadow-lg animate-bounce" style={{ animationDelay: '0.6s' }}>💡</div>
        </div>
      )}
      
    </div>
  );
}
