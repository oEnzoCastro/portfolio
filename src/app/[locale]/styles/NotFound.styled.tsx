import Link from "next/link";
import { styled } from "@/lib/styled";
import styles from "./NotFound.module.css";

export const Main = styled("section", styles.main, "NotFound.Main");
export const Code = styled("p", styles.code, "NotFound.Code");
export const Title = styled("h1", styles.title, "NotFound.Title");
export const HomeLink = styled(Link, styles.homeLink, "NotFound.HomeLink");
