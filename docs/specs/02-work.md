# 02 — Work

The cases are the proof. Each one is a "track": a short, scannable story with
a problem, what was done, the hard part, the result and what would change.

---

### WORK-01 — Work index
Priority: v1
As an interviewer, I want to see every case in one place.

- [ ] `/[locale]/work` lists all published cases, ordered by track number.
- [ ] Each item shows track label, title, a one-line summary and the stack tags.
- [ ] A case marked as draft does not appear in production.

### WORK-02 — Case content model
Priority: v1
As the author, I want to write cases as text, not code.

- [ ] Each case is one MDX file per locale with front matter: `slug`, `track`, `title`, `summary`, `stack`, `role`, `period`, `draft`.
- [ ] Given a case file is missing a required field, then the build fails with a message naming the file and the field.
- [ ] Given a case exists in English but not in Portuguese, then the Portuguese page shows the English version with a short note that a translation is coming.

### WORK-03 — Case page
Priority: v1
As an interviewer, I want each case to be easy to scan and to read in full.

- [ ] `/[locale]/work/[slug]` renders the case with the title as `h1` and the sections as `h2`.
- [ ] A summary block at the top shows role, period, stack and the result in one line.
- [ ] Each case has a waveform graphic generated from its title, so the same title always gives the same shape.
- [ ] Links to the previous and next track sit at the end of the page.
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

### WORK-05 — Track 01: AI development workflow
Priority: v1
- [ ] Case published in English and Portuguese, from the approved draft in the project brief.
- [ ] The result section includes measured numbers once available; until then it states the ~60% instruction reduction only.

### WORK-06 — Track 02: Deep-link scrolling in React Native
Priority: v1
- [ ] Case published in English and Portuguese, from the approved draft in the project brief.
- [ ] States clearly that the generic approach was a team decision and the implementation was Enzo's.

### WORK-07 — Track 03: Making of this site
Priority: v1
- [ ] Covers the brand process (from play button to vinyl sleeve), the type decisions (true italic only) and the main technical decisions (i18n without a library, theme without flash, reduced motion).
- [ ] Shows the mark's construction: the sleeve, the E cuts and the disc.

### WORK-08 — Open-source scroll library
Priority: later
- [ ] The Track 02 solution rebuilt from scratch as a public package with an Expo demo, linked from the case.
