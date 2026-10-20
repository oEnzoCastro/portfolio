# 01 — Home

The page an interviewer sees first. It has ten seconds to say who Enzo is,
what he does and that he cares about quality.

---

### HOME-01 — First impression
Priority: v1
As an interviewer, I want to understand who Enzo is in ten seconds.

- [ ] Split layout: name, tagline, role line and actions on the left; the large mark (`vinyl` variant, decorative) on the right. On phones the mark sits above the name, smaller.
- [ ] Given I open the home page on a 1366 × 768 screen, then I see the mark, "Enzo Castro", the tagline and the role line without scrolling.
- [ ] The tagline reads "Building fast, without cutting corners." (pt: provided in the dictionary).
- [ ] The role line reads "Fullstack developer across web, mobile and backend."
- [ ] The name is the page's only `h1`.
- [ ] Given a 360 px wide screen, then the name fits without overflowing or breaking mid-word.

### HOME-02 — Paths forward
Priority: v1
As an interviewer, I want to go straight to what I came for.

- [ ] Two actions below the intro: "See the work" (filled, primary) and "Download CV" (outlined). Contact stays one click away in the header.
- [ ] "Download CV" downloads the PDF in the current locale's language when available, otherwise the English one.
- [ ] Each action is reachable by keyboard in reading order.

### HOME-03 — What I do
Priority: v1
As an interviewer, I want to see what Enzo offers before reading any case.

- [ ] Below the intro, three short blocks in a row: Mobile, Web, Backend. Each has a large Bodoni initial (M, W, B) in accent colour, the area name and one sentence of what he delivers.
- [ ] The section has a visually hidden `h2` ("What I do"); the initials are decorative.
- [ ] No block is longer than one line at desktop width.

### HOME-04 — Selected work
Priority: v1
As an interviewer, I want to see results at a glance, not read a list.

- [ ] Shows exactly the cases marked `featured`, at most three, in a bento grid: the first card spans two columns and two rows with a larger highlight and title; the other two stack on its right. One column on phones, all cards the same size.
- [ ] Each card has a highlight on top, then a short title, an arrow and up to three stack tags. No summary and no reading time on the card.
- [ ] The whole card is one link; on hover and keyboard focus the border and highlight background change and the arrow moves (no movement with reduced motion).
- [ ] A "See all work" link leads to the Work page.
