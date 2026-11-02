"use client";

import { useSyncExternalStore } from "react";
import { THEME_STORAGE_KEY } from "@/lib/theme";
import type { Dictionary } from "@/i18n/dictionary";
import {
  Knob,
  LabelDark,
  LabelLight,
  Pointer,
  Root,
} from "./styles/ThemeToggle.styled";

type Theme = "light" | "dark";

const DARK_QUERY = "(prefers-color-scheme: dark)";

function getCurrentTheme(): Theme {
  const saved = document.documentElement.dataset.theme;
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia(DARK_QUERY).matches ? "dark" : "light";
}

/**
 * The theme lives outside React: in the data-theme attribute and in the
 * system preference. React subscribes to both and re-renders when either
 * changes, including a system theme change while the page is open.
 */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });

  const media = window.matchMedia(DARK_QUERY);
  media.addEventListener("change", onChange);

  return () => {
    observer.disconnect();
    media.removeEventListener("change", onChange);
  };
}

/** On the server the theme is unknown: there is no document or storage. */
const getServerTheme = () => null;

type ThemeLabels = Dictionary["theme"];

function labelFor(theme: Theme | null, labels: ThemeLabels) {
  if (theme === null) return labels.toggle;
  return theme === "dark" ? labels.toLight : labels.toDark;
}

type ThemeToggleProps = {
  labels: ThemeLabels;
  className?: string;
};

export function ThemeToggle({ labels, className }: ThemeToggleProps) {
  const theme = useSyncExternalStore(
    subscribe,
    getCurrentTheme,
    getServerTheme,
  );

  function toggle() {
    const next: Theme = getCurrentTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage can be blocked (private mode); the theme still applies.
    }
  }

  return (
    <Root
      type="button"
      className={className}
      aria-label={labelFor(theme, labels)}
      onClick={toggle}
    >
      <LabelLight aria-hidden="true">{labels.light.toUpperCase()}</LabelLight>
      <LabelDark aria-hidden="true">{labels.dark.toUpperCase()}</LabelDark>
      <Knob aria-hidden="true">
        <Pointer />
      </Knob>
    </Root>
  );
}
