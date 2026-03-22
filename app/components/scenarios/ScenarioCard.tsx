'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ScrollReveal } from '../shared/ScrollReveal';
import { CTA_PLACEHOLDER, type ScenarioData } from './scenarioData';

const colorMap: Record<string, { border: string; text: string; bg: string; barBg: string }> = {
  'alert-red': {
    border: 'border-alert-red/30',
    text: 'text-alert-red',
    bg: 'bg-alert-red',
    barBg: 'bg-alert-red/20',
  },
  'strategic-blue': {
    border: 'border-strategic-blue/30',
    text: 'text-strategic-blue',
    bg: 'bg-strategic-blue',
    barBg: 'bg-strategic-blue/20',
  },
  'insight-gold': {
    border: 'border-insight-gold/30',
    text: 'text-insight-gold',
    bg: 'bg-insight-gold',
    barBg: 'bg-insight-gold/20',
  },
};

function AngularBackground({ hex }: { hex: string }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 400 160"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="angularGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={hex} stopOpacity="0.15" />
          <stop offset="100%" stopColor={hex} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <rect width="400" height="160" fill="url(#angularGrad)" />
      {/* Triangular shards */}
      <polygon points="0,160 80,60 160,160" fill={hex} opacity="0.08" />
      <polygon points="120,160 200,40 280,160" fill={hex} opacity="0.06" />
      <polygon points="260,160 340,80 400,160" fill={hex} opacity="0.1" />
      <polygon points="50,0 130,100 10,80" fill={hex} opacity="0.05" />
      <polygon points="300,0 380,70 350,120" fill={hex} opacity="0.04" />
      {/* Pulse circles */}
      <circle cx="200" cy="80" r="30" fill="none" stroke={hex} strokeWidth="0.5" opacity="0.2" />
      <circle cx="200" cy="80" r="55" fill="none" stroke={hex} strokeWidth="0.3" opacity="0.12" />
      <circle cx="200" cy="80" r="80" fill="none" stroke={hex} strokeWidth="0.2" opacity="0.07" />
      {/* Tension lines */}
      <line x1="0" y1="120" x2="400" y2="100" stroke={hex} strokeWidth="0.3" opacity="0.15" />
      <line x1="0" y1="40" x2="400" y2="60" stroke={hex} strokeWidth="0.2" opacity="0.1" />
    </svg>
  );
}

function ShieldBackground({ hex }: { hex: string }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 400 160"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="shieldGrad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={hex} stopOpacity="0.1" />
          <stop offset="100%" stopColor={hex} stopOpacity="0.03" />
        </linearGradient>
      </defs>
      <rect width="400" height="160" fill="url(#shieldGrad)" />
      {/* Grid rectangles */}
      <rect x="20" y="20" width="60" height="40" rx="2" fill="none" stroke={hex} strokeWidth="0.5" opacity="0.15" />
      <rect x="100" y="50" width="80" height="50" rx="2" fill="none" stroke={hex} strokeWidth="0.5" opacity="0.1" />
      <rect x="300" y="30" width="70" height="60" rx="2" fill="none" stroke={hex} strokeWidth="0.4" opacity="0.12" />
      <rect x="40" y="90" width="50" height="30" rx="2" fill={hex} opacity="0.05" />
      <rect x="220" y="80" width="60" height="40" rx="2" fill={hex} opacity="0.04" />
      {/* Hexagonal shield */}
      <path
        d="M200,25 L240,50 L240,100 L200,125 L160,100 L160,50 Z"
        fill="none"
        stroke={hex}
        strokeWidth="0.8"
        opacity="0.18"
      />
      <path
        d="M200,40 L228,58 L228,92 L200,110 L172,92 L172,58 Z"
        fill={hex}
        opacity="0.04"
      />
      {/* Lock/check icon hint */}
      <circle cx="200" cy="75" r="8" fill="none" stroke={hex} strokeWidth="0.6" opacity="0.2" />
      <line x1="196" y1="75" x2="199" y2="78" stroke={hex} strokeWidth="0.6" opacity="0.2" />
      <line x1="199" y1="78" x2="205" y2="72" stroke={hex} strokeWidth="0.6" opacity="0.2" />
    </svg>
  );
}

