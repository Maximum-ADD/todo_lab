// AI Declaration: Generated with the assistance of Claude-Web[Claude Sonnet 5]
import { describe, it, expect, beforeEach } from 'vitest';
import db from '@/lib/db';
import { findTopicId, createTopic, findOrCreateTopicId, getAllTopicNames } from './topics';

// Global db is a shared in-memory connection across every test in this file
// (see vitest.setup.ts — SQLITE_PATH=':memory:'). Rows persist between tests
// unless explicitly cleared, so this must run before every test or later
// tests can pass for the wrong reason (seeing a row left over from an
// earlier test rather than the one they actually created).
beforeEach(() => {
  db.prepare(`DELETE FROM topics`).run();
});

describe('findTopicId', () => {
  it('returns null when the topic does not exist', () => {
    expect(findTopicId(db, 'Nonexistent')).toBeNull();
  });

  it('returns the id of an existing topic', () => {
    const created = createTopic(db, 'Algorithms');
    expect(findTopicId(db, 'Algorithms')).toBe(created);
  });
});

describe('createTopic', () => {
  it('inserts a new row and returns its id', () => {
    const id = createTopic(db, 'Software Design');
    const row = db.prepare(`SELECT * FROM topics WHERE id = ?`).get(id) as {
      name: string;
    };
    expect(row.name).toBe('Software Design');
  });

  it('throws when creating a duplicate name, since name is UNIQUE in the schema', () => {
    createTopic(db, 'Algorithms');
    expect(() => createTopic(db, 'Algorithms')).toThrow();
  });
});

describe('findOrCreateTopicId', () => {
  it('creates a new topic and returns its id when the name does not exist', () => {
    const id = findOrCreateTopicId(db, 'Databases');
    const row = db.prepare(`SELECT * FROM topics WHERE id = ?`).get(id) as {
      name: string;
    };
    expect(row.name).toBe('Databases');
  });

  it('returns the same id on a second call with the same name, without duplicating the row', () => {
    const firstId = findOrCreateTopicId(db, 'Algorithms');
    const secondId = findOrCreateTopicId(db, 'Algorithms');

    expect(secondId).toBe(firstId);

    const count = db.prepare(`SELECT COUNT(*) as n FROM topics`).get() as { n: number };
    expect(count.n).toBe(1);
  });

  it('treats different names as different topics', () => {
    const id1 = findOrCreateTopicId(db, 'Algorithms');
    const id2 = findOrCreateTopicId(db, 'Software Design');
    expect(id1).not.toBe(id2);
  });
});

describe('getAllTopicNames', () => {
  it('returns an empty array when no topics exist', () => {
    expect(getAllTopicNames(db)).toEqual([]);
  });

  it('returns all topic names sorted alphabetically', () => {
    findOrCreateTopicId(db, 'Software Design');
    findOrCreateTopicId(db, 'Algorithms');
    findOrCreateTopicId(db, 'Databases');

    expect(getAllTopicNames(db)).toEqual(['Algorithms', 'Databases', 'Software Design']);
  });
});