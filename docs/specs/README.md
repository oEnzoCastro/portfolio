# v1 spec

This folder is the backlog for the first public version of enzocastro.dev.
Every feature starts here as a spec with acceptance criteria. Tests are written
from the criteria before the implementation (red, green, refactor).

**Target:** v1 live by 30 Nov 2026.

## Files

| File | Area |
| --- | --- |
| [00-foundation.md](00-foundation.md) | Setup, design tokens, fonts, brand, theme, i18n |
| [01-home.md](01-home.md) | Home page |
| [02-work.md](02-work.md) | Case list, case pages, disc animation |
| [03-about.md](03-about.md) | About page |
| [04-experience.md](04-experience.md) | Experience page and CV download |
| [05-contact.md](05-contact.md) | Contact page |
| [06-quality.md](06-quality.md) | Accessibility, performance, SEO, tests, deploy |

## Format

Each item has an ID, a priority, a short story and acceptance criteria.

```
### AREA-00 — Title
Priority: v1 | later
As <who>, I want <what>, so that <why>.

- [ ] Given <context>, when <action>, then <result>.
```

- **v1** must ship by the target date. **later** is parked, not forgotten.
- A criterion is done when a test covers it, or, when a test is not practical,
  when it is checked by hand and the check is noted in the PR.
- Criteria describe behaviour, not implementation. How to build it is decided
  in the PR.

## Definition of done (every item)

- [ ] All acceptance criteria pass.
- [ ] Works in both themes (light and dark) and both locales (en and pt).
- [ ] Works from 360 px wide to large desktop, with no horizontal scroll.
- [ ] Usable with keyboard only, with visible focus.
- [ ] No console errors or warnings.
- [ ] Type check, lint, unit tests and build pass in CI.

## Ground rules for content

- The album metaphor never hides information. Real titles are large; metaphor
  labels (`TRACK 01 · 6 MIN READ`) are small.
- Client names stay anonymous ("a major US resort", "a US restaurant chain")
  until cleared.
- No mention of relocation, exchange programme or job search until
  January 2027.
