import type { Metadata } from 'next';
import { PageHero } from '@/app/components/shared/PageHero';
import { ContentSection } from '@/app/components/shared/ContentSection';

export const metadata: Metadata = {
  title: '隱私權政策 — PersonaCast',
  description: 'PersonaCast 重視您的隱私。本政策說明我們如何收集、使用及保護您的個人資訊。',
  alternates: { canonical: '/legal/privacy' },
  openGraph: {
    title: '隱私權政策 — PersonaCast',
    description:
      'PersonaCast 重視您的隱私。本政策說明我們如何收集、使用及保護您的個人資訊。',
    url: '/legal/privacy',
  },
};

const sections = [
  {
    title: '資料收集',
    body: '我們僅收集您主動提供的資訊（如姓名、電子郵件、公司名稱），以及透過 Cookie 與分析工具自動收集的匿名使用數據，以改善服務品質。',
  },
  {
    title: '資料使用',
    body: '您的資料僅用於提供與改善 PersonaCast 服務、回覆您的諮詢、以及寄送您同意接收的產品更新與行銷資訊。',
  },
  {
    title: '資料安全',
    body: '我們採用業界標準的加密技術與存取控制機制保護您的個人資訊，並定期進行安全稽核，以確保資料安全無虞。',
  },
  {
    title: '第三方分享',
    body: '除非法律要求或取得您的同意，我們不會將您的個人資料出售或分享給第三方。合作夥伴僅在提供服務所需範圍內存取資料。',
  },
  {
    title: '您的權利',
    body: '您有權隨時查閱、修正或刪除您的個人資料。如需行使相關權利，請透過聯絡頁面與我們聯繫。',
  },
  {
    title: '政策更新',
    body: '本隱私權政策可能不定期更新。重大變更將透過網站公告或電子郵件通知您。',
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        h1="隱私權政策"
        h2="PersonaCast 重視您的隱私。本政策說明我們如何收集、使用及保護您的個人資訊。"
      />
      <ContentSection>
        <div className="max-w-3xl mx-auto space-y-12">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-xl font-heading font-bold text-white mb-3">
                {section.title}
              </h2>
              <p className="text-[#94A3B8] leading-relaxed">{section.body}</p>
            </div>
          ))}
          <p className="text-sm text-[#64748B]">最後更新日期：2026 年 3 月</p>
        </div>
      </ContentSection>
    </>
  );
}
