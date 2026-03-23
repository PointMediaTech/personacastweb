import type { Metadata } from 'next';
import BrandReputationClient from './BrandReputationClient';

export const metadata: Metadata = {
  title: '品牌聲譽管理 — AI 量化品牌輿論韌性 | PersonaCast',
  description:
    '使用 PersonaCast 定期模擬品牌面臨各類風險事件時的輿論反應，建立聲譽韌性基線，在品牌危機發生前就建立完善的防護網。',
};

export default function BrandReputationPage() {
  return <BrandReputationClient />;
}
