import type { WorkMeta } from "@/lib/work/meta";

export const meta = {
  slug: "making-of-this-site",
  order: 3,
  title: "Making of this site",
  areas: ["web"],
  stack: ["Next.js", "Brand", "Vitest"],
  featured: true,
  highlight: {
    type: "metric",
    value: "EN ⇄ PT",
    caption: "Brand, type and the decisions behind them",
  },
  role: "Design and development",
  period: "2026",
  draft: true,
} satisfies WorkMeta;

export default function Content() {
  return <p>Draft: the case study text is still being written (WORK-07).</p>;
}
