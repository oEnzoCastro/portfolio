/**
 * The data of a piece of work (WORK-02), written as
 * `export const meta = { … } satisfies WorkMeta` in each content file.
 * TypeScript checks it while you write; parseWorkMeta checks it again when
 * the site builds (including that the slug matches the folder).
 */

export const AREAS = ["mobile", "web", "backend", "ai"] as const;
export type Area = (typeof AREAS)[number];

/**
 * The visual on top of a card. A metric is text (translatable, accessible,
 * follows the theme); an image is an SVG drawn with currentColor, shown in a
 * fixed 16:10 box.
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

type Record_ = Record<string, unknown>;

const isRecord = (value: unknown): value is Record_ =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isText = (value: unknown): value is string =>
  typeof value === "string" && value.trim() !== "";

/**
 * Checks the `meta` export of one content file and returns it typed. Throws one
 * error listing every problem, each naming the file and the field, so a bad
 * file fails the build with a clear message.
 */
export function parseWorkMeta(
  raw: unknown,
  file: string,
  expectedSlug: string,
): WorkMeta {
  const problems: string[] = [];
  const meta: Record_ = isRecord(raw) ? raw : {};
  if (!isRecord(raw)) {
    problems.push('missing `export const meta = { … }`');
  }

  const text = (field: string) => {
    if (!isText(meta[field])) problems.push(`"${field}" must be non-empty text`);
  };

  text("slug");
  if (isText(meta.slug) && meta.slug !== expectedSlug) {
    problems.push(`"slug" is "${meta.slug}" but the folder is "${expectedSlug}"`);
  }
  if (typeof meta.order !== "number" || !Number.isFinite(meta.order)) {
    problems.push('"order" must be a number');
  }
  text("title");
  text("role");
  text("period");

  const areas = meta.areas;
  if (!Array.isArray(areas) || areas.length === 0) {
    problems.push(`"areas" must list at least one of: ${AREAS.join(", ")}`);
  } else {
    for (const area of areas) {
      if (!(AREAS as readonly unknown[]).includes(area)) {
        problems.push(`"areas" has "${String(area)}"; use: ${AREAS.join(", ")}`);
      }
    }
  }

  const stack = meta.stack;
  if (!Array.isArray(stack) || stack.length === 0 || !stack.every(isText)) {
    problems.push('"stack" must list at least one technology');
  }

  if (typeof meta.featured !== "boolean") {
    problems.push('"featured" must be true or false');
  }
  if (meta.draft !== undefined && typeof meta.draft !== "boolean") {
    problems.push('"draft" must be true or false');
  }

  const highlight = meta.highlight;
  if (!isRecord(highlight)) {
    problems.push('"highlight" is missing');
  } else if (highlight.type === "metric") {
    if (!isText(highlight.value)) problems.push('"highlight.value" must be text');
    if (!isText(highlight.caption)) problems.push('"highlight.caption" must be text');
  } else if (highlight.type === "image") {
    if (!isText(highlight.src)) problems.push('"highlight.src" must be a path');
    if (!isText(highlight.alt)) problems.push('"highlight.alt" must describe the image');
  } else {
    problems.push('"highlight.type" must be "metric" or "image"');
  }

  if (problems.length > 0) {
    throw new Error(
      `Invalid work file ${file}:\n${problems.map((p) => `  - ${p}`).join("\n")}`,
    );
  }

  return { draft: false, ...(meta as Omit<WorkMeta, "draft">) } as WorkMeta;
}
