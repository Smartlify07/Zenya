import type { Project } from '@/types';
import { Card, CardFooter } from '../ui/card';
import { Badge } from '../ui/badge';
import { cn } from '@/lib/utils';
import { User } from 'lucide-react';
import { Button, buttonVariants } from '../ui/button';
import { ProjectMilestone } from './project-milestone';
import { EmptyStateCard } from './empty-state-card';
import { DialogTrigger } from '../ui/dialog';
import { useSelectedQuickAction } from '@/context/selected-quick-action-provider';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import { useQuery } from '@tanstack/react-query';
import { fetchClientById } from '@/api/supabase/clients';
import { Skeleton } from '../ui/skeleton';

export const RecentProjects = ({
  projects,
  user_id,
}: {
  projects: Project[];
  user_id: SupabaseUser['id'] | undefined;
}) => {
  const { setSelectedQuickAction, setShowDialog } = useSelectedQuickAction();

  return (
    <section className="w-full md:w-6/12 flex flex-col gap-4">
      <div className="flex items-center w-full justify-between">
        <h1 className="text-lg font-medium text-primary">Recent Projects</h1>

        {projects.length !== 0 && (
          <DialogTrigger
            className={buttonVariants({
              variant: 'outline',
            })}
            onClick={() => {
              setSelectedQuickAction('project');
              setShowDialog(true);
            }}
          >
            Add Project
          </DialogTrigger>
        )}
      </div>

      {projects.length === 0 && (
        <EmptyStateCard
          quickAction={'project'}
          title="No project data available"
          buttonText="Add your first project"
        />
      )}
      <div className="grid gap-4">
        {projects.slice(0, 4).map((project) => (
          <RecentProjectsCard key={project.id} user_id={user_id} {...project} />
        ))}
      </div>
    </section>
  );
};

export const RecentProjectsCard = ({
  name,
  status,
  milestones,
  user_id,
  client_id,
}: Project & {
  user_id: SupabaseUser['id'] | undefined;
}) => {
  const client = useQuery({
    queryKey: ['clients', client_id],
    queryFn: async () => {
      return await fetchClientById(client_id, user_id!);
    },
  });

  return (
    <Card className="shadow-2xs flex flex-col px-4 gap-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-base font-medium text-primary">{name}</h1>
          <div className="flex items-center gap-1">
            <User size={16} className="text-neutral-400" />
            {client.isLoading ? (
              <Skeleton className="h-4 w-24" />
            ) : client.isError ? (
              <h3 className="text-sm text-neutral-400 italic">
                Client unavailable
              </h3>
            ) : (
              <h3 className="text-sm text-neutral-600">
                {client?.data?.data?.name}
              </h3>
            )}
          </div>
        </div>
        <Badge
          className={cn(
            'capitalize self-end',
            status === 'active' && 'text-blue-600 bg-blue-600/20',
            status === 'completed' && 'text-green-600 bg-green-600/20',
            status === 'on_hold' && 'text-yellow-400 bg-yellow-400/20'
          )}
        >
          {status}
        </Badge>
      </div>

      <CardFooter className="flex px-0 flex-col gap-2 w-full justify-between">
        <div className="flex flex-col w-full gap-2">
          <h3 className="text-neutral-800 flex items-center font-medium text-sm">
            Upcoming milestones
          </h3>

          <div className="w-full border-t border-dashed" />

          {!milestones && (
            <div>
              <h1 className="text-sm text-center text-neutral-700 font-inter">
                No milestones yet
              </h1>
            </div>
          )}
          {milestones && (
            <div className="flex flex-col gap-1">
              {milestones.slice(0, 2).map((milestone, index) => (
                <ProjectMilestone key={index} milestone={milestone} />
              ))}
            </div>
          )}
        </div>

        <div className="w-full border-t border-dashed" />

        <Button variant={'ghost'} className="mt-1">
          View Project
        </Button>
      </CardFooter>
    </Card>
  );
};
