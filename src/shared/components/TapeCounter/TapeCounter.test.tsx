// @vitest-environment jsdom
import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { TapeCounter } from "@/shared/components/TapeCounter/TapeCounter";

/** The characters of each wheel's strip, top to bottom (window > wheel > strip > cell). */
function wheels(container: HTMLElement) {
  return [...container.firstElementChild!.children].map((wheel) =>
    [...wheel.firstElementChild!.children].map((cell) => cell.textContent),
  );
}

describe("TapeCounter", () => {
  afterEach(() => {
    cleanup();
  });

  it("shows one still wheel per character at first", () => {
    const { container } = render(<TapeCounter value="EN" />);

    expect(wheels(container)).toEqual([["E"], ["N"]]);
    expect(container.querySelector("[data-rolling]")).toBeNull();
  });

  it("rolls each wheel through the digits to the new character", () => {
    const { container, rerender } = render(<TapeCounter value="EN" />);
    rerender(<TapeCounter value="PT" rounds={1} />);

    const [first, second] = wheels(container);
    expect(first).toEqual(["E", ..."0123456789", "P"]);
    expect(second).toEqual(["N", ..."0123456789", "T"]);
    expect(container.querySelectorAll("[data-rolling]")).toHaveLength(2);
    expect(container.querySelectorAll("[data-digit]")).toHaveLength(20);
  });

  it("is hidden from screen readers", () => {
    const { container } = render(<TapeCounter value="EN" />);

    expect(container.firstElementChild!.getAttribute("aria-hidden")).toBe("true");
  });
});
