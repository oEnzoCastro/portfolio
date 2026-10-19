// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { it, expect } from "vitest";
import { Logo } from "@/components/Logo/Logo";

it("renders the mark with an accessible name", () => {
  render(<Logo title="Enzo Castro" />);
  expect(screen.getByRole("img", { name: "Enzo Castro" })).toBeTruthy();
});
