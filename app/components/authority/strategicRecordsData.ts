export interface CaseStudy {
  readonly id: string;
  readonly caseNumber: string;
  readonly label: string;
  readonly accentColor: string;
  readonly accentGlow: string;
  readonly title: string;
  readonly subtitle: string;
  readonly outcome: string;
  readonly stats: ReadonlyArray<{
    readonly value: number;
    readonly suffix: string;
    readonly label: string;
  }>;
  readonly status: string;
  readonly statusLabel: string;
}

export const caseStudies: ReadonlyArray<CaseStudy> = [
  {
    id: 'case-01',
    caseNumber: '01',
    label: '敘事攔截',
    accentColor: '#EAFF00',
    accentGlow: 'rgba(234, 255, 0, 0.4)',
    title: '頂級消費品牌：社交媒體抵制反轉',
    subtitle: 'NARRATIVE INTERCEPT',
    outcome: '72 小時內完成議題置換，負面聲量下降 82%。系統自動識別三條反敘事路徑，並於黃金窗口期內完成部署。',
    stats: [
      { value: 72, suffix: 'h', label: '議題置換耗時' },
      { value: 82, suffix: '%', label: '負面聲量降幅' },
    ],
    status: '執行：敘事治理成功',
    statusLabel: 'NARRATIVE GOVERNANCE — RESOLVED',
  },
  {
    id: 'case-02',
    caseNumber: '02',
    label: '共識定錨',
    accentColor: '#00FFFF',
    accentGlow: 'rgba(0, 255, 255, 0.4)',
    title: '區域性基礎建設：鄰避效應障礙導航',
    subtitle: 'CONSENSUS ANCHORING',
    outcome: '無衝突狀態下達成共識，排除 99.7% 阻礙路徑。透過 340M 虛擬利害關係人模擬，預判所有反對論點並預置回應框架。',
    stats: [
      { value: 99.7, suffix: '%', label: '阻礙路徑排除率' },
      { value: 340, suffix: 'M', label: '虛擬利害關係人' },
    ],
    status: '執行：認知奪取完成',
    statusLabel: 'COGNITIVE CAPTURE — COMPLETE',
  },
  {
    id: 'case-03',
    caseNumber: '03',
    label: '爆紅路徑',
    accentColor: '#00FFC2',
    accentGlow: 'rgba(0, 255, 194, 0.4)',
    title: '高成本影視內容：爆紅潛力預演',
    subtitle: 'VIRAL PATH ENGINEERING',
    outcome: '鎖定 96% 爆紅路徑，完成一百次虛擬演習。模擬覆蓋 12 個平台、48 個情緒觸發點，最終輸出最佳發佈時序。',
    stats: [
      { value: 96, suffix: '%', label: '爆紅路徑命中率' },
      { value: 100, suffix: '×', label: '虛擬演習次數' },
    ],
    status: '執行：爆紅路徑鎖定',
    statusLabel: 'VIRAL PATH — LOCKED',
  },
] as const;
