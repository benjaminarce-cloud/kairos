import { KanbanBoard } from "@/components/kanban/board";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  return (
    <main className="space-y-12">
      <section className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-[#A39B8E]">
            Dashboard
          </p>
          <h1 className="font-serif-display mt-4 max-w-2xl text-6xl font-semibold leading-[0.92]">
            Assignments in motion, not in a pile.
          </h1>
        </div>
        <div className="max-w-xl lg:pt-14">
          <p className="text-lg leading-8 text-[#A39B8E]">
            Review upcoming work from Canvas, open a focused draft space, and
            keep final submission decisions outside the automation path.
          </p>
          <Button className="mt-7" type="button">
            Sync Canvas
          </Button>
        </div>
      </section>
      <KanbanBoard />
    </main>
  );
}
