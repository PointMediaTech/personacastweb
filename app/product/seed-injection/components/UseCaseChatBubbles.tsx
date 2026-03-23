'use client';

import { ScrollReveal } from '@/app/components/shared/ScrollReveal';

const chatData = [
  {
    role: 'team',
    name: '公關部主管',
    time: '10:42 AM',
    avatar: '👩‍💼',
    messages: ['老闆，那篇負面爆料週刊明天見報！我們只有 4 小時可以準備聲明。'],
    isRight: true,
  },
  {
    role: 'bot',
    name: 'PersonaCast',
    time: '10:43 AM',
    avatar: '🤖',
    messages: [
      '⚡ 正在將週刊草稿注入種子引擎...',
      '預演完成。預測 72% 的沉默多數將保持中立，但激進社群將把攻擊點放在「企業誠信」。',
      '👉 建議方向：不用過度辯解產品細節，直接公佈第三方檢驗報告。',
    ],
    isRight: false,
  },
  {
    role: 'team',
    name: '公關專員',
    time: '10:45 AM',
    avatar: '🧑‍💻',
    messages: ['太棒了，這樣我們聲明稿的方向就確定了，我這就去擬稿！'],
    isRight: true,
  }
];

export function UseCaseChatBubbles() {
  return (
    <div className="max-w-3xl mx-auto w-full p-4 md:p-8 rounded-2xl bg-slate-900/30 border border-slate-800/50 backdrop-blur-sm relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#769EDB] to-transparent opacity-30" />
      
      <div className="flex flex-col space-y-6">
        {chatData.map((chat, index) => (
          <ScrollReveal key={index} delay={index * 0.2}>
            <div className={`flex w-full ${chat.isRight ? 'justify-end' : 'justify-start'}`}>
              {!chat.isRight && (
                <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-lg mr-3 shadow-md">
                  {chat.avatar}
                </div>
              )}
              
              <div className={`flex flex-col max-w-[80%] ${chat.isRight ? 'items-end' : 'items-start'}`}>
                <div className="text-xs text-slate-500 mb-1 flex items-center space-x-2">
                  <span>{chat.name}</span>
                  <span>{chat.time}</span>
                </div>
                <div className="space-y-2 flex flex-col items-end">
                  {chat.messages.map((msg, i) => (
                    <div 
                      key={i} 
                      className={`p-3 md:p-4 rounded-2xl text-base leading-relaxed ${
                        chat.isRight 
                          ? 'bg-[#769EDB]/20 text-[#E2E8F0] rounded-tr-sm border border-[#769EDB]/30 shadow-lg' 
                          : 'bg-slate-800 text-slate-300 rounded-tl-sm border border-slate-700 shadow-md'
                      }`}
                    >
                      {msg}
                    </div>
                  ))}
                </div>
              </div>

              {chat.isRight && (
                <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-lg ml-3 shadow-md">
                  {chat.avatar}
                </div>
              )}
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
