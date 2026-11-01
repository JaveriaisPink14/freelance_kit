# FreelanceKit plan

## Product direction
FreelanceKit is a free, no-signup toolkit for freelancers who need to price work, pitch clients, and get paid. The first release is a polished responsive website with a clear homepage, working client-side calculators, an invoice workflow, lightweight proposal/reply generators, educational content, and the legal/resource routes needed for an AdSense-ready foundation.

## Design

### Considered styles
- Warm editorial toolbench (0.07): a tactile, print-inspired interface with ink, oat, juniper and saffron.
- Quiet fintech ledger (0.06): restrained cream surfaces, tabular numbers and a disciplined grid.
- Playful studio utility (0.05): friendly shapes, hand-drawn accents and more saturated color.

### Chosen style: warm editorial toolbench
- **Design Movement:** contemporary editorial design with a tactile stationery / studio-workbench feel.
- **Core Principles:** make the useful action obvious; pair every tool with helpful context; keep the interface calm and human; show calculations transparently.
- **Color Philosophy:** ink-black gives the product authority, oat makes long-form content easy to read, juniper is the ownable action color, and saffron/terracotta add moments of warmth without becoming decoration.
- **Layout Paradigm:** an asymmetric page rhythm with large editorial type on the left and compact tool panels / “paper slips” on the right; sections are separated by generous breathing room and small ruled dividers rather than repetitive centered card grids.
- **Signature Elements:** a small monogram “FK” stamp, ruled-paper result panels, and pill-shaped “local-first” badges.
- **Interaction Philosophy:** inputs feel direct and forgiving; results update quickly; no signup, modal or unnecessary step blocks the user.
- **Animation:** use subtle 180–240ms lifts on cards and buttons, a soft highlight sweep on the hero stamp, and no looping motion that competes with the tools.
- **Typography System:** a high-contrast serif display face for headlines (Georgia fallback) paired with a clean system sans for controls and body copy. Labels use compact uppercase tracking.
- **Brand Essence:** practical tools for independent workers who deserve software that understands how they actually get paid. Personality: grounded, generous, quietly confident.
- **Brand Voice:** direct, encouraging, and specific. Example lines: “Know your number before you name your price.” / “Good work deserves a clean paper trail.”
- **Wordmark & Logo:** the wordmark sits beside a stamped square FK monogram with a cut-corner silhouette; it reads like a small maker’s mark rather than a generic SaaS logo.
- **Signature Brand Color:** Juniper `#1d5a4b`.

## Implementation
- React + TypeScript + Vite in a static, client-only build; there is no application server, database, login, API route or server-side form submission.
- Wouter handles the route set. `SiteShell` owns the shared header/footer; `Home` and `ToolPages` own page-specific content and interactions; `site.ts` owns data, calculator rates and shared copy.
- Calculator behavior is local-only and transparent: fee calculator supports local currencies and payment methods; pricing calculator implements the brief’s fee/tax/expense formula; invoice generator builds line items and uses browser print-to-PDF; proposal and reply tools provide editable smart templates without pretending an API is connected. Contact and free-pack forms show local success states only and do not send or persist data.
- The complete route set is published through `client/public/routes.json`.
- No stock imagery or copied content is used; the visual identity is CSS and icon based so the site stays fast and original.
- Content sections, FAQ blocks, legal links and disclosures are included to create a useful, navigable foundation for future SEO and AdSense review.

## Project structure
- `client/src/App.tsx`: route registration and client-only providers.
- `client/src/components/SiteShell.tsx`: responsive navigation, shared page chrome and footer.
- `client/src/lib/site.ts`: brand data, tool metadata, templates, FAQs and formatting helpers.
- `client/src/pages/Home.tsx`: landing page.
- `client/src/pages/ToolPages.tsx`: calculators, invoice generator and smart copy tools.
- `client/src/pages/ContentPages.tsx`: templates, blog, about, contact and policy pages.
- `client/src/index.css`: palette, typography, responsive layout and interaction styling.
- `client/public/routes.json`: route manifest.
