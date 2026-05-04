export interface Course {
  id: number;
  name: string;
  courseCode?: string;
  workflowState?: string;
}

export interface Assignment {
  id: number;
  courseId: number;
  name: string;
  description: string | null;
  dueAt: string | null;
  htmlUrl?: string;
  pointsPossible?: number;
  workflowState?: string;
  submissionTypes?: string[];
}

export interface Draft {
  id: string;
  assignmentId: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}
