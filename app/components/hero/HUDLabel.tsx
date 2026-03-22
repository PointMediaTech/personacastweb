'use client';
import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { EASE, type HUDLabelConfig } from './theaterData';

const ZH_VARIANTS = ['2.0M 路徑', '2.1M 路徑', '2.2M 路徑'] as const;
const EN_VARIANTS = ['2.0M PATHS', '2.1M PATHS', '2.2M PATHS'] as const;

interface HUDLabelProps {
  readonly config: HUDLabelConfig;
  readonly delay: number;
}

export function HUDLabel({ config, delay }: HUDLabelProps) {
  const reduced = useReducedMotion();

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
    <motion.div
      className={`absolute ${config.hideBelow === 'lg' ? 'hidden lg:block' : ''}`}
      style={{
        ...config.position,
        maxWidth: '260px',
      }}
      initial={reduced ? { opacity: 1 } : { opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      <div
        className="flex items-start gap-2 rounded-md border border-white/[0.06] px-3 py-2 backdrop-blur-sm"
        style={{ backgroundColor: 'rgba(2,6,23,0.55)' }}
      >
        {/* Accent bar */}
        <div
          className="w-1 self-stretch rounded-full flex-shrink-0"
          style={{ backgroundColor: config.accentColor }}
        />
        <div className="flex flex-col gap-0.5">
          {/* Line 1: Chinese primary text with typewriter */}
          <span
            className="font-mono text-[14px] leading-tight block"
            style={{
              letterSpacing: '0.08em',
              color: 'rgba(100,200,255,0.78)',
              ...(reduced ? {} : {
                clipPath: 'inset(0 0 0 0)',
                animation: `hudTypewriter ${typewriterDuration}s steps(${fullTextZh.length}) ${typewriterDelay}s both`,
              }),
            }}
          >
            {hasCheckmark ? (
              <>
                {config.textZh.replace(' ✓', '')}{' '}
                <motion.span
                  animate={reduced ? {} : typewriterDone ? { opacity: [0.5, 1, 0.5] } : { opacity: 1 }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ color: config.accentColor }}
                >
                  ✓
                </motion.span>
              </>
            ) : config.valueZh ? (
              <>
                {config.textZh}{' '}
                <span style={{ color: 'rgba(100,200,255,0.85)' }}>
                  {ZH_VARIANTS[variantIndex]}
                </span>
              </>
            ) : (
              config.textZh
            )}
          </span>

          {/* Line 2: English secondary text — fades in after typewriter */}
          <motion.span
            className="font-mono text-[10px] uppercase leading-tight block"
            style={{
              letterSpacing: '0.15em',
              color: 'rgba(100,200,255,0.4)',
            }}
            initial={reduced ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: typewriterDone ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          >
            {hasCheckmark ? (
              <>
                {config.text.replace(' ✓', '')}{' '}
                <span style={{ color: config.accentColor, opacity: 0.5 }}>✓</span>
              </>
            ) : config.value ? (
              <>
                {config.text}{' '}
                <span style={{ color: 'rgba(100,200,255,0.5)' }}>
                  {EN_VARIANTS[variantIndex]}
                </span>
              </>
            ) : (
              config.text
            )}
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
}
