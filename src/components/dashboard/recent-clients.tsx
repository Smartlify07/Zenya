import type { Client } from '@/types';
import { Card, CardFooter, CardHeader } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '../ui/badge';
import { EmptyStateCard } from './empty-state-card';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '../ui/button';

export const RecentClients = ({ clients }: { clients: Client[] }) => {
  return (
    <section className="w-full md:w-6/12 font-inter flex flex-col gap-4">
      <div className="flex items-center w-full justify-between">
        <h1 className="text-lg font-medium text-primary">
          Recent active Clients
        </h1>
      </div>

      {clients.length === 0 && (
        <EmptyStateCard
          quickAction={'client'}
          title="No client data available"
          buttonText="Add your first client"
        />
      )}
      <div className="grid gap-4">
        {clients.slice(0, 6).map((client) => (
          <RecentClientsCard key={client?.id} {...client} />
        ))}
      </div>
    </section>
  );
};

export const RecentClientsCard = ({
  name,
  email,
  status,
  avatar,
  id,
}: Client) => {
  const router = useNavigate();
  return (
    <Card className="shadow-none flex flex-col px-4 gap-4">
      <CardHeader className="flex p-0 items-start justify-between gap-4">
        <div
          onClick={() => router({ to: `/clients/${id}` })}
          className="flex items-center gap-4 cursor-pointer"
        >
          <Avatar>
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback className="uppercase text-sm">
              {name.charAt(0)}
              {name.charAt(1)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <h1 className="text-base font-medium">{name}</h1>
            <p className="text-sm truncate text-neutral-600">{email}</p>
          </div>
        </div>
      </CardHeader>

      <CardFooter className="flex items-center p-0 gap-4 justify-between">
        <Button
          variant={'ghost'}
          onClick={() => router({ to: `/clients/${id}` })}
          className="text-sm text-neutral-600 hover:text-neutral-800 transition"
        >
          View Client <ArrowRight size={16} />
        </Button>

        <Badge
          className={cn(
            'capitalize',
            status === 'active' && 'text-green-600 bg-green-600/20',
            status === 'inactive' && 'text-red-600 bg-red-600/20'
          )}
        >
          {status}
        </Badge>
      </CardFooter>
    </Card>
  );
};
