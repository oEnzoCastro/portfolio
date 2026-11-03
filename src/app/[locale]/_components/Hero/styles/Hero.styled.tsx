import Link from "next/link";
import { styled } from "@/lib/styled";
import { Logo } from "@/shared/components/Logo/Logo";
import styles from "./Hero.module.css";

export const Root = styled("section", styles.root, "Hero.Root");
export const Text = styled("div", styles.text, "Hero.Text");
export const Name = styled("h1", styles.name, "Hero.Name");
export const Lines = styled("div", styles.lines, "Hero.Lines");
export const Tagline = styled("p", styles.tagline, "Hero.Tagline");
export const Role = styled("p", styles.role, "Hero.Role");
export const Actions = styled("div", styles.actions, "Hero.Actions");
/** `data-primary` for the filled button. */
export const Action = styled(Link, styles.action, "Hero.Action");
/** A plain <a> for files, such as the CV. */
export const FileAction = styled("a", styles.action, "Hero.FileAction");
export const Mark = styled("div", styles.mark, "Hero.Mark");
export const MarkSvg = styled(Logo, styles.markSvg, "Hero.MarkSvg");
