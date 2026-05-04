import type { AssignmentCardData } from "@/components/kanban/assignment-card";
import { AssignmentCard } from "@/components/kanban/assignment-card";

type KanbanColumnProps = {
  title: string;
  description: string;
  assignments: AssignmentCardData[];
};

export function KanbanColumn({
  title,
  description,
  assignments,
}: KanbanColumnProps) {
  return (
    <section className="min-h-[32rem] border-l border-[#2A2520] pl-5">
      <div className="mb-6">
        <h2 className="font-serif-display text-3xl font-semibold">{title}</h2>
        <p className="mt-2 max-w-xs text-sm leading-6 text-[#A39B8E]">
          {description}
        </p>
      </div>
      <div className="space-y-4">
        {assignments.map((assignment) => (
          <AssignmentCard key={assignment.id} assignment={assignment} />
        ))}
      </div>
    </section>
  );
}
