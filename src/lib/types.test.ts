// AI Declaration: Generated with the assistance of Claude-Web[Claude Sonnet 5]
import { describe, it, expect } from 'vitest';
import { toTask, TaskRow } from './types';

function baseRow(overrides: Partial<TaskRow> = {}): TaskRow {
  return {
    id: 1,
    title: 'Test task',
    description: null,
    due_date: '2020-01-01',
    topic: 'Test',
    status: 'Todo',
    archived_at: null,
    created_at: '2020-01-01',
    updated_at: '2020-01-01',
    ...overrides,
  };
}

function daysFromToday(offset: number): string {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.toISOString().split('T')[0];
}

describe('toTask', () => {
  it('marks a completed task as not overdue, even if the due date has passed', () => {
    const row = baseRow({ status: 'Complete', due_date: daysFromToday(-5) });
    expect(toTask(row).overdue).toBe(false);
  });

  it('marks a task due in the future as not overdue', () => {
    const row = baseRow({ due_date: daysFromToday(5) });
    expect(toTask(row).overdue).toBe(false);
  });

  it('marks an archived task as not overdue, even if the due date has passed', () => {
    const row = baseRow({ archived_at: '2020-01-02 00:00:00', due_date: daysFromToday(-5) });
    expect(toTask(row).overdue).toBe(false);
  });

  it('marks an active, incomplete task with a past due date as overdue', () => {
    const row = baseRow({ due_date: daysFromToday(-1) });
    expect(toTask(row).overdue).toBe(true);
  });
});
    