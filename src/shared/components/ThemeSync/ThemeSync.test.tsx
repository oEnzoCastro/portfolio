// @vitest-environment jsdom
import { cleanup, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { ThemeSync } from "@/shared/components/ThemeSync/ThemeSync";
import { THEME_STORAGE_KEY } from "@/lib/theme";

describe("ThemeSync", () => {
  beforeEach(() => {
    localStorage.clear();
    delete document.documentElement.dataset.theme;
  });

  afterEach(() => {
    cleanup();
  });

  it("puts the saved theme back on <html> when it mounts", () => {
    localStorage.setItem(THEME_STORAGE_KEY, "light");
    render(<ThemeSync />);
    expect(document.documentElement.dataset.theme).toBe("light");
  });

  it("leaves the system theme in charge when nothing is saved", () => {
    render(<ThemeSync />);
    expect(document.documentElement.dataset.theme).toBeUndefined();
  });
});
