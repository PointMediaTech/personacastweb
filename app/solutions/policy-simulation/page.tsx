import type { Metadata } from 'next';
import PolicySimulationClient from './PolicySimulationClient';

export const metadata: Metadata = {
  title: '政策輿論模擬 — 預測政策發布後的社會反應 | PersonaCast',
  description:
    '告別同溫層偏差與事後滅火。PersonaCast 政策模擬引擎，協助決策者在政策發布前，精準預測各階層群體反彈，提前化解阻力，凝聚社會共識。',
};

export default function PolicySimulationPage() {
  return <PolicySimulationClient />;
}
