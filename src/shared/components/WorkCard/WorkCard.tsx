import type { CSSProperties } from "react";
import type { Highlight as HighlightData } from "@/lib/work/meta";
import type { WorkEntry } from "@/lib/work/work";
import {
  Arrow,
  Body,
  Caption,
  Heading,
  Metric,
  Picture,
  Root,
  Tag,
  Tags,
  Title,
  Visual,
} from "./styles/WorkCard.styled";

type WorkCardProps = {
  work: WorkEntry;
  href: string;
  size?: "small" | "large";
};

/** Cards show at most this many stack tags. */
const MAX_TAGS = 3;

function Highlight({ highlight }: { highlight: HighlightData }) {
  if (highlight.type === "metric") {
    return (
      <>
        <Metric style={{ "--chars": [...highlight.value].length } as CSSProperties}>
          {highlight.value}
        </Metric>
        <Caption>{highlight.caption}</Caption>
      </>
    );
  }
  const style = { maskImage: `url(${highlight.src})` } as CSSProperties;
  return <Picture role="img" aria-label={highlight.alt} style={style} />;
}

/**
 * A piece of work as a card (HOME-04, WORK-01): highlight on top, then the
 * title, an arrow and up to three stack tags. The whole card is one link.
 */
export function WorkCard({ work, href, size = "small" }: WorkCardProps) {
  const { meta } = work;
  const isMetric = meta.highlight.type === "metric";

  return (
    <Root
      href={href}
      // Loads the case (including its URL data) ahead of the click, so the
      // navigation is instant (see src/app/[locale]/work/[slug]/page.tsx).
      prefetch
      data-size={size}
      // Not translated yet: the card shows English inside a Portuguese page.
      lang={work.isFallback ? work.locale : undefined}
    >
      {/* A metric is decoration (the title says what it is); an image keeps its alt. */}
      <Visual aria-hidden={isMetric || undefined}>
        <Highlight highlight={meta.highlight} />
      </Visual>
      <Body>
        <Heading>
          <Title>{meta.title}</Title>
          <Arrow aria-hidden="true">↗</Arrow>
        </Heading>
        <Tags>
          {meta.stack.slice(0, MAX_TAGS).map((tech) => (
            <Tag key={tech}>{tech}</Tag>
          ))}
        </Tags>
      </Body>
    </Root>
  );
}
