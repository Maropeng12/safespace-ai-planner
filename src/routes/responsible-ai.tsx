import { createFileRoute } from "@tanstack/react-router";

import { AiDisclaimer } from "@/components/AiDisclaimer";
import { DashboardShell } from "@/components/DashboardShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/responsible-ai")({
  head: () => ({
    meta: [
      { title: "Responsible AI — safe-SPACE AI" },
      {
        name: "description",
        content:
          "How safe-SPACE AI uses AI responsibly: limitations, privacy, and when to seek human support.",
      },
      { property: "og:title", content: "Responsible AI — safe-SPACE AI" },
      {
        property: "og:description",
        content: "Our commitments on AI limitations, privacy and human support.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ResponsibleAiPage,
});

const SECTIONS = [
  {
    title: "What the AI can do",
    body: "It suggests plans, orders tasks and offers gentle reflections. It is a helper for everyday organization, nothing more.",
  },
  {
    title: "What it cannot do",
    body: "It is not a therapist, doctor, lawyer or financial adviser. Responses can be incomplete or wrong, so please check anything important yourself.",
  },
  {
    title: "Your data",
    body: "Tasks are stored locally in your browser. Prompts are sent to the AI provider only to generate a response and are not used to train models.",
  },
  {
    title: "If you need real support",
    body: "If you are in distress or in danger, please contact a qualified professional or your local emergency service. A human should always be your first call.",
  },
];

function ResponsibleAiPage() {
  return (
    <DashboardShell title="Responsible AI" description="Our commitments and limitations">
      <AiDisclaimer />
      <div className="grid gap-4 sm:grid-cols-2">
        {SECTIONS.map((s) => (
          <Card key={s.title} className="border border-border/60 bg-card/80">
            <CardHeader>
              <CardTitle className="text-base">{s.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardShell>
  );
}
