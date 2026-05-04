import { NextResponse } from "next/server";
import { z } from "zod";
import { CanvasClient } from "@/lib/canvas/client";
import { encryptToken } from "@/lib/crypto/tokens";

export const runtime = "nodejs";

const validateCanvasTokenSchema = z.object({
  canvasBaseUrl: z.string().url(),
  token: z.string().min(1),
});

export async function POST(request: Request) {
  const parsed = validateCanvasTokenSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Canvas URL and token are required." },
      { status: 400 },
    );
  }

  const client = new CanvasClient({
    baseUrl: parsed.data.canvasBaseUrl,
    token: parsed.data.token,
  });

  try {
    const profile = await client.getProfile();
    const encryptedToken = encryptToken(parsed.data.token);

    return NextResponse.json({
      valid: true,
      encryptedToken,
      profile: {
        id: profile.id,
        name: profile.name,
      },
    });
  } catch {
    return NextResponse.json(
      { valid: false, error: "Canvas rejected this token." },
      { status: 401 },
    );
  }
}
