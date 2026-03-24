import type { Metadata } from 'next';
import { ContentSection } from '@/app/components/shared/ContentSection';
import { PageHero } from '@/app/components/shared/PageHero';
import { FAQAccordion } from '@/app/components/shared/FAQAccordion';
import { TrustBar } from '@/app/components/shared/TrustBar';
import { FeatureCompareTable } from '@/app/components/shared/FeatureCompareTable';
import { BottomCTA } from '@/app/components/shared/BottomCTA';
import { PricingInteractive } from './PricingInteractive';

export const metadata: Metadata = {
  title: '定價方案 — 從試用到企業級 AI 輿情推演',
  description:
    '探索 PersonaCast 彈性定價：免費洞察版、預判版 NT$29,900/月起、企業指揮版客製報價。AI 輿情推演，72 小時戰略先機。',
  alternates: {
    canonical: '/pricing',
  },
};

/* ── Static data ────────────────────────────────────────────────── */

const trustStats = [
  { value: '200+', label: '企業與政府客戶' },
  { value: '94%', label: '推演趨勢準確率' },
  { value: '10×', label: '比事後應對快的反應速度' },
  { value: '3M+', label: '累計推演次數' },
] as const;

const trustBadges = [
  'SOC 2 Type II 認證',
  'AES-256 加密',
  'GDPR 合規',
  '私有部署可選',
  '99.9% SLA',
] as const;

const faqItems = [
  {
    question: '我們的資料安全嗎？推演內容會不會被用來訓練 AI？',
    answer:
      '絕對不會。資料隔離：每個客戶的推演數據完全獨立儲存，零交叉存取。不用於訓練：您注入的議題、推演結果和策略建議，絕不會被用於訓練我們或任何第三方的 AI 模型。這不只是承諾——是寫在合約裡的法律義務。企業級加密：所有數據在傳輸和儲存時均採用 AES-256 加密。企業版客戶可選擇私有雲部署，數據完全不離開您的基礎設施。合規認證：我們遵循 SOC 2 Type II 標準，並持續進行第三方安全稽核。',
  },
  {
    question: '推演結果的準確度如何驗證？我怎麼知道這不是 AI 在胡說？',
    answer:
      '三層驗證機制：交叉推演收斂性——同一議題會經過多輪獨立推演，當不同輪次的結果收斂到相同的趨勢，信心指數上升。歷史回測——我們持續將過去的真實輿論事件作為推演輸入，比對推演預測與實際結果的吻合度，整體趨勢準確率達 94%。信心指數透明化——每一項預測都附帶信心指數和推演依據。',
  },
  {
    question: 'PersonaCast 的 AI 人格是怎麼建構的？真的能模擬真實的人嗎？',
    answer:
      'PersonaCast 的 AI 人格不是簡單的「角色扮演」。每個人格由多維度參數定義——包括價值觀體系、知識背景、情緒傾向、資訊接收管道、社會網絡位置等。它們基於大規模社會行為數據訓練，能夠展現真實人群在面對特定議題時的反應模式。它們不會「完美預測某一個人會說什麼」——沒有任何系統可以。但它們能精確模擬「這一類人群最可能的反應分布」。這正是策略決策所需要的：不是預測個體，而是預見群體的趨勢。',
  },
];

/* ── Rich FAQ items (JSX) for accordion rendering ───────────────── */

