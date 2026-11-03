// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Blocks } from "@/shared/components/Blocks/Blocks";

describe("Blocks", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders a paragraph with bold text and a link", () => {
    render(
      <Blocks
        blocks={[
          { type: "paragraph", text: "**Fast** code, [see why](https://example.com)." },
        ]}
      />,
    );

    expect(screen.getByText("Fast").tagName).toBe("STRONG");
    expect(screen.getByRole("link", { name: "see why" }).getAttribute("href")).toBe(
      "https://example.com",
    );
  });

  it("renders ordered and unordered lists", () => {
    render(
      <Blocks
        blocks={[
          { type: "list", ordered: true, items: ["one", "two"] },
          { type: "list", ordered: false, items: ["a"] },
        ]}
      />,
    );

    const [ordered, unordered] = screen.getAllByRole("list");
    expect(ordered.tagName).toBe("OL");
    expect(unordered.tagName).toBe("UL");
  });

  it("numbers steps and shows their labels", () => {
    render(
      <Blocks
        blocks={[
          {
            type: "steps",
            items: [
              { label: "Red", text: "Failing tests." },
              { label: "Green", text: "Make them pass." },
            ],
          },
        ]}
      />,
    );

    expect(screen.getByText("01 · Red")).toBeTruthy();
    expect(screen.getByText("02 · Green")).toBeTruthy();
  });
});
