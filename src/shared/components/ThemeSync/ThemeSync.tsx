"use client";

import { useLayoutEffect } from "react";
import { THEME_STORAGE_KEY, applySavedTheme } from "@/lib/theme";

/**
 * Re-applies the saved theme whenever the root layout mounts.
 *
 * Switching locale swaps the root layout (src/app/[locale]/layout.tsx), and
 * React removes attributes it does not own from <html>, such as data-theme.
 * The inline theme script only runs on a full page load, so this puts the
 * theme back. useLayoutEffect runs before the browser paints: no flash.
 */
export function ThemeSync() {
  useLayoutEffect(() => {
    applySavedTheme(THEME_STORAGE_KEY);
  }, []);

  return null;
}
