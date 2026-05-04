import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";

export const draftRequestSchema = z.object({
  assignmentTitle: z.string().min(1),
  assignmentBrief: z.string().min(1),
  courseContext: z.string().optional(),
  studentNotes: z.string().optional(),
});

export type DraftRequest = z.infer<typeof draftRequestSchema>;

export function buildDraftPrompt(input: DraftRequest) {
  return [
    "You are helping a student produce a reviewed first draft for an assignment.",
    "Do not claim the work is final. Do not submit anything to Canvas.",
    "Write with clarity, structure, and academic restraint.",
    "",
    `Assignment: ${input.assignmentTitle}`,
    "",
    "Brief:",
    input.assignmentBrief,
    "",
    input.courseContext ? `Course context:\n${input.courseContext}\n` : "",
    input.studentNotes ? `Student notes:\n${input.studentNotes}\n` : "",
    "Return a draft with a concise outline, a polished first pass, and a short review checklist.",
  ]
    .filter(Boolean)
    .join("\n");
}

export function createAnthropicClient() {
  return new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });
}
