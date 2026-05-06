import dynamic from 'next/dynamic';
import { HeroSection } from './components/hero/HeroSection';
import { generateHomePageSchemas } from './lib/structured-data';

const StatementSection = dynamic(
  () => import('./components/statement/StatementSection').then(m => ({ default: m.StatementSection })),
);
const PillarsSection = dynamic(
  () => import('./components/pillars/PillarsSection').then(m => ({ default: m.PillarsSection })),
);
const ScenarioSection = dynamic(
  () => import('./components/scenario/ScenarioSection').then(m => ({ default: m.ScenarioSection })),
);
const StatsSection = dynamic(
  () => import('./components/stats/StatsSection').then(m => ({ default: m.StatsSection })),
);
const CTASection = dynamic(
  () => import('./components/cta/CTASection').then(m => ({ default: m.CTASection })),
);

export default function HomePage() {
  const schemas = generateHomePageSchemas();

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <main>
        <HeroSection />
        <StatementSection />
        <PillarsSection />
        <ScenarioSection />
        <StatsSection />
        <CTASection />
      </main>
    </>
  );
}
