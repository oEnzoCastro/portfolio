import { getDictionary } from "@/i18n/dictionary";
import { Root } from "./styles/SkipLink.styled";

/** The id of the page's <main>, the skip link's target. */
export const CONTENT_ID = "content";

/**
 * The first stop when tabbing: jumps past the header to the page content.
 * Visible only while it has keyboard focus.
 */
export async function SkipLink() {
  const dictionary = await getDictionary();

  return <Root href={`#${CONTENT_ID}`}>{dictionary.layout.skipToContent}</Root>;
}
