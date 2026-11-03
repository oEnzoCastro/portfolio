import { parseInline } from "@/lib/inline";
import { Link } from "./styles/Blocks.styled";

/** Text with **bold** and [links](url), from content JSON. */
export function Inline({ text }: { text: string }) {
  return parseInline(text).map((token, index) => {
    if (token.type === "strong") return <strong key={index}>{token.text}</strong>;
    if (token.type === "link") {
      return (
        <Link key={index} href={token.href}>
          {token.text}
        </Link>
      );
    }
    return token.text;
  });
}
