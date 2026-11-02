"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Root } from "./styles/NavLink.styled";

type NavLinkProps = {
  href: string;
  children: ReactNode;
};

/** A main-menu link that marks itself as the current page. */
export function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname();
  // Exact match for now; once there are sub-pages (/pt/work/ai-workflow),
  // also match paths that start with `${href}/`.
  const current = pathname === href ? "page" : undefined;

  return (
    <Root href={href} aria-current={current}>
      {children}
    </Root>
  );
}
