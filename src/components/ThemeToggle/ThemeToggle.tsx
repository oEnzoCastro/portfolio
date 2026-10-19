"use client";

import { useSyncExternalStore } from "react";
import { THEME_STORAGE_KEY } from "@/lib/theme";
import styles from "./ThemeToggle.module.css";

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

function labelFor(theme: Theme | null) {
  if (theme === null) return "Switch theme";
  return theme === "dark" ? "Switch to light theme" : "Switch to dark theme";
}

export function ThemeToggle({ className }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, getCurrentTheme, getServerTheme);

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
    <button
      type="button"
      className={[styles.toggle, className].filter(Boolean).join(" ")}
      aria-label={labelFor(theme)}
      onClick={toggle}
    >
      <span className={styles.labelLight} aria-hidden="true">
        LIGHT
      </span>
      <span className={styles.labelDark} aria-hidden="true">
        DARK
      </span>
      <span className={styles.knob} aria-hidden="true">
        <span className={styles.pointer} />
      </span>
    </button>
  );
}
