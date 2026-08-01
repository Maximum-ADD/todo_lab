'use client';

import { Task, TaskStatus } from '@/lib/types';
import { STATUS_COLUMNS, STATUS_LABEL, STATUS_ACCENT } from '@/lib/statusStyles';
import TaskCard from './TaskCard';

export default function TaskListView({
  tasks,
  onOpen,
  filter,
  onFilterChange,
}: {
  tasks: Task[];
  onOpen: (task: Task) => void;
  filter: TaskStatus | 'all';
  onFilterChange: (f: TaskStatus | 'all') => void;
}) {
  const visible = filter === 'all' ? tasks : tasks.filter((t) => t.status === filter);

  return (
    <div>
      <div className="flex gap-2 mb-4">
        {STATUS_COLUMNS.map((status) => (
          <button
            key={status}
            onClick={() => onFilterChange(status)}
            className="font-mono text-xs uppercase px-3 py-1.5 rounded-full border-2 transition-colors"
            style={{
              borderColor: STATUS_ACCENT[status],
              backgroundColor: filter === status ? STATUS_ACCENT[status] : 'white',
              color: filter === status ? 'white' : STATUS_ACCENT[status],
            }}
          >
            {STATUS_LABEL[status]}
          </button>
        ))}
        <button
          onClick={() => onFilterChange('all')}
          className="font-mono text-xs uppercase px-3 py-1.5 rounded-full border-2 border-gray-300 transition-colors"
          style={{
            backgroundColor: filter === 'all' ? '#6B7280' : 'white',
            color: filter === 'all' ? 'white' : '#6B7280',
          }}
        >
          All
        </button>
      </div>

      <div className="flex flex-col gap-2.5">
        {visible.map((task) => (
          <TaskCard key={task.id} task={task} onOpen={onOpen} />
        ))}
        {visible.length === 0 && (
          <p className="text-sm text-gray-400 font-mono">No tasks here.</p>
        )}
      </div>
    </div>
  );
}