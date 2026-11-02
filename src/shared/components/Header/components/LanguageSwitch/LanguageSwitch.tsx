"use client";

import { usePathname } from "next/navigation";
import { useState, type MouseEvent } from "react";
import { localeFromPath, swapLocale, type Locale } from "@/i18n/config";
import { TapeCounter } from "@/shared/components/TapeCounter/TapeCounter";
import { Root } from "./styles/LanguageSwitch.styled";

/** Accessible name, written in the language you are switching to. */
const SWITCH_LABEL: Record<Locale, string> = {
  en: "Switch to English",
  pt: "Mudar para português",
};

const ROLL_MS = 1300;

/**
 * Switching locale swaps the root layout (src/app/[locale]/layout.tsx), and
 * a client-side navigation would remount <html>: React removes attributes it
 * does not own, such as data-theme, and the theme script does not run again.
 * So the switch is a full page load: a plain link, or location.assign after
 * the counter has rolled.
 */
export function LanguageSwitch() {
  const pathname = usePathname();
  const current = localeFromPath(pathname);
  const target: Locale = current === "en" ? "pt" : "en";
  const href = swapLocale(pathname, target);

  const [rolling, setRolling] = useState(false);
  const shown = rolling ? target : current;

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    const newTab =
      event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (newTab || event.button !== 0 || reducedMotion || rolling) {
      return; // Plain link behaviour.
    }
    event.preventDefault();
    setRolling(true);
    window.setTimeout(() => window.location.assign(href), ROLL_MS);
  }

  return (
    <Root
      href={href}
      hrefLang={target}
      lang={target}
      aria-label={SWITCH_LABEL[target]}
      onClick={handleClick}
    >
      <TapeCounter value={shown.toUpperCase()} />
    </Root>
  );
}
