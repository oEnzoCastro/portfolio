import Link from "next/link";
import { styled } from "@/lib/styled";
import styles from "./SelectedWork.module.css";

export const Root = styled("section", styles.root, "SelectedWork.Root");
export const Header = styled("div", styles.header, "SelectedWork.Header");
export const Title = styled("h2", styles.title, "SelectedWork.Title");
export const SeeAll = styled(Link, styles.seeAll, "SelectedWork.SeeAll");
export const Grid = styled("ul", styles.grid, "SelectedWork.Grid");
