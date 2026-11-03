import Link from "next/link";
import { styled } from "@/lib/styled";
import styles from "./WorkCard.module.css";

/** `data-size="large"` for the featured card on the Home page. */
export const Root = styled(Link, styles.root, "WorkCard.Root");
export const Visual = styled("div", styles.visual, "WorkCard.Visual");
export const Metric = styled("span", styles.metric, "WorkCard.Metric");
export const Caption = styled("span", styles.caption, "WorkCard.Caption");
export const Picture = styled("span", styles.picture, "WorkCard.Picture");
export const Body = styled("div", styles.body, "WorkCard.Body");
export const Heading = styled("div", styles.heading, "WorkCard.Heading");
export const Title = styled("h3", styles.title, "WorkCard.Title");
export const Arrow = styled("span", styles.arrow, "WorkCard.Arrow");
export const Tags = styled("ul", styles.tags, "WorkCard.Tags");
export const Tag = styled("li", styles.tag, "WorkCard.Tag");
