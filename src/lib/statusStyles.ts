// AI Declaration: Generated with the assistance of Claude-Web[Claude Sonnet 5]

import { TaskStatus } from './types';

// The three fixed statuses, in fixed display order. Not user-editable —
// this array is the single source of truth for which columns exist.
export const STATUS_COLUMNS: TaskStatus[] = ['Todo', 'In-Progress', 'Complete'];

export const STATUS_LABEL: Record<TaskStatus, string> = {
  Todo: 'Todo',
  'In-Progress': 'In-progress',
  Complete: 'Complete',
};

export const STATUS_BADGE_CLASSES: Record<TaskStatus, string> = {
  Todo: 'bg-blue-100 text-blue-700',
  'In-Progress': 'bg-amber-100 text-amber-700',
  Complete: 'bg-green-100 text-green-700',
};
