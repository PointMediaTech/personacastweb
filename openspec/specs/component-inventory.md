# Component Inventory

> Auto-generated: 2026-03-24 | Source: codebase scan

## Shared Components (`app/components/shared/`)

| Component | Rendering | Props | Used By |
|-----------|-----------|-------|---------|
| `Navbar` | Client | — | Root layout |
| `PageHero` | Client | `h1, h2, ctaPrimary?, ctaSecondary?, layout?, rightContent?, accentColor?` | About, Pricing, Solutions, Contact, Product sub-pages |
| `BottomCTA` | Client | `h2, body?, ctaPrimary, ctaSecondary?` | About, Pricing, Solutions, Product sub-pages |
| `ContentSection` | Server | `children, className?, id?` | Most pages |
| `ScrollReveal` | Client | `children, direction?, delay?, distance?, className?` | About, Contact, Solution pages |
| `FeatureCard` | Client | `title, description, icon?, accentColor?, delay?` | About |
| `GlowButton` | Client | `href, label, variant, minWidth?` | PageHero, BottomCTA |
| `FAQAccordion` | Client | `items` | Pricing, Product sub-pages |
| `PricingCard` | Client | pricing tier data | Pricing |
| `BillingToggle` | Client | toggle state | Pricing |
| `FeatureCompareTable` | Client | — | Pricing |
| `TrustBar` | Client | `stats, badges` | Pricing |
| `StepFlow` | Client | step data | Product sub-pages |
| `StepNavigation` | Client | navigation state | Product sub-pages |
| `PainPointCard` | Client | pain point data | Solution pages |
| `TestimonialCard` | Client | testimonial data | Solution pages |
| `SectionWrapper` | Server | `children` | Various |

## Product Components (`app/components/product/`)

| Component | Purpose |
|-----------|---------|
| `NebulaHero` | Product page hero with nebula visual |
| `ScrollExperience` | Scroll-driven product walkthrough |
| `BentoTech` | Bento grid tech showcase |
| `ProductCTA` | Product page bottom CTA |
| `TextRevealWrapper` | Scroll-based text reveal |
| `FocusCursor` | Custom cursor effect |

## Homepage Section Components

| Section | Component Dir | Key Components |
|---------|--------------|----------------|
| Hero | `hero/` | HeroSection, NeuralOracle, NeuralHead, SimulationTheater, StrategicRadar, ChaosFlowCanvas, DataRainCanvas, AgentCards (13 files) |
| Paradigm | `paradigm/` | ParadigmSection, ComparisonPanel, TraditionalChart, PredictionPath, DataTags, ScanlineBackground |
| Pillars | `pillars/` | PillarsSection, StrategyGraphCard, PersonaLabCard, CastingArenaCard |
| Scenarios | `scenarios/` | ScenariosSection, ScenarioCard + visuals (ConvergenceFunnel, NetworkGraph, TimelineComparison, GlowFilter) |
| Authority | `authority/` | AuthoritySection, CaseCard, AnimatedCounter |
| CTA | `cta/` | CTASection, DecisionLockIcon |

## Solution Client Components

| Component | Solution Page |
|-----------|--------------|
| `CrisisPRClient` | /solutions/crisis-pr |
| `PoliticalStrategyClient` | /solutions/political-strategy |
| `BrandReputationClient` | /solutions/brand-reputation |
| `PolicySimulationClient` | /solutions/policy-simulation |

## Product Sub-page Components

| Directory | Key Components |
|-----------|---------------|
| `product/seed-injection/components/` | SeedSimulationGraphic, UseCaseChatBubbles |
| `product/graph-engine/` | InteractiveGraphFeatures, LeadMagnetForm |
