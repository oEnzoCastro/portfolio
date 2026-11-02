import { describe, expect, it } from "vitest";
import en from "@/i18n/messages/en.json";
import pt from "@/i18n/messages/pt.json";

/** Every key path in a nested object: { nav: { work } } → ["nav.work"]. */
function keys(value: object, prefix = ""): string[] {
  return Object.entries(value).flatMap(([key, child]) =>
    typeof child === "object" && child !== null
      ? keys(child, `${prefix}${key}.`)
      : [`${prefix}${key}`],
  );
}

/** Key paths whose text is empty or only spaces. */
function emptyTexts(value: object, prefix = ""): string[] {
  return Object.entries(value).flatMap(([key, child]) =>
    typeof child === "object" && child !== null
      ? emptyTexts(child, `${prefix}${key}.`)
      : typeof child === "string" && child.trim() === ""
        ? [`${prefix}${key}`]
        : [],
  );
}

describe("dictionaries (FND-06)", () => {
  it("have the same keys in English and Portuguese", () => {
    expect(keys(pt).sort()).toEqual(keys(en).sort());
  });

  it.each([
    ["en", en],
    ["pt", pt],
  ])("have no empty text in %s", (_, dictionary) => {
    expect(emptyTexts(dictionary)).toEqual([]);
  });
});
