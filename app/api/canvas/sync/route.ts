import { NextResponse } from "next/server";
import { CanvasClient } from "@/lib/canvas/client";

export const runtime = "nodejs";

export async function POST() {
  const baseUrl = process.env.CANVAS_BASE_URL;
  const token = process.env.CANVAS_API_TOKEN;

  if (!baseUrl || !token) {
    return NextResponse.json(
      { error: "Canvas environment variables are required." },
      { status: 500 },
    );
  }

  try {
    const client = new CanvasClient({
      baseUrl,
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
