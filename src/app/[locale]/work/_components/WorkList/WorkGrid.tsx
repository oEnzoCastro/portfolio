import type { Locale } from "@/i18n/config";
import type { WorkEntry } from "@/lib/work/work";
import { WorkCard } from "@/shared/components/WorkCard/WorkCard";
import { Grid } from "./styles/WorkList.styled";

type WorkGridProps = {
  items: WorkEntry[];
  locale: Locale;
};

/** The cards, in order. Used by WorkList, and alone while it loads. */
export function WorkGrid({ items, locale }: WorkGridProps) {
  return (
    <Grid>
      {items.map((work) => (
        <li key={work.meta.slug}>
          <WorkCard work={work} href={`/${locale}/work/${work.meta.slug}`} />
        </li>
      ))}
    </Grid>
  );
}
