import UpcomingTasks from '@/components/dashboard/upcoming-tasks';
import { RecentClients } from '@/components/dashboard/recent-clients';
import { RecentProjects } from '@/components/dashboard/recent-projects';
import { SummaryCard } from '@/components/dashboard/summary-card';
import { clients } from '@/lib/data/clients';
import { projects } from '@/lib/data/projects';
import { allTasks } from '@/lib/data/tasks';
import { createFileRoute } from '@tanstack/react-router';
import { CheckCircle, FolderKanban, Receipt, Users } from 'lucide-react';
import { RecentInvoices } from '@/components/dashboard/recent-invoices';
import { allInvoices } from '@/lib/data/invoices';

export const Route = createFileRoute('/_authenticated/dashboard')({
  component: Dashboard,
});

function Dashboard() {
  return (
    <main className="flex flex-col font-inter px-4 items-center">
      <div className="max-w-[1440px] flex flex-col gap-10 w-full">
        <div className="grid gap-4 grid-cols-4 w-full">
          <SummaryCard title="Clients" value={clients.length} Icon={Users} />
          <SummaryCard
            title="Projects"
            value={projects.length}
            Icon={FolderKanban}
          />
          <SummaryCard title="Tasks Due" value={3} Icon={CheckCircle} />
          <SummaryCard
            title="Invoices Owed"
            value={`₦ ${80000}`}
            Icon={Receipt}
          />
        </div>

        <div className="flex items-start gap-10 flex-col md:flex-row justify-between">
          <RecentClients clients={clients} />
          <RecentProjects projects={projects} />
        </div>

        <section className="w-full flex flex-col justify-between gap-10 md:flex-row">
          <UpcomingTasks tasks={allTasks} />
          <RecentInvoices invoices={allInvoices} />
        </section>
      </div>
    </main>
  );
}
