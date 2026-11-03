import { styled } from "@/lib/styled";
import styles from "./Blocks.module.css";

export const Root = styled("div", styles.root, "Blocks.Root");
export const OrderedList = styled("ol", styles.list, "Blocks.OrderedList");
export const UnorderedList = styled("ul", styles.list, "Blocks.UnorderedList");
export const Link = styled("a", styles.link, "Blocks.Link");
export const Steps = styled("ol", styles.steps, "Blocks.Steps");
export const Step = styled("li", styles.step, "Blocks.Step");
export const StepLabel = styled("span", styles.stepLabel, "Blocks.StepLabel");
