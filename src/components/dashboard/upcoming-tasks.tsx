import type { Client, Project, Task } from '@/types';
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
import { useQuery } from '@tanstack/react-query';
import { fetchClientsByIds } from '@/api/supabase/clients';
import { fetchProjectsByIds } from '@/api/supabase/projects';
import type { User as SupabaseUser } from '@supabase/supabase-js';

const UpcomingTasks = ({
  tasks,
  user_id,
}: {
  tasks: Task[];
  user_id: SupabaseUser['id'] | undefined;
}) => {
  const { setSelectedQuickAction, setShowDialog } = useSelectedQuickAction();

  const clientIds = Array.from(
    new Set(tasks.map((task) => task.client_id).filter(Boolean))
  );

  const { data: clientsData } = useQuery({
    queryKey: ['clients', clientIds, user_id],
    queryFn: async () => {
      if (!user_id || clientIds.length === 0) return [];

      const { data, error } = await fetchClientsByIds(clientIds, user_id);
      if (error) throw error;
      return data;
    },
    enabled: !!user_id && clientIds.length > 0,
  });

  const projectIds = Array.from(
    new Set(tasks.map((task) => task.project_id).filter(Boolean))
  );

  const { data: projectsData } = useQuery({
    queryKey: ['projects', projectIds, user_id],

    queryFn: async () => {
      if (!user_id || projectIds.length === 0) return [];
      const { data, error } = await fetchProjectsByIds(projectIds, user_id);
      if (error) throw error;
      return data;
    },
    enabled: !!user_id && projectIds.length > 0, // Only run if user_id exists and there are client IDs
  });

  const clientsMap = new Map<string, Client>(
    clientsData?.map((client) => [client.id as string, client]) || []
  );

  const projectsMap = new Map<string, Project>(
    projectsData?.map((project) => [project.id as string, project]) || []
  );

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
          <TaskCard
            client={clientsMap.get(task?.client_id)}
            project={projectsMap.get(task?.project_id)}
            user_id={user_id!}
            task={task}
          />
        ))}
      </div>
    </section>
  );
};

const TaskCard = ({
  task,
  client,
  project,
}: {
  task: Task;
  user_id: SupabaseUser['id'];
  client: Client | undefined;
  project: Project | undefined;
}) => {
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

            <h2 className="text-primary text-sm truncate">{client?.name}</h2>
          </div>

          <div className="flex items-center gap-2">
            <Folder size={16} className="text-neutral-600" />{' '}
            <h1 className="truncate text-sm text-neutral-600">
              {project?.name}
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
