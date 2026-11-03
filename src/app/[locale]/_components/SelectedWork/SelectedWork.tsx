import { getCurrentLocale, getDictionary } from "@/i18n/dictionary";
import { getFeaturedWork } from "@/lib/work/work";
import { WorkCard } from "@/shared/components/WorkCard/WorkCard";
import {
  Grid,
  Header,
  Root,
  SeeAll,
  Title,
} from "./styles/SelectedWork.styled";

/** Target of the "See the work" button in the hero. */
export const WORK_SECTION_ID = "work";

/** HOME-04: the featured cases, the first one large. */
export async function SelectedWork() {
  const locale = await getCurrentLocale();
  const { home } = await getDictionary();
  const featured = getFeaturedWork(locale);

  if (featured.length === 0) return null;

  return (
    <Root id={WORK_SECTION_ID} aria-labelledby="selected-work-title">
      <Header>
        <Title id="selected-work-title">{home.selectedWork}</Title>
        <SeeAll href={`/${locale}/work`}>
          {home.seeAllWork} <span aria-hidden="true">→</span>
        </SeeAll>
      </Header>
      <Grid>
        {featured.map((work, index) => (
          <li key={work.meta.slug}>
            <WorkCard
              work={work}
              href={`/${locale}/work/${work.meta.slug}`}
              size={index === 0 ? "large" : "small"}
            />
          </li>
        ))}
      </Grid>
    </Root>
  );
}
