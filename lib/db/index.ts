import Database from "better-sqlite3";
import { existsSync, mkdirSync, readFileSync } from "node:fs";
import path from "node:path";

const dataDir = path.join(process.cwd(), ".data");
const dbPath = path.join(dataDir, "kairos.db");
const schemaPath = path.join(process.cwd(), "lib", "db", "schema.sql");

export type AssignmentStatus = "queued" | "drafting" | "review" | "submitted";

export type Course = {
  id: number;
  canvasCourseId: number;
  name: string;
  courseCode: string | null;
  term: string | null;
  syncedAt: string;
};

export type CourseInput = {
  canvasCourseId: number;
  name: string;
  courseCode?: string | null;
  term?: string | null;
  syncedAt?: string;
};

export type Assignment = {
  id: number;
  courseId: number;
  canvasAssignmentId: number;
  title: string;
  description: string | null;
  descriptionText: string | null;
  dueAt: string | null;
  pointsPossible: number | null;
  submissionTypes: string[];
  rubric: unknown | null;
  isDraftable: boolean;
  draftableReason: string | null;
  status: AssignmentStatus;
  submittedAt: string | null;
  submissionWorkflowState: string | null;
  syncedAt: string;
};

export type AssignmentInput = {
  courseId: number;
  canvasAssignmentId: number;
  title: string;
  description?: string | null;
  descriptionText?: string | null;
  dueAt?: string | null;
  pointsPossible?: number | null;
  submissionTypes?: string[];
  rubric?: unknown | null;
  isDraftable?: boolean;
  draftableReason?: string | null;
  status?: AssignmentStatus;
  submittedAt?: string | null;
  submissionWorkflowState?: string | null;
  syncedAt?: string;
};

export type AssignmentFilters = {
  courseId?: number;
  status?: AssignmentStatus;
  isDraftable?: boolean;
  dueBefore?: string;
  dueAfter?: string;
};

export type Draft = {
  id: number;
  assignmentId: number;
  version: number;
  content: string;
  modelUsed: string;
  generationType: string;
  inputTokens: number | null;
  outputTokens: number | null;
  costUsd: number | null;
  createdAt: string;
  isCurrent: boolean;
};

export type DraftInput = {
  assignmentId: number;
  content: string;
  modelUsed: string;
  generationType: string;
  inputTokens?: number | null;
  outputTokens?: number | null;
  costUsd?: number | null;
  isCurrent?: boolean;
};

type CourseRow = {
  id: number;
  canvas_course_id: number;
  name: string;
  course_code: string | null;
  term: string | null;
  synced_at: string;
};

type AssignmentRow = {
  id: number;
  course_id: number;
  canvas_assignment_id: number;
  title: string;
  description: string | null;
  description_text: string | null;
  due_at: string | null;
  points_possible: number | null;
  submission_types: string;
  rubric: string | null;
  is_draftable: 0 | 1;
  draftable_reason: string | null;
  status: AssignmentStatus;
  submitted_at: string | null;
  submission_workflow_state: string | null;
  synced_at: string;
};

type DraftRow = {
  id: number;
  assignment_id: number;
  version: number;
  content: string;
  model_used: string;
  generation_type: string;
  input_tokens: number | null;
  output_tokens: number | null;
  cost_usd: number | null;
  created_at: string;
  is_current: 0 | 1;
};

let db: Database.Database | null = null;

function getDb() {
  if (!db) {
    if (!existsSync(dataDir)) {
      mkdirSync(dataDir, { recursive: true });
    }

    db = new Database(dbPath);
    db.pragma("foreign_keys = ON");
    db.exec(readFileSync(schemaPath, "utf8"));
  }

  return db;
}

