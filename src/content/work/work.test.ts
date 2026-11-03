import { describe, expect, it } from "vitest";
import { WORK } from "@/content/work";

/**
 * WORK-02. Loading the index already checks every file (see
 * parseWorkContent); this adds the rules between translations.
 */
describe("case study translations", () => {
  it("keep the same order, areas and flags as English", () => {
    for (const translations of Object.values(WORK)) {
      const { en, ...others } = translations;
      for (const other of Object.values(others)) {
        expect(other!.meta.order).toBe(en.meta.order);
        expect(other!.meta.areas).toEqual(en.meta.areas);
        expect(other!.meta.featured).toBe(en.meta.featured);
        expect(other!.meta.draft).toBe(en.meta.draft);
      }
    }
  });

  it("have the same number of sections as English", () => {
    for (const translations of Object.values(WORK)) {
      const { en, ...others } = translations;
      for (const other of Object.values(others)) {
        expect(other!.sections.length).toBe(en.sections.length);
      }
    }
  });
});
