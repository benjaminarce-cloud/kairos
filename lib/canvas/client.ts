import type {
  CanvasAssignment,
  CanvasCourse,
  CanvasProfile,
  CanvasSyncResult,
} from "@/lib/canvas/types";

type CanvasClientOptions = {
  baseUrl: string;
  token: string;
};

export class CanvasClient {
  private readonly baseUrl: string;
  private readonly token: string;

  constructor({ baseUrl, token }: CanvasClientOptions) {
    this.baseUrl = baseUrl.replace(/\/api\/v1\/?$/, "").replace(/\/$/, "");
    this.token = token;
  }

  async request<T>(path: string, init?: RequestInit): Promise<T> {
    const response = await fetch(`${this.baseUrl}/api/v1${path}`, {
      ...init,
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json",
        ...init?.headers,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Canvas request failed: ${response.status}`);
    }

    return response.json() as Promise<T>;
  }

  getProfile() {
    return this.request<CanvasProfile>("/users/self/profile");
  }

  getActiveCourses() {
    return this.request<CanvasCourse[]>(
      "/courses?enrollment_state=active&include[]=term",
    );
  }

  async getAssignmentsForCourse(courseId: number) {
    return this.request<CanvasAssignment[]>(
      `/courses/${courseId}/assignments?bucket=upcoming&order_by=due_at`,
    );
  }

  async sync(): Promise<CanvasSyncResult> {
    const [profile, courses] = await Promise.all([
      this.getProfile(),
      this.getActiveCourses(),
    ]);

    const assignmentGroups = await Promise.all(
      courses.map((course) => this.getAssignmentsForCourse(course.id)),
    );

    return {
      profile,
      courses,
      assignments: assignmentGroups.flat(),
    };
  }
}
