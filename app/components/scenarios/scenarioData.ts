export const CTA_PLACEHOLDER = '#';

export interface ScenarioData {
  id: string;
  number: string;
  title: string;
  description: string;
  accentHex: string;
  accentRgb: string;
  highlightColor: string; // for data number highlights in description
  statusTag: string;
  ctaLabel: string;
  bottomLabel: string;
  visualType: 'waveform' | 'orb' | 'comet';
}

export const scenarios: ScenarioData[] = [
  {
    id: 'political',
    number: '01',
    title: '敘事攔截：奪回議題主導權',
    description:
      '數位模擬對手的決策邏輯，精準捕捉危機發酵前的關鍵窗口。透過逆向路徑演算，預先部署論點，在輿論成型前完成全面攔截。',
    accentHex: '#FF8C00',
    accentRgb: '255,140,0',
    highlightColor: '#FF8C00',
    statusTag: 'ALERT｜議題置換率 > 89%',
    ctaLabel: '執行模擬：奪回主導權',
    bottomLabel: '[ 啟動攔截 ]',
    visualType: 'waveform',
  },
  {
    id: 'corporate',
    number: '02',
    title: '風險治理：精準定位火線源頭',
    description:
      '掃描利益網絡中 80+ 個核心節點，將被動防禦轉為主動佈局。精準鎖定影響全局的關鍵火線，在危機擴散前鞏固品牌護城河。',
    accentHex: '#00A3FF',
    accentRgb: '0,163,255',
    highlightColor: '#00D1FF',
    statusTag: 'STRATEGY｜溯源精確度 > 94%',
    ctaLabel: '執行模擬：鞏固品牌',
    bottomLabel: '[ 鞏固品牌 ]',
    visualType: 'orb',
  },
  {
    id: 'financial',
    number: '03',
    title: '演化推演：排除崩盤，鎖定勝率',
    description:
      '啟動 340 萬次模擬演算，徹底過濾導致風險的潛在路徑。抹除所有不可控變數，將未來導向預設軌跡，讓現實成為一場早已排練好的勝利。',
    accentHex: '#00E5C8',
    accentRgb: '0,229,200',
    highlightColor: '#00FFC2',
    statusTag: 'CASCADE｜市場預測率 100%',
    ctaLabel: '執行模擬：鎖定優勝',
    bottomLabel: '[ 鎖定優勝 ]',
    visualType: 'comet',
  },
];
