'use client';

import { CTA_HREF } from './footerData';

export function CTAButton() {
  return (
    <a
      href={CTA_HREF}
      className="inline-block rounded-lg bg-gradient-to-br from-strategic-blue to-[#5A82C4] px-9 py-3.5 text-base font-bold text-white transition-all duration-300 hover:from-[#8BAEE5] hover:to-[#6B92D0] hover:-translate-y-px active:translate-y-px"
      style={{ animation: 'ctaGlow 3s ease-in-out infinite' }}
    >
      立即預約專屬演示
    </a>
  );
}
