// AI Declaration: Generated with the assistance of Claude-Web[Claude Sonnet 5]
'use client';

import { useDraggable } from '@dnd-kit/core';
import { GripVertical } from 'lucide-react';
import { Task } from '@/lib/types';
import { getDueFlag, DUE_FLAG_LABEL, DUE_FLAG_CLASSES } from '@/lib/dueStatus';

export default function TaskCard({
  task,
  onOpen,
}: {
  task: Task;
  onOpen: (task: Task) => void;
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
      style={style}
      className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm cursor-pointer"
      onClick={() => onOpen(task)}
    >
      <div className="flex justify-between items-start">
        <span className="font-medium text-sm">{task.title}</span>
        {/* Drag handle — separate from the click target so click-to-open still works */}
        <span
          {...listeners}
          {...attributes}
          onClick={(e) => e.stopPropagation()}
          className="cursor-grab text-gray-400 px-1"
          aria-label="Drag to change status"
        >
          <GripVertical size={16} />
        </span>
      </div>
      <div className="text-xs text-gray-500 my-1">{task.topic}</div>
      {flag && (
        <span
          className={`text-xs px-2 py-0.5 rounded ${DUE_FLAG_CLASSES[flag]}`}
        >
          {DUE_FLAG_LABEL[flag]}
        </span>
      )}
    </div>
  );
}
