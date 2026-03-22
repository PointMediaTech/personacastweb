'use client';

import { ScrollReveal } from '../shared/ScrollReveal';

interface PillarCardProps {
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  children?: React.ReactNode;
  footer: React.ReactNode;
  description: string;
  index: number;
}

const colorClasses: Record<string, { bg: string; border: string; text: string }> = {
  'strategic-blue': {
    bg: 'bg-strategic-blue/[0.04]',
    border: 'border-strategic-blue/[0.12]',
    text: 'text-strategic-blue',
  },
  'insight-gold': {
    bg: 'bg-insight-gold/[0.04]',
    border: 'border-insight-gold/[0.12]',
    text: 'text-insight-gold',
  },
  'dried-rose': {
    bg: 'bg-dried-rose/[0.04]',
    border: 'border-dried-rose/[0.12]',
    text: 'text-dried-rose',
  },
};

export function PillarCard({
  title,
  subtitle,
  icon,
  color,
  footer,
  description,
  index,
}: PillarCardProps) {
  const classes = colorClasses[color] ?? colorClasses['strategic-blue'];

  return (
    <ScrollReveal direction="up" delay={index * 0.15} className="max-lg:min-w-[80vw] max-lg:snap-center">
      <div className={`rounded-xl border p-6 ${classes.bg} ${classes.border}`}>
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg">{icon}</span>
          <div>
            <h3 className={`text-base font-bold ${classes.text}`}>{title}</h3>
            <p className="text-xs text-mist-blue-gray">{subtitle}</p>
          </div>
        </div>

        {/* Chart placeholder */}
        <div className="mb-4 h-32 rounded-lg border border-dashed border-white/10 flex items-center justify-center">
          <span className="text-xs font-mono text-white/20 tracking-wider uppercase">{title} Visual</span>
        </div>

        {/* Footer */}
        <div className="mb-3">{footer}</div>

        {/* Description */}
        <p className="text-xs text-mist-blue-gray font-mono leading-relaxed">
          {description}
        </p>
      </div>
    </ScrollReveal>
  );
}
