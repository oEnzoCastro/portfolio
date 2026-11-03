import { Suspense } from "react";
import type { Metadata } from "next";
import { getCurrentLocale, getDictionary } from "@/i18n/dictionary";
import { getAllWork } from "@/lib/work/work";
import { WorkGrid } from "./_components/WorkList/WorkGrid";
import { WorkList } from "./_components/WorkList/WorkList";
import { Header, Intro, Title } from "./styles/WorkPage.styled";

export async function generateMetadata(): Promise<Metadata> {
  const dictionary = await getDictionary();
  return { title: `${dictionary.work.title} · ${dictionary.meta.title}` };
}

/** WORK-01: every published piece of work, with the area filter. */
export default async function WorkPage() {
  const locale = await getCurrentLocale();
  const { work: labels } = await getDictionary();
  const items = getAllWork(locale);

  return (
    <>
      <Header>
        <Title>{labels.title}</Title>
        <Intro>{labels.intro}</Intro>
      </Header>
      {/* The filter reads the URL in the browser; until then (and without
          JavaScript) the full list is shown. */}
      <Suspense fallback={<WorkGrid items={items} locale={locale} />}>
        <WorkList items={items} locale={locale} labels={labels} />
      </Suspense>
    </>
  );
}
