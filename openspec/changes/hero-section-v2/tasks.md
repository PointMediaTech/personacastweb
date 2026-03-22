## 1. Setup & Configuration

- [x] 1.1 Install dependencies: `framer-motion`, `lucide-react`, `simplex-noise`
- [x] 1.2 Add custom color tokens to Tailwind CSS v4 config
- [x] 1.3 Add Google Fonts link for Plus Jakarta Sans (700, 800) and Inter (400, 500) to `index.html`
- [x] 1.4 Create directory structure: `src/components/hero/`

## 2. ChaosFlowCanvas 混沌流線系統

- [x] 2.1 Create `ChaosFlowCanvas.tsx` with 300-400 Bézier flow lines
- [x] 2.2 Implement simplex-noise based distortion (left chaos → right order gradient)
- [x] 2.3 Add gold highlight particles flowing along line paths
- [x] 2.4 Implement responsive rendering (reduce lines on mobile)
- [x] 2.5 Add flow line divergence on theater activation (decision-based path split)
- [x] 2.6 Ensure cleanup: cancel `requestAnimationFrame` on unmount

## 3. DataRainCanvas 數據雨背景

- [x] 3.1 Create `DataRainCanvas.tsx` with Matrix-style code rain
- [x] 3.2 Implement static word pool for rain characters
- [x] 3.3 Position on left side as background layer (z-1)

## 4. Navbar Component

- [x] 4.1 Create `Navbar.tsx` with fixed positioning and glassmorphic backdrop-filter
- [x] 4.2 Implement pure text Wordmark Logo: "Persona" (mist white, 600) + "Cast" (cyan, 800)
- [x] 4.3 Add navigation links with hover underline (cyan, center-expand) and text-shadow glow
- [x] 4.4 Add action buttons: Login (outline) and Request Demo (breathing glow animation)
- [x] 4.5 Implement responsive behavior: hide nav links and buttons on mobile
- [x] 4.6 Add bottom gradient separator line
- [x] 4.7 Typography: 16px font-size, letter-spacing 0.08em

## 5. Hero Content Component

- [x] 5.1 Create `HeroContent.tsx` with left-aligned layout
- [x] 5.2 Implement H1 title with Framer Motion fade-up animation and staggered timing
- [x] 5.3 Style highlighted text in Strategic Blue, add Dried Rose underline animation
- [x] 5.4 Add subtitle with Inter font, Mist Blue Gray color
- [x] 5.5 Create dual-state CTA button:
  - Inactive: Strategic Blue background, "啟動推演劇場", hover blue glow
  - Active: Transparent, gold border, "推演運行中", yellow breathing dot
- [x] 5.6 Add bottom status bar: Crisis Window / Sentiment / Scenarios
- [x] 5.7 Add `aria-pressed` and focus-visible ring for accessibility

## 6. Simulation Theater — Phase 1: HUD Labels

- [x] 6.1 Create `SimulationTheater.tsx` container for HUD labels and decision cards
- [x] 6.2 Create `HUDLabel.tsx` with semi-transparent background `rgba(2,6,23,0.55)` + backdrop-blur
- [x] 6.3 Implement bilingual layout: Chinese primary (14px) + English secondary (10px, muted)
- [x] 6.4 Implement CSS clip-path typewriter animation (Chinese text only)
- [x] 6.5 Add delayed fade-in for English text after typewriter completes
- [x] 6.6 Configure 3 HUD labels with crisis detection narrative:
  - Label 1: 公眾情緒：負面擴散中 (PUBLIC SENTIMENT: SPREADING) — Rose accent
  - Label 2: 法規合規：潛在違規偵測 (REGULATORY: VIOLATION DETECTED) — Blue, dynamic value
  - Label 3: 議題熱度：社群發酵中 (TOPIC HEAT: GOING VIRAL) — Warm Orange, pulse
- [x] 6.7 Create `theaterData.ts` centralized data config for labels, decisions, results

## 7. Simulation Theater — Phase 2: Decision Cards

- [x] 7.1 Create `DecisionCard.tsx` with glassmorphism styling (280px width, 16px blur, cyan border)
- [x] 7.2 Implement 3 decision cards:
  - Decision A: 公開道歉 (PR PIVOT) — 73% success
  - Decision B: 法律攻防 (LEGAL WAR) — 45% success
  - Decision C: 轉移關注 (DIVERSION) — 28% success
- [x] 7.3 Add pill-shaped category badges
- [x] 7.4 Add success rate progress bar (cyan/amber/red by value)
- [x] 7.5 Add risk breathing light dots (CSS animation)
- [x] 7.6 Create `SimulationResult.tsx` outcome panel with dimension metrics
- [x] 7.7 Add countdown timer: "72H CRISIS WINDOW: T-68H" on theater activation
- [x] 7.8 Implement morph animation: HUD labels → decision cards on toggle

## 8. Data Visualization Cards

- [x] 8.1 Create `DataCards.tsx` container for 3 data cards
- [x] 8.2 Create `ConflictIndexCard.tsx` with line chart visualization
- [x] 8.3 Create `TrajectoryCard.tsx` with SVG path trajectory
- [x] 8.4 Create `SentimentCard.tsx` with polar chart

## 9. Agent Cards

- [x] 9.1 Create `AgentCards.tsx` with 2 AI agent cards (林雅婷/ENFJ, 張銳/ENTP)
- [x] 9.2 Add breathing animation effect

## 10. Hero Section Container

- [x] 10.1 Create `HeroSection.tsx` composing all sub-components
- [x] 10.2 Manage state: `theaterActive`, `selectedDecision` via useState
- [x] 10.3 Configure z-index stacking: Canvas(0-2) → Content(10) → Theater(15) → Navbar(50)
- [x] 10.4 Add responsive layout and font sizing
- [x] 10.5 Create `LiveBadge.tsx` top-right LIVE status indicator

## 11. Quality & Polish

- [x] 11.1 Verify all Framer Motion animations use easing curve `[0.22, 1, 0.36, 1]`
- [x] 11.2 Test responsive design at 375px, 768px, 1024px, 1440px breakpoints
- [x] 11.3 Verify color contrast meets WCAG AA (4.5:1 for text)
- [x] 11.4 Test `prefers-reduced-motion` behavior
- [x] 11.5 Verify Canvas animation cleanup on component unmount
- [x] 11.6 Verify theater copy coherence: HUD labels + status bar narrative alignment
- [x] 11.7 Verify bilingual text rendering and animation timing