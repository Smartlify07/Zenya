import type { Task } from '@/types';
import { Card, CardFooter, CardTitle } from '../ui/card';
import { Calendar } from 'lucide-react';
import { getRemainingDays } from '@/lib/utils/dateUtils';
import { cn } from '@/lib/utils';
import { Badge } from '../ui/badge';
import { TaskStatusPopover } from './task-status-popover';
import { getProjectDaysLeftColor } from '@/lib/utils/dashboardUtils';

const UpcomingTasks = ({ tasks }: { tasks: Task[] }) => {
  return (
    <section className="flex flex-col md:w-6/12 font-inter gap-5">
      <h1 className="text-lg font-medium text-primary">Upcoming Tasks</h1>

      <div className="grid gap-5">
        {tasks.slice(0, 4).map((task, index) => (
          <Card key={index} className="shadow-2xs px-4">
            <CardTitle className="flex flex-col">
              <h1 className="text-base font-medium text-primary truncate">
                {task?.name}
              </h1>
              <p className="truncate text-sm font-normal  text-neutral-600">
                {task?.description}
              </p>
            </CardTitle>

            <CardFooter className="flex items-center px-0 justify-between">
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

              <TaskStatusPopover status={task?.status} />
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};
export default UpcomingTasks;
