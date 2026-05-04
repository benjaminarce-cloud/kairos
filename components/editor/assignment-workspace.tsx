import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AssignmentWorkspace({
  assignmentId,
}: {
  assignmentId: string;
}) {
  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.35fr)]">
      <aside className="space-y-5">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-[#A39B8E]">
            Assignment
          </p>
          <h1 className="font-serif-display mt-3 text-5xl font-semibold leading-[0.95]">
            Draft workspace
          </h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Canvas brief</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-7 text-[#A39B8E]">
            <p>
              Assignment ID {assignmentId} will load the Canvas description,
              rubric, due date, and course context here after sync is connected.
            </p>
            <p>
              Kairos keeps every draft in review mode. Nothing is sent back to
              Canvas without explicit action.
            </p>
          </CardContent>
        </Card>
      </aside>

      <main className="min-h-[42rem] rounded-lg border border-[#2A2520] bg-[#1A1614] p-5 sm:p-7">
        <div className="mb-7 flex flex-col gap-4 border-b border-[#2A2520] pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-[#A39B8E]">
              First pass
            </p>
            <h2 className="font-serif-display mt-2 text-4xl font-semibold">
              Composed draft
            </h2>
          </div>
          <Button type="button">Generate draft</Button>
        </div>
        <div className="min-h-[28rem] whitespace-pre-wrap rounded-md border border-[#2A2520] bg-[#0E0C0A] p-5 text-sm leading-7 text-[#F5F1EA]">
          Reading the assignment brief will begin once a Canvas connection is
          validated.
        </div>
      </main>
    </div>
  );
}
