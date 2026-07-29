// AI Declaration: Generated with the assistance of Claude-Web[Claude Sonnet 5]
'use server';

import db from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { Task, TaskRow, SortField, toTask } from '@/lib/types';

/**
 * Fetch active (non-archived) tasks, sorted by the given field.
 * `overdue` is computed here, not stored — see lib/types.ts.
 */
export async function getTasks(sortBy: SortField = 'due_date'): Promise<Task[]> {
  const validSort: Record<SortField, string> = {
    due_date: 'due_date ASC',
    status: 'status ASC',
    topic: 'topic ASC',
  };

  const rows = db
    .prepare(
      `SELECT * FROM tasks WHERE archived_at IS NULL ORDER BY ${validSort[sortBy]}`
    )
    .all() as TaskRow[];

  return rows.map(toTask);
}

/** Fetch archived tasks — still viewable, per the brief, just excluded from the active list. */
export async function getArchivedTasks(): Promise<Task[]> {
  const rows = db
    .prepare(`SELECT * FROM tasks WHERE archived_at IS NOT NULL ORDER BY updated_at DESC`)
    .all() as TaskRow[];

  return rows.map(toTask);
}

export interface CreateTaskInput {
  title: string;
  description?: string;
  due_date: string; // ISO date string, e.g. "2026-08-04"
  topic: string;
}

export async function createTask(input: CreateTaskInput) {
  db.prepare(
    `INSERT INTO tasks (title, description, due_date, topic, status, created_at, updated_at)
     VALUES (@title, @description, @due_date, @topic, 'Todo', datetime('now'), datetime('now'))`
  ).run({
    title: input.title,
    description: input.description ?? null,
    due_date: input.due_date,
    topic: input.topic,
  });

  revalidatePath('/');
}

export interface UpdateTaskInput {
  id: number;
  title?: string;
  description?: string;
  due_date?: string;
  topic?: string;
  status?: 'Todo' | 'In-Progress' | 'Complete';
}

export async function updateTask(input: UpdateTaskInput) {
  const existing = db.prepare(`SELECT * FROM tasks WHERE id = ?`).get(input.id) as
    | TaskRow
    | undefined;
  if (!existing) throw new Error(`Task ${input.id} not found`);

  const updated = {
    title: input.title ?? existing.title,
    description: input.description ?? existing.description,
    due_date: input.due_date ?? existing.due_date,
    topic: input.topic ?? existing.topic,
    status: input.status ?? existing.status,
  };

  db.prepare(
    `UPDATE tasks
     SET title = @title, description = @description, due_date = @due_date,
         topic = @topic, status = @status, updated_at = datetime('now')
     WHERE id = @id`
  ).run({ ...updated, id: input.id });

  revalidatePath('/');
}

/** Archive a task. Never deletes — sets archived_at so it remains viewable. */
export async function archiveTask(id: number) {
  db.prepare(`UPDATE tasks SET archived_at = datetime('now') WHERE id = ?`).run(id);
  revalidatePath('/');
}
