export const CTA_PLACEHOLDER = '#';

export interface ScenarioData {
  id: string;
  title: string;
  description: string;
  color: string;
  hex: string;
  alertLabel: string;
  alertTitle: string;
  alertSubtitle: string;
  meterLabel: string;
  meterPercent: number;
  backgroundType: 'angular' | 'shield' | 'wave';
}

export const scenarios: ScenarioData[] = [
  {
    id: 'political',
    title: '政治選戰',
    description: '醜聞爆發與議題置換的 72 小時壓力測試。',
    color: 'alert-red',
    hex: '#FF4D4D',
    alertLabel: 'ALERT',
    alertTitle: '衝突指數 > 70%',
    alertSubtitle: '醜聞擴散速率異常',
    meterLabel: 'CRISIS T-48H',
    meterPercent: 70,
    backgroundType: 'angular',
  },
  {
    id: 'corporate',
    title: '企業公關',
    description: '產品合規與品牌聲譽的風險控管。',
    color: 'strategic-blue',
    hex: '#769EDB',
    alertLabel: 'STRATEGY',
    alertTitle: '議題置換策略',
    alertSubtitle: '模擬報告 #PR-2847',
    meterLabel: 'BRAND RISK',
    meterPercent: 45,
    backgroundType: 'shield',
  },
  {
    id: 'financial',
    title: '金融社會',
    description: '群體情緒對市場動盪的連鎖反應預演。',
    color: 'insight-gold',
    hex: '#FFB800',
    alertLabel: 'CASCADE',
    alertTitle: '連鎖反應偵測',
    alertSubtitle: '群體恐慌指數: 62%',
    meterLabel: 'MARKET IMPACT',
    meterPercent: 62,
    backgroundType: 'wave',
  },
];
