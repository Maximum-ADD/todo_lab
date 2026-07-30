// AI Declaration: Generated with the assistance of Claude-Web[Claude Sonnet 5]

import { TaskStatus } from './types';

export type DueFlag = 'overdue' | 'today' | 'tomorrow' | 'week' | null;

/**
 * Derives a due-date urgency flag. Never stored in the database — recomputed
 * every time a task is rendered, from `due_date` + `status` + `archived_at`.
 * Distinct from `status`: a task can be "In-Progress" AND "overdue" at once.
 */
export function getDueFlag(
  due_date: string,
  status: TaskStatus,
  archived_at: string | null
): DueFlag {
  if (archived_at !== null || status === 'Complete') return null;

  const due = new Date(due_date);
  const now = new Date();

  // Compare by calendar day, not exact timestamp
  const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const dueDay = startOfDay(due);
  const today = startOfDay(now);

  const diffDays = Math.round((dueDay.getTime() - today.getTime()) / 86400000);

  if (diffDays < 0) return 'overdue';
  if (diffDays === 0) return 'today';
  if (diffDays === 1) return 'tomorrow';
  if (diffDays <= 7) return 'week';
  return null;
}

export const DUE_FLAG_LABEL: Record<Exclude<DueFlag, null>, string> = {
  overdue: 'Overdue',
  today: 'Due today',
  tomorrow: 'Due tomorrow',
  week: 'Due this week',
};

// Tailwind class pairs (bg, text) per flag — amber ramps up to red as urgency increases
export const DUE_FLAG_CLASSES: Record<Exclude<DueFlag, null>, string> = {
  overdue: 'bg-red-100 text-red-700',
  today: 'bg-orange-100 text-orange-700',
  tomorrow: 'bg-amber-100 text-amber-700',
  week: 'bg-blue-100 text-blue-700',
};
