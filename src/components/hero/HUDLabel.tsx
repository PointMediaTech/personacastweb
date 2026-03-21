import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { EASE, type HUDLabelConfig } from './theaterData';

interface HUDLabelProps {
  readonly config: HUDLabelConfig;
  readonly delay: number;
}

export function HUDLabel({ config, delay }: HUDLabelProps) {
  const reduced = useReducedMotion();

  // Label 2: fluctuating number
  const [dynamicValue, setDynamicValue] = useState(config.value);

  useEffect(() => {
    if (!config.value || reduced) return;
    const interval = setInterval(() => {
      const variants = ['2.0M PATHS', '2.1M PATHS', '2.2M PATHS'];
      setDynamicValue(variants[Math.floor(Math.random() * variants.length)]);
    }, 3000);
    return () => clearInterval(interval);
  }, [config.value, reduced]);

  // Label 3: ✓ pulse — handled via Framer Motion animate prop on the ✓ character
  const hasCheckmark = config.text.includes('✓');

  return (
    <motion.div
      className={`absolute ${config.hideBelow === 'lg' ? 'hidden lg:block' : ''}`}
      style={{
        ...config.position,
        maxWidth: '240px',
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
        <div>
          <span
            className="font-mono text-[11px] uppercase leading-tight block"
            style={{
              letterSpacing: '0.15em',
              color: 'rgba(100,200,255,0.78)',
            }}
          >
            {hasCheckmark ? (
              <>
                {config.text.replace(' ✓', '')}{' '}
                <motion.span
                  animate={reduced ? {} : { opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ color: config.accentColor }}
                >
                  ✓
                </motion.span>
              </>
            ) : config.value ? (
              <>
                {config.text}{' '}
                <span style={{ color: 'rgba(100,200,255,0.85)' }}>
                  {dynamicValue}
                </span>
              </>
            ) : (
              config.text
            )}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
