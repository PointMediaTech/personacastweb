// src/components/hero/theaterData.ts

export type DecisionKey = 'A' | 'B' | 'C';

export interface HUDLabelConfig {
  id: number;
  text: string;
  textZh: string;            // Chinese primary text
  value?: string;            // dynamic portion (e.g., "2.1M PATHS")
  valueZh?: string;          // Chinese dynamic portion (e.g., "2.1M 路徑")
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
  tags: string[];
  executionTime: string;
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
    textZh: '風險向量：擴散中',
    accentColor: '#B57D7D',
    position: { top: '20%', left: '52%' },
    cardPosition: { top: '18%', right: '30%' },
    hideBelow: 'lg',
  },
  {
    id: 2,
    text: 'SCENARIO LOCK:',
    textZh: '情境鎖定：',
    value: '2.1M PATHS',
    valueZh: '2.1M 路徑',
    accentColor: '#769EDB',
    position: { top: '38%', right: '28%' },
    cardPosition: { top: '36%', right: '18%' },
  },
  {
    id: 3,
    text: 'OUTCOME: CONTROLLED ✓',
    textZh: '結果：已控制 ✓',
    accentColor: '#4ADE80',
    position: { top: '55%', right: '12%' },
    cardPosition: { top: '54%', right: '6%' },
  },
];

export const DECISIONS: DecisionConfig[] = [
  {
    key: 'A',
    titleZh: '主動式誠意溝通',
    titleEn: 'PR PIVOT',
    accentColor: '#769EDB',
    accentRgb: '118,158,219',
    metrics: { successRate: 73, risk: '低' },
    tags: ['公關'],
    executionTime: '48-72h',
    hideBelow: undefined,
  },
  {
    key: 'B',
    titleZh: '法規防禦部署',
    titleEn: 'LEGAL WAR',
    accentColor: '#FFB800',
    accentRgb: '255,184,0',
    metrics: { successRate: 45, risk: '中' },
    tags: ['法律'],
    executionTime: '2-4 週',
    hideBelow: undefined,
  },
  {
    key: 'C',
    titleZh: '議題重構策略',
    titleEn: 'DIVERSION',
    accentColor: '#B57D7D',
    accentRgb: '181,125,125',
    metrics: { successRate: 28, risk: '高' },
    tags: ['公關', '技術'],
    executionTime: '24-48h',
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
