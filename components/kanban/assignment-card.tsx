import { formatDistanceToNow } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export type AssignmentCardData = {
  id: string;
  title: string;
  course: string;
  dueAt: string | null;
  status: "queued" | "drafting" | "review";
};

export function AssignmentCard({
  assignment,
}: {
  assignment: AssignmentCardData;
}) {
  const dueLabel = assignment.dueAt
    ? `Due ${formatDistanceToNow(new Date(assignment.dueAt), { addSuffix: true })}`
    : "No due date";

  return (
    <Card className="bg-[#14110F]">
      <CardHeader className="p-4 pb-3">
        <p className="text-xs uppercase tracking-[0.18em] text-[#A39B8E]">
          {assignment.course}
        </p>
        <CardTitle className="text-2xl leading-7">{assignment.title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm text-[#A39B8E]">{dueLabel}</p>
      </CardContent>
    </Card>
  );
}
