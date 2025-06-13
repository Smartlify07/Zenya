import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { Client } from '@/types';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { AvatarImage } from '@radix-ui/react-avatar';
import { cn } from '@/lib/utils';
import { Badge } from '../ui/badge';

export const ClientsTable = ({ clients }: { clients: Client[] }) => {
  const tableHeadClassName = 'text-neutral-600 font-normal text-sm';
  return (
    <Table>
      <TableCaption>A list of your clients.</TableCaption>
      <TableHeader>
        <TableRow className="bg-neutral-50">
          <TableHead className={tableHeadClassName}>Client Names</TableHead>
          <TableHead className={tableHeadClassName}>Contact Email</TableHead>
          <TableHead className={tableHeadClassName}>Company Name</TableHead>
          <TableHead className={tableHeadClassName}>Client Notes</TableHead>
          <TableHead className={tableHeadClassName}>Client Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {clients.map((client) => (
          <TableRow className="text-primary text-sm" key={client.id}>
            <TableCell className="flex items-center gap-2">
              <Avatar>
                <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
                <AvatarImage src={client?.avatar} />
              </Avatar>
              <h1>{client.name}</h1>
            </TableCell>
            <TableCell>{client.email}</TableCell>
            <TableCell>{client.company}</TableCell>
            <TableCell className="truncate">{client.notes}</TableCell>
            <TableCell className={'flex justify-center items-center'}>
              <Badge
                className={cn(
                  'capitalize',
                  client.status === 'active' &&
                    'text-green-600 bg-green-600/20',
                  client.status === 'inactive' && 'text-red-600 bg-red-600/20'
                )}
              >
                {client.status}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
