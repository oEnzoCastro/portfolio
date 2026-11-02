// @vitest-environment jsdom
import { act, cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { TapeCounter } from "@/shared/components/TapeCounter/TapeCounter";

/** The characters of each wheel's strip, top to bottom (window > wheel > strip > cell). */
function wheels(container: HTMLElement) {
  return [...container.firstElementChild!.children].map((wheel) =>
    [...wheel.firstElementChild!.children].map((cell) => cell.textContent),
  );
}

/**
 * Fires the end of a CSS animation. jsdom has no AnimationEvent, so React
 * listens for the prefixed "webkitAnimationEnd" there instead of
 * "animationend". Dispatching both works in any environment.
 */
function endAnimation(element: Element) {
  for (const type of ["animationend", "webkitAnimationEnd"]) {
    act(() => {
      element.dispatchEvent(new Event(type, { bubbles: true }));
    });
  }
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

  it("rolls on mount when it starts from another value", () => {
    const { container } = render(<TapeCounter value="PT" from="EN" rounds={1} />);

    expect(wheels(container)).toEqual([
      ["E", ..."0123456789", "P"],
      ["N", ..."0123456789", "T"],
    ]);
  });

  it("stands still once the last wheel has landed", () => {
    const { container, rerender } = render(<TapeCounter value="EN" />);
    rerender(<TapeCounter value="PT" />);

    const strips = container.querySelectorAll("[data-rolling]");
    endAnimation(strips[strips.length - 1]);

    expect(wheels(container)).toEqual([["P"], ["T"]]);
    expect(container.querySelector("[data-rolling]")).toBeNull();
  });
});
