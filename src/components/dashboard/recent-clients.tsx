import type { Client } from '@/types';
import { Card } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Building2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '../ui/badge';

export const RecentClients = ({ clients }: { clients: Client[] }) => {
  return (
    <section className="w-full md:w-6/12 flex flex-col gap-4">
      <h1 className="text-lg font-medium text-primary">Recent Clients</h1>

      <div className="grid gap-4">
        {clients.slice(0, 6).map((client) => (
          <RecentClientsCard {...client} />
        ))}
      </div>
    </section>
  );
};

export const RecentClientsCard = ({
  name,
  email,
  company,
  status,
  avatar,
}: Client) => {
  return (
    <Card className="shadow-none flex flex-col px-4 gap-4">
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <h1 className="text-base font-medium">{name}</h1>
          <p className="text-sm truncate text-neutral-600">{email}</p>
        </div>
      </div>

      <div className="flex items-center gap-4 justify-between">
        <h3 className="text-sm flex items-center gap-1">
          <Building2 size={14} className="text-neutral-600" />
          {company || 'No Company'}
        </h3>

        <Badge
          className={cn(
            'capitalize',
            status === 'active' && 'text-green-600 bg-green-600/20',
            status === 'inactive' && 'text-red-600 bg-red-600/20'
          )}
        >
          {status}
        </Badge>
      </div>
    </Card>
  );
};
