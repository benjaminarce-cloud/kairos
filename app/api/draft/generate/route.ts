import { NextResponse } from "next/server";
import {
  buildDraftPrompt,
  createAnthropicClient,
  draftRequestSchema,
} from "@/lib/anthropic/draft";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const parsed = draftRequestSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json(
      { error: "A title and assignment brief are required." },
      { status: 400 },
    );
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: "ANTHROPIC_API_KEY is not configured." },
      { status: 500 },
    );
  }

  const anthropic = createAnthropicClient();
  const messageStream = await anthropic.messages.create({
    model: process.env.ANTHROPIC_MODEL ?? "claude-3-5-sonnet-20241022",
    max_tokens: 2400,
    stream: true,
    messages: [
      {
        role: "user",
        content: buildDraftPrompt(parsed.data),
      },
    ],
  });

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        for await (const event of messageStream) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
      } catch {
        controller.enqueue(
          encoder.encode("\n\nDrafting paused before completion."),
        );
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Cache-Control": "no-store",
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
