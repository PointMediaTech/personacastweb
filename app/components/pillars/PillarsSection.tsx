import { SectionWrapper } from '../shared/SectionWrapper';
import { PillarCard } from './PillarCard';
import { RadarChart } from './RadarChart';
import { SentimentTimeline } from './SentimentTimeline';
import { ForceGraph } from './ForceGraph';

export function PillarsSection() {
  return (
    <SectionWrapper id="pillars" ariaLabel="三大戰略支柱">
      <div className="text-center mb-12">
        <p className="text-xs tracking-[3px] text-strategic-blue uppercase font-mono mb-2">
          CORE PILLARS
        </p>
        <h2 className="text-2xl lg:text-4xl font-extrabold text-white mb-3 font-heading">
          三大戰略支柱
        </h2>
        <p className="text-sm text-mist-blue-gray max-w-xl mx-auto">
          從人格建模到場景推演，再到全域關係解析——三個模組協同運作的 AI 戰略引擎。
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 max-lg:flex max-lg:overflow-x-auto max-lg:snap-x max-lg:snap-mandatory max-lg:gap-4 max-lg:-mx-6 max-lg:px-6">
        <PillarCard
          title="PersonaLab"
          subtitle="模擬真實社會人格"
          icon="🧬"
          color="strategic-blue"
          index={0}
          description="基於 Zep 記憶引擎，賦予 AI 智能體穩定的政治與情緒立場。"
          footer={
            <div className="bg-strategic-blue/[0.06] rounded-md px-2.5 py-2 border border-strategic-blue/10">
              <div className="text-[8px] text-[#555] font-mono mb-0.5">CORE MODEL</div>
              <div className="text-[9px] text-strategic-blue font-mono">
                P<sub>Final</sub> = w₁·M<sub>Zep</sub> + w₂·I<sub>User</sub> + w₃·S<sub>Stereo</sub>
              </div>
            </div>
          }
        >
          <RadarChart />
        </PillarCard>

        <PillarCard
          title="Casting Arena"
          subtitle="72 小時劇場推演"
          icon="⚔️"
          color="insight-gold"
          index={1}
          description="雙面板並行模擬，即時偵測情緒脈衝 (Sentiment Pulse)。"
          footer={
            <div className="flex gap-1.5">
              <div className="flex-1 bg-insight-gold/[0.06] rounded px-2 py-1.5 text-center border border-insight-gold/10">
                <div className="text-[7px] text-insight-gold font-mono">PUBLIC</div>
                <div className="text-[8px] text-mist-blue-gray">公共輿論</div>
              </div>
              <div className="flex-1 bg-insight-gold/[0.06] rounded px-2 py-1.5 text-center border border-insight-gold/10">
                <div className="text-[7px] text-insight-gold font-mono">INTERNAL</div>
                <div className="text-[8px] text-mist-blue-gray">內部決策</div>
              </div>
            </div>
          }
        >
          <SentimentTimeline />
        </PillarCard>

        <PillarCard
          title="Strategy Graph"
          subtitle="全域利益關係圖譜"
          icon="🕸️"
          color="dried-rose"
          index={2}
          description="梳理 80 個節點與 30 種關係，解析事件擴散的底層邏輯。"
          footer={
            <div className="flex gap-1.5">
              {[
                { value: '80', label: 'NODES' },
                { value: '30', label: 'RELATIONS' },
                { value: '132', label: 'STRATEGIC' },
              ].map((stat) => (
                <div key={stat.label} className="flex-1 bg-dried-rose/[0.06] rounded px-2 py-1.5 text-center border border-dried-rose/10">
                  <div className="text-xs font-bold text-dried-rose">{stat.value}</div>
                  <div className="text-[7px] text-mist-blue-gray font-mono">{stat.label}</div>
                </div>
              ))}
            </div>
          }
        >
          <ForceGraph />
        </PillarCard>
      </div>
    </SectionWrapper>
  );
}
