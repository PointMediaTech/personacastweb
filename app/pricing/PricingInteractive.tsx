'use client';

import { useState } from 'react';
import { ContentSection } from '@/app/components/shared/ContentSection';
import { PricingCard } from '@/app/components/shared/PricingCard';
import { BillingToggle } from '@/app/components/shared/BillingToggle';

function getPlans(isAnnual: boolean) {
  return [
    {
      name: '洞察版 Insight',
      audience: '適合還在評估 AI 導入的團隊，零成本驗證「輿情預判」的真實威力。',
      priceDisplay: '免費開始',
      priceSuffix: '',
      valueProposition:
        '這不只是試用，這是讓您親眼見證輿論走向如何被精準預見的第一步。',
      features: [
        '每月 50 次高精度推演',
        '最多 5 個核心 AI 人格',
        '30 天推演歷史保留',
        '基礎 CSV 數據匯出',
        '社群支援',
      ],
      commitment: '免綁卡，30秒完成註冊',
      cta: { label: '建立免費帳戶 →', href: '/signup', variant: 'outline' as const },
      highlighted: false,
      delay: 0,
    },
    {
      name: '預判版 Foresight',
      badge: '最受歡迎',
      audience: '適合常態高壓的品牌策略室，把輿情推演升級為團隊的「每日標準工作流」。',
      priceDisplay: isAnnual ? 'NT$ 23,920' : 'NT$ 29,900',
      priceSuffix: '/ 月',
      originalPriceDisplay: isAnnual ? 'NT$ 29,900' : undefined,
      valueProposition:
        '從被動的「偶爾模擬」進階到主動的「持續掌局」。當預測成為日常，您的組織就不再是被動回應者。',
      socialProof: '超過 80% 頂尖 SaaS 與品牌公關團隊首選',
      features: [
        '每月 300 次深層推演——足應對高強度議題季',
        '最多 30 個高擬真 AI 人格',
        '完整 1 年推演歷史保留',
        'CSV + API 雙軌數據匯出',
        '優先技術支援 (SLA 保障)',
        'SSO / SAML 單一登入',
      ],
      commitment: '按月計費，隨時可取消，無違約金',
      cta: { label: '免費試用 14 天', href: '/signup', variant: 'primary' as const },
      highlighted: true,
      delay: 0.1,
    },
    {
      name: '指揮版 Command',
      audience: '適合跨國企業與集團核心，要求資料絕對保密與無限算力。',
      priceDisplay: '企業客製報價',
      priceSuffix: '',
      valueProposition:
        '不只是工具，而是集團專屬的戰略神經中樞。從 CEO 到前線公關，資訊零落差。',
      features: [
        '無限推演次數，無峰值限制',
        '無上限客製化 AI 人格數量',
        '永久推演歷史保留',
        '全格式匯出 + 私有雲部署選項',
        '專屬戰略顧問與客戶成功經理',
        'SSO / SAML 單一登入',
        '客製化整合與企業級 SLA',
      ],
      commitment: '專人評估與私有雲架構設計',
      cta: { label: '聯繫專屬戰略顧問', href: '/contact', variant: 'secondary' as const },
      highlighted: false,
      delay: 0.2,
    },
  ] as const;
}

export function PricingInteractive() {
  const [isAnnual, setIsAnnual] = useState(false);
  const plans = getPlans(isAnnual);

  return (
    <>
      <ContentSection>
        <div className="flex justify-center mt-[-10px] sm:mt-0">
          <BillingToggle isAnnual={isAnnual} onChange={setIsAnnual} />
        </div>
      </ContentSection>

      <ContentSection>
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-start relative z-10">
          {plans.map((plan) => (
            <PricingCard key={plan.name} {...plan} />
          ))}
        </div>
      </ContentSection>
    </>
  );
}
