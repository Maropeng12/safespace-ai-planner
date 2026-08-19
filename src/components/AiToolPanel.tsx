import { useState, type ReactNode } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useMutation } from "@tanstack/react-query";
import { Copy, Loader2, Send, Sparkles } from "lucide-react";
import { toast } from "sonner";

import { AiDisclaimer } from "@/components/AiDisclaimer";
import { Markdown } from "@/components/Markdown";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { askAssistant, type ToolKey } from "@/lib/ai.functions";

export function AiToolPanel({
  mode,
  inputLabel,
  placeholder,
  submitLabel,
  buildPrompt,
  controls,
  rows = 10,
}: {
  mode: ToolKey;
  inputLabel: string;
  placeholder: string;
  submitLabel: string;
  buildPrompt?: (raw: string) => string;
  controls?: ReactNode;
  rows?: number;
}) {
  const [input, setInput] = useState("");
  const ask = useServerFn(askAssistant);

  const mutation = useMutation({
    mutationFn: (prompt: string) => ask({ data: { prompt, mode } }),
  });

  return (
    <>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border border-border/60 bg-card/80 shadow-lg shadow-primary/5">
          <CardHeader>
            <CardTitle className="text-base">{inputLabel}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {controls}
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={rows}
              placeholder={placeholder}
              className="resize-none"
            />
            <Button
              className="w-full"
              disabled={!input.trim() || mutation.isPending}
              onClick={() =>
                mutation.mutate(buildPrompt ? buildPrompt(input.trim()) : input.trim())
              }
            >
              {mutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              {mutation.isPending ? "Thinking…" : submitLabel}
            </Button>
          </CardContent>
        </Card>

        <Card className="border border-border/60 bg-card/80 shadow-lg shadow-primary/5">
          <CardHeader className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2">
            <CardTitle className="flex min-w-0 items-center gap-2 text-base">
              <Sparkles className="h-4 w-4 shrink-0 text-primary" />
              <span className="truncate">AI-generated output</span>
            </CardTitle>
            {mutation.data && (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  void navigator.clipboard.writeText(mutation.data.text);
                  toast.success("Copied to clipboard");
                }}
              >
                <Copy className="h-4 w-4" />
                <span className="hidden sm:inline">Copy</span>
              </Button>
            )}
          </CardHeader>
          <CardContent>
            {mutation.isPending && (
              <p className="text-sm text-muted-foreground">Composing something gentle…</p>
            )}
            {mutation.isError && (
              <p className="text-sm text-destructive">
                {(mutation.error as Error).message || "Something went wrong."}
              </p>
            )}
            {!mutation.isPending && !mutation.data && !mutation.isError && (
              <p className="text-sm text-muted-foreground">
                Your result will appear here. Nothing is shared with anyone else.
              </p>
            )}
            {mutation.data && <Markdown>{mutation.data.text}</Markdown>}
          </CardContent>
        </Card>
      </div>

      <AiDisclaimer />
    </>
  );
}
