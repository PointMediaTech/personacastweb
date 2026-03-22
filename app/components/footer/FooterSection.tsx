import { SectionWrapper } from '../shared/SectionWrapper';
import { ScrollReveal } from '../shared/ScrollReveal';
import { CTAButton } from './CTAButton';
import { footerColumns } from './footerData';

export function FooterSection() {
  return (
    <>
      {/* CTA Section */}
      <SectionWrapper id="cta" ariaLabel="立即行動" className="min-h-screen flex flex-col justify-center">
        <ScrollReveal>
          <div className="text-center relative">
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] bg-[radial-gradient(ellipse,rgba(118,158,219,0.06),transparent_70%)] pointer-events-none" />
            <p className="text-sm tracking-[3px] text-strategic-blue uppercase font-mono mb-3 relative">
              TAKE ACTION
            </p>
            <h2 className="text-2xl lg:text-4xl font-extrabold text-white mb-2 relative font-heading">
              停止在不確定性中博弈。
            </h2>
            <p className="text-base text-mist-blue-gray max-w-md mx-auto mb-7 relative">
              讓 PersonaCast 為您的下一個關鍵決策，提前 72 小時預演所有可能。
            </p>
            <div className="relative">
              <CTAButton />
            </div>
            <p className="mt-3.5 text-sm text-[#555] relative">
              免費 · 30 分鐘 · 專人導覽
            </p>
          </div>
        </ScrollReveal>
      </SectionWrapper>

      {/* Footer */}
      <footer className="border-t border-white/[0.04]">
        <div className="mx-auto w-full px-6 lg:px-8 2xl:px-16 py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand column */}
            <div className="col-span-2 lg:col-span-1">
              <p className="text-base mb-3">
                <span className="font-semibold text-white">Persona</span>
                <span className="font-extrabold text-[#00E0C2]">Cast</span>
              </p>
              <p className="text-sm text-[#555] leading-relaxed mb-4">
                AI 驅動的戰略推演平台。
                <br />
                領先 72 小時，掌握變數，定義結局。
              </p>
              <div className="flex gap-2.5">
                {['𝕏', 'in', 'GH'].map((icon) => (
                  <a
                    key={icon}
                    href="#"
                    className="flex h-7 w-7 items-center justify-center rounded-md bg-white/[0.04] border border-white/[0.06] text-xs text-[#555] hover:text-white hover:border-white/10 transition-colors"
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Link columns */}
            {footerColumns.map((col) => (
              <div key={col.title}>
                <p className="text-xs font-semibold tracking-widest uppercase text-strategic-blue font-mono mb-3">
                  {col.title}
                </p>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-mist-blue-gray hover:text-white transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.04] py-4 px-6 lg:px-8">
          <div className="mx-auto w-full px-6 lg:px-8 2xl:px-16 flex justify-between items-center">
            <p className="text-xs text-[#333]">&copy; 2026 PersonaCast. All rights reserved.</p>
            <p className="text-xs text-[#333]">Taipei, Taiwan</p>
          </div>
        </div>
      </footer>
    </>
  );
}
