// AI Declaration: Generated with the assistance of Claude-Web[Claude Sonnet 5]

import { createTask } from '@/actions/tasks';

export default function AddTaskForm() {
  async function handleSubmit(formData: FormData) {
    'use server';
    await createTask({
      title: formData.get('title') as string,
      description: (formData.get('description') as string) || undefined,
      due_date: formData.get('due_date') as string,
      topic: formData.get('topic') as string,
    });
  }

  return (
    <form action={handleSubmit}>
      <input name="title" placeholder="Title" required />
      <input name="description" placeholder="Description" />
      <input name="due_date" type="date" required />
      <input name="topic" placeholder="Topic" required />
      <button type="submit">Add Task</button>
    </form>
  );
}
