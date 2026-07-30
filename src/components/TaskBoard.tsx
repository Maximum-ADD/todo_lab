// AI Declaration: Generated with the assistance of Claude-Web[Claude Sonnet 5]
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DndContext, useDroppable, DragEndEvent } from '@dnd-kit/core';
import { Task, TaskStatus, SortField } from '@/lib/types';
import { STATUS_COLUMNS, STATUS_LABEL } from '@/lib/statusStyles';
import { updateTask, archiveTask } from '@/actions/tasks';
import TaskCard from './TaskCard';
import TaskDetailModal from './TaskDetailModal';
import TaskFormModal from './TaskFormModal';
import ArchivedView from './ArchivedView';

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
      className={`flex-1 rounded-lg p-2 ${isOver ? 'bg-gray-100' : ''}`}
    >
      <div className="text-sm font-medium text-gray-500 mb-2 px-1">
        {STATUS_LABEL[status]}
      </div>
      <div className="flex flex-col gap-2">
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
}: {
  initialTasks: Task[];
  sortBy: SortField;
}) {
  const router = useRouter();
  const [tasks, setTasks] = useState(initialTasks);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [formMode, setFormMode] = useState<'closed' | 'create' | 'edit'>('closed');
  const [showArchived, setShowArchived] = useState(false);

  function handleSortChange(newSort: SortField) {
    // Sorting is done server-side in getTasks(); changing the URL query param
    // triggers page.tsx to re-fetch with the new order.
    router.push(`/?sort=${newSort}`);
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
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-medium">Todo lab</h1>
        <div className="flex gap-2 items-center">
          <select
            className="text-sm border rounded px-2 py-1"
            defaultValue={sortBy}
            aria-label="Sort by"
            onChange={(e) => handleSortChange(e.target.value as SortField)}
          >
            <option value="due_date">Sort: due date</option>
            <option value="status">Sort: status</option>
            <option value="topic">Sort: topic</option>
          </select>
          <button
            aria-label="View archived"
            className="border rounded p-1.5"
            onClick={() => setShowArchived(true)}
          >
            Archive
          </button>
          <button
            aria-label="Add task"
            className="border rounded p-1.5 text-blue-700 border-blue-300"
            onClick={() => setFormMode('create')}
          >
            + Add
          </button>
        </div>
      </div>

      <DndContext id="task-board" onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-3 gap-3">
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

      {selectedTask && (
        <TaskDetailModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onEdit={() => setFormMode('edit')}
          onArchive={() => handleArchive(selectedTask.id)}
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
