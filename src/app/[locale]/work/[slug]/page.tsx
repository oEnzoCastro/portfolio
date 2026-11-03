import { Suspense, type CSSProperties } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getCurrentLocale, getDictionary } from "@/i18n/dictionary";
import { getAllWork, getWork } from "@/lib/work/work";
import { CaseBody } from "./_components/CaseBody/CaseBody";
import {
  Back,
  Caption,
  FactName,
  Facts,
  FactValue,
  Heading,
  Highlight,
  Intro,
  Label,
  Metric,
  Next,
  NextArrow,
  NextLabel,
  NextText,
  NextTitle,
  Note,
  Picture,
  Title,
  Top,
} from "./styles/CasePage.styled";

/** Every published case, for each locale, is built ahead of time. */
export function generateStaticParams({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) return [];
  return getAllWork(params.locale).map((work) => ({ slug: work.meta.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const work = getWork(await getCurrentLocale(), slug);
  if (work === null) return {};
  const dictionary = await getDictionary();
  return { title: `${work.meta.title} · ${dictionary.meta.title}` };
}

type Params = PageProps<"/[locale]/work/[slug]">["params"];

/**
 * WORK-03: one case study.
 *
 * Which case to show comes from the URL (`params`). For navigations to be
 * instant, that part sits inside <Suspense>: the layout shows at once and the
 * case fills in. Links to cases prefetch it (`prefetch` on WorkCard and the
 * "next case" link), so in practice it is already there when you click, and
 * every case is also prerendered by generateStaticParams for page loads.
 */
export default function CasePage({ params }: PageProps<"/[locale]/work/[slug]">) {
  return (
    <Suspense fallback={null}>
      <CaseStudy params={params} />
    </Suspense>
  );
}

async function CaseStudy({ params }: { params: Params }) {
  const { slug } = await params;
  const locale = await getCurrentLocale();
  const work = getWork(locale, slug);
  if (work === null) notFound();

  const { caseStudy: text } = await getDictionary();
  const { meta, sections, isFallback } = work;
  // Text in English on a Portuguese page is marked, so it is read correctly.
  const contentLang = isFallback ? work.locale : undefined;

  const all = getAllWork(locale);
  const index = all.findIndex((entry) => entry.meta.slug === slug);
  const next = all.length > 1 ? all[(index + 1) % all.length] : undefined;

  return (
    <article>
      <Top>
        <Back href={`/${locale}/work`}>
          <span aria-hidden="true">←</span> {text.allWork}
        </Back>
        <Intro>
          {meta.highlight.type === "metric" ? (
            <Highlight aria-hidden="true">
              <Metric
                style={
                  { "--chars": [...meta.highlight.value].length } as CSSProperties
                }
              >
                {meta.highlight.value}
              </Metric>
              <Caption lang={contentLang}>{meta.highlight.caption}</Caption>
            </Highlight>
          ) : (
            <Highlight>
              <Picture
                role="img"
                aria-label={meta.highlight.alt}
                style={
                  { maskImage: `url(${meta.highlight.src})` } as CSSProperties
                }
              />
            </Highlight>
          )}
          <Heading>
            <Label>
              {text.label} {String(meta.order).padStart(2, "0")}
            </Label>
            <Title lang={contentLang}>{meta.title}</Title>
          </Heading>
        </Intro>
        {isFallback && <Note>{text.notTranslated}</Note>}
      </Top>

      <CaseBody
        tocTitle={text.onThisPage}
        sections={sections}
        lang={contentLang}
        facts={
          <Facts>
            <div>
              <FactName>{text.role}</FactName>
              <FactValue lang={contentLang}>{meta.role}</FactValue>
            </div>
            <div>
              <FactName>{text.period}</FactName>
              <FactValue>{meta.period}</FactValue>
            </div>
            <div>
              <FactName>{text.stack}</FactName>
              <FactValue>{meta.stack.join(" · ")}</FactValue>
            </div>
          </Facts>
        }
      />

      {next && (
        <Next href={`/${locale}/work/${next.meta.slug}`} prefetch>
          <NextText>
            <NextLabel>{text.next}</NextLabel>
            <NextTitle lang={next.isFallback ? next.locale : undefined}>
              {next.meta.title}
            </NextTitle>
          </NextText>
          <NextArrow aria-hidden="true">→</NextArrow>
        </Next>
      )}
    </article>
  );
}
