import { ProjectsTable } from '@/components/tables/projects-table';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth-provider';
import { useProjects } from '@/hooks/useProjects';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { PlusIcon } from 'lucide-react';

export const Route = createFileRoute('/_authenticated/projects/')({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const projects = useProjects();
  const { user } = useAuth();
  return (
    <main className="flex items-center justify-center gap-5 font-inter px-5">
      <div className="flex flex-col gap-10 w-full max-w-[1440px]">
        <header className="flex items-center justify-between">
          <h1 className="font-medium text-2xl text-primary">Your Projects</h1>
          <Button
            onClick={() =>
              navigate({
                to: '/projects/create',
              })
            }
            className="flex items-center bg-indigo-600 text-white hover:bg-indigo-700 gap-1 justify-center"
          >
            Add Project <PlusIcon />
          </Button>
        </header>

        <ProjectsTable
          user_id={user?.id!}
          projects={projects.data?.data ?? []}
        />
      </div>
    </main>
  );
}
