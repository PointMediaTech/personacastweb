import Link from 'next/link';
import { SectionWrapper } from '../shared/SectionWrapper';
import { ComparisonPanel } from './ComparisonPanel';
import { ScanlineBackground } from './ScanlineBackground';

export function ParadigmSection() {
  return (
    <SectionWrapper id="paradigm" ariaLabel="範式轉移" className="!py-24 lg:!py-0 relative">
      <ScanlineBackground />
      <div
        className="relative z-10 min-h-screen flex flex-col items-center justify-center py-16 lg:py-24"
        style={{ paddingLeft: '2rem', paddingRight: '2rem' }}
      >
        {/* Centering wrapper */}
        <div style={{ maxWidth: '1200px', width: '100%', marginLeft: 'auto', marginRight: 'auto' }}>
          {/* Title area */}
          <div className="text-center" style={{ marginBottom: '4rem' }}>
            <p className="text-xs tracking-[4px] text-strategic-blue uppercase font-mono" style={{ marginBottom: '1.5rem' }}>
              PARADIGM SHIFT
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white font-heading tracking-tight leading-[1.1]">
              輿論定型前，拿回您的劇本掌控權。
            </h2>
            <p
              className="text-base lg:text-lg text-slate-400 leading-relaxed"
              style={{ maxWidth: '720px', marginLeft: 'auto', marginRight: 'auto', marginTop: '2rem' }}
            >
              在數位時代，敘事即是現實。當對手還在猜測您的下一步，您已在千萬次推演中看透結局。領先 72 小時主動佈局，確保由您主導故事的終局——讓每場危機，都成為您的主場。定義您的傳奇，而非僅僅是對它做出反應。
            </p>
          </div>

          {/* Comparison panel */}
          <ComparisonPanel />

          {/* CTA */}
          <div className="text-center" style={{ marginTop: '3.5rem' }}>
            <Link
              href="#authority"
              className="inline-flex items-center gap-2 font-mono text-sm tracking-wide text-strategic-blue hover:text-aurora-cyan transition-colors duration-200"
              style={{ borderBottom: '1px solid rgba(118,158,219,0.3)', paddingBottom: '4px' }}
            >
              了解預演算法如何運作
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Four-pointed star decoration — bottom right */}
      <div className="absolute bottom-8 right-8 z-10 text-slate-500/40" aria-hidden="true">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
        </svg>
      </div>
    </SectionWrapper>
  );
}
