# Engineering Decisions

## 1. Why this approach?

**React + Vite** — Fast dev server, hot reload, and a clean module-based component structure. For a landing page this size, Vite's startup time and build output are practical with no overhead.

**Vanilla CSS + custom properties** — All design tokens (colors, spacing, font stacks, transitions) live in `variables.css`. This keeps the visual system consistent without pulling in a utility framework. The warm charcoal (`#211F1F`) + cream (`#FFFCEC`) + soft lime (`#C3EDA1`) palette is defined once and referenced everywhere.

**Native `IntersectionObserver` for the product animation** — No animation library dependency for the core scroll trigger. The `ProductInAction` component uses a plain observer to fire the typewriter sequence and card reveal when the section enters the viewport. The same pattern powers `SectionReveal` across the page for bidirectional fade-in. Both short-circuit immediately when `prefers-reduced-motion` is set.

**Limited motion by design** — The page has one primary animation sequence (the Product-in-Action demo) and lightweight scroll reveals. This was intentional: the focus is on communicating what the product does, not on impressing with effects.

**Product-in-Action over marketing claims** — The demo section shows an actual output: a typewriter prompt, a Feature Spec card, an API Contract card, and a Mongoose schema card. These match the real BLUEPRINTR artifact types. Showing the output directly is more honest than describing it.

**MongoDB/Mongoose terminology** — The artifacts displayed reference Mongoose models because that is the actual BLUEPRINTR backend data layer. No alternative database terminology was used.

---

## 2. Trade-off under the time limit

The priority was: a polished, responsive homepage with a working product demonstration and honest representation of what BLUEPRINTR does.

What was not built: a backend, live API calls, or a real waitlist endpoint. The CTA and demo are frontend-only. Under a time-constrained assignment, building a fake backend or many animations would have diluted the actual goal — demonstrating that the product idea is clear and the implementation is clean.

---

## 3. AI tools and personal verification

AI tools (Claude and Antigravity/Gemini) were used during development for planning, implementation assistance, component scaffolding, CSS debugging, and responsive layout refinement.

What I personally reviewed and verified:
- Section order and content accuracy
- Responsive layout at desktop, tablet, and mobile widths — no horizontal overflow
- The Product-in-Action demo sequence (typewriter → card reveal → reset on scroll-out)
- That no fabricated metrics appear in the final copy
- That the "live dashboard" claim was removed — the preview is a frontend artifact inspector, not a connected backend view
- Color token consistency across all components
- `prefers-reduced-motion` behavior
- `aria-label` and `aria-hidden` placement on all sections
- Production build (`npm run build`) completes without errors
