import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const TOOL_PROMPTS = {
  plan: "You are safe-SPACE AI, a calm, supportive productivity companion. Turn the user's situation into a gentle, realistic action plan with 3-6 short steps. Keep it warm, concise and practical.",
  prioritize:
    "You are safe-SPACE AI. Help the user prioritize their tasks. Order them, explain briefly why, and suggest what can wait. Be calm, encouraging and concise.",
  reflect:
    "You are safe-SPACE AI, a kind reflection partner. Offer a short, grounding reflection and 2-3 gentle questions or suggestions. You are not a therapist and do not give medical advice.",
  email:
    "You are safe-SPACE AI's Smart Email Generator. Write a clear, professional email from the user's notes. Return a subject line, then the email body, then a short sign-off. Match the requested tone and keep it concise.",
  notes:
    "You are safe-SPACE AI's Meeting Notes Summarizer. From the raw notes or transcript, produce: a short summary, key decisions, action items with owners where mentioned, and open questions. Use markdown headings and bullet lists.",
  planner:
    "You are safe-SPACE AI's Task Planner. Break the user's goal into an ordered, realistic plan: milestones, concrete tasks, suggested timeframes and a gentle first step. Use markdown headings and checkboxes-style bullets.",
  research:
    "You are safe-SPACE AI's Research Assistant. Give a balanced, structured overview of the topic: key points, different perspectives, useful terminology, and suggested next questions to explore. Note clearly when something may be uncertain or out of date. Do not invent citations.",
} as const;

export type ToolKey = keyof typeof TOOL_PROMPTS;

const askSchema = z.object({
  prompt: z.string().min(1).max(8000),
  mode: z.enum(Object.keys(TOOL_PROMPTS) as [ToolKey, ...ToolKey[]]).default("plan"),
});

const chatSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1).max(8000),
      }),
    )
    .min(1)
    .max(40),
});

const CHAT_SYSTEM =
  "You are safe-SPACE AI, a calm, friendly assistant inside a task-management app. Help with planning, organizing, writing and thinking things through. Be warm, concise and practical. Use markdown when it helps. You are not a therapist or a medical, legal or financial adviser — say so gently and suggest human support when a question needs it.";

async function callGateway(messages: Array<{ role: string; content: string }>) {
  const apiKey = process.env["LOVABLE_API_KEY"];
  if (!apiKey) throw new Error("AI is not configured.");

  const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ model: "google/gemini-2.5-flash", messages }),
  });

  if (res.status === 429)
    throw new Error("Too many requests right now — please try again shortly.");
  if (res.status === 402) throw new Error("AI credits are exhausted. Please top up to continue.");
  if (!res.ok) throw new Error("The assistant could not respond right now.");

  const json = (await res.json()) as { choices?: Array<{ message?: { content?: string } }> };
  return json.choices?.[0]?.message?.content ?? "No response was generated.";
}

export const askAssistant = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => askSchema.parse(data))
  .handler(async ({ data }) => {
    const text = await callGateway([
      { role: "system", content: TOOL_PROMPTS[data.mode] },
      { role: "user", content: data.prompt },
    ]);
    return { text };
  });

export const chatWithAssistant = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => chatSchema.parse(data))
  .handler(async ({ data }) => {
    const text = await callGateway([
      { role: "system", content: CHAT_SYSTEM },
      ...data.messages,
    ]);
    return { text };
  });
