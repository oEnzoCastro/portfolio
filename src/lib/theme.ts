export const THEME_STORAGE_KEY = "theme";

/**
 * Puts the saved theme (if any) on <html> as data-theme. Without it, CSS
 * follows the system theme.
 *
 * Self-contained on purpose (only its parameter and browser globals), because
 * it also runs as the inline script below, outside any bundle.
 */
export function applySavedTheme(storageKey: string) {
  try {
    const theme = localStorage.getItem(storageKey);
    if (theme === "light" || theme === "dark") {
      document.documentElement.dataset.theme = theme;
    }
  } catch {
    // Storage can be blocked (private mode); the system theme still applies.
  }
}

export const themeScript = `(${applySavedTheme.toString()})(${JSON.stringify(
  THEME_STORAGE_KEY,
)});`;
