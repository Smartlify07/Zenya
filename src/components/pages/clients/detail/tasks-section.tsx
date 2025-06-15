import { TaskStatusPopover } from '@/components/dashboard/task-status-popover';
import { TaskForm } from '@/components/forms/task-form';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { getProjectDaysLeftColor } from '@/lib/utils/dashboardUtils';
import { getRemainingDays } from '@/lib/utils/dateUtils';
import type { Task } from '@/types';
import { Calendar, FolderKanban, Notebook, Plus } from 'lucide-react';

export const TasksSection = ({
  tasks,
  user_id,
}: {
  tasks: Task[] | undefined;
  user_id: string;
}) => {
  return (
    <section>
      <Card className="shadow-2xs px-4 font-inter">
        <CardTitle className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <h1 className="font-medium text-lg">Tasks</h1>
            <Notebook size={16} className="text-neutral-600" />
          </div>
          <Dialog>
            <DialogTrigger
              className={cn(
                buttonVariants(),
                'w-fit self-end flex items-center gap-2'
              )}
            >
              <Plus /> New Task
            </DialogTrigger>

            <DialogContent>
              <TaskForm user_id={user_id} />
            </DialogContent>
          </Dialog>
        </CardTitle>
        <CardContent className="flex flex-col gap-4 px-0">
          {tasks?.map((task) => (
            <div
              key={task.id}
              className="flex flex-col border rounded-md py-4 px-4 gap-4"
            >
              <div className="flex justify-between">
                <div className="flex flex-col gap-1">
                  <h1 className="text-lg font-medium">{task.name}</h1>
                  <p className="text-sm text-neutral-500">{task.description}</p>
                </div>

                <div className="flex flex-col self-end items-end gap-3">
                  <TaskStatusPopover
                    client_id={task.client_id}
                    task_id={task.id}
                    status={task.status}
                  />
                  <div className="flex items-center gap-1">
                    <FolderKanban size={16} className="text-neutral-600" />
                    <Badge variant={'secondary'}>{task?.projects?.name}</Badge>
                  </div>
                </div>
              </div>

              <Badge
                variant={'outline'}
                className={cn(
                  'text-sm text-neutral-600',
                  getProjectDaysLeftColor(getRemainingDays(task?.due_date))
                )}
              >
                <Calendar size={16} /> Due in {getRemainingDays(task?.due_date)}{' '}
                days
              </Badge>
            </div>
          ))}
          {tasks?.length === 0 && (
            <div className="flex flex-col items-center justify-center gap-2">
              <h1 className="text-xl flex items-center justify-center text-center font-medium gap-4 text-primary">
                No tasks assigned.
              </h1>
              <p className="text-base text-neutral-600">
                Add tasks to break this project into clear steps.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
};
