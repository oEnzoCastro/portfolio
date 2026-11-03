import { describe, expect, it } from "vitest";
import { currentSection } from "./currentSection";

const OFFSET = 120;
const VIEWPORT = 800;
const FAR = 5000; // plenty left to scroll

describe("currentSection (WORK-03)", () => {
  it("is the first section before any heading reaches the line", () => {
    expect(currentSection([400, 900, 1400], OFFSET, VIEWPORT, FAR)).toBe(0);
  });

  it("is the last heading that has crossed the line", () => {
    expect(currentSection([-600, 80, 700], OFFSET, VIEWPORT, FAR)).toBe(1);
  });

  it("lets short final sections become current one at a time", () => {
    // Last screen: the two final headings are at 300 and 600.
    const tops = [-900, 300, 600];
    expect(currentSection(tops, OFFSET, VIEWPORT, 500)).toBe(1); // line at 377
    expect(currentSection(tops, OFFSET, VIEWPORT, 100)).toBe(2); // line at 715
  });

  it("is the last section at the very bottom", () => {
    expect(currentSection([-900, 300, 790], OFFSET, VIEWPORT, 0)).toBe(2);
  });

  it("is -1 when there are no sections", () => {
    expect(currentSection([], OFFSET, VIEWPORT, FAR)).toBe(-1);
  });
});
