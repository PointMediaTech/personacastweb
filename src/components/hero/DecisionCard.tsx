import { motion } from 'framer-motion';
import { EASE, type DecisionConfig, type DecisionKey } from './theaterData';

interface DecisionCardProps {
  readonly config: DecisionConfig;
  readonly isSelected: boolean;
  readonly isOtherSelected: boolean;
  readonly onSelect: (key: DecisionKey) => void;
  readonly position: { top: string; right: string };
}

/**
 * DecisionCard — pointer-events are controlled by the parent SimulationTheater
 * wrapper div (via cardsInteractive state + onAnimationComplete), not by this
 * component. This avoids DOM querySelector anti-patterns.
 */
export function DecisionCard({
  config, isSelected, isOtherSelected, onSelect, position,
}: DecisionCardProps) {
  return (
    <motion.div
      className={`absolute ${config.hideBelow === 'lg' ? 'hidden lg:block' : ''}`}
      style={position}
      animate={{
        opacity: isOtherSelected ? 0.3 : 1,
      }}
      transition={{ duration: 0.3, ease: EASE }}
    >
      <div
        role="button"
        aria-label={`選擇決策：${config.titleZh}`}
        tabIndex={0}
        className="w-[200px] backdrop-blur-md border overflow-hidden cursor-pointer transition-colors duration-200"
        style={{
          backgroundColor: isSelected ? 'rgba(2,6,23,0.6)' : 'rgba(2,6,23,0.4)',
          borderColor: isSelected
            ? config.accentColor
            : `rgba(${config.accentRgb},0.3)`,
          borderWidth: isSelected ? '2px' : '1px',
          borderRadius: '0.75rem',
          pointerEvents: 'inherit',
        }}
        onClick={() => onSelect(config.key)}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelect(config.key); }}
      >
        <div className="px-3.5 py-3">
          {/* Title row with pulse dot */}
          <div className="flex items-center gap-2 mb-1">
            <motion.span
              className="inline-block w-[6px] h-[6px] rounded-full flex-shrink-0"
              style={{ backgroundColor: config.accentColor }}
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span className="text-[14px] font-medium text-white">
              {config.titleZh}
            </span>
            {isSelected && (
              <span className="text-[9px] font-mono uppercase tracking-wider" style={{ color: config.accentColor }}>
                ▸ SELECTED
              </span>
            )}
          </div>

          {/* English subtitle */}
          <p
            className="font-mono text-[9px] uppercase mb-2 ml-[14px]"
            style={{ letterSpacing: '0.2em', color: 'rgba(100,200,255,0.5)' }}
          >
            {config.titleEn}
          </p>

          {/* Metrics row */}
          <div className="flex items-center gap-3 font-mono text-[10px] uppercase ml-[14px]">
            <span className="text-mist-blue-gray">
              成功率: <span style={{ color: config.accentColor }}>{config.metrics.successRate}%</span>
            </span>
            <span className="text-mist-blue-gray">
              風險: <span style={{ color: config.accentColor }}>{config.metrics.risk}</span>
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
