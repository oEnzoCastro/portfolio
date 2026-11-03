import type { WorkMeta } from "@/lib/work/meta";

export const meta = {
  slug: "deep-link-scroll",
  order: 2,
  title: "Deep-link scrolling in React Native",
  areas: ["mobile"],
  stack: ["React Native", "TypeScript", "Jest"],
  featured: true,
  highlight: {
    type: "metric",
    value: "#anchor",
    caption: "Scroll to any section from a link",
  },
  role: "Software Developer Intern, dti digital",
  period: "2026",
  draft: true,
} satisfies WorkMeta;

export default function Content() {
  return <p>Draft: the case study text is still being written (WORK-06).</p>;
}