function parseJson<T>(value: string | null, fallback: T): T {
  if (!value) {
    return fallback;
  }

  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

function toCourse(row: CourseRow): Course {
  return {
    id: row.id,
    canvasCourseId: row.canvas_course_id,
    name: row.name,
    courseCode: row.course_code,
    term: row.term,
    syncedAt: row.synced_at,
  };
}

function toAssignment(row: AssignmentRow): Assignment {
  return {
    id: row.id,
    courseId: row.course_id,
    canvasAssignmentId: row.canvas_assignment_id,
    title: row.title,
    description: row.description,
    descriptionText: row.description_text,
    dueAt: row.due_at,
    pointsPossible: row.points_possible,
    submissionTypes: parseJson<string[]>(row.submission_types, []),
    rubric: parseJson<unknown | null>(row.rubric, null),
    isDraftable: row.is_draftable === 1,
    draftableReason: row.draftable_reason,
    status: row.status,
    submittedAt: row.submitted_at,
    submissionWorkflowState: row.submission_workflow_state,
    syncedAt: row.synced_at,
  };
}

function toDraft(row: DraftRow): Draft {
  return {
    id: row.id,
    assignmentId: row.assignment_id,
    version: row.version,
    content: row.content,
    modelUsed: row.model_used,
    generationType: row.generation_type,
    inputTokens: row.input_tokens,
    outputTokens: row.output_tokens,
    costUsd: row.cost_usd,
    createdAt: row.created_at,
    isCurrent: row.is_current === 1,
  };
}

export function getCourses() {
  const rows = getDb()
    .prepare("SELECT * FROM courses ORDER BY name COLLATE NOCASE")
    .all() as CourseRow[];

  return rows.map(toCourse);
}

export function upsertCourse(input: CourseInput) {
  const row = getDb()
    .prepare(
      `
      INSERT INTO courses (
        canvas_course_id,
        name,
        course_code,
        term,
        synced_at
      ) VALUES (
        @canvasCourseId,
        @name,
        @courseCode,
        @term,
        @syncedAt
      )
      ON CONFLICT(canvas_course_id) DO UPDATE SET
        name = excluded.name,
        course_code = excluded.course_code,
        term = excluded.term,
        synced_at = excluded.synced_at
      RETURNING *
      `,
    )
    .get({
      canvasCourseId: input.canvasCourseId,
      name: input.name,
      courseCode: input.courseCode ?? null,
      term: input.term ?? null,
      syncedAt: input.syncedAt ?? new Date().toISOString(),
    }) as CourseRow;

  return toCourse(row);
}

export function getAssignments(filters: AssignmentFilters = {}) {
  const conditions: string[] = [];
  const params: Record<string, string | number> = {};

  if (filters.courseId !== undefined) {
    conditions.push("course_id = @courseId");
    params.courseId = filters.courseId;
  }

  if (filters.status !== undefined) {
    conditions.push("status = @status");
    params.status = filters.status;
  }

  if (filters.isDraftable !== undefined) {
    conditions.push("is_draftable = @isDraftable");
    params.isDraftable = filters.isDraftable ? 1 : 0;
  }

  if (filters.dueBefore !== undefined) {
    conditions.push("due_at <= @dueBefore");
    params.dueBefore = filters.dueBefore;
  }

  if (filters.dueAfter !== undefined) {
    conditions.push("due_at >= @dueAfter");
    params.dueAfter = filters.dueAfter;
  }

  const where = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";
  const rows = getDb()
    .prepare(
      `
      SELECT *
      FROM assignments
      ${where}
      ORDER BY due_at IS NULL, due_at ASC, title COLLATE NOCASE
      `,
    )
    .all(params) as AssignmentRow[];

  return rows.map(toAssignment);
}

export function getAssignment(id: number) {
  const row = getDb()
    .prepare("SELECT * FROM assignments WHERE id = ?")
    .get(id) as AssignmentRow | undefined;

  return row ? toAssignment(row) : null;
}

export function upsertAssignment(input: AssignmentInput) {
  const row = getDb()
    .prepare(
      `
      INSERT INTO assignments (
        course_id,
        canvas_assignment_id,
        title,
        description,
        description_text,
        due_at,
        points_possible,
        submission_types,
        rubric,
        is_draftable,
        draftable_reason,
        status,
        submitted_at,
        submission_workflow_state,
        synced_at
      ) VALUES (
        @courseId,
        @canvasAssignmentId,
        @title,
        @description,
        @descriptionText,
        @dueAt,
        @pointsPossible,
        @submissionTypes,
        @rubric,
        @isDraftable,
        @draftableReason,
        @status,
        @submittedAt,
        @submissionWorkflowState,
        @syncedAt
      )
      ON CONFLICT(canvas_assignment_id) DO UPDATE SET
        course_id = excluded.course_id,
        title = excluded.title,
        description = excluded.description,
        description_text = excluded.description_text,
        due_at = excluded.due_at,
        points_possible = excluded.points_possible,
        submission_types = excluded.submission_types,
        rubric = excluded.rubric,
        is_draftable = excluded.is_draftable,
        draftable_reason = excluded.draftable_reason,
        status = excluded.status,
        submitted_at = excluded.submitted_at,
        submission_workflow_state = excluded.submission_workflow_state,
        synced_at = excluded.synced_at
      RETURNING *
      `,
    )
    .get({
      courseId: input.courseId,
      canvasAssignmentId: input.canvasAssignmentId,
      title: input.title,
      description: input.description ?? null,
      descriptionText: input.descriptionText ?? null,
      dueAt: input.dueAt ?? null,
      pointsPossible: input.pointsPossible ?? null,
      submissionTypes: JSON.stringify(input.submissionTypes ?? []),
      rubric: input.rubric === undefined ? null : JSON.stringify(input.rubric),
      isDraftable: input.isDraftable ? 1 : 0,
      draftableReason: input.draftableReason ?? null,
      status: input.status ?? "queued",
      submittedAt: input.submittedAt ?? null,
      submissionWorkflowState: input.submissionWorkflowState ?? null,
      syncedAt: input.syncedAt ?? new Date().toISOString(),
    }) as AssignmentRow;

  return toAssignment(row);
}

export function updateAssignmentStatus(
  id: number,
  status: AssignmentStatus,
  submittedAt: string | null = null,
  submissionWorkflowState: string | null = null,
) {
  const row = getDb()
    .prepare(
      `
      UPDATE assignments
      SET
        status = @status,
        submitted_at = @submittedAt,
        submission_workflow_state = @submissionWorkflowState
      WHERE id = @id
      RETURNING *
      `,
    )
    .get({
      id,
      status,
      submittedAt,
      submissionWorkflowState,
    }) as AssignmentRow | undefined;

  return row ? toAssignment(row) : null;
}

export function getDrafts(assignmentId: number) {
  const rows = getDb()
    .prepare(
      `
      SELECT *
      FROM drafts
      WHERE assignment_id = ?
      ORDER BY version DESC
      `,
    )
    .all(assignmentId) as DraftRow[];

  return rows.map(toDraft);
}

export function getCurrentDraft(assignmentId: number) {
  const row = getDb()
    .prepare(
      `
      SELECT *
      FROM drafts
      WHERE assignment_id = ? AND is_current = 1
      LIMIT 1
      `,
    )
    .get(assignmentId) as DraftRow | undefined;

  return row ? toDraft(row) : null;
}

export function createDraft(input: DraftInput) {
  const create = getDb().transaction((draft: DraftInput) => {
    const versionRow = getDb()
      .prepare(
        `
        SELECT COALESCE(MAX(version), 0) + 1 AS version
        FROM drafts
        WHERE assignment_id = ?
        `,
      )
      .get(draft.assignmentId) as { version: number };
    const isCurrent = draft.isCurrent ?? true;

    if (isCurrent) {
      getDb()
        .prepare("UPDATE drafts SET is_current = 0 WHERE assignment_id = ?")
        .run(draft.assignmentId);
    }

    const row = getDb()
      .prepare(
        `
        INSERT INTO drafts (
          assignment_id,
          version,
          content,
          model_used,
          generation_type,
          input_tokens,
          output_tokens,
          cost_usd,
          is_current
        ) VALUES (
          @assignmentId,
          @version,
          @content,
          @modelUsed,
          @generationType,
          @inputTokens,
          @outputTokens,
          @costUsd,
          @isCurrent
        )
        RETURNING *
        `,
      )
      .get({
        assignmentId: draft.assignmentId,
        version: versionRow.version,
        content: draft.content,
        modelUsed: draft.modelUsed,
        generationType: draft.generationType,
        inputTokens: draft.inputTokens ?? null,
        outputTokens: draft.outputTokens ?? null,
        costUsd: draft.costUsd ?? null,
        isCurrent: isCurrent ? 1 : 0,
      }) as DraftRow;

    return toDraft(row);
  });

  return create(input);
}

export function markDraftCurrent(id: number) {
  const mark = getDb().transaction((draftId: number) => {
    const draft = getDb()
      .prepare("SELECT * FROM drafts WHERE id = ?")
      .get(draftId) as DraftRow | undefined;

    if (!draft) {
      return null;
    }

    getDb()
      .prepare("UPDATE drafts SET is_current = 0 WHERE assignment_id = ?")
      .run(draft.assignment_id);
    const row = getDb()
      .prepare("UPDATE drafts SET is_current = 1 WHERE id = ? RETURNING *")
      .get(draftId) as DraftRow;

    return toDraft(row);
  });

  return mark(id);
}
