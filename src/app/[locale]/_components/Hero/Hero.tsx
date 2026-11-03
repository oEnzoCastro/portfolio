import { getCurrentLocale, getDictionary } from "@/i18n/dictionary";
import { WORK_SECTION_ID } from "../SelectedWork/SelectedWork";
import {
  Action,
  Actions,
  FileAction,
  Lines,
  Mark,
  MarkSvg,
  Name,
  Role,
  Root,
  Tagline,
  Text,
} from "./styles/Hero.styled";

/** HOME-01 and HOME-02: who Enzo is, and the two main actions. */
export async function Hero() {
  const locale = await getCurrentLocale();
  const { home } = await getDictionary();

  return (
    <Root>
      <Text>
        <Name>
          {/* The space keeps "Enzo Castro" as two words for screen readers. */}
          Enzo{" "}
          <br />
          Castro
        </Name>
        <Lines>
          <Tagline>{home.tagline}</Tagline>
          <Role>{home.role}</Role>
        </Lines>
        <Actions>
          <Action href={`#${WORK_SECTION_ID}`} data-primary>
            {home.seeWork} <span aria-hidden="true">→</span>
          </Action>
          {/* The PDFs live in public/cv/, one per locale. */}
          <FileAction href={`/cv/enzo-castro-${locale}.pdf`} download>
            {home.downloadCv}
          </FileAction>
        </Actions>
      </Text>
      <Mark>
        <MarkSvg variant="vinyl" />
      </Mark>
    </Root>
  );
}
