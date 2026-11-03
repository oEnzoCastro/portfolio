"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import type { WorkSection } from "@/lib/work/meta";
import { Blocks } from "@/shared/components/Blocks/Blocks";
import { currentSection } from "./currentSection";
import {
  Aside,
  Prose,
  Root,
  Toc,
  TocLink,
  TocList,
  TocTitle,
} from "./styles/CaseBody.styled";

type CaseBodyProps = {
  /** Shown above "On this page" in the side column (role, period, stack). */
  facts: ReactNode;
  tocTitle: string;
  sections: WorkSection[];
  /** Set when the text is in another language than the page. */
  lang?: string;
};

/** Pixels below the top of the screen where a heading counts as reached. */
const OFFSET = 120;

/**
 * The side column and the case study text (WORK-03). Everything works from
 * where the headings are on screen, measured through refs: the current
 * section, and the scroll when an item is clicked. The URL never changes,
 * so the browser's Back button always leaves the page.
 */
export function CaseBody({ facts, tocTitle, sections, lang }: CaseBodyProps) {
  const headings = useRef<(HTMLHeadingElement | null)[]>([]);
  const [current, setCurrent] = useState(0);
  // While a click scrolls the page, keep the clicked item selected.
  const pinned = useRef<number | null>(null);

  useEffect(() => {
    let frame = 0;

    function update() {
      frame = 0;
      if (pinned.current !== null) return;
      const tops = headings.current.map(
        (heading) => heading?.getBoundingClientRect().top ?? Infinity,
      );
      const { scrollY, innerHeight } = window;
      const remaining =
        document.documentElement.scrollHeight - (scrollY + innerHeight);
      setCurrent(currentSection(tops, OFFSET, innerHeight, remaining));
    }

    function onScroll() {
      if (frame === 0) frame = requestAnimationFrame(update);
    }

    // A click keeps its item selected until the reader scrolls on their own,
    // even if the page could not scroll the heading all the way up.
    function release() {
      pinned.current = null;
      onScroll();
    }

    frame = requestAnimationFrame(update);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", release, { passive: true });
    window.addEventListener("touchmove", release, { passive: true });
    window.addEventListener("keydown", release);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", release);
      window.removeEventListener("touchmove", release);
      window.removeEventListener("keydown", release);
    };
  }, []);

  function goTo(index: number) {
    const heading = headings.current[index];
    if (!heading) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    pinned.current = index;
    setCurrent(index);
    window.scrollTo({
      top: heading.getBoundingClientRect().top + window.scrollY - OFFSET + 1,
      behavior: reducedMotion ? "auto" : "smooth",
    });
    // Keyboard and screen reader users continue reading from the heading.
    heading.focus({ preventScroll: true });
  }

  return (
    <Root>
      <Aside>
        {facts}
        <Toc aria-labelledby="on-this-page">
          <TocTitle id="on-this-page">{tocTitle}</TocTitle>
          <TocList lang={lang}>
            {sections.map((section, index) => (
              <li key={section.id}>
                <TocLink
                  type="button"
                  aria-current={index === current ? "location" : undefined}
                  onClick={() => goTo(index)}
                >
                  {section.title}
                </TocLink>
              </li>
            ))}
          </TocList>
        </Toc>
      </Aside>

      <Prose lang={lang}>
        {sections.map((section, index) => (
          <section key={section.id} aria-labelledby={section.id}>
            <h2
              id={section.id}
              tabIndex={-1}
              ref={(element) => {
                headings.current[index] = element;
              }}
            >
              {section.title}
            </h2>
            <Blocks blocks={section.blocks} />
          </section>
        ))}
      </Prose>
    </Root>
  );
}
