// @vitest-environment jsdom
/**
 * FND-05: the inline script in <head> applies a saved theme before the first
 * paint. It runs as plain text in the browser, so the test runs it the same
 * way: as a string, not as an imported function.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { THEME_STORAGE_KEY, themeScript } from "@/lib/theme";

const runScript = () => new Function(themeScript)();
const root = () => document.documentElement;

describe("theme script", () => {
  beforeEach(() => {
    localStorage.clear();
    delete root().dataset.theme;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it.each(["light", "dark"])("applies a saved %s theme", (theme) => {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
    runScript();
    expect(root().dataset.theme).toBe(theme);
  });

  it("leaves the system theme in charge when nothing is saved", () => {
    runScript();
    expect(root().dataset.theme).toBeUndefined();
  });

  it("ignores an unknown saved value", () => {
    localStorage.setItem(THEME_STORAGE_KEY, "purple");
    runScript();
    expect(root().dataset.theme).toBeUndefined();
  });

  it("does not throw when storage is blocked", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("SecurityError");
    });
    expect(runScript).not.toThrow();
    expect(root().dataset.theme).toBeUndefined();
  });

  it("does not leak variables into the global scope", () => {
    localStorage.setItem(THEME_STORAGE_KEY, "dark");
    runScript();
    expect("theme" in window).toBe(false);
  });
});
