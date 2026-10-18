# 06 — Quality

The site is the main project in the portfolio. Interviewers will open
DevTools, resize the window and run Lighthouse.

---

### QA-01 — Accessibility
Priority: v1
- [ ] Every page has no violations in an axe check (v1: run by hand with the axe DevTools extension, noted in the PR; v2: automated in the e2e suite).
- [ ] Headings follow order (one `h1`, no skipped levels).
- [ ] Every interactive element is reachable and usable by keyboard, with a visible focus style in both themes.
- [ ] `prefers-reduced-motion` turns off every non-essential animation.

### QA-02 — Performance
Priority: v1
- [ ] Lighthouse on mobile scores at least 95 for Performance, Accessibility, Best Practices and SEO on Home and one case page.
- [ ] Pages are statically generated at build time.
- [ ] No layout shift from fonts or images (CLS below 0.05).

### QA-03 — SEO and sharing
Priority: v1
- [ ] Each page has its own title and description, per locale.
- [ ] `hreflang` links connect the en and pt versions of each page.
- [ ] A sitemap and robots file exist.
- [ ] Sharing a link shows a preview image with the mark and the name (Open Graph).

### QA-04 — End-to-end flows
Priority: later (v2)

Until then, these flows are checked by hand before each release.

- [ ] Switching language keeps the current page.
- [ ] Switching theme persists across reload without a flash.
- [ ] Opening a case from Home shows the case; with reduced motion on, no animation runs.
- [ ] The CV link returns a PDF.

### QA-05 — Deploy
Priority: v1
- [ ] Every pull request gets a Vercel preview URL.
- [ ] `main` deploys to production on enzocastro.dev with HTTPS.
- [ ] The domain without a locale and the `www` subdomain both reach the site.
- [ ] A custom 404 page exists in both locales.
