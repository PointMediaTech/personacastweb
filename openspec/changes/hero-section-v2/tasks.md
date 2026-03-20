## 1. Setup & Configuration

- [x] 1.1 Install dependencies: `framer-motion`, `lucide-react` (if not already installed)
- [x] 1.2 Add custom color tokens to `tailwind.config.ts`: `deep-space`, `strategic-blue`, `dried-rose`, `mist-blue-gray`
- [x] 1.3 Add Google Fonts link for Plus Jakarta Sans (700, 800) and Inter (400, 500) to `index.html`
- [x] 1.4 Create directory structure: `src/components/hero/`

## 2. Particle Canvas System

- [x] 2.1 Create `useParticleSystem` hook with particle initialization (position, velocity, color, opacity, radius)
- [x] 2.2 Implement Brownian motion animation loop with `requestAnimationFrame`
- [x] 2.3 Add mouse position tracking and repulsion effect (150px radius)
- [x] 2.4 Implement responsive particle count (120 desktop / 60 mobile)
- [x] 2.5 Add Canvas resize handler for window resize events
- [x] 2.6 Ensure cleanup: cancel `requestAnimationFrame` and remove event listeners on unmount
- [x] 2.7 Create `ParticleCanvas.tsx` component wrapping the hook

## 3. Navbar Component

- [x] 3.1 Create `Navbar.tsx` with fixed positioning and glassmorphic backdrop-filter
- [x] 3.2 Implement Logo section: "PersonaCast" bold + "Hub" thin weight
- [x] 3.3 Add navigation links (Workflows, Persona Lab, Strategy Reports, Pricing) with hover states
- [x] 3.4 Add action buttons: Login (outline) and Request Demo (Strategic Blue solid)
- [x] 3.5 Implement responsive behavior: hide nav links and buttons on mobile, show logo only

## 4. Hero Content Component

- [x] 4.1 Create `HeroContent.tsx` with centered layout
- [x] 4.2 Implement H1 title with Framer Motion fade-up animation and staggered timing
- [x] 4.3 Style "輿論風暴" in Strategic Blue and add Dried Rose underline animation on "終局"
- [x] 4.4 Add subtitle with Inter font, Mist Blue Gray color, and 0.2s delayed animation
- [x] 4.5 Create CTA button with Strategic Blue background, Sparkles icon, and hover glow effect (Dried Rose shadow)
- [x] 4.6 Add `prefers-reduced-motion` support: disable translate animations, keep simple opacity fades

## 5. Hero Section Container

- [x] 5.1 Create `HeroSection.tsx` composing Navbar, ParticleCanvas, and HeroContent
- [x] 5.2 Set full-viewport layout (`min-h-screen`) with Deep Space background
- [x] 5.3 Configure z-index stacking: Canvas(0) → Content(10) → Navbar(50)
- [x] 5.4 Add responsive font sizing (3.75rem desktop → 2.25rem mobile)

## 6. Quality & Polish

- [x] 6.1 Verify all animations use easing curve `[0.22, 1, 0.36, 1]`
- [x] 6.2 Test responsive design at 375px, 768px, 1024px, 1440px breakpoints
- [x] 6.3 Verify color contrast meets WCAG AA (4.5:1 for text)
- [x] 6.4 Test `prefers-reduced-motion` behavior
- [x] 6.5 Verify Canvas animation cleanup on component unmount (no memory leaks)
- [x] 6.6 Add detailed code comments explaining Canvas particle logic and animation parameters
