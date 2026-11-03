import { AREAS, type Area } from "./meta";

/** The filter of the Work page (WORK-01): one area, or every item. */
export type AreaFilter = Area | "all";

/** Reads `?area=` from the URL; anything unknown means "all". */
export function parseAreaFilter(value: string | null | undefined): AreaFilter {
  return (AREAS as readonly string[]).includes(value ?? "")
    ? (value as Area)
    : "all";
}

/** Items in the given area, keeping their order. */
export function filterByArea<T extends { meta: { areas: Area[] } }>(
  items: T[],
  filter: AreaFilter,
): T[] {
  return filter === "all"
    ? items
    : items.filter((item) => item.meta.areas.includes(filter));
}

/** The areas that have at least one item, in the standard order. */
export function areasInUse(items: { meta: { areas: Area[] } }[]): Area[] {
  return AREAS.filter((area) => items.some((item) => item.meta.areas.includes(area)));
}
