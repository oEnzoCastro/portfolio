/**
 * Colour contrast as defined by WCAG 2.x.
 * https://www.w3.org/TR/WCAG22/#dfn-contrast-ratio
 *
 * The ratio goes from 1 (same colour) to 21 (black on white).
 * WCAG AA asks for at least 4.5 for normal text and 3 for large text
 * and graphics.
 */

export const WCAG_AA_TEXT = 4.5;
export const WCAG_AA_LARGE = 3;

type Rgb = [number, number, number];

/** "#1a1a18" or "#fff" -> [26, 26, 24]. Throws on anything else. */
export function hexToRgb(hex: string): Rgb {
  const match = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(hex.trim());
  if (!match) {
    throw new Error(`Invalid hex colour: "${hex}"`);
  }

  let digits = match[1];
  if (digits.length === 3) {
    digits = digits
      .split("")
      .map((d) => d + d)
      .join("");
  }

  return [0, 2, 4].map((i) => parseInt(digits.slice(i, i + 2), 16)) as Rgb;
}

/**
 * How bright a colour looks to the human eye, from 0 (black) to 1 (white).
 * Each channel is converted from sRGB to linear light, then weighted:
 * the eye is most sensitive to green and least to blue.
 */
export function relativeLuminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex).map((channel) => {
    const c = channel / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** Contrast ratio between two colours. The order does not matter. */
export function contrastRatio(a: string, b: string): number {
  const la = relativeLuminance(a);
  const lb = relativeLuminance(b);
  const lighter = Math.max(la, lb);
  const darker = Math.min(la, lb);

  return (lighter + 0.05) / (darker + 0.05);
}
