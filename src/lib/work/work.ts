import { WORK } from "@/content/work";
import type { Locale } from "@/i18n/config";
import type { WorkMeta, WorkSection } from "./meta";

/** Drafts show while developing and are left out of production builds. */
const showDrafts = process.env.NODE_ENV !== "production";

export type WorkEntry = {
  meta: WorkMeta;
  /** The locale actually shown. */
  locale: Locale;
  /** True when the page's locale has no translation yet and English is shown. */
  isFallback: boolean;
};

export type WorkPage = WorkEntry & {
  /** The case study text, one entry per h2. */
  sections: WorkSection[];
};

/** One piece of work in a locale, falling back to English. */
export function getWork(locale: Locale, slug: string): WorkPage | null {
  const translations = Object.hasOwn(WORK, slug) ? WORK[slug] : undefined;
  if (!translations) return null;

  const content = translations[locale] ?? translations.en;
  if (content.meta.draft && !showDrafts) return null;

  const shown: Locale = translations[locale] ? locale : "en";
  return { ...content, locale: shown, isFallback: shown !== locale };
}

/** All published work for a locale, ordered by `order`. */
export function getAllWork(locale: Locale): WorkEntry[] {
  return Object.keys(WORK)
    .map((slug) => getWork(locale, slug))
    .filter((work) => work !== null)
    .map(({ meta, locale: shown, isFallback }) => ({
      meta,
      locale: shown,
      isFallback,
    }))
    .sort((a, b) => a.meta.order - b.meta.order);
}

/** The work marked `featured`, at most three, for the Home page. */
export function getFeaturedWork(locale: Locale): WorkEntry[] {
  return getAllWork(locale)
    .filter((work) => work.meta.featured)
    .slice(0, 3);
}
