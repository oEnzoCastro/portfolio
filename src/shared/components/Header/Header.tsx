import { Logo } from "@/shared/components/Logo/Logo";
import { ThemeToggle } from "@/shared/components/Header/components/ThemeToggle/ThemeToggle";
import { LanguageSwitch } from "@/shared/components/Header/components/LanguageSwitch/LanguageSwitch";
import { getCurrentLocale, getDictionary } from "@/i18n/dictionary";
import { NavLink } from "@/shared/components/Header/components/NavLink/NavLink";
import { Actions, LogoContainer, Nav, Root } from "./styles/Header.styled";

export async function Header() {
  const locale = await getCurrentLocale();
  const dictionary = await getDictionary();

  return (
    <Root>
      <LogoContainer href={`/${locale}`} aria-label={dictionary.nav.home}>
        <Logo />
      </LogoContainer>
      <Nav aria-label={dictionary.nav.label}>
        <NavLink href={`/${locale}/work`}>
          {dictionary.nav.work}
        </NavLink>
        <NavLink href={`/${locale}/about`}>
          {dictionary.nav.about}
        </NavLink>
        <NavLink href={`/${locale}/experience`}>
          {dictionary.nav.experience}
        </NavLink>
        <NavLink href={`/${locale}/contact`}>
          {dictionary.nav.contact}
        </NavLink>
      </Nav>
      <Actions>
        <LanguageSwitch />
        <ThemeToggle labels={dictionary.theme} />
      </Actions>
    </Root>
  );
}
