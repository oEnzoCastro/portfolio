// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  LanguageSwitch,
  localeFromPath,
  swapLocale,
} from "@/shared/components/Header/components/LanguageSwitch/LanguageSwitch";

const route = vi.hoisted(() => ({ pathname: "/en" }));

vi.mock("next/navigation", () => ({
  usePathname: () => route.pathname,
  useRouter: () => ({ push: vi.fn() }),
}));

describe("localeFromPath", () => {
  it("reads the first segment, defaulting to English", () => {
    expect(localeFromPath("/pt/work")).toBe("pt");
    expect(localeFromPath("/en/work")).toBe("en");
    expect(localeFromPath("/")).toBe("en");
  });
});

describe("swapLocale", () => {
  it("keeps the rest of the path", () => {
    expect(swapLocale("/en/work/ai-workflow", "pt")).toBe("/pt/work/ai-workflow");
    expect(swapLocale("/pt", "en")).toBe("/en");
  });

  it("adds a locale when the path has none", () => {
    expect(swapLocale("/", "pt")).toBe("/pt");
  });
});

describe("LanguageSwitch", () => {
  afterEach(() => {
    cleanup();
  });

  it("on an English page, links to the Portuguese one, labelled in Portuguese", () => {
    route.pathname = "/en/about";
    render(<LanguageSwitch />);

    const link = screen.getByRole("link", { name: "Mudar para português" });
    expect(link.getAttribute("href")).toBe("/pt/about");
    expect(link.getAttribute("lang")).toBe("pt");
  });

  it("on a Portuguese page, links back to English", () => {
    route.pathname = "/pt/about";
    render(<LanguageSwitch />);

    const link = screen.getByRole("link", { name: "Switch to English" });
    expect(link.getAttribute("href")).toBe("/en/about");
  });
});
