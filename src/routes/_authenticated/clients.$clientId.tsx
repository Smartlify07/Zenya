import { fetchClientById } from '@/api/supabase/clients';
import { fetchProjectsForClient } from '@/api/supabase/projects';
import { fetchTasksWithRelatedProject } from '@/api/supabase/tasks';
import { ProjectsSection } from '@/components/pages/clients/detail/projects-section';
import { TasksSection } from '@/components/pages/clients/detail/tasks-section';
import { TopSection } from '@/components/pages/clients/detail/top-section';
import ProjectsSectionSkeleton from '@/components/skeletons/clients/projects-section-skeleton';
import TasksSectionSkeleton from '@/components/skeletons/clients/tasks-section-skeleton';
import TopSectionSkeleton from '@/components/skeletons/clients/top-section-skeleton';
import { useAuth } from '@/context/auth-provider';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute, useParams } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/clients/$clientId')({
  component: ClientDetails,
});

function ClientDetails() {
  const { user } = useAuth();
  const { clientId } = useParams({
    from: '/_authenticated/clients/$clientId',
  });
  const client = useQuery({
    queryKey: ['clients', clientId],
    queryFn: async () => fetchClientById(clientId, user?.id!),
  });

  const projects = useQuery({
    queryKey: ['projects', clientId],
    queryFn: async () => fetchProjectsForClient(clientId, user?.id!),
  });

  const tasks = useQuery({
    queryKey: ['tasks', clientId],
    queryFn: async () => fetchTasksWithRelatedProject(clientId, user?.id!),
  });

  if (client.isLoading) {
    return (
      <main className="flex pb-5 items-center font-inter justify-center">
        <div className="grid gap-10 w-full max-w-[1440px]">
          <TopSectionSkeleton />
          <div className="px-20 flex flex-col gap-10">
            <ProjectsSectionSkeleton />
            <TasksSectionSkeleton />
          </div>
        </div>
      </main>
    );
  }

  if (client.isError) {
    return <>{client.error.message}</>;
  }

  return (
    <main className="flex pb-5 items-center font-inter justify-center">
      <div className="grid gap-10 w-full max-w-[1440px]">
        <TopSection client={client.data?.data} />
        <div className="px-20 flex flex-col gap-10">
          {projects.data?.data && (
            <ProjectsSection
              user_id={user?.id!}
              projects={projects.data?.data}
            />
          )}
          {tasks?.data?.data && (
            <TasksSection user_id={user?.id!} tasks={tasks?.data?.data} />
          )}
        </div>
      </div>
    </main>
  );
}
