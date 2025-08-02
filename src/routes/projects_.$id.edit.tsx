import { ProjectForm } from '@/components/project-form';
import { useAuth } from '@/context/auth-provider';
import { useGetProjectById } from '@/services/projects.service';
import { createFileRoute, useParams } from '@tanstack/react-router';

export const Route = createFileRoute('/projects_/$id/edit')({
  component: RouteComponent,
});

function RouteComponent() {
  const params = useParams({
    from: '/projects_/$id/edit',
  });

  const { user } = useAuth();
  const response = useGetProjectById(user?.id!, params.id);
  const data = response.data;

  const initialValues = {
    name: data?.name ?? '',
    description: data?.description ?? '',
    client_id: data?.client_id ?? '',
    status: data?.status ?? 'active',
    start_date: data?.start_date ?? new Date(),
    end_date: data?.end_date ?? new Date(),
  };

  return (
    <main className="flex flex-col items-center min-h-screen font-inter justify-center">
      <header className="">
        <h1 className="text-3xl font-medium">Edit Project</h1>
      </header>
      <div className="w-full md:w-6/12 ">
        <ProjectForm
          project_id={params.id}
          buttonText="Save Project"
          redirectURL="/projects"
          initialValues={initialValues}
        />
      </div>
    </main>
  );
}
