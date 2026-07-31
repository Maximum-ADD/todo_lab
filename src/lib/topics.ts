// AI Declaration: Generated with the assistance of Claude-Web[Claude Sonnet 5]
import type Database from 'better-sqlite3';

/**
 * Returns the id of the topic with this name, creating it first if it
 * doesn't exist. There's no separate topic-management UI — a topic comes
 * into existence the first time a task uses that name.
 */
export function findTopicId(db: Database.Database, name: string): number | null {
  const row = db.prepare(`SELECT id FROM topics WHERE name = ?`).get(name) as
    | { id: number } | undefined;
  return row?.id ?? null;
}

export function createTopic(db: Database.Database, name: string): number {
  const result = db.prepare(`INSERT INTO topics (name) VALUES (?)`).run(name);
  return Number(result.lastInsertRowid);
}

export function findOrCreateTopicId(db: Database.Database, name: string): number {
  return findTopicId(db, name) ?? createTopic(db, name);
}

/** All topic names, for a future dropdown/autocomplete. Not yet used by the UI. */
export function getAllTopicNames(db: Database.Database): string[] {
  const rows = db.prepare(`SELECT name FROM topics ORDER BY name ASC`).all() as {
    name: string;
  }[];
  return rows.map((r) => r.name);
}