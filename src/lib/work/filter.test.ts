import { describe, expect, it } from "vitest";
import { areasInUse, filterByArea, parseAreaFilter } from "@/lib/work/filter";
import type { Area } from "@/lib/work/meta";

const item = (slug: string, areas: Area[]) => ({ slug, meta: { areas } });
const items = [
  item("ai-workflow", ["backend", "ai"]),
  item("deep-link-scroll", ["mobile"]),
  item("site", ["web"]),
];

describe("parseAreaFilter (WORK-01)", () => {
  it("reads a known area", () => {
    expect(parseAreaFilter("mobile")).toBe("mobile");
  });

  it("falls back to all for missing or unknown values", () => {
    expect(parseAreaFilter(null)).toBe("all");
    expect(parseAreaFilter("games")).toBe("all");
  });
});

describe("filterByArea", () => {
  it("keeps every item for all", () => {
    expect(filterByArea(items, "all")).toHaveLength(3);
  });

  it("keeps the items of one area, in order", () => {
    expect(filterByArea(items, "backend").map((i) => i.slug)).toEqual(["ai-workflow"]);
  });
});

describe("areasInUse", () => {
  it("lists the areas with items, in the standard order", () => {
    expect(areasInUse(items)).toEqual(["mobile", "web", "backend", "ai"]);
    expect(areasInUse([items[1]])).toEqual(["mobile"]);
  });
});
