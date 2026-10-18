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

## Roadmap

- **v1:** home, work (three case studies), about, experience, contact, light
  and dark themes, English and Portuguese.
- **v2:** end-to-end tests with Playwright, automated accessibility checks,
  recommendations, an open-source version of one of the case studies.

## License

Code: [MIT](LICENSE). Text, case studies and the brand mark: © Enzo Castro,
all rights reserved.
