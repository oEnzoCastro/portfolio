import type { Metadata } from "next";
import { Bodoni_Moda, Geist, Geist_Mono } from "next/font/google";
import "@/styles/tokens.css";
import "../globals.css";
import { themeScript } from "@/lib/theme";
import { InlineScript } from "@/shared/components/InlineScript/InlineScript";
import { isLocale, LOCALES } from "@/i18n/config";
import { notFound } from "next/navigation";

const display = Bodoni_Moda({
  variable: "--font-display",
  subsets: ["latin"],
  style: "italic",
  weight: "700",
});

const body = Geist({
  variable: "--font-body",
  subsets: ["latin"],
});

const mono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Enzo Castro",
  description: "Fullstack developer across web, mobile and backend.",
  metadataBase: new URL("https://enzocastro.dev"),
};

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
    <html
      lang={locale}
      className={`${display.variable} ${body.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <InlineScript html={themeScript} />
      </head>
      <body>{children}</body>
    </html>
  );
}
