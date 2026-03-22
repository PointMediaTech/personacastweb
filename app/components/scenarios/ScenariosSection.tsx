import { SectionWrapper } from '../shared/SectionWrapper';
import { ScenarioCard } from './ScenarioCard';
import { scenarios } from './scenarioData';

export function ScenariosSection() {
  return (
    <SectionWrapper id="scenarios" ariaLabel="應用場景">
      <div className="text-center mb-12">
        <p className="text-xs tracking-[3px] text-strategic-blue uppercase font-mono mb-2">
          SCENARIO ENTRY
        </p>
        <h2 className="text-2xl lg:text-4xl font-extrabold text-white mb-3 font-heading">
          為您的決策場景，定制專屬沙盒。
        </h2>
        <p className="text-sm text-mist-blue-gray max-w-xl mx-auto">
          選擇您面臨的戰場，啟動針對性的 72 小時壓力測試。
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
        {scenarios.map((scenario, i) => (
          <ScenarioCard key={scenario.id} data={scenario} index={i} />
        ))}
      </div>
    </SectionWrapper>
  );
}
