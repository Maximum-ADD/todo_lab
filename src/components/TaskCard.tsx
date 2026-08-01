// AI Declaration: Generated with the assistance of Claude-Web[Claude Sonnet 5]
'use client';

import { useDraggable } from '@dnd-kit/core';
import { GripVertical } from 'lucide-react';
import { Task } from '@/lib/types';
import { getDueFlag, DUE_FLAG_LABEL, DUE_FLAG_CLASSES } from '@/lib/dueStatus';
import { STATUS_ACCENT } from '@/lib/statusStyles';

export default function TaskCard({
  task,
  onOpen,
  variant = 'board',
}: {
  task: Task;
  onOpen: (task: Task) => void;
  variant?: 'board' | 'list';
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
  });

  const flag = getDueFlag(task.due_date, task.status, task.archived_at);

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
        zIndex: isDragging ? 10 : undefined,
        opacity: isDragging ? 0.6 : 1,
      }
    : undefined;

    return (
    <div
      ref={setNodeRef}
      style={{
        ...style,
        borderColor: variant === 'list' ? STATUS_ACCENT[task.status] : undefined,
        borderLeftColor: variant === 'board' ? STATUS_ACCENT[task.status] : undefined,
      }}
      className={`bg-white rounded-lg p-3.5 shadow-sm hover:shadow-md transition-shadow cursor-pointer ${
        variant === 'list' ? 'border-2' : 'border border-gray-200 border-l-[3px]'
      }`}
      onClick={() => onOpen(task)}
    >
      <div className="flex justify-between items-start gap-2">
        <span className="font-medium text-sm leading-snug">{task.title}</span>
        {/* Drag handle — separate from the click target so click-to-open still works */}
        <span
          {...listeners}
          {...attributes}
          onClick={(e) => e.stopPropagation()}
          className="cursor-grab text-gray-300 hover:text-gray-500 transition-colors px-1 shrink-0"
          aria-label="Drag to change status"
        >
          <GripVertical size={16} />
        </span>
      </div>
      <div className="font-mono text-[11px] tracking-wide text-gray-400 uppercase mt-1.5 mb-2">
        {task.topic}
      </div>
      {flag && (
        <span
          className={`font-mono text-[11px] px-2 py-0.5 rounded ${DUE_FLAG_CLASSES[flag]}`}
        >
          {DUE_FLAG_LABEL[flag]}
        </span>
      )}
    </div>
  );
}
