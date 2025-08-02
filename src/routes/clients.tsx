import ClientList from '@/components/client-list';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth-provider';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { PlusIcon } from 'lucide-react';

export const Route = createFileRoute('/clients')({
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = useAuth();
  const router = useNavigate();
  return (
    <main>
      <div className="p-10 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-3xl font-semibold text-center text-gray-800 mb-4 font-inter">
            Your Clients
          </h1>
          <Button
            onClick={() => {
              router({ to: '/clients/create' });
            }}
            variant={'default'}
            className="flex items-center font-inter gap-2"
          >
            <PlusIcon /> Add Client
          </Button>
        </div>
      </div>
      <ClientList userId={user?.id ?? ''} />
    </main>
  );
}