const faqItemsRich = [
  {
    question: '我們的資料安全嗎？推演內容會不會被用來訓練 AI？',
    answer: (
      <>
        <strong>絕對不會。</strong><br /><br />
        <span className="text-white">資料隔離：</span>每個客戶的推演數據完全獨立儲存，零交叉存取。<br /><br />
        <span className="text-white">不用於訓練：</span>您注入的議題、推演結果和策略建議，絕不會被用於訓練我們或任何第三方的 AI 模型。這不只是承諾——是寫在合約裡的法律義務。<br /><br />
        <span className="text-white">企業級加密：</span>所有數據在傳輸和儲存時均採用 AES-256 加密。企業版客戶可選擇私有雲部署，數據完全不離開您的基礎設施。<br /><br />
        <span className="text-white">合規認證：</span>我們遵循 SOC 2 Type II 標準，並持續進行第三方安全稽核。
      </>
    ),
  },
  {
    question: '推演結果的準確度如何驗證？我怎麼知道這不是 AI 在胡說？',
    answer: (
      <>
        <strong>三層驗證機制：</strong><br /><br />
        <span className="text-white">交叉推演收斂性：</span>同一議題會經過多輪獨立推演。當不同輪次的結果收斂到相同的趨勢，信心指數上升。如果結果分歧很大，系統會明確告訴您「這個議題的不確定性很高」——這本身就是有價值的情報。<br /><br />
        <span className="text-white">歷史回測：</span>我們持續將過去的真實輿論事件作為推演輸入，比對推演預測與實際結果的吻合度，整體趨勢準確率達 94%。<br /><br />
        <span className="text-white">信心指數透明化：</span>每一項預測都附帶信心指數和推演依據。我們不會給您一個數字然後讓您「相信我」——我們會告訴您這個數字是怎麼來的，讓您自己判斷。
      </>
    ),
  },
  {
    question: 'PersonaCast 的 AI 人格是怎麼建構的？真的能模擬真實的人嗎？',
    answer: (
      <>
        PersonaCast 的 AI 人格不是簡單的「角色扮演」。每個人格由多維度參數定義——包括價值觀體系、知識背景、情緒傾向、資訊接收管道、社會網絡位置等。它們基於大規模社會行為數據訓練，能夠展現真實人群在面對特定議題時的反應模式。<br /><br />
        它們不會「完美預測某一個人會說什麼」——沒有任何系統可以。<br />
        但它們能精確模擬<strong className="text-white">「這一類人群最可能的反應分布」</strong>。<br />
        這正是策略決策所需要的：不是預測個體，而是<strong className="text-white">預見群體的趨勢</strong>。
      </>
    ),
  },
];

/* ── JSON-LD structured data ────────────────────────────────────── */

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
};

const productJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'PersonaCast',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  offers: [
    {
      '@type': 'Offer',
      name: '洞察版 Insight',
      price: '0',
      priceCurrency: 'TWD',
      description: '每月 50 次高精度推演，最多 5 個核心 AI 人格',
    },
    {
      '@type': 'Offer',
      name: '預判版 Foresight',
      price: '29900',
      priceCurrency: 'TWD',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: '29900',
        priceCurrency: 'TWD',
        unitText: 'MON',
        referenceQuantity: { '@type': 'QuantitativeValue', value: '1', unitCode: 'MON' },
      },
      description: '每月 300 次深層推演，最多 30 個高擬真 AI 人格，1 年推演歷史保留',
    },
    {
      '@type': 'Offer',
      name: '指揮版 Command',
      price: '0',
      priceCurrency: 'TWD',
      description: '企業客製報價——無限推演次數、無上限 AI 人格、永久歷史保留、私有雲部署',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: '0',
        priceCurrency: 'TWD',
        description: '企業客製報價，請聯繫銷售團隊',
      },
    },
  ],
};

/* ── Page component (Server) ────────────────────────────────────── */

export default function PricingPage() {
  return (
    <>
      {/* JSON-LD for rich snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      <PageHero
        h1="PersonaCast 定價方案 — AI 輿情推演，從免費到企業級"
        h2="從被動填補危機，到提前掌握戰略先機。選擇適合您的 AI 輿情推演引擎，讓每一次品牌發聲都成為不敗的佈局。"
      />

      {/* Client island: billing toggle + pricing cards */}
      <PricingInteractive />

      {/* Feature Comparison Table */}
      <ContentSection>
        <FeatureCompareTable />
      </ContentSection>

      {/* Trust Bar */}
      <ContentSection>
        <TrustBar stats={[...trustStats]} badges={[...trustBadges]} />
      </ContentSection>

      {/* FAQ */}
      <ContentSection>
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-12">
          常見問題
        </h2>
        <FAQAccordion items={faqItemsRich} />
      </ContentSection>

      <BottomCTA
        h2="30 分鐘，我們幫您找到最值錢的那個選擇。"
        body="免費諮詢不是銷售電話。我們會先聽您的場景，再告訴您哪個方案真的值得您的預算。沒有壓力，只有誠實的建議。"
        ctaPrimary={{ label: '預約免費諮詢 →', href: '/contact' }}
        ctaSecondary={{ label: '聯繫銷售團隊', href: '/contact' }}
      />
    </>
  );
}
