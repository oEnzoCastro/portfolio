import type { Metadata } from "next";
import { getCurrentLocale, getDictionary } from "@/i18n/dictionary";
import { Code, HomeLink, Main, Title } from "./styles/NotFound.styled";

export async function generateMetadata(): Promise<Metadata> {
  const dictionary = await getDictionary();

  return {
    title: `${dictionary.notFound.title} · ${dictionary.meta.title}`,
    description: dictionary.meta.description,
  };
}

/**
 * 404 inside a locale (/pt/anything), shown within the layout: header,
 * page shell and the visitor's language. URLs outside any locale fall back
 * to src/app/global-not-found.tsx.
 */
export default async function NotFound() {
  const locale = await getCurrentLocale();
  const dictionary = await getDictionary();

  return (
    <Main>
      <Code>404</Code>
      <Title>{dictionary.notFound.title}</Title>
      <p>
        <HomeLink href={`/${locale}`}>{dictionary.notFound.home}</HomeLink>
      </p>
    </Main>
  );
}
