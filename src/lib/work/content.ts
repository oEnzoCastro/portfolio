import { AREAS, BLOCK_TYPES, type WorkContent } from "./meta";

type Problems = string[];
type Data = Record<string, unknown>;

const isData = (value: unknown): value is Data =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isText = (value: unknown): value is string =>
  typeof value === "string" && value.trim() !== "";

const ID = /^[a-z0-9]+(-[a-z0-9]+)*$/;

function checkMeta(meta: unknown, slug: string, problems: Problems) {
  if (!isData(meta)) {
    problems.push('"meta" is missing');
    return;
  }
  const text = (field: string) => {
    if (!isText(meta[field])) problems.push(`"meta.${field}" must be text`);
  };

  text("slug");
  if (isText(meta.slug) && meta.slug !== slug) {
    problems.push(`"meta.slug" is "${meta.slug}" but the folder is "${slug}"`);
  }
  if (typeof meta.order !== "number") problems.push('"meta.order" must be a number');
  text("title");
  text("role");
  text("period");

  const areas = meta.areas;
  if (!Array.isArray(areas) || areas.length === 0) {
    problems.push(`"meta.areas" must list some of: ${AREAS.join(", ")}`);
  } else {
    for (const area of areas) {
      if (!(AREAS as readonly unknown[]).includes(area)) {
        problems.push(`"meta.areas" has "${String(area)}"; use: ${AREAS.join(", ")}`);
      }
    }
  }

  if (!Array.isArray(meta.stack) || meta.stack.length === 0 || !meta.stack.every(isText)) {
    problems.push('"meta.stack" must list at least one technology');
  }
  if (typeof meta.featured !== "boolean") problems.push('"meta.featured" must be true or false');
  if (meta.draft !== undefined && typeof meta.draft !== "boolean") {
    problems.push('"meta.draft" must be true or false');
  }

  const highlight = meta.highlight;
  if (!isData(highlight)) {
    problems.push('"meta.highlight" is missing');
  } else if (highlight.type === "metric") {
    if (!isText(highlight.value)) problems.push('"meta.highlight.value" must be text');
    if (!isText(highlight.caption)) problems.push('"meta.highlight.caption" must be text');
  } else if (highlight.type === "image") {
    if (!isText(highlight.src)) problems.push('"meta.highlight.src" must be a path');
    if (!isText(highlight.alt)) problems.push('"meta.highlight.alt" must describe the image');
  } else {
    problems.push('"meta.highlight.type" must be "metric" or "image"');
  }
}

function checkBlock(block: unknown, at: string, problems: Problems) {
  if (!isData(block) || !(BLOCK_TYPES as readonly unknown[]).includes(block.type)) {
    problems.push(`${at}.type must be one of: ${BLOCK_TYPES.join(", ")}`);
    return;
  }
  if (block.type === "paragraph" && !isText(block.text)) {
    problems.push(`${at}.text must be text`);
  }
  if (block.type === "list") {
    if (typeof block.ordered !== "boolean") problems.push(`${at}.ordered must be true or false`);
    if (!Array.isArray(block.items) || block.items.length === 0 || !block.items.every(isText)) {
      problems.push(`${at}.items must list text`);
    }
  }
  if (block.type === "steps") {
    const items = block.items;
    if (
      !Array.isArray(items) ||
      items.length === 0 ||
      !items.every((item) => isData(item) && isText(item.label) && isText(item.text))
    ) {
      problems.push(`${at}.items must list { label, text }`);
    }
  }
}

function checkSections(sections: unknown, problems: Problems) {
  if (!Array.isArray(sections) || sections.length === 0) {
    problems.push('"sections" must list at least one section');
    return;
  }
  const ids = new Set<string>();
  sections.forEach((section: unknown, index) => {
    const at = `"sections[${index}]"`;
    if (!isData(section)) {
      problems.push(`${at} must be { id, title, blocks }`);
      return;
    }
    if (!isText(section.id) || !ID.test(section.id)) {
      problems.push(`${at}.id must be lowercase words joined by hyphens`);
    } else if (ids.has(section.id)) {
      problems.push(`${at}.id "${section.id}" is used twice`);
    } else {
      ids.add(section.id);
    }
    if (!isText(section.title)) problems.push(`${at}.title must be text`);
    if (!Array.isArray(section.blocks) || section.blocks.length === 0) {
      problems.push(`${at}.blocks must list at least one block`);
    } else {
      section.blocks.forEach((block: unknown, blockIndex) =>
        checkBlock(block, `${at}.blocks[${blockIndex}]`, problems),
      );
    }
  });
}

/**
 * Checks one case study JSON and returns it typed. Throws one error listing
 * every problem with the file and the field, so the build stops there.
 */
export function parseWorkContent(raw: unknown, file: string, slug: string): WorkContent {
  const problems: Problems = [];
  const data = isData(raw) ? raw : {};
  checkMeta(data.meta, slug, problems);
  checkSections(data.sections, problems);

  if (problems.length > 0) {
    throw new Error(
      `Invalid case study ${file}:\n${problems.map((p) => `  - ${p}`).join("\n")}`,
    );
  }

  const content = data as unknown as WorkContent;
  return { ...content, meta: { ...content.meta, draft: content.meta.draft ?? false } };
}
