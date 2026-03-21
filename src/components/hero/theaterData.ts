// src/components/hero/theaterData.ts

export type DecisionKey = 'A' | 'B' | 'C';

export interface HUDLabelConfig {
  id: number;
  text: string;
  value?: string;           // dynamic portion (e.g., "2.1M")
  accentColor: string;       // hex
  position: { top: string; left?: string; right?: string };
  cardPosition: { top: string; right: string }; // position when morphed to decision card
  hideBelow?: 'lg';          // Tailwind responsive hiding
}

export interface DecisionConfig {
  key: DecisionKey;
  titleZh: string;           // e.g., "公開道歉"
  titleEn: string;           // e.g., "PR PIVOT"
  accentColor: string;
  accentRgb: string;         // for rgba usage
  metrics: { successRate: number; risk: string };
  hideBelow?: 'lg';
}

export interface DecisionResult {
  successRate: number;
  opinionControl: string;
  timeCost: string;
  riskLevel: string;
  conclusion: string;
  conflictValue: number;     // bottom status bar sync
  conflictColor: string;     // color for the conflict value
}

export const HUD_LABELS: HUDLabelConfig[] = [
  {
    id: 1,
    text: 'RISK VECTORS: DIVERGING',
    accentColor: '#B57D7D',
    position: { top: '20%', left: '52%' },
    cardPosition: { top: '18%', right: '38%' },
    hideBelow: 'lg',
  },
  {
    id: 2,
    text: 'SCENARIO LOCK:',
    value: '2.1M PATHS',
    accentColor: '#769EDB',
    position: { top: '38%', right: '28%' },
    cardPosition: { top: '36%', right: '26%' },
  },
  {
    id: 3,
    text: 'OUTCOME: CONTROLLED ✓',
    accentColor: '#4ADE80',
    position: { top: '55%', right: '12%' },
    cardPosition: { top: '54%', right: '14%' },
  },
];

export const DECISIONS: DecisionConfig[] = [
  {
    key: 'A',
    titleZh: '公開道歉',
    titleEn: 'PR PIVOT',
    accentColor: '#769EDB',
    accentRgb: '118,158,219',
    metrics: { successRate: 73, risk: '低' },
    hideBelow: undefined,
  },
  {
    key: 'B',
    titleZh: '法律攻防',
    titleEn: 'LEGAL WAR',
    accentColor: '#FFB800',
    accentRgb: '255,184,0',
    metrics: { successRate: 45, risk: '中' },
    hideBelow: undefined,
  },
  {
    key: 'C',
    titleZh: '轉移關注',
    titleEn: 'DIVERSION',
    accentColor: '#B57D7D',
    accentRgb: '181,125,125',
    metrics: { successRate: 28, risk: '高' },
    hideBelow: 'lg',
  },
];

export const DECISION_RESULTS: Record<DecisionKey, DecisionResult> = {
  A: {
    successRate: 73,
    opinionControl: 'HIGH',
    timeCost: 'T+24H',
    riskLevel: 'LOW',
    conclusion: '建議：立即執行',
    conflictValue: 34,
    conflictColor: '#4ADE80',
  },
  B: {
    successRate: 45,
    opinionControl: 'MEDIUM',
    timeCost: 'T+48H',
    riskLevel: 'MEDIUM',
    conclusion: '建議：備妥法務團隊',
    conflictValue: 58,
    conflictColor: '#FFB800',
  },
  C: {
    successRate: 28,
    opinionControl: 'LOW',
    timeCost: 'T+12H',
    riskLevel: 'CRITICAL',
    conclusion: '警告：高混亂度',
    conflictValue: 91,
    conflictColor: '#B57D7D',
  },
};

export const EASE = [0.22, 1, 0.36, 1] as const;
