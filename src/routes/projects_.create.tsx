import { ProjectForm } from '@/components/project-form';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/projects_/create')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="font-inter flex flex-col gap-5 items-center justify-center min-h-screen">
      <header className="">
        <h1 className="text-3xl font-medium">Create Project</h1>
      </header>
      <div className="w-full md:w-6/12 ">
        <ProjectForm redirectURL="/projects" buttonText="Create Project" />
      </div>
    </main>
  );
}
