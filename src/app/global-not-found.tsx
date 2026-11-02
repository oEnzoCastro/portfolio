import type { Metadata } from "next";
import Link from "next/link";
import "@/styles/tokens.css";
import "./globals.css";
import { fontVariables } from "./fonts";
import { themeScript } from "@/lib/theme";
import { InlineScript } from "@/shared/components/InlineScript/InlineScript";
import styles from "./global-not-found.module.css";

export const metadata: Metadata = {
  title: "Page not found · Enzo Castro",
};

/**
 * 404 for URLs that match no route (enabled by experimental.globalNotFound).
 * It is rendered without any layout and outside [locale], so it brings its
 * own <html>, fonts and theme script, and offers both languages.
 */
export default function GlobalNotFound() {
  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <head>
        <InlineScript html={themeScript} />
      </head>
      <body>
        <main className={styles.main}>
          <p className={styles.code}>404</p>
          <h1 className={styles.title}>Page not found</h1>
          <p className={styles.links}>
            <Link href="/en">Go to the home page</Link>
            <Link href="/pt" lang="pt">
              Ir para a página inicial
            </Link>
          </p>
        </main>
      </body>
    </html>
  );
}
