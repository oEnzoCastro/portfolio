/**
 * Colours exist only as tokens. Component styles (*.module.css)
 * must use var(--color-...), never a hex value.
 */
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it, expect } from "vitest";

const SRC = fileURLToPath(new URL("..", import.meta.url));
const HEX = /#[0-9a-f]{3,8}\b/i;

function findHexInModules(root: string): string[] {
  const files = readdirSync(root, { recursive: true, encoding: "utf8" }).filter(
    (file) => file.endsWith(".module.css"),
  );

  return files.flatMap((file) =>
    readFileSync(join(root, file), "utf8")
      .split("\n")
      .flatMap((line, i) =>
        HEX.test(line) ? [`${file}:${i + 1}  ${line.trim()}`] : [],
      ),
  );
}

describe("component styles", () => {
  it("use colour tokens instead of hex values", () => {
    const offenders = findHexInModules(SRC);
    expect(offenders, `hex colours found:\n${offenders.join("\n")}`).toEqual(
      [],
    );
  });
});
