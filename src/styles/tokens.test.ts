/**
 * Tokens for the text colours must reach WCAG AA (4.5:1) against the background,
 * in both themes. The test reads the real tokens.css, so changing a colour
 * there is enough to make it fail.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, it, expect } from "vitest";
import { contrastRatio, WCAG_AA_TEXT } from "@/lib/contrast";

const css = readFileSync(
  fileURLToPath(new URL("./tokens.css", import.meta.url)),
  "utf8",
);

type Theme = "light" | "dark";

/** Every `--color-x: light-dark(#a, #b)` in the file, as { x: { light, dark } }. */
function readThemeColours(source: string) {
  const pattern =
    /--color-([\w-]+):\s*light-dark\(\s*(#[0-9a-f]{3,6})\s*,\s*(#[0-9a-f]{3,6})\s*\)/gi;
  const colours: Record<string, Record<Theme, string>> = {};

  for (const [, name, light, dark] of source.matchAll(pattern)) {
    colours[name] = { light, dark };
  }
  return colours;
}

const colours = readThemeColours(css);

/** Text roles that must be readable on the page background. */
const TEXT_ROLES = ["text", "text-muted", "accent-text"];

describe("design tokens", () => {
  it("define a background and every text role for both themes", () => {
    for (const role of ["bg", ...TEXT_ROLES]) {
      expect(colours, `missing --color-${role}`).toHaveProperty(role);
    }
  });

  describe.each<Theme>(["light", "dark"])("%s theme", (theme) => {
    it.each(TEXT_ROLES)(
      `--color-%s reaches ${WCAG_AA_TEXT}:1 on --color-bg`,
      (role) => {
        const ratio = contrastRatio(colours[role][theme], colours.bg[theme]);
        expect(
          ratio,
          `${role} on bg is ${ratio.toFixed(2)}:1 in the ${theme} theme`,
        ).toBeGreaterThanOrEqual(WCAG_AA_TEXT);
      },
    );
  });
});
