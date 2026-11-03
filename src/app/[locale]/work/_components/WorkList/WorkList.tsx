"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";
import {
  areasInUse,
  filterByArea,
  parseAreaFilter,
  type AreaFilter,
} from "@/lib/work/filter";
import type { WorkEntry } from "@/lib/work/work";
import { WorkGrid } from "./WorkGrid";
import { Chip, Chips, Count, Filters, Root } from "./styles/WorkList.styled";

type WorkListProps = {
  items: WorkEntry[];
  locale: Locale;
  labels: Dictionary["work"];
};

/** WORK-01: the filter row shows only when there is something to filter. */
const SHOW_FILTER_FROM = 4;

/**
 * Every published item, filtered in the browser by `?area=` (WORK-01). The
 * filter lives in the URL, so a filtered view can be shared and the Back
 * button returns to the previous filter.
 */
export function WorkList({ items, locale, labels }: WorkListProps) {
  const pathname = usePathname();
  const router = useRouter();
  const filter = parseAreaFilter(useSearchParams().get("area"));
  const shown = filterByArea(items, filter);

  function select(next: AreaFilter) {
    const url = next === "all" ? pathname : `${pathname}?area=${next}`;
    router.push(url, { scroll: false });
  }

  const count =
    shown.length === 1
      ? labels.countOne
      : labels.countOther.replace("{count}", String(shown.length));
  const filters: AreaFilter[] = ["all", ...areasInUse(items)];

  return (
    <Root>
      {items.length >= SHOW_FILTER_FROM && (
        <Filters>
          <Chips role="group" aria-label={labels.filterLabel}>
            {filters.map((area) => (
              <Chip
                key={area}
                type="button"
                aria-pressed={area === filter}
                onClick={() => select(area)}
              >
                {area === "all" ? labels.all : labels.areas[area]}
              </Chip>
            ))}
          </Chips>
          <Count role="status">{count}</Count>
        </Filters>
      )}
      <WorkGrid items={shown} locale={locale} />
    </Root>
  );
}
