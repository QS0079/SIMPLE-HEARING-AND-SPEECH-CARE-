# Simple Hearing & Speech Care — Official Landing Page

A modern, high-performance medical landing page for **Simple Hearing & Speech Care** (Wakad, Pune), engineered with Next.js 15 (App Router), React 19, and vanilla CSS.

- **Live Clinic Reference**: [https://simplehearingandspeechcare.in/](https://simplehearingandspeechcare.in/)
- **GitHub Repository**: [https://github.com/QSPL8080/Simple-Hearing.git](https://github.com/QSPL8080/Simple-Hearing.git)

---

## Highlights & Design Philosophy

- **Authentic Medical Aesthetics**: Human-crafted layout aligned with real-world audiology clinics—free of AI-generated tropes, rainbow gradient text, oscillating sine-wave canvases, or infinite looping ticker banners.
- **Official Typography**: Uses **Rubik** as the primary font family, directly matching the clinic's official brand site.
- **Clinical Palette**: Anchored in logo charcoal navy (`#18212e` / `#0f172a`), signature clinic gold (`#f5bf03` from the gold ear/soundwave logo), warm amber (`#d97706`), and clean sterile surfaces.
- **Purposeful Section Motion**: Every section features a unique, gentle transition rooted in acoustic clarity, balance stabilization, or childhood milestone development.
- **100% Content Integrity**: Strictly presents the clinic's authentic services and user-provided copy with zero filler badges or extraneous text.
- **Conversion-Optimized**: Direct phone triggers, interactive service-aware appointment modal, and one-tap WhatsApp consultation.

---

## Clinical Sections

1. **Header**: Clean clinic logo, direct phone link, Book an Appointment CTA, and mobile hamburger navigation.
2. **Hero Section (Acoustic Clarity Revelation)**:
   - GPU-composited CSS `@keyframes` entrance that fires immediately upon page load.
   - Auditory clarification text reveal (`blur(3px)` $\rightarrow$ `0`), warm amber glow on "Pune", cascading intro copy, appointment CTAs, and a live clinic status beacon.
   - Clinical photography card with gentle lens bloom, therapeutic ambient healing aura (`.hero__photo-aura`), and calm resting floating motion.
3. **Adult Specialized Services**:
   - **Hearing Aids**: Bilateral auditory clarity entrance from the left with sequenced bullet points.
   - **Vertigo Management Clinic**: Vestibular gyro-stabilization entrance (`rotate(-1deg)` $\rightarrow$ `0deg`) that visibly re-centers balance.
4. **Pediatrics Specialized Services**:
   - Milestone stepping ladder entrance for *Speech Therapy*, *Occupational Therapy*, and *School Readiness*.
   - Soft, uplifting quintic rise reflecting developmental growth.
5. **Neuro Sensory Accelerator**:
   - 2-column feature section highlighting vestibular, proprioception, tactile, and auditory processing.
   - Synaptic convergence animation with sequenced numerical clinical pillars.
6. **Cogniva Program**:
   - Child brain learning skill development feature focusing on *Attention*, *Working Memory*, *Processing Speed*, and *Executive Function*.
   - Tactile chip reveal mimicking active neural firing.
7. **Why Choose Us**:
   - 5 verifiable clinic reasons with active checkmark stamp reveals (`scale(0.7) rotate(-15deg)` $\rightarrow$ `1`).
   - 3-photo clinic mosaic with layered depth.
8. **Final Sanctuary CTA**:
   - Expansive dark healthcare card (`#18212e`) with elevation shadow bloom and direct WhatsApp / Appointment triggers.
9. **Footer & Mobile Action Bar**:
   - Official WhatsApp brand icon, phone, Google Maps location, address, and copyright.
   - Sticky mobile bar for quick one-tap Call, WhatsApp, and Appointment booking.

---

## Motion & Animation Engineering

- **Compositor Acceleration**: 100% powered by GPU-accelerated `transform` and `opacity` properties using `will-change` layer isolation for stutter-free 60fps scrolling.
- **Apple-Style Quintic Easing**: Standardized on `cubic-bezier(0.22, 1, 0.36, 1)` with natural, gentle travel distances (`14px - 22px`).
- **Guaranteed Hero Execution**: Pure CSS keyframes with `animation-fill-mode: both` ensure hero animations play reliably without waiting for React hydration.
- **Accessibility Fallback**: Full `@media (prefers-reduced-motion: reduce)` coverage to disable motion for users with vestibular sensitivities.

---

## Project Structure

```
simple-hearing-landing/
├── app/
│   ├── globals.css          # Design tokens, medical palette, responsive layout, motion keyframes
│   ├── layout.js            # Root layout, Rubik Google font, clinical metadata
│   ├── page.js              # Section architecture & component composition
│   └── icon.svg             # Brand clinic logo favicon
├── components/
│   ├── EnquiryButton.js     # Modal trigger button with service pre-selection
│   ├── EnquiryProvider.js   # Appointment modal state & WhatsApp consultation link
│   ├── Header.js            # Responsive sticky header with quick call trigger
│   ├── Icon.js              # Clean SVG icons (Phone, WhatsApp, Check, Pin, Mail, etc.)
│   ├── Logo.js              # Transparent dual-mode clinic logo (dark / light)
│   ├── MobileBar.js         # Mobile sticky bottom action bar (Call, WhatsApp, Book)
│   └── Reveal.js            # Early-trigger IntersectionObserver for below-the-fold reveals
├── lib/
│   └── content.js           # Single source of truth for all copy, services & media
├── public/
│   ├── logo.png             # Transparent charcoal navy + gold logo for light surfaces
│   └── logo-light.png       # Transparent white + gold logo for dark surfaces
├── jsconfig.json            # Modernized path aliases (@/*) & compiler options
├── package.json             # Next.js 15 & React 19 dependencies
└── README.md                # Project documentation
```

---

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
npm run start
```

---

## Configuration (`jsconfig.json`)

The project uses modern path aliases (`@/*`) without deprecated `baseUrl` options, fully compliant with modern TypeScript/JavaScript language services:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    },
    "jsx": "preserve",
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "checkJs": false,
    "lib": ["dom", "dom.iterable", "esnext"]
  },
  "include": [
    "next-env.d.ts",
    "**/*.js",
    "**/*.jsx",
    "**/*.mjs",
    ".next/types/**/*.ts"
  ],
  "exclude": [
    "node_modules",
    ".next",
    "out"
  ]
}
```

---

## Clinic Information & Location

- **Clinic Name**: Simple Hearing & Speech Care
- **Address**: Office 702, 7th Floor, Commercial Building, Westwood Estates, opp. Mont Vert Tropez Road, Kaspate Wasti, Wakad, Pimpri-Chinchwad, Maharashtra 411057
- **Phone**: [+91 76667 73596](tel:+917666773596)
- **WhatsApp**: Direct chat via `+91 76667 73596`
- **Google Maps**: [View on Google Maps](https://www.google.com/maps/search/?api=1&query=Simple+Hearing+and+Speech+Care+Wakad+Pune)
- **Official Website**: [https://simplehearingandspeechcare.in/](https://simplehearingandspeechcare.in/)
