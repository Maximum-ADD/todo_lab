// AI Declaration: Generated with the assistance of Claude-Web[Claude Sonnet 5]
import { describe, it, expect } from 'vitest';
import { getDueFlag } from './dueStatus';

function daysFromToday(offset: number): string {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.toISOString().split('T')[0]; // "YYYY-MM-DD"
}

describe('getDueFlag', () => {
  it('flags a task due yesterday as overdue', () => {
    expect(getDueFlag(daysFromToday(-1), 'Todo', null)).toBe('overdue');
  });

  it('does not flag a completed task as overdue, even if the date has passed', () => {
    expect(getDueFlag(daysFromToday(-1), 'Complete', null)).toBeNull();
  });

  it('does not flag an archived task, even if overdue', () => {
    expect(getDueFlag(daysFromToday(-1), 'Todo', '2026-07-01 12:00:00')).toBeNull();
  });
});