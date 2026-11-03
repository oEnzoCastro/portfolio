import "server-only";
import { access, readdir } from "node:fs/promises";
import path from "node:path";
import type { ComponentType } from "react";
import { DEFAULT_LOCALE, type Locale } from "@/i18n/config";
import { parseWorkMeta, type WorkMeta } from "./meta";

/**
 * Pieces of work live in src/content/work/<slug>/<locale>.tsx (WORK-02):
 * each file exports `meta` (checked with `satisfies WorkMeta`) and a default
 * component with the case study text. Adding a piece of work is adding a
 * folder with an en.tsx (and a pt.tsx when the translation is ready).
 */
const CONTENT_DIR = path.join("src", "content", "work");
const WORK_DIR = path.join(process.cwd(), CONTENT_DIR);

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
  /** The case study text, ready to render. */
  Content: ComponentType;
};

type WorkModule = { default: ComponentType; meta?: unknown };

const fileOf = (slug: string, locale: Locale) =>
  path.join(CONTENT_DIR, slug, `${locale}.tsx`);

async function exists(file: string): Promise<boolean> {
  try {
    await access(path.join(process.cwd(), file));
    return true;
  } catch {
    return false;
  }
}

/** The locale to show: the requested one, or English when not translated. */
async function resolveLocale(
  slug: string,
  locale: Locale,
): Promise<Locale | null> {
  if (await exists(fileOf(slug, locale))) return locale;
  if (await exists(fileOf(slug, DEFAULT_LOCALE))) return DEFAULT_LOCALE;
  return null;
}

async function load(slug: string, locale: Locale) {
  const workModule = (await import(
    `@/content/work/${slug}/${locale}`
  )) as WorkModule;
  const meta = parseWorkMeta(workModule.meta, fileOf(slug, locale), slug);
  return { meta, Content: workModule.default };
}

/** Every folder in src/content/work. */
export async function getWorkSlugs(): Promise<string[]> {
  "use cache";
  const entries = await readdir(WORK_DIR, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
}

/** All published work for a locale, ordered by `order`. */
export async function getAllWork(locale: Locale): Promise<WorkEntry[]> {
  "use cache";
  const all: WorkEntry[] = [];

  for (const slug of await getWorkSlugs()) {
    const shown = await resolveLocale(slug, locale);
    if (shown === null) continue;

    const { meta } = await load(slug, shown);
    if (meta.draft && !showDrafts) continue;

    all.push({ meta, locale: shown, isFallback: shown !== locale });
  }

  return all.sort((a, b) => a.meta.order - b.meta.order);
}

/** The work marked `featured`, at most three, for the Home page. */
export async function getFeaturedWork(locale: Locale): Promise<WorkEntry[]> {
  const all = await getAllWork(locale);
  return all.filter((entry) => entry.meta.featured).slice(0, 3);
}

/** One piece of work with its body, or null when it does not exist. */
export async function getWork(
  locale: Locale,
  slug: string,
): Promise<WorkPage | null> {
  // Only known folders: the slug comes from the URL.
  if (!(await getWorkSlugs()).includes(slug)) return null;

  const shown = await resolveLocale(slug, locale);
  if (shown === null) return null;

  const { meta, Content } = await load(slug, shown);
  if (meta.draft && !showDrafts) return null;

  return { meta, Content, locale: shown, isFallback: shown !== locale };
}
