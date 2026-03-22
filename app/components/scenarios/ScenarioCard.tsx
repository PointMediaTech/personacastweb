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

interface ScenarioCardProps {
  data: ScenarioData;
  index: number;
}

export function ScenarioCard({ data, index }: ScenarioCardProps) {
  const colors = colorMap[data.color] ?? colorMap['strategic-blue'];

  return (
    <ScrollReveal delay={index * 0.2}>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className={`group relative rounded-xl border ${colors.border} bg-[rgba(2,6,23,0.6)] backdrop-blur-sm overflow-hidden hover:border-opacity-60 transition-colors duration-300`}
      >
        {/* Image placeholder area */}
        <div className="relative h-40 lg:h-[160px] overflow-hidden border-b border-white/[0.04] flex items-center justify-center">
          <span className="text-xs font-mono text-white/15 tracking-wider uppercase">
            {data.title} Visual
          </span>

          {/* Top-right alert overlay */}
          <div className="absolute top-3 right-3 bg-[rgba(2,6,23,0.85)] backdrop-blur-lg rounded-lg px-3 py-2 max-w-[180px]">
            <p className={`text-xs font-mono tracking-widest ${colors.text} mb-0.5`}>
              {data.alertLabel}
            </p>
            <p className="text-xs font-semibold text-white leading-tight">
              {data.alertTitle}
            </p>
            <p className="text-xs text-mist-blue-gray leading-tight mt-0.5">
              {data.alertSubtitle}
            </p>
          </div>

          {/* Bottom-left meter overlay */}
          <div className="absolute bottom-3 left-3 bg-[rgba(2,6,23,0.75)] backdrop-blur-md rounded-lg px-3 py-2 min-w-[140px]">
            <p className="text-xs font-mono tracking-wider text-mist-blue-gray mb-1">
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
          <p className="text-base text-mist-blue-gray mb-4 leading-relaxed">
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
