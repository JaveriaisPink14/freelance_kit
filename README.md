# FreelanceKit — Free Tools for Freelancers

FreelanceKit is a static React + TypeScript + Vite website for freelancers. It runs entirely in the browser: there is no application server, database, login, API route, OAuth flow, or server-side form submission.

## Commands

- `pnpm dev`: start the client-only Vite development server on port 3000 (or `$PORT`).
- `pnpm build:static`: create the static production bundle in `dist/public/`.
- `pnpm check`: run the TypeScript check.
- `pnpm test`: run the Vitest suite.

## Browser-only behavior

The fee calculator, pricing calculator, invoice generator, proposal studio, and client reply studio calculate or generate drafts locally. The invoice uses the browser print dialog for PDF export. Contact and free-pack forms only show local success feedback; they do not send or persist submissions. For direct contact, use the `mailto:` link on the Contact page.

## Project structure

- `client/src/App.tsx`: client-side route registration.
- `client/src/components/SiteShell.tsx`: responsive header, navigation, and footer.
- `client/src/lib/site.ts`: tools, templates, FAQs, rates, and shared content.
- `client/src/pages/Home.tsx`: homepage.
- `client/src/pages/ToolPages.tsx`: calculators, invoice generator, and copy tools.
- `client/src/pages/ContentPages.tsx`: templates, guides, About, Contact, and policy pages.
- `client/public/routes.json`: static route manifest.

The published build is configured as a static output with `server:false` and `database:false` in the managed Webdev project settings.
