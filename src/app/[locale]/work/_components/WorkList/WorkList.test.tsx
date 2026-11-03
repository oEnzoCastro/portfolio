// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import en from "@/i18n/messages/en.json";
import type { Area } from "@/lib/work/meta";
import type { WorkEntry } from "@/lib/work/work";
import { WorkList } from "./WorkList";

const route = vi.hoisted(() => ({ search: "", push: vi.fn() }));

vi.mock("next/navigation", () => ({
  usePathname: () => "/en/work",
  useRouter: () => ({ push: route.push }),
  useSearchParams: () => new URLSearchParams(route.search),
}));

const entry = (slug: string, order: number, areas: Area[]): WorkEntry => ({
  locale: "en",
  isFallback: false,
  meta: {
    slug,
    order,
    title: slug,
    areas,
    stack: ["TS"],
    featured: false,
    highlight: { type: "metric", value: "1", caption: "c" },
    role: "r",
    period: "2026",
    draft: false,
  },
});

const items = [
  entry("one", 1, ["backend", "ai"]),
  entry("two", 2, ["mobile"]),
  entry("three", 3, ["web"]),
  entry("four", 4, ["mobile", "web"]),
];

const renderList = (list = items) =>
  render(<WorkList items={list} locale="en" labels={en.work} />);

describe("WorkList (WORK-01)", () => {
  afterEach(() => {
    cleanup();
    route.search = "";
    route.push.mockClear();
  });

  it("shows every item and marks All when there is no filter", () => {
    renderList();
    expect(screen.getAllByRole("link")).toHaveLength(4);
    expect(screen.getByRole("button", { name: "All" }).getAttribute("aria-pressed")).toBe("true");
    expect(screen.getByRole("status").textContent).toBe("4 items");
  });

  it("shows only the items of the area in the URL", () => {
    route.search = "area=mobile";
    renderList();
    expect(screen.getAllByRole("link").map((link) => link.textContent)).toEqual([
      expect.stringContaining("two"),
      expect.stringContaining("four"),
    ]);
    expect(screen.getByRole("button", { name: "Mobile" }).getAttribute("aria-pressed")).toBe("true");
  });

  it("puts the chosen filter in the URL", () => {
    renderList();
    fireEvent.click(screen.getByRole("button", { name: "Web" }));
    expect(route.push).toHaveBeenCalledWith("/en/work?area=web", { scroll: false });
  });

  it("hides the filter with three items or fewer", () => {
    renderList(items.slice(0, 3));
    expect(screen.queryByRole("group")).toBeNull();
    expect(screen.getAllByRole("link")).toHaveLength(3);
  });
});
