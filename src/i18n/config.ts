export const LOCALES = ["en", "pt"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export function isLocale(locale: string): locale is Locale {
  return LOCALES.includes(locale as Locale);
}

export function localeFromPath(pathname: string): Locale {
  const segments = pathname.split("/").filter(Boolean);

  return isLocale(segments[0]) ? segments[0] : DEFAULT_LOCALE;
}

export function swapLocale(pathname: string, target: Locale): string {
  const segments = pathname.split("/").filter(Boolean);
  if (isLocale(segments[0])) {
    segments.shift();
  }
  return "/" + [target, ...segments].join("/");
}

export function preferredLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) {
    return DEFAULT_LOCALE;
  }

  const languages = acceptLanguage
    .split(",")
    .sort((a, b) => {
      const qA = parseFloat(a.split("q=")[1] || "1");
      const qB = parseFloat(b.split("q=")[1] || "1");
      return qB - qA;
    })
    .map((lang) => lang.split(";")[0].trim());

  for (const lang of languages) {
    const baseLang = lang.split("-")[0].toLowerCase();

    if (isLocale(baseLang)) {
      return baseLang;
    }
  }

  return DEFAULT_LOCALE;
}
