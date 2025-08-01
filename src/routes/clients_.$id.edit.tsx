import { ClientForm } from '@/components/client-form';
import { useGetClientById } from '@/services/client.service';
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

  const initialValues = {
    name: data?.name ?? '',
    email: data?.email ?? '',
    company: data?.company ?? '',
    status: data?.status ?? 'active',
    lead_source: data?.lead_source ?? '',
  };
  return (
    <main className="flex items-center font-inter justify-center">
      <div className="border w-4xl">
        <ClientForm
          buttonText="Save"
          redirectURL="/clients"
          initialValues={initialValues}
        />
      </div>
    </main>
  );
}
