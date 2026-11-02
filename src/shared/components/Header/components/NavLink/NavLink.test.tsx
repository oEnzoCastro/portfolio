// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { NavLink } from "@/shared/components/Header/components/NavLink/NavLink";

const route = vi.hoisted(() => ({ pathname: "/en" }));

vi.mock("next/navigation", () => ({
  usePathname: () => route.pathname,
}));

describe("NavLink", () => {
  afterEach(() => {
    cleanup();
  });

  it("marks itself as the current page when the path matches", () => {
    route.pathname = "/pt/about";
    render(<NavLink href="/pt/about">Sobre</NavLink>);

    const link = screen.getByRole("link", { name: "Sobre" });
    expect(link.getAttribute("aria-current")).toBe("page");
  });

  it("is a plain link on other pages", () => {
    route.pathname = "/pt/work";
    render(<NavLink href="/pt/about">Sobre</NavLink>);

    const link = screen.getByRole("link", { name: "Sobre" });
    expect(link.hasAttribute("aria-current")).toBe(false);
  });
});
