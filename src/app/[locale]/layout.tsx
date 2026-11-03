import type { Metadata } from "next";
import "@/styles/tokens.css";
import "../globals.css";
import { fontVariables } from "../fonts";
import { themeScript } from "@/lib/theme";
import { InlineScript } from "@/shared/components/InlineScript/InlineScript";
import { ThemeSync } from "@/shared/components/ThemeSync/ThemeSync";
import { isLocale, LOCALES } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { notFound } from "next/navigation";
import { Header } from "@/shared/components/Header/Header";
import { SkipLink, CONTENT_ID } from "@/shared/components/SkipLink/SkipLink";
import { Footer } from "@/shared/components/Footer/Footer";
import { Main, Shell } from "./styles/Layout.styled";

export async function generateMetadata(): Promise<Metadata> {
  const dictionary = await getDictionary();
  return {
    title: dictionary.meta.title,
    description: dictionary.meta.description,
    metadataBase: new URL("https://enzocastro.dev"),
  };
}

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return notFound();
  }

  return (
    <html lang={locale} className={fontVariables} suppressHydrationWarning>
      <head>
        <InlineScript html={themeScript} />
      </head>
      <body>
        <ThemeSync />
        <Shell>
          <SkipLink />
          <Header />
          <Main id={CONTENT_ID} tabIndex={-1}>
            {children}
          </Main>
          <Footer />
        </Shell>
      </body>
    </html>
  );
}
