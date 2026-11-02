import { styled } from "@/lib/styled";
import styles from "./ThemeToggle.module.css";

export const Root = styled("button", styles.root, "ThemeToggle.Root");
export const LabelLight = styled("span", styles.labelLight, "ThemeToggle.LabelLight");
export const LabelDark = styled("span", styles.labelDark, "ThemeToggle.LabelDark");
export const Knob = styled("span", styles.knob, "ThemeToggle.Knob");
export const Pointer = styled("span", styles.pointer, "ThemeToggle.Pointer");
