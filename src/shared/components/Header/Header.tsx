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
import { getDictionary } from "@/i18n/dictionary";

export async function Header() {
  const translate = await getDictionary();

  return (
    <Root>
      <LogoContainer href="/">
        <Logo />
      </LogoContainer>
      <Nav>
        <NavLink href="#work">{translate.nav.work}</NavLink>
        <NavLink href="#about">{translate.nav.about}</NavLink>
        <NavLink href="#experience">{translate.nav.experience}</NavLink>
        <NavLink href="#contact">{translate.nav.contact}</NavLink>
      </Nav>
      <Actions>
        <LanguageSwitch />
        <ThemeToggle />
      </Actions>
    </Root>
  );
}
