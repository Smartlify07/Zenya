import type { Task } from '@/types';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { FolderKanban, PlusIcon, User } from 'lucide-react';
import {
  getProjectDaysLeftColor,
  getProjectsDaysLeftText,
} from '@/lib/utils/dashboardUtils';
import { getRemainingDays } from '@/lib/utils/dateUtils';
import { cn } from '@/lib/utils';
import { Badge } from '../ui/badge';
import { getStatusColor } from '@/lib/utils/taskUtils';
import { Button } from '../ui/button';

export const TodaysFlow = ({ tasks }: { tasks: Task[] }) => {
  return (
    <section className="rounded-2xl font-inter flex flex-col gap-4 w-full bg-white">
      <h1 className="text-xl font-medium text-primary">Today's Flow</h1>
      <div className="flex flex-col gap-4">
        {tasks.map((task) => (
          <TaskCard task={task} />
        ))}

        {tasks.length === 0 && (
          <div className="flex border rounded-2xl p-4 items-center flex-col gap-4">
            <span className="text-3xl">☘️</span>
            <h1 className="text-lg font-medium">
              Today's flow is calm, you're in control.
            </h1>

            <Button
              className="flex items-center gap-1 justify-center"
              variant={'outline'}
            >
              <PlusIcon size={16} /> Add a Task
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export const TaskCard = ({ task }: { task: Task }) => {
  const remainingDays = getRemainingDays(task.due_date);
  const dueText = getProjectsDaysLeftText(remainingDays);
  const statusColor = getStatusColor(task.status);
  const projectDayColor = getProjectDaysLeftColor(remainingDays);

  return (
    <Card className="shadow-none rounded-2xl gap-0 px-4 py-4">
      <CardHeader className="px-0 flex flex-row items-start justify-between py-0">
        <h1 className="text-base font-inter font-medium text-primary">
          {task.name}
        </h1>

        <div className="flex items-center gap-2">
          <FolderKanban size={16} className="text-neutral-600" />
          <Badge variant={'outline'} className="text-xs">
            {task.projects.name}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="px-0 flex flex-col gap-2 py-0">
        <div className="flex items-center gap-2">
          <User size={16} className="text-primary" />{' '}
          <p className="text-sm text-primary">{task.clients.name}</p>
        </div>
      </CardContent>

      <CardFooter className="pt-4 px-0 flex justify-between items-center">
        <p className={`self-start text-sm ${cn(projectDayColor)}`}>{dueText}</p>

        <Badge className={cn('text-xs self-end', statusColor)}>
          {task.status}
        </Badge>
      </CardFooter>
    </Card>
  );
};
