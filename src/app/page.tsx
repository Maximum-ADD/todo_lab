// AI Declaration: Generated with the assistance of Claude-Web[Claude Sonnet 5]

import { getTasks } from '@/actions/tasks';
import TaskList from '@/components/TaskList';
import AddTaskForm from '@/components/AddTaskForm';

export default async function HomePage() {
  const tasks = await getTasks('due_date');

  return (
    <main>
      <h1>Todo Lab</h1>
      <AddTaskForm />
      <TaskList tasks={tasks} />
    </main>
  );
}
