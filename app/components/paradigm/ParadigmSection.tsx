import Link from 'next/link';
import { SectionWrapper } from '../shared/SectionWrapper';
import { ComparisonPanel } from './ComparisonPanel';
import { ScanlineBackground } from './ScanlineBackground';

export function ParadigmSection() {
  return (
    <SectionWrapper id="paradigm" ariaLabel="範式轉移" className="!py-24 lg:!py-0 relative">
      <ScanlineBackground />
      <div className="relative z-10 min-h-screen flex flex-col justify-center">
        {/* Title area */}
        <div className="text-center mb-16 lg:mb-24">
          <p className="text-xs tracking-[4px] text-strategic-blue uppercase font-mono mb-6">
            PARADIGM SHIFT
          </p>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white font-heading tracking-tighter leading-[1.05]">
            輿論定型前，掌控您的劇本。
          </h2>
          <p className="text-lg lg:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed tracking-wide mt-12">
            當對手還在猜測您的下一步，您已在千萬次推演中看透結局。領先 72 小時佈局，讓每場危機都成為您的主場。
          </p>
        </div>

        {/* Comparison panel */}
        <ComparisonPanel />

        {/* CTA */}
        <div className="text-center mt-12 lg:mt-16">
          <Link
            href="#authority"
            className="font-mono text-sm tracking-wide text-strategic-blue hover:text-aurora-cyan transition-colors"
          >
            了解預演算法如何運作 →
          </Link>
        </div>
      </div>
    </SectionWrapper>
  );
}
