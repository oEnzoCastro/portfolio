import { Logo } from "@/shared/components/Logo/Logo";
import { ThemeToggle } from "@/shared/components/Header/components/ThemeToggle/ThemeToggle";
import {
  Actions,
  LogoContainer,
  Nav,
  NavLink,
  Root,
} from "./styles/Header.styled";
import { LanguageSwitch } from "@/shared/components/Header/components/LanguageSwitch/LanguageSwitch";

export function Header() {
  return (
    <Root>
      <LogoContainer href="/">
        <Logo />
      </LogoContainer>
      <Nav>
        <NavLink href="#work">Work</NavLink>
        <NavLink href="#about">About</NavLink>
        <NavLink href="#experience">Experience</NavLink>
        <NavLink href="#contact">Contact</NavLink>
      </Nav>
      <Actions>
        <LanguageSwitch />
        <ThemeToggle />
      </Actions>
    </Root>
  );
}
