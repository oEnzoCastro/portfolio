# enzocastro.dev

Personal portfolio of **Enzo Castro**, fullstack developer across web, mobile
and backend.

> Building fast, without cutting corners.

The site is designed like a record: projects are tracks, the brand mark is a
vinyl sleeve, and opening a case slides the disc out of its sleeve. The
metaphor stays in the details; the information never hides behind it.

**Status:** v1 in progress, target launch 30 Nov 2026.

## How this project is built

This repository follows the same workflow I use at work:

1. **Spec first.** Every feature starts as a spec with acceptance criteria in
   [`docs/specs`](docs/specs/README.md). The spec is the backlog.
2. **Tests from the criteria.** Unit tests are written from the acceptance
   criteria before the implementation (red, green, refactor).
3. **Gates before review.** A pre-commit hook lints staged files and type
   checks the project; a pre-push hook runs the tests.
4. **CI as the last gate.** Every pull request and every push to `main` runs
   lint, type check, tests and build.

Commits and pull requests reference the spec item they implement, for example
`FND-06`.

## Tech stack

| Area | Choice | Why |
| --- | --- | --- |
| Framework | Next.js (App Router), TypeScript strict | Static pages, fast by default |
| Styling | CSS Modules + CSS custom properties | Plain, readable CSS; tokens defined once |
| Languages | English and Portuguese, built without an i18n library | Two locales, small surface, fully explainable |
| Content | MDX for case studies | Long text lives outside the code |
| Tests | Vitest | Fast unit tests next to the code |
| Quality | ESLint, Husky, lint-staged, GitHub Actions | Problems caught before they reach `main` |
| Hosting | Vercel | Preview URL for every pull request |

## Getting started

Requirements: Node.js 24 and npm.

```bash
npm ci          # install exactly what the lockfile says
npm run dev     # start the dev server on http://localhost:3000
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript, no output |
| `npm test` | Unit tests, single run |
| `npm run test:watch` | Unit tests in watch mode |

Git hooks are installed automatically by `npm ci` / `npm install`.

## Project structure

```
docs/specs/     the v1 spec, one file per area
src/app/        routes (one segment per locale)
src/lib/        shared logic and its tests
public/         static files
.github/        CI workflow
.husky/         git hooks
```

The structure grows with the spec; folders appear when the first feature needs
them.

## Conventions

- **Components own their styles.** Each component lives in its own folder
  with its CSS Module (`src/components/Hero/Hero.tsx` + `Hero.module.css`).
  Pages compose named components (`<Hero>`, `<Header>`) instead of passing
  class names to raw elements.
- **Name what it is, not how it is placed.** A component exists when it is a
  real piece of the interface. Layout-only wrappers (`<Box>`, `<Flex>`) stay
  as CSS.
- **An optional `className` on every component**, so the caller can adjust
  position or spacing without changing the component.
- **Tokens only.** Colours, spacing and type sizes come from
  `src/styles/tokens.css`; a test fails on hex colours in CSS Modules.
- **No CSS-in-JS.** Styles are static CSS Modules, so components can stay
  server components and ship no JavaScript.

## Roadmap

- **v1:** home, work (three case studies), about, experience, contact, light
  and dark themes, English and Portuguese.
- **v2:** end-to-end tests with Playwright, automated accessibility checks,
  recommendations, an open-source version of one of the case studies.

## License

Code: [MIT](LICENSE). Text, case studies and the brand mark: © Enzo Castro,
all rights reserved.
