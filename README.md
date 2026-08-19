# BLUEPRINTR

## Overview

This is the Part 2 premium marketing homepage for **BLUEPRINTR**, an AI Product Execution Copilot that translates a single product prompt into structured engineering artifacts — feature specs, REST API contracts, Mongoose models, and starter controller logic.

---

## What It Includes

- **Hero** — value proposition headline, subtext, and a primary CTA button
- **Product-in-Action** — scroll-triggered typewriter prompt followed by a staged reveal of three output artifact cards (Feature Spec, API Contract, Database Schema)
- **Feature Highlights** — five architecture feature cards with scroll reveal
- **Interactive Artifact Inspector Preview** — tabbed frontend preview of the generated artifact views (API contract, Mongoose schema, task board)
- **How It Works** — three-step flow explaining the BLUEPRINTR pipeline
- **Honest Build Note** — a first-person builder's note explaining what was actually built and why
- **Final CTA** — waitlist call-to-action
- **Footer** — navigation links and project info
- **Custom Cursor** — section-aware cursor with a lerp-animated trailer ring and a spotlight indicator label per section
- **SpotlightCard hover interaction** — radial gradient spotlight that follows the cursor inside each output card

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + Vite 8 |
| Styling | Vanilla CSS with custom properties (no Tailwind) |
| Icons | Lucide React |
| Animation utilities | Motion (used selectively) |
| Linting | Oxlint |

---

## Design & Interaction

The visual system uses a **warm charcoal + cream + soft lime** palette defined as CSS custom properties in `src/styles/variables.css`. Typography mixes **Plus Jakarta Sans / Inter** for display and body with **Playfair Display** for serif-italic section headline accents and **JetBrains Mono** for code and badge elements.

Interactions are intentionally restrained — the primary motion is the **Product-in-Action scroll trigger**: a native `IntersectionObserver` fires a typewriter animation on the prompt, then stages the three artifact cards into view sequentially. Sections use a reusable `SectionReveal` wrapper (also built on `IntersectionObserver`) for bidirectional fade-in on scroll. Both respect `prefers-reduced-motion`.

---

## Responsive Support

The layout is responsive with breakpoints targeting mobile and tablet viewports. Verified manually at desktop (1280px), tablet (~768px), and mobile (~390px) widths.

---

## Accessibility

- `aria-label` on all major sections
- `aria-hidden="true"` on all decorative elements (cursor layers, window dots, spotlight overlay)
- Heading hierarchy (`h1` → `h2` → `h3`) maintained across sections
- `prefers-reduced-motion` respected in both `ProductInAction` and `SectionReveal` — animations are skipped entirely and content is shown immediately

---

## Running Locally

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```

---

## Live Demo

[Live Demo](ADD_VERCEL_URL_HERE)

## GitHub

[GitHub Repository](ADD_GITHUB_URL_HERE)
