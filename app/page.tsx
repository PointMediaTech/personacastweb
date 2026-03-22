import { HeroSection } from './components/hero';
import { ParadigmSection } from './components/paradigm/ParadigmSection';
import { PillarsSection } from './components/pillars/PillarsSection';

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <ParadigmSection />
      <PillarsSection />
    </main>
  );
}
