import type { Metadata } from 'next';
import CrisisPRClient from './CrisisPRClient';

export const metadata: Metadata = {
  title: '公關危機預判 — 在輿論風暴前建立防火牆 | PersonaCast',
  description:
    '掌握輿論的下一步。在危機引爆前，提早 72 小時寫好完美劇本。透過 AI 深度推演，PersonaCast 幫助頂尖公關團隊從「被動救火」轉為「主動防禦」。',
};

export default function CrisisPRPage() {
  return <CrisisPRClient />;
}
