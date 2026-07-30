// AI Declaration: Generated with the assistance of Claude-Web[Claude Sonnet 5]

import { getTasks } from '@/actions/tasks';
import TaskBoard from '@/components/TaskBoard';
import { SortField } from '@/lib/types';

const VALID_SORTS: SortField[] = ['due_date', 'status', 'topic'];

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ sort?: string }>;
}) {
  const params = await searchParams;
  const sortBy: SortField = VALID_SORTS.includes(params.sort as SortField)
    ? (params.sort as SortField)
    : 'due_date';

  const tasks = await getTasks(sortBy);

  return (
    <main className="max-w-5xl mx-auto p-6">
      <TaskBoard initialTasks={tasks} sortBy={sortBy} />
    </main>
  );
}
