import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { EASE, type DecisionConfig, type DecisionKey } from './theaterData';

/** Map risk text to color */
function getRiskColor(risk: string): string {
  switch (risk) {
    case '低': return 'var(--color-aurora-cyan)';
    case '中': return 'var(--color-amber-warn)';
    case '高': return 'var(--color-alert-red)';
    default: return 'var(--color-aurora-cyan)';
  }
}

/** Map success rate to progress bar color */
function getProgressColor(rate: number): string {
  if (rate >= 60) return 'var(--color-aurora-cyan)';
  if (rate >= 40) return 'var(--color-amber-warn)';
  return 'var(--color-alert-red)';
}

interface DecisionCardProps {
  readonly config: DecisionConfig;
  readonly isSelected: boolean;
  readonly isOtherSelected: boolean;
  readonly onSelect: (key: DecisionKey) => void;
  readonly position: { top: string; right: string };
}

export function DecisionCard({
  config, isSelected, isOtherSelected, onSelect, position,
}: DecisionCardProps) {
  const reduced = useReducedMotion();
  const [animatedRate, setAnimatedRate] = useState(reduced ? config.metrics.successRate : 0);
  const [entranceComplete, setEntranceComplete] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Progress bar count-up animation
  useEffect(() => {
    if (!entranceComplete || reduced) {
      if (reduced) setAnimatedRate(config.metrics.successRate);
      return;
    }
    const target = config.metrics.successRate;
    const duration = 1200; // ms
    const delay = 300; // ms after entrance
    const timeout = setTimeout(() => {
      const start = performance.now();
      const animate = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // ease-out
        const eased = 1 - Math.pow(1 - progress, 3);
        setAnimatedRate(Math.round(target * eased));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }, delay);
    return () => clearTimeout(timeout);
  }, [entranceComplete, reduced, config.metrics.successRate]);

  const riskColor = getRiskColor(config.metrics.risk);
  const progressColor = getProgressColor(config.metrics.successRate);

  return (
    <motion.div
      className={`absolute ${config.hideBelow === 'lg' ? 'hidden lg:block' : ''}`}
      style={position}
      animate={{
        opacity: isOtherSelected ? 0.3 : 1,
      }}
      transition={{ duration: 0.3, ease: EASE }}
      onAnimationComplete={() => setEntranceComplete(true)}
    >
      <div
        role="button"
        aria-label={`選擇決策：${config.titleZh}`}
        tabIndex={0}
        className="w-[280px] overflow-hidden cursor-pointer"
        style={{
          backgroundColor: isHovered ? 'rgba(10,14,23,0.65)' : isSelected ? 'rgba(10,14,23,0.6)' : 'rgba(10,14,23,0.55)',
          border: isSelected
            ? `2px solid ${config.accentColor}`
            : '1px solid rgba(0,242,255,0.12)',
          borderRadius: '0.75rem',
          backdropFilter: isHovered ? 'blur(20px)' : 'blur(16px)',
          WebkitBackdropFilter: isHovered ? 'blur(20px)' : 'blur(16px)',
          boxShadow: '0 0 8px rgba(0,242,255,0.06)',
          pointerEvents: 'inherit',
          transform: isHovered ? 'scale(1.02) translate(-2px, -2px)' : 'scale(1)',
          transition: 'all 0.3s ease',
        }}
        onClick={() => onSelect(config.key)}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelect(config.key); }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="px-5 py-5">
          {/* Header: pulse dot + LIVE SIMULATION + pill badges */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span
                className="inline-block w-[6px] h-[6px] rounded-full flex-shrink-0"
                style={{
                  backgroundColor: 'var(--color-aurora-cyan)',
                  animation: reduced ? 'none' : 'cardPulse 2s infinite ease-in-out',
                }}
              />
              <span
                className="font-mono text-[12px] font-medium tracking-wider uppercase"
                style={{ color: 'var(--color-aurora-cyan)', opacity: 0.8 }}
              >
                LIVE SIMULATION
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              {config.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[12px] font-medium px-2.5 py-0.5 rounded-full"
                  style={{
                    backgroundColor: 'rgba(0,242,255,0.1)',
                    color: 'var(--color-aurora-cyan)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Title */}
          <p className="text-[16px] font-semibold text-white mb-0.5" style={{ letterSpacing: '0.02em' }}>
            {config.titleZh}
            {isSelected && (
              <span className="ml-2 text-[10px] font-mono uppercase tracking-wider" style={{ color: config.accentColor }}>
                ▸ SELECTED
              </span>
            )}
          </p>

          {/* English subtitle */}
          <p
            className="font-mono text-[12px] uppercase mb-4"
            style={{ letterSpacing: '0.2em', color: 'rgba(100,200,255,0.5)' }}
          >
            {config.titleEn}
          </p>

          {/* Success rate progress bar */}
          <div className="flex items-center gap-3 mb-3">
            <div className="flex-1 h-[3px] rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}>
              <div
                className="h-full rounded-full"
                style={{
                  width: `${animatedRate}%`,
                  backgroundColor: progressColor,
                  transition: reduced ? 'none' : undefined,
                }}
              />
            </div>
            <span className="font-mono text-[14px] font-semibold text-white min-w-[36px] text-right">
              {animatedRate}%
            </span>
          </div>

          {/* Risk breathing light */}
          <div className="flex items-center gap-2">
            <span
              className="inline-block w-[8px] h-[8px] rounded-full flex-shrink-0"
              style={{
                backgroundColor: riskColor,
                animation: reduced ? 'none' : 'riskBreathing 2.5s infinite ease-in-out',
              }}
            />
            <span className="font-mono text-[13px] text-mist-blue-gray uppercase">
              風險: <span style={{ color: riskColor }}>{config.metrics.risk}</span>
            </span>
          </div>

          {/* Hover expansion: execution time */}
          <div
            style={{
              maxHeight: isHovered ? '40px' : '0px',
              opacity: isHovered ? 1 : 0,
              overflow: 'hidden',
              transition: 'max-height 0.3s ease, opacity 0.3s ease',
            }}
          >
            <div className="mt-3 pt-2" style={{ borderTop: '1px solid rgba(0,242,255,0.1)' }}>
              <span className="font-mono text-[12px] text-mist-blue-gray">
                預估執行時間: <span className="text-white">{config.executionTime}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
