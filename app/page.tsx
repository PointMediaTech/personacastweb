import dynamic from 'next/dynamic';
import { HeroSection } from './components/hero';
import { generateHomePageSchemas } from './lib/structured-data';

/* Below-fold sections — dynamically imported to reduce First Load JS */
const ParadigmSection = dynamic(
  () => import('./components/paradigm/ParadigmSection').then(m => ({ default: m.ParadigmSection })),
);
const PillarsSection = dynamic(
  () => import('./components/pillars/PillarsSection').then(m => ({ default: m.PillarsSection })),
);
const ScenariosSection = dynamic(
  () => import('./components/scenarios/ScenariosSection').then(m => ({ default: m.ScenariosSection })),
);
const AuthoritySection = dynamic(
  () => import('./components/authority/AuthoritySection').then(m => ({ default: m.AuthoritySection })),
);
const CTASection = dynamic(
  () => import('./components/cta/CTASection').then(m => ({ default: m.CTASection })),
);
const FooterSection = dynamic(
  () => import('./components/footer/FooterSection').then(m => ({ default: m.FooterSection })),
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
        <ParadigmSection />
        <PillarsSection />
        <ScenariosSection />
        <AuthoritySection />
        <CTASection />
      </main>
      <FooterSection />
    </>
  );
}
