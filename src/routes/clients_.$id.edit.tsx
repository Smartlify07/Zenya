import { ClientForm } from '@/components/client-form';
import { useGetClientById } from '@/services/client.service';
import { QueryClient } from '@tanstack/react-query';
import { createFileRoute, useParams } from '@tanstack/react-router';

export const Route = createFileRoute('/clients_/$id/edit')({
  component: RouteComponent,
});

function RouteComponent() {
  const params = useParams({
    from: '/clients_/$id/edit',
  });

  const response = useGetClientById(params.id);
  const data = response.data;
  const queryClient = new QueryClient();
  const queryData = queryClient.getQueryData(['clients']);
  console.log(queryData);

  const initialValues = {
    name: data?.name ?? '',
    email: data?.email ?? '',
    company: data?.company ?? '',
    status: data?.status ?? 'active',
    lead_source: data?.lead_source ?? '',
  };

  return (
    <main className="flex flex-col items-center min-h-screen font-inter justify-center">
      <header className="">
        <h1 className="text-3xl font-medium">Edit Client</h1>
      </header>
      <div className="w-full md:w-6/12 ">
        <ClientForm
          buttonText="Save"
          redirectURL="/clients"
          client_id={params.id}
          initialValues={initialValues}
        />
      </div>
    </main>
  );
}
