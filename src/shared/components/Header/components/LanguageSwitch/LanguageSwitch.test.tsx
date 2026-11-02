// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { LanguageSwitch } from "@/shared/components/Header/components/LanguageSwitch/LanguageSwitch";

const route = vi.hoisted(() => ({ pathname: "/en" }));

vi.mock("next/navigation", () => ({
  usePathname: () => route.pathname,
}));

describe("LanguageSwitch", () => {
  afterEach(() => {
    cleanup();
  });

  it("on an English page, links to the Portuguese one, labelled in Portuguese", () => {
    route.pathname = "/en/about";
    render(<LanguageSwitch />);

    const link = screen.getByRole("link", { name: "Mudar para português" });
    expect(link.getAttribute("href")).toBe("/pt/about");
    expect(link.getAttribute("lang")).toBe("pt");
  });

  it("on a Portuguese page, links back to English", () => {
    route.pathname = "/pt/about";
    render(<LanguageSwitch />);

    const link = screen.getByRole("link", { name: "Switch to English" });
    expect(link.getAttribute("href")).toBe("/en/about");
  });
});
