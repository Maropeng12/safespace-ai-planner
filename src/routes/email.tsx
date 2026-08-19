import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { AiToolPanel } from "@/components/AiToolPanel";
import { DashboardShell } from "@/components/DashboardShell";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/email")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator — safe-SPACE AI" },
      {
        name: "description",
        content:
          "Turn rough notes into a polished, professional email with a tone you choose, powered by AI.",
      },
      { property: "og:title", content: "Smart Email Generator — safe-SPACE AI" },
      {
        property: "og:description",
        content: "Turn rough notes into a polished, professional email in seconds.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EmailPage,
});

const TONES = ["Friendly", "Professional", "Warm & gentle", "Direct", "Apologetic"];

function EmailPage() {
  const [tone, setTone] = useState("Professional");

  return (
    <DashboardShell title="Smart Email Generator" description="Notes in, polished email out">
      <AiToolPanel
        mode="email"
        inputLabel="What should the email say?"
        placeholder="e.g. Tell Sipho the report will be a day late, offer Thursday for a review call…"
        submitLabel="Generate email"
        buildPrompt={(raw) => `Tone: ${tone}.\n\nNotes:\n${raw}`}
        controls={
          <Select value={tone} onValueChange={setTone}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TONES.map((t) => (
                <SelectItem key={t} value={t}>
                  {t} tone
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        }
      />
    </DashboardShell>
  );
}
