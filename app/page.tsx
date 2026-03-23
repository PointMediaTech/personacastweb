import { HeroSection } from './components/hero';
import { ParadigmSection } from './components/paradigm/ParadigmSection';
import { PillarsSection } from './components/pillars/PillarsSection';
import { ScenariosSection } from './components/scenarios/ScenariosSection';
import { AuthoritySection } from './components/authority/AuthoritySection';
import { CTASection } from './components/cta/CTASection';
import { FooterSection } from './components/footer/FooterSection';
import { generateHomePageSchemas } from './lib/structured-data';

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
