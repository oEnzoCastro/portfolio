import "server-only";
import { isLocale, type Locale } from "./config";
import type en from "./messages/en.json";
import { notFound } from "next/navigation";
import { locale as getLocale } from "next/root-params";

export type Dictionary = typeof en;

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("./messages/en.json").then((module) => module.default),
  pt: () => import("./messages/pt.json").then((module) => module.default),
};

/**
 * The locale of the current request, from the [locale] segment. Works in any
 * Server Component under src/app/[locale]/. Unknown locales become a 404.
 */
export async function getCurrentLocale(): Promise<Locale> {
  const locale = await getLocale();
  if (!isLocale(locale)) {
    notFound();
  }
  return locale;
}

export async function getDictionary(): Promise<Dictionary> {
  return dictionaries[await getCurrentLocale()]();
}
