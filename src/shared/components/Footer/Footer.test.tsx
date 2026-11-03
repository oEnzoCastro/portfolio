// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import pt from "@/i18n/messages/pt.json";
import { SITE } from "@/lib/site";
import { Footer } from "@/shared/components/Footer/Footer";

// vi.mock is hoisted above the imports, so Footer gets these versions.
vi.mock("@/i18n/dictionary", () => ({ getDictionary: async () => pt }));
vi.mock("@/lib/year", () => ({ getCurrentYear: async () => 2026 }));

describe("Footer", () => {
  afterEach(() => {
    cleanup();
  });

  it("shows the copyright with the year", async () => {
    render(await Footer());
    expect(screen.getByText("© 2026 Enzo Castro Figueredo")).toBeTruthy();
  });

  it("links to email, GitHub and LinkedIn, marking the external ones", async () => {
    render(await Footer());

    const nav = screen.getByRole("navigation", { name: pt.footer.label });
    expect(nav).toBeTruthy();

    const email = screen.getByRole("link", { name: pt.footer.email });
    expect(email.getAttribute("href")).toBe(`mailto:${SITE.email}`);

    const github = screen.getByRole("link", {
      name: `${pt.footer.github} ${pt.footer.external}`,
    });
    expect(github.getAttribute("href")).toBe(SITE.github);
  });
});
