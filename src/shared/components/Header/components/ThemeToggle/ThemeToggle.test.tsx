// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ThemeToggle } from "@/shared/components/Header/components/ThemeToggle/ThemeToggle";
import { THEME_STORAGE_KEY } from "@/lib/theme";

function mockSystemTheme(dark: boolean) {
  // jsdom has no matchMedia, so the test provides one.
  window.matchMedia = vi.fn().mockReturnValue({
    matches: dark,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  });
}

describe("ThemeToggle", () => {
  beforeEach(() => {
    localStorage.clear();
    delete document.documentElement.dataset.theme;
    mockSystemTheme(false);
  });

  afterEach(() => {
    // Without Vitest globals, Testing Library does not clean up by itself.
    cleanup();
  });

  it("starts from the system theme", () => {
    mockSystemTheme(true);
    render(<ThemeToggle />);
    expect(
      screen.getByRole("button", { name: "Switch to light theme" }),
    ).toBeTruthy();
  });

  it("switches to dark, saves the choice and updates its label", async () => {
    render(<ThemeToggle />);

    fireEvent.click(
      screen.getByRole("button", { name: "Switch to dark theme" }),
    );

    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe("dark");
    expect(
      await screen.findByRole("button", { name: "Switch to light theme" }),
    ).toBeTruthy();
  });

  it("switches back to light on a second click", async () => {
    render(<ThemeToggle />);

    fireEvent.click(
      screen.getByRole("button", { name: "Switch to dark theme" }),
    );
    fireEvent.click(
      await screen.findByRole("button", { name: "Switch to light theme" }),
    );

    expect(document.documentElement.dataset.theme).toBe("light");
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe("light");
  });
});
