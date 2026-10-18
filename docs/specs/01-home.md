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

### HOME-03 — Featured tracks
Priority: v1
As an interviewer, I want a preview of the work without leaving the page.

- [ ] The home page lists the published cases in order (Track 01, 02, 03).
- [ ] Each item shows the real title large and the label `TRACK 0N · N MIN READ` small.
- [ ] The reading time is calculated from the case text, not typed by hand.
- [ ] Each item links to its case page.
