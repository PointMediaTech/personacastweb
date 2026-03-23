'use client';
import { useEffect, useState } from 'react';
import { useReducedMotion, useMountAnimation, EASE_CSS } from '@/app/lib/animations';
import { type HUDLabelConfig } from './theaterData';

const ZH_VARIANTS = ['2.0M 路徑', '2.1M 路徑', '2.2M 路徑'] as const;
const EN_VARIANTS = ['2.0M PATHS', '2.1M PATHS', '2.2M PATHS'] as const;

interface HUDLabelProps {
  readonly config: HUDLabelConfig;
  readonly delay: number;
}

export function HUDLabel({ config, delay }: HUDLabelProps) {
  const reduced = useReducedMotion();
  const mounted = useMountAnimation();

  // Label 2: fluctuating number — use index to keep zh/en in sync
  const [variantIndex, setVariantIndex] = useState(1); // default index=1 → "2.1M"

  useEffect(() => {
    if (!config.value || reduced) return;
    const interval = setInterval(() => {
      setVariantIndex(Math.floor(Math.random() * ZH_VARIANTS.length));
    }, 3000);
    return () => clearInterval(interval);
  }, [config.value, reduced]);

  const hasCheckmark = config.textZh.includes('✓');

  // Chinese typewriter text
  const fullTextZh = hasCheckmark
    ? config.textZh.replace(' ✓', '') + ' ✓'
    : config.valueZh
      ? config.textZh + ' ' + config.valueZh
      : config.textZh;
  const typewriterDuration = fullTextZh.length * 0.04;
  const typewriterDelay = delay + 0.8;

  const [typewriterDone, setTypewriterDone] = useState(reduced === true);

  useEffect(() => {
    if (reduced === true) return;
    const timeout = setTimeout(() => {
      setTypewriterDone(true);
    }, (typewriterDelay + typewriterDuration) * 1000);
    return () => clearTimeout(timeout);
  }, [typewriterDelay, typewriterDuration, reduced]);

  return (
    <div
      className={`absolute ${config.hideBelow === 'lg' ? 'hidden lg:block' : ''}`}
      style={{
        ...config.position,
        maxWidth: '260px',
        opacity: mounted ? 1 : 0,
        transform: mounted || reduced ? 'translateX(0)' : 'translateX(20px)',
        transition: `opacity 0.8s ${EASE_CSS} ${delay}s, transform 0.8s ${EASE_CSS} ${delay}s`,
      }}
    >
      <div
        className="flex items-start gap-2 rounded-md px-3 py-2 backdrop-blur-md"
        style={{
          backgroundColor: 'rgba(2,8,28,0.88)',
          border: `1px solid ${config.accentColor}55`,
          boxShadow: `0 0 14px ${config.accentColor}22, inset 0 1px 0 rgba(255,255,255,0.06)`,
        }}
      >
        {/* Accent bar */}
        <div
          className="w-[3px] self-stretch rounded-full flex-shrink-0"
          style={{ backgroundColor: config.accentColor, boxShadow: `0 0 6px ${config.accentColor}` }}
        />
        <div className="flex flex-col gap-0.5">
          {/* Line 1: Chinese primary text with typewriter */}
          <span
            className="font-mono text-[14px] leading-tight block"
            style={{
              letterSpacing: '0.08em',
              color: 'rgba(180,230,255,0.95)',
              ...(reduced ? {} : {
                clipPath: 'inset(0 0 0 0)',
                animation: `hudTypewriter ${typewriterDuration}s steps(${fullTextZh.length}) ${typewriterDelay}s both`,
              }),
            }}
          >
            {hasCheckmark ? (
              <>
                {config.textZh.replace(' ✓', '')}{' '}
                <span
                  style={{
                    color: config.accentColor,
                    animation: reduced || !typewriterDone
                      ? 'none'
                      : 'pulse-opacity 4s ease-in-out infinite',
                  }}
                >
                  ✓
                </span>
              </>
            ) : config.valueZh ? (
              <>
                {config.textZh}{' '}
                <span style={{ color: 'rgba(180,230,255,1.0)' }}>
                  {ZH_VARIANTS[variantIndex]}
                </span>
              </>
            ) : (
              config.textZh
            )}
          </span>

          {/* Line 2: English secondary text — fades in after typewriter */}
          <span
            className="font-mono text-[10px] uppercase leading-tight block"
            style={{
              letterSpacing: '0.15em',
              color: 'rgba(140,210,255,0.70)',
              opacity: typewriterDone ? 1 : 0,
              transition: 'opacity 0.4s ease',
            }}
          >
            {hasCheckmark ? (
              <>
                {config.text.replace(' ✓', '')}{' '}
                <span style={{ color: config.accentColor, opacity: 0.5 }}>✓</span>
              </>
            ) : config.value ? (
              <>
                {config.text}{' '}
                <span style={{ color: 'rgba(140,210,255,0.80)' }}>
                  {EN_VARIANTS[variantIndex]}
                </span>
              </>
            ) : (
              config.text
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
