import { notFound } from "next/navigation";

/**
 * Catches any path under a locale that matches no page (/pt/anything), so
 * the 404 renders inside the layout via ./not-found.tsx instead of the
 * global one.
 *
 * It never renders, so there is nothing for instant-navigation validation
 * to check (it would report "Could not validate `instant`" in development).
 */
export const instant = false;

export default function CatchAllPage() {
  notFound();
}
