import { describe, expect, it } from "vitest";
import { parseInline } from "@/lib/inline";

describe("parseInline", () => {
  it("keeps plain text as one token", () => {
    expect(parseInline("Just text.")).toEqual([{ type: "text", text: "Just text." }]);
  });

  it("finds bold text", () => {
    expect(parseInline("**Red:** failing tests first.")).toEqual([
      { type: "strong", text: "Red:" },
      { type: "text", text: " failing tests first." },
    ]);
  });

  it("finds links", () => {
    expect(parseInline("See [the repo](https://github.com/x) now.")).toEqual([
      { type: "text", text: "See " },
      { type: "link", text: "the repo", href: "https://github.com/x" },
      { type: "text", text: " now." },
    ]);
  });

  it("handles several marks in order", () => {
    expect(parseInline("**a** and **b**").map((token) => token.type)).toEqual([
      "strong",
      "text",
      "strong",
    ]);
  });

  it("leaves unclosed marks as text", () => {
    expect(parseInline("2 ** 3 and [x]")).toEqual([
      { type: "text", text: "2 ** 3 and [x]" },
    ]);
  });
});
