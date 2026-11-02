import { styled } from "@/lib/styled";
import styles from "./LanguageSwitch.module.css";

/**
 * A plain <a>, not next/link: switching locale swaps the root layout, so it
 * is a full page load on purpose (see LanguageSwitch.tsx).
 */
export const Root = styled("a", styles.root, "LanguageSwitch.Root");
