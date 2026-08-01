// AI Declaration: Generated with the assistance of Claude-Web[Claude Sonnet 5]
import { describe, it, expect, beforeEach } from 'vitest';
import db from '@/lib/db';
import { findOrCreateTopicId } from './topics';

describe('tasks schema', () => {
  let topicId: number;

  beforeEach(() => {
    // Every insert needs a real topic_id now that topics is a separate table
    // (topic_id NOT NULL REFERENCES topics(id)) — using a bare string here
    // would fail on the FK, not the thing we're actually testing.
    topicId = findOrCreateTopicId(db, 'Test');
  });

  it('rejects an insert with an invalid status value', () => {
    expect(() => {
      db.prepare(
        `INSERT INTO tasks (title, due_date, topic_id, status) VALUES (?, ?, ?, ?)`
      ).run('bad task', '2026-01-01', topicId, 'Cancelled');
    }).toThrowError(
      expect.objectContaining({ code: 'SQLITE_CONSTRAINT_CHECK' })
    );
  });

  it('accepts an insert with a valid status value', () => {
    // Control case: proves the previous test fails because of the status
    // value specifically, not because of something else about the insert
    // (e.g. a missing column, a bad topic_id) — same shape, valid status.
    expect(() => {
      db.prepare(
        `INSERT INTO tasks (title, due_date, topic_id, status) VALUES (?, ?, ?, ?)`
      ).run('good task', '2026-01-01', topicId, 'In-Progress');
    }).not.toThrow();
  });
});