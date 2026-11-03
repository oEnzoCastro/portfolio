import { styled } from "@/lib/styled";
import styles from "./Footer.module.css";

export const Root = styled("footer", styles.root, "Footer.Root");
export const Links = styled("ul", styles.links, "Footer.Links");
export const Link = styled("a", styles.link, "Footer.Link");
/** Text for screen readers only, e.g. "(opens another site)". */
export const Hint = styled("span", styles.hint, "Footer.Hint");
