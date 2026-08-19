import { createFileRoute } from "@tanstack/react-router";

import { AiToolPanel } from "@/components/AiToolPanel";
import { DashboardShell } from "@/components/DashboardShell";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "AI Research Assistant — safe-SPACE AI" },
      {
        name: "description",
        content:
          "Explore any topic with a balanced overview: key points, perspectives, terminology and next questions.",
      },
      { property: "og:title", content: "AI Research Assistant — safe-SPACE AI" },
      {
        property: "og:description",
        content: "Balanced overviews, key points and next questions for any topic.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ResearchPage,
});

function ResearchPage() {
  return (
    <DashboardShell
      title="AI Research Assistant"
      description="Balanced overviews and next questions"
    >
      <AiToolPanel
        mode="research"
        inputLabel="What would you like to explore?"
        placeholder="e.g. How do small teams approach sustainable packaging?"
        submitLabel="Research this"
        rows={8}
      />
    </DashboardShell>
  );
}
