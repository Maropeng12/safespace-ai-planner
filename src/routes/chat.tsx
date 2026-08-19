import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation } from "@tanstack/react-query";
import { Loader2, Send, Sparkles } from "lucide-react";

import { AiDisclaimer } from "@/components/AiDisclaimer";
import { DashboardShell } from "@/components/DashboardShell";
import { Markdown } from "@/components/Markdown";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { chatWithAssistant } from "@/lib/ai.functions";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "AI Chatbot — safe-SPACE AI" },
      {
        name: "description",
        content:
          "Chat with safe-SPACE AI for calm help with planning, writing and thinking things through.",
      },
      { property: "og:title", content: "AI Chatbot — safe-SPACE AI" },
      {
        property: "og:description",
        content: "A calm conversational assistant for planning, writing and reflecting.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ChatPage,
});

type Message = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "Help me plan a calm morning routine",
  "Draft a polite follow-up message",
  "I feel overwhelmed — where do I start?",
];

function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const chat = useServerFn(chatWithAssistant);
  const endRef = useRef<HTMLDivElement>(null);

  const mutation = useMutation({
    mutationFn: (history: Message[]) => chat({ data: { messages: history } }),
    onSuccess: (res) =>
      setMessages((prev) => [...prev, { role: "assistant", content: res.text }]),
  });

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, mutation.isPending]);

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || mutation.isPending) return;
    const next: Message[] = [...messages, { role: "user", content: trimmed }];
    setMessages(next);
    setInput("");
    mutation.mutate(next);
  };

  return (
    <DashboardShell title="AI Chatbot" description="A calm conversation, whenever you need it">
      <Card className="border border-border/60 bg-card/80 shadow-lg shadow-primary/5">
        <CardContent className="flex h-[60vh] min-h-[420px] flex-col gap-4 p-4 sm:p-6">
          <div className="flex-1 space-y-4 overflow-y-auto pr-1">
            {messages.length === 0 && (
              <div className="space-y-4 py-6 text-center">
                <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-primary/15 text-primary">
                  <Sparkles className="h-6 w-6" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Ask me anything — planning, writing, or untangling a busy day.
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {SUGGESTIONS.map((s) => (
                    <Button key={s} size="sm" variant="secondary" onClick={() => send(s)}>
                      {s}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] min-w-0 rounded-2xl px-4 py-3 ${
                    m.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted/60 text-foreground"
                  }`}
                >
                  {m.role === "user" ? (
                    <p className="whitespace-pre-wrap text-sm leading-relaxed">{m.content}</p>
                  ) : (
                    <Markdown>{m.content}</Markdown>
                  )}
                </div>
              </div>
            ))}

            {mutation.isPending && (
              <p className="text-sm text-muted-foreground">safe-SPACE AI is thinking…</p>
            )}
            {mutation.isError && (
              <p className="text-sm text-destructive">
                {(mutation.error as Error).message || "Something went wrong."}
              </p>
            )}
            <div ref={endRef} />
          </div>

          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-2 border-t border-border/60 pt-4">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send(input);
                }
              }}
              rows={2}
              placeholder="Type a message…"
              className="resize-none"
            />
            <Button
              className="shrink-0"
              disabled={!input.trim() || mutation.isPending}
              onClick={() => send(input)}
            >
              {mutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              <span className="hidden sm:inline">Send</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <AiDisclaimer />
    </DashboardShell>
  );
}
