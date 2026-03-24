# Page Structure Specification

> Auto-generated: 2026-03-24 | Source: codebase scan

## Page Composition Patterns

### Pattern A: Static Content Page
```
Server page.tsx
├── metadata export
├── JSON-LD <script>
├── PageHero
├── ContentSection (repeated)
│   └── Static content / cards
└── BottomCTA
```
**Used by:** About, Solutions overview

### Pattern B: Interactive Content Page
```
Server page.tsx
├── metadata export
├── JSON-LD <script>
├── PageHero
├── Client Island component(s)
├── ContentSection (static)
└── BottomCTA
```
**Used by:** Pricing (PricingInteractive), Contact (ContactForm)

### Pattern C: Solution Detail Page
```
Server page.tsx
├── metadata export
└── <SolutionNameClient />   ← entire page is client-rendered
```
**Used by:** Crisis PR, Political Strategy, Brand Reputation, Policy Simulation

### Pattern D: Product Sub-page
```
Server page.tsx
├── metadata export
├── JSON-LD <script>
├── PageHero
├── ContentSection blocks with interactive components
├── FAQAccordion
└── BottomCTA
```
**Used by:** Seed Injection, Graph Engine, Simulation Theater, Predictive Decoder, Data Assets

### Pattern E: Homepage
```
Server page.tsx (with dynamic imports)
├── JSON-LD schemas (WebSite, Org, SoftwareApp, Breadcrumb)
├── HeroSection (static import — above fold)
├── ParadigmSection (dynamic)
├── PillarsSection (dynamic)
├── ScenariosSection (dynamic)
├── AuthoritySection (dynamic)
└── CTASection (dynamic)
```

## Page Details

### Homepage (`/`)
| Section | Component | Purpose |
|---------|-----------|---------|
| 1 | HeroSection | NeuralOracle visual + tagline + CTA |
| 2 | ParadigmSection | Traditional vs PersonaCast comparison |
| 3 | PillarsSection | Three core capabilities |
| 4 | ScenariosSection | Use case scenarios |
| 5 | AuthoritySection | Stats + case cards |
| 6 | CTASection | Final conversion CTA |

### Product Overview (`/product`)
| Section | Component | Purpose |
|---------|-----------|---------|
| 1 | NebulaHero | Immersive hero with nebula visual |
| 2 | ScrollExperience | 5-step workflow walkthrough |
| 3 | BentoTech | Technical capabilities bento grid |
| 4 | ProductCTA | Product-specific CTA |

### Pricing (`/pricing`)
| Section | Component | Purpose |
|---------|-----------|---------|
| 1 | PageHero | Pricing headline |
| 2 | PricingInteractive | Billing toggle + 3 tier cards |
| 3 | FeatureCompareTable | Detailed feature comparison |
| 4 | TrustBar | Stats + compliance badges |
| 5 | FAQAccordion | 3 FAQ items (rich JSX answers) |
| 6 | BottomCTA | Consultation CTA |

**Pricing tiers:**
- 洞察版 Insight — Free (50 simulations/mo, 5 personas)
- 預判版 Foresight — NT$29,900/mo (300 simulations, 30 personas)
- 指揮版 Command — Custom enterprise pricing

### Contact (`/contact`)
| Section | Component | Purpose |
|---------|-----------|---------|
| 1 | PageHero (split) | Left: copy, Right: ContactForm |
| 2 | Contact info cards | Email, social, office |

**Form fields:** Name*, Company*, Title, Email*, Phone, Role (select), Scenario (select), Notes (textarea)
**Status:** Non-functional (readOnly inputs, no submission handler)

### About (`/about`)
| Section | Component | Purpose |
|---------|-----------|---------|
| 1 | PageHero | Mission statement |
| 2 | Mission & Vision | 2-col text layout |
| 3 | Impact Stats | 4 metric cards (24/7, 500+, 360°, T-0) |
| 4 | Core Values | 3 FeatureCards |
| 5 | Team Teaser | 4 team role cards (CEO, CTO, CSO, CPO) |
| 6 | BottomCTA | Demo CTA |
