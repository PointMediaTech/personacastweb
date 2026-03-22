import { SectionWrapper } from '../shared/SectionWrapper';
import { ComparisonPanel } from './ComparisonPanel';

export function ParadigmSection() {
  return (
    <SectionWrapper id="paradigm" ariaLabel="範式轉移">
      <div className="text-center mb-12">
        <p className="text-xs tracking-[3px] text-strategic-blue uppercase font-mono mb-2">
          PARADIGM SHIFT
        </p>
        <h2 className="text-2xl lg:text-4xl font-extrabold text-white mb-3 font-heading">
          別只看過去，讓我們定義未來。
        </h2>
        <p className="text-sm text-mist-blue-gray max-w-xl mx-auto">
          傳統工具告訴你聲明發出後「發生了什麼」，PersonaCast
          則在聲明發出前告訴你「將會發生什麼」。
        </p>
      </div>
      <ComparisonPanel />
    </SectionWrapper>
  );
}
