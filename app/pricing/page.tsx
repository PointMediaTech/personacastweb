import type { Metadata } from 'next';
import { PageHero } from '@/app/components/shared/PageHero';
import { PricingCard } from '@/app/components/shared/PricingCard';
import { FAQAccordion } from '@/app/components/shared/FAQAccordion';
import { ContentSection } from '@/app/components/shared/ContentSection';
import { BottomCTA } from '@/app/components/shared/BottomCTA';

export const metadata: Metadata = {
  title: '定價方案 — 從試用到企業級 AI 輿情推演',
  description:
    '探索 PersonaCast 的彈性定價方案。從免費試用到企業級部署，找到最適合您組織的 AI 輿情預測方案。',
};

const plans = [
  {
    name: '探索版 Starter',
    audience: '初次接觸 AI 輿情推演的團隊',
    features: [
      '每月固定推演額度，足夠驗證 PersonaCast 的價值',
      '最多 N 個 AI 人格同時互動',
      '30 天推演歷史保留',
      'CSV 數據匯出',
      '社群支援',
    ],
    valueProposition:
      '這不只是「試用」。這是讓你的團隊親眼見證，輿論真的可以被預見的第一步。',
    cta: { label: '開始試用', href: '/contact' },
    highlighted: false,
    delay: 0,
  },
  {
    name: '專業版 Pro',
    badge: '最受歡迎',
    audience: '需要常態化輿情預判能力的公關與策略團隊',
    features: [
      '更高的月度推演額度',
      '最多 M 個 AI 人格——模擬更複雜的輿論場',
      '1 年推演歷史完整保留',
      'CSV + API 雙軌數據匯出',
      '優先技術支援',
      'SSO / SAML 單一登入',
    ],
    valueProposition:
      '從「偶爾模擬」進階到「持續預判」。當輿情預判成為團隊的日常工作流，你的組織就不再是被動回應者——而是掌局者。',
    cta: { label: '聯繫銷售', href: '/contact' },
    highlighted: true,
    delay: 0.1,
  },
  {
    name: '企業版 Enterprise',
    audience: '需要全面部署、私有化與深度整合的大型組織',
    features: [
      '無限推演次數',
      '無上限 AI 人格數量',
      '永久推演歷史保留',
      '全格式匯出 + 私有部署選項',
      '專屬客戶成功經理',
      'SSO / SAML 單一登入',
      '客製化整合與 SLA',
    ],
    valueProposition:
      'PersonaCast 不只是一個工具——它成為你組織的戰略神經中樞。從 CEO 到前線公關，每一層決策者都能即時取用推演洞察。',
    cta: { label: '預約諮詢', href: '/contact' },
    highlighted: false,
    delay: 0.2,
  },
] as const;

const faqItems = [
  {
    question: 'PersonaCast 的 AI 人格是怎麼建構的？真的能模擬真實的人嗎？',
    answer:
      'PersonaCast 的 AI 人格不是簡單的「角色扮演」。每個人格由多維度參數定義——包括價值觀體系、知識背景、情緒傾向、資訊接收管道、社會網絡位置等。它們基於大規模社會行為數據訓練，能夠展現真實人群在面對特定議題時的反應模式。\n\n它們不會「完美預測某一個人會說什麼」——沒有任何系統可以。\n但它們能精確模擬「這一類人群最可能的反應分布」。\n這正是策略決策所需要的：不是預測個體，而是預見群體的趨勢。',
  },
  {
    question: '推演結果的準確度如何驗證？我怎麼知道這不是 AI 在胡說？',
    answer:
      '三層驗證機制：\n\n交叉推演收斂性：同一議題會經過多輪獨立推演。當不同輪次的結果收斂到相同的趨勢，信心指數上升。如果結果分歧很大，系統會明確告訴你「這個議題的不確定性很高」——這本身就是有價值的情報。\n\n歷史回測：我們持續將過去的真實輿論事件作為推演輸入，比對推演預測與實際結果的吻合度。這些回測結果構成系統準確度的量化基礎。\n\n信心指數透明化：每一項預測都附帶信心指數和推演依據。我們不會給你一個數字然後讓你「相信我」——我們會告訴你這個數字是怎麼來的，讓你自己判斷。',
  },
  {
    question: '我們的資料安全嗎？推演內容會不會被用來訓練 AI？',
    answer:
      '絕對不會。\n\n資料隔離：每個客戶的推演數據完全獨立儲存，零交叉存取。\n\n不用於訓練：您注入的議題、推演結果和策略建議，絕不會被用於訓練我們或任何第三方的 AI 模型。這不只是承諾——是寫在合約裡的法律義務。\n\n企業級加密：所有數據在傳輸和儲存時均採用 AES-256 加密。企業版客戶可選擇私有雲部署，數據完全不離開你的基礎設施。\n\n合規認證：我們遵循 SOC 2 Type II 標準，並持續進行第三方安全稽核。',
  },
] as const;

export default function PricingPage() {
  return (
    <>
      <PageHero
        h1="選擇你的輿情掌控力等級。"
        h2="從初次探索到企業級戰略指揮中心，PersonaCast 提供彈性方案。每一個等級，都是在為你的組織加裝一層輿論防護網。"
      />

      {/* Pricing Cards */}
      <ContentSection>
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-start">
          {plans.map((plan) => (
            <PricingCard key={plan.name} {...plan} />
          ))}
        </div>
      </ContentSection>

      {/* FAQ */}
      <ContentSection>
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-12">
          常見問題
        </h2>
        <FAQAccordion items={faqItems} />
      </ContentSection>

      <BottomCTA
        h2="不確定哪個方案適合你？"
        body="預約一對一免費諮詢。我們的團隊會根據你的組織規模、使用場景和預算，推薦最適合的方案。沒有銷售壓力，只有誠實的建議。"
        ctaPrimary={{ label: '預約免費諮詢 →', href: '/contact' }}
        ctaSecondary={{ label: '聯繫銷售團隊', href: '/contact' }}
      />
    </>
  );
}
