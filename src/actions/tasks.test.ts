// AI Declaration: Generated with the assistance of Claude-Web[Claude Sonnet 5]
import { describe, it, expect, beforeEach } from 'vitest';
import db from '@/lib/db';
import { createTask, getTasks, getArchivedTasks, archiveTask } from './tasks';

// Every test starts from a clean table — without this, tasks from one test
// would leak into the next and make results depend on run order.
// beforeEach(() => {
//   db.exec('DELETE FROM tasks');
// });

describe('archiveTask', () => {
  it('removes the task from the active list and makes it viewable in archived', async () => {
    await createTask({
      title: 'Write lab report',
      due_date: '2026-08-01',
      topic: 'COMS3011A',
    });

    const activeBefore = await getTasks();
    const task = activeBefore[0];

    await archiveTask(task.id);

    const activeAfter = await getTasks();
    const archivedAfter = await getArchivedTasks();

    expect(activeAfter.find((t) => t.id === task.id)).toBeUndefined();
    expect(archivedAfter.find((t) => t.id === task.id)).toBeDefined();
  });
});