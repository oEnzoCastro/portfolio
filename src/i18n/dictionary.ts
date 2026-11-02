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

export async function getDictionary(): Promise<Dictionary> {
  const locale = await getLocale();

  if (!isLocale(locale)) {
    return notFound();
  }

  return dictionaries[locale]();
}
