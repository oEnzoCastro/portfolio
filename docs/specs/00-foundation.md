# 00 — Foundation

Everything the pages are built on: project setup, design tokens, fonts, the
brand mark, theme and languages.

---

### FND-01 — Project setup
Priority: v1
As the developer, I want a clean, typed project with checks from day one, so
that quality does not depend on remembering.

- [ ] Next.js (App Router) with TypeScript in strict mode and CSS Modules.
- [ ] `npm run dev`, `build`, `lint`, `typecheck` and `test` scripts exist and pass on an empty project.
- [ ] Vitest + Testing Library for unit tests. End-to-end tests (Playwright) are planned for v2, see QA-04.
- [ ] A pre-commit hook lints the staged files and type checks the whole project; a pre-push hook runs unit tests.
- [ ] CI (GitHub Actions) runs lint, type check, unit tests and build on every pull request and on every push to `main`.
- [ ] The README explains what the project is, how to run it and links to this spec.

### FND-02 — Design tokens
Priority: v1
As the developer, I want colours and spacing defined once, so that both themes
stay consistent.

- [ ] Colours exist only as CSS custom properties on `:root`; no hex values inside component styles.
- [ ] Light theme: background `#F4F2EC`, text `#1A1A18`. Dark theme: background `#111110`, text `#EDEBE6`. Accent `#E2622B` in both.
- [ ] Muted text has at least 4.5:1 contrast against the background in both themes.
- [ ] Spacing and type sizes come from a small named scale (tokens), not one-off values.

### FND-03 — Fonts
Priority: v1
As a visitor, I want the type to load fast and without layout jumps.

- [ ] Fonts load through `next/font` (self-hosted, no request to Google at runtime).
- [ ] Display: Bodoni Moda, italic, weight 700, optical size 11. Only the true italic is used; no synthetic italic anywhere.
- [ ] Body: Geist. Labels and metadata: Geist Mono.
- [ ] Bodoni Moda is used only for large headings (name and case titles).
- [ ] Text stays visible while fonts load (`font-display: swap`) and the layout does not shift when they arrive.

### FND-04 — Brand mark
Priority: v1
As a visitor, I want to recognise the brand at any size.

- [ ] A `Logo` component renders the vinyl-sleeve mark as inline SVG using `currentColor`, so it follows the theme.
- [ ] Geometry matches the approved file: sleeve 80 × 80, cut-out radius 39, disc 26, groove 12, rim 2, E cuts 14 thick, 16 apart, starting at −20.
- [ ] The cut-out is a real hole (mask), so the mark works on any background.
- [ ] A variant prop renders the orange centre (`accent`) for large placements.
- [ ] The mark has an accessible name ("Enzo Castro") when used as a link, and is hidden from screen readers when decorative.
- [ ] `favicon.svg` switches colour with the system theme.

### FND-05 — Theme
Priority: v1
As a visitor, I want the site to match my system theme and let me change it.

- [ ] Given no saved choice, when the page loads, then it uses the system theme (`prefers-color-scheme`).
- [ ] Given I use the theme toggle, then the theme changes immediately and my choice is saved for the next visit.
- [ ] Given a saved choice, when I reload, then the page renders in that theme from the first paint, with no flash of the other theme.
- [ ] The toggle is a button with an accessible label that states the action ("Switch to dark theme").

### FND-06 — Languages (i18n)
Priority: v1
As a visitor, I want to read the site in English or Portuguese.

- [ ] Every page lives under a locale segment: `/en/...` and `/pt/...`. English is the default.
- [ ] Given I open `/` without a locale, when my browser prefers Portuguese, then I am redirected to `/pt`; otherwise to `/en`.
- [ ] Given an unknown locale such as `/fr`, then I see the 404 page.
- [ ] Short UI text comes from dictionaries (`messages/en.json`, `messages/pt.json`); no hard-coded copy in components.
- [ ] A unit test fails if a key exists in one dictionary but not in the other.
- [ ] Long content (cases) lives in MDX files per locale.
- [ ] The language switch keeps me on the same page in the other language.
- [ ] `<html lang>` matches the current locale.
- [ ] Implemented without an i18n library (decision: two locales, small surface, fully explainable).

### FND-07 — Layout shell
Priority: v1
As a visitor, I want the same navigation on every page.

- [ ] The header shows the mark (link to Home), the sections Work, About, Experience, Contact, the language switch and the theme toggle.
- [ ] The current section is marked visually and with `aria-current="page"`.
- [ ] Below 768 px the navigation stays usable without a hamburger menu if it fits; if a menu is needed, it opens and closes by keyboard and traps no focus.
- [ ] A "Skip to content" link is the first focusable element.
- [ ] The footer shows the full name, the year and the e-mail, GitHub and LinkedIn links.
