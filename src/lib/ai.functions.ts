import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const schema = z.object({
  prompt: z.string().min(1).max(2000),
  mode: z.enum(["plan", "prioritize", "reflect"]).default("plan"),
});

const SYSTEM: Record<string, string> = {
  plan: "You are safe-SPACE AI, a calm, supportive productivity companion. Turn the user's situation into a gentle, realistic action plan with 3-6 short steps. Keep it warm, concise and practical. Use plain text with simple dashes for lists.",
  prioritize:
    "You are safe-SPACE AI. Help the user prioritize their tasks. Order them, explain briefly why, and suggest what can wait. Be calm, encouraging and concise. Use plain text with simple dashes for lists.",
  reflect:
    "You are safe-SPACE AI, a kind reflection partner. Offer a short, grounding reflection and 2-3 gentle questions or suggestions. You are not a therapist and do not give medical advice. Keep it brief and warm.",
};

export const askAssistant = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => schema.parse(data))
  .handler(async ({ data }) => {
    const apiKey = process.env["LOVABLE_API_KEY"];
    if (!apiKey) throw new Error("AI is not configured.");

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM[data.mode] ?? SYSTEM["plan"] },
          { role: "user", content: data.prompt },
        ],
      }),
    });

    if (res.status === 429) throw new Error("Too many requests right now — please try again shortly.");
    if (res.status === 402) throw new Error("AI credits are exhausted. Please top up to continue.");
    if (!res.ok) throw new Error("The assistant could not respond right now.");

    const json = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    return { text: json.choices?.[0]?.message?.content ?? "No response was generated." };
  });
