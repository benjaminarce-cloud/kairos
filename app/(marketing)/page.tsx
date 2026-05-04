import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function LandingPage() {
  return (
    <main className="min-h-screen px-6 py-8 sm:px-10 lg:px-16">
      <nav className="flex items-center justify-between">
        <Link href="/" className="font-serif-display text-3xl font-semibold">
          Kairos
        </Link>
        <Button asChild variant="secondary">
          <Link href="/dashboard">Open workspace</Link>
        </Button>
      </nav>

      <section className="grid min-h-[calc(100vh-7rem)] items-end gap-12 py-16 lg:grid-cols-[minmax(0,1.25fr)_minmax(22rem,0.75fr)]">
        <div className="max-w-5xl">
          <p className="mb-8 max-w-sm text-sm uppercase tracking-[0.18em] text-[#A39B8E]">
            Canvas-connected assignment drafting
          </p>
          <h1 className="font-serif-display max-w-4xl text-6xl font-semibold leading-[0.9] sm:text-7xl lg:text-8xl">
            A quieter workspace for the moment before submission.
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-[#A39B8E]">
            Kairos pulls the assignment context, helps shape a first draft, and
            keeps review as the final human step. It never auto-submits to
            Canvas.
          </p>
        </div>

        <Card className="mb-2">
          <CardContent className="space-y-7 p-6">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-[#A39B8E]">
                Flow
              </p>
              <h2 className="font-serif-display mt-3 text-4xl font-semibold leading-none">
                Connect, read, draft, revise.
              </h2>
            </div>
            <div className="space-y-5 text-sm leading-7 text-[#A39B8E]">
              <p>
                Canvas tokens are encrypted with AES-256-GCM before storage.
              </p>
              <p>
                Anthropic drafting is streamed into a review workspace with no
                submission shortcut.
              </p>
            </div>
            <Button asChild className="w-full">
              <Link href="/connect">Connect Canvas</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
