import { GreetingSection } from '@/components/dashboard/greeting-section';
import { RecentClients } from '@/components/dashboard/recent-clients';
import { RecentProjects } from '@/components/dashboard/recent-projects';
import { SanityStats } from '@/components/dashboard/sanity-stats';
import { TodaysFlow } from '@/components/dashboard/todays-flow';
import { Dialog } from '@/components/ui/dialog';
import { useAuth } from '@/context/auth-provider';
import { useClients } from '@/hooks/useClients';
import { useProjects } from '@/hooks/useProjects';
import { useTasks } from '@/hooks/useTasks';
import { createFileRoute } from '@tanstack/react-router';
import { useMemo } from 'react';

export const Route = createFileRoute('/_authenticated/dashboard')({
  component: Dashboard,
});

function Dashboard() {
  const { user } = useAuth();

  const tasksQuery = useTasks();

  const clientsQuery = useClients();

  const projectsQuery = useProjects();

  const tasks = tasksQuery?.data?.data?.slice(0, 2) ?? [];

  const recentClients = clientsQuery.data?.data ?? [];

  const recentProjects = projectsQuery.data?.data?.slice(0, 3) ?? [];

  const activeClients = useMemo(() => {
    return recentClients
      ?.filter((client) => client.status === 'active')
      .slice(0, 3);
  }, [recentClients]);

  return (
    <main className="flex items-center justify-center">
      <Dialog>
        <div className="flex flex-col max-w-[1440px] w-full gap-6 px-5 py-5">
          <div className="flex items-start gap-10">
            <div className="flex md:w-6/12 flex-col gap-6">
              <GreetingSection tasks={tasks} name={user?.user_metadata?.name} />
              <TodaysFlow tasks={tasks} />
            </div>
            <SanityStats
              activeClients={activeClients?.length ?? 0}
              completedTasks={tasks.length}
            />
          </div>

          <div className="mt-5 gap-6 flex items-start">
            <RecentClients clients={recentClients ?? []} />
            <RecentProjects projects={recentProjects ?? []} />
          </div>
        </div>
      </Dialog>
    </main>
  );
}
