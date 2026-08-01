// AI Declaration: Generated with the assistance of Claude-Web[Claude Sonnet 5]
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DndContext, useDroppable, DragEndEvent } from '@dnd-kit/core';
import { Archive, Plus } from 'lucide-react';
import { Task, TaskStatus, SortField } from '@/lib/types';
import { STATUS_COLUMNS, STATUS_LABEL, STATUS_ACCENT } from '@/lib/statusStyles';
import { updateTask, archiveTask } from '@/actions/tasks';
import TaskCard from './TaskCard';
import TaskDetailModal from './TaskDetailModal';
import TaskFormModal from './TaskFormModal';
import ArchivedView from './ArchivedView';
import { LayoutGrid, List } from 'lucide-react';
import TaskListView from './TaskListView';
import { ArrowUp, ArrowDown } from 'lucide-react';

function Column({
  status,
  tasks,
  onOpen,
}: {
  status: TaskStatus;
  tasks: Task[];
  onOpen: (task: Task) => void;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: status });

  return (
    <div
      ref={setNodeRef}
      className={`flex-1 min-w-0 rounded-lg p-3 border-t-[3px] transition-colors ${isOver ? 'bg-gray-100' : 'bg-black/[0.015]'}`}      style={{ borderTopColor: STATUS_ACCENT[status] }}
    >
      <div className="flex items-center gap-2 mb-3 px-1">
        <span
          className="w-1.5 h-1.5 rounded-full shrink-0"
          style={{ backgroundColor: STATUS_ACCENT[status] }}
        />
        <span className="font-mono text-xs tracking-wide uppercase text-gray-500">
          {STATUS_LABEL[status]}
        </span>
        <span className="font-mono text-xs text-gray-400">{tasks.length}</span>
      </div>
      <div className="flex flex-col gap-2.5">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onOpen={onOpen} />
        ))}
      </div>
    </div>
  );
}

export default function TaskBoard({
  initialTasks,
  sortBy,
  sortDir,
}: {
  initialTasks: Task[];
  sortBy: SortField;
  sortDir: 'asc' | 'desc';
}) {
  const router = useRouter();
  const [tasks, setTasks] = useState(initialTasks);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'board'>('list');
  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'all'>('all');

  // TaskBoard duplicates server state in useState for optimistic drag/archive
  // updates. useState only reads initialTasks on first mount, so when
  // router.refresh() (called after create/edit in TaskFormModal) produces a
  // new initialTasks prop, this component won't pick it up on its own —
  // this effect re-syncs local state whenever the prop actually changes.
  useEffect(() => {
    setTasks(initialTasks);
  }, [initialTasks]);
  const [formMode, setFormMode] = useState<'closed' | 'create' | 'edit'>('closed');
  const [showArchived, setShowArchived] = useState(false);

  function handleSortChange(newSort: SortField) {
    router.push(`/?sort=${newSort}&dir=${sortDir}`);
  }

  function handleDirToggle() {
    router.push(`/?sort=${sortBy}&dir=${sortDir === 'asc' ? 'desc' : 'asc'}`);
  }
  async function handleStatusChange(id: number, newStatus: TaskStatus) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t)));
    setSelectedTask((prev) => (prev && prev.id === id ? { ...prev, status: newStatus } : prev));
    await updateTask({ id, status: newStatus });
  }
  

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id as number;
    const newStatus = over.id as TaskStatus;
    const task = tasks.find((t) => t.id === taskId);
    if (!task || task.status === newStatus) return;

    // Optimistic update — reflects the move immediately, before the server confirms
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );
    await updateTask({ id: taskId, status: newStatus });
  }

  async function handleArchive(id: number) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    setSelectedTask(null);
    await archiveTask(id);
  }


  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-medium tracking-tight">Todo lab</h1>
        <div className="flex gap-2 items-center">
          <select
            className="text-sm border border-gray-200 rounded-lg px-2.5 py-2 bg-white text-gray-600"
            defaultValue={sortBy}
            aria-label="Sort by"
            onChange={(e) => handleSortChange(e.target.value as SortField)}
          >
            <option value="due_date">Sort: due date</option>
            <option value="status">Sort: status</option>
            <option value="topic">Sort: topic</option>
          </select>

          <button
            aria-label={sortDir === 'asc' ? 'Sort ascending' : 'Sort descending'}
            title="Reverse sort direction"
            className="border border-gray-200 rounded-lg p-2.5 text-gray-500 bg-white hover:bg-gray-50 transition-colors"
            onClick={handleDirToggle}
          >
            {sortDir === 'asc' ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
          </button>

          <div className="flex border border-gray-200 rounded-lg overflow-hidden">
            <button
              aria-label="Board view"
              title="Board view"
              className={`p-2.5 transition-colors ${viewMode === 'board' ? 'bg-gray-100' : 'bg-white hover:bg-gray-50'}`}
              onClick={() => setViewMode('board')}
            >
              <LayoutGrid size={16} />
            </button>
            <button
              aria-label="List view"
              title="List view"
              className={`p-2.5 transition-colors border-l border-gray-200 ${viewMode === 'list' ? 'bg-gray-100' : 'bg-white hover:bg-gray-50'}`}
              onClick={() => setViewMode('list')}
            >
              <List size={16} />
            </button>
          </div>
          <button
            aria-label="View archived"
            title="View archived"
            className="border border-gray-200 rounded-lg p-2.5 text-gray-500 bg-white hover:bg-gray-50 transition-colors"
            onClick={() => setShowArchived(true)}
          >
            <Archive size={16} />
          </button>
          <button
            aria-label="Add task"
            title="Add task"
            className="rounded-lg p-2.5 text-white transition-colors"
            style={{ backgroundColor: 'var(--accent)' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--accent-hover)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--accent)')}
            onClick={() => setFormMode('create')}
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      {viewMode === 'board' ? (
        <DndContext id="task-board" onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-3 gap-4 min-w-0">
              {STATUS_COLUMNS.map((status) => (
              <Column
                key={status}
                status={status}
                tasks={tasks.filter((t) => t.status === status)}
                onOpen={setSelectedTask}
              />
            ))}
          </div>
        </DndContext>
      ) : (
        <TaskListView
          tasks={tasks}
          onOpen={setSelectedTask}
          filter={statusFilter}
          onFilterChange={setStatusFilter}
        />
      )}
      {selectedTask && (
        <TaskDetailModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onEdit={() => setFormMode('edit')}
          onArchive={() => handleArchive(selectedTask.id)}
          onStatusChange={(status) => handleStatusChange(selectedTask.id, status)}
        />
      )}

      {formMode !== 'closed' && (
        <TaskFormModal
          mode={formMode}
          task={formMode === 'edit' ? selectedTask : null}
          onClose={() => {
            setFormMode('closed');
            setSelectedTask(null);
          }}
        />
      )}

      {showArchived && <ArchivedView onClose={() => setShowArchived(false)} />}
    </div>
  );
}
