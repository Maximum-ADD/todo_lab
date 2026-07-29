// AI Declaration: Generated with the assistance of Claude-Web[Claude Sonnet 5]

import { Task } from '@/lib/types';

export default function TaskItem({ task }: { task: Task }) {
  return (
    <li>
      <strong>{task.title}</strong> — {task.status} — {task.topic} — due {task.due_date}
      {task.overdue && <span> ⚠ Overdue</span>}
    </li>
  );
}
