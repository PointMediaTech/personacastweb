import Link from 'next/link';
import { SectionWrapper } from '../shared/SectionWrapper';
import { ComparisonPanel } from './ComparisonPanel';
import { ScanlineBackground } from './ScanlineBackground';

export function ParadigmSection() {
  return (
    <SectionWrapper id="paradigm" ariaLabel="範式轉移" className="!py-24 lg:!py-0 relative">
      <ScanlineBackground />
      <div className="relative z-10 min-h-screen flex flex-col justify-center py-16 lg:py-24">
        {/* Title area */}
        <div className="text-center mb-16 lg:mb-20 max-w-4xl mx-auto">
          <p className="text-xs tracking-[4px] text-strategic-blue uppercase font-mono mb-6">
            PARADIGM SHIFT
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white font-heading tracking-tight leading-[1.1]">
            輿論定型前，掌控您的劇本。
          </h2>
          <p className="text-base lg:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed mt-8">
            當對手還在猜測您的下一步，您已在千萬次推演中看透結局。領先 72 小時佈局，讓每場危機都成為您的主場。
          </p>
        </div>

        {/* Comparison panel */}
        <ComparisonPanel />

        {/* CTA */}
        <div className="text-center mt-14 lg:mt-20">
          <Link
            href="#authority"
            className="inline-flex items-center gap-2 font-mono text-sm tracking-wide text-strategic-blue hover:text-aurora-cyan transition-colors duration-200 border-b border-strategic-blue/30 hover:border-aurora-cyan/50 pb-1"
          >
            了解預演算法如何運作
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </SectionWrapper>
  );
}
