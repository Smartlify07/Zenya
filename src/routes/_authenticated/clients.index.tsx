import ClientsPage from '@/pages/clients/clients-page';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/clients/')({
  component: ClientsRoute,
});

function ClientsRoute() {
  return <ClientsPage />;
}
