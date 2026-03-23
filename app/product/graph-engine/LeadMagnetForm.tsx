'use client';

import { useState } from 'react';

export function LeadMagnetForm() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    // TODO: wire up to email service
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex items-center gap-3 px-6 py-4 rounded-xl bg-[#00F2FF]/10 border border-[#00F2FF]/30 text-[#00F2FF] font-bold">
        <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
        已收到！白皮書將在 24 小時內寄送到您的信箱。
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="flex flex-col sm:flex-row gap-4 max-w-md w-full">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="輸入您的企業信箱"
          className="flex-1 bg-[#0A0E1A]/60 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-[#94A3B8]/50 focus:outline-none focus:border-[#00F2FF] focus:ring-1 focus:ring-[#00F2FF] transition-all"
          required
          autoComplete="email"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-gradient-to-r from-[#00F2FF] to-[#769EDB] hover:brightness-110 text-[#0A0E1A] font-extrabold tracking-wider rounded-xl transition-all shadow-[0_0_20px_rgba(0,242,255,0.2)] hover:shadow-[0_0_25px_rgba(0,242,255,0.4)] whitespace-nowrap"
        >
          立即獲取
        </button>
      </div>
      <p className="text-xs text-[#94A3B8]/60 mt-4 flex items-center justify-center md:justify-start gap-1">
        <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        我們絕不發送垃圾信件，您的資料將受最高等級加密保護。
      </p>
    </form>
  );
}
