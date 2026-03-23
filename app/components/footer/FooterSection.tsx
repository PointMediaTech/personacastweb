import { footerColumns } from './footerData';
import { SEO_CONFIG } from '../../lib/seo-config';

export function FooterSection() {
  return (
    <>
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
                {[
                  { icon: '𝕏', href: SEO_CONFIG.socialLinks.twitter },
                  { icon: 'in', href: SEO_CONFIG.socialLinks.linkedin },
                  { icon: 'GH', href: SEO_CONFIG.socialLinks.github },
                ].map(({ icon, href }) => (
                  <a
                    key={icon}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
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
                      {link.disabled ? (
                        <span
                          className="text-sm text-mist-blue-gray/50 cursor-default"
                          aria-disabled="true"
                        >
                          {link.label}
                        </span>
                      ) : (
                        <a
                          href={link.href}
                          className="text-sm text-mist-blue-gray hover:text-white transition-colors"
                        >
                          {link.label}
                        </a>
                      )}
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
