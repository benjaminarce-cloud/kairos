import { KanbanColumn } from "@/components/kanban/column";
import type { AssignmentCardData } from "@/components/kanban/assignment-card";

const assignments: AssignmentCardData[] = [
  {
    id: "1",
    title: "Close reading response",
    course: "Literature Seminar",
    dueAt: new Date(Date.now() + 1000 * 60 * 60 * 36).toISOString(),
    status: "queued",
  },
  {
    id: "2",
    title: "Research memo",
    course: "Modern History",
    dueAt: new Date(Date.now() + 1000 * 60 * 60 * 96).toISOString(),
    status: "drafting",
  },
  {
    id: "3",
    title: "Methods reflection",
    course: "Social Inquiry",
    dueAt: null,
    status: "review",
  },
];

const columns = [
  {
    title: "Queued",
    description: "Pulled from Canvas and ready for review before drafting.",
    status: "queued",
  },
  {
    title: "Drafting",
    description: "Assignments with a working brief and active composition.",
    status: "drafting",
  },
  {
    title: "Review",
    description: "Drafts waiting for human revision before any next step.",
    status: "review",
  },
] as const;

export function KanbanBoard() {
  return (
    <div className="grid gap-8 lg:grid-cols-3">
      {columns.map((column) => (
        <KanbanColumn
          key={column.status}
          title={column.title}
          description={column.description}
          assignments={assignments.filter(
            (assignment) => assignment.status === column.status,
          )}
        />
      ))}
    </div>
  );
}
