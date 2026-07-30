// AI Declaration: Generated with the assistance of Claude-Web[Claude Sonnet 5]
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import { Task } from '@/lib/types';
import { createTask, updateTask } from '@/actions/tasks';

export default function TaskFormModal({
  mode,
  task,
  onClose,
}: {
  mode: 'create' | 'edit';
  task: Task | null;
  onClose: () => void;
}) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(formData: FormData) {
    setSubmitting(true);
    const values = {
      title: formData.get('title') as string,
      description: (formData.get('description') as string) || undefined,
      due_date: formData.get('due_date') as string,
      topic: formData.get('topic') as string,
    };

    if (mode === 'create') {
      await createTask(values);
    } else if (task) {
      await updateTask({ id: task.id, ...values });
    }

    router.refresh();
    setSubmitting(false);
    onClose();
  }

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <form
        action={handleSubmit}
        className="bg-white rounded-xl p-5 w-[340px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-3">
          <span className="text-base font-medium">
            {mode === 'create' ? 'Add task' : 'Edit task'}
          </span>
          <button type="button" aria-label="Close" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <input
            name="title"
            placeholder="Title"
            defaultValue={task?.title}
            required
            className="border rounded px-2 py-1.5 text-sm"
          />
          <textarea
            name="description"
            placeholder="Description"
            defaultValue={task?.description ?? ''}
            className="border rounded px-2 py-1.5 text-sm"
            rows={3}
          />
          <input
            name="due_date"
            type="date"
            defaultValue={task?.due_date}
            required
            className="border rounded px-2 py-1.5 text-sm"
          />
          <input
            name="topic"
            placeholder="Topic"
            defaultValue={task?.topic}
            required
            className="border rounded px-2 py-1.5 text-sm"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full mt-4 border rounded py-1.5 text-sm text-blue-700 border-blue-300 disabled:opacity-50"
        >
          {submitting ? 'Saving...' : mode === 'create' ? 'Add task' : 'Save changes'}
        </button>
      </form>
    </div>
  );
}
