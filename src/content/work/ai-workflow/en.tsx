import type { WorkMeta } from "@/lib/work/meta";

export const meta = {
  slug: "ai-workflow",
  order: 1,
  title: "Rebuilding an AI development workflow",
  areas: ["backend", "ai"],
  stack: ["AI agents", "TDD", ".NET"],
  featured: true,
  highlight: {
    type: "metric",
    value: "-60%",
    caption: "Agent instructions · TDD · SDD",
  },
  role: "Software Developer Intern, dti digital",
  period: "2026",
  draft: false,
} satisfies WorkMeta;

export default function Content() {
  return (
    <>
      <h2>The problem</h2>
      <p>
        A spec-driven AI workflow had grown into around 500 lines of rules,
        hardcoded logic and no test discipline. The core flow was small;
        everything around it got in the way.
      </p>

      <h2>Where it started</h2>
      <p>
        On a previous team, I built quality gates (pre-commit, pre-push) and a
        “grill” step that checked each spec against the current codebase
        before implementation. Without knowing why a ticket had been blocked,
        it flagged the same missing backend data the team had found.
      </p>

      <h2>What I did</h2>
      <p>
        I audited the workflow against two reference implementations, removed
        what wasn’t pulling its weight, and introduced red/green/refactor:
      </p>
      <ol>
        <li>
          <strong>Red:</strong> acceptance criteria become behaviours and
          failing tests.
        </li>
        <li>
          <strong>Green:</strong> the smallest code that makes them pass.
        </li>
        <li>
          <strong>Refactor:</strong> clean it up with the tests as a safety
          net.
        </li>
      </ol>

      <h2>What I’d do differently</h2>
      <p>
        Split it into smaller pull requests and share a short proposal first.
        Next step: enforce TDD with a gate instead of an instruction.
      </p>
    </>
  );
}
