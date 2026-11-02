"use client";

import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";
import { isLocale, localeFromPath, swapLocale, type Locale } from "@/i18n/config";
import { TapeCounter } from "@/shared/components/TapeCounter/TapeCounter";
import { Root } from "./styles/LanguageSwitch.styled";

const SWITCH_LABEL: Record<Locale, string> = {
  en: "Switch to English",
  pt: "Mudar para português",
};

/**
 * Where the counter rolls from on the next page. Each locale has its own root
 * layout, so the switch on the new page is a different component: the old
 * page leaves a note in sessionStorage, the new one reads it and rolls.
 */
const ROLL_FROM_KEY = "language-switch:from";

function readRollFrom(): Locale | null {
  try {
    const saved = sessionStorage.getItem(ROLL_FROM_KEY);
    return saved !== null && isLocale(saved) ? saved : null;
  } catch {
    return null; // Storage blocked: just no animation.
  }
}

/**
 * The note is used once, and cleared only after the roll has finished: a
 * reload or a later visit does not roll again. (Clearing it right after
 * mount would cut the roll short in development, where Strict Mode remounts
 * components and the switch would read the note as already gone.)
 */
function clearRollFrom() {
  try {
    sessionStorage.removeItem(ROLL_FROM_KEY);
  } catch {
    // Storage blocked: nothing to clean.
  }
}

/** Nothing to listen to: the note is read when the switch renders. */
const subscribe = () => () => {};

/**
 * Links to the same page in the other locale. The page changes at once
 * (client-side, keeping the scroll position) and the counter on the new page
 * rolls from the old locale to the new one.
 */
export function LanguageSwitch() {
  const pathname = usePathname();
  const current = localeFromPath(pathname);
  const target: Locale = current === "en" ? "pt" : "en";
  const href = swapLocale(pathname, target);

  // null on the server and while hydrating, so the HTML always matches.
  const rollFrom = useSyncExternalStore(subscribe, readRollFrom, () => null);
  const rollsIn = rollFrom !== null && rollFrom !== current;

  function handleClick() {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion) return;
    try {
      sessionStorage.setItem(ROLL_FROM_KEY, current);
    } catch {
      // Storage blocked: the switch still works, without the roll.
    }
  }

  return (
    <Root
      href={href}
      hrefLang={target}
      lang={target}
      aria-label={SWITCH_LABEL[target]}
      scroll={false}
      onClick={handleClick}
    >
      <TapeCounter
        key={rollsIn ? `from-${rollFrom}` : "still"}
        value={current.toUpperCase()}
        from={rollsIn ? rollFrom.toUpperCase() : undefined}
        onSettled={rollsIn ? clearRollFrom : undefined}
      />
    </Root>
  );
}
