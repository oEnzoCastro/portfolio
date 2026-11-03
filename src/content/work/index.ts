import type { Locale } from "@/i18n/config";
import { parseWorkContent } from "@/lib/work/content";
import type { WorkContent } from "@/lib/work/meta";
import aiWorkflowEn from "./ai-workflow/en.json";
import aiWorkflowPt from "./ai-workflow/pt.json";
import deepLinkScrollEn from "./deep-link-scroll/en.json";
import deepLinkScrollPt from "./deep-link-scroll/pt.json";
import makingOfThisSiteEn from "./making-of-this-site/en.json";

/** English is required; other locales are added when translated. */
export type WorkTranslations = { en: WorkContent } & Partial<
  Record<Locale, WorkContent>
>;

const load = (raw: unknown, slug: string, locale: Locale) =>
  parseWorkContent(raw, `src/content/work/${slug}/${locale}.json`, slug);

/**
 * Every piece of work, by slug (WORK-02). To add one: create
 * src/content/work/<slug>/en.json (and pt.json), then add it here.
 * Each file is checked as it loads, so a mistake fails the build.
 */
export const WORK: Record<string, WorkTranslations> = {
  "ai-workflow": {
    en: load(aiWorkflowEn, "ai-workflow", "en"),
    pt: load(aiWorkflowPt, "ai-workflow", "pt"),
  },
  "deep-link-scroll": {
    en: load(deepLinkScrollEn, "deep-link-scroll", "en"),
    pt: load(deepLinkScrollPt, "deep-link-scroll", "pt"),
  },
  "making-of-this-site": {
    en: load(makingOfThisSiteEn, "making-of-this-site", "en"),
  },
};
