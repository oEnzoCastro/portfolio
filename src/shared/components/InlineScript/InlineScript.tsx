"use client";

type InlineScriptProps = {
  /** JavaScript source to run while the HTML is parsed. */
  html: string;
};

/**
 * Runs a script on the first page load, before the browser paints.
 *
 * Scripts that React renders in the browser never execute, and React warns
 * about them in development. So the script is real JavaScript in the server
 * HTML, and plain text when React renders it on the client.
 *
 * It must be a Client Component: a Server Component only runs on the server,
 * so `typeof window` would always be "undefined" and the client would get
 * "text/javascript" too.
 * See node_modules/next/dist/docs/01-app/02-guides/preventing-flash-before-hydration.md
 */
export function InlineScript({ html }: InlineScriptProps) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
