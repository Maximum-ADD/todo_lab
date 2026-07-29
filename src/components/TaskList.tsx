// AI Declaration: Generated with the assistance of Claude-Web[Claude Sonnet 5]

import { Task } from '@/lib/types';
import TaskItem from './TaskItem';

export default function TaskList({ tasks }: { tasks: Task[] }) {
  if (tasks.length === 0) {
    return <p>No tasks yet.</p>;
  }

  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
}
