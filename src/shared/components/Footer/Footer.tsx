import { getDictionary } from "@/i18n/dictionary";
import { SITE } from "@/lib/site";
import { getCurrentYear } from "@/lib/year";
import { Hint, Link, Links, Root } from "./styles/Footer.styled";

export async function Footer() {
  const dictionary = await getDictionary();
  const year = await getCurrentYear();
  const { footer } = dictionary;

  return (
    <Root>
      <p>{footer.copyright.replace("{year}", String(year))}</p>
      <nav aria-label={footer.label}>
        <Links>
          <li>
            <Link href={`mailto:${SITE.email}`}>{footer.email}</Link>
          </li>
          <li>
            <Link href={SITE.github}>
              {footer.github} <Hint>{footer.external}</Hint>
            </Link>
          </li>
          <li>
            <Link href={SITE.linkedin}>
              {footer.linkedin} <Hint>{footer.external}</Hint>
            </Link>
          </li>
        </Links>
      </nav>
    </Root>
  );
}
