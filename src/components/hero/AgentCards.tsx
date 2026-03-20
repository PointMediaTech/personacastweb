import { motion, useReducedMotion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as const;

interface AgentCardProps {
  readonly name: string;
  readonly mbti: string;
  readonly role: string;
  readonly tag: string;
  readonly tagVariant: 'pro' | 'anti';
  readonly className: string;
  readonly delay: number;
  /** Direction the tether line extends toward center: 'left' or 'right' */
  readonly tetherSide: 'left' | 'right';
}

function AgentCard({ name, mbti, role, tag, tagVariant, className, delay, tetherSide }: AgentCardProps) {
  const prefersReducedMotion = useReducedMotion();

  const glowColor = tagVariant === 'pro'
    ? 'rgba(118, 158, 219, 0.15)'
    : 'rgba(181, 125, 125, 0.15)';

  const tagBg = tagVariant === 'pro'
    ? 'bg-strategic-blue/20 text-strategic-blue'
    : 'bg-dried-rose/20 text-dried-rose';

  const borderGlow = tagVariant === 'pro'
    ? '0 0 20px 2px rgba(118,158,219,0.12)'
    : '0 0 20px 2px rgba(181,125,125,0.12)';

  const tetherColor = tagVariant === 'pro'
    ? 'rgba(118, 158, 219, 0.25)'
    : 'rgba(181, 125, 125, 0.25)';

  return (
    <motion.div
      className={`absolute ${className} hidden md:block`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: prefersReducedMotion ? 0 : [0, -15, 0],
      }}
      transition={{
        opacity: { duration: 0.8, delay, ease: EASE },
        scale: { duration: 0.8, delay, ease: EASE },
        y: prefersReducedMotion
          ? undefined
          : { duration: 5, delay: delay + 0.8, repeat: Infinity, ease: 'easeInOut' },
      }}
    >
      {/* Tether line — glowing connection to the neural head center */}
      <svg
        className={`absolute top-1/2 ${tetherSide === 'left' ? '-right-12 lg:-right-16' : '-left-12 lg:-left-16'} -translate-y-1/2`}
        width="64"
        height="4"
        viewBox="0 0 64 4"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <linearGradient
            id={`tether-${tagVariant}`}
            x1={tetherSide === 'left' ? '0%' : '100%'}
            y1="50%"
            x2={tetherSide === 'left' ? '100%' : '0%'}
            y2="50%"
          >
            <stop offset="0%" stopColor={tetherColor} />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <line
          x1="0" y1="2" x2="64" y2="2"
          stroke={`url(#tether-${tagVariant})`}
          strokeWidth="1"
          strokeDasharray="4 4"
        />
        {/* Endpoint node */}
        <circle
          cx={tetherSide === 'left' ? 64 : 0}
          cy="2"
          r="2"
          fill={tetherColor}
        />
      </svg>

      <div
        className="rounded-xl px-5 py-4 border border-white/[0.08] min-w-[180px]"
        style={{
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          backgroundColor: 'rgba(15, 23, 42, 0.65)',
          boxShadow: borderGlow,
        }}
      >
        {/* Header row: name + MBTI */}
        <div className="flex items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
              style={{ backgroundColor: glowColor, border: `1px solid ${glowColor}` }}
            >
              {name.charAt(0)}
            </div>
            <div>
              <p className="text-white text-sm font-medium leading-tight">{name}</p>
              <p className="text-mist-blue-gray text-[11px] leading-tight">{mbti}</p>
            </div>
          </div>
          <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${tagBg}`}>
            {tag}
          </span>
        </div>

        {/* Role label */}
        <p className="text-mist-blue-gray text-xs">{role}</p>
      </div>
    </motion.div>
  );
}

/**
 * AgentCards — Floating persona cards tethered to the central NeuralHead.
 */
export function AgentCards() {
  return (
    <>
      <AgentCard
        name="陳立峰"
        mbti="ENTJ"
        role="縣市長候選人"
        tag="Pro"
        tagVariant="pro"
        className="-left-56 lg:-left-72 top-1/2 -translate-y-1/2"
        delay={0.6}
        tetherSide="left"
      />
      <AgentCard
        name="張銳"
        mbti="ENTP"
        role="政論名嘴"
        tag="Anti"
        tagVariant="anti"
        className="-right-56 lg:-right-72 top-1/2 -translate-y-1/2"
        delay={0.9}
        tetherSide="right"
      />
    </>
  );
}
