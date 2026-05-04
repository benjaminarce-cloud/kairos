import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function ConnectPage() {
  return (
    <main className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(24rem,0.7fr)]">
      <section>
        <p className="text-xs uppercase tracking-[0.18em] text-[#A39B8E]">
          Canvas connection
        </p>
        <h1 className="font-serif-display mt-4 max-w-2xl text-6xl font-semibold leading-[0.92]">
          Bring the assignment brief into a private drafting space.
        </h1>
        <p className="mt-7 max-w-xl text-lg leading-8 text-[#A39B8E]">
          Tokens are validated server-side and encrypted before persistence.
          Kairos reads assignment context; it does not submit work.
        </p>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Canvas token</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-5">
            <label className="block space-y-2">
              <span className="text-sm text-[#A39B8E]">Canvas base URL</span>
              <Input placeholder="https://school.instructure.com" />
            </label>
            <label className="block space-y-2">
              <span className="text-sm text-[#A39B8E]">Access token</span>
              <Input type="password" placeholder="Paste token" />
            </label>
            <Button type="submit" className="w-full">
              Validate token
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
