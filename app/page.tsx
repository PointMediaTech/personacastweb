import { HeroSection } from './components/hero';
import { ParadigmSection } from './components/paradigm/ParadigmSection';
import { PillarsSection } from './components/pillars/PillarsSection';
import { ScenariosSection } from './components/scenarios/ScenariosSection';
import { AuthoritySection } from './components/authority/AuthoritySection';
import { CTASection } from './components/cta/CTASection';
import { FooterSection } from './components/footer/FooterSection';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'PersonaCast',
  applicationCategory: 'BusinessApplication',
  description: '領先 72 小時的 AI 戰略預演平台。從人格建模到場景推演，在關鍵決策發出前模擬公眾輿論走向。',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    description: '免費演示預約',
  },
  publisher: {
    '@type': 'Organization',
    name: 'PersonaCast',
    url: 'https://personacast.io',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Taipei',
      addressCountry: 'TW',
    },
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
