import ProjectList from '@/components/project-list';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth-provider';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { PlusIcon } from 'lucide-react';

export const Route = createFileRoute('/projects')({
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = useAuth();
  const router = useNavigate();
  return (
    <main className="flex items-center justify-center flex-col">
      <div className="p-10 w-4xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-3xl font-semibold text-center text-gray-800 mb-4 font-inter">
            Your Projects
          </h1>
          <Button
            onClick={() => {
              router({ to: '/projects/create' });
            }}
            variant={'default'}
            className="flex items-center font-inter gap-2"
          >
            <PlusIcon /> Add Projects
          </Button>
        </div>
      </div>
      <div className="w-8/12">
        <ProjectList userId={user?.id!} />
      </div>
    </main>
  );
}
