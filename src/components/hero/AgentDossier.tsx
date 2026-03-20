import { motion, useReducedMotion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as const;

function CleanRadar({ values, color }: { readonly values: readonly number[]; readonly color: string }) {
  const cx = 28, cy = 28, r = 22, axes = 5;
  const outer = Array.from({ length: axes }, (_, i) => {
    const a = (Math.PI * 2 * i) / axes - Math.PI / 2;
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
  });
  const data = values.map((v, i) => {
    const a = (Math.PI * 2 * i) / axes - Math.PI / 2;
    return { x: cx + r * v * Math.cos(a), y: cy + r * v * Math.sin(a) };
  });
  const dataPath = data.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ') + 'Z';

  return (
    <svg width="56" height="56" viewBox="0 0 56 56" className="flex-shrink-0">
      <polygon points={outer.map(p => `${p.x},${p.y}`).join(' ')} fill="none" stroke="rgba(136,146,176,0.12)" strokeWidth="0.5" />
      {outer.map((p, i) => <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="rgba(136,146,176,0.06)" strokeWidth="0.5" />)}
      <path d={dataPath} fill={color} opacity="0.1" />
      <path d={dataPath} fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      {data.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r="1.5" fill={color} opacity="0.6" />)}
    </svg>
  );
}

interface DossierProps {
  readonly name: string;
  readonly mbti: string;
  readonly role: string;
  readonly tagVariant: 'pro' | 'anti';
  readonly radarValues: readonly number[];
  readonly conflictIndex: number;
  readonly timeLabel: string;
  readonly delay: number;
}

function Dossier({
  name, mbti, role, tagVariant,
  radarValues, conflictIndex, timeLabel, delay,
}: DossierProps) {
  const reduced = useReducedMotion();
  const accentColor = tagVariant === 'pro' ? '#769EDB' : '#B57D7D';
  const isWarning = conflictIndex > 70;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{
        opacity: 1,
        y: reduced ? 0 : [0, -3, 0],
      }}
      transition={{
        opacity: { duration: 1, delay, ease: EASE },
        y: reduced ? undefined : { duration: 8, delay: delay + 1, repeat: Infinity, ease: 'easeInOut' },
      }}
    >
      <div
        className="relative rounded-sm w-[260px] overflow-hidden"
        style={{
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          backgroundColor: 'rgba(10, 17, 40, 0.8)',
          border: '0.5px solid rgba(255,255,255,0.06)',
          borderLeft: `2px solid ${accentColor}`,
          boxShadow: `inset 3px 0 10px -3px ${accentColor}25`,
        }}
      >
        <div className="p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-white/90 text-[13px] font-semibold">{name}</h3>
              <p className="text-[11px] mt-0.5" style={{ color: '#CBD5E1', opacity: 0.4 }}>{role}</p>
            </div>
            <span
              className="font-mono text-[8px] font-bold tracking-wider px-1.5 py-0.5 rounded-sm"
              style={{
                color: '#FFB800',
                backgroundColor: 'rgba(255,184,0,0.06)',
                border: '0.5px solid rgba(255,184,0,0.15)',
              }}
            >
              {mbti}
            </span>
          </div>

          {/* Radar + Metrics */}
          <div className="flex items-center gap-3">
            <CleanRadar values={radarValues} color={accentColor} />
            <div className="flex-1 space-y-2">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-[7px] uppercase tracking-widest" style={{ color: 'rgba(203,213,225,0.25)' }}>
                    Conflict
                  </span>
                  <span
                    className="font-mono text-[11px] font-bold"
                    style={{ color: isWarning ? '#FFB800' : 'rgba(203,213,225,0.5)' }}
                  >
                    {conflictIndex}%
                  </span>
                </div>
                <div className="h-[2px] rounded-full bg-white/[0.05] overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: isWarning ? '#FFB800' : accentColor, opacity: 0.7 }}
                    initial={{ width: 0 }}
                    animate={{ width: `${conflictIndex}%` }}
                    transition={{ duration: 1.5, delay: delay + 0.5, ease: EASE }}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-[7px] uppercase tracking-widest" style={{ color: 'rgba(203,213,225,0.25)' }}>
                  Horizon
                </span>
                <span className="font-mono text-[10px]" style={{ color: 'rgba(203,213,225,0.4)' }}>{timeLabel}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/**
 * AgentDossiers — Pinned inside the NeuralCanvas right wing.
 * Clear accent differentiation: Pro = Strategic Blue, Anti = Dried Rose.
 */
export function AgentDossiers() {
  return (
    <>
      {/* Pro — upper area */}
      <div className="absolute top-[12%] left-[8%] z-20">
        <Dossier
          name="陳立峰"
          mbti="ENTJ"
          role="縣市長候選人"
          tagVariant="pro"
          radarValues={[0.9, 0.6, 0.85, 0.7, 0.8]}
          conflictIndex={78}
          timeLabel="T+72h"
          delay={0.8}
        />
      </div>

      {/* Anti — lower area */}
      <div className="absolute bottom-[12%] right-[8%] z-20">
        <Dossier
          name="張銳"
          mbti="ENTP"
          role="政論名嘴"
          tagVariant="anti"
          radarValues={[0.7, 0.95, 0.5, 0.85, 0.6]}
          conflictIndex={82}
          timeLabel="T+48h"
          delay={1.1}
        />
      </div>
    </>
  );
}
