import { styled } from "@/lib/styled";
import styles from "./WorkList.module.css";

export const Root = styled("div", styles.root, "WorkList.Root");
export const Filters = styled("div", styles.filters, "WorkList.Filters");
export const Chips = styled("div", styles.chips, "WorkList.Chips");
/** `aria-pressed="true"` marks the selected filter. */
export const Chip = styled("button", styles.chip, "WorkList.Chip");
export const Count = styled("p", styles.count, "WorkList.Count");
export const Grid = styled("ul", styles.grid, "WorkList.Grid");
