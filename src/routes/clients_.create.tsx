import { ClientForm } from '@/components/client-form';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/clients_/create')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="font-inter flex flex-col gap-5 items-center justify-center min-h-screen">
      <header className="">
        <h1 className="text-3xl font-medium">Create Client</h1>
      </header>
      <div className="w-full md:w-6/12 ">
        <ClientForm redirectURL="/clients" buttonText="Create" />
      </div>
    </main>
  );
}
