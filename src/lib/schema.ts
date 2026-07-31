// AI Declaration: Generated with the assistance of Claude-Web[Claude Sonnet 5]

import type Database from 'better-sqlite3';

/**
 * Creates the tasks table if it does not already exist.
 *
 * Design notes (see docs/database-design.md for the full write-up):
 * - `archived_at` is nullable. NULL = active, non-null timestamp = archived.
 *   Tasks are never deleted, only archived, per the brief.
 * - `status` is constrained to exactly three fixed values via CHECK.
 * - There is no `overdue` column. Overdue is derived at read time from
 *   `due_date` and `status` — never stored.
 */
export function initSchema(db: Database.Database) {

  db.exec(`
    CREATE TABLE IF NOT EXISTS topics (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE
    );
  `);
  db.exec(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      due_date TEXT NOT NULL,
      topic_id INTEGER NOT NULL REFERENCES topics(id),
      status TEXT NOT NULL DEFAULT 'Todo'
        CHECK (status IN ('Todo', 'In-Progress', 'Complete')),
      archived_at TEXT DEFAULT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);

  db.exec(`
    CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
    CREATE INDEX IF NOT EXISTS idx_tasks_due_date ON tasks(due_date);
    CREATE INDEX IF NOT EXISTS idx_tasks_topic_id ON tasks(topic_id);
  `);
}
