// AI Declaration: Generated with the assistance of Claude-Web[Claude Sonnet 5]
'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { Task } from '@/lib/types';
import { getArchivedTasks } from '@/actions/tasks';
import { STATUS_LABEL, STATUS_BADGE_CLASSES } from '@/lib/statusStyles';

export default function ArchivedView({ onClose }: { onClose: () => void }) {
  const [tasks, setTasks] = useState<Task[] | null>(null);

  useEffect(() => {
    getArchivedTasks().then(setTasks);
  }, []);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={onClose}>
      <div
        className="bg-white rounded-xl p-5 w-[380px] max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-3">
          <span className="text-base font-medium">Archived tasks</span>
          <button aria-label="Close" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        {tasks === null && <p className="text-sm text-gray-500">Loading...</p>}
        {tasks?.length === 0 && (
          <p className="text-sm text-gray-500">No archived tasks yet.</p>
        )}

        <div className="flex flex-col gap-2">
          {tasks?.map((task) => (
            <div key={task.id} className="border rounded-lg p-2.5">
              <div className="flex justify-between items-start">
                <span className="text-sm font-medium">{task.title}</span>
                <span className={`text-xs px-2 py-0.5 rounded ${STATUS_BADGE_CLASSES[task.status]}`}>
                  {STATUS_LABEL[task.status]}
                </span>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {task.topic} · was due {task.due_date}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
