import type { Metadata } from 'next';
import { PageHero } from '@/app/components/shared/PageHero';
import { ContentSection } from '@/app/components/shared/ContentSection';

export const metadata: Metadata = {
  title: '服務條款 — PersonaCast',
  description: '使用 PersonaCast 服務前，請詳閱以下條款。',
  alternates: { canonical: '/legal/terms' },
  openGraph: {
    title: '服務條款 — PersonaCast',
    description: '使用 PersonaCast 服務前，請詳閱以下條款。',
    url: '/legal/terms',
  },
};

const sections = [
  {
    title: '服務範圍',
    body: 'PersonaCast 提供 AI 驅動的輿情模擬與戰略推演平台。本服務僅供合法商業用途使用，不得用於任何違法或損害他人權益之目的。',
  },
  {
    title: '帳戶責任',
    body: '您有責任維護帳戶憑證的安全性，並對帳戶下發生的所有活動負責。如發現未經授權的使用，請立即通知我們。',
  },
  {
    title: '智慧財產權',
    body: 'PersonaCast 平台及其所有內容、功能與技術均受智慧財產權法保護。未經書面授權，不得複製、修改或散布本平台之任何部分。',
  },
  {
    title: '使用限制',
    body: '您同意不以任何方式干擾平台運作、不進行逆向工程、不嘗試未經授權存取系統，且不得將服務用於產生虛假或誤導性資訊。',
  },
  {
    title: '責任限制',
    body: '在法律允許的最大範圍內，PersonaCast 對因使用或無法使用本服務所導致的任何間接、附帶或衍生性損害不承擔責任。',
  },
  {
    title: '條款變更',
    body: '我們保留隨時修改本服務條款之權利。重大變更將提前通知用戶，繼續使用服務即表示您同意更新後的條款。',
  },
];

export default function TermsOfServicePage() {
  return (
    <>
      <PageHero
        h1="服務條款"
        h2="使用 PersonaCast 服務前，請詳閱以下條款。"
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
