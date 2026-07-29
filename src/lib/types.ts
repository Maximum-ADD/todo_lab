// AI Declaration: Generated with the assistance of Claude-Web[Claude Sonnet 5]

export type TaskStatus = 'Todo' | 'In-Progress' | 'Complete';

export type SortField = 'due_date' | 'status' | 'topic';

// Raw shape as stored in SQLite (all TEXT/INTEGER — no native booleans)
export interface TaskRow {
  id: number;
  title: string;
  description: string | null;
  due_date: string;
  topic: string;
  status: TaskStatus;
  archived_at: string | null;
  created_at: string;
  updated_at: string;
}

// Shape used in the UI — adds the derived `overdue` flag.
// This is computed in code, never stored in the database.
export interface Task extends TaskRow {
  overdue: boolean;
}

export function toTask(row: TaskRow): Task {
  const isPast = new Date(row.due_date).getTime() < Date.now();
  const overdue = isPast && row.status !== 'Complete' && row.archived_at === null;
  return { ...row, overdue };
}
