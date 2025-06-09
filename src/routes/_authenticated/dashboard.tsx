import UpcomingTasks from '@/components/dashboard/upcoming-tasks';
import { RecentClients } from '@/components/dashboard/recent-clients';

import { SummaryCard } from '@/components/dashboard/summary-card';
import { createFileRoute } from '@tanstack/react-router';
import { CheckCircle, FolderKanban, Receipt, Users } from 'lucide-react';
import { RecentInvoices } from '@/components/dashboard/recent-invoices';
import { useClients } from '@/hooks/useClients';
import { useTasks } from '@/hooks/useTasks';
import { useProjects } from '@/hooks/useProjects';
import { useInvoices } from '@/hooks/useInvoices';
import { DashboardSkeleton } from '@/components/skeletons/dashboard-skeleton';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useSelectedQuickAction } from '@/context/selected-quick-action-provider';
import { ClientForm } from '@/components/forms/client-form';
import { useAuth } from '@/context/auth-provider';
import { ProjectForm } from '@/components/forms/project-form';
import { RecentProjects } from '@/components/dashboard/recent-projects';
import { TaskForm } from '@/components/forms/task-form';

export const Route = createFileRoute('/_authenticated/dashboard')({
  component: Dashboard,
});

function Dashboard() {
  const { user } = useAuth();
  const {
    data: clients,
    error: clientsError,
    isLoading: isLoadingClients,
  } = useClients();

  const {
    data: tasks,
    error: tasksError,
    isLoading: isLoadingTasks,
  } = useTasks();

  const {
    data: projects,
    error: projectsError,
    isLoading: isLoadingProjects,
  } = useProjects();

  const {
    data: invoices,
    error: invoicesError,
    isLoading: isLoadingInvoices,
  } = useInvoices();

  const isLoading =
    isLoadingClients ||
    isLoadingTasks ||
    isLoadingProjects ||
    isLoadingInvoices;

  const error = clientsError || tasksError || projectsError || invoicesError;

  const { selectedQuickAction, showDialog } = useSelectedQuickAction();
  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Error: {error.message}</p>
      </div>
    );
  }

  return (
    <main className="flex flex-col font-inter px-4 pb-5 items-center">
      <div className="max-w-[1440px] flex flex-col gap-10 w-full">
        <div className="grid gap-4 grid-cols-4 w-full">
          <SummaryCard
            title="Clients"
            value={clients?.data?.length ?? 0}
            Icon={Users}
          />
          <SummaryCard
            title="Projects"
            value={projects?.data?.length ?? 0}
            Icon={FolderKanban}
          />
          <SummaryCard
            title="Tasks Due"
            value={tasks?.data?.length ?? 0}
            Icon={CheckCircle}
          />
          <SummaryCard
            title="Invoices Owed"
            value={`₦ ${Number(80000).toLocaleString('en-NG')}`}
            Icon={Receipt}
          />
        </div>
        <Dialog>
          {showDialog && (
            <DialogContent aria-describedby={`${selectedQuickAction}-form`}>
              {selectedQuickAction === 'client' && (
                <ClientForm user_id={user?.id} />
              )}
              {selectedQuickAction === 'project' && (
                <ProjectForm user_id={user?.id} />
              )}

              {selectedQuickAction === 'task' && (
                <TaskForm user_id={user?.id} />
              )}
            </DialogContent>
          )}
          <div className="flex items-start gap-10 flex-col md:flex-row justify-between">
            <RecentClients clients={clients?.data ?? []} />
            <RecentProjects
              user_id={user?.id}
              projects={projects?.data ?? []}
            />
          </div>

          <section className="w-full flex flex-col justify-between gap-10 md:flex-row">
            <UpcomingTasks user_id={user?.id} tasks={tasks?.data ?? []} />
            <RecentInvoices invoices={invoices?.data ?? []} />
          </section>
        </Dialog>
      </div>
    </main>
  );
}