function WaveBackground({ hex }: { hex: string }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 400 160"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="waveGrad" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor={hex} stopOpacity="0.08" />
          <stop offset="50%" stopColor={hex} stopOpacity="0.15" />
          <stop offset="100%" stopColor={hex} stopOpacity="0.05" />
        </linearGradient>
      </defs>
      <rect width="400" height="160" fill="url(#waveGrad)" />
      {/* Sinusoidal waves */}
      <path
        d="M0,80 C50,50 100,110 150,80 C200,50 250,110 300,80 C350,50 400,110 400,80"
        fill="none"
        stroke={hex}
        strokeWidth="1"
        opacity="0.2"
      />
      <path
        d="M0,95 C60,70 120,120 180,95 C240,70 300,120 360,95 L400,90"
        fill="none"
        stroke={hex}
        strokeWidth="0.5"
        opacity="0.12"
      />
      <path
        d="M0,65 C40,45 80,85 120,65 C160,45 200,85 240,65 C280,45 320,85 360,65 L400,60"
        fill="none"
        stroke={hex}
        strokeWidth="0.3"
        opacity="0.08"
      />
      {/* Candlestick lines */}
      {[40, 80, 120, 160, 200, 240, 280, 320, 360].map((x, i) => {
        const bodyTop = 60 + (i % 3) * 15;
        const bodyH = 20 + (i % 2) * 10;
        const wickTop = bodyTop - 10;
        const wickBottom = bodyTop + bodyH + 8;
        return (
          <g key={x} opacity={0.15 + (i % 3) * 0.05}>
            <line x1={x} y1={wickTop} x2={x} y2={wickBottom} stroke={hex} strokeWidth="0.5" />
            <rect x={x - 4} y={bodyTop} width="8" height={bodyH} fill={hex} opacity="0.12" rx="1" />
          </g>
        );
      })}
    </svg>
  );
}

const backgroundComponents = {
  angular: AngularBackground,
  shield: ShieldBackground,
  wave: WaveBackground,
};

interface ScenarioCardProps {
  data: ScenarioData;
  index: number;
}

export function ScenarioCard({ data, index }: ScenarioCardProps) {
  const colors = colorMap[data.color] ?? colorMap['strategic-blue'];
  const BgComponent = backgroundComponents[data.backgroundType];

  return (
    <ScrollReveal delay={index * 0.2}>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className={`group relative rounded-xl border ${colors.border} bg-[rgba(2,6,23,0.6)] backdrop-blur-sm overflow-hidden hover:border-opacity-60 transition-colors duration-300`}
      >
        {/* Image area */}
        <div className="relative h-40 lg:h-[160px] overflow-hidden">
          <BgComponent hex={data.hex} />

          {/* Top-right alert overlay */}
          <div className="absolute top-3 right-3 bg-[rgba(2,6,23,0.85)] backdrop-blur-lg rounded-lg px-3 py-2 max-w-[180px]">
            <p className={`text-[10px] font-mono tracking-widest ${colors.text} mb-0.5`}>
              {data.alertLabel}
            </p>
            <p className="text-xs font-semibold text-white leading-tight">
              {data.alertTitle}
            </p>
            <p className="text-[10px] text-mist-blue-gray leading-tight mt-0.5">
              {data.alertSubtitle}
            </p>
          </div>

          {/* Bottom-left meter overlay */}
          <div className="absolute bottom-3 left-3 bg-[rgba(2,6,23,0.75)] backdrop-blur-md rounded-lg px-3 py-2 min-w-[140px]">
            <p className="text-[10px] font-mono tracking-wider text-mist-blue-gray mb-1">
              {data.meterLabel}
            </p>
            <div className={`h-1.5 rounded-full ${colors.barBg} overflow-hidden`}>
              <div
                className={`h-full rounded-full ${colors.bg}`}
                style={{ width: `${data.meterPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Content area */}
        <div className="p-5">
          <h3 className="text-lg font-bold text-white mb-1.5 font-heading">
            {data.title}
          </h3>
          <p className="text-sm text-mist-blue-gray mb-4 leading-relaxed">
            {data.description}
          </p>
          <Link
            href={CTA_PLACEHOLDER}
            className={`inline-flex items-center text-sm font-medium ${colors.text} transition-transform duration-200`}
          >
            <span className="group-hover:translate-x-1 transition-transform duration-200">
              進入沙盒 →
            </span>
          </Link>
        </div>
      </motion.div>
    </ScrollReveal>
  );
}
