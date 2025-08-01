import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useDeleteClient, useGetClients } from '@/services/client.service';
import type { Client } from '@/types';
import { ClientBadge } from './client-badge';
import { MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { useNavigate } from '@tanstack/react-router';

const ClientList = ({}: { userId: string }) => {
  const router = useNavigate();
  const { data, error, isLoading } = useGetClients();
  const deleteMutation = useDeleteClient();
  const clients = data;

  if (isLoading) {
    return <p>Loading..</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  const handleDelete = async (client_id: Client['id']) => {
    deleteMutation.mutate(client_id, {
      onSuccess: () => {
        toast.success('Client deleted successfully');
      },
      onError: (error) => {
        console.error(error);
        toast.error('An error occurred deleting that client');
      },
    });
  };

  return (
    <div className="px-10 max-w-4xl mx-auto">
      <Table>
        <TableHeader>
          <TableRow className="font-inter">
            <TableHead>Name</TableHead>
            <TableHead className="hidden sm:table-cell">Email</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients?.map((client: Client) => (
            <TableRow className="font-inter" key={client.id}>
              <TableCell>{client.name}</TableCell>
              <TableCell className="hidden sm:table-cell">
                {client.email}
              </TableCell>
              <TableCell>
                <ClientBadge status={client.status} />
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="font-inter" align="end">
                    <DropdownMenuLabel className="font-inter">
                      Actions
                    </DropdownMenuLabel>
                    <DropdownMenuItem
                      onClick={() => {
                        router({ to: `/clients/${client.id}/edit` });
                      }}
                    >
                      Edit Client
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        handleDelete(client.id);
                      }}
                    >
                      Delete Client
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {error && <h1 className="text-base font-inter font-medium">{error}</h1>}
    </div>
  );
};

export default ClientList;
