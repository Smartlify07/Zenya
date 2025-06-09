import { ClientsTable } from '@/components/tables/clients-table';
import { Button } from '@/components/ui/button';

import { useClients } from '@/hooks/useClients';
import { useNavigate } from '@tanstack/react-router';
import { PlusIcon } from 'lucide-react';

const ClientsPage = () => {
  const clients = useClients();
  const navigate = useNavigate();

  return (
    <main className="flex items-center justify-center gap-5 font-inter px-5">
      <div className="flex flex-col gap-10 w-full max-w-[1440px]">
        <header className="flex items-center justify-between">
          <h1 className="font-medium text-2xl text-primary">Clients</h1>
          <Button
            onClick={() =>
              navigate({
                to: '/clients/create',
              })
            }
            className="flex items-center bg-indigo-600 text-white hover:bg-indigo-700 gap-1 justify-center"
          >
            Add client <PlusIcon />
          </Button>
        </header>

        <ClientsTable clients={clients.data?.data ?? []} />
      </div>
    </main>
  );
};
export default ClientsPage;
