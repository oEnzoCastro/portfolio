import { describe, expect, it } from "vitest";
import { parseWorkContent } from "@/lib/work/content";

const FILE = "src/content/work/ai-workflow/en.json";

const valid = {
  meta: {
    slug: "ai-workflow",
    order: 1,
    title: "AI development workflow",
    areas: ["backend", "ai"],
    stack: ["AI agents", "TDD", ".NET"],
    featured: true,
    highlight: { type: "metric", value: "−60%", caption: "Agent instructions" },
    role: "Intern",
    period: "2026",
  },
  sections: [
    {
      id: "the-problem",
      title: "The problem",
      blocks: [{ type: "paragraph", text: "Text." }],
    },
  ],
};

const parse = (raw: unknown) => () => parseWorkContent(raw, FILE, "ai-workflow");

const withMeta = (meta: Record<string, unknown>) => ({
  ...valid,
  meta: { ...valid.meta, ...meta },
});

const withBlock = (block: unknown) => ({
  ...valid,
  sections: [{ ...valid.sections[0], blocks: [block] }],
});

describe("parseWorkContent (WORK-02)", () => {
  it("accepts a complete file and defaults draft to false", () => {
    expect(parseWorkContent(valid, FILE, "ai-workflow").meta.draft).toBe(false);
  });

  it("names the file and the field", () => {
    expect(parse(withMeta({ role: "" }))).toThrow(FILE);
    expect(parse(withMeta({ role: "" }))).toThrow('"meta.role"');
  });

  it("lists every problem at once", () => {
    expect(parse(withMeta({ order: "1", featured: "yes" }))).toThrow(
      /"meta.order"[\s\S]*"meta.featured"/,
    );
  });

  it("checks areas, highlight and slug", () => {
    expect(parse(withMeta({ areas: ["games"] }))).toThrow('"games"');
    expect(parse(withMeta({ highlight: { type: "video" } }))).toThrow(
      '"meta.highlight.type"',
    );
    expect(parse(withMeta({ slug: "other" }))).toThrow('folder is "ai-workflow"');
  });

  it("requires unique, anchor-friendly section ids", () => {
    const twice = { ...valid, sections: [valid.sections[0], valid.sections[0]] };
    expect(parse(twice)).toThrow('is used twice');
    expect(
      parse({ ...valid, sections: [{ ...valid.sections[0], id: "The Problem" }] }),
    ).toThrow('"sections[0]".id');
  });

  it("checks each kind of block", () => {
    expect(parse(withBlock({ type: "video" }))).toThrow("type must be one of");
    expect(parse(withBlock({ type: "paragraph", text: "" }))).toThrow(".text");
    expect(parse(withBlock({ type: "list", items: ["a"] }))).toThrow(".ordered");
    expect(parse(withBlock({ type: "steps", items: [{ label: "Red" }] }))).toThrow(
      "{ label, text }",
    );
  });
});
