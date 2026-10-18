import { describe, it, expect } from "vitest";
import { contrastRatio, hexToRgb, relativeLuminance } from "@/lib/contrast";

describe("hexToRgb", () => {
  it("reads six-digit hex", () => {
    expect(hexToRgb("#1a1a18")).toEqual([26, 26, 24]);
  });

  it("expands three-digit hex", () => {
    expect(hexToRgb("#fff")).toEqual([255, 255, 255]);
  });

  it("ignores case and surrounding spaces", () => {
    expect(hexToRgb("  #E2622B ")).toEqual([226, 98, 43]);
  });

  it.each(["", "fff", "#ff", "#gggggg", "rgb(0,0,0)"])(
    "rejects %j",
    (value) => {
      expect(() => hexToRgb(value)).toThrow(/Invalid hex colour/);
    },
  );
});

describe("relativeLuminance", () => {
  it("is 0 for black and 1 for white", () => {
    expect(relativeLuminance("#000000")).toBe(0);
    expect(relativeLuminance("#ffffff")).toBe(1);
  });
});

describe("contrastRatio", () => {
  it("is 21 for black on white, the maximum", () => {
    expect(contrastRatio("#000", "#fff")).toBeCloseTo(21, 5);
  });

  it("is 1 for the same colour, the minimum", () => {
    expect(contrastRatio("#e2622b", "#e2622b")).toBe(1);
  });

  it("does not depend on the order of the colours", () => {
    expect(contrastRatio("#1a1a18", "#f4f2ec")).toBe(
      contrastRatio("#f4f2ec", "#1a1a18"),
    );
  });

  it("matches a known reference value", () => {
    // #777 on white is the classic borderline grey: 4.48, just below AA.
    expect(contrastRatio("#777777", "#ffffff")).toBeCloseTo(4.48, 2);
  });
});
