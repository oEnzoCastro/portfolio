import { styled } from "@/lib/styled";
import styles from "./CaseBody.module.css";

export const Root = styled("div", styles.root, "CaseBody.Root");
export const Aside = styled("aside", styles.aside, "CaseBody.Aside");
export const Toc = styled("nav", styles.toc, "CaseBody.Toc");
export const TocTitle = styled("h2", styles.tocTitle, "CaseBody.TocTitle");
export const TocList = styled("ul", styles.tocList, "CaseBody.TocList");
/**
 * A button, not a link: it scrolls within the page and leaves the URL as is.
 * `aria-current="location"` marks the section in view.
 */
export const TocLink = styled("button", styles.tocLink, "CaseBody.TocLink");
export const Prose = styled("div", styles.prose, "CaseBody.Prose");
