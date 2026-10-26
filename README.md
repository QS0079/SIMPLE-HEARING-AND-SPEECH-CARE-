# Simple Hearing & Speech Care — Official Landing Page

A modern, high-performance landing page for **Simple Hearing & Speech Care** (Wakad, Pune), built with Next.js 15 (App Router), React 19, and vanilla CSS.

Official Clinic Reference: [https://simplehearingandspeechcare.in/](https://simplehearingandspeechcare.in/)

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

### 3. Production Build
```bash
npm run build
npm run start
```

---

## Project Structure & Architecture

```
simple-hearing-landing/
├── app/
│   ├── globals.css          # Design tokens, medical palette, responsive layout
│   ├── layout.js             # Root layout, Google fonts, clinical metadata
│   ├── page.js               # Main landing page components & structure
│   └── icon.svg              # Brand gold favicon mark
├── components/
│   ├── EnquiryButton.js      # Modal trigger button with service pre-selection
│   ├── EnquiryProvider.js    # Appointment modal context & WhatsApp integration
│   ├── Header.js             # Fixed responsive navigation with clinic contact
│   ├── Icon.js               # Clean SVG icon set
│   ├── Logo.js               # Transparent dual-mode brand logo (dark / light)
│   ├── MobileBar.js          # Mobile sticky action bar (Call, WhatsApp, Appointment)
│   ├── Reveal.js             # Performance-optimized scroll reveal observer
│   ├── Seal.js               # "Unique in Maharashtra" clinical badge
│   └── Waveform.js           # Interactive brand audio waveform canvas
├── lib/
│   └── content.js            # Single source of truth for all copy, services & media
└── public/
    ├── logo.png              # Transparent charcoal navy + gold logo for light surfaces
    └── logo-light.png        # Transparent crisp white + gold logo for dark surfaces
```

---

## Brand Design System

- **Anchor Charcoal Navy (`#18212e` / `#0f172a`)**: Official silhouette color from clinic logo, providing clinical authority and high contrast.
- **Signature Clinic Gold (`#f5bf03`)**: Extracted from the official clinic ear & speech soundwave.
- **Refined Amber (`#d97706`)**: Warm clinical accent stops.
- **Medical Surfaces (`#ffffff`, `#f8fafc`)**: Clean slate borders and high-hygiene medical cards.

---

## Clinic Information & Location

- **Address**: Office 702, 7th Floor, Commercial Building, Westwood Estates, opp. Mont Vert Tropez Road, Kaspate Wasti, Wakad, Pune, Maharashtra 411057
- **Phone**: [+91 76667 73596](tel:+917666773596)
- **WhatsApp**: Direct enquiry integration through modal and action buttons
