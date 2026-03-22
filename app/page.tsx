import { HeroSection } from './components/hero';
import { ParadigmSection } from './components/paradigm/ParadigmSection';
import { PillarsSection } from './components/pillars/PillarsSection';
import { ScenariosSection } from './components/scenarios/ScenariosSection';
import { AuthoritySection } from './components/authority/AuthoritySection';
import { FooterSection } from './components/footer/FooterSection';

export default function HomePage() {
  return (
    <>
      <main>
        <HeroSection />
        <ParadigmSection />
        <PillarsSection />
        <ScenariosSection />
        <AuthoritySection />
      </main>
      <FooterSection />
    </>
  );
}
