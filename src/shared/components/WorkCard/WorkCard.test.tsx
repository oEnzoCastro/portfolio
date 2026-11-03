// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import type { WorkEntry } from "@/lib/work/work";
import { WorkCard } from "@/shared/components/WorkCard/WorkCard";

const work: WorkEntry = {
  locale: "en",
  isFallback: false,
  meta: {
    slug: "ai-workflow",
    order: 1,
    title: "AI development workflow",
    areas: ["backend", "ai"],
    stack: ["AI agents", "TDD", ".NET", "Azure"],
    featured: true,
    highlight: { type: "metric", value: "−60%", caption: "Agent instructions" },
    role: "Intern",
    period: "2026",
    draft: false,
  },
};

describe("WorkCard", () => {
  afterEach(() => {
    cleanup();
  });

  it("is one link to the case study, named by its title", () => {
    render(<WorkCard work={work} href="/en/work/ai-workflow" />);

    const link = screen.getByRole("link", { name: /AI development workflow/ });
    expect(link.getAttribute("href")).toBe("/en/work/ai-workflow");
  });

  it("shows at most three stack tags", () => {
    render(<WorkCard work={work} href="/en/work/ai-workflow" />);

    expect(screen.getAllByRole("listitem").map((li) => li.textContent)).toEqual([
      "AI agents",
      "TDD",
      ".NET",
    ]);
  });

  it("marks a card shown in English on a Portuguese page", () => {
    render(
      <WorkCard
        work={{ ...work, isFallback: true }}
        href="/pt/work/ai-workflow"
      />,
    );

    expect(screen.getByRole("link").getAttribute("lang")).toBe("en");
  });

  it("gives an image highlight its alt text", () => {
    render(
      <WorkCard
        work={{
          ...work,
          meta: {
            ...work.meta,
            highlight: { type: "image", src: "/work/phone.svg", alt: "A phone" },
          },
        }}
        href="/en/work/ai-workflow"
      />,
    );

    expect(screen.getByRole("img", { name: "A phone" })).toBeTruthy();
  });
});
