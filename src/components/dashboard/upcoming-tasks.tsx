import type { Task } from '@/types';
import { Card, CardFooter, CardTitle } from '../ui/card';
import { Calendar, Folder, User } from 'lucide-react';
import { getRemainingDays } from '@/lib/utils/dateUtils';
import { cn } from '@/lib/utils';
import { Badge } from '../ui/badge';
import { TaskStatusPopover } from './task-status-popover';
import { getProjectDaysLeftColor } from '@/lib/utils/dashboardUtils';
import { EmptyStateCard } from './empty-state-card';
import { DialogTrigger } from '../ui/dialog';
import { buttonVariants } from '../ui/button';
import { useSelectedQuickAction } from '@/context/selected-quick-action-provider';

import type { User as SupabaseUser } from '@supabase/supabase-js';

const UpcomingTasks = ({
  tasks,
  user_id,
}: {
  tasks: Task[];
  user_id: SupabaseUser['id'] | undefined;
}) => {
  const { setSelectedQuickAction, setShowDialog } = useSelectedQuickAction();

  return (
    <section className="flex flex-col md:w-6/12 font-inter gap-5">
      <div className="flex items-center w-full justify-between">
        <h1 className="text-lg font-medium text-primary">Upcoming tasks</h1>

        {tasks.length !== 0 && (
          <DialogTrigger
            className={buttonVariants({
              variant: 'outline',
            })}
            onClick={() => {
              setSelectedQuickAction('task');
              setShowDialog(true);
            }}
          >
            Add Task
          </DialogTrigger>
        )}
      </div>

      {tasks.length === 0 && (
        <EmptyStateCard
          title="No tasks available"
          buttonText="Add your first task"
          quickAction={'task'}
        />
      )}
      <div className="grid gap-5">
        {tasks.slice(0, 4).map((task) => (
          <TaskCard key={task.id} user_id={user_id!} task={task} />
        ))}
      </div>
    </section>
  );
};

const TaskCard = ({ task }: { task: Task; user_id: SupabaseUser['id'] }) => {
  return (
    <Card className="shadow-2xs px-4">
      <div className="flex items-center justify-between">
        <CardTitle className="flex flex-col">
          <h1 className="text-base font-medium text-primary truncate">
            {task?.name}
          </h1>
          <p className="truncate text-sm font-normal  text-neutral-600">
            {task?.description}
          </p>
        </CardTitle>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <User size={16} className="text-neutral-600" />

            <h2 className="text-primary text-sm truncate">
              {task?.clients?.name}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <Folder size={16} className="text-neutral-600" />{' '}
            <h1 className="truncate text-sm text-neutral-600">
              {task?.projects?.name}
            </h1>
          </div>
        </div>
      </div>

      <CardFooter className="flex items-center px-0 justify-between">
        <Badge
          variant={'outline'}
          className={cn(
            'text-sm text-neutral-600',
            getProjectDaysLeftColor(getRemainingDays(task?.due_date))
          )}
        >
          <Calendar size={16} /> Due in {getRemainingDays(task?.due_date)} days
        </Badge>

        <TaskStatusPopover client_id={''} task_id={''} status={task?.status} />
      </CardFooter>
    </Card>
  );
};
export default UpcomingTasks;
