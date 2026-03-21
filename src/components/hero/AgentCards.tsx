import { motion, useReducedMotion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as const;

interface AgentCardProps {
  readonly name: string;
  readonly mbti: string;
  readonly role: string;
  readonly tag: string;
  readonly tagVariant: 'pro' | 'anti';
  readonly delay: number;
  readonly statusText: string;
  readonly top: string;
  readonly right: string;
  /** Additional className for responsive hiding */
  readonly className?: string;
}

function AgentCard({
  name, mbti, role, tag, tagVariant, delay, statusText, top, right, className = '',
}: AgentCardProps) {
  const prefersReducedMotion = useReducedMotion();

  const accentColor = tagVariant === 'pro' ? '#769EDB' : '#B57D7D';
  const accentRgb = tagVariant === 'pro' ? '118,158,219' : '181,125,125';

  const tagBg = tagVariant === 'pro'
    ? 'bg-[#769EDB]/15 text-[#769EDB]'
    : 'bg-[#B57D7D]/15 text-[#B57D7D]';

  return (
    <motion.div
      className={`absolute ${className}`}
      style={{ top, right }}
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: 40 }}
      animate={{
        opacity: 1,
        x: 0,
        y: prefersReducedMotion ? 0 : [0, -12, 0],
      }}
      transition={{
        opacity: { duration: 0.8, delay, ease: EASE },
        x: { duration: 0.8, delay, ease: EASE },
        y: prefersReducedMotion
          ? undefined
          : { duration: 6, delay: delay + 0.8, repeat: Infinity, ease: 'easeInOut' },
      }}
    >
      {/* Card body */}
      <div
        className="min-w-[280px] max-w-[320px] overflow-hidden"
        style={{
          borderRadius: '0.75rem',
          backgroundColor: 'rgba(10,14,23,0.55)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(0,242,255,0.12)',
          borderTop: `2px solid ${accentColor}`,
          boxShadow: `0 0 24px 2px rgba(${accentRgb}, 0.08), 0 0 8px rgba(0,242,255,0.06)`,
        }}
      >
        {/* LIVE status bar */}
        <div className="flex items-center gap-1.5 px-5 pt-4 pb-1">
          <span
            className="w-[6px] h-[6px] rounded-full flex-shrink-0"
            style={{
              backgroundColor: accentColor,
              animation: prefersReducedMotion ? 'none' : 'cardPulse 2s infinite ease-in-out',
            }}
          />
          <span
            className="font-mono text-[12px] font-medium tracking-wider uppercase"
            style={{ color: accentColor, opacity: 0.8 }}
          >
            LIVE SIMULATING: T+56h
          </span>
        </div>

        <div className="px-5 pb-5 pt-1">
          {/* Header row: avatar + name/mbti + tag */}
          <div className="flex items-center justify-between gap-3 mb-2.5">
            <div className="flex items-center gap-2.5">
              <div
                className="w-[44px] h-[44px] rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                style={{
                  backgroundColor: `rgba(${accentRgb}, 0.15)`,
                  border: `1px solid rgba(${accentRgb}, 0.3)`,
                }}
              >
                {name.charAt(0)}
              </div>
              <div>
                <p className="font-sans text-[16px] font-bold text-white leading-tight">{name}</p>
                <p className="font-sans text-[13px] text-slate-400 leading-tight mt-0.5">
                  {mbti} · {role}
                </p>
              </div>
            </div>
            <span className={`text-[12px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${tagBg}`}>
              {tag}
            </span>
          </div>

          {/* Status text */}
          <div
            className="mt-2 pt-2"
            style={{ borderTop: `1px solid rgba(${accentRgb}, 0.1)` }}
          >
            <p className="font-mono text-[13px] leading-relaxed" style={{ color: accentColor, opacity: 0.75 }}>
              {statusText}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/**
 * AgentCards — Two floating persona cards (Pro vs Anti) as atmospheric
 * accents over the ChaosFlow hero visual.
 */
export function AgentCards() {
  return (
    <div className="absolute inset-0 z-[15] hidden md:block" style={{ pointerEvents: 'none' }} aria-hidden="true">
      {/* PRO — Brand Defense */}
      <AgentCard
        name="林雅婷"
        mbti="ENFJ"
        role="品牌發言人"
        tag="Brand Defense"
        tagVariant="pro"
        statusText="STANCE: DEFENSIVE · INFLUENCE ▲"
        top="14%"
        right="12%"
        delay={1.8}
      />

      {/* ANTI — Risk Source (hidden on tablet) */}
      <AgentCard
        name="張銳"
        mbti="ENTP"
        role="科技評論家"
        tag="Risk Source"
        tagVariant="anti"
        statusText="VECTOR: EXPANDING · RISK ▲"
        top="48%"
        right="8%"
        delay={2.2}
        className="hidden lg:block"
      />
    </div>
  );
}
