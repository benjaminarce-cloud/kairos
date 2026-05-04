PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS courses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  canvas_course_id INTEGER NOT NULL UNIQUE,
  name TEXT NOT NULL,
  course_code TEXT,
  term TEXT,
  synced_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS assignments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  course_id INTEGER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  canvas_assignment_id INTEGER NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT,
  description_text TEXT,
  due_at TEXT,
  points_possible REAL,
  submission_types TEXT NOT NULL DEFAULT '[]',
  rubric TEXT,
  is_draftable INTEGER NOT NULL DEFAULT 0 CHECK (is_draftable IN (0, 1)),
  draftable_reason TEXT,
  status TEXT NOT NULL DEFAULT 'queued',
  submitted_at TEXT,
  submission_workflow_state TEXT,
  synced_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS assignments_course_id_idx
  ON assignments(course_id);

CREATE INDEX IF NOT EXISTS assignments_status_idx
  ON assignments(status);

CREATE INDEX IF NOT EXISTS assignments_due_at_idx
  ON assignments(due_at);

CREATE TABLE IF NOT EXISTS drafts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  assignment_id INTEGER NOT NULL REFERENCES assignments(id) ON DELETE CASCADE,
  version INTEGER NOT NULL,
  content TEXT NOT NULL,
  model_used TEXT NOT NULL,
  generation_type TEXT NOT NULL,
  input_tokens INTEGER,
  output_tokens INTEGER,
  cost_usd REAL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  is_current INTEGER NOT NULL DEFAULT 1 CHECK (is_current IN (0, 1)),
  UNIQUE (assignment_id, version)
);

CREATE INDEX IF NOT EXISTS drafts_assignment_id_idx
  ON drafts(assignment_id);

CREATE UNIQUE INDEX IF NOT EXISTS drafts_one_current_per_assignment_idx
  ON drafts(assignment_id)
  WHERE is_current = 1;
