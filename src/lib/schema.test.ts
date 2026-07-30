// AI Declaration: Generated with the assistance of Claude-Web[Claude Sonnet 5]
import { describe, it, expect } from 'vitest';
import db from '@/lib/db';

describe('tasks schema', () => {
  it('rejects an insert with an invalid status value', () => {
    expect(() => {
      db.prepare(
        `INSERT INTO tasks (title, due_date, topic, status) VALUES (?, ?, ?, ?)`
      ).run('bad task', '2026-01-01', 'Test', 'Cancelled');
    }).toThrow();
  });
});