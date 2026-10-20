"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, type MouseEvent } from "react";
import { TapeCounter } from "@/shared/components/TapeCounter/TapeCounter";
import { Root } from "./styles/LanguageSwitch.styled";

const LOCALES = ["en", "pt"] as const;
type Locale = (typeof LOCALES)[number];

const SWITCH_LABEL: Record<Locale, string> = {
  en: "Switch to English",
  pt: "Mudar para português",
};

const ROLL_MS = 1300;

export function localeFromPath(pathname: string): Locale {
  return pathname.split("/")[1] === "pt" ? "pt" : "en";
}

export function swapLocale(pathname: string, target: Locale): string {
  const segments = pathname.split("/").filter(Boolean);
  if ((LOCALES as readonly string[]).includes(segments[0])) {
    segments.shift();
  }
  return "/" + [target, ...segments].join("/");
}

export function LanguageSwitch() {
  const pathname = usePathname();
  const router = useRouter();
  const current = localeFromPath(pathname);
  const target: Locale = current === "en" ? "pt" : "en";
  const href = swapLocale(pathname, target);

  const [rolling, setRolling] = useState<{ from: Locale; to: Locale } | null>(
    null,
  );
  const shown = rolling?.from === current ? rolling.to : current;

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    const newTab =
      event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (newTab || event.button !== 0 || reducedMotion) {
      return;
    }
    event.preventDefault();
    setRolling({ from: current, to: target });
    window.setTimeout(() => router.push(href), ROLL_MS);
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
