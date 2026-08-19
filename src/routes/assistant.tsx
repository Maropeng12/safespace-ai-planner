import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation } from "@tanstack/react-query";
import { Loader2, Send, Sparkles } from "lucide-react";

import { AiDisclaimer } from "@/components/AiDisclaimer";
import { DashboardShell } from "@/components/DashboardShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { askAssistant } from "@/lib/ai.functions";

export const Route = createFileRoute("/assistant")({
  head: () => ({
    meta: [
      { title: "AI Assistant — safe-SPACE AI" },
      {
        name: "description",
        content:
          "Ask safe-SPACE AI to plan, prioritize or reflect. Gentle AI-generated guidance for your day.",
      },
      { property: "og:title", content: "AI Assistant — safe-SPACE AI" },
      {
        property: "og:description",
        content: "Gentle AI-generated guidance to plan, prioritize and reflect.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AssistantPage,
});

const MODES = [
  { value: "plan", label: "Make a plan" },
  { value: "prioritize", label: "Prioritize my tasks" },
  { value: "reflect", label: "Gentle reflection" },
] as const;

function AssistantPage() {
  const [prompt, setPrompt] = useState("");
  const [mode, setMode] = useState<"plan" | "prioritize" | "reflect">("plan");
  const ask = useServerFn(askAssistant);

  const mutation = useMutation({
    mutationFn: (input: { prompt: string; mode: typeof mode }) => ask({ data: input }),
  });

  return (
    <DashboardShell title="AI Assistant" description="Input on the left, response on the right">
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border border-border/60 bg-card/80 shadow-lg shadow-primary/5">
          <CardHeader>
            <CardTitle className="text-base">Your input</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select value={mode} onValueChange={(v) => setMode(v as typeof mode)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {MODES.map((m) => (
                  <SelectItem key={m.value} value={m.value}>
                    {m.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={8}
              placeholder="Tell me what's on your plate today…"
              className="resize-none"
            />
            <Button
              className="w-full"
              disabled={!prompt.trim() || mutation.isPending}
              onClick={() => mutation.mutate({ prompt: prompt.trim(), mode })}
            >
              {mutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              {mutation.isPending ? "Thinking…" : "Ask safe-SPACE AI"}
            </Button>
          </CardContent>
        </Card>

        <Card className="border border-border/60 bg-card/80 shadow-lg shadow-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Sparkles className="h-4 w-4 text-primary" />
              AI-generated response
            </CardTitle>
          </CardHeader>
          <CardContent>
            {mutation.isPending && (
              <p className="text-sm text-muted-foreground">Composing something gentle…</p>
            )}
            {mutation.isError && (
              <p className="text-sm text-destructive">
                {(mutation.error as Error).message ?? "Something went wrong."}
              </p>
            )}
            {!mutation.isPending && !mutation.data && !mutation.isError && (
              <p className="text-sm text-muted-foreground">
                Your response will appear here. Nothing is shared with anyone else.
              </p>
            )}
            {mutation.data && (
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                {mutation.data.text}
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      <AiDisclaimer />
    </DashboardShell>
  );
}
