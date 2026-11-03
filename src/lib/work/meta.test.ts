import { describe, expect, it } from "vitest";
import { parseWorkMeta } from "@/lib/work/meta";

const FILE = "src/content/work/ai-workflow/en.tsx";

const valid = {
  slug: "ai-workflow",
  order: 1,
  title: "AI development workflow",
  areas: ["backend", "ai"],
  stack: ["AI agents", "TDD", ".NET"],
  featured: true,
  highlight: { type: "metric", value: "−60%", caption: "Agent instructions" },
  role: "Software Developer Intern",
  period: "2026",
};

const parse = (meta: unknown) => () => parseWorkMeta(meta, FILE, "ai-workflow");

describe("parseWorkMeta (WORK-02)", () => {
  it("accepts a complete file and defaults draft to false", () => {
    expect(parseWorkMeta(valid, FILE, "ai-workflow")).toEqual({
      ...valid,
      draft: false,
    });
  });

  it("names the file and the missing field", () => {
    const withoutRole: Record<string, unknown> = { ...valid };
    delete withoutRole.role;
    expect(parse(withoutRole)).toThrow(FILE);
    expect(parse(withoutRole)).toThrow('"role"');
  });

  it("lists every problem at once", () => {
    expect(parse({ ...valid, order: "1", featured: "yes" })).toThrow(
      /"order"[\s\S]*"featured"/,
    );
  });

  it("rejects an unknown area", () => {
    expect(parse({ ...valid, areas: ["games"] })).toThrow('"games"');
  });

  it("checks each kind of highlight", () => {
    expect(parse({ ...valid, highlight: { type: "metric", value: "−60%" } })).toThrow(
      '"highlight.caption"',
    );
    expect(parse({ ...valid, highlight: { type: "image", src: "/a.svg" } })).toThrow(
      '"highlight.alt"',
    );
    expect(parse({ ...valid, highlight: { type: "video" } })).toThrow(
      '"highlight.type"',
    );
  });

  it("requires the slug to match the folder", () => {
    expect(parse({ ...valid, slug: "other" })).toThrow('folder is "ai-workflow"');
  });

  it("fails when the file has no meta export", () => {
    expect(parse(undefined)).toThrow("export const meta");
  });
});
