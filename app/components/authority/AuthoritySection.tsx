import { SectionWrapper } from '../shared/SectionWrapper';
import { MethodologyPipeline } from './MethodologyPipeline';
import { TrustMetrics } from './TrustMetrics';

export function AuthoritySection() {
  return (
    <SectionWrapper id="authority" ariaLabel="方法論與信任">
      <div className="text-center mb-12">
        <p className="text-xs tracking-[3px] text-strategic-blue uppercase font-mono mb-2">
          METHODOLOGY
        </p>
        <h2 className="text-2xl lg:text-4xl font-extrabold text-white mb-3 font-heading">
          工程級的嚴謹，數據級的信任。
        </h2>
        <p className="text-sm text-mist-blue-gray max-w-xl mx-auto">
          我們不只提供結果，我們公開過程。每一次模擬都具有可追蹤的因果邏輯。
        </p>
      </div>
      <MethodologyPipeline />
      <div className="mt-8">
        <TrustMetrics />
      </div>
      {/* OpenSpec callout banner */}
      <div className="mt-6 rounded-xl border border-strategic-blue/10 bg-strategic-blue/[0.04] p-4 lg:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-white">OpenSpec 開放規格文件</p>
          <p className="text-xs text-mist-blue-gray">
            完整的系統架構與模擬框架規格，公開透明，歡迎技術審查。
          </p>
        </div>
        <a
          href="#"
          className="shrink-0 rounded-md border border-strategic-blue/30 px-4 py-2 text-xs text-strategic-blue hover:bg-strategic-blue/10 transition-colors"
        >
          檢視規格文件 →
        </a>
      </div>
      {/* Hidden SEO content */}
      <ol className="sr-only">
        <li>數據收集 — 多源輿情抓取、結構化事件解析</li>
        <li>人格建模 — P_Final 公式計算、Zep 記憶注入</li>
        <li>場景推演 — 72 小時多路徑模擬</li>
        <li>結果驗證 — 因果鏈追蹤、可解釋性報告</li>
      </ol>
    </SectionWrapper>
  );
}
