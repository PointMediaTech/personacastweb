import Link from 'next/link';

/**
 * Minimal single-line footer for all pages.
 * Logo + copyright + legal links + Book Demo CTA.
 */
export function MinimalFooter() {
  return (
    <footer className="border-t border-white/5 mt-20" style={{ backgroundColor: '#060A14' }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left: Logo + copyright */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center shrink-0" aria-label="PersonaCast">
            <span
              className="text-lg font-semibold text-slate-600 hover:text-white transition-colors"
              style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
            >
              Persona
            </span>
            <span
              className="text-lg font-extrabold text-slate-600 hover:text-[#00E0C2] transition-colors"
              style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
            >
              Cast
            </span>
          </Link>

          <span className="hidden sm:inline text-slate-700">·</span>

          <span className="text-base text-slate-600">
            &copy; {new Date().getFullYear()} PersonaCast
          </span>
        </div>

        {/* Right: Legal + CTA */}
        <div className="flex items-center gap-5">
          <Link
            href="/legal/privacy"
            className="text-base text-slate-600 hover:text-slate-300 transition-colors"
          >
            隱私權政策
          </Link>
          <Link
            href="/legal/terms"
            className="text-base text-slate-600 hover:text-slate-300 transition-colors"
          >
            服務條款
          </Link>

          <Link
            href="/contact"
            className="ml-2 inline-flex items-center px-4 py-1.5 rounded-lg text-base font-semibold text-white transition-all duration-200 hover:shadow-[0_0_16px_rgba(118,158,219,0.35)]"
            style={{ backgroundColor: '#769EDB' }}
          >
            Book Demo →
          </Link>
        </div>
      </div>
    </footer>
  );
}
