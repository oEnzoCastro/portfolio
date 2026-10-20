# 01 — Home

The page an interviewer sees first. It has ten seconds to say who Enzo is,
what he does and that he cares about quality.

---

### HOME-01 — First impression
Priority: v1
As an interviewer, I want to understand who Enzo is in ten seconds.

- [ ] Given I open the home page on a 1366 × 768 screen, then I see the mark, "Enzo Castro", the tagline and the role line without scrolling.
- [ ] The tagline reads "Building fast, without cutting corners." (pt: provided in the dictionary).
- [ ] The role line reads "Fullstack developer across web, mobile and backend."
- [ ] The name is the page's only `h1`.
- [ ] Given a 360 px wide screen, then the name fits without overflowing or breaking mid-word.

### HOME-02 — Paths forward
Priority: v1
As an interviewer, I want to go straight to what I came for.

- [ ] Three clear actions are visible below the intro: see the work, download the CV, get in touch.
- [ ] "Download CV" downloads the PDF in the current locale's language when available, otherwise the English one.
- [ ] Each action is reachable by keyboard in reading order.

### HOME-03 — What I do
Priority: v1
As an interviewer, I want to see what Enzo offers before reading any case.

- [ ] Below the intro, three short blocks: Mobile, Web, Backend, each with one sentence of what he delivers.
- [ ] No block is longer than one line at desktop width.

### HOME-04 — Selected work
Priority: v1
As an interviewer, I want to see results at a glance, not read a list.

- [ ] Shows exactly the cases marked `featured`, at most three, as cards in a grid (one column on phones).
- [ ] Each card has a highlight on top, then a short title, an arrow and up to three stack tags. No summary and no reading time on the card.
- [ ] The whole card is one link; on hover and keyboard focus the border and highlight background change and the arrow moves (no movement with reduced motion).
- [ ] A "See all work" link leads to the Work page.
