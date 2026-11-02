import Link from "next/link";
import { styled } from "@/lib/styled";
import styles from "./Header.module.css";

export const Root = styled("header", styles.root, "Header.Root");
export const Nav = styled("nav", styles.nav, "Header.Nav");
export const NavLink = styled(Link, styles.navLink, "Header.NavLink");
export const Actions = styled("div", styles.actions, "Header.Actions");
export const LogoContainer = styled(Link, styles.logoContainer, "Header.LogoContainer");
