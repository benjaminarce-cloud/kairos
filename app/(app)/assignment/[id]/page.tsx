import { AssignmentWorkspace } from "@/components/editor/assignment-workspace";

export default async function AssignmentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <AssignmentWorkspace assignmentId={id} />;
}
