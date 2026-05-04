export type CanvasProfile = {
  id: number;
  name: string;
  short_name?: string;
  sortable_name?: string;
  avatar_url?: string;
  locale?: string;
  effective_locale?: string;
};

export type CanvasCourse = {
  id: number;
  name: string;
  course_code?: string;
  workflow_state?: string;
};

export type CanvasAssignment = {
  id: number;
  course_id: number;
  name: string;
  description: string | null;
  due_at: string | null;
  html_url?: string;
  points_possible?: number;
  workflow_state?: string;
  submission_types?: string[];
};

export type CanvasSyncResult = {
  profile: CanvasProfile;
  courses: CanvasCourse[];
  assignments: CanvasAssignment[];
};
