import Link from 'next/link';

interface Step {
  readonly tag: string;
  readonly title: string;
  readonly href: string;
}

const PIPELINE_STEPS: readonly Step[] = [
  { tag: '01', title: '種子注入引擎', href: '/product/seed-injection' },
  { tag: '02', title: '圖譜建構系統', href: '/product/graph-engine' },
  { tag: '03', title: '推演劇場', href: '/product/simulation-theater' },
  { tag: '04', title: '預測解碼器', href: '/product/predictive-decoder' },
  { tag: '05', title: '數據資產庫', href: '/product/data-assets' },
] as const;

interface StepNavigationProps {
  readonly currentHref: string;
}

export function StepNavigation({ currentHref }: StepNavigationProps) {
  const currentIndex = PIPELINE_STEPS.findIndex((s) => s.href === currentHref);
  const prev = currentIndex > 0 ? PIPELINE_STEPS[currentIndex - 1] : null;
  const next = currentIndex < PIPELINE_STEPS.length - 1 ? PIPELINE_STEPS[currentIndex + 1] : null;

  return (
    <nav
      aria-label="推演流程導航"
      className="border-t border-white/5 bg-slate-950/80 backdrop-blur-sm"
    >
      <div className="max-w-5xl mx-auto px-6 py-8 flex items-center justify-between gap-4">
        {/* Previous */}
        {prev ? (
          <Link
            href={prev.href}
            className="group flex items-center gap-3 text-slate-400 hover:text-white transition-colors"
          >
            <svg
              className="w-5 h-5 transition-transform group-hover:-translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <div className="text-left">
              <p className="text-xs font-mono text-slate-500 uppercase tracking-wider">
                上一步 [{prev.tag}]
              </p>
              <p className="text-sm font-semibold">{prev.title}</p>
            </div>
          </Link>
        ) : (
          <Link
            href="/product"
            className="group flex items-center gap-3 text-slate-400 hover:text-white transition-colors"
          >
            <svg
              className="w-5 h-5 transition-transform group-hover:-translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <div className="text-left">
              <p className="text-xs font-mono text-slate-500 uppercase tracking-wider">返回</p>
              <p className="text-sm font-semibold">產品總覽</p>
            </div>
          </Link>
        )}

        {/* Step indicator dots */}
        <div className="hidden sm:flex items-center gap-2" aria-hidden="true">
          {PIPELINE_STEPS.map((step, i) => (
            <Link
              key={step.tag}
              href={step.href}
              title={step.title}
              className={`w-2 h-2 rounded-full transition-all ${
                i === currentIndex
                  ? 'bg-[#00F2FF] w-6 shadow-[0_0_8px_#00F2FF]'
                  : 'bg-white/15 hover:bg-white/30'
              }`}
            />
          ))}
        </div>

        {/* Next */}
        {next ? (
          <Link
            href={next.href}
            className="group flex items-center gap-3 text-slate-400 hover:text-white transition-colors"
          >
            <div className="text-right">
              <p className="text-xs font-mono text-slate-500 uppercase tracking-wider">
                下一步 [{next.tag}]
              </p>
              <p className="text-sm font-semibold">{next.title}</p>
            </div>
            <svg
              className="w-5 h-5 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        ) : (
          <Link
            href="/contact"
            className="group flex items-center gap-3 text-slate-400 hover:text-white transition-colors"
          >
            <div className="text-right">
              <p className="text-xs font-mono text-slate-500 uppercase tracking-wider">準備好了？</p>
              <p className="text-sm font-semibold">預約演示</p>
            </div>
            <svg
              className="w-5 h-5 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        )}
      </div>
    </nav>
  );
}
