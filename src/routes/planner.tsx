import { createFileRoute } from "@tanstack/react-router";

import { AiToolPanel } from "@/components/AiToolPanel";
import { DashboardShell } from "@/components/DashboardShell";

export const Route = createFileRoute("/planner")({
  head: () => ({
    meta: [
      { title: "AI Task Planner — safe-SPACE AI" },
      {
        name: "description",
        content:
          "Describe a goal and get an ordered plan with milestones, tasks, timeframes and a gentle first step.",
      },
      { property: "og:title", content: "AI Task Planner — safe-SPACE AI" },
      {
        property: "og:description",
        content: "Turn any goal into milestones, tasks and realistic timeframes.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PlannerPage,
});

function PlannerPage() {
  return (
    <DashboardShell title="AI Task Planner" description="Goals broken into calm, doable steps">
      <AiToolPanel
        mode="planner"
        inputLabel="What are you working towards?"
        placeholder="e.g. Launch my portfolio site in 3 weeks while working full time…"
        submitLabel="Build my plan"
      />
    </DashboardShell>
  );
}
