import type { Block } from "@/lib/work/meta";
import { Inline } from "./Inline";
import {
  OrderedList,
  Root,
  Step,
  StepLabel,
  Steps,
  UnorderedList,
} from "./styles/Blocks.styled";

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p>
          <Inline text={block.text} />
        </p>
      );
    case "list": {
      const List = block.ordered ? OrderedList : UnorderedList;
      return (
        <List>
          {block.items.map((item, index) => (
            <li key={index}>
              <Inline text={item} />
            </li>
          ))}
        </List>
      );
    }
    case "steps":
      return (
        <Steps>
          {block.items.map((item, index) => (
            <Step key={index}>
              <StepLabel>
                {String(index + 1).padStart(2, "0")} · {item.label}
              </StepLabel>
              <span>
                <Inline text={item.text} />
              </span>
            </Step>
          ))}
        </Steps>
      );
  }
}

/**
 * Renders the blocks of a case study section. Each block type from
 * src/lib/work/meta.ts has its view here; adding a type means adding it to
 * the Block type, the checker (src/lib/work/content.ts) and this switch.
 */
export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <Root>
      {blocks.map((block, index) => (
        <BlockView key={index} block={block} />
      ))}
    </Root>
  );
}
