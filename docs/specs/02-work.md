# 02 — Work

The cases are the proof. Each one is a short, scannable story with
a problem, what was done, the hard part, the result and what would change.

---

### WORK-01 — Work page
Priority: v1
As an interviewer, I want to see every piece of work in one place and narrow it to what matters for my role.

- [ ] `/[locale]/work` shows every published item as the same card used on the Home page, in a grid, ordered by `order`.
- [ ] Filter buttons: All, Mobile, Web, Backend, AI. The selected one is marked visually and with `aria-pressed="true"`; the number of items shown is announced (`role="status"`).
- [ ] The filter lives in the URL (`/work?area=mobile`), so a filtered link can be shared and the back button works.
- [ ] Filtering happens in the browser over the statically generated list; no pagination.
- [ ] Until there are more than three items, the filter row may be hidden.

### WORK-02 — Content model
Priority: v1
As the author, I want to add a piece of work by adding one file.

- [ ] Each item is one MDX file per locale with front matter: `slug`, `order`, `title`, `areas` (mobile | web | backend | ai), `stack` (max 3 shown on cards), `featured`, `highlight`, `role`, `period`, `draft`.
- [ ] `highlight` is either `{ type: "metric", value, caption }`, rendered as text (translatable, accessible, follows the theme), or `{ type: "image", src, alt }`.
- [ ] Highlight images are SVG drawn with `currentColor`, so one file works in both themes; raster images only for real screenshots. Fixed 16:10 box, so nothing shifts while loading.
- [ ] Given a file is missing a required field, then the build fails with a message naming the file and the field.
- [ ] Given an item exists in English but not in Portuguese, then the Portuguese page shows the English version with a short note that a translation is coming.

### WORK-03 — Case page
Priority: v1
As an interviewer, I want each case to be easy to scan and to read in full.

- [ ] `/[locale]/work/[slug]` renders the case with the title as `h1` and the sections as `h2`.
- [ ] A summary block at the top shows role, period, stack and the result in one line.
- [ ] Links back to all work and to the next case study sit at the end of the page.
- [ ] Given a slug that does not exist, then the 404 page is shown.

### WORK-04 — Disc animation
Priority: v1
As a visitor, I want opening a case to feel like pulling a record from its sleeve.

- [ ] Given I open a case from the home page or the work index, then the disc slides out of the sleeve as the case page appears.
- [ ] The animation lasts between 300 and 400 ms.
- [ ] The case content is not delayed by the animation: it is in the page from the first render.
- [ ] Given my system has "reduce motion" on, then there is no slide; the page simply appears.
- [ ] The animation runs only on transform and opacity (no layout properties), so it stays smooth on a mid-range phone.
- [ ] Navigating back and forward still works and keeps the scroll position.

### WORK-05 — Case 01: AI development workflow
Priority: v1
- [ ] Case published in English and Portuguese, from the approved draft in the project brief.
- [ ] The result section includes measured numbers once available; until then it states the ~60% instruction reduction only.

### WORK-06 — Case 02: Deep-link scrolling in React Native
Priority: v1
- [ ] Case published in English and Portuguese, from the approved draft in the project brief.
- [ ] States clearly that the generic approach was a team decision and the implementation was Enzo's.

### WORK-07 — Case 03: Making of this site
Priority: v1
- [ ] Covers the brand process (from play button to vinyl sleeve), the type decisions (true italic only) and the main technical decisions (i18n without a library, theme without flash, reduced motion).
- [ ] Shows the mark's construction: the sleeve, the E cuts and the disc.

### WORK-08 — Open-source scroll library
Priority: later
- [ ] The case 02 solution rebuilt from scratch as a public package with an Expo demo, linked from the case.

### WORK-09 — Large lists
Priority: later
- [ ] From about 20 items: case studies keep cards, smaller projects become a compact list (title, area, year, links), so not every item needs an image.
