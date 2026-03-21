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
  readonly actionDesc: string;
  readonly delay: number;
}

function Dossier({
  name, mbti, role, tagVariant,
  radarValues, conflictIndex, timeLabel, actionDesc, delay,
}: DossierProps) {
  const reduced = useReducedMotion();
  const accentColor = tagVariant === 'pro' ? '#769EDB' : '#B57D7D';
  const accentRgb = tagVariant === 'pro' ? '118,158,219' : '181,125,125';

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
        className="relative w-[280px] overflow-hidden bg-slate-950/40 backdrop-blur-md border border-slate-700/50"
        style={{
          borderRadius: '0.75rem',
          borderLeft: `2px solid ${accentColor}`,
          boxShadow: `inset 3px 0 12px -3px rgba(${accentRgb}, 0.15)`,
        }}
      >
        {/* LIVE status bar */}
        <div className="flex items-center gap-1.5 px-4 pt-3 pb-0">
          <span
            className="w-[6px] h-[6px] rounded-full animate-pulse"
            style={{ backgroundColor: accentColor }}
          />
          <span
            className="font-mono text-[10px] font-medium tracking-wider uppercase"
            style={{ color: accentColor, opacity: 0.8 }}
          >
            LIVE SIMULATING: T+56h
          </span>
        </div>

        <div className="p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-sans text-[15px] font-bold text-white">{name}</h3>
              <p className="font-sans text-[12px] text-slate-400 mt-0.5">
                {mbti} · {role}
              </p>
            </div>
            <span
              className="font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5"
              style={{
                borderRadius: '0.75rem',
                color: accentColor,
                backgroundColor: `rgba(${accentRgb}, 0.1)`,
                border: `1px solid rgba(${accentRgb}, 0.2)`,
              }}
            >
              {tagVariant === 'pro' ? 'Defense' : 'Risk'}
            </span>
          </div>

          {/* Radar + Metrics */}
          <div className="flex items-center gap-3">
            <CleanRadar values={radarValues} color={accentColor} />
            <div className="flex-1 space-y-2">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-[11px] uppercase tracking-widest text-slate-400">
                    Conflict
                  </span>
                  <span className="font-mono text-xl font-bold text-[#B57D7D]">
                    {conflictIndex}%
                  </span>
                </div>
                <div className="h-[3px] rounded-full bg-white/[0.06] overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: accentColor, opacity: 0.8 }}
                    initial={{ width: 0 }}
                    animate={{ width: `${conflictIndex}%` }}
                    transition={{ duration: 1.5, delay: delay + 0.5, ease: EASE }}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-widest text-slate-400">
                  Horizon
                </span>
                <span className="font-mono text-[12px] text-slate-400">{timeLabel}</span>
              </div>
            </div>
          </div>

          {/* Action description */}
          <div
            className="mt-3 pt-2.5"
            style={{ borderTop: `1px solid rgba(${accentRgb}, 0.12)` }}
          >
            <p className="font-mono text-[11px] leading-relaxed" style={{ color: accentColor, opacity: 0.7 }}>
              {actionDesc}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/**
 * AgentDossiers — Pinned inside the NeuralCanvas right wing.
 * Brand PR War scenario: Pro = Brand Defense (Strategic Blue), Anti = Risk Source (Dried Rose).
 */
export function AgentDossiers() {
  return (
    <>
      {/* Pro — Brand Defense — upper area */}
      <div className="absolute top-[12%] left-[8%] z-20">
        <Dossier
          name="林雅婷"
          mbti="ENFJ"
          role="品牌發言人"
          tagVariant="pro"
          radarValues={[0.85, 0.75, 0.9, 0.6, 0.8]}
          conflictIndex={68}
          timeLabel="T+12h"
          actionDesc="T+12h：啟動全球補償計畫"
          delay={0.8}
        />
      </div>

      {/* Anti — Risk Source — lower area */}
      <div className="absolute bottom-[12%] right-[8%] z-20">
        <Dossier
          name="張銳"
          mbti="ENTP"
          role="科技評論家"
          tagVariant="anti"
          radarValues={[0.7, 0.95, 0.55, 0.9, 0.65]}
          conflictIndex={84}
          timeLabel="T+32h"
          actionDesc="T+32h：發動負面輿論擴散"
          delay={1.1}
        />
      </div>
    </>
  );
}
