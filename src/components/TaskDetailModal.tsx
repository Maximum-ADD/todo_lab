// AI Declaration: Generated with the assistance of Claude-Web[Claude Sonnet 5]
'use client';

import { X, Pencil, Archive, Folder, Calendar, AlertTriangle } from 'lucide-react';
import { Task, TaskStatus } from '@/lib/types';
import { STATUS_COLUMNS, STATUS_LABEL, STATUS_ACCENT, STATUS_BADGE_CLASSES } from '@/lib/statusStyles';
import { getDueFlag, DUE_FLAG_LABEL, DUE_FLAG_CLASSES } from '@/lib/dueStatus';

export default function TaskDetailModal({
  task,
  onClose,
  onEdit,
  onArchive,
  onStatusChange,
}: {
  task: Task;
  onClose: () => void;
  onEdit: () => void;
  onArchive: () => void;
  onStatusChange: (status: TaskStatus) => void;

}) {
  const flag = getDueFlag(task.due_date, task.status, task.archived_at);

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl p-5 w-[340px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-2">
          <span className="text-base font-medium">{task.title}</span>
          <button aria-label="Close" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <div className="flex gap-2 mb-3">
          <span
            className={`text-xs px-2 py-0.5 rounded ${STATUS_BADGE_CLASSES[task.status]}`}
          >
            {STATUS_LABEL[task.status]}
          </span>
          {flag && (
            <span className={`text-xs px-2 py-0.5 rounded flex items-center gap-1 ${DUE_FLAG_CLASSES[flag]}`}>
              {flag === 'overdue' && <AlertTriangle size={12} />}
              {DUE_FLAG_LABEL[flag]}
            </span>
          )}
        </div>

        {task.description && (
          <p className="text-sm text-gray-600 mb-3">{task.description}</p>
        )}

        <div className="border-t pt-2 text-xs text-gray-500 space-y-1">
          <div className="flex items-center gap-1.5">
            <Folder size={13} /> {task.topic}
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar size={13} /> Due {task.due_date}
          </div>
        </div>
        <div className="flex gap-1.5 mb-4">
          {STATUS_COLUMNS.map((s) => (
            <button
              key={s}
              onClick={() => onStatusChange(s)}
              disabled={s === task.status}
              className="flex-1 font-mono text-[11px] uppercase px-2 py-1.5 rounded border-2 transition-colors disabled:cursor-default"
              style={{
                borderColor: STATUS_ACCENT[s],
                backgroundColor: s === task.status ? STATUS_ACCENT[s] : 'white',
                color: s === task.status ? 'white' : STATUS_ACCENT[s],
              }}
            >
              {STATUS_LABEL[s]}
            </button>
          ))}
        </div>
        <div className="flex gap-2 mt-4">
          <button
            className="flex-1 border rounded py-1.5 text-sm flex items-center justify-center gap-1"
            onClick={onEdit}
          >
            <Pencil size={14} /> Edit
          </button>
          <button
            className="flex-1 border rounded py-1.5 text-sm flex items-center justify-center gap-1"
            onClick={onArchive}
          >
            <Archive size={14} /> Archive
          </button>
        </div>
      </div>
    </div>
  );
}
