// AI Declaration: Generated with the assistance of Claude-Web[Claude Sonnet 5]

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

/**
 * Whole calendar days between a due date and today.
 * Negative = due date already passed. 0 = due today. Positive = still upcoming.
 * This is the single source of truth for "overdue" across the app —
 * both dueStatus.ts and types.ts call this rather than each doing their own math.
 */
export function daysUntilDue(dueDateStr: string): number {
  const due = startOfDay(new Date(dueDateStr));
  const today = startOfDay(new Date());
  return Math.round((due.getTime() - today.getTime()) / 86400000);
}

