import { NextResponse } from "next/server";
import { z } from "zod";
import { CanvasClient } from "@/lib/canvas/client";
import { decryptToken } from "@/lib/crypto/tokens";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

const syncCanvasSchema = z.object({
  canvasBaseUrl: z.string().url(),
  encryptedToken: z.string().min(1),
});

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { error: "Authentication required." },
      { status: 401 },
    );
  }

  const parsed = syncCanvasSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Canvas URL and encrypted token are required." },
      { status: 400 },
    );
  }

  try {
    const token = decryptToken(parsed.data.encryptedToken);
    const client = new CanvasClient({
      baseUrl: parsed.data.canvasBaseUrl,
      token,
    });
    const result = await client.sync();

    return NextResponse.json({
      syncedAt: new Date().toISOString(),
      profile: result.profile,
      courses: result.courses,
      assignments: result.assignments,
    });
  } catch {
    return NextResponse.json(
      { error: "Canvas sync could not be completed." },
      { status: 502 },
    );
  }
}
