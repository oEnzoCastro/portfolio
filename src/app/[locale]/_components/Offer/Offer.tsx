import { getDictionary } from "@/i18n/dictionary";
import {
  HiddenTitle,
  Initial,
  Item,
  Name,
  Root,
  Text,
} from "./styles/Offer.styled";

const AREAS = ["mobile", "web", "backend"] as const;

/** HOME-03: what Enzo delivers, one line per area. */
export async function Offer() {
  const { home } = await getDictionary();

  return (
    <Root aria-labelledby="offer-title">
      <HiddenTitle id="offer-title">{home.offerTitle}</HiddenTitle>
      {AREAS.map((area) => {
        const { name, text } = home.offer[area];
        return (
          <Item key={area}>
            <Initial aria-hidden="true">{name[0]}</Initial>
            <div>
              <Name>{name}</Name>
              <Text>{text}</Text>
            </div>
          </Item>
        );
      })}
    </Root>
  );
}
