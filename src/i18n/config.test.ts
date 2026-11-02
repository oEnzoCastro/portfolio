import { describe, expect, it } from "vitest";
import { localeFromPath, preferredLocale, swapLocale } from "@/i18n/config";

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

describe("preferredLocale", () => {
  it.each([
    ["pt-BR,pt;q=0.9,en;q=0.8", "pt"],
    ["pt-BR,en-US;q=0.9,en;q=0.8", "pt"],
    ["pt;q=0.5,en;q=0.9", "en"],
    ["fr-FR,pt;q=0.9,en;q=0.8", "pt"],
    ["fr-FR,de;q=0.8", "en"],
    ["PT-BR", "pt"],
    ["pt; q=0.4,en; q=0.9", "en"],
    ["", "en"],
  ])("%j → %s", (header, expected) => {
    expect(preferredLocale(header)).toBe(expected);
  });

  it("falls back to English without the header", () => {
    expect(preferredLocale(null)).toBe("en");
  });
});
