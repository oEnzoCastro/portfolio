/**
 * The only formatting allowed inside text in content JSON: **bold** and
 * [links](https://…). Everything else is plain text, so writing a case study
 * stays close to writing a message.
 */
export type InlineToken =
  | { type: "text"; text: string }
  | { type: "strong"; text: string }
  | { type: "link"; text: string; href: string };

const PATTERN = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g;

export function parseInline(source: string): InlineToken[] {
  const tokens: InlineToken[] = [];
  let last = 0;

  for (const match of source.matchAll(PATTERN)) {
    const index = match.index;
    if (index > last) {
      tokens.push({ type: "text", text: source.slice(last, index) });
    }
    if (match[1] !== undefined) {
      tokens.push({ type: "strong", text: match[1] });
    } else {
      tokens.push({ type: "link", text: match[2], href: match[3] });
    }
    last = index + match[0].length;
  }

  if (last < source.length) {
    tokens.push({ type: "text", text: source.slice(last) });
  }
  return tokens;
}
