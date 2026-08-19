import { createFileRoute } from "@tanstack/react-router";

import { AiToolPanel } from "@/components/AiToolPanel";
import { DashboardShell } from "@/components/DashboardShell";

export const Route = createFileRoute("/notes")({
  head: () => ({
    meta: [
      { title: "Meeting Notes Summarizer — safe-SPACE AI" },
      {
        name: "description",
        content:
          "Paste raw meeting notes or a transcript and get a summary, decisions, action items and open questions.",
      },
      { property: "og:title", content: "Meeting Notes Summarizer — safe-SPACE AI" },
      {
        property: "og:description",
        content: "Summaries, decisions and action items from messy meeting notes.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: NotesPage,
});

function NotesPage() {
  return (
    <DashboardShell
      title="Meeting Notes Summarizer"
      description="Summary, decisions, action items and open questions"
    >
      <AiToolPanel
        mode="notes"
        inputLabel="Paste your notes or transcript"
        placeholder="Paste meeting notes here…"
        submitLabel="Summarize notes"
        rows={14}
      />
    </DashboardShell>
  );
}
