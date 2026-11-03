/**
 * The shape of a piece of work (WORK-02). Each case study is a JSON file per
 * locale, src/content/work/<slug>/<locale>.json, checked by parseWorkContent
 * (./content.ts) when it is loaded, so a mistake fails the build with the
 * file and the field.
 */

export const AREAS = ["mobile", "web", "backend", "ai"] as const;
export type Area = (typeof AREAS)[number];

/**
 * The visual on top of a card. A metric is text (translatable, accessible,
 * follows the theme); an image is an SVG used as a mask over currentColor,
 * shown in a fixed 16:10 box.
 */
export type Highlight =
  | { type: "metric"; value: string; caption: string }
  | { type: "image"; src: string; alt: string };

export type WorkMeta = {
  slug: string;
  /** Position in lists, lowest first. */
  order: number;
  title: string;
  areas: Area[];
  /** Cards show the first three. */
  stack: string[];
  /** Shown on the Home page (at most three are used). */
  featured: boolean;
  highlight: Highlight;
  role: string;
  period: string;
  /** Drafts are left out of production builds. */
  draft: boolean;
};

/**
 * A piece of the case study text. Text fields accept **bold** and
 * [links](url) (see src/lib/inline.ts). Each type has a component in
 * src/shared/components/Blocks.
 */
export type Block =
  | { type: "paragraph"; text: string }
  | { type: "list"; ordered: boolean; items: string[] }
  /** Numbered steps shown side by side, e.g. Red / Green / Refactor. */
  | { type: "steps"; items: { label: string; text: string }[] };

export const BLOCK_TYPES = ["paragraph", "list", "steps"] as const;

/** One part of a case study: an h2 and its blocks. */
export type WorkSection = {
  /** Lowercase words joined by hyphens; unique within the case study. */
  id: string;
  title: string;
  blocks: Block[];
};

/** One content file. */
export type WorkContent = {
  meta: WorkMeta;
  sections: WorkSection[];
};
