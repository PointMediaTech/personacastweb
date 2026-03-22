'use client';

import { Radio, Dna, Swords, CheckCircle2 } from 'lucide-react';
import { ScrollReveal } from '../shared/ScrollReveal';

const icons = { Radio, Dna, Swords, CheckCircle2 } as const;

interface Step {
  icon: keyof typeof icons;
  title: string;
  subtitle: string;
  details: string[];
  color: 'strategic-blue' | 'aurora-cyan';
}

const steps: Step[] = [
  {
    icon: 'Radio',
    title: '數據收集',
    subtitle: 'DATA INGESTION',
    details: ['多源輿情抓取', '結構化事件解析'],
    color: 'strategic-blue',
  },
  {
    icon: 'Dna',
    title: '人格建模',
    subtitle: 'PERSONA MODELING',
    details: ['P_Final 公式計算', 'Zep 記憶注入'],
    color: 'strategic-blue',
  },
  {
    icon: 'Swords',
    title: '場景推演',
    subtitle: 'SIMULATION',
    details: ['72 小時多路徑模擬', '3.4M+ 場景分支'],
    color: 'aurora-cyan',
  },
  {
    icon: 'CheckCircle2',
    title: '結果驗證',
    subtitle: 'VALIDATION',
    details: ['因果鏈追蹤', '可解釋性報告'],
    color: 'aurora-cyan',
  },
];

function StepCard({ step, index }: { step: Step; index: number }) {
  const Icon = icons[step.icon];
  const isBlue = step.color === 'strategic-blue';
  const bgTint = isBlue ? 'bg-strategic-blue/10' : 'bg-aurora-cyan/10';
  const textColor = isBlue ? 'text-strategic-blue' : 'text-aurora-cyan';

  return (
    <ScrollReveal delay={index * 0.2}>
      <div className="rounded-lg border border-white/5 bg-white/[0.02] p-4">
        <div className={`w-8 h-8 rounded-md ${bgTint} flex items-center justify-center mb-3`}>
          <Icon className={`w-4 h-4 ${textColor}`} />
        </div>
        <p className="text-[11px] font-bold text-white">{step.title}</p>
        <p className={`text-[8px] font-mono ${textColor} mt-0.5`}>{step.subtitle}</p>
        <ul className="mt-2 space-y-1">
          {step.details.map((d) => (
            <li key={d} className="text-[9px] text-mist-blue-gray">
              {d}
            </li>
          ))}
        </ul>
      </div>
    </ScrollReveal>
  );
}

function Arrow() {
  return (
    <svg
      className="hidden lg:block shrink-0 w-8 h-8 self-center"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="arrow-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#769EDB" />
          <stop offset="100%" stopColor="#00F2FF" />
        </linearGradient>
      </defs>
      <line x1="4" y1="16" x2="24" y2="16" stroke="url(#arrow-grad)" strokeWidth="1.5" />
      <polygon points="24,12 32,16 24,20" fill="url(#arrow-grad)" />
    </svg>
  );
}

export function MethodologyPipeline() {
  return (
    <>
      {/* Desktop: horizontal with arrows */}
      <div className="hidden lg:flex items-stretch gap-2">
        {steps.map((step, i) => (
          <div key={step.subtitle} className="contents">
            <div className="flex-1 min-w-0">
              <StepCard step={step} index={i} />
            </div>
            {i < steps.length - 1 && <Arrow />}
          </div>
        ))}
      </div>

      {/* Tablet: 2x2 grid */}
      <div className="hidden md:grid lg:hidden grid-cols-2 gap-3">
        {steps.map((step, i) => (
          <StepCard key={step.subtitle} step={step} index={i} />
        ))}
      </div>

      {/* Mobile: vertical stack with connecting line */}
      <div className="md:hidden relative">
        {/* vertical connecting line */}
        <div className="absolute left-4 top-4 bottom-4 w-px bg-gradient-to-b from-strategic-blue to-aurora-cyan" />
        <div className="space-y-3 relative">
          {steps.map((step, i) => (
            <div key={step.subtitle} className="pl-10">
              <StepCard step={step} index={i} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
